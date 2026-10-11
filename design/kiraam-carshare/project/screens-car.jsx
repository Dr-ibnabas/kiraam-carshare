/* Car Detail + Booking Flow + Confirmation */

function CarDetailScreen({ dark, go, carId }) {
  const t = getTheme(dark);
  const { CARS, USERS, REVIEWS } = window.KDATA;
  const car = CARS.find(c => c.id === carId) || CARS[0];
  const owner = USERS[car.owner];
  const [photoIdx, setPhotoIdx] = React.useState(0);
  const [fav, setFav] = React.useState(false);
  const [tab, setTab] = React.useState('about');

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 120 }}>
        {/* Photo gallery */}
        <div style={{ position: 'relative', height: 340 }}>
          <Photo src={car.photos[photoIdx]} style={{ position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(180deg, rgba(0,0,0,0.4), transparent)' }} />

          <div style={{ position: 'absolute', top: 54, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => go(-1)} style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.95)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0A0E1A', backdropFilter: 'blur(8px)' }}>
              <Icon.ChevronLeft size={20} />
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.95)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#0A0E1A' }}>
                <Icon.Share size={18} />
              </button>
              <button onClick={() => setFav(!fav)} style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.95)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: fav ? KBRAND.red : '#0A0E1A' }}>
                {fav ? <Icon.HeartFill size={18} /> : <Icon.Heart size={18} />}
              </button>
            </div>
          </div>

          {/* Dots */}
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
            {car.photos.map((_, i) => (
              <button key={i} onClick={() => setPhotoIdx(i)} style={{
                width: i === photoIdx ? 22 : 6, height: 6, borderRadius: 3,
                background: i === photoIdx ? '#fff' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', transition: 'width 200ms',
              }} />
            ))}
          </div>

          <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600 }}>
            {photoIdx + 1} / {car.photos.length}
          </div>
        </div>

        {/* Title + meta */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Badge variant="verified"><Icon.CheckCircle size={11} stroke={KBRAND.green} /> Vérifié</Badge>
            {car.super && <Badge variant="super">👑 Super-Host</Badge>}
            <Badge>{car.type}</Badge>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, marginBottom: 4 }}>{car.brand} {car.model}</div>
          <div style={{ fontSize: 14, color: t.muted, marginBottom: 12 }}>{car.year} · {car.color} · {car.km.toLocaleString('fr-FR')} km</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13, color: t.muted, marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Stars rating={car.rating} size={13} />
              <span>({car.reviews})</span>
            </div>
            <div>·</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon.MapPin size={13} stroke={KBRAND.red} />
              <span>{car.district}, {car.city}</span>
            </div>
          </div>
        </div>

        {/* Specs grid */}
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            <SpecTile icon={<Icon.Users size={20} />} label="Places" value={car.seats} dark={dark} />
            <SpecTile icon={<Icon.Gauge size={20} />} label="Trans." value={car.transmission.slice(0, 4)} dark={dark} />
            <SpecTile icon={<Icon.Fuel size={20} />} label="Carbu." value={car.fuel} dark={dark} />
            <SpecTile icon={<Icon.Snowflake size={20} />} label="Clim." value="Oui" dark={dark} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${t.border}`, padding: '0 20px', marginBottom: 16 }}>
          {[
            { id: 'about', label: 'À propos' },
            { id: 'features', label: 'Équipements' },
            { id: 'reviews', label: `Avis (${car.reviews})` },
          ].map(tb => (
            <button key={tb.id} onClick={() => setTab(tb.id)} style={{
              padding: '12px 14px', border: 'none', background: 'none', cursor: 'pointer',
              color: tab === tb.id ? KBRAND.blueDark : t.muted,
              fontWeight: 700, fontSize: 13,
              borderBottom: tab === tb.id ? `2px solid ${KBRAND.blueDark}` : '2px solid transparent',
              marginBottom: -1,
            }}>{tb.label}</button>
          ))}
        </div>

        {tab === 'about' && (
          <div style={{ padding: '0 20px 24px' }}>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: t.text, marginBottom: 20 }}>{car.desc}</div>

            {/* Owner card */}
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <img src={owner.avatar} alt={owner.name} style={{ width: 52, height: 52, borderRadius: 26, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{owner.name}</div>
                  {owner.super && <Badge variant="super" style={{ padding: '2px 6px' }}>SUPER</Badge>}
                </div>
                <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>
                  <Stars rating={owner.rating} size={11} /> · {owner.trips} locations · Membre depuis {owner.since}
                </div>
              </div>
              <button style={{ width: 38, height: 38, borderRadius: 19, background: KBRAND.green, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                <Icon.MessageCircle size={18} />
              </button>
            </div>

            {/* Location mini-map */}
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 2 }}>Localisation</div>
                  <div style={{ fontSize: 12, color: t.muted }}>{car.district}, {car.city}</div>
                </div>
                <button style={{ background: t.bg, border: `1px solid ${t.border}`, padding: '8px 12px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', color: t.text }}>Itinéraire</button>
              </div>
              <div style={{
                height: 130, borderRadius: 14, overflow: 'hidden', position: 'relative',
                background: dark ? '#1B2236' : '#DCE9F4',
                backgroundImage: dark
                  ? `linear-gradient(rgba(106,178,231,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(106,178,231,0.08) 1px, transparent 1px)`
                  : `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
              }}>
                <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: KBRAND.red, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(215,20,26,0.4)' }}>
                    <Icon.Car size={22} />
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Règles & politique</div>
              {[
                { i: '🚭', t: 'Non-fumeur' },
                { i: '🐾', t: 'Animaux non autorisés' },
                { i: '📏', t: `${car.included} km inclus / jour (puis 50 Fdj/km)` },
                { i: '🛡️', t: 'Annulation modérée — gratuite jusqu\'à 48h avant' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${t.border}` : 'none' }}>
                  <span style={{ fontSize: 18 }}>{r.i}</span>
                  <span style={{ fontSize: 13 }}>{r.t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'features' && (
          <div style={{ padding: '0 20px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {car.features.map(f => (
                <div key={f} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon.Check size={18} stroke={KBRAND.green} />
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{f}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'reviews' && (
          <div style={{ padding: '0 20px 24px' }}>
            {/* Rating breakdown */}
            <div style={{ display: 'flex', gap: 16, padding: 16, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, marginBottom: 16, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: t.text }}>{car.rating.toFixed(1)}</div>
                <Stars rating={car.rating} size={12} />
                <div style={{ fontSize: 11, color: t.muted, marginTop: 4 }}>{car.reviews} avis</div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { l: 'Propreté', v: 95 },
                  { l: 'Communication', v: 98 },
                  { l: 'Ponctualité', v: 92 },
                  { l: 'Qualité/Prix', v: 88 },
                ].map(r => (
                  <div key={r.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 11, color: t.muted, width: 80 }}>{r.l}</div>
                    <div style={{ flex: 1, height: 4, background: t.border, borderRadius: 2 }}>
                      <div style={{ width: `${r.v}%`, height: '100%', background: KBRAND.gold, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {REVIEWS.map(r => {
              const u = USERS[r.user];
              return (
                <div key={r.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 14, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <img src={u.avatar} style={{ width: 36, height: 36, borderRadius: 18, objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: t.muted }}>{r.date}</div>
                    </div>
                    <Stars rating={r.rating} size={12} />
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: t.text }}>{r.text}</div>
                  {r.photos > 0 && (
                    <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                      {Array.from({ length: r.photos }).map((_, i) => (
                        <div key={i} style={{ width: 60, height: 60, borderRadius: 8, background: t.bg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.faint }}>
                          <Icon.Image size={16} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.surface, borderTop: `1px solid ${t.border}`,
        padding: '14px 20px 30px', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, marginBottom: 1 }}>À partir de</div>
          <div style={{ fontSize: 19, fontWeight: 800, color: t.text }}>{fdj(car.pricePerDay)}<span style={{ fontSize: 12, color: t.muted, fontWeight: 600 }}> /jour</span></div>
        </div>
        <div style={{ flex: 1 }}>
          <KButton variant="primary" onClick={() => go('booking', carId)} size="md">
            Réserver <Icon.ArrowRight size={16} />
          </KButton>
        </div>
      </div>
    </div>
  );
}

function SpecTile({ icon, label, value, dark }) {
  const t = getTheme(dark);
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: '10px 8px', textAlign: 'center' }}>
      <div style={{ color: KBRAND.blueDark, display: 'flex', justifyContent: 'center', marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: t.text, marginTop: 2 }}>{value}</div>
    </div>
  );
}

function BookingScreen({ dark, go, carId }) {
  const t = getTheme(dark);
  const { CARS } = window.KDATA;
  const car = CARS.find(c => c.id === carId) || CARS[0];
  const [step, setStep] = React.useState(0);
  const [days, setDays] = React.useState(3);
  const [pickup, setPickup] = React.useState('owner');
  const [extras, setExtras] = React.useState({ driver: false, insurance: true });
  const [payment, setPayment] = React.useState('dmoney');

  const subtotal = car.pricePerDay * days;
  const discount = days >= 7 ? 0.15 : days >= 3 ? 0.10 : 0;
  const afterDiscount = subtotal * (1 - discount);
  const pickupFee = pickup === 'airport' ? 2000 : pickup === 'delivery' ? 1500 : 0;
  const driverFee = extras.driver ? 1500 * days : 0;
  const insurance = extras.insurance ? 2000 * days : 0;
  const service = afterDiscount * 0.10;
  const total = afterDiscount + pickupFee + driverFee + insurance + service;

  const steps = ['Dates & lieu', 'Options', 'Paiement'];

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => step > 0 ? setStep(step - 1) : go('car', carId)} title={`Réservation · ${steps[step]}`} />

      <div style={{ padding: '12px 20px 8px' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? KBRAND.blue : t.border }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 120 }}>
        {/* Mini car card sticky */}
        <div style={{ padding: '14px 20px 6px' }}>
          <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 56, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
              <Photo src={car.photos[0]} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{car.brand} {car.model}</div>
              <div style={{ fontSize: 11, color: t.muted }}>{car.year} · {fdj(car.pricePerDay)}/jour</div>
            </div>
            <Stars rating={car.rating} size={11} />
          </div>
        </div>

        {step === 0 && (
          <div style={{ padding: '12px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, marginTop: 8 }}>Dates</div>
            <DatePickerMock dark={dark} days={days} setDays={setDays} />

            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, marginTop: 24 }}>Heures</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 12 }}>
                <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, marginBottom: 4 }}>PRISE EN CHARGE</div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>14:00</div>
              </div>
              <div style={{ flex: 1, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 12 }}>
                <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, marginBottom: 4 }}>RESTITUTION</div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>18:00</div>
              </div>
            </div>

            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, marginTop: 24 }}>Lieu de prise en charge</div>
            {[
              { id: 'owner', label: 'Chez le propriétaire', sub: 'Plateau du Serpent', price: 0, icon: '🏠' },
              { id: 'delivery', label: 'Livraison à mon adresse', sub: 'Centre-ville Djibouti', price: 1500, icon: '🚚' },
              { id: 'airport', label: 'Aéroport Djibouti-Ambouli', sub: 'Terminal arrivées', price: 2000, icon: '✈️' },
            ].map(opt => (
              <button key={opt.id} onClick={() => setPickup(opt.id)} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 14, marginBottom: 10,
                width: '100%', textAlign: 'left',
                background: t.surface,
                border: `1.5px solid ${pickup === opt.id ? KBRAND.blue : t.border}`,
                borderRadius: 14, cursor: 'pointer', color: t.text, fontFamily: 'inherit',
              }}>
                <span style={{ fontSize: 24 }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{opt.sub}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: opt.price ? t.text : KBRAND.green }}>
                  {opt.price ? `+${fdj(opt.price)}` : 'Gratuit'}
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div style={{ padding: '12px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, marginTop: 8 }}>Extras</div>

            <OptionRow dark={dark}
              icon="👨‍✈️"
              title="Conducteur supplémentaire"
              sub="Ajouter un 2e conducteur à la location"
              price="+1 500 Fdj /jour"
              on={extras.driver}
              onChange={() => setExtras({ ...extras, driver: !extras.driver })}
            />
            <OptionRow dark={dark}
              icon="🛡️"
              title="Assurance Premium"
              sub="Franchise réduite, vol & bris de glace"
              price="+2 000 Fdj /jour"
              on={extras.insurance}
              onChange={() => setExtras({ ...extras, insurance: !extras.insurance })}
            />
            <OptionRow dark={dark}
              icon="🧊"
              title="Glacière incluse"
              sub="Pour vos excursions"
              price="Gratuit"
              on={true}
              locked
            />

            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, marginTop: 24 }}>Récapitulatif</div>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16 }}>
              <RecapRow label={`Location ${days} jour${days > 1 ? 's' : ''}`} value={fdj(subtotal)} dark={dark} />
              {discount > 0 && <RecapRow label={`Remise ${days}j (-${(discount * 100).toFixed(0)}%)`} value={`-${fdj(subtotal * discount)}`} dark={dark} positive />}
              {pickupFee > 0 && <RecapRow label="Frais lieu" value={fdj(pickupFee)} dark={dark} />}
              {driverFee > 0 && <RecapRow label="Conducteur sup." value={fdj(driverFee)} dark={dark} />}
              {insurance > 0 && <RecapRow label="Assurance Premium" value={fdj(insurance)} dark={dark} />}
              <RecapRow label="Frais de service (10%)" value={fdj(service)} dark={dark} />
              <div style={{ borderTop: `1px dashed ${t.border}`, margin: '10px 0 12px' }} />
              <RecapRow label="Total" value={fdj(total)} dark={dark} bold large />
              <div style={{ fontSize: 11, color: t.muted, marginTop: 6 }}>+ Caution de {fdj(car.deposit)} (pré-autorisée, non débitée)</div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ padding: '12px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, marginTop: 8 }}>Méthode de paiement</div>

            {[
              { id: 'dmoney', label: 'D-Money', sub: 'Djibouti Telecom', icon: '📱', bg: '#FF6B00' },
              { id: 'waafi', label: 'Waafi', sub: 'Salaam African Bank', icon: '🟢', bg: KBRAND.green },
              { id: 'card', label: 'Carte bancaire', sub: 'Visa, Mastercard', icon: '💳', bg: KBRAND.blue },
              { id: 'cash', label: 'Espèces (acompte 20%)', sub: 'À la prise en charge', icon: '💵', bg: '#666' },
            ].map(pm => (
              <button key={pm.id} onClick={() => setPayment(pm.id)} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 14, marginBottom: 10,
                width: '100%', textAlign: 'left',
                background: t.surface,
                border: `1.5px solid ${payment === pm.id ? KBRAND.blue : t.border}`,
                borderRadius: 14, cursor: 'pointer', color: t.text, fontFamily: 'inherit',
              }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: pm.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{pm.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{pm.label}</div>
                  <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{pm.sub}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: 11, border: `2px solid ${payment === pm.id ? KBRAND.blue : t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {payment === pm.id && <div style={{ width: 10, height: 10, borderRadius: 5, background: KBRAND.blue }} />}
                </div>
              </button>
            ))}

            {payment === 'dmoney' && (
              <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, marginTop: 8 }}>
                <div style={{ fontSize: 12, color: t.muted, fontWeight: 600, marginBottom: 6 }}>NUMÉRO D-MONEY</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ padding: '12px 14px', background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, fontWeight: 600 }}>🇩🇯 +253</div>
                  <input defaultValue="77 12 34 56" style={{ flex: 1, padding: '12px 14px', background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, fontSize: 14, color: t.text, fontFamily: 'inherit' }} />
                </div>
              </div>
            )}

            <div style={{ marginTop: 20, padding: 14, background: 'rgba(18,173,43,0.08)', border: `1px solid rgba(18,173,43,0.25)`, borderRadius: 14, display: 'flex', gap: 10 }}>
              <Icon.ShieldCheck size={20} stroke={KBRAND.green} />
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                <strong style={{ color: KBRAND.green }}>Paiement sécurisé.</strong> Vous ne serez débité qu'après confirmation du propriétaire.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: t.surface, borderTop: `1px solid ${t.border}`,
        padding: '14px 20px 30px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: t.muted, fontWeight: 600 }}>Total</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{fdj(total)}</div>
        </div>
        <KButton variant="primary" onClick={() => step < 2 ? setStep(step + 1) : go('confirmation', carId)}>
          {step < 2 ? 'Continuer' : `Payer ${fdj(total)}`}
          <Icon.ArrowRight size={16} />
        </KButton>
      </div>
    </div>
  );
}

