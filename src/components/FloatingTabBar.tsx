import { 
  BriefcaseBusiness, // closest to "vault.fill"
  TrendingUp, 
  Star, 
  BrainCircuit 
} from 'lucide-react';

export type TabId = 'kaban' | 'discover' | 'bihasa' | 'watchlist' | 'brain';

interface FloatingTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  watchlistCount: number;
  pseiData: {
    value: number;
    change: number;
    changePercent: number;
    trend: 'up' | 'down';
  };
}

export function FloatingTabBar({ activeTab, onTabChange, watchlistCount, pseiData }: FloatingTabBarProps) {
  return (
    /* The pointer-events-auto makes only the bar clickable, allowing scrolling on the sides */
    <div className="pointer-events-auto relative w-full">
      
      {/* Background blur container with border radius from the spec */}
      <div className="rounded-[28px] bg-black/40 backdrop-blur-[24px] border-t border-[#D4AF37]/30 border-l border-r border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* ── Accessory Shelf (Market Pulse) - 32pt height ── */}
        <div className="h-[32px] flex items-center justify-between px-5 border-b border-white/10 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent">
          <div className="text-[11px] font-semibold tracking-wide flex items-center gap-2">
            <span className="text-[#D4AF37]">PSEi: {pseiData.value.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            <span className="text-[#00A86B]">▲ {pseiData.changePercent}% (+{pseiData.change})</span>
          </div>
          
          {/* Mini Sparkline Graphic */}
          <svg className="h-4 w-14 text-[#D4AF37]" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="0,15 20,12 40,16 60,8 80,10 100,2" />
          </svg>
        </div>

        {/* ── Main Tab Row ── */}
        <div className="h-[64px] flex items-center justify-between px-2 relative">
          
          {/* Tab 1: Kaban */}
          <TabButton 
            id="kaban" 
            label="Kaban" 
            icon={<BriefcaseBusiness size={22} />} 
            isActive={activeTab === 'kaban'} 
            onClick={() => onTabChange('kaban')} 
            activeColor="text-[#D4AF37]"
          />

          {/* Tab 2: Discover */}
          <TabButton 
            id="discover" 
            label="Discover" 
            icon={<TrendingUp size={22} />} 
            isActive={activeTab === 'discover'} 
            onClick={() => onTabChange('discover')} 
            activeColor="text-[#00A86B]" 
          />

          {/* Center CTA Anchor Space */}
          <div className="w-[72px]" />

          {/* Tab 4: Watchlist */}
          <TabButton 
            id="watchlist" 
            label="Watchlist" 
            icon={<Star size={22} />} 
            isActive={activeTab === 'watchlist'} 
            onClick={() => onTabChange('watchlist')} 
            badge={watchlistCount}
          />

          {/* Tab 5: The Brain */}
          <TabButton 
            id="brain" 
            label="The Brain" 
            icon={<BrainCircuit size={22} />} 
            isActive={activeTab === 'brain'} 
            onClick={() => onTabChange('brain')} 
          />
        </div>
      </div>

      {/* ── Center BIHASA CTA (Overlapping) ── */}
      <div className="absolute left-1/2 -top-6 -translate-x-1/2 flex flex-col items-center">
        <button 
          onClick={() => onTabChange('bihasa')}
          className="relative group flex items-center justify-center"
        >
          {/* Outer glow/pulse ring */}
          <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-md scale-110 group-hover:scale-125 transition-transform animate-pulse-slow" />
          
          {/* Center Button */}
          <div className="w-16 h-16 rounded-full bg-[#0D0D0D] border-2 border-[#D4AF37] flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
             {/* Kaban Logo Vector */}
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
             </svg>
          </div>
        </button>
        <span className="text-[10px] font-semibold tracking-wider text-white/70 mt-1 uppercase">Bihasa</span>
      </div>
      
    </div>
  );
}

// ─── Helper Component for Individual Tabs ───
function TabButton({label, icon, isActive, onClick, badge, activeColor = "text-[#D4AF37]" }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 h-full transition-colors relative ${
        isActive ? activeColor : 'text-white/40 hover:text-white/70'
      }`}
    >
      <div className="relative">
        {icon}
        {badge > 0 && (
          <div className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border border-[#0D0D0D]">
            {badge}P
          </div>
        )}
      </div>
      <span className={`text-[10px] mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        {label}
      </span>
    </button>
  );
}