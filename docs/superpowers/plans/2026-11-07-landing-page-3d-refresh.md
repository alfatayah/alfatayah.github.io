# Landing Page Refresh (Hero 3D + Perbaikan) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengganti hero statis dengan scene 3D monokrom (Three.js) yang merespons kursor dan scroll, sekaligus membereskan SEO, kode mati, gambar project, dan section About, tanpa membuat situs lebih lambat.

**Architecture:** Semua kode 3D hidup di `src/components/three/` dan hanya dimuat di browser lewat `@loadable/component` (`ssr: false`), jadi HTML statis Gatsby berisi gambar fallback dan `three` tidak masuk bundle halaman lain. Logika murni (keputusan dukungan, normalisasi kursor, progres scroll) ada di satu modul `.mjs` tanpa dependensi supaya bisa diuji dengan `node --test`. Perubahan non-3D mengikuti pola yang sudah ada: data di `yourdata.js`, komponen Framer Motion, SCSS per section di-import dari `mains.scss`.

**Tech Stack:** Gatsby 5, React 18.3.1, `three@^0.187.0`, `@react-three/fiber@^8.18.0`, `@react-three/drei@^9.122.0`, `@loadable/component@^5.16.0`, Framer Motion 12, SCSS, Node 24 (`node --test`), `sharp` (sudah terpasang lewat gatsby-plugin-sharp).

**Spec:** `docs/superpowers/specs/2026-11-07-landing-page-3d-refresh-design.md`

## Global Constraints

- React tetap 18.3.1 → **wajib** `@react-three/fiber@^8` (v9 butuh React 19). Jangan pakai `--legacy-peer-deps`.
- Hanya `src/components/three/HeroScene.js` dan `HeroObject.js` yang boleh meng-import `three`, `@react-three/fiber`, atau `@react-three/drei`.
- `gatsby build` harus lulus tanpa `window is not defined`; halaman `/daily-log/` tidak boleh memuat chunk yang berisi `three`.
- Lighthouse mobile: Performance ≥ 85, CLS = 0, LCP ≤ 2,5 s.
- Warna: hitam `#111111`, putih `#ffffff`, border `#e5e5e5`, abu teks `#555555`; objek 3D `#1a1a1a`. Tidak ada warna baru.
- `prefers-reduced-motion: reduce`, tanpa WebGL, atau `navigator.deviceMemory < 4` → fallback statis, bukan scene.
- `<canvas>` dan fallback diberi `aria-hidden="true"`; tidak ada interaksi yang hanya lewat 3D.
- Commit kecil per task, pesan conventional (`feat:`, `chore:`, `fix:`), diakhiri `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Tidak ada `git push`/`npm run deploy` di dalam plan ini; deploy menunggu perintah pemilik.

## Review Focus

1. **`navigator.deviceMemory` tidak ada** (Firefox, Safari) → scene tetap harus tampil; `undefined` bukan "memori kecil". Diuji di Task 3.
2. **Halaman dibuka langsung di `/#work`** (hero di luar layar saat mount) → render loop harus mulai `never` dan baru jalan saat hero masuk viewport. Diuji di Task 6.
3. **WebGL context hilang** (iOS saat tab di-background) → canvas kosong permanen. Harus jatuh ke fallback. Diuji di Task 5.
4. **`pointermove` dari sentuhan saat scroll di HP** → objek ikut goyang tiap scroll jari. Event `pointerType === "touch"` diabaikan. Diuji di Task 5.
5. **Resize desktop → sempit** (rotasi tablet, split-screen) → objek yang diposisikan kanan harus pindah ke tengah tanpa reload. Diuji di Task 7.

---

## Tahap 0 — Bersih-bersih

### Task 1: SEO, manifest, dan gambar Open Graph

**Files:**
- Modify: `gatsby-config.js`
- Modify: `src/components/seo.js`
- Modify: `package.json` (script `test`)
- Create: `scripts/make-og-image.mjs`, `static/og-image.png`
- Test: `tests/site-metadata.test.mjs`

**Interfaces:**
- Produces: `siteMetadata.siteUrl` yang dipakai `seo.js`; script `npm test` = `node --test tests/` yang dipakai semua task berikutnya.

- [ ] **Step 0: Ambil baseline Lighthouse sebelum mengubah apa pun**

