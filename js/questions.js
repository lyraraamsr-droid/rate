/* ============================================================
   RATE DAS BILD! — DATA SOAL
   ============================================================
   Di sinilah kamu mengatur SEMUA soal: gambar, petunjuk huruf,
   dan jawaban. Kamu TIDAK perlu menyentuh file app.js untuk
   menambah/mengubah soal.

   CARA MENAMBAHKAN GAMBAR SENDIRI:
   1. Siapkan gambarmu (format .jpg, .png, atau .svg semua bisa).
   2. Beri nama file SESUAI dengan nama pada properti "image" di
      bawah ini (misalnya "q1-1.jpg" untuk soal 1 gambar pertama).
   3. Simpan file itu ke dalam folder:
        images/level1/   -> untuk soal-soal Level 1
        images/level2/   -> untuk soal-soal Level 2
   4. Kalau kamu memakai ekstensi lain (misalnya .png bukan .jpg),
      cukup ubah tulisan ekstensinya di properti "image" di bawah.
   5. Selesai — buka ulang halaman game-nya (refresh browser).

   Setiap soal terdiri dari 2 "petunjuk gambar" (clue) yang kalau
   digabung membentuk satu kata bahasa Jerman. Beberapa gambar
   punya "hint" (petunjuk huruf tambahan), misalnya:
     { type: "arrow",  text: "Z → B" }   -> huruf Z diganti jadi B
     { type: "plus",   text: "+N" }      -> tambahkan huruf N
     { type: "strike", text: "EN" }      -> huruf EN dihapus/dicoret
   Kalau gambar tidak butuh petunjuk huruf, tulis saja: hint: null
   ============================================================ */

const GAME_DATA = {
  levels: [
    {
      id: 1,
      title: "Level 1",
      questions: [
        {
          // Auto + Zahn (Z->B = Bahn) = Autobahn
          clues: [
            { image: "level1/q1-1.jpg", label: "Auto", hint: null },
            { image: "level1/q1-2.jpg", label: "Zahn", hint: { type: "arrow", text: "Z → B" } }
          ],
          answer: "Autobahn",
          timer: null
        },
        {
          // Eis + Bär = Eisbär
          clues: [
            { image: "level1/q2-1.jpg", label: "Eis", hint: null },
            { image: "level1/q2-2.jpg", label: "Bär", hint: null }
          ],
          answer: "Eisbär",
          timer: null
        },
        {
          // Sonne (+N) + Blume = Sonnenblume
          clues: [
            { image: "level1/q3-1.jpg", label: "Sonne", hint: { type: "plus", text: "+N" } },
            { image: "level1/q3-2.jpg", label: "Blume", hint: null }
          ],
          answer: "Sonnenblume",
          timer: null
        },
        {
          // Feuer + Werk = Feuerwerk
          clues: [
            { image: "level1/q4-1.jpg", label: "Feuer", hint: null },
            { image: "level1/q4-2.jpg", label: "Werk", hint: null }
          ],
          answer: "Feuerwerk",
          timer: null
        },
        {
          // Gut (+E) + Nacht = Gute Nacht  (soal dengan batas waktu 1 menit)
          clues: [
            { image: "level1/q5-1.jpg", label: "Gut (Daumen hoch)", hint: { type: "plus", text: "+E" } },
            { image: "level1/q5-2.jpg", label: "Nacht", hint: null }
          ],
          answer: "Gute Nacht",
          timer: 60
        }
      ]
    },
    {
      id: 2,
      title: "Level 2",
      questions: [
        {
          // Waschen (EN dicoret = Wasch) + Becken = Waschbecken
          clues: [
            { image: "level2/q1-1.jpg", label: "Waschen", hint: { type: "strike", text: "EN" } },
            { image: "level2/q1-2.jpg", label: "Becken (Eimer)", hint: null }
          ],
          answer: "Waschbecken",
          timer: null
        },
        {
          // Erde (E dicoret = Erd) + Nuss = Erdnuss
          clues: [
            { image: "level2/q2-1.jpg", label: "Erde", hint: { type: "strike", text: "E" } },
            { image: "level2/q2-2.jpg", label: "Nuss", hint: null }
          ],
          answer: "Erdnuss",
          timer: null
        },
        {
          // Tankstelle (T->D = Dankstelle -> Danke) + schön = Dankeschön (soal dengan batas waktu 2 menit)
          clues: [
            { image: "level2/q3-1.jpg", label: "Tankstelle", hint: { type: "arrow", text: "T → D" } },
            { image: "level2/q3-2.jpg", label: "schön (Blume)", hint: null }
          ],
          answer: "Dankeschön",
          timer: 120
        }
      ]
    }
  ]
};
