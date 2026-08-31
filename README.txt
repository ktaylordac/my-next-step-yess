MY NEXT STEP – YESS — FINAL WORKING MASTER

11-page HTML student portal with shared styling.

Integrated:
- Kristen, YESS School Counselor
- ktdacquisto@graniteschools.org
- 385-646-1790
- Monday–Friday, 8:00 AM–3:00 PM
- Allyson, YESS Registrar
- alesuma@graniteschools.org
- 385-646-2421
- Credit Tracker form: https://forms.gle/hP7GPwFDKoMyH3q1A
- YouScience form: https://forms.gle/7qF5J5j5Rv13oeM59
- YESS website
- Granite registration information
- Fee waiver, free/reduced meals, and McKinney-Vento resources
- Utah Adult Education, GED/HSE, and Focused Graduation Pathway links

Preview: open index.html.
Hosting: upload all .html files and style.css to GitHub Pages or another static host.

Added: Utah statewide school/district directory, charter-school directory, school comparison/report cards, and Utah regional education links.

Added: YESS DSI/Gemstone, YESS Decker Lake and SLVDC, Westbrook Transition classrooms, statewide secure-care/YIC sites, and Utah RTC education/directory information.

Added: Job Corps information and current Utah center search; DCFS/foster-care education, employment, TAL, ETV, scholarship, housing/transportation, and Youth-in-Care resources.

Statewide resource audit additions: Utah Dropout Prevention/Recovery, CTE, WIOA Youth, Vocational Rehabilitation, USHE colleges/technical colleges, Utah scholarships/aid, Admit Utah, 211 Utah, McKinney-Vento, Youth-in-Care, disability transition, and education-rights/dispute resources.

Added AGENTS.md for AI coding agents. Fixed counselor phone number typo (was 365-646-1790 on some pages, correct number is 385-646-1790, now consistent everywhere). Updated all 10 remaining pages' headers to the current logo-based branding used on index.html (previously only index.html had been updated).

Code quality pass: added a mobile hamburger menu (nav.js + style.css) since the nav bar previously disappeared with no replacement below 950px width; added rel="noopener" to all 46 external target="_blank" links; added favicon.png, meta descriptions, and Open Graph tags to all 11 pages; fixed the resource card QR image having no max-width (could overflow its card) and shrank the file from 1.1MB to ~420KB.

Restored style.css: an earlier commit ("Enhanced branding") had already dropped several component styles (.stat-card, .path-card, .flow, .quote-list, .contact-grid, .checklist, details/summary accordion), and the very next commit replaced most of the rest of the file with a stripped-down version — losing .card/.link-card box styling and the section container's padding/max-width (text was touching the window edges). Rebuilt style.css from the last known-complete version (git commit 5c9a442) plus the newer resource-card-grid styling the current HTML depends on (from 5dbb971), plus this session's mobile-nav-toggle CSS. Verified all page types render correctly (cards, link-cards, stat-cards, flow diagram, quote-list, accordion, resource cards, mobile menu) before and after in a browser.