Run: `npx gatsby build && npx gatsby serve` lalu perintah Lighthouse persis seperti Task 7 Step 4 (mobile dan desktop) dengan output `./.lighthouse-baseline-mobile.json` / `-desktop.json`. Catat skor Performance, Accessibility, SEO, LCP, CLS; angka ini dilaporkan di Task 11 Step 6.

- [ ] **Step 1: Tulis test metadata yang gagal**

```js
// tests/site-metadata.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { createRequire } from "node:module"
const require = createRequire(import.meta.url)
const config = require("../gatsby-config.js")
const manifest = config.plugins.find(p => p.resolve === "gatsby-plugin-manifest").options

test("siteMetadata is Fadhil's, not the starter's", () => {
  assert.equal(config.siteMetadata.title, "Fadhil Alfatayah — AI Engineer & Full-Stack Developer")
  assert.equal(config.siteMetadata.description, "Portfolio of Fadhil Alfatayah: AI automation, intelligent workflows, and mobile & web products built with React Native, React, Express, and Laravel.")
  assert.equal(config.siteMetadata.author, "@alfatayah")
  assert.equal(config.siteMetadata.siteUrl, "https://alfatayah.github.io")
})

test("manifest matches the site identity", () => {
  assert.equal(manifest.name, "Fadhil Alfatayah")
  assert.equal(manifest.short_name, "Fadhil")
  assert.equal(manifest.theme_color, "#111111")
  assert.equal(manifest.background_color, "#ffffff")
})
```

- [ ] **Step 2: Tambahkan script dan jalankan test, pastikan gagal**

Ubah `package.json` → `"test": "node --test tests/"`.
Run: `npm test`
Expected: FAIL pada assertion `title`.

- [ ] **Step 3: Perbarui `gatsby-config.js`**

Isi `siteMetadata` dan opsi manifest persis seperti nilai di test. Hapus komentar starter.

- [ ] **Step 4: Jalankan test, pastikan lulus**

Run: `npm test` → Expected: 2 passed.

- [ ] **Step 5: Buat generator OG image**

`scripts/make-og-image.mjs`: pakai `sharp` untuk merender string SVG 1200×630 (latar `#ffffff`; teks "Fadhil Alfatayah" 72 px bold `#111111` + titik hitam di akhir seperti logo navbar; baris kedua "AI Engineer · Full-Stack Developer · Builder" 32 px `#555555`; garis tipis `#e5e5e5` di bawahnya) ke `static/og-image.png`. Font: `font-family="Inter, Segoe UI, Arial, sans-serif"`.
Run: `node scripts/make-og-image.mjs` → Expected: file `static/og-image.png` ada, 1200×630 (cek `node -e "import('sharp').then(m=>m.default('static/og-image.png').metadata().then(console.log))"`).

- [ ] **Step 6: Tambahkan tag OG/Twitter di `seo.js`**

Tambah `siteUrl` ke query GraphQL. Tambahkan ke array `meta`: `og:url` = `siteUrl`, `og:image` = `${siteUrl}/og-image.png`, `og:image:width` `1200`, `og:image:height` `630`, `twitter:image` = URL yang sama; ubah `twitter:card` menjadi `summary_large_image`.

- [ ] **Step 7: Verifikasi di hasil build**

Run: `npx gatsby build` lalu `grep -o 'property="og:image" content="[^"]*"' public/index.html`
Expected: `content="https://alfatayah.github.io/og-image.png"`; dan `grep -c "Kick off" public/index.html` → `0`.

- [ ] **Step 8: Commit**

```bash
git add gatsby-config.js src/components/seo.js package.json scripts/make-og-image.mjs static/og-image.png tests/site-metadata.test.mjs
git commit -m "chore(seo): replace starter metadata, add manifest identity and OG image"
```

### Task 2: Hapus kode mati, rapikan Skills

**Files:**
- Delete: `src/components/Promotion.js`, `src/styles/promotion.scss`
- Modify: `src/styles/mains.scss:14` (hapus import promotion), `src/yourdata.js` (hapus `promotionHeading`, `promotionPara`, komentar "Promotion Section"), `src/components/skills.js:26` (hapus prop `style`), `src/styles/skills.scss`, `package.json`

- [ ] **Step 1: Pastikan benar-benar tidak dipakai**

