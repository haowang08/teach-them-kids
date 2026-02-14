import { useState, useCallback, useEffect, useRef } from "react";

// ============================================
// TYPES
// ============================================

type GamePhase = "intro" | "selectFood" | "playing" | "levelComplete" | "gameOver";

type FoodType = "tacos" | "kebabs" | "padThai" | "crepes" | "falafel" | "takoyaki";

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
}

interface StreetFood {
  id: FoodType;
  name: string;
  emoji: string;
  country: string;
  flag: string;
  basePrice: number;
  ingredients: Ingredient[];
  fact: string;
  prepTime: number; // seconds per step
}

interface Order {
  id: number;
  items: string[]; // ingredient IDs in required order
  timeLeft: number;
  maxTime: number;
  tip: number;
}

interface Customer {
  id: number;
  emoji: string;
  name: string;
  order: Order;
  served: boolean;
  patience: "happy" | "waiting" | "impatient" | "angry";
}

interface LevelConfig {
  level: number;
  customerCount: number;
  orderTime: number;
  minIngredients: number;
  maxIngredients: number;
  simultaneousCustomers: number;
}

// ============================================
// DATA
// ============================================

const STREET_FOODS: StreetFood[] = [
  {
    id: "tacos",
    name: "Tacos",
    emoji: "\u{1F32E}",
    country: "Mexico",
    flag: "\u{1F1F2}\u{1F1FD}",
    basePrice: 4,
    ingredients: [
      { id: "tortilla", name: "Tortilla", emoji: "\u{1FAD4}" },
      { id: "meat", name: "Carne Asada", emoji: "\u{1F969}" },
      { id: "onion", name: "Onions", emoji: "\u{1F9C5}" },
      { id: "cilantro", name: "Cilantro", emoji: "\u{1F33F}" },
      { id: "lime", name: "Lime", emoji: "\u{1F34B}" },
      { id: "salsa", name: "Salsa", emoji: "\u{1F336}\u{FE0F}" },
    ],
    fact: "Tacos date back to 18th century Mexican silver mines. Workers used tortillas as an edible 'spoon' to scoop up food. The word 'taco' originally meant 'plug' or 'wad' - like the paper plugs used to hold explosive charges in the mines!",
    prepTime: 3,
  },
  {
    id: "kebabs",
    name: "Kebabs",
    emoji: "\u{1F356}",
    country: "Turkey",
    flag: "\u{1F1F9}\u{1F1F7}",
    basePrice: 5,
    ingredients: [
      { id: "pita", name: "Pita Bread", emoji: "\u{1FAD3}" },
      { id: "lamb", name: "Grilled Lamb", emoji: "\u{1F356}" },
      { id: "tomato", name: "Tomatoes", emoji: "\u{1F345}" },
      { id: "lettuce", name: "Lettuce", emoji: "\u{1F96C}" },
      { id: "yogurt", name: "Yogurt Sauce", emoji: "\u{1F95B}" },
      { id: "spices", name: "Spices", emoji: "\u{1F9C2}" },
    ],
    fact: "The word 'kebab' comes from Arabic meaning 'to fry or burn.' Turkish doner kebabs inspired Greek gyros, Mexican al pastor, and even German doner kebabs - which were actually invented in Berlin by Turkish immigrants in the 1970s!",
    prepTime: 3,
  },
  {
    id: "padThai",
    name: "Pad Thai",
    emoji: "\u{1F35C}",
    country: "Thailand",
    flag: "\u{1F1F9}\u{1F1ED}",
    basePrice: 5,
    ingredients: [
      { id: "noodles", name: "Rice Noodles", emoji: "\u{1F35C}" },
      { id: "shrimp", name: "Shrimp", emoji: "\u{1F990}" },
      { id: "egg", name: "Scrambled Egg", emoji: "\u{1F373}" },
      { id: "beansprouts", name: "Bean Sprouts", emoji: "\u{1F331}" },
      { id: "peanuts", name: "Peanuts", emoji: "\u{1F95C}" },
      { id: "tamarind", name: "Tamarind Sauce", emoji: "\u{1F36F}" },
    ],
    fact: "Pad Thai was created in the 1930s as part of a Thai nation-building campaign! The government promoted this dish to reduce rice consumption and create a national identity. The Prime Minister even held a contest to perfect the recipe!",
    prepTime: 4,
  },
  {
    id: "crepes",
    name: "Crepes",
    emoji: "\u{1F95E}",
    country: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    basePrice: 4,
    ingredients: [
      { id: "batter", name: "Crepe Batter", emoji: "\u{1F95E}" },
      { id: "nutella", name: "Nutella", emoji: "\u{1F36B}" },
      { id: "banana", name: "Banana", emoji: "\u{1F34C}" },
      { id: "strawberry", name: "Strawberries", emoji: "\u{1F353}" },
      { id: "cream", name: "Whipped Cream", emoji: "\u{1F95B}" },
      { id: "sugar", name: "Powdered Sugar", emoji: "\u{2728}" },
    ],
    fact: "Crepes originated in Brittany, France over 900 years ago! On February 2nd, French people celebrate 'La Chandeleur' by making crepes. Tradition says if you flip a crepe while holding a coin, you'll have prosperity all year!",
    prepTime: 3,
  },
  {
    id: "falafel",
    name: "Falafel",
    emoji: "\u{1F9C6}",
    country: "Middle East",
    flag: "\u{1F1EE}\u{1F1F1}",
    basePrice: 4,
    ingredients: [
      { id: "pita", name: "Pita Bread", emoji: "\u{1FAD3}" },
      { id: "falafel", name: "Falafel Balls", emoji: "\u{1F9C6}" },
      { id: "hummus", name: "Hummus", emoji: "\u{1F95C}" },
      { id: "pickles", name: "Pickled Vegetables", emoji: "\u{1F952}" },
      { id: "tahini", name: "Tahini Sauce", emoji: "\u{1F95B}" },
      { id: "herbs", name: "Fresh Herbs", emoji: "\u{1F33F}" },
    ],
    fact: "Falafel might be one of the oldest fast foods! Some historians believe it was eaten by ancient Egyptians. Made from chickpeas or fava beans, it became popular as a meat substitute and is now beloved worldwide as a vegetarian street food!",
    prepTime: 3,
  },
  {
    id: "takoyaki",
    name: "Takoyaki",
    emoji: "\u{1F419}",
    country: "Japan",
    flag: "\u{1F1EF}\u{1F1F5}",
    basePrice: 5,
    ingredients: [
      { id: "batter", name: "Batter Ball", emoji: "\u{1F3B1}" },
      { id: "octopus", name: "Octopus", emoji: "\u{1F419}" },
      { id: "ginger", name: "Pickled Ginger", emoji: "\u{1F9C1}" },
      { id: "sauce", name: "Takoyaki Sauce", emoji: "\u{1F36B}" },
      { id: "mayo", name: "Japanese Mayo", emoji: "\u{1F95A}" },
      { id: "bonito", name: "Bonito Flakes", emoji: "\u{1F41F}" },
    ],
    fact: "Takoyaki was invented in Osaka in 1935! These octopus balls are cooked in special round molds. The bonito flakes on top appear to dance because of the heat rising from the freshly cooked balls - that's why they're called 'dancing fish flakes'!",
    prepTime: 4,
  },
];

