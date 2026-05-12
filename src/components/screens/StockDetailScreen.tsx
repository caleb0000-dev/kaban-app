/* DevelopedByCaleb */
import { useState } from 'react';
import { ArrowLeft, ShieldCheck, TrendingUp, Wallet, Landmark, Info, Users, Layers, Zap, ClipboardCheck, ExternalLink, Newspaper, X, Maximize2 } from 'lucide-react';
import { ComposedChart, Area, Bar, Line, ResponsiveContainer, YAxis } from 'recharts';

type TabId = 'profile' | 'fundamentals' | 'income' | 'value';

const GLOSSARY: Record<string, any> = {
  conglomerate: { title: "Parent Conglomerate", filipino: "Isang malaking 'mother company' na nagmamay-ari ng maraming mas maliliit na kumpanya sa iba't ibang industriya.", simple: "A massive 'mother company' that owns many smaller companies in different industries.", example: "Think of it like a giant umbrella. MVP Group is the umbrella, and PLDT, Smart, and Meralco are under it.", depth: "Conglomerates provide stability. If one subsidiary fails or loses money, the others can keep the parent company profitable." },
  safetyScore: { title: "Bihasa Safety Score", filipino: "Isang grado mula 1 hanggang 10 na nagpapakita kung gaano kaligtas at katatag ang kumpanyang ito.", simple: "A grade from 1 to 10 that shows how safe and stable this company is for your money.", example: "An 8.4 means this company is like a sturdy vault—it rarely has massive drops.", depth: "Calculated by the AI using historical price consistency, debt levels, and 5-year steady revenue." },
  roe: { title: "Return on Equity (ROE)", filipino: "Sukatan ng husay: Kung gaano kalaki ang kinikita ng kumpanya gamit ang perang in-invest mo.", simple: "Efficiency check: How much profit the company makes using your invested money.", example: "If ROE is 15%, the company earned ₱15 for every ₱100 of shareholder money.", depth: "Calculated as Net Income divided by Shareholder Equity. >12% is ideal." },
  debtEquity: { title: "Debt-to-Equity Ratio", filipino: "Pagsusuri sa utang: Kung gaano karami ang inutang nila kumpara sa aktwal na pag-aari nila.", simple: "The debt check: How much money they borrowed vs. how much they actually own.", example: "A ratio of 0.5 means for every ₱1 they own, they borrowed 50 centavos.", depth: "A low D/E is safer when interest rates are high (less interest expense)." },
  divYield: { title: "Dividend Yield", filipino: "Ang iyong taunang 'cash reward' mula sa stock bilang isang porsyento.", simple: "Your annual 'cash reward' from the stock as a percentage.", example: "A 5% yield means you get ₱5.00 back every year for every ₱100.00 you invest.", depth: "Calculated as Annual Dividend per Share divided by Price." },
  netIncome: { title: "Net Income", filipino: "Ang natitirang pera pagkatapos bayaran ng kumpanya ang lahat ng gastusin, sweldo, at buwis.", simple: "The actual cash left over after a company pays all its bills, workers, and taxes.", example: "If a lemonade stand makes ₱100 but spends ₱80 on lemons, the Net Income is ₱20.", depth: "Also known as the 'Bottom Line'. It is the main driver of stock value." },
  capitalExpenditure: { title: "Capital Expenditure (CapEx)", filipino: "Perang ginastos para bumili o mag-ayos ng mga pisikal na bagay tulad ng mga gusali o kagamitan.", simple: "Money spent to buy or fix physical things like buildings, towers, or equipment.", example: "When a phone company buys new 5G cell towers, that is a Capital Expenditure.", depth: "High CapEx drains cash in the short term, but builds future revenue." },
  franchise: { title: "Government Franchise", filipino: "Espesyal na pahintulot mula sa gobyerno na kailangan para makapag-operate ang negosyo.", simple: "Special permission from the government needed to run the business.", example: "Water and electricity companies need a government franchise to legally operate.", depth: "Companies with franchise requirements carry strict 'Regulatory Risk'." },
  diversified: { title: "Revenue Diversification", filipino: "Hindi paglalagay ng lahat ng itlog sa isang basket. Kumikita sila sa iba't ibang paraan.", simple: "Not putting all your eggs in one basket. They make money in many different ways.", example: "Instead of just selling shoes, a company sells shoes, food, and houses.", depth: "Revenue diversification protects a company if one specific industry crashes." },
  esg: { title: "ESG Rating", filipino: "Marka kung gaano pinapahalagahan ng kumpanya ang kalikasan at ang kanilang mga manggagawa.", simple: "A score on how much the company cares about the planet and treats its workers fairly.", example: "Using solar power and paying employees well gives a high ESG score.", depth: "Stands for Environmental, Social, and Governance. Attracts foreign funds." }
};