Run: `grep -rn "Promotion\|react-reveal\|react-scroll" src --include=*.js`
Expected: hanya `src/components/Promotion.js` sendiri yang muncul.

- [ ] **Step 2: Hapus file, import, dan data; uninstall paket**

Run: `npm uninstall react-reveal react-scroll`

- [ ] **Step 3: Pindahkan inline style Skills ke SCSS**

Di `skills.scss`, tambahkan pada selector `#skill` (atau `.section.skills-section`, lalu beri class itu di `skills.js`): `border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); background: var(--color-bg-alt);`.

- [ ] **Step 4: Verifikasi**

Run: `grep -rn "promotion\|react-reveal\|react-scroll" src package.json` → Expected: tidak ada output.
Run: `npx gatsby build` → Expected: lulus; buka `/` di dev server, section Skills masih berlatar abu dengan garis atas-bawah.

- [ ] **Step 5: Commit**

```bash
git add -A src package.json package-lock.json
git commit -m "chore: remove Promotion section and unused react-reveal/react-scroll"
```

## Tahap 1 — Hero 3D MVP

### Task 3: Dependensi 3D dan modul logika murni

**Files:**
- Create: `src/components/three/sceneSupport.mjs`
- Test: `tests/scene-support.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces:
  - `shouldRenderScene({ reducedMotion: boolean, webgl: boolean, deviceMemory?: number }): boolean`
  - `normalizePointer(clientX: number, clientY: number, width: number, height: number): { x: number, y: number }` — rentang −1..1, `y` positif di atas layar.
  - `scrollProgress(scrollY: number, heroHeight: number): number` — 0..1, terpotong (clamp); `heroHeight <= 0` → 0.

- [ ] **Step 1: Tulis test yang gagal**

```js
// tests/scene-support.test.mjs
import { test } from "node:test"
import assert from "node:assert/strict"
import { shouldRenderScene, normalizePointer, scrollProgress } from "../src/components/three/sceneSupport.mjs"

test("renders when capable and deviceMemory is unknown", () => {
  assert.equal(shouldRenderScene({ reducedMotion: false, webgl: true }), true)
  assert.equal(shouldRenderScene({ reducedMotion: false, webgl: true, deviceMemory: undefined }), true)
})
test("falls back on reduced motion, no webgl, or low memory", () => {
  assert.equal(shouldRenderScene({ reducedMotion: true, webgl: true }), false)
  assert.equal(shouldRenderScene({ reducedMotion: false, webgl: false }), false)
  assert.equal(shouldRenderScene({ reducedMotion: false, webgl: true, deviceMemory: 2 }), false)
  assert.equal(shouldRenderScene({ reducedMotion: false, webgl: true, deviceMemory: 4 }), true)
})
test("normalizePointer maps viewport to -1..1 with y up", () => {
  assert.deepEqual(normalizePointer(0, 0, 800, 600), { x: -1, y: 1 })
  assert.deepEqual(normalizePointer(800, 600, 800, 600), { x: 1, y: -1 })
  assert.deepEqual(normalizePointer(400, 300, 800, 600), { x: 0, y: 0 })
})
test("scrollProgress clamps and tolerates zero height", () => {
  assert.equal(scrollProgress(0, 600), 0)
  assert.equal(scrollProgress(300, 600), 0.5)
  assert.equal(scrollProgress(900, 600), 1)
  assert.equal(scrollProgress(100, 0), 0)
})
```

- [ ] **Step 2: Run** `npm test` → Expected: FAIL, modul tidak ditemukan.

- [ ] **Step 3: Implementasikan ketiga fungsi di `sceneSupport.mjs`** (tanpa import apa pun; `export` named).

- [ ] **Step 4: Run** `npm test` → Expected: semua lulus.

- [ ] **Step 5: Install dependensi 3D**

Run: `npm install three@^0.187.0 @react-three/fiber@^8.18.0 @react-three/drei@^9.122.0 @loadable/component@^5.16.0`
Run: `npm ls @react-three/fiber three react` → Expected: fiber `8.18.x`, react `18.3.1`, tanpa `ERESOLVE`/`invalid`.

- [ ] **Step 6: Commit**

```bash
git add src/components/three/sceneSupport.mjs tests/scene-support.test.mjs package.json package-lock.json
git commit -m "feat(hero): add 3D deps and pure scene-support helpers"
```

### Task 4: Fallback statis dan loader client-only menggantikan grid titik

**Files:**
- Create: `src/components/three/HeroSceneFallback.js`, `src/components/three/HeroSceneLoader.js`, `src/components/three/HeroScene.js` (stub), `src/images/hero-fallback.svg` (placeholder sementara; diganti PNG di Task 7)
- Modify: `src/components/Header.js:5,30`, `src/styles/header.scss` (hapus `.hero-grid-background`, tambah `.hero-scene`)
- Delete: `src/components/atoms/HeroBackground.js`
- Modify: `package.json` (uninstall `animejs` — satu-satunya pemakainya adalah `HeroBackground.js`; cek dulu dengan `grep -rn animejs src`)

**Interfaces:**
- Consumes: `shouldRenderScene` dari Task 3.
- Produces:
  - `HeroSceneFallback()` → `<div className="hero-scene hero-scene--fallback" aria-hidden="true"><img src={heroFallback} alt="" width="800" height="800" /></div>`
  - `HeroSceneLoader({ heroRef })` → komponen default export; `heroRef` adalah ref ke `<section className="hero-section">` (dipakai Task 6 untuk IntersectionObserver dan tinggi hero).
  - `HeroScene({ active, heroRef })` default export — di task ini masih stub `<div className="hero-scene" data-scene="stub" />`.

- [ ] **Step 1: Buat `hero-fallback.svg` placeholder**

SVG 800×800: lingkaran radius 300 di tengah, `fill` radial gradient `#3a3a3a` → `#111111`, opacity 0.9. Cukup untuk dipakai sampai Task 7.

