/* DevelopedByCaleb */
import { useState, useEffect } from 'react';
import { ChevronDown, Lock, WifiOff, Loader2 } from 'lucide-react';
import { FloatingTabBar, type TabId } from './components/FloatingTabBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { WatchlistScreen } from './components/screens/WatchlistScreen';
import { BihasaScreen } from './components/screens/BihasaScreen';
import { BrainScreen } from './components/screens/BrainScreen';
import { StockDetailScreen } from './components/screens/StockDetailScreen';
import { AdvancedChartScreen } from './components/screens/AdvancedChartScreen';
import type { TrendingCardData } from './components/TrendingCard';

const APP_ASSETS = { kabanLogoUrl: "", bihasaLogoUrl: "" };

const pseiData = { value: 6842.34, change: 45.67, changePercent: 0.67, trend: 'up' as const, volume: '₱12.4B', advancers: 78, decliners: 43, unchanged: 26 };
const generalMarketBihasa = { insights: ["Market shows resilience amidst rate hike fears.", "Tech sector leading volume trades."], marketDeepDive: { sectors: [], catalysts: [], risks: [], outlook: '' } };

const TRENDING_STOCKS: TrendingCardData[] = [
  {
    ticker: '$TEL', name: 'PLDT Inc.', price: 1342.0, change: -5.5, changePercent: -0.41, dayHigh: 1355.0, dayLow: 1338.0, trend: 'down', sector: 'Telecom',
    sparkline: [1350, 1348, 1352, 1347, 1345, 1348, 1343, 1344, 1342, 1342], insights: ["Heavy foreign selling detected", "Support holding at 1340"], deepDive: { technical: ["RSI showing oversold conditions", "MACD bearish crossover"], fundamental: ["P/E remains attractive", "Strong dividend history"], sources: ["PSE EDGE", "Bihasa AI Sentiment"] }, historicalEcho: { date: 'Oct 2023', description: 'Similar volume pattern before a 5% rally.', similarity: 88 }
  }
];

