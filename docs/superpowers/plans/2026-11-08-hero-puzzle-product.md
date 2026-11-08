# Hero Puzzle → Mockup Produk — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengganti scene 3D hero dengan SVG keping puzzle yang terbang masuk dan tersusun menjadi mockup jendela app, lalu membuang Three.js beserta dependensinya.

**Architecture:** Geometri keping (tanda knob, path jigsaw, posisi awal, urutan masuk) adalah modul murni `.mjs` yang diuji dengan `node --test`. Komponen `PuzzleProduct` hanya merangkai hasil geometri jadi SVG statis (ikut SSR); gerak masuk dan float memakai CSS keyframes, dan satu hook kecil menangani tilt kursor. Header jadi grid dua kolom; folder `three/` dan dependensinya dihapus setelah komponen baru hidup.

**Tech Stack:** Gatsby 5, React 18.3.1, SCSS (include-media), Framer Motion 12 (tombol saja), Node 24 (`node --test`), Lighthouse via `npx lighthouse`.

**Spec:** `docs/superpowers/specs/2026-11-08-hero-puzzle-product-design.md`

## Global Constraints

- Warna hanya: `#111111`, `#555555`, `#888888`, `#d9d9d9`, `#e5e5e5`, `#fafafa`, `#ffffff`. Tidak ada warna baru.
- Tidak ada `Math.random` di geometri atau komponen: output SSR dan client harus identik (hydration mismatch = bug).
- `PuzzleProduct` tidak memakai Framer Motion, state React, atau `@loadable/component`; satu-satunya efek adalah hook tilt.
- `prefers-reduced-motion: reduce` → keping langsung tersusun, tanpa float, tanpa tilt.
- Hero visual `aria-hidden="true"`; headline `<h1>` tetap teks pertama di kolom kiri.
- Setelah Task 5 tidak boleh ada import `three`, `@react-three/*`, atau `@loadable/component` di `src/`, dan tidak ada chunk berisi `three` di `public/`.
- Format kode: `npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 <file>` untuk tiap file JS/MJS baru.
- Commit kecil per task, pesan conventional, diakhiri `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`. Tidak ada `git push` / `npm run deploy` di plan ini.
- Sebelum `npm run build` untuk verifikasi, selalu `npx gatsby clean` (cache korup bila bergantian develop/build).

## Review Focus

1. **Keping bertetangga tidak saling mengunci** (tab bertemu tab) → terlihat celah/tumpang tindih setelah tersusun. Diuji di Task 1 (`edgeSign` komplementer untuk semua pasangan).
2. **Knob keping tepi terpotong** oleh `overflow: hidden` hero atau viewBox → knob kolom paling kanan/bawah mengarah keluar viewBox. Dicegah di Task 1 (sisi luar selalu `0`) dan dicek visual di Task 6.
3. **Halaman dimuat tanpa JS / sebelum hidrasi** → hero visual harus tetap tampil dan tersusun. Dicek di Task 6 (`public/index.html` berisi 12 `.hero-piece`, dan membuka halaman dengan JS dinonaktifkan tetap menampilkan mockup).
4. **Tilt dan float saling menimpa `transform`** → float berhenti saat kursor bergerak. Dicegah di Task 3 (dua elemen bersarang) dan dicek di Task 6.
5. **Lebar 768–1023 px** (tablet) → dua kolom dengan mockup 50 % lebar bisa membuat h1 2.875 rem patah tiap kata. Dicek di Task 6 pada 800 px; bila patah, `.hero-grid` di rentang itu memakai `grid-template-columns: 1fr 1fr` dan `gap: 32px`.

---

## Task 0: Baseline performa (sebelum ada perubahan)

**Files:** tidak ada perubahan kode. Output `.lighthouse-baseline-*.json` sudah di-ignore oleh `.gitignore` (`.lighthouse-*.json`).

- [ ] **Step 1: Serve build `master` yang ada** — `public/` saat ini adalah build commit `b7bae13`; jalankan `npx gatsby serve -p 9000` di background.

