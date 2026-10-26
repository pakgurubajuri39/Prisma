import React, { useState } from 'react';
import { MBTIType } from '../types/psychometrics';
import { PERSONALITY_METAS, getCompatibilityInsight } from '../data/personalityProfiles';
import { Heart, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface CompatibilityMatrixViewProps {
  currentType: MBTIType;
  onSelectType: (type: MBTIType) => void;
}

const ALL_TYPES: MBTIType[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

export const CompatibilityMatrixView: React.FC<CompatibilityMatrixViewProps> = ({
  currentType,
  onSelectType
}) => {
  const [partnerType, setPartnerType] = useState<MBTIType>('ENFP');
  const metaA = PERSONALITY_METAS[currentType];
  const metaB = PERSONALITY_METAS[partnerType];
  const insight = getCompatibilityInsight(currentType, partnerType);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-pink-600 bg-pink-50 border-pink-200';
    if (score >= 80) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-100 text-pink-700">
          Bab 11 • Matriks Kompatibilitas 16 Tipe
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Dinamika Relasi & Kimia Antar-Kepribadian
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-2">
          Pelajari bagaimana tipemu berinteraksi dengan tipe pasangan, rekan kerja, sahabat, atau anggota keluargamu. Pahami titik temu dan jembatan empatinya.
        </p>

        {/* Selector Pairs */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Tipe Kamu */}
          <div className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Tipemu</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-indigo-600">{currentType}</span>
              <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200">
                {metaA.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 truncate">{metaA.name}</p>
          </div>

          <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center border border-pink-200 shrink-0 shadow-sm">
            <Heart className="w-5 h-5 fill-pink-500" />
          </div>

          {/* Tipe Pasangan/Rekan */}
          <div className="w-full sm:w-64 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              Pilih Tipe Pasangan / Teman:
            </label>
            <select
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value as MBTIType)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
            >
              {ALL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t} — {PERSONALITY_METAS[t].name}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1 truncate">{metaB.shortDesc}</p>
          </div>
        </div>
      </div>

      {/* Deep Match Analysis Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(insight.skorKecocokan)}`}>
                Skor Kimia: {insight.skorKecocokan}% • {insight.level}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              Dinamika {currentType} ({metaA.name}) & {partnerType} ({metaB.name})
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Sinergi */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Sinergi & Kekuatan Utama</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {insight.sinergiUtama}
            </p>
          </div>

          {/* Potensi Friksi */}
          <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Potensi Friksi & Titik Rawan</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {insight.potensiGesekan}
            </p>
          </div>

          {/* Tips Pendekatan */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Kunci Komunikasi & Tips Asertif</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {insight.tipsPendekatan}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Matrix Grid of all 16 types for the active user */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
          Peta Kompatibilitas {currentType} Terhadap Seluruh 16 Tipe
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Klik tipe apa saja di bawah untuk langsung membedah dinamika hubungannya.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
          {ALL_TYPES.map((t) => {
            const ins = getCompatibilityInsight(currentType, t);
            const isSelected = partnerType === t;
            return (
              <button
                key={t}
                onClick={() => setPartnerType(t)}
                className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-between ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/70 shadow-sm ring-2 ring-pink-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <span className="font-mono text-xs font-black text-slate-800">{t}</span>
                <span className="text-[11px] font-bold text-pink-600 mt-1">{ins.skorKecocokan}%</span>
                <span className="text-[10px] text-slate-400 truncate w-full mt-0.5">
                  {ins.level.replace('Harmoni Tinggi', 'Harmoni').replace('Saling Melengkapi', 'Kompak').replace('Butuh Penyesuaian', 'Tantangan')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
