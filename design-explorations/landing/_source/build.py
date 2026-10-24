"""Compone ogni sezione in un HTML autonomo: token + alpwise.css + font inline + motore di animazione."""
import base64, pathlib, re, sys

HERE = pathlib.Path(__file__).parent
PROJ = pathlib.Path('/home/luca/code/alpwise-portfolio')
OUT = HERE.parent
OUT.mkdir(exist_ok=True)

tokens = (PROJ / 'src/styles/tokens.css').read_text()
def font_uri(m):
    data = base64.b64encode((PROJ / 'public' / m.group(1).lstrip('/')).read_bytes()).decode()
    return f'url("data:font/woff2;base64,{data}")'
tokens = re.sub(r'url\("(/fonts/[^"]+)"\)', font_uri, tokens)
light = re.search(r'\[data-theme="light"\] \{(.*?)\n\}', tokens, re.S).group(1)
tokens += '\n@media (prefers-color-scheme: light){:root:not([data-theme="dark"]){' + light + '}}\n'
alpwise = (PROJ / 'src/styles/alpwise.css').read_text()
shared = {n: (HERE / 'shared' / n).read_text() for n in ['motion.css', 'chrome.css', 'motion.js', 'boot.js']}

wm = (PROJ / 'src/components/alpwise/wordmark-paths.ts').read_text()
VB = [float(v) for v in re.search(r'WORDMARK_VIEWBOX = \[([^\]]+)\]', wm).group(1).split(',')]
GLYPHS = re.findall(r'\[([-\d.]+), ([-\d.]+), "([^"]+)"\]', wm)
def logo(m):
    h = float(m.group(1)); w = round(h * VB[2] / VB[3], 1)
    size = 'width="100%" style="height:auto;display:block"' if m.group(1) == '0' else f'height="{h:g}" width="{w:g}"'
    paths = ''.join(f'<path transform="translate({x} {y})" d="{d}"/>' for x, y, d in GLYPHS)
    return (f'<svg viewBox="{" ".join(f"{v:g}" for v in VB)}" {size} role="img" aria-label="Alpwise Studio" class="al-logo">'
            f'<g fill="currentColor">{paths}</g></svg>')

def mark(m):
    # Solo la A del wordmark (prima lettera), come in <Logo lockup="mark" />
    h = float(m.group(1)); w = round(h * 184 / 175, 1)
    x, y, d = GLYPHS[0]
    return (f'<svg viewBox="223 642 184 175" height="{h:g}" width="{w:g}" role="img" aria-label="Alpwise Studio" class="al-logo">'
            f'<path fill="currentColor" transform="translate({x} {y})" d="{d}"/></svg>')

PATHS = {
  'arrow-right': 'M4 12h16M14 6l6 6-6 6', 'arrow-up-right': 'M7 17L17 7M8 7h9v9', 'plus': 'M12 5v14M5 12h14', 'minus': 'M5 12h14',
  'check': 'M5 12.5l4.5 4.5L19 7.5', 'x': 'M6 6l12 12M18 6L6 18', 'menu': 'M4 8h16M4 16h16',
  'globe': 'M3 12h18M12 3a9 9 0 100 18 9 9 0 000-18zM12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
  'code': 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16', 'spark': 'M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z',
  'layers': 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5', 'mail': 'M3 5h18v14H3zM3 6l9 7 9-7', 'clock': 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  'bolt': 'M13 2L4 14h7l-1 8 9-12h-7z', 'shield': 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'chart': 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  'pin': 'M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  'user': 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1-4 4.5-6 8-6s7 2 8 6',
  'copy': 'M8 8h12v12H8zM4 16V4h12',
}
def icon(m):
    return (f'<svg viewBox="0 0 24 24" width="{m.group(2) or 20}" height="{m.group(2) or 20}" fill="none" stroke="currentColor" stroke-width="1.5" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{PATHS[m.group(1)]}"/></svg>')

NAV = '''<header class="al-nav {cls}">
  <a href="#" aria-label="Alpwise Studio, home" style="display:inline-flex;color:inherit">{{LOGO:22}}</a>
  <nav aria-label="Principale"><ul class="al-nav-links">
    <li><a class="al-nav-item" href="#">Servizi</a></li><li><a class="al-nav-item" href="#">Metodo</a></li>
    <li><a class="al-nav-item" href="#">Lavori</a></li><li><a class="al-nav-item" href="#">Studio</a></li></ul></nav>
  <div style="display:flex;gap:var(--space-2);align-items:center">
    <a class="al-btn al-btn-primary al-btn-sm al-nav-cta" href="#">Inizia un progetto</a>
    <button class="al-icon-btn al-nav-menu" type="button" aria-label="Apri menu">{{ICON:menu:16}}</button>
  </div>
</header>'''

def build(src):
    text = src.read_text()
    meta = dict(re.findall(r'(\w+)="([^"]*)"', re.match(r'<!--(.*?)-->', text, re.S).group(1)))
    body = text.split('-->', 1)[1]
    body = re.sub(r'\{\{NAV:?(\w*)\}\}', lambda m: NAV.replace('{cls}', 'al-nav-clear' if m.group(1) == 'clear' else ''), body)
    body = re.sub(r'\{\{LOGO:(\d+)\}\}', logo, body)
    body = re.sub(r'\{\{MARK:(\d+)\}\}', mark, body)
    body = re.sub(r'\{\{ICON:([\w-]+):?(\d*)\}\}', icon, body)
    html = f'''<meta charset="utf-8">
<title>{meta["title"]}</title>
<meta name="description" content="{meta.get("desc", "")}">
<style>{tokens}
{alpwise}
{shared["motion.css"]}
{shared["chrome.css"]}</style>
<header class="x-bar">
  <div class="x-title"><span class="al-mono">Landing/ {meta["num"]}</span><b>{meta["label"]}</b></div>
  <div class="x-seg" role="tablist" aria-label="Varianti" id="x-tabs"></div>
  <div class="x-tools">
    <div class="x-seg" role="group" aria-label="Tema"><button type="button" data-theme-set="dark">Scuro</button><button type="button" data-theme-set="light">Chiaro</button></div>
    <button class="al-btn al-btn-outline al-btn-sm" id="x-replay" type="button">Riproduci <span class="al-arr" aria-hidden="true">↻</span></button>
  </div>
</header>
<script>{shared["motion.js"]}</script>
<main>
{body}
</main>
<script>{shared["boot.js"]}</script>
'''
    (OUT / src.name).write_text(html)
    print(src.name, len(html) // 1024, 'KB')

for s in sorted((HERE / 'src').glob(sys.argv[1] if len(sys.argv) > 1 else '*.html')):
    build(s)
