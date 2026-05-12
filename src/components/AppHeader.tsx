import { Bell, Search } from 'lucide-react';
import { KabanLogo } from './KabanLogo';

interface AppHeaderProps {
  onSearch?: () => void;
  onBell?: () => void;
}

export function AppHeader({ onSearch, onBell }: AppHeaderProps) {
  return (
    // Enforced Obsidian Matte background
    <div className="relative px-5 pt-12 pb-5 bg-[#0D0D0D]">
      
      {/* Top-right action buttons - 44x44pt hit targets preserved */}
      <div className="absolute top-12 right-5 flex items-center gap-2 z-10">
        <button
          onClick={onSearch}
          className="flex items-center justify-center w-[44px] h-[44px] rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10 active:scale-95"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-white/50" />
        </button>
        
        <button
          onClick={onBell}
          className="relative flex items-center justify-center w-[44px] h-[44px] rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10 active:scale-95"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-white/50" />
          {/* Notification dot - Liquid Gold */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        </button>
      </div>

      {/* Centered branding hierarchy */}
      <div className="flex flex-col items-center gap-1 mt-2">
        {/* Gold circuit ᜃ logo */}
        <KabanLogo size={60} glow className="mb-1" />

        {/* KABAN Header */}
        <span className="text-white/80 text-xs font-medium tracking-[0.35em] uppercase">
          Kaban
        </span>

        {/* BIHASA — Liquid Gold text gradient for premium feel */}
        <span className="text-4xl font-bold tracking-[0.06em] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] mt-1">
          Bihasa
        </span>

        {/* THE SOVEREIGN PULSE — Silver, exact 10pt (10px), letter-spaced */}
        <span className="text-[#A0A0A5] text-[10px] font-medium tracking-[0.25em] uppercase mt-1">
          The Sovereign Pulse
        </span>
      </div>
    </div>
  );
}