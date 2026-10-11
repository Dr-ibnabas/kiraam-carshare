/* Onboarding + Auth screens */

function OnboardingScreen({ dark, go }) {
  const [step, setStep] = React.useState(0);
  const t = getTheme(dark);
  const slides = [
    {
      bg: 'linear-gradient(180deg, #6AB2E7 0%, #3D8EC9 100%)',
      img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900',
      title: 'Trouvez la voiture parfaite à Djibouti',
      sub: 'Des centaines de véhicules entre particuliers, du citadine au 4x4 pour Lac Assal.',
      illu: '🚙',
    },
    {
      bg: 'linear-gradient(180deg, #12AD2B 0%, #0A7E1F 100%)',
      img: 'https://images.unsplash.com/photo-1547149200-1ad62293048d?w=900',
      title: 'Réservez en quelques clics',
      sub: 'Paiement D-Money, Waafi ou cash. Confirmation instantanée avec QR code.',
      illu: '⚡',
    },
    {
      bg: 'linear-gradient(180deg, #F5A623 0%, #C97F0F 100%)',
      img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900',
      title: 'Gagnez avec votre voiture',
      sub: 'Devenez propriétaire-hôte et générez des revenus en louant votre véhicule.',
      illu: '💰',
    },
  ];
  const s = slides[step];

  return (
    <div style={{ position: 'absolute', inset: 0, background: s.bg, color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 60 }} />
      <div style={{ padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <KiraamLogo color="#fff" />
        <button onClick={() => go('login')} style={{ background: 'rgba(255,255,255,0.18)', border: 'none', color: '#fff', padding: '8px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Passer</button>
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', margin: '20px 24px 0' }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: 28, overflow: 'hidden',
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 100%), url(${s.img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }} />
        <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,0.95)', borderRadius: 14, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, color: '#0A0E1A', fontSize: 12, fontWeight: 700 }}>
          <Icon.MapPin size={14} stroke={KBRAND.red} /> Djibouti-ville
        </div>
        <div style={{ position: 'absolute', bottom: 18, right: 18, background: 'rgba(255,255,255,0.95)', borderRadius: 14, padding: 10, display: 'flex', alignItems: 'center', gap: 8, color: '#0A0E1A' }}>
          <div style={{ width: 30, height: 30, borderRadius: 10, background: KBRAND.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16 }}>{s.illu}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.6 }}>À partir de</div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>8 000 Fdj/jour</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 28px 24px' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.15, marginBottom: 12, textWrap: 'balance' }}>{s.title}</div>
        <div style={{ fontSize: 15, lineHeight: 1.45, opacity: 0.92, textWrap: 'pretty' }}>{s.sub}</div>

        <div style={{ display: 'flex', gap: 6, margin: '24px 0 20px' }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              height: 5, borderRadius: 5,
              width: i === step ? 28 : 8,
              background: i === step ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'all 250ms',
            }} />
          ))}
        </div>

        <KButton variant="dark" onClick={() => step < slides.length - 1 ? setStep(step + 1) : go('login')} style={{ background: '#fff', color: '#0A0E1A', height: 54 }}>
          {step < slides.length - 1 ? 'Suivant' : 'Commencer'} <Icon.ArrowRight size={18} />
        </KButton>
      </div>
    </div>
  );
}

function LoginScreen({ dark, go }) {
  const t = getTheme(dark);
  const [mode, setMode] = React.useState('email'); // 'email' or 'phone'
  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 60 }} />
      <button onClick={() => go('onboarding')} style={{ position: 'absolute', top: 56, left: 16, background: t.surface, border: `1px solid ${t.border}`, width: 38, height: 38, borderRadius: 19, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.text }}>
        <Icon.ChevronLeft size={20} />
      </button>

      <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <KiraamLogo size={40} color={t.text} />
      </div>

      <div style={{ padding: '24px 28px 0', flex: 1 }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>Bon retour 👋</div>
        <div style={{ fontSize: 14, color: t.muted, marginBottom: 24 }}>Connectez-vous pour réserver votre prochaine voiture.</div>

        <div style={{ display: 'flex', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 4, marginBottom: 18 }}>
          {['email', 'phone'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, height: 38, borderRadius: 10, border: 'none',
              background: mode === m ? KBRAND.blue : 'transparent',
              color: mode === m ? '#fff' : t.muted,
              fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
            }}>{m === 'email' ? 'Email' : 'Téléphone'}</button>
          ))}
        </div>

        {mode === 'email' ? (
          <React.Fragment>
            <Input dark={dark} label="Email" placeholder="ahmed@example.com" defaultValue="omar.kassim@gmail.com" />
            <Input dark={dark} label="Mot de passe" placeholder="••••••••" type="password" defaultValue="passwordhidden" />
            <div style={{ textAlign: 'right', marginTop: 6 }}>
              <button style={{ background: 'none', border: 'none', color: KBRAND.blue, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Mot de passe oublié ?</button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ fontSize: 13, fontWeight: 600, color: t.muted, marginBottom: 8 }}>Téléphone</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <div style={{ height: 52, padding: '0 14px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                🇩🇯 +253
              </div>
              <input defaultValue="77 12 34 56" style={{ flex: 1, height: 52, padding: '0 16px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, fontSize: 15, color: t.text, fontFamily: 'inherit' }} />
            </div>
            <div style={{ fontSize: 12, color: t.muted, marginBottom: 16, lineHeight: 1.5 }}>Nous vous enverrons un code OTP par SMS pour vérifier votre numéro.</div>
          </React.Fragment>
        )}

        <KButton variant="primary" onClick={() => go(mode === 'phone' ? 'otp' : 'home')} style={{ marginTop: 8 }}>
          {mode === 'phone' ? 'Recevoir le code' : 'Se connecter'}
        </KButton>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: t.border }} />
          <div style={{ fontSize: 12, color: t.faint, fontWeight: 600 }}>OU</div>
          <div style={{ flex: 1, height: 1, background: t.border }} />
        </div>

        <KButton variant="ghost" style={{ marginBottom: 10, color: t.text, border: `1px solid ${t.border}` }}>
          <span style={{ fontSize: 16 }}>G</span> Continuer avec Google
        </KButton>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: t.muted }}>
          Pas encore de compte ?{' '}
          <button onClick={() => go('home')} style={{ background: 'none', border: 'none', color: KBRAND.blue, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>S'inscrire</button>
        </div>
      </div>
    </div>
  );
}

