import React, { useState, useEffect } from 'react';
import { MBTIType } from '../types/psychometrics';
import { PERSONALITY_METAS } from '../data/personalityProfiles';
import { PsychometricCharts } from './PsychometricCharts';
import { getAdminConfig } from '../services/participantService';
import { 
  Sparkles, MessageCircle, FileText, CheckCircle2, 
  ArrowRight, ShieldCheck, HeartHandshake, PhoneCall, Copy, Check
} from 'lucide-react';

interface SimpleResultTeaserProps {
  type: MBTIType;
  participantData: {
    fullName: string;
    birthDate: string;
    phone: string;
  };
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

  const waMessage = encodeURIComponent(
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
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 mx-auto flex items-center justify-center text-indigo-600 mb-4 shadow-inner">
          <Sparkles className="w-8 h-8 animate-bounce" />
        </div>

        <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
          Tes Selesai • Hasil Awal Terverifikasi
        </span>

        {/* Tipe Keluar Besar Saja Seperti INFJ Saja */}
        <div className="mt-6 mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Tipe Kepribadianmu:
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

        {/* Visual Diagram Spektrum */}
        <div className="mt-8 pt-8 border-t border-slate-100 text-left">
          <PsychometricCharts type={type} scores={scores} compact={true} />
        </div>

        {/* Call-To-Action WhatsApp Admin (Sesuai Permintaan User) */}
        <div className="mt-8 pt-8 border-t border-slate-100 bg-gradient-to-br from-indigo-50/80 via-white to-pink-50/40 rounded-3xl p-6 sm:p-8 border border-indigo-100 text-center space-y-4">
          
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
            <MessageCircle className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Ingin Mengetahui Hasil Lengkapnya?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Dapatkan berkas laporan psikometri komprehensif <strong>22 Bab Lengkap</strong> (analisis cara pikiran bekerja, stres & emosi, karir, percintaan, hingga rencana aksi 30 hari) dalam format <strong>PDF resmi</strong> dengan menghubungi admin kami di WhatsApp:
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