const TIMEFRAMES = ['1D', '1W', '1M', '1Y', '5Y', 'MAX'];

const chartData = [
  { time: '1', price: 1300, volume: 1200, eps: 1250, ma200: 1280 },
  { time: '2', price: 1315, volume: 1500, eps: 1260, ma200: 1285 },
  { time: '3', price: 1305, volume: 900,  eps: 1270, ma200: 1290 },
  { time: '4', price: 1330, volume: 2100, eps: 1280, ma200: 1295 },
  { time: '5', price: 1342, volume: 3400, eps: 1290, ma200: 1300 },
];

export function StockDetailScreen({ stock = '$TEL', onBack, onJump, onOpenAdvanced, bihasaLogoUrl }: any) {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [activeTimeframe, setActiveTimeframe] = useState('1M');
  const [chartToggle, setChartToggle] = useState<'price' | 'dividends'>('price');
  const [selectedCatalyst, setSelectedCatalyst] = useState<string | null>(null);
  
  // FIX: Properly storing boundedX in state
  const [tooltip, setTooltip] = useState<{ key: string; boundedX: number; targetY: number; isTop: boolean; tailShift: number } | null>(null);

  const triggerTooltip = (e: React.MouseEvent, key: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const screenW = window.innerWidth;
    
    const tooltipHalfW = 130; 
    const safePadding = 16;
    const targetX = rect.left + (rect.width / 2);
    
    let boundedX = targetX;
    if (targetX - tooltipHalfW < safePadding) boundedX = tooltipHalfW + safePadding;
    else if (targetX + tooltipHalfW > screenW - safePadding) boundedX = screenW - tooltipHalfW - safePadding;
    
    const isTop = rect.top < 150;
    const targetY = isTop ? rect.bottom + 10 : rect.top - 10;
    const tailShift = targetX - boundedX;

    // FIX: Using boundedX directly here
    setTooltip({ key, boundedX, targetY, isTop, tailShift });
  };

  const GlossaryTrigger = ({ termKey, label, className }: { termKey: string, label: string, className?: string }) => (
    <span onClick={(e) => { e.stopPropagation(); triggerTooltip(e, termKey); }} className={className || "inline-flex items-center gap-1 text-[#D4AF37] border-b border-dashed border-[#D4AF37]/50 cursor-pointer font-bold transition-colors relative z-10"}>
      {label}
    </span>
  );

  const handleCloseDocument = () => {
    setSelectedCatalyst(null);
    setTooltip(null);
  };

  const data = {
    ticker: stock, name: 'PLDT Inc.', price: 1342.00, chg: -0.41, pos: 'Sector Leader', parent: { name: 'MVP Group', ticker: '$FPH' },
    desc: "PLDT is the biggest internet and phone company in the Philippines. They make money by providing WiFi to homes and mobile data to smartphones.",
    leaders: [{ role: "Chairman", name: "M. Pangilinan", time: "26y" }, { role: "CEO", name: "A. Panlilio", time: "3y" }],
    scorecard: [
      { label: "Government Rules", value: "High Risk", status: "warning", tip: "franchise" },
      { label: "Income Sources", value: "Many Ways", status: "good", tip: "diversified" },
      { label: "Boss / Leadership", value: "Stable", status: "good", tip: "none" },
      { label: "Planet Friendly", value: "Top Score", status: "good", tip: "esg" }
    ],
    news: [
      { id: "q1", title: "Q1 Earnings: ₱9.8B Net Income", date: "May 08, 2026", type: "Financial Report" },
      { id: "hyperscale", title: "New Hyperscale Data Center", date: "April 20, 2026", type: "Business Expansion" }
    ]
  };

  return (
    <div className="h-full overflow-y-auto bg-[#0D0D0D] text-white pb-32 relative" onClick={() => setTooltip(null)}>
      
      <div className="pt-12 px-6 pb-6 sticky top-0 bg-[#0D0D0D]/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} className="text-[#D4AF37]" />
          </button>
          <div className="bg-[#00A86B]/10 border border-[#00A86B]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Zap size={12} className="text-[#00A86B]" />
            <span className="text-[10px] font-black text-[#00A86B] uppercase tracking-wider">{data.pos}</span>
          </div>
          <div onClick={(e) => { e.stopPropagation(); triggerTooltip(e, 'safetyScore'); }} className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer hover:bg-[#D4AF37]/20 transition-colors">
            <ShieldCheck size={12} className="text-[#D4AF37]" />
            <span className="text-[11px] font-black text-[#D4AF37]">8.4</span>
          </div>
        </div>
        <div className="flex justify-between items-end">
           <div>
              <h1 className="text-3xl font-black mb-1">{data.ticker}</h1>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{data.name}</p>
           </div>
           <div className="text-right">
              <p className="text-2xl font-mono font-bold">₱{data.price.toFixed(2)}</p>
              <p className="font-bold text-sm text-red-500">▼ 0.41%</p>
           </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        
        <div className="w-full bg-[#161616] rounded-3xl border border-white/5 p-4 relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-start z-10 mb-4">
            <div className="flex gap-2">
              <button onClick={() => setChartToggle('price')} className={`text-[10px] font-bold px-2 py-1 rounded-md transition ${chartToggle === 'price' ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white/40'}`}>Price</button>
              {activeTab === 'income' && <button onClick={() => setChartToggle('dividends')} className={`text-[10px] font-bold px-2 py-1 rounded-md transition ${chartToggle === 'dividends' ? 'bg-[#00A86B] text-black' : 'bg-white/5 text-white/40'}`}>Dividends</button>}
            </div>
            <button onClick={() => onOpenAdvanced(stock)} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition"><Maximize2 size={14} /></button>
          </div>

          <div className="absolute top-12 left-4 z-10 flex flex-col gap-0.5">
             {activeTab === 'fundamentals' && <span className="text-[9px] text-[#3B82F6] font-bold uppercase tracking-widest bg-[#3B82F6]/10 px-1.5 py-0.5 rounded">EPS Overlay</span>}
             {activeTab === 'value' && <span className="text-[9px] text-[#EF4444] font-bold uppercase tracking-widest bg-[#EF4444]/10 px-1.5 py-0.5 rounded">200-Day MA Overlay</span>}
          </div>

          <div className="h-40 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <YAxis yAxisId="price" domain={['dataMin - 10', 'dataMax + 10']} hide />
                <YAxis yAxisId="volume" domain={[0, 'dataMax * 3']} hide />
                <Bar dataKey="volume" yAxisId="volume" fill="#ffffff" opacity={0.05} radius={[2,2,0,0]} />
                <Area type="monotone" dataKey="price" yAxisId="price" stroke="#D4AF37" strokeWidth={2} fill="url(#chartGradient)" isAnimationActive={false} />
                {activeTab === 'fundamentals' && <Line type="monotone" dataKey="eps" yAxisId="price" stroke="#3B82F6" strokeWidth={1.5} strokeDasharray="4 4" dot={false} isAnimationActive={false} />}
                {activeTab === 'value' && <Line type="monotone" dataKey="ma200" yAxisId="price" stroke="#EF4444" strokeWidth={1.5} strokeDasharray="4 4" dot={false} isAnimationActive={false} />}
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center mt-4 px-2 border-t border-white/5 pt-3">
             {TIMEFRAMES.map(tf => <button key={tf} onClick={() => setActiveTimeframe(tf)} className={`text-[10px] font-bold tracking-widest ${activeTimeframe === tf ? 'text-[#D4AF37]' : 'text-white/30 hover:text-white/60'} transition-colors`}>{tf}</button>)}
          </div>
        </div>

        <div className="flex bg-[#161616] p-1 rounded-2xl border border-white/5 overflow-x-auto scrollbar-hide">
          <TabBtn id="profile" active={activeTab} set={setActiveTab} label="About" icon={<Users size={14}/>} />
          <TabBtn id="fundamentals" active={activeTab} set={setActiveTab} label="Health" icon={<Landmark size={14}/>} />
          <TabBtn id="income" active={activeTab} set={setActiveTab} label="Income" icon={<Wallet size={14}/>} />
          <TabBtn id="value" active={activeTab} set={setActiveTab} label="Value" icon={<TrendingUp size={14}/>} />
        </div>

        {activeTab === 'profile' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="space-y-3">
               <h3 className="text-[#D4AF37] text-xs font-black uppercase tracking-widest flex items-center gap-2"><Layers size={14} /> About the Company</h3>
               <p className="text-sm text-white/70 leading-relaxed">{data.desc}</p>
               <button onClick={() => onJump(data.parent.ticker)} className="w-full mt-2 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group active:bg-[#D4AF37]/10 transition-colors">
                 <div className="flex flex-col items-start">
                   <span className="text-[10px] uppercase mb-0.5">
                      <GlossaryTrigger termKey="conglomerate" label="Parent Conglomerate" className="text-[#D4AF37] border-b border-dashed border-[#D4AF37]/50 cursor-pointer font-bold relative z-10 hover:text-[#F3E5AB] transition-colors" />
                   </span>
                   <span className="text-sm font-bold text-white">{data.parent.name}</span>
                 </div>
                 <ExternalLink size={18} className="text-[#D4AF37] opacity-50 group-hover:opacity-100" />
               </button>
            </div>
            
            <div className="space-y-4">
               <h3 className="text-white text-sm font-black flex items-center gap-2">
                 {bihasaLogoUrl ? (
                   <img src={bihasaLogoUrl} alt="Bihasa" className="w-[18px] h-[18px] object-contain" />
                 ) : (
                   <ClipboardCheck size={18} className="text-[#00A86B]" />
                 )}
                 Bihasa Scorecard
               </h3>
               
               <div className="grid grid-cols-1 gap-3">
                  {data.scorecard.map(m => (
                    <div key={m.label} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center">
                       <span className="text-xs text-white/60 font-medium">{m.tip !== 'none' ? <GlossaryTrigger termKey={m.tip} label={m.label} /> : m.label}</span>
                       <span className={`text-xs font-bold ${m.status === 'good' ? 'text-[#00A86B]' : 'text-[#D4AF37]'}`}>{m.value}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-3">
               <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest px-1">Recent PSE EDGE News</h3>
               {data.news.map(n => (
                 <button key={n.id} onClick={() => setSelectedCatalyst(n.id)} className="w-full text-left p-4 bg-white/5 border-l-2 border-[#D4AF37] rounded-r-2xl flex justify-between items-center hover:bg-white/10 transition-all">
                    <div className="mr-4"><p className="text-xs font-bold text-white/90 truncate">{n.title}</p><p className="text-[10px] text-white/40 mt-0.5">{n.type}</p></div>
                    <span className="text-[10px] text-[#D4AF37] font-mono whitespace-nowrap">{n.date}</span>
                 </button>
               ))}
            </div>
          </div>
        )}

        {(activeTab === 'fundamentals' || activeTab === 'income' || activeTab === 'value') && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            {activeTab === 'fundamentals' && (
              <div className="grid grid-cols-1 gap-3">
                <DataCard label="ROE (Efficiency)" value="16.4%" health="good" tip="roe" onTip={triggerTooltip} />
                <DataCard label="Debt-to-Equity" value="0.48" health="good" tip="debtEquity" onTip={triggerTooltip} />
              </div>
            )}
            {activeTab === 'income' && (
              <div className="grid grid-cols-1 gap-3">
                <DataCard label="Dividend Yield" value="5.24%" health="good" tip="divYield" onTip={triggerTooltip} />
                <div className="p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl flex justify-between items-center"><span className="text-[11px] font-bold text-[#D4AF37]">Next Payout</span><span className="text-sm font-bold">Apr 12</span></div>
              </div>
            )}
            {activeTab === 'value' && (
              <div className="grid grid-cols-1 gap-3">
                <DataCard label="Margin of Safety" value="22%" health="good" tip="roe" onTip={triggerTooltip} />
                <div className="bg-[#161616] p-4 rounded-2xl border border-white/5 flex flex-col gap-2"><span className="text-[10px] text-white/40 uppercase font-bold">Closed Profit</span><span className="text-xl font-mono font-bold text-[#00A86B]">₱42,150.00</span></div>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedCatalyst && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200" onClick={handleCloseDocument}>
          <div className="bg-[#161616] border border-[#D4AF37]/30 w-full max-w-md rounded-[32px] p-6 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={handleCloseDocument} className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"><X size={18} className="text-white/60" /></button>
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-3"><Newspaper size={14} className="text-[#D4AF37]" /><span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">Financial Report</span></div>
              <h2 className="text-2xl font-black text-white mb-2 leading-tight pr-8">Q1 Earnings: ₱9.8B Net Income</h2>
              <p className="text-white/40 text-xs font-mono mb-6">May 08, 2026</p>
              <div className="space-y-4 text-sm text-white/80 leading-relaxed font-light">
                <p>PLDT reported a massive profit for the first quarter. They made ₱9.8 Billion in <GlossaryTrigger termKey="netIncome" label="Net Income" />.</p>
                <p>The company also announced they will be spending ₱4.5 Billion on <GlossaryTrigger termKey="capitalExpenditure" label="Capital Expenditures" />.</p>
              </div>
            </div>
            <button onClick={handleCloseDocument} className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm text-white/80 transition-colors">Close Document</button>
          </div>
        </div>
      )}

      {tooltip && GLOSSARY[tooltip.key] && (
        <div 
           className={`fixed z-[120] w-[260px] bg-[#1C1C1C] border border-[#D4AF37]/40 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 pointer-events-auto ${tooltip.isTop ? 'slide-in-from-top-2' : 'slide-in-from-bottom-2'}`}
           style={{ left: tooltip.boundedX, top: tooltip.targetY, transform: `translate(-50%, ${tooltip.isTop ? '0' : '-100%'})` }}
        >
          {tooltip.isTop && (
             <div className="absolute -top-2 w-4 h-4 bg-[#1C1C1C] border-l border-t border-[#D4AF37]/40" style={{ left: `calc(50% + ${tooltip.tailShift}px)`, transform: 'translateX(-50%) rotate(45deg)' }} />
          )}

          <div className="p-4 max-h-[45vh] overflow-y-auto scrollbar-hide space-y-3.5">
            <div className="border-b border-white/10 pb-2"><h4 className="text-[13px] font-black text-[#D4AF37] leading-snug">{GLOSSARY[tooltip.key].title}</h4></div>
            <div><p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Simple English</p><p className="text-[12px] text-white/90 leading-relaxed">{GLOSSARY[tooltip.key].simple}</p></div>
            <div><p className="text-[9px] font-bold text-[#3B82F6] uppercase tracking-widest mb-1">Filipino</p><p className="text-[12px] text-white/90 italic leading-relaxed">{GLOSSARY[tooltip.key].filipino}</p></div>
            <div><p className="text-[9px] font-bold text-[#00A86B] uppercase tracking-widest mb-1">Example</p><p className="text-[11px] text-white/60 italic leading-relaxed">{GLOSSARY[tooltip.key].example}</p></div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5"><p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Bihasa Deep-Dive</p><p className="text-[11px] text-white/50 leading-relaxed">{GLOSSARY[tooltip.key].depth}</p></div>
          </div>
          
          {!tooltip.isTop && (
             <div className="absolute -bottom-2 w-4 h-4 bg-[#1C1C1C] border-r border-b border-[#D4AF37]/40" style={{ left: `calc(50% + ${tooltip.tailShift}px)`, transform: 'translateX(-50%) rotate(45deg)' }} />
          )}
        </div>
      )}

    </div>
  );
}

function TabBtn({ id, active, set, label, icon }: any) {
  const isAct = active === id;
  return (
    <button onClick={() => set(id)} className={`flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all ${isAct ? 'bg-[#D4AF37] text-black font-black' : 'text-white/40'}`}>
      {icon} <span className="text-[11px] font-bold">{label}</span>
    </button>
  );
}

function DataCard({ label, value, health, tip, onTip }: any) {
  const color = health === 'good' ? 'text-[#00A86B]' : health === 'bad' ? 'text-red-500' : 'text-white';
  return (
    <div className="bg-[#161616] p-4 rounded-2xl border border-white/5 flex justify-between items-center group active:bg-white/5 transition-colors">
      <div className="flex items-center gap-2" onClick={(e) => { e.stopPropagation(); onTip(e, tip); }}>
        <span className="text-[12px] font-medium text-[#D4AF37] border-b border-dashed border-[#D4AF37]/50 cursor-pointer">{label}</span>
        <Info size={12} className="text-[#D4AF37]/50" />
      </div>
      <span className={`text-lg font-mono font-bold ${color}`}>{value}</span>
    </div>
  );
}