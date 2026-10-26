import { MBTIType, ArchetypeRole, ChapterReport, CompatibilityInsight } from '../types/psychometrics';
import { TOPICS_LIST } from './topics';

export interface PersonalityMeta {
  type: MBTIType;
  name: string;
  role: ArchetypeRole;
  shortDesc: string;
  motto: string;
  cognitiveFunctions: {
    dominan: string;
    auksilier: string;
    tersier: string;
    inferior: string;
  };
  dimensionDefaults: {
    ei: { introversion: number; extraversion: number };
    sn: { intuition: number; sensing: number };
    tf: { thinking: number; feeling: number };
    jp: { judging: number; perceiving: number };
  };
  bestMatches: MBTIType[];
  challengingMatches: MBTIType[];
}

export const PERSONALITY_METAS: Record<MBTIType, PersonalityMeta> = {
  INTJ: {
    type: 'INTJ',
    name: 'Sang Arsitek Strategis',
    role: 'Analis',
    shortDesc: 'Pemikir visioner dengan dorongan alami untuk merancang sistem masa depan yang presisi, mandiri, dan berorientasi jangka panjang.',
    motto: '"Melihat apa yang belum terlihat, membangun apa yang terukur nyata."',
    cognitiveFunctions: {
      dominan: 'Introverted Intuition (Ni) - Visi & Pola Masa Depan',
      auksilier: 'Extraverted Thinking (Te) - Struktur & Efisiensi Objektif',
      tersier: 'Introverted Feeling (Fi) - Nilai Internal Otentik',
      inferior: 'Extraverted Sensing (Se) - Resonansi Sensorik Seketika'
    },
    dimensionDefaults: {
      ei: { introversion: 78, extraversion: 22 },
      sn: { intuition: 85, sensing: 15 },
      tf: { thinking: 80, feeling: 20 },
      jp: { judging: 75, perceiving: 25 }
    },
    bestMatches: ['ENFP', 'ENTP', 'INFJ'],
    challengingMatches: ['ESFP', 'ISFP', 'ESTP']
  },
  INTP: {
    type: 'INTP',
    name: 'Sang Logikawan Konseptual',
    role: 'Analis',
    shortDesc: 'Pencari kebenaran objektif yang menyukai eksplorasi teori, membedah prinsip dasar pemikiran, dan menemukan keanggunan logika di balik kekacauan.',
    motto: '"Pertanyakan segala sesuatu, temukan struktur hakiki kenyataan."',
    cognitiveFunctions: {
      dominan: 'Introverted Thinking (Ti) - Kerangka Logika Murni',
      auksilier: 'Extraverted Intuition (Ne) - Eksplorasi Kemungkinan Bebas',
      tersier: 'Introverted Sensing (Si) - Preseden & Memori Presisi',
      inferior: 'Extraverted Feeling (Fe) - Harmoni Relasional Eksternal'
    },
    dimensionDefaults: {
      ei: { introversion: 82, extraversion: 18 },
      sn: { intuition: 88, sensing: 12 },
      tf: { thinking: 85, feeling: 15 },
      jp: { judging: 25, perceiving: 75 }
    },
    bestMatches: ['ENTJ', 'ENFJ', 'INTJ'],
    challengingMatches: ['ESFJ', 'ISFJ', 'ESTJ']
  },
  ENTJ: {
    type: 'ENTJ',
    name: 'Sang Komandan Visioner',
    role: 'Analis',
    shortDesc: 'Pemimpin tangguh yang mampu mengubah visi abstrak menjadi strategi nyata dengan kecepatan eksekusi tinggi dan kepemimpinan yang berwibawa.',
    motto: '"Bukan hanya memimpikan hasil, tetapi mengeksekusinya tanpa ragu."',
    cognitiveFunctions: {
      dominan: 'Extraverted Thinking (Te) - Manajemen & Efisiensi Sistem',
      auksilier: 'Introverted Intuition (Ni) - Visi Jangka Panjang Terfokus',
      tersier: 'Extraverted Sensing (Se) - Peluang Nyata & Ketangkasan',
      inferior: 'Introverted Feeling (Fi) - Refleksi Batin & Nilai Pribadi'
    },
    dimensionDefaults: {
      ei: { introversion: 22, extraversion: 78 },
      sn: { intuition: 80, sensing: 20 },
      tf: { thinking: 88, feeling: 12 },
      jp: { judging: 85, perceiving: 15 }
    },
    bestMatches: ['INTP', 'INFP', 'INTJ'],
    challengingMatches: ['ISFP', 'INFP', 'ISFJ']
  },
  ENTP: {
    type: 'ENTP',
    name: 'Sang Pendebat Inovatif',
    role: 'Analis',
    shortDesc: 'Katalis pemikiran yang lincah menguji batas konvensional, merangkai kemungkinan baru, dan menantang status quo dengan kecerdasan jenaka.',
    motto: '"Tak ada kebiasaan lama yang kebal terhadap pertanyaan segar."',
    cognitiveFunctions: {
      dominan: 'Extraverted Intuition (Ne) - Melompat Antar Kemungkinan',
      auksilier: 'Introverted Thinking (Ti) - Analisis Logika Internal',
      tersier: 'Extraverted Feeling (Fe) - Daya Tarik Karisma Sosial',
      inferior: 'Introverted Sensing (Si) - Konsistensi Detail Rutin'
    },
    dimensionDefaults: {
      ei: { introversion: 30, extraversion: 70 },
      sn: { intuition: 90, sensing: 10 },
      tf: { thinking: 75, feeling: 25 },
      jp: { judging: 20, perceiving: 80 }
    },
    bestMatches: ['INFJ', 'INTJ', 'ENFP'],
    challengingMatches: ['ISTJ', 'ISFJ', 'ESFJ']
  },
  INFJ: {
    type: 'INFJ',
    name: 'Sang Penasihat Visioner',
    role: 'Diplomat',
    shortDesc: 'Pribadi yang tenang, penuh intuisi empatik, berpegang teguh pada integritas nurani, dan berdedikasi membantu orang lain menemukan makna hidup.',
    motto: '"Membaca yang tersirat di jiwa, membimbing menuju kebaikan sejati."',
    cognitiveFunctions: {
      dominan: 'Introverted Intuition (Ni) - Sintesis Intuisi Mendalam',
      auksilier: 'Extraverted Feeling (Fe) - Empati & Harmoni Kelompok',
      tersier: 'Introverted Thinking (Ti) - Penyelarasan Logika Batin',
      inferior: 'Extraverted Sensing (Se) - Kehadiran Sensorik Dunia Nyata'
    },
    dimensionDefaults: {
      ei: { introversion: 75, extraversion: 25 },
      sn: { intuition: 88, sensing: 12 },
      tf: { thinking: 25, feeling: 75 },
      jp: { judging: 78, perceiving: 22 }
    },
    bestMatches: ['ENTP', 'ENFP', 'INFP'],
    challengingMatches: ['ESTP', 'ESFP', 'ESTJ']
  },
  INFP: {
    type: 'INFP',
    name: 'Sang Mediator Idealis',
    role: 'Diplomat',
    shortDesc: 'Jiwa puitis yang menjunjung tinggi keaslian nilai batin, penuh kasih sayang tanpa syarat, serta memiliki imajinasi kaya akan dunia yang lebih baik.',
    motto: '"Tetap setia pada nurani, memeluk dunia dengan kelembutan."',
    cognitiveFunctions: {
      dominan: 'Introverted Feeling (Fi) - Kompas Moral & Keaslian Otentik',
      auksilier: 'Extraverted Intuition (Ne) - Menemukan Kemungkinan Makna Baru',
      tersier: 'Introverted Sensing (Si) - Nostalgia & Memori Personal Mendalam',
      inferior: 'Extraverted Thinking (Te) - Struktur Tindakan Eksternal'
    },
    dimensionDefaults: {
      ei: { introversion: 80, extraversion: 20 },
      sn: { intuition: 85, sensing: 15 },
      tf: { thinking: 18, feeling: 82 },
      jp: { judging: 20, perceiving: 80 }
    },
    bestMatches: ['ENFJ', 'ENTJ', 'INFJ'],
    challengingMatches: ['ESTJ', 'ESTP', 'ISTJ']
  },
  ENFJ: {
    type: 'ENFJ',
    name: 'Sang Pembimbing Karismatik',
    role: 'Diplomat',
    shortDesc: 'Sosok inspiratif yang secara alami mampu membakar semangat kelompok, peka terhadap potensi orang lain, dan menyatukan visi bersama.',
    motto: '"Menyalakan lilin potensi dalam diri setiap orang yang kutemui."',
    cognitiveFunctions: {
      dominan: 'Extraverted Feeling (Fe) - Kepemimpinan Berbasis Empati',
      auksilier: 'Introverted Intuition (Ni) - Arah Masa Depan Bersama',
      tersier: 'Extraverted Sensing (Se) - Kehadiran Karismatik Spontan',
      inferior: 'Introverted Thinking (Ti) - Kritik Diri Logis yang Tenang'
    },
    dimensionDefaults: {
      ei: { introversion: 20, extraversion: 80 },
      sn: { intuition: 82, sensing: 18 },
      tf: { thinking: 22, feeling: 78 },
      jp: { judging: 80, perceiving: 20 }
    },
    bestMatches: ['INFP', 'ISFP', 'INTP'],
    challengingMatches: ['ISTP', 'ISTJ', 'ESTP']
  },
  ENFP: {
    type: 'ENFP',
    name: 'Sang Inspirator Antusias',
    role: 'Diplomat',
    shortDesc: 'Jiwa bebas yang penuh energi hangat, menghubungkan orang dengan ide-ide kreatif, dan memandang setiap peristiwa sebagai petualangan bermakna.',
    motto: '"Setiap manusia menyimpan keajaiban, setiap hari menyimpan cerita."',
    cognitiveFunctions: {
      dominan: 'Extraverted Intuition (Ne) - Semesta Ide & Antusiasme',
      auksilier: 'Introverted Feeling (Fi) - Rasa Empati Batiniah Mendalam',
      tersier: 'Extraverted Thinking (Te) - Dorongan Eksekusi Impromptu',
      inferior: 'Introverted Sensing (Si) - Keteraturan Detail Administrasi'
    },
    dimensionDefaults: {
      ei: { introversion: 25, extraversion: 75 },
      sn: { intuition: 90, sensing: 10 },
      tf: { thinking: 28, feeling: 72 },
      jp: { judging: 18, perceiving: 82 }
    },
    bestMatches: ['INTJ', 'INFJ', 'ENTP'],
    challengingMatches: ['ISTJ', 'ESTJ', 'ISFJ']
  },
  ISTJ: {
    type: 'ISTJ',
    name: 'Sang Pelaksana Bertanggung Jawab',
    role: 'Pengawal',
    shortDesc: 'Pilar keteraturan yang berdedikasi tinggi, menghormati fakta, memegang teguh komitmen, dan bekerja secara metodis hingga tuntas sempurna.',
    motto: '"Kredibilitas dibangun oleh konsistensi dan integritas nyata."',
    cognitiveFunctions: {
      dominan: 'Introverted Sensing (Si) - Fakta, Riwayat, & Presisi Teliti',
      auksilier: 'Extraverted Thinking (Te) - Pengorganisasian Efektif',
      tersier: 'Introverted Feeling (Fi) - Dedikasi Tanggung Jawab Personal',
      inferior: 'Extraverted Intuition (Ne) - Antisipasi Terhadap Ketidakpastian'
    },
    dimensionDefaults: {
      ei: { introversion: 78, extraversion: 22 },
      sn: { intuition: 18, sensing: 82 },
      tf: { thinking: 75, feeling: 25 },
      jp: { judging: 88, perceiving: 12 }
    },
    bestMatches: ['ESFP', 'ESTP', 'ISFJ'],
    challengingMatches: ['ENFP', 'ENTP', 'INFP']
  },
  ISFJ: {
    type: 'ISFJ',
    name: 'Sang Pelindung Hangat',
    role: 'Pengawal',
    shortDesc: 'Penjaga kehangatan yang penuh kelembutan, sangat teliti memperhatikan kebutuhan orang-orang tersayang, dan setia menjaga stabilitas keluarga.',
    motto: '"Kebaikan yang sunyi sering kali menjadi pondasi terkuat rumah."',
    cognitiveFunctions: {
      dominan: 'Introverted Sensing (Si) - Perhatian Detail & Tradisi Penuh Makna',
      auksilier: 'Extraverted Feeling (Fe) - Kelembutan & Pelayanan Tulus',
      tersier: 'Introverted Thinking (Ti) - Analisis Praktis yang Teratur',
      inferior: 'Extraverted Intuition (Ne) - Kecemasan Akan Perubahan Mendadak'
    },
    dimensionDefaults: {
      ei: { introversion: 76, extraversion: 24 },
      sn: { intuition: 20, sensing: 80 },
      tf: { thinking: 24, feeling: 76 },
      jp: { judging: 82, perceiving: 18 }
    },
    bestMatches: ['ESFP', 'ESTP', 'ISFP'],
    challengingMatches: ['ENTP', 'ENTJ', 'ENFP']
  },
  ESTJ: {
    type: 'ESTJ',
    name: 'Sang Pengorganisir Andal',
    role: 'Pengawal',
    shortDesc: 'Pengelola handal yang menghargai ketertiban, memiliki kepemimpinan praktis, lugas menegakkan standar, dan memastikan semua berjalan tertata rapi.',
    motto: '"Keteraturan melahirkan kepastian, kerja keras membuahkan hasil."',
    cognitiveFunctions: {
      dominan: 'Extraverted Thinking (Te) - Standarisasi & Pelaksanaan Cepat',
      auksilier: 'Introverted Sensing (Si) - Bukti Pengalaman Teruji',
      tersier: 'Extraverted Intuition (Ne) - Adaptasi Taktis Lapangan',
      inferior: 'Introverted Feeling (Fi) - Kepekaan Rasa Internal'
    },
    dimensionDefaults: {
      ei: { introversion: 20, extraversion: 80 },
      sn: { intuition: 22, sensing: 78 },
      tf: { thinking: 82, feeling: 18 },
      jp: { judging: 86, perceiving: 14 }
    },
    bestMatches: ['ISFP', 'ISTP', 'ISTJ'],
    challengingMatches: ['INFP', 'INFJ', 'ENFP']
  },
  ESFJ: {
    type: 'ESFJ',
    name: 'Sang Penyatu Komunitas',
    role: 'Pengawal',
    shortDesc: 'Pribadi ramah dan suportif yang secara aktif menciptakan rasa kekeluargaan, menjaga tradisi sosial, dan memastikan tidak ada yang terasingkan.',
    motto: '"Kebersamaan adalah kekayaan terbesar yang saling menguatkan."',
    cognitiveFunctions: {
      dominan: 'Extraverted Feeling (Fe) - Kehangatan Sosial & Kerukunan',
      auksilier: 'Introverted Sensing (Si) - Nilai-Nilai Keluarga & Ritual Bersama',
      tersier: 'Extraverted Intuition (Ne) - Kegembiraan Menjamu Hal Baru',
      inferior: 'Introverted Thinking (Ti) - Objektivitas Saat Dihadapkan Kritik'
    },
    dimensionDefaults: {
      ei: { introversion: 18, extraversion: 82 },
      sn: { intuition: 25, sensing: 75 },
      tf: { thinking: 22, feeling: 78 },
      jp: { judging: 80, perceiving: 20 }
    },
    bestMatches: ['ISFP', 'ISTP', 'ISFJ'],
    challengingMatches: ['INTP', 'INTJ', 'ENTP']
  },
  ISTP: {
    type: 'ISTP',
    name: 'Sang Virtuoso Praktis',
    role: 'Penjelajah',
    shortDesc: 'Pemerhati tenang yang gemar membedah mekanisme kerja berbagai hal, sangat tenang saat krisis, dan cekatan memecahkan masalah praktis seketika.',
    motto: '"Pahami cara kerjanya, perbaiki dengan tangan dingin."',
    cognitiveFunctions: {
      dominan: 'Introverted Thinking (Ti) - Prinsip Mekanis & Efisiensi Akurat',
      auksilier: 'Extraverted Sensing (Se) - Pengamatan Lapangan Cepat',
      tersier: 'Introverted Intuition (Ni) - Firasat Penyelesaian Taktis',
      inferior: 'Extraverted Feeling (Fe) - Ekspresi Emosional Formalitas'
    },
    dimensionDefaults: {
      ei: { introversion: 82, extraversion: 18 },
      sn: { intuition: 25, sensing: 75 },
      tf: { thinking: 84, feeling: 16 },
      jp: { judging: 20, perceiving: 80 }
    },
    bestMatches: ['ESTJ', 'ESFJ', 'ESTP'],
    challengingMatches: ['ENFJ', 'INFJ', 'ENFP']
  },
  ISFP: {
    type: 'ISFP',
    name: 'Sang Penikmat Seni Otentik',
    role: 'Penjelajah',
    shortDesc: 'Jiwa artistik yang sensitif, hidup selaras dengan nilai-nilai personalnya, mengekspresikan diri melalui keindahan nyata, dan tidak suka membatasi orang lain.',
    motto: '"Hidup adalah kanvas terbuka yang dirasakan dengan tulus."',
    cognitiveFunctions: {
      dominan: 'Introverted Feeling (Fi) - Sensibilitas Rasa Otentik',
      auksilier: 'Extraverted Sensing (Se) - Apresiasi Keindahan Nyata Seketika',
      tersier: 'Introverted Intuition (Ni) - Kedalaman Makna Personal',
      inferior: 'Extraverted Thinking (Te) - Strukturasi Garis Batas Keras'
    },
    dimensionDefaults: {
      ei: { introversion: 78, extraversion: 22 },
      sn: { intuition: 28, sensing: 72 },
      tf: { thinking: 20, feeling: 80 },
      jp: { judging: 22, perceiving: 78 }
    },
    bestMatches: ['ESFJ', 'ESTJ', 'ENFJ'],
    challengingMatches: ['ENTJ', 'INTJ', 'ESTP']
  },
  ESTP: {
    type: 'ESTP',
    name: 'Sang Eksekutor Berani',
    role: 'Penjelajah',
    shortDesc: 'Pribadi dinamis dan karismatik yang mencintai aksi nyata, tangkas berimprovisasi di situasi berisiko, dan selalu membawa energi segar ke manapun ia pergi.',
    motto: '"Peluang tidak menunggu orang ragu; bertindaklah sekarang."',
    cognitiveFunctions: {
      dominan: 'Extraverted Sensing (Se) - Naluri Aksi & Realitas Seketika',
      auksilier: 'Introverted Thinking (Ti) - Keputusan Taktis Berbasis Logika',
      tersier: 'Extraverted Feeling (Fe) - Persuasi & Magnetisme Sosial',
      inferior: 'Introverted Intuition (Ni) - Pandangan Spekulatif Jangka Panjang'
    },
    dimensionDefaults: {
      ei: { introversion: 16, extraversion: 84 },
      sn: { intuition: 20, sensing: 80 },
      tf: { thinking: 76, feeling: 24 },
      jp: { judging: 18, perceiving: 82 }
    },
    bestMatches: ['ISFJ', 'ISTJ', 'ISTP'],
    challengingMatches: ['INFJ', 'INFP', 'INTJ']
  },
  ESFP: {
    type: 'ESFP',
    name: 'Sang Pembangkit Semangat',
    role: 'Penjelajah',
    shortDesc: 'Pribadi yang spontan, hangat, dan penuh daya hidup, mahir menularkan keceriaan kepada lingkungan sekitarnya, serta menikmati setiap detik kehidupan.',
    motto: '"Hadir seutuhnya hari ini, bagikan senyum terbaikmu."',
    cognitiveFunctions: {
      dominan: 'Extraverted Sensing (Se) - Spontanitas Hidup & Energi Penuh',
      auksilier: 'Introverted Feeling (Fe) - Kehangatan Hati & Empati Terbuka',
      tersier: 'Extraverted Thinking (Te) - Kemampuan Praktis Menyelesaikan Hal',
      inferior: 'Introverted Intuition (Ni) - Refleksi Mendalam Rencana Esok'
    },
    dimensionDefaults: {
      ei: { introversion: 15, extraversion: 85 },
      sn: { intuition: 22, sensing: 78 },
      tf: { thinking: 22, feeling: 78 },
      jp: { judging: 16, perceiving: 84 }
    },
    bestMatches: ['ISTJ', 'ISFJ', 'ESFJ'],
    challengingMatches: ['INTJ', 'INFJ', 'INTP']
  }
};

