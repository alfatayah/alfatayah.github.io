# Puzzle Identity Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Carry the hero's puzzle idea through the landing page with three motions: a CSS-only rotating role line in the hero, skill cards that fly in from scattered positions and snap into their grid, and a thin divider with one puzzle knob between Hero→About and About→Work.

**Architecture:** Pure geometry/copy helpers live in `.mjs` modules tested with `node --test`; the hero line is CSS keyframes (first paint, no hydration wait, LCP untouched); Skills and the divider reuse the existing Framer Motion `whileInView` pattern with `useReducedMotion` fallbacks. No new dependencies.

**Tech Stack:** Gatsby 5, React 18, Framer Motion 12, SCSS (include-media), Node 24 `node:test`, Lighthouse CLI.

**Spec:** `docs/superpowers/specs/2026-11-08-puzzle-identity-motion-design.md`

## Global Constraints

- No new dependencies (`package.json` dependencies unchanged).
- Every motion honours `prefers-reduced-motion: reduce`: CSS media query for the hero line, `useReducedMotion()` for Framer pieces.
- Hero changes are CSS-only; `h1` stays the LCP element and paints at first paint.
- Pure helpers in `.mjs`, covered by `npm test` (`node --test "tests/**/*.test.mjs"`), all tests green at every commit.
- Format touched JS/SCSS/MJS with `npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 <files>` before each commit.
- Lighthouse mobile performance ≥ 0.88 and CLS ≤ 0.01 (median of 3 runs) after Task 5; LCP element still the `h1`.
- Copy and class names in English. Commit messages end with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Work on a feature branch `feat/puzzle-identity-motion` cut from `master`, created via superpowers:using-git-worktrees at execution time. Never commit to `master` directly; the merge is the user's call (superpowers:finishing-a-development-branch).
- Always `npx gatsby clean` before a verification build. Dev server via `.claude/launch.json` → `gatsby-develop` (port 8000). The browser pane's CSS animation timeline freezes while the pane is hidden: verify animations with the Web Animations API (`el.getAnimations()`) or screenshots, not `getComputedStyle` alone.

## Review Focus

1. `HERO_ROLES` with 3 or 5 entries: the keyframes are cut for four, so a fifth phrase would overlap the first. Pinned by the "exactly four" test in Task 2.
2. A ninth skill card (`data.skills.length === 9`): `pieceOrder(4, 2)` has no rank for index 8, `indexOf` returns −1 and the delay would go negative. Pinned by the fallback test in Task 1 (rank falls back to the index).
3. Phone at 320–375 px: the role line must wrap under the centred copy without pushing the `h1` down after first paint. Checked in Task 3's browser step (h1 top unchanged across 3 s).
4. In-flight skill cards start up to 156 px outside the grid: on a 375 px phone they would widen the page. Pinned by `.skills-section { overflow: hidden }` and the `scrollWidth === innerWidth` check in Task 4.
5. The divider's knob is a radius-`knob` arc whose true protrusion is ≈ 2.49·knob (hero review finding); with the wrong baseline it leaves the 40 px viewBox and gets clipped. Pinned by the `dividerPath` arithmetic test in Task 1 and the visual check in Task 5.

---

### Task 0: Baseline Lighthouse

**Files:**
- None committed. Scores go to the ledger.

- [ ] **Step 1: Build master and serve**

Run (from the worktree, before any change):
```bash
npx gatsby clean && npx gatsby build
```
Expected: exit 0, `public/index.html` exists.

```bash
npx gatsby serve -p 9000
```
Run in the background. Expected: "gatsby serve running at: http://localhost:9000/".

- [ ] **Step 2: Three mobile runs**

