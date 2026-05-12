import { useState } from 'react';
import { Search, Star } from 'lucide-react';
import type { TrendingCardData } from '../TrendingCard';

interface WatchlistScreenProps {
  stocks: TrendingCardData[];
  watchlist: Set<string>;
  onToggleWatch: (ticker: string) => void;
  onSelectStock: (ticker: string) => void;
}

export function WatchlistScreen({ stocks, watchlist, onToggleWatch, onSelectStock }: WatchlistScreenProps) {
  const [query, setQuery] = useState('');

  // Only show stocks that are currently in the Watchlist Set
  const watchedStocks = stocks.filter(s => watchlist.has(s.ticker));
  
  // Apply Search
  const filtered = watchedStocks.filter(s => {
    if (!query) return true;
    const q = query.toLowerCase();
    return s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col relative pb-20">
      
      <div className="sticky top-0 z-20 px-5 pt-3 pb-3 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5">
        <h2 className="text-xl font-black text-white mb-3 px-1">Manage Watchlist</h2>
        <div className="flex items-center gap-3 px-4 rounded-2xl min-h-[44px] bg-[#161616] border border-white/10 shadow-inner focus-within:border-[#D4AF37]/50 transition-colors">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search your watchlist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/30"
          />
        </div>
      </div>

      <div className="px-5 pt-5 space-y-2">
        {watchedStocks.length === 0 ? (
           <div className="py-16 text-center flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-white/[0.01]">
              <Star className="w-8 h-8 text-white/10 mb-3" />
              <p className="text-[14px] font-bold text-white/60 mb-1">Watchlist is Empty</p>
              <p className="text-[11px] text-white/30 tracking-wide max-w-[200px] leading-relaxed">Star stocks from the Discover page to track them here.</p>
           </div>
        ) : filtered.length === 0 ? (
           <div className="py-12 text-center text-[12px] text-white/30 tracking-wide font-medium border border-white/5 rounded-2xl bg-white/[0.01]">
              No matches found.
           </div>
        ) : (
          filtered.map((stock) => {
            const isPositive = stock.trend === 'up';
            return (
              <div 
                key={stock.ticker}
                onClick={() => onSelectStock(stock.ticker)} 
                className="w-full min-h-[64px] flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer group bg-[#161616]/50 border border-white/5 hover:border-white/10 hover:bg-white/5"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0 transition-colors bg-[#D4AF37]/10 border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/20">
                    <span className="text-[10px] font-bold tracking-wider text-[#D4AF37]">{stock.ticker.replace('$', '').slice(0, 4)}</span>
                  </div>
                  <div className="text-left flex flex-col gap-0.5">
                    <div className="text-[14px] font-bold tracking-wide transition-colors text-white/90 group-hover:text-white">{stock.ticker}</div>
                    <div className="text-[11px] text-white/40 font-medium tracking-wide">{stock.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right flex flex-col gap-0.5">
                    <div className="text-[14px] text-white/90 font-bold tracking-wide">₱{stock.price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className={`text-[11px] font-bold tracking-wider ${isPositive ? 'text-[#00A86B]' : 'text-[#EF4444]'}`}>{isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%</div>
                  </div>
                  <div className="w-8 flex justify-end">
                     <button 
                       onClick={(e) => { e.stopPropagation(); onToggleWatch(stock.ticker); }} 
                       className="p-1.5 hover:bg-red-500/10 rounded-full transition-colors"
                     >
                       <Star className="w-4 h-4 transition-all fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] hover:fill-red-500 hover:text-red-500 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                     </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}