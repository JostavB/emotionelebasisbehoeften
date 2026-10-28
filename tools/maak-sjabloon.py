# Eenmalig: maakt van de ontwerp-HTML (optie B) een sjabloon met bewerkbare velden.
# Gebruik: python3 tools/maak-sjabloon.py <ontwerp.html>  -> schrijft src/template.html
import re, sys

src = open(sys.argv[1], encoding='utf-8').read()
s = src

def rep(old, new, count=1):
    global s
    n = s.count(old)
    if n < count:
        sys.exit(f'niet gevonden ({n}x): {old[:90]}')
    s = s.replace(old, new, count)

# ---------- kleuren naar variabelen ----------
KLEUR = {
    '#1F2622': 'donker', '#F1EEE6': 'creme', '#6E5232': 'accent', '#D2BE97': 'goud',
    '#3A4536': 'tekst-zacht', '#B9BDB1': 'tekst-licht', '#E1DED5': 'tekst-licht-sterk',
    '#8C7A5E': 'lijn', '#2A3F2E': 'bosgroen', '#2C3530': 'agenda', '#E7E5DC': 'zijvlak',
    '#A9AE96': 'salie', '#D9DACF': 'salie-licht', '#A88B67': 'accent-licht',
}
def kleuren_in(block):
    for hx, name in KLEUR.items():
        block = re.sub(re.escape(hx), f'var(--c-{name})', block, flags=re.I)
    block = re.sub(r'rgba\(241,238,230,\s*(\.\d+|0|1)\)', lambda m: f'color-mix(in srgb, var(--c-creme) {round(float(m.group(1))*100)}%, transparent)', block)
    block = re.sub(r'rgba\(31,38,34,\s*(\.\d+)\)', lambda m: f'color-mix(in srgb, var(--c-donker) {round(float(m.group(1))*100)}%, transparent)', block)
    block = re.sub(r'rgba\(210,190,151,\s*(\.\d+)\)', lambda m: f'color-mix(in srgb, var(--c-goud) {round(float(m.group(1))*100)}%, transparent)', block)
    return block
s = re.sub(r'<style>(.*?)</style>', lambda m: '<style>' + kleuren_in(m.group(1)) + '</style>', s, flags=re.S)
s = re.sub(r'style="([^"]*)"', lambda m: 'style="' + kleuren_in(m.group(1)) + '"', s)
s = re.sub(r'(stroke|fill)="(#[0-9A-Fa-f]{6})"', lambda m: f'{m.group(1)}="currentColor" style="color: var(--c-{KLEUR[m.group(2).upper()]})"' if m.group(2).upper() in KLEUR else m.group(0), s)

# lettertypen als variabelen
s = s.replace("'Cormorant Garamond',Georgia,serif", 'var(--font-kop)').replace("'Cormorant Garamond', Georgia, serif", 'var(--font-kop)')
s = s.replace("'Mulish',system-ui,sans-serif", 'var(--font-tekst)').replace("'Mulish', system-ui, sans-serif", 'var(--font-tekst)')

kleurvars = ';'.join(f'--c-{n}:{h}' for h, n in KLEUR.items())
rep('<style>', '<style>\n:root{' + kleurvars + ";--font-kop:'Cormorant Garamond',Georgia,serif;--font-tekst:'Mulish',system-ui,sans-serif}\n[data-k]{zoom:var(--fs,1)}\n.eb-agenda-item:last-child{border-bottom:1px solid var(--c-agenda-lijn,#4A554D)}\n.zp-detail[hidden]{display:none}\nhtml[data-admin] .eb-sticky{top:var(--gk-bar-h,56px)}\nhtml[data-admin] .eb-bottomnav{display:none}\n", 1)

# afbeeldingen: absolute paden
for f in ['logo-badge.webp', 'hero-aquarel.jpg', 'hero-aquarel-mobiel.jpg', 'papier.png']:
    s = re.sub(r'(?<![/\w-])' + re.escape(f), '/' + f, s)
rep('<img class="eb-logo" src="/logo-badge.webp"', '<img class="eb-logo" data-img="logo" src="/logo-badge.webp"')

# ---------- de zeven: zeven bewerkbare uitlegblokken ----------
i = s.index('<div class="zp-side"'); j = s.index('<div class="zp-row"', i)
side = s[i:j]
tris = re.search(r'<svg class="zp-tris.*?</svg>', side, re.S).group(0)
src_p = re.search(r'<p class="zv-src">.*?</p>', side, re.S).group(0)
js = src[src.index('var N=['):]
N = __import__('json').loads(re.search(r'var N=(\[.*?\]), sel=0', js).group(1))
blocks = []
for n, it in enumerate(N, 1):
    blocks.append(
        f'<div class="zp-detail" data-detail="{n}"{"" if n == 1 else " hidden"}>\n'
        f'<h3 class="zv-name" data-k="behoefte-{n}-naam">{it["name"]}</h3>\n'
        f'<p class="zv-text" data-k="behoefte-{n}-tekst">{it["text"]}</p>\n'
        f'<p class="zv-sub" data-k="behoefte-{n}-sub">Wat volwassenen kunnen doen</p>\n'
        f'<p class="zv-adult" data-k="behoefte-{n}-volwassenen">{it["adult"]}</p>\n'
        + (f'<p class="zv-note" data-k="behoefte-{n}-noot">Deze behoefte is theoretisch voorgesteld (Arntz e.a., 2021) en nog niet empirisch getoetst.</p>\n' if it['theory'] else '')
        + '</div>')
