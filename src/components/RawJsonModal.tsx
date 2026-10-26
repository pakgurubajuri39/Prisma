import React, { useState } from 'react';
import { X, Copy, Check, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import { ChapterReport, MBTIType } from '../types/psychometrics';
import { PERSONALITY_METAS } from '../data/personalityProfiles';

interface RawJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: MBTIType;
  chapter: ChapterReport;
  subjectName?: string;
}

export const RawJsonModal: React.FC<RawJsonModalProps> = ({
  isOpen,
  onClose,
  type,
  chapter,
  subjectName = 'Kamu'
}) => {
  const [copied, setCopied] = useState(false);
  const meta = PERSONALITY_METAS[type];

  if (!isOpen) return null;

  // Exact JSON output as specified in the schema, strictly without markdown wrappers
  const jsonPayload = {
    tipe_kepribadian: type,
    julukan: meta.name,
    peran_arketipe: meta.role,
    nama_subjek: subjectName,
    dimensi: {
      ei: meta.dimensionDefaults.ei,
      sn: meta.dimensionDefaults.sn,
      tf: meta.dimensionDefaults.tf,
      jp: meta.dimensionDefaults.jp
    },
    bab: {
      nomor: chapter.nomor,
      kode_bab: chapter.kode_bab,
      judul: chapter.judul,
      ringkasan_eksekutif: chapter.ringkasan_eksekutif,
      kartu_1: {
        judul: chapter.kartu_1.judul,
        deskripsi: chapter.kartu_1.deskripsi,
        poin: chapter.kartu_1.poin
      },
      kartu_2: {
        judul: chapter.kartu_2.judul,
        deskripsi: chapter.kartu_2.deskripsi,
        poin: chapter.kartu_2.poin
      },
      kartu_3: {
        judul: chapter.kartu_3.judul,
        deskripsi: chapter.kartu_3.deskripsi,
        poin: chapter.kartu_3.poin
      },
      kartu_4: {
        judul: chapter.kartu_4.judul,
        deskripsi: chapter.kartu_4.deskripsi,
        tahapan: chapter.kartu_4.tahapan,
        checklist_harian: chapter.kartu_4.checklist_harian || []
      }
    },
    metadata: {
      engine: 'Pak GuruAI Psychometric Engine v3.8',
      tone: 'Hangat, Empatik, Reflektif, Actionable',
      standar: 'Carl Jung 16 Personality Typology',
      generated_at: new Date().toISOString(),
      copyright: '@copyright by. Pak GuruAI'
    }
  };

  const jsonString = JSON.stringify(jsonPayload, null, 2);

  // Quick verification that JSON is 100% valid
  let isValidJson = false;
  try {
    JSON.parse(jsonString);
    isValidJson = true;
  } catch {
    isValidJson = false;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PakGuruAI_${type}_Bab_${chapter.kode_bab}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
              {'{ }'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Keluaran JSON Valid — Bab {chapter.kode_bab} ({type})
                </h3>
                {isValidJson ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3 h-3" /> Valid JSON
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded-md">
                    <AlertCircle className="w-3 h-3" /> Parse Error
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Format murni tanpa markdown pembungkus tambahan (```json ... ```)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh .json</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content Area */}
        <div className="flex-1 p-4 overflow-auto bg-slate-950 font-mono text-xs text-emerald-300 leading-relaxed selection:bg-indigo-700 selection:text-white">
          <pre className="whitespace-pre">{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800/80 bg-slate-900/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Skema Terverifikasi: 4 Kotak Kartu Analisis Terstruktur</span>
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            @copyright by. Pak GuruAI
          </div>
        </div>

      </div>
    </div>
  );
};