```bash
for i in 1 2 3; do npx lighthouse http://localhost:9000 --preset=perf --form-factor=mobile --screenEmulation.mobile --quiet --chrome-flags="--headless=new" --output=json --output-path=.lighthouse-base-$i.json; done
node -e "for (const i of [1,2,3]) { const r = require('./.lighthouse-base-' + i + '.json'); console.log(i, r.categories.performance.score, r.audits['largest-contentful-paint'].numericValue|0, r.audits['cumulative-layout-shift'].numericValue, r.audits['largest-contentful-paint-element'].details?.items?.[0]?.items?.[0]?.node?.selector) }"
```
Expected: three lines; performance around 0.90, CLS ≤ 0.01, LCP selector contains `h1`. Record the median line in the ledger as `Task 0: baseline mobile perf=<x> LCP=<ms> CLS=<y>`. Stop the serve process afterwards (check `netstat -ano | findstr :9000` and `taskkill /PID <pid> /F` if it survives). `.lighthouse-*.json` is gitignored.

---

### Task 1: Geometry helpers — `skillScatter` and `dividerPath`

**Files:**
- Modify: `src/components/hero/puzzleGeometry.mjs` (header comment + two exports at the end of the "entrance" section, before `// --- Interactive mode`)
- Test: `tests/puzzle-geometry.test.mjs`

**Interfaces:**
- Consumes: `scatterOffset(index, total)`, `pieceOrder(cols, rows)`, `enterDelay(rank)`, private `edge(ax, ay, bx, by, nx, ny, s, k)` and `round(n)` (all existing).
- Produces:
  - `skillScatter(index, total, { cols = 4, rows = 2, scale = 0.6 } = {}) → { x: number, y: number, rotate: number, delay: number }`
  - `dividerPath({ width = 56, height = 40, knob = 12 } = {}) → string` (open SVG path, absolute commands)

- [ ] **Step 1: Write the failing tests**

Append to `tests/puzzle-geometry.test.mjs` (add `skillScatter`, `dividerPath` to the import list):

```js
test("skillScatter scales the hero scatter down and keeps the spin", () => {
  for (let i = 0; i < 8; i++) {
    const s = skillScatter(i, 8)
    const mag = Math.hypot(s.x, s.y)
    assert.ok(mag >= 96 && mag <= 156, `card ${i} magnitude ${mag}`)
    assert.ok(s.rotate >= -25 && s.rotate <= 25, `card ${i} rotate ${s.rotate}`)
    assert.equal(s.rotate, scatterOffset(i, 8).rot)
  }
})

test("skillScatter delays run centre-out on the 4x2 grid", () => {
  const d = [...Array(8).keys()].map(i => skillScatter(i, 8).delay)
  // centre columns (indices 1,2 / 5,6) before the corners (0,3 / 4,7)
  assert.ok(
    Math.max(d[1], d[2], d[5], d[6]) < Math.min(d[0], d[3], d[4], d[7]),
    JSON.stringify(d)
  )
  assert.equal(d[1], 0)
  assert.equal(d[7], enterDelay(7))
})

test("skillScatter falls back to the index rank for a card beyond the grid", () => {
  assert.equal(skillScatter(8, 9).delay, enterDelay(8))
})

test("dividerPath is a rule with one upward knob that fits a 56x40 box", () => {
  const d = dividerPath()
  assert.ok(d.startsWith("M0 34 L"), d.slice(0, 12))
  assert.ok(d.endsWith("L56 34"), d.slice(-10))
  assert.equal((d.match(/A/g) || []).length, 1)
  assert.ok(d.includes("A12 12 0 1 1 "), d)
  // strip the arc flags so the remaining numbers are pure x y pairs
  const nums = d.replace(/A12 12 0 1 1 /g, "").match(/-?[\d.]+/g).map(Number)
  nums.forEach((n, i) => {
    if (i % 2 === 0) assert.ok(n >= 0 && n <= 56, `x=${n}`)
    else assert.ok(n >= 2 && n <= 34, `y=${n}`)
  })
  // the arc peak is not a listed coordinate: centre sits 1.49·knob above the
  // baseline, so the peak is 34 − 2.49·12 ≈ 4.1 > 0 and the stroke stays inside
  assert.ok(34 - 2.49 * 12 > 1.5)
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `SyntaxError: The requested module ... does not provide an export named 'skillScatter'` (or `dividerPath`). The 13 existing tests are not run because the import fails; that is the expected failure.

- [ ] **Step 3: Implement both helpers in `puzzleGeometry.mjs`**

Update the header comment's first sentence to: `// Pure geometry shared by the hero puzzle, the skills grid and the puzzle divider: ...`. Then add, after `pieces`:

