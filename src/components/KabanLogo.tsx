export function KabanLogo({
  className = '',
  size = 56,
  glow = false,
}: {
  className?: string;
  size?: number;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-500 ${
        glow ? 'animate-circuit-glow drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Synchronized Liquid Gold Gradient */}
          <linearGradient id="kgGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" />   {/* Bright Highlight */}
            <stop offset="50%" stopColor="#D4AF37" />  {/* Core Sovereign Gold */}
            <stop offset="100%" stopColor="#997A15" /> {/* Deep Shadow */}
          </linearGradient>
          
          <linearGradient id="kgRing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F3E5AB" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Outer decorative ring */}
        <circle cx="50" cy="50" r="47" stroke="url(#kgRing)" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="url(#kgGold)" strokeWidth="0.5" fill="none" opacity="0.25" />

        {/* Corner circuit dots on ring */}
        <circle cx="50" cy="3" r="2.5" fill="url(#kgGold)" opacity="0.8" />
        <circle cx="97" cy="50" r="2.5" fill="url(#kgGold)" opacity="0.8" />
        <circle cx="50" cy="97" r="2.5" fill="url(#kgGold)" opacity="0.8" />
        <circle cx="3"  cy="50" r="2.5" fill="url(#kgGold)" opacity="0.8" />

        {/* ─── Baybayin ᜃ (KA) — geometric form ─── */}
        {/* Vertical stroke */}
        <line x1="26" y1="18" x2="26" y2="82" stroke="url(#kgGold)" strokeWidth="6.5" strokeLinecap="round" />

        {/* Upper diagonal arm */}
        <line x1="26" y1="38" x2="72" y2="18" stroke="url(#kgGold)" strokeWidth="6.5" strokeLinecap="round" />

        {/* Lower diagonal arm */}
        <line x1="26" y1="50" x2="72" y2="82" stroke="url(#kgGold)" strokeWidth="6.5" strokeLinecap="round" />

        {/* Circuit nodes at terminals */}
        <circle cx="26" cy="18" r="5.5" fill="url(#kgGold)" />
        <circle cx="26" cy="82" r="5.5" fill="url(#kgGold)" />
        <circle cx="72" cy="18" r="5.5" fill="url(#kgGold)" />
        <circle cx="72" cy="82" r="5.5" fill="url(#kgGold)" />

        {/* Mid-node (connection point of both arms) */}
        <circle cx="26" cy="50" r="7" fill="url(#kgGold)" />
        {/* Inner cutout matching the Obsidian Matte background */}
        <circle cx="26" cy="50" r="3.5" fill="#0D0D0D" />

        {/* Micro circuit traces */}
        <line x1="26" y1="18" x2="40"  y2="18" stroke="url(#kgGold)" strokeWidth="1.5" opacity="0.5" />
        <line x1="72" y1="18" x2="84"  y2="18" stroke="url(#kgGold)" strokeWidth="1.5" opacity="0.5" />
        <line x1="26" y1="82" x2="40"  y2="82" stroke="url(#kgGold)" strokeWidth="1.5" opacity="0.5" />
        <line x1="72" y1="82" x2="84"  y2="82" stroke="url(#kgGold)" strokeWidth="1.5" opacity="0.5" />
        <line x1="26" y1="18" x2="26"  y2="8"  stroke="url(#kgGold)" strokeWidth="1.5" opacity="0.5" />
        <line x1="26" y1="82" x2="26"  y2="92" stroke="url(#kgGold)" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </div>
  );
}