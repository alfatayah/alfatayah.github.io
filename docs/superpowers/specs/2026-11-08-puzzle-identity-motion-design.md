# Puzzle Identity Motion — Design

Date: 2026-11-08
Status: approved in conversation, ready for planning
Builds on: `docs/superpowers/specs/2026-11-08-hero-puzzle-product-design.md`

## Intent

The hero now shows a jigsaw that assembles into a product mockup. The rest of
the landing page animates (scroll-reveal, card hover) but nothing ties it to
that puzzle idea. This change adds three small motions that carry the puzzle
identity through the page and make the hero copy say what Fadhil builds:

1. **Rotating role** in the hero: the small line above the h1 cycles through
   four things Fadhil builds.
2. **Skills assemble like puzzle pieces**: the eight skill cards fly in from
   scattered positions and snap into the grid when the section scrolls into
   view.
3. **Puzzle divider**: a thin rule with one puzzle knob in the middle between
   Hero→About and About→Work, drawn in when it scrolls into view.

Success: the page reads as one idea (pieces coming together), Lighthouse
mobile performance stays ≥ 0.88 with CLS ≤ 0.01, every motion is off under
`prefers-reduced-motion`, and no new dependency is added.

Already present and NOT part of this change: per-section scroll-reveal
(Work, About, Skills, Contact all use Framer `whileInView`), project-card
hover lift + image zoom, button hover springs.

## 1. Rotating role (hero)

### Copy

`src/components/hero/heroRoles.mjs` exports `HERO_ROLES` (the four phrases
below), `ROLE_LEAD = "I build"` and `rolesSentence()` (the screen-reader
sentence). `yourdata.js` cannot host them because it imports image assets
that `node --test` cannot load.

```js
export const HERO_ROLES = [
  "AI automations",
  "React Native apps",
  "Laravel backends",
  "n8n workflows",
]
```

Exactly four entries (the CSS keyframes below are cut for four), each at most
24 characters. The existing `headerTagline` array in `yourdata.js` stays
untouched (it is no longer rendered but other code may still import it).

### Markup (`src/components/Header.js`)

The `<p className="hero-name hero-enter">` line keeps its class and position
(first child of `.hero-copy`, so the `hero-enter` nth-child delays do not
shift) and becomes:

```html
<p class="hero-name hero-enter">
  <span class="visually-hidden">
    I build AI automations, React Native apps, Laravel backends and n8n workflows.
  </span>
  <span aria-hidden="true" class="hero-role">
    <span class="hero-role-lead">I build</span>
    <span class="hero-role-stack">
      <span class="hero-role-item" style="--i: 0">AI automations</span>
      <span class="hero-role-item" style="--i: 1">React Native apps</span>
      <span class="hero-role-item" style="--i: 2">Laravel backends</span>
      <span class="hero-role-item" style="--i: 3">n8n workflows</span>
    </span>
  </span>
</p>
```

The visually-hidden sentence is `rolesSentence()` (join with ", " and
" and " before the last). The animated items are
`aria-hidden` so screen readers hear one stable sentence, not a changing one.

### Styles (`src/styles/header.scss`, plus `.visually-hidden` in `mains.scss`)

- `.hero-role` — `display: inline-flex; gap: 0.45em; align-items: baseline`.
  Inherits the existing `.hero-name` look (0.9375rem, 500, uppercase,
  letter-spacing 0.04em, gray).
- `.hero-role-stack` — `display: inline-grid; text-align: left`. Every item
  sits in `grid-area: 1 / 1`, so the stack is as wide as the longest phrase
  and the line never reflows while phrases change (no CLS).
- `.hero-role-item` — `color: var(--color-black)`; `opacity: 0`;
  `animation: hero-role-cycle 10s linear infinite`;
  `animation-delay: calc(var(--i) * 2.5s)`. No `will-change` (four
  long-lived compositor layers for a text line is not worth it).
- Keyframes, one phrase visible per quarter of the 10 s cycle:

```scss
@keyframes hero-role-cycle {
  0%   { opacity: 0; transform: translateY(8px); }
  4%   { opacity: 1; transform: translateY(0); }
  21%  { opacity: 1; transform: translateY(0); }
  25%  { opacity: 0; transform: translateY(-8px); }
  100% { opacity: 0; transform: translateY(-8px); }
}
```

  (4% of 10 s = 0.4 s fade in, hold 1.7 s, 0.4 s fade out, then stay hidden
  until the next cycle.)
