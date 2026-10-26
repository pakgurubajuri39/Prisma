import React, { useState, useEffect } from 'react';
import { MBTIType } from '../types/psychometrics';
import { PERSONALITY_METAS } from '../data/personalityProfiles';
import { CalendarCheck, CheckCircle2, Circle, Sparkles, RotateCcw, Award } from 'lucide-react';

interface ActionPlanTrackerProps {
  type: MBTIType;
  subjectName?: string;
}

interface WeekPlan {
  pekan: number;
  tema: string;
  fokus: string;
  tugas: { id: string; teks: string; selesai: boolean }[];
}

export const ActionPlanTracker: React.FC<ActionPlanTrackerProps> = ({
  type,
  subjectName = 'Kamu'
}) => {
  const meta = PERSONALITY_METAS[type];
  const storageKey = `pakguru_plan_${type}`;

  const defaultPlans: WeekPlan[] = [
    {
      pekan: 1,
      tema: 'Pekan 1: Fondasi Batin & Pemulihan Energi',
      fokus: `Menstabilkan fungsi dominan (${meta.cognitiveFunctions.dominan}) dan memulihkan baterai mental.`,
      tugas: [
        { id: 'p1_1', teks: 'Ambil jeda 15 menit hening setiap pagi tanpa menatap gawai.', selesai: false },
        { id: 'p1_2', teks: 'Identifikasi 2 pemicu stres utama di lingkungan harianmu dan catat polanya.', selesai: false },
        { id: 'p1_3', teks: 'Terapkan waktu tidur teratur minimal 7 jam selama 5 hari berturut-turut.', selesai: false },
        { id: 'p1_4', teks: 'Lakukan 1 aktivitas sensorik yang membumi (jalan santai di alam terbuka atau mandi air hangat).', selesai: false }
      ]
    },
    {
      pekan: 2,
      tema: 'Pekan 2: Kebersihan Relasi & Batas Personal',
      fokus: 'Melatih komunikasi asertif yang hangat tanpa merasa bersalah.',
      tugas: [
        { id: 'p2_1', teks: 'Latih berkata "tidak" secara santun pada 1 permintaan yang membebani kapasitas energimu.', selesai: false },
        { id: 'p2_2', teks: 'Ungkapkan apresiasi tulus kepada 1 orang terdekat atas kehadirannya dalam hidupmu.', selesai: false },
        { id: 'p2_3', teks: 'Komunikasikan kebutuhan ruang pribadimu kepada pasangan atau keluarga secara transparan.', selesai: false },
        { id: 'p2_4', teks: 'Dengarkan cerita seseorang selama 10 menit tanpa buru-buru menyodorkan solusi logika.', selesai: false }
      ]
    },
    {
      pekan: 3,
      tema: 'Pekan 3: Eksekusi Fokus & Delegasi Efektif',
      fokus: 'Mengatasi jebakan perfeksionisme dan mendistribusikan tanggung jawab.',
      tugas: [
        { id: 'p3_1', teks: 'Selesaikan 1 proyek atau urusan penting yang telah kamu tunda lebih dari 2 pekan.', selesai: false },
        { id: 'p3_2', teks: 'Delegasikan minimal 1 tugas rutin kepada rekan kerja atau anggota keluarga tanpa mendikte caranya.', selesai: false },
        { id: 'p3_3', teks: 'Eliminasi 2 distraksi visual atau digital dari ruang kerjamu agar fokusmu kembali tajam.', selesai: false },
        { id: 'p3_4', teks: 'Latih prinsip "cukup baik": lepaskan 1 tugas non-kritis dengan standar 80% selesai tanpa overthinking.', selesai: false }
      ]
    },
    {
      pekan: 4,
      tema: 'Pekan 4: Integrasi Karakter & Lompatan Transformasi',
      fokus: 'Merayakan kedewasaan psikologis dan merawat nilai-nilai otentik.',
      tugas: [
        { id: 'p4_1', teks: 'Tulis surat apresiasi dan penerimaan penuh kasih sayang untuk dirimu sendiri.', selesai: false },
        { id: 'p4_2', teks: 'Tinjau kembali jurnal 30 hari: catat 3 perubahan perilaku nyata yang paling kamu syukuri.', selesai: false },
        { id: 'p4_3', teks: 'Formulasikan 1 komitmen jangka panjang yang selaras dengan misi hidupmu sebagai ' + meta.name + '.', selesai: false },
        { id: 'p4_4', teks: 'Rayakan perjalanan 30 hari ini dengan hadiah kecil yang menyejukkan hatimu.', selesai: false }
      ]
    }
  ];

  const [plans, setPlans] = useState<WeekPlan[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return defaultPlans;
  });

  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem(`${storageKey}_notes`) || '';
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(plans));
    } catch {
      // ignore
    }
  }, [plans, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`${storageKey}_notes`, notes);
    } catch {
      // ignore
    }
  }, [notes, storageKey]);

  const toggleTask = (weekIdx: number, taskId: string) => {
    setPlans(prev => {
      const copy = [...prev];
      const week = { ...copy[weekIdx] };
      week.tugas = week.tugas.map(t => t.id === taskId ? { ...t, selesai: !t.selesai } : t);
      copy[weekIdx] = week;
      return copy;
    });
  };

  const handleReset = () => {
    if (confirm('Ulangi seluruh kemajuan rencana aksi 30 hari ini dari awal?')) {
      setPlans(defaultPlans);
      setNotes('');
      localStorage.removeItem(storageKey);
      localStorage.removeItem(`${storageKey}_notes`);
    }
  };

  const totalTasks = plans.reduce((acc, w) => acc + w.tugas.length, 0);
  const finishedTasks = plans.reduce((acc, w) => acc + w.tugas.filter(t => t.selesai).length, 0);
  const percentage = Math.round((finishedTasks / totalTasks) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-400/30">
                Bab 22 • Rencana Aksi 30 Hari
              </span>
              <span className="text-xs text-slate-400">Roadmap Terstruktur 4 Pekan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Transformasi Nyata {subjectName} ({type})
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Panduan kebiasaan mikro terukur yang dirancang khusus untuk mengoptimalkan kelebihan alamiah {meta.name} tanpa mengorbankan ketenangan batinmu.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-center shrink-0 min-w-[140px]">
            <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider block">Kemajuan</span>
            <span className="text-3xl sm:text-4xl font-black text-violet-300 mt-1 block">
              {percentage}%
            </span>
            <span className="text-[11px] text-slate-300">
              {finishedTasks} dari {totalTasks} Aksi
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-black/30 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-400 to-indigo-400 transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* 4 Weeks Cards */}
      <div className="space-y-6">
        {plans.map((week, wIdx) => {
          const weekDone = week.tugas.every(t => t.selesai);
          return (
            <div
              key={week.pekan}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                weekDone ? 'border-emerald-300 bg-emerald-50/20 shadow-sm' : 'border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase bg-violet-100 text-violet-800">
                      Pekan {week.pekan}
                    </span>
                    {weekDone && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md">
                        <Award className="w-3.5 h-3.5" /> Pekan Tuntas
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1.5">{week.tema}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{week.fokus}</p>
                </div>
              </div>

              {/* Checklist items */}
              <div className="mt-4 space-y-2.5">
                {week.tugas.map(t => (
                  <button
                    key={t.id}
                    onClick={() => toggleTask(wIdx, t.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      t.selesai
                        ? 'border-emerald-200 bg-emerald-50/40 text-slate-500 line-through'
                        : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    {t.selesai ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                      {t.teks}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Jurnal Refleksi */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-600" />
          <span>Jurnal Refleksi Pribadi 30 Hari</span>
        </h4>
        <p className="text-xs text-slate-500">
          Tuliskan catatan, perasaan, atau terobosan kecil yang kamu rasakan selama menjalani rencana aksi ini. Data tersimpan otomatis di perangkatmu.
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Catatan refleksiku: Hari ini saya menyadari bahwa saat saya memberi jeda hening 10 menit..."
          rows={4}
          className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 font-sans"
        />
      </div>

      {/* Reset */}
      <div className="text-center pt-2">
        <button
          onClick={handleReset}
          className="text-xs text-slate-400 hover:text-rose-500 transition flex items-center gap-1 mx-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Atur Ulang Seluruh Kemajuan</span>
        </button>
      </div>
    </div>
  );
};