function DatePickerMock({ dark, days, setDays }) {
  const t = getTheme(dark);
  const startDay = 2;
  const endDay = startDay + days - 1;
  const grid = [];
  for (let w = 0; w < 4; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) {
      const day = w * 7 + d - 1;
      row.push(day > 0 && day <= 30 ? day : null);
    }
    grid.push(row);
  }
  return (
    <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.text }}><Icon.ChevronLeft size={18} /></button>
        <div style={{ fontSize: 14, fontWeight: 800 }}>Juin 2026</div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.text }}><Icon.ChevronRight size={18} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 10, color: t.muted, fontWeight: 700, padding: 4 }}>{d}</div>
        ))}
        {grid.flat().map((day, i) => {
          if (!day) return <div key={i} />;
          const inRange = day >= startDay && day <= endDay;
          const isStart = day === startDay;
          const isEnd = day === endDay;
          return (
            <div key={i} style={{
              aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 600,
              background: inRange ? (isStart || isEnd ? KBRAND.blue : 'rgba(106,178,231,0.18)') : 'transparent',
              color: inRange && (isStart || isEnd) ? '#fff' : t.text,
              borderRadius: isStart && isEnd ? 8 : isStart ? '8px 0 0 8px' : isEnd ? '0 8px 8px 0' : inRange ? 0 : 8,
              cursor: 'pointer',
            }}>{day}</div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center' }}>
        {[2, 3, 5, 7].map(d => (
          <button key={d} onClick={() => setDays(d)} style={{
            padding: '6px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            background: days === d ? '#0A0E1A' : 'transparent', color: days === d ? '#fff' : t.muted,
            border: `1px solid ${days === d ? '#0A0E1A' : t.border}`, fontFamily: 'inherit',
          }}>{d}j</button>
        ))}
      </div>
    </div>
  );
}

function OptionRow({ icon, title, sub, price, on, onChange, locked, dark }) {
  const t = getTheme(dark);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: 14, marginBottom: 10,
      background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14,
    }}>
      <span style={{ fontSize: 26 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{title}</div>
        <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{sub}</div>
        <div style={{ fontSize: 12, color: KBRAND.blueDark, fontWeight: 700, marginTop: 4 }}>{price}</div>
      </div>
      {locked ? (
        <Icon.Check size={20} stroke={KBRAND.green} />
      ) : (
        <Toggle dark={dark} on={on} onChange={onChange} />
      )}
    </div>
  );
}

function RecapRow({ label, value, dark, bold, large, positive }) {
  const t = getTheme(dark);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: large ? 16 : 13 }}>
      <span style={{ color: bold ? t.text : t.muted, fontWeight: bold ? 700 : 500 }}>{label}</span>
      <span style={{ color: positive ? KBRAND.green : t.text, fontWeight: bold ? 800 : 600 }}>{value}</span>
    </div>
  );
}

