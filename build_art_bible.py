from pathlib import Path

from PIL import Image
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parent
SHEETS = ROOT / "assets" / "art_bible" / "sheets_v3"
FRAMES = ROOT / "assets" / "art_bible" / "frames_v3"
CHARACTERS = ROOT / "assets" / "art_bible" / "characters_v1"
OUT = ROOT / "output" / "pdf" / "the-garden-remembers-art-bible-v4-wallet-encounter.pdf"

PAGE_W, PAGE_H = landscape(letter)
BG = HexColor("#F7F2E8")
PANEL = HexColor("#EBE7DC")
INK = HexColor("#17324A")
MUTED = HexColor("#657786")
SAGE = HexColor("#238A8D")
AMBER = HexColor("#E36D5B")
LINE = HexColor("#C7D3CE")


CATEGORIES = [
    {
        "slug": "lighting", "title": "LIGHTING", "number": "01",
        "thesis": "Light turns the garden into an artwork the player can physically enter.",
        "captions": ["A / Overcast morning - diffuse and cool", "B / Warm afternoon - leaf shadows and gold bounce", "C / Immersive state - coral and turquoise wrap the scene", "D / Blue hour - indigo shadow and peach horizon"],
        "do": "Use colored bounce, luminous air, readable shadows, and large changes across the journey.",
        "avoid": "Default night lighting, black backgrounds, flat exposure, small decorative glows.",
    },
    {
        "slug": "nature", "title": "NATURE", "number": "02",
        "thesis": "Nature is composed like a painting: asymmetric, spacious, seasonal, and full of framed views.",
        "captions": ["A / Ma - sparse elements and active emptiness", "B / Shakkei - the gate borrows a distant mountain", "C / Asymmetry - unequal masses held in balance", "D / Season - the canopy reshapes the path"],
        "do": "Use ma, shakkei, water, sculptural foliage, clear paths, and seasonal transformation.",
        "avoid": "Dense asset scattering, generic fantasy forest, perfect symmetry, botanical realism without composition.",
    },
    {
        "slug": "motion", "title": "MOTION", "number": "03",
        "thesis": "Motion paints through space, turning passage into a visible, graceful event.",
        "captions": ["A / Before contact - the field is still", "B / Contact - a turquoise bloom begins", "C / Propagation - coral and blue travel outward", "D / Response - the whole environment retains the color"],
        "do": "Create broad waves, flowing fields, pigment blooms, and responses that travel beyond the player.",
        "avoid": "Tiny ambient loops, isolated particles, twitchy easing, effects that stop at the interface layer.",
    },
    {
        "slug": "materials", "title": "MATERIALS", "number": "04",
        "thesis": "Materials sit between garden and artwork: natural, translucent, painted, and light-responsive.",
        "captions": ["A / Pale limestone - pores, moss, leaf shadow", "B / Translucent paper - light carried through fibers", "C / Painted plaster - mineral grain and bloom edges", "D / Shallow water - refraction over stone and ceramic"],
        "do": "Combine stone, shallow water, paper, fabric, painted plaster, and restrained iridescence.",
        "avoid": "Heavy black glass, grimy realism, uniform gloss, dark stone dominating every surface.",
    },
    {
        "slug": "camera", "title": "CAMERA", "number": "05",
        "thesis": "The player is a small traveler in a vast composition, always drawn toward a meaningful horizon.",
        "captions": ["A / Establishing wide - traveler, path, destination", "B / Eye-level threshold - gate frames the route", "C / Lateral 50 mm - silhouette against negative space", "D / Foreground layer - leaves create intimacy and depth"],
        "do": "Use clear silhouettes, human scale, distant goals, framed views, and calm lateral compositions.",
        "avoid": "Claustrophobic close-ups, unclear routes, extreme FOV, darkness used to hide the destination.",
    },
    {
        "slug": "atmosphere", "title": "ATMOSPHERE", "number": "06",
        "thesis": "Atmosphere carries color between layers and makes the garden feel larger than its boundaries.",
        "captions": ["A / Clear air - full depth and crisp distance", "B / Layered mist - foreground sharp, mountains softened", "C / Gold pollen - one visible sun shaft", "D / Dusk haze - coral and indigo aerial perspective"],
        "do": "Color the air, preserve depth, reveal distant layers, and let weather change the emotional register.",
        "avoid": "Gray fog filters, low-contrast murk, storm spectacle, atmosphere that only darkens the scene.",
    },
    {
        "slug": "ui", "title": "UI", "number": "07",
        "thesis": "The environment performs the interface through paint, petals, water, paper, and light.",
        "captions": ["A / Choice - two brushstroke paths", "B / Focus - petals acknowledge one living target", "C / Reflection - content rests on handmade paper", "D / Navigation - color moves into the stepping stones"],
        "do": "Embed guidance in the world and use minimal text only at moments of real choice.",
        "avoid": "Dark modal boxes, glass HUD panels, permanent navigation, controls separated from the artwork.",
    },
    {
        "slug": "typography", "title": "TYPOGRAPHY", "number": "08",
        "thesis": "Words behave like marks in a painting: precise, airy, and integrated with the composition.",
        "captions": ["A / Opening title - one clear scale and open field", "B / Environmental caption - quiet and right-aligned", "C / Reflection - three levels with patient rhythm", "D / Action state - short copy, directional gesture"],
        "do": "Use ink blue or warm charcoal, regular weight, generous spacing, and strong empty margins.",
        "avoid": "Glowing text, dark cards, heavy bold, dense paragraphs, typography competing with the world.",
    },
    {
        "slug": "color", "title": "COLOR", "number": "09",
        "thesis": "Color is the emotional architecture of the journey, changing the world before words explain it.",
        "captions": ["A / Opening - ivory, sage, and mist blue", "B / Discovery - turquoise water and coral bloom", "C / Transformation - vermilion canopy and gold", "D / Resolution - indigo, lilac, peach, warm points"],
        "do": "Build a clear color script with luminous neutrals and distinct emotional chapters.",
        "avoid": "One fixed palette, black as the default field, timid accents, random rainbow distribution.",
    },
    {
        "slug": "interaction", "title": "INTERACTION", "number": "10",
        "thesis": "The whole artwork responds to presence, making the player a temporary co-author of the garden.",
        "captions": ["A / Cause - traveler enters a closed field", "B / Local response - nearest flowers open", "C / Propagation - bloom reaches panels and water", "D / Persistent state - canopy and reflections retain color"],
        "do": "Let responses propagate across space, alter color, and remain visible long enough to be felt.",
        "avoid": "Button-like feedback, tiny local sparks, score rewards, interactions that leave the world unchanged.",
    },
    {
        "slug": "emotion", "title": "EMOTION", "number": "11",
        "thesis": "Emotion is a change in the world itself: scale, color, sound, and movement shift together.",
        "captions": ["A / Wonder - scale opens above the traveler", "B / Solitude - beauty held by negative space", "C / Grief - color leaves, structure remains", "D / Renewal - color returns from water to landscape"],
        "do": "Use environmental transformation and a legible arc from wonder through loss to renewal.",
        "avoid": "Threat-coded darkness, facial melodrama, horror emptiness, a permanently muted emotional tone.",
    },
    {
        "slug": "sound", "title": "SOUND", "number": "12",
        "thesis": "Sound extends through space like color: clear at the source, resonant in the garden, then slowly fading.",
        "captions": ["A / Near field - bamboo and fabric texture", "B / Contact - one step creates a colored transient", "C / Mid field - visible waterfall source and gold spray", "D / Far field - small bells and rings recede into distance"],
        "do": "Use spatial layers, musical water, wind, soft bells, long decays, and responsive tonal color.",
        "avoid": "Dark drones, constant ambience, loud UI confirmations, generic forest loops, wall-to-wall score.",
    },
]