```js
// Start offset + entrance delay for skill card `index` of `total`, laid out
// in a cols×rows grid. Reuses scatterOffset (scaled down: the skills column
// is narrower than the hero mockup) and pieceOrder (centre-out). A card the
// grid has no rank for (a ninth skill) takes its own index as rank.
export const skillScatter = (
  index,
  total,
  { cols = 4, rows = 2, scale = 0.6 } = {}
) => {
  const { dx, dy, rot } = scatterOffset(index, total)
  const rank = pieceOrder(cols, rows).indexOf(index)
  return {
    x: round(dx * scale),
    y: round(dy * scale),
    rotate: rot,
    delay: enterDelay(rank === -1 ? index : rank),
  }
}

// Open path for a section divider: a horizontal rule across `width` with one
// knob (tab, bulging upward) centred on it. Baseline at height − 6 so the
// knob's true 2.49·knob protrusion stays inside the box.
export const dividerPath = ({ width = 56, height = 40, knob = 12 } = {}) => {
  const y = height - 6
  return `M0 ${y} ${edge(0, y, width, y, 0, -1, 1, knob)}`
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: all tests pass (13 existing + 4 new + site-metadata 2 = 19).

- [ ] **Step 5: Format and commit**

```bash
npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 src/components/hero/puzzleGeometry.mjs tests/puzzle-geometry.test.mjs
git add src/components/hero/puzzleGeometry.mjs tests/puzzle-geometry.test.mjs
git commit -m "feat(geometry): skillScatter and dividerPath for the puzzle identity motions"
```

---

### Task 2: Hero roles copy module

**Files:**
- Create: `src/components/hero/heroRoles.mjs`
- Test: `tests/hero-roles.test.mjs`
- Modify: `docs/superpowers/specs/2026-11-08-puzzle-identity-motion-design.md` (Copy subsection)

**Interfaces:**
- Produces:
  - `HERO_ROLES: string[]` — exactly `["AI automations", "React Native apps", "Laravel backends", "n8n workflows"]`
  - `ROLE_LEAD = "I build"`
  - `rolesSentence(roles = HERO_ROLES, lead = ROLE_LEAD) → string` — `"I build AI automations, React Native apps, Laravel backends and n8n workflows."`

Ruling recorded here (not in `yourdata.js` as the spec first said): `yourdata.js` imports SVG/JPG assets, so `node --test` cannot load it; the roles live in a pure `.mjs` beside the other hero modules. Update the spec's Copy subsection to point at `src/components/hero/heroRoles.mjs` in this task's commit.

- [ ] **Step 1: Write the failing test**

`tests/hero-roles.test.mjs`:

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import {
  HERO_ROLES,
  ROLE_LEAD,
  rolesSentence,
} from "../src/components/hero/heroRoles.mjs"

test("exactly four roles, each short enough for one line", () => {
  // header.scss cuts the hero-role-cycle keyframes for four phrases
  assert.equal(HERO_ROLES.length, 4)
  for (const r of HERO_ROLES) assert.ok(r.length <= 24, r)
  assert.equal(ROLE_LEAD, "I build")
})

test("rolesSentence joins with commas and a final 'and'", () => {
  assert.equal(
    rolesSentence(),
    "I build AI automations, React Native apps, Laravel backends and n8n workflows."
  )
  assert.equal(rolesSentence(["apps", "APIs"], "I ship"), "I ship apps and APIs.")
  assert.equal(rolesSentence(["apps"]), "I build apps.")
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/hero-roles.test.mjs`
Expected: FAIL — `Cannot find module ... heroRoles.mjs`.

