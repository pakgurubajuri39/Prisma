import React from 'react';
import { MBTIType } from '../types/psychometrics';
import { PERSONALITY_METAS } from '../data/personalityProfiles';
import { Brain, Compass, Sparkles, Activity } from 'lucide-react';

interface PsychometricChartsProps {
  type: MBTIType;
  scores?: {
    pctI: number;
    pctE: number;
    pctN: number;
    pctS: number;
    pctT: number;
    pctF: number;
    pctJ: number;
    pctP: number;
  };
  compact?: boolean;
}

export const PsychometricCharts: React.FC<PsychometricChartsProps> = ({
  type,
  scores,
  compact = false
}) => {
  const meta = PERSONALITY_METAS[type];

  // Gunakan skor real atau default dimensi dari tipe jika tidak ada
  const dim = scores ? {
    i: scores.pctI,
    e: scores.pctE,
    n: scores.pctN,
    s: scores.pctS,
    t: scores.pctT,
    f: scores.pctF,
    j: scores.pctJ,
    p: scores.pctP,
  } : {
    i: meta.dimensionDefaults.ei.introversion,
    e: meta.dimensionDefaults.ei.extraversion,
    n: meta.dimensionDefaults.sn.intuition,
    s: meta.dimensionDefaults.sn.sensing,
    t: meta.dimensionDefaults.tf.thinking,
    f: meta.dimensionDefaults.tf.feeling,
    j: meta.dimensionDefaults.jp.judging,
    p: meta.dimensionDefaults.jp.perceiving,
  };

  const dimensions = [
    {
      title: 'Orientasi Energi Batin',
      leftLabel: 'Introvert (I)',
      leftVal: dim.i,
      rightLabel: 'Ekstrovert (E)',
      rightVal: dim.e,
      color: 'from-indigo-600 to-indigo-500',
      activeSide: dim.i >= dim.e ? 'I' : 'E'
    },
    {
      title: 'Pemrosesan Informasi',
      leftLabel: 'Intuisi (N)',
      leftVal: dim.n,
      rightLabel: 'Sensing (S)',
      rightVal: dim.s,
      color: 'from-purple-600 to-purple-500',
      activeSide: dim.n >= dim.s ? 'N' : 'S'
    },
    {
      title: 'Kompas Keputusan',
      leftLabel: 'Thinking (T)',
      leftVal: dim.t,
      rightLabel: 'Feeling (F)',
      rightVal: dim.f,
      color: 'from-blue-600 to-blue-500',
      activeSide: dim.t >= dim.f ? 'T' : 'F'
    },
    {
      title: 'Struktur Hidup & Aksi',
      leftLabel: 'Judging (J)',
      leftVal: dim.j,
      rightLabel: 'Perceiving (P)',
      rightVal: dim.p,
      color: 'from-emerald-600 to-emerald-500',
      activeSide: dim.j >= dim.p ? 'J' : 'P'
    }
  ];

  return (
    <div className={`space-y-6 ${compact ? 'text-xs' : ''}`}>
      
      {/* 4 Dikotomi Psikometri Carl Jung */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-bold text-slate-900">
              Peta Polaritas 4 Dimensi Psikometri ({type})
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            Kalkulasi Spektrum %
          </span>
        </div>

        <div className="space-y-4">
          {dimensions.map((d, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className={`font-bold ${d.activeSide === d.leftLabel.slice(-2, -1) ? 'text-indigo-600' : 'text-slate-500'}`}>
                  {d.leftLabel} • {d.leftVal}%
                </span>
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  {d.title}
                </span>
                <span className={`font-bold ${d.activeSide === d.rightLabel.slice(-2, -1) ? 'text-indigo-600' : 'text-slate-500'}`}>
                  {d.rightVal}% • {d.rightLabel}
                </span>
              </div>

              {/* Progress Bar Dual Pole */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200/60 p-0.5">
                <div
                  style={{ width: `${d.leftVal}%` }}
                  className={`h-full rounded-l-full bg-gradient-to-r ${d.color} transition-all duration-500`}
                />
                <div
                  style={{ width: `${d.rightVal}%` }}
                  className="h-full rounded-r-full bg-slate-200 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagram Hierarki Fungsi Kognitif (Cognitive Stack) */}
      {!compact && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h4 className="text-sm font-bold text-slate-900">
                Arsitektur Fungsi Kognitif Carl Jung (Cognitive Stack)
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              4 Lapis Kesadaran
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Dominan */}
            <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                  1. FUNGSI DOMINAN (HERO)
                </span>
                <span className="text-[11px] font-bold text-purple-900">Kekuatan Alami 85%</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {meta.cognitiveFunctions.dominan}
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Mode autopilot mental yang paling lincah dan memberikan kejernihan pikiran terbesar.
              </p>
            </div>

            {/* Auksiler */}
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  2. FUNGSI AUKSILIER (CO-PILOT)
                </span>
                <span className="text-[11px] font-bold text-indigo-900">Penyeimbang 65%</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {meta.cognitiveFunctions.auksilier}
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Sahabat penyeimbang fungsi dominan agar kamu tidak tergelincir ke sudut pandang ekstrem.
              </p>
            </div>

            {/* Tersier */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  3. FUNGSI TERSIER (RELIEF)
                </span>
                <span className="text-[11px] font-bold text-slate-700">Area Santai 40%</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {meta.cognitiveFunctions.tersier}
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Fungsi yang muncul saat santai atau bermain; menyenangkan namun belum matang sempurna.
              </p>
            </div>

            {/* Inferior */}
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  4. FUNGSI INFERIOR (BLIND SPOT)
                </span>
                <span className="text-[11px] font-bold text-amber-900">Pintu Stres 15%</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {meta.cognitiveFunctions.inferior}
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Titik paling rentan saat tekanan tinggi (grip experience), sekaligus kunci transformasi batin sejati.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
