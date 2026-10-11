/* KIRAAM CARSHARE — main app shell with router */

function App() {
  const TWEAKS_DEFAULT = /*EDITMODE-BEGIN*/{
    "scene": "home",
    "showBezel": true,
    "darkMode": false,
    "language": "fr",
    "theme": "light"
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAKS_DEFAULT) : [TWEAKS_DEFAULT, () => {}];

  // Navigation stack
  const [stack, setStack] = React.useState([{ scene: tweaks.scene || 'home', params: null }]);
  const current = stack[stack.length - 1];
  const [activeTab, setActiveTab] = React.useState(tweaks.scene || 'home');
  const [ownerMode, setOwnerMode] = React.useState(false);
  const [lang, setLang] = React.useState(tweaks.language || 'fr');
  const dark = tweaks.theme === 'dark' || tweaks.darkMode;

  React.useEffect(() => {
    if (tweaks.scene && tweaks.scene !== current.scene) {
      go(tweaks.scene);
    }
  }, [tweaks.scene]);

  const go = (scene, params) => {
    if (scene === -1) {
      if (stack.length > 1) setStack(stack.slice(0, -1));
      return;
    }
    // Tab switches → reset stack
    const tabs = ['home', 'search', 'bookings', 'messages', 'profile', 'owner-dash', 'owner-cars', 'owner-add'];
    if (tabs.includes(scene)) {
      setStack([{ scene, params }]);
      setActiveTab(scene);
    } else {
      setStack([...stack, { scene, params }]);
    }
  };

  const renderScene = () => {
    const { scene, params } = current;
    switch (scene) {
      case 'onboarding': return <OnboardingScreen dark={dark} go={go} />;
      case 'login': return <LoginScreen dark={dark} go={go} />;
      case 'otp': return <OtpScreen dark={dark} go={go} />;
      case 'verify': return <VerifyIdScreen dark={dark} go={go} />;
      case 'home': return <HomeScreen dark={dark} go={go} />;
      case 'search': return <SearchScreen dark={dark} go={go} />;
      case 'map': return <SearchScreen dark={dark} go={go} />;
      case 'car': return <CarDetailScreen dark={dark} go={go} carId={params} />;
      case 'booking': return <BookingScreen dark={dark} go={go} carId={params} />;
      case 'confirmation': return <ConfirmationScreen dark={dark} go={go} carId={params} />;
      case 'bookings': return <MyBookingsScreen dark={dark} go={go} />;
      case 'booking-detail': return <BookingDetailScreen dark={dark} go={go} bookingId={params} />;
      case 'messages': return <MessagesScreen dark={dark} go={go} />;
      case 'chat': return <ChatScreen dark={dark} go={go} peer={params} />;
      case 'owner-dash': return <OwnerDashboardScreen dark={dark} go={go} />;
      case 'owner-cars': return <MyCarsScreen dark={dark} go={go} />;
      case 'owner-add': return <AddCarScreen dark={dark} go={go} />;
      case 'profile': return <ProfileScreen dark={dark} go={go} ownerMode={ownerMode} setOwnerMode={(v) => { setOwnerMode(v); go(v ? 'owner-dash' : 'home'); }} />;
      case 'loyalty': return <LoyaltyScreen dark={dark} go={go} />;
      case 'referral': return <ReferralScreen dark={dark} go={go} />;
      case 'settings': return <SettingsScreen dark={dark} go={go} lang={lang} setLang={setLang} theme={tweaks.theme} setTheme={(v) => setTweak('theme', v)} />;
      case 'notifications': return <NotificationsScreen dark={dark} go={go} />;
      case 'support': return <SupportScreen dark={dark} go={go} />;
      case 'favorites': return <FavoritesScreen dark={dark} go={go} />;
      case 'edit-profile': return <EditProfileScreen dark={dark} go={go} />;
      default: return <HomeScreen dark={dark} go={go} />;
    }
  };

  // Determine which scenes show bottom tabs
  const tabbedScenes = ['home', 'search', 'bookings', 'messages', 'profile', 'owner-dash', 'owner-cars'];
  const showTabs = tabbedScenes.includes(current.scene);

  const content = (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: dark ? '#0A0E1A' : '#F8FAFC' }}>
      {/* Status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <IOSStatusBar dark={dark} />
      </div>

      {renderScene()}

      {showTabs && <BottomTabs dark={dark} active={activeTab} ownerMode={ownerMode || ['owner-dash', 'owner-cars'].includes(current.scene)} onChange={(id) => go(id)} />}
    </div>
  );

  // Outer page layout
  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: dark
        ? `radial-gradient(circle at 30% 20%, #1a2440 0%, #0A0E1A 60%)`
        : `radial-gradient(circle at 30% 20%, #E7F2FB 0%, #F8FAFC 60%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', fontFamily: 'Inter, -apple-system, system-ui, sans-serif',
      color: dark ? '#fff' : '#0A0E1A',
    }}>
      {/* Side panel — context */}
      <div style={{
        position: 'fixed', left: 32, top: '50%', transform: 'translateY(-50%)',
        width: 280, display: 'none',
      }} className="kside">
        <KiraamLogo size={36} color={dark ? '#fff' : '#0A0E1A'} />
        <div style={{ fontSize: 13, color: dark ? 'rgba(255,255,255,0.62)' : 'rgba(10,14,26,0.62)', marginTop: 16, lineHeight: 1.5 }}>
          La location de voitures entre particuliers à Djibouti. Cliquez sur les écrans pour explorer le prototype.
        </div>
        <div style={{ marginTop: 24, fontSize: 11, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(10,14,26,0.4)', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8 }}>Flux principaux</div>
        <SidebarLinks go={go} dark={dark} />
      </div>

      {tweaks.showBezel !== false ? (
        <IOSDevice dark={dark}>
          {content}
        </IOSDevice>
      ) : (
        <div style={{ width: 402, height: 874, position: 'relative', borderRadius: 28, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.18)' }}>
          {content}
        </div>
      )}

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Scène" />
          <window.TweakSelect label="Écran" value={tweaks.scene} options={[
            'onboarding', 'login', 'otp', 'verify',
            'home', 'search', 'car', 'booking', 'confirmation',
            'bookings', 'booking-detail', 'messages', 'chat',
            'owner-dash', 'owner-cars', 'owner-add',
            'profile', 'loyalty', 'referral', 'settings', 'notifications', 'support',
          ]} onChange={(v) => setTweak('scene', v)} />
          <window.TweakSection label="Apparence" />
          <window.TweakRadio label="Thème" value={tweaks.theme} options={['light', 'dark']} onChange={(v) => setTweak('theme', v)} />
          <window.TweakToggle label="Châssis iPhone" value={tweaks.showBezel} onChange={(v) => setTweak('showBezel', v)} />
          <window.TweakSection label="Langue" />
          <window.TweakRadio label="Langue" value={tweaks.language} options={['fr', 'ar', 'en']} onChange={(v) => setTweak('language', v)} />
        </window.TweaksPanel>
      )}
    </div>
  );
}

