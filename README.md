# FORECOURT WORKS LIMITED – Technical Service Work Order

**Tagline:** *Engineering Reliability into Every Forecourt*

First-line operational document for inspection and maintenance work. Complements specialised inspection checklists (dispensers, generators/ATS, canopy/signage, compressed air, fuel storage & piping).

## Visual System

- Navy `#0d478c` / accent `#d9730d`
- Sticky header, progress bar, step cards
- Inter font, uppercase navy labels
- Touch/stylus signatures (SignaturePad)
- Portrait A4 PDF – dual border, logo on every page, controlled-document footers

## Features

- Mobile-optimised inputs (16 px font, touch-action, keyboard reliably opens)
- Calendar & clock pickers
- **GPS multi-tier**: precise → approximate → manual (placeholder: Town, Main Highway, Street / Landmark)
- Smart auto-population by Work Type + Equipment Category
- Photos compressed to **200–500 KB**, 1920×1080 / 1280×720 JPEG
- Signatures constrained to **10–50 KB**, 400×200 / 600×300 PNG (transparency preferred)
- Lead tech, assist tech & client signatures
- Mandatory-field validation with red highlight + toast warnings
- Draft save (localStorage + JSON download)
- Professional PDF + Web Share
- HQ submission with offline queue and auto-sync

## Parts (A–I)

A Job & Equipment · B JHA · C Scope · D Work Done · E QC Tests · F Spare Parts · G Recommendations · H Final Status & Photos · I Signatures · Review & PDF

## GPS Behaviour

1. **Precise** – `enableHighAccuracy: true` (device GPS / fused sensors)
2. **Approximate** – network/cell if precise fails
3. **Manual** – user enters “Town, Main Highway, Street / Landmark”

Reverse geocode via Nominatim when coordinates are obtained.

## Photo & Signature Limits

| Asset | Size | Dimensions | Format |
|-------|------|------------|--------|
| Equipment photo | 200–500 KB | 1920×1080 or 1280×720 | JPEG |
| Signature | 10–50 KB | 400×200 or 600×300 | PNG (transparency) / JPEG fallback |

Photos in the PDF use a **fixed 90 mm × 70 mm bounding box** (contain behaviour) in a two-column layout: photo left, caption/meta right. This prevents stretching, cropping, or full-page takeover.

## HQ Submission

POST structured JSON (version 2) to `https://submit.forecourtworks.co.ke/receiver.php`.
Offline payloads queue in `localStorage` (`forecourt_offline_queue`) and auto-sync on reconnect.

## Files (production package)

| File | Purpose |
|------|---------|
| `index.html` | UI – **no** builder preview button |
| `app.js` | Logic, GPS, compression, PDF, HQ submit |
| `README.md` | This document |

## Local builder-only file

**This builder-local package** includes a purple **Builder Test** banner on the first page (Step 1).

Press **Run Full Hypothetical Work Order → Generate Test PDF** to:
1. Auto-fill a complete realistic job (Ainushamsi / Pumwani / Gilbarco DISP-002)
2. Populate JHA, scope, findings, QC, parts, recommendations
3. Embed two hypothetical evidence photos
4. Draw lead tech, assist, and client signatures
5. Generate and download the full multi-page professional PDF

Use this to verify PDF layout before publishing the production package (which has no test button).

**Do not publish this builder-local package to the public repository.**

## How to Use (Field)

1. Serve over **HTTPS** (GPS, camera, Web Share).
2. Complete steps 1–10; confirm each section. Missing mandatory fields show red borders and block progress.
3. Capture signatures → Generate Professional PDF → Share for site handover.
4. **Submit Work Order to HQ** (online or queued offline).

## Field Testing Checklist

- [ ] Text inputs open the device keyboard (Android Chrome / iOS Safari)
- [ ] Dropdowns and checkboxes respond to touch
- [ ] GPS: precise → approximate → manual fallback
- [ ] Missing required fields highlight red and show toast when Next/Confirm is pressed
- [ ] Photos compress into 200–500 KB range
- [ ] Signatures export within 10–50 KB
- [ ] PDF is portrait A4; photos sit in fixed boxes without stretching
- [ ] Submit online succeeds; airplane mode queues and syncs on reconnect

## Contact

Ramco Court, Gate 3B, South C · +(254) 729-002-087 · dispatcher@forecourtworks.co.ke

© Forecourt Works Limited – Controlled Document System
