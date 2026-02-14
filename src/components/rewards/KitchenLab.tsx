import { useState, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface ExperimentStep {
  instruction: string;
  requiredIngredients: string[]; // ingredient IDs
  explanation: string;
}

interface Experiment {
  id: string;
  name: string;
  emoji: string;
  description: string;
  safetyTips: string[];
  ingredients: Ingredient[];
  steps: ExperimentStep[];
  reactionColors: string[]; // gradient colors for reaction animation
  reactionEmoji: string;
  scienceExplanation: string;
}

interface MixedIngredient {
  id: string;
  addedAt: number; // timestamp for animation
}

/* ------------------------------------------------------------------ */
/*  Experiment Data                                                    */
/* ------------------------------------------------------------------ */

const EXPERIMENTS: Experiment[] = [
  {
    id: 'volcano',
    name: 'Baking Soda Volcano',
    emoji: '🌋',
    description: 'Create a fizzing, bubbling volcanic eruption right on your kitchen table!',
    safetyTips: [
      'Do this experiment on a tray or in the sink - it gets messy!',
      'Vinegar can sting if it gets in your eyes - be careful!',
      'Wash your hands after the experiment',
    ],
    ingredients: [
      { id: 'baking-soda', name: 'Baking Soda', emoji: '🧂', color: '#f5f5f5' },
      { id: 'vinegar', name: 'Vinegar', emoji: '🍶', color: '#fffde7' },
      { id: 'dish-soap', name: 'Dish Soap', emoji: '🧴', color: '#bbdefb' },
      { id: 'food-coloring', name: 'Red Food Coloring', emoji: '🔴', color: '#ff5252' },
    ],
    steps: [
      {
        instruction: 'Add baking soda to your container (about 2 tablespoons)',
        requiredIngredients: ['baking-soda'],
        explanation: 'Baking soda (sodium bicarbonate) is a base - the opposite of an acid.',
      },
      {
        instruction: 'Add a few drops of dish soap',
        requiredIngredients: ['dish-soap'],
        explanation: 'Dish soap traps the carbon dioxide gas in bubbles, making the eruption foamier!',
      },
      {
        instruction: 'Add red food coloring for a lava effect',
        requiredIngredients: ['food-coloring'],
        explanation: 'The food coloring is just for fun - it makes our volcano look like real lava!',
      },
      {
        instruction: 'Pour in the vinegar and watch the eruption!',
        requiredIngredients: ['vinegar'],
        explanation: 'Vinegar (acetic acid) reacts with the baking soda, creating carbon dioxide gas bubbles!',
      },
    ],
    reactionColors: ['#ff5252', '#ff8a80', '#ffab91', '#ff5722'],
    reactionEmoji: '🌋💥',
    scienceExplanation: 'This is an acid-base reaction! When vinegar (an acid) meets baking soda (a base), they neutralize each other and create carbon dioxide gas (CO₂). The bubbles you see are this gas escaping. Real volcanoes work differently - they have molten rock (magma) that pushes up from deep underground!',
  },
  {
    id: 'slime',
    name: 'Homemade Slime',
    emoji: '🟢',
    description: 'Make stretchy, gooey slime using simple kitchen ingredients!',
    safetyTips: [
      'Don\'t eat the slime - it\'s not food!',
      'Wash your hands before and after playing with slime',
      'Store slime in an airtight container to keep it fresh',
    ],
    ingredients: [
      { id: 'glue', name: 'White Glue', emoji: '🧪', color: '#f5f5f5' },
      { id: 'contact-solution', name: 'Contact Solution', emoji: '💧', color: '#e3f2fd' },
      { id: 'baking-soda-slime', name: 'Baking Soda', emoji: '🧂', color: '#fafafa' },
      { id: 'green-coloring', name: 'Green Food Coloring', emoji: '🟢', color: '#69f0ae' },
    ],
    steps: [
      {
        instruction: 'Pour glue into a bowl (about 1/2 cup)',
        requiredIngredients: ['glue'],
        explanation: 'Glue contains a polymer called polyvinyl acetate - long chains of molecules!',
      },
      {
        instruction: 'Add green food coloring and mix well',
        requiredIngredients: ['green-coloring'],
        explanation: 'Mix thoroughly so your slime has an even color throughout.',
      },
      {
        instruction: 'Add 1/2 teaspoon of baking soda and stir',
        requiredIngredients: ['baking-soda-slime'],
        explanation: 'Baking soda helps the slime hold together and reduces stickiness.',
      },
      {
        instruction: 'Slowly add contact solution while stirring - watch it transform!',
        requiredIngredients: ['contact-solution'],
        explanation: 'The boric acid in contact solution links the glue polymers together, creating slime!',
      },
    ],
    reactionColors: ['#69f0ae', '#00e676', '#00c853', '#1de9b6'],
    reactionEmoji: '🟢✨',
    scienceExplanation: 'Slime is created through a process called cross-linking! The glue contains long polymer chains (like spaghetti). When you add the contact solution, the boric acid acts like bridges connecting these chains together, creating a stretchy network. This is why slime can flow slowly but also bounce - it\'s both a liquid AND a solid (a non-Newtonian fluid)!',
  },
  {
    id: 'crystals',
    name: 'Sugar Crystals',
    emoji: '💎',
    description: 'Grow beautiful sugar crystals over several days!',
    safetyTips: [
      'Adult supervision needed for boiling water!',
      'Let the solution cool before handling',
      'Be patient - crystals take 3-7 days to grow',
    ],
    ingredients: [
      { id: 'water', name: 'Hot Water', emoji: '💧', color: '#e3f2fd' },
      { id: 'sugar', name: 'Sugar', emoji: '🍬', color: '#fff8e1' },
      { id: 'string', name: 'Cotton String', emoji: '🧵', color: '#f5f5f5' },
      { id: 'purple-coloring', name: 'Purple Food Coloring', emoji: '🟣', color: '#ce93d8' },
    ],
    steps: [
      {
        instruction: 'Heat water until very hot (adult help needed!)',
        requiredIngredients: ['water'],
        explanation: 'Hot water can dissolve more sugar than cold water - this is called a supersaturated solution.',
      },
      {
        instruction: 'Add sugar gradually while stirring (about 3 cups per 1 cup water)',
        requiredIngredients: ['sugar'],
        explanation: 'Keep adding sugar until no more will dissolve - the solution is now supersaturated!',
      },
      {
        instruction: 'Add purple food coloring for beautiful crystals',
        requiredIngredients: ['purple-coloring'],
        explanation: 'The color will be absorbed into the crystal structure as they grow.',
      },
      {
        instruction: 'Hang a string in the solution and wait for crystals to grow!',
        requiredIngredients: ['string'],
        explanation: 'The string gives the sugar molecules a place to start building their crystal structure.',
      },
    ],
    reactionColors: ['#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0'],
    reactionEmoji: '💎✨',
    scienceExplanation: 'Crystals form through a process called nucleation! When hot water cools down, it can\'t hold as much dissolved sugar. The extra sugar molecules need somewhere to go, so they attach to the string and to each other in a very organized pattern. Sugar molecules always arrange themselves the same way, which is why sugar crystals have their characteristic shape. This same process creates gemstones deep in the Earth!',
  },
  {
    id: 'invisible-ink',
    name: 'Invisible Ink',
    emoji: '🔍',
    description: 'Write secret messages that only appear when heated!',
    safetyTips: [
      'Use a lamp bulb or hair dryer to reveal - NOT an open flame!',
      'Adult supervision for the heating step',
      'Don\'t put paper too close to heat sources',
    ],
    ingredients: [
      { id: 'lemon-juice', name: 'Lemon Juice', emoji: '🍋', color: '#fff9c4' },
      { id: 'paper', name: 'White Paper', emoji: '📄', color: '#ffffff' },
      { id: 'cotton-swab', name: 'Cotton Swab', emoji: '🖌️', color: '#f5f5f5' },
      { id: 'heat', name: 'Heat Source (lamp)', emoji: '💡', color: '#ffecb3' },
    ],
    steps: [
      {
        instruction: 'Squeeze some lemon juice into a small bowl',
        requiredIngredients: ['lemon-juice'],
        explanation: 'Lemon juice contains citric acid and carbon compounds that react when heated.',
      },
      {
        instruction: 'Dip your cotton swab in the lemon juice',
        requiredIngredients: ['cotton-swab'],
        explanation: 'The cotton swab works like a brush to write your message.',
      },
      {
        instruction: 'Write a secret message on the paper',
        requiredIngredients: ['paper'],
        explanation: 'Write lightly - the juice is nearly invisible when wet and completely invisible when dry!',
      },
      {
        instruction: 'Hold the paper near a warm lamp and watch your message appear!',
        requiredIngredients: ['heat'],
        explanation: 'The heat causes the acid to break down and oxidize, turning brown!',
      },
    ],
    reactionColors: ['#fff9c4', '#ffe082', '#ffca28', '#a1887f'],
    reactionEmoji: '🔍📜',
    scienceExplanation: 'Invisible ink works through oxidation! Lemon juice contains carbon-based compounds. When you heat the paper, these compounds react with oxygen in the air and turn brown before the paper does. This same chemical reaction (oxidation) is what makes apple slices turn brown! Spies throughout history used similar techniques to send secret messages.',
  },
  {
    id: 'balloon',
    name: 'Self-Inflating Balloon',
    emoji: '🎈',
    description: 'Watch a balloon inflate itself using chemistry!',
    safetyTips: [
      'Don\'t inhale the gas from the balloon',
      'Be careful when stretching the balloon over the bottle',
      'Do this experiment on a washable surface',
    ],
    ingredients: [
      { id: 'bottle', name: 'Empty Bottle', emoji: '🍾', color: '#e3f2fd' },
      { id: 'balloon', name: 'Balloon', emoji: '🎈', color: '#f48fb1' },
      { id: 'vinegar-balloon', name: 'Vinegar', emoji: '🍶', color: '#fffde7' },
      { id: 'baking-soda-balloon', name: 'Baking Soda', emoji: '🧂', color: '#f5f5f5' },
    ],
    steps: [
      {
        instruction: 'Pour vinegar into the bottle (about 1/3 full)',
        requiredIngredients: ['bottle', 'vinegar-balloon'],
        explanation: 'Vinegar is acetic acid - it will react with the baking soda.',
      },
      {
        instruction: 'Put 2 teaspoons of baking soda inside the balloon',
        requiredIngredients: ['balloon', 'baking-soda-balloon'],
        explanation: 'Use a funnel or folded paper to get the baking soda into the balloon.',
      },
      {
        instruction: 'Stretch the balloon over the bottle opening (keep it tilted)',
        requiredIngredients: [],
        explanation: 'Make sure no baking soda falls into the vinegar yet!',
      },
      {
        instruction: 'Lift the balloon upright and let the baking soda fall in - watch it inflate!',
        requiredIngredients: [],
        explanation: 'The chemical reaction produces carbon dioxide gas which fills the balloon!',
      },
    ],
    reactionColors: ['#f48fb1', '#f06292', '#ec407a', '#e91e63'],
    reactionEmoji: '🎈💨',
    scienceExplanation: 'This experiment demonstrates gas production from a chemical reaction! When baking soda (sodium bicarbonate) meets vinegar (acetic acid), they create three things: water, sodium acetate (a salt), and carbon dioxide gas (CO₂). The gas takes up much more space than the original ingredients, so it expands and fills the balloon. This is the same gas that makes soda fizzy and that you breathe out!',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function KitchenLab() {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [mixedIngredients, setMixedIngredients] = useState<MixedIngredient[]>([]);
  const [showReaction, setShowReaction] = useState(false);
  const [completedExperiments, setCompletedExperiments] = useState<Set<string>>(new Set());
  const [showScience, setShowScience] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [reactionPhase, setReactionPhase] = useState(0);
  const [experimentComplete, setExperimentComplete] = useState(false);

  // Check if current step requirements are met
  const currentStepRequirementsMet = useCallback(() => {
    if (!selectedExperiment) return false;
    const step = selectedExperiment.steps[currentStep];
    if (!step) return false;

    const mixedIds = mixedIngredients.map(m => m.id);
    return step.requiredIngredients.every(id => mixedIds.includes(id));
  }, [selectedExperiment, currentStep, mixedIngredients]);

  // Add ingredient to mix
  const addIngredient = useCallback((ingredient: Ingredient) => {
    if (!selectedExperiment) return;

    // Check if already added
    if (mixedIngredients.some(m => m.id === ingredient.id)) return;

    // Check if this ingredient is needed for current step
    const step = selectedExperiment.steps[currentStep];
    if (!step.requiredIngredients.includes(ingredient.id)) return;

    setMixedIngredients(prev => [...prev, { id: ingredient.id, addedAt: Date.now() }]);
  }, [selectedExperiment, currentStep, mixedIngredients]);

  // Proceed to next step
  const nextStep = useCallback(() => {
    if (!selectedExperiment) return;

    if (currentStep < selectedExperiment.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Experiment complete - trigger reaction animation
      setShowReaction(true);
      setReactionPhase(0);

      // Animate through reaction phases
      const phaseInterval = setInterval(() => {
        setReactionPhase(prev => {
          if (prev >= 4) {
            clearInterval(phaseInterval);
            setExperimentComplete(true);
            setCompletedExperiments(prevSet => new Set([...prevSet, selectedExperiment.id]));
            return prev;
          }
          return prev + 1;
        });
      }, 500);
    }
  }, [selectedExperiment, currentStep]);

  // Start new experiment
  const startExperiment = useCallback((experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setCurrentStep(0);
    setMixedIngredients([]);
    setShowReaction(false);
    setShowScience(false);
    setShowSafety(false);
    setReactionPhase(0);
    setExperimentComplete(false);
  }, []);

  // Go back to experiment selection
  const backToSelection = useCallback(() => {
    setSelectedExperiment(null);
    setCurrentStep(0);
    setMixedIngredients([]);
    setShowReaction(false);
    setShowScience(false);
    setShowSafety(false);
    setReactionPhase(0);
    setExperimentComplete(false);
  }, []);

  // Reset current experiment
  const resetExperiment = useCallback(() => {
    setCurrentStep(0);
    setMixedIngredients([]);
    setShowReaction(false);
    setShowScience(false);
    setReactionPhase(0);
    setExperimentComplete(false);
  }, []);

  /* ---------- Render Experiment Selection ---------- */
  if (!selectedExperiment) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🧪</div>
          <h2 className="text-2xl font-bold text-white mb-2">Kitchen Science Lab</h2>
          <p className="text-sm text-purple-200">
            Choose an experiment and learn the science behind everyday reactions!
          </p>
        </div>

        {/* Progress */}
        <div className="bg-purple-800/40 rounded-lg px-4 py-3 mb-6 border border-purple-600/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-purple-200">Experiments Completed</span>
            <span className="text-lg font-bold text-yellow-400">
              {completedExperiments.size} / {EXPERIMENTS.length}
            </span>
          </div>
          <div className="h-2 bg-purple-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
              style={{ width: `${(completedExperiments.size / EXPERIMENTS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Experiment Cards */}
        <div className="grid gap-4">
          {EXPERIMENTS.map((experiment) => {
            const isCompleted = completedExperiments.has(experiment.id);
            return (
              <button
                key={experiment.id}
                onClick={() => startExperiment(experiment)}
                className={`relative rounded-xl p-4 text-left transition-all cursor-pointer border-2
                  ${isCompleted
                    ? 'bg-green-900/40 border-green-500/50 hover:border-green-400'
                    : 'bg-slate-800/60 border-slate-600/50 hover:border-purple-400 hover:bg-slate-700/60'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{experiment.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{experiment.name}</h3>
                      {isCompleted && (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-2">{experiment.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {experiment.ingredients.map((ing) => (
                        <span
                          key={ing.id}
                          className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-full"
                        >
                          {ing.emoji} {ing.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-purple-400 text-2xl flex-shrink-0">
                    {isCompleted ? '↺' : '→'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* All Complete Message */}
        {completedExperiments.size === EXPERIMENTS.length && (
          <div className="mt-6 bg-gradient-to-r from-yellow-900/60 to-orange-900/60 border border-yellow-500/50 rounded-xl p-4 text-center">
            <div className="text-4xl mb-2">🎉🔬🧑‍🔬</div>
            <h3 className="font-bold text-yellow-300 text-lg mb-1">Master Scientist!</h3>
            <p className="text-sm text-yellow-200">
              You've completed all experiments! You can do them again anytime to practice the science.
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 bg-indigo-900/40 border border-indigo-600/50 rounded-lg p-3">
          <h4 className="text-xs font-bold text-indigo-300 mb-1">Lab Tips</h4>
          <ul className="text-xs text-indigo-200/80 space-y-0.5">
            <li>- Each experiment teaches you real science concepts</li>
            <li>- Follow the steps carefully and read the explanations</li>
            <li>- Always check the safety tips before starting!</li>
          </ul>
        </div>
      </div>
    );
  }

  /* ---------- Render Active Experiment ---------- */
  const step = selectedExperiment.steps[currentStep];
  const allIngredientsForStep = step?.requiredIngredients || [];
  const canProceed = currentStepRequirementsMet();
  const isLastStep = currentStep === selectedExperiment.steps.length - 1;

  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          onClick={backToSelection}
          className="text-sm text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSafety(prev => !prev)}
            className={`text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all
              ${showSafety
                ? 'bg-red-600 text-white'
                : 'bg-red-900/60 text-red-300 border border-red-600/50 hover:bg-red-800/60'
              }`}
          >
            ⚠️ Safety Tips
          </button>
        </div>
      </div>

      {/* Experiment Title */}
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{selectedExperiment.emoji}</div>
        <h2 className="text-xl font-bold text-white">{selectedExperiment.name}</h2>
        <p className="text-xs text-purple-200 mt-1">{selectedExperiment.description}</p>
      </div>

      {/* Safety Tips Panel */}
      {showSafety && (
        <div className="mb-4 bg-red-900/40 border border-red-500/50 rounded-xl p-4">
          <h3 className="font-bold text-red-300 mb-2 flex items-center gap-2">
            <span>⚠️</span> Safety First!
          </h3>
          <ul className="text-sm text-red-200 space-y-1">
            {selectedExperiment.safetyTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex justify-center gap-2 mb-4">
        {selectedExperiment.steps.map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
              ${i < currentStep
                ? 'bg-green-500 text-white'
                : i === currentStep
                  ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                  : 'bg-slate-700 text-slate-400'
              }`}
          >
            {i < currentStep ? '✓' : i + 1}
          </div>
        ))}
      </div>

      {/* Reaction Animation (when complete) */}
      {showReaction && (
        <div className="mb-4 rounded-xl overflow-hidden relative h-48 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${selectedExperiment.reactionColors.join(', ')})`,
          }}
        >
          {/* Animated bubbles/particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-bounce"
                style={{
                  width: 8 + Math.random() * 20,
                  height: 8 + Math.random() * 20,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: 'rgba(255,255,255,0.3)',
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Reaction emoji */}
          <div className="relative z-10 text-center">
            <div
              className="text-6xl mb-2 transition-transform"
              style={{
                transform: `scale(${1 + reactionPhase * 0.2})`,
              }}
            >
              {selectedExperiment.reactionEmoji}
            </div>
            {experimentComplete && (
              <div className="text-white font-bold text-lg animate-pulse">
                Experiment Complete!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Experiment Area */}
      {!showReaction && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Mixing Bowl */}
          <div className="bg-slate-800/60 border border-slate-600/50 rounded-xl p-4">
            <h3 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
              <span>🥣</span> Mixing Area
            </h3>
            <div
              className="relative h-40 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center overflow-hidden"
              style={{
                background: mixedIngredients.length > 0
                  ? `linear-gradient(135deg, ${mixedIngredients.map(m => {
                      const ing = selectedExperiment.ingredients.find(i => i.id === m.id);
                      return ing?.color || '#444';
                    }).join(', ')})`
                  : '#1e293b',
              }}
            >
              {mixedIngredients.length === 0 ? (
                <p className="text-slate-500 text-sm text-center px-4">
                  Add ingredients here by clicking them below
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 justify-center p-2">
                  {mixedIngredients.map((mixed) => {
                    const ing = selectedExperiment.ingredients.find(i => i.id === mixed.id);
                    return ing ? (
                      <div
                        key={mixed.id}
                        className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-sm font-semibold animate-bounce"
                        style={{ animationDuration: '1s' }}
                      >
                        {ing.emoji} {ing.name}
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Available Ingredients */}
          <div className="bg-slate-800/60 border border-slate-600/50 rounded-xl p-4">
            <h3 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
              <span>🧪</span> Ingredients
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {selectedExperiment.ingredients.map((ingredient) => {
                const isNeeded = allIngredientsForStep.includes(ingredient.id);
                const isAdded = mixedIngredients.some(m => m.id === ingredient.id);
                const canAdd = isNeeded && !isAdded;

                return (
                  <button
                    key={ingredient.id}
                    onClick={() => canAdd && addIngredient(ingredient)}
                    disabled={!canAdd}
                    className={`rounded-lg p-3 text-center transition-all border-2 cursor-pointer
                      ${isAdded
                        ? 'bg-green-900/60 border-green-500 opacity-60 cursor-not-allowed'
                        : canAdd
                          ? 'bg-purple-900/60 border-purple-400 hover:bg-purple-800/60 animate-pulse'
                          : 'bg-slate-700/40 border-slate-600 opacity-40 cursor-not-allowed'
                      }`}
                  >
                    <div className="text-2xl mb-1">{ingredient.emoji}</div>
                    <div className="text-xs text-white font-semibold">{ingredient.name}</div>
                    {isAdded && <div className="text-xs text-green-400 mt-1">Added!</div>}
                    {isNeeded && !isAdded && <div className="text-xs text-purple-300 mt-1">Click to add</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Current Step Instructions */}
      {!showReaction && step && (
        <div className="bg-indigo-900/40 border border-indigo-600/50 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              {currentStep + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">{step.instruction}</h4>
              <p className="text-sm text-indigo-200">{step.explanation}</p>
            </div>
          </div>

          {/* Step Requirements */}
          {allIngredientsForStep.length > 0 && (
            <div className="mt-3 pt-3 border-t border-indigo-700/50">
              <p className="text-xs text-indigo-300 mb-2">Required for this step:</p>
              <div className="flex flex-wrap gap-2">
                {allIngredientsForStep.map((ingId) => {
                  const ing = selectedExperiment.ingredients.find(i => i.id === ingId);
                  const isAdded = mixedIngredients.some(m => m.id === ingId);
                  return ing ? (
                    <span
                      key={ingId}
                      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1
                        ${isAdded
                          ? 'bg-green-600/40 text-green-200 border border-green-500/50'
                          : 'bg-slate-700/60 text-slate-300 border border-slate-600/50'
                        }`}
                    >
                      {isAdded ? '✓' : '○'} {ing.emoji} {ing.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {!showReaction && (
          <>
            <button
              onClick={nextStep}
              disabled={!canProceed}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer
                ${canProceed
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-900/50'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
            >
              {isLastStep ? '🧪 Complete Experiment!' : '→ Next Step'}
            </button>
            <button
              onClick={resetExperiment}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm bg-slate-700 hover:bg-slate-600 text-white cursor-pointer"
            >
              ↺ Reset
            </button>
          </>
        )}

        {showReaction && experimentComplete && (
          <>
            <button
              onClick={() => setShowScience(prev => !prev)}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer
                ${showScience
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/50'
                }`}
            >
              🔬 {showScience ? 'Hide' : 'Show'} Science Explanation
            </button>
            <button
              onClick={resetExperiment}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm bg-purple-700 hover:bg-purple-600 text-white cursor-pointer"
            >
              ↺ Do It Again
            </button>
            <button
              onClick={backToSelection}
              className="px-4 py-2.5 rounded-lg font-semibold text-sm bg-slate-700 hover:bg-slate-600 text-white cursor-pointer"
            >
              ← Choose Another
            </button>
          </>
        )}
      </div>

      {/* Science Explanation */}
      {showScience && experimentComplete && (
        <div className="mt-4 bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border border-cyan-500/50 rounded-xl p-4">
          <h3 className="font-bold text-cyan-300 mb-2 flex items-center gap-2">
            <span>🔬</span> The Science Behind It
          </h3>
          <p className="text-sm text-cyan-100 leading-relaxed">
            {selectedExperiment.scienceExplanation}
          </p>
        </div>
      )}

      {/* Completion Badge */}
      {experimentComplete && (
        <div className="mt-4 bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border border-yellow-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <h3 className="font-bold text-yellow-300 mb-1">Great Job, Scientist!</h3>
          <p className="text-sm text-yellow-200/80">
            You've completed the {selectedExperiment.name} experiment!
            {completedExperiments.size < EXPERIMENTS.length && (
              <span> Try another experiment to learn more science!</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