- [ ] **Step 2: Lighthouse baseline** — satu run mobile dan satu run desktop dengan perintah di Task 6 Step 4, output ke `.lighthouse-baseline-mobile.json` dan `.lighthouse-baseline-desktop.json`. Catat `performance.score`, LCP, CLS, dan `total-byte-weight` di ledger eksekusi; angka ini pembanding Task 6.

---

## Task 1: Geometri keping (modul murni + test)

**Files:**
- Create: `src/components/hero/puzzleGeometry.mjs`
- Test: `tests/puzzle-geometry.test.mjs`

**Interfaces:**
- Produces:
  - `GRID = { cols: 4, rows: 3, cellW: 120, cellH: 110, knob: 14 }`
  - `edgeSign(row, col, side)` → `1 | -1 | 0`; `side ∈ "top" | "right" | "bottom" | "left"`
  - `piecePath({ row, col, cols, rows, cellW, cellH, knob })` → `string` (path SVG absolut)
  - `scatterOffset(index, total)` → `{ dx: number, dy: number, rot: number }`
  - `pieceOrder(cols, rows)` → `number[]` (indeks keping, dari tengah ke luar)
  - `enterDelay(rank)` → `number` detik
  - `pieces(grid = GRID)` → `Array<{ index, row, col, d, dx, dy, rot, delay }>` (gabungan di atas; `delay` berdasarkan peringkat di `pieceOrder`)

- [ ] **Step 1: Tulis test yang gagal**

```js
import { test } from "node:test"
import assert from "node:assert/strict"
import {
  GRID, edgeSign, piecePath, scatterOffset, pieceOrder, enterDelay, pieces,
} from "../src/components/hero/puzzleGeometry.mjs"

test("outer edges are straight, inner edges are tabs or blanks", () => {
  assert.equal(edgeSign(0, 0, "top"), 0)
  assert.equal(edgeSign(0, 0, "left"), 0)
  assert.equal(edgeSign(2, 3, "bottom"), 0)
  assert.equal(edgeSign(2, 3, "right"), 0)
  assert.ok([1, -1].includes(edgeSign(0, 0, "right")))
  assert.ok([1, -1].includes(edgeSign(0, 0, "bottom")))
})

test("neighbouring pieces interlock", () => {
  for (let r = 0; r < GRID.rows; r++)
    for (let c = 0; c < GRID.cols; c++) {
      if (c + 1 < GRID.cols)
        assert.equal(edgeSign(r, c, "right"), -edgeSign(r, c + 1, "left"))
      if (r + 1 < GRID.rows)
        assert.equal(edgeSign(r, c, "bottom"), -edgeSign(r + 1, c, "top"))
    }
})

test("piecePath is a closed absolute path starting at the cell origin", () => {
  const d = piecePath({ row: 1, col: 2, ...GRID })
  assert.ok(d.startsWith("M240 110"))
  assert.ok(d.trim().endsWith("Z"))
  // 4 inner edges → 4 arcs; corner piece (0,0) has 2 inner edges → 2 arcs
  assert.equal((d.match(/A/g) || []).length, 4)
  assert.equal((piecePath({ row: 0, col: 0, ...GRID }).match(/A/g) || []).length, 2)
})

test("piecePath stays inside the cell plus one knob", () => {
  const d = piecePath({ row: 0, col: 3, ...GRID })
  const nums = d.replace(/A\S* \S* \S* \S* \S* /g, "A ")
    .match(/-?\d+(\.\d+)?/g).map(Number)
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1)
  assert.ok(Math.max(...xs) <= 480 && Math.min(...xs) >= 360 - GRID.knob)
  assert.ok(Math.min(...ys) >= 0 && Math.max(...ys) <= 110 + GRID.knob)
})

test("scatterOffset is deterministic and within range", () => {
  assert.deepEqual(scatterOffset(3, 12), scatterOffset(3, 12))
  for (let i = 0; i < 12; i++) {
    const { dx, dy, rot } = scatterOffset(i, 12)
    const dist = Math.hypot(dx, dy)
    assert.ok(dist >= 160 && dist <= 260, `dist ${dist}`)
    assert.ok(rot >= -25 && rot <= 25)
  }
})

test("pieceOrder starts from the centre and covers every piece once", () => {
  const order = pieceOrder(4, 3)
  assert.equal(order.length, 12)
  assert.deepEqual([...order].sort((a, b) => a - b), [...Array(12).keys()])
  assert.ok([5, 6].includes(order[0])) // row 1, col 1 or 2
  assert.ok([0, 3, 8, 11].includes(order[11])) // a corner last
})

test("enterDelay and pieces() wire everything together", () => {
  assert.equal(enterDelay(0), 0)
  assert.equal(enterDelay(3), 0.21)
  const all = pieces()
  assert.equal(all.length, 12)
  assert.equal(all[0].index, 0)
  assert.ok(all[5].delay < all[0].delay) // centre piece enters before corner
  assert.ok(all.every(p => p.d.startsWith("M") && typeof p.dx === "number"))
})
```

