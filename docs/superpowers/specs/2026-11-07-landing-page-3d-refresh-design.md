# Landing Page Refresh: Hero 3D (Three.js) + Perbaikan Menyeluruh

- **Tanggal:** 2026-11-07
- **Status:** Draft untuk review (belum ada yang dibangun)
- **Situs:** https://alfatayah.github.io (Gatsby 5, React 18.3, Framer Motion 12, anime.js 4, SCSS; deploy ke `gh-pages`)

---

## 1. Tujuan

Landing page ini adalah **personal brand / showcase**: pengunjung harus langsung merasa "orang ini bikin hal keren" dalam 3 detik pertama, lalu tergerak menjelajah project dan Daily Log.

Tiga hal yang harus tetap benar setelah refresh:

1. **Kesan pertama kuat.** Hero memakai scene 3D nyata (Three.js) yang bereaksi ke kursor dan scroll, bukan sekadar animasi CSS.
2. **Tetap ringan.** Lighthouse Performance mobile ≥ 85, LCP ≤ 2,5 s, tanpa layout shift. Halaman Daily Log tidak boleh ikut berat.
3. **Gaya tetap.** Minimalis putih-hitam yang sekarang dipertahankan; 3D adalah aksen monokrom, bukan ganti tema.

## 2. Audit Kondisi Sekarang

Diurutkan dari yang paling berdampak.

| # | Temuan | Dampak | Di mana |
|---|--------|--------|---------|
| 1 | Hero hanya teks + grid titik; tidak ada "signature" visual | Kesan pertama datar | `Header.js`, `HeroBackground.js` |
| 2 | Meta SEO masih bawaan starter: deskripsi "Kick off your next, great Gatsby project…", author `@gatsbyjs`, nama manifest `gatsby-starter-default`, warna tema ungu `#663399` | Hasil share di WhatsApp/LinkedIn/Google terlihat tidak profesional | `gatsby-config.js`, `seo.js` |
| 3 | 6 dari 8 gambar project di-hosting di `user-images.githubusercontent.com` | Lambat, tidak dioptimasi, bisa putus sewaktu-waktu; tidak ada `width/height` → layout shift | `yourdata.js` |
| 4 | Project tidak punya link maupun tag teknologi; modal hanya mengulang deskripsi kartu | Pengunjung tidak bisa menelusuri lebih jauh | `yourdata.js`, `Work.js` |
| 5 | Section About hanya satu paragraf; `aboutParaTwo`, `aboutParaThree`, `aboutImage` sudah ada di data tapi tidak dirender | Cerita personal (inti personal brand) hilang | `about.js` |
| 6 | Grid titik memanggil `getBoundingClientRect` untuk 128 titik di setiap `pointermove` | Boros CPU, jank di laptop pelan | `HeroBackground.js` |
| 7 | Kode mati: `Promotion.js` (lorem ipsum), `react-reveal`, `react-scroll` (tidak di-import di mana pun) | Bundle & maintenance | `package.json`, `src/components` |
| 8 | Section Skills memakai inline style untuk border/background | Inkonsisten dengan SCSS lain | `skills.js` |
| 9 | Tidak ada gambar Open Graph | Preview link tanpa gambar | `seo.js`, `static/` |

Yang sudah bagus dan dipertahankan: struktur section (Hero → About → Work → Skills → Contact), animasi masuk Framer Motion, modal preview project, avatar dengan mata mengikuti kursor, kartu project dengan gambar utuh.

## 3. Ruang Lingkup

**Masuk:**
- Scene 3D di hero (React Three Fiber v8 + drei), menggantikan grid titik anime.js.
- Perbaikan non-3D nomor 2–9 di atas.

**Tidak masuk (bisa jadi tahap berikutnya):**
- Dark mode.
- 3D di section lain (Skills, Work).
- Halaman detail/case study per project.
- Mengubah halaman Daily Log.

## 4. Desain

### 4.1 Scene 3D di Hero

**Konsep visual (rekomendasi):** satu objek abstrak monokrom, *icosahedron* beresolusi tinggi dengan permukaan sedikit "bergelombang" (`MeshDistortMaterial` dari drei), material matcap abu-abu gelap dengan garis wireframe tipis di atasnya. Bentuknya organik tapi tetap geometris, cocok dengan tipografi tebal dan avatar garis hitam.

Alternatif yang bisa dipilih saat review (lihat §8): (b) kumpulan bentuk geometris kecil melayang (torus, kubus, bola) atau (c) partikel titik 3D sebagai "versi 3D" dari grid yang sekarang.