- [ ] **Step 2: Implementasikan `HeroSceneFallback.js` dan `HeroSceneLoader.js`**

`HeroSceneLoader`:
- `const HeroScene = loadable(() => import("./HeroScene"), { ssr: false, fallback: <HeroSceneFallback /> })`
- State `supported` (`null` → belum dicek). Di `useEffect`: `supported = shouldRenderScene({ reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches, webgl: !!document.createElement("canvas").getContext("webgl"), deviceMemory: navigator.deviceMemory })`.
- Render `supported === true ? <HeroScene active heroRef={heroRef} /> : <HeroSceneFallback />` (`active` diisi sungguhan di Task 6).

- [ ] **Step 3: Pasang di `Header.js`, hapus `HeroBackground`**

`Header` membuat `heroRef = useRef(null)`, dipasang ke `<section ref={heroRef} className="hero-section">`; ganti `<HeroBackground />` dengan `<HeroSceneLoader heroRef={heroRef} />`. Hapus file `HeroBackground.js`, `npm uninstall animejs`.

- [ ] **Step 4: SCSS**

Hapus blok `.hero-grid-background` di `header.scss`. Tambah:
`.hero-scene { position: absolute; inset: 0; z-index: 0; pointer-events: none; }` dan `.hero-scene--fallback img { position: absolute; top: 50%; left: 62%; width: 420px; height: 420px; transform: translate(-50%, -50%); opacity: .9; }` dengan `@include media("<tablet") { left: 50%; width: 260px; height: 260px; opacity: .55; }`. `.header-wrapper` sudah `z-index: 1`.

- [ ] **Step 5: Verifikasi SSR dan client**

Run: `npx gatsby build` → Expected: lulus.
Run: `grep -c 'hero-scene--fallback' public/index.html` → Expected: `1` (HTML statis berisi fallback).
Run: `grep -rn animejs src package.json` → Expected: kosong.
Dev server (`npm run develop`), buka `/`: setelah JS jalan, `document.querySelector('[data-scene="stub"]')` ada (scene dimuat client-side). Grid titik tidak ada lagi.

- [ ] **Step 6: Commit**

```bash
git add -A src package.json package-lock.json
git commit -m "feat(hero): client-only scene loader with static fallback, drop dot grid"
```

### Task 5: Scene dan objek: idle + mengikuti kursor

**Files:**
- Modify: `src/components/three/HeroScene.js` (ganti stub)
- Create: `src/components/three/HeroObject.js`, `src/components/three/useSceneInput.js`
- Modify: `src/components/three/HeroSceneLoader.js` (tangani context lost)
- Modify: `src/styles/header.scss` (`.hero-scene canvas { display:block; width:100%; height:100% }`)