- [ ] **Step 3: Implement `src/components/hero/heroRoles.mjs`**

Exports `HERO_ROLES` (the four strings above, in that order), `ROLE_LEAD`, and `rolesSentence(roles = HERO_ROLES, lead = ROLE_LEAD)`: one role → `"<lead> <role>."`; otherwise `"<lead> <all but last joined by ", "> and <last>."`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: all pass (21 tests).

- [ ] **Step 5: Update the spec, format, commit**

In the spec's "### Copy" subsection replace the `yourdata.js` sentence and snippet with: "`src/components/hero/heroRoles.mjs` exports `HERO_ROLES` (the four phrases), `ROLE_LEAD = "I build"` and `rolesSentence()`; `yourdata.js` cannot host them because it imports image assets that `node --test` cannot load."

```bash
npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 src/components/hero/heroRoles.mjs tests/hero-roles.test.mjs
git add src/components/hero/heroRoles.mjs tests/hero-roles.test.mjs docs/superpowers/specs/2026-11-08-puzzle-identity-motion-design.md
git commit -m "feat(hero): roles copy module with screen-reader sentence"
```

---

### Task 3: Rotating role line in the hero

**Files:**
- Modify: `src/components/Header.js` (the `<p className="hero-name hero-enter">` element)
- Modify: `src/styles/header.scss` (after the `.hero-enter` block; `.hero-name` rule stays)
- Modify: `src/styles/mains.scss` (add `.visually-hidden` after `.container`)

**Interfaces:**
- Consumes: `HERO_ROLES`, `ROLE_LEAD`, `rolesSentence` from `./hero/heroRoles.mjs`.
- Produces: class names `hero-role`, `hero-role-lead`, `hero-role-stack`, `hero-role-item` (CSS var `--i`), utility `visually-hidden`.

- [ ] **Step 1: Markup in `Header.js`**

Replace the `hero-name` paragraph with:

```jsx
<p className="hero-name hero-enter">
  <span className="visually-hidden">{rolesSentence()}</span>
  <span className="hero-role" aria-hidden="true">
    <span className="hero-role-lead">{ROLE_LEAD}</span>
    <span className="hero-role-stack">
      {HERO_ROLES.map((role, i) => (
        <span className="hero-role-item" key={role} style={{ "--i": i }}>
          {role}
        </span>
      ))}
    </span>
  </span>
</p>
```

Keep it the first child of `.hero-copy`. Add a one-line comment above it: the rotation is CSS keyframes for the same first-paint reason as `hero-enter`.

- [ ] **Step 2: Styles**

`mains.scss`, after `.container`:

```scss
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}
```

`header.scss`, after the `.hero-enter` block:

```scss
// Rotating role: four phrases stacked in one grid cell (so the line is as
// wide as the longest phrase and never reflows), each shown for a quarter
// of a 10 s cycle via animation-delay.
.hero-role {
  display: inline-flex;
  align-items: baseline;
  gap: 0.45em;

  @include media("<tablet") {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.hero-role-stack {
  display: inline-grid;
  text-align: left;
}

.hero-role-item {
  grid-area: 1 / 1;
  color: var(--color-black);
  opacity: 0;
  animation: hero-role-cycle 10s linear infinite;
  animation-delay: calc(var(--i) * 2.5s);

  @media (prefers-reduced-motion: reduce) {
    animation: none;

    &:first-child {
      opacity: 1;
    }
  }
}

@keyframes hero-role-cycle {
  0%   { opacity: 0; transform: translateY(8px); }
  4%   { opacity: 1; transform: translateY(0); }
  21%  { opacity: 1; transform: translateY(0); }
  25%  { opacity: 0; transform: translateY(-8px); }
  100% { opacity: 0; transform: translateY(-8px); }
}
```