- Reduced motion: `.hero-role-item { animation: none; }` and
  `.hero-role-item:first-child { opacity: 1; }` so the first phrase shows
  statically.
- `.visually-hidden` utility in `mains.scss`: the standard clip pattern
  (`position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap`).
- Mobile (`<tablet`): `.hero-role` may wrap; `flex-wrap: wrap;
  justify-content: center` keeps it centred under the existing centred copy.

Pure CSS, like `hero-enter`: starts at first paint, no hydration wait, so the
h1 (LCP element) is unaffected.

## 2. Skills assemble like puzzle pieces

### Geometry helper (`src/components/hero/puzzleGeometry.mjs`)

New export, pure and deterministic:

```js
// Start offset + entrance delay for skill card `index` of `total`, laid out
// in a cols×rows grid. Reuses scatterOffset (scaled down: skill cards sit in
// a narrower column than the hero mockup) and pieceOrder (centre-out).
export const skillScatter = (
  index,
  total,
  { cols = 4, rows = 2, scale = 0.6 } = {}
) => ({ x, y, rotate, delay })
```

- `x = round(dx * scale)`, `y = round(dy * scale)` from
  `scatterOffset(index, total)` → magnitude 96.3–155.7 px.
- `rotate = rot` from `scatterOffset` (−25…25).
- `delay = enterDelay(pieceOrder(cols, rows).indexOf(index))` → 0, 0.07, …
  centre cards first, corners last.

The module's header comment is updated: it is now shared puzzle geometry for
the hero, the skills grid and the divider.

### Component (`src/components/skills.js`)

Keep the section structure, heading reveal and `whileHover`. Replace the
grid/item variants:

- Variants live in `src/components/skillsMotion.mjs` (pure, tested) and
  `skills.js` only wires them. The centre-out delay is orchestrated by the
  grid, never by the item: Framer reuses an item variant's own transition
  when a hover gesture ends, so a `delay` there makes the un-hover lag by the
  entrance delay (up to 0.49 s on the corner cards).
- Grid: `gridVariants = { hidden: {}, visible: { transition: { delayChildren:
  (i, n) => skillScatter(i, n).delay } } }` (motion-dom 12 accepts a function
  of `(index, numChildren)`), `initial="hidden"`, `whileInView="visible"`,
  `viewport={{ once: true, margin: "-40px" }}` as today.
- Item: `custom={skillCustom(i, data.skills.length, reduce)}` and
  ```js
  const itemVariants = {
    hidden: c => ({ opacity: 0, x: c.x, y: c.y, rotate: c.rotate }),
    visible: () => ({
      opacity: 1, x: 0, y: 0, rotate: 0,
      transition: {
        type: "spring", stiffness: 260, damping: 24,
        opacity: { duration: 0.25 },
      },
    }),
  }
  ```
- Reduced motion: `const reduce = useReducedMotion()` (Framer). `skillCustom`
  returns `{ x: 0, y: 0, rotate: 0 }` when true, so the cards only fade, still
  centre-out.
- `.skills-section { overflow: hidden }` in `skills.scss`, so in-flight cards
  (up to 156 px outside the grid) never widen the page on phones.

`data.skills` has 8 entries today; `skillScatter` takes `total` so adding a
ninth skill still works (the 4×2 `pieceOrder` then yields rank 8 for index
8).

## 3. Puzzle divider

### Geometry helper (`puzzleGeometry.mjs`)

```js
// Open path for a divider: a horizontal rule across `width` with one knob
// (tab, bulging upward) centred on it. Baseline at `height - 6`.
export const dividerPath = ({ width = 56, height = 40, knob = 12 } = {}) => string
```

Implemented with the existing private `edge()` helper:
`"M0 " + y + " " + edge(0, y, width, y, 0, -1, 1, knob)` with `y = height - 6`.
The knob bulb is a radius-`knob` arc whose centre sits 1.49·knob above the
baseline, so the true protrusion is ≈ 2.49·knob (the hero review measured
the same). For the defaults: starts `M0 34`, ends `L56 34`, one `A12 12`
arc, knob peak at `y ≈ 34 − 29.9 = 4.1`, so the whole path fits inside the
40 px tall viewBox with the 1.5 px stroke.

### Component (`src/components/atoms/PuzzleDivider.js`)