**Perilaku:**
- *Idle:* berputar sangat pelan (satu putaran ± 40 detik) dan "bernapas" (distort amplitude naik-turun).
- *Kursor:* objek condong ke arah kursor, di-*lerp* supaya halus (sama rasanya dengan mata avatar). Hanya pointer, tidak ada drag/orbit.
- *Scroll:* saat hero di-scroll keluar, objek berputar sedikit lebih cepat dan memudar; saat hero tidak terlihat, render loop berhenti.
- *Masuk halaman:* objek muncul dengan scale 0 → 1 selaras dengan stagger teks Framer Motion yang sudah ada.

**Penempatan:** canvas full-bleed sebagai lapisan latar hero (`position: absolute; inset: 0; pointer-events: none`), objek diposisikan sedikit di kanan-tengah di desktop supaya tidak bertabrakan dengan judul, dan di tengah dengan opacity lebih rendah di ponsel. Avatar dan teks tetap di atasnya (`z-index`). Grid titik dihapus.

### 4.2 Arsitektur Komponen

```
src/components/three/
  HeroScene.js        # <Canvas> + lighting + <HeroObject/>; satu-satunya file yang import R3F/drei
  HeroObject.js       # mesh + useFrame (idle, lerp kursor, scroll)
  useSceneInput.js    # hook: posisi kursor (normalized -1..1) & progres scroll hero
  HeroSceneFallback.js# gambar statis (PNG render objek) untuk no-WebGL / reduced-motion
src/components/Header.js   # mengganti <HeroBackground/> dengan <HeroSceneLoader/>
```

- `HeroSceneLoader` memakai `@loadable/component` dengan `ssr: false`, jadi `three` **tidak** masuk bundle SSR Gatsby dan tidak masuk halaman Daily Log. Saat build statis, HTML hero hanya berisi fallback (`HeroSceneFallback`), lalu di browser diganti scene.
- Sebelum memuat scene, loader mengecek: `prefers-reduced-motion`, dukungan WebGL (`canvas.getContext('webgl')`), dan `navigator.deviceMemory < 4` (jika tersedia). Gagal salah satu → tetap fallback statis.
- Input kursor memakai `pointermove` di `window` dengan `requestAnimationFrame` throttle (pola yang sama seperti `EyeFace.js`). `HeroObject` membaca nilai dari `ref`, bukan state, supaya tidak re-render React tiap frame.

**Dependensi baru:** `three@^0.187`, `@react-three/fiber@^8.18` (v9 butuh React 19), `@react-three/drei@^9`, `@loadable/component`. Estimasi tambahan ± 180 KB gzip, hanya dimuat di halaman utama dan hanya di browser.

### 4.3 Anggaran Performa

- `dpr` dibatasi `[1, 1.5]`; `antialias` on; `powerPreference: "high-performance"`.
- `frameloop="always"` saat hero terlihat; diset `"never"` lewat `IntersectionObserver` saat hero keluar viewport dan saat tab `hidden`.
- Geometri: icosahedron detail 4 (≈ 5 k segitiga). Tidak ada shadow map, tidak ada post-processing.
- `gatsby build` harus tetap lulus; smoke test `window is not defined` wajib di CI lokal sebelum deploy.

### 4.4 Perbaikan Non-3D

| Area | Perubahan |
|------|-----------|
| SEO & manifest | `siteMetadata`: title "Fadhil Alfatayah — AI Engineer & Full-Stack Developer", deskripsi 1 kalimat, author `@alfatayah`, `siteUrl`. Manifest: nama, `theme_color`/`background_color` `#111111`/`#ffffff`. Tambah `static/og-image.png` (1200×630) dan tag `og:image`, `twitter:card` di `seo.js`. |
| Gambar project | Unduh 6 gambar GitHub ke `src/images/projects/`, import lokal seperti ITAM/Camventory. `<img>` diberi `width`/`height` dan `loading="lazy"` (kecuali 3 pertama). |
| Data project | Tambah `tags: []` (mis. `["React Native", "Laravel"]`) dan `url` nyata bila ada; kartu menampilkan tag, modal menampilkan tag + tombol kunjungi. `yourdata.js` dibersihkan dari komentar template. |
| About | Render `aboutParaTwo` dan `aboutParaThree`; layout dua kolom di desktop (teks kiri, avatar `EyeFace` ukuran lebih besar di kanan) supaya avatar hero punya "pasangan". `aboutImage` Unsplash dihapus. |
| Hero background | `HeroBackground.js` dihapus bersama SCSS-nya, digantikan scene. |
| Kode mati | Hapus `Promotion.js`, `promotion.scss`, `promotionHeading/Para`; uninstall `react-reveal`, `react-scroll`. |
| Skills | Inline style dipindah ke `skills.scss`. |