- [ ] **Step 2: Jalankan test, pastikan gagal**

Run: `npm test`
Expected: FAIL dengan `Cannot find module … puzzleGeometry.mjs`

- [ ] **Step 3: Implementasi `src/components/hero/puzzleGeometry.mjs`**

Keputusan yang harus diikuti:

- `edgeSign`: sisi luar → `0`. Sisi `right` keping `(r,c)` = `(r + c) % 2 === 0 ? 1 : -1`; sisi `left` = `-edgeSign(r, c-1, "right")`. Sisi `bottom` = `(r + c) % 2 === 0 ? -1 : 1`; sisi `top` = `-edgeSign(r-1, c, "bottom")`.
- `piecePath`: telusuri searah jarum jam: top (kiri→kanan), right (atas→bawah), bottom (kanan→kiri), left (bawah→atas). Untuk setiap sisi dari titik A ke B dengan panjang `L`, arah `d = (B−A)/L`, normal keluar `n` (top `(0,−1)`, right `(1,0)`, bottom `(0,1)`, left `(−1,0)`), tanda `s = edgeSign(...)`, dan `k = knob`. Titik lokal `(u, v)` dipetakan ke `A + d·u + n·s·v`. Bila `s === 0`: `L B`. Bila tidak:

  ```
  L  (L/2 − 0.75k, 0)
  C  (L/2 − 0.30k, 0)  (L/2 − 0.70k, 0.50k)  (L/2 − 0.45k, 0.60k)
  A  k k 0 1 <sweep> (L/2 + 0.45k, 0.60k)      // sweep = s > 0 ? 1 : 0
  C  (L/2 + 0.70k, 0.50k)  (L/2 + 0.30k, 0)    (L/2 + 0.75k, 0)
  L  B
  ```
  Knob simetris terhadap tengah sisi, jadi tetangga (arah balik, tanda balik) menghasilkan kurva yang sama. Angka diformat dengan `Number(x.toFixed(2))` agar path pendek dan stabil. Path dimulai `M<x0> <y0>` dan diakhiri `Z`.
