from pathlib import Path
import subprocess
import sys

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
CAPTURES = ROOT / "video" / "captures"
FRAMES = ROOT / "video" / "frames" / "stills"
OUTPUT = ROOT / "video" / "output"
WIDTH, HEIGHT, FPS = 1280, 720, 30
TRANSITION = 0.8

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
    image = ImageOps.autocontrast(image, cutoff=0.7)
    image = ImageEnhance.Color(image).enhance(1.18)
    image = ImageEnhance.Contrast(image).enhance(1.09)
    image = ImageEnhance.Brightness(image).enhance(1.035)
    image = ImageEnhance.Sharpness(image).enhance(1.08).convert("RGBA")

    warm = Image.new("RGBA", image.size, (255, 179, 105, 0))
    glow_mask = Image.new("L", image.size, 0)
    glow = ImageDraw.Draw(glow_mask)
    glow.ellipse((WIDTH * .38, -HEIGHT * .68, WIDTH * 1.18, HEIGHT * .6), fill=66)
    glow_mask = glow_mask.filter(ImageFilter.GaussianBlur(120))
    warm.putalpha(glow_mask)
    image = Image.alpha_composite(image, warm)

    vignette = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(vignette)
    draw.ellipse((-WIDTH * .10, -HEIGHT * .22, WIDTH * 1.10, HEIGHT * 1.22), fill=255)
    vignette = vignette.filter(ImageFilter.GaussianBlur(100))
    edge = ImageOps.invert(vignette).point(lambda value: round(value * .22))
    shade = Image.new("RGBA", image.size, (9, 27, 30, 0))
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
    width = 650
    x1 = 62 if side == "left" else WIDTH - width - 62
    x2 = x1 + width
    y1, y2 = 58, 224
    draw.rounded_rectangle((x1, y1, x2, y2), radius=27, fill=(17, 40, 50, 205), outline=(92, 211, 194, 138), width=2)
    draw.text((x1 + 34, y1 + 30), eyebrow.upper(), font=font(17, True), fill=(151, 231, 216, 255))
    y = y1 + 70
    for line in wrap(draw, message, font(29), width - 68):
        draw.text((x1 + 34, y), line, font=font(29), fill=(252, 248, 237, 255))
        y += 36


def make_scene(source, destination, eyebrow=None, message=None, side="left"):
    image = grade(cover(source))
    if eyebrow and message:
        add_caption(image, eyebrow, message, side)
    image.convert("RGB").save(destination, quality=96)


def make_card(source, destination, eyebrow, title, body):
    background = grade(cover(source)).filter(ImageFilter.GaussianBlur(7))
    wash = Image.new("RGBA", background.size, (235, 241, 231, 176))
    image = Image.alpha_composite(background, wash)
    draw = ImageDraw.Draw(image, "RGBA")
    draw.rounded_rectangle((120, 105, 1160, 615), radius=42, fill=(251, 248, 238, 242), outline=(76, 188, 174, 160), width=2)
    draw.ellipse((590, 140, 690, 240), outline=(76, 188, 174, 178), width=4)
    draw.ellipse((606, 156, 674, 224), outline=(239, 126, 100, 105), width=11)
    items = [
        (eyebrow.upper(), 272, font(18, True), (49, 81, 86, 185), 860),
        (title, 312, font(48), (24, 54, 74, 255), 910),
        (body, 402, font(26), (49, 73, 90, 225), 820),
    ]
    for text, y, text_font, fill, max_width in items:
        for line in wrap(draw, text, text_font, max_width):
            box = draw.textbbox((0, 0), line, font=text_font)
            draw.text(((WIDTH - (box[2] - box[0])) / 2, y), line, font=text_font, fill=fill)
            y += (box[3] - box[1]) + 9
    image.convert("RGB").save(destination, quality=96)


FRAMES.mkdir(parents=True, exist_ok=True)
OUTPUT.mkdir(parents=True, exist_ok=True)

