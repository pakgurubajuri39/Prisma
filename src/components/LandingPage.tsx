import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle, ArrowRight, ShieldCheck, Heart, 
  Brain, Compass, Users, Star, Award, Lock, Clock, Flame, 
  TrendingUp, Check, Zap, Target
} from 'lucide-react';

interface LandingPageProps {
  onStartTest: (data: { fullName: string; birthDate: string; phone: string }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartTest }) => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Mohon isi nama lengkapmu.');
      return;
    }
    if (!birthDate) {
      setErrorMsg('Mohon pilih tanggal lahirmu.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Mohon isi nomor WhatsApp aktif minimal 8 digit.');
      return;
    }

    setErrorMsg('');
    onStartTest({ fullName, birthDate, phone });
  };

  const scrollToForm = () => {
    const el = document.getElementById('registration-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 py-2 animate-in fade-in duration-300">
      
      {/* Hero Section: Premium, High-Converting & Elegant */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 lg:p-16 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Slogan Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-amber-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-bold tracking-wider uppercase text-amber-300">PRISMA-16™</span>
            <span className="text-slate-400">•</span>
            <span>Tes Pemetaan Potensi Kognitif & Kompas Batin Terlengkap</span>
          </div>

          {/* Main Title Hook */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight">
            Kenali <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-indigo-200 to-violet-300">Zona Jenius Alami</span>, <br className="hidden sm:inline" />
            Titik Buta, dan Arah Hidupmu yang Sejati
          </h1>

          {/* Marketing Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bukan sekadar kuis ramalan. <strong className="text-white">PRISMA-16™</strong> menggunakan instrumen psikometri Carl Jung berstandar internasional yang telah memandu lebih dari 28.500+ profesional, pemimpin, dan individu untuk membedah cara berpikir, mengendalikan stres emosional, dan melesat dalam karier & relasi.
          </p>

          {/* CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-indigo-600 to-violet-600 hover:from-amber-600 hover:via-indigo-700 hover:to-violet-700 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 hover:scale-102 transition transform cursor-pointer flex items-center justify-center gap-2.5"
            >
              <span>Mulai Tes Gratis Sekarang (5 Menit)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>100% Gratis Akses Awal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Cukup 5–7 Menit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Sains Tipologi 16 Arketipe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nilai Jual & 4 Pilar Transformasi */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Mengapa Kamu Wajib Mencobanya Hari Ini?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Bukan Ramalan, Ini 4 Peta Otentik Kehidupanmu
          </h2>
          <p className="text-sm text-slate-600">
            Setiap manusia memiliki pola kognitif bawaan. Ketika kamu mengenal arsitektur batinmu, keputusan besar terasa jauh lebih ringan dan pasti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Arsitektur Pikiran</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memahami fungsi dominan kognitifmu dalam memproses informasi, mengaitkan pola tersembunyi, dan mengambil keputusan kritis.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Deteksi Titik Buta</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mengenali jebakan mental dan kebiasaan lama di bawah tekanan stres emosional (*grip experience*) sebelum menguras energimu.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Zona Jenius Karier</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Menemukan ekosistem kerja ideal, gaya kepemimpinan otentik, dan posisi di mana bakat alamiahmu dihargai secara maksimal.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Kompatibilitas Relasi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memahami bahasa komunikasi batin, kebutuhan ruang hening, dan rumus menjembatani perbedaan dengan pasangan atau rekan tim.
            </p>
          </div>

        </div>
      </div>

      {/* Form Pendaftaran Section */}
      <div id="registration-box" className="max-w-2xl mx-auto scroll-mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-2 mb-8">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
              Registrasi Akses Instrumen PRISMA-16™
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Lengkapi Data untuk Memulai Tes
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Setelah mengisi form di bawah ini, kamu langsung masuk ke 24 instrumen asesmen kognitif secara lengkap.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Nama Lengkap */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Rian Pratama"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

            {/* Tanggal Lahir */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Tanggal Lahir <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Diperlukan untuk kalibrasi pemetaan fase perkembangan kedewasaan kognitif.
              </span>
            </div>

            {/* Nomor WhatsApp / HP */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890 atau 6281234567890"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Nomor ini akan digunakan admin untuk mengirimkan berkas laporan lengkap PDF kamu.
              </span>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black text-sm sm:text-base shadow-lg shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Lanjut Isi Instrumen Tes Lengkap</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Updated string per request #2 */}
            <div className="text-center pt-1">
              <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Data terenkripsi dan aman di Server
              </span>
            </div>

          </form>
        </div>
      </div>

      {/* Social Proof & Testimonials */}
      <div className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Dipercaya Oleh Lebih Dari 28.500+ Peserta di Seluruh Indonesia
          </h3>
          <p className="text-xs text-slate-500">
            Ulasan nyata dari mereka yang telah menemukan kompas batin bersama Pak GuruAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "Hasilnya sangat presisi! Saya kaget bagaimana titik buta saya di bawah stres terpetakan dengan sangat akurat. Bahasa laporannya hangat dan tidak menghakimi."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                DA
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Dian Anggraini</span>
                <span className="text-[10px] text-slate-400">INFJ • Product Manager</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "Saya meminta laporan lengkap PDF via WA ke admin dan sangat puas dengan 22 bab analisisnya. Khususnya bab karir dan komunikasi tim sangat membantu promosi saya."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center">
                FS
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Fajar Setiawan</span>
                <span className="text-[10px] text-slate-400">ENTJ • Business Owner</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "Tes ini membantu saya dan pasangan memahami perbedaan gaya komunikasi kami. Kami jadi tidak gampang tersinggung lagi saat lelah."
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 text-xs font-bold flex items-center justify-center">
                MR
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Maya & Reza</span>
                <span className="text-[10px] text-slate-400">ENFP & INTJ Pasangan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