- `scatterOffset(index, total)`: `angle = (index / total) * 2π + 0.6`; `dist = 160 + 100 * ((index * 7919) % 1000) / 999`; `dx = cos(angle)·dist`, `dy = sin(angle)·dist`; `rot = −25 + 50 * ((index * 31) % 100) / 99`. Bulatkan ke 2 desimal.
- `pieceOrder(cols, rows)`: urutkan indeks `0..cols·rows−1` berdasarkan jarak pusat sel ke pusat grid (naik), seri dipecah oleh indeks.
- `enterDelay(rank)` = `Number((rank * 0.07).toFixed(2))`.
- `pieces(grid)`: untuk tiap indeks `i` (`row = ⌊i / cols⌋`, `col = i % cols`) kembalikan `{ index, row, col, d: piecePath(...), ...scatterOffset(i, total), delay: enterDelay(pieceOrder(...).indexOf(i)) }`.

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm test`
Expected: semua test di `puzzle-geometry` dan `site-metadata` PASS (scene-support masih ada dan masih lulus sampai Task 5).

- [ ] **Step 5: Commit**

```bash
git add src/components/hero/puzzleGeometry.mjs tests/puzzle-geometry.test.mjs
git commit -m "feat(hero): jigsaw piece geometry with interlocking edges and deterministic scatter"
```

---

## Task 2: Komponen `PuzzleProduct` + animasi masuk

**Files:**
- Create: `src/components/hero/PuzzleProduct.js`
- Create: `src/styles/hero-product.scss`
- Modify: `src/styles/mains.scss` (tambah `@import "./hero-product.scss";` setelah `header.scss`)

**Interfaces:**
- Consumes: `pieces()` dari Task 1.
- Produces: default export `PuzzleProduct` (tanpa props) yang merender `div.hero-product[aria-hidden] > div.hero-product-float > svg.hero-product-svg`. Task 3 menambahkan hook ke `div.hero-product`; Task 4 menaruh komponen di `.hero-visual`.

- [ ] **Step 1: Tulis komponen**

`PuzzleProduct.js`:
- `const PIECES = pieces()` di module scope (dihitung sekali).
- `<svg className="hero-product-svg" viewBox="0 0 480 330" focusable="false">`.
- `<defs>` berisi `<g id="hero-product-art">` dengan artwork berikut (semua angka dalam viewBox; `rx` radius sudut):
  - Jendela: `rect x=0.5 y=0.5 w=479 h=329 rx=14 fill=#ffffff stroke=#e5e5e5`
  - Bar atas: `line x1=0 y1=28 x2=480 y2=28 stroke=#e5e5e5`; tiga `circle r=4 fill=#d9d9d9` di `(18,14) (32,14) (46,14)`
  - Sidebar: `rect x=0.5 y=28 w=96 h=301 fill=#fafafa` (clip oleh rect jendela: letakkan sidebar di dalam `<g clipPath="url(#hero-window-clip)">` dengan clipPath = rect jendela yang sama); `line x1=96 y1=28 x2=96 y2=330 stroke=#e5e5e5`; 5 menu `rect x=14 y=48+i·26 w=68 h=8 rx=4` fill `#e5e5e5`, kecuali `i=1` fill `#111111`
  - Judul: `rect x=120 y=52 w=150 h=12 rx=6 fill=#111111`; sub `rect x=120 y=72 w=220 h=8 rx=4 fill=#e5e5e5`
  - Tombol: `rect x=380 y=48 w=82 h=28 rx=6 fill=#111111`; label `rect x=398 y=59 w=46 h=6 rx=3 fill=#ffffff`
  - Tiga kartu statistik, `i=0..2`: `rect x=120+i·118 y=96 w=106 h=58 rx=8 fill=#ffffff stroke=#e5e5e5`; label `rect x+12 y+12 w=40 h=6 rx=3 fill=#e5e5e5`; nilai `rect x+12 y+30 w=58 h=12 rx=6 fill=#111111`
  - Grafik: `rect x=120 y=170 w=342 h=120 rx=8 fill=#ffffff stroke=#e5e5e5`; 7 batang `rect x=140+i·46 w=26 rx=3`, tinggi `[36,58,46,78,64,92,54]`, `y = 272 − tinggi`, fill `#d9d9d9` kecuali `i=5` fill `#111111`
- `<defs>` juga berisi satu `<clipPath id={"hero-piece-" + index}><path d={d}/></clipPath>` per keping.
- Per keping: `<g className="hero-piece" style={{ "--dx": dx + "px", "--dy": dy + "px", "--rot": rot + "deg", "--delay": delay + "s" }}>` berisi `<g clipPath="url(#hero-piece-N)"><use href="#hero-product-art" /></g>` dan `<path className="hero-piece-seam" d={d} />`.
- Pembungkus: `<div className="hero-product" aria-hidden="true"><div className="hero-product-float">{svg}</div></div>`.

