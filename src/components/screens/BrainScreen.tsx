/* DevelopedByCaleb - Bihasa AI Persona Screen */
import { Sparkles, Brain, Globe, ShieldAlert, Cpu } from 'lucide-react';

export function BrainScreen() {
  return (
    <div className="flex flex-col relative pb-20 px-6 pt-8 animate-in fade-in duration-500">
      
      {/* Visual Header */}
      <div className="flex flex-col items-center justify-center mb-10 mt-6 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-transparent blur-[50px] rounded-full" />
         <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#161616] to-[#0D0D0D] border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)] mb-6 relative z-10">
            <Brain size={40} className="text-[#D4AF37]" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#0D0D0D] rounded-full border border-white/10 flex items-center justify-center">
               <Sparkles size={14} className="text-[#00A86B]" />
            </div>
         </div>
         <h1 className="text-3xl font-black text-white tracking-wide mb-2 text-center">Meet Bihasa</h1>
         <p className="text-[12px] font-bold text-[#D4AF37] tracking-widest uppercase text-center">Your Institutional-Grade AI Copilot</p>
      </div>

      {/* Description Body */}
      <div className="space-y-6">
         <p className="text-sm text-white/80 leading-relaxed font-light text-center px-4">
            Bihasa is not just a chatbot. It is a highly specialized, financial-language model engineered to democratize institutional-grade market intelligence. 
         </p>

         <div className="grid grid-cols-1 gap-3 pt-4">
            <FeatureCard 
               icon={<Globe size={18} />} 
               title="Global Market Mastery" 
               desc="Trained on millions of financial documents, SEC filings, and global macroeconomic trends spanning Equities, Crypto, and Real Estate." 
            />
            <FeatureCard 
               icon={<Cpu size={18} />} 
               title="Algorithmic Objectivity" 
               desc="Removes human emotion from trading. Bihasa parses technical indicators and fundamental health to provide raw, data-driven synthesis." 
            />
         </div>

         {/* Standard AI Disclosure */}
         <div className="mt-10 p-5 bg-white/[0.02] border border-white/10 rounded-2xl flex flex-col items-center text-center gap-3">
            <div className="p-2 bg-white/5 rounded-full"><ShieldAlert size={16} className="text-[#D4AF37]" /></div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">Important Disclosure</h4>
            <p className="text-[11px] text-white/50 leading-relaxed">
               Bihasa is an AI trained model. It processes massive amounts of historical and real-time data, but the markets are inherently unpredictable. <strong className="text-white/70">AI can make mistakes.</strong> We continuously monitor and train Bihasa to learn from its errors. Insights provided do not constitute financial advice. Always conduct your own research (DYOR) before executing any trade.
            </p>
         </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-5 rounded-2xl bg-[#161616]/50 border border-white/5 flex gap-4 items-start">
       <div className="p-2.5 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20 flex-shrink-0">
          {icon}
       </div>
       <div>
          <h3 className="text-sm font-bold text-white mb-1.5">{title}</h3>
          <p className="text-[12px] text-white/50 leading-relaxed font-light">{desc}</p>
       </div>
    </div>
  );
}