**Interfaces:**
- Consumes: `normalizePointer`, `scrollProgress` (Task 3); `HeroSceneLoader` (Task 4).
- Produces:
  - `useSceneInput(heroRef): { pointer: MutableRefObject<{x:number,y:number}>, scroll: MutableRefObject<{progress:number}> }` — nilai di-update lewat `pointermove`/`scroll` pada `window` dengan throttle `requestAnimationFrame`; event dengan `pointerType === "touch"` diabaikan. `scroll.progress` sudah dihitung di sini (`scrollProgress(window.scrollY, heroRef.current.offsetHeight)`) agar Task 6 tinggal memakainya.
  - `HeroObject({ pointer, scroll })` — mesh dengan `useFrame`.
  - `HeroScene({ active, heroRef, onContextLost })` — `<Canvas>`; prop `active` diteruskan ke `frameloop` di Task 6 (sekarang selalu `"always"`); `onContextLost: () => void` dipanggil saat `webglcontextlost`.
  - Mode dev saja (`process.env.NODE_ENV !== "production"`): `window.__heroInput = { pointer, scroll }` dan `window.__heroFrames` (counter bertambah tiap `useFrame`) untuk verifikasi di browser.

- [ ] **Step 1: `HeroScene.js`**

`<Canvas className="hero-scene-canvas" dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 6], fov: 40 }} frameloop="always" onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", onLost)}>` berisi `<ambientLight intensity={0.6} />`, `<directionalLight position={[3, 4, 5]} intensity={1.2} />`, `<HeroObject pointer={pointer} scroll={scroll} />`. Wrapper `<div className="hero-scene" aria-hidden="true">`. `onLost` = `e => { e.preventDefault(); props.onContextLost() }`; `HeroSceneLoader` menyimpan `lost` state dan merender fallback bila `lost`.

- [ ] **Step 2: `HeroObject.js`**

`<group ref>` berisi dua mesh dengan geometri yang sama `<icosahedronGeometry args={[1.4, 4]} />`:
1. `MeshDistortMaterial` (drei) `color="#1a1a1a" roughness={0.35} metalness={0.15} distort={0.28} speed={1.2}`.
2. Overlay `<meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.12} />`, mesh di-`scale` `1.01`.

`useFrame((state, delta))`:
- `spin += delta * 0.157` (satu putaran ≈ 40 s).
- `tiltX` dan `tiltY` di-lerp (`THREE.MathUtils.lerp(cur, target, 0.06)`) menuju `-pointer.y * 0.35` dan `pointer.x * 0.5`.
- `group.rotation.set(tiltX, spin + tiltY, 0)`.
- Posisi responsif: `const w = state.viewport.width` (unit dunia); `w < 4.5` → `group.position.x = 0`, opacity kedua material `0.55`; selain itu `x = 1.6`, opacity `1`. Material diberi `transparent`.

- [ ] **Step 3: `useSceneInput.js`** sesuai Interfaces; `pointermove` dipasang dengan `{ passive: true }` dan dilepas saat unmount.

- [ ] **Step 4: Verifikasi di browser (dev server)**

- Screenshot hero: objek gelap bergelombang tampak di kanan-tengah di lebar ≥ 768 px, teks tetap terbaca di atasnya.
- `hover` ke pojok kiri-bawah lalu kanan-atas; `window.__heroInput.pointer.current` berubah tanda (`x` negatif → positif) dan objek terlihat condong berbeda di dua screenshot.
- Review Focus #4: `window.dispatchEvent(new PointerEvent("pointermove", { clientX: 10, clientY: 10, pointerType: "touch" }))` → `pointer.current` **tidak** berubah.
- Review Focus #3: `document.querySelector('.hero-scene-canvas').getContext('webgl').getExtension('WEBGL_lose_context').loseContext()` → dalam 1 s, `.hero-scene--fallback` muncul menggantikan canvas.

- [ ] **Step 5: Verifikasi code-split**

Run: `npx gatsby build` lalu `grep -l "IcosahedronGeometry" public/*.js`
Expected: hanya chunk dengan nama bukan `app-*.js`/`commons-*.js`; dan `grep -c "IcosahedronGeometry" public/daily-log/index.html` → `0`.

- [ ] **Step 6: Commit**

