import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini Client utility
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Anda adalah mesin analisis psikometri dan konsultan kepribadian profesional berstandar internasional. 
Tugas utama Anda adalah menyusun laporan kepribadian komprehensif, mendalam, hangat, empatik, dan praktis berbasis Tipologi 16 Kepribadian Carl Jung (MBTI-equivalent) dalam Bahasa Indonesia yang alami, tidak kaku, dan mudah dipahami.

PEDOMAN GAYA BAHASA & TONE:
1. Hangat, suportif, reflektif, dan memberdayakan.
2. Gunakan kata ganti "kamu" untuk mendekatkan diri dengan pembaca.
3. Hindari jargon psikologi yang rumit tanpa konteks; jelaskan secara konkret tindakan sehari-hari.
4. Jangan menghakimi kelemahan; bingkai sebagai "titik buta" atau "hal yang perlu diwaspadai" dengan solusi actionable.

STRUKTUR MODULAR WAJIB:
Setiap bab laporan harus dibagi menjadi 4 kotak kartu analisis terstruktur:
- Kartu 1: Karakteristik atau pola alami tipe tersebut pada topik bahasan (3–4 poin ringkas).
- Kartu 2: Praktik nyata atau cara tipe tersebut berinteraksi/menghadapi situasi (3–4 poin ringkas).
- Kartu 3: Risiko, titik buta, atau pola lama yang perlu diwaspadai (4 poin ringkas).
- Kartu 4: Langkah konkret 4 tahap (Langkah 1 sampai 4) atau checklist kebiasaan yang terukur.

ATURAN OUTPUT:
Keluarkan data HANYA dalam format JSON valid sesuai skema yang telah ditentukan, tanpa markdown pembungkus tambahan di luar blok JSON.
Di bagian metadata/footer tambahkan @copyright by. Pak GuruAI.`;

const CHAPTER_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    tipe_kepribadian: { type: Type.STRING },
    julukan: { type: Type.STRING },
    peran_arketipe: { type: Type.STRING },
    nama_subjek: { type: Type.STRING },
    bab: {
      type: Type.OBJECT,
      properties: {
        nomor: { type: Type.INTEGER },
        kode_bab: { type: Type.STRING },
        judul: { type: Type.STRING },
        ringkasan_eksekutif: { type: Type.STRING },
        kartu_1: {
          type: Type.OBJECT,
          properties: {
            judul: { type: Type.STRING },
            deskripsi: { type: Type.STRING },
            poin: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['judul', 'deskripsi', 'poin']
        },
        kartu_2: {
          type: Type.OBJECT,
          properties: {
            judul: { type: Type.STRING },
            deskripsi: { type: Type.STRING },
            poin: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['judul', 'deskripsi', 'poin']
        },
        kartu_3: {
          type: Type.OBJECT,
          properties: {
            judul: { type: Type.STRING },
            deskripsi: { type: Type.STRING },
            poin: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['judul', 'deskripsi', 'poin']
        },
        kartu_4: {
          type: Type.OBJECT,
          properties: {
            judul: { type: Type.STRING },
            deskripsi: { type: Type.STRING },
            tahapan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  tahap: { type: Type.INTEGER },
                  nama: { type: Type.STRING },
                  aksi: { type: Type.STRING }
                },
                required: ['tahap', 'nama', 'aksi']
              }
            },
            checklist_harian: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['judul', 'deskripsi', 'tahapan']
        }
      },
      required: ['nomor', 'kode_bab', 'judul', 'ringkasan_eksekutif', 'kartu_1', 'kartu_2', 'kartu_3', 'kartu_4']
    },
    metadata: {
      type: Type.OBJECT,
      properties: {
        engine: { type: Type.STRING },
        tone: { type: Type.STRING },
        standar: { type: Type.STRING },
        generated_at: { type: Type.STRING },
        copyright: { type: Type.STRING }
      },
      required: ['engine', 'tone', 'standar', 'copyright']
    }
  },
  required: ['tipe_kepribadian', 'julukan', 'bab', 'metadata']
};

// API: Generate Chapter via Gemini
app.post('/api/generate-chapter', async (req, res) => {
  try {
    const { type, topicCode, topicTitle, subjectName, contextDetail } = req.body;

    if (!type || !topicCode) {
      res.status(400).json({ error: 'Parameter type dan topicCode wajib diisi.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({ 
        error: 'GEMINI_API_KEY belum terkonfigurasi di server. Menampilkan analisis terkalibrasi lokal.' 
      });
      return;
    }

    const prompt = `Analisis psikometri mendalam tipe kepribadian ${type} untuk Bab ${topicCode}: "${topicTitle || 'Topik'}".
