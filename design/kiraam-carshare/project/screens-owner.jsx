/* Owner Dashboard + My Cars + Add Car Wizard + Requests */

function OwnerDashboardScreen({ dark, go }) {
  const t = getTheme(dark);
  const { CARS, USERS } = window.KDATA;
  const myCars = CARS.filter(c => c.owner === 'u1');

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 100 }}>
      <div style={{ height: 54 }} />

      <div style={{ padding: '6px 20px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, color: t.muted }}>Bonjour Ahmed 👋</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.4 }}>Tableau de bord</div>
        </div>
        <button onClick={() => go('owner-notifs')} style={{ width: 40, height: 40, borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.text, position: 'relative' }}>
          <Icon.Bell size={18} />
          <div style={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: 4, background: KBRAND.red, border: '2px solid ' + t.bg }} />
        </button>
      </div>

      {/* Earnings hero */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          borderRadius: 22, padding: 20,
          background: `linear-gradient(135deg, #0A0E1A 0%, #1B2236 100%)`,
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -20, width: 140, height: 140, borderRadius: 70, background: `radial-gradient(circle, ${KBRAND.green}, transparent 70%)`, opacity: 0.3 }} />
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.7, letterSpacing: 0.3, textTransform: 'uppercase' }}>Revenus du mois</div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.8, marginTop: 6 }}>284 500 <span style={{ fontSize: 15, fontWeight: 600, opacity: 0.7 }}>Fdj</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: KBRAND.green }}>
            <Icon.TrendingUp size={14} stroke={KBRAND.green} />
            <span style={{ fontWeight: 700 }}>+18%</span>
            <span style={{ opacity: 0.6, color: '#fff' }}>vs. avril</span>
          </div>

          {/* Mini chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50, marginTop: 16 }}>
            {[35, 45, 28, 55, 40, 70, 58, 80, 62, 90, 75, 100, 88, 65].map((h, i) => (
              <div key={i} style={{
                flex: 1, height: `${h}%`, borderRadius: 3,
                background: i > 10 ? KBRAND.blue : 'rgba(255,255,255,0.18)',
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '0 20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <StatTile icon="📈" label="Taux occupation" value="72%" sub="14 jours réservés" delta="+8%" dark={dark} />
        <StatTile icon="🚗" label="Locations" value="11" sub="ce mois" delta="+2" dark={dark} />
        <StatTile icon="👁️" label="Vues" value="2 847" sub="cette semaine" delta="+412" dark={dark} />
        <StatTile icon="⭐" label="Note moyenne" value="4.9" sub="87 avis" dark={dark} />
      </div>

      {/* Pending requests */}
      <SectionHeader title="📩 Demandes en attente" action="Tout voir" onAction={() => go('owner-requests')} dark={dark} />
      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { user: 'u4', car: 'c1', dates: '07 - 09 Juin', total: 96000 },
          { user: 'u5', car: 'c6', dates: '12 - 14 Juin', total: 81000 },
        ].map((r, i) => {
          const u = USERS[r.user];
          const car = CARS.find(c => c.id === r.car);
          return (
            <div key={i} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <img src={u.avatar} style={{ width: 44, height: 44, borderRadius: 22, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{car.brand} {car.model} · {r.dates}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: KBRAND.green }}>{fdj(r.total)}</div>
                  <div style={{ fontSize: 10, color: t.muted }}>3j</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ flex: 1, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', color: t.text }}>Refuser</button>
                <button style={{ flex: 1, background: KBRAND.green, border: 'none', borderRadius: 10, padding: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', color: '#fff' }}>Accepter</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* My cars preview */}
      <SectionHeader title="🚙 Mon parc" action="Gérer" onAction={() => go('owner-cars')} dark={dark} />
      <div style={{ padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {myCars.slice(0, 3).map(car => (
          <div key={car.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 64, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
              <Photo src={car.photos[0]} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{car.brand} {car.model}</div>
              <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{fdj(car.pricePerDay)}/jour</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Badge variant={Math.random() > 0.4 ? 'verified' : 'default'}>{Math.random() > 0.4 ? 'Actif' : 'En location'}</Badge>
              <div style={{ fontSize: 11, color: t.muted, marginTop: 4 }}>{car.reviews} loc.</div>
            </div>
          </div>
        ))}
      </div>

      {/* Payouts */}
      <div style={{ padding: '0 20px 30px' }}>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 800 }}>Virements</div>
            <button style={{ background: 'none', border: 'none', color: KBRAND.blue, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Voir tout</button>
          </div>
          {[
            { date: '23 Mai', label: 'Virement D-Money', val: 96000, status: 'done' },
            { date: '15 Mai', label: 'Virement D-Money', val: 124500, status: 'done' },
            { date: '30 Mai', label: 'En attente', val: 64000, status: 'pending' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i > 0 ? `1px solid ${t.border}` : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: p.status === 'done' ? 'rgba(18,173,43,0.14)' : 'rgba(245,166,35,0.14)', color: p.status === 'done' ? KBRAND.green : KBRAND.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p.status === 'done' ? <Icon.Check size={18} sw={2.5} /> : <Icon.Calendar size={16} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{p.date}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: p.status === 'done' ? t.text : t.muted }}>+{fdj(p.val)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatTile({ icon, label, value, sub, delta, dark }) {
  const t = getTheme(dark);
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        {delta && <span style={{ fontSize: 10, color: KBRAND.green, fontWeight: 700 }}>{delta}</span>}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.muted, marginTop: 2 }}>{label}</div>
      <div style={{ fontSize: 10, color: t.faint, marginTop: 1 }}>{sub}</div>
    </div>
  );
}

function MyCarsScreen({ dark, go }) {
  const t = getTheme(dark);
  const { CARS } = window.KDATA;
  const myCars = CARS.filter(c => c.owner === 'u1');
  const [tab, setTab] = React.useState('all');

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 100 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go('owner-dash')} title="Mes véhicules" action={
        <button onClick={() => go('owner-add')} style={{ width: 38, height: 38, borderRadius: 19, background: KBRAND.blue, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
          <Icon.Plus size={20} />
        </button>
      } />

      <div style={{ display: 'flex', gap: 8, padding: '12px 20px 16px', overflowX: 'auto' }}>
        {['all', 'active', 'pause', 'rented'].map(id => (
          <Chip key={id} active={tab === id} onClick={() => setTab(id)} dark={dark}>
            {{ all: 'Toutes', active: 'Actives', pause: 'En pause', rented: 'En location' }[id]}
          </Chip>
        ))}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {myCars.map(car => (
          <div key={car.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 140 }}>
              <Photo src={car.photos[0]} style={{ position: 'absolute', inset: 0 }} />
              <div style={{ position: 'absolute', top: 10, left: 10 }}>
                <Badge variant="verified">● Actif</Badge>
              </div>
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6 }}>
                <button style={{ width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.95)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0A0E1A' }}>
                  <Icon.Edit size={14} />
                </button>
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{car.brand} {car.model}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: KBRAND.blueDark }}>{fdj(car.pricePerDay)}/j</div>
              </div>
              <div style={{ fontSize: 11, color: t.muted, marginBottom: 12 }}>
                {car.plate} · {car.km.toLocaleString('fr-FR')} km · {car.district}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                <MiniStat label="Locations" value={car.reviews} dark={dark} />
                <MiniStat label="Revenus" value={`${(car.reviews * car.pricePerDay * 2 / 1000).toFixed(0)}k`} dark={dark} />
                <MiniStat label="Note" value={car.rating.toFixed(1)} dark={dark} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ label, value, dark }) {
  const t = getTheme(dark);
  return (
    <div style={{ background: t.bg, borderRadius: 10, padding: '8px 6px', textAlign: 'center' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>{value}</div>
      <div style={{ fontSize: 9, color: t.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</div>
    </div>
  );
}

function AddCarScreen({ dark, go }) {
  const t = getTheme(dark);
  const [step, setStep] = React.useState(0);
  const steps = [
    { title: 'Photos', sub: 'Min. 5 photos · Max. 15' },
    { title: 'Identification', sub: 'Marque, modèle, immatriculation' },
    { title: 'Caractéristiques', sub: 'Équipements & spécifications' },
    { title: 'Tarification', sub: 'Prix, caution, remises' },
    { title: 'Localisation', sub: 'Adresse & livraison' },
    { title: 'Dispos & règles', sub: 'Calendrier & politiques' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => step > 0 ? setStep(step - 1) : go('owner-cars')} title={`Étape ${step + 1}/6`} action={
        <button style={{ background: 'none', border: 'none', color: t.muted, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Brouillon</button>
      } />

      <div style={{ padding: '8px 20px 4px' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 3, background: i <= step ? KBRAND.blue : t.border }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '20px 20px 8px' }}>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.4 }}>{steps[step].title}</div>
          <div style={{ fontSize: 14, color: t.muted, marginTop: 4 }}>{steps[step].sub}</div>
        </div>

        <div style={{ padding: '12px 20px' }}>
          {step === 0 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 16 }}>
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    aspectRatio: '4/3', borderRadius: 14, position: 'relative', overflow: 'hidden',
                    background: t.surface, border: `1px solid ${t.border}`,
                  }}>
                    {i < 3 ? (
                      <React.Fragment>
                        <Photo src={`https://images.unsplash.com/photo-${['1533473359331-0135ef1b58bf', '1606664515524-ed2f786a0bd6', '1565043666747-69f6646db940'][i]}?w=600`} style={{ position: 'absolute', inset: 0 }} />
                        {i === 0 && <div style={{ position: 'absolute', top: 6, left: 6 }}><Badge variant="dark">★ Principale</Badge></div>}
                        <button style={{ position: 'absolute', top: 6, right: 6, width: 26, height: 26, borderRadius: 13, background: 'rgba(0,0,0,0.6)', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon.X size={14} />
                        </button>
                      </React.Fragment>
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: t.faint }}>
                        <Icon.Plus size={24} />
                        <div style={{ fontSize: 11, fontWeight: 600 }}>Ajouter</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(106,178,231,0.08)', border: `1px solid rgba(106,178,231,0.25)`, borderRadius: 14, padding: 14, display: 'flex', gap: 12 }}>
                <Icon.Info size={20} stroke={KBRAND.blueDark} />
                <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                  <strong>Conseil :</strong> incluez extérieur (avant, côtés, arrière), intérieur, coffre & tableau de bord pour maximiser les réservations.
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <Input dark={dark} label="Marque" defaultValue="Toyota" />
              <Input dark={dark} label="Modèle" defaultValue="Land Cruiser" />
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}><Input dark={dark} label="Année" defaultValue="2022" /></div>
                <div style={{ flex: 1 }}><Input dark={dark} label="Couleur" defaultValue="Blanc" /></div>
              </div>
              <Input dark={dark} label="Immatriculation" defaultValue="AB-1234-DJ" hint="Format djiboutien : XX-XXXX-XX" />
              <Input dark={dark} label="VIN (numéro de châssis)" defaultValue="JTM..." />
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                <SelectField dark={dark} label="Places" value="7" />
                <SelectField dark={dark} label="Portes" value="5" />
                <SelectField dark={dark} label="Transmission" value="Auto" />
                <SelectField dark={dark} label="Carburant" value="Diesel" />
              </div>

              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 10 }}>Équipements</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {['Climatisation', '4x4', 'GPS', 'Bluetooth', 'USB', 'Caméra recul', 'Glacière', 'Jantes alu', 'Toit ouvrant', 'Sièges cuir'].map((f, i) => (
                  <Chip key={f} active={i < 6} dark={dark}>{f}</Chip>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <Input dark={dark} label="Prix par jour (Fdj)" defaultValue="32 000" />
              <Input dark={dark} label="Caution (Fdj)" defaultValue="200 000" hint="Pré-autorisée à la prise en charge" />
              <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 10 }}>Remises automatiques</div>
                {[
                  { l: '3-6 jours', v: '-10%' },
                  { l: '7-29 jours', v: '-15%' },
                  { l: '30+ jours', v: '-25%' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i > 0 ? `1px solid ${t.border}` : 'none' }}>
                    <span style={{ fontSize: 13 }}>{r.l}</span>
                    <strong style={{ color: KBRAND.green }}>{r.v}</strong>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}><Input dark={dark} label="Km inclus/jour" defaultValue="200" /></div>
                <div style={{ flex: 1 }}><Input dark={dark} label="Km sup. (Fdj)" defaultValue="50" /></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <SelectField dark={dark} label="Ville" value="Djibouti-ville" />
              <SelectField dark={dark} label="Quartier" value="Plateau du Serpent" />
              <Input dark={dark} label="Adresse complète" defaultValue="Rue 12, près du Sheraton" />
              <div style={{
                height: 160, borderRadius: 16, marginTop: 10, position: 'relative', overflow: 'hidden',
                background: dark ? '#1B2236' : '#DCE9F4',
                backgroundImage: `linear-gradient(${dark ? 'rgba(106,178,231,0.08)' : 'rgba(255,255,255,0.6)'} 1px, transparent 1px), linear-gradient(90deg, ${dark ? 'rgba(106,178,231,0.08)' : 'rgba(255,255,255,0.6)'} 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, background: KBRAND.red, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(215,20,26,0.5)' }}>
                    <Icon.MapPin size={20} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16, padding: 14, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Livraison disponible</div>
                  <Toggle dark={dark} on={true} />
                </div>
                <div style={{ fontSize: 12, color: t.muted }}>Rayon : 10 km · 1 500 Fdj de frais</div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 10 }}>Disponibilité</div>
              <DatePickerMock dark={dark} days={3} setDays={() => {}} />

              <div style={{ fontSize: 13, fontWeight: 800, margin: '20px 0 10px' }}>Règles</div>
              {[
                { l: 'Non-fumeur', on: true },
                { l: 'Animaux acceptés', on: false },
                { l: 'Conduite en dehors de Djibouti autorisée', on: false },
                { l: 'Vérification des km obligatoire', on: true },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: i > 0 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ fontSize: 14 }}>{r.l}</span>
                  <Toggle dark={dark} on={r.on} />
                </div>
              ))}

              <div style={{ fontSize: 13, fontWeight: 800, margin: '20px 0 10px' }}>Politique d'annulation</div>
              {[
                { l: 'Flexible', sub: 'Remboursement complet jusqu\'à 24h avant' },
                { l: 'Modérée', sub: 'Remboursement complet jusqu\'à 48h avant', active: true },
                { l: 'Stricte', sub: 'Pas de remboursement <7 jours' },
              ].map((p, i) => (
                <div key={p.l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, marginBottom: 8, background: t.surface, border: `1.5px solid ${p.active ? KBRAND.blue : t.border}`, borderRadius: 14 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 11, border: `2px solid ${p.active ? KBRAND.blue : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.active && <div style={{ width: 10, height: 10, borderRadius: 5, background: KBRAND.blue }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{p.l}</div>
                    <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 20px 30px', background: t.surface, borderTop: `1px solid ${t.border}` }}>
        <KButton variant="primary" onClick={() => step < 5 ? setStep(step + 1) : go('owner-cars')}>
          {step < 5 ? 'Continuer' : 'Publier l\'annonce'}
          <Icon.ArrowRight size={16} />
        </KButton>
      </div>
    </div>
  );
}

function SelectField({ dark, label, value }) {
  const t = getTheme(dark);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.muted, marginBottom: 8 }}>{label}</div>
      <button style={{
        width: '100%', height: 52, padding: '0 16px',
        background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14,
        fontSize: 15, color: t.text, fontFamily: 'inherit', textAlign: 'left',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
      }}>
        <span>{value}</span>
        <Icon.ChevronDown size={18} stroke={t.muted} />
      </button>
    </div>
  );
}

Object.assign(window, { OwnerDashboardScreen, MyCarsScreen, AddCarScreen, StatTile, MiniStat, SelectField });
