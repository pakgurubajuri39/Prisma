import React, { useState } from 'react';
import { MBTIType } from '../types/psychometrics';
import { TOPICS_LIST } from '../data/topics';
import { PERSONALITY_METAS, generateBaselineChapter } from '../data/personalityProfiles';
import { Copy, Check, Download, ShieldCheck, Terminal, Layers } from 'lucide-react';

interface RawJsonViewProps {
  currentType: MBTIType;
  subjectName: string;
}

export const RawJsonView: React.FC<RawJsonViewProps> = ({
  currentType,
  subjectName
}) => {
  const [selectedTopicCode, setSelectedTopicCode] = useState<string>('01');
  const [exportMode, setExportMode] = useState<'single' | 'full'>('single');
  const [copied, setCopied] = useState(false);

  const meta = PERSONALITY_METAS[currentType];

  let jsonPayload: any;

  if (exportMode === 'single') {
    const chapter = generateBaselineChapter(currentType, selectedTopicCode, subjectName || 'Kamu');
    jsonPayload = {
      tipe_kepribadian: currentType,
      julukan: meta.name,
      peran_arketipe: meta.role,
      nama_subjek: subjectName || 'Kamu',
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
        tone: 'Warm, Empathetic, Reflective, Actionable',
        standar: 'Carl Jung 16 Personality Typology',
        generated_at: new Date().toISOString(),
        copyright: '@copyright by. Pak GuruAI'
      }
    };
  } else {
    const allChapters = TOPICS_LIST.map(topic => 
      generateBaselineChapter(currentType, topic.kode, subjectName || 'Kamu')
    );
    jsonPayload = {
      tipe_kepribadian: currentType,
      julukan: meta.name,
      peran_arketipe: meta.role,
      nama_subjek: subjectName || 'Kamu',
      motto: meta.motto,
      fungsi_kognitif: meta.cognitiveFunctions,
      total_bab: 22,
      daftar_bab: allChapters,
      metadata: {
        engine: 'Pak GuruAI Full Dossier Engine v3.8',
        standar: 'Carl Jung 16 Personality Typology',
        exported_at: new Date().toISOString(),
        copyright: '@copyright by. Pak GuruAI'
      }
    };
  }

  const jsonString = JSON.stringify(jsonPayload, null, 2);

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
    a.download = exportMode === 'single'
      ? `PakGuruAI_${currentType}_Bab_${selectedTopicCode}.json`
      : `PakGuruAI_${currentType}_Laporan_Lengkap_22_Bab.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white font-mono">
              Pure JSON Output
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Valid JSON
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
            Ekspor Data JSON Standar Internasional
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Sesuai aturan output wajib: Data dikeluarkan murni dalam format JSON valid tanpa pembungkus markdown tambahan di luar blok JSON.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin JSON'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Berkas</span>
          </button>
        </div>
      </div>

      {/* Scope Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-slate-500">Cakupan Data:</span>
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-bold">
            <button
              onClick={() => setExportMode('single')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                exportMode === 'single' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1 Bab Terpilih (4 Kartu)
            </button>
            <button
              onClick={() => setExportMode('full')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                exportMode === 'full' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dossier Penuh 22 Bab
            </button>
          </div>
        </div>

        {exportMode === 'single' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500">Pilih Bab:</span>
            <select
              value={selectedTopicCode}
              onChange={(e) => setSelectedTopicCode(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {TOPICS_LIST.map((topic) => (
                <option key={topic.kode} value={topic.kode}>
                  Bab {topic.kode}: {topic.judul}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* JSON Viewer */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>schema_version: 3.8.0-jungian</span>
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            @copyright by. Pak GuruAI
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[580px] font-mono text-xs text-emerald-300 leading-relaxed selection:bg-indigo-700 selection:text-white">
          <pre className="whitespace-pre">{jsonString}</pre>
        </div>
      </div>
    </div>
  );
};
