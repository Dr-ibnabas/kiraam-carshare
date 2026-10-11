/* Home + Search + Filters + Map screens */

function HomeScreen({ dark, go }) {
  const t = getTheme(dark);
  const { CARS, EXCURSIONS, CATEGORIES, USERS } = window.KDATA;
  const [cat, setCat] = React.useState('Toutes');
  const filtered = cat === 'Toutes' ? CARS : CARS.filter(c => c.type === cat);
  const featured = CARS.filter(c => c.super).slice(0, 5);
  const nearby = [...CARS].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 6);
  const superHosts = Object.entries(USERS).filter(([k, u]) => u.super).slice(0, 4);

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, overflow: 'auto', paddingBottom: 100 }}>
      <div style={{ height: 54 }} />

      {/* Header */}
      <div style={{ padding: '8px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: t.muted, letterSpacing: 0.4, textTransform: 'uppercase' }}>Votre position</div>
          <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 4, padding: 0, cursor: 'pointer', color: t.text }}>
            <Icon.MapPin size={16} stroke={KBRAND.red} />
            <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Plateau du Serpent</span>
            <Icon.ChevronDown size={14} stroke={t.muted} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => go('notifications')} style={{ width: 40, height: 40, borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.text, position: 'relative' }}>
            <Icon.Bell size={18} />
            <div style={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: 4, background: KBRAND.red, border: '2px solid ' + t.bg }} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 20px 16px' }}>
        <button onClick={() => go('search')} style={{
          width: '100%', height: 52, padding: '0 16px', textAlign: 'left',
          background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16,
          display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', color: t.muted, fontFamily: 'inherit',
        }}>
          <Icon.Search size={20} />
          <span style={{ flex: 1, fontSize: 14 }}>Marque, modèle, ville…</span>
          <Icon.Mic size={18} stroke={KBRAND.blue} />
        </button>
      </div>

      {/* Hero promo card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          borderRadius: 22, padding: 18,
          background: `linear-gradient(135deg, ${KBRAND.blue}, ${KBRAND.blueDark})`,
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, bottom: -20, fontSize: 130, opacity: 0.18 }}>🎁</div>
          <Badge style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', marginBottom: 8 }}>PARRAINAGE</Badge>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.3, marginBottom: 4 }}>Gagnez 2 000 Fdj par ami</div>
          <div style={{ fontSize: 13, opacity: 0.92, marginBottom: 14, maxWidth: 240, lineHeight: 1.4 }}>Partagez votre code et recevez un crédit à chaque première location.</div>
          <button onClick={() => go('referral')} style={{ background: '#fff', color: KBRAND.blueDark, border: 'none', padding: '8px 14px', borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Inviter des amis →
          </button>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 22px', overflowX: 'auto' }}>
        {CATEGORIES.map(c => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)} dark={dark}>{c}</Chip>
        ))}
      </div>

      {/* Featured carousel */}
      <SectionHeader title="✨ Voitures en vedette" action="Tout voir" onAction={() => go('search')} dark={dark} />
      <div style={{ display: 'flex', gap: 14, padding: '0 20px 28px', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
        {featured.map(car => <CarCardLarge key={car.id} car={car} dark={dark} onClick={() => go('car', car.id)} />)}
      </div>

      {/* Excursions */}
      <SectionHeader title="🏜️ Excursions populaires" dark={dark} />
      <div style={{ display: 'flex', gap: 12, padding: '0 20px 28px', overflowX: 'auto' }}>
        {EXCURSIONS.map(e => (
          <div key={e.name} style={{ flex: '0 0 140px', borderRadius: 16, overflow: 'hidden', position: 'relative', height: 170, cursor: 'pointer' }}>
            <Photo src={e.img} style={{ position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, color: '#fff' }}>
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 2 }}>{e.name}</div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>{e.km} km · {e.tag}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Nearby */}
      <SectionHeader title="📍 Près de vous" action="Voir carte" onAction={() => go('map')} dark={dark} />
      <div style={{ padding: '0 20px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {nearby.slice(0, 4).map(car => <CarCardHorizontal key={car.id} car={car} dark={dark} onClick={() => go('car', car.id)} />)}
      </div>

      {/* Super-Hosts */}
      <SectionHeader title="🌟 Super-Hosts djiboutiens" dark={dark} />
      <div style={{ display: 'flex', gap: 12, padding: '0 20px 40px', overflowX: 'auto' }}>
        {superHosts.map(([id, u]) => (
          <div key={id} style={{ flex: '0 0 130px', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: 14, textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: 60, height: 60, borderRadius: 30, margin: '0 auto 10px', position: 'relative' }}>
              <img src={u.avatar} alt={u.name} style={{ width: '100%', height: '100%', borderRadius: 30, objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: -2, right: -2, background: KBRAND.gold, width: 22, height: 22, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, border: `2px solid ${t.surface}` }}>👑</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{u.name.split(' ')[0]}</div>
            <Stars rating={u.rating} size={10} />
            <div style={{ fontSize: 10, color: t.muted, marginTop: 3 }}>{u.trips} locations</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CarCardLarge({ car, dark, onClick }) {
  const t = getTheme(dark);
  return (
    <div onClick={onClick} style={{
      flex: '0 0 260px', borderRadius: 20, overflow: 'hidden',
      background: t.surface, border: `1px solid ${t.border}`, cursor: 'pointer',
      scrollSnapAlign: 'start',
    }}>
      <div style={{ position: 'relative', height: 160 }}>
        <Photo src={car.photos[0]} style={{ position: 'absolute', inset: 0 }} />
        {car.super && (
          <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <Badge variant="super">👑 SUPER</Badge>
          </div>
        )}
        <button style={{ position: 'absolute', top: 8, right: 8, width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.95)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: KBRAND.red }}>
          <Icon.Heart size={18} />
        </button>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8, marginBottom: 4 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{car.brand} {car.model}</div>
          <Stars rating={car.rating} size={11} />
        </div>
        <div style={{ fontSize: 12, color: t.muted, marginBottom: 12 }}>{car.district} · {car.distanceKm} km</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: t.text }}>{fdj(car.pricePerDay).replace(' Fdj', '')}</span>
          <span style={{ fontSize: 12, color: t.muted, fontWeight: 600 }}>Fdj / jour</span>
        </div>
      </div>
    </div>
  );
}

function CarCardHorizontal({ car, dark, onClick }) {
  const t = getTheme(dark);
  return (
    <div onClick={onClick} style={{
      background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18,
      padding: 12, display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'center',
    }}>
      <div style={{ width: 100, height: 80, borderRadius: 12, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
        <Photo src={car.photos[0]} style={{ position: 'absolute', inset: 0 }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: t.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{car.brand} {car.model}</div>
          {car.super && <Icon.Award size={14} stroke={KBRAND.gold} />}
        </div>
        <div style={{ fontSize: 11, color: t.muted, marginBottom: 6, display: 'flex', gap: 6 }}>
          <span>{car.type}</span>
          <span>·</span>
          <span>{car.transmission}</span>
          <span>·</span>
          <span>{car.seats}p</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: t.muted }}>
            <Stars rating={car.rating} size={10} /> <span>({car.reviews})</span>
            <span>·</span>
            <span>{car.distanceKm} km</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: KBRAND.blueDark }}>{fdj(car.pricePerDay)}</div>
        </div>
      </div>
    </div>
  );
}

function SearchScreen({ dark, go }) {
  const t = getTheme(dark);
  const { CARS } = window.KDATA;
  const [q, setQ] = React.useState('');
  const [view, setView] = React.useState('list');
  const [sort, setSort] = React.useState('price');
  const [showFilters, setShowFilters] = React.useState(false);
  const filtered = CARS.filter(c =>
    !q || `${c.brand} ${c.model} ${c.city}`.toLowerCase().includes(q.toLowerCase())
  ).sort((a, b) => {
    if (sort === 'price') return a.pricePerDay - b.pricePerDay;
    if (sort === 'distance') return a.distanceKm - b.distanceKm;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div style={{ position: 'absolute', inset: 0, background: t.bg, color: t.text, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 54 }} />

      {/* Search header */}
      <div style={{ padding: '6px 16px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={() => go('home')} style={{ width: 40, height: 40, borderRadius: 14, background: t.surface, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.text, flexShrink: 0 }}>
          <Icon.ChevronLeft size={20} />
        </button>
        <div style={{ flex: 1, position: 'relative' }}>
          <Icon.Search size={18} style={{ position: 'absolute', left: 14, top: 17, color: t.muted }} />
          <input
            value={q} onChange={e => setQ(e.target.value)} placeholder="Toyota, Mercedes, Djibouti…"
            style={{ width: '100%', height: 48, padding: '0 14px 0 42px', boxSizing: 'border-box', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, fontSize: 14, color: t.text, fontFamily: 'inherit' }}
          />
        </div>
        <button onClick={() => setShowFilters(true)} style={{ width: 48, height: 48, borderRadius: 14, background: '#0A0E1A', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
          <Icon.Filter size={18} />
          <div style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, background: KBRAND.red }} />
        </button>
      </div>

      {/* Sort + view toggle */}
      <div style={{ padding: '0 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: t.muted }}>
          <strong style={{ color: t.text }}>{filtered.length}</strong> véhicules trouvés
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ height: 32, padding: '0 10px', borderRadius: 10, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 12, fontFamily: 'inherit', fontWeight: 600 }}>
            <option value="price">Prix ↑</option>
            <option value="distance">Distance</option>
            <option value="rating">Mieux notés</option>
          </select>
          <div style={{ display: 'flex', background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 2 }}>
            <button onClick={() => setView('list')} style={{ width: 32, height: 28, borderRadius: 8, border: 'none', background: view === 'list' ? '#0A0E1A' : 'transparent', color: view === 'list' ? '#fff' : t.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></svg>
            </button>
            <button onClick={() => setView('map')} style={{ width: 32, height: 28, borderRadius: 8, border: 'none', background: view === 'map' ? '#0A0E1A' : 'transparent', color: view === 'map' ? '#fff' : t.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon.Map size={14} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 100 }}>
        {view === 'list' ? (
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(c => <CarCardHorizontal key={c.id} car={c} dark={dark} onClick={() => go('car', c.id)} />)}
          </div>
        ) : (
          <MapView cars={filtered} dark={dark} onPick={(id) => go('car', id)} />
        )}
      </div>

      {showFilters && <FiltersSheet dark={dark} onClose={() => setShowFilters(false)} />}
    </div>
  );
}

function MapView({ cars, dark, onPick }) {
  const t = getTheme(dark);
  const [selected, setSelected] = React.useState(cars[0]);
  return (
    <div style={{ position: 'relative', height: '100%', minHeight: 500 }}>
      {/* Fake map */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? `radial-gradient(circle at 30% 40%, #1B2236 0%, #0A0E1A 70%)`
          : `radial-gradient(circle at 30% 40%, #DCE9F4 0%, #B7CFE4 70%)`,
        backgroundImage: dark
          ? `linear-gradient(rgba(106,178,231,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(106,178,231,0.05) 1px, transparent 1px), radial-gradient(circle at 30% 40%, #1B2236 0%, #0A0E1A 70%)`
          : `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(circle at 30% 40%, #DCE9F4 0%, #B7CFE4 70%)`,
        backgroundSize: '40px 40px, 40px 40px, 100% 100%',
      }} />

      {/* Sea */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%',
        background: dark ? 'linear-gradient(180deg, transparent, #0D1A28)' : 'linear-gradient(180deg, transparent, #7BB3D9)',
        clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)',
      }} />

      {/* Roads */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
          <path d="M50 100 Q 200 200 350 150 T 380 400" stroke={dark ? 'rgba(106,178,231,0.3)' : 'rgba(255,255,255,0.7)'} strokeWidth="6" fill="none" />
          <path d="M0 350 Q 150 320 250 380 T 400 360" stroke={dark ? 'rgba(106,178,231,0.2)' : 'rgba(255,255,255,0.5)'} strokeWidth="4" fill="none" />
          <path d="M180 0 L 200 350" stroke={dark ? 'rgba(106,178,231,0.2)' : 'rgba(255,255,255,0.5)'} strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* Markers */}
      {cars.slice(0, 8).map((c, i) => {
        const positions = [
          { x: 22, y: 28 }, { x: 55, y: 22 }, { x: 35, y: 45 }, { x: 70, y: 38 },
          { x: 18, y: 55 }, { x: 60, y: 58 }, { x: 80, y: 25 }, { x: 45, y: 65 },
        ];
        const p = positions[i] || { x: 50, y: 50 };
        const isSel = selected?.id === c.id;
        return (
          <button key={c.id} onClick={() => setSelected(c)} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)',
            background: isSel ? '#0A0E1A' : '#fff', color: isSel ? '#fff' : '#0A0E1A',
            border: `2px solid ${isSel ? KBRAND.blue : 'transparent'}`,
            padding: '6px 10px', borderRadius: 20, fontSize: 12, fontWeight: 800,
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap', zIndex: isSel ? 5 : 1,
          }}>
            {(c.pricePerDay / 1000).toFixed(0)}k Fdj
          </button>
        );
      })}

      {/* Selected card */}
      {selected && (
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 10 }}>
          <CarCardHorizontal car={selected} dark={dark} onClick={() => onPick(selected.id)} />
        </div>
      )}
    </div>
  );
}

