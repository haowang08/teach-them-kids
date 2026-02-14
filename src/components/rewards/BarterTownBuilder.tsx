import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'barter' | 'commodity' | 'coins' | 'complete';

interface Villager {
  id: number;
  name: string;
  emoji: string;
  has: string;
  hasEmoji: string;
  wants: string;
  wantsEmoji: string;
  satisfied: boolean;
}

interface TradeRecord {
  from: string;
  to: string;
  item: string;
}

// ============================================
// CONSTANTS
// ============================================

const COLORS = {
  bg: '#1A1A2E',
  cardBg: '#2D2D44',
  green: '#2E7D32',
  gold: '#D4A017',
  accent: '#4CAF50',
  text: '#E0E0E0',
  textBright: '#FFFFFF',
  textDim: '#9E9E9E',
  highlight: '#3D3D5C',
  error: '#C62828',
  shell: '#8D6E63',
};

const ITEMS = [
  { name: 'Chicken', emoji: '\uD83D\uDC14' },
  { name: 'Wheat', emoji: '\uD83C\uDF3E' },
  { name: 'Pottery', emoji: '\uD83C\uDFFA' },
  { name: 'Cloth', emoji: '\uD83E\uDDF5' },
];

const COIN_PRICES: Record<string, number> = {
  Chicken: 3,
  Wheat: 2,
  Pottery: 5,
  Cloth: 4,
};

