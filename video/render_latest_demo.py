from pathlib import Path
import shutil
import subprocess
import sys

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
CAPTURES = ROOT / "video" / "captures" / "latest"
WORK = ROOT / "video" / "frames" / "latest"
OUTPUT = ROOT / "video" / "output"
WIDTH, HEIGHT, FPS = 1280, 720, 30
TRANSITION = 0.55

sys.path.insert(0, str(ROOT / ".tools" / "python"))
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else REGULAR, size)


def run(command):
    subprocess.run(command, check=True)


def cover(path):
    image = Image.open(path).convert("RGB")
    ratio = max(WIDTH / image.width, HEIGHT / image.height)
    image = image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)
    left = (image.width - WIDTH) // 2
    top = (image.height - HEIGHT) // 2
    return image.crop((left, top, left + WIDTH, top + HEIGHT))


def grade(image):
    image = ImageOps.autocontrast(image, cutoff=0.55)
    image = ImageEnhance.Color(image).enhance(1.22)
    image = ImageEnhance.Contrast(image).enhance(1.07)
    image = ImageEnhance.Brightness(image).enhance(1.045)
    image = ImageEnhance.Sharpness(image).enhance(1.06).convert("RGBA")

    warmth = Image.new("RGBA", image.size, (255, 184, 112, 0))
    mask = Image.new("L", image.size, 0)
    glow = ImageDraw.Draw(mask)
    glow.ellipse((WIDTH * .38, -HEIGHT * .72, WIDTH * 1.2, HEIGHT * .62), fill=56)
    warmth.putalpha(mask.filter(ImageFilter.GaussianBlur(125)))
    image = Image.alpha_composite(image, warmth)

    vignette = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(vignette)
    draw.ellipse((-WIDTH * .12, -HEIGHT * .24, WIDTH * 1.12, HEIGHT * 1.24), fill=255)
    edge = ImageOps.invert(vignette.filter(ImageFilter.GaussianBlur(105))).point(lambda value: round(value * .18))
    shade = Image.new("RGBA", image.size, (7, 24, 29, 0))
    shade.putalpha(edge)
    return Image.alpha_composite(image, shade)


def wrap(draw, text, text_font, max_width):
    lines, current = [], ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), candidate, font=text_font)[2] <= max_width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def add_caption(image, eyebrow, message, side="left"):
    draw = ImageDraw.Draw(image, "RGBA")
    width = 590
    x1 = 48 if side == "left" else WIDTH - width - 48
    lines = wrap(draw, message, font(27), width - 64)
    y1 = 46
    y2 = y1 + 72 + 35 * len(lines)
    draw.rounded_rectangle((x1, y1, x1 + width, y2), radius=24, fill=(13, 37, 44, 204), outline=(119, 220, 199, 130), width=2)
    draw.text((x1 + 32, y1 + 22), eyebrow.upper(), font=font(16, True), fill=(160, 235, 220, 255))
    y = y1 + 57
    for line in lines:
        draw.text((x1 + 32, y), line, font=font(27), fill=(253, 249, 238, 255))
        y += 35


def make_card(source, destination, eyebrow, title, body):
    background = grade(cover(source)).filter(ImageFilter.GaussianBlur(6))
    wash = Image.new("RGBA", background.size, (224, 238, 228, 162))
    image = Image.alpha_composite(background, wash)
    draw = ImageDraw.Draw(image, "RGBA")
    draw.rounded_rectangle((118, 112, 1162, 608), radius=42, fill=(251, 248, 238, 242), outline=(76, 188, 174, 165), width=2)
    draw.ellipse((590, 148, 690, 248), outline=(76, 188, 174, 178), width=4)
    draw.ellipse((606, 164, 674, 232), outline=(239, 126, 100, 108), width=11)
    items = [
        (eyebrow.upper(), 281, font(17, True), (49, 81, 86, 190), 880),
        (title, 320, font(46), (24, 54, 74, 255), 920),
        (body, 408, font(25), (49, 73, 90, 230), 830),
    ]
    for text, y, text_font, fill, max_width in items:
        for line in wrap(draw, text, text_font, max_width):
            box = draw.textbbox((0, 0), line, font=text_font)
            draw.text(((WIDTH - (box[2] - box[0])) / 2, y), line, font=text_font, fill=fill)
            y += (box[3] - box[1]) + 10
    image.convert("RGB").save(destination, quality=95)


def prepare_frame(source, destination, caption=None):
    image = grade(cover(source))
    if caption:
        add_caption(image, *caption)
    image.convert("RGB").save(destination, quality=94)


def encode_still(source, destination, duration):
    run([
        FFMPEG, "-y", "-loglevel", "error", "-loop", "1", "-t", str(duration), "-i", str(source),
        "-vf", f"scale={WIDTH}:{HEIGHT}:flags=lanczos,fps={FPS},format=yuv420p",
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-an", str(destination),
    ])