```bash
git add src/components/three src/styles/header.scss
git commit -m "feat(hero): 3D icosahedron that idles and tilts toward the cursor"
```

## Tahap 2 — Polish 3D

### Task 6: Reaksi scroll dan jeda saat tidak terlihat

**Files:**
- Modify: `src/components/three/HeroSceneLoader.js`, `HeroScene.js`, `HeroObject.js`

**Interfaces:**
- Consumes: `scroll.current.progress` (Task 5).
- Produces: `active: boolean` nyata di `HeroSceneLoader`: `true` hanya jika hero ber-intersect (`IntersectionObserver` pada `heroRef.current`, `threshold: 0`) **dan** `document.visibilityState === "visible"`. `HeroScene` memakai `frameloop={active ? "always" : "never"}`.

- [ ] **Step 1: Loader menghitung `active`**

Dua `useEffect`: satu `IntersectionObserver` (nilai awal dari callback pertama, jadi halaman yang dibuka di `/#work` langsung `false`), satu listener `visibilitychange`. Keduanya dilepas saat unmount.

- [ ] **Step 2: Objek bereaksi pada scroll**

Di `useFrame`: `p = scroll.current.progress`; `spin += delta * 0.157 * (1 + p * 2)`; `group.position.y = p * 1.2`; opacity material = `opacityBase * (1 - p * 0.9)` (`opacityBase` = nilai responsif dari Task 5).

- [ ] **Step 3: Verifikasi di browser**

- Scroll pelan dari atas ke `#about`: objek naik dan memudar; tidak ada frame patah yang terlihat.
- Review Focus #2: buka `http://localhost:8000/#work`, tunggu 2 s, catat `window.__heroFrames`, tunggu 2 s lagi → nilai **sama** (loop berhenti). Scroll ke atas sampai hero terlihat, tunggu 1 s → nilai bertambah.
- `visibilityState` tidak bisa dipalsukan dari pane. Mode dev mengekspos `window.__heroActive` (boolean, dihapus bersama `__heroFrames` hanya di production); pemilik mengecek manual: pindah tab 3 s lalu kembali → `__heroFrames` tidak bertambah selama tab tersembunyi.

- [ ] **Step 4: Commit**

```bash
git add src/components/three
git commit -m "feat(hero): scroll-driven motion and pause render loop when hero is off-screen"
```

### Task 7: Animasi masuk, fallback asli, responsif, Lighthouse

**Files:**
- Modify: `src/components/three/HeroObject.js`
- Create: `scripts/make-hero-fallback.mjs`, `src/images/hero-fallback.png`
- Delete: `src/images/hero-fallback.svg`
- Modify: `src/components/three/HeroSceneFallback.js` (import PNG), `src/styles/header.scss` (posisi per breakpoint bila perlu)

- [ ] **Step 1: Animasi masuk**

Di `HeroObject`, simpan `t0 = state.clock.elapsedTime` saat frame pertama; `s = easeOutBack(clamp((elapsed - t0 - 0.2) / 0.9, 0, 1))` → `group.scale.setScalar(s)`. `easeOutBack(x) = 1 + 2.70158 * (x - 1) ** 3 + 1.70158 * (x - 1) ** 2`. Delay 0.2 s selaras dengan `delayChildren: 0.1` + stagger pertama Framer Motion.

- [ ] **Step 2: Fallback PNG**

`scripts/make-hero-fallback.mjs`: render SVG 800×800 dengan `sharp` → PNG: bola radius 300 gradient radial (`#4a4a4a` di kiri-atas → `#111111`), ditumpangi 12 garis lintang/bujur elips putih `stroke-opacity="0.12"` sebagai kesan wireframe. Ganti import di `HeroSceneFallback.js`, hapus SVG.
Run: `node scripts/make-hero-fallback.mjs` → file ada, 800×800, < 60 KB.

- [ ] **Step 3: Cek responsif dan tabrakan dengan teks**

Dev server, ukur di 375, 768, 1024, 1440 px: objek tidak menutupi `h1` (bounding box `.hero-scene canvas` boleh beririsan, tapi secara visual teks terbaca; di < 768 objek di tengah dengan opacity 0.55). Review Focus #5: mulai 1280 px, ubah ke 375 px **tanpa reload** → objek pindah ke tengah (cek `__heroInput` tidak perlu; cukup screenshot).

- [ ] **Step 4: Lighthouse**