def split_sheets():
    FRAMES.mkdir(parents=True, exist_ok=True)
    for idx, cat in enumerate(CATEGORIES, 1):
        src = SHEETS / f"{idx:02d}-{cat['slug']}.png"
        im = Image.open(src).convert("RGB")
        w, h = im.size
        gap_x = max(8, round(w * 0.008))
        gap_y = max(8, round(h * 0.014))
        boxes = [
            (4, 4, w // 2 - gap_x // 2, h // 2 - gap_y // 2),
            (w // 2 + gap_x // 2, 4, w - 4, h // 2 - gap_y // 2),
            (4, h // 2 + gap_y // 2, w // 2 - gap_x // 2, h - 4),
            (w // 2 + gap_x // 2, h // 2 + gap_y // 2, w - 4, h - 4),
        ]
        for n, box in enumerate(boxes, 1):
            crop = im.crop(box)
            crop.save(FRAMES / f"{idx:02d}-{cat['slug']}-{n}.jpg", quality=91, optimize=True)


def fit_image(c, path, x, y, w, h):
    im = Image.open(path)
    iw, ih = im.size
    scale = max(w / iw, h / ih)
    sw, sh = w / scale, h / scale
    left = (iw - sw) / 2
    top = (ih - sh) / 2
    crop = im.crop((left, top, left + sw, top + sh))
    tmp = ROOT / "tmp" / "pdfs" / f"crop-{path.stem}-{int(w)}-{int(h)}.jpg"
    tmp.parent.mkdir(parents=True, exist_ok=True)
    crop.save(tmp, quality=90)
    c.drawImage(str(tmp), x, y, w, h, preserveAspectRatio=False, mask="auto")


def contain_image(c, path, x, y, w, h):
    im = Image.open(path).convert("RGB")
    iw, ih = im.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    tmp = ROOT / "tmp" / "pdfs" / f"contain-{path.stem}.jpg"
    tmp.parent.mkdir(parents=True, exist_ok=True)
    im.save(tmp, quality=91, optimize=True)
    c.setFillColor(PANEL)
    c.rect(x, y, w, h, fill=1, stroke=0)
    c.drawImage(str(tmp), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, preserveAspectRatio=True, mask="auto")
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.rect(x, y, w, h, fill=0, stroke=1)


def text(c, value, x, y, size=10, color=INK, font="Helvetica", tracking=None):
    c.setFillColor(color)
    c.setFont(font, size)
    if tracking is None:
        c.drawString(x, y, value)
    else:
        t = c.beginText(x, y)
        t.setFont(font, size)
        t.setCharSpace(tracking)
        t.textLine(value)
        c.drawText(t)


def wrapped(c, value, x, y, max_width, size=11, leading=15, color=INK, font="Helvetica"):
    words = value.split()
    lines, current = [], ""
    for word in words:
        trial = f"{current} {word}".strip()
        if c.stringWidth(trial, font, size) <= max_width:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    for line in lines:
        text(c, line, x, y, size, color, font)
        y -= leading
    return y


def page_base(c, page_no, section=None):
    c.setFillColor(BG)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    if section:
        text(c, "THE GARDEN REMEMBERS  /  ART BIBLE", 34, PAGE_H - 27, 7.5, MUTED, tracking=1.2)
        c.setFillColor(SAGE)
        c.setFont("Helvetica", 7.5)
        c.drawRightString(PAGE_W - 34, PAGE_H - 27, section)
    text(c, f"{page_no:02d}", PAGE_W - 47, 22, 8, MUTED)


def draw_image_block(c, path, x, y, w, h, caption, label):
    fit_image(c, path, x, y, w, h)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.rect(x, y, w, h, fill=0, stroke=1)
    text(c, label, x, y - 17, 7.5, SAGE, tracking=1.2)
    wrapped(c, caption, x + 30, y - 18, w - 30, 9, 11, INK)


def cover(c):
    fit_image(c, FRAMES / "09-color-2.jpg", 0, 0, PAGE_W, PAGE_H)
    c.setFillColor(HexColor("#F7F2E8"))
    c.setFillAlpha(0.82)
    c.roundRect(38, 35, 300, 142, 12, fill=1, stroke=0)
    c.setFillAlpha(1)
    text(c, "ART BIBLE", 58, 141, 9, SAGE, "Helvetica-Bold", 2.8)
    text(c, "THE GARDEN", 58, 99, 29, INK, "Helvetica")
    text(c, "REMEMBERS", 58, 67, 29, INK, "Helvetica")
    text(c, "Specific studies  /  v4.0  /  July 2026", 58, 48, 7.8, MUTED)
    c.showPage()


def principles(c, page_no):
    page_base(c, page_no, "FOUNDATION")
    text(c, "A JOURNEY INSIDE A LIVING ARTWORK", 44, PAGE_H - 86, 23, INK)
    wrapped(c, "The garden is a luminous painting the player can enter, transform, and remember through movement.", 44, PAGE_H - 120, 500, 12, 17, MUTED)
    principles_list = [
        ("01", "COLOR IS STRUCTURE", "Each chapter of the journey changes the emotional world."),
        ("02", "THE WORLD PAINTS BACK", "Movement leaves color, light, and growth in its wake."),
        ("03", "THE PATH REVEALS VIEWS", "The garden unfolds through gates, turns, and borrowed scenery."),
        ("04", "SPACE MAKES WONDER", "Ma gives every landmark, sound, and gesture room to matter."),
    ]
    y = 330
    for n, title_, body in principles_list:
        text(c, n, 44, y + 31, 9, SAGE, "Helvetica-Bold")
        text(c, title_, 92, y + 28, 14, INK)
        wrapped(c, body, 92, y + 7, 260, 9.5, 12, MUTED)
        y -= 77
    fit_image(c, FRAMES / "11-emotion-4.jpg", 420, 50, 330, 395)
    c.showPage()


def category_pages(c, cat, idx, page_no):
    paths = [FRAMES / f"{idx:02d}-{cat['slug']}-{n}.jpg" for n in range(1, 5)]
    # Page A: thesis + two wide frames
    page_base(c, page_no, cat["title"])
    text(c, cat["number"], 42, PAGE_H - 91, 11, SAGE, "Helvetica-Bold", 1.8)
    text(c, cat["title"], 84, PAGE_H - 95, 27, INK)
    wrapped(c, cat["thesis"], 360, PAGE_H - 78, 385, 9.2, 12, MUTED)
    draw_image_block(c, paths[0], 42, 270, 708, 188, cat["captions"][0].split(" / ", 1)[-1], "A")
    draw_image_block(c, paths[1], 42, 52, 708, 188, cat["captions"][1].split(" / ", 1)[-1], "B")
    c.showPage()
    # Page B: two frames + production rules
    page_base(c, page_no + 1, cat["title"])
    draw_image_block(c, paths[2], 42, 276, 430, 242, cat["captions"][2].split(" / ", 1)[-1], "C")
    draw_image_block(c, paths[3], 42, 52, 430, 194, cat["captions"][3].split(" / ", 1)[-1], "D")
    c.setFillColor(PANEL)
    c.roundRect(505, 52, 245, 466, 10, fill=1, stroke=0)
    text(c, "PRODUCTION RULE", 528, 479, 8, SAGE, "Helvetica-Bold", 1.5)
    wrapped(c, cat["thesis"], 528, 443, 196, 14, 19, INK)
    c.setStrokeColor(LINE)
    c.line(528, 339, 724, 339)
    text(c, "DO", 528, 311, 8, SAGE, "Helvetica-Bold", 1.5)
    wrapped(c, cat["do"], 528, 285, 196, 10, 14, INK)
    text(c, "AVOID", 528, 190, 8, AMBER, "Helvetica-Bold", 1.5)
    wrapped(c, cat["avoid"], 528, 164, 196, 10, 14, MUTED)
    c.showPage()


def character_pages(c, page_no):
    before = CHARACTERS / "wallet-character-before.png"
    after = CHARACTERS / "wallet-character-after.png"
    thesis = "Characters begin as quiet silhouettes and become emotionally legible when interaction changes pose, gaze, color, and the space around them."

    page_base(c, page_no, "CHARACTERS")
    text(c, "13", 42, PAGE_H - 91, 11, SAGE, "Helvetica-Bold", 1.8)
    text(c, "CHARACTERS", 84, PAGE_H - 95, 27, INK)
    text(c, "Characters begin as quiet silhouettes and become emotionally legible when", 360, PAGE_H - 78, 8.2, MUTED)
    text(c, "interaction changes pose, gaze, color, and the space around them.", 360, PAGE_H - 91, 8.2, MUTED)
    contain_image(c, before, 42, 126, 338, 332)
    contain_image(c, after, 412, 126, 338, 332)
    text(c, "A", 42, 101, 7.5, SAGE, tracking=1.2)
    wrapped(c, "Before - closed posture, cool light, attention turned away", 72, 100, 292, 8.5, 10, INK)
    text(c, "B", 412, 101, 7.5, SAGE, tracking=1.2)
    wrapped(c, "After - open gesture, returned wallet, color held by the world", 442, 100, 292, 8.5, 10, INK)
    c.showPage()
    page_base(c, page_no + 1, "CHARACTERS")
    draw_image_block(c, before, 42, 276, 430, 242, "Pose language - a readable silhouette carries uncertainty before facial detail", "C")
    draw_image_block(c, after, 42, 52, 430, 194, "World response - turquoise water and coral paper retain the encounter", "D")
    c.setFillColor(PANEL)
    c.roundRect(505, 52, 245, 466, 10, fill=1, stroke=0)
    text(c, "PRODUCTION RULE", 528, 479, 8, SAGE, "Helvetica-Bold", 1.5)
    wrapped(c, thesis, 528, 443, 196, 14, 19, INK)
    c.setStrokeColor(LINE)
    c.line(528, 329, 724, 329)
    text(c, "DO", 528, 301, 8, SAGE, "Helvetica-Bold", 1.5)
    wrapped(c, "Preserve identity through costume and silhouette. Express change through posture, gaze, reflected color, and a response that reaches the environment.", 528, 275, 196, 10, 14, INK)
    text(c, "AVOID", 528, 169, 8, AMBER, "Helvetica-Bold", 1.5)
    wrapped(c, "Facial caricature, costume swaps, UI emotes, theatrical acting, or reactions contained only inside the character.", 528, 143, 196, 10, 14, MUTED)
    c.showPage()


def encounter_pages(c, page_no):
    before = CHARACTERS / "wallet-encounter-before.png"
    after = CHARACTERS / "wallet-encounter-after.png"
    thesis = "An encounter is a state change across the whole composition: character, object, path, water, plants, paper, props, and light respond as one system."

    page_base(c, page_no, "WALLET ENCOUNTER")
    text(c, "14", 42, PAGE_H - 91, 11, SAGE, "Helvetica-Bold", 1.8)
    text(c, "BEFORE INTERACTION", 84, PAGE_H - 95, 25, INK)
    text(c, "An encounter is a state change across the whole composition:", 84, PAGE_H - 123, 8.5, MUTED)
    text(c, "character, object, path, water, plants, paper, props, and light respond as one system.", 84, PAGE_H - 136, 8.5, MUTED)
    contain_image(c, before, 42, 84, 708, 342)
    text(c, "A", 42, 59, 7.5, SAGE, tracking=1.2)
    wrapped(c, "Closed system - still water, neutral paper, resting props, distant character, wallet as the visual cause", 72, 58, 660, 9, 11, INK)
    c.showPage()

    page_base(c, page_no + 1, "WALLET ENCOUNTER")
    text(c, "AFTER INTERACTION", 42, PAGE_H - 82, 25, INK)
    wrapped(c, "Recognition propagates from the returned wallet until every material carries a restrained trace of the encounter.", 42, PAGE_H - 112, 700, 9.2, 12, MUTED)
    contain_image(c, after, 42, 165, 708, 318)
    c.setFillColor(PANEL)
    c.roundRect(42, 42, 708, 104, 9, fill=1, stroke=0)
    text(c, "DO", 62, 118, 8, SAGE, "Helvetica-Bold", 1.5)
    text(c, "Keep the room and props fixed.", 62, 94, 8.5, INK)
    text(c, "Let water, runner, paper, plants, books,", 62, 81, 8.5, INK)
    text(c, "ceramics, pose, and light change together.", 62, 68, 8.5, INK)
    text(c, "AVOID", 405, 118, 8, AMBER, "Helvetica-Bold", 1.5)
    text(c, "Do not swap props or layout.", 405, 94, 8.5, MUTED)
    text(c, "Avoid character-only reactions, random color,", 405, 81, 8.5, MUTED)
    text(c, "isolated particles, or effects that leave no trace.", 405, 68, 8.5, MUTED)
    c.showPage()


def closing(c, page_no):
    page_base(c, page_no, "PRODUCTION COMPASS")
    text(c, "BEFORE APPROVING ANY ASSET", 44, PAGE_H - 88, 25, INK)
    checks = [
        "Does it feel like part of one continuous living artwork?",
        "Is the scene luminous, spacious, and emotionally colored?",
        "Does the composition reveal a path, horizon, or meaningful view?",
        "Can the player's presence visibly transform the environment?",
        "Are Japanese garden principles shaping space rather than decorating it?",
        "Could the interface disappear without losing the experience?",
    ]
    y = 425
    for i, check in enumerate(checks, 1):
        c.setFillColor(PANEL)
        c.roundRect(44, y - 35, 500, 49, 7, fill=1, stroke=0)
        text(c, f"{i:02d}", 62, y - 7, 9, SAGE, "Helvetica-Bold")
        text(c, check, 104, y - 9, 11, INK)
        y -= 61
    text(c, "THE GARDEN REMEMBERS", 587, 82, 12, INK)
    wrapped(c, "Luminous. Poetic. Immersive. A journey painted through space.", 587, 61, 150, 9, 12, MUTED)
    c.showPage()


def build_pdf():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    c.setTitle("The Garden Remembers - Art Bible")
    c.setAuthor("Psychological Garden Project")
    cover(c)
    principles(c, 2)
    page_no = 3
    for idx, cat in enumerate(CATEGORIES, 1):
        category_pages(c, cat, idx, page_no)
        page_no += 2
    character_pages(c, page_no)
    page_no += 2
    encounter_pages(c, page_no)
    page_no += 2
    closing(c, page_no)
    c.save()
    return OUT


if __name__ == "__main__":
    split_sheets()
    print(build_pdf())
