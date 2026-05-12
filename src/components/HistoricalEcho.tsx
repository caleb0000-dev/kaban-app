import { Clock } from 'lucide-react';

interface HistoricalEchoProps {
  event: {
    date: string;
    description: string;
    similarity: number;
  };
}

export function HistoricalEcho({ event }: HistoricalEchoProps) {
  return (
    <div className="mx-5 mb-6">
      {/* Liquid Glass Container */}
      <div className="relative p-5 rounded-2xl bg-[#0D0D0D]/80 backdrop-blur-xl border border-[#D4AF37]/20 shadow-[0_8px_24px_rgba(0,0,0,0.6)_inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
        
        {/* Subtle internal gold illumination */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />

        <div className="relative flex items-start gap-4">
          
          {/* Framed Icon */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex-shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
          </div>
          
          <div className="flex-1">
            {/* Header / Metadata */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.1em] uppercase">
                Historical Echo
              </span>
              <span className="text-[10px] text-white/30">•</span>
              <span className="text-[10px] font-medium text-[#A0A0A5] tracking-wider uppercase">
                {event.date}
              </span>
            </div>
            
            {/* AI Insight Description */}
            <p className="text-[13px] text-white/85 leading-relaxed font-light mb-4">
              {event.description}
            </p>
            
            {/* Premium Similarity Meter */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37]/40 to-[#D4AF37] relative shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  style={{ width: `${event.similarity}%` }}
                >
                  {/* Highlight glow on the leading edge of the progress bar */}
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 blur-[1px]" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-wider text-right min-w-[32px]">
                {event.similarity}%
              </span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}