"""Assemble the workout-log app: the GitHub Pages PWA folder and the single-file preview."""
import base64, json, os, shutil
from PIL import Image, ImageDraw

S = os.path.dirname(os.path.abspath(__file__)) + '/'  # this folder
SRC = S
OUT = S + 'out/tamrin/'
FONTS = S + 'fonts/'
FONT_MAP = {  # file name -> (source blob id, css weight)
    'yb-400.woff2': ('4ee0ccc7d4f5c6fc7b8de956b1ba7e84', '400'),
    'yb-600.woff2': ('81629e6f9e57f99809d90b4aa45471ee', '500 600'),
    'yb-800.woff2': ('70a245d637062db39b6ee09662a03e24', '700 800'),
    'yb-900.woff2': ('3bcd1b45cb98bd8eeac4dd7c83ac7bc9', '900'),
}

src = open(SRC + 'app.src.html', encoding='utf-8').read().replace('/*CORE*/', open(SRC+'core.js',encoding='utf-8').read())
head, body = src.split('<!--BODY-->')

def face(url, w):
    return "@font-face{font-family:'Yekan Bakh';src:url(%s) format('woff2');font-weight:%s;font-display:swap}" % (url, w)

# ---- PWA folder ----
if os.path.exists(OUT):
    shutil.rmtree(OUT)
os.makedirs(OUT)
# Private font originals stay outside Git; rebuilds can reuse the owner's
# already embedded font faces from the checked-in published index.
if all(os.path.isfile(FONTS + b + '.woff2') for b,w in FONT_MAP.values()):
    embedded = ''.join(face('data:font/woff2;base64,' + base64.b64encode(open(FONTS+b+'.woff2','rb').read()).decode(),w) for b,w in FONT_MAP.values())
else:
    import re
    published = open(os.path.join(S, '..', 'index.html'), encoding='utf-8').read()
    faces = re.findall(r"@font-face\{font-family:'Yekan Bakh';[^}]+\}", published)
    if len(faces) != 4:
        raise RuntimeError('The owner font originals or the published index with four embedded font faces are required')
    embedded = ''.join(faces)
pwa_fonts = embedded  # fonts live inside index.html; no separate font files are published
pwa_head = head.replace('/*FONTS*/', pwa_fonts)
sw_reg = """if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(reg => {
    const check = () => reg.update().catch(() => {});
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
    setInterval(check, 30 * 60 * 1000);
  }).catch(() => {});
  let hadCtrl = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadCtrl) { hadCtrl = true; return; }
    UPDATE_READY = true; renderTop();
  });
}"""
import re as _re
_ver = _re.search(r"daftar-tamrin-([\d.]+)'", open(SRC + 'sw.js').read()).group(1)
body = body.replace('/*VER*/', _ver)
pwa_body = body.replace('/*SW*/', sw_reg)
index = (
    '<!doctype html>\n<html lang="fa" dir="rtl">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    '<meta name="theme-color" content="#0D1013">\n'
    '<meta name="apple-mobile-web-app-capable" content="yes">\n'
    '<meta name="mobile-web-app-capable" content="yes">\n'
    '<meta name="apple-mobile-web-app-status-bar-style" content="black">\n'
    '<meta name="apple-mobile-web-app-title" content="دفتر تمرین">\n'
    '<link rel="manifest" href="manifest.webmanifest">\n'
    '<link rel="apple-touch-icon" href="icon-180.png">\n'
    '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}</style>\n'
    + pwa_head + '</head>\n<body>\n' + pwa_body + '\n</body>\n</html>\n'
)
open(OUT + 'index.html', 'w', encoding='utf-8').write(index)
shutil.copy(SRC + 'sw.js', OUT + 'sw.js')
manifest = {
    'name': 'دفتر تمرین', 'short_name': 'دفتر تمرین', 'lang': 'fa', 'dir': 'rtl',
    'start_url': './', 'scope': './', 'display': 'standalone',
    'background_color': '#0D1013', 'theme_color': '#0D1013',
    'icons': [
        {'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
        {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png'},
        {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'},
    ],
}
open(OUT + 'manifest.webmanifest', 'w', encoding='utf-8').write(json.dumps(manifest, ensure_ascii=False, indent=1))

# ---- icon: lime dumbbell on ink ----
N = 1024
im = Image.new('RGB', (N, N), '#0D1013')
d = ImageDraw.Draw(im)
lime = '#C5F04A'
cx, cy = N // 2, N // 2
d.rounded_rectangle((cx - 230, cy - 26, cx + 230, cy + 26), 18, fill=lime)          # bar
for sgn in (-1, 1):
    x = cx + sgn * 200
    d.rounded_rectangle((x - 36, cy - 170, x + 36, cy + 170), 30, fill=lime)      # big plate
    x2 = cx + sgn * 268
    d.rounded_rectangle((x2 - 28, cy - 110, x2 + 28, cy + 110), 24, fill=lime)    # small plate
for size, name in ((180, 'icon-180.png'), (192, 'icon-192.png'), (512, 'icon-512.png')):
    im.resize((size, size), Image.LANCZOS).save(OUT + name)

# ---- single-file preview (opens in any browser, no install, data not kept) ----
pv_fonts = embedded
preview = head.replace('/*FONTS*/', pv_fonts) + body.replace('/*SW*/', '').replace('/*PREVIEW*/false', 'true')
open(S + 'out/daftar-tamrin-preview.html', 'w', encoding='utf-8').write(preview)
print('ok', sorted(os.listdir(OUT)))
