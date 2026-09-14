# Rate das Bild!

Game tebak-gambar untuk belajar kosakata bahasa Jerman. Murni HTML/CSS/JavaScript, tidak butuh instalasi apa pun.

## Cara menjalankan di VSCode

1. Ekstrak folder ini, lalu buka foldernya di VSCode (`File > Open Folder...`).
2. Install ekstensi **Live Server** (oleh Ritwick Dey) dari Extensions marketplace, kalau belum ada.
3. Klik kanan pada `index.html` → **Open with Live Server**.
   - Atau, cukup buka `index.html` langsung dua kali klik di file explorer — game tetap jalan di browser tanpa Live Server, tapi Live Server lebih disarankan agar auto-reload saat kamu mengedit file.

## Struktur folder

```
rate-das-bild/
├── index.html          -> struktur halaman (menu, spielen, anleitung, game)
├── css/style.css        -> semua tampilan visual (warna, font, tombol)
├── js/questions.js      -> DATA SOAL (gambar, petunjuk huruf, jawaban) — INI YANG PALING SERING KAMU EDIT
├── js/app.js            -> logika game (nyawa, timer, cek jawaban, progres level)
└── images/
    ├── level1/           -> gambar-gambar soal Level 1
    └── level2/           -> gambar-gambar soal Level 2
```

## Cara mengganti gambar dengan gambar sendiri

Semua gambar yang ada sekarang cuma **placeholder** (kotak warna dengan tulisan) supaya game langsung bisa dicoba. Untuk memakai gambar aslimu:

1. Siapkan gambar yang kamu inginkan (foto, ilustrasi, ikon, dll).
2. Beri nama file **persis sama** dengan nama file placeholder yang ingin diganti. Daftar lengkapnya:

   **Level 1**
   | File | Gambar yang dibutuhkan |
   |---|---|
   | `images/level1/q1-1.jpg` | Mobil (Auto) |
   | `images/level1/q1-2.jpg` | Gigi (Zahn) |
   | `images/level1/q2-1.jpg` | Es (Eis) |
   | `images/level1/q2-2.jpg` | Beruang (Bär) |
   | `images/level1/q3-1.jpg` | Matahari (Sonne) |
   | `images/level1/q3-2.jpg` | Bunga (Blume) |
   | `images/level1/q4-1.jpg` | Api (Feuer) |
   | `images/level1/q4-2.jpg` | Karya/pertunjukan (Werk) |
   | `images/level1/q5-1.jpg` | Jempol/tanda "bagus" (Gut) |
   | `images/level1/q5-2.jpg` | Malam (Nacht) |

   **Level 2**
   | File | Gambar yang dibutuhkan |
   |---|---|
   | `images/level2/q1-1.jpg` | Cucian/mencuci (Waschen) |
   | `images/level2/q1-2.jpg` | Ember (Becken) |
   | `images/level2/q2-1.jpg` | Bumi (Erde) |
   | `images/level2/q2-2.jpg` | Kacang (Nuss) |
   | `images/level2/q3-1.jpg` | Pom bensin (Tankstelle) |
   | `images/level2/q3-2.jpg` | Bunga, mewakili "schön" |

3. Timpa (replace) file lama dengan file barumu di folder `images/level1` atau `images/level2`.
4. Kalau format gambarmu bukan `.jpg` (misalnya `.png` atau `.webp`), ada 2 pilihan:
   - Ubah nama filenya jadi `.jpg` juga (paling gampang), **atau**
   - Buka `js/questions.js`, cari baris `image: "level1/q1-1.jpg"` lalu ganti ekstensinya sesuai filemu, misalnya `image: "level1/q1-1.png"`.
5. Simpan, lalu refresh browser (kalau pakai Live Server, otomatis reload).

## Menambah / mengubah soal

Semua soal (gambar, petunjuk huruf, jawaban, batas waktu) diatur di `js/questions.js`. Buka file itu, penjelasan lengkap ada di bagian komentar paling atas file. Kamu bisa:
- Menambah soal baru ke dalam array `questions` pada level yang diinginkan.
- Menambah level baru dengan menambah objek baru ke array `levels`.
- Mengatur petunjuk huruf dengan 3 jenis: `arrow` (mis. `Z → B`), `plus` (mis. `+N`), `strike` (huruf yang dicoret, mis. `EN`).
- Mengatur batas waktu soal lewat `timer: 60` (dalam detik), atau `timer: null` kalau tidak ada batas waktu.

## Sistem nyawa & level

- Setiap pemain punya 5 nyawa (❤️) di setiap level.
- Jawaban salah **atau** waktu habis (untuk soal berwaktu) akan mengurangi 1 nyawa.
- Kalau nyawa habis, level otomatis diulang dari soal pertama dengan nyawa penuh kembali.
- Level 2 terkunci sampai Level 1 selesai dimainkan sampai tuntas.
- Progres (level mana yang sudah terbuka/selesai) disimpan di `localStorage` browser, jadi tetap tersimpan walau browser ditutup.
- Tombol **Zurücksetzen** di menu utama akan menghapus semua progres dan mengunci ulang Level 2.

Selamat belajar bahasa Jerman! 🇩🇪
