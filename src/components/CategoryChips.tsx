
const CATEGORIES = [
  { id: 'all',        label: 'All' },
  { id: 'financials', label: 'Financials' },
  { id: 'property',   label: 'Property' },
  { id: 'mining',     label: 'Mining' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'telecom',    label: 'Telecom' },
];

interface CategoryChipsProps {
  active: string;
  onChange: (id: string) => void;
}

export function CategoryChips({ active, onChange }: CategoryChipsProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide px-5 pb-2">
      <div className="flex gap-2 w-max">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              // Enforcing 44px hit target and "Liquid Glass" backdrop-blur
              className={`
                flex items-center justify-center h-[44px] px-5 rounded-full text-xs tracking-[0.04em] transition-all duration-200 backdrop-blur-md
                ${isActive 
                  ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/50 text-[#D4AF37] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                  : 'bg-black/40 border border-white/10 text-white/50 font-medium hover:bg-white/5 hover:text-white/70 hover:border-white/20'
                }
              `}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { CATEGORIES };