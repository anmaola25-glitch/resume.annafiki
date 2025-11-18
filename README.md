# Resume Website - Ana Fiki Hidayatul Maula

Template website resume modern, responsif, dan ringan menggunakan HTML, CSS, dan Vanilla JavaScript.
Desain dominan: pink lembut & putih, dengan aksen hitam. Fokus pada aksesibilitas, animasi halus, dan performa.

## Struktur folder rekomendasi
- index.html
- css/
  - styles.css
- js/
  - main.js
- assets/
  - images/ (profile.webp, project-1.webp, ...)
  - pdf/ (CV_Ana_Fiki_Hidayatul_Maula.pdf)
  - icons/
  
## Fitur utama
- Hero dengan foto & CTA (Download CV / Hubungi)
- About, Education, Skills (animated bars), Projects, Contact
- Smooth scroll, reveal on scroll (IntersectionObserver)
- Responsive + ARIA + keyboard focus states
- Print-friendly via @media print (untuk export ke PDF)

## Cara pakai cepat (lokal)
1. Salin file ke folder proyek sesuai struktur.
2. Ganti gambar profil dan CV di `assets/images/` dan `assets/pdf/`.
3. Jika ingin form berfungsi:
   - Daftar ke Formspree atau EmailJS dan ganti `FORM_ENDPOINT` di `js/main.js`,
   - Atau biarkan fallback mailto bekerja.
4. Buka `index.html` di browser.

## Optimasi & langkah selanjutnya (opsional)
- Kompres gambar ke WebP dan gunakan srcset untuk responsive images.
- Tambahkan build step (Sass, PostCSS) untuk produksi.
- Minify CSS/JS dan tambahkan cache headers saat deploy.
- Deploy ke GitHub Pages, Netlify, atau Vercel:
  - GitHub Pages: push repo ke GitHub → Settings → Pages → pilih branch main/(root)
  - Netlify/Vercel: drag & drop folder atau hubungkan repo untuk deploy otomatis.

## Aksesibilitas & performa
- Pastikan kontras warna cukup (cek dengan Lighthouse/WCAG tools).
- `prefers-reduced-motion` didukung.
- Gunakan `loading="lazy"` untuk gambar.

Jika mau, saya bisa:
- Buatkan varian warna (palette) atau wireframe PNG.
- Lengkapi template dengan lebih banyak contoh project dan modal detail.
- Siapkan langkah deploy otomatis (contoh GitHub Actions) atau menambahkan build step SCSS.