function Input({ dark, label, hint, ...props }) {
  const t = getTheme(dark);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.muted, marginBottom: 8 }}>{label}</div>
      <input {...props} style={{
        width: '100%', height: 52, padding: '0 16px', boxSizing: 'border-box',
        background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14,
        fontSize: 15, color: t.text, fontFamily: 'inherit',
      }} />
      {hint && <div style={{ fontSize: 12, color: t.faint, marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

function OtpScreen({ dark, go }) {
  const t = getTheme(dark);
  const [code, setCode] = React.useState(['7', '4', '', '', '', '']);
  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 60 }} />
      <TopBar dark={dark} onBack={() => go('login')} title="" transparent />
      <div style={{ padding: '0 28px', flex: 1 }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>Vérification</div>
        <div style={{ fontSize: 14, color: t.muted, marginBottom: 28, lineHeight: 1.5 }}>
          Entrez le code à 6 chiffres envoyé au<br /><strong style={{ color: t.text }}>+253 77 12 34 56</strong>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {code.map((c, i) => (
            <div key={i} style={{
              flex: 1, height: 60,
              background: t.surface,
              border: `1.5px solid ${c ? KBRAND.blue : t.border}`,
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, fontWeight: 800, color: t.text,
            }}>{c}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', fontSize: 13, color: t.muted, marginBottom: 24 }}>
          Renvoyer dans <strong style={{ color: t.text }}>00:42</strong>
        </div>

        <KButton variant="primary" onClick={() => go('verify')}>Vérifier</KButton>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: t.muted }}>
          Pas reçu ? <span style={{ color: KBRAND.blue, fontWeight: 700 }}>Renvoyer le code</span>
        </div>
      </div>
    </div>
  );
}

function VerifyIdScreen({ dark, go }) {
  const t = getTheme(dark);
  const [step, setStep] = React.useState(0);
  const steps = [
    { title: 'Pièce d\'identité', sub: 'CNI djiboutienne ou passeport', icon: '🪪' },
    { title: 'Selfie', sub: 'Photo de votre visage pour vérification', icon: '🤳' },
    { title: 'Permis de conduire', sub: 'Permis djiboutien valide', icon: '📄' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 60 }} />
      <TopBar dark={dark} onBack={() => go('login')} title="Vérification d'identité" />

      <div style={{ padding: '24px 20px', flex: 1 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? KBRAND.green : t.border }} />
          ))}
        </div>

        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.4, marginBottom: 6 }}>{steps[step].title}</div>
        <div style={{ fontSize: 14, color: t.muted, marginBottom: 28 }}>{steps[step].sub}</div>

        <div style={{
          aspectRatio: '1.6 / 1', background: t.surface, border: `2px dashed ${t.border}`,
          borderRadius: 20, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20,
        }}>
          <div style={{ fontSize: 56 }}>{steps[step].icon}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.muted }}>Appuyez pour ajouter une photo</div>
          <Icon.Camera size={20} stroke={t.faint} />
        </div>

        <div style={{ background: 'rgba(106,178,231,0.10)', border: `1px solid rgba(106,178,231,0.3)`, borderRadius: 14, padding: 14, display: 'flex', gap: 12, marginBottom: 24 }}>
          <Icon.ShieldCheck size={20} stroke={KBRAND.blueDark} />
          <div style={{ fontSize: 12, lineHeight: 1.5, color: t.text }}>
            <strong>Vos documents sont sécurisés.</strong> Ils ne sont utilisés que pour vérifier votre identité et débloquer le badge Vérifié.
          </div>
        </div>

        <KButton variant="primary" onClick={() => step < 2 ? setStep(step + 1) : go('home')}>
          {step < 2 ? 'Continuer' : 'Terminer'}
        </KButton>

        <button onClick={() => go('home')} style={{ width: '100%', background: 'none', border: 'none', color: t.muted, fontSize: 14, fontWeight: 600, cursor: 'pointer', padding: 14, marginTop: 4 }}>
          Faire plus tard
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingScreen, LoginScreen, OtpScreen, VerifyIdScreen, Input });
