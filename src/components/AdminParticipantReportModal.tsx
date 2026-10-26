import React, { useState } from 'react';
import { ParticipantRecord, updateParticipantStatus } from '../services/participantService';
import { PERSONALITY_METAS, generateBaselineChapter, getCoupleDetailedAnalysis } from '../data/personalityProfiles';
import { TOPICS_LIST } from '../data/topics';
import { PsychometricCharts } from './PsychometricCharts';
import { ModularCards } from './ModularCards';
import { 
  X, Printer, Send, MessageCircle, CheckCircle2, 
  Calendar, Phone, User, Sparkles, BookOpen, Layers,
  Heart, HeartHandshake, ShieldAlert, Compass, Check
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

  if (!participant) return null;

  const isCouple = participant.testMode === 'couple' && !!participant.partnerData;
  const meta = PERSONALITY_METAS[participant.mbtiType];
  const activeChapter = generateBaselineChapter(participant.mbtiType, selectedTopicCode, participant.fullName);

  const coupleAnalysis = isCouple ? getCoupleDetailedAnalysis(
    participant.mbtiType,
    participant.partnerData!.partnerName,
    participant.partnerData!.partnerType,
    participant.partnerData!.relationshipStatus,
    participant.partnerData!.dilemma
  ) : null;

  // Bersihkan format nomor WA peserta
  const cleanPhone = participant.phone.replace(/[^0-9]/g, '');
  const waTarget = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

  // Siapkan template pesan WhatsApp resmi untuk peserta
  const waMessage = isCouple ? encodeURIComponent(
    `Halo Kak *${participant.fullName}*,\n\nTerima kasih telah mengikuti Asesmen Psikometri Carl Jung 16 Tipe bersama Pak GuruAI untuk Kakak & Pasangan (*${participant.partnerData?.partnerName}*)!\n\nHasil lengkap psikometri kamu telah kami verifikasi:\n📌 Tipe Kamu: *${participant.mbtiType}* (${meta.name})\n📌 Skor Harmoni Pasangan: *${coupleAnalysis?.harmonyScore}%* (${coupleAnalysis?.harmonyLevel})\n📌 Status: *${participant.partnerData?.relationshipStatus}*\n\n📌 *Sinergi Utama:*\n${coupleAnalysis?.coreSynergy}\n\nLaporan lengkap komprehensif 22 bab (termasuk bab Hubungan Romantis & Pernikahan) siap kami lampirkan dalam dokumen PDF ini.\n\n@copyright by. Pak GuruAI`
  ) : encodeURIComponent(
    `Halo Kak *${participant.fullName}*,\n\nTerima kasih telah mengikuti Tes Psikometri 16 Tipe Carl Jung bersama Pak GuruAI!\n\nHasil lengkap psikometri kamu telah kami verifikasi dengan hasil: *${participant.mbtiType}* (${meta.name}).\n\n📌 *Ringkasan Eksekutif:*\n${meta.shortDesc}\n\n📌 *Motto Hidup:*\n${meta.motto}\n\nLaporan lengkap komprehensif 22 bab dan arsitektur fungsi kognitif kamu siap kami lampirkan dalam dokumen PDF ini.\n\n@copyright by. Pak GuruAI`
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
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 text-slate-900">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 gap-4 no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base font-mono shadow-sm">
              {participant.mbtiType}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  Laporan Lengkap: {participant.fullName}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  participant.status === 'sent' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {participant.status === 'sent' ? 'Sudah Dikirim via WA' : 'Menunggu Dikirim'}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Lahir: {participant.birthDate}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> {participant.phone}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSendToWhatsApp}
              disabled={isUpdating}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Kirim pesan langsung ke WhatsApp peserta"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Kirim ke WA Peserta</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Cetak atau Simpan sebagai PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-50/50">
          
          {/* Identity & Archetype Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                    Dossier Kepribadian Carl Jung (MBTI)
                  </span>
                  {isCouple && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                      👥 Asesmen Pasangan
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-black text-slate-900">
                  {participant.fullName} — {participant.mbtiType}
                </h2>
                <p className="text-xl font-bold text-indigo-600">
                  {meta.name} ({meta.role})
                </p>
                <p className="text-sm text-slate-600 italic max-w-2xl">
                  {meta.motto}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl pt-1">
                  {meta.shortDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center min-w-[180px] shrink-0">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Status Pengiriman
                </span>
                <span className={`text-sm font-black mt-1 block ${
                  participant.status === 'sent' ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {participant.status === 'sent' ? '✓ Laporan Terkirim' : '⏳ Belum Terkirim'}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  WA: {participant.phone}
                </span>
              </div>
            </div>
          </div>

          {/* KHUSUS PASANGAN: Modul Analisis Relasi Komprehensif */}
          {isCouple && coupleAnalysis && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-500" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
                <div>
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800">
                    Modul Psikometri Pasangan Akurat & Terpercaya
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1 flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    <span>Dinamika Relasi: {participant.fullName} & {coupleAnalysis.partnerName}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Status: <strong className="text-slate-800">{coupleAnalysis.relationshipStatus}</strong> • Tipe Pasangan: <strong className="text-rose-700">{participant.partnerData?.partnerType || 'Dianalisis secara interaktif'}</strong>
                  </p>
                </div>

                <div className="text-center sm:text-right bg-rose-50 p-3.5 rounded-2xl border border-rose-200 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                    Kecocokan Kognitif
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
                  <span>Sinergi Utama & Arketipe Hubungan ({coupleAnalysis.dynamicArchetype}):</span>
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

          {/* Diagram & Chart Visual Pendukung */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Diagram & Visualisasi Psikometri</span>
            </h3>
            <PsychometricCharts type={participant.mbtiType} scores={participant.scores} />
          </div>

          {/* Bab Navigator & 4-Card Analysis Viewer */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <span>Laporan Lengkap 22 Bab (Bahasa Ramah & Mudah Dipahami)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Pilih bab di bawah untuk memeriksa 4 kartu analisis terstruktur peserta ini.
                </p>
              </div>

              {/* Selector bab */}
              <select
                value={selectedTopicCode}
                onChange={(e) => setSelectedTopicCode(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {TOPICS_LIST.map((topic) => (
                  <option key={topic.kode} value={topic.kode}>
                    Bab {topic.kode}: {topic.judul}
                  </option>
                ))}
              </select>
            </div>

            {/* Render 4-Cards */}
            <ModularCards chapter={activeChapter} />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="font-semibold text-slate-700">
            @copyright by. Pak GuruAI
          </div>
          <div className="text-[11px] text-slate-400">
            Berkas resmi analisis psikometri • Terkoneksi dengan Server Internal
          </div>
        </div>

      </div>
    </div>
  );
};