const PHASE_LABELS: Record<GamePhase, string> = {
  intro: 'Welcome',
  barter: 'Barter Era',
  commodity: 'Shell Money',
  coins: 'Gold Coins',
  complete: 'Complete',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function createVillagers(): Villager[] {
  // Circular wants: each wants what the next person has
  // This creates the "double coincidence of wants" problem
  return [
    { id: 0, name: 'Ama', emoji: '\uD83D\uDC69\u200D\uD83C\uDF3E', has: 'Chicken', hasEmoji: '\uD83D\uDC14', wants: 'Pottery', wantsEmoji: '\uD83C\uDFFA', satisfied: false },
    { id: 1, name: 'Kofi', emoji: '\uD83D\uDC68\u200D\uD83D\uDD27', has: 'Pottery', hasEmoji: '\uD83C\uDFFA', wants: 'Cloth', wantsEmoji: '\uD83E\uDDF5', satisfied: false },
    { id: 2, name: 'Esi', emoji: '\uD83E\uDDD1\u200D\uD83C\uDF73', has: 'Cloth', hasEmoji: '\uD83E\uDDF5', wants: 'Wheat', wantsEmoji: '\uD83C\uDF3E', satisfied: false },
    { id: 3, name: 'Yaw', emoji: '\uD83D\uDC68\u200D\uD83C\uDF3E', has: 'Wheat', hasEmoji: '\uD83C\uDF3E', wants: 'Chicken', wantsEmoji: '\uD83D\uDC14', satisfied: false },
  ];
}

// ============================================
// COMPONENT
// ============================================

export default function BarterTownBuilder() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [villagers, setVillagers] = useState<Villager[]>(createVillagers());
  const [selectedVillager, setSelectedVillager] = useState<number | null>(null);
  const [tradeLog, setTradeLog] = useState<TradeRecord[]>([]);
  const [dayCount, setDayCount] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'info' | 'success' | 'error'>('info');

  // Phase timers for comparison
  const [barterDays, setBarterDays] = useState(0);
  const [commodityDays, setCommodityDays] = useState(0);
  const [coinDays, setCoinDays] = useState(0);

  // Commodity money phase
  const [shells, setShells] = useState<Record<number, number>>({});
  const [commodityStep, setCommodityStep] = useState<'sell' | 'buy'>('sell');

  // Coins phase
  const [wallets, setWallets] = useState<Record<number, number>>({});
  const [coinsStep, setCoinsStep] = useState<'sell' | 'buy'>('sell');

  const [fadeIn, setFadeIn] = useState(true);

  // ----------------------------------------
  // PHASE TRANSITIONS
  // ----------------------------------------

  const transitionTo = useCallback((nextPhase: GamePhase) => {
    setFadeIn(false);
    setTimeout(() => {
      setPhase(nextPhase);
      setFadeIn(true);
    }, 300);
  }, []);

  const startGame = useCallback(() => {
    setVillagers(createVillagers());
    setSelectedVillager(null);
    setTradeLog([]);
    setDayCount(0);
    setMessage('Click a villager to select their item, then click another to trade with them.');
    setMessageType('info');
    transitionTo('barter');
  }, [transitionTo]);

  const startCommodityPhase = useCallback(() => {
    setBarterDays(dayCount);
    const freshVillagers = createVillagers();
    setVillagers(freshVillagers);
    setSelectedVillager(null);
    setTradeLog([]);
    setDayCount(0);
    setShells({ 0: 0, 1: 0, 2: 0, 3: 0 });
    setCommodityStep('sell');
    setMessage('Now everyone can sell their goods for cowrie shells \uD83D\uDC1A! Click a villager to sell their item.');
    setMessageType('info');
    transitionTo('commodity');
  }, [dayCount, transitionTo]);

  const startCoinsPhase = useCallback(() => {
    setCommodityDays(dayCount);
    const freshVillagers = createVillagers();
    setVillagers(freshVillagers);
    setSelectedVillager(null);
    setTradeLog([]);
    setDayCount(0);
    setWallets({ 0: 0, 1: 0, 2: 0, 3: 0 });
    setCoinsStep('sell');
    setMessage('Gold coins \uD83E\uDE99 have standard values! Click a villager to sell their item at market price.');
    setMessageType('info');
    transitionTo('coins');
  }, [dayCount, transitionTo]);

  const finishGame = useCallback(() => {
    setCoinDays(dayCount);
    transitionTo('complete');
  }, [dayCount, transitionTo]);

  const resetGame = useCallback(() => {
    setPhase('intro');
    setVillagers(createVillagers());
    setSelectedVillager(null);
    setTradeLog([]);
    setDayCount(0);
    setBarterDays(0);
    setCommodityDays(0);
    setCoinDays(0);
    setMessage('');
    setShells({});
    setWallets({});
  }, []);

  // ----------------------------------------
  // BARTER LOGIC
  // ----------------------------------------

  const handleBarterClick = useCallback((clickedId: number) => {
    if (selectedVillager === null) {
      // Select this villager (they will offer their item)
      const v = villagers[clickedId];
      if (v.satisfied) {
        setMessage(`${v.name} already got what they wanted!`);
        setMessageType('info');
        return;
      }
      setSelectedVillager(clickedId);
      setMessage(`${v.name} offers ${v.hasEmoji} ${v.has}. Click someone who wants it!`);
      setMessageType('info');
    } else if (selectedVillager === clickedId) {
      // Deselect
      setSelectedVillager(null);
      setMessage('Trade cancelled. Click a villager to try again.');
      setMessageType('info');
    } else {
      // Attempt trade
      const giver = villagers[selectedVillager];
      const receiver = villagers[clickedId];

      if (receiver.wants === giver.has) {
        // Successful trade!
        setDayCount(prev => prev + 1);
        const newVillagers = [...villagers];
        newVillagers[clickedId] = { ...receiver, satisfied: true };

        // The giver now takes the receiver's item
        newVillagers[selectedVillager] = {
          ...giver,
          has: receiver.has,
          hasEmoji: receiver.hasEmoji,
        };

        setVillagers(newVillagers);
        setTradeLog(prev => [...prev, {
          from: giver.name,
          to: receiver.name,
          item: `${giver.hasEmoji} ${giver.has}`,
        }]);
        setSelectedVillager(null);
        setMessage(`Trade successful! ${giver.name} gave ${giver.hasEmoji} to ${receiver.name}. (Day ${dayCount + 1})`);
        setMessageType('success');

        // Check if the giver is now also satisfied
        const updatedGiver = newVillagers[selectedVillager];
        if (updatedGiver.wants === updatedGiver.has) {
          newVillagers[selectedVillager] = { ...updatedGiver, satisfied: true };
          setVillagers([...newVillagers]);
        }

        // Check if all satisfied
        const allDone = newVillagers.every(v => v.satisfied);
        if (allDone) {
          setMessage(`All trades complete in ${dayCount + 1} days! That was tricky with barter.`);
          setMessageType('success');
        }
      } else {
        // Failed trade - double coincidence problem!
        setDayCount(prev => prev + 1);
        setSelectedVillager(null);
        setMessage(`${receiver.name} doesn't want ${giver.hasEmoji} ${giver.has}! They want ${receiver.wantsEmoji} ${receiver.wants}. This is the "double coincidence of wants" problem! (Day ${dayCount + 1})`);
        setMessageType('error');
      }
    }
  }, [selectedVillager, villagers, dayCount]);

  // ----------------------------------------
  // COMMODITY MONEY LOGIC
  // ----------------------------------------

  const handleCommodityClick = useCallback((clickedId: number) => {
    const v = villagers[clickedId];

    if (commodityStep === 'sell') {
      if (v.satisfied) {
        setMessage(`${v.name} already sold their item!`);
        setMessageType('info');
        return;
      }
      // Sell item for shells
      setDayCount(prev => prev + 1);
      const shellValue = 5; // Each item worth 5 shells
      const newShells = { ...shells, [clickedId]: (shells[clickedId] || 0) + shellValue };
      setShells(newShells);

      const newVillagers = [...villagers];
      newVillagers[clickedId] = { ...v, satisfied: true }; // Mark as sold
      setVillagers(newVillagers);

      setTradeLog(prev => [...prev, {
        from: v.name,
        to: 'Market',
        item: `${v.hasEmoji} -> \uD83D\uDC1A x${shellValue}`,
      }]);
      setMessage(`${v.name} sold ${v.hasEmoji} ${v.has} for \uD83D\uDC1A ${shellValue} shells! (Day ${dayCount + 1})`);
      setMessageType('success');

      // Check if all have sold
      const allSold = newVillagers.every(vl => vl.satisfied);
      if (allSold) {
        setCommodityStep('buy');
        setMessage('Everyone has shells now! Click each villager to buy what they want.');
        setMessageType('info');
        // Reset satisfied for buying phase
        setVillagers(newVillagers.map(vl => ({ ...vl, satisfied: false })));
      }
    } else {
      // Buy phase
      if (v.satisfied) {
        setMessage(`${v.name} already bought what they wanted!`);
        setMessageType('info');
        return;
      }
      const shellCost = 5;
      if ((shells[clickedId] || 0) < shellCost) {
        setMessage(`${v.name} doesn't have enough shells!`);
        setMessageType('error');
        return;
      }

      setDayCount(prev => prev + 1);
      const newShells = { ...shells, [clickedId]: (shells[clickedId] || 0) - shellCost };
      setShells(newShells);

      const newVillagers = [...villagers];
      newVillagers[clickedId] = { ...v, satisfied: true };
      setVillagers(newVillagers);

      setTradeLog(prev => [...prev, {
        from: 'Market',
        to: v.name,
        item: `\uD83D\uDC1A x${shellCost} -> ${v.wantsEmoji}`,
      }]);
      setMessage(`${v.name} bought ${v.wantsEmoji} ${v.wants} for \uD83D\uDC1A ${shellCost} shells! (Day ${dayCount + 1})`);
      setMessageType('success');

      const allDone = newVillagers.every(vl => vl.satisfied);
      if (allDone) {
        setMessage(`All trades complete in ${dayCount + 1} days! Much faster with shell money!`);
        setMessageType('success');
      }
    }
  }, [villagers, shells, commodityStep, dayCount]);

  // ----------------------------------------
  // COINS LOGIC
  // ----------------------------------------

  const handleCoinsClick = useCallback((clickedId: number) => {
    const v = villagers[clickedId];

    if (coinsStep === 'sell') {
      if (v.satisfied) {
        setMessage(`${v.name} already sold their item!`);
        setMessageType('info');
        return;
      }
      // Sell item for coins at set price
      setDayCount(prev => prev + 1);
      const coinValue = COIN_PRICES[v.has];
      const newWallets = { ...wallets, [clickedId]: (wallets[clickedId] || 0) + coinValue };
      setWallets(newWallets);

      const newVillagers = [...villagers];
      newVillagers[clickedId] = { ...v, satisfied: true };
      setVillagers(newVillagers);

      setTradeLog(prev => [...prev, {
        from: v.name,
        to: 'Market',
        item: `${v.hasEmoji} -> \uD83E\uDE99 x${coinValue}`,
      }]);
      setMessage(`${v.name} sold ${v.hasEmoji} ${v.has} for \uD83E\uDE99 ${coinValue} gold coins! (Day ${dayCount + 1})`);
      setMessageType('success');

      const allSold = newVillagers.every(vl => vl.satisfied);
      if (allSold) {
        setCoinsStep('buy');
        setMessage('Everyone has coins! Click each villager to buy what they want at the listed price.');
        setMessageType('info');
        setVillagers(newVillagers.map(vl => ({ ...vl, satisfied: false })));
      }
    } else {
      if (v.satisfied) {
        setMessage(`${v.name} already bought what they wanted!`);
        setMessageType('info');
        return;
      }
      const coinCost = COIN_PRICES[v.wants];
      if ((wallets[clickedId] || 0) < coinCost) {
        setMessage(`${v.name} needs \uD83E\uDE99 ${coinCost} but only has \uD83E\uDE99 ${wallets[clickedId] || 0}!`);
        setMessageType('error');
        return;
      }

      setDayCount(prev => prev + 1);
      const newWallets = { ...wallets, [clickedId]: (wallets[clickedId] || 0) - coinCost };
      setWallets(newWallets);

      const newVillagers = [...villagers];
      newVillagers[clickedId] = { ...v, satisfied: true };
      setVillagers(newVillagers);

      setTradeLog(prev => [...prev, {
        from: 'Market',
        to: v.name,
        item: `\uD83E\uDE99 x${coinCost} -> ${v.wantsEmoji}`,
      }]);
      setMessage(`${v.name} bought ${v.wantsEmoji} ${v.wants} for \uD83E\uDE99 ${coinCost} coins! (Day ${dayCount + 1})`);
      setMessageType('success');

      const allDone = newVillagers.every(vl => vl.satisfied);
      if (allDone) {
        setMessage(`All trades complete in ${dayCount + 1} days! Coins with prices make trading super efficient!`);
        setMessageType('success');
      }
    }
  }, [villagers, wallets, coinsStep, dayCount]);

  // ----------------------------------------
  // CHECK COMPLETION
  // ----------------------------------------

  const allSatisfied = villagers.every(v => v.satisfied);

  // ----------------------------------------
  // STYLES
  // ----------------------------------------

  const containerStyle: React.CSSProperties = {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: COLORS.bg,
    borderRadius: 16,
    padding: '20px',
    maxWidth: 640,
    margin: '0 auto',
    border: `3px solid ${COLORS.green}`,
    boxShadow: `0 4px 24px rgba(0,0,0,0.5), inset 0 0 40px rgba(46,125,50,0.05)`,
    color: COLORS.text,
    position: 'relative',
    overflow: 'hidden',
    transition: 'opacity 0.3s ease',
    opacity: fadeIn ? 1 : 0,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
    fontWeight: 'bold',
    color: COLORS.gold,
    textAlign: 'center',
    margin: '0 0 4px 0',
    textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
    color: COLORS.textDim,
    textAlign: 'center',
    marginBottom: 16,
  };

  const btnPrimary: React.CSSProperties = {
    background: `linear-gradient(135deg, ${COLORS.green}, #1B5E20)`,
    color: '#FFFFFF',
    border: `2px solid ${COLORS.accent}`,
    borderRadius: 12,
    padding: '12px 32px',
    fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'inherit',
    boxShadow: '0 4px 12px rgba(46,125,50,0.4)',
    transition: 'transform 0.15s ease',
  };

  const btnSecondary: React.CSSProperties = {
    ...btnPrimary,
    background: `linear-gradient(135deg, ${COLORS.gold}, #B8860B)`,
    border: '2px solid #FFD700',
    boxShadow: '0 4px 12px rgba(212,160,23,0.4)',
  };

  const cardStyle = (isSelected: boolean, isSatisfied: boolean): React.CSSProperties => ({
    background: isSatisfied ? 'rgba(46,125,50,0.25)' : isSelected ? COLORS.highlight : COLORS.cardBg,
    border: `2px solid ${isSatisfied ? COLORS.accent : isSelected ? COLORS.gold : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 12,
    padding: 'clamp(10px, 2.5vw, 16px)',
    cursor: isSatisfied ? 'default' : 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isSelected ? `0 0 16px rgba(212,160,23,0.3)` : '0 2px 8px rgba(0,0,0,0.3)',
    position: 'relative',
    minWidth: 0,
  });

  const progressDotStyle = (active: boolean, completed: boolean): React.CSSProperties => ({
    width: 'clamp(8px, 2vw, 12px)',
    height: 'clamp(8px, 2vw, 12px)',
    borderRadius: '50%',
    background: completed ? COLORS.accent : active ? COLORS.gold : 'rgba(255,255,255,0.2)',
    border: `2px solid ${completed ? COLORS.accent : active ? COLORS.gold : 'rgba(255,255,255,0.15)'}`,
    transition: 'all 0.3s ease',
  });

  const messageStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 1.5,
    background: messageType === 'success' ? 'rgba(46,125,50,0.2)' :
      messageType === 'error' ? 'rgba(198,40,40,0.2)' : 'rgba(255,255,255,0.07)',
    border: `1px solid ${messageType === 'success' ? COLORS.accent :
      messageType === 'error' ? COLORS.error : 'rgba(255,255,255,0.1)'}`,
    color: messageType === 'success' ? '#81C784' :
      messageType === 'error' ? '#EF9A9A' : COLORS.text,
  };

  // ----------------------------------------
  // PROGRESS BAR
  // ----------------------------------------

  const phases: GamePhase[] = ['intro', 'barter', 'commodity', 'coins', 'complete'];
  const currentIndex = phases.indexOf(phase);

  const renderProgress = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(4px, 1vw, 8px)', marginBottom: 16 }}>
      {phases.map((p, i) => (
        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2px, 0.5vw, 4px)' }}>
          <div style={progressDotStyle(i === currentIndex, i < currentIndex)} />
          <span style={{
            fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
            color: i === currentIndex ? COLORS.gold : i < currentIndex ? COLORS.accent : COLORS.textDim,
            fontWeight: i === currentIndex ? 'bold' : 'normal',
          }}>
            {PHASE_LABELS[p]}
          </span>
          {i < phases.length - 1 && (
            <div style={{
              width: 'clamp(8px, 2vw, 20px)',
              height: 2,
              background: i < currentIndex ? COLORS.accent : 'rgba(255,255,255,0.15)',
            }} />
          )}
        </div>
      ))}
    </div>
  );

  // ----------------------------------------
  // VILLAGER CARD
  // ----------------------------------------

  const renderVillagerCard = (v: Villager, onClick: (id: number) => void, extraInfo?: React.ReactNode) => (
    <div
      key={v.id}
      onClick={() => onClick(v.id)}
      style={cardStyle(selectedVillager === v.id, v.satisfied)}
      onMouseEnter={(e) => { if (!v.satisfied) e.currentTarget.style.transform = 'scale(1.05)'; }}
      onMouseLeave={(e) => { if (selectedVillager !== v.id) e.currentTarget.style.transform = 'scale(1)'; }}
    >
      <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', marginBottom: 4 }}>{v.emoji}</div>
      <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', fontWeight: 'bold', color: COLORS.textBright, marginBottom: 6 }}>
        {v.name}
      </div>
      {!v.satisfied ? (
        <>
          <div style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.8rem)', color: COLORS.textDim, marginBottom: 2 }}>
            Has: <span style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)' }}>{v.hasEmoji}</span> {v.has}
          </div>
          <div style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.8rem)', color: COLORS.gold, marginBottom: 2 }}>
            Wants: <span style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)' }}>{v.wantsEmoji}</span> {v.wants}
          </div>
        </>
      ) : (
        <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', color: COLORS.accent, fontWeight: 'bold' }}>
          {'\u2714'} Satisfied!
        </div>
      )}
      {extraInfo}
    </div>
  );

  // ----------------------------------------
  // RENDER: INTRO
  // ----------------------------------------

  if (phase === 'intro') {
    return (
      <div style={containerStyle}>
        {renderProgress()}
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: 8 }}>
            {'\uD83C\uDFE0'}{'\uD83D\uDC14'}{'\uD83C\uDF3E'}{'\uD83E\uDE99'}
          </div>
          <h2 style={titleStyle}>Barter Town Builder</h2>
          <p style={{ ...subtitleStyle, maxWidth: 460, margin: '0 auto 16px' }}>
            Travel through time and discover how trade evolved!
            Start with simple barter, discover shell money, and
            invent gold coins.
          </p>
          <div style={{
            background: COLORS.cardBg,
            borderRadius: 12,
            padding: '14px 18px',
            marginBottom: 20,
            textAlign: 'left',
            fontSize: 'clamp(0.75rem, 2vw, 0.88rem)',
            lineHeight: 1.7,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ color: COLORS.gold, fontWeight: 'bold', marginBottom: 6 }}>How It Works:</div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ color: COLORS.accent }}>1.</span> <strong>Barter Era</strong> - Trade items directly. But what if nobody wants what you have?
            </div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ color: COLORS.accent }}>2.</span> <strong>Shell Money</strong> - Everyone accepts cowrie shells {'\uD83D\uDC1A'} as payment.
            </div>
            <div>
              <span style={{ color: COLORS.accent }}>3.</span> <strong>Gold Coins</strong> - Standard prices make trade lightning fast! {'\uD83E\uDE99'}
            </div>
          </div>
          <button
            onClick={startGame}
            style={btnPrimary}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Start Trading!
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // RENDER: BARTER PHASE
  // ----------------------------------------

  if (phase === 'barter') {
    return (
      <div style={containerStyle}>
        {renderProgress()}
        <h2 style={titleStyle}>{'\uD83D\uDC14'} Barter Era</h2>
        <p style={subtitleStyle}>
          Select a villager's item, then click who to trade with. Watch out for the "double coincidence of wants" problem!
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          padding: '6px 10px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 8,
        }}>
          <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.textDim }}>
            {'\u{23F3}'} Days elapsed: <strong style={{ color: COLORS.gold }}>{dayCount}</strong>
          </span>
          <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.textDim }}>
            Trades: <strong style={{ color: COLORS.accent }}>{tradeLog.length}</strong>
          </span>
        </div>

        {message && <div style={messageStyle}>{message}</div>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(8px, 2vw, 12px)',
          marginBottom: 16,
        }}>
          {villagers.map(v => renderVillagerCard(v, handleBarterClick))}
        </div>

        {tradeLog.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 8,
            padding: '8px 12px',
            marginBottom: 12,
            maxHeight: 100,
            overflowY: 'auto',
          }}>
            <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.75rem)', color: COLORS.textDim, marginBottom: 4 }}>Trade Log:</div>
            {tradeLog.map((t, i) => (
              <div key={i} style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', color: COLORS.text, marginBottom: 2 }}>
                {t.from} {'\u2192'} {t.to}: {t.item}
              </div>
            ))}
          </div>
        )}

        {allSatisfied && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={startCommodityPhase}
              style={btnSecondary}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Next: Discover Shell Money {'\uD83D\uDC1A'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------
  // RENDER: COMMODITY MONEY PHASE
  // ----------------------------------------

  if (phase === 'commodity') {
    return (
      <div style={containerStyle}>
        {renderProgress()}
        <h2 style={titleStyle}>{'\uD83D\uDC1A'} Shell Money Era</h2>
        <p style={subtitleStyle}>
          {commodityStep === 'sell'
            ? 'Everyone sells their goods for cowrie shells at the market!'
            : 'Now everyone buys what they want with their shells!'}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          padding: '6px 10px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 8,
        }}>
          <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.textDim }}>
            {'\u{23F3}'} Days: <strong style={{ color: COLORS.gold }}>{dayCount}</strong>
          </span>
          <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.shell, fontWeight: 'bold' }}>
            Phase: {commodityStep === 'sell' ? 'Selling' : 'Buying'}
          </span>
          <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.textDim }}>
            Barter took: <strong style={{ color: COLORS.error }}>{barterDays} days</strong>
          </span>
        </div>

        {message && <div style={messageStyle}>{message}</div>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(8px, 2vw, 12px)',
          marginBottom: 16,
        }}>
          {villagers.map(v => renderVillagerCard(v, handleCommodityClick,
            <div style={{
              marginTop: 6,
              fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
              color: COLORS.shell,
              fontWeight: 'bold',
            }}>
              {'\uD83D\uDC1A'} {shells[v.id] || 0} shells
            </div>
          ))}
        </div>

        {tradeLog.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 8,
            padding: '8px 12px',
            marginBottom: 12,
            maxHeight: 100,
            overflowY: 'auto',
          }}>
            <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.75rem)', color: COLORS.textDim, marginBottom: 4 }}>Trade Log:</div>
            {tradeLog.map((t, i) => (
              <div key={i} style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', color: COLORS.text, marginBottom: 2 }}>
                {t.from} {'\u2192'} {t.to}: {t.item}
              </div>
            ))}
          </div>
        )}

        {allSatisfied && commodityStep === 'buy' && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={startCoinsPhase}
              style={btnSecondary}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Next: Invent Gold Coins {'\uD83E\uDE99'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------
  // RENDER: COINS PHASE
  // ----------------------------------------

  if (phase === 'coins') {
    return (
      <div style={containerStyle}>
        {renderProgress()}
        <h2 style={titleStyle}>{'\uD83E\uDE99'} Gold Coins Era</h2>
        <p style={subtitleStyle}>
          {coinsStep === 'sell'
            ? 'Items now have set prices! Sell your goods at market value.'
            : 'Buy what you want at the listed price!'}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
          padding: '6px 10px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 8,
          flexWrap: 'wrap',
          gap: 4,
        }}>
          <span style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)', color: COLORS.textDim }}>
            {'\u{23F3}'} Days: <strong style={{ color: COLORS.gold }}>{dayCount}</strong>
          </span>
          <span style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)', color: COLORS.gold, fontWeight: 'bold' }}>
            Phase: {coinsStep === 'sell' ? 'Selling' : 'Buying'}
          </span>
          <span style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)', color: COLORS.textDim }}>
            Barter: <strong style={{ color: COLORS.error }}>{barterDays}d</strong> | Shells: <strong style={{ color: COLORS.shell }}>{commodityDays}d</strong>
          </span>
        </div>

        {/* Price list */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(6px, 1.5vw, 12px)',
          marginBottom: 10,
          flexWrap: 'wrap',
        }}>
          {ITEMS.map(item => (
            <div key={item.name} style={{
              background: 'rgba(212,160,23,0.12)',
              border: '1px solid rgba(212,160,23,0.3)',
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
              color: COLORS.gold,
            }}>
              {item.emoji} = {'\uD83E\uDE99'}{COIN_PRICES[item.name]}
            </div>
          ))}
        </div>

        {message && <div style={messageStyle}>{message}</div>}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(8px, 2vw, 12px)',
          marginBottom: 16,
        }}>
          {villagers.map(v => renderVillagerCard(v, handleCoinsClick,
            <div style={{
              marginTop: 6,
              fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
              color: COLORS.gold,
              fontWeight: 'bold',
            }}>
              {'\uD83E\uDE99'} {wallets[v.id] || 0} coins
            </div>
          ))}
        </div>

        {tradeLog.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 8,
            padding: '8px 12px',
            marginBottom: 12,
            maxHeight: 100,
            overflowY: 'auto',
          }}>
            <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.75rem)', color: COLORS.textDim, marginBottom: 4 }}>Trade Log:</div>
            {tradeLog.map((t, i) => (
              <div key={i} style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', color: COLORS.text, marginBottom: 2 }}>
                {t.from} {'\u2192'} {t.to}: {t.item}
              </div>
            ))}
          </div>
        )}

        {allSatisfied && coinsStep === 'buy' && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={finishGame}
              style={btnPrimary}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              See Results! {'\uD83C\uDFC6'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------
  // RENDER: COMPLETE
  // ----------------------------------------

  if (phase === 'complete') {
    const finalCoinDays = coinDays || dayCount;
    const barData = [
      { label: 'Barter', days: barterDays, color: COLORS.error, emoji: '\uD83D\uDC14' },
      { label: 'Shell Money', days: commodityDays, color: COLORS.shell, emoji: '\uD83D\uDC1A' },
      { label: 'Gold Coins', days: finalCoinDays, color: COLORS.gold, emoji: '\uD83E\uDE99' },
    ];
    const maxDays = Math.max(...barData.map(b => b.days), 1);

    return (
      <div style={containerStyle}>
        {renderProgress()}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: 4 }}>
            {'\uD83C\uDF89'}{'\uD83C\uDFC6'}{'\uD83C\uDF89'}
          </div>
          <h2 style={titleStyle}>Trade Revolution Complete!</h2>
          <p style={subtitleStyle}>
            See how money made trade faster and easier over time!
          </p>
        </div>

        {/* Bar chart comparison */}
        <div style={{
          background: COLORS.cardBg,
          borderRadius: 12,
          padding: 'clamp(12px, 3vw, 20px)',
          marginBottom: 16,
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            fontWeight: 'bold',
            color: COLORS.textBright,
            marginBottom: 14,
            textAlign: 'center',
          }}>
            Days to Complete All Trades
          </div>
          {barData.map((bar, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
                fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
              }}>
                <span style={{ color: COLORS.text }}>{bar.emoji} {bar.label}</span>
                <span style={{ color: bar.color, fontWeight: 'bold' }}>{bar.days} days</span>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 6,
                height: 'clamp(18px, 3vw, 24px)',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${Math.max((bar.days / maxDays) * 100, 8)}%`,
                  height: '100%',
                  background: bar.color,
                  borderRadius: 6,
                  transition: 'width 1s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Educational takeaway */}
        <div style={{
          background: 'rgba(46,125,50,0.15)',
          border: `1px solid ${COLORS.accent}`,
          borderRadius: 12,
          padding: '14px 18px',
          marginBottom: 20,
          lineHeight: 1.7,
          fontSize: 'clamp(0.75rem, 2vw, 0.88rem)',
        }}>
          <div style={{ color: COLORS.accent, fontWeight: 'bold', marginBottom: 6 }}>
            {'\uD83D\uDCA1'} What You Learned:
          </div>
          <div style={{ marginBottom: 4 }}>
            <strong>Barter</strong> is hard because you need a "double coincidence of wants" - both people must want what the other has.
          </div>
          <div style={{ marginBottom: 4 }}>
            <strong>Commodity money</strong> (like shells) solves this by giving everyone something everyone accepts.
          </div>
          <div>
            <strong>Coins with prices</strong> make trade even faster because everyone knows exactly what things cost!
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={resetGame}
            style={btnPrimary}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div style={containerStyle}>
      <p style={{ textAlign: 'center', color: COLORS.textDim }}>Loading...</p>
    </div>
  );
}
