export type MBTIType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type ArchetypeRole = 'Analis' | 'Diplomat' | 'Pengawal' | 'Penjelajah';

export interface Card1Data {
  judul: string;
  deskripsi: string;
  poin: string[]; // 3-4 poin ringkas
}

export interface Card2Data {
  judul: string;
  deskripsi: string;
  poin: string[]; // 3-4 poin ringkas
}

export interface Card3Data {
  judul: string;
  deskripsi: string;
  poin: string[]; // 4 poin ringkas titik buta
}

export interface ActionStep {
  tahap: number;
  nama: string;
  aksi: string;
}

export interface Card4Data {
  judul: string;
  deskripsi: string;
  tahapan: ActionStep[]; // 4 tahap terukur
  checklist_harian?: string[];
}

export interface ChapterReport {
  nomor: number;
  kode_bab: string; // "01" sampai "22"
  judul: string;
  ringkasan_eksekutif: string;
  kartu_1: Card1Data;
  kartu_2: Card2Data;
  kartu_3: Card3Data;
  kartu_4: Card4Data;
}

export interface PersonalityReportJSON {
  tipe_kepribadian: MBTIType;
  julukan: string;
  peran_arketipe: ArchetypeRole;
  nama_subjek?: string;
  dimensi?: {
    ei: { introversion: number; extraversion: number };
    sn: { intuition: number; sensing: number };
    tf: { thinking: number; feeling: number };
    jp: { judging: number; perceiving: number };
  };
  bab: ChapterReport;
  metadata: {
    engine: string;
    tone: string;
    standar: string;
    generated_at: string;
    copyright: string;
  };
}

export interface FullPersonalityDossierJSON {
  tipe_kepribadian: MBTIType;
  julukan: string;
  peran_arketipe: ArchetypeRole;
  deskripsi_singkat: string;
  fungsi_kognitif: {
    dominan: string;
    auksilier: string;
    tersier: string;
    inferior: string;
  };
  daftar_bab: ChapterReport[];
  metadata: {
    engine: string;
    standar: string;
    copyright: string;
    generated_at: string;
  };
}

export interface TopicInfo {
  kode: string;
  nomor: number;
  judul: string;
  kategori: 'Fondasi' | 'Psikologi & Keseharian' | 'Relasi & Cinta' | 'Karier & Kepemimpinan' | 'Pertumbuhan Diri';
  ikon: string;
  deskripsi_singkat: string;
}

export interface AssessmentQuestion {
  id: number;
  pertanyaan: string;
  opsiA: { teks: string; dimensi: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'; bobot: number };
  opsiB: { teks: string; dimensi: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'; bobot: number };
  dimensiTipe: 'EI' | 'SN' | 'TF' | 'JP';
}

export interface CompatibilityInsight {
  tipePasangan: MBTIType;
  skorKecocokan: number; // 0 - 100
  level: 'Harmoni Tinggi' | 'Saling Melengkapi' | 'Tantangan Dinamis' | 'Butuh Penyesuaian';
  sinergiUtama: string;
  potensiGesekan: string;
  tipsPendekatan: string;
}

export interface PartnerDetails {
  partnerName: string;
  partnerBirthDate?: string;
  partnerType?: MBTIType | 'UNKNOWN';
  relationshipStatus?: 'Pacaran' | 'Tunangan' | 'Menikah' | 'Menuju Pernikahan' | 'Teman Dekat';
  dilemma?: string;
}

export interface RegistrationFormData {
  fullName: string;
  birthDate: string;
  phone: string;
  testMode: 'individual' | 'couple';
  partnerData?: PartnerDetails;
}

