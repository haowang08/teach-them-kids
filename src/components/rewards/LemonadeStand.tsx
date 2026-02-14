import { useState, useCallback, useEffect } from "react";

// ============================================
// TYPES
// ============================================

type GamePhase = "intro" | "buying" | "challenge" | "selling" | "dayEnd" | "gameOver";

interface Supply {
  id: string;
  name: string;
  emoji: string;
  bulkQty: number;
  bulkPrice: number;
  description: string;
}

interface DivisionChallenge {
  question: string;
  dividend: number;
  divisor: number;
  answer: number;
  context: string;
  hint: string;
}

interface Customer {
  id: number;
  emoji: string;
  name: string;
  cupsWanted: number;
  served: boolean;
}

// ============================================
// DATA
// ============================================

const SUPPLIES: Supply[] = [
  {
    id: "lemons",
    name: "Lemons",
    emoji: "\u{1F34B}",
    bulkQty: 12,
    bulkPrice: 24,
    description: "Fresh juicy lemons - 12 for $24",
  },
  {
    id: "sugar",
    name: "Sugar",
    emoji: "\u{1F36C}",
    bulkQty: 8,
    bulkPrice: 16,
    description: "Sweet sugar bags - 8 bags for $16",
  },
  {
    id: "cups",
    name: "Cups",
    emoji: "\u{1F964}",
    bulkQty: 20,
    bulkPrice: 40,
    description: "Paper cups - 20 cups for $40",
  },
  {
    id: "ice",
    name: "Ice",
    emoji: "\u{1F9CA}",
    bulkQty: 10,
    bulkPrice: 30,
    description: "Ice bags - 10 bags for $30",
  },
];

const CUSTOMER_EMOJIS = [
  { emoji: "\u{1F466}", name: "Tommy" },
  { emoji: "\u{1F467}", name: "Sally" },
  { emoji: "\u{1F468}", name: "Mr. Johnson" },
  { emoji: "\u{1F469}", name: "Ms. Garcia" },
  { emoji: "\u{1F474}", name: "Grandpa Joe" },
  { emoji: "\u{1F475}", name: "Grandma Rose" },
  { emoji: "\u{1F9D1}", name: "Alex" },
  { emoji: "\u{1F471}", name: "Chris" },
];

const PRICE_PER_CUP = 3;
const STARTING_MONEY = 50;
const TOTAL_DAYS = 5;

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateBuyingChallenge(supply: Supply): DivisionChallenge {
  return {
    question: `You're buying ${supply.bulkQty} ${supply.name.toLowerCase()} for $${supply.bulkPrice}. What is the cost per ${supply.name.slice(0, -1).toLowerCase()}?`,
    dividend: supply.bulkPrice,
    divisor: supply.bulkQty,
    answer: supply.bulkPrice / supply.bulkQty,
    context: `${supply.emoji} $${supply.bulkPrice} ÷ ${supply.bulkQty} = ?`,
    hint: `Divide the total price ($${supply.bulkPrice}) by the quantity (${supply.bulkQty})`,
  };
}

function generateEarningsChallenge(totalEarnings: number, days: number): DivisionChallenge {
  return {
    question: `You made $${totalEarnings} over ${days} days. How much did you earn per day on average?`,
    dividend: totalEarnings,
    divisor: days,
    answer: totalEarnings / days,
    context: `\u{1F4B0} $${totalEarnings} ÷ ${days} days = ?`,
    hint: `Divide total earnings ($${totalEarnings}) by number of days (${days})`,
  };
}

function generateProfitChallenge(totalProfit: number, cupsSold: number): DivisionChallenge {
  return {
    question: `You made $${totalProfit} profit selling ${cupsSold} cups. What was your profit per cup?`,
    dividend: totalProfit,
    divisor: cupsSold,
    answer: totalProfit / cupsSold,
    context: `\u{1F4C8} $${totalProfit} ÷ ${cupsSold} cups = ?`,
    hint: `Divide total profit ($${totalProfit}) by cups sold (${cupsSold})`,
  };
}

function generateRandomCustomers(day: number): Customer[] {
  const numCustomers = Math.min(3 + day, 6);
  const shuffled = [...CUSTOMER_EMOJIS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numCustomers).map((c, i) => ({
    id: i,
    emoji: c.emoji,
    name: c.name,
    cupsWanted: Math.floor(Math.random() * 3) + 1,
    served: false,
  }));
}