// Generates warm, empathetic, structured 4-card chapter report for any type & topic
export function generateBaselineChapter(type: MBTIType, topicCode: string, subjectName = 'kamu'): ChapterReport {
  const meta = PERSONALITY_METAS[type];
  const topic = TOPICS_LIST.find(t => t.kode === topicCode) || TOPICS_LIST[0];
  const tName = meta.name;

  switch (topic.kode) {
    case '01': // Tipe dan ringkasan utamamu
      return {
        nomor: 1,
        kode_bab: '01',
        judul: 'Tipe dan ringkasan utamamu',
        ringkasan_eksekutif: `Selamat datang di ruang eksplorasi dirimu, ${subjectName}. Sebagai ${meta.name} (${type}), kamu membawa kombinasi langka antara ketajaman arah hidup dan keteguhan batin. Dunia membutuhkan caramu memandang masa depan secara terstruktur tanpa kehilangan integritas. Laporan ini bukan label yang membatasi langkahmu, melainkan cermin reflektif untuk membantumu merayakan anugerah alamiah sekaligus merawat titik-titik buta yang kerap luput dari pandanganmu.`,
        kartu_1: {
          judul: 'Karakteristik & Pola Alami',
          deskripsi: 'Pondasi bawaan yang secara organik menggerakkan caramu merespons kehidupan.',
          poin: [
            `Kamu memiliki kecenderungan alami sebagai ${meta.role} yang menyukai kejelasan arah dan konsistensi makna.`,
            `Energi utamamu didorong oleh ${meta.cognitiveFunctions.dominan}, membuatmu mampu menyederhanakan hal rumit menjadi pola yang jelas.`,
            `Kamu tidak mudah terdistraksi oleh tren sesaat karena kompas intimu bertumpu pada keyakinan yang telah kamu renungkan secara matang.`
          ]
        },
        kartu_2: {
          judul: 'Praktik Nyata & Interaksi',
          deskripsi: 'Bagaimana karakteristik unikmu tercermin dalam dinamika sehari-hari.',
          poin: [
            `Dalam pergaulan, kamu lebih memilih percakapan yang substantif dan berbobot ketimbang basa-basi dangkal yang menguras energi.`,
            `Saat dihadapkan pada tugas atau proyek, kamu secara naluriah menyusun strategi langkah demi langkah sebelum terjun bertindak.`,
            `Orang-orang di sekitarmu sering mengandalkanmu sebagai sosok penstabil yang mampu memberikan masukan jernih di tengah kekacauan.`
          ]
        },
        kartu_3: {
          judul: 'Risiko & Titik Buta (Blind Spots)',
          deskripsi: 'Pola kebiasaan yang terasa nyaman bagi dirimu namun berpotensi membebani tanpa disadari.',
          poin: [
            `Kecenderungan menuntut standar kesempurnaan yang terlalu tinggi, baik kepada diri sendiri maupun kepada orang lain di dekatmu.`,
            `Kerap menahan uneg-uneg atau memendam kelelahan sendiri karena merasa harus selalu tampak mandiri dan terkendali.`,
            `Bisa terkesan berjarak atau dingin bagi orang yang belum mengenalmu, padahal di dalam hatimu terdapat kepedulian yang sangat dalam.`,
            `Kelelahan kognitif akibat terus-menerus meramalkan kemungkinan masa depan sehingga lupa menikmati keindahan momen hari ini.`
          ]
        },
        kartu_4: {
          judul: 'Langkah Konkret 4 Tahap & Kebiasaan Terukur',
          deskripsi: 'Panduan aksi bertahap untuk menyelaraskan potensimu dengan ketenangan batin.',
          tahapan: [
            { tahap: 1, nama: 'Sadar Ritme Batin', aksi: 'Ambil jeda 5 menit setiap pagi untuk mengecek detak energimu sebelum membuka notifikasi gawai.' },
            { tahap: 2, nama: 'Artikulasikan Kebutuhan', aksi: 'Ungkapkan satu ekspektasi atau perasaanmu secara jujur dan lembut kepada orang terdekat hari ini.' },
            { tahap: 3, nama: 'Toleransi Ketidaksempurnaan', aksi: 'Latih diri membiarkan satu hal kecil selesai dengan standar "cukup baik" tanpa perlu overthinking.' },
            { tahap: 4, nama: 'Rayakan Pencapaian Kecil', aksi: 'Tuliskan 3 kemajuan nyata yang berhasil kamu lakukan setiap akhir pekan sebagai bentuk apresiasi diri.' }
          ],
          checklist_harian: [
            'Menyediakan 15 menit waktu hening tanpa layar untuk mengisi ulang baterai mental.',
            'Memberikan apresiasi spesifik kepada rekan atau orang tersayang.',
            'Menghirup napas dalam-dalam saat merasakan dorongan untuk mengendalikan hal di luar kendalimu.'
          ]
        }
      };

    case '04': // Cara pikiranmu bekerja
      return {
        nomor: 4,
        kode_bab: '04',
        judul: 'Cara pikiranmu bekerja',
        ringkasan_eksekutif: `Pikiranmu beroperasi seperti arsitektur kognitif yang canggih. Kamu tidak sekadar mengumpulkan data terpisah, melainkan menyatukannya menjadi peta konseptual yang kohesif. Memahami fungsi dominanmu (${meta.cognitiveFunctions.dominan}) akan membantumu memahami mengapa kamu sering kali sudah "mengetahui" kesimpulan suatu masalah bahkan sebelum orang lain selesai membaca premisnya.`,
        kartu_1: {
          judul: 'Karakteristik & Pola Alami',
          deskripsi: 'Sistem navigasi mental internal yang membentuk cara pandangmu.',
          poin: [
            `Memproses informasi secara berlapis: mengurai variabel tersembunyi dan mengidentifikasi hubungan sebab-akibat jangka panjang.`,
            `Memiliki filter internal yang ketat terhadap data yang tidak logis, inkonsisten, atau bertentangan dengan prinsip nilai dasarmu.`,
            `Secara otomatis mencari esensi terdalam dan makna di balik fenomena fisik yang tampak di permukaan.`
          ]
        },
        kartu_2: {
          judul: 'Praktik Nyata & Interaksi',
          deskripsi: 'Manifestasi proses berpikirmu saat memecahkan tantangan konkret.',
          poin: [
            `Ketika menerima ide baru, kamu biasanya mengambil waktu hening untuk mengintegrasikannya dengan kerangka pengetahuan yang sudah ada.`,
            `Dalam diskusi teknis, kamu gemar memotong alur yang berbelit-belit dan langsung menunjukkan simpul persoalan utama.`,
            `Lebih nyaman menggunakan diagram, metafora terstruktur, atau ringkasan poin kunci saat menjelaskan gagasanmu kepada orang lain.`
          ]
        },
        kartu_3: {
          judul: 'Risiko & Titik Buta (Blind Spots)',
          deskripsi: 'Jebakan pola pikir yang perlu diwaspadai agar tidak menghambat kemajuanmu.',
          poin: [
            `Analysis Paralysis: Terlalu lama menyempurnakan strategi di kepala sehingga menunda langkah eksekusi nyata di dunia nyata.`,
            `Mengabaikan fakta empiris kecil di lapangan hanya karena tidak sesuai dengan model teoritis yang telah kamu susun rapi.`,
            `Cenderung berasumsi orang lain langsung paham apa yang ada di kepalamu tanpa penjelasan konteks pengantar yang cukup.`,
            `Cepat merasa frustrasi ketika harus mengulang penjelasan hal-hal mendasar kepada orang yang ritme berpikirnya berbeda.`
          ]
        },
        kartu_4: {
          judul: 'Langkah Konkret 4 Tahap & Kebiasaan Terukur',
          deskripsi: 'Protokol optimasi fungsi kognitif agar pikiran tetap tajam dan seimbang.',
          tahapan: [
            { tahap: 1, nama: 'Tuliskan Alur Pikir', aksi: 'Gunakan catatan coretan tangan untuk memetakan benang merah ide sebelum menyimpulkannya secara final.' },
            { tahap: 2, nama: 'Cek Fakta Tanah', aksi: 'Validasi ide brilianmu dengan mengecek 2 data lapangan atau berbicara dengan orang yang mengeksekusinya.' },
            { tahap: 3, nama: 'Beri Konteks Awal', aksi: 'Saat berbicara di forum, selalu awali dengan 1 kalimat "mengapa topik ini penting" bagi lawan bicaramu.' },
            { tahap: 4, nama: 'Tetapkan Batas Rencana', aksi: 'Batasi fase perencanaan maksimal 48 jam sebelum meluncurkan prototipe tindakan pertama.' }
          ],
          checklist_harian: [
            'Menuliskan 1 insight penting yang kamu dapatkan hari ini di jurnal singkat.',
            'Meminta klarifikasi secara netral ketika ada sudut pandang yang tampak berlawanan.',
            'Memberi jeda 10 detik sebelum merespons argumen yang terkesan kurang runtut.'
          ]
        }
      };

    case '06': // Emosi, stres, dan pemulihan
      return {
        nomor: 6,
        kode_bab: '06',
        judul: 'Emosi, stres, dan pemulihan',
        ringkasan_eksekutif: `Setiap kepribadian memiliki "zona aman" dan "zona darurat" saat tekanan hidup memuncak. Bagi tipe ${type}, stres berat sering kali memicu fenomena yang oleh Carl Jung disebut sebagai lonjakan fungsi inferior (${meta.cognitiveFunctions.inferior}). Mengetahui sinyal awal kelelahan emosionalmu adalah anugerah terbesar agar kamu bisa merawat dirimu dengan penuh welas asih tanpa rasa bersalah.`,
        kartu_1: {
          judul: 'Karakteristik & Pola Alami',
          deskripsi: 'Resonansi emosional dan dinamika respons batinmu terhadap tekanan.',
          poin: [
            `Kamu terbiasa mengelola emosi secara privat dan lebih nyaman memproses perasaan setelah suasana tenang kembali.`,
            `Stres kronis biasanya dipicu oleh hilangnya kendali atas masa depan, lingkungan yang berisik/kacau, atau pelanggaran integritas.`,
            `Saat baterai energimu menipis, mekanisme pertahanan alamiahmu adalah menarik diri ke dalam gua sunyi (retreat mode).`
          ]
        },
        kartu_2: {
          judul: 'Praktik Nyata & Interaksi',
          deskripsi: 'Gejala perilaku nyata yang terlihat saat kamu mulai kewalahan.',
          poin: [
            `Mulai menjadi sangat reaktif terhadap detail kecil yang biasanya tidak kamu pedulikan (misal: kebisingan, tata letak barang).`,
            `Menurunnya toleransi terhadap obrolan basa-basi dan dorongan kuat untuk membatalkan rencana sosial mendadak.`,
            `Muncul dorongan impulsif atau sebaliknya, rasa kebas emosional yang membuatmu sulit merasakan antusiasme seperti biasanya.`
          ]
        },
        kartu_3: {
          judul: 'Risiko & Titik Buta (Blind Spots)',
          deskripsi: 'Pola destruktif saat stres yang berpotensi melukai diri sendiri atau orang sekitar.',
          poin: [
            `Mengabaikan sinyal fisik tubuh (seperti pundak kaku, pola makan berantakan, kurang tidur) demi menuntaskan target mental.`,
            `Mengisolasi diri secara ekstrem hingga menolak uluran tangan bantuan dari orang-orang yang tulus menyayangimu.`,
            `Kecenderungan bersikap sinis atau melontarkan kritik pedas secara spontan saat kesabaranmu habis terkuras.`,
            `Merasa bersalah ketika mengambil waktu istirahat karena menganggap istirahat sebagai bentuk ketidaproduktifan.`
          ]
        },
        kartu_4: {
          judul: 'Langkah Konkret 4 Tahap & Kebiasaan Terukur',
          deskripsi: 'Protokol pemulihan bertahap untuk menstabilkan sistem saraf dan batinmu.',
          tahapan: [
            { tahap: 1, nama: 'Deteksi Sinyal Tubuh', aksi: 'Kala merasa penat, letakkan tangan di dada dan bernapas perlahan selama 3 menit untuk grounding.' },
            { tahap: 2, nama: 'Deklarasikan Batas', aksi: 'Kirim pesan santun: "Energi saya sedang rendah hari ini, saya akan kabari lagi besok setelah istirahat."' },
            { tahap: 3, nama: 'Aktivitas Sensorik Santai', aksi: 'Lakukan kontak fisik dengan alam: berjalan kaki di taman, mandi air hangat, atau mendengarkan musik instrumental.' },
            { tahap: 4, nama: 'Refleksi Tanpa Menghakimi', aksi: 'Tuliskan apa pemicu utama stres tanpa menyalahkan diri sendiri, lalu pilih 1 beban yang bisa didelegasikan.' }
          ],
          checklist_harian: [
            'Tidur cukup minimal 7 jam tanpa menatap layar 30 menit sebelum terlelap.',
            'Minum air putih hangat di pagi hari sambil merasakan ketenangan tubuh.',
            'Memberi izin pada diri sendiri untuk tidak harus selalu memiliki jawaban atas segala hal.'
          ]
        }
      };

    case '10': // Hubungan romantis
      return {
        nomor: 10,
        kode_bab: '10',
        judul: 'Hubungan romantis',
        ringkasan_eksekutif: `Dalam ranah asmara, kamu tidak mencari sekadar teman pengisi waktu luang; kamu mendambakan koneksi belahan jiwa yang berakar pada keterbukaan intelektual dan kesetiaan batin. Bagi tipe ${type}, cinta adalah komitmen suci untuk saling bertumbuh bersama. Memahami bahasa cintamu akan membantu pasanganmu merasa dicintai seutuhnya tanpa merasa terintimidasi oleh duniamu yang dalam.`,
        kartu_1: {
          judul: 'Karakteristik & Pola Alami',
          deskripsi: 'Ekspektasi batin dan cara kamu mendefinisikan kedekatan romantis.',
          poin: [
            `Memiliki standar relasi yang dalam; kamu membutuhkan pasangan yang bisa diajak berdiskusi tentang esensi hidup dan mimpi jangka panjang.`,
            `Menunjukkan kasih sayang bukan lewat rayuan gombal, melainkan melalui tindakan nyata, kesetiaan kokoh, dan dedikasi waktu berkualitas.`,
            `Sangat menghargai ruang kebebasan pribadi (personal space) di dalam komitmen saling percaya yang matang.`
          ]
        },
        kartu_2: {
          judul: 'Praktik Nyata & Interaksi',
          deskripsi: 'Bagaimana cintamu diungkapkan dalam keseharian bersama pasangan.',
          poin: [
            `Kamu suka membantu pasangan memecahkan masalah pelik dalam karier atau kehidupannya dengan memberikan analisis yang suportif.`,
            `Cenderung mengingat preferensi khusus pasangan dan memperhatikannya secara diam-diam tanpa perlu pengakuan berlebihan.`,
            `Ketika pasangan sedang terluka, kamu secara instingtif berusaha mencari jalan keluar praktis agar penderitaannya segera berakhir.`
          ]
        },
        kartu_3: {
          judul: 'Risiko & Titik Buta (Blind Spots)',
          deskripsi: 'Pola interaksi romantis yang kerap memicu salah paham dari pasangan.',
          poin: [
            `Terlalu cepat memberikan solusi logika saat pasangan sebenarnya hanya membutuhkan pelukan hangat dan ruang untuk didengarkan.`,
            `Menyimpan ekspektasi di dalam kepala tanpa menyampaikannya secara gamblang, lalu merasa kecewa saat pasangan tidak memahaminya.`,
            `Kekakuan dalam merespons kejutan spontan atau perubahan agenda kencan yang tidak sesuai dengan rencana semula.`,
            `Kesulitan mengartikulasikan perasaan cinta secara verbal karena menganggap tindakanmu sudah cukup menjadi bukti.`
          ]
        },
        kartu_4: {
          judul: 'Langkah Konkret 4 Tahap & Kebiasaan Terukur',
          deskripsi: 'Langkah penguatan keintiman emosional yang membuat hubungan makin mekar.',
          tahapan: [
            { tahap: 1, nama: 'Tanyakan Kebutuhan Pasangan', aksi: 'Saat pasangan curhat, tanyakan terlebih dahulu: "Kamu ingin aku dengarkan saja atau bantu cari jalan keluar?"' },
            { tahap: 2, nama: 'Ungkapkan Afeksi Terbuka', aksi: 'Kirimkan pesan apresiasi sederhana setiap hari: "Terima kasih sudah menemaniku hari ini, aku sangat bersyukur memilikimu."' },
            { tahap: 3, nama: 'Jadwalkan Kencan Berkualitas', aksi: 'Sediakan 1 waktu kencan eksklusif tiap pekan tanpa gangguan gawai untuk saling memperbarui kabar hati.' },
            { tahap: 4, nama: 'Bicarakan Peta Masa Depan', aksi: 'Bahas impian bersama 1 tahun ke depan secara santai dengan secangkir teh hangat di akhir pekan.' }
          ],
          checklist_harian: [
            'Memeluk pasangan dengan penuh kehadiran minimal 20 detik setiap hari.',
            'Mendengarkan cerita pasangan dengan tatapan mata hangat tanpa memotong obrolan.',
            'Mengucapkan terima kasih atas hal-hal kecil yang pasangan lakukan untukmu.'
          ]
        }
      };

    case '11': // Compatibility Matrix
      return {
        nomor: 11,
        kode_bab: '11',
        judul: 'Compatibility Matrix',
        ringkasan_eksekutif: `Peta kompatibilitas ini menguraikan kimia hubungan antara tipe ${type} dengan arketipe kepribadian lainnya. Di dunia nyata, tidak ada relasi yang mustahil; yang ada adalah relasi yang membutuhkan lebih banyak penerjemahan empati. Pasangan yang saling melengkapi akan menjadi sayap pertumbuhanmu, sementara pasangan yang berbeda kutub akan menjadi guru kesabaran terbesarmu.`,
        kartu_1: {
          judul: 'Karakteristik & Pola Alami',
          deskripsi: 'Dinamika interaksi alamiah tipemu dengan spektrum kepribadian lain.',
          poin: [
            `Kamu memiliki harmoni intuitif instan dengan tipe visioner seperti ${meta.bestMatches.join(', ')} karena kesamaan frekuensi abstrak.`,
            `Mendapatkan stabilitas nyata saat berdampingan dengan tipe praktis yang mampu melengkapi kebutuhan operasional harian.`,
            `Menyukai pasangan yang mandiri secara intelektual, memiliki prinsip hidup yang kuat, dan tidak bergantung secara posesif.`
          ]
        },
        kartu_2: {
          judul: 'Praktik Nyata & Interaksi',
          deskripsi: 'Bagaimana sinergi dan dinamika percakapan terjalin antar tipe.',
          poin: [
            `Dengan sesama Analis: Diskusi berjalan tajam, seru, penuh debat ide yang memperkaya tanpa melibatkan rasa tersinggung.`,
            `Dengan kaum Diplomat: Hubungan terasa hangat dan bermakna; mereka membantumu terhubung dengan kelembutan rasa batin.`,
            `Dengan kaum Pengawal & Penjelajah: Kamu belajar menghargai keindahan momen nyata, spontanitas, dan ketertiban praktis.`
          ]
        },
        kartu_3: {
          judul: 'Risiko & Titik Buta (Blind Spots)',
          deskripsi: 'Area friksi yang kerap muncul akibat perbedaan bahasa psikologis.',
          poin: [
            `Meremehkan tipe yang mengedepankan emosi subjektif sebagai "tidak rasional", sehingga menutup pintu empati mendalam.`,
            `Salah paham dalam mengartikan keheningan: pasangan ekstrover menganggapmu marah, padahal kamu hanya sedang kehabisan baterai.`,
            `Terjebak dalam perebutan "siapa yang paling benar" saat terjadi silang pendapat mengenai keputusan praktis rumah tangga.`,
            `Menolak gaya hidup pasangan yang lebih santai atau spontan hanya karena tidak masuk dalam daftar rencanamu.`
          ]
        },
        kartu_4: {
          judul: 'Langkah Konkret 4 Tahap & Kebiasaan Terukur',
          deskripsi: 'Formula 4 tahap membangun jembatan harmoni dengan tipe pasangan manapun.',
          tahapan: [
            { tahap: 1, nama: 'Petakan Tipe Pasangan', aksi: 'Identifikasi 4 fungsi dominan pasanganmu dan hargai cara uniknya memproses dunia luar.' },
            { tahap: 2, nama: 'Gunakan Bahasa Cintanya', aksi: 'Jika pasanganmu tipe Feeling, dahulukan pengakuan emosional; jika tipe Sensing, perhatikan detail kenyamanannya.' },
            { tahap: 3, nama: 'Bangun Kode Sandi Baterai', aksi: 'Sepakati sinyal santai saat baterai energimu mulai kuning agar pasangan tidak merasa diabaikan.' },
            { tahap: 4, nama: 'Latihan Kompromi Mingguan', aksi: 'Pilih satu agenda yang sepenuhnya mengikuti selera pasangan secara tulus tanpa intervensi.' }
          ],
          checklist_harian: [
            'Mengakui kelebihan pasangan yang berbeda dari caramu menyelesaikan sesuatu.',
            'Menghindari nada menggurui saat pasangan sedang menceritakan kesulitannya.',
            'Menciptakan ruang tawa bersama dengan hal-hal jenaka yang santai.'
          ]
        }
      };

    case '16': // Karier dan pekerjaan
      return {
        nomor: 16,
        kode_bab: '16',
        judul: 'Karier dan pekerjaan',
        ringkasan_eksekutif: `Bagi ${meta.name} (${type}), pekerjaan bukan sekadar sarana mencari nafkah, melainkan kanvas untuk mewujudkan kompetensi, integritas, dan dampak nyata. Kamu berkembang paling pesat di lingkungan yang menghargai otonomi, meritokrasi, dan inovasi strategis. Saat kamu berada di posisi yang tepat, kemampuanmu menyederhanakan kompleksitas akan menjadi aset kepemimpinan yang luar biasa.`,
        kartu_1: {
          judul: 'Karakteristik & Pola Alami',
          deskripsi: 'Kekuatan profesional bawaan dan lingkungan kerja yang menghidupkanmu.',
          poin: [
            `Memiliki standar kualitas kerja yang sangat tinggi dan tidak puas dengan hasil kerja yang asal selesai.`,
            `Berkembang pesat saat diberi kebebasan menentukan metodologi kerja sendiri tanpa micromanagement yang mengekang.`,
            `Unggul dalam peran yang menuntut arsitektur sistem, perencanaan jangka panjang, riset mendalam, atau transformasi organisasi.`
          ]
        },
        kartu_2: {
          judul: 'Praktik Nyata & Interaksi',
          deskripsi: 'Etos kerja harian dan cara kamu menyelesaikan tanggung jawab profesional.',
          poin: [
            `Kamu menyelesaikan tugas penting secara terfokus (deep work) dengan efisiensi tinggi saat tidak diganggu rapat mendadak.`,
            `Mampu melihat lubang kegagalan proyek jauh sebelum masalah tersebut disadari oleh anggota tim lainnya.`,
            `Menyukai laporan yang berbasis data konkret, indikator terukur, dan proyeksi dampak yang jelas.`
          ]
        },
        kartu_3: {
          judul: 'Risiko & Titik Buta (Blind Spots)',
          deskripsi: 'Kecenderungan karier yang dapat menghambat pertumbuhan profesional jangka panjang.',
          poin: [
            `Cenderung enggan mendelegasikan tugas penting karena khawatir orang lain tidak mampu memenuhi standarmu yang sempurna.`,
            `Mengabaikan politik kantor dan diplomasi relasi, menganggap bahwa "kerja bagus akan berbicara sendiri tanpa perlu networking".`,
            `Mudah merasa jenuh atau demotivasi ketika pekerjaan terjebak pada rutinitas administratif berulang tanpa tantangan inovasi.`,
            `Menyampaikan masukan kritis secara terlalu tajam di depan forum tanpa mempertimbangkan kepekaan ego rekan kerja.`
          ]
        },
        kartu_4: {
          judul: 'Langkah Konkret 4 Tahap & Kebiasaan Terukur',
          deskripsi: 'Roadmap pengembangan karier agar keahlianmu berdampak maksimal.',
          tahapan: [
            { tahap: 1, nama: 'Audit Zona Jenius', aksi: 'Petakan 20% aktivitas kerjamu yang menghasilkan 80% dampak terbesar dan alokasikan waktu terbanyak untuk itu.' },
            { tahap: 2, nama: 'Latih Delegasi Bertahap', aksi: 'Serahkan 1 tugas mingguan kepada rekan kerja dengan instruksi hasil akhir yang jelas tanpa mendikte teknisnya.' },
            { tahap: 3, nama: 'Investasi Relasi Strategis', aksi: 'Jadwalkan makan siang atau kopi santai dengan 1 pemangku kepentingan kunci setiap bulan untuk membangun trust.' },
            { tahap: 4, nama: 'Bungkus Ide dengan Empati', aksi: 'Sebelum mempresentasikan gagasan perubahan, antisipasi kekhawatiran tim dan tawarkan transisi yang ramah.' }
          ],
          checklist_harian: [
            'Menyelesaikan tugas dengan prioritas tertinggi di pagi hari saat fokus mental masih prima.',
            'Memberikan pujian tulus atas kontribusi rekan kerja yang membantu kelancaran proyek.',
            'Menolak secara elegan permintaan tugas tambahan yang tidak sejalan dengan prioritas utama.'
          ]
        }
      };

    case '22': // Rencana aksi 30 hari
      return {
        nomor: 22,
        kode_bab: '22',
        judul: 'Rencana aksi 30 hari',
        ringkasan_eksekutif: `Wawasan tanpa tindakan hanyalah ilusi pemahaman. Bab penutup ini dirancang sebagai jembatan dari kesadaran psikologis menuju transformasi hidup yang nyata, terukur, dan penuh kasih sayang pada dirimu. Selama 30 hari ke depan, kamu diajak melangkah secara bertahap: merapikan fondasi batin, mengasah pola komunikasi, mengeksekusi visi karier, dan merayakan evolusi dirimu sebagai manusia seutuhnya.`,
        kartu_1: {
          judul: 'Karakteristik & Pola Alami',
          deskripsi: 'Dinamika adaptasimu dalam membangun kebiasaan baru.',
          poin: [
            `Kamu merespons paling baik sistem perubahan yang memiliki struktur logis dan indikator keberhasilan yang jelas.`,
            `Perubahan besar tidak dimulai dari gebrakan dramatis sesaat, melainkan ketekunan mikro yang dilakukan secara konsisten setiap hari.`,
            `Kemampuanmu menepati janji pada diri sendiri adalah modal terbesar dalam menyelesaikan program 30 hari ini.`
          ]
        },
        kartu_2: {
          judul: 'Praktik Nyata & Interaksi',
          deskripsi: 'Penerapan rencana transformasi di tengah kesibukan harianmu.',
          poin: [
            `Membagi 30 hari menjadi 4 fase tematik mingguan agar langkahmu terasa ringan dan terarah.`,
            `Mencatat refleksi harian selama 3 menit setiap malam sebelum tidur untuk menjaga akuntabilitas batin.`,
            `Menyertakan orang terdekat sebagai partner akuntabilitas yang memberimu dukungan hangat.`
          ]
        },
        kartu_3: {
          judul: 'Risiko & Titik Buta (Blind Spots)',
          deskripsi: 'Hambatan psikologis yang kerap menggagalkan resolusi baru.',
          poin: [
            `Pola pikir All-or-Nothing: Merasa gagal total hanya karena terlewat 1 hari, lalu menyerah menghentikan seluruh program.`,
            `Menetapkan target awal yang terlalu muluk-muluk sehingga membebani energi sejak pekan pertama.`,
            `Fokus berlebihan pada hasil akhir sehingga lupa mengapresiasi proses ketahanan mental yang sedang kamu bangun.`,
            `Membandingkan kecepatan transformasimu dengan standar orang lain di media sosial.`
          ]
        },
        kartu_4: {
          judul: 'Langkah Konkret 4 Tahap & Kebiasaan Terukur',
          deskripsi: 'Roadmap Transformasi 4 Pekan (Pekan 1 sampai 4).',
          tahapan: [
            { tahap: 1, nama: 'Pekan 1: Fondasi Batin & Energi', aksi: 'Kendalikan ritme tidur, sediakan 20 menit jeda hening harian, dan kenali pemicu stres utama.' },
            { tahap: 2, nama: 'Pekan 2: Kebersihan Relasi & Batas Diri', aksi: 'Latih berkata "tidak" pada hal yang menguras energimu dan ungkapkan afeksi jujur pada orang tercinta.' },
            { tahap: 3, nama: 'Pekan 3: Eksekusi Fokus & Delegasi', aksi: 'Eliminasi 2 distraksi terbesar di meja kerja, selesaikan 1 proyek yang lama tertunda, dan delegasikan 1 tugas.' },
            { tahap: 4, nama: 'Pekan 4: Integrasi & Apresiasi Diri', aksi: 'Tinjau kembali jurnal 30 hari, rayakan lompatan kedewasaanmu, dan formulasikan komitmen tahunan barumu.' }
          ],
          checklist_harian: [
            'Menjalankan 1 komitmen mikro harian sesuai pekan berjalan.',
            'Memberikan senyuman tulus pada diri sendiri di depan cermin setiap pagi.',
            'Mencatat satu hal yang kamu syukuri dari caramu menghadapi hari ini.'
          ]
        }
      };

    default: // Generic bespoke template for any other of the 22 topics
      return {
        nomor: topic.nomor,
        kode_bab: topic.kode,
        judul: topic.judul,
        ringkasan_eksekutif: `Pada bab ${topic.nomor} mengenai "${topic.judul}", kita menelisik bagaimana kepribadianmu sebagai ${meta.name} (${type}) menavigasi dinamika ini. Dengan kombinasi ${meta.cognitiveFunctions.dominan} dan ${meta.cognitiveFunctions.auksilier}, kamu memiliki kekuatan alamiah untuk menemukan kejernihan solusi di mana orang lain mungkin merasa ragu. Mari kita selami karakteristik dasarmu, praktik nyata, titik buta yang perlu dirawat, dan langkah konkret 4 tahap untukmu.`,
        kartu_1: {
          judul: 'Karakteristik & Pola Alami',
          deskripsi: `Kecenderungan alamiah tipe ${type} dalam konteks ${topic.judul.toLowerCase()}.`,
          poin: [
            `Kamu mendekati tema ini dengan pola pikir ${meta.role.toLowerCase()} yang menghargai keaslian niat dan efektivitas langkah nyata.`,
            `Kecenderungan untuk memproses situasi secara mendalam sebelum mengambil sikap yang mantap dan bertanggung jawab.`,
            `Menilai situasi berdasarkan prinsip nilai inti yang tidak mudah goyah oleh desakan atau opini mayoritas sesaat.`
          ]
        },
        kartu_2: {
          judul: 'Praktik Nyata & Interaksi',
          deskripsi: `Bagaimana caramu bertindak dan berinteraksi saat menghadapi dinamika ${topic.judul.toLowerCase()}.`,
          poin: [
            `Cenderung mengambil peran yang tenang namun solutif ketika dinamika kelompok mulai kehilangan arah.`,
            `Menyukai transparansi dan kejujuran komunikatif agar tidak ada energi yang terbuang untuk menduga-duga maksud terselubung.`,
            `Secara konsisten menjaga batas personal yang sehat demi menjaga stabilitas mental dan fokus utamamu.`
          ]
        },
        kartu_3: {
          judul: 'Risiko & Titik Buta (Blind Spots)',
          deskripsi: `Pola lama atau jebakan persepsi yang perlu kamu waspadai dengan bijak.`,
          poin: [
            `Kecenderungan memaksakan standar logika idealmu pada realitas situasi manusiawi yang cair dan penuh kompromi.`,
            `Menahan diri dari keterlibatan aktif karena merasa orang lain tidak mengapresiasi kedalaman sudut pandangmu.`,
            `Mengabaikan nuansa emosional halus yang disampaikan oleh orang lain di sekitarmu melalui bahasa tubuh.`,
            `Menumpuk kekecewaan di dalam hati tanpa mengartikulasikannya hingga akhirnya meledak dalam bentuk ketegasan dingin.`
          ]
        },
        kartu_4: {
          judul: 'Langkah Konkret 4 Tahap & Kebiasaan Terukur',
          deskripsi: `Panduan aksi terstruktur 4 tahap untuk memaksimalkan potensimu di topik ini.`,
          tahapan: [
            { tahap: 1, nama: 'Sadar & Terima Realitas', aksi: 'Akui situasi apa adanya tanpa terburu-buru menghakimi atau menyalahkan diri sendiri.' },
            { tahap: 2, nama: 'Pilahkan Kendali', aksi: 'Pisahkan dengan tegas apa yang berada dalam kendalimu dan apa yang berada di luar kuasamu.' },
            { tahap: 3, nama: 'Komunikasi Terbuka', aksi: 'Diskusikan satu penyesuaian yang kamu perlukan dengan pihak terkait secara tenang dan asertif.' },
            { tahap: 4, nama: 'Tinjau & Apresiasi', aksi: 'Evaluasi hasil langkahmu setiap pekan dan hargai keberanianmu untuk bertumbuh lebih matang.' }
          ],
          checklist_harian: [
            'Menjaga pikiran tetap hadir di saat ini tanpa melompat terlalu jauh ke skenario terburuk.',
            'Memberikan ruang bagi orang lain untuk berproses dengan ritme mereka masing-masing.',
            'Merawat energi diri dengan istirahat yang bermakna di sela-sela aktivitas harian.'
          ]
        }
      };
  }
}

