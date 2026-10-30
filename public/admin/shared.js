// Gedeeld tussen de server (src/index.js) en de editor (public/admin/editor.js):
// lettertypen, kleuren en het opbouwen van agenda-items.

export const FONTS_KOP = {
  'Asap Condensed': "'Asap Condensed', 'Avenir Next Condensed', system-ui, sans-serif",
  'Cormorant Garamond': "'Cormorant Garamond', Georgia, serif",
  'Playfair Display': "'Playfair Display', Georgia, serif",
  'Lora': "'Lora', Georgia, serif",
  'EB Garamond': "'EB Garamond', Georgia, serif",
  'Fraunces': "'Fraunces', Georgia, serif",
};

export const FONTS_TEKST = {
  'Montserrat': "'Montserrat', system-ui, sans-serif",
  'Mulish': "'Mulish', system-ui, sans-serif",
  'Nunito Sans': "'Nunito Sans', system-ui, sans-serif",
  'Source Sans 3': "'Source Sans 3', system-ui, sans-serif",
  'Work Sans': "'Work Sans', system-ui, sans-serif",
  'Karla': "'Karla', system-ui, sans-serif",
  'Avenir': "'Avenir Next', 'Avenir', 'Nunito Sans', sans-serif",
};

export const STANDAARD_KOP = 'Playfair Display';
export const STANDAARD_TEKST = 'Montserrat';

// Al geladen door het sjabloon zelf.
const PRELOADED = new Set(['Playfair Display', 'Montserrat', 'Cormorant Garamond', 'Mulish', 'Avenir']);

export function fontLink(names) {
  const fams = names.filter((n) => n && !PRELOADED.has(n));
  if (!fams.length) return '';
  const q = fams
    .map((n) => 'family=' + n.replace(/ /g, '+') + ':ital,wght@0,400;0,500;0,600;0,700;1,400;1,500')
    .join('&');
  return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${q}&display=swap">`;
}

// Instelbare kleuren van de site. Sleutel = CSS-variabele --c-<sleutel>.
export const KLEURVELDEN = [
  { key: 'donker', label: 'Donker', uitleg: 'Knoppen, koppen, voettekst, menubalk op de telefoon', standaard: '#1F2622' },
  { key: 'creme', label: 'Crème', uitleg: 'Lichte vlakken, kaarten en tekst op donker', standaard: '#F1EEE6' },
  { key: 'accent', label: 'Accent', uitleg: 'Labels, cijfers, links en driehoekjes', standaard: '#6E5232' },
  { key: 'accent-licht', label: 'Accent licht', uitleg: 'Tweede kleur van de driehoekjes', standaard: '#A88B67' },
  { key: 'goud', label: 'Goud', uitleg: 'Labels en lijntjes op donkere vlakken', standaard: '#D2BE97' },
  { key: 'agenda', label: 'Achtergrond agenda', uitleg: 'Het donkere blok met de agenda', standaard: '#2C3530' },
  { key: 'bosgroen', label: 'Bosgroen', uitleg: 'Actief menu-onderdeel', standaard: '#2A3F2E' },
  { key: 'salie', label: 'Salie', uitleg: 'Achtergrond achter de aquarel', standaard: '#A9AE96' },
  { key: 'salie-licht', label: 'Salie licht', uitleg: 'Label "Binnenkort"', standaard: '#D9DACF' },
  { key: 'zijvlak', label: 'Zijvlak', uitleg: 'Vlak met de uitleg bij de basisbehoeften', standaard: '#E7E5DC' },
  { key: 'lijn', label: 'Lijnen', uitleg: 'Dubbele lijnen rond de vlakken bij Aanbod', standaard: '#8C7A5E' },
  { key: 'tekst-zacht', label: 'Tekst', uitleg: 'Lopende tekst op lichte vlakken', standaard: '#3A4536' },
  { key: 'tekst-licht', label: 'Tekst op donker (zacht)', uitleg: 'Kleine tekst op donkere vlakken', standaard: '#B9BDB1' },
  { key: 'tekst-licht-sterk', label: 'Tekst op donker', uitleg: 'Lopende tekst op donkere vlakken', standaard: '#E1DED5' },
];