- [ ] **Step 2: Tulis `hero-product.scss`**

```scss
.hero-product { width: 100%; }
.hero-product-float {
  filter: drop-shadow(0 18px 32px rgba(0, 0, 0, 0.1));
  animation: hero-float 6s ease-in-out 1.8s infinite;
}
.hero-product-svg { display: block; width: 100%; height: auto; overflow: visible; }
.hero-piece {
  transform-box: fill-box;
  transform-origin: center;
  animation: hero-piece-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay);
}
.hero-piece-seam { fill: none; stroke: #e5e5e5; stroke-width: 1; }
@keyframes hero-piece-in {
  from { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); }
  to   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
}
@keyframes hero-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@media (prefers-reduced-motion: reduce) {
  .hero-piece, .hero-product-float { animation: none; }
}
```

- [ ] **Step 3: Pasang sementara untuk dilihat**

Di `Header.js`, tambahkan `<PuzzleProduct />` tepat setelah `<HeroSceneLoader …/>` (sementara, dirapikan di Task 4). Jalankan dev server (`preview_start` `gatsby-develop`) dan buka `http://localhost:8000/`.

- [ ] **Step 4: Verifikasi di browser**

Dengan `javascript_tool`:
```js
const g = [...document.querySelectorAll(".hero-piece")]
;[g.length, g.every(el => getComputedStyle(el).opacity === "1"), g.map(el => getComputedStyle(el).transform).every(t => t === "none" || t === "matrix(1, 0, 0, 1, 0, 0)")]
```
Expected (setelah ≥2 s): `[12, true, true]`. Screenshot: 12 keping terlihat sebagai satu jendela app dengan garis sambungan tipis; muat ulang untuk melihat keping terbang masuk dari tengah ke luar.

- [ ] **Step 5: Format dan commit**

```bash
npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 src/components/hero/PuzzleProduct.js
git add src/components/hero/PuzzleProduct.js src/styles/hero-product.scss src/styles/mains.scss src/components/Header.js
git commit -m "feat(hero): puzzle pieces assembling into a product mockup (SVG + CSS keyframes)"
```

---

## Task 3: Tilt kursor (`usePointerTilt`)

**Files:**
- Create: `src/components/hero/usePointerTilt.js`
- Modify: `src/components/hero/PuzzleProduct.js` (pasang hook ke `div.hero-product`)
- Modify: `src/styles/hero-product.scss` (`.hero-product { transition: transform 0.4s ease; will-change: transform; }`)

**Interfaces:**
- Produces: `usePointerTilt(ref, { maxDeg = 4, reach = 420 } = {})` — `ref` adalah `useRef` ke elemen yang di-tilt; tidak mengembalikan apa pun.

- [ ] **Step 1: Implementasi hook**

Mengikuti pola `EyeFace.js`: `useEffect` yang keluar lebih awal bila `window` tidak ada atau `matchMedia("(prefers-reduced-motion: reduce)").matches`. Dengarkan `pointermove` di `window` (abaikan `e.pointerType === "touch"`), simpan titik terakhir, jadwalkan satu `requestAnimationFrame`. Di frame: `rect = el.getBoundingClientRect()`, `nx = clamp((x − cx) / reach, −1, 1)`, `ny = clamp((y − cy) / reach, −1, 1)`, lalu `el.style.transform = perspective(900px) rotateX(${−ny·maxDeg}deg) rotateY(${nx·maxDeg}deg)`. `pointerleave` pada `document.documentElement` (atau `pointerout` dengan `relatedTarget === null`) → `el.style.transform = ""`. Cleanup: hapus listener dan batalkan frame.

- [ ] **Step 2: Pasang di `PuzzleProduct`**

`const tiltRef = useRef(null); usePointerTilt(tiltRef)`; `<div className="hero-product" ref={tiltRef} aria-hidden="true">`.

- [ ] **Step 3: Verifikasi di browser**