- [ ] **Step 3: Verify in the browser**

Start `gatsby-develop` via `preview_start` and open `http://localhost:8000`. Run with `javascript_tool`:

```js
const h1 = document.querySelector(".hero-copy h1").getBoundingClientRect().top
const items = [...document.querySelectorAll(".hero-role-item")]
const stack = document.querySelector(".hero-role-stack").getBoundingClientRect().width
const widest = Math.max(...items.map(i => i.getBoundingClientRect().width))
await new Promise(r => setTimeout(r, 3000))
({
  h1Stable: document.querySelector(".hero-copy h1").getBoundingClientRect().top === h1,
  count: items.length,
  stackFitsWidest: Math.abs(stack - widest) < 1,
  animations: items.map(i => i.getAnimations().length),
  srText: document.querySelector(".hero-name .visually-hidden").textContent,
})
```
Expected: `h1Stable: true`, `count: 4`, `stackFitsWidest: true`, `animations: [1,1,1,1]` (or 2 while `hero-enter` is still running), `srText` equals the full sentence. Take one screenshot at desktop and one at `preset: "mobile"`; the line reads `I BUILD <phrase>` and is centred on mobile. Reset the viewport to desktop afterwards.

- [ ] **Step 4: Tests still green, format, commit**

Run: `npm test` — Expected: 21 pass.

```bash
npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 src/components/Header.js src/styles/header.scss src/styles/mains.scss
git add src/components/Header.js src/styles/header.scss src/styles/mains.scss
git commit -m "feat(hero): CSS-only rotating role line above the heading"
```

---

### Task 4: Skills cards assemble like puzzle pieces

**Files:**
- Modify: `src/components/skills.js`
- Modify: `src/styles/skills.scss` (`.skills-section` rule)

**Interfaces:**
- Consumes: `skillScatter(index, total)` from `./hero/puzzleGeometry.mjs`; `useReducedMotion` from `framer-motion`.

- [ ] **Step 1: Rewrite the variants in `skills.js`**

- Replace `gridVariants` with `{ hidden: {}, visible: {} }` (keeps the `whileInView` propagation, drops `staggerChildren`).
- Replace `itemVariants` with the functions from the spec:

```js
const itemVariants = {
  hidden: c => ({ opacity: 0, x: c.x, y: c.y, rotate: c.rotate }),
  visible: c => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      delay: c.delay,
      opacity: { duration: 0.25, delay: c.delay },
    },
  }),
}
```

- In the component: `const reduce = useReducedMotion()`; in the map, `const scatter = skillScatter(index, data.skills.length)` and `custom={reduce ? { ...scatter, x: 0, y: 0, rotate: 0 } : scatter}` on each `motion.div.skill-card`. Keep `whileHover` and its spring transition on the card. Add a two-line comment: pieces fly in from the hero's scatter pattern, centre-out, and only fade under reduced motion.

- [ ] **Step 2: Clip in-flight cards**

`skills.scss`: add `overflow: hidden;` to `.skills-section` with the comment `// in-flight cards start up to 156px outside the grid; never widen the page`.

- [ ] **Step 3: Verify in the browser**

Reload `http://localhost:8000` at `preset: "mobile"` (375 px). Before scrolling:

```js
[...document.querySelectorAll(".skill-card")].map(c => getComputedStyle(c).transform).slice(0, 2)
```
Expected: matrices with non-zero translate (not `none`/identity). Then `scroll_to` the `#skill` heading, wait 2 s, and run:

```js
({
  settled: [...document.querySelectorAll(".skill-card")].every(c => {
    const t = getComputedStyle(c).transform
    return t === "none" || t === "matrix(1, 0, 0, 1, 0, 0)"
  }),
  opaque: [...document.querySelectorAll(".skill-card")].every(c => getComputedStyle(c).opacity === "1"),
  noOverflow: document.documentElement.scrollWidth === window.innerWidth,
})
```
Expected: all three `true`. Repeat `settled`/`noOverflow` at `preset: "desktop"`. Take a screenshot mid-flight (scroll then screenshot immediately) to see cards arriving rotated. Reset to desktop.

