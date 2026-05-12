import { useRef, useState } from 'react';
import { ChevronRight, Sparkles, Star } from 'lucide-react';
import { CategoryChips } from '../CategoryChips';
import { TrendingCard } from '../TrendingCard';
import type { TrendingCardData } from '../TrendingCard';
import { MarketBihasa } from '../MarketBihasa';

const SECTOR_MAP: Record<string, string> = { 'Financials': 'financials', 'Property': 'property', 'Industrial': 'industrial', 'Telecom': 'telecom', 'Mining': 'mining' };

// ─── ADDED ROUTING PROPS ───
interface HomeScreenProps {
  stocks: TrendingCardData[];
  watchlist: Set<string>;
  onToggleWatch: (ticker: string) => void;
  generalBihasa: any;
  onViewAllTrending: () => void;
  onManageWatchlist: () => void;
  onSelectStock: (ticker: string) => void;
}

export function HomeScreen({ stocks, watchlist, onToggleWatch, generalBihasa, onViewAllTrending, onManageWatchlist, onSelectStock }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredStocks = activeCategory === 'all' ? stocks : stocks.filter((s) => SECTOR_MAP[s.sector ?? ''] === activeCategory);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    setActiveIndex(Math.round(scrollLeft / offsetWidth));
  };

  const scrollTo = (idx: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ left: idx * scrollRef.current.offsetWidth, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-0 pb-6">
      <div className="pt-2">
        <div className="flex items-center justify-between px-5 mb-2">
          <div><span className="text-white/90 text-[16px] font-bold tracking-wide">Trending Now</span><p className="text-[10px] text-white/40 tracking-wider uppercase font-medium mt-0.5">Most searched · Bihasa insights included</p></div>
          <button onClick={onViewAllTrending} className="flex items-center gap-1 min-h-[44px] px-2 -mr-2 group">
             <span className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors">View All</span>
             <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#F3E5AB] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
        <div className="mb-4"><CategoryChips active={activeCategory} onChange={(id) => { setActiveCategory(id); setActiveIndex(0); }} /></div>
        {filteredStocks.length === 0 ? (
          <div className="mx-5 py-12 text-center flex flex-col items-center justify-center bg-white/[0.02] rounded-2xl border border-white/5"><p className="text-[12px] text-white/40 tracking-wide">No trending stocks</p></div>
        ) : (
          <>
            <div className="w-full relative overflow-hidden">
              <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory" onScroll={handleScroll} style={{ scrollBehavior: 'smooth' }}>
                {filteredStocks.map((stock) => (
                  <div key={stock.ticker} className="flex-shrink-0 w-full px-4 snap-center snap-always">
                    <TrendingCard stock={stock} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-5">
              {filteredStocks.map((s, i) => (
                <button key={s.ticker} onClick={() => scrollTo(i)} className="flex items-center justify-center p-1 cursor-pointer" aria-label={`Go to card ${i + 1}`}>
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mx-6 my-6"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-white/90 text-[16px] font-bold tracking-wide">My Watchlist</span>
          <button onClick={onManageWatchlist} className="flex items-center gap-1 min-h-[44px] px-2 -mr-2 group">
             <span className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors">Manage</span>
             <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:text-[#F3E5AB] group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
        <div className="space-y-2">
          {stocks.map((stock) => (
            <WatchlistRow 
               key={stock.ticker} 
               stock={stock} 
               isWatched={watchlist.has(stock.ticker)} 
               isPositive={stock.trend === 'up'} 
               onToggle={() => onToggleWatch(stock.ticker)} 
               onSelect={() => onSelectStock(stock.ticker)}
            />
          ))}
        </div>
      </div>

      <div className="mx-6 my-6"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

      <div>
        <div className="px-5 mb-4">
          <div className="flex items-center gap-2 mb-1.5"><span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase shadow-[0_0_8px_rgba(212,175,55,0.1)]">AI Market Analysis</span><div className="flex items-center gap-1.5 ml-1"><Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /><span className="text-white/90 text-[14px] font-bold tracking-wide">Bihasa</span></div></div>
          <p className="text-[11px] text-white/40 font-light tracking-wide">Expert-grade read on today's full PSE market landscape</p>
        </div>
        <MarketBihasa insights={generalBihasa.insights} marketDeepDive={generalBihasa.marketDeepDive} />
      </div>

      <div className="py-6 text-center">
        <div className="flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity"><span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#00A86B] shadow-[0_0_8px_#00A86B]" /><span className="text-[9px] text-white font-medium tracking-widest uppercase">LIVE · PSE Real-time Data</span></div>
      </div>
    </div>
  );
}

// ─── UPGRADED: Clicks route to details, Star toggles watchlist ───
function WatchlistRow({ stock, isWatched, isPositive, onToggle, onSelect }: any) {
  const tColorClass = isPositive ? 'text-[#00A86B]' : 'text-[#EF4444]';
  return (
    <div onClick={onSelect} className={`w-full min-h-[64px] flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer group ${isWatched ? 'bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.05)]' : 'bg-[#0D0D0D]/60 backdrop-blur-xl border border-white/5 hover:border-white/10 hover:bg-white/5'}`}>
      <div className="flex items-center gap-3.5">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-colors ${isWatched ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40 shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'bg-white/5 border border-white/10'}`}>
          <span className={`text-[10px] font-bold tracking-wider ${isWatched ? 'text-[#D4AF37]' : 'text-white/50'}`}>{stock.ticker.replace('$', '').slice(0, 4)}</span>
        </div>
        <div className="text-left flex flex-col gap-1">
          <div className={`text-[14px] font-bold tracking-wide transition-colors ${isWatched ? 'text-[#D4AF37]' : 'text-white/90 group-hover:text-white'}`}>{stock.ticker}</div>
          <div className="text-[11px] text-white/40 font-medium tracking-wide">{stock.name}</div>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="text-right flex flex-col gap-1">
          <div className="text-[14px] text-white/90 font-bold tracking-wide">₱{stock.price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className={`text-[11px] font-bold tracking-wider ${tColorClass}`}>{isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%</div>
        </div>
        <div className="w-8 flex justify-end">
           <button 
             onClick={(e) => { e.stopPropagation(); onToggle(); }} 
             className="p-1 hover:bg-white/10 rounded-full transition-colors"
           >
             <Star className={`w-4 h-4 transition-all ${isWatched ? 'fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'text-white/20 hover:text-white/50'}`} />
           </button>
        </div>
      </div>
    </div>
  );
}