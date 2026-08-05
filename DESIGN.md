# DESIGN.md

Binding rules for every UI change in this repo. Read before touching a pixel.

---

## 0. What this repo actually is

Audited before writing this file. Findings:

| Expected | Reality |
|---|---|
| `package.json` | **absent** — no build, no npm |
| `tailwind.config.*` | **absent** |
| `globals.css` | **absent** — tokens live in `public/assets/css/style.css` `:root` |
| shadcn/ui | **absent** — no React, no JSX, no components dir |

Two hand-written stylesheets, one vanilla-JS renderer, static HTML. No framework.

**Consequence:** the shadcn/ui section of the original brief cannot be honoured as
written — there are no primitives to import. Section 5 lists the *real* components
instead, with their real selectors and render sites. Do not introduce React,
Tailwind, or a build step to satisfy a rule; that would be a rewrite, not a design.

Content is data-driven: `public/daten/produkte.js` is the single source for
products, prices, conditions, contact. `public/assets/js/seite.js` renders from it.
**Never hard-code a price, product name, or phone number into markup.**

---

## 1. Direction

**Technical editorial.** A trade document that happens to be a website: a price
list for chefs. Dense, typographic, tabular. Authority from precision, not polish.

Not "modern and clean". Not a SaaS landing page. The reference is a printed
supplier price sheet — article numbers visible, calibres stated, the table as the
hero rather than something hidden below three feature cards.

---

## 2. Fonts

| Role | Family | Stack |
|---|---|---|
| Display | **Space Grotesk** | `"Space Grotesk", "Helvetica Neue", sans-serif` |
| Body | **Source Sans 3** | `"Source Sans 3", "Helvetica Neue", sans-serif` |
| Mono | **JetBrains Mono** | `"JetBrains Mono", ui-monospace, monospace` |

Space Grotesk is already in the repo and stays — its wide, slightly mechanical
caps suit article numbers and calibre strings.

Mono is not decoration. It carries **article numbers, calibres, prices, counts** —
every value a chef reads off a sheet and compares. Tabular figures required:
`font-variant-numeric: tabular-nums`.

### Never use

`Inter` · `Roboto` · `Open Sans` · `Arial` · `system-ui` · `-apple-system` ·
`Helvetica` as a *first* choice · `Segoe UI` · `Lato` · `Montserrat` · `Poppins`

The demo site (`demo/`) is a deliberately separate system: **Fraunces** (serif
display) + **Instrument Sans** (body). Same ban list applies.

---

## 3. Color

One dominant, one accent. Everything through CSS variables — no raw hex in
components, ever. Tokens live in `style.css` `:root`: dominant deep teal-slate
`--tief: #0d1b23` (plus `--tief-2/-3`), the single accent coral `--koralle:
#e8562f` / `--koralle-hell`, paper `--creme/-2`, ink `--text/--text-hell`,
hairlines `--linie/--linie-dunkel`.

**Semantic exceptions, not palette members:** BIO green `--bio: #2f7d32` and
warning gold `--gold: #d9a441`. Gold appears only on the price-lock banner and
the short-shelf-life box. If a new element wants gold, it wants coral instead.

### Banned

- Purple. Indigo. Violet. In any form.
- Purple-to-indigo gradients on white. Any gradient whose stops are both cool and
  synthetic.
- A third accent. If something needs to stand out and coral is taken, it does not
  need to stand out.
- Pure `#000` or `#fff` for text. Use `--text` and `--creme`.

Permitted gradients: single-hue overlays on photos (`.emp__haupt-schleier`,
`.d-hero__schleier`). Nothing new.

**Contrast floor:** 4.5:1 body, 3:1 for text >= 24px.

---

## 4. Spacing and type scale

### 8px rhythm

Every margin, padding and gap is a multiple of 8: `8 · 16 · 24 · 32 · 48 · 64 · 96`.
4px allowed only for optical nudges inside a component (icon baseline, chip inset).

### Type scale — extremes, not increments

Weights: **200** and **800**. Nothing between them except 400 for running body text.
No 500, no 600, no "semibold". One codified exception: Space Grotesk tops out at
700, so 700 *is* the display extreme; JetBrains Mono bold is likewise 700.

Sizes jump ~3x, not 1.5x — four tokens in `:root`:
`--t-hero` `clamp(2.75rem,6.5vw,5rem)` ·
`--t-sektion` `clamp(1.75rem,3.5vw,2.25rem)` ·
`--t-body` `1.0625rem` ·
`--t-meta` `.6875rem` (mono, uppercase, .22em tracking).
If a heading feels like it needs a fifth size, it needs less text.

Line height: 1.05 display, 1.65 body. Measure capped at 68ch.

---

## 5. Components — reuse these, do not hand-roll