const CUSTOMER_DATA = [
  { emoji: "\u{1F466}", name: "Tommy" },
  { emoji: "\u{1F467}", name: "Sofia" },
  { emoji: "\u{1F468}", name: "Carlos" },
  { emoji: "\u{1F469}", name: "Mei" },
  { emoji: "\u{1F474}", name: "Grandpa Ali" },
  { emoji: "\u{1F475}", name: "Nana Rose" },
  { emoji: "\u{1F9D1}", name: "Alex" },
  { emoji: "\u{1F471}", name: "Erik" },
  { emoji: "\u{1F9D4}", name: "Raj" },
  { emoji: "\u{1F469}\u{200D}\u{1F373}", name: "Chef Kim" },
];

const LEVELS: LevelConfig[] = [
  { level: 1, customerCount: 3, orderTime: 30, minIngredients: 3, maxIngredients: 3, simultaneousCustomers: 1 },
  { level: 2, customerCount: 4, orderTime: 28, minIngredients: 3, maxIngredients: 4, simultaneousCustomers: 1 },
  { level: 3, customerCount: 5, orderTime: 25, minIngredients: 4, maxIngredients: 4, simultaneousCustomers: 2 },
  { level: 4, customerCount: 6, orderTime: 22, minIngredients: 4, maxIngredients: 5, simultaneousCustomers: 2 },
  { level: 5, customerCount: 7, orderTime: 20, minIngredients: 5, maxIngredients: 6, simultaneousCustomers: 3 },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function generateOrder(food: StreetFood, config: LevelConfig): Order {
  const numIngredients = Math.floor(
    Math.random() * (config.maxIngredients - config.minIngredients + 1) + config.minIngredients
  );

  // Shuffle ingredients and pick required number
  const shuffled = [...food.ingredients].sort(() => Math.random() - 0.5);
  const selectedIngredients = shuffled.slice(0, numIngredients);

  return {
    id: Date.now() + Math.random(),
    items: selectedIngredients.map(i => i.id),
    timeLeft: config.orderTime,
    maxTime: config.orderTime,
    tip: Math.floor(Math.random() * 3) + 1,
  };
}

function generateCustomer(id: number, food: StreetFood, config: LevelConfig): Customer {
  const customerInfo = CUSTOMER_DATA[Math.floor(Math.random() * CUSTOMER_DATA.length)];
  return {
    id,
    emoji: customerInfo.emoji,
    name: customerInfo.name,
    order: generateOrder(food, config),
    served: false,
    patience: "happy",
  };
}

function getPatienceFromTime(timeLeft: number, maxTime: number): "happy" | "waiting" | "impatient" | "angry" {
  const ratio = timeLeft / maxTime;
  if (ratio > 0.6) return "happy";
  if (ratio > 0.3) return "waiting";
  if (ratio > 0) return "impatient";
  return "angry";
}

// ============================================
// COMPONENT
// ============================================

export default function StreetFoodStand() {
  // Game state
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [selectedFood, setSelectedFood] = useState<StreetFood | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [money, setMoney] = useState(0);
  const [totalCustomersServed, setTotalCustomersServed] = useState(0);
  const [levelCustomersServed, setLevelCustomersServed] = useState(0);
  const [customersLost, setCustomersLost] = useState(0);

  // Playing state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [activeCustomerIndex, setActiveCustomerIndex] = useState(0);
  const [preparedIngredients, setPreparedIngredients] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info");
  const [showFact, setShowFact] = useState(false);
  const [customersToSpawn, setCustomersToSpawn] = useState(0);
  const [nextCustomerId, setNextCustomerId] = useState(1);

  // Timer ref
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ----------------------------------------
  // LEVEL CONFIG
  // ----------------------------------------

  const levelConfig = LEVELS[Math.min(currentLevel - 1, LEVELS.length - 1)];

  // ----------------------------------------
  // TIMER EFFECT
  // ----------------------------------------

  useEffect(() => {
    if (phase !== "playing" || customers.length === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setCustomers(prevCustomers => {
        const updated = prevCustomers.map(customer => {
          if (customer.served) return customer;

          const newTimeLeft = customer.order.timeLeft - 1;
          const newPatience = getPatienceFromTime(newTimeLeft, customer.order.maxTime);

          return {
            ...customer,
            order: { ...customer.order, timeLeft: newTimeLeft },
            patience: newPatience,
          };
        });

        // Check for expired orders
        const expiredCustomer = updated.find(c => !c.served && c.order.timeLeft <= 0);
        if (expiredCustomer) {
          setCustomersLost(prev => prev + 1);
          setFeedback(`${expiredCustomer.name} left angry! Too slow!`);
          setFeedbackType("error");

          // Remove expired customer
          const remaining = updated.filter(c => c.id !== expiredCustomer.id);

          // Adjust active customer index if needed
          const currentActive = activeCustomerIndex;
          const expiredIndex = updated.findIndex(c => c.id === expiredCustomer.id);
          if (expiredIndex <= currentActive && currentActive > 0) {
            setActiveCustomerIndex(prev => Math.max(0, prev - 1));
          }

          return remaining;
        }

        return updated;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [phase, customers.length, activeCustomerIndex]);

  // ----------------------------------------
  // SPAWN CUSTOMERS EFFECT
  // ----------------------------------------

  useEffect(() => {
    if (phase !== "playing" || customersToSpawn <= 0 || !selectedFood) {
      if (spawnTimerRef.current) {
        clearTimeout(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
      return;
    }

    // Check if we can spawn more (based on simultaneous limit)
    const activeCount = customers.filter(c => !c.served).length;
    if (activeCount >= levelConfig.simultaneousCustomers) {
      return;
    }

    // Spawn a new customer after a delay
    spawnTimerRef.current = setTimeout(() => {
      const newCustomer = generateCustomer(nextCustomerId, selectedFood, levelConfig);
      setCustomers(prev => [...prev, newCustomer]);
      setNextCustomerId(prev => prev + 1);
      setCustomersToSpawn(prev => prev - 1);
    }, 2000);

    return () => {
      if (spawnTimerRef.current) {
        clearTimeout(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
    };
  }, [phase, customersToSpawn, customers, selectedFood, levelConfig, nextCustomerId]);

  // ----------------------------------------
  // LEVEL COMPLETE CHECK
  // ----------------------------------------

  useEffect(() => {
    if (phase !== "playing") return;

    const allServedOrLeft = customers.every(c => c.served);
    const noMoreToSpawn = customersToSpawn <= 0;
    const levelDone = allServedOrLeft && noMoreToSpawn && customers.length > 0;

    if (levelDone) {
      // Small delay before showing level complete
      setTimeout(() => {
        if (customersLost >= 3) {
          setPhase("gameOver");
        } else {
          setPhase("levelComplete");
        }
      }, 500);
    }
  }, [phase, customers, customersToSpawn, customersLost]);

  // ----------------------------------------
  // ACTIONS
  // ----------------------------------------

  const startGame = useCallback(() => {
    setPhase("selectFood");
    setMoney(0);
    setTotalCustomersServed(0);
    setCustomersLost(0);
    setCurrentLevel(1);
    setFeedback("");
  }, []);

  const selectFood = useCallback((food: StreetFood) => {
    setSelectedFood(food);
    setShowFact(true);
  }, []);

  const startPlaying = useCallback(() => {
    if (!selectedFood) return;

    setShowFact(false);
    setPhase("playing");
    setCustomers([]);
    setPreparedIngredients([]);
    setLevelCustomersServed(0);
    setActiveCustomerIndex(0);
    setFeedback("");
    setNextCustomerId(1);

    // Spawn first customer immediately, rest will come via effect
    const firstCustomer = generateCustomer(0, selectedFood, levelConfig);
    setCustomers([firstCustomer]);
    setNextCustomerId(1);
    setCustomersToSpawn(levelConfig.customerCount - 1);
  }, [selectedFood, levelConfig]);

  const addIngredient = useCallback((ingredientId: string) => {
    if (!selectedFood) return;

    const activeCustomer = customers.filter(c => !c.served)[activeCustomerIndex];
    if (!activeCustomer) return;

    const nextExpectedIndex = preparedIngredients.length;
    const expectedIngredient = activeCustomer.order.items[nextExpectedIndex];

    if (ingredientId === expectedIngredient) {
      setPreparedIngredients(prev => [...prev, ingredientId]);

      const ingredient = selectedFood.ingredients.find(i => i.id === ingredientId);
      setFeedback(`Added ${ingredient?.emoji} ${ingredient?.name}!`);
      setFeedbackType("success");

      // Check if order is complete
      if (nextExpectedIndex + 1 === activeCustomer.order.items.length) {
        // Order complete!
        const timeBonus = Math.floor(activeCustomer.order.timeLeft / 5);
        const earnings = selectedFood.basePrice + activeCustomer.order.tip + timeBonus;

        setMoney(prev => prev + earnings);
        setTotalCustomersServed(prev => prev + 1);
        setLevelCustomersServed(prev => prev + 1);

        setCustomers(prev => prev.map(c =>
          c.id === activeCustomer.id ? { ...c, served: true } : c
        ));

        setPreparedIngredients([]);
        setFeedback(`Served ${activeCustomer.name}! +$${earnings} ${timeBonus > 0 ? `(+$${timeBonus} speed bonus!)` : ""}`);
        setFeedbackType("success");

        // Move to next unserved customer
        setTimeout(() => {
          setCustomers(currentCustomers => {
            const unserved = currentCustomers.filter(c => !c.served);
            if (unserved.length > 0) {
              setActiveCustomerIndex(0);
            }
            return currentCustomers;
          });
        }, 300);
      }
    } else {
      // Wrong ingredient!
      const wrongIngredient = selectedFood.ingredients.find(i => i.id === ingredientId);
      const rightIngredient = selectedFood.ingredients.find(i => i.id === expectedIngredient);
      setFeedback(`Wrong! Need ${rightIngredient?.emoji} ${rightIngredient?.name}, not ${wrongIngredient?.emoji}!`);
      setFeedbackType("error");

      // Clear prepared ingredients on mistake
      setPreparedIngredients([]);
    }
  }, [selectedFood, customers, activeCustomerIndex, preparedIngredients]);

  const switchCustomer = useCallback((index: number) => {
    const unservedCustomers = customers.filter(c => !c.served);
    if (index >= 0 && index < unservedCustomers.length) {
      setActiveCustomerIndex(index);
      setPreparedIngredients([]);
      setFeedback(`Now serving ${unservedCustomers[index].name}!`);
      setFeedbackType("info");
    }
  }, [customers]);

  const nextLevel = useCallback(() => {
    setCurrentLevel(prev => prev + 1);
    startPlaying();
  }, [startPlaying]);

  const playAgain = useCallback(() => {
    setPhase("intro");
    setSelectedFood(null);
    setMoney(0);
    setTotalCustomersServed(0);
    setCustomersLost(0);
    setCurrentLevel(1);
    setCustomers([]);
    setPreparedIngredients([]);
    setFeedback("");
    setCustomersToSpawn(0);
  }, []);

  // ----------------------------------------
  // RENDER HELPERS
  // ----------------------------------------

  const renderOrderProgress = (order: Order, prepared: string[], food: StreetFood) => {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {order.items.map((ingredientId, index) => {
          const ingredient = food.ingredients.find(i => i.id === ingredientId);
          const isPrepared = index < prepared.length;
          const isCurrent = index === prepared.length;

          return (
            <div
              key={`${ingredientId}-${index}`}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                isPrepared
                  ? "bg-green-100 border-2 border-green-400 scale-105"
                  : isCurrent
                  ? "bg-yellow-100 border-2 border-yellow-400 animate-pulse"
                  : "bg-gray-100 border-2 border-gray-300"
              }`}
            >
              <span className="text-2xl">{ingredient?.emoji}</span>
              <span className="text-xs text-gray-600 mt-1">{ingredient?.name}</span>
              {isPrepared && <span className="text-green-600 text-xs font-bold">Done!</span>}
              {isCurrent && <span className="text-yellow-600 text-xs font-bold">Next!</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const renderTimer = (timeLeft: number, maxTime: number) => {
    const percentage = (timeLeft / maxTime) * 100;
    const color = percentage > 60 ? "bg-green-500" : percentage > 30 ? "bg-yellow-500" : "bg-red-500";

    return (
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const renderCustomerQueue = () => {
    const unservedCustomers = customers.filter(c => !c.served);

    return (
      <div className="flex gap-3 flex-wrap justify-center mb-4">
        {unservedCustomers.map((customer, index) => {
          const isActive = index === activeCustomerIndex;
          const patienceColor = {
            happy: "bg-green-100 border-green-400",
            waiting: "bg-yellow-100 border-yellow-400",
            impatient: "bg-orange-100 border-orange-400",
            angry: "bg-red-100 border-red-400",
          }[customer.patience];

          return (
            <button
              key={customer.id}
              onClick={() => switchCustomer(index)}
              className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all cursor-pointer ${patienceColor} ${
                isActive ? "ring-4 ring-blue-400 scale-110" : "hover:scale-105"
              }`}
            >
              <span className="text-3xl">{customer.emoji}</span>
              <span className="text-xs font-medium text-gray-700">{customer.name}</span>
              <span className="text-xs text-gray-500">{customer.order.items.length} items</span>
              <span className="text-xs font-bold text-blue-600">{customer.order.timeLeft}s</span>
            </button>
          );
        })}
      </div>
    );
  };

  // ----------------------------------------
  // PHASE RENDERS
  // ----------------------------------------

  // Intro screen
  if (phase === "intro") {
    return (
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-6xl block mb-2">{"\u{1F35C}"}</span>
          <h2 className="text-2xl font-bold text-orange-700 mb-2">Street Food Stand</h2>
          <p className="text-gray-600">Run a street food stand from around the world!</p>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-3 text-center">{"\u{1F30D}"} Street Food Around the World</h3>
          <div className="grid grid-cols-3 gap-2">
            {STREET_FOODS.map((food) => (
              <div key={food.id} className="text-center p-2 bg-gray-50 rounded-lg">
                <span className="text-2xl">{food.emoji}</span>
                <div className="text-xs text-gray-600">{food.flag} {food.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-2">{"\u{1F4DD}"} How to Play:</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>{"\u{1F37D}\u{FE0F}"} Choose a type of street food to serve</li>
            <li>{"\u{1F4CB}"} Take customer orders and remember the ingredients</li>
            <li>{"\u{1F468}\u{200D}\u{1F373}"} Add ingredients in the correct order</li>
            <li>{"\u{23F1}\u{FE0F}"} Serve customers before time runs out</li>
            <li>{"\u{1F4B0}"} Earn money and tips for fast service!</li>
          </ul>
        </div>

        <button
          onClick={startGame}
          className="w-full bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-orange-500 hover:to-red-500 transition-all text-lg"
        >
          {"\u{1F373}"} Start Cooking!
        </button>
      </div>
    );
  }

  // Food selection screen
  if (phase === "selectFood") {
    if (showFact && selectedFood) {
      return (
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl p-6 max-w-2xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-6xl block mb-2">{selectedFood.emoji}</span>
            <h2 className="text-2xl font-bold text-orange-700 mb-1">{selectedFood.name}</h2>
            <p className="text-gray-600">{selectedFood.flag} {selectedFood.country}</p>
          </div>

          <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
            <h3 className="font-bold text-amber-700 mb-2">{"\u{1F4D6}"} Did You Know?</h3>
            <p className="text-gray-700 leading-relaxed">{selectedFood.fact}</p>
          </div>

          <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <h3 className="font-bold text-gray-700 mb-2">{"\u{1F372}"} Ingredients You'll Use:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedFood.ingredients.map((ing) => (
                <span key={ing.id} className="bg-amber-100 px-3 py-1 rounded-full text-sm">
                  {ing.emoji} {ing.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setSelectedFood(null); setShowFact(false); }}
              className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-all"
            >
              {"\u{2B05}\u{FE0F}"} Back
            </button>
            <button
              onClick={startPlaying}
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-green-500 hover:to-emerald-500 transition-all"
            >
              {"\u{1F3AF}"} Start Level 1!
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-orange-700 mb-2">{"\u{1F30D}"} Choose Your Street Food</h2>
          <p className="text-gray-600">Pick a cuisine to master!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {STREET_FOODS.map((food) => (
            <button
              key={food.id}
              onClick={() => selectFood(food)}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 border-transparent hover:border-orange-300"
            >
              <div className="text-4xl mb-2">{food.emoji}</div>
              <div className="font-bold text-gray-700">{food.name}</div>
              <div className="text-sm text-gray-500">{food.flag} {food.country}</div>
              <div className="text-xs text-green-600 mt-1">${food.basePrice} base price</div>
            </button>
          ))}
        </div>

        <button
          onClick={playAgain}
          className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-xl hover:bg-gray-300 transition-all"
        >
          {"\u{2B05}\u{FE0F}"} Back to Menu
        </button>
      </div>
    );
  }

  // Playing phase
  if (phase === "playing" && selectedFood) {
    const unservedCustomers = customers.filter(c => !c.served);
    const activeCustomer = unservedCustomers[activeCustomerIndex];

    return (
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl p-4 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <div className="bg-blue-100 rounded-lg px-3 py-1">
            <span className="font-bold text-blue-700">Level {currentLevel}</span>
          </div>
          <div className="flex gap-2">
            <div className="bg-green-100 rounded-lg px-3 py-1">
              <span className="font-bold text-green-700">{"\u{1F4B0}"} ${money}</span>
            </div>
            <div className="bg-purple-100 rounded-lg px-3 py-1">
              <span className="font-bold text-purple-700">{"\u{1F464}"} {levelCustomersServed}/{levelConfig.customerCount}</span>
            </div>
          </div>
        </div>

        {/* Stand Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-xl p-3 mb-3 text-center shadow-md">
          <span className="text-3xl mr-2">{selectedFood.emoji}</span>
          <span className="text-xl font-bold text-white">{selectedFood.flag} {selectedFood.name} Stand</span>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-3 p-2 rounded-lg text-center text-sm font-medium ${
            feedbackType === "success" ? "bg-green-100 text-green-700" :
            feedbackType === "error" ? "bg-red-100 text-red-700" :
            "bg-blue-100 text-blue-700"
          }`}>
            {feedback}
          </div>
        )}

        {/* Customer Queue */}
        {unservedCustomers.length > 1 && (
          <div className="mb-3">
            <div className="text-xs text-gray-600 mb-1 text-center">Click a customer to serve them:</div>
            {renderCustomerQueue()}
          </div>
        )}

        {/* Active Customer Order */}
        {activeCustomer && (
          <div className="bg-white rounded-xl p-4 mb-3 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{activeCustomer.emoji}</span>
                <div>
                  <div className="font-bold text-gray-700">{activeCustomer.name}'s Order</div>
                  <div className="text-xs text-gray-500">+${activeCustomer.order.tip} tip</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{activeCustomer.order.timeLeft}s</div>
              </div>
            </div>

            {renderTimer(activeCustomer.order.timeLeft, activeCustomer.order.maxTime)}

            <div className="mt-3">
              <div className="text-sm text-gray-600 mb-2 text-center">Add ingredients in order:</div>
              {renderOrderProgress(activeCustomer.order, preparedIngredients, selectedFood)}
            </div>
          </div>
        )}

        {/* No active customers */}
        {!activeCustomer && customersToSpawn > 0 && (
          <div className="bg-white rounded-xl p-6 mb-3 shadow-md text-center">
            <span className="text-4xl block mb-2">{"\u{23F3}"}</span>
            <div className="text-gray-600">Waiting for next customer...</div>
            <div className="text-sm text-gray-500">{customersToSpawn} more coming</div>
          </div>
        )}

        {/* Ingredient Buttons */}
        {activeCustomer && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-600 mb-3 text-center">{"\u{1F37D}\u{FE0F}"} Tap to add ingredient:</div>
            <div className="grid grid-cols-3 gap-2">
              {selectedFood.ingredients.map((ingredient) => {
                const isInOrder = activeCustomer.order.items.includes(ingredient.id);
                return (
                  <button
                    key={ingredient.id}
                    onClick={() => addIngredient(ingredient.id)}
                    className={`p-3 rounded-xl transition-all active:scale-95 ${
                      isInOrder
                        ? "bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-300 hover:from-amber-200 hover:to-orange-200"
                        : "bg-gray-100 border-2 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    <span className="text-2xl block">{ingredient.emoji}</span>
                    <span className="text-xs text-gray-600">{ingredient.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Lost customers warning */}
        {customersLost > 0 && (
          <div className="mt-3 bg-red-100 rounded-lg p-2 text-center">
            <span className="text-red-600 text-sm font-medium">
              {"\u{1F620}"} Lost customers: {customersLost}/3
            </span>
          </div>
        )}
      </div>
    );
  }

  // Level complete
  if (phase === "levelComplete" && selectedFood) {
    const isLastLevel = currentLevel >= LEVELS.length;

    return (
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="text-center mb-4">
          <span className="text-6xl block mb-2">{"\u{1F389}"}</span>
          <h2 className="text-2xl font-bold text-green-700 mb-1">Level {currentLevel} Complete!</h2>
          <p className="text-gray-600">{selectedFood.emoji} {selectedFood.name} Stand</p>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-md">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-green-600">${money}</div>
              <div className="text-sm text-gray-600">Total Earned</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-3xl font-bold text-blue-600">{totalCustomersServed}</div>
              <div className="text-sm text-gray-600">Customers Served</div>
            </div>
          </div>

          {customersLost > 0 && (
            <div className="mt-3 text-center text-orange-600 text-sm">
              {"\u{26A0}\u{FE0F}"} Lost {customersLost} customer(s) - be faster next time!
            </div>
          )}
        </div>

        {/* Fun Fact Reminder */}
        <div className="bg-amber-50 rounded-xl p-4 mb-4 border-l-4 border-amber-400">
          <h4 className="font-bold text-amber-700 mb-1">{"\u{1F4D6}"} Food Fact:</h4>
          <p className="text-sm text-gray-700">{selectedFood.fact}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={playAgain}
            className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 transition-all"
          >
            {"\u{1F3E0}"} Main Menu
          </button>
          {!isLastLevel ? (
            <button
              onClick={nextLevel}
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-green-500 hover:to-emerald-500 transition-all"
            >
              Level {currentLevel + 1} {"\u{27A1}\u{FE0F}"}
            </button>
          ) : (
            <button
              onClick={() => setPhase("gameOver")}
              className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              See Results {"\u{1F3C6}"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Game over
  if (phase === "gameOver" && selectedFood) {
    const isWin = customersLost < 3 && currentLevel >= LEVELS.length;
    const rating = totalCustomersServed >= 20 ? "Master Chef" :
                   totalCustomersServed >= 15 ? "Expert Cook" :
                   totalCustomersServed >= 10 ? "Skilled Cook" : "Apprentice";
    const stars = totalCustomersServed >= 20 ? 3 : totalCustomersServed >= 15 ? 2 : totalCustomersServed >= 10 ? 1 : 0;

    return (
      <div className={`rounded-xl p-6 max-w-2xl mx-auto ${
        isWin
          ? "bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100"
          : "bg-gradient-to-br from-gray-100 via-slate-100 to-zinc-100"
      }`}>
        <div className="text-center mb-4">
          <span className="text-6xl block mb-2">{isWin ? "\u{1F3C6}" : "\u{1F4AA}"}</span>
          <h2 className="text-2xl font-bold text-gray-700 mb-1">
            {isWin ? "Congratulations!" : "Game Over"}
          </h2>
          <p className="text-gray-600">
            {isWin ? "You completed all levels!" : `Made it to Level ${currentLevel}`}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 mb-4 shadow-lg text-center">
          {/* Stars */}
          <div className="text-4xl mb-2">
            {Array(3).fill(0).map((_, i) => (
              <span key={i} className={i < stars ? "text-yellow-400" : "text-gray-300"}>
                {"\u{2B50}"}
              </span>
            ))}
          </div>
          <div className="text-xl font-bold text-amber-600 mb-4">{rating}</div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">${money}</div>
              <div className="text-xs text-gray-600">Earned</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{totalCustomersServed}</div>
              <div className="text-xs text-gray-600">Served</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">Level {currentLevel}</div>
              <div className="text-xs text-gray-600">Reached</div>
            </div>
          </div>
        </div>

        {/* What You Learned */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-2">{"\u{1F393}"} What You Learned:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>{"\u{2022}"} {selectedFood.name} is a famous street food from {selectedFood.country}</li>
            <li>{"\u{2022}"} Key ingredients: {selectedFood.ingredients.slice(0, 3).map(i => i.name).join(", ")}</li>
            <li>{"\u{2022}"} Running a food stand requires speed, accuracy, and good memory!</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={playAgain}
            className="flex-1 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-orange-500 hover:to-red-500 transition-all"
          >
            {"\u{1F504}"} Play Again
          </button>
          <button
            onClick={() => { setSelectedFood(null); setPhase("selectFood"); setCurrentLevel(1); setMoney(0); setTotalCustomersServed(0); setCustomersLost(0); }}
            className="flex-1 bg-gradient-to-r from-blue-400 to-indigo-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            {"\u{1F30D}"} Try Another Food
          </button>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center">
      <p className="text-4xl mb-3">{"\u{1F35C}"}</p>
      <h3 className="text-lg font-bold text-gray-700 mb-2">Street Food Stand</h3>
      <p className="text-sm text-gray-600">Loading...</p>
    </div>
  );
}