function SidebarLinks({ go, dark }) {
  const groups = [
    { l: 'Onboarding', items: [['onboarding', 'Onboarding'], ['login', 'Login'], ['otp', 'OTP'], ['verify', 'Vérif. ID']] },
    { l: 'Locataire', items: [['home', 'Accueil'], ['search', 'Recherche'], ['car', 'Détails voiture'], ['booking', 'Réservation'], ['confirmation', 'Confirmation']] },
    { l: 'Mes locations', items: [['bookings', 'Mes locations'], ['booking-detail', 'Détail réservation'], ['messages', 'Messages'], ['chat', 'Chat']] },
    { l: 'Propriétaire', items: [['owner-dash', 'Dashboard'], ['owner-cars', 'Mes véhicules'], ['owner-add', 'Ajouter']] },
    { l: 'Profil', items: [['profile', 'Profil'], ['loyalty', 'Rewards'], ['referral', 'Parrainage'], ['notifications', 'Notifications'], ['settings', 'Paramètres'], ['support', 'Support']] },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {groups.map(g => (
        <div key={g.l}>
          <div style={{ fontSize: 10, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(10,14,26,0.4)', fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>{g.l}</div>
          {g.items.map(([id, l]) => (
            <button key={id} onClick={() => go(id)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '5px 8px', background: 'none', border: 'none', cursor: 'pointer',
              color: dark ? 'rgba(255,255,255,0.78)' : 'rgba(10,14,26,0.78)',
              fontSize: 12, fontFamily: 'inherit', borderRadius: 6,
            }}>{l}</button>
          ))}
        </div>
      ))}
    </div>
  );
}

// Simple favorites / edit profile stubs
function FavoritesScreen({ dark, go }) {
  const t = getTheme(dark);
  const { CARS } = window.KDATA;
  const favs = CARS.filter(c => c.super).slice(0, 4);
  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 30 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go('profile')} title="Favoris" />
      <div style={{ padding: '12px 20px 6px', fontSize: 13, color: t.muted }}>{favs.length} véhicules sauvegardés</div>
      <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {favs.map(c => <CarCardHorizontal key={c.id} car={c} dark={dark} onClick={() => go('car', c.id)} />)}
      </div>
    </div>
  );
}

function EditProfileScreen({ dark, go }) {
  const t = getTheme(dark);
  const { USERS } = window.KDATA;
  const me = USERS.me;
  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 40 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go('profile')} title="Modifier le profil" action={
        <button style={{ background: 'none', border: 'none', color: KBRAND.blue, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Enregistrer</button>
      } />
      <div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={me.avatar} style={{ width: 100, height: 100, borderRadius: 50, objectFit: 'cover' }} />
          <button style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, background: KBRAND.blue, color: '#fff', border: `3px solid ${t.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon.Camera size={14} />
          </button>
        </div>
      </div>
      <div style={{ padding: '0 20px' }}>
        <Input dark={dark} label="Nom complet" defaultValue={me.name} />
        <Input dark={dark} label="Email" defaultValue="omar.kassim@gmail.com" />
        <Input dark={dark} label="Téléphone" defaultValue="+253 77 12 34 56" />
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.muted, marginBottom: 8 }}>Bio</div>
          <textarea defaultValue="Passionné de road trips et d'aventures à Djibouti." style={{ width: '100%', minHeight: 80, padding: '14px 16px', boxSizing: 'border-box', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, fontSize: 14, color: t.text, fontFamily: 'inherit', resize: 'vertical' }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { App, FavoritesScreen, EditProfileScreen });
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
