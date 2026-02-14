import { useState, useCallback } from 'react';

type Location = { name: string; emoji: string; baseCustomers: number; description: string };
type Supplies = { lemons: number; sugar: number; cups: number };
type DayResult = {
  day: number;
  weather: string;
  event: string | null;
  customers: number;
  revenue: number;
  costs: number;
  profit: number;
};

const LOCATIONS: Location[] = [
  { name: 'Park', emoji: '\u{1F333}', baseCustomers: 18, description: 'Families and joggers pass by all day' },
  { name: 'Beach', emoji: '\u{1F3D6}\uFE0F', baseCustomers: 25, description: 'Hot and busy on sunny days, empty when rainy' },
  { name: 'School', emoji: '\u{1F3EB}', baseCustomers: 20, description: 'Steady crowd of thirsty students after class' },
];

const PRICES = [0.5, 1.0, 1.5, 2.0];

const WEATHERS = [
  { label: 'Sunny', emoji: '\u2600\uFE0F', multiplier: 1.3 },
  { label: 'Cloudy', emoji: '\u26C5', multiplier: 1.0 },
  { label: 'Rainy', emoji: '\u{1F327}\uFE0F', multiplier: 0.5 },
];

const EVENTS = [
  null,
  null,
  null,
  { text: 'Neighbor opens a competing stand!', effect: -0.35 },
  { text: 'Local newspaper features your stand!', effect: 0.5 },
  { text: 'A birthday party walks by!', effect: 0.4 },
  null,
  { text: 'Road construction blocks your street!', effect: -0.3 },
  { text: 'You hand out free samples \u2014 word spreads!', effect: 0.3 },
  null,
];

const TOTAL_DAYS = 7;

