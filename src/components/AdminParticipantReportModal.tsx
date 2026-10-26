import React, { useState, useMemo } from 'react';
import { ParticipantRecord, updateParticipantStatus } from '../services/participantService';
import { PERSONALITY_METAS, generateBaselineChapter, getCoupleDetailedAnalysis } from '../data/personalityProfiles';
import { TOPICS_LIST } from '../data/topics';
import { PsychometricCharts } from './PsychometricCharts';
import { ModularCards } from './ModularCards';
import { 
  X, Printer, MessageCircle, CheckCircle2, 
  Calendar, Phone, Sparkles, BookOpen, Layers,
  Heart, ShieldAlert, Compass, Check, ArrowRight,
  ListChecks, Activity, AlertTriangle, FileText,
  BadgeCheck, Bookmark, ExternalLink
} from 'lucide-react';

interface AdminParticipantReportModalProps {
  participant: ParticipantRecord | null;
  onClose: () => void;
  onStatusUpdated: (id: string, newStatus: 'sent' | 'pending') => void;
}

export const AdminParticipantReportModal: React.FC<AdminParticipantReportModalProps> = ({
  participant,
  onClose,
  onStatusUpdated
}) => {
  const [selectedTopicCode, setSelectedTopicCode] = useState('01');
  const [isUpdating, setIsUpdating] = useState(false);
  const [viewMode, setViewMode] = useState<'all' | 'single'>('all');
  const [showPrintTip, setShowPrintTip] = useState(false);

  // Hasilkan ke-22 bab lengkap sekaligus secara presisi
  const allChapters = useMemo(() => {
    if (!participant) return [];
    return TOPICS_LIST.map((topic) =>
      generateBaselineChapter(participant.mbtiType, topic.kode, participant.fullName)
    );
  }, [participant]);

  // Bab aktif untuk mode tinjau tunggal
  const activeSingleChapter = useMemo(() => {
    if (!allChapters.length) return null;
    return allChapters.find((c) => c.kode_bab === selectedTopicCode) || allChapters[0];
  }, [allChapters, selectedTopicCode]);

  if (!participant) return null;

  const isCouple = participant.testMode === 'couple' && !!participant.partnerData;
  const meta = PERSONALITY_METAS[participant.mbtiType];

  // Analisis pasangan jika asesmen relasi
  const coupleAnalysis = isCouple ? getCoupleDetailedAnalysis(
    participant.mbtiType,
    participant.partnerData!.partnerName,
    participant.partnerData!.partnerType,
    participant.partnerData!.relationshipStatus,
    participant.partnerData!.dilemma
  ) : null;

  // Format nomor WhatsApp peserta
  const cleanPhone = participant.phone.replace(/[^0-9]/g, '');
  const waTarget = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

  // Template pesan WhatsApp resmi pengiriman dokumen 22 bab PDF
  const waMessage = isCouple ? encodeURIComponent(
    `Halo Kak *${participant.fullName}*,\n\nTerima kasih telah mengikuti Asesmen Psikometri Carl Jung 16 Tipe bersama Pak GuruAI untuk Kakak & Pasangan (*${participant.partnerData?.partnerName}*)!\n\nHasil lengkap psikometri kamu telah kami verifikasi:\n📌 Tipe Kamu: *${participant.mbtiType}* (${meta.name})\n📌 Skor Harmoni Pasangan: *${coupleAnalysis?.harmonyScore}%* (${coupleAnalysis?.harmonyLevel})\n📌 Arketipe Dinamika: *${coupleAnalysis?.dynamicArchetype}*\n📌 Status Relasi: *${participant.partnerData?.relationshipStatus}*\n\n📌 *Sinergi Utama:*\n${coupleAnalysis?.coreSynergy}\n\nKami lampirkan berkas resmi *Laporan Psikometri Komprehensif 22 Bab (PDF)* berisi peta potensi kognitif, modul pasangan terpadu, hingga rencana aksi 30 hari dalam pesan ini.\n\n@copyright by. Pak GuruAI`
  ) : encodeURIComponent(
    `Halo Kak *${participant.fullName}*,\n\nTerima kasih telah mengikuti Tes Psikometri 16 Tipe Carl Jung bersama Pak GuruAI!\n\nHasil lengkap psikometri kamu telah kami verifikasi:\n📌 Tipe Kepribadian: *${participant.mbtiType}* (${meta.name})\n📌 Peran Arketipe: *${meta.role}*\n📌 *Motto Hidup:*\n${meta.motto}\n\n📌 *Ringkasan Eksekutif:*\n${meta.shortDesc}\n\nKami lampirkan berkas resmi *Laporan Psikometri Komprehensif Lengkap 22 Bab (PDF)* berisi analisis pola berpikir, emosi & stres, gaya kerja & karier, komunikasi, hingga rencana aksi 30 hari dalam pesan ini.\n\n@copyright by. Pak GuruAI`
  );

  const waLink = `https://wa.me/${waTarget}?text=${waMessage}`;

  const handleSendToWhatsApp = async () => {
    setIsUpdating(true);
    await updateParticipantStatus(participant.id, 'sent');
    onStatusUpdated(participant.id, 'sent');
    setIsUpdating(false);
    window.open(waLink, '_blank');
  };

  const handlePrint = () => {
    setShowPrintTip(true);
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const scrollToChapter = (kode: string) => {
    setSelectedTopicCode(kode);
    const element = document.getElementById(`bab-${kode}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 print-modal-overlay">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 text-slate-900 print-modal-container">
        
        {/* Top Header Toolbar (Hidden saat cetak) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 gap-4 no-print shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base font-mono shadow-sm shrink-0">
              {participant.mbtiType}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  Laporan Lengkap 22 Bab: {participant.fullName}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  participant.status === 'sent' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {participant.status === 'sent' ? '✓ Sudah Dikirim via WA' : '⏳ Menunggu Dikirim'}
                </span>
                {isCouple && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                    👥 Mode Pasangan: {participant.partnerData?.partnerName}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Lahir: {participant.birthDate}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> {participant.phone}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-[11px] text-slate-500 font-mono">ID: {participant.id.slice(0, 8)}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* View Mode Switcher */}
            <div className="bg-slate-200/80 p-0.5 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => setViewMode('all')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'all'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📑 Semua 22 Bab
              </button>
              <button
                onClick={() => setViewMode('single')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔍 Per Bab
              </button>
            </div>

            <button
              onClick={handleSendToWhatsApp}
              disabled={isUpdating}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Kirim pesan langsung ke WhatsApp peserta"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Kirim ke WA</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Cetak atau Simpan sebagai PDF dokumen lengkap 22 bab"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF (22 Bab)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tip Banner saat klik print */}
        {showPrintTip && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-900 flex items-center justify-between no-print animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="font-bold">💡 Petunjuk Cetak PDF:</span>
              <span>Pada kotak dialog printer browser yang terbuka, pilih <strong>"Save as PDF" (Simpan sebagai PDF)</strong> untuk mengunduh seluruh 22 bab lengkap dalam satu berkas rapi dan bersih.</span>
            </div>
            <button
              onClick={() => setShowPrintTip(false)}
              className="text-amber-700 hover:text-amber-950 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Quick Chapter Jump Bar (Hanya tampil di screen pada mode all) */}
        {viewMode === 'all' && (
          <div className="bg-slate-100/90 border-b border-slate-200 px-6 py-2 overflow-x-auto no-print flex items-center gap-1.5 shrink-0 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap mr-1 flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" /> Lompat Bab:
            </span>
            {TOPICS_LIST.map((topic) => (
              <button
                key={topic.kode}
                onClick={() => scrollToChapter(topic.kode)}
                className={`px-2 py-0.5 rounded-md font-mono text-[11px] transition shrink-0 cursor-pointer ${
                  selectedTopicCode === topic.kode
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                }`}
                title={`Bab ${topic.kode}: ${topic.judul}`}
              >
                {topic.kode}
              </button>
            ))}
          </div>
        )}

        {/* Modal Scrollable Content (Prints natively across pages) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-50/50 print-modal-scroll">
          
          {/* ============================================================== */}
          {/* COVER & KOP SURAT RESMI (Tampil di layar & Cetak Halaman Utama) */}
          {/* ============================================================== */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden print-clean-box">
            
            {/* Header Dokumen Resmi */}
            <div className="border-b-2 border-slate-900 pb-5 mb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                  <span className="text-xs font-black tracking-widest text-slate-600 uppercase">
                    Pak GuruAI • Lembaga Riset Psikometri & Karakter
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  BERKAS RESMI ANALISIS PSIKOMETRI LENGKAP 22 BAB
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-indigo-700">
                  Pemetaan Komprehensif Arketipe Carl Jung, Dinamika Kognitif & Rekomendasi Terukur
                </p>
              </div>

              <div className="text-center sm:text-right bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0 min-w-[160px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Status Berkas
                </span>
                <span className="text-xs font-black text-emerald-700 flex items-center justify-center sm:justify-end gap-1 mt-0.5">
                  <BadgeCheck className="w-4 h-4" /> TERVERIFIKASI
                </span>
                <span className="text-[10px] text-slate-500 block font-mono mt-0.5">
                  {new Date(participant.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Biodata Peserta & Arketipe */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                    Tipe Kognitif: {participant.mbtiType}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                    Peran: {meta.role}
                  </span>
                  {isCouple && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                      👥 Asesmen Pasangan
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {participant.fullName}
                  </h2>
                  <p className="text-lg font-bold text-indigo-600 mt-0.5">
                    "{meta.name}"
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {meta.motto}
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {meta.shortDesc}
                </p>
              </div>

              {/* Tabel Ringkas Data Administratif */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2 min-w-[220px] shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block border-b border-slate-200 pb-1">
                  Identitas Peserta Terdaftar
                </span>
                <div className="space-y-1.5 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nama Lengkap:</span>
                    <strong className="text-slate-900">{participant.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tanggal Lahir:</span>
                    <span>{participant.birthDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nomor WhatsApp:</span>
                    <span className="font-mono text-emerald-700 font-semibold">{participant.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Mode Asesmen:</span>
                    <span className="font-semibold">{isCouple ? 'Asesmen Pasangan (Relationship)' : 'Asesmen Individu'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* KHUSUS PASANGAN: Modul Analisis Relasi Komprehensif (Jika ada) */}
          {/* ============================================================== */}
          {isCouple && coupleAnalysis && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-xs space-y-6 relative overflow-hidden print-clean-box print-avoid-break">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500 no-print" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
                <div>
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800">
                    Modul Analisis Relasi Pasangan Akurat & Terpercaya
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    <span>Dinamika Hubungan: {participant.fullName} & {coupleAnalysis.partnerName}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Status Relasi: <strong className="text-slate-800">{coupleAnalysis.relationshipStatus}</strong> • Tipe Pasangan: <strong className="text-rose-700">{participant.partnerData?.partnerType || 'Dianalisis Kognitif'}</strong> • Arketipe: <strong className="text-slate-800">{coupleAnalysis.dynamicArchetype}</strong>
                  </p>
                </div>

                <div className="text-center sm:text-right bg-rose-50 p-3.5 rounded-2xl border border-rose-200 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                    Skor Harmoni Kognitif
                  </span>
                  <div className="text-3xl font-black text-rose-600 font-mono">
                    {coupleAnalysis.harmonyScore}%
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {coupleAnalysis.harmonyLevel}
                  </span>
                </div>
              </div>

              {/* Sinergi & Dinamika */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Sinergi Utama & Arketipe Hubungan:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {coupleAnalysis.coreSynergy}
                </p>
              </div>

              {/* 4 Titik Buta / Friction Points */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>4 Titik Rawan & Jebakan Emosional yang Wajib Diwaspadai:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {coupleAnalysis.blindSpotsAndFriction.map((bf, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs text-slate-700 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{bf}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Aturan Komunikasi Sehat */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <span>4 Aturan Komunikasi Terstruktur Pasangan:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {coupleAnalysis.communicationRules.map((rule, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Langkah Aksi Hubungan */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>4 Tahap Tindakan Harmonisasi Relasi Terukur:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {coupleAnalysis.actionSteps.map((step) => (
                    <div key={step.tahap} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-700 block">
                        Tahap {step.tahap}: {step.judul}
                      </span>
                      <p className="text-slate-700 text-[11px] leading-relaxed">
                        {step.aksi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* DIAGRAM & VISUALISASI KOGNITIF (Dicetak di Bagian Awal Dokumen) */}
          {/* ============================================================== */}
          <div className="space-y-4 print-avoid-break">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Peta Arsitektur Kognitif & Skala Dimensi Psikometri</span>
              </h3>
              <span className="text-xs text-slate-400">Kerangka Carl Jung 16 Tipe</span>
            </div>
            <PsychometricCharts type={participant.mbtiType} scores={participant.scores} />
          </div>

          {/* ============================================================== */}
          {/* DAFTAR ISI 22 BAB (Tabel Ringkas Struktur Laporan)             */}
          {/* ============================================================== */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 print-clean-box print-avoid-break">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Daftar Isi Lengkap 22 Bab Analisis Psikometri</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Seluruh 22 bab tersusun dengan format modular 4-kartu terstruktur (Pola Alami, Praktik Nyata, Titik Buta, dan Aksi Terukur).
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                22 Bab Utuh
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
              {TOPICS_LIST.map((topic) => (
                <div
                  key={topic.kode}
                  onClick={() => scrollToChapter(topic.kode)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 transition flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {topic.kode}
                    </span>
                    <span className="font-semibold text-slate-800 truncate">
                      {topic.judul}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {topic.kategori}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* TAMPILAN KONTEN BAB                                            */}
          {/* Jika viewMode === 'all', tampilkan 22 bab berurutan.            */}
          {/* Jika viewMode === 'single', tampilkan selector + 1 bab di layar */}
          {/* DAN tampilkan 22 bab secara khusus saat pencetakan (print)      */}
          {/* ============================================================== */}

          {/* Mode Single Bab (Hanya di layar ketika viewMode === 'single') */}
          {viewMode === 'single' && (
            <div className="space-y-6 pt-4 border-t border-slate-200 no-print">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Mode Tinjau Satuan Bab</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pilih bab di bawah untuk memeriksa 4 kartu analisis terstruktur peserta ini.
                  </p>
                </div>

                <select
                  value={selectedTopicCode}
                  onChange={(e) => setSelectedTopicCode(e.target.value)}
                  className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {TOPICS_LIST.map((topic) => (
                    <option key={topic.kode} value={topic.kode}>
                      Bab {topic.kode}: {topic.judul} ({topic.kategori})
                    </option>
                  ))}
                </select>
              </div>

              {activeSingleChapter && <ModularCards chapter={activeSingleChapter} />}
            </div>
          )}

          {/* Render Seluruh 22 Bab (Tampil di screen jika viewMode === 'all', dan SELALU tampil saat dicetak ke PDF) */}
          <div className={`space-y-12 ${viewMode === 'all' ? 'block' : 'hidden print:block'}`}>
            {allChapters.map((chapter) => {
              const topicMeta = TOPICS_LIST.find((t) => t.kode === chapter.kode_bab);
              return (
                <div
                  key={chapter.kode_bab}
                  id={`bab-${chapter.kode_bab}`}
                  className="space-y-6 pt-6 border-t-2 border-slate-200 print-break-before"
                >
                  {/* Chapter Header Banner */}
                  <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 relative overflow-hidden print-clean-box">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                            Bab {chapter.kode_bab} dari 22
                          </span>
                          <span className="text-xs text-slate-400">
                            Kategori: <strong className="text-slate-300">{topicMeta?.kategori || 'Fondasi'}</strong>
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          Bab {chapter.kode_bab}: {chapter.judul}
                        </h3>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl pt-1">
                          {chapter.ringkasan_eksekutif}
                        </p>
                      </div>

                      <div className="text-right shrink-0 hidden sm:block">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                          Peserta
                        </span>
                        <span className="text-xs font-bold text-indigo-300">
                          {participant.fullName} ({participant.mbtiType})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Kotak Kartu Analisis Terstruktur */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* KARTU 1: Pola Alami */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 print-avoid-break print-clean-box">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                          <Compass className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">
                            KARTU 1 • POLA ALAMI
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                            {chapter.kartu_1.judul}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {chapter.kartu_1.deskripsi}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        {chapter.kartu_1.poin.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-indigo-50/40 rounded-xl p-2.5 border border-indigo-100/40 text-xs text-slate-700">
                            <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* KARTU 2: Praktik Nyata */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 print-avoid-break print-clean-box">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
                            KARTU 2 • PRAKTIK NYATA
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                            {chapter.kartu_2.judul}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {chapter.kartu_2.deskripsi}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        {chapter.kartu_2.poin.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-emerald-50/40 rounded-xl p-2.5 border border-emerald-100/40 text-xs text-slate-700">
                            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* KARTU 3: Titik Buta (Blind Spots) */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 print-avoid-break print-clean-box">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">
                            KARTU 3 • TITIK BUTA (BLIND SPOTS)
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                            {chapter.kartu_3.judul}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {chapter.kartu_3.deskripsi}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        {chapter.kartu_3.poin.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-amber-50/50 rounded-xl p-2.5 border border-amber-200/50 text-xs text-slate-800">
                            <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              !
                            </span>
                            <span className="leading-relaxed">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* KARTU 4: Aksi Nyata 4 Tahap & Kebiasaan */}
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 print-avoid-break print-clean-box">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 block">
                            KARTU 4 • AKSI NYATA 4 TAHAP
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                            {chapter.kartu_4.judul}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {chapter.kartu_4.deskripsi}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        {chapter.kartu_4.tahapan.map((step) => (
                          <div key={step.tahap} className="p-2.5 rounded-xl bg-violet-50/50 border border-violet-100 text-xs flex items-start gap-2">
                            <span className="px-1.5 py-0.5 bg-violet-600 text-white text-[10px] font-bold rounded-md shrink-0 mt-0.5">
                              T{step.tahap}
                            </span>
                            <div>
                              <strong className="text-slate-900 block text-[11px]">{step.nama}</strong>
                              <span className="text-slate-700 leading-relaxed text-[11px]">{step.aksi}</span>
                            </div>
                          </div>
                        ))}

                        {/* Checklist Harian */}
                        {chapter.kartu_4.checklist_harian && chapter.kartu_4.checklist_harian.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-100">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
                              <ListChecks className="w-3 h-3 text-violet-600" /> Checklist Harian:
                            </span>
                            <ul className="space-y-1 pl-1">
                              {chapter.kartu_4.checklist_harian.map((check, cIdx) => (
                                <li key={cIdx} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                                  <span>{check}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Chapter Running Footer */}
                  <div className="text-right text-[10px] text-slate-400 border-t border-slate-200 pt-2 font-mono">
                    @copyright by. Pak GuruAI • Berkas Resmi Analisis Psikometri Lengkap 22 Bab (Bab {chapter.kode_bab})
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Permanent Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
          <div className="font-semibold text-slate-700">
            @copyright by. Pak GuruAI
          </div>
          <div className="text-[11px] text-slate-400">
            Berkas resmi analisis psikometri 22 bab • Backend Server Internal
          </div>
        </div>

      </div>
    </div>
  );
};