new_side = ('<div class="zp-side" aria-live="polite">\n' + tris.replace('id="zp-tris"', 'id="zp-tris"') + '\n'
            + '\n'.join(blocks) + '\n' + src_p.replace('<p class="zv-src">', '<p class="zv-src" data-k="behoeften-bron">') + '\n</div>\n')
s = s[:i] + new_side + s[j:]

# ---------- agenda: door de server gevuld ----------
i = s.index('<article class="eb-agenda-item"'); j = s.rindex('</article>') + len('</article>')
s = s[:i] + '<div data-agenda></div>' + s[j:]

# ---------- links ----------
rep('<a href="mailto:emotionelebasisbehoeften@gmail.com"', '<a data-l="link-mail" href="mailto:emotionelebasisbehoeften@gmail.com"')
rep('<a href="https://emotionelebasisbehoeften.nl"', '<a data-l="link-website" href="https://emotionelebasisbehoeften.nl"')
rep('<a href="https://www.instagram.com/emotionelebasisbehoeften/"', '<a data-l="link-instagram" href="https://www.instagram.com/emotionelebasisbehoeften/"')
rep('<a href="#linkedin-link-volgt"', '<a data-l="link-linkedin" href="#linkedin-link-volgt"')
s = s.replace('<a href="#substack-link-volgt"', '<a data-l="link-substack" href="#substack-link-volgt"')
rep('<a href="#privacy-link-volgt"', '<a data-l="link-privacy" href="#privacy-link-volgt"')

# foto bij Over
i = s.index('<div class="eb-photo"'); j = s.index('</div>', i) + len('</div>')
blk = s[i:j]
blk = blk.replace('<div class="eb-photo"', '<div class="eb-photo" data-img="foto-josta" data-ph', 1)
s = s[:i] + blk + s[j:]

# ---------- tekstvelden ----------
body0 = s.index('<body>')
skip_ranges = []
for start_pat, end_pat in [('<div class="eb-sticky"', '</div>'), ('<div class="eb-topnav"', '</nav>'), ('<div class="zp-row"', '</div>'),
                           ('<nav class="eb-bottomnav"', '</nav>'), ('<div class="zp-side"', '<p class="zv-src"'), ('<div class="eb-photo"', '</div>')]:
    for m in re.finditer(re.escape(start_pat), s):
        skip_ranges.append((m.start(), s.index(end_pat, m.start())))
def skipped(p): return any(a <= p < b for a, b in skip_ranges)

sect = 'pagina'; counters = {}
out = [s[:body0]]; pos = body0
tagpat = re.compile(r'<(p|h1|h2|h3|span|a|strong)(\s[^>]*)?>|<(header|section|footer)\b[^>]*?(?:id|aria-labelledby)="([^"]+)"', re.S)
for m in tagpat.finditer(s, body0):
    if m.group(3):
        sect = {'home': 'hero', 'kern-titel': 'fundament'}.get(m.group(4), m.group(4)); continue
    tag, attrs = m.group(1), m.group(2) or ''
    if skipped(m.start()) or 'data-k=' in attrs or 'eb-name' in attrs or 'aria-hidden' in attrs: continue
    if tag == 'strong': continue
    close = s.index(f'</{tag}>', m.end())
    inner = s[m.end():close]
    if re.search(r'<(?!/?(strong|em|br|b|i)\b)', inner) or not inner.strip(): continue
    # geen tekstveld binnen een ander tekstveld
    counters[sect] = counters.get(sect, 0) + 1
    key = f'{sect}-{counters[sect]}'
    out.append(s[pos:m.start()]); out.append(f'<{tag} data-k="{key}"{attrs}>'); pos = m.end()
out.append(s[pos:]); s = ''.join(out)

# ---------- script: zeven basisbehoeften ----------
a = s.index("var N=["); b = s.index('/* menu: naar het kopje')
s = s[:a] + '''var sel=0;
var items=Array.prototype.slice.call(document.querySelectorAll('[data-need]'));
var details=Array.prototype.slice.call(document.querySelectorAll('[data-detail]'));
function naam(n){var el=document.querySelector('[data-k="behoefte-'+n+'-naam"]');return el?el.textContent.trim():'';}
function labels(){items.forEach(function(b,i){var v=b.querySelector('.zp-v'); if(v) v.textContent=naam(i+1);});}
function select(i){
  sel=(i+7)%7;
  items.forEach(function(b){var on=+b.getAttribute('data-need')===sel; b.classList.toggle('is-on',on); b.setAttribute('aria-pressed',on?'true':'false');});
  details.forEach(function(d){d.hidden=+d.getAttribute('data-detail')!==sel+1;});
  var t=document.getElementById('zp-tris'); if(t){t.setAttribute('class','zp-tris f'+(sel+1)); t.setAttribute('aria-label','Behoefte '+(sel+1)+' van 7');}
}
items.forEach(function(b){b.addEventListener('click',function(){select(+b.getAttribute('data-need'));});});
labels(); select(0);
document.addEventListener('input',function(e){if(e.target.closest&&e.target.closest('.zv-name')) labels();});
''' + s[b:]

open('src/template.html', 'w', encoding='utf-8').write(s)
keys = re.findall(r'data-k="([^"]+)"', s)
dups = {k for k in keys if keys.count(k) > 1}
print(len(keys), 'tekstvelden', 'dubbel:', dups)
print(' '.join(keys))