### 4.5 Aksesibilitas

- `<canvas>` diberi `aria-hidden="true"`; konten hero tetap bisa dibaca screen reader seperti sekarang.
- `prefers-reduced-motion` → fallback statis, tanpa animasi idle.
- Tidak ada interaksi yang hanya bisa lewat 3D; semua navigasi tetap tombol/link biasa.

## 5. Tahapan Implementasi

Tiap tahap bisa di-commit dan di-deploy sendiri, jadi Anda bisa berhenti di mana saja.

| Tahap | Isi | Selesai berarti |
|-------|-----|-----------------|
| **0. Bersih-bersih** (½ hari) | SEO/manifest/OG image, hapus kode mati, pindah inline style Skills | Share link di WhatsApp menampilkan judul, deskripsi, dan gambar yang benar; `npm ls` tidak lagi memuat `react-reveal`/`react-scroll` |
| **1. Hero 3D MVP** (1 hari) | Install dependensi, `HeroScene` + `HeroObject` dengan idle + kursor, loader client-only, fallback statis, hapus grid titik | Objek tampil dan merespons kursor di Chrome desktop & Android; `gatsby build` lulus; Lighthouse mobile ≥ 85 |
| **2. Polish 3D** (½ hari) | Reaksi scroll, pause saat off-screen, animasi masuk selaras Framer Motion, tuning material | Tidak ada frame drop saat scroll di laptop menengah; CPU idle saat hero tidak terlihat |
| **3. Konten** (½–1 hari) | Gambar project lokal + dimensi, tag & url project, About dua kolom | Tidak ada request ke `githubusercontent.com`; CLS = 0; About menampilkan 3 paragraf |

Urutan 0 → 1 → 2 → 3 disarankan: tahap 0 murah dan langsung terasa, tahap 1 adalah inti permintaan, tahap 3 bisa dicicil.

## 6. Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| `window is not defined` saat `gatsby build` karena `three`/drei di-import saat SSR | Semua import R3F/drei hanya di `HeroScene.js`, dimuat lewat `@loadable/component` `ssr: false`; tidak ada import `three` di file lain |
| Bundle utama membengkak | Code-split memastikan `three` di chunk terpisah; verifikasi dengan `gatsby build` + lihat ukuran chunk |
| Panas/baterai di ponsel | Render loop berhenti saat off-screen/tab hidden; `dpr` ≤ 1.5; fallback untuk device memori kecil |
| Objek 3D "bertabrakan" dengan teks di lebar tertentu | Posisi objek responsif per breakpoint; dicek di 375, 768, 1024, 1440 px |
| Gaya 3D terasa "asing" dari tema | Material monokrom, satu objek saja; dicek berdampingan dengan avatar |
| Cache GitHub Pages menampilkan versi lama | Sudah terbukti aman: hash file berubah tiap build; cukup hard refresh |

## 7. Verifikasi

- Lighthouse mobile & desktop sebelum/sesudah (Performance, Accessibility, SEO) dicatat di PR/commit.
- Matriks uji: Chrome desktop, Firefox desktop, Android Chrome, iOS Safari (WebGL di iOS wajib dicek karena paling sering bermasalah).
- Uji fallback: Chrome dengan WebGL dimatikan, dan `prefers-reduced-motion` aktif.
- `gatsby build` lulus tanpa warning SSR; halaman `/daily-log/` tidak memuat chunk `three`.

## 8. Keputusan yang Menunggu Anda

1. **Bentuk objek 3D:** (a) icosahedron organik *[rekomendasi]*, (b) kumpulan bentuk geometris melayang, (c) partikel titik 3D.
2. **Posisi objek di desktop:** latar kanan-tengah di belakang teks *[rekomendasi]*, atau layout terpisah (teks kiri, objek kanan).
3. **About dua kolom dengan avatar besar:** masuk tahap 3, atau cukup tambah paragraf saja?
4. **Dark mode:** tetap di luar lingkup, atau mau dimasukkan sebagai tahap 4?
5. **Tag teknologi per project:** saya isi sendiri dari deskripsi (lalu Anda koreksi), atau Anda yang isi di `yourdata.js`?