Run: `npx gatsby build && npx gatsby serve` (port 9000), lalu
`npx lighthouse http://localhost:9000 --only-categories=performance,accessibility,seo --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless=new" --output=json --output-path=./.lighthouse-mobile.json --quiet`
Expected: `categories.performance.score >= 0.85`, `audits["cumulative-layout-shift"].numericValue === 0`, `audits["largest-contentful-paint"].numericValue <= 2500`. Ulangi dengan `--form-factor=desktop --screenEmulation.disabled`. Catat keempat skor (mobile/desktop × perf/a11y) di pesan commit. Tambahkan `.lighthouse-*.json` ke `.gitignore`.

- [ ] **Step 5: Commit**

```bash
git add -A src scripts .gitignore
git commit -m "feat(hero): entrance animation, rendered fallback image, responsive placement

Lighthouse mobile perf XX / a11y XX; desktop perf XX / a11y XX"
```

## Tahap 3 — Konten

### Task 8: Gambar project lokal

**Files:**
- Create: `src/images/projects/{nusa-kamera.jpg,baf-mobile.jpg,staycation.jpg,nusa-pos.png,global-agro-coco.jpg,booking-system-nusa.png}`
- Modify: `src/yourdata.js` (import lokal, hapus 6 konstanta URL), `src/components/atoms/Card.js`, `src/components/Work.js`

**Interfaces:**
- Produces: setiap entri `projects[]` punya `imageWidth` dan `imageHeight` (number); `Card` menerima `imgWidth`, `imgHeight`, `lazy: boolean`.

- [ ] **Step 1: Unduh dan normalkan ukuran**

`curl -L -o` keenam URL di `yourdata.js:24-29` ke nama file di atas. `nusa-pos.png` (3304 px) dan dua yang > 1600 px dikecilkan dengan `sharp` ke lebar 1600 (`node -e` satu baris). Catat dimensi akhir tiap file (`sharp(...).metadata()`).

- [ ] **Step 2: Data dan komponen**

Di `yourdata.js` ganti konstanta URL dengan `import`, tambah `imageWidth`/`imageHeight` sesuai dimensi (ITAM & Camventory: 1280×800). `Work.js` mengirim `imgWidth`, `imgHeight`, dan `lazy={index >= 3}`; `Card` meneruskan ke `<motion.img width height loading={lazy ? "lazy" : "eager"} decoding="async">`.

- [ ] **Step 3: Verifikasi**

Run: `grep -c githubusercontent src/yourdata.js` → `0`.
Run: `npx gatsby build && grep -c githubusercontent public/index.html` → `0`.
Dev server: Network tab tidak memuat `githubusercontent.com`; kartu dan modal tetap menampilkan gambar utuh.

- [ ] **Step 4: Commit**

```bash
git add src/images/projects src/yourdata.js src/components/atoms/Card.js src/components/Work.js
git commit -m "feat(work): host project screenshots locally with explicit dimensions"
```

### Task 9: Tag teknologi dan link project

**Files:**
- Modify: `src/yourdata.js`, `src/components/atoms/Card.js`, `src/components/Work.js`, `src/styles/card.scss`, `src/styles/work.scss`

**Interfaces:**
- Produces: `projects[].tags: string[]`, `projects[].url?: string`. `Card` menerima `tags`; modal menampilkan tag dan tombol "Visit Website" (sudah ada) bila `url` terisi.

- [ ] **Step 1: Isi tag (tebakan awal; pemilik mengoreksi)**

Nusa Kamera `["Laravel", "MySQL"]`; BAF Mobile `["React Native", "REST API"]`; Staycation `["Laravel", "MySQL"]`; Nusa POS `["React", "Express", "MongoDB"]`; Global Agro Coco `["Laravel", "Landing Page"]`; Booking System Nusa `["React", "Express", "MongoDB"]`; ITAM `["Laravel", "MySQL"]`; Camventory `["React Native", "Express", "MongoDB"]`. `url` dibiarkan kosong kecuali pemilik mengisi. Hapus komentar template ("DO NOT CHANGE THIS", "Add Your Project Title Here") dari `yourdata.js`.

- [ ] **Step 2: Render**

