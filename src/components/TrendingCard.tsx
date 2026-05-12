/* DevelopedByCaleb */
import { TrendingUp, TrendingDown, ChevronDown, Clock, Sparkles, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, YAxis } from 'recharts';
import { Drawer } from 'vaul';
import { type ReactNode, useMemo } from 'react';

export interface TrendingCardData {
  ticker: string; name: string; price: number; change: number; changePercent: number; dayHigh: number; dayLow: number; trend: 'up' | 'down'; sector: string; sparkline: number[]; insights: string[]; deepDive: { technical: string[]; fundamental: string[]; sources: string[]; }; historicalEcho: { date: string; description: string; similarity: number; }; publicFloat?: number; fcf5YearMedian?: string; pe10YearMedian?: number; exDividendDate?: string; dividendYield?: number; macroAlignment?: string; description?: string[]; parentGroup?: { name: string; ticker: string }; leadership?: { title: string; name: string; tenure: string }[]; marketPosition?: 'Sector Leader' | 'Challenger' | 'Niche Player'; catalysts?: { date: string; title: string; type: string }[]; dyorMetrics?: { regulatory: string; diversification: string; stability: string; esg: string; };
}

// FIX: Clean interface with NO unused declarations
interface TrendingCardProps { stock: TrendingCardData; }