function MarketHeader() {
  const [greeting, setGreeting] = useState('Magandang Araw');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const honorific = 'Lakan'; 
  const preferredName = 'User';

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) setGreeting('Magandang Umaga');
    else if (hour >= 12 && hour < 18) setGreeting('Magandang Hapon');
    else setGreeting('Magandang Gabi');
  }, []);

  const markets = [
    { id: 'pse', name: 'Philippine Stock Exchange', flag: '🇵🇭', active: true },
    { id: 'us', name: 'US Markets (NYSE/NASDAQ)', flag: '🇺🇸', active: false },
    { id: 'crypto', name: 'Cryptocurrency', flag: '🪙', active: false },
    { id: 'global', name: 'Global Equities', flag: '🌍', active: false },
  ];

  return (
    <div className="pt-12 px-6 pb-6 bg-[#0D0D0D] border-b border-white/5 relative z-50 flex-shrink-0">
       <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] overflow-hidden">
             {APP_ASSETS.kabanLogoUrl ? <img src={APP_ASSETS.kabanLogoUrl} alt="Kaban" className="w-full h-full object-cover" /> : <span className="text-[#0D0D0D] font-black text-lg leading-none mt-0.5">K</span>}
          </div>
          <span className="text-xl font-black tracking-widest uppercase text-white">Kaban</span>
       </div>

       <div className="relative mb-6">
         <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 px-4 py-3 bg-[#161616] border border-white/10 rounded-2xl hover:bg-white/5 active:scale-[0.98] transition-all w-full text-left">
            <div className="w-7 h-7 rounded-full bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/30 overflow-hidden text-[12px] shadow-inner">🇵🇭</div>
            <div className="flex-1">
               <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Active Market</p>
               <p className="text-[13px] font-bold text-white mt-0.5 tracking-wide">Philippine Stock Exchange</p>
            </div>
            <div className="p-1.5 bg-white/5 rounded-full"><ChevronDown size={14} className={`text-[#D4AF37] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} /></div>
         </button>
         {isDropdownOpen && (
           <div className="absolute top-full left-0 right-0 mt-2 bg-[#161616] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
             {markets.map((m) => (
               <button key={m.id} disabled={!m.active} className={`w-full flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 transition-colors ${m.active ? 'hover:bg-white/5 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}>
                 <div className="flex items-center gap-3"><span className="text-lg">{m.flag}</span><span className={`text-[13px] font-bold tracking-wide ${m.active ? 'text-white' : 'text-white/60'}`}>{m.name}</span></div>
                 {!m.active && <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-md border border-white/5"><Lock size={10} className="text-white/40" /><span className="text-[8px] font-bold uppercase tracking-widest text-white/40">Stage 2</span></div>}
                 {m.active && <div className="w-1.5 h-1.5 rounded-full bg-[#00A86B] shadow-[0_0_8px_#00A86B]" />}
               </button>
             ))}
           </div>
         )}
       </div>

       <div>
          <h2 className="text-2xl font-black text-white/90 tracking-tight">{greeting},</h2>
          <div className="flex items-center gap-1.5 mt-1"><span className="text-white font-bold text-lg">{honorific} {preferredName}</span></div>
       </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('kaban');
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(['$SM']));
  const [stockHistory, setStockHistory] = useState<string[]>([]);
  const [isPopping, setIsPopping] = useState(false); 
  const [advancedChartStock, setAdvancedChartStock] = useState<string | null>(null);
  
  const [isOnline, setIsOnline] = useState(true); 
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAppLoading(false), 1200);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleWatch = (ticker: string) => setWatchlist((prev) => { const next = new Set(prev); if (next.has(ticker)) next.delete(ticker); else next.add(ticker); return next; });
  const handleSelectStock = (ticker: string) => setStockHistory(prev => [...prev, ticker]);

  const handleBack = () => {
    if (isPopping || stockHistory.length === 0) return;
    setIsPopping(true);
    setTimeout(() => {
      setStockHistory((prev) => prev.slice(0, -1));
      setIsPopping(false);
    }, 400); 
  };

  if (isAppLoading) {
    return (
      <div className="h-[100dvh] w-full bg-[#0D0D0D] flex flex-col items-center justify-center gap-4">
         <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse"><span className="text-[#0D0D0D] font-black text-2xl leading-none mt-1">K</span></div>
         <div className="flex items-center gap-2 text-white/50"><Loader2 size={14} className="animate-spin" /><span className="text-[10px] font-bold tracking-widest uppercase">Loading Secure Cache...</span></div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] w-full bg-[#0D0D0D] text-white selection:bg-[#D4AF37]/30 overflow-hidden relative flex justify-center">
      <div className="w-full max-w-md relative h-full flex flex-col bg-[#0D0D0D] shadow-2xl overflow-hidden">

        {activeTab === 'kaban' && <MarketHeader />}
        
        {activeTab !== 'kaban' && (
          <div className="flex items-center justify-center pt-14 pb-3 bg-[#0D0D0D] border-b border-white/5 flex-shrink-0 z-10 relative">
            <span className="text-[#D4AF37] text-[11px] font-bold tracking-widest uppercase">{activeTab}</span>
          </div>
        )}

        {!isOnline && (
           <div className="bg-red-500/10 border-b border-red-500/20 py-2 px-4 flex items-center justify-center gap-2 z-40 relative backdrop-blur-md">
              <WifiOff size={12} className="text-red-500" />
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Offline · Viewing Cached Data</span>
           </div>
        )}

        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-[100px] scroll-smooth">
          {activeTab === 'kaban' && <HomeScreen stocks={TRENDING_STOCKS} watchlist={watchlist} onToggleWatch={toggleWatch} generalBihasa={generalMarketBihasa} onViewAllTrending={() => setActiveTab('discover')} onManageWatchlist={() => setActiveTab('watchlist')} onSelectStock={handleSelectStock} />}
          {activeTab === 'discover' && <DiscoverScreen onSelectStock={handleSelectStock} />}
          {activeTab === 'bihasa' && <BihasaScreen generalBihasa={generalMarketBihasa} />}
          {activeTab === 'watchlist' && <WatchlistScreen stocks={TRENDING_STOCKS} watchlist={watchlist} onToggleWatch={toggleWatch} onSelectStock={handleSelectStock} />}
          {activeTab === 'brain' && <BrainScreen />}
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-40 pointer-events-none flex justify-center">
            <FloatingTabBar activeTab={activeTab} onTabChange={setActiveTab} watchlistCount={watchlist.size} pseiData={pseiData} />
        </div>

        <div className="absolute inset-0 z-50 pointer-events-none">
          <style>{`@keyframes slideInRightPremium { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
          {stockHistory.map((ticker, index) => {
            const isTop = index === stockHistory.length - 1;
            const isLeaving = isTop && isPopping;
            const isUnderneath = index === stockHistory.length - 2;

            return (
              <div
                key={`${ticker}-${index}`}
                className={`absolute inset-0 bg-[#0D0D0D] pointer-events-auto shadow-[-20px_0_50px_rgba(0,0,0,0.5)]`}
                style={{
                  transform: isLeaving ? 'translateX(100%)' : (isUnderneath && !isPopping) ? 'translateX(-30%)' : (index < stockHistory.length - 2) ? 'translateX(-30%)' : 'translateX(0)',
                  transition: 'transform 400ms cubic-bezier(0.32, 0.72, 0, 1)',
                  animation: (isTop && !isPopping) ? 'slideInRightPremium 400ms cubic-bezier(0.32, 0.72, 0, 1) forwards' : 'none',
                }}
              >
                <StockDetailScreen stock={ticker} onBack={handleBack} onJump={handleSelectStock} onOpenAdvanced={setAdvancedChartStock} bihasaLogoUrl={APP_ASSETS.bihasaLogoUrl} />
              </div>
            );
          })}
        </div>

        {advancedChartStock && <AdvancedChartScreen stock={advancedChartStock} onBack={() => setAdvancedChartStock(null)} />}

      </div>
    </div>
  );
}