function FiltersSheet({ dark, onClose }) {
  const t = getTheme(dark);
  const [price, setPrice] = React.useState([8000, 35000]);
  const [type, setType] = React.useState(['SUV/4x4']);
  const [transmission, setTransmission] = React.useState('Tous');
  const [features, setFeatures] = React.useState(['Climatisation']);

  const toggle = (arr, setArr, v) => setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
      <div style={{
        position: 'relative', background: t.bg, borderRadius: '24px 24px 0 0', maxHeight: '88%',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: t.border }} />
        </div>
        <div style={{ padding: '0 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: t.text }}>Filtres</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: KBRAND.blue, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Réinitialiser</button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          <FilterSection title="Prix par jour" dark={dark}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong style={{ color: t.text }}>{price[0].toLocaleString('fr-FR')} Fdj</strong>
              <strong style={{ color: t.text }}>{price[1].toLocaleString('fr-FR')} Fdj</strong>
            </div>
            <div style={{ position: 'relative', height: 4, background: t.border, borderRadius: 2 }}>
              <div style={{ position: 'absolute', left: '12%', right: '20%', top: 0, bottom: 0, background: KBRAND.blue, borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: '12%', top: -8, width: 20, height: 20, borderRadius: 10, background: '#fff', border: `3px solid ${KBRAND.blue}`, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
              <div style={{ position: 'absolute', left: '80%', top: -8, width: 20, height: 20, borderRadius: 10, background: '#fff', border: `3px solid ${KBRAND.blue}`, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
            </div>
          </FilterSection>

          <FilterSection title="Type de véhicule" dark={dark}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['SUV/4x4', 'Citadine', 'Luxe', 'Familiale', 'Berline', 'Hybride'].map(v => (
                <Chip key={v} active={type.includes(v)} onClick={() => toggle(type, setType, v)} dark={dark}>{v}</Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Transmission" dark={dark}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Tous', 'Auto', 'Manuelle'].map(v => (
                <Chip key={v} active={transmission === v} onClick={() => setTransmission(v)} dark={dark}>{v}</Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Équipements" dark={dark}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Climatisation', '4x4', 'GPS', 'Bluetooth', 'Glacière', 'Sièges chauffants', 'Caméra recul', 'Toit ouvrant'].map(v => (
                <Chip key={v} active={features.includes(v)} onClick={() => toggle(features, setFeatures, v)} dark={dark}>{v}</Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Distance max" dark={dark}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['5 km', '10 km', '25 km', '50+ km'].map(v => (
                <Chip key={v} active={v === '10 km'} dark={dark}>{v}</Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Options" dark={dark}>
            {[
              { label: 'Livraison disponible', icon: '🚚' },
              { label: 'Super-Host uniquement', icon: '👑' },
              { label: 'Annulation gratuite', icon: '🛡️' },
            ].map((opt, i) => (
              <div key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: i < 2 ? `1px solid ${t.border}` : 'none' }}>
                <span style={{ fontSize: 22 }}>{opt.icon}</span>
                <div style={{ flex: 1, color: t.text, fontWeight: 600 }}>{opt.label}</div>
                <Toggle dark={dark} on={i === 0} />
              </div>
            ))}
          </FilterSection>
        </div>

        <div style={{ padding: '16px 20px 36px', borderTop: `1px solid ${t.border}`, background: t.bg }}>
          <KButton variant="primary" onClick={onClose}>Afficher 18 résultats</KButton>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children, dark }) {
  const t = getTheme(dark);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 14, letterSpacing: -0.1 }}>{title}</div>
      {children}
    </div>
  );
}

function Toggle({ dark, on, onChange }) {
  const [val, setVal] = React.useState(on);
  return (
    <button onClick={() => { setVal(!val); onChange && onChange(!val); }} style={{
      width: 48, height: 28, borderRadius: 14, border: 'none', padding: 2,
      background: val ? KBRAND.green : (dark ? '#2A3349' : '#D5DCE5'),
      display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'background 200ms',
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: 12, background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transform: val ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 200ms',
      }} />
    </button>
  );
}

Object.assign(window, { HomeScreen, SearchScreen, FiltersSheet, CarCardLarge, CarCardHorizontal, MapView, Toggle });