Gerakkan pointer ke pojok kanan atas hero lalu baca `document.querySelector(".hero-product").style.transform` → berisi `rotateX(` dan `rotateY(` dengan nilai |≤ 4|deg. Gerakkan pointer keluar jendela → string kosong. Selama pointer bergerak, `getComputedStyle(document.querySelector(".hero-product-float")).animationName` tetap `hero-float` (float tidak tertimpa).

- [ ] **Step 4: Format dan commit**

```bash
npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 src/components/hero/usePointerTilt.js src/components/hero/PuzzleProduct.js
git add src/components/hero/usePointerTilt.js src/components/hero/PuzzleProduct.js src/styles/hero-product.scss
git commit -m "feat(hero): pointer tilt on the product mockup"
```

---

## Task 4: Layout hero dua kolom, lepas scene 3D dari Header

**Files:**
- Modify: `src/components/Header.js`
- Modify: `src/styles/header.scss`

**Interfaces:**
- Consumes: `PuzzleProduct` (Task 2–3).
- Produces: struktur DOM `.hero-section > .container > .hero-grid > (.hero-copy, .hero-visual)` yang dipakai verifikasi Task 6.

- [ ] **Step 1: Ubah `Header.js`**

Hapus import dan pemakaian `HeroSceneLoader`, `useRef`, dan `heroRef`. Struktur baru sesuai spec §4.6: `.hero-grid` berisi `.hero-copy` (avatar, `.hero-name`, `h1`, `.hero-paragraph`, `.hero-cta-group`, semua tetap `hero-enter`) dan `.hero-visual` berisi `<PuzzleProduct />`. Teks dan tombol tidak berubah.

- [ ] **Step 2: Ubah `header.scss`**

- Hapus blok `.hero-scene`, `.hero-scene--fallback`, `.hero-scene--canvas`, `.hero-scene--fallback .hero-fallback-art` beserta komentarnya; hapus komentar "above the dotted hero background" di `.hero-avatar`.
- Ganti nama `.header-wrapper` → `.hero-copy` dan ubah: `max-width: none; padding: 0; align-items: flex-start; text-align: left;` avatar `margin: 0 0 28px;` `.hero-paragraph { max-width: 480px; }` `.hero-cta-group { justify-content: flex-start; }`.
- Tambah:
  ```scss
  .hero-grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: 48px;
    align-items: center;
  }
  .hero-visual { max-width: 520px; width: 100%; justify-self: end; }
  @include media("<tablet") {
    .hero-grid { grid-template-columns: 1fr; gap: 0; }
    .hero-visual { order: -1; width: 85%; max-width: 360px; margin: 0 auto 28px; justify-self: center; }
    .hero-copy { align-items: center; text-align: center; .hero-cta-group { justify-content: center; } }
  }
  ```
- `.hero-section` tetap `padding: 128px 0 32px` / `104px 0 24px`, `min-height: 55vh`, `overflow: hidden`.

- [ ] **Step 3: Verifikasi di browser**

Dev server, `resize_window` desktop (≥1280): screenshot menunjukkan teks kiri, mockup kanan, keduanya vertikal di tengah. `resize_window` mobile (375): mockup di atas teks, teks rata tengah, `document.documentElement.scrollWidth === window.innerWidth` (tanpa scroll horizontal). Kembalikan ke desktop.

- [ ] **Step 4: Format dan commit**

```bash
npx prettier --write --no-semi --arrow-parens avoid --trailing-comma es5 src/components/Header.js
git add src/components/Header.js src/styles/header.scss
git commit -m "feat(hero): two-column hero with the puzzle mockup, scene loader removed"
```

---

## Task 5: Hapus kode dan dependensi Three.js

**Files:**
- Delete: `src/components/three/` (6 file), `tests/scene-support.test.mjs`
- Modify: `package.json`, `package-lock.json` (via `npm uninstall`)

- [ ] **Step 1: Hapus file**

```bash
git rm -r src/components/three tests/scene-support.test.mjs
```

