import React from 'react';
import { ChapterReport } from '../types/psychometrics';
import { Compass, Activity, AlertTriangle, CheckCircle2, ArrowRight, ListChecks } from 'lucide-react';

interface ModularCardsProps {
  chapter: ChapterReport;
  onViewJson?: () => void;
  onCustomGenerate?: () => void;
  isGenerating?: boolean;
}

export const ModularCards: React.FC<ModularCardsProps> = ({
  chapter,
  onViewJson,
  onCustomGenerate,
  isGenerating = false
}) => {
  return (
    <div className="space-y-6">
      {/* Chapter Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Bab {chapter.kode_bab} dari 22
              </span>
              <span className="text-xs text-slate-400">Format Modular 4-Kotak Analisis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {chapter.judul}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl pt-1">
              {chapter.ringkasan_eksekutif}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-2 md:pt-0 shrink-0">
            {onCustomGenerate && (
              <button
                onClick={onCustomGenerate}
                disabled={isGenerating}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-indigo-500/25 transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menyusun AI...
                  </>
                ) : (
                  <>
                    <span>✨ Personalisasi AI</span>
                  </>
                )}
              </button>
            )}

            {onViewJson && (
              <button
                onClick={onViewJson}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-xs sm:text-sm font-medium transition flex items-center gap-1.5 cursor-pointer"
                title="Lihat data JSON murni sesuai skema"
              >
                <span className="font-mono text-xs">{'{ }'}</span>
                <span>JSON Murni</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid 4 Kotak Kartu Analisis Terstruktur */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* KARTU 1: Karakteristik atau Pola Alami */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 hover:shadow-md transition-shadow relative group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  KARTU 1 • POLA ALAMI
                </span>
                <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                  {chapter.kartu_1.poin.length} Poin Analisis
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {chapter.kartu_1.judul}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {chapter.kartu_1.deskripsi}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3 pt-3 border-t border-slate-100">
            {chapter.kartu_1.poin.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-indigo-50/40 rounded-xl p-3 border border-indigo-100/50">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KARTU 2: Praktik Nyata atau Cara Berinteraksi */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 hover:shadow-md transition-shadow relative group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Activity className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  KARTU 2 • PRAKTIK NYATA
                </span>
                <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                  {chapter.kartu_2.poin.length} Poin Perilaku
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {chapter.kartu_2.judul}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {chapter.kartu_2.deskripsi}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3 pt-3 border-t border-slate-100">
            {chapter.kartu_2.poin.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-emerald-50/40 rounded-xl p-3 border border-emerald-100/50">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KARTU 3: Risiko, Titik Buta, atau Pola Lama (Waspadai) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 hover:shadow-md transition-shadow relative group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  KARTU 3 • TITIK BUTA (BLIND SPOTS)
                </span>
                <span className="text-[11px] text-amber-600/80 bg-amber-100/60 px-2 py-0.5 rounded-full font-semibold">
                  4 Peringatan Empatik
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {chapter.kartu_3.judul}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {chapter.kartu_3.deskripsi}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3 pt-3 border-t border-slate-100">
            {chapter.kartu_3.poin.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-amber-50/50 rounded-xl p-3 border border-amber-200/50">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  !
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-normal">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KARTU 4: Langkah Konkret 4 Tahap & Checklist Kebiasaan */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 hover:shadow-md transition-shadow relative group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 border border-violet-100">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  KARTU 4 • AKSI NYATA
                </span>
                <span className="text-[11px] text-violet-600/80 bg-violet-100/60 px-2 py-0.5 rounded-full font-semibold">
                  4 Tahap Terukur
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {chapter.kartu_4.judul}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {chapter.kartu_4.deskripsi}
              </p>
            </div>
          </div>

          {/* Tahap 1 sampai 4 */}
          <div className="mt-5 space-y-2.5 pt-3 border-t border-slate-100">
            {chapter.kartu_4.tahapan.map((step) => (
              <div key={step.tahap} className="p-3 rounded-xl bg-violet-50/50 border border-violet-100 flex items-start gap-3">
                <div className="px-2 py-0.5 bg-violet-600 text-white text-xs font-bold rounded-md shrink-0 mt-0.5">
                  Tahap {step.tahap}
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {step.nama}
                    <ArrowRight className="w-3 h-3 text-violet-500 inline" />
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 leading-relaxed">
                    {step.aksi}
                  </p>
                </div>
              </div>
            ))}

            {/* Checklist Kebiasaan (Jika ada) */}
            {chapter.kartu_4.checklist_harian && chapter.kartu_4.checklist_harian.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2">
                  <ListChecks className="w-3.5 h-3.5 text-violet-600" />
                  <span>Checklist Kebiasaan Harian:</span>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {chapter.kartu_4.checklist_harian.map((check, cIdx) => (
                    <li key={cIdx} className="text-xs text-slate-600 flex items-center gap-2">
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
    </div>
  );
};
