/* Profile + Loyalty + Referral + Settings + Notifications + Support */

function ProfileScreen({ dark, go, ownerMode, setOwnerMode }) {
  const t = getTheme(dark);
  const { USERS } = window.KDATA;
  const me = USERS.me;

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 100 }}>
      <div style={{ height: 54 }} />

      {/* Profile header */}
      <div style={{ padding: '6px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <img src={me.avatar} style={{ width: 72, height: 72, borderRadius: 36, objectFit: 'cover' }} />
            {me.verified && (
              <div style={{ position: 'absolute', bottom: -2, right: -2, width: 26, height: 26, borderRadius: 13, background: KBRAND.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2.5px solid ${t.bg}` }}>
                <Icon.Check size={14} sw={3} />
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.3 }}>{me.name}</div>
            </div>
            <div style={{ fontSize: 12, color: t.muted, marginTop: 3 }}>Membre depuis {me.since}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <Stars rating={me.rating} size={11} />
              <span style={{ fontSize: 11, color: t.muted }}>({me.trips} locations)</span>
            </div>
          </div>
          <button onClick={() => go('edit-profile')} style={{ width: 36, height: 36, borderRadius: 18, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.text }}>
            <Icon.Edit size={16} />
          </button>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
          <Badge variant="verified"><Icon.CheckCircle size={11} stroke={KBRAND.green} /> Vérifié</Badge>
          <Badge variant="default">🇩🇯 Djibouti</Badge>
          <Badge variant="super">⭐ Top Locataire</Badge>
        </div>
      </div>

      {/* Locataire / Propriétaire mode toggle */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', gap: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 4 }}>
          <button onClick={() => setOwnerMode(false)} style={{
            flex: 1, height: 44, borderRadius: 10, border: 'none',
            background: !ownerMode ? KBRAND.blue : 'transparent',
            color: !ownerMode ? '#fff' : t.muted,
            fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}><Icon.User size={16} /> Locataire</button>
          <button onClick={() => setOwnerMode(true)} style={{
            flex: 1, height: 44, borderRadius: 10, border: 'none',
            background: ownerMode ? '#0A0E1A' : 'transparent',
            color: ownerMode ? '#fff' : t.muted,
            fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}><Icon.Car size={16} /> Propriétaire</button>
        </div>
      </div>

      {/* Loyalty card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div onClick={() => go('loyalty')} style={{
          borderRadius: 22, padding: 18, cursor: 'pointer',
          background: `linear-gradient(135deg, ${KBRAND.gold}, #C97F0F)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -20, bottom: -10, fontSize: 130, opacity: 0.18 }}>🏆</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, letterSpacing: 0.3 }}>KIRAAM REWARDS</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>Niveau {me.level}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.22)', padding: '6px 12px', borderRadius: 100, fontSize: 14, fontWeight: 800 }}>{me.points.toLocaleString('fr-FR')} pts</div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ width: '37%', height: '100%', background: '#fff', borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, opacity: 0.9 }}>1 580 pts pour atteindre <strong>Or</strong></div>
        </div>
      </div>

      {/* Menu sections */}
      <MenuSection title="Compte" dark={dark}>
        <MenuItem icon={<Icon.Heart size={18} />} iconBg="rgba(215,20,26,0.14)" iconColor={KBRAND.red} label="Favoris" badge="12" dark={dark} onClick={() => go('favorites')} />
        <MenuItem icon={<Icon.Gift size={18} />} iconBg="rgba(18,173,43,0.14)" iconColor={KBRAND.green} label="Parrainage" sub="Gagnez 2 000 Fdj" dark={dark} onClick={() => go('referral')} />
        <MenuItem icon={<Icon.CreditCard size={18} />} iconBg="rgba(106,178,231,0.14)" iconColor={KBRAND.blueDark} label="Moyens de paiement" dark={dark} />
        <MenuItem icon={<Icon.ShieldCheck size={18} />} iconBg="rgba(245,166,35,0.14)" iconColor={KBRAND.gold} label="Documents" sub="Permis, ID" dark={dark} last />
      </MenuSection>

      <MenuSection title="Préférences" dark={dark}>
        <MenuItem icon={<Icon.Globe size={18} />} iconBg="rgba(106,178,231,0.14)" iconColor={KBRAND.blueDark} label="Langue" detail="Français" dark={dark} onClick={() => go('settings')} />
        <MenuItem icon={<Icon.Moon size={18} />} iconBg="rgba(0,0,0,0.08)" iconColor={t.text} label="Apparence" detail={dark ? 'Sombre' : 'Clair'} dark={dark} onClick={() => go('settings')} />
        <MenuItem icon={<Icon.Bell size={18} />} iconBg="rgba(106,178,231,0.14)" iconColor={KBRAND.blueDark} label="Notifications" dark={dark} onClick={() => go('notifications')} />
        <MenuItem icon={<Icon.Settings size={18} />} iconBg="rgba(0,0,0,0.08)" iconColor={t.text} label="Paramètres" dark={dark} onClick={() => go('settings')} last />
      </MenuSection>

      <MenuSection title="Aide" dark={dark}>
        <MenuItem icon={<Icon.MessageCircle size={18} />} iconBg="rgba(18,173,43,0.14)" iconColor={KBRAND.green} label="Centre d'aide" dark={dark} onClick={() => go('support')} />
        <MenuItem icon={<Icon.Info size={18} />} iconBg="rgba(106,178,231,0.14)" iconColor={KBRAND.blueDark} label="À propos de KIRAAM" detail="v1.0.0" dark={dark} last />
      </MenuSection>

      <div style={{ padding: '8px 20px 30px' }}>
        <button style={{ width: '100%', padding: 16, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, color: KBRAND.red, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit' }}>
          <Icon.LogOut size={18} /> Se déconnecter
        </button>
      </div>
    </div>
  );
}

function MenuSection({ title, children, dark }) {
  const t = getTheme(dark);
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8, padding: '0 4px' }}>{title}</div>
      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function MenuItem({ icon, iconBg, iconColor, label, sub, detail, badge, last, dark, onClick }) {
  const t = getTheme(dark);
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
      padding: '12px 14px',
      background: 'none', border: 'none', borderBottom: last ? 'none' : `1px solid ${t.border}`,
      cursor: 'pointer', color: t.text, fontFamily: 'inherit', textAlign: 'left',
    }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>{sub}</div>}
      </div>
      {badge && <span style={{ background: KBRAND.red, color: '#fff', minWidth: 22, height: 22, borderRadius: 11, padding: '0 7px', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{badge}</span>}
      {detail && <span style={{ fontSize: 13, color: t.muted }}>{detail}</span>}
      <Icon.ChevronRight size={16} stroke={t.faint} />
    </button>
  );
}

function LoyaltyScreen({ dark, go }) {
  const t = getTheme(dark);
  const { USERS } = window.KDATA;
  const me = USERS.me;
  const levels = [
    { id: 'sable', label: 'Sable', min: 0, color: '#D9C7A4', icon: '🏖️' },
    { id: 'coraille', label: 'Coraille', min: 5000, color: '#FF6B6B', icon: '🪸' },
    { id: 'or', label: 'Or', min: 20000, color: KBRAND.gold, icon: '🏆' },
    { id: 'etoile', label: 'Étoile', min: 50000, color: '#9B59B6', icon: '⭐' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 40 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go('profile')} title="KIRAAM REWARDS" />

      {/* Hero */}
      <div style={{ padding: '20px 20px 24px' }}>
        <div style={{
          borderRadius: 24, padding: 24,
          background: `linear-gradient(135deg, ${KBRAND.gold}, #C97F0F)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -20, fontSize: 180, opacity: 0.13 }}>🪸</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>🪸</span>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.3 }}>NIVEAU CORAILLE</div>
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1, marginTop: 8 }}>{me.points.toLocaleString('fr-FR')}</div>
          <div style={{ fontSize: 14, opacity: 0.9, marginTop: -2 }}>points cumulés</div>

          <div style={{ marginTop: 18, padding: '10px 14px', background: 'rgba(255,255,255,0.18)', borderRadius: 12 }}>
            <div style={{ fontSize: 12, marginBottom: 6 }}>1 580 pts pour atteindre <strong>Or</strong></div>
            <div style={{ height: 6, background: 'rgba(0,0,0,0.18)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: '#fff', borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Levels */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Niveaux & avantages</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {levels.map((lv, i) => {
            const isCurrent = lv.id === 'coraille';
            const achieved = me.points >= lv.min;
            return (
              <div key={lv.id} style={{
                background: t.surface, border: `1.5px solid ${isCurrent ? lv.color : t.border}`,
                borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12,
                opacity: achieved || isCurrent ? 1 : 0.55,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${lv.color}22`, color: lv.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>{lv.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{lv.label}</div>
                    {isCurrent && <Badge style={{ background: lv.color, color: '#fff' }}>ACTUEL</Badge>}
                    {achieved && !isCurrent && <Icon.Check size={14} stroke={KBRAND.green} />}
                  </div>
                  <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{lv.min.toLocaleString('fr-FR')} pts</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Vos avantages</div>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 4 }}>
          {[
            { i: '💸', t: '5% de réduction', s: 'Sur toutes vos locations' },
            { i: '🎁', t: '500 pts offerts', s: 'Bonus mensuel' },
            { i: '⚡', t: 'Support prioritaire', s: 'Réponse en < 2h' },
            { i: '🛡️', t: 'Annulation gratuite', s: 'Sur 1 location/mois' },
          ].map((b, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <span style={{ fontSize: 24 }}>{b.i}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{b.t}</div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{b.s}</div>
              </div>
              <Icon.Check size={18} stroke={KBRAND.green} />
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div style={{ padding: '0 20px 30px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Historique récent</div>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16 }}>
          {[
            { l: 'Location Land Cruiser', s: '24 Mai', v: 96800 },
            { l: 'Bonus parrainage Khadija', s: '12 Mai', v: 2000 },
            { l: 'Location Kia Picanto', s: '12 Avr', v: 19000 },
          ].map((h, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{h.l}</div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{h.s}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: KBRAND.green }}>+{h.v.toLocaleString('fr-FR')} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReferralScreen({ dark, go }) {
  const t = getTheme(dark);
  const code = 'KIRAAM-OMAR2026';

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 40 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go(-1)} title="Parrainage" />

      <div style={{ padding: '12px 20px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>🎁</div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginBottom: 8 }}>Gagnez 2 000 Fdj<br />par ami invité</div>
        <div style={{ fontSize: 14, color: t.muted, lineHeight: 1.5, padding: '0 12px' }}>
          Votre ami reçoit aussi 2 000 Fdj de crédit à sa première location.
        </div>
      </div>

      {/* Code card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ background: t.surface, border: `2px dashed ${KBRAND.blue}`, borderRadius: 20, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>Votre code de parrainage</div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 0.5, color: KBRAND.blueDark, margin: '10px 0' }}>{code}</div>
          <button style={{ background: KBRAND.blue, color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            📋 Copier le code
          </button>
        </div>
      </div>

      {/* Share buttons */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>Partager via</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            { l: 'WhatsApp', i: '💬', c: '#25D366' },
            { l: 'SMS', i: '✉️', c: KBRAND.blue },
            { l: 'Lien', i: '🔗', c: '#666' },
            { l: 'Plus', i: '⋯', c: '#888' },
          ].map(s => (
            <button key={s.l} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', color: t.text }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: s.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.i}</div>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{s.l}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <StatTile icon="👥" label="Invités" value="7" sub="ce mois" dark={dark} />
          <StatTile icon="✅" label="Convertis" value="4" sub="ont réservé" dark={dark} />
          <StatTile icon="💰" label="Crédit" value="8k" sub="Fdj gagnés" dark={dark} />
        </div>
      </div>

      {/* How it works */}
      <div style={{ padding: '0 20px 30px' }}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>Comment ça marche</div>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 6 }}>
          {[
            { n: 1, t: 'Partagez votre code', s: 'Avec amis et famille' },
            { n: 2, t: 'Ils s\'inscrivent', s: 'Et utilisent votre code' },
            { n: 3, t: 'Récompenses débloquées', s: '2 000 Fdj chacun à la 1ère location' },
          ].map((s, i, arr) => (
            <div key={s.n} style={{ display: 'flex', gap: 14, padding: 12, alignItems: 'center', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: KBRAND.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{s.t}</div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{s.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ dark, go, lang, setLang, theme, setTheme }) {
  const t = getTheme(dark);

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 40 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go('profile')} title="Paramètres" />

      <div style={{ padding: '16px 0 0' }}>
        <SettingsGroup title="Apparence" dark={dark}>
          <SettingRow label="Thème" dark={dark}>
            <div style={{ display: 'flex', gap: 4, background: t.bg, borderRadius: 10, padding: 3 }}>
              {[
                { id: 'light', i: <Icon.Sun size={14} />, l: 'Clair' },
                { id: 'auto', i: 'A', l: 'Auto' },
                { id: 'dark', i: <Icon.Moon size={14} />, l: 'Sombre' },
              ].map(o => (
                <button key={o.id} onClick={() => setTheme(o.id)} style={{
                  padding: '6px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  background: theme === o.id ? KBRAND.blue : 'transparent',
                  color: theme === o.id ? '#fff' : t.muted,
                  fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit',
                }}>{o.i} {o.l}</button>
              ))}
            </div>
          </SettingRow>
        </SettingsGroup>

        <SettingsGroup title="Langue & Région" dark={dark}>
          <SettingRow label="Langue" dark={dark}>
            <div style={{ display: 'flex', gap: 4, background: t.bg, borderRadius: 10, padding: 3 }}>
              {[
                { id: 'fr', l: 'FR' },
                { id: 'ar', l: 'AR' },
                { id: 'en', l: 'EN' },
              ].map(o => (
                <button key={o.id} onClick={() => setLang(o.id)} style={{
                  padding: '6px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  background: lang === o.id ? KBRAND.blue : 'transparent',
                  color: lang === o.id ? '#fff' : t.muted,
                  fontSize: 11, fontWeight: 700, fontFamily: 'inherit',
                }}>{o.l}</button>
              ))}
            </div>
          </SettingRow>
          <SettingRow label="Devise" detail="Fdj" dark={dark} />
          <SettingRow label="Pays" detail="🇩🇯 Djibouti" dark={dark} last />
        </SettingsGroup>

        <SettingsGroup title="Notifications" dark={dark}>
          <SettingRow label="Push" dark={dark}><Toggle dark={dark} on={true} /></SettingRow>
          <SettingRow label="Email" dark={dark}><Toggle dark={dark} on={true} /></SettingRow>
          <SettingRow label="SMS" dark={dark}><Toggle dark={dark} on={false} /></SettingRow>
          <SettingRow label="Promotions" dark={dark} last><Toggle dark={dark} on={true} /></SettingRow>
        </SettingsGroup>

        <SettingsGroup title="Sécurité" dark={dark}>
          <SettingRow label="Changer le mot de passe" dark={dark}><Icon.ChevronRight size={16} stroke={t.faint} /></SettingRow>
          <SettingRow label="Authentification à 2 facteurs" dark={dark}><Toggle dark={dark} on={false} /></SettingRow>
          <SettingRow label="Sessions actives" detail="2 appareils" dark={dark} last><Icon.ChevronRight size={16} stroke={t.faint} /></SettingRow>
        </SettingsGroup>

        <SettingsGroup title="Confidentialité" dark={dark}>
          <SettingRow label="Politique de confidentialité" dark={dark}><Icon.ChevronRight size={16} stroke={t.faint} /></SettingRow>
          <SettingRow label="Conditions d'utilisation" dark={dark}><Icon.ChevronRight size={16} stroke={t.faint} /></SettingRow>
          <SettingRow label="Télécharger mes données" dark={dark}><Icon.ChevronRight size={16} stroke={t.faint} /></SettingRow>
          <SettingRow label="Supprimer mon compte" dark={dark} danger last><Icon.ChevronRight size={16} stroke={t.faint} /></SettingRow>
        </SettingsGroup>
      </div>
    </div>
  );
}

function SettingsGroup({ title, children, dark }) {
  const t = getTheme(dark);
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: 0.4, textTransform: 'uppercase', padding: '0 32px 8px' }}>{title}</div>
      <div style={{ background: t.surface, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
        {children}
      </div>
    </div>
  );
}

function SettingRow({ label, detail, danger, last, children, dark }) {
  const t = getTheme(dark);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderBottom: last ? 'none' : `1px solid ${t.border}` }}>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: danger ? KBRAND.red : t.text }}>{label}</div>
      {detail && <span style={{ fontSize: 13, color: t.muted }}>{detail}</span>}
      {children}
    </div>
  );
}

function NotificationsScreen({ dark, go }) {
  const t = getTheme(dark);
  const items = [
    { type: 'booking', i: '✅', t: 'Réservation confirmée', s: 'Ahmed a confirmé votre Land Cruiser pour le 2-5 Juin', time: 'Il y a 2h', unread: true },
    { type: 'message', i: '💬', t: 'Nouveau message', s: 'Ahmed : "Pas de problème, je vous attends à 14h ✅"', time: 'Il y a 4h', unread: true },
    { type: 'reminder', i: '⏰', t: 'Rappel prise en charge', s: 'N\'oubliez pas votre permis et CNI demain à 14h', time: 'Hier', unread: false },
    { type: 'payment', i: '💳', t: 'Paiement reçu', s: '96 800 Fdj débités via D-Money', time: 'Hier', unread: false },
    { type: 'promo', i: '🎁', t: 'Offre spéciale 4x4', s: '-15% sur tous les SUV/4x4 ce weekend !', time: 'Lun.', unread: false },
    { type: 'review', i: '⭐', t: 'Laissez un avis', s: 'Comment était votre Kia Picanto ?', time: 'Lun.', unread: false },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 40 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go(-1)} title="Notifications" action={
        <button style={{ background: 'none', border: 'none', color: KBRAND.blue, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Tout lu</button>
      } />

      <div style={{ display: 'flex', gap: 8, padding: '16px 20px 12px', overflowX: 'auto' }}>
        {['Toutes', 'Réservations', 'Messages', 'Paiements', 'Promos'].map((c, i) => (
          <Chip key={c} active={i === 0} dark={dark}>{c}</Chip>
        ))}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((n, i) => (
          <div key={i} style={{
            background: n.unread ? 'rgba(106,178,231,0.06)' : t.surface,
            border: `1px solid ${n.unread ? 'rgba(106,178,231,0.3)' : t.border}`,
            borderRadius: 14, padding: 14, display: 'flex', gap: 12, position: 'relative',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{n.i}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{n.t}</div>
                <div style={{ fontSize: 11, color: t.muted, flexShrink: 0 }}>{n.time}</div>
              </div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 4, lineHeight: 1.4 }}>{n.s}</div>
            </div>
            {n.unread && <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: 4, background: KBRAND.blue }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportScreen({ dark, go }) {
  const t = getTheme(dark);
  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 40 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go('profile')} title="Centre d'aide" />

      {/* Hero */}
      <div style={{ padding: '12px 20px 24px' }}>
        <div style={{ position: 'relative' }}>
          <Icon.Search size={18} style={{ position: 'absolute', left: 14, top: 17, color: t.muted }} />
          <input
            placeholder="Comment pouvons-nous vous aider ?"
            style={{ width: '100%', height: 52, padding: '0 16px 0 42px', boxSizing: 'border-box', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, fontSize: 14, color: t.text, fontFamily: 'inherit' }}
          />
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button style={{ background: `linear-gradient(135deg, ${KBRAND.green}, #0A7E1F)`, color: '#fff', border: 'none', borderRadius: 18, padding: 16, textAlign: 'left', cursor: 'pointer' }}>
            <Icon.MessageCircle size={22} />
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 8 }}>Chat support</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>Réponse en &lt; 2 min</div>
          </button>
          <button style={{ background: `linear-gradient(135deg, ${KBRAND.red}, #A0080D)`, color: '#fff', border: 'none', borderRadius: 18, padding: 16, textAlign: 'left', cursor: 'pointer' }}>
            <Icon.Phone size={22} />
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 8 }}>Urgence 24/7</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>+253 77 00 00 00</div>
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Catégories</div>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16 }}>
          {[
            { i: '🚗', l: 'Locataire', s: '12 articles' },
            { i: '🔑', l: 'Propriétaire', s: '18 articles' },
            { i: '💳', l: 'Paiement', s: '8 articles' },
            { i: '🛡️', l: 'Sécurité', s: '6 articles' },
            { i: '☂️', l: 'Assurance', s: '5 articles' },
          ].map((c, i, arr) => (
            <button key={c.l} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: 14, background: 'none', border: 'none', borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none', cursor: 'pointer', color: t.text, fontFamily: 'inherit', textAlign: 'left' }}>
              <span style={{ fontSize: 24 }}>{c.i}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{c.l}</div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{c.s}</div>
              </div>
              <Icon.ChevronRight size={16} stroke={t.faint} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 30px' }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Questions fréquentes</div>
        {[
          'Comment fonctionne le paiement D-Money ?',
          'Que faire en cas de panne pendant la location ?',
          'Puis-je annuler ma réservation ?',
          'Comment devenir propriétaire-hôte ?',
        ].map((q, i) => (
          <div key={i} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{q}</div>
            <Icon.ChevronRight size={16} stroke={t.faint} />
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen, LoyaltyScreen, ReferralScreen, SettingsScreen, NotificationsScreen, SupportScreen, MenuSection, MenuItem });