// Generate the compatibility matrix insight between any two MBTI types
export function getCompatibilityInsight(typeA: MBTIType, typeB: MBTIType): CompatibilityInsight {
  const metaA = PERSONALITY_METAS[typeA];
  const metaB = PERSONALITY_METAS[typeB];

  if (typeA === typeB) {
    return {
      tipePasangan: typeB,
      skorKecocokan: 88,
      level: 'Harmoni Tinggi',
      sinergiUtama: `Koneksi cermin yang luar biasa. Kalian berdua langsung memahami kebutuhan ruang hening, alur pikir, dan prinsip hidup tanpa perlu banyak kata.`,
      potensiGesekan: `Kalian memiliki titik buta yang sama (${metaA.cognitiveFunctions.inferior}). Ketika masalah datang di area ini, kalian berdua bisa sama-sama terjebak.`,
      tipsPendekatan: `Secara sadar libatkan perspektif pihak ketiga untuk urusan praktis yang kerap kalian abaikan bersama.`
    };
  }

  const isBest = metaA.bestMatches.includes(typeB);
  const isChallenging = metaA.challengingMatches.includes(typeB);

  if (isBest) {
    return {
      tipePasangan: typeB,
      skorKecocokan: 94,
      level: 'Harmoni Tinggi',
      sinergiUtama: `Dinamika "Golden Pair". Perbedaan kalian adalah magnet saling melengkapi: ${metaA.name} memberikan arah & keteguhan, sementara ${metaB.name} membawa kehangatan & kemungkinan baru.`,
      potensiGesekan: `Perbedaan dalam kecepatan mengambil keputusan atau ritme sosial dapat memicu gesekan jika tidak dikomunikasikan secara transparan.`,
      tipsPendekatan: `Rayakan perbedaan sebagai berkah. Biarkan pasanganmu membantumu keluar dari cangkang kenyamananmu dengan penuh kelembutan.`
    };
  }

  if (isChallenging) {
    return {
      tipePasangan: typeB,
      skorKecocokan: 68,
      level: 'Butuh Penyesuaian',
      sinergiUtama: `Hubungan yang menjadi arena pertumbuhan karakter terbesar. Pasangan ini memiliki fungsi kognitif yang sangat kontras sehingga memperluas cakrawala hidupmu.`,
      potensiGesekan: `Perbedaan mendasar antara fokus gambaran besar (teori/visi) versus realitas konkret di sini dan saat ini (fakta/spontanitas).`,
      tipsPendekatan: `Gunakan bahasa yang menghargai sudut pandangnya. Jangan mendebat siapa yang paling benar, tetapi cari titik temu kompromi praktis yang adil.`
    };
  }

  return {
    tipePasangan: typeB,
    skorKecocokan: 82,
    level: 'Saling Melengkapi',
    sinergiUtama: `Kombinasi yang stabil dan saling memperkaya. Kalian memiliki cukup banyak kesamaan untuk merasa nyaman, sekaligus perbedaan sehat untuk saling belajar.`,
    potensiGesekan: `Kadang terjadi salah tafsir gaya komunikasi antara lugas objektif versus pertimbangan perasaan relasional.`,
    tipsPendekatan: `Latih mendengarkan aktif. Validasi niat baik pasangan sebelum membedah teknis atau solusinya.`
  };
}

