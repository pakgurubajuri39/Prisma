import React, { useState } from 'react';
import { ParticipantRecord, updateParticipantStatus } from '../services/participantService';
import { PERSONALITY_METAS, generateBaselineChapter } from '../data/personalityProfiles';
import { TOPICS_LIST } from '../data/topics';
import { PsychometricCharts } from './PsychometricCharts';
import { ModularCards } from './ModularCards';
import { 
  X, Printer, Send, MessageCircle, CheckCircle2, 
  Calendar, Phone, User, Sparkles, BookOpen, Layers
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

  const meta = PERSONALITY_METAS[participant.mbtiType];
  const activeChapter = generateBaselineChapter(participant.mbtiType, selectedTopicCode, participant.fullName);

  // Bersihkan format nomor WA peserta
  const cleanPhone = participant.phone.replace(/[^0-9]/g, '');
  const waTarget = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

  // Siapkan template pesan WhatsApp resmi untuk peserta
  const waMessage = encodeURIComponent(
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
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                  Dossier Kepribadian Carl Jung (MBTI)
                </span>
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
