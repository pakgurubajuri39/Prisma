import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, KeyRound, ShieldAlert, CheckCircle, Code, 
  Play, Download, Terminal, Database, Phone, MessageCircle, 
  Users, Search, RefreshCw, Eye, Printer, Save, Check
} from 'lucide-react';
import { MBTIType } from '../types/psychometrics';
import { TOPICS_LIST } from '../data/topics';
import { PERSONALITY_METAS, generateBaselineChapter } from '../data/personalityProfiles';
import { 
  getAllParticipants, ParticipantRecord, getAdminConfig, 
  saveAdminConfig, updateParticipantStatus 
} from '../services/participantService';
import { AdminParticipantReportModal } from './AdminParticipantReportModal';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Admin WhatsApp Settings
  const [adminPhone, setAdminPhone] = useState('6281234567890');
  const [phoneSaved, setPhoneSaved] = useState(false);

  // Participants list
  const [participants, setParticipants] = useState<ParticipantRecord[]>([]);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantRecord | null>(null);

  // Tabs
  const [adminTab, setAdminTab] = useState<'participants' | 'settings' | 'ai-testing'>('participants');

  // Test generator state
  const [testType, setTestType] = useState<MBTIType>('INTJ');
  const [testTopicCode, setTestTopicCode] = useState('01');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminConfig();
      loadParticipants();
    }
  }, [isAuthenticated]);

  const loadAdminConfig = async () => {
    const cfg = await getAdminConfig();
    if (cfg && cfg.adminPhone) {
      setAdminPhone(cfg.adminPhone);
    }
  };

  const loadParticipants = async () => {
    setIsLoadingParticipants(true);
    const list = await getAllParticipants();
    setParticipants(list);
    setIsLoadingParticipants(false);
  };

  const handleSavePhone = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveAdminConfig(adminPhone);
    setPhoneSaved(true);
    setTimeout(() => setPhoneSaved(false), 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'bajuri39') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Kata sandi admin salah! Akses ditolak.');
    }
  };

  const handleStatusUpdated = (id: string, newStatus: 'sent' | 'pending') => {
    setParticipants(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    if (selectedParticipant && selectedParticipant.id === id) {
      setSelectedParticipant(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleRunTestGeneration = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const topic = TOPICS_LIST.find(t => t.kode === testTopicCode);
      const res = await fetch('/api/generate-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: testType,
          topicCode: testTopicCode,
          topicTitle: topic?.judul || 'Topik',
          subjectName: 'Subjek Uji',
          contextDetail: 'Uji sistem administrasi Pak GuruAI'
        })
      });

      if (!res.ok) {
        throw new Error('API server mengembalikan status ' + res.status);
      }
      const data = await res.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch {
      const fallback = generateBaselineChapter(testType, testTopicCode, 'Subjek Uji');
      const testJson = {
        tipe_kepribadian: testType,
        julukan: PERSONALITY_METAS[testType].name,
        peran_arketipe: PERSONALITY_METAS[testType].role,
        bab: fallback,
        metadata: {
          engine: 'Pak GuruAI Engine (Local Preset)',
          copyright: '@copyright by. Pak GuruAI'
        }
      };
      setTestResult(JSON.stringify(testJson, null, 2));
    } finally {
      setIsTesting(false);
    }
  };

  const filteredParticipants = participants.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.fullName.toLowerCase().includes(q) ||
           p.phone.includes(q) ||
           p.mbtiType.toLowerCase().includes(q);
  });

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                {isAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Konsol Admin Pak GuruAI</span>
                  {isAuthenticated && (
                    <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      Terautentikasi (Server Connected)
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400">
                  Pengaturan WhatsApp, database peserta, & pengiriman laporan lengkap PDF
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-3 py-1.5 rounded-xl hover:bg-slate-800 text-xs font-semibold cursor-pointer"
            >
              Tutup
            </button>
          </div>

          {/* Login Screen if not authenticated */}
          {!isAuthenticated ? (
            <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/20">
                <KeyRound className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white">Masukkan Password Admin</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Masukkan password otorisasi untuk mengakses database peserta dan pengaturan WhatsApp.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Password admin..."
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-center font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />

                {errorMsg && (
                  <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition cursor-pointer"
                >
                  Masuk ke Konsol Admin
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* Admin Tabs */}
              <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900/40">
                <button
                  onClick={() => setAdminTab('participants')}
                  className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 ${
                    adminTab === 'participants'
                      ? 'bg-slate-900 text-white border-indigo-500'
                      : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                >
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Daftar Peserta Tes ({participants.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('settings')}
                  className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 ${
                    adminTab === 'settings'
                      ? 'bg-slate-900 text-white border-indigo-500'
                      : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Pengaturan WhatsApp Admin</span>
                </button>

                <button
                  onClick={() => setAdminTab('ai-testing')}
                  className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer border-b-2 ${
                    adminTab === 'ai-testing'
                      ? 'bg-slate-900 text-white border-indigo-500'
                      : 'text-slate-400 hover:text-white border-transparent'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>Uji Engine AI & JSON</span>
                </button>
              </div>

              {/* Tab 1: Peserta Tes */}
              {adminTab === 'participants' && (
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  
                  {/* Search and refresh toolbar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari nama peserta, no HP, atau tipe..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <button
                      onClick={loadParticipants}
                      disabled={isLoadingParticipants}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-700 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingParticipants ? 'animate-spin' : ''}`} />
                      <span>Muat Ulang Data</span>
                    </button>
                  </div>

                  {/* List / Table */}
                  {filteredParticipants.length === 0 ? (
                    <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800/80 p-8 space-y-2">
                      <Users className="w-10 h-10 text-slate-600 mx-auto" />
                      <p className="text-sm font-bold text-slate-400">Belum ada peserta yang menyelesaikan tes</p>
                      <p className="text-xs text-slate-500">
                        Saat peserta mengisi form di landing page dan menyelesaikan tes, hasilnya akan langsung muncul di sini.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredParticipants.map((p) => {
                        const meta = PERSONALITY_METAS[p.mbtiType];
                        const cleanP = p.phone.replace(/[^0-9]/g, '');
                        const waNum = cleanP.startsWith('0') ? '62' + cleanP.slice(1) : cleanP;

                        return (
                          <div
                            key={p.id}
                            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white">
                                  {p.mbtiType}
                                </span>
                                <h4 className="text-sm font-bold text-white">
                                  {p.fullName}
                                </h4>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  p.status === 'sent'
                                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                                }`}>
                                  {p.status === 'sent' ? 'Sudah Dikirim WA' : 'Belum Dikirim'}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                                <span>Lahir: {p.birthDate}</span>
                                <span className="text-slate-600">•</span>
                                <span className="font-mono text-emerald-400">WA: {p.phone}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-500">
                                  {new Date(p.createdAt).toLocaleDateString('id-ID', {
                                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                              <button
                                onClick={() => setSelectedParticipant(p)}
                                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Lihat Laporan Lengkap</span>
                              </button>

                              <a
                                href={`https://wa.me/${waNum}?text=${encodeURIComponent(
                                  `Halo Kak *${p.fullName}*, berikut laporan lengkap psikometri Carl Jung 16 Tipe Pak GuruAI untuk tipe *${p.mbtiType}* (${meta?.name})...\n\n@copyright by. Pak GuruAI`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => updateParticipantStatus(p.id, 'sent')}
                                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                                title="Buka chat WhatsApp langsung"
                              >
                                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                                <span>Kirim WA</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

              {/* Tab 2: Settings WhatsApp Admin */}
              {adminTab === 'settings' && (
                <div className="flex-1 overflow-y-auto p-6 max-w-xl mx-auto w-full space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Nomor WhatsApp Admin</h4>
                        <p className="text-xs text-slate-400">
                          Nomor ini akan muncul di halaman hasil peserta untuk menerima permintaan laporan lengkap PDF.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSavePhone} className="space-y-4 pt-2">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Nomor WhatsApp Admin (dengan kode negara, misal 628xxx atau 08xxx):
                        </label>
                        <input
                          type="text"
                          required
                          value={adminPhone}
                          onChange={(e) => setAdminPhone(e.target.value)}
                          placeholder="Contoh: 6281234567890"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      {phoneSaved && (
                        <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-xs text-emerald-400 font-bold flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>Nomor WhatsApp admin berhasil disimpan ke database Server!</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Nomor WhatsApp Admin</span>
                      </button>
                    </form>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                      <p className="font-bold text-slate-300">Bagaimana alurnya?</p>
                      <p>1. Peserta menyelesaikan tes di landing page.</p>
                      <p>2. Hanya keluar hasil singkat (seperti INFJ saja).</p>
                      <p>3. Peserta mengklik tombol WhatsApp untuk meminta laporan lengkap PDF ke nomor admin di atas.</p>
                      <p>4. Admin melihat data peserta di tab Daftar Peserta dan mengirimkan berkas PDF langsung ke nomor WA peserta.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Uji Coba AI & JSON */}
              {adminTab === 'ai-testing' && (
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Play className="w-4 h-4 text-emerald-400" />
                        <span>Uji Coba Generasi Mesin JSON Langsung</span>
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 font-medium block mb-1">
                          Pilih Tipe Kepribadian:
                        </label>
                        <select
                          value={testType}
                          onChange={(e) => setTestType(e.target.value as MBTIType)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {Object.keys(PERSONALITY_METAS).map((t) => (
                            <option key={t} value={t}>
                              {t} — {PERSONALITY_METAS[t as MBTIType].name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 font-medium block mb-1">
                          Pilih Bab (dari 22 Bab):
                        </label>
                        <select
                          value={testTopicCode}
                          onChange={(e) => setTestTopicCode(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {TOPICS_LIST.map((topic) => (
                            <option key={topic.kode} value={topic.kode}>
                              Bab {topic.kode}: {topic.judul}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleRunTestGeneration}
                      disabled={isTesting}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isTesting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Mengeksekusi Model Gemini...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Jalankan Analisis Bab Ini</span>
                        </>
                      )}
                    </button>

                    {testResult && (
                      <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-mono text-emerald-400">Respons JSON Valid:</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(testResult)}
                            className="text-xs text-indigo-400 hover:underline cursor-pointer"
                          >
                            Salin Hasil
                          </button>
                        </div>
                        <pre className="p-4 rounded-xl bg-slate-950 font-mono text-[11px] text-emerald-300 max-h-60 overflow-auto border border-slate-800">
                          {testResult}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Footer Admin Console */}
          <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-500">
            <span className="font-mono">@copyright by. Pak GuruAI</span>
            <span>Akses Khusus Admin Terverifikasi</span>
          </div>

        </div>
      </div>

      {/* Modal Laporan Lengkap Peserta */}
      <AdminParticipantReportModal
        participant={selectedParticipant}
        onClose={() => setSelectedParticipant(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    </>
  );
};