export interface CoupleDetailedAnalysis {
  userType: MBTIType;
  partnerName: string;
  partnerType?: MBTIType | 'UNKNOWN';
  relationshipStatus: string;
  dilemma: string;
  harmonyScore: number;
  harmonyLevel: 'Harmoni Sangat Tinggi' | 'Harmoni Tinggi' | 'Saling Melengkapi' | 'Tantangan Bertumbuh';
  dynamicArchetype: string;
  coreSynergy: string;
  blindSpotsAndFriction: string[];
  communicationRules: string[];
  actionSteps: { tahap: number; judul: string; aksi: string }[];
}

export function getCoupleDetailedAnalysis(
  userType: MBTIType,
  partnerName: string,
  partnerType: MBTIType | 'UNKNOWN' = 'UNKNOWN',
  relationshipStatus = 'Pacaran',
  dilemma = 'Gaya komunikasi berbeda'
): CoupleDetailedAnalysis {
  const metaUser = PERSONALITY_METAS[userType];
  const cleanPartnerName = partnerName.trim() || 'Pasanganmu';

  if (partnerType && partnerType !== 'UNKNOWN') {
    const metaPartner = PERSONALITY_METAS[partnerType];
    const insight = getCompatibilityInsight(userType, partnerType);

    const isMirror = userType === partnerType;
    const isComplementary = metaUser.bestMatches.includes(partnerType);
    const isGrowthChallenge = metaUser.challengingMatches.includes(partnerType);

    let archetype = `Sinergi ${metaUser.role} & ${metaPartner.role}`;
    if (isMirror) archetype = `Koneksi Cermin Jiwa (${metaUser.name})`;
    else if (isComplementary) archetype = `Pasangan Emas Komplementer (${userType} & ${partnerType})`;
    else if (isGrowthChallenge) archetype = `Dinamika Pertumbuhan Katalis (${userType} & ${partnerType})`;

    let level: CoupleDetailedAnalysis['harmonyLevel'] = 'Saling Melengkapi';
    if (insight.skorKecocokan >= 90) level = 'Harmoni Sangat Tinggi';
    else if (insight.skorKecocokan >= 80) level = 'Harmoni Tinggi';
    else if (insight.skorKecocokan < 75) level = 'Tantangan Bertumbuh';

    const blindSpots = [
      `Perbedaan ritme memproses emosi: ${userType} (${metaUser.cognitiveFunctions.dominan}) cenderung memproses secara ${userType.startsWith('I') ? 'internal dalam hening' : 'ekspresif terbuka'}, sedangkan ${partnerName} memiliki ritme pemrosesan yang berbeda.`,
      `Potensi benturan saat menghadapi konflik: kecenderungan ${userType.includes('T') ? 'mencari solusi logis cepat' : 'mencari validasi empati rasa'} dapat disalahartikan sebagai pengabaian.`,
      `Ekspektasi tersirat seputar ${relationshipStatus.toLowerCase()}: menuntut pasangan membaca pikiran tanpa mengutarakan kebutuhan batin secara gamblang.`,
      `Tantangan spesifik terkait ${dilemma.toLowerCase()}: kebiasaan reaktif di bawah tekanan stres yang memicu siklus defensif.`
    ];

    const commRules = [
      `Beri jeda hening 10 menit saat tensi meningkat agar fungsi kognitif inferior tidak mengambil alih kendali emosi.`,
      `Gunakan formula kalimat "Aku merasa... saat...", bukan "Kamu selalu membuatku...".`,
      `Luangkan sesi 'Check-in Hati' 15 menit setiap pekan tanpa gangguan gawai untuk menyelaraskan harapan.`,
      `Apresiasi 1 hal kecil yang telah dilakukan ${cleanPartnerName} sebelum mendiskusikan topik evaluasi.`
    ];

    const actionSteps = [
      {
        tahap: 1,
        judul: 'Pahami Peta Batin Pasangan',
        aksi: `Kenali bahwa cara ${cleanPartnerName} (${partnerType}) mencintai diekspresikan lewat ${metaPartner.cognitiveFunctions.dominan}, bukan sekadar kata-kata manis.`
      },
      {
        tahap: 2,
        judul: 'Redakan Titik Pemicu Utama',
        aksi: `Fokus atasi isu "${dilemma}" dengan menetapkan kesepakatan bahwa perbedaan cara pandang adalah aset, bukan ancaman.`
      },
      {
        tahap: 3,
        judul: 'Bangun Ritual Keintiman Aman',
        aksi: `Ciptakan ruang emosional bebas penghakiman di mana ${cleanPartnerName} merasa aman bercerita tanpa langsung dipotong solusi teknis.`
      },
      {
        tahap: 4,
        judul: 'Visi Bersama Jangka Panjang',
        aksi: `Perjelas arah dan komitmen relasi kalian di fase ${relationshipStatus} dengan tujuan terukur yang disepakati berdua.`
      }
    ];

    return {
      userType,
      partnerName: cleanPartnerName,
      partnerType,
      relationshipStatus,
      dilemma,
      harmonyScore: insight.skorKecocokan,
      harmonyLevel: level,
      dynamicArchetype: archetype,
      coreSynergy: `${insight.sinergiUtama} Dalam hubungan ${relationshipStatus}, energi kalian memiliki daya dorong yang kuat jika saling melengkapi.`,
      blindSpotsAndFriction: blindSpots,
      communicationRules: commRules,
      actionSteps
    };
  }

  // Jika partnerType UNKNOWN: Analisis interpersonal mendalam berbasis gaya attachment tipe pengguna
  const baseScore = userType.includes('F') ? 85 : 82;
  return {
    userType,
    partnerName: cleanPartnerName,
    partnerType: 'UNKNOWN',
    relationshipStatus,
    dilemma,
    harmonyScore: baseScore,
    harmonyLevel: 'Harmoni Tinggi',
    dynamicArchetype: `Relasi Berpusat pada Arketipe ${metaUser.name}`,
    coreSynergy: `Sebagai tipe ${userType} (${metaUser.name}), kamu membawa kesetiaan, kedalaman, dan prinsip yang kokoh ke dalam hubungan dengan ${cleanPartnerName}. Kamu mendambakan relasi yang bermakna dan bertumbuh secara otentik.`,
    blindSpotsAndFriction: [
      `Kecenderungan menahan kekecewaan di dalam hati agar tidak merusak keharmonisan, yang sewaktu-waktu bisa berubah menjadi sikap dingin.`,
      `Memasang standar idealisme yang sangat tinggi terhadap ${cleanPartnerName} sehingga rentan merasa lelah emosional saat kenyataan tidak sesuai ekspektasi.`,
      `Kesulitan meminta bantuan secara langsung karena terbiasa mandiri atau merasa harus menjadi penopang pasangan.`,
      `Isu seputar "${dilemma}": siklus salah paham yang berulang karena masing-masing berasumsi tanpa verifikasi langsung.`
    ],
    communicationRules: [
      `Ungkapkan perasaanmu lebih awal sebelum beban emosional menumpuk menjadi kepahitan.`,
      `Ajak ${cleanPartnerName} berdiskusi santai di tempat netral saat sama-sama tidak lelah.`,
      `Gunakan teknik cermin: ulangi apa yang baru saja disampaikan ${cleanPartnerName} untuk memastikan tidak ada miskonsepsi.`,
      `Pisahkan antara 'masalah yang harus diselesaikan' dengan 'emosi yang hanya butuh didengarkan'.`
    ],
    actionSteps: [
      {
        tahap: 1,
        judul: 'Transparansi Kebutuhan Batin',
        aksi: `Bicarakan dengan jujur kepada ${cleanPartnerName} apa yang membuatmu merasa paling dihargai dan aman dalam fase ${relationshipStatus} ini.`
      },
      {
        tahap: 2,
        judul: 'Penyelarasan Ekspektasi',
        aksi: `Bedah bersama dilema "${dilemma}" dengan menanyakan sudut pandang ${cleanPartnerName} tanpa menyela.`
      },
      {
        tahap: 3,
        judul: 'Ajak Pasangan Mengambil Tes',
        aksi: `Sarankan ${cleanPartnerName} untuk juga menyelesaikan asesmen PRISMA-16™ agar matriks kecocokan kognitif kalian dapat dihitung dengan presisi 100%.`
      },
      {
        tahap: 4,
        judul: 'Komitmen Bertumbuh Bersama',
        aksi: `Tetapkan satu kebiasaan sehat mingguan yang memperkuat ikatan batin kalian berdua tanpa distraksi pekerjaan.`
      }
    ]
  };
}
