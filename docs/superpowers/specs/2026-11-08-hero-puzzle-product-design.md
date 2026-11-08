# Hero Baru: Puzzle Tersusun Jadi Mockup Produk (Tanpa Three.js)

- **Tanggal:** 2026-11-08
- **Status:** Draft untuk review (belum ada yang dibangun)
- **Situs:** https://alfatayah.github.io (Gatsby 5, React 18.3, Framer Motion 12, SCSS; deploy ke `gh-pages`)
- **Menggantikan:** scene 3D hero dari spec `2026-11-07-landing-page-3d-refresh-design.md` §4.1. Bagian lain dari spec itu (SEO, gambar project, About, tag) tetap berlaku dan tidak disentuh.

---

## 1. Tujuan

Hero harus langsung menggambarkan headline **"Building products people love to use"**: potongan puzzle terbang masuk dan tersusun menjadi mockup sebuah produk (jendela app/dashboard). Visual ini menggantikan bola 3D yang sekarang.

Tiga hal yang harus benar setelah perubahan:

1. **Pesan jelas.** Pengunjung melihat "sesuatu dibangun" dalam 2 detik pertama, di desktop maupun HP, tanpa syarat WebGL.
2. **Lebih ringan dari sekarang.** `three`, `@react-three/fiber`, `@react-three/drei`, dan `@loadable/component` dibuang. Lighthouse Performance mobile tidak boleh turun dari angka terakhir (87–92); LCP mobile diharapkan membaik karena chunk 3D hilang.
3. **Gaya tetap.** Monokrom hitam `#111111`, abu `#555555`/`#888888`, border `#e5e5e5`, putih. Tidak ada warna baru.

## 2. Kondisi Sekarang

| Bagian | Kondisi | Nasib |
|--------|---------|-------|
| `src/components/three/` (6 file, 448 baris): loader dengan deteksi WebGL2, error boundary, IntersectionObserver, R3F canvas, icosahedron distort, fallback SVG bola | Berjalan, tapi di HP (<768 px) hanya fallback statis yang tampil; chunk 3D ± 600 KB | **Dihapus seluruhnya** |
| `tests/scene-support.test.mjs` | 6 test untuk logika scene | **Dihapus** (digantikan test geometri puzzle) |
| `src/components/Header.js` | Teks rata tengah, `HeroSceneLoader` di belakang teks, avatar `EyeFace`, dua tombol Framer Motion, entrance CSS `hero-enter` | **Diubah** ke dua kolom; avatar, teks, tombol, dan `hero-enter` tetap |
| `src/styles/header.scss` | `.hero-scene*` (cross-fade, penempatan fallback), `.header-wrapper` rata tengah | `.hero-scene*` **dihapus**, layout grid **ditambah** |
| `package.json` | dependency `three`, `@react-three/*`, `@loadable/component` | **Dihapus** |
| `docs/superpowers/*2026-11-07*` | Spec dan plan refresh sebelumnya | Tetap sebagai riwayat; spec ini mencatat apa yang diganti |

Tidak ada file lain yang meng-import `three`/`loadable` (`gatsby-*.js`, `src/pages`, `src/templates` sudah dicek).

## 3. Ruang Lingkup

**Masuk:**
- Komponen SVG mockup produk yang dipecah jadi keping puzzle.
- Animasi masuk (keping terbang → tersusun), idle melayang, dan tilt ringan mengikuti kursor.
- Layout hero dua kolom (desktop) / satu kolom (HP).
- Penghapusan semua kode dan dependency 3D.
- Test logika geometri dan verifikasi performa.

**Tidak masuk:**
- Mengubah teks hero, avatar mata, tombol, atau section lain.
- Loop susun-pecah-susun, animasi mengikuti scroll (sudah diputuskan: susun sekali lalu idle).
- Mockup yang menampilkan screenshot project nyata; mockup-nya UI generik.
- Dark mode.

