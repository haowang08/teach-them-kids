import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'barter' | 'commodity' | 'coins' | 'complete';
type CommodityStep = 'sell' | 'shortage' | 'jobs' | 'buy';
type CoinsStep = 'distribute' | 'sell' | 'buy' | 'inflation' | 'help' | 'buy2';

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

interface Job {
  id: number;
  name: string;
  emoji: string;
  pay: number;
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
  purple: '#7B1FA2',
};

const ITEMS = [
  { name: 'Chicken', emoji: '\uD83D\uDC14' },
  { name: 'Wheat', emoji: '\uD83C\uDF3E' },
  { name: 'Pottery', emoji: '\uD83C\uDFFA' },
  { name: 'Cloth', emoji: '\uD83E\uDDF5' },
];

// Shell money: variable sell/buy prices create shortage problem
const SHELL_SELL: Record<string, number> = { Chicken: 3, Wheat: 2, Pottery: 6, Cloth: 4 };
const SHELL_BUY: Record<string, number> = { Chicken: 4, Wheat: 3, Pottery: 7, Cloth: 5 };

// Market jobs to earn extra shells
const JOBS: Job[] = [
  { id: 0, name: 'Carry goods at dock', emoji: '\u2693', pay: 2 },
  { id: 1, name: 'Sort spices at market', emoji: '\uD83C\uDF36\uFE0F', pay: 2 },
  { id: 2, name: 'Weave baskets to sell', emoji: '\uD83E\uDDFA', pay: 3 },
  { id: 3, name: 'Catch fish at river', emoji: '\uD83D\uDC1F', pay: 2 },
  { id: 4, name: 'Carry water jugs', emoji: '\uD83D\uDCA7', pay: 1 },
];