const colors = {
  bg: '#1A1A2E',
  cardBg: '#2D2D44',
  lemon: '#FDD835',
  green: '#4CAF50',
  orange: '#FF9800',
  red: '#EF5350',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0C8',
};

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function KidBizTycoon() {
  const [phase, setPhase] = useState<'intro' | 'setup' | 'daily' | 'complete'>('intro');
  const [location, setLocation] = useState<Location | null>(null);
  const [day, setDay] = useState(1);
  const [cash, setCash] = useState(20);
  const [price, setPrice] = useState(1.0);
  const [supplies, setSupplies] = useState<Supplies>({ lemons: 0, sugar: 0, cups: 0 });
  const [cart, setCart] = useState<Supplies>({ lemons: 0, sugar: 0, cups: 0 });
  const [results, setResults] = useState<DayResult[]>([]);
  const [todayResult, setTodayResult] = useState<DayResult | null>(null);
  const [dailyStep, setDailyStep] = useState<'price' | 'supplies' | 'forecast' | 'result'>('price');
  const [weather, setWeather] = useState(WEATHERS[0]);
  const [event, setEvent] = useState<{ text: string; effect: number } | null>(null);
  const [animateCash, setAnimateCash] = useState(false);
  const [daySpent, setDaySpent] = useState(0);

  const generateWeather = useCallback((d: number) => {
    const r = seededRandom(d * 17 + 42);
    if (location?.name === 'Beach') {
      return r < 0.55 ? WEATHERS[0] : r < 0.8 ? WEATHERS[1] : WEATHERS[2];
    }
    return r < 0.45 ? WEATHERS[0] : r < 0.75 ? WEATHERS[1] : WEATHERS[2];
  }, [location]);

  const generateEvent = useCallback((d: number) => {
    const r = seededRandom(d * 31 + 7);
    const idx = Math.floor(r * EVENTS.length);
    return EVENTS[idx];
  }, []);

  const cartCost = cart.lemons * 2 + cart.sugar * 1 + cart.cups * 3;

  const handleBuySupplies = useCallback(() => {
    if (cartCost > cash) return;
    setDaySpent(prev => prev + cartCost);
    setCash(prev => prev - cartCost);
    setSupplies(prev => ({
      lemons: prev.lemons + cart.lemons * 10,
      sugar: prev.sugar + cart.sugar * 15,
      cups: prev.cups + cart.cups * 20,
    }));
    setCart({ lemons: 0, sugar: 0, cups: 0 });
  }, [cart, cartCost, cash]);

  const handleServDay = useCallback(() => {
    if (!location) return;
    const w = weather;
    const ev = event;
    let customers = Math.round(location.baseCustomers * w.multiplier);
    if (ev) customers = Math.max(2, Math.round(customers * (1 + ev.effect)));
    const priceFactor = price <= 0.5 ? 1.2 : price <= 1.0 ? 1.0 : price <= 1.5 ? 0.8 : 0.6;
    customers = Math.round(customers * priceFactor);
    const maxFromLemons = supplies.lemons;
    const maxFromSugar = supplies.sugar;
    const maxFromCups = supplies.cups;
    const canServe = Math.min(customers, maxFromLemons, maxFromSugar, maxFromCups);
    const revenue = canServe * price;
    const dayCosts = daySpent;
    const profit = revenue - dayCosts;

    setSupplies(prev => ({
      lemons: prev.lemons - canServe,
      sugar: prev.sugar - canServe,
      cups: prev.cups - canServe,
    }));
    setCash(prev => {
      const next = prev + revenue;
      return Math.round(next * 100) / 100;
    });
    setAnimateCash(true);
    setTimeout(() => setAnimateCash(false), 800);

    const result: DayResult = {
      day,
      weather: `${w.emoji} ${w.label}`,
      event: ev?.text ?? null,
      customers: canServe,
      revenue: Math.round(revenue * 100) / 100,
      costs: Math.round(dayCosts * 100) / 100,
      profit: Math.round(profit * 100) / 100,
    };
    setTodayResult(result);
    setResults(prev => [...prev, result]);
    setDailyStep('result');
  }, [location, weather, event, price, supplies, day, daySpent]);

  const handleNextDay = useCallback(() => {
    if (day >= TOTAL_DAYS) {
      setPhase('complete');
      return;
    }
    setDay(prev => prev + 1);
    setDailyStep('price');
    setTodayResult(null);
    setCart({ lemons: 0, sugar: 0, cups: 0 });
    setDaySpent(0);
    const nextDay = day + 1;
    setWeather(generateWeather(nextDay));
    setEvent(generateEvent(nextDay));
  }, [day, generateWeather, generateEvent]);

  const startDaily = useCallback(() => {
    const w = generateWeather(1);
    const ev = generateEvent(1);
    setWeather(w);
    setEvent(ev);
    setDaySpent(0);
    setDailyStep('price');
    setPhase('daily');
  }, [generateWeather, generateEvent]);

  const totalRevenue = results.reduce((s, r) => s + r.revenue, 0);
  const totalCosts = results.reduce((s, r) => s + r.costs, 0);
  const totalProfit = totalRevenue - totalCosts;
  const stars = totalProfit >= 30 ? 3 : totalProfit >= 15 ? 2 : 1;

  const containerStyle: React.CSSProperties = {
    background: colors.bg,
    minHeight: 420,
    maxWidth: 520,
    margin: '0 auto',
    borderRadius: 16,
    padding: 24,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: colors.textPrimary,
    position: 'relative',
    overflow: 'hidden',
  };

  const cardStyle: React.CSSProperties = {
    background: colors.cardBg,
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
  };

  const btnBase: React.CSSProperties = {
    border: 'none',
    borderRadius: 10,
    padding: '10px 22px',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'transform 0.15s, opacity 0.15s',
  };

  const primaryBtn: React.CSSProperties = { ...btnBase, background: colors.lemon, color: '#1A1A2E' };
  const secondaryBtn: React.CSSProperties = { ...btnBase, background: colors.cardBg, color: colors.textPrimary, border: `2px solid ${colors.lemon}` };

  const heading = (text: string) => (
    <h2 style={{ margin: '0 0 10px', fontSize: 22, color: colors.lemon, textAlign: 'center' }}>{text}</h2>
  );

  const money = (v: number) => `$${v.toFixed(2)}`;

  // --- INTRO ---
  if (phase === 'intro') {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', paddingTop: 20 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{'\u{1F34B}'}</div>
          {heading('Welcome to Kid Biz Tycoon!')}
          <p style={{ color: colors.textSecondary, lineHeight: 1.6, margin: '14px 0 24px' }}>
            You're opening a <strong style={{ color: colors.lemon }}>lemonade stand</strong>!
            Over 7 days, you'll set prices, buy supplies, and deal with weather and surprises.
            Try to make as much <strong style={{ color: colors.green }}>profit</strong> as you can!
          </p>
          <div style={cardStyle}>
            <p style={{ margin: 0, fontSize: 14, color: colors.textSecondary }}>
              <strong style={{ color: colors.orange }}>Revenue</strong> = cups sold x price{' | '}
              <strong style={{ color: colors.red }}>Costs</strong> = supplies you buy{' | '}
              <strong style={{ color: colors.green }}>Profit</strong> = revenue - costs
            </p>
          </div>
          <p style={{ color: colors.textSecondary, fontSize: 14 }}>You start with <strong style={{ color: colors.green }}>{money(20)}</strong> in your pocket.</p>
          <button style={primaryBtn} onClick={() => setPhase('setup')}>Let's Go!</button>
        </div>
      </div>
    );
  }

  // --- SETUP ---
  if (phase === 'setup') {
    return (
      <div style={containerStyle}>
        {heading('Choose Your Location')}
        <p style={{ textAlign: 'center', color: colors.textSecondary, marginBottom: 18 }}>
          Where will you set up your stand?
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {LOCATIONS.map(loc => {
            const selected = location?.name === loc.name;
            return (
              <button
                key={loc.name}
                onClick={() => setLocation(loc)}
                style={{
                  ...cardStyle,
                  flex: '1 1 140px',
                  maxWidth: 160,
                  cursor: 'pointer',
                  border: selected ? `3px solid ${colors.lemon}` : '3px solid transparent',
                  textAlign: 'center',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ fontSize: 36 }}>{loc.emoji}</div>
                <div style={{ fontWeight: 700, margin: '6px 0 4px', color: colors.textPrimary }}>{loc.name}</div>
                <div style={{ fontSize: 12, color: colors.textSecondary, lineHeight: 1.4 }}>{loc.description}</div>
              </button>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button
            style={{ ...primaryBtn, opacity: location ? 1 : 0.4, pointerEvents: location ? 'auto' : 'none' }}
            onClick={startDaily}
          >
            Open Your Stand!
          </button>
        </div>
      </div>
    );
  }

  // --- DAILY ---
  if (phase === 'daily') {
    return (
      <div style={containerStyle}>
        {/* Header bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: colors.textSecondary }}>
            {location?.emoji} {location?.name}
          </div>
          <div style={{ fontWeight: 700, color: colors.lemon, fontSize: 15 }}>Day {day} / {TOTAL_DAYS}</div>
          <div style={{
            fontWeight: 700,
            color: colors.green,
            fontSize: 15,
            transition: 'transform 0.3s',
            transform: animateCash ? 'scale(1.3)' : 'scale(1)',
          }}>
            {'\u{1F4B0}'} {money(cash)}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#1a1a30', borderRadius: 6, height: 8, marginBottom: 16 }}>
          <div style={{
            width: `${(day / TOTAL_DAYS) * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${colors.lemon}, ${colors.orange})`,
            borderRadius: 6,
            transition: 'width 0.4s ease',
          }} />
        </div>

        {/* Forecast banner */}
        {dailyStep !== 'result' && (
          <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
            <span style={{ fontSize: 13, color: colors.textSecondary }}>
              Forecast: <strong style={{ color: colors.textPrimary }}>{weather.emoji} {weather.label}</strong>
            </span>
            {event && (
              <span style={{ fontSize: 12, color: colors.orange, fontWeight: 600, maxWidth: '55%', textAlign: 'right' }}>
                {'\u26A1'} {event.text}
              </span>
            )}
          </div>
        )}

        {/* PRICE STEP */}
        {dailyStep === 'price' && (
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16, color: colors.lemon }}>{'\u{1F3F7}\uFE0F'} Set Your Price Per Cup</h3>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {PRICES.map(p => (
                <button
                  key={p}
                  onClick={() => setPrice(p)}
                  style={{
                    ...btnBase,
                    flex: '1 1 60px',
                    background: price === p ? colors.lemon : '#3a3a55',
                    color: price === p ? '#1A1A2E' : colors.textPrimary,
                    fontSize: 16,
                  }}
                >
                  {money(p)}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: colors.textSecondary, marginTop: 10, marginBottom: 0 }}>
              Lower prices attract more customers, higher prices earn more per cup.
            </p>
            <div style={{ textAlign: 'right', marginTop: 14 }}>
              <button style={primaryBtn} onClick={() => setDailyStep('supplies')}>Next: Buy Supplies</button>
            </div>
          </div>
        )}

        {/* SUPPLIES STEP */}
        {dailyStep === 'supplies' && (
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16, color: colors.lemon }}>{'\u{1F6D2}'} Buy Supplies</h3>
            <div style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 8 }}>
              Inventory: {'\u{1F34B}'} {supplies.lemons} cups | {'\u{1F36C}'} {supplies.sugar} cups | {'\u{1FAA3}'} {supplies.cups} cups
            </div>
            {([
              { key: 'lemons' as const, label: 'Lemons', emoji: '\u{1F34B}', cost: 2, makes: 10 },
              { key: 'sugar' as const, label: 'Sugar', emoji: '\u{1F36C}', cost: 1, makes: 15 },
              { key: 'cups' as const, label: 'Cups', emoji: '\u{1FAA3}', cost: 3, makes: 20 },
            ]).map(item => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #3a3a55' }}>
                <span style={{ fontSize: 14 }}>{item.emoji} {item.label} <span style={{ color: colors.textSecondary, fontSize: 12 }}>(${item.cost}/bag = {item.makes} cups)</span></span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    style={{ ...btnBase, padding: '4px 12px', fontSize: 16, background: '#3a3a55', color: colors.textPrimary }}
                    onClick={() => setCart(c => ({ ...c, [item.key]: Math.max(0, c[item.key] - 1) }))}
                  >-</button>
                  <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{cart[item.key]}</span>
                  <button
                    style={{ ...btnBase, padding: '4px 12px', fontSize: 16, background: colors.lemon, color: '#1A1A2E' }}
                    onClick={() => setCart(c => ({ ...c, [item.key]: c[item.key] + 1 }))}
                  >+</button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 14, color: cartCost > cash ? colors.red : colors.textSecondary }}>
                Cart total: <strong>{money(cartCost)}</strong>
                {cartCost > cash && ' (not enough cash!)'}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={secondaryBtn} onClick={() => { setCart({ lemons: 0, sugar: 0, cups: 0 }); setDailyStep('price'); }}>Back</button>
                <button
                  style={{ ...primaryBtn, opacity: cartCost <= cash ? 1 : 0.4 }}
                  onClick={() => { handleBuySupplies(); setDailyStep('forecast'); }}
                  disabled={cartCost > cash}
                >
                  Buy & Open!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FORECAST / SERVE STEP */}
        {dailyStep === 'forecast' && (
          <div style={{ ...cardStyle, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{weather.emoji}</div>
            <h3 style={{ margin: '0 0 6px', color: colors.textPrimary }}>Today's Weather: {weather.label}</h3>
            {event && (
              <p style={{ color: colors.orange, fontWeight: 600, margin: '8px 0' }}>{'\u26A1'} {event.text}</p>
            )}
            <p style={{ fontSize: 13, color: colors.textSecondary, margin: '8px 0 4px' }}>
              Price: <strong style={{ color: colors.lemon }}>{money(price)}</strong> | Inventory: {'\u{1F34B}'}{supplies.lemons} {'\u{1F36C}'}{supplies.sugar} {'\u{1FAA3}'}{supplies.cups}
            </p>
            <button style={{ ...primaryBtn, marginTop: 14 }} onClick={handleServDay}>
              {'\u{1F34B}'} Open for Business!
            </button>
          </div>
        )}

        {/* RESULT STEP */}
        {dailyStep === 'result' && todayResult && (
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 14px', fontSize: 17, color: colors.lemon, textAlign: 'center' }}>
              {'\u{1F4CB}'} Day {todayResult.day} Report
            </h3>
            {todayResult.event && (
              <p style={{ textAlign: 'center', color: colors.orange, fontWeight: 600, margin: '0 0 10px' }}>
                {'\u26A1'} {todayResult.event}
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              {[
                { label: 'Weather', value: todayResult.weather, color: colors.textPrimary },
                { label: 'Customers', value: `${todayResult.customers} served`, color: colors.textPrimary },
                { label: 'Revenue', value: money(todayResult.revenue), color: colors.green },
                { label: 'Supply Costs', value: money(todayResult.costs), color: colors.red },
              ].map(item => (
                <div key={item.label} style={{ background: '#1a1a30', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{
              background: todayResult.profit >= 0 ? 'rgba(76,175,80,0.15)' : 'rgba(239,83,80,0.15)',
              borderRadius: 8,
              padding: 12,
              textAlign: 'center',
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>Day Profit: </span>
              <span style={{ fontSize: 20, fontWeight: 700, color: todayResult.profit >= 0 ? colors.green : colors.red }}>
                {todayResult.profit >= 0 ? '+' : ''}{money(todayResult.profit)}
              </span>
            </div>
            <div style={{ textAlign: 'center', fontSize: 13, color: colors.textSecondary, marginBottom: 12 }}>
              Remaining: {'\u{1F34B}'}{supplies.lemons} {'\u{1F36C}'}{supplies.sugar} {'\u{1FAA3}'}{supplies.cups}
            </div>
            <div style={{ textAlign: 'center' }}>
              <button style={primaryBtn} onClick={handleNextDay}>
                {day >= TOTAL_DAYS ? '\u{1F3C6} See Final Results' : `Next: Day ${day + 1} \u2192`}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- COMPLETE ---
  const tips: string[] = [];
  const avgPrice = results.length > 0 ? results.reduce((s, r) => s + (r.revenue / Math.max(r.customers, 1)), 0) / results.length : 0;
  if (avgPrice > 1.5) tips.push('Lowering your price a bit could attract more customers.');
  if (avgPrice < 0.75) tips.push('You could earn more by raising your price slightly.');
  const lowDays = results.filter(r => r.customers < 8).length;
  if (lowDays >= 3) tips.push('Buying more supplies ensures you never run out.');
  if (totalProfit >= 25) tips.push('Great job managing costs and revenue!');
  if (tips.length === 0) tips.push('Keep experimenting with prices and supply amounts!');

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 52 }}>{'\u{1F3C6}'}</div>
        {heading('Final Results!')}
        <p style={{ color: colors.textSecondary, margin: '4px 0 16px' }}>
          {location?.emoji} {location?.name} Lemonade Stand \u2014 7 Day Summary
        </p>
      </div>

      {/* Star rating */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        {[1, 2, 3].map(i => (
          <span key={i} style={{ fontSize: 36, marginRight: 6, filter: i <= stars ? 'none' : 'grayscale(1) opacity(0.3)' }}>
            {'\u2B50'}
          </span>
        ))}
        <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
          {stars === 3 ? 'Biz Tycoon!' : stars === 2 ? 'Solid Entrepreneur!' : 'Budding Business Owner!'}
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'Revenue', value: money(totalRevenue), color: colors.green },
          { label: 'Costs', value: money(totalCosts), color: colors.red },
          { label: 'Profit', value: money(totalProfit), color: totalProfit >= 0 ? colors.green : colors.red },
        ].map(item => (
          <div key={item.label} style={{ ...cardStyle, textAlign: 'center', padding: 14, marginBottom: 0 }}>
            <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Daily breakdown */}
      <div style={{ ...cardStyle, padding: 14, maxHeight: 160, overflowY: 'auto' }}>
        <h4 style={{ margin: '0 0 8px', fontSize: 13, color: colors.lemon }}>Daily Breakdown</h4>
        {results.map(r => (
          <div key={r.day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0', borderBottom: '1px solid #3a3a55', color: colors.textSecondary }}>
            <span>Day {r.day} {r.weather.split(' ')[0]}</span>
            <span>{r.customers} cups</span>
            <span style={{ color: r.profit >= 0 ? colors.green : colors.red, fontWeight: 600 }}>
              {r.profit >= 0 ? '+' : ''}{money(r.profit)}
            </span>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div style={{ ...cardStyle, marginTop: 14, padding: 14 }}>
        <h4 style={{ margin: '0 0 8px', fontSize: 13, color: colors.orange }}>{'\u{1F4A1}'} Business Tips</h4>
        {tips.map((t, i) => (
          <p key={i} style={{ margin: '4px 0', fontSize: 13, color: colors.textSecondary }}>{'\u2022'} {t}</p>
        ))}
      </div>

      {/* Final cash */}
      <div style={{ textAlign: 'center', margin: '16px 0 10px' }}>
        <span style={{ fontSize: 14, color: colors.textSecondary }}>Final Cash: </span>
        <span style={{ fontSize: 22, fontWeight: 700, color: colors.green }}>{money(cash)}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={primaryBtn} onClick={() => {
          setPhase('intro');
          setLocation(null);
          setDay(1);
          setCash(20);
          setPrice(1.0);
          setSupplies({ lemons: 0, sugar: 0, cups: 0 });
          setCart({ lemons: 0, sugar: 0, cups: 0 });
          setDaySpent(0);
          setResults([]);
          setTodayResult(null);
          setDailyStep('price');
        }}>
          Play Again
        </button>
      </div>
    </div>
  );
}
