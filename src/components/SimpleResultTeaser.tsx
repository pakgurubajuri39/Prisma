import React, { useState, useEffect } from 'react';
import { MBTIType, RegistrationFormData } from '../types/psychometrics';
import { PERSONALITY_METAS, getCoupleDetailedAnalysis } from '../data/personalityProfiles';
import { PsychometricCharts } from './PsychometricCharts';
import { getAdminConfig } from '../services/participantService';
import { 
  Sparkles, MessageCircle, FileText, CheckCircle2, 
  ArrowRight, ShieldCheck, HeartHandshake, PhoneCall, Copy, Check,
  Heart, AlertCircle, Compass, ShieldAlert, Award
} from 'lucide-react';

interface SimpleResultTeaserProps {
  type: MBTIType;
  participantData: RegistrationFormData;
  scores?: any;
  onRetake: () => void;
}

export const SimpleResultTeaser: React.FC<SimpleResultTeaserProps> = ({
  type,
  participantData,
  scores,
  onRetake
}) => {
  const [adminPhone, setAdminPhone] = useState('6281234567890');
  const [copied, setCopied] = useState(false);
  const meta = PERSONALITY_METAS[type];

  useEffect(() => {
    getAdminConfig().then(cfg => {
      if (cfg && cfg.adminPhone) {
        setAdminPhone(cfg.adminPhone);
      }
    });
  }, []);

  const cleanPhone = adminPhone.replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;

  // Analisis Pasangan jika peserta memilih mode couple
  const isCouple = participantData.testMode === 'couple' && !!participantData.partnerData;
  const coupleAnalysis = isCouple ? getCoupleDetailedAnalysis(
    type,
    participantData.partnerData!.partnerName,
    participantData.partnerData!.partnerType,
    participantData.partnerData!.relationshipStatus,
    participantData.partnerData!.dilemma
  ) : null;

  // Pesan WhatsApp otomatis disesuaikan
  const waMessage = isCouple ? encodeURIComponent(
    `Halo Admin Pak GuruAI, saya *${participantData.fullName}* dan pasangan saya *${participantData.partnerData?.partnerName}* (Status: *${participantData.partnerData?.relationshipStatus}*, No HP: *${participantData.phone}*) baru saja menyelesaikan Asesmen Psikometri Pasangan PRISMA-16™ dengan hasil tipe saya *${type}* (${meta.name}) dan skor harmoni *${coupleAnalysis?.harmonyScore}%* (${coupleAnalysis?.harmonyLevel}).\n\nKami ingin meminta berkas Laporan Lengkap 22 Bab Analisis Pasangan resmi kami dalam format PDF. Terima kasih!`
  ) : encodeURIComponent(
    `Halo Admin Pak GuruAI, saya *${participantData.fullName}* (Tgl Lahir: *${participantData.birthDate}*, No HP: *${participantData.phone}*) baru saja menyelesaikan tes psikometri dan mendapatkan hasil *${type}* (${meta.name}).\n\nSaya ingin meminta berkas laporan lengkap 22 bab saya dalam format PDF. Terima kasih!`
  );

  const waLink = `https://wa.me/${waPhone}?text=${waMessage}`;

  const copyWaNumber = () => {
    navigator.clipboard.writeText(adminPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Kartu Hasil Singkat (Teaser Saja) */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center relative overflow-hidden">
        <div className={`absolute top-0 inset-x-0 h-3 ${isCouple ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`} />

        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-inner ${
          isCouple ? 'bg-rose-50 border border-rose-100 text-rose-600' : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
        }`}>
          {isCouple ? <Heart className="w-8 h-8 fill-rose-500 text-rose-500" /> : <Sparkles className="w-8 h-8 animate-bounce" />}
        </div>

        <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border ${
          isCouple ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          {isCouple ? 'Asesmen Pasangan Selesai • Terverifikasi' : 'Tes Selesai • Hasil Awal Terverifikasi'}
        </span>

        {/* Tipe Keluar Besar Saja Seperti INFJ Saja */}
        <div className="mt-6 mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Tipe Kepribadian Intimu:
          </span>
          <h2 className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight font-mono">
            {type}
          </h2>
          <p className="text-2xl font-bold text-indigo-600 mt-2">
            {meta.name}
          </p>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            Peran Arketipe: {meta.role}
          </span>
        </div>

        <p className="text-slate-500 text-sm max-w-lg mx-auto italic mt-2">
          {meta.motto}
        </p>

        <p className="text-slate-700 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
          Halo <strong className="text-slate-900">{participantData.fullName}</strong>, tipe kepribadian utamamu adalah <strong className="text-indigo-600">{type}</strong>. {meta.shortDesc}
        </p>

        {/* Status Database Confirmation */}
        <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-center gap-2 max-w-md mx-auto">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Hasil & identitasmu telah tersimpan di sistem Pak GuruAI.</span>
        </div>

        {/* KHUSUS COUPLE: Panel Analisis Pasangan Akurat & Terpercaya */}
        {isCouple && coupleAnalysis && (
          <div className="mt-8 pt-8 border-t border-slate-100 text-left space-y-6">
            
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-50/80 via-white to-pink-50/60 border border-rose-200/80 shadow-xs space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
                <div className="space-y-1">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800">
                    Modul Analisis Pasangan Terpercaya
                  </span>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    <span>{participantData.fullName} & {coupleAnalysis.partnerName}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Status: <strong className="text-slate-800">{coupleAnalysis.relationshipStatus}</strong> • Arketipe: <strong className="text-rose-700">{coupleAnalysis.dynamicArchetype}</strong>
                  </p>
                </div>

                {/* Skor Harmoni Badge */}
                <div className="text-center sm:text-right bg-white p-3.5 rounded-2xl border border-rose-200/80 shadow-xs shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Skor Harmoni Kognitif
                  </span>
                  <div className="text-3xl font-black text-rose-600 font-mono">
                    {coupleAnalysis.harmonyScore}%
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {coupleAnalysis.harmonyLevel}
                  </span>
                </div>
              </div>

              {/* Sinergi Utama */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sinergi & Kekuatan Hubungan:</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-rose-100/60">
                  {coupleAnalysis.coreSynergy}
                </p>
              </div>

              {/* Titik Rawan & Gesekan yang Perlu Diwaspadai */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Titik Rawan & Blindspot yang Perlu Diwaspadai:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {coupleAnalysis.blindSpotsAndFriction.map((bs, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/90 border border-rose-100 text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        !
                      </span>
                      <span className="leading-relaxed">{bs}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Panduan Praktis Komunikasi */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Formula Komunikasi Pasangan Sehat:</span>
                </h4>
                <div className="space-y-1.5">
                  {coupleAnalysis.communicationRules.map((cr, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100/60 text-xs text-slate-700 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{cr}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Analisis 22 bab lengkap termasuk Bab 10 (Hubungan Romantis), Bab 11 (Matriks Pasangan), dan Bab 12 (Pernikahan) telah disusun untuk kalian berdua.</span>
              </div>

            </div>

          </div>
        )}

        {/* Visual Diagram Spektrum */}
        <div className="mt-8 pt-8 border-t border-slate-100 text-left">
          <PsychometricCharts type={type} scores={scores} compact={true} />
        </div>

        {/* Call-To-Action WhatsApp Admin */}
        <div className="mt-8 pt-8 border-t border-slate-100 bg-gradient-to-br from-indigo-50/80 via-white to-pink-50/40 rounded-3xl p-6 sm:p-8 border border-indigo-100 text-center space-y-4">
          
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
            <MessageCircle className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {isCouple ? 'Dapatkan Laporan Lengkap 22 Bab Analisis Pasangan' : 'Ingin Mengetahui Hasil Lengkapnya?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              {isCouple 
                ? `Dapatkan berkas dossier komprehensif 22 Bab Lengkap khusus pasanganmu (${participantData.fullName} & ${participantData.partnerData?.partnerName}) dalam format PDF resmi dengan menghubungi admin di WhatsApp:`
                : 'Dapatkan berkas laporan psikometri komprehensif 22 Bab Lengkap (analisis cara pikiran bekerja, stres & emosi, karir, percintaan, hingga rencana aksi 30 hari) dalam format PDF resmi dengan menghubungi admin di WhatsApp:'}
            </p>
          </div>

          {/* Nomor WA Admin Box */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs font-mono font-bold text-slate-800 text-sm">
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>WA Admin: {adminPhone}</span>
            <button
              onClick={copyWaNumber}
              className="text-slate-400 hover:text-slate-700 ml-1 cursor-pointer"
              title="Salin Nomor"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Tombol Langsung ke WA Admin */}
          <div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition transform hover:scale-102 cursor-pointer w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Hubungi Admin WhatsApp untuk Dapatkan Laporan Lengkap PDF</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            Admin kami akan memverifikasi datamu dan mengirimkan berkas PDF langsung ke nomor WhatsApp yang telah kamu daftarkan ({participantData.phone}).
          </p>
        </div>

      </div>

      {/* Retake button */}
      <div className="text-center">
        <button
          onClick={onRetake}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition cursor-pointer"
        >
          ← Ingin mengulang pengisian tes dengan data lain?
        </button>
      </div>

    </div>
  );
};

