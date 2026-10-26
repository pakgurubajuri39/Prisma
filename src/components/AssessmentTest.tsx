import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS } from '../data/questions';
import { MBTIType, RegistrationFormData } from '../types/psychometrics';
import { ArrowLeft, ArrowRight, HeartHandshake, User } from 'lucide-react';
import { SimpleResultTeaser } from './SimpleResultTeaser';
import { saveParticipantResult } from '../services/participantService';

interface AssessmentTestProps {
  participantData: RegistrationFormData;
  onRetake: () => void;
}

export const AssessmentTest: React.FC<AssessmentTestProps> = ({
  participantData,
  onRetake
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [resultType, setResultType] = useState<MBTIType | null>(null);
  const [dimensionPercentages, setDimensionPercentages] = useState<{
    pctE: number; pctI: number;
    pctS: number; pctN: number;
    pctT: number; pctF: number;
    pctJ: number; pctP: number;
  }>({ pctE: 50, pctI: 50, pctS: 50, pctN: 50, pctT: 50, pctF: 50, pctJ: 50, pctP: 50 });

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentIdx];

  const handleSelect = (choice: 'A' | 'B') => {
    const updated = { ...answers, [currentQ.id]: choice };
    setAnswers(updated);

    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (finalAnswers: Record<number, 'A' | 'B'>) => {
    let scoreE = 0, scoreI = 0;
    let scoreS = 0, scoreN = 0;
    let scoreT = 0, scoreF = 0;
    let scoreJ = 0, scoreP = 0;

    ASSESSMENT_QUESTIONS.forEach(q => {
      const ans = finalAnswers[q.id];
      if (!ans) return;
      const chosen = ans === 'A' ? q.opsiA : q.opsiB;

      if (chosen.dimensi === 'E') scoreE += chosen.bobot;
      if (chosen.dimensi === 'I') scoreI += chosen.bobot;
      if (chosen.dimensi === 'S') scoreS += chosen.bobot;
      if (chosen.dimensi === 'N') scoreN += chosen.bobot;
      if (chosen.dimensi === 'T') scoreT += chosen.bobot;
      if (chosen.dimensi === 'F') scoreF += chosen.bobot;
      if (chosen.dimensi === 'J') scoreJ += chosen.bobot;
      if (chosen.dimensi === 'P') scoreP += chosen.bobot;
    });

    const totalEI = scoreE + scoreI || 1;
    const totalSN = scoreS + scoreN || 1;
    const totalTF = scoreT + scoreF || 1;
    const totalJP = scoreJ + scoreP || 1;

    const pctI = Math.round((scoreI / totalEI) * 100);
    const pctE = 100 - pctI;

    const pctN = Math.round((scoreN / totalSN) * 100);
    const pctS = 100 - pctN;

    const pctT = Math.round((scoreT / totalTF) * 100);
    const pctF = 100 - pctT;

    const pctJ = Math.round((scoreJ / totalJP) * 100);
    const pctP = 100 - pctJ;

    const dim1 = pctI >= pctE ? 'I' : 'E';
    const dim2 = pctN >= pctS ? 'N' : 'S';
    const dim3 = pctT >= pctF ? 'T' : 'F';
    const dim4 = pctJ >= pctP ? 'J' : 'P';

    const calculated = `${dim1}${dim2}${dim3}${dim4}` as MBTIType;

    const calculatedScores = {
      pctE, pctI,
      pctS, pctN,
      pctT, pctF,
      pctJ, pctP
    };

    setDimensionPercentages(calculatedScores);
    setResultType(calculated);
    setIsFinished(true);

    // Simpan pendaftaran dan hasil tes ke Server
    saveParticipantResult({
      fullName: participantData.fullName,
      birthDate: participantData.birthDate,
      phone: participantData.phone,
      mbtiType: calculated,
      testMode: participantData.testMode,
      partnerData: participantData.partnerData,
      scores: calculatedScores
    }).catch(err => {
      console.error('Failed saving participant result:', err);
    });
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsFinished(false);
    setResultType(null);
    onRetake();
  };

  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  if (isFinished && resultType) {
    return (
      <SimpleResultTeaser
        type={resultType}
        participantData={participantData}
        scores={dimensionPercentages}
        onRetake={handleReset}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Participant Subheader */}
      <div className="flex items-center justify-between text-xs px-2">
        {participantData.testMode === 'couple' ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-rose-700 font-bold">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Analisis Pasangan: {participantData.fullName} & {participantData.partnerData?.partnerName}</span>
            </span>
            <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
              {participantData.partnerData?.relationshipStatus || 'Relasi'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-slate-700 font-bold">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>Peserta: {participantData.fullName}</span>
            </span>
            <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
              Tes Pribadi
            </span>
          </div>
        )}
      </div>

      {/* Progress Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span className="uppercase tracking-wider text-indigo-600 font-bold">
            Pertanyaan {currentIdx + 1} dari {totalQuestions}
          </span>
          <span>{progressPercent}% Selesai</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
          Dimensi {currentQ.dimensiTipe} • {currentQ.id <= 6 ? 'Energi Mental' : currentQ.id <= 12 ? 'Pemrosesan Fakta/Makna' : currentQ.id <= 18 ? 'Pengambilan Keputusan' : 'Gaya Hidup & Struktur'}
        </span>
        
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-4 leading-snug">
          {currentQ.pertanyaan}
        </h3>

        {/* Options */}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleSelect('A')}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
              answers[currentQ.id] === 'A'
                ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-sm'
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800'
            }`}
          >
            <span className={`w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 ${
              answers[currentQ.id] === 'A'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}>
              A
            </span>
            <span className="text-sm sm:text-base leading-relaxed flex-1">
              {currentQ.opsiA.teks}
            </span>
          </button>

          <button
            onClick={() => handleSelect('B')}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
              answers[currentQ.id] === 'B'
                ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-sm'
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800'
            }`}
          >
            <span className={`w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 ${
              answers[currentQ.id] === 'B'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}>
              B
            </span>
            <span className="text-sm sm:text-base leading-relaxed flex-1">
              {currentQ.opsiB.teks}
            </span>
          </button>
        </div>

        {/* Navigation bottom */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Pilihlah yang paling alami bagimu
          </span>

          <button
            onClick={() => setCurrentIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
            disabled={!answers[currentQ.id] || currentIdx === totalQuestions - 1}
            className="px-4 py-2 rounded-xl text-indigo-600 hover:text-indigo-800 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>Selanjutnya</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
