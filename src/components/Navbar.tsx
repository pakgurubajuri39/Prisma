import React from 'react';
import { MBTIType } from '../types/psychometrics';
import { 
  Heart, MessageSquare, Sparkles, 
  Lock, Home, Compass
} from 'lucide-react';

export type ActiveTab = 'landing' | 'test' | 'matrix' | 'consultant';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentType: MBTIType;
  onTypeChange: (type: MBTIType) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenAdmin
}) => {
  const tabs = [
    { id: 'landing' as ActiveTab, label: 'Beranda & Tes', icon: Home },
    { id: 'matrix' as ActiveTab, label: 'Compatibility Matrix', icon: Heart },
    { id: 'consultant' as ActiveTab, label: 'Tanya Konsultan', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand row */}
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & title with PRISMA-16 branding */}
          <button 
            onClick={() => onTabChange('landing')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition border border-indigo-400/30">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
                  PRISMA-16™
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 hidden sm:inline">
                  by Pak GuruAI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Pemetaan Potensi Kognitif & Kompas Batin 16 Arketipe
              </p>
            </div>
          </button>

          {/* Right Action buttons - Type selector pill completely removed per user request */}
          <div className="flex items-center gap-3">
            
            {/* Admin Console Quick Trigger without any password mention */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer border border-slate-700"
              title="Akses Portal Admin"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Portal Admin</span>
            </button>

          </div>
        </div>

        {/* Tab row */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-3 scrollbar-none pt-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
