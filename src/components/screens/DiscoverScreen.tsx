import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

const PSE_STOCKS = [
  { ticker: '$BDO',   name: 'BDO Unibank', price: 156.80, chg: -0.60, sector: 'Financials', volume: 1500000, mc: 800 },
  { ticker: '$ALI',   name: 'Ayala Land', price: 32.45, chg: 4.90, sector: 'Property', volume: 4200000, mc: 450 },
  { ticker: '$TEL',   name: 'PLDT Inc.', price: 1342.00, chg: -0.41, sector: 'Telecom', volume: 120000, mc: 289 },
  { ticker: '$AREIT', name: 'Ayala REIT', price: 29.40, chg: 0.34, sector: 'Property', volume: 500000, mc: 60 },
  { ticker: '$AC',    name: 'Ayala Corp', price: 630.00, chg: 1.28, sector: 'Holdings', volume: 800000, mc: 390 },
  { ticker: '$MER',   name: 'Meralco', price: 390.00, chg: 0.52, sector: 'Utilities', volume: 950000, mc: 430 },
  { ticker: '$JGS',   name: 'JG Summit', price: 35.10, chg: -2.43, sector: 'Holdings', volume: 2100000, mc: 250 },
];

const SECTORS = ['All', 'Financials', 'Property', 'Holdings', 'Telecom', 'Utilities'];
const FILTERS = ['Hot', 'Gainers', 'Losers', '24h Volume', 'Market Cap'];

interface DiscoverScreenProps {
  onSelectStock: (ticker: string) => void;
}

export function DiscoverScreen({ onSelectStock }: DiscoverScreenProps) {
  const [query, setQuery] = useState('');
  const [activeSector, setActiveSector] = useState('All');
  const [activeFilter, setActiveFilter] = useState('Hot');

  // Double Filter Engine: Matches Sector/Search, then sorts by active Filter!
  const sortedAndFiltered = useMemo(() => {
    const q = query.toLowerCase();
    
    // Step 1: Filter
    let result = PSE_STOCKS.filter((s) => {
      const matchQuery = !q || s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
      const matchSector = activeSector === 'All' || s.sector === activeSector;
      return matchQuery && matchSector;
    });

    // Step 2: Sort
    if (activeFilter === 'Gainers') result.sort((a, b) => b.chg - a.chg);
    else if (activeFilter === 'Losers') result.sort((a, b) => a.chg - b.chg);
    else if (activeFilter === '24h Volume') result.sort((a, b) => b.volume - a.volume);
    else if (activeFilter === 'Market Cap') result.sort((a, b) => b.mc - a.mc);
    // 'Hot' leaves the default array order

    return result;
  }, [query, activeSector, activeFilter]);

  return (
    <div className="flex flex-col relative pb-20">
      
      {/* Search Bar */}
      <div className="sticky top-0 z-20 px-5 pt-3 pb-3 bg-[#0D0D0D]/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3 px-4 rounded-2xl min-h-[44px] bg-[#161616] border border-white/10 shadow-inner focus-within:border-[#D4AF37]/50 transition-colors">
          <Search className="w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search 200+ PSE Stocks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/30"
          />
        </div>
      </div>

      <div className="pt-5 space-y-5">
         
         {/* ── SECTOR ROW ── */}
         <div>
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest px-5 mb-2.5">Sector</h3>
            <div className="overflow-x-auto scrollbar-hide px-5 pb-2">
              <div className="flex gap-2 w-max">
                {SECTORS.map((s) => (
                  <button
                    key={`sec-${s}`}
                    onClick={() => setActiveSector(s)}
                    className={`h-[34px] px-4 rounded-full text-[11px] font-bold tracking-wide transition-all ${
                      s === activeSector ? 'bg-[#D4AF37] text-black shadow-[0_0_10px_rgba(212,175,55,0.2)]' : 'bg-[#161616] border border-white/5 text-white/50 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
         </div>

         {/* ── FILTER ROW ── */}
         <div>
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest px-5 mb-2.5">Filter By</h3>
            <div className="overflow-x-auto scrollbar-hide px-5 pb-2">
              <div className="flex gap-2 w-max">
                {FILTERS.map((f) => (
                  <button
                    key={`fil-${f}`}
                    onClick={() => setActiveFilter(f)}
                    className={`h-[34px] px-4 rounded-full text-[11px] font-bold tracking-wide transition-all border ${
                      f === activeFilter ? 'bg-white/10 border-white/20 text-white shadow-inner' : 'bg-transparent border-white/5 text-white/30 hover:border-white/20 hover:text-white/60'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
         </div>

      </div>

      <div className="mx-5 my-2 border-b border-white/5" />

      {/* ── RESULTS ── */}
      <div className="px-5 pt-2 space-y-2">
        {sortedAndFiltered.length === 0 ? (
           <div className="py-12 text-center text-[12px] text-white/30 tracking-wide font-medium border border-white/5 rounded-2xl bg-white/[0.01]">
              No stocks found matching your criteria.
           </div>
        ) : (
          sortedAndFiltered.map((stock) => (
            <button
              key={stock.ticker}
              onClick={() => onSelectStock(stock.ticker)}
              className="w-full flex items-center justify-between rounded-2xl px-4 py-4 bg-[#161616]/50 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/5 flex items-center justify-center border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <span className="text-[10px] font-bold text-[#D4AF37] tracking-wider">{stock.ticker.replace('$', '')}</span>
                </div>
                <div className="text-left flex flex-col gap-0.5">
                  <p className="text-[14px] font-bold text-white/90 group-hover:text-white transition-colors">{stock.ticker}</p>
                  <p className="text-[11px] font-medium tracking-wide text-white/40">{stock.name}</p>
                </div>
              </div>
              <div className="text-right flex flex-col gap-0.5">
                <p className="text-[14px] font-bold text-white/90">₱{stock.price.toFixed(2)}</p>
                <p className={`text-[11px] font-bold tracking-wider ${stock.chg >= 0 ? 'text-[#00A86B]' : 'text-red-500'}`}>
                  {stock.chg >= 0 ? '+' : ''}{stock.chg.toFixed(2)}%
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}