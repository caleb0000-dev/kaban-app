/* DevelopedByCaleb */
import { Sparkles, Activity, ShieldAlert } from 'lucide-react';

interface MarketBihasaProps {
  insights: string[];
  marketDeepDive: any; 
}

export function MarketBihasa({ insights }: MarketBihasaProps) {
  return (
    <div className="px-5">
      <div className="w-full rounded-3xl p-6 bg-gradient-to-br from-[#161616] to-[#0D0D0D] border border-[#D4AF37]/20 shadow-[0_10px_40px_rgba(212,175,55,0.08)] relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
            <div className="p-2 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/30">
               <Activity className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-white tracking-wide">Daily Synthesis</h3>
              <p className="text-[10px] text-white/40 tracking-widest uppercase font-medium mt-0.5">Macro Overview</p>
            </div>
          </div>

          <div className="space-y-4">
            {insights.length > 0 ? (
               insights.map((insight, i) => (
                 <div key={i} className="flex gap-3 items-start">
                   <div className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                   <p className="text-[13px] text-white/85 leading-relaxed font-light">{insight}</p>
                 </div>
               ))
            ) : (
               <div className="flex gap-3 items-start">
                 <div className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00A86B] shadow-[0_0_8px_rgba(0,168,107,0.8)]" />
                 <p className="text-[13px] text-white/85 leading-relaxed font-light">
                   Markets are consolidating. Heavy volume detected in the Telecommunications sector following major infrastructure announcements. Wait for clear breakouts above resistance levels before deploying heavy capital.
                 </p>
               </div>
            )}
          </div>
          
          <button className="w-full mt-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
             <Sparkles className="w-4 h-4 text-[#D4AF37]" />
             <span className="text-[11px] font-bold text-white tracking-widest uppercase">Generate Custom Outlook</span>
          </button>

          <div className="mt-5 pt-4 border-t border-white/5 flex items-start gap-3">
             <ShieldAlert className="w-4 h-4 text-[#D4AF37]/50 flex-shrink-0 mt-0.5" />
             <p className="text-[9px] text-white/30 leading-relaxed italic">
               Bihasa is an AI model. It can make mistakes but continuously learns from them. Data provided does not constitute financial advice. Always DYOR.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}