// Gold coins: unequal distribution + inflation
const COIN_SELL: Record<string, number> = { Chicken: 3, Wheat: 2, Pottery: 5, Cloth: 4 };
const COIN_BUY_BASE: Record<string, number> = { Chicken: 5, Wheat: 3, Pottery: 8, Cloth: 6 };
const KING_COINS: Record<number, number> = { 0: 2, 1: 7, 2: 3, 3: 1 };
const KING_TITLES: Record<number, string> = { 0: 'Farmer', 1: 'Merchant', 2: 'Weaver', 3: 'Shepherd' };

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

  // Commodity money phase - expanded
  const [shells, setShells] = useState<Record<number, number>>({});
  const [commodityStep, setCommodityStep] = useState<CommodityStep>('sell');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [jobsTaken, setJobsTaken] = useState<Record<number, number>>({}); // jobId -> villagerId

  // Coins phase - expanded
  const [wallets, setWallets] = useState<Record<number, number>>({});
  const [coinsStep, setCoinsStep] = useState<CoinsStep>('distribute');
  const [coinBuyPrices, setCoinBuyPrices] = useState<Record<string, number>>({ ...COIN_BUY_BASE });
  const [coinsBuyAttempted, setCoinsBuyAttempted] = useState<Record<number, boolean>>({});
  const [selectedGiver, setSelectedGiver] = useState<number | null>(null);

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
    setSelectedJob(null);
    setJobsTaken({});
    setMessage('Everyone sells their goods for cowrie shells \uD83D\uDC1A! Items have different values - click a villager to sell.');
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
    setCoinsStep('distribute');
    setCoinBuyPrices({ ...COIN_BUY_BASE });
    setCoinsBuyAttempted({});
    setSelectedGiver(null);
    setMessage('The king is distributing gold coins to the village... but not equally!');
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
    setMessageType('info');
    setShells({});
    setWallets({});
    setCommodityStep('sell');
    setCoinsStep('distribute');
    setSelectedJob(null);
    setJobsTaken({});
    setCoinBuyPrices({ ...COIN_BUY_BASE });
    setCoinsBuyAttempted({});
    setSelectedGiver(null);
    setFadeIn(true);
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
  // COMMODITY MONEY LOGIC (upgraded)
  // ----------------------------------------

  const handleCommodityClick = useCallback((clickedId: number) => {
    const v = villagers[clickedId];

    if (commodityStep === 'sell') {
      if (v.satisfied) {
        setMessage(`${v.name} already sold their item!`);
        setMessageType('info');
        return;
      }
      setDayCount(prev => prev + 1);
      const shellValue = SHELL_SELL[v.has];
      const newShells = { ...shells, [clickedId]: (shells[clickedId] || 0) + shellValue };
      setShells(newShells);

      const newVillagers = [...villagers];
      newVillagers[clickedId] = { ...v, satisfied: true };
      setVillagers(newVillagers);

      setTradeLog(prev => [...prev, {
        from: v.name,
        to: 'Market',
        item: `${v.hasEmoji} -> \uD83D\uDC1A x${shellValue}`,
      }]);
      setMessage(`${v.name} sold ${v.hasEmoji} ${v.has} for \uD83D\uDC1A ${shellValue} shells! (Day ${dayCount + 1})`);
      setMessageType('success');

      const allSold = newVillagers.every(vl => vl.satisfied);
      if (allSold) {
        // Check for shortages before buying
        const hasShortages = newVillagers.some((vl, i) => {
          const buyPrice = SHELL_BUY[vl.wants];
          return (newShells[i] || 0) < buyPrice;
        });
        setVillagers(newVillagers.map(vl => ({ ...vl, satisfied: false })));
        if (hasShortages) {
          setCommodityStep('shortage');
          setMessage('Uh oh! Some villagers don\'t have enough shells. Different items have different prices!');
          setMessageType('error');
        } else {
          setCommodityStep('buy');
          setMessage('Everyone has enough shells! Click each villager to buy what they want.');
          setMessageType('info');
        }
      }
    } else if (commodityStep === 'buy') {
      if (v.satisfied) {
        setMessage(`${v.name} already bought what they wanted!`);
        setMessageType('info');
        return;
      }
      const shellCost = SHELL_BUY[v.wants];
      if ((shells[clickedId] || 0) < shellCost) {
        setMessage(`${v.name} needs \uD83D\uDC1A ${shellCost} but only has \uD83D\uDC1A ${shells[clickedId] || 0}!`);
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
        setMessage(`All trades complete in ${dayCount + 1} days! Shell money works, but some had to work extra jobs to afford things.`);
        setMessageType('success');
      }
    }
  }, [villagers, shells, commodityStep, dayCount]);

  // Assign a job to a villager with a shortage
  const handleJobAssign = useCallback((jobId: number, villagerId: number) => {
    const newJobsTaken = { ...jobsTaken, [jobId]: villagerId };
    setJobsTaken(newJobsTaken);

    const job = JOBS[jobId];
    const v = villagers[villagerId];
    setSelectedJob(null);
    setMessage(`${v.name} will "${job.name.toLowerCase()}" for \uD83D\uDC1A ${job.pay} shells!`);
    setMessageType('success');

    // Calculate total job earnings per villager
    const jobEarnings: Record<number, number> = {};
    for (const [jId, vId] of Object.entries(newJobsTaken)) {
      const j = JOBS[Number(jId)];
      jobEarnings[vId] = (jobEarnings[vId] || 0) + j.pay;
    }

    // Check if all shortages now covered
    const allCovered = villagers.every((vl, i) => {
      const buyPrice = SHELL_BUY[vl.wants];
      const totalShells = (shells[i] || 0) + (jobEarnings[i] || 0);
      return totalShells >= buyPrice;
    });

    if (allCovered) {
      // Apply all job earnings
      const newShells = { ...shells };
      for (const [vId, earnings] of Object.entries(jobEarnings)) {
        newShells[Number(vId)] = (newShells[Number(vId)] || 0) + earnings;
      }
      setShells(newShells);
      setDayCount(prev => prev + Object.keys(newJobsTaken).length);
      setCommodityStep('buy');
      setTimeout(() => {
        setMessage('Jobs complete! Everyone earned enough shells. Now click each villager to buy!');
        setMessageType('success');
      }, 600);
    }
  }, [jobsTaken, villagers, shells]);

  // ----------------------------------------
  // COINS LOGIC (upgraded: inequality + inflation)
  // ----------------------------------------

  const handleCoinsDistribute = useCallback(() => {
    const newWallets: Record<number, number> = {};
    villagers.forEach((_, i) => { newWallets[i] = KING_COINS[i]; });
    setWallets(newWallets);
    setCoinsStep('sell');
    setMessage('Coins distributed! Notice the unequal amounts. Click each villager to sell their goods.');
    setMessageType('info');
  }, [villagers]);

  const handleCoinsClick = useCallback((clickedId: number) => {
    const v = villagers[clickedId];

    if (coinsStep === 'sell') {
      if (v.satisfied) {
        setMessage(`${v.name} already sold their item!`);
        setMessageType('info');
        return;
      }
      setDayCount(prev => prev + 1);
      const coinValue = COIN_SELL[v.has];
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
      setMessage(`${v.name} sold ${v.hasEmoji} ${v.has} for \uD83E\uDE99 ${coinValue} coins! (Day ${dayCount + 1})`);
      setMessageType('success');

      const allSold = newVillagers.every(vl => vl.satisfied);
      if (allSold) {
        setCoinsStep('buy');
        setMessage('Everyone sold! Now try buying - click each villager. Can everyone afford what they want?');
        setMessageType('info');
        setVillagers(newVillagers.map(vl => ({ ...vl, satisfied: false })));
        setCoinsBuyAttempted({});
      }
    } else if (coinsStep === 'buy') {
      if (v.satisfied || coinsBuyAttempted[clickedId]) {
        setMessage(`${v.name} already ${v.satisfied ? 'bought' : 'tried'}!`);
        setMessageType('info');
        return;
      }
      const coinCost = coinBuyPrices[v.wants];
      const has = wallets[clickedId] || 0;
      const newAttempted = { ...coinsBuyAttempted, [clickedId]: true };
      setCoinsBuyAttempted(newAttempted);

      if (has >= coinCost) {
        setDayCount(prev => prev + 1);
        const newWallets = { ...wallets, [clickedId]: has - coinCost };
        setWallets(newWallets);
        const newVillagers = [...villagers];
        newVillagers[clickedId] = { ...v, satisfied: true };
        setVillagers(newVillagers);
        setTradeLog(prev => [...prev, {
          from: 'Market',
          to: v.name,
          item: `\uD83E\uDE99 x${coinCost} -> ${v.wantsEmoji}`,
        }]);
        setMessage(`${v.name} bought ${v.wantsEmoji} ${v.wants} for \uD83E\uDE99 ${coinCost}!`);
        setMessageType('success');
      } else {
        setMessage(`${v.name} can't afford ${v.wantsEmoji} ${v.wants}! Has \uD83E\uDE99 ${has} but costs \uD83E\uDE99 ${coinCost}. The king gave ${KING_TITLES[clickedId]}s fewer coins...`);
        setMessageType('error');
      }
    } else if (coinsStep === 'buy2') {
      if (v.satisfied) {
        setMessage(`${v.name} already bought what they wanted!`);
        setMessageType('info');
        return;
      }
      const coinCost = coinBuyPrices[v.wants];
      const has = wallets[clickedId] || 0;
      if (has < coinCost) {
        setMessage(`${v.name} still needs \uD83E\uDE99 ${coinCost - has} more coins!`);
        setMessageType('error');
        return;
      }
      setDayCount(prev => prev + 1);
      const newWallets = { ...wallets, [clickedId]: has - coinCost };
      setWallets(newWallets);
      const newVillagers = [...villagers];
      newVillagers[clickedId] = { ...v, satisfied: true };
      setVillagers(newVillagers);
      setTradeLog(prev => [...prev, {
        from: 'Market',
        to: v.name,
        item: `\uD83E\uDE99 x${coinCost} -> ${v.wantsEmoji} (inflated)`,
      }]);
      setMessage(`${v.name} bought ${v.wantsEmoji} ${v.wants} for \uD83E\uDE99 ${coinCost} (inflated price)!`);
      setMessageType('success');

      const allDone = newVillagers.every(vl => vl.satisfied);
      if (allDone) {
        setMessage(`All trades complete in ${dayCount + 1} days! But inequality and inflation made it much harder for some.`);
        setMessageType('success');
      }
    }
  }, [villagers, wallets, coinsStep, coinsBuyAttempted, coinBuyPrices, dayCount]);

  // Inflation: double all wallets and prices
  const handleInflation = useCallback(() => {
    const newWallets: Record<number, number> = {};
    for (const [id, amt] of Object.entries(wallets)) {
      newWallets[Number(id)] = amt * 2;
    }
    setWallets(newWallets);
    const newPrices: Record<string, number> = {};
    for (const [item, price] of Object.entries(coinBuyPrices)) {
      newPrices[item] = price * 2;
    }
    setCoinBuyPrices(newPrices);
    setCoinsStep('help');
    setMessage('Prices doubled! Now the rich must help the poor. Click a rich villager, then a poor one to share coins.');
    setMessageType('info');
    setSelectedGiver(null);
  }, [wallets, coinBuyPrices]);

  // Help: rich villager shares with poor villager
  const handleHelpClick = useCallback((clickedId: number) => {
    const v = villagers[clickedId];
    const has = wallets[clickedId] || 0;
    const cost = coinBuyPrices[v.wants];
    const isRich = v.satisfied && has > 0;
    const isPoor = !v.satisfied && has < cost;

    if (selectedGiver === null) {
      // Select a giver (rich/satisfied villager with surplus)
      if (!isRich) {
        setMessage(`${v.name} ${v.satisfied ? 'has no coins to share' : 'needs help, not a giver'}! Click a rich villager first.`);
        setMessageType('error');
        return;
      }
      setSelectedGiver(clickedId);
      setMessage(`${v.name} (\uD83E\uDE99 ${has}) will share. Now click a villager who needs help.`);
      setMessageType('info');
    } else if (selectedGiver === clickedId) {
      setSelectedGiver(null);
      setMessage('Cancelled. Click a rich villager to share coins.');
      setMessageType('info');
    } else {
      // Assign receiver
      if (!isPoor) {
        setMessage(`${v.name} doesn't need help! Click someone who can't afford their item.`);
        setMessageType('error');
        setSelectedGiver(null);
        return;
      }
      const deficit = cost - has;
      const giverHas = wallets[selectedGiver] || 0;
      const transfer = Math.min(giverHas, deficit);
      const giver = villagers[selectedGiver];

      const newWallets = {
        ...wallets,
        [selectedGiver]: giverHas - transfer,
        [clickedId]: has + transfer,
      };
      setWallets(newWallets);
      setSelectedGiver(null);
      setMessage(`${giver.name} shared \uD83E\uDE99 ${transfer} with ${v.name}! ${has + transfer >= cost ? `${v.name} can now afford ${v.wantsEmoji}!` : `${v.name} still needs \uD83E\uDE99 ${cost - (has + transfer)} more.`}`);
      setMessageType('success');

      // Check if all poor villagers can now afford
      const allCanBuy = villagers.every((vl, i) => {
        if (vl.satisfied) return true;
        return (newWallets[i] || 0) >= coinBuyPrices[vl.wants];
      });
      if (allCanBuy) {
        setCoinsStep('buy2');
        setTimeout(() => {
          setMessage('Everyone can afford what they need now! Click the remaining villagers to buy.');
          setMessageType('success');
        }, 800);
      }
    }
  }, [villagers, wallets, coinBuyPrices, selectedGiver]);

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
    const stepLabel = commodityStep === 'sell' ? 'Selling' : commodityStep === 'shortage' ? 'Problem!' : commodityStep === 'jobs' ? 'Market Jobs' : 'Buying';
    const stepDesc = commodityStep === 'sell'
      ? 'Click each villager to sell their goods. Items have different values!'
      : commodityStep === 'shortage'
        ? 'Some villagers can\'t afford what they want!'
        : commodityStep === 'jobs'
          ? 'Assign market jobs to villagers who need more shells.'
          : 'Everyone can afford their items now. Click to buy!';

    // Calculate job earnings per villager (for display during jobs step)
    const jobEarnings: Record<number, number> = {};
    for (const [jId, vId] of Object.entries(jobsTaken)) {
      const j = JOBS[Number(jId)];
      jobEarnings[vId] = (jobEarnings[vId] || 0) + j.pay;
    }

    return (
      <div style={containerStyle}>
        {renderProgress()}
        <h2 style={titleStyle}>{'\uD83D\uDC1A'} Shell Money Era</h2>
        <p style={subtitleStyle}>{stepDesc}</p>

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
            {stepLabel}
          </span>
          <span style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.textDim }}>
            Barter took: <strong style={{ color: COLORS.error }}>{barterDays} days</strong>
          </span>
        </div>

        {/* Sell/Buy price reference */}
        {(commodityStep === 'sell' || commodityStep === 'buy') && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(4px, 1vw, 8px)',
            marginBottom: 10,
            flexWrap: 'wrap',
          }}>
            {ITEMS.map(item => (
              <div key={item.name} style={{
                background: 'rgba(141,110,99,0.15)',
                border: '1px solid rgba(141,110,99,0.3)',
                borderRadius: 8,
                padding: '3px 8px',
                fontSize: 'clamp(0.55rem, 1.4vw, 0.7rem)',
                color: COLORS.shell,
              }}>
                {item.emoji} {commodityStep === 'sell' ? `sell ${SHELL_SELL[item.name]}` : `buy ${SHELL_BUY[item.name]}`}
              </div>
            ))}
          </div>
        )}

        {message && <div style={messageStyle}>{message}</div>}

        {/* SELL & BUY steps: villager grid */}
        {(commodityStep === 'sell' || commodityStep === 'buy') && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(8px, 2vw, 12px)',
            marginBottom: 16,
          }}>
            {villagers.map(v => renderVillagerCard(v, handleCommodityClick,
              <div style={{ marginTop: 6, fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.shell, fontWeight: 'bold' }}>
                {'\uD83D\uDC1A'} {shells[v.id] || 0} shells
                {commodityStep === 'buy' && !v.satisfied && (
                  <span style={{ fontSize: 'clamp(0.55rem, 1.4vw, 0.65rem)', color: COLORS.textDim, fontWeight: 'normal' }}>
                    {' '}(need {SHELL_BUY[v.wants]})
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SHORTAGE step: show who can't afford what */}
        {commodityStep === 'shortage' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'clamp(8px, 2vw, 12px)',
              marginBottom: 14,
            }}>
              {villagers.map(v => {
                const has = shells[v.id] || 0;
                const needs = SHELL_BUY[v.wants];
                const short = Math.max(0, needs - has);
                return (
                  <div key={v.id} style={{
                    ...cardStyle(false, short === 0),
                    cursor: 'default',
                  }}>
                    <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: 4 }}>{v.emoji}</div>
                    <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', fontWeight: 'bold', color: COLORS.textBright, marginBottom: 4 }}>{v.name}</div>
                    <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.shell }}>
                      Has: {'\uD83D\uDC1A'} {has} shells
                    </div>
                    <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.gold }}>
                      Wants: {v.wantsEmoji} {v.wants} = {'\uD83D\uDC1A'} {needs}
                    </div>
                    {short > 0 ? (
                      <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.error, fontWeight: 'bold', marginTop: 4 }}>
                        Short {'\uD83D\uDC1A'} {short}!
                      </div>
                    ) : (
                      <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.accent, fontWeight: 'bold', marginTop: 4 }}>
                        {'\u2714'} Can afford!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => {
                  setCommodityStep('jobs');
                  setMessage('Assign jobs to villagers who are short on shells. Click a job, then click a villager to assign it.');
                  setMessageType('info');
                }}
                style={btnSecondary}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Assign Market Jobs {'\uD83D\uDCBC'}
              </button>
            </div>
          </div>
        )}

        {/* JOBS step: assign jobs to villagers */}
        {commodityStep === 'jobs' && (
          <div style={{ marginBottom: 16 }}>
            {/* Available jobs */}
            <div style={{
              background: 'rgba(141,110,99,0.1)',
              border: '1px solid rgba(141,110,99,0.3)',
              borderRadius: 12,
              padding: '10px 14px',
              marginBottom: 12,
            }}>
              <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.88rem)', fontWeight: 'bold', color: COLORS.shell, marginBottom: 8 }}>
                Available Jobs:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {JOBS.map(job => {
                  const taken = jobsTaken[job.id] !== undefined;
                  const isSelected = selectedJob === job.id;
                  return (
                    <button
                      key={job.id}
                      disabled={taken}
                      onClick={() => setSelectedJob(isSelected ? null : job.id)}
                      style={{
                        background: taken ? 'rgba(255,255,255,0.05)' : isSelected ? 'rgba(212,160,23,0.3)' : 'rgba(255,255,255,0.1)',
                        border: `2px solid ${taken ? 'rgba(255,255,255,0.1)' : isSelected ? COLORS.gold : 'rgba(255,255,255,0.2)'}`,
                        borderRadius: 10,
                        padding: '8px 12px',
                        cursor: taken ? 'default' : 'pointer',
                        opacity: taken ? 0.4 : 1,
                        fontFamily: 'inherit',
                        color: COLORS.text,
                        fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}>{job.emoji}</span>{' '}
                      {job.name} <span style={{ color: COLORS.shell, fontWeight: 'bold' }}>({'\uD83D\uDC1A'}{job.pay})</span>
                      {taken && <span style={{ color: COLORS.textDim }}> - {villagers[jobsTaken[job.id]].name}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Villagers who need jobs */}
            {selectedJob !== null && (
              <div style={{
                background: 'rgba(212,160,23,0.08)',
                border: `1px solid ${COLORS.gold}`,
                borderRadius: 12,
                padding: '10px 14px',
                marginBottom: 12,
              }}>
                <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.gold, marginBottom: 8 }}>
                  Assign "{JOBS[selectedJob].name}" to:
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {villagers.map(v => {
                    const has = (shells[v.id] || 0) + (jobEarnings[v.id] || 0);
                    const needs = SHELL_BUY[v.wants];
                    const short = Math.max(0, needs - has);
                    if (short === 0) return null;
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleJobAssign(selectedJob, v.id)}
                        style={{
                          background: 'rgba(198,40,40,0.15)',
                          border: '2px solid rgba(198,40,40,0.4)',
                          borderRadius: 10,
                          padding: '8px 14px',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          color: COLORS.text,
                          fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)',
                          transition: 'transform 0.15s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      >
                        {v.emoji} {v.name} <span style={{ color: COLORS.error }}>(short {'\uD83D\uDC1A'}{short})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Summary of current status */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 8,
            }}>
              {villagers.map(v => {
                const baseShells = shells[v.id] || 0;
                const earned = jobEarnings[v.id] || 0;
                const total = baseShells + earned;
                const needs = SHELL_BUY[v.wants];
                const short = Math.max(0, needs - total);
                return (
                  <div key={v.id} style={{
                    background: short > 0 ? 'rgba(198,40,40,0.1)' : 'rgba(46,125,50,0.15)',
                    border: `1px solid ${short > 0 ? 'rgba(198,40,40,0.3)' : COLORS.accent}`,
                    borderRadius: 8,
                    padding: '6px 10px',
                    fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)',
                  }}>
                    <strong>{v.emoji} {v.name}</strong>: {'\uD83D\uDC1A'}{baseShells}{earned > 0 ? ` +${earned} (jobs)` : ''} = {total}
                    <span style={{ color: short > 0 ? COLORS.error : COLORS.accent }}>
                      {' '}/{needs} {short > 0 ? `(need ${short} more)` : '\u2714'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
    const allBuyAttempted = Object.keys(coinsBuyAttempted).length === 4;
    const someFailed = allBuyAttempted && villagers.some(v => !v.satisfied);
    const stepLabel = coinsStep === 'distribute' ? 'Distribution' : coinsStep === 'sell' ? 'Selling' : coinsStep === 'buy' ? 'Buying' : coinsStep === 'inflation' ? 'Inflation!' : coinsStep === 'help' ? 'Sharing' : 'Final Buy';
    const stepDesc = coinsStep === 'distribute'
      ? 'The king gives gold coins to villagers based on their social rank...'
      : coinsStep === 'sell'
        ? 'Click each villager to sell their goods at market prices.'
        : coinsStep === 'buy'
          ? 'Click each villager to try buying what they want.'
          : coinsStep === 'inflation'
            ? 'The king minted too many coins! Prices are soaring!'
            : coinsStep === 'help'
              ? 'Rich villagers must help poor ones. Click a rich villager, then a poor one.'
              : 'The poor villagers can finally buy. Click them to complete their purchase!';

    return (
      <div style={containerStyle}>
        {renderProgress()}
        <h2 style={titleStyle}>{'\uD83E\uDE99'} Gold Coins Era</h2>
        <p style={subtitleStyle}>{stepDesc}</p>

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
            {stepLabel}
          </span>
          <span style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.8rem)', color: COLORS.textDim }}>
            Barter: <strong style={{ color: COLORS.error }}>{barterDays}d</strong> | Shells: <strong style={{ color: COLORS.shell }}>{commodityDays}d</strong>
          </span>
        </div>

        {/* Price list for sell/buy/buy2 steps */}
        {(coinsStep === 'sell' || coinsStep === 'buy' || coinsStep === 'buy2' || coinsStep === 'help') && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(4px, 1vw, 8px)',
            marginBottom: 10,
            flexWrap: 'wrap',
          }}>
            {ITEMS.map(item => (
              <div key={item.name} style={{
                background: 'rgba(212,160,23,0.12)',
                border: '1px solid rgba(212,160,23,0.3)',
                borderRadius: 8,
                padding: '3px 8px',
                fontSize: 'clamp(0.55rem, 1.4vw, 0.7rem)',
                color: COLORS.gold,
              }}>
                {item.emoji} {coinsStep === 'sell' ? `sell ${COIN_SELL[item.name]}` : `buy ${coinBuyPrices[item.name]}`}
              </div>
            ))}
          </div>
        )}

        {message && <div style={messageStyle}>{message}</div>}

        {/* DISTRIBUTE step */}
        {coinsStep === 'distribute' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              background: 'rgba(212,160,23,0.08)',
              border: '1px solid rgba(212,160,23,0.3)',
              borderRadius: 12,
              padding: '14px 18px',
              marginBottom: 14,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', marginBottom: 8 }}>{'\uD83D\uDC51'}</div>
              <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', color: COLORS.gold, fontWeight: 'bold', marginBottom: 10 }}>
                The King Distributes Coins
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 8,
                marginBottom: 12,
              }}>
                {villagers.map(v => (
                  <div key={v.id} style={{
                    background: COLORS.cardBg,
                    borderRadius: 8,
                    padding: '8px 10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)' }}>{v.emoji}</div>
                    <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', fontWeight: 'bold', color: COLORS.textBright }}>{v.name}</div>
                    <div style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', color: COLORS.textDim }}>{KING_TITLES[v.id]}</div>
                    <div style={{
                      fontSize: 'clamp(0.85rem, 2.2vw, 1rem)',
                      color: KING_COINS[v.id] >= 5 ? COLORS.gold : COLORS.error,
                      fontWeight: 'bold',
                      marginTop: 4,
                    }}>
                      {'\uD83E\uDE99'} {KING_COINS[v.id]} coins
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.error, marginBottom: 10 }}>
                Notice: The Merchant gets 7 coins, but the Shepherd only gets 1! Is that fair?
              </div>
              <button
                onClick={handleCoinsDistribute}
                style={btnSecondary}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Collect Coins & Start Trading
              </button>
            </div>
          </div>
        )}

        {/* SELL step */}
        {coinsStep === 'sell' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(8px, 2vw, 12px)',
            marginBottom: 16,
          }}>
            {villagers.map(v => renderVillagerCard(v, handleCoinsClick,
              <div style={{ marginTop: 6, fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.gold, fontWeight: 'bold' }}>
                {'\uD83E\uDE99'} {wallets[v.id] || 0} coins
                <span style={{ fontSize: 'clamp(0.5rem, 1.3vw, 0.62rem)', color: COLORS.textDim, fontWeight: 'normal' }}>
                  {' '}({KING_TITLES[v.id]})
                </span>
              </div>
            ))}
          </div>
        )}

        {/* BUY step */}
        {coinsStep === 'buy' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'clamp(8px, 2vw, 12px)',
              marginBottom: 12,
            }}>
              {villagers.map(v => {
                const has = wallets[v.id] || 0;
                const cost = coinBuyPrices[v.wants];
                const attempted = coinsBuyAttempted[v.id];
                const canAfford = has >= cost;
                return (
                  <div
                    key={v.id}
                    onClick={() => handleCoinsClick(v.id)}
                    style={{
                      ...cardStyle(false, v.satisfied),
                      cursor: (v.satisfied || attempted) ? 'default' : 'pointer',
                      opacity: attempted && !v.satisfied ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => { if (!v.satisfied && !attempted) e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: 4 }}>{v.emoji}</div>
                    <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', fontWeight: 'bold', color: COLORS.textBright, marginBottom: 4 }}>
                      {v.name} <span style={{ fontSize: 'clamp(0.55rem, 1.4vw, 0.65rem)', color: COLORS.textDim, fontWeight: 'normal' }}>({KING_TITLES[v.id]})</span>
                    </div>
                    <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.gold }}>
                      {'\uD83E\uDE99'} {has} coins
                    </div>
                    <div style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', color: COLORS.textDim }}>
                      Wants: {v.wantsEmoji} = {'\uD83E\uDE99'}{cost}
                    </div>
                    {v.satisfied ? (
                      <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.accent, fontWeight: 'bold', marginTop: 4 }}>{'\u2714'} Bought!</div>
                    ) : attempted ? (
                      <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.error, fontWeight: 'bold', marginTop: 4 }}>{'\u2718'} Can't afford!</div>
                    ) : (
                      <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: canAfford ? COLORS.accent : COLORS.error, marginTop: 4 }}>
                        {canAfford ? 'Click to buy' : 'Click to try...'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Inequality lesson + continue */}
            {someFailed && (
              <div style={{
                background: 'rgba(123,31,162,0.15)',
                border: '1px solid rgba(123,31,162,0.4)',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 12,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', color: COLORS.purple, fontWeight: 'bold', marginBottom: 6 }}>
                  {'\uD83D\uDCA1'} Inequality in Action!
                </div>
                <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.text, lineHeight: 1.6, marginBottom: 10 }}>
                  The king gave some people more coins than others. Even though everyone worked hard,
                  {' '}<strong style={{ color: COLORS.error }}>Ama and Yaw can't afford</strong> what they need because they started with fewer coins.
                  This is called <strong style={{ color: COLORS.purple }}>wealth inequality</strong>.
                </div>
                <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.textDim, marginBottom: 10 }}>
                  But wait... things are about to get worse.
                </div>
                <button
                  onClick={() => {
                    setCoinsStep('inflation');
                    setMessage('');
                    setMessageType('info');
                  }}
                  style={{
                    ...btnPrimary,
                    background: `linear-gradient(135deg, ${COLORS.purple}, #4A148C)`,
                    border: '2px solid #CE93D8',
                    boxShadow: '0 4px 12px rgba(123,31,162,0.4)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  What Happens Next? {'\uD83D\uDE28'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* INFLATION step */}
        {coinsStep === 'inflation' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              background: 'rgba(198,40,40,0.1)',
              border: '2px solid rgba(198,40,40,0.4)',
              borderRadius: 12,
              padding: '16px 20px',
              marginBottom: 14,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)', marginBottom: 8 }}>{'\uD83D\uDCB8'}{'\uD83D\uDCB8'}{'\uD83D\uDCB8'}</div>
              <div style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: COLORS.error, fontWeight: 'bold', marginBottom: 10 }}>
                The King Minted Too Many Coins!
              </div>
              <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.88rem)', color: COLORS.text, lineHeight: 1.7, marginBottom: 14 }}>
                The king printed more gold coins to pay for his palace.
                Now there are <strong>twice as many coins</strong> in the village,
                but the same amount of goods. So <strong style={{ color: COLORS.error }}>all prices doubled!</strong>
              </div>

              {/* Before/After comparison */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 8,
                marginBottom: 14,
              }}>
                {villagers.filter(v => !v.satisfied).map(v => {
                  const currentCoins = wallets[v.id] || 0;
                  const currentPrice = coinBuyPrices[v.wants];
                  const newCoins = currentCoins * 2;
                  const newPrice = currentPrice * 2;
                  return (
                    <div key={v.id} style={{
                      background: COLORS.cardBg,
                      borderRadius: 8,
                      padding: '8px 10px',
                      border: '1px solid rgba(198,40,40,0.3)',
                    }}>
                      <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.88rem)', fontWeight: 'bold', color: COLORS.textBright }}>
                        {v.emoji} {v.name}
                      </div>
                      <div style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.72rem)', color: COLORS.textDim, marginTop: 4 }}>
                        Before: {'\uD83E\uDE99'}{currentCoins} / needs {'\uD83E\uDE99'}{currentPrice}
                      </div>
                      <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.error, fontWeight: 'bold' }}>
                        After: {'\uD83E\uDE99'}{newCoins} / needs {'\uD83E\uDE99'}{newPrice}
                      </div>
                      <div style={{ fontSize: 'clamp(0.55rem, 1.4vw, 0.65rem)', color: COLORS.error }}>
                        Still short {'\uD83E\uDE99'}{newPrice - newCoins}!
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.purple, fontWeight: 'bold', marginBottom: 12 }}>
                This is called <strong>inflation</strong> - when money loses its buying power!
              </div>

              <button
                onClick={handleInflation}
                style={btnPrimary}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Can We Help? {'\uD83E\uDD1D'}
              </button>
            </div>
          </div>
        )}

        {/* HELP step */}
        {coinsStep === 'help' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'clamp(8px, 2vw, 12px)',
              marginBottom: 12,
            }}>
              {villagers.map(v => {
                const has = wallets[v.id] || 0;
                const cost = coinBuyPrices[v.wants];
                const isRich = v.satisfied && has > 0;
                const isPoor = !v.satisfied && has < cost;
                const isGiverSelected = selectedGiver === v.id;
                const deficit = isPoor ? cost - has : 0;
                return (
                  <div
                    key={v.id}
                    onClick={() => handleHelpClick(v.id)}
                    style={{
                      background: isGiverSelected ? 'rgba(212,160,23,0.25)' : isRich ? 'rgba(46,125,50,0.15)' : isPoor ? 'rgba(198,40,40,0.15)' : COLORS.cardBg,
                      border: `2px solid ${isGiverSelected ? COLORS.gold : isRich ? COLORS.accent : isPoor ? 'rgba(198,40,40,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 12,
                      padding: 'clamp(8px, 2vw, 14px)',
                      cursor: (isRich || (isPoor && selectedGiver !== null)) ? 'pointer' : 'default',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      transform: isGiverSelected ? 'scale(1.05)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => { if (isRich || (isPoor && selectedGiver !== null)) e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { if (!isGiverSelected) e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: 4 }}>{v.emoji}</div>
                    <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', fontWeight: 'bold', color: COLORS.textBright }}>{v.name}</div>
                    <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.gold, marginTop: 4 }}>
                      {'\uD83E\uDE99'} {has} coins
                    </div>
                    {isRich && (
                      <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.accent, fontWeight: 'bold', marginTop: 4 }}>
                        {'\u2714'} Already bought - can share!
                      </div>
                    )}
                    {isPoor && (
                      <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.error, fontWeight: 'bold', marginTop: 4 }}>
                        Needs {v.wantsEmoji} ({'\uD83E\uDE99'}{cost}) - short {'\uD83E\uDE99'}{deficit}
                      </div>
                    )}
                    {v.satisfied && has === 0 && (
                      <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.textDim, marginTop: 4 }}>
                        Already bought, no coins left
                      </div>
                    )}
                    {!v.satisfied && has >= cost && (
                      <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.accent, fontWeight: 'bold', marginTop: 4 }}>
                        Can afford! Will buy next.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BUY2 step */}
        {coinsStep === 'buy2' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(8px, 2vw, 12px)',
            marginBottom: 16,
          }}>
            {villagers.map(v => {
              const has = wallets[v.id] || 0;
              const cost = coinBuyPrices[v.wants];
              return (
                <div
                  key={v.id}
                  onClick={() => handleCoinsClick(v.id)}
                  style={{
                    ...cardStyle(false, v.satisfied),
                    cursor: v.satisfied ? 'default' : 'pointer',
                  }}
                  onMouseEnter={(e) => { if (!v.satisfied) e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: 4 }}>{v.emoji}</div>
                  <div style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)', fontWeight: 'bold', color: COLORS.textBright, marginBottom: 4 }}>{v.name}</div>
                  {v.satisfied ? (
                    <div style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.85rem)', color: COLORS.accent, fontWeight: 'bold' }}>{'\u2714'} Got {v.wantsEmoji}!</div>
                  ) : (
                    <>
                      <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: COLORS.gold }}>
                        {'\uD83E\uDE99'} {has} / needs {'\uD83E\uDE99'}{cost}
                      </div>
                      <div style={{ fontSize: 'clamp(0.65rem, 1.6vw, 0.78rem)', color: has >= cost ? COLORS.accent : COLORS.error, marginTop: 4 }}>
                        {has >= cost ? `Click to buy ${v.wantsEmoji}!` : `Still short ${cost - has}`}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tradeLog.length > 0 && coinsStep !== 'distribute' && coinsStep !== 'inflation' && (
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

        {allSatisfied && (coinsStep === 'buy' || coinsStep === 'buy2') && (
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
            <strong>Shell money</strong> lets everyone trade, but different prices mean some people have to work extra jobs to afford what they need.
          </div>
          <div style={{ marginBottom: 4 }}>
            <strong>Inequality</strong> happens when some people start with more money than others - not because they worked harder, but because of luck or status.
          </div>
          <div>
            <strong>Inflation</strong> happens when too much money is created - prices go up and everyone's money buys less, especially hurting those who already had less!
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
