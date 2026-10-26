import React, { useState } from 'react';
import { MBTIType } from '../types/psychometrics';
import { PERSONALITY_METAS } from '../data/personalityProfiles';
import { Send, Bot, User, Sparkles, MessageSquare, Lightbulb, RefreshCw } from 'lucide-react';

interface ConsultantChatProps {
  currentType: MBTIType;
  subjectName?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const ConsultantChat: React.FC<ConsultantChatProps> = ({
  currentType,
  subjectName = 'Kamu'
}) => {
  const meta = PERSONALITY_METAS[currentType];
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Halo ${subjectName}. Saya konsultan psikometri Pak GuruAI. Sebagai ${meta.name} (${currentType}), saya hadir untuk mendengarkan situasimu dengan hangat dan tanpa menghakimi. Apakah ada dilema di pekerjaan, relasi romantis, keluarga, atau ritme energimu yang ingin kita bahas bersama hari ini?`,
      timestamp: 'Baru saja'
    }
  ]);

  const quickPrompts = [
    `Bagaimana caraku mengatasi kelelahan sosial saat harus memimpin rapat besar?`,
    `Pasanganku bertipe Feeling yang sensitif, bagaimana cara menyampaikan kritik tanpa menyakiti hatinya?`,
    `Aku sering terjebak perfeksionisme hingga menunda proyek penting. Apa langkah pertamaku?`,
    `Bagaimana cara menetapkan batasan dengan mertua atau keluarga besar secara santun?`
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: currentType,
          question: textToSend,
          subjectName: subjectName
        })
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi mesin konsultan');
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.answer || 'Mohon maaf, terjadi kendala saat memproses jawaban.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      const fallbackReply = `Terima kasih sudah berbagi secara terbuka, ${subjectName}.\n\nSebagai ${meta.name} (${currentType}), sangat wajar jika kamu merasakan hal ini. Fungsi dominanmu (${meta.cognitiveFunctions.dominan}) cenderung ingin menyelesaikan situasi dengan kejelasan sempurna, sementara fungsi inferiormu (${meta.cognitiveFunctions.inferior}) mungkin sedang merasa kewalahan.\n\nTitik buta yang perlu kamu waspadai adalah kecenderungan menanggung semuanya sendiri di dalam kepala hingga bateraimu habis.\n\nLangkah konkret 4 tahap untukmu hari ini:\n1. Bernapaslah perlahan dan akui bahwa perasaan lelah atau cemas ini valid adanya.\n2. Tuliskan bebanmu di kertas untuk mengeluarkannya dari kepala ke media fisik.\n3. Ambil satu tindakan mikro yang bisa kamu selesaikan dalam 10 menit ke depan.\n4. Berikan dirimu izin untuk beristirahat tanpa rasa bersalah malam ini.\n\n@copyright by. Pak GuruAI`;
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Bot className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
          Ruang Konsultasi Pak GuruAI
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-1">
          Konseling psikometri empatik dan solusi praktis terkalibrasi khusus untuk tipe {currentType} ({meta.name}).
        </p>

        {/* Quick prompt recommendations */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={isLoading}
              className="text-xs bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-full transition cursor-pointer text-left flex items-center gap-1.5"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate max-w-xs">{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col h-[520px] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                {m.text}
                <div
                  className={`text-[10px] mt-2 ${
                    m.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs text-slate-500 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                <span>Pak GuruAI sedang merenungkan jawaban yang hangat untukmu...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan hal apa pun seputar dinamika dirimu, relasi, karier, atau konflik..."
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/25 transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Kirim</span>
          </button>
        </div>
      </div>
    </div>
  );
};