- [ ] **Step 4: Tests, format, commit**

Run: `npm test` — Expected: 21 pass.

```bash
npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 src/components/skills.js src/styles/skills.scss
git add src/components/skills.js src/styles/skills.scss
git commit -m "feat(skills): cards fly in from the puzzle scatter and snap to the grid"
```

---

### Task 5: Puzzle divider between sections

**Files:**
- Create: `src/components/atoms/PuzzleDivider.js`
- Create: `src/styles/divider.scss`
- Modify: `src/styles/mains.scss` (import after `card.scss`)
- Modify: `src/pages/index.js`

**Interfaces:**
- Consumes: `dividerPath()` from `../hero/puzzleGeometry.mjs`; `motion`, `useReducedMotion` from `framer-motion`.
- Produces: `<PuzzleDivider />` (no props), classes `puzzle-divider`, `puzzle-divider-line is-left|is-right`, `puzzle-divider-knob`.

- [ ] **Step 1: Component**

`src/components/atoms/PuzzleDivider.js`, default export `PuzzleDivider`:

```jsx
const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const knobVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}
const D = dividerPath()
```

Render exactly the spec's markup: `motion.div.puzzle-divider` with `aria-hidden="true"`, `initial={reduce ? false : "hidden"}`, `whileInView="visible"`, `viewport={{ once: true, margin: "-40px" }}`; inside, `motion.span.puzzle-divider-line.is-left`, the `svg.puzzle-divider-knob` (`viewBox="0 0 56 40" width="56" height="40"`) containing `motion.path` with `d={D}` and `variants={knobVariants}`, then `motion.span.puzzle-divider-line.is-right`. Both spans use `variants={lineVariants}`.

- [ ] **Step 2: Styles**

`src/styles/divider.scss`:

```scss
// A rule with one puzzle knob: grows outward from the knob when scrolled
// into view. Negative margin keeps the section gap close to the old one.
.puzzle-divider {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  height: 40px;
  margin: -12px auto;
  padding: 0 40px;

  @include media("<tablet") {
    padding: 0 20px;
  }
}

.puzzle-divider-line {
  flex: 1;
  height: 1px;
  background: var(--color-border);

  &.is-left  { transform-origin: 100% 50%; }
  &.is-right { transform-origin: 0 50%; }
}

.puzzle-divider-knob {
  flex: none;
  display: block;
  overflow: visible;

  path {
    fill: none;
    stroke: var(--color-border);
    stroke-width: 1.5;
    stroke-linecap: round;
  }
}
```

`mains.scss`: `@import "./divider.scss";` right after `@import "./card.scss";`.

- [ ] **Step 3: Placement**

`src/pages/index.js`: import `PuzzleDivider from "../components/atoms/PuzzleDivider"` and render `<PuzzleDivider />` between `<Header>` and `<About>`, and between `<About>` and `<Work>`. No other order change.

- [ ] **Step 4: Verify in the browser**

Reload at desktop, scroll so the second divider has entered, wait 1 s:

```js
const divs = [...document.querySelectorAll(".puzzle-divider")]
({
  count: divs.length,
  linesFull: divs.every(d => [...d.querySelectorAll(".puzzle-divider-line")].every(l => {
    const t = getComputedStyle(l).transform
    return t === "none" || t.startsWith("matrix(1,")
  })),
  knobDrawn: divs.every(d => {
    const p = d.querySelector("path")
    return p.getAttribute("pathLength") === "1" && Number(p.style.strokeDashoffset || 0) === 0
  }),
  knobInside: divs.every(d => {
    const svg = d.querySelector("svg").getBoundingClientRect()
    const path = d.querySelector("path").getBoundingClientRect()
    return path.top >= svg.top - 1 && path.bottom <= svg.bottom + 1
  }),
  noOverflow: document.documentElement.scrollWidth === window.innerWidth,
})
```
Expected: `count: 2`, every flag `true`. Zoom a screenshot on one divider: a 1 px rule with a small knob bulging upward from its centre, not clipped. Repeat `noOverflow` at `preset: "mobile"`, then reset to desktop.

