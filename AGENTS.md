# AGENTS.md

Guidance for any AI coding agent (Claude Code, Codex, Kiro, Cursor, etc.) working in this repo.
This site is maintained almost entirely by AI agents — there is no build process and no
human review step by default, so correctness and consistency checks that a team would
normally catch in code review need to happen here instead.

## What this is

"My Next Step – YESS" is an 11-page static HTML student resource portal for YESS
(Youth Educational Support School), a Granite School District program. It helps students
in transition (changing schools, waiting for placement, behind on credits, etc.) find
next steps, contacts, and resources. See `README.txt` for the running changelog of what's
been added.

The audience is students who may be in crisis or unstable situations. Accuracy of contact
info, phone numbers, form links, and resource details is not cosmetic — a wrong number or
dead link is a real failure for a real student, not just a bug.

## Stack and build

- Plain HTML + one shared `style.css`. No framework, no bundler, no package.json, no build step.
- Hosted on GitHub Pages directly from this repo (no `.github/workflows`, no `CNAME`, no
  `.nojekyll` — just static files served as-is). Pushing to the default branch is the deploy.
- "Preview" = open the `.html` file directly in a browser. There is no dev server.
- No test suite. Verification is manual: open the page, check links, check the console.

## Shared structure — every page follows this shape

```html
<!doctype html><html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Page Name | My Next Step – YESS</title>
<link rel="stylesheet" href="style.css">
</head><body>
<header>...nav, see below...</header>
<main>
  <div class="page-hero">...</div>   <!-- inner pages -->
  <section>...</section>
  ...
</main>
<footer>...footer, see below...</footer>
</body></html>
```

- `index.html` is the only page written pretty-printed/multi-line; every other page is
  written as dense single-line HTML. Match whichever style the file you're editing already
  uses — don't reformat a whole file as a drive-by change.
- There is no templating and no includes. The header and footer are copy-pasted into all
  11 files. **If you change the header or footer, you must update it in all 11 `.html`
  files, not just the one you're working on.** This has drifted before (see below) —
  after any header/footer/nav change, run something like:
  `grep -c "brand-logo" *.html` or diff the header block across files to confirm all
  pages still match before finishing.
- Canonical header markup (logo + nav) lives in `index.html` — treat it as the reference
  implementation. Every page's nav must:
  - List all 10 top-level pages in the same order.
  - Mark the current page's link `class="active" aria-current="page"`.
  - Keep the last nav item as the `help-btn`-styled link to `help.html`
    (on `help.html` itself, that link is `class="active help-btn" aria-current="page"`).
- Footer nav links are plain (no active-state styling) and identical across all pages.

## Content and data conventions

- Contact info (counselor, registrar, phone numbers, emails, form URLs) appears in
  multiple pages redundantly (`index.html`, `help.html`, `records.html`, `README.txt`).
  There is no single source of truth — when you update a phone number, email, or form
  link, grep for the old value across `*.html` and `README.txt` and update every hit.
  This has been a real source of bugs (a digit-swapped phone number was live on one page
  while three other places had the correct one).
- Google Form links (credit tracker request, YouScience info request) are placeholders
  the counselor manages — don't regenerate or guess new ones; only change them if
  explicitly given a new URL.
- `resources.html` contains bracketed placeholder text like `[Add local youth housing
  resources]` — these are intentionally unfilled sections waiting for real local resource
  info, not broken content to "fix" by inventing plausible-sounding resources. Only replace
  a placeholder with real, verifiable information (a real org, address, phone number, or
  link), and prefer Utah/Granite-district-specific sources given the audience.
- Keep the reading level and tone of copy consistent with existing pages: short sentences,
  second person ("you"), encouraging and non-judgmental, plain language (this is written
  for teenagers, some in crisis). Don't upgrade copy to sound more formal/corporate.
- Emoji are used deliberately as visual icons throughout nav items, cards, and headings
  (🔢 📄 🏫 🧠 💼 etc.) — keep using them consistently with the existing icon-per-category
  pattern rather than dropping them for "cleaner" text-only content.

## Shared JS

- `nav.js` is a single shared script (linked from all 11 pages via `<script src="nav.js" defer></script>`) that drives the mobile hamburger menu: it toggles `.open` on `#primary-nav` when `.nav-toggle` is clicked, and closes the menu on link click. If you touch the header, keep the `.nav-toggle` button, `id="primary-nav"` on `<nav class="navlinks">`, and the `nav.js` script tag in sync across all pages — the mobile nav silently breaks if any one of the three is missing.
- Below the 950px breakpoint the desktop nav row is replaced by this toggle; there is no other way to reach the nav links on a narrow screen except the footer, so don't remove the toggle without replacing it with something equivalent.

## Style conventions

- All shared visual styling lives in `style.css` using CSS custom properties defined in
  `:root` (`--navy`, `--blue`, `--teal`, `--gold`, `--orange`, `--ink`, `--muted`, `--bg`).
  Use these variables instead of introducing new hard-coded colors.
- Reuse existing utility classes before adding new ones: `.card`, `.card-grid` (with
  `two`/`three`/`four`/`eight` modifiers), `.btn` (with `primary`/`secondary`), `.callout`,
  `.page-hero`, `.hero-panel`, `.stat-card`, `.path-card`, `.contact-grid`, `.checklist`,
  `.quote-list`, `.steps`, `.flow`. Check `style.css` before writing new CSS — there's a
  good chance the layout you need already exists.
- Responsive breakpoints are already defined at 950px and 620px in `style.css`; extend
  those media query blocks rather than adding new breakpoints.

## Head tags

- Every page has a `favicon.png`, a `meta description`, and Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`) in `<head>`, all pointing at `https://ktaylordac.github.io/my-next-step-yess/` (the GitHub Pages URL implied by the `origin` remote — update this base if the site ever moves to a custom domain or different repo). When adding a new page, copy this block from an existing page and update the per-page `title`, `description`, `og:title`, and `og:url`.
- External links (`target="_blank"`) must include `rel="noopener"` to prevent the opened page from accessing `window.opener`. Keep this on any new external link.

## Before finishing any change

1. Open the edited page(s) directly in a browser and click through the nav — confirm
   there's no dead link and the active nav state is correct.
2. If you touched contact info, a phone number, an email, or a form URL: grep the whole
   repo for the old value to make sure you didn't miss another copy.
3. If you touched the header, footer, or nav: confirm all 11 `.html` files still match.
4. Update `README.txt`'s changelog-style list at the bottom with a one-line summary of
   what was added/changed, consistent with its existing entries.