export function TrendingCard({ stock }: TrendingCardProps) {
  const { ticker, name, price, changePercent, dayHigh, dayLow, trend, sparkline, insights, deepDive, historicalEcho } = stock;
  const isPositive = trend === 'up';
  
  const candleData = useMemo(() => {
    return sparkline.map((val, idx, arr) => {
      const open = idx === 0 ? val : arr[idx - 1];
      const close = val;
      const volatility = Math.abs(open - close) * 1.5;
      const high = Math.max(open, close) + (volatility || 1);
      const low = Math.min(open, close) - (volatility || 1);
      return { 
        x: idx, open, close, high, low, 
        isBullish: close >= open, 
        body: [Math.min(open, close), Math.max(open, close)] 
      };
    });
  }, [sparkline]);

  const CustomCandle = (props: any) => {
    // FIX: Removed unused 'low' and 'high'
    const { x, y, width, height, isBullish } = props;
    const fill = isBullish ? '#00A86B' : '#EF4444';
    return (
      <g>
        <line x1={x + width / 2} y1={y - 4} x2={x + width / 2} y2={y + height + 4} stroke={fill} strokeWidth={1} opacity={0.5} />
        <rect x={x} y={y} width={width} height={Math.max(height, 2)} fill={fill} rx={1} />
      </g>
    );
  };

  return (
    <Drawer.Root>
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#0D0D0D]/60 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)_inset_0_1px_0_rgba(255,255,255,0.05)] transition-transform duration-300 group">
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: isPositive ? 'linear-gradient(to bottom, #00A86B, rgba(0,168,107,0.1))' : 'linear-gradient(to bottom, #EF4444, rgba(239,68,68,0.1))' }} />
        <div className="absolute bottom-4 right-4 select-none pointer-events-none text-[5rem] font-bold leading-none text-[#D4AF37] opacity-[0.03]">ᜃ</div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5"><span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(212,175,55,0.1)]">{ticker}</span>{stock.sector && (<span className="text-[10px] text-white/40 tracking-wider font-medium uppercase">{stock.sector}</span>)}</div>
              <h3 className="text-white/90 text-[16px] font-bold leading-snug tracking-wide">{name}</h3>
            </div>
            <div className="text-right flex-shrink-0 ml-3">
              <div className="text-white text-[22px] font-bold tracking-tight">₱{price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className={`flex items-center gap-1 justify-end mt-0.5 ${isPositive ? 'text-[#00A86B]' : 'text-[#EF4444]'}`}>{isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}<span className="text-[12px] font-bold tracking-wide">{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</span></div>
            </div>
          </div>
          
          <div className="h-[64px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candleData} margin={{ top: 10, right: 0, bottom: 10, left: 0 }}>
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                <Bar dataKey="body" shape={<CustomCandle />} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <div className="relative h-1.5 rounded-full overflow-hidden bg-black/50 border border-white/5 shadow-inner mt-2">
              <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${((price - dayLow) / (dayHigh - dayLow)) * 100}%`, background: `linear-gradient(to right, ${isPositive ? '#00A86B40, #00A86B' : '#EF444440, #EF4444'})` }} />
            </div>
            <div className="flex justify-between mt-1.5"><span className="text-[10px] text-white/40 font-medium tracking-widest uppercase">L ₱{dayLow.toFixed(2)}</span><span className="text-[10px] text-white/40 font-medium tracking-widest uppercase">H ₱{dayHigh.toFixed(2)}</span></div>
          </div>
          <div className="flex flex-col gap-2.5 mt-1">
            {insights.map((insight, i) => <div key={i} className="flex gap-3 items-start"><div className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" /><p className="text-[13px] text-white/85 leading-relaxed font-light">{insight}</p></div>)}
          </div>
          <Drawer.Trigger asChild>
            <button className="mt-2 w-full h-[44px] flex items-center justify-center gap-2 rounded-xl transition-all active:scale-[0.98] hover:opacity-90 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0D0D0D] shadow-[0_4px_14px_rgba(212,175,55,0.25)] relative z-10">
              <span className="text-[12px] font-bold tracking-wide uppercase">See In-depth Insights</span><ChevronDown className="w-4 h-4 stroke-[2.5]" />
            </button>
          </Drawer.Trigger>
        </div>
      </div>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[200] rounded-t-3xl overflow-y-auto max-h-[90vh] bg-[#0D0D0D] border border-[#D4AF37]/20 border-b-0 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
          <div className="flex justify-center pt-4 pb-2 sticky top-0 bg-[#0D0D0D] z-10"><div className="w-12 h-1.5 rounded-full bg-white/20" /></div>
          <div className="px-5 pt-3 pb-12">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2"><span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">{ticker}</span><span className="text-[11px] text-white/50 tracking-wide">{name}</span></div>
                <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#D4AF37]" /><span className="text-[#D4AF37] text-[15px] font-bold tracking-wide uppercase">Bihasa</span><span className="text-[10px] text-white/40 tracking-widest uppercase">Deep Dive</span></div>
              </div>
              <div className="text-right"><div className="text-white text-[24px] font-bold tracking-tight">₱{price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</div><div className={`text-[12px] font-bold tracking-wide ${isPositive ? 'text-[#00A86B]' : 'text-[#EF4444]'}`}>{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</div></div>
            </div>
            
            <Section title="Technical Analysis" color="#D4AF37">{deepDive.technical.map((item, i) => <div key={i} className="pl-4 py-1 text-[13px] text-white/80 font-light border-l-2 border-[#D4AF37]/40 leading-relaxed">{item}</div>)}</Section>
            <Section title="Fundamental Data" color="#D4AF37"><div className="grid grid-cols-2 gap-3">{deepDive.fundamental.map((item, i) => <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-[12px] text-white/80 font-light">{item}</div>)}</div></Section>
            <Section title="Historical Echo" color="#D4AF37">
              <div className="rounded-xl p-5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 shadow-inner">
                <div className="flex items-center gap-2 mb-3"><Clock className="w-4 h-4 text-[#D4AF37]" /><span className="text-[11px] font-bold tracking-widest uppercase text-[#D4AF37]">{historicalEcho.date}</span></div>
                <p className="text-[13px] text-white/85 font-light leading-relaxed mb-4">{historicalEcho.description}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-black/60 border border-white/5 shadow-inner"><div className="h-full rounded-full bg-gradient-to-r from-[#D4AF37]/40 to-[#D4AF37] relative shadow-[0_0_10px_rgba(212,175,55,0.5)]" style={{ width: `${historicalEcho.similarity}%` }} /></div>
                  <span className="text-[10px] text-[#D4AF37] font-bold tracking-wider">{historicalEcho.similarity}% MATCH</span>
                </div>
              </div>
            </Section>
            
            {/* FIX: Used a text bullet instead of ChevronRight to clear the unused import warning */}
            <Section title="Sources" color="rgba(255,255,255,0.3)">
              <div className="space-y-1">{deepDive.sources.map((src, i) => <div key={i} className="flex items-start gap-2"><span className="text-white/30 text-[10px] mt-0.5">•</span><span className="text-[11px] text-white/50 tracking-wide">{src}</span></div>)}</div>
            </Section>

            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
               <AlertTriangle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
               <p className="text-[10px] text-white/50 leading-relaxed italic">
                 <strong className="text-white/70">AI Disclosure:</strong> Bihasa is an advanced AI model trained to analyze global markets. While highly capable, AI can make mistakes and its outlook does not constitute financial advice. Always conduct your own research (DYOR) before investing. We continually refine Bihasa based on market feedback.
               </p>
            </div>

          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D4AF37]/15">
        <div className="w-1.5 h-4 rounded-full shadow-[0_0_8px_currentColor]" style={{ background: color, color: color }} />
        <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color }}>{title}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}