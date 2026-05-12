import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Removed Sparkles as the header is gone

interface InsightCardProps {
  insights: string[];
  deepDive: {
    technical: string[];
    fundamental: string[];
    sources: string[];
  };
}

export function InsightCard({ insights, deepDive }: InsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mx-4 my-6 w-full max-w-full">
      {/* Liquid Glass Container */}
      <div className="relative bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)_inset_0_1px_0_rgba(255,255,255,0.05)]">
        
        {/* Subtle Gold Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 2px, transparent 2px, transparent 12px)`,
          }}
        />

        <div className="relative p-5">
          
          {/* INSIGHTS BULLETS ONLY (Header Removed per specifications) */}
          <div className="space-y-3 mt-1">
            {insights.map((insight, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                <p className="text-white/90 text-[13px] leading-relaxed font-light">{insight}</p>
              </div>
            ))}
          </div>

          {/* Revised CTA Button (44px hit target) */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 w-full h-[44px] px-4 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0D0D0D] rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] shadow-[0_4px_14px_rgba(212,175,55,0.25)]"
          >
            <span className="font-bold text-[12px] tracking-wide uppercase">
              {isExpanded ? 'Hide In-depth Insights' : 'See In-depth Insights'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>

          {/* Deep Dive Expanded Section */}
          {isExpanded && (
            <div className="mt-5 pt-5 border-t border-white/10 space-y-6 animate-in slide-in-from-top-4 duration-300">
              
              {/* Technical Analysis */}
              <div>
                <h4 className="text-[10px] font-bold tracking-wider uppercase text-[#D4AF37] mb-3">
                  Technical Analysis
                </h4>
                <div className="space-y-2">
                  {deepDive.technical.map((item, index) => (
                    <div
                      key={index}
                      className="text-[13px] text-white/80 pl-4 border-l-2 border-[#D4AF37]/30 font-light leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fundamental Data */}
              <div>
                <h4 className="text-[10px] font-bold tracking-wider uppercase text-[#D4AF37] mb-3">
                  Fundamental Data
                </h4>
                <div className="space-y-2">
                  {deepDive.fundamental.map((item, index) => (
                    <div
                      key={index}
                      className="text-[13px] text-white/80 pl-4 border-l-2 border-[#D4AF37]/30 font-light leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div>
                <h4 className="text-[10px] font-bold tracking-wider uppercase text-[#D4AF37] mb-3">
                  Sources
                </h4>
                <div className="space-y-2">
                  {deepDive.sources.map((source, index) => (
                    <div
                      key={index}
                      className="text-[11px] text-white/40 pl-4 border-l-2 border-white/10"
                    >
                      {source}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}