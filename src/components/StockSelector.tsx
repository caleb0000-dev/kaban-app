import { ChevronRight } from 'lucide-react';

interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
}

interface StockSelectorProps {
  stocks: Stock[];
  selectedTicker: string;
  onSelect: (ticker: string) => void;
}

export function StockSelector({ stocks, selectedTicker, onSelect }: StockSelectorProps) {
  return (
    <div className="mx-4 mb-6">
      
      {/* 2026 Standard Sub-header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37]">
          My Watchlist
        </h4>
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors cursor-pointer">
          See All
        </span>
      </div>

      <div className="space-y-2">
        {stocks.map((stock) => {
          const isSelected = stock.ticker === selectedTicker;
          const isPositive = stock.change >= 0;

          return (
            <button
              key={stock.ticker}
              onClick={() => onSelect(stock.ticker)}
              // Liquid Glass & 64px hit target for accessibility
              className={`w-full min-h-[64px] px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between group ${
                isSelected
                  ? 'bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.05)]'
                  : 'bg-[#0D0D0D]/60 backdrop-blur-xl border border-white/5 hover:border-white/10 hover:bg-white/5'
              }`}
            >
              
              {/* Left Side: Ticker & Name */}
              <div className="flex flex-col items-start gap-1">
                <span className={`text-[14px] font-bold tracking-wide transition-colors ${isSelected ? 'text-[#D4AF37]' : 'text-white/90 group-hover:text-white'}`}>
                  {stock.ticker}
                </span>
                <span className="text-[11px] text-white/40 font-medium tracking-wide">
                  {stock.name}
                </span>
              </div>

              {/* Right Side: Price, Change & Chevron */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[14px] font-semibold text-white/90 tracking-wide">
                    ₱{stock.price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className={`text-[11px] font-bold tracking-wider ${isPositive ? 'text-[#00A86B]' : 'text-[#EF4444]'}`}>
                    {isPositive ? '▲ ' : '▼ '}{Math.abs(stock.change).toFixed(2)}%
                  </span>
                </div>
                
                {/* Micro-interaction Chevron */}
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 ${
                    isSelected ? 'text-[#D4AF37] translate-x-1' : 'text-white/20 group-hover:text-white/40'
                  }`}
                  strokeWidth={isSelected ? 3 : 2}
                />
              </div>

            </button>
          );
        })}
      </div>
    </div>
  );
}