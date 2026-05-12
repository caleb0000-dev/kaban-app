/* DevelopedByCaleb */
import { useState, useMemo } from 'react';
import { ArrowLeft, LineChart, BarChart2, Activity } from 'lucide-react';
import { ComposedChart, BarChart, LineChart as RechartsLineChart, Area, Bar, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const generateMockData = () => {
  let currentPrice = 1300;
  return Array.from({ length: 60 }).map((_, i) => {
    const volatility = 15;
    const open = currentPrice + (Math.random() * 10 - 5);
    const close = open + (Math.random() * volatility - volatility / 2);
    currentPrice = close;

    return {
      time: `D${i + 1}`, open, close, price: close,
      volume: Math.floor(Math.random() * 5000) + 1000,
      sma: 1300 + (i * 0.5) + (Math.random() * 5),
      ema: 1305 + (i * 0.8),
      rsi: 30 + Math.random() * 40,
      candleBody: [Math.min(open, close), Math.max(open, close)],
      isBullish: close >= open
    };
  });
};

export function AdvancedChartScreen({ stock = '$TEL', onBack }: any) {
  const [chartType, setChartType] = useState<'area' | 'candle'>('candle');
  const [showSMA, setShowSMA] = useState(true);
  const [showEMA, setShowEMA] = useState(false);
  
  const smaColor = '#3B82F6';
  const emaColor = '#F59E0B';

  const mockData = useMemo(() => generateMockData(), []);

  const CustomCandle = (props: any) => {
    // FIX: Removed unused 'low' and 'high'
    const { x, y, width, height, isBullish } = props;
    const fill = isBullish ? '#00A86B' : '#EF4444';
    return (
      <g>
        <line x1={x + width / 2} y1={y - 10} x2={x + width / 2} y2={y + height + 10} stroke={fill} strokeWidth={1} />
        <rect x={x} y={y} width={width} height={height} fill={fill} rx={2} />
      </g>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0D0D0D] text-white flex animate-in fade-in zoom-in duration-300 overflow-hidden" style={{ width: '100vh', height: '100vw', transformOrigin: 'top left', transform: 'rotate(90deg) translateY(-100%)' }}>
      <div className="flex-1 flex flex-col h-full border-r border-white/5 relative">
        <div className="flex items-center justify-between p-3 border-b border-white/5 bg-[#161616] h-14">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition"><ArrowLeft size={18} className="text-[#D4AF37]" /></button>
            <div className="flex items-center gap-3">
               <h2 className="text-xl font-black leading-none">{stock}</h2>
               <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold tracking-widest text-[#00A86B] flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse" /> LIVE
               </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-black/50 rounded-lg p-1 border border-white/5">
              <button onClick={() => setChartType('area')} className={`p-1.5 rounded-md transition-colors ${chartType === 'area' ? 'bg-[#D4AF37] text-black' : 'text-white/40'}`}><LineChart size={16} /></button>
              <button onClick={() => setChartType('candle')} className={`p-1.5 rounded-md transition-colors ${chartType === 'candle' ? 'bg-[#D4AF37] text-black' : 'text-white/40'}`}><BarChart2 size={16} /></button>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-3">
               <button onClick={() => setShowSMA(!showSMA)} className={`text-[10px] font-bold px-2 py-1.5 rounded transition border ${showSMA ? `border-[${smaColor}] bg-[${smaColor}]/10 text-[${smaColor}]` : 'border-white/10 text-white/40'}`} style={showSMA ? { borderColor: smaColor, color: smaColor, backgroundColor: `${smaColor}20` } : {}}>SMA</button>
               <button onClick={() => setShowEMA(!showEMA)} className={`text-[10px] font-bold px-2 py-1.5 rounded transition border ${showEMA ? `border-[${emaColor}] bg-[${emaColor}]/10 text-[${emaColor}]` : 'border-white/10 text-white/40'}`} style={showEMA ? { borderColor: emaColor, color: emaColor, backgroundColor: `${emaColor}20` } : {}}>EMA</button>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#0D0D0D] p-4 flex flex-col gap-2 relative overflow-y-auto overflow-x-hidden">
          <div className="h-[60%] w-full relative">
             <div className="absolute top-2 left-2 z-10 flex gap-2"><span className="text-sm font-mono font-bold text-white/50">Price</span></div>
             <ResponsiveContainer width="100%" height="100%">
               <ComposedChart data={mockData} syncId="proChart">
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                 <XAxis dataKey="time" hide />
                 <YAxis domain={['auto', 'auto']} orientation="right" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }} axisLine={false} tickLine={false} />
                 <Tooltip contentStyle={{ backgroundColor: '#161616', borderColor: 'rgba(212,175,55,0.3)', borderRadius: '12px' }} />
                 {chartType === 'area' ? <Area type="monotone" dataKey="price" stroke="#D4AF37" strokeWidth={2} fillOpacity={0.1} fill="#D4AF37" isAnimationActive={false} /> : <Bar dataKey="candleBody" shape={<CustomCandle />} isAnimationActive={false} />}
                 {showSMA && <Line type="monotone" dataKey="sma" stroke={smaColor} strokeWidth={1.5} dot={false} isAnimationActive={false} />}
                 {showEMA && <Line type="monotone" dataKey="ema" stroke={emaColor} strokeWidth={1.5} dot={false} isAnimationActive={false} />}
               </ComposedChart>
             </ResponsiveContainer>
          </div>
          <div className="h-[20%] w-full relative">
             <div className="absolute top-0 left-2 z-10"><span className="text-[10px] font-mono font-bold text-white/30">Volume</span></div>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={mockData} syncId="proChart">
                 <XAxis dataKey="time" hide />
                 <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<></>} />
                 <Bar dataKey="volume" fill="#ffffff" opacity={0.1} />
               </BarChart>
             </ResponsiveContainer>
          </div>
          <div className="h-[20%] w-full relative border-t border-white/5 pt-2">
             <div className="absolute top-2 left-2 z-10"><span className="text-[10px] font-mono font-bold text-[#8B5CF6]">RSI (14)</span></div>
             <ResponsiveContainer width="100%" height="100%">
               <RechartsLineChart data={mockData} syncId="proChart">
                 <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} axisLine={false} tickLine={false} />
                 <YAxis domain={[0, 100]} orientation="right" hide />
                 <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<></>} />
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                 <Line type="monotone" dataKey="rsi" stroke="#8B5CF6" strokeWidth={1.5} dot={false} isAnimationActive={false} />
               </RechartsLineChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="w-72 bg-[#161616] flex flex-col h-full overflow-y-auto">
         <div className="p-5 border-b border-white/5">
            <h3 className="text-white font-black flex items-center gap-2 mb-1"><Activity size={16} className="text-[#D4AF37]" /> Data Terminal</h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Real-time Metrics</p>
         </div>
         <div className="p-4 flex flex-col gap-3">
            <div className="bg-[#0D0D0D] p-4 rounded-xl border border-white/5">
               <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Current Price</span>
               <div className="flex items-end justify-between mt-1">
                  <span className="text-2xl font-mono font-bold">₱1342.00</span>
                  <span className="text-red-500 font-bold text-sm">▼ 0.41%</span>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
               <ScoreBox label="Market Cap" value="₱289.4B" tip="Total Company Size" />
               <ScoreBox label="24h Volume" value="1.2M Vol" tip="Shares traded today" />
               <ScoreBox label="RSI" value="44.2" status="warning" tip="Momentum indicator" />
               <ScoreBox label="P/E Ratio" value="11.5x" status="good" tip="Price Tag" />
            </div>
         </div>
      </div>
    </div>
  );
}

function ScoreBox({ label, value, status, tip }: any) {
  const color = status === 'good' ? 'text-[#00A86B]' : status === 'warning' ? 'text-[#F59E0B]' : 'text-white';
  return (
    <div className="bg-[#0D0D0D] p-3 rounded-xl border border-white/5 flex flex-col group">
      <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider mb-1">{label}</span>
      <span className={`text-sm font-mono font-bold ${color}`}>{value}</span>
      <span className="text-[8px] text-white/20 mt-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">{tip}</span>
    </div>
  );
}