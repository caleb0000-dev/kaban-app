import { Sparkles, Globe, Shield } from 'lucide-react';
import { MarketBihasa } from '../MarketBihasa';

interface BihasaScreenProps {
  generalBihasa: {
    insights: string[];
    marketDeepDive: {
      sectors: { name: string; change: string; sentiment: 'bullish' | 'bearish' | 'neutral' }[];
      catalysts: string[];
      risks: string[];
      outlook: string;
    };
  };
}

// Upgraded to use strict Tailwind color classes
const QUICK_STATS = [
  { label: 'PSEi Level',   value: '6,842.34', sub: '▲ 0.67%',  colorClass: 'text-[#00A86B]' },
  { label: 'Net Foreign',  value: '₱2.1B',    sub: 'Buying',     colorClass: 'text-[#00A86B]' },
  { label: 'Volume',       value: '₱12.4B',   sub: 'Turnover',   colorClass: 'text-[#D4AF37]' },
  { label: 'Advancers',    value: '78',       sub: 'vs 43 Dec',  colorClass: 'text-[#00A86B]' },
];

export function BihasaScreen({ generalBihasa }: BihasaScreenProps) {
  return (
    <div className="flex flex-col gap-0 pt-4 pb-6">
      
      {/* ── Bihasa Hero Banner (Liquid Glass) ────────────────────────── */}
      <div className="mx-4 mb-6">
        <div className="relative rounded-2xl p-5 overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          
          {/* Subtle Baybayin KA Watermark */}
          <div className="absolute -right-4 -bottom-6 select-none pointer-events-none text-[9rem] font-bold leading-none text-[#D4AF37] opacity-[0.04]">
            ᜃ
          </div>

          <div className="flex items-start justify-between relative z-10">
            <div className="pr-2">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-[18px] font-bold tracking-wide">
                  Bihasa
                </span>
              </div>
              <p className="text-[12px] text-white/60 font-light leading-relaxed">
                The sovereign AI market expert — veteran of the PSE. Today's macro pulse, sector flows, and forward catalysts distilled for the Lakan.
              </p>
            </div>
            
            {/* Glowing Globe Icon Container */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 ml-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <Globe className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 mt-5 relative z-10">
            {QUICK_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-2.5 flex flex-col justify-center bg-black/40 border border-white/5 shadow-inner"
              >
                <div className="text-[9px] text-white/40 tracking-wider font-medium uppercase mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  {stat.label}
                </div>
                <div className={`text-[13px] font-bold tracking-wide ${stat.colorClass}`}>
                  {stat.value}
                </div>
                <div className="text-[9px] text-white/30 tracking-wide mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Market Analysis Container ────────────────────────────────── */}
      <div className="px-0">
        <div className="px-5 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase shadow-[0_0_8px_rgba(212,175,55,0.1)]">
              AI Market Analysis
            </span>
          </div>
          <p className="text-[11px] text-white/40 font-light tracking-wide">
            Full PSE market read with sector breakdown, catalysts and risk matrix
          </p>
        </div>
        
        {/* Injects the heavily upgraded MarketBihasa component we built earlier */}
        <MarketBihasa
          insights={generalBihasa.insights}
          marketDeepDive={generalBihasa.marketDeepDive}
        />
      </div>

      {/* ── Disclaimer Footer ────────────────────────────────────────── */}
      <div className="mx-5 mt-2 mb-4">
        <div className="flex items-start gap-3 rounded-xl p-4 bg-white/[0.02] border border-white/5">
          <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-white/20" />
          <p className="text-[10px] text-white/30 leading-relaxed tracking-wide font-light">
            Bihasa analysis is for informational and educational purposes only. It does not constitute investment advice. Always perform your own due diligence before making any financial decisions.
          </p>
        </div>
      </div>
      
    </div>
  );
}