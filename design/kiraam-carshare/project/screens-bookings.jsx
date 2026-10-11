/* My Bookings + Booking Detail + Messages + Chat */

function MyBookingsScreen({ dark, go }) {
  const t = getTheme(dark);
  const { BOOKINGS, CARS, USERS } = window.KDATA;
  const [tab, setTab] = React.useState('upcoming');
  const tabs = [
    { id: 'upcoming', label: 'À venir' },
    { id: 'active', label: 'En cours' },
    { id: 'past', label: 'Passées' },
    { id: 'cancelled', label: 'Annulées' },
  ];
  const filtered = BOOKINGS.filter(b => b.status === tab);

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 100 }}>
      <div style={{ height: 54 }} />

      <div style={{ padding: '6px 20px 16px' }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>Mes locations</div>
        <div style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{BOOKINGS.length} réservations au total</div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto' }}>
        {tabs.map(tb => (
          <Chip key={tb.id} active={tab === tb.id} onClick={() => setTab(tb.id)} dark={dark}>{tb.label}</Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🚗</div>
          <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>Aucune location {tab === 'upcoming' ? 'à venir' : ''}</div>
          <div style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>Explorez nos voitures pour planifier votre prochain voyage.</div>
          <KButton variant="primary" full={false} onClick={() => go('search')}>Trouver une voiture</KButton>
        </div>
      ) : (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map(b => {
            const car = CARS.find(c => c.id === b.carId);
            const owner = USERS[b.owner];
            return (
              <div key={b.id} onClick={() => go('booking-detail', b.id)} style={{
                background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18,
                overflow: 'hidden', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', padding: 14, gap: 12 }}>
                  <div style={{ width: 90, height: 90, borderRadius: 12, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <Photo src={car.photos[0]} style={{ position: 'absolute', inset: 0 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: t.text }}>{car.brand} {car.model}</div>
                      <BookingStatusBadge status={b.status} />
                    </div>
                    <div style={{ fontSize: 11, color: t.muted, marginBottom: 8 }}>
                      <Icon.Calendar size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {b.from} → {b.to} · {b.days} jour{b.days > 1 ? 's' : ''}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <img src={owner.avatar} style={{ width: 18, height: 18, borderRadius: 9, objectFit: 'cover' }} />
                      <div style={{ fontSize: 11, color: t.muted }}>{owner.name.split(' ')[0]}</div>
                      <div style={{ fontSize: 11, color: t.muted }}>· {b.location}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 800 }}>{fdj(b.total)}</div>
                      <Icon.ChevronRight size={16} stroke={t.faint} />
                    </div>
                  </div>
                </div>

                {b.status === 'upcoming' && (
                  <div style={{ borderTop: `1px solid ${t.border}`, padding: 10, display: 'flex', gap: 8 }}>
                    <button style={{ flex: 1, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', color: t.text }}>
                      Annuler
                    </button>
                    <button style={{ flex: 1, background: KBRAND.blue, border: 'none', borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', color: '#fff' }}>
                      Voir QR Code
                    </button>
                  </div>
                )}
                {b.status === 'active' && (
                  <div style={{ borderTop: `1px solid ${t.border}`, padding: 10, display: 'flex', gap: 8 }}>
                    <button style={{ flex: 1, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', color: t.text }}>
                      Prolonger
                    </button>
                    <button style={{ flex: 1, background: KBRAND.red, border: 'none', borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', color: '#fff' }}>
                      Signaler
                    </button>
                  </div>
                )}
                {b.status === 'past' && (
                  <div style={{ borderTop: `1px solid ${t.border}`, padding: 10, display: 'flex', gap: 8 }}>
                    <button style={{ flex: 1, background: KBRAND.gold, border: 'none', borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', color: '#fff' }}>
                      ⭐ Laisser un avis
                    </button>
                    <button style={{ flex: 1, background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, padding: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', color: t.text }}>
                      Relouer
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BookingStatusBadge({ status }) {
  const map = {
    upcoming: { bg: 'rgba(106,178,231,0.14)', fg: KBRAND.blueDark, label: 'À venir', dot: KBRAND.blue },
    active: { bg: 'rgba(18,173,43,0.14)', fg: KBRAND.green, label: 'En cours', dot: KBRAND.green },
    past: { bg: 'rgba(60,60,67,0.12)', fg: '#666', label: 'Terminée', dot: '#999' },
    cancelled: { bg: 'rgba(215,20,26,0.14)', fg: KBRAND.red, label: 'Annulée', dot: KBRAND.red },
  };
  const m = map[status];
  return (
    <span style={{ background: m.bg, color: m.fg, padding: '3px 8px', borderRadius: 8, fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: m.dot }} />
      {m.label}
    </span>
  );
}

function BookingDetailScreen({ dark, go, bookingId }) {
  const t = getTheme(dark);
  const { BOOKINGS, CARS, USERS } = window.KDATA;
  const b = BOOKINGS.find(x => x.id === bookingId) || BOOKINGS[0];
  const car = CARS.find(c => c.id === b.carId);
  const owner = USERS[b.owner];

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 40 }}>
      <div style={{ height: 54 }} />
      <TopBar dark={dark} onBack={() => go('bookings')} title="Détails" />

      <div style={{ padding: '16px 20px' }}>
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ height: 180, position: 'relative' }}>
            <Photo src={car.photos[0]} style={{ position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', top: 12, right: 12 }}>
              <BookingStatusBadge status={b.status} />
            </div>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{car.brand} {car.model}</div>
            <div style={{ fontSize: 12, color: t.muted }}>#KIR-2026-{b.id.toUpperCase()}847</div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 18, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 14 }}>Suivi de la réservation</div>
          {[
            { label: 'Réservation confirmée', date: '24 Mai · 14:32', done: true },
            { label: 'Paiement reçu', date: '24 Mai · 14:33', done: true },
            { label: 'Prise en charge', date: '02 Juin · 14:00', done: b.status === 'active' },
            { label: 'Restitution', date: '05 Juin · 18:00', done: false },
          ].map((s, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 14, position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 12,
                  background: s.done ? KBRAND.green : t.bg,
                  border: s.done ? 'none' : `2px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                }}>
                  {s.done && <Icon.Check size={14} sw={3} />}
                </div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: t.border, marginTop: 2, marginBottom: 2, minHeight: 24 }} />}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 14 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text }}>{s.label}</div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{s.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Owner contact */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <img src={owner.avatar} style={{ width: 48, height: 48, borderRadius: 24, objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>{owner.name}</div>
            <div style={{ fontSize: 11, color: t.muted }}>Propriétaire · {owner.trips} locations</div>
          </div>
          <button onClick={() => go('chat', owner)} style={{ width: 40, height: 40, borderRadius: 20, background: KBRAND.green, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
            <Icon.MessageCircle size={18} />
          </button>
          <button style={{ width: 40, height: 40, borderRadius: 20, background: KBRAND.blue, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
            <Icon.Phone size={18} />
          </button>
        </div>

        {/* État des lieux */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 18, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>État des lieux</div>
            <button style={{ background: 'none', border: 'none', color: KBRAND.blue, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Voir tout</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {['Avant', 'Avant', 'Avant', 'Après'].map((label, i) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: 10, background: t.bg, border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Icon.Camera size={18} stroke={t.faint} />
                <div style={{ fontSize: 9, color: t.muted, fontWeight: 600 }}>{label} {i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 18, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>Récapitulatif</div>
          <RecapRow label={`Location ${b.days} jours`} value={fdj(car.pricePerDay * b.days)} dark={dark} />
          <RecapRow label="Frais lieu" value={fdj(2000)} dark={dark} />
          <RecapRow label="Assurance Premium" value={fdj(6000)} dark={dark} />
          <RecapRow label="Frais de service" value={fdj(b.total * 0.1)} dark={dark} />
          <div style={{ borderTop: `1px dashed ${t.border}`, margin: '10px 0' }} />
          <RecapRow label="Total" value={fdj(b.total)} dark={dark} bold large />
        </div>

        {b.status === 'upcoming' && (
          <KButton variant="primary">Voir le QR Code</KButton>
        )}
      </div>
    </div>
  );
}

function MessagesScreen({ dark, go }) {
  const t = getTheme(dark);
  const { MESSAGES, USERS } = window.KDATA;
  const [q, setQ] = React.useState('');

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 100 }}>
      <div style={{ height: 54 }} />

      <div style={{ padding: '6px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>Messages</div>
          <div style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{MESSAGES.reduce((s, m) => s + m.unread, 0)} non lus</div>
        </div>
        <button style={{ width: 40, height: 40, borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.text }}>
          <Icon.Edit size={18} />
        </button>
      </div>

      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ position: 'relative' }}>
          <Icon.Search size={18} style={{ position: 'absolute', left: 14, top: 15, color: t.muted }} />
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Rechercher une conversation…"
            style={{ width: '100%', height: 46, padding: '0 14px 0 42px', boxSizing: 'border-box', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, fontSize: 14, color: t.text, fontFamily: 'inherit' }}
          />
        </div>
      </div>

      <div style={{ padding: '0 8px' }}>
        {MESSAGES.map(m => {
          const u = USERS[m.user];
          return (
            <button key={m.id} onClick={() => go('chat', u)} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '12px 12px', background: 'none', border: 'none', cursor: 'pointer',
              borderRadius: 14, color: t.text, fontFamily: 'inherit', textAlign: 'left',
            }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={u.avatar} style={{ width: 54, height: 54, borderRadius: 27, objectFit: 'cover' }} />
                {m.online && <div style={{ position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: 7, background: KBRAND.green, border: `2.5px solid ${t.bg}` }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: m.unread ? 800 : 700, color: t.text }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: m.unread ? KBRAND.blue : t.muted, fontWeight: m.unread ? 700 : 500 }}>{m.time}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 13, color: m.unread ? t.text : t.muted, fontWeight: m.unread ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{m.last}</div>
                  {m.unread > 0 && (
                    <div style={{ background: KBRAND.blue, color: '#fff', minWidth: 22, height: 22, borderRadius: 11, padding: '0 7px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>{m.unread}</div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatScreen({ dark, go, peer }) {
  const t = getTheme(dark);
  const { CHAT_THREAD, USERS } = window.KDATA;
  const u = peer || USERS.u1;
  const [draft, setDraft] = React.useState('');

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ padding: '6px 16px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${t.border}`, background: t.surface }}>
        <button onClick={() => go('messages')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.text, padding: 6 }}>
          <Icon.ChevronLeft size={22} />
        </button>
        <div style={{ position: 'relative' }}>
          <img src={u.avatar} style={{ width: 38, height: 38, borderRadius: 19, objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, background: KBRAND.green, border: `2px solid ${t.surface}` }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800 }}>{u.name}</div>
          <div style={{ fontSize: 11, color: KBRAND.green, fontWeight: 600 }}>En ligne</div>
        </div>
        <button style={{ width: 38, height: 38, borderRadius: 19, background: t.bg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.text }}>
          <Icon.Phone size={18} />
        </button>
      </div>

      {/* Booking context strip */}
      <div style={{ padding: 10, background: 'rgba(106,178,231,0.08)', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon.Car size={16} stroke={KBRAND.blueDark} />
        <div style={{ fontSize: 12, color: t.text, flex: 1 }}>
          <strong>Toyota Land Cruiser</strong> · 02-05 Juin
        </div>
        <span style={{ color: KBRAND.blueDark, fontSize: 12, fontWeight: 700 }}>Voir →</span>
      </div>

      {/* Thread */}
      <div style={{ flex: 1, overflow: 'auto', padding: '14px 14px 8px' }}>
        <div style={{ textAlign: 'center', margin: '0 0 12px', fontSize: 11, color: t.muted, fontWeight: 600 }}>Aujourd'hui</div>
        {CHAT_THREAD.map((msg, i) => {
          const isMe = msg.from === 'me';
          return (
            <div key={i} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: 6 }}>
              <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: isMe ? KBRAND.blue : t.surface,
                  color: isMe ? '#fff' : t.text,
                  border: isMe ? 'none' : `1px solid ${t.border}`,
                  padding: '10px 14px',
                  borderRadius: 18,
                  borderBottomRightRadius: isMe ? 6 : 18,
                  borderBottomLeftRadius: isMe ? 18 : 6,
                  fontSize: 14, lineHeight: 1.4,
                }}>{msg.text}</div>
                <div style={{ fontSize: 10, color: t.faint, marginTop: 3, padding: '0 4px', display: 'flex', alignItems: 'center', gap: 3 }}>
                  {msg.time}
                  {isMe && <span style={{ color: KBRAND.blue }}>✓✓</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick templates */}
      <div style={{ padding: '8px 12px', display: 'flex', gap: 8, overflowX: 'auto', borderTop: `1px solid ${t.border}` }}>
        {['Merci !', 'En route', 'Disponible ?', 'Confirmé ✓'].map(tmpl => (
          <button key={tmpl} onClick={() => setDraft(tmpl)} style={{
            flexShrink: 0, padding: '6px 12px', borderRadius: 100,
            background: t.bg, border: `1px solid ${t.border}`,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', color: t.text, fontFamily: 'inherit',
          }}>{tmpl}</button>
        ))}
      </div>

      {/* Composer */}
      <div style={{ padding: '8px 12px 28px', display: 'flex', alignItems: 'center', gap: 8, background: t.surface, borderTop: `1px solid ${t.border}` }}>
        <button style={{ width: 38, height: 38, borderRadius: 19, background: t.bg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.text, flexShrink: 0 }}>
          <Icon.Plus size={20} />
        </button>
        <input
          value={draft} onChange={e => setDraft(e.target.value)}
          placeholder="Écrire un message…"
          style={{ flex: 1, height: 42, padding: '0 16px', background: t.bg, border: `1px solid ${t.border}`, borderRadius: 21, fontSize: 14, color: t.text, fontFamily: 'inherit' }}
        />
        <button style={{ width: 42, height: 42, borderRadius: 21, background: KBRAND.blue, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0 }}>
          <Icon.Send size={18} />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { MyBookingsScreen, BookingStatusBadge, BookingDetailScreen, MessagesScreen, ChatScreen });