```jsx
<motion.div className="puzzle-divider" aria-hidden="true"
  initial={reduce ? false : "hidden"} whileInView="visible"
  viewport={{ once: true, margin: "-40px" }}>
  <motion.span className="puzzle-divider-line is-left"  variants={lineVariants} />
  <svg className="puzzle-divider-knob" viewBox="0 0 56 40" width="56" height="40">
    <motion.path d={dividerPath()} variants={knobVariants} />
  </svg>
  <motion.span className="puzzle-divider-line is-right" variants={lineVariants} />
</motion.div>
```

Children inherit the wrapper's variant state.

- `lineVariants`: `hidden: { scaleX: 0 }`, `visible: { scaleX: 1,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }`.
  `transform-origin` right for the left line, left for the right line (CSS),
  so both grow outward from the knob.
- `knobVariants`: `hidden: { pathLength: 0, opacity: 0 }`, `visible:
  { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }`.
- Reduced motion (`useReducedMotion()`): `initial={false}` on the wrapper so
  everything renders in its final state with no animation.

### Styles (`src/styles/divider.scss`, imported in `mains.scss` after
`card.scss`)

- `.puzzle-divider` — `display: flex; align-items: flex-end; width: 100%;
  max-width: 1100px; height: 40px; margin: -12px auto; padding: 0 40px`
  (`0 20px` under `<tablet`). The negative margin keeps the gap between
  sections close to today's (section paddings already provide space).
- `.puzzle-divider-line` — `flex: 1; height: 1px; margin-bottom: 5.5px;
  background: var(--color-border)`; `.is-left { transform-origin: 100% 50% }`,
  `.is-right { transform-origin: 0 50% }`. The SVG fills the 40 px row and
  its horizontal segments sit at the path baseline (y = 34), so the lines
  are bottom-aligned and lifted by 40 − 34 − 0.5 px: their centre coincides
  with the baseline. (`align-items: center` would put them at y = 20, a
  14 px step above the knob's stubs.)
- `.puzzle-divider-knob` — `flex: none; display: block; overflow: visible`;
  `path { fill: none; stroke: var(--color-border); stroke-width: 1.5;
  stroke-linecap: round }`.

### Placement (`src/pages/index.js`)

```jsx
<Header />
<PuzzleDivider />
<About />
<PuzzleDivider />
<Work />
<Skills />
<Footer />
```

Work→Skills and Skills→Contact keep their existing full-width border lines;
no divider there, so nothing doubles up.

## Constraints

- No new dependencies. Framer Motion 12 (already installed) supplies
  `motion`, `useReducedMotion`, `whileInView`, `pathLength`.
- Every motion honours `prefers-reduced-motion: reduce` (CSS media query for
  the hero line, `useReducedMotion()` for the Framer pieces).
- Hero changes are CSS-only so the h1 stays the LCP element and paints at
  first paint.
- Pure helpers live in `.mjs` and are covered by `npm test`
  (`node --test "tests/**/*.test.mjs"`).
- Prettier via `npx prettier --write --no-semi --arrow-parens avoid
  --trailing-comma es5 <files>`.
- Copy and class names in English, as the rest of the codebase.

## Verification

- Unit: `skillScatter` magnitude 96–156 and centre-out delays; `dividerPath`
  starts `M0 34`, ends `L56 34`, one arc, every y coordinate within 2–34;
  `HERO_ROLES` has exactly 4 entries of ≤ 24 characters.
- Browser (dev server, `.claude/launch.json` → `gatsby-develop`): at 375, 800
  and 1280 px — role line cycles without shifting the h1; skills fly in once
  and settle aligned to the grid, and un-hovering a corner card returns
  `y` and `scale` together; dividers draw once with the lines' centre y equal
  to the path's bottom y (|Δ| < 1 px); nothing causes horizontal scroll. With reduced motion emulated: first role static, skills
  fade only, dividers static.
- Lighthouse (mobile preset, `gatsby serve -p 9000`, three runs, median):
  performance ≥ 0.88, CLS ≤ 0.01, LCP timing unchanged within noise. (The
  LCP element is not the h1 today: the hero copy fades in from opacity 0, so
  Chrome elects the About paragraph or the nav logo; pre-existing behaviour.)
- Final fresh-context code review before merge, as for the puzzle hero.

## Out of scope

Nav underline, email copy-to-clipboard, scroll progress bar (the
"micro-interaction" package), any change to the puzzle hero itself, Skills
cards shaped as jigsaw pieces.