## 4. Desain

### 4.1 Mockup produk

Satu SVG inline, `viewBox="0 0 480 330"`, dirender saat SSR (ikut HTML statis, tidak ada request gambar). Menggambar jendela app monokrom:

- Bingkai jendela: rect sudut 14 px, fill putih, stroke `#e5e5e5`.
- Bar atas tinggi 28 px dengan tiga titik abu di kiri.
- Sidebar lebar 96 px, fill `#fafafa`, dengan 5 garis menu (satu aktif, hitam).
- Area konten: judul (garis tebal hitam + garis abu), tiga kartu statistik berdampingan (rect stroke `#e5e5e5` berisi garis angka), grafik batang 7 batang dengan tinggi berbeda (abu, satu batang hitam sebagai sorotan), dan satu tombol hitam dengan teks putih (garis).
- Satu bayangan lembut di bawah seluruh jendela (`filter: drop-shadow` di elemen pembungkus HTML, bukan per keping, supaya murah).

Artwork digambar **sekali** di dalam `<defs>` sebagai `<g id="hero-product-art">`, lalu dipakai ulang oleh tiap keping lewat `<use href="#hero-product-art">` di dalam `<g clip-path="url(#piece-r-c)">`. Jadi tiap keping membawa bagian gambar yang tepat, dan artwork tidak diduplikasi di kode.

### 4.2 Keping puzzle (logika murni)

Grid **4 kolom × 3 baris = 12 keping**, ukuran sel 120 × 110 px. Tiap keping berbentuk jigsaw asli: setiap sisi dalam punya knob keluar (tab) atau lekukan masuk (blank), dan dua keping bertetangga selalu saling mengunci (tab di satu sisi berarti blank di sisi tetangga). Sisi luar lurus.

Modul `src/components/hero/puzzleGeometry.mjs` (tanpa dependensi, bisa diuji dengan `node --test`):

- `edgeSign(row, col, side)` → `+1` (tab), `-1` (blank), atau `0` (sisi luar). Deterministik: pola selang-seling berdasarkan `(row + col)` sehingga tetangga selalu komplementer.
- `piecePath({ row, col, cols, rows, cellW, cellH, knob })` → string path SVG (`M … Z`) dalam koordinat absolut viewBox. Knob digambar dengan kurva kubik; `knob` = radius knob (default 14).
- `scatterOffset(index, total)` → `{ dx, dy, rot }` posisi awal keping sebelum terbang masuk: sudut tersebar merata (`index / total * 2π` plus offset tetap), jarak 160–260 px dari posisi akhir, rotasi −25°…+25°. Deterministik (tanpa `Math.random`) supaya SSR dan client sama dan tidak ada hydration mismatch.
- `enterDelay(index)` → `index * 0.07` detik.

Urutan masuk: keping diurutkan dari tengah ke luar (jarak ke pusat grid), sehingga mockup "tumbuh" dari tengah.

### 4.3 Komponen `PuzzleProduct`

`src/components/hero/PuzzleProduct.js` merender:

```html
<div class="hero-product" aria-hidden="true">          <!-- tilt (rotateX/Y) -->
 <div class="hero-product-float">                        <!-- float (translateY) + drop-shadow -->
  <svg class="hero-product-svg" viewBox="0 0 480 330">
    <defs>
      <g id="hero-product-art">…artwork §4.1…</g>
      <clipPath id="hero-piece-0">…piecePath…</clipPath> ×12
    </defs>
    <g class="hero-piece" style="--dx:…px; --dy:…px; --rot:…deg; --delay:…s">
      <g clip-path="url(#hero-piece-0)"><use href="#hero-product-art"/></g>
      <path d="…piecePath…" class="hero-piece-seam"/>   <!-- garis sambungan -->
    </g> ×12
  </svg>
 </div>
</div>
```