No shadcn/ui in this repo. These are the real ones. Import = add the class; markup
is in `public/index.html`, behaviour in `public/assets/js/seite.js`.

Structure: `.wrap` (1180px, 24px gutter) · `.sek` `--creme/--dunkel/--deal` ·
`.sek__kopf` · `.kopf`/`.fuss`.

Content: `.liste`+`.liste-huelle` (**the price table — primary component**,
groups, chips, `tr.empfohlen` coral rule) · `.emp` (1 big photo panel
`.emp__haupt` + 2 `.emp__klein`, rendered from `highlight:true`) · `.etikett`
(hero spec label, filled via `[data-etikett]`) · `.trust` · `.erklaerungen` ·
`.restposten` (gold left rule) · `.preis-warnung` · `.deal`+`.konditionen`
(coral band `.sek--deal`) · `.merkmale` · `.kontakt`/`.tel-gross` ·
`.demo-cta`+`.browser`.

Controls: `.btn` `--primaer/--geist/--dunkel` (mono uppercase, press `scale(.97)`)
· `.label`/`--hell` (mono eyebrow) · `.chip`/`--bio` · `.zeig` (block reveal via
IntersectionObserver + 1.2s safety timeout — content must never stay hidden).

Demo site: `assets/css/demo.css`, prefix `.d-*`, own palette (`--nacht`,
`--messing`, `--papier`), Fraunces/Instrument Sans. **Separate design system on
purpose** — never import `.d-*` into the main site or vice versa. Photo slots:
`.d-foto` `--q` (4:3) with `.d-foto__leer` caption while empty; `.d-reihe`
alternating photo/text rows replace any card grid.

Data binding: `[data-kontakt]`, `[data-kondition]`, `[data-etikett]` are filled
from `produkte.js`. Use them instead of typing values.

Images: photos are loaded at build time from the Unsplash CDN (see workflow step
"Fotos laden" and `BILDNACHWEIS.md`). `*.b64` files in `assets/img` are decoded
to binaries by the workflows.

---

## 6. Motion

Tokens: `--ease-out: cubic-bezier(.23,1,.32,1)` · `--ease-in-out:
cubic-bezier(.77,0,.175,1)`.

- Enter/exit -> `--ease-out`. **Never `ease-in` on UI.**
- Under 300ms for UI. Buttons 160ms, cards 200ms, reveals 380ms.
- Only `transform` and `opacity`. Never `width`, `height`, `top`.
- Never `transition: all`. Name the properties.
- Press feedback on everything pressable: `transform: scale(.97)` on `:active`.
- Hover behind `@media (hover:hover) and (pointer:fine)`.
- `prefers-reduced-motion: reduce` -> opacity only, no movement.

---

## 7. Forbidden

1. **Three rounded cards in a row.** Comparative content goes in `.liste` or
   `.d-reihe` rows. If cards are unavoidable: 2+1 or one wide plus two narrow,
   never 1-1-1.
2. **Centered-everything heroes.** Hero text is left-aligned, capped at ~15ch.
3. **0.1-opacity drop shadows on everything.** Two shadows exist (card hover,
   browser mockup) and that is the ceiling. Depth comes from background bands.
4. **A border on every box.** Hierarchy is type and space. A hairline is a last
   resort — the price table earns its rules because rows must be scannable.
5. **Lorem ipsum, "Feature one", placeholder names.** Every string is real. The
   demo restaurant is the single exception and is labelled as invented on every
   page.
6. **Emoji as icons.** SVG only, drawn in-repo.
7. **Inventing a price, minimum quantity, or condition.** These come from
   `produkte.js` or from Chris. Never from a plausible guess.
8. **New color, new font, new size token** without editing this file first.

---

## 8. Accessibility floor

Contrast 4.5:1 body, 3:1 large. Visible `:focus-visible` (3px coral/brass
outline, 3px offset) — never remove it. Touch targets >= 44x44px. `alt` on every
meaningful image, `alt=""` on decoration. Reduced motion respected. Breakpoints
tested: 375, 768, 1024, 1440. German = `lang="de-CH"`, Swiss spelling: ss,
never eszett.

---

## 9. Before committing

- [ ] No Inter / Roboto / Open Sans / Arial / system-ui anywhere
- [ ] No purple, no indigo, no third accent
- [ ] Every spacing value a multiple of 8 (4 only for optical nudges)
- [ ] Only weights 200 / 400 / 800 (700 allowed solely as Space Grotesk / mono max)
- [ ] No raw hex — variables only
- [ ] No `transition: all`, no `ease-in`
- [ ] Reused an existing class instead of writing a new one
- [ ] Prices and contact data come from `produkte.js`, not markup
- [ ] HTML validates, links resolve
- [ ] Checked at 375px
