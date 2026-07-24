# BSS 2026 workshop website

This package contains a responsive static website for the **5th International Workshop on Blockchain Security and Scalability (BSS 2026)**. The layout follows the broad visual structure of the UCC 2026 conference website: a dark conference header, a large hero, structured content sections, committee cards, strong section dividers and a conference-style footer.

## Files

- `index.html` — workshop home page
- `call-for-papers.html` — scope, topics and review criteria
- `committee.html` — organising committee and technical programme committee
- `submission.html` — author guidelines, confirmed deadlines and EDAS submission link
- `programme.html` — draft workshop programme
- `previous-editions.html` — workshop archive
- `assets/css/style.css` — all styling
- `assets/js/site.js` — mobile menu and back-to-top behaviour
- `assets/img/` — original SVG logo and hero artwork

## Preview

Open `index.html` in a modern browser. No build process or external library is required.

For a local web server, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Before publishing

1. Confirm that IEEE Blockchain 2026 has approved the workshop.
2. Add the exact workshop date when the organisers confirm it.
3. Replace the disabled EDAS buttons with the workshop submission URL.
4. Confirm the 2026 page limit, review model and proceedings arrangements.
5. Confirm every committee member, role, email address and affiliation.
6. Add official conference, IEEE, sponsor and institutional logos only when you have permission to use them.
7. Replace initial-based committee avatars with approved photographs, if desired.
8. Add archival details for the 2022–2024 editions.

## Reference pages used for the draft

- UCC 2026 organising committee layout: https://ucc2026.ufsc.br/committee/organizing-committee/
- BSS 2025 website: https://sites.google.com/view/iwbss/home
- IEEE Blockchain 2026: https://ieee-cybermatics2026.org/call-for-papers/blockchain

The custom SVG artwork in this package is original and does not copy the source websites' image assets.

- Footer affiliation logos and a first-visit cookie notice are included across all pages.