- [ ] **Step 5: Tests, format, commit**

Run: `npm test` — Expected: 21 pass.

```bash
npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 src/components/atoms/PuzzleDivider.js src/styles/divider.scss src/styles/mains.scss src/pages/index.js
git add src/components/atoms/PuzzleDivider.js src/styles/divider.scss src/styles/mains.scss src/pages/index.js
git commit -m "feat(layout): puzzle knob dividers between hero, about and work"
```

---

### Task 6: Verification — build, Lighthouse, reduced motion

**Files:**
- None expected. Any fix found here gets its own failing test (where a pure helper is involved) and its own commit.

- [ ] **Step 1: Full suite and format check**

Run: `npm test` — Expected: 21 pass.
Run: `npx prettier --check --no-semi --arrow-parens avoid --trailing-comma es5 "src/**/*.{js,mjs,scss}" "tests/**/*.mjs"` — Expected: "All matched files use Prettier code style!" (pre-existing unformatted files outside this change are noted, not fixed).

- [ ] **Step 2: Production build**

```bash
npx gatsby clean && npx gatsby build
```
Expected: exit 0. Then:
```bash
grep -c "hero-role-item" public/index.html; grep -c "puzzle-divider-knob" public/index.html; grep -c "skill-card" public/index.html
```
Expected: `4`, `2`, `8`.

- [ ] **Step 3: Lighthouse, three mobile runs**

Serve `public/` on 9000 (background) and run the same loop as Task 0 with `.lighthouse-after-$i.json`.
Expected (median): performance ≥ 0.88 and within 0.03 of the Task 0 baseline, CLS ≤ 0.01, LCP element selector contains `h1`. Ledger line: `Task 6: after mobile perf=<x> LCP=<ms> CLS=<y> (baseline perf=<b>)`. If performance drops more than 0.03 or CLS > 0.01, treat as a defect: find the cause (most likely the hero line reflowing, or the dividers' negative margin), fix, re-run. Kill the serve process.

- [ ] **Step 4: Reduced-motion pass**

In the dev server, emulate reduced motion by injecting a style override check: run `matchMedia("(prefers-reduced-motion: reduce)").matches`. If the pane cannot emulate it (expected), verify statically instead:

```bash
grep -n "prefers-reduced-motion" src/styles/header.scss src/styles/hero-product.scss
grep -n "useReducedMotion" src/components/skills.js src/components/atoms/PuzzleDivider.js
```
Expected: the hero line rule from Task 3, and both components import and use `useReducedMotion`. Record in the ledger that reduced motion was verified by code inspection, not emulation.

- [ ] **Step 5: Final visual sweep**

Screenshots at `mobile` (375), custom 800×1000, and desktop 1280 of: hero (role line visible, h1 two lines on desktop), the first divider, Skills settled. Reset to desktop. No commit unless something was fixed.

---

## Self-review notes

- Spec coverage: §1 → Tasks 2–3; §2 → Tasks 1, 4; §3 → Tasks 1, 5; Constraints → Global Constraints; Verification → Tasks 0, 3–6. The spec's `yourdata.js` location for the roles is superseded by the ruling in Task 2 (the spec is updated in that commit).
- Type consistency: `skillScatter` returns `{x, y, rotate, delay}` and Task 4 reads exactly those keys; `dividerPath()` default string starts `M0 34` in both the test and the component; `HERO_ROLES`/`ROLE_LEAD`/`rolesSentence` names match between Tasks 2 and 3.
- Review Focus items 1, 2, 5 have tests in Tasks 2 and 1; items 3 and 4 are browser checks in Tasks 3 and 4.
