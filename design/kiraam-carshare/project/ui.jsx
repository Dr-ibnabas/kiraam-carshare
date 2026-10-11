/* KIRAAM CARSHARE — shared UI primitives + theme */

const KBRAND = {
  blue: '#6AB2E7',
  blueDark: '#3D8EC9',
  green: '#12AD2B',
  red: '#D7141A',
  gold: '#F5A623',
};

// Returns CSS variable values for light/dark
function getTheme(dark) {
  if (dark) return {
    bg: '#0A0E1A', surface: '#141B2D', card: '#1B2236', border: 'rgba(255,255,255,0.08)',
    text: '#F8FAFC', muted: 'rgba(248,250,252,0.62)', faint: 'rgba(248,250,252,0.38)',
    chipBg: 'rgba(106,178,231,0.14)', tabBg: 'rgba(10,14,26,0.92)',
    skel: 'rgba(255,255,255,0.06)',
  };
  return {
    bg: '#F8FAFC', surface: '#FFFFFF', card: '#FFFFFF', border: 'rgba(15,23,42,0.08)',
    text: '#0A0E1A', muted: 'rgba(10,14,26,0.62)', faint: 'rgba(10,14,26,0.38)',
    chipBg: '#EEF6FC', tabBg: 'rgba(255,255,255,0.96)',
    skel: 'rgba(15,23,42,0.06)',
  };
}

// Currency
function fdj(n) {
  return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' Fdj';
}

// Star rating display
function Stars({ rating, size = 12, color = KBRAND.gold }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color, fontSize: size + 1, fontWeight: 600 }}>
      <Icon.Star size={size} stroke="none" /> <span>{rating.toFixed(1)}</span>
    </span>
  );
}

// Badge
function Badge({ children, variant = 'default', style }) {
  const variants = {
    default: { bg: 'rgba(106,178,231,0.14)', fg: KBRAND.blueDark },
    verified: { bg: 'rgba(18,173,43,0.14)', fg: KBRAND.green },
    super: { bg: 'rgba(245,166,35,0.16)', fg: '#B07514' },
    danger: { bg: 'rgba(215,20,26,0.14)', fg: KBRAND.red },
    dark: { bg: 'rgba(0,0,0,0.7)', fg: '#fff' },
  };
  const v = variants[variant] || variants.default;
  return (
    <span style={{
      background: v.bg, color: v.fg, padding: '3px 8px', borderRadius: 8,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.1, display: 'inline-flex', alignItems: 'center', gap: 4,
      ...style,
    }}>{children}</span>
  );
}

// Solid button
function KButton({ children, variant = 'primary', onClick, full = true, size = 'md', icon, style }) {
  const sizes = {
    sm: { h: 36, fs: 13, px: 14 },
    md: { h: 48, fs: 15, px: 18 },
    lg: { h: 54, fs: 16, px: 20 },
  };
  const s = sizes[size];
  const variants = {
    primary: { bg: KBRAND.blue, fg: '#fff', border: 'none' },
    dark: { bg: '#0A0E1A', fg: '#fff', border: 'none' },
    green: { bg: KBRAND.green, fg: '#fff', border: 'none' },
    ghost: { bg: 'transparent', fg: 'currentColor', border: '1px solid rgba(15,23,42,0.12)' },
    outline: { bg: 'transparent', fg: KBRAND.blue, border: `1.5px solid ${KBRAND.blue}` },
    soft: { bg: 'rgba(106,178,231,0.14)', fg: KBRAND.blueDark, border: 'none' },
  };
  const v = variants[variant];
  return (
    <button onClick={onClick} style={{
      width: full ? '100%' : 'auto',
      height: s.h, padding: `0 ${s.px}px`,
      background: v.bg, color: v.fg, border: v.border,
      borderRadius: 14, fontWeight: 700, fontSize: s.fs,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      cursor: 'pointer', fontFamily: 'inherit', letterSpacing: -0.1,
      ...style,
    }}>
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      {children}
    </button>
  );
}

// Card surface
function Surface({ children, dark, style, onClick }) {
  const t = getTheme(dark);
  return (
    <div onClick={onClick} style={{
      background: t.card, borderRadius: 18,
      border: `1px solid ${t.border}`,
      boxShadow: dark ? 'none' : '0 1px 2px rgba(15,23,42,0.04)',
      ...style,
    }}>{children}</div>
  );
}

