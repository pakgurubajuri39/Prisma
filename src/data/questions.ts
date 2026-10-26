import { AssessmentQuestion } from '../types/psychometrics';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // E vs I (Extraversion vs Introversion)
  {
    id: 1,
    pertanyaan: 'Setelah melewati pekan kerja atau aktivitas yang sangat padat, apa cara terbaikmu memulihkan energi?',
    dimensiTipe: 'EI',
    opsiA: { teks: 'Menyendiri dengan tenang, membaca, merenung, atau menikmati waktu sunyi di rumah.', dimensi: 'I', bobot: 2 },
    opsiB: { teks: 'Mengobrol santai bersama teman-teman, berkumpul, atau mencari suasana luar yang dinamis.', dimensi: 'E', bobot: 2 }
  },
  {
    id: 2,
    pertanyaan: 'Saat berada di sebuah acara sosial dengan banyak orang baru, kamu cenderung:',
    dimensiTipe: 'EI',
    opsiA: { teks: 'Menunggu diajak bicara terlebih dahulu atau fokus mengobrol mendalam dengan 1–2 orang terdekat.', dimensi: 'I', bobot: 2 },
    opsiB: { teks: 'Mudah berbaur, menyapa banyak orang secara alami, dan nyaman mencairkan suasana.', dimensi: 'E', bobot: 2 }
  },
  {
    id: 3,
    pertanyaan: 'Ketika sedang memproses ide atau gagasan yang baru muncul di kepalamu:',
    dimensiTipe: 'EI',
    opsiA: { teks: 'Mematangkannya secara internal di pikiranmu sebelum bersedia mengungkapkannya ke orang lain.', dimensi: 'I', bobot: 2 },
    opsiB: { teks: 'Membicarakannya langsung secara verbal sambil berpikir agar ide tersebut berkembang lewat diskusi.', dimensi: 'E', bobot: 2 }
  },
  {
    id: 4,
    pertanyaan: 'Dalam lingkungan kerja atau belajar, kamu merasa paling produktif saat:',
    dimensiTipe: 'EI',
    opsiA: { teks: 'Memiliki ruang fokus tersendiri tanpa interupsi atau obrolan mendadak.', dimensi: 'I', bobot: 2 },
    opsiB: { teks: 'Bekerja di tengah tim yang aktif bertukar kabar, berkolaborasi, dan saling berinteraksi.', dimensi: 'E', bobot: 2 }
  },
  {
    id: 5,
    pertanyaan: 'Bagaimana perasaanmu setelah menghadiri pertemuan sosial yang panjang sepanjang hari?',
    dimensiTipe: 'EI',
    opsiA: { teks: 'Baterai energimu terkuras dan kamu sangat mendambakan ruang privat untuk mengisi ulang diri.', dimensi: 'I', bobot: 2 },
    opsiB: { teks: 'Merasa bersemangat, terinspirasi oleh interaksi, dan masih memiliki dorongan untuk mengobrol.', dimensi: 'E', bobot: 2 }
  },
  {
    id: 6,
    pertanyaan: 'Dalam menyampaikan pandanganmu di rapat kelompok besar, kamu biasanya:',
    dimensiTipe: 'EI',
    opsiA: { teks: 'Berbicara hanya jika poin pentingmu belum disampaikan oleh orang lain secara tepat.', dimensi: 'I', bobot: 2 },
    opsiB: { teks: 'Spontan merespons secara aktif dan antusias menyampaikan pendapat sejak awal diskusi.', dimensi: 'E', bobot: 2 }
  },

  // S vs N (Sensing vs Intuition)
  {
    id: 7,
    pertanyaan: 'Ketika memahami sebuah konsep baru, apa yang paling menarik perhatianmu?',
    dimensiTipe: 'SN',
    opsiA: { teks: 'Fakta nyata, contoh aplikatif yang sudah terbukti, dan data konkret yang dapat diobservasi.', dimensi: 'S', bobot: 2 },
    opsiB: { teks: 'Pola tersembunyi, makna mendalam di balik layar, serta kemungkinan masa depan yang belum terjadi.', dimensi: 'N', bobot: 2 }
  },
  {
    id: 8,
    pertanyaan: 'Saat menceritakan sebuah peristiwa atau kejadian kepada temanmu:',
    dimensiTipe: 'SN',
    opsiA: { teks: 'Menjelaskan kronologi secara berurutan, detail kejadian nyata, dan apa yang benar-benar dikatakan.', dimensi: 'S', bobot: 2 },
    opsiB: { teks: 'Menyampaikan inti kesan, makna simbolik, analogi, serta wawasan besar yang kamu tangkap.', dimensi: 'N', bobot: 2 }
  },
  {
    id: 9,
    pertanyaan: 'Kamu lebih merasa puas dan bangga jika dikenal sebagai orang yang:',
    dimensiTipe: 'SN',
    opsiA: { teks: 'Praktis, realistis, teliti, dan cakap dalam menyelesaikan urusan teknis nyata di lapangan.', dimensi: 'S', bobot: 2 },
    opsiB: { teks: 'Visioner, kreatif, penuh imajinasi, dan pandai menghubungkan ide-ide abstrak menjadi konsep baru.', dimensi: 'N', bobot: 2 }
  },
  {
    id: 10,
    pertanyaan: 'Ketika merencanakan masa depan, cara pandangmu cenderung berfokus pada:',
    dimensiTipe: 'SN',
    opsiA: { teks: 'Kenyataan saat ini serta langkah-langkah nyata yang sudah jelas jejak rekamnya.', dimensi: 'S', bobot: 2 },
    opsiB: { teks: 'Visi jangka panjang, skenario alternatif yang inovatif, dan gambaran besar (big picture).', dimensi: 'N', bobot: 2 }
  },
  {
    id: 11,
    pertanyaan: 'Saat membaca buku atau artikel, kamu lebih menikmati tulisan yang:',
    dimensiTipe: 'SN',
    opsiA: { teks: 'Lugas, to-the-point, kaya panduan praktis langkah demi langkah yang bisa langsung diterapkan.', dimensi: 'S', bobot: 2 },
    opsiB: { teks: 'Kaya filosofi, memicu imajinasi, menyajikan teori konseptual yang membuka wawasan baru.', dimensi: 'N', bobot: 2 }
  },
  {
    id: 12,
    pertanyaan: 'Jika dihadapkan pada tugas memecahkan masalah, pendekatan pertamamu adalah:',
    dimensiTipe: 'SN',
    opsiA: { teks: 'Mengecek prosedur standar yang pernah berhasil digunakan di masa lalu.', dimensi: 'S', bobot: 2 },
    opsiB: { teks: 'Mencoba cara baru yang orisinal meskipun belum pernah dicoba orang sebelumnya.', dimensi: 'N', bobot: 2 }
  },

  // T vs F (Thinking vs Feeling)
  {
    id: 13,
    pertanyaan: 'Ketika harus mengambil keputusan yang sulit, hal utama yang menjadi kompasmu adalah:',
    dimensiTipe: 'TF',
    opsiA: { teks: 'Logika objektif, prinsip keadilan, fakta yang terukur, dan konsistensi sebab-akibat.', dimensi: 'T', bobot: 2 },
    opsiB: { teks: 'Dampak manusiawi, perasaan orang yang terlibat, harmoni kelompok, dan nilai personal nurani.', dimensi: 'F', bobot: 2 }
  },
  {
    id: 14,
    pertanyaan: 'Saat seorang teman dekat curhat mengenai masalah berat yang sedang ia hadapi, reaksi refleksmu adalah:',
    dimensiTipe: 'TF',
    opsiA: { teks: 'Menganalisis akar penyebabnya dan menawarkan solusi praktis yang logis untuk menyelesaikannya.', dimensi: 'T', bobot: 2 },
    opsiB: { teks: 'Mendengarkan dengan penuh empati, memvalidasi perasaannya, dan memastikan ia merasa dipahami.', dimensi: 'F', bobot: 2 }
  },
  {
    id: 15,
    pertanyaan: 'Dalam sebuah perdebatan atau diskusi tim, kamu lebih menghargai:',
    dimensiTipe: 'TF',
    opsiA: { teks: 'Kebenaran fakta yang akurat meskipun terkadang terdengar blak-blakan atau sedikit pahit.', dimensi: 'T', bobot: 2 },
    opsiB: { teks: 'Penyampaian yang menjaga perasaan dan kehangatan relasi agar tidak ada hati yang terluka.', dimensi: 'F', bobot: 2 }
  },
  {
    id: 16,
    pertanyaan: 'Jika kamu melihat ketidakefisienan yang dilakukan rekan kerja, kamu cenderung:',
    dimensiTipe: 'TF',
    opsiA: { teks: 'Menunjukkan kesalahannya secara langsung berdasarkan kriteria standar kerja yang baku.', dimensi: 'T', bobot: 2 },
    opsiB: { teks: 'Memikirkan suasana hatinya terlebih dahulu dan mencari cara halus agar ia tidak berkecil hati.', dimensi: 'F', bobot: 2 }
  },
  {
    id: 17,
    pertanyaan: 'Kamu merasa paling tidak nyaman jika situasi memaksamu untuk:',
    dimensiTipe: 'TF',
    opsiA: { teks: 'Membuat keputusan tanpa dasar logika yang jelas hanya karena desakan emosional sesaat.', dimensi: 'T', bobot: 2 },
    opsiB: { teks: 'Mengabaikan perasaan seseorang demi menegakkan aturan yang kaku dan dingin.', dimensi: 'F', bobot: 2 }
  },
  {
    id: 18,
    pertanyaan: 'Definisi keadilan terbaik menurut sudut pandangmu adalah:',
    dimensiTipe: 'TF',
    opsiA: { teks: 'Menerapkan aturan yang sama persis kepada semua orang tanpa perlakuan istimewa.', dimensi: 'T', bobot: 2 },
    opsiB: { teks: 'Mempertimbangkan konteks pribadi tiap individu dan memberikan perlakuan yang berbelas kasih.', dimensi: 'F', bobot: 2 }
  },

  // J vs P (Judging vs Perceiving)
  {
    id: 19,
    pertanyaan: 'Dalam mengelola jadwal harian atau akhir pekanmu, kamu lebih suka:',
    dimensiTipe: 'JP',
    opsiA: { teks: 'Menyusun rencana yang terstruktur rapi, to-do list, dan mengetahui apa yang akan terjadi.', dimensi: 'J', bobot: 2 },
    opsiB: { teks: 'Membiarkan jadwal fleksibel, mengalir spontan, dan bebas beradaptasi mengikuti suasana hati.', dimensi: 'P', bobot: 2 }
  },
  {
    id: 20,
    pertanyaan: 'Ketika ada tenggat waktu (deadline) pekerjaan besar, kamu biasanya:',
    dimensiTipe: 'JP',
    opsiA: { teks: 'Mencicilnya jauh-jauh hari secara bertahap agar selesai sebelum batas waktu tanpa rasa panik.', dimensi: 'J', bobot: 2 },
    opsiB: { teks: 'Mengerjakannya mendekati batas akhir karena lonjakan adrenalin justru memicu kreativitas terbaikmu.', dimensi: 'P', bobot: 2 }
  },
  {
    id: 21,
    pertanyaan: 'Bagaimana perasaanmu terhadap keputusan yang sudah disepakati bersama?',
    dimensiTipe: 'JP',
    opsiA: { teks: 'Lega karena kepastian sudah didapat dan kamu bisa melangkah fokus ke tahapan berikutnya.', dimensi: 'J', bobot: 2 },
    opsiB: { teks: 'Tetap terbuka ingin mengubahnya jika nanti ada informasi baru atau opsi yang lebih menarik.', dimensi: 'P', bobot: 2 }
  },
  {
    id: 22,
    pertanyaan: 'Meja kerja atau ruang kamarmu biasanya berada dalam kondisi:',
    dimensiTipe: 'JP',
    opsiA: { teks: 'Tertata rapi pada tempatnya masing-masing sehingga mudah ditemukan kapan saja.', dimensi: 'J', bobot: 2 },
    opsiB: { teks: 'Kekacauan yang terorganisir (creative mess); tampak berantakan bagi orang lain tapi kamu hafal letaknya.', dimensi: 'P', bobot: 2 }
  },
  {
    id: 23,
    pertanyaan: 'Ketika merencanakan liburan bersama pasangan atau keluarga:',
    dimensiTipe: 'JP',
    opsiA: { teks: 'Membuat itinerary detail lengkap dengan jadwal destinasi, tiket, dan reservasi yang pasti.', dimensi: 'J', bobot: 2 },
    opsiB: { teks: 'Menentukan tujuan umum saja, lalu sisanya menjelajah secara spontan sesuai mood hari itu.', dimensi: 'P', bobot: 2 }
  },
  {
    id: 24,
    pertanyaan: 'Perubahan rencana mendadak di menit-menit terakhir umumnya membuatmu merasa:',
    dimensiTipe: 'JP',
    opsiA: { teks: 'Terganggu dan perlu waktu untuk mengatur ulang kembali kerangka mental yang sudah disusun.', dimensi: 'J', bobot: 2 },
    opsiB: { teks: 'Santai, terbiasa fleksibel, dan justru menikmati dinamika kejutan yang tidak terduga.', dimensi: 'P', bobot: 2 }
  }
];