Catatan: artwork dirender 12 kali (sekali per keping, masing-masing di-clip). Dengan ±80 elemen per artwork itu ±1000 node SVG, masih ringan; artwork sengaja dijaga sederhana (rect, line, circle saja, tanpa gradient/filter per elemen).

- `aria-hidden="true"`: dekoratif; headline teks yang membawa makna.
- Tiap `.hero-piece` punya `transform-origin` di pusat kepingnya sendiri (`transform-box: fill-box; transform-origin: center`).
- Seam: stroke `#e5e5e5` 1 px di sepanjang path keping, sehingga setelah tersusun tetap terlihat "puzzle" tanpa bayangan per keping.
- Tidak ada state React dan tidak ada efek selain hook tilt (§4.5). Tidak memakai Framer Motion.

### 4.4 Animasi masuk (CSS keyframes)

Dipilih CSS, bukan Framer Motion, dengan alasan yang sama seperti perbaikan `hero-enter` sebelumnya: animasi Framer baru mulai setelah React hidrasi, sehingga di HTML statis hero akan kosong dulu lalu "pop". CSS mulai saat first paint dan mematuhi `prefers-reduced-motion` tanpa JS. Framer Motion tetap dipakai untuk tombol.

```scss
@keyframes hero-piece-in {
  from { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); }
  to   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
}
.hero-piece {
  animation: hero-piece-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay);
}
```

- 12 keping × 70 ms stagger + 0.9 s = selesai ≈ 1.7 s, sejalan dengan stagger teks `hero-enter` (0.1–0.7 s) sehingga keduanya tuntas hampir bersamaan.
- `prefers-reduced-motion: reduce` → `animation: none` (keping langsung tersusun), float dan tilt mati.

### 4.5 Idle: float + tilt

- **Float:** `.hero-product` mendapat `@keyframes hero-float` (translateY 0 → −6 px → 0, 6 s, ease-in-out, infinite), mulai setelah entrance (`animation-delay: 1.8s`).
- **Tilt:** hook `src/components/hero/usePointerTilt.js` mengikuti pola `EyeFace`: dengarkan `pointermove` di `window`, abaikan `pointerType === "touch"`, throttle dengan `requestAnimationFrame`, hitung posisi kursor relatif ke pusat elemen, lalu set `style.transform = perspective(900px) rotateX(…) rotateY(…)` dengan maksimum ±4°. `pointerleave` dari dokumen mengembalikan ke 0 lewat `transition: transform 0.4s`. Tidak jalan jika reduced motion. Float dan tilt dipisah ke dua elemen bersarang (`.hero-product` untuk tilt, `.hero-product-float` di dalamnya untuk float) supaya `transform` keduanya tidak saling timpa.

### 4.6 Layout

`src/components/Header.js`:

```html
<section class="hero-section" id="home">
  <div class="container">
    <div class="hero-grid">
      <div class="hero-copy">
        <div class="hero-avatar hero-enter">EyeFace</div>
        <p class="hero-name hero-enter">…</p>
        <h1 class="hero-enter">Building products people love to use</h1>
        <p class="hero-paragraph hero-enter">…</p>
        <div class="hero-cta-group hero-enter">…dua tombol…</div>
      </div>
      <div class="hero-visual">
        <PuzzleProduct />
      </div>
    </div>
  </div>
</section>
```

`src/styles/header.scss`:

- `≥tablet`: `.hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 48px; align-items: center; }`. `.hero-copy` rata kiri (`text-align: left`, avatar `margin: 0 0 28px`, tombol `justify-content: flex-start`, paragraf `max-width: 480px`). `.hero-visual` maksimal 520 px, SVG `width: 100%; height: auto`.
- `<tablet`: satu kolom, `.hero-visual { order: -1; width: 85%; margin: 0 auto 28px; }`, `.hero-copy` kembali `text-align: center` seperti sekarang.
- `.hero-section` tetap `padding: 128px 0 32px` (104 px di HP) agar bebas dari navbar; `min-height: 55vh` tetap; `overflow: hidden` tetap karena keping terbang dari luar kotak.
- Semua rule `.hero-scene*` dan komentar penempatan bola dihapus.