// Top bar (back, title, action)
function TopBar({ dark, onBack, title, action, transparent }) {
  const t = getTheme(dark);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px 12px',
      background: transparent ? 'transparent' : t.surface,
      borderBottom: transparent ? 'none' : `1px solid ${t.border}`,
      position: 'relative', zIndex: 2,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: 19,
          background: transparent ? 'rgba(255,255,255,0.85)' : t.bg,
          border: `1px solid ${t.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: t.text, backdropFilter: 'blur(8px)',
        }}><Icon.ChevronLeft size={20} sw={2.4} /></button>
      )}
      <div style={{ flex: 1, fontSize: 17, fontWeight: 700, color: t.text, letterSpacing: -0.2 }}>{title}</div>
      {action}
    </div>
  );
}

// Bottom tab bar
function BottomTabs({ dark, active, onChange, ownerMode }) {
  const t = getTheme(dark);
  const tabs = ownerMode ? [
    { id: 'owner-dash', label: 'Dashboard', icon: Icon.BarChart },
    { id: 'owner-cars', label: 'Voitures', icon: Icon.Car },
    { id: 'owner-add', label: 'Ajouter', icon: Icon.Plus, primary: true },
    { id: 'messages', label: 'Messages', icon: Icon.MessageCircle },
    { id: 'profile', label: 'Profil', icon: Icon.User },
  ] : [
    { id: 'home', label: 'Accueil', icon: Icon.Home },
    { id: 'search', label: 'Recherche', icon: Icon.Search },
    { id: 'bookings', label: 'Locations', icon: Icon.Calendar },
    { id: 'messages', label: 'Messages', icon: Icon.MessageCircle },
    { id: 'profile', label: 'Profil', icon: Icon.User },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 8,
      background: t.tabBg, backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${t.border}`,
      display: 'flex', justifyContent: 'space-around', zIndex: 30,
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const TabIcon = tab.icon;
        if (tab.primary) {
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '2px 6px', position: 'relative',
            }}>
              <div style={{
                width: 46, height: 46, borderRadius: 14,
                background: KBRAND.blue, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(106,178,231,0.4)',
                marginTop: -10, marginBottom: 2,
              }}><Icon.Plus size={22} sw={2.6} /></div>
              <div style={{ fontSize: 10, fontWeight: 600, color: t.muted, marginTop: 2 }}>{tab.label}</div>
            </button>
          );
        }
        return (
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 6px', color: isActive ? KBRAND.blue : t.faint,
            transition: 'color 150ms', flex: 1,
          }}>
            <TabIcon size={22} sw={isActive ? 2.4 : 2} />
            <div style={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}>{tab.label}</div>
          </button>
        );
      })}
    </div>
  );
}

// Chip
function Chip({ children, active, onClick, dark, icon, style }) {
  const t = getTheme(dark);
  return (
    <button onClick={onClick} style={{
      height: 36, padding: '0 14px',
      background: active ? '#0A0E1A' : t.surface,
      color: active ? '#fff' : t.text,
      border: `1px solid ${active ? '#0A0E1A' : t.border}`,
      borderRadius: 100, fontSize: 13, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 6,
      cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
      flexShrink: 0,
      ...style,
    }}>
      {icon}
      {children}
    </button>
  );
}

// Section header
function SectionHeader({ title, action, onAction, dark, style }) {
  const t = getTheme(dark);
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px', marginBottom: 12, ...style }}>
      <div style={{ fontSize: 18, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>{title}</div>
      {action && <button onClick={onAction} style={{ background: 'none', border: 'none', color: KBRAND.blue, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>{action}</button>}
    </div>
  );
}

// Photo placeholder (in case Unsplash blocks)
function Photo({ src, alt, style }) {
  return (
    <div style={{
      backgroundImage: `linear-gradient(135deg, rgba(106,178,231,0.2), rgba(18,173,43,0.15)), url(${src})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      backgroundColor: '#1B2236',
      ...style,
    }} role="img" aria-label={alt} />
  );
}

// Logo (KIRAAM mark)
function KiraamLogo({ size = 32, color = '#0A0E1A' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.28,
        background: `linear-gradient(135deg, ${KBRAND.blue}, ${KBRAND.blueDark})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(106,178,231,0.35)',
        position: 'relative',
      }}>
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
          <path d="M3 18h2l1-3h12l1 3h2l-2.5-7.5C18 9.5 17 9 16 9H8c-1 0-2 .5-2.5 1.5L3 18z" fill="#fff"/>
          <circle cx="7.5" cy="17.5" r="1.8" fill={KBRAND.blueDark}/>
          <circle cx="16.5" cy="17.5" r="1.8" fill={KBRAND.blueDark}/>
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ fontSize: size * 0.55, fontWeight: 900, color, letterSpacing: -0.4 }}>KIRAAM</div>
        <div style={{ fontSize: size * 0.28, fontWeight: 600, color: KBRAND.blue, letterSpacing: size * 0.18, marginTop: 2 }}>CARSHARE</div>
      </div>
    </div>
  );
}

Object.assign(window, { KBRAND, getTheme, fdj, Stars, Badge, KButton, Surface, TopBar, BottomTabs, Chip, SectionHeader, Photo, KiraamLogo });