function ConfirmationScreen({ dark, go, carId }) {
  const t = getTheme(dark);
  const { CARS, USERS } = window.KDATA;
  const car = CARS.find(c => c.id === carId) || CARS[0];
  const owner = USERS[car.owner];

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 120 }}>
      <div style={{ height: 54 }} />

      {/* Hero */}
      <div style={{ padding: '24px 20px 24px', textAlign: 'center' }}>
        <div style={{
          width: 80, height: 80, borderRadius: 40, background: KBRAND.green,
          margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', boxShadow: '0 10px 24px rgba(18,173,43,0.4)',
        }}><Icon.Check size={40} sw={3} /></div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.4, marginBottom: 6 }}>Réservation confirmée !</div>
        <div style={{ fontSize: 14, color: t.muted, lineHeight: 1.5, maxWidth: 280, margin: '0 auto' }}>
          {owner.name.split(' ')[0]} a été notifié. Présentez ce QR code lors de la prise en charge.
        </div>
      </div>

      {/* QR Code card */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 22, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden' }}>
              <Photo src={car.photos[0]} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{car.brand} {car.model}</div>
              <div style={{ fontSize: 11, color: t.muted }}>Réservation #KIR-2026-{(carId || 'c1').toUpperCase()}847</div>
            </div>
          </div>

          <div style={{
            background: '#fff', borderRadius: 14, padding: 16, display: 'flex', justifyContent: 'center',
            border: '1px solid rgba(15,23,42,0.08)',
          }}>
            <QRCodePattern />
          </div>

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: t.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Du</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>02 Juin · 14:00</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Au</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>05 Juin · 18:00</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Lieu</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>Aéroport Ambouli</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: t.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Total payé</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: KBRAND.green, marginTop: 2 }}>96 800 Fdj</div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { i: <Icon.Calendar size={20} />, l: 'Calendrier' },
            { i: <Icon.MessageCircle size={20} />, l: 'Contacter' },
            { i: <Icon.Share size={20} />, l: 'Partager' },
          ].map(a => (
            <button key={a.l} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', color: t.text }}>
              <span style={{ color: KBRAND.blueDark }}>{a.i}</span>
              <span style={{ fontSize: 11, fontWeight: 700 }}>{a.l}</span>
            </button>
          ))}
        </div>

        {/* Loyalty earned */}
        <div style={{ background: `linear-gradient(135deg, ${KBRAND.gold}, #C97F0F)`, color: '#fff', borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏆</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.9, letterSpacing: 0.3 }}>KIRAAM REWARDS</div>
            <div style={{ fontSize: 15, fontWeight: 800 }}>+ 96 800 points gagnés</div>
          </div>
          <button onClick={() => go('loyalty')} style={{ background: 'rgba(255,255,255,0.22)', border: 'none', padding: '8px 12px', borderRadius: 100, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Voir</button>
        </div>

        <KButton variant="primary" onClick={() => go('bookings')}>Voir mes locations</KButton>
        <button onClick={() => go('home')} style={{ width: '100%', background: 'none', border: 'none', color: t.muted, fontSize: 14, fontWeight: 600, padding: 16, cursor: 'pointer' }}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

function QRCodePattern() {
  // Procedurally generate a QR-ish pattern (visual mock)
  const cells = [];
  const seed = (i, j) => ((i * 17 + j * 31 + i * j) % 7) > 3;
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
      cells.push({ i, j, on: seed(i, j) });
    }
  }
  // Finder patterns at corners
  const isFinder = (i, j) => {
    const inBox = (ci, cj, br, bc) => i >= br && i < br + 7 && j >= bc && j < bc + 7;
    return inBox(0, 0, 0, 0) || inBox(0, 0, 0, 14) || inBox(14, 0, 14, 0);
  };
  return (
    <svg width="180" height="180" viewBox="0 0 21 21" shapeRendering="crispEdges">
      <rect width="21" height="21" fill="#fff" />
      {cells.map(c => !isFinder(c.i, c.j) && c.on && (
        <rect key={`${c.i}-${c.j}`} x={c.j} y={c.i} width="1" height="1" fill="#0A0E1A" />
      ))}
      {[[0, 0], [0, 14], [14, 0]].map(([r, c], i) => (
        <g key={i}>
          <rect x={c} y={r} width="7" height="7" fill="#0A0E1A" />
          <rect x={c + 1} y={r + 1} width="5" height="5" fill="#fff" />
          <rect x={c + 2} y={r + 2} width="3" height="3" fill="#0A0E1A" />
        </g>
      ))}
    </svg>
  );
}

Object.assign(window, { CarDetailScreen, BookingScreen, ConfirmationScreen, DatePickerMock, OptionRow, RecapRow, QRCodePattern });
