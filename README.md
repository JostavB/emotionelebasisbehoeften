# Centrum voor Emotionele Basisbehoeften

Website van het Centrum voor Emotionele Basisbehoeften (emotionelebasisbehoeften.nl), met een eigen editor op `/admin`. De opzet is gelijk aan die van het Groeikwartier.

## Hoe het werkt

- `src/template.html` is het ontwerp. Elk bewerkbaar stuk tekst heeft een `data-k`, elke afbeelding een `data-img`, elke link een `data-l`.
- `src/index.js` (Cloudflare Worker) bouwt bij elk bezoek de pagina op: sjabloon plus de inhoud uit KV (`emotionelebasisbehoeften-content`).
- `/admin` toont dezelfde pagina met de editor erbovenop (`public/admin/`). Teksten, tekstgrootte, lettertypen, kleuren, afbeeldingen en de agenda zijn daar aan te passen. **Publiceren** zet het meteen live; de laatste 30 versies worden bewaard en kunnen worden teruggezet.
- Inloggen gaat met Google. De server controleert het Google-token en laat alleen accounts uit `ADMIN_EMAILS` (in `wrangler.jsonc`) toe.
- De zeven basisbehoeften staan als zeven bewerkbare blokken in het sjabloon (`behoefte-1-naam` t/m `behoefte-7-...`). De namen in de lijst worden automatisch uit die blokken overgenomen.

## Ontwikkelen

```
npm install
npx wrangler dev
```

Elke push naar `main` wordt door Cloudflare automatisch gepubliceerd.

`tools/maak-sjabloon.py` is eenmalig gebruikt om het ontwerp om te zetten naar `src/template.html`.
