from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, features


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "assets" / "art_bible" / "sheets_v3" / "08-typography.png"
W, H = 1664, 936
G = 10
INK = "#17324A"
MUTED = "#657786"
TEAL = "#238A8D"
CORAL = "#E36D5B"
IVORY = "#F7F2E8"
PAPER = "#EEE9DD"
HEBREW = "/System/Library/Fonts/SFHebrew.ttf"
LATIN = "/System/Library/Fonts/Supplemental/Arial.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def rtl(draw, xy, value, fnt, fill=INK, anchor="ra"):
    kwargs = {"font": fnt, "fill": fill, "anchor": anchor}
    if features.check_feature("raqm"):
        kwargs["direction"] = "rtl"
        draw.text(xy, value, **kwargs)
    else:
        draw.text(xy, value[::-1], **kwargs)


def panel(img, box, fill):
    ImageDraw.Draw(img).rectangle(box, fill=fill)


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    im = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(im, "RGBA")
    boxes = [
        (0, 0, W // 2 - G // 2, H // 2 - G // 2),
        (W // 2 + G // 2, 0, W, H // 2 - G // 2),
        (0, H // 2 + G // 2, W // 2 - G // 2, H),
        (W // 2 + G // 2, H // 2 + G // 2, W, H),
    ]
    for b in boxes:
        panel(im, b, IVORY)

    # A — title / opening state
    x0, y0, x1, y1 = boxes[0]
    d.ellipse((x0 + 70, y0 + 48, x0 + 395, y0 + 373), fill=(95, 188, 185, 42))
    d.ellipse((x0 + 165, y0 + 110, x0 + 510, y0 + 455), fill=(227, 109, 91, 30))
    rtl(d, (x1 - 68, y0 + 185), "הגן זוכר", font(HEBREW, 74))
    rtl(d, (x1 - 68, y0 + 257), "מסע בתוך יצירת אמנות חיה", font(HEBREW, 25), MUTED)
    d.text((x1 - 250, y0 + 326), "OPENING TITLE", font=font(LATIN, 15), fill=TEAL, anchor="ra")

    # B — quiet caption integrated with a view
    x0, y0, x1, y1 = boxes[1]
    d.rectangle((x0 + 60, y0 + 62, x1 - 60, y1 - 62), fill=(224, 234, 226, 255))
    d.arc((x0 + 130, y0 + 75, x0 + 520, y0 + 465), 205, 335, fill=(35, 138, 141, 150), width=4)
    rtl(d, (x1 - 88, y0 + 160), "אין כאן דרך נכונה.", font(HEBREW, 34))
    rtl(d, (x1 - 88, y0 + 210), "רק מקום ללכת בו.", font(HEBREW, 27), MUTED)
    d.line((x1 - 380, y0 + 265, x1 - 88, y0 + 265), fill=(35, 138, 141, 160), width=2)
    d.text((x1 - 88, y0 + 315), "ENVIRONMENTAL CAPTION", font=font(LATIN, 14), fill=TEAL, anchor="ra")

    # C — reflection rhythm
    x0, y0, x1, y1 = boxes[2]
    d.rounded_rectangle((x0 + 88, y0 + 60, x1 - 88, y1 - 60), radius=24, fill=(255, 255, 255, 175), outline=(199, 211, 206, 255), width=2)
    rtl(d, (x1 - 125, y0 + 135), "הגן לא שאל דבר", font(HEBREW, 31), MUTED)
    rtl(d, (x1 - 125, y0 + 211), "אבל הוא שם לב", font(HEBREW, 54), INK)
    rtl(d, (x1 - 125, y0 + 286), "עקבות שנשארו בדרך", font(HEBREW, 25), TEAL)
    d.ellipse((x0 + 120, y0 + 295, x0 + 150, y0 + 325), outline=(227, 109, 91, 190), width=3)

    # D — wayfinding / action state
    x0, y0, x1, y1 = boxes[3]
    for i, color in enumerate(((98, 176, 181, 130), (237, 167, 104, 125), (227, 109, 91, 120))):
        d.ellipse((x0 + 70 + i * 145, y0 + 165, x0 + 230 + i * 145, y0 + 325), fill=color)
    rtl(d, (x1 - 84, y0 + 135), "להיכנס", font(HEBREW, 46), INK)
    rtl(d, (x1 - 84, y0 + 196), "הפעולה קצרה. העולם עושה את השאר.", font(HEBREW, 23), MUTED)
    d.line((x1 - 250, y0 + 270, x1 - 92, y0 + 270), fill=(23, 50, 74, 190), width=3)
    d.polygon(((x1 - 92, y0 + 270), (x1 - 112, y0 + 258), (x1 - 112, y0 + 282)), fill=(23, 50, 74, 190))

    im.save(OUT, quality=95)
    print(OUT)


if __name__ == "__main__":
    build()
