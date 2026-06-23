import os
import random
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

random.seed(7)

OUT = "/home/claude/apertura-club/public/images"
GALLERY = os.path.join(OUT, "gallery")
EQUIP = os.path.join(OUT, "equipment")
os.makedirs(GALLERY, exist_ok=True)
os.makedirs(EQUIP, exist_ok=True)

# Category-based color grading (subtle, photographic, not cartoonish)
PALETTES = {
    "portrait": [(58, 47, 54), (120, 92, 92), (199, 164, 144), (232, 210, 190)],
    "nature":   [(22, 41, 34), (35, 77, 58), (97, 130, 76), (193, 201, 140)],
    "campus":   [(33, 38, 48), (61, 73, 92), (120, 132, 148), (210, 213, 214)],
    "events":   [(40, 26, 41), (94, 42, 74), (181, 92, 92), (231, 178, 120)],
    "hero":     [(15, 18, 26), (32, 41, 58), (55, 74, 99), (98, 120, 140)],
}

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i]-a[i])*t) for i in range(3))

def make_gradient(w, h, c1, c2, angle=35):
    base = Image.new("RGB", (w, h), c1)
    top = Image.new("RGB", (w, h), c2)
    mask = Image.new("L", (w, h))
    rad = math.radians(angle)
    dx, dy = math.cos(rad), math.sin(rad)
    diag = abs(dx*w) + abs(dy*h)
    px = mask.load()
    for y in range(h):
        for x in range(0, w, 2):
            proj = (x*dx + y*dy) / diag
            v = max(0, min(255, int(proj*255)))
            px[x, y] = v
            if x+1 < w:
                px[x+1, y] = v
    mask = mask.resize((w, h))
    return Image.composite(top, base, mask)

def add_vignette(img, strength=0.55):
    w, h = img.size
    vignette = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(vignette)
    max_r = math.hypot(w/2, h/2)
    steps = 80
    for i in range(steps, 0, -1):
        r = max_r * i / steps
        val = int(255 * (1 - (i/steps)) * strength)
        bbox = [w/2 - r, h/2 - r, w/2 + r, h/2 + r]
        draw.ellipse(bbox, fill=val)
    vignette = vignette.filter(ImageFilter.GaussianBlur(40))
    black = Image.new("RGB", (w, h), (0, 0, 0))
    return Image.composite(img, black, Image.eval(vignette, lambda p: 255 - p))

def add_grain(img, amount=10):
    w, h = img.size
    noise = Image.effect_noise((w, h), amount).convert("L")
    noise_rgb = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(img, noise_rgb, 0.04)

def add_soft_shapes(img, palette, n=5):
    w, h = img.size
    overlay = Image.new("RGB", (w, h), (0,0,0))
    overlay.paste(img, (0,0))
    draw_layer = Image.new("RGBA", (w, h), (0,0,0,0))
    draw = ImageDraw.Draw(draw_layer)
    for _ in range(n):
        c = random.choice(palette)
        cx, cy = random.randint(0, w), random.randint(0, h)
        r = random.randint(int(min(w,h)*0.2), int(min(w,h)*0.55))
        alpha = random.randint(18, 38)
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(c[0], c[1], c[2], alpha))
    draw_layer = draw_layer.filter(ImageFilter.GaussianBlur(min(w,h)//6))
    overlay = Image.alpha_composite(overlay.convert("RGBA"), draw_layer).convert("RGB")
    return overlay

def make_placeholder(path, w, h, category, label=""):
    palette = PALETTES[category]
    c1, c2 = random.sample(palette, 2)
    angle = random.choice([20, 35, 50, 65, 110, 145])
    img = make_gradient(w, h, c1, c2, angle)
    img = add_soft_shapes(img, palette, n=4)
    img = img.filter(ImageFilter.GaussianBlur(2))
    img = add_vignette(img, strength=0.45)
    img = add_grain(img, amount=14)
    img = img.filter(ImageFilter.SMOOTH_MORE)
    img.save(path, "JPEG", quality=82)

# Gallery images: vary aspect ratios for masonry richness
specs = [
    ("portrait-1", "portrait", 900, 1200),
    ("portrait-2", "portrait", 900, 1050),
    ("portrait-3", "portrait", 900, 1300),
    ("portrait-4", "portrait", 900, 1000),
    ("portrait-5", "portrait", 900, 1150),
    ("nature-1", "nature", 900, 700),
    ("nature-2", "nature", 900, 1100),
    ("nature-3", "nature", 900, 950),
    ("nature-4", "nature", 900, 1250),
    ("nature-5", "nature", 900, 650),
    ("campus-1", "campus", 900, 1000),
    ("campus-2", "campus", 900, 1200),
    ("campus-3", "campus", 900, 750),
    ("campus-4", "campus", 900, 1100),
    ("campus-5", "campus", 900, 950),
    ("events-1", "events", 900, 1150),
    ("events-2", "events", 900, 800),
    ("events-3", "events", 900, 1250),
    ("events-4", "events", 900, 1000),
    ("events-5", "events", 900, 700),
]

for name, cat, w, h in specs:
    make_placeholder(os.path.join(GALLERY, f"{name}.jpg"), w, h, cat)

# Hero background — wide cinematic
make_placeholder(os.path.join(GALLERY, "hero-bg.jpg"), 2200, 1300, "hero")

# Featured set (reuse a curated subset, regenerate a few wide ones)
make_placeholder(os.path.join(GALLERY, "featured-1.jpg"), 1200, 1500, "portrait")
make_placeholder(os.path.join(GALLERY, "featured-2.jpg"), 1400, 1000, "nature")
make_placeholder(os.path.join(GALLERY, "featured-3.jpg"), 1200, 1400, "campus")
make_placeholder(os.path.join(GALLERY, "featured-4.jpg"), 1400, 1050, "events")
make_placeholder(os.path.join(GALLERY, "featured-5.jpg"), 1200, 1500, "nature")
make_placeholder(os.path.join(GALLERY, "featured-6.jpg"), 1400, 1000, "portrait")

# Equipment images: cleaner, more neutral product-style backgrounds
EQUIP_PALETTE = [(235, 236, 238), (220, 222, 226), (205, 208, 213), (244, 245, 246)]

def make_equipment_bg(path, w, h):
    img = make_gradient(w, h, EQUIP_PALETTE[0], EQUIP_PALETTE[2], angle=100)
    img = add_grain(img, amount=6)
    img.save(path, "JPEG", quality=85)

for i in range(1, 6):
    make_equipment_bg(os.path.join(EQUIP, f"camera-{i}.jpg"), 800, 800)

print("done")
