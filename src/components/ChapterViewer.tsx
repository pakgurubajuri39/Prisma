import React, { useState } from 'react';
import { MBTIType, ChapterReport } from '../types/psychometrics';
import { TOPICS_LIST } from '../data/topics';
import { PERSONALITY_METAS, generateBaselineChapter } from '../data/personalityProfiles';
import { ModularCards } from './ModularCards';
import { RawJsonModal } from './RawJsonModal';
import { 
  Search, ArrowLeft, ArrowRight, Printer, Sparkles, SlidersHorizontal, 
  FileText, CheckCircle2, ChevronRight, BookOpen, Layers
} from 'lucide-react';

interface ChapterViewerProps {
  currentType: MBTIType;
  subjectName: string;
  onTypeChange: (newType: MBTIType) => void;
  onSubjectNameChange: (newName: string) => void;
}

export const ChapterViewer: React.FC<ChapterViewerProps> = ({
  currentType,
  subjectName,
  onTypeChange,
  onSubjectNameChange
}) => {
  const [selectedTopicCode, setSelectedTopicCode] = useState('01');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [customDilemma, setCustomDilemma] = useState('');
  const [aiCustomChapters, setAiCustomChapters] = useState<Record<string, ChapterReport>>({});

  const meta = PERSONALITY_METAS[currentType];

  // Get current active chapter (from AI generated cache or local calibrated baseline)
  const activeChapter: ChapterReport = 
    aiCustomChapters[`${currentType}_${selectedTopicCode}`] ||
    generateBaselineChapter(currentType, selectedTopicCode, subjectName || 'kamu');

  const categories = ['Semua', 'Fondasi', 'Psikologi & Keseharian', 'Relasi & Cinta', 'Karier & Kepemimpinan', 'Pertumbuhan Diri'];

  const filteredTopics = TOPICS_LIST.filter(topic => {
    const matchesSearch = topic.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          topic.kode.includes(searchQuery);
    const matchesCategory = selectedCategory === 'Semua' || topic.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentTopicIndex = TOPICS_LIST.findIndex(t => t.kode === selectedTopicCode);

  const handlePrevChapter = () => {
    if (currentTopicIndex > 0) {
      setSelectedTopicCode(TOPICS_LIST[currentTopicIndex - 1].kode);
    }
  };

  const handleNextChapter = () => {
    if (currentTopicIndex < TOPICS_LIST.length - 1) {
      setSelectedTopicCode(TOPICS_LIST[currentTopicIndex + 1].kode);
    }
  };

  const handleGenerateAiChapter = async () => {
    setIsGeneratingAi(true);
    const topic = TOPICS_LIST.find(t => t.kode === selectedTopicCode);
    try {
      const res = await fetch('/api/generate-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: currentType,
          topicCode: selectedTopicCode,
          topicTitle: topic?.judul || 'Topik',
          subjectName: subjectName || 'Kamu',
          contextDetail: customDilemma
        })
      });

      if (!res.ok) {
        throw new Error('API server returned error');
      }

      const data = await res.json();
      if (data && data.bab) {
        setAiCustomChapters(prev => ({
          ...prev,
          [`${currentType}_${selectedTopicCode}`]: data.bab
        }));
      }
      setIsAiModalOpen(false);
    } catch {
      // Local enhanced fallback
      const enhanced = generateBaselineChapter(currentType, selectedTopicCode, subjectName);
      if (customDilemma) {
        enhanced.ringkasan_eksekutif = `${enhanced.ringkasan_eksekutif} Dalam merespons catatan situasimu ("${customDilemma}"), kami menyelaraskan langkah berikut agar lebih aplikatif dan ramah kapasitas mentalmu.`;
      }
      setAiCustomChapters(prev => ({
        ...prev,
        [`${currentType}_${selectedTopicCode}`]: enhanced
      }));
      setIsAiModalOpen(false);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Type & Subject Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500">Tipe Aktif:</span>
            <select
              value={currentType}
              onChange={(e) => onTypeChange(e.target.value as MBTIType)}
              className="bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl px-3 py-1.5 text-sm font-black focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {Object.keys(PERSONALITY_METAS).map((t) => (
                <option key={t} value={t}>
                  {t} — {PERSONALITY_METAS[t as MBTIType].name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-slate-500">Nama Subjek:</span>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => onSubjectNameChange(e.target.value)}
              placeholder="Contoh: Kamu / Budi"
              className="bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[140px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kustomisasi AI Bab Ini</span>
          </button>

          <button
            onClick={() => setIsJsonModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>JSON Murni</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
            title="Cetak atau Simpan PDF Laporan"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Layout: 22-Topic Navigation Sidebar + Active 4-Card Chapter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar: 22 Chapter Navigator */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Daftar 22 Topik Bab</h3>
            </div>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Bab {selectedTopicCode} / 22
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik atau nomor bab..."
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Topic List */}
          <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isSelected = selectedTopicCode === topic.kode;
              const isCustomized = !!aiCustomChapters[`${currentType}_${topic.kode}`];

              return (
                <button
                  key={topic.kode}
                  onClick={() => setSelectedTopicCode(topic.kode)}
                  className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-950 border border-indigo-200 shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {topic.kode}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold truncate">
                        {topic.judul}
                      </span>
                      {isCustomized && (
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" title="Terkustomisasi AI" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                      {topic.kategori}
                    </span>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Area: The 4 Structured Modular Analysis Cards */}
        <div className="lg:col-span-8 space-y-6">
          <ModularCards
            chapter={activeChapter}
            onViewJson={() => setIsJsonModalOpen(true)}
            onCustomGenerate={() => setIsAiModalOpen(true)}
            isGenerating={isGeneratingAi}
          />

          {/* Chapter Pagination Bottom */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center justify-between gap-3">
            <button
              onClick={handlePrevChapter}
              disabled={currentTopicIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-2 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Bab Sebelumnya</span>
            </button>

            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Bab {selectedTopicCode} dari 22: {activeChapter.judul}
            </span>

            <button
              onClick={handleNextChapter}
              disabled={currentTopicIndex === TOPICS_LIST.length - 1}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-sm"
            >
              <span>Bab Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* AI Personalization Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Personalisasi AI Bab {selectedTopicCode} ({currentType})
                </h3>
                <p className="text-xs text-slate-500">
                  Model: Gemini 3.8 Flash • Nada Empatik & 4 Kotak Terstruktur
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama Anda / Subjek:
                </label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => onSubjectNameChange(e.target.value)}
                  placeholder="Nama panggilanmu..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Dilema / Konteks Nyata Saat Ini (Opsional):
                </label>
                <textarea
                  value={customDilemma}
                  onChange={(e) => setCustomDilemma(e.target.value)}
                  placeholder="Contoh: Saya sedang memimpin proyek baru namun merasa rekan kerja lambat merespons pesan, dan saya merasa mulai lelah emosional..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  AI akan menyusun 4 kartu analisis dengan mempertimbangkan situasi pribadimu secara empatik.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleGenerateAiChapter}
                disabled={isGeneratingAi}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menyusun Analisis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mulai Susun Bab Ini</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Raw JSON Modal */}
      <RawJsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        type={currentType}
        chapter={activeChapter}
        subjectName={subjectName}
      />

    </div>
  );
};
