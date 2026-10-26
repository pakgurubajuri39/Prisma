import React from 'react';
import { Lock, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white py-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
                PG
              </span>
              <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">
                PRISMA-16™ by Pak GuruAI — Pemetaan Potensi Kognitif & Kompas Batin 16 Arketipe
              </h4>
            </div>
            <p className="text-xs text-slate-500 max-w-xl">
              Laporan psikometri komprehensif 22 bab modular 4-kartu dengan Server Internal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer border border-slate-700"
              title="Akses Portal Admin"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Portal Admin</span>
            </button>
          </div>
        </div>

        {/* Mandatory Copyright & Credentials Line */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="font-semibold text-slate-700">
            @copyright by. Pak GuruAI
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Standar Tipologi Carl Jung</span>
            <span>•</span>
            <span>Terkoneksi Server</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-indigo-600 font-semibold">
              <Sparkles className="w-3 h-3" /> Powered by Gemini AI
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