- [ ] **Step 2: Hapus dependensi**

```bash
npm uninstall three @react-three/fiber @react-three/drei @loadable/component
```
Expected: `package.json` tanpa keempat paket; `grep -rn "three\|loadable" src gatsby-*.js` tidak mengembalikan apa pun selain komentar yang tidak relevan.

- [ ] **Step 3: Test dan build**

Run: `npm test` → semua PASS (puzzle-geometry + site-metadata).
Run: `npx gatsby clean && npm run build` (background, bisa >2 menit) → selesai tanpa error.
Run: `grep -l "three" public/*.js | head` → kosong. `grep -c "hero-piece" public/index.html` → ≥ 12.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: drop three.js, react-three-fiber, drei and loadable"
```

---

## Task 6: Verifikasi akhir (perilaku khusus + performa)

**Files:** tidak ada perubahan kode kecuali perbaikan dari temuan.

- [ ] **Step 1: Reduced motion**

Browser pane tidak bisa mengemulasi `prefers-reduced-motion`, jadi uji efek rule-nya secara langsung: buka halaman di dev server, lalu jalankan
```js
const s = document.createElement("style"); s.textContent = ".hero-piece,.hero-product-float{animation:none}"; document.head.append(s);
[...document.querySelectorAll(".hero-piece")].every(el => getComputedStyle(el).opacity === "1" && ["none","matrix(1, 0, 0, 1, 0, 0)"].includes(getComputedStyle(el).transform))
```
Expected: `true` (tanpa animasi, keping tetap tersusun dan terlihat, sama dengan yang dilakukan rule `@media (prefers-reduced-motion: reduce)`). Untuk tilt, cukup baca `usePointerTilt.js` dan pastikan `useEffect` keluar lebih awal saat `matchMedia(...).matches`.

- [ ] **Step 2: Tanpa JS**

`gatsby serve -p 9000` (background) lalu `curl -s http://localhost:9000/ | grep -o 'class="hero-piece"' | wc -l` → `12`, dan `grep -o 'hero-piece-in' public/*.css | head -1` → ada (keyframe ikut CSS statis).

- [ ] **Step 3: Tablet 800 px**

`resize_window` width 800 height 1000: screenshot; h1 tidak patah per kata dan mockup tidak terpotong. Bila patah, terapkan fallback Review Focus #5 di `header.scss` dan commit `fix(hero): tablet grid columns`.

- [ ] **Step 4: Lighthouse**

Dengan `gatsby serve -p 9000` berjalan, 3 run mobile dan 3 run desktop:
```bash
npx lighthouse http://localhost:9000/ --preset=perf --form-factor=mobile --screenEmulation.mobile --output=json --output-path=.lighthouse-mobile-1.json --chrome-flags="--headless=new" --quiet
npx lighthouse http://localhost:9000/ --preset=perf --form-factor=desktop --screenEmulation.disabled --output=json --output-path=.lighthouse-desktop-1.json --chrome-flags="--headless=new" --quiet
```
Baca `categories.performance.score`, `audits["largest-contentful-paint"].numericValue`, `audits["cumulative-layout-shift"].numericValue`, `audits["total-byte-weight"].numericValue`. Expected: CLS `0`, Perf mobile ≥ 0.87 (median dari 3 run), dan `total-byte-weight` lebih kecil dari baseline Task 0. Bila Perf mobile di bawah baseline pada ketiga run, cari penyebabnya di audit `mainthread-work-breakdown` dan `bootup-time` sebelum menyimpulkan.

- [ ] **Step 5: Refresh `public/` dan commit**

Setelah semua lulus: `git add -u public && git add -f public/index.html` (pola repo untuk file public yang dilacak), lalu
```bash
git commit -m "chore(build): refresh public/ with the puzzle hero"
```

- [ ] **Step 6: Review akhir**

Minta review branch penuh (superpowers:requesting-code-review) dengan fokus pada Review Focus di atas; perbaiki temuan Important sebelum integrasi lewat superpowers:finishing-a-development-branch.
