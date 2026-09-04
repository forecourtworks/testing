# FORECOURT WORKS LIMITED – Technical Service Work Order (Builder Test Package)

**Tagline:** *Engineering Reliability into Every Forecourt*

Temporary GitHub sandbox to verify the **builder-local** Work Order app (full hypothetical PDF test button).

**This is NOT the production work-order repository. Do not merge into production.**

## Files

| File | Purpose |
|------|--------|
| `index.html` | UI with purple Builder Test banner on Step 1 |
| `app.js` | Logic, GPS, compression, PDF, HQ submit, `previewSamplePDF` |
| `README.md` | This document |

## How to test

1. Enable GitHub Pages on this repo (Settings → Pages → Deploy from `main` / root), **or** serve locally over HTTP.
2. Open the site → first page shows **Run Full Hypothetical Work Order → Generate Test PDF**.
3. Press the button. Status runs 1/6…6/6; a full multi-page PDF downloads.

## Builder Test behaviour

- Fills realistic client/site/equipment (Ainushamsi / Pumwani / Gilbarco DISP-002)
- Auto-populates JHA, scope, findings, QC, parts
- Embeds 2 hypothetical evidence photos
- Draws lead / assist / client signatures
- Generates professional portrait A4 PDF

## Contact

Ramco Court, Gate 3B, South C · +(254) 729-002-087 · dispatcher@forecourtworks.co.ke

© Forecourt Works Limited – Test sandbox only
