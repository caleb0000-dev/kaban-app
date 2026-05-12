import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface TickerItem {
  ticker: string;
  price: number;
  changePercent: number;
}

interface PulseHeaderProps {
  pseiValue: number;
  pseiChange: number;
  pseiChangePercent: number;
  pseiTrend: 'up' | 'down';
  volume: string;
  advancers: number;
  decliners: number;
  unchanged: number;
  tickerItems: TickerItem[];
}

export function PulseHeader({
  pseiValue,
  pseiChange,
  pseiChangePercent,
  pseiTrend,
  volume,
  advancers,
  decliners,
  unchanged,
  tickerItems,
}: PulseHeaderProps) {
  const isPositive = pseiTrend === 'up';
  // Enforcing Sovereign palette colors
  const trendColorClass = isPositive ? 'text-[#00A86B]' : 'text-[#EF4444]';
  const trendBgClass = isPositive ? 'bg-[#00A86B]' : 'bg-[#EF4444]';
  
  // Double array for infinite marquee effect
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="sticky top-0 z-50 bg-[#0D0D0D]/85 backdrop-blur-2xl border-b border-[#D4AF37]/15 shadow-sm">
      
      {/* PSEi Macro Data Row */}
      <div className="px-5 py-4 flex items-center justify-between">
        
        {/* Left: PSEi Index Value */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`inline-block w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor] ${trendBgClass}`} />
            <span className="text-[10px] text-white/40 tracking-[0.1em] uppercase font-medium">
              PSEi Composite
            </span>
          </div>
          
          <div className="flex items-baseline gap-2.5">
            <span className="text-white text-2xl font-bold tracking-tight">
              {pseiValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center gap-1 ${trendColorClass}`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span className="text-[13px] font-bold tracking-wide">
                {isPositive ? '+' : ''}{pseiChange.toFixed(2)}&nbsp;
                ({isPositive ? '+' : ''}{pseiChangePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Breadth & Volume */}
        <div className="text-right flex flex-col items-end">
          <div className="flex items-center gap-1.5 mb-2">
            <Activity className="w-3 h-3 text-white/30" />
            <span className="text-[10px] text-white/50 tracking-wider font-medium uppercase">
              {volume}
            </span>
          </div>
          
          {/* Market Breadth Badges */}
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#00A86B]/15 text-[#00A86B] border border-[#00A86B]/20">
              {advancers}↑
            </span>
            <span className="flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/20">
              {decliners}↓
            </span>
            <span className="flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/5 text-white/40 border border-white/10">
              {unchanged}=
            </span>
          </div>
        </div>
      </div>

      {/* Animated Ticker Tape (Marquee) */}
      <div className="overflow-hidden py-2 border-t border-[#D4AF37]/10 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent">
        <div className="flex animate-ticker whitespace-nowrap w-max">
          {doubled.map((item, i) => {
            const isItemPos = item.changePercent >= 0;
            return (
              <span key={i} className="inline-flex items-center gap-2 px-4">
                <span className="text-[11px] text-[#D4AF37] tracking-wider font-bold uppercase">
                  {item.ticker}
                </span>
                <span className="text-[11px] text-white/70 font-medium">
                  ₱{item.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-[11px] font-bold ${isItemPos ? 'text-[#00A86B]' : 'text-[#EF4444]'}`}>
                  {isItemPos ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
                <span className="text-white/10 ml-2">•</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}