def encode_motion(folder, start, end, destination, duration, caption=None):
    frames_dir = WORK / f"frames-{destination.stem}"
    frames_dir.mkdir(parents=True, exist_ok=True)
    sources = sorted(folder.glob("*.png"))[start:end]
    for index, source in enumerate(sources):
        prepare_frame(source, frames_dir / f"frame-{index:03d}.jpg", caption)
    source_duration = max(len(sources) / 8, 0.1)
    pad = max(0, duration - source_duration)
    run([
        FFMPEG, "-y", "-loglevel", "error", "-framerate", "8", "-i", str(frames_dir / "frame-%03d.jpg"),
        "-vf", f"scale={WIDTH}:{HEIGHT}:flags=lanczos,tpad=stop_mode=clone:stop_duration={pad:.3f},fps={FPS},format=yuv420p",
        "-t", str(duration), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-an", str(destination),
    ])


WORK.mkdir(parents=True, exist_ok=True)
OUTPUT.mkdir(parents=True, exist_ok=True)
for child in WORK.iterdir():
    if child.is_dir():
        shutil.rmtree(child)

segments = []
durations = []


def add_still(name, source, duration, caption=None):
    frame = WORK / f"{name}.jpg"
    if caption and caption[0] == "CARD":
        make_card(source, frame, *caption[1:])
    else:
        prepare_frame(source, frame, caption)
    segment = WORK / f"{name}.mp4"
    encode_still(frame, segment, duration)
    segments.append(segment)
    durations.append(duration)


def add_motion(name, folder, start, end, duration, caption=None):
    segment = WORK / f"{name}.mp4"
    encode_motion(folder, start, end, segment, duration, caption)
    segments.append(segment)
    durations.append(duration)


add_still("00-intro", CAPTURES / "walk" / "walk-008.png", 7, ("CARD", "A LIVING WORLD", "The Garden Remembers", "An environment shaped by presence, not answers."))
add_motion("01-walk", CAPTURES / "walk", 6, 29, 12, ("EXPLORE", "The garden observes behavior instead of collecting answers.", "left"))
add_still("02-wallet", CAPTURES / "02-wallet-choice.png", 10)
add_motion("03-wallet-response", CAPTURES / "wallet-report", 0, 16, 13, ("A PHYSICAL MEMORY", "Paper, pigment, water, and planting carry the decision forward.", "right"))
add_still("04-threshold", CAPTURES / "03-threshold-prompt.png", 10)
add_motion("05-listen", CAPTURES / "threshold", 0, 10, 12, ("LISTEN", "The world preserves the moment without judging it.", "left"))
add_still("06-shelter", CAPTURES / "04-shelter-prompt.png", 12)
add_motion("07-water", CAPTURES / "shelter-water", 2, 20, 15, ("LEAVE WATER", "One choice travels through seven connected surfaces.", "right"))
add_still("08-reflection", CAPTURES / "06-reflection.png", 19)
add_still("09-codex", CAPTURES / "shelter-water" / "shelter-016.png", 22, ("CARD", "BUILT WITH CODEX + GPT-5.6", "From idea to a tested world", "Architecture, interactions, debugging, browser QA, and 81 passing checks."))
add_still("10-outro", CAPTURES / "06-reflection.png", 13, ("CARD", "THE GARDEN REMEMBERS", "Your presence left a trace", "It doesn’t tell you who you are. It helps you notice who you’ve been."))

command = [FFMPEG, "-y", "-loglevel", "error"]
for segment in segments:
    command.extend(["-i", str(segment)])

filters = []
for index in range(len(segments)):
    filters.append(f"[{index}:v]settb=AVTB[v{index}]")
current = "v0"
elapsed = durations[0]
for index in range(1, len(segments)):
    offset = elapsed - TRANSITION * index
    output = f"x{index}"
    filters.append(f"[{current}][v{index}]xfade=transition=fade:duration={TRANSITION}:offset={offset:.3f}[{output}]")
    current = output
    elapsed += durations[index]

silent = OUTPUT / "the-garden-remembers-latest-silent.mp4"
command.extend([
    "-filter_complex", ";".join(filters), "-map", f"[{current}]", "-c:v", "libx264", "-preset", "medium",
    "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(silent),
])
run(command)

total_duration = sum(durations) - TRANSITION * (len(durations) - 1)
final = OUTPUT / "the-garden-remembers-final-demo.mp4"
run([
    FFMPEG, "-y", "-loglevel", "error", "-i", str(silent), "-i", str(OUTPUT / "narration-latest.aiff"),
    "-f", "lavfi", "-t", str(total_duration), "-i", "anoisesrc=color=pink:amplitude=0.06:sample_rate=44100",
    "-f", "lavfi", "-t", str(total_duration), "-i", "sine=frequency=174.61:sample_rate=44100",
    "-filter_complex",
    f"[1:a]volume=1.18,highpass=f=85[n];[2:a]lowpass=f=850,highpass=f=160,volume=0.035[air];"
    f"[3:a]lowpass=f=420,volume=0.010[drone];[air][drone]amix=inputs=2:duration=longest,"
    f"afade=t=in:st=0:d=2,afade=t=out:st={max(0, total_duration - 3):.2f}:d=3[amb];"
    f"[n][amb]amix=inputs=2:duration=longest:dropout_transition=2,loudnorm=I=-16:TP=-1.5:LRA=9[a]",
    "-map", "0:v:0", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
    "-t", str(total_duration), "-movflags", "+faststart", str(final),
])

print(final)
print(f"duration={total_duration:.2f}s")
