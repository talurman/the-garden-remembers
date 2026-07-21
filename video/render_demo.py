from pathlib import Path
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
CAPTURES = ROOT / "video" / "captures"
OUTPUT = ROOT / "video" / "output"
CLIPS = OUTPUT / "clips"
WIDTH, HEIGHT, FPS = 1280, 720, 30

sys.path.insert(0, str(ROOT / ".tools" / "python"))
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
CLIPS.mkdir(parents=True, exist_ok=True)

REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else REGULAR, size)


def cover(path):
    image = Image.open(path).convert("RGB")
    ratio = max(WIDTH / image.width, HEIGHT / image.height)
    image = image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)
    left = (image.width - WIDTH) // 2
    top = (image.height - HEIGHT) // 2
    return image.crop((left, top, left + WIDTH, top + HEIGHT))


def centered(draw, text, y, text_font, fill, max_width=1080, spacing=8):
    lines = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        current = ""
        for word in words:
            candidate = f"{current} {word}".strip()
            if draw.textbbox((0, 0), candidate, font=text_font)[2] <= max_width:
                current = candidate
            else:
                lines.append(current)
                current = word
        lines.append(current)
    heights = [draw.textbbox((0, 0), line, font=text_font)[3] for line in lines]
    for line, line_height in zip(lines, heights):
        box = draw.textbbox((0, 0), line, font=text_font)
        draw.text(((WIDTH - (box[2] - box[0])) / 2, y), line, font=text_font, fill=fill)
        y += line_height + spacing
    return y


def make_card(source, destination, eyebrow, title, body, accent=(73, 198, 189)):
    background = cover(source).filter(ImageFilter.GaussianBlur(10))
    wash = Image.new("RGBA", (WIDTH, HEIGHT), (237, 240, 232, 170))
    card = Image.alpha_composite(background.convert("RGBA"), wash)
    draw = ImageDraw.Draw(card, "RGBA")
    draw.rounded_rectangle((118, 92, 1162, 628), radius=42, fill=(250, 248, 239, 232), outline=(*accent, 135), width=2)
    draw.ellipse((590, 120, 690, 220), outline=(*accent, 175), width=3)
    draw.ellipse((606, 136, 674, 204), outline=(239, 128, 110, 90), width=11)
    centered(draw, eyebrow.upper(), 242, font(19, True), (49, 75, 86, 175), spacing=4)
    centered(draw, title, 282, font(48), (24, 54, 74, 255), spacing=5)
    centered(draw, body, 376, font(26), (49, 73, 90, 220), max_width=850, spacing=10)
    card.convert("RGB").save(destination, quality=95)


def run(command):
    subprocess.run(command, check=True)


def still_clip(source, destination, duration):
    frames = round(duration * FPS)
    fade_out = max(0, duration - 0.42)
    video_filter = (
        f"zoompan=z='min(zoom+0.00032,1.055)':"
        f"x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={frames}:s={WIDTH}x{HEIGHT}:fps={FPS},"
        f"fade=t=in:st=0:d=0.35,fade=t=out:st={fade_out}:d=0.4,format=yuv420p"
    )
    run([
        FFMPEG, "-y", "-loglevel", "error", "-i", str(source),
        "-vf", video_filter, "-frames:v", str(frames), "-r", str(FPS),
        "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
        str(destination),
    ])


def motion_clip(destination, duration=5):
    run([
        FFMPEG, "-y", "-loglevel", "error", "-f", "image2", "-c:v", "mjpeg", "-framerate", "9",
        "-i", str(CAPTURES / "motion-%03d.png"),
        "-vf", f"scale={WIDTH}:{HEIGHT}:flags=lanczos,fps={FPS},fade=t=in:st=0:d=0.3,fade=t=out:st={duration-.4}:d=0.4,format=yuv420p",
        "-t", str(duration), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
        str(destination),
    ])


cards = {
    "intro": (CAPTURES / "01-title.png", "A LIVING SPACE", "The Garden Remembers", "A garden that remembers your presence—without scoring or judging you."),
    "architecture": (CAPTURES / "06-delayed-memory.png", "TRACEABLE MEMORY", "The world keeps the evidence", "Factual observation  →  immediate echo\nDelayed memory  →  return recognition  →  final reflection"),
    "codex": (CAPTURES / "09-threshold-memory.png", "HOW IT WAS BUILT", "Codex + GPT-5.6", "Architecture, implementation, debugging, and release review\n68 / 68 automated tests passing"),
    "outro": (CAPTURES / "10-reflection.png", "THE GARDEN REMEMBERS", "Your presence left a trace", "No scores. No diagnosis. No correct ending."),
}

for name, (source, eyebrow, title, body) in cards.items():
    make_card(source, OUTPUT / f"slide-{name}.png", eyebrow, title, body)

scenes = [
    ("intro", OUTPUT / "slide-intro.png", 5),
    ("motion", None, 5),
    ("garden", CAPTURES / "02-garden.png", 5),
    ("wallet-prompt", CAPTURES / "03-wallet-prompt.png", 9),
    ("wallet-action", CAPTURES / "04-wallet-action.png", 7),
    ("wallet-response", CAPTURES / "05-wallet-response.png", 7),
    ("delayed-memory", CAPTURES / "06-delayed-memory.png", 9),
    ("architecture", OUTPUT / "slide-architecture.png", 12),
    ("threshold", CAPTURES / "07-threshold.png", 8),
    ("listen", CAPTURES / "08-listen.png", 6),
    ("threshold-memory", CAPTURES / "09-threshold-memory.png", 6),
    ("reflection", CAPTURES / "10-reflection.png", 7),
    ("codex", OUTPUT / "slide-codex.png", 20),
    ("outro", OUTPUT / "slide-outro.png", 7),
]

clip_paths = []
for index, (name, source, duration) in enumerate(scenes):
    clip_path = CLIPS / f"{index:02d}-{name}.mp4"
    if name == "motion":
        motion_clip(clip_path, duration)
    else:
        still_clip(source, clip_path, duration)
    clip_paths.append(clip_path)

concat_file = OUTPUT / "clips.txt"
concat_file.write_text("".join(f"file '{path.as_posix()}'\n" for path in clip_paths))
silent_video = OUTPUT / "garden-demo-silent.mp4"
run([
    FFMPEG, "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
    "-i", str(concat_file), "-c", "copy", str(silent_video),
])

final_video = OUTPUT / "the-garden-remembers-demo.mp4"
total_duration = sum(duration for _, _, duration in scenes)
run([
    FFMPEG, "-y", "-loglevel", "error", "-i", str(silent_video),
    "-i", str(OUTPUT / "narration.aiff"),
    "-f", "lavfi", "-t", str(total_duration), "-i", "sine=frequency=146.83:sample_rate=44100",
    "-filter_complex", "[1:a]volume=1.15,highpass=f=90[n];[2:a]volume=0.018,lowpass=f=500[d];[n][d]amix=inputs=2:duration=longest:dropout_transition=2,afade=t=out:st=110:d=3[a]",
    "-map", "0:v:0", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
    "-t", str(total_duration), "-movflags", "+faststart", str(final_video),
])

print(final_video)
print(f"duration={total_duration}s")