### 4.7 Penghapusan

- Hapus `src/components/three/` (6 file) dan `tests/scene-support.test.mjs`.
- `npm uninstall three @react-three/fiber @react-three/drei @loadable/component`; pastikan `package-lock.json` ikut berubah dan tidak ada sisa di `yarn.lock` yang dipakai (proyek memakai `npm`; `yarn.lock` tidak di-update oleh `npm`, dibiarkan).
- Hapus `__hero*` dev hooks yang hanya ada di kode 3D (ikut terhapus bersama file).

## 5. Aksesibilitas dan Perilaku Khusus

| Situasi | Perilaku |
|---------|----------|
| `prefers-reduced-motion: reduce` | Keping langsung tersusun; tanpa float, tanpa tilt |
| Layar sentuh | Entrance dan float jalan; tilt tidak (pointer touch diabaikan) |
| JS gagal/belum hidrasi | SVG dan animasi masuk tetap tampil (CSS murni); hanya tilt yang hilang |
| Halaman dibuka di `/#work` | Animasi sudah selesai saat pengunjung scroll ke atas; tidak ada loop yang boros |
| Screen reader | Hero visual `aria-hidden`; headline dan tombol tetap urutan DOM pertama di kolom kiri |
| Lebar 768–1023 px | Grid dua kolom tetap; h1 memakai ukuran tablet yang sudah ada (2.875 rem) |

## 6. Verifikasi

1. **Unit:** `tests/puzzle-geometry.test.mjs`: tetangga selalu komplementer (`edgeSign(r,c,"right") === -edgeSign(r,c+1,"left")`), sisi luar `0`, `piecePath` dimulai `M` dan diakhiri `Z` serta berada dalam viewBox, `scatterOffset` deterministik dan jarak dalam rentang 160–260, `enterDelay` naik monoton. `npm test` hijau (bersama `site-metadata`).
2. **Browser (dev server 8000):** 12 `.hero-piece` ada; setelah 2 s, `getComputedStyle` tiap keping `transform` = `none`/identity dan `opacity` = 1; dengan emulasi reduced motion tidak ada animasi; lebar 375 px mockup di atas teks tanpa overflow horizontal; lebar 1280 px dua kolom; tilt bergerak saat pointer dan kembali 0 saat keluar.
3. **Build:** `npx gatsby clean && npm run build` lulus; `grep -r "three" public/*.js` tidak menemukan chunk three; HTML statis `public/index.html` berisi `hero-piece`.
4. **Performa:** Lighthouse mobile & desktop lewat `gatsby serve -p 9000`, 3 run masing-masing, dibandingkan dengan angka terakhir (mobile Perf 87–92, LCP ~3.3–3.8 s, CLS 0; desktop 73–74). Syarat lulus: CLS tetap 0, Perf mobile ≥ 87, total JS yang dimuat turun.
5. **Manual:** lihat di Chrome desktop dan HP nyata; pastikan keping tidak terpotong oleh `overflow: hidden` setelah tersusun dan bayangan tidak terpotong.

## 7. Keputusan yang Sudah Diambil

| Pertanyaan | Keputusan |
|-----------|-----------|
| Puzzle membentuk apa? | Mockup produk (jendela app), bukan logo/kubus |
| Teknik | SVG 2D; Three.js dihapus |
| Layout | Dua kolom desktop (teks kiri, mockup kanan); HP satu kolom, mockup di atas |
| Motion | Susun sekali, lalu idle (float + tilt); tanpa loop/scroll-scrub |
| Entrance pakai Framer atau CSS? | CSS keyframes (first paint, reduced-motion gratis); Framer hanya tombol |
| Bayangan | Satu drop-shadow di pembungkus, bukan per keping |