`Card`: di antara deskripsi dan footer, `<ul className="card-tags">{tags.map(t => <li key={t}>{t}</li>)}</ul>`; SCSS: `display:flex; flex-wrap:wrap; gap:6px; list-style:none; padding:0; margin:0 0 16px;` `li { font-size:.75rem; font-weight:500; color:#555; border:1px solid #e5e5e5; border-radius:999px; padding:3px 10px; }`. Modal: `<ul className="project-modal-tags">` dengan gaya yang sama di `work.scss`.

- [ ] **Step 3: Verifikasi**

Dev server: setiap kartu menampilkan tag; modal ITAM menampilkan tag; kartu tanpa `url` tidak menampilkan tombol kunjungi (perilaku lama tetap).

- [ ] **Step 4: Commit**

```bash
git add src/yourdata.js src/components/atoms/Card.js src/components/Work.js src/styles/card.scss src/styles/work.scss
git commit -m "feat(work): technology tags on project cards and preview modal"
```

### Task 10: About dua kolom dengan avatar

**Files:**
- Modify: `src/components/about.js`, `src/styles/about.scss`, `src/yourdata.js` (hapus `aboutImage`)

**Interfaces:**
- Consumes: `EyeFace({ className })` dari `src/components/atoms/EyeFace.js` (sudah ada).

- [ ] **Step 1: Komponen**

`about.js`: `.about-container` menjadi `.about-grid` berisi `.about-text-col` (label, heading, `aboutParaOne`, `aboutParaTwo`, `aboutParaThree` sebagai tiga `<p className="about-text">`) dan `.about-face-col` berisi `<div className="about-face"><EyeFace /></div>`. Animasi Framer Motion yang ada dipertahankan pada wrapper.

- [ ] **Step 2: SCSS**

`.about-grid { display:grid; grid-template-columns: 1fr 240px; gap:48px; align-items:center; max-width:900px; margin:0 auto; text-align:left; }`; `.about-face { width:240px; height:240px; border-radius:50%; background:#fff; border:1px solid var(--color-border); box-shadow:0 10px 28px rgba(0,0,0,.07); display:flex; align-items:center; justify-content:center; overflow:hidden; .eye-face { width:74%; height:74%; transform:translate(-2%,2%);} }`; `@include media("<tablet") { .about-grid { grid-template-columns:1fr; text-align:center; } .about-face-col { order:-1; display:flex; justify-content:center; } .about-face { width:160px; height:160px; } }`.

- [ ] **Step 3: Verifikasi**

Dev server di 1280 px: teks kiri, avatar kanan, ketiga paragraf tampil, mata avatar About ikut kursor bersamaan dengan avatar hero. Di 375 px: avatar di atas teks, rata tengah. `grep -c aboutImage src` → `0`.

- [ ] **Step 4: Commit**

```bash
git add src/components/about.js src/styles/about.scss src/yourdata.js
git commit -m "feat(about): two-column layout with full bio and eye-tracking avatar"
```

### Task 11: Verifikasi akhir

**Files:** tidak ada perubahan kode kecuali perbaikan yang ditemukan.

- [ ] **Step 1:** `npm test` → semua lulus. `npx gatsby build` → lulus tanpa warning SSR.
- [ ] **Step 2:** Lighthouse mobile & desktop seperti Task 7 Step 4; skor tidak turun dari Task 7.
- [ ] **Step 3:** Matriks browser di pane: Chrome desktop 1280 px dan emulasi mobile 375 px — hero 3D, kartu, modal, About, Skills, Contact; `/daily-log/` masih berfungsi dan tidak memuat chunk `three` (`grep -c IcosahedronGeometry public/daily-log/index.html` → 0).
- [ ] **Step 4:** Fallback: `npm test` sudah menutup logika; secara manual, jalankan Chrome dengan `--disable-webgl` atau matikan di `chrome://flags`, buka dev server → fallback PNG tampil, tidak ada error di console.
- [ ] **Step 5:** Yang **tidak** bisa dicek di sini dan diserahkan ke pemilik: iOS Safari di perangkat nyata (WebGL, panas), Firefox, dan `prefers-reduced-motion` dari pengaturan OS.
- [ ] **Step 6:** Laporkan ke pemilik: skor Lighthouse sebelum (baseline Task 1 Step 0) dan sesudah, ukuran chunk `three`, dan daftar tag project untuk dikoreksi. Deploy (`npm run deploy`) hanya setelah pemilik menyetujui.