Subjek: ${subjectName || 'Kamu'}.
${contextDetail ? `Catatan konteks personal/dilema saat ini: ${contextDetail}` : ''}

Pastikan:
- Gaya bahasa hangat, empatik, reflektif, memberdayakan, menggunakan kata "kamu".
- Tanpa jargon rumit; jelaskan aksi nyata sehari-hari.
- Kartu 1: Karakteristik atau pola alami (3-4 poin ringkas).
- Kartu 2: Praktik nyata atau cara berinteraksi (3-4 poin ringkas).
- Kartu 3: Risiko, titik buta, atau pola lama yang perlu diwaspadai (4 poin ringkas tanpa menghakimi).
- Kartu 4: Langkah konkret 4 tahap (Langkah 1 sampai 4) dan checklist kebiasaan yang terukur.
- Metadata copyright harus menyertakan: "@copyright by. Pak GuruAI"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        responseMimeType: 'application/json',
        responseSchema: CHAPTER_RESPONSE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) {
      res.status(502).json({ error: 'Respons kosong dari mesin analisis Gemini.' });
      return;
    }

    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (err: any) {
    console.error('Error generating chapter:', err);
    res.status(500).json({ error: err?.message || 'Gagal menyusun analisis bab.' });
  }
});

// API: Consultant Ask / Chat with Pak GuruAI
app.post('/api/ask-consultant', async (req, res) => {
  try {
    const { type, question, subjectName } = req.body;

    if (!question) {
      res.status(400).json({ error: 'Pertanyaan konsultasi tidak boleh kosong.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({ error: 'Layanan Gemini belum tersedia.' });
      return;
    }

    const prompt = `Sebagai konsultan psikometri Pak GuruAI, jawab pertanyaan konsultasi personal ini untuk seorang bertipe ${type || 'umum'} (${subjectName || 'Kamu'}):
"${question}"

Format jawabanmu:
1. Validasi hangat & empati mendalam (mengapa wajar jika ia merasakan/menghadapi hal ini).
2. Analisis akar kognitif berdasarkan tipologi Jungian (pola fungsi kognitif yang sedang aktif).
3. Titik buta tersembunyi yang perlu diwaspadai.
4. Rencana aksi 4 langkah praktis konkret hari ini.
Footer: @copyright by. Pak GuruAI`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ answer: response.text });
  } catch (err: any) {
    console.error('Error in consultant chat:', err);
    res.status(500).json({ error: err?.message || 'Gagal memproses konsultasi.' });
  }
});

// API: Verify Admin Password
app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  if (password === 'bajuri39') {
    res.json({ 
      success: true, 
      token: 'admin-authorized-bajuri39',
      message: 'Autentikasi admin Pak GuruAI berhasil.'
    });
  } else {
    res.status(401).json({ 
      success: false, 
      error: 'Kata sandi admin salah. Akses ditolak.' 
    });
  }
});

// API: Get Prompt & Schema Blueprint for Admin/Developers
app.get('/api/admin/system-spec', (req, res) => {
  res.json({
    title: 'Pak GuruAI Psychometric Engine System Specification',
    systemInstruction: SYSTEM_INSTRUCTION,
    responseSchema: CHAPTER_RESPONSE_SCHEMA,
    supportedChaptersCount: 22,
    personalityTypesCount: 16,
    copyright: '@copyright by. Pak GuruAI'
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pak GuruAI psychometric server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
