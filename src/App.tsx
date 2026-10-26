/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MBTIType, RegistrationFormData } from './types/psychometrics';
import { Navbar, ActiveTab } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AssessmentTest } from './components/AssessmentTest';
import { CompatibilityMatrixView } from './components/CompatibilityMatrixView';
import { ConsultantChat } from './components/ConsultantChat';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { PERSONALITY_METAS } from './data/personalityProfiles';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [currentType, setCurrentType] = useState<MBTIType>('INFJ');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Data pendaftaran peserta dari Landing Page (termasuk mode couple jika dipilih)
  const [participantData, setParticipantData] = useState<RegistrationFormData | null>(null);

  const handleStartTest = (data: RegistrationFormData) => {
    setParticipantData(data);
    setActiveTab('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeTest = () => {
    setParticipantData(null);
    setActiveTab('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Top Welcome Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white text-xs py-2.5 px-4 no-print border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-amber-300">PRISMA-16™</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 hidden sm:inline">
              Pemetaan Potensi Kognitif & Kompas Batin 16 Arketipe Carl Jung
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <span className="bg-slate-900/80 px-2.5 py-0.5 rounded-md border border-slate-700 text-slate-300">
              Backend Server Internal
            </span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-300 hover:text-white font-medium cursor-pointer flex items-center gap-1"
            >
              <span>Portal Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentType={currentType}
        onTypeChange={setCurrentType}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Landing Page (dengan Form Pendaftaran) */}
        {activeTab === 'landing' && (
          <LandingPage onStartTest={handleStartTest} />
        )}

        {/* Instrumen Tes Psikometri (Aktif setelah mengisi form) */}
        {activeTab === 'test' && (
          participantData ? (
            <AssessmentTest
              participantData={participantData}
              onRetake={handleRetakeTest}
            />
          ) : (
            <div className="max-w-xl mx-auto text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Silakan lengkapi formulir pendaftaran terlebih dahulu
              </h3>
              <p className="text-xs text-slate-500">
                Nama lengkap, tanggal lahir, dan nomor WhatsApp diperlukan agar hasil tes psikometrimu dapat diproses secara resmi.
              </p>
              <button
                onClick={() => setActiveTab('landing')}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs cursor-pointer hover:bg-indigo-700 transition"
              >
                Isi Form Pendaftaran Sekarang
              </button>
            </div>
          )
        )}

        {/* Matriks Kompatibilitas 16 Tipe */}
        {activeTab === 'matrix' && (
          <CompatibilityMatrixView
            currentType={currentType}
            onSelectType={setCurrentType}
          />
        )}

        {/* Ruang Konsultasi Pak GuruAI */}
        {activeTab === 'consultant' && (
          <ConsultantChat
            currentType={currentType}
            subjectName={participantData?.fullName || 'Kamu'}
          />
        )}

      </main>

      {/* Admin Panel Modal (Settings WA, Database Peserta, Kirim PDF) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Footer Wajib: @copyright by. Pak GuruAI */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

    </div>
  );
}