export function kleurCSS(colors) {
  let css = '';
  for (const f of KLEURVELDEN) {
    const v = colors?.[f.key];
    if (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) && v.toUpperCase() !== f.standaard) css += `--c-${f.key}:${v};`;
  }
  return css ? `:root{${css}}` : '';
}

// Kleur van het label rechts in een agenda-item.
export const KLEUREN = {
  donker: { label: 'Goud', kleur: 'var(--c-goud)' },
  zand: { label: 'Crème', kleur: 'var(--c-creme)' },
  salie: { label: 'Grijs', kleur: 'var(--c-tekst-licht)' },
};

export const DEFAULT_AGENDA = [
  { id: 'a1', datum: '2026-11-07', groot: '7', klein: 'za', maand: 'nov', titel: 'Ruil en Deel festival', waar: 'De Verkeerstuin, Amersfoort', tekst: 'Kom langs bij de kraam van het Groeikwartier en maak kennis met de emotionele basisbehoeften.', label: 'Met het Groeikwartier', kleur: 'donker' },
  { id: 'a2', datum: '', groot: '–', klein: '', maand: 'volgt', titel: 'Thema-avond', waar: 'Soesterkwartier, Amersfoort', tekst: 'Onderwerp en spreker volgen.', label: 'Met het Groeikwartier', kleur: 'donker' },
  { id: 'a3', datum: '', groot: '–', klein: '', maand: 'volgt', titel: 'Start cursus Emotionele basisbehoeften', waar: 'Locatie volgt', tekst: 'Voor ouders en andere volwassenen rond een kind.', label: 'Cursus', kleur: 'salie' },
];

export function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Toekomstige items met datum eerst (oplopend), daarna items zonder datum in hun eigen volgorde.
// Verlopen items (datum voor vandaag) worden op de publieke site verborgen.
export function zichtbareAgenda(items, vandaag, admin) {
  const lijst = (items || []).filter((it) => admin || !it.datum || it.datum >= vandaag);
  const metDatum = lijst.filter((it) => it.datum).sort((a, b) => a.datum.localeCompare(b.datum));
  const zonder = lijst.filter((it) => !it.datum);
  return [...metDatum, ...zonder];
}

export function agendaHTML(items, vandaag, admin) {
  const lijst = zichtbareAgenda(items, vandaag, admin);
  if (!lijst.length) return '<p style="margin: 0; padding: 32px 0; border-top: 1px solid #4A554D; color: var(--c-tekst-licht)">Nieuwe data volgen binnenkort.</p>';
  return lijst
    .map((it) => {
      const k = KLEUREN[it.kleur] || KLEUREN.donker;
      const verlopen = it.datum && it.datum < vandaag;
      return `<article class="eb-agenda-item" data-id="${esc(it.id)}"${verlopen ? ' style="opacity: .45"' : ''}>
<div style="display: flex; flex-direction: column; align-items: center; gap: 6px; line-height: 1">
<span style="font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--c-tekst-licht)">${esc(it.klein)}</span>
<span class="eb-serif" style="font-size: 54px; font-weight: 500">${esc(it.groot)}</span>
<span style="font-size: 13px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--c-goud)">${esc(it.maand)}</span>
</div>
<div>
<h3 class="eb-serif" style="margin: 0 0 6px; font-size: 30px; font-weight: 600">${esc(it.titel)}</h3>
${it.waar ? `<p style="margin: 0 0 6px; font-size: 15px; color: var(--c-tekst-licht)">${esc(it.waar)}</p>` : ''}
${it.tekst ? `<p style="margin: 0; font-size: 16px; line-height: 1.6; color: var(--c-tekst-licht-sterk)">${esc(it.tekst)}</p>` : ''}
</div>
${it.label ? `<span class="eb-agenda-tag" style="justify-self: start; font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; border: 1px solid ${k.kleur}; color: ${k.kleur}; padding: 8px 14px; border-radius: 999px">${esc(it.label)}</span>` : '<span></span>'}
</article>`;
    })
    .join('\n');
}