scenes = [
    ("intro", CAPTURES / "02-garden.png", 5.0, "card", "A LIVING SPACE", "The Garden Remembers", "A garden shaped by presence—not scores."),
    ("garden", CAPTURES / "02-garden.png", 6.0, "scene", "EXPLORE", "A continuous garden with no quiz and no correct route.", "left"),
    ("wallet", CAPTURES / "03-wallet-prompt.png", 7.0, "scene", "THE LOST WALLET", "The first encounter offers context without forcing a choice.", "left"),
    ("response", CAPTURES / "05-wallet-response.png", 7.0, "scene", "IMMEDIATE RESPONSE", "Each decision receives a complete physical consequence.", "left"),
    ("memory", CAPTURES / "06-delayed-memory.png", 7.0, "scene", "DELAYED MEMORY", "Color travels through water, paper, flowers, and the path.", "right"),
    ("threshold", CAPTURES / "07-threshold.png", 7.0, "scene", "THE PAPER THRESHOLD", "Listen, knock, call, or simply continue onward.", "left"),
    ("threshold-memory", CAPTURES / "09-threshold-memory.png", 6.0, "scene", "RETURNING ECHO", "The world preserves what happened without judging it.", "left"),
    ("reflection", CAPTURES / "10-reflection.png", 7.0, "scene", None, None, "left"),
    ("codex", CAPTURES / "06-delayed-memory.png", 8.0, "card", "BUILT WITH CODEX + GPT-5.6", "A tested living system", "Architecture, implementation, debugging, and 70 passing automated tests."),
    ("outro", CAPTURES / "10-reflection.png", 5.0, "card", "THE GARDEN REMEMBERS", "Your presence left a trace", "No score. No diagnosis. No correct ending."),
]

scene_files = []
durations = []
for item in scenes:
    name, source, duration, kind, *content = item
    destination = FRAMES / f"{len(scene_files):02d}-{name}.jpg"
    if kind == "card":
        make_card(source, destination, *content)
    else:
        make_scene(source, destination, *content)
    scene_files.append(destination)
    durations.append(duration)

command = [FFMPEG, "-y", "-loglevel", "error"]
for path, duration in zip(scene_files, durations):
    command.extend(["-loop", "1", "-t", str(duration), "-i", str(path)])

filters = []
for index in range(len(scene_files)):
    filters.append(f"[{index}:v]scale={WIDTH}:{HEIGHT}:flags=lanczos,fps={FPS},format=yuv420p,settb=AVTB[v{index}]")

current = "v0"
elapsed = durations[0]
for index in range(1, len(scene_files)):
    offset = elapsed - TRANSITION * index
    output = f"x{index}"
    filters.append(f"[{current}][v{index}]xfade=transition=fade:duration={TRANSITION}:offset={offset:.3f}[{output}]")
    current = output
    elapsed += durations[index]

silent = OUTPUT / "the-garden-remembers-stills-silent.mp4"
command.extend(["-filter_complex", ";".join(filters), "-map", f"[{current}]", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", str(silent)])
run(command)

total_duration = sum(durations) - TRANSITION * (len(durations) - 1)
final = OUTPUT / "the-garden-remembers-stills-demo.mp4"
run([
    FFMPEG, "-y", "-loglevel", "error", "-i", str(silent), "-i", str(OUTPUT / "narration-stills.aiff"),
    "-f", "lavfi", "-t", str(total_duration), "-i", "sine=frequency=146.83:sample_rate=44100",
    "-filter_complex", f"[1:a]volume=1.15,highpass=f=90[n];[2:a]volume=0.012,lowpass=f=500[d];[n][d]amix=inputs=2:duration=longest:dropout_transition=2,loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=out:st={max(0,total_duration-2):.2f}:d=2[a]",
    "-map", "0:v:0", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", str(total_duration), "-movflags", "+faststart", str(final),
])

print(final)
print(f"duration={total_duration:.2f}s")