// ============================================
// COMPONENT
// ============================================

export default function LemonadeStand() {
  // Game state
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [day, setDay] = useState(1);
  const [money, setMoney] = useState(STARTING_MONEY);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalCupsSold, setTotalCupsSold] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Inventory
  const [inventory, setInventory] = useState<Record<string, number>>({
    lemons: 0,
    sugar: 0,
    cups: 0,
    ice: 0,
  });

  // Challenge state
  const [currentChallenge, setCurrentChallenge] = useState<DivisionChallenge | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [pendingPurchase, setPendingPurchase] = useState<Supply | null>(null);

  // Selling state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0);
  const [dayEarnings, setDayEarnings] = useState(0);
  const [dayCupsSold, setDayCupsSold] = useState(0);

  // Day end state
  const [dailySummary, setDailySummary] = useState<{
    earned: number;
    cups: number;
    profit: number;
  } | null>(null);

  // ----------------------------------------
  // ACTIONS
  // ----------------------------------------

  const startGame = useCallback(() => {
    setPhase("buying");
    setDay(1);
    setMoney(STARTING_MONEY);
    setTotalEarnings(0);
    setTotalCupsSold(0);
    setCorrectAnswers(0);
    setInventory({ lemons: 0, sugar: 0, cups: 0, ice: 0 });
    setFeedback("");
  }, []);

  const attemptPurchase = useCallback((supply: Supply) => {
    if (money < supply.bulkPrice) {
      setFeedback(`Not enough money! You need $${supply.bulkPrice} but only have $${money}.`);
      return;
    }
    setPendingPurchase(supply);
    setCurrentChallenge(generateBuyingChallenge(supply));
    setPhase("challenge");
    setUserAnswer("");
    setShowHint(false);
    setFeedback("");
  }, [money]);

  const checkAnswer = useCallback(() => {
    if (!currentChallenge) return;

    const userNum = parseFloat(userAnswer);
    const isCorrect = Math.abs(userNum - currentChallenge.answer) < 0.01;

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setFeedback(`Correct! The answer is $${currentChallenge.answer.toFixed(2)} per item.`);

      // Complete the purchase if this was a buying challenge
      if (pendingPurchase) {
        setMoney(prev => prev - pendingPurchase.bulkPrice);
        setInventory(prev => ({
          ...prev,
          [pendingPurchase.id]: prev[pendingPurchase.id] + pendingPurchase.bulkQty,
        }));
        setTimeout(() => {
          setPendingPurchase(null);
          setCurrentChallenge(null);
          setPhase("buying");
          setFeedback(`Purchased ${pendingPurchase.bulkQty} ${pendingPurchase.name.toLowerCase()}!`);
        }, 1500);
      } else {
        // This was an end-of-day challenge
        setTimeout(() => {
          setCurrentChallenge(null);
          if (day >= TOTAL_DAYS) {
            setPhase("gameOver");
          } else {
            setDay(prev => prev + 1);
            setPhase("buying");
            setFeedback(`Day ${day} complete! Starting Day ${day + 1}...`);
          }
        }, 1500);
      }
    } else {
      setFeedback(`Not quite! Try again. Remember: ${currentChallenge.dividend} ÷ ${currentChallenge.divisor}`);
      setShowHint(true);
    }
  }, [currentChallenge, userAnswer, pendingPurchase, day]);

  const startSelling = useCallback(() => {
    // Check if we have enough supplies
    const minSupply = Math.min(inventory.lemons, inventory.sugar, inventory.cups, inventory.ice);
    if (minSupply === 0) {
      setFeedback("You need at least 1 of each supply to make lemonade!");
      return;
    }

    const newCustomers = generateRandomCustomers(day);
    setCustomers(newCustomers);
    setCurrentCustomerIndex(0);
    setDayEarnings(0);
    setDayCupsSold(0);
    setPhase("selling");
    setFeedback("");
  }, [inventory, day]);

  // Track if we should end the day (used to avoid circular dependency)
  const [shouldEndDay, setShouldEndDay] = useState(false);

  const serveCustomer = useCallback(() => {
    const customer = customers[currentCustomerIndex];
    if (!customer || customer.served) return;

    // Check if we have enough supplies
    const cupsToServe = customer.cupsWanted;
    if (
      inventory.lemons < cupsToServe ||
      inventory.sugar < cupsToServe ||
      inventory.cups < cupsToServe ||
      inventory.ice < cupsToServe
    ) {
      setFeedback("Not enough supplies to serve this customer!");
      // Move to next customer or end day
      if (currentCustomerIndex < customers.length - 1) {
        setCurrentCustomerIndex(prev => prev + 1);
      } else {
        setShouldEndDay(true);
      }
      return;
    }

    // Serve the customer
    const payment = cupsToServe * PRICE_PER_CUP;

    // Use functional updates for all state changes
    setMoney(prev => prev + payment);
    setDayEarnings(prev => prev + payment);
    setDayCupsSold(prev => prev + cupsToServe);
    setTotalEarnings(prev => prev + payment);
    setTotalCupsSold(prev => prev + cupsToServe);

    // Deduct supplies
    setInventory(prev => ({
      lemons: prev.lemons - cupsToServe,
      sugar: prev.sugar - cupsToServe,
      cups: prev.cups - cupsToServe,
      ice: prev.ice - cupsToServe,
    }));

    // Mark customer as served
    setCustomers(prev => prev.map((c, i) =>
      i === currentCustomerIndex ? { ...c, served: true } : c
    ));

    setFeedback(`${customer.name} bought ${cupsToServe} cup${cupsToServe > 1 ? "s" : ""} for $${payment}!`);

    // Move to next customer or end day
    setTimeout(() => {
      if (currentCustomerIndex < customers.length - 1) {
        setCurrentCustomerIndex(prev => prev + 1);
        setFeedback("");
      } else {
        setShouldEndDay(true);
      }
    }, 1200);
  }, [customers, currentCustomerIndex, inventory]);

  // Handle end of day logic
  const endSellingDay = useCallback(() => {
    // Calculate summary using current values (before state updates)
    const supplyCost = 10; // Approximate cost per cup in supplies
    const profit = dayEarnings - (dayCupsSold * supplyCost / 10);

    setDailySummary({
      earned: dayEarnings,
      cups: dayCupsSold,
      profit: Math.round(profit * 100) / 100,
    });

    // Generate an end-of-day challenge
    if (dayCupsSold > 0 && dayEarnings > 0) {
      const challengeType = Math.random();
      let challenge: DivisionChallenge;

      if (challengeType < 0.5 && day > 1) {
        // Average earnings challenge
        const avgEarnings = Math.round((totalEarnings / day) * 100) / 100;
        challenge = generateEarningsChallenge(
          Math.round(avgEarnings * day),
          day
        );
      } else {
        // Profit per cup challenge
        challenge = generateProfitChallenge(dayEarnings, dayCupsSold);
      }
      setCurrentChallenge(challenge);
    }

    setPhase("dayEnd");
    setShouldEndDay(false);
  }, [dayEarnings, dayCupsSold, day, totalEarnings]);

  // Effect to handle end of day trigger
  useEffect(() => {
    if (shouldEndDay && phase === "selling") {
      endSellingDay();
    }
  }, [shouldEndDay, phase, endSellingDay]);

  const continueAfterDayEnd = useCallback(() => {
    if (currentChallenge) {
      setPhase("challenge");
      setUserAnswer("");
      setShowHint(false);
      setFeedback("");
    } else {
      if (day >= TOTAL_DAYS) {
        setPhase("gameOver");
      } else {
        setDay(prev => prev + 1);
        setPhase("buying");
        setFeedback("");
      }
    }
  }, [currentChallenge, day]);

  const playAgain = useCallback(() => {
    setPhase("intro");
    setDay(1);
    setMoney(STARTING_MONEY);
    setTotalEarnings(0);
    setTotalCupsSold(0);
    setCorrectAnswers(0);
    setInventory({ lemons: 0, sugar: 0, cups: 0, ice: 0 });
    setCurrentChallenge(null);
    setUserAnswer("");
    setFeedback("");
    setShowHint(false);
    setPendingPurchase(null);
    setCustomers([]);
    setDailySummary(null);
    setShouldEndDay(false);
  }, []);

  // ----------------------------------------
  // RENDER HELPERS
  // ----------------------------------------

  const renderLemonadeStand = () => (
    <div className="relative mx-auto mb-4" style={{ maxWidth: 280 }}>
      {/* Stand structure */}
      <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-t-xl p-4 border-4 border-yellow-500 shadow-lg">
        {/* Sign */}
        <div className="bg-white rounded-lg p-2 mb-3 shadow-md border-2 border-yellow-500 text-center">
          <span className="text-2xl font-bold text-yellow-600">{"\u{1F34B}"} LEMONADE</span>
          <div className="text-green-600 font-bold">${PRICE_PER_CUP} per cup</div>
        </div>

        {/* Pitcher and cups display */}
        <div className="flex justify-center items-end gap-2">
          <span className="text-4xl">{"\u{1FAD9}"}</span>
          <span className="text-3xl">{"\u{1F964}"}</span>
          <span className="text-3xl">{"\u{1F964}"}</span>
          <span className="text-3xl">{"\u{1F964}"}</span>
        </div>
      </div>

      {/* Stand counter */}
      <div className="bg-gradient-to-b from-amber-600 to-amber-700 h-8 rounded-b-lg border-4 border-t-0 border-amber-800" />
    </div>
  );

  const renderInventory = () => (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {SUPPLIES.map((supply) => (
        <div
          key={supply.id}
          className="bg-white rounded-lg p-2 shadow-sm border border-gray-200 text-center"
        >
          <span className="text-2xl">{supply.emoji}</span>
          <div className="text-sm font-semibold text-gray-700">{supply.name}</div>
          <div className="text-lg font-bold text-green-600">{inventory[supply.id]}</div>
        </div>
      ))}
    </div>
  );

  const renderCustomerQueue = () => (
    <div className="flex justify-center gap-3 mb-4 flex-wrap">
      {customers.map((customer, index) => (
        <div
          key={customer.id}
          className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
            index === currentCustomerIndex && !customer.served
              ? "bg-yellow-100 ring-2 ring-yellow-400 scale-110"
              : customer.served
              ? "bg-green-100 opacity-60"
              : "bg-gray-100"
          }`}
        >
          <span className="text-3xl">{customer.emoji}</span>
          <div className="text-xs font-medium text-gray-600">{customer.name}</div>
          {!customer.served && (
            <div className="text-xs text-blue-600 font-semibold">
              Wants {customer.cupsWanted} cup{customer.cupsWanted > 1 ? "s" : ""}
            </div>
          )}
          {customer.served && (
            <div className="text-xs text-green-600 font-semibold">{"\u{2714}\u{FE0F}"} Served!</div>
          )}
        </div>
      ))}
    </div>
  );

  // ----------------------------------------
  // PHASE RENDERS
  // ----------------------------------------

  // Intro screen
  if (phase === "intro") {
    return (
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-xl p-6 max-w-lg mx-auto">
        <div className="text-center mb-6">
          <span className="text-6xl block mb-2">{"\u{1F34B}"}</span>
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">Lemonade Stand</h2>
          <p className="text-gray-600">Run your own lemonade business!</p>
        </div>

        {renderLemonadeStand()}

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-2">{"\u{1F4DD}"} How to Play:</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>{"\u{1F6D2}"} Buy supplies in bulk and calculate unit costs</li>
            <li>{"\u{1F964}"} Serve customers and earn money</li>
            <li>{"\u{1F4B0}"} Answer division questions to master your business math</li>
            <li>{"\u{1F3C6}"} Run your stand for {TOTAL_DAYS} days and maximize profits!</li>
          </ul>
        </div>

        <div className="bg-yellow-100 rounded-xl p-4 mb-4 text-center">
          <div className="text-lg font-bold text-yellow-700">Starting Money</div>
          <div className="text-3xl font-bold text-green-600">${STARTING_MONEY}</div>
        </div>

        <button
          onClick={startGame}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-yellow-500 hover:to-orange-500 transition-all text-lg"
        >
          {"\u{1F3AC}"} Start Your Business!
        </button>
      </div>
    );
  }

  // Buying phase
  if (phase === "buying") {
    return (
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-xl p-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-blue-100 rounded-lg px-3 py-1">
            <span className="font-bold text-blue-700">Day {day}/{TOTAL_DAYS}</span>
          </div>
          <div className="bg-green-100 rounded-lg px-3 py-1">
            <span className="font-bold text-green-700">{"\u{1F4B0}"} ${money}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-700 mb-3 text-center">
          {"\u{1F6D2}"} Buy Supplies
        </h3>

        {feedback && (
          <div className={`mb-3 p-2 rounded-lg text-center text-sm font-medium ${
            feedback.includes("Purchased") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {feedback}
          </div>
        )}

        {/* Current inventory */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">Your Inventory:</div>
          {renderInventory()}
        </div>

        {/* Supplies to buy */}
        <div className="space-y-2 mb-4">
          {SUPPLIES.map((supply) => (
            <div
              key={supply.id}
              className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{supply.emoji}</span>
                <div>
                  <div className="font-semibold text-gray-700">{supply.name}</div>
                  <div className="text-xs text-gray-500">{supply.description}</div>
                </div>
              </div>
              <button
                onClick={() => attemptPurchase(supply)}
                disabled={money < supply.bulkPrice}
                className={`px-4 py-2 rounded-lg font-bold text-sm ${
                  money >= supply.bulkPrice
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                ${supply.bulkPrice}
              </button>
            </div>
          ))}
        </div>

        {/* Start selling button */}
        <button
          onClick={startSelling}
          disabled={Object.values(inventory).some(v => v === 0)}
          className={`w-full py-3 rounded-xl font-bold text-lg ${
            Object.values(inventory).some(v => v === 0)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-400 to-red-400 text-white hover:from-orange-500 hover:to-red-500 shadow-lg"
          }`}
        >
          {Object.values(inventory).some(v => v === 0)
            ? "Need all 4 supplies to open!"
            : "\u{1F3EA} Open for Business!"}
        </button>
      </div>
    );
  }

  // Challenge phase
  if (phase === "challenge" && currentChallenge) {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 max-w-lg mx-auto">
        <div className="text-center mb-4">
          <span className="text-5xl block mb-2">{"\u{1F9EE}"}</span>
          <h3 className="text-xl font-bold text-indigo-700">Division Challenge!</h3>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
          <p className="text-gray-700 mb-3">{currentChallenge.question}</p>
          <div className="bg-indigo-50 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-indigo-600">{currentChallenge.context}</span>
          </div>
        </div>

        {showHint && (
          <div className="bg-yellow-100 rounded-lg p-3 mb-4 text-sm text-yellow-800">
            {"\u{1F4A1}"} <strong>Hint:</strong> {currentChallenge.hint}
          </div>
        )}

        {feedback && (
          <div className={`mb-4 p-3 rounded-lg text-center font-medium ${
            feedback.includes("Correct") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {feedback}
          </div>
        )}

        <div className="flex gap-3 mb-4">
          <input
            type="number"
            step="0.01"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
            placeholder="Your answer..."
            className="flex-1 px-4 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-400 focus:outline-none text-lg text-center"
          />
          <button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Check
          </button>
        </div>

        {!showHint && (
          <button
            onClick={() => setShowHint(true)}
            className="w-full text-indigo-500 text-sm underline"
          >
            Need a hint?
          </button>
        )}
      </div>
    );
  }

  // Selling phase
  if (phase === "selling") {
    const currentCustomer = customers[currentCustomerIndex];

    return (
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 rounded-xl p-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-blue-100 rounded-lg px-3 py-1">
            <span className="font-bold text-blue-700">Day {day}/{TOTAL_DAYS}</span>
          </div>
          <div className="bg-green-100 rounded-lg px-3 py-1">
            <span className="font-bold text-green-700">{"\u{1F4B0}"} ${money}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-700 mb-3 text-center">
          {"\u{1F3EA}"} Open for Business!
        </h3>

        {renderLemonadeStand()}

        {feedback && (
          <div className="mb-3 p-2 rounded-lg text-center text-sm font-medium bg-green-100 text-green-700">
            {feedback}
          </div>
        )}

        {/* Day earnings */}
        <div className="bg-white rounded-lg p-3 mb-4 shadow-sm text-center">
          <div className="text-sm text-gray-600">Today's Earnings</div>
          <div className="text-2xl font-bold text-green-600">${dayEarnings}</div>
          <div className="text-xs text-gray-500">{dayCupsSold} cups sold</div>
        </div>

        {/* Customer queue */}
        <div className="mb-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">{"\u{1F465}"} Customers:</div>
          {renderCustomerQueue()}
        </div>

        {/* Serve button */}
        {currentCustomer && !currentCustomer.served && (
          <button
            onClick={serveCustomer}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-green-500 hover:to-emerald-500 text-lg"
          >
            {"\u{1F964}"} Serve {currentCustomer.name}
          </button>
        )}

        {/* Current inventory */}
        <div className="mt-4">
          <div className="text-sm font-semibold text-gray-600 mb-2">Remaining Supplies:</div>
          {renderInventory()}
        </div>
      </div>
    );
  }

  // Day end phase
  if (phase === "dayEnd" && dailySummary) {
    return (
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-xl p-6 max-w-lg mx-auto">
        <div className="text-center mb-4">
          <span className="text-5xl block mb-2">{"\u{1F31F}"}</span>
          <h3 className="text-xl font-bold text-purple-700">Day {day} Complete!</h3>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{"\u{1F389}"}</div>
            <div className="text-lg text-gray-700">Great job running your stand today!</div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">${dailySummary.earned}</div>
              <div className="text-xs text-gray-600">Earned</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{dailySummary.cups}</div>
              <div className="text-xs text-gray-600">Cups Sold</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">${dailySummary.profit}</div>
              <div className="text-xs text-gray-600">Profit</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="text-center">
            <div className="text-sm text-gray-600">Total Money</div>
            <div className="text-3xl font-bold text-green-600">${money}</div>
          </div>
        </div>

        <button
          onClick={continueAfterDayEnd}
          className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-500 text-lg"
        >
          {currentChallenge ? "\u{1F9EE} Solve Division Challenge" : day >= TOTAL_DAYS ? "\u{1F3C6} See Final Results" : "\u{27A1}\u{FE0F} Next Day"}
        </button>
      </div>
    );
  }

  // Game over phase
  if (phase === "gameOver") {
    const rating = money >= 150 ? "Master Entrepreneur" : money >= 100 ? "Skilled Merchant" : money >= 75 ? "Promising Vendor" : "Learning Vendor";
    const stars = money >= 150 ? 3 : money >= 100 ? 2 : money >= 75 ? 1 : 0;

    return (
      <div className="bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 rounded-xl p-6 max-w-lg mx-auto">
        <div className="text-center mb-4">
          <span className="text-6xl block mb-2">{"\u{1F3C6}"}</span>
          <h2 className="text-2xl font-bold text-amber-700">Business Complete!</h2>
          <p className="text-gray-600">You ran your stand for {TOTAL_DAYS} days!</p>
        </div>

        <div className="bg-white rounded-xl p-6 mb-4 shadow-lg text-center">
          <div className="text-4xl mb-2">
            {Array(3).fill(0).map((_, i) => (
              <span key={i} className={i < stars ? "text-yellow-400" : "text-gray-300"}>
                {"\u{2B50}"}
              </span>
            ))}
          </div>
          <div className="text-xl font-bold text-amber-600 mb-2">{rating}</div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-green-600">${money}</div>
              <div className="text-sm text-gray-600">Final Money</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-blue-600">{totalCupsSold}</div>
              <div className="text-sm text-gray-600">Cups Sold</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-purple-600">${totalEarnings}</div>
              <div className="text-sm text-gray-600">Total Earned</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-yellow-600">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Problems Solved</div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 mb-4 text-center">
          <div className="text-lg font-bold text-amber-700 mb-1">{"\u{1F4CA}"} Business Math Tip</div>
          <p className="text-sm text-gray-700">
            Running a business means using division every day! From calculating costs per item
            to figuring out profits per sale, these math skills help entrepreneurs make smart decisions.
          </p>
        </div>

        <button
          onClick={playAgain}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-amber-500 hover:to-orange-500 text-lg"
        >
          {"\u{1F504}"} Play Again
        </button>
      </div>
    );
  }

  // Fallback
  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
      <p className="text-4xl mb-3">{"\u{1F34B}"}</p>
      <h3 className="text-lg font-bold text-gray-700 mb-2">Lemonade Stand</h3>
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  );
}
