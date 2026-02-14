import { useState, useEffect, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

type ChocolateType = "dark" | "milk" | "white";

interface ProcessStage {
  id: string;
  name: string;
  emoji: string;
  description: string;
  fact: string;
  settings: {
    temperature?: { min: number; max: number; optimal: number; unit: string };
    time?: { min: number; max: number; optimal: number; unit: string };
    speed?: { min: number; max: number; optimal: number; unit: string };
  };
}

interface ChocolateRecord {
  type: ChocolateType;
  quality: number;
  timestamp: number;
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const CHOCOLATE_TYPES: Record<ChocolateType, { name: string; emoji: string; color: string; description: string }> = {
  dark: {
    name: "Dark Chocolate",
    emoji: "🍫",
    color: "#3D1F0D",
    description: "70% cacao - rich and intense",
  },
  milk: {
    name: "Milk Chocolate",
    emoji: "🍫",
    color: "#7B3F00",
    description: "Creamy with milk powder",
  },
  white: {
    name: "White Chocolate",
    emoji: "🍫",
    color: "#FFF8DC",
    description: "Made from cocoa butter only",
  },
};

const PROCESS_STAGES: ProcessStage[] = [
  {
    id: "roasting",
    name: "Roasting",
    emoji: "🔥",
    description: "Roast the cacao beans to develop flavor",
    fact: "Roasting transforms raw cacao beans! The heat triggers the Maillard reaction - the same chemistry that makes toast brown and delicious. This creates over 600 flavor compounds that give chocolate its complex taste.",
    settings: {
      temperature: { min: 100, max: 180, optimal: 130, unit: "°C" },
      time: { min: 10, max: 40, optimal: 25, unit: "min" },
    },
  },
  {
    id: "grinding",
    name: "Grinding",
    emoji: "⚙️",
    description: "Grind roasted nibs into chocolate liquor",
    fact: "Cacao nibs are about 50% cocoa butter (fat). When ground, the heat from friction melts this fat, turning solid nibs into liquid 'chocolate liquor' - despite the name, it contains no alcohol! Ancient Mayans used stone metates to grind cacao by hand.",
    settings: {
      speed: { min: 20, max: 100, optimal: 60, unit: "RPM" },
      time: { min: 15, max: 45, optimal: 30, unit: "min" },
    },
  },
  {
    id: "conching",
    name: "Conching",
    emoji: "🌀",
    description: "Mix and aerate for smoothness",
    fact: "Conching was invented by Rodolphe Lindt in 1879! The process removes unwanted acidic flavors and moisture while developing smooth texture. Premium chocolates are conched for up to 72 hours! The machine is named after the Spanish word 'concha' (shell) due to its original shape.",
    settings: {
      temperature: { min: 40, max: 80, optimal: 55, unit: "°C" },
      time: { min: 6, max: 48, optimal: 24, unit: "hours" },
    },
  },
  {
    id: "tempering",
    name: "Tempering",
    emoji: "🌡️",
    description: "Control cooling for perfect crystals",
    fact: "This is the trickiest step! Cocoa butter can crystallize in 6 different forms (polymorphs), but only Form V gives that satisfying SNAP and glossy shine. Tempering involves precise heating and cooling to encourage Form V crystals. Poorly tempered chocolate looks dull and crumbly.",
    settings: {
      temperature: { min: 26, max: 34, optimal: 31, unit: "°C" },
    },
  },
  {
    id: "molding",
    name: "Molding",
    emoji: "🍫",
    description: "Pour into molds and cool",
    fact: "The final step! Tempered chocolate is poured into molds and vibrated to remove air bubbles. It's cooled slowly to maintain the crystal structure. Professional chocolatiers cool chocolate at exactly 15-18°C. The chocolate shrinks slightly as it cools, making it pop out of the mold easily!",
    settings: {
      temperature: { min: 10, max: 25, optimal: 16, unit: "°C" },
      time: { min: 15, max: 45, optimal: 30, unit: "min" },
    },
  },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function calculateQuality(
  value: number,
  optimal: number,
  min: number,
  max: number
): number {
  const distance = Math.abs(value - optimal);
  const maxDistance = Math.max(optimal - min, max - optimal);
  const quality = Math.max(0, 100 - (distance / maxDistance) * 100);
  return Math.round(quality);
}

function getQualityLabel(quality: number): { label: string; color: string } {
  if (quality >= 90) return { label: "Perfect!", color: "#10B981" };
  if (quality >= 75) return { label: "Excellent", color: "#34D399" };
  if (quality >= 60) return { label: "Good", color: "#FBBF24" };
  if (quality >= 40) return { label: "Fair", color: "#F59E0B" };
  return { label: "Needs Work", color: "#EF4444" };
}

function getStarRating(quality: number): string {
  if (quality >= 90) return "★★★★★";
  if (quality >= 75) return "★★★★☆";
  if (quality >= 60) return "★★★☆☆";
  if (quality >= 40) return "★★☆☆☆";
  return "★☆☆☆☆";
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ChocolateFactory() {
  // Game state
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedChocolate, setSelectedChocolate] = useState<ChocolateType>("dark");
  const [isProcessing, setIsProcessing] = useState(false);
  const [stageComplete, setStageComplete] = useState<boolean[]>([false, false, false, false, false]);
  const [showFact, setShowFact] = useState(false);

  // Settings for current stage
  const [temperature, setTemperature] = useState(50);
  const [time, setTime] = useState(20);
  const [speed, setSpeed] = useState(50);

  // Quality tracking
  const [stageQualities, setStageQualities] = useState<number[]>([]);
  const [chocolatesMade, setChocolatesMade] = useState<ChocolateRecord[]>([]);

  // Animation
  const [processProgress, setProcessProgress] = useState(0);

  const stage = PROCESS_STAGES[currentStage];
  const chocolateInfo = CHOCOLATE_TYPES[selectedChocolate];

  // Initialize settings when stage changes
  useEffect(() => {
    const s = PROCESS_STAGES[currentStage];
    if (s.settings.temperature) {
      setTemperature(Math.round((s.settings.temperature.min + s.settings.temperature.max) / 2));
    }
    if (s.settings.time) {
      setTime(Math.round((s.settings.time.min + s.settings.time.max) / 2));
    }
    if (s.settings.speed) {
      setSpeed(Math.round((s.settings.speed.min + s.settings.speed.max) / 2));
    }
    setProcessProgress(0);
    setShowFact(false);
  }, [currentStage]);

  // Process animation
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setProcessProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isProcessing]);

  // Handle process completion
  useEffect(() => {
    if (processProgress >= 100 && isProcessing) {
      setIsProcessing(false);

      // Calculate quality for this stage
      let qualities: number[] = [];
      const s = stage.settings;

      if (s.temperature) {
        qualities.push(calculateQuality(temperature, s.temperature.optimal, s.temperature.min, s.temperature.max));
      }
      if (s.time) {
        qualities.push(calculateQuality(time, s.time.optimal, s.time.min, s.time.max));
      }
      if (s.speed) {
        qualities.push(calculateQuality(speed, s.speed.optimal, s.speed.min, s.speed.max));
      }

      const avgQuality = Math.round(qualities.reduce((a, b) => a + b, 0) / qualities.length);

      // Use functional update to ensure proper state management
      setStageQualities(prev => [...prev, avgQuality]);
      setStageComplete(prev => {
        const next = [...prev];
        next[currentStage] = true;
        return next;
      });
      setShowFact(true);
    }
  }, [processProgress, isProcessing, stage, temperature, time, speed, currentStage]);

  const handleStartProcess = useCallback(() => {
    setIsProcessing(true);
    setProcessProgress(0);
  }, []);

  const handleNextStage = useCallback(() => {
    if (currentStage < PROCESS_STAGES.length - 1) {
      setCurrentStage(prev => prev + 1);
    } else {
      // Chocolate complete! Calculate final quality
      const finalQuality = Math.round(
        stageQualities.reduce((a, b) => a + b, 0) / stageQualities.length
      );

      // Use functional update for proper state management
      setChocolatesMade(prev => [
        ...prev,
        { type: selectedChocolate, quality: finalQuality, timestamp: Date.now() }
      ]);

      // Reset for new chocolate
      setCurrentStage(0);
      setStageComplete([false, false, false, false, false]);
      setStageQualities([]);
      setShowFact(false);
    }
  }, [currentStage, stageQualities, selectedChocolate]);

  const handleReset = useCallback(() => {
    setCurrentStage(0);
    setStageComplete([false, false, false, false, false]);
    setStageQualities([]);
    setIsProcessing(false);
    setProcessProgress(0);
    setShowFact(false);
  }, []);

  const totalChocolates = chocolatesMade.length;
  const averageQuality = totalChocolates > 0
    ? Math.round(chocolatesMade.reduce((a, b) => a + b.quality, 0) / totalChocolates)
    : 0;

  /* ------------------------------------------------------------------ */
  /*  RENDER                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div className="min-h-full rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 sm:p-6 font-sans max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">🍫🏭</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-700 bg-clip-text text-transparent">
          Chocolate Factory
        </h1>
        <p className="text-amber-700 text-sm mt-1">
          From Bean to Bar - Make your own chocolate!
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-amber-100 flex items-center gap-2">
          <span className="text-lg">🍫</span>
          <span className="text-amber-800 font-semibold">{totalChocolates} Made</span>
        </div>
        {totalChocolates > 0 && (
          <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-amber-100 flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span className="text-amber-800 font-semibold">Avg: {averageQuality}%</span>
          </div>
        )}
      </div>

      {/* Chocolate Type Selector */}
      {currentStage === 0 && !stageComplete[0] && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 mb-6">
          <h3 className="text-lg font-bold text-amber-800 mb-3 text-center">
            Choose Your Chocolate Type
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {(Object.entries(CHOCOLATE_TYPES) as [ChocolateType, typeof CHOCOLATE_TYPES.dark][]).map(
              ([type, info]) => (
                <button
                  key={type}
                  onClick={() => setSelectedChocolate(type)}
                  className={`flex-1 min-w-[100px] max-w-[150px] p-3 rounded-xl border-2 transition-all ${
                    selectedChocolate === type
                      ? "border-amber-500 bg-amber-50 shadow-md scale-105"
                      : "border-gray-200 bg-white hover:border-amber-300"
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-lg mx-auto mb-2"
                    style={{ backgroundColor: info.color }}
                  />
                  <div className="font-bold text-sm text-gray-800">{info.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{info.description}</div>
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 overflow-x-auto px-2">
        {PROCESS_STAGES.map((s, i) => {
          const isComplete = stageComplete[i];
          const isCurrent = i === currentStage;
          return (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex flex-col items-center transition-all ${
                  isCurrent ? "scale-110" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl transition-all ${
                    isComplete
                      ? "bg-green-500 text-white shadow-lg"
                      : isCurrent
                        ? "bg-amber-500 text-white shadow-lg ring-4 ring-amber-200"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {isComplete ? "✓" : s.emoji}
                </div>
                <span
                  className={`text-xs mt-1 font-medium hidden sm:block ${
                    isCurrent ? "text-amber-700" : isComplete ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {s.name}
                </span>
              </div>
              {i < PROCESS_STAGES.length - 1 && (
                <div
                  className={`w-4 sm:w-8 h-1 mx-1 rounded ${
                    stageComplete[i] ? "bg-green-400" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Stage Card */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-amber-100 mb-6">
        {/* Stage Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-md">
            {stage.emoji}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Step {currentStage + 1}: {stage.name}
            </h2>
            <p className="text-gray-500 text-sm">{stage.description}</p>
          </div>
        </div>

        {/* Visual Process Display */}
        <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-6 mb-5 overflow-hidden">
          {/* Animated background */}
          {isProcessing && (
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"
                style={{ animationDuration: "1s" }}
              />
            </div>
          )}

          {/* Process visualization */}
          <div className="flex items-center justify-center gap-4 relative z-10">
            {/* Input beans/liquor */}
            <div className="text-center">
              <div className="text-4xl mb-1">
                {currentStage === 0 ? "🫘" : currentStage === 1 ? "🫛" : currentStage < 4 ? "🟫" : "🍫"}
              </div>
              <div className="text-xs text-amber-700">
                {currentStage === 0 ? "Raw Beans" : currentStage === 1 ? "Roasted Nibs" : "Chocolate"}
              </div>
            </div>

            {/* Arrow with progress */}
            <div className="flex-1 max-w-[120px]">
              <div className="relative h-3 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-100"
                  style={{ width: `${processProgress}%` }}
                />
              </div>
              <div className="text-center text-xs text-amber-600 mt-1">
                {isProcessing ? `${processProgress}%` : stageComplete[currentStage] ? "Done!" : "Ready"}
              </div>
            </div>

            {/* Output */}
            <div className="text-center">
              <div
                className="text-4xl mb-1 transition-opacity duration-500"
                style={{ opacity: stageComplete[currentStage] ? 1 : 0.3 }}
              >
                {currentStage === 0 ? "🫛" : currentStage === 4 ? "🍫" : "🟫"}
              </div>
              <div className="text-xs text-amber-700">
                {currentStage === 0 ? "Roasted" : currentStage === 4 ? "Finished!" : "Processed"}
              </div>
            </div>
          </div>

          {/* Current chocolate type indicator */}
          <div className="mt-4 text-center">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: chocolateInfo.color + "20",
                color: selectedChocolate === "white" ? "#92400E" : chocolateInfo.color,
              }}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: chocolateInfo.color }}
              />
              Making: {chocolateInfo.name}
            </span>
          </div>
        </div>

        {/* Controls */}
        {!stageComplete[currentStage] && (
          <div className="space-y-4 mb-5">
            {stage.settings.temperature && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    🌡️ Temperature
                  </span>
                  <span className="text-lg font-bold text-amber-600">
                    {temperature}{stage.settings.temperature.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={stage.settings.temperature.min}
                  max={stage.settings.temperature.max}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  disabled={isProcessing}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 via-yellow-300 to-red-400 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{stage.settings.temperature.min}{stage.settings.temperature.unit}</span>
                  <span className="text-green-600 font-medium">
                    Optimal: {stage.settings.temperature.optimal}{stage.settings.temperature.unit}
                  </span>
                  <span>{stage.settings.temperature.max}{stage.settings.temperature.unit}</span>
                </div>
              </div>
            )}

            {stage.settings.time && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    ⏱️ Time
                  </span>
                  <span className="text-lg font-bold text-amber-600">
                    {time} {stage.settings.time.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={stage.settings.time.min}
                  max={stage.settings.time.max}
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  disabled={isProcessing}
                  className="w-full h-2 bg-gradient-to-r from-green-200 to-green-500 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{stage.settings.time.min} {stage.settings.time.unit}</span>
                  <span className="text-green-600 font-medium">
                    Optimal: {stage.settings.time.optimal} {stage.settings.time.unit}
                  </span>
                  <span>{stage.settings.time.max} {stage.settings.time.unit}</span>
                </div>
              </div>
            )}

            {stage.settings.speed && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    ⚡ Speed
                  </span>
                  <span className="text-lg font-bold text-amber-600">
                    {speed} {stage.settings.speed.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={stage.settings.speed.min}
                  max={stage.settings.speed.max}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  disabled={isProcessing}
                  className="w-full h-2 bg-gradient-to-r from-purple-200 to-purple-500 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{stage.settings.speed.min} {stage.settings.speed.unit}</span>
                  <span className="text-green-600 font-medium">
                    Optimal: {stage.settings.speed.optimal} {stage.settings.speed.unit}
                  </span>
                  <span>{stage.settings.speed.max} {stage.settings.speed.unit}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quality Result */}
        {stageComplete[currentStage] && stageQualities.length > currentStage && (
          <div className="mb-5">
            <div
              className="rounded-xl p-4 text-center"
              style={{
                backgroundColor: getQualityLabel(stageQualities[currentStage]).color + "15",
                borderColor: getQualityLabel(stageQualities[currentStage]).color,
                borderWidth: 2,
              }}
            >
              <div className="text-2xl mb-1">{getStarRating(stageQualities[currentStage])}</div>
              <div
                className="text-xl font-bold"
                style={{ color: getQualityLabel(stageQualities[currentStage]).color }}
              >
                {getQualityLabel(stageQualities[currentStage]).label}
              </div>
              <div className="text-gray-600 text-sm mt-1">
                Stage Quality: {stageQualities[currentStage]}%
              </div>
            </div>
          </div>
        )}

        {/* Educational Fact */}
        {showFact && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-dashed border-blue-200 mb-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔬</div>
              <div>
                <div className="font-bold text-blue-800 mb-1">Science Corner</div>
                <p className="text-sm text-gray-700 leading-relaxed">{stage.fact}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {!stageComplete[currentStage] && !isProcessing && (
            <button
              onClick={handleStartProcess}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Start {stage.name} 🚀
            </button>
          )}

          {isProcessing && (
            <button
              disabled
              className="px-8 py-3 bg-gray-300 text-gray-500 font-bold rounded-full cursor-not-allowed"
            >
              Processing... ⏳
            </button>
          )}

          {stageComplete[currentStage] && (
            <>
              <button
                onClick={handleNextStage}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {currentStage < PROCESS_STAGES.length - 1 ? "Next Step →" : "Finish Chocolate! 🎉"}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-white text-amber-700 font-semibold rounded-full border-2 border-amber-300 hover:bg-amber-50 transition-all"
              >
                Start Over
              </button>
            </>
          )}

          {!showFact && !isProcessing && !stageComplete[currentStage] && (
            <button
              onClick={() => setShowFact(true)}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full border-2 border-blue-200 hover:bg-blue-50 transition-all"
            >
              🔬 Learn More
            </button>
          )}
        </div>
      </div>

      {/* Chocolates Made Gallery */}
      {chocolatesMade.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-lg border border-amber-100">
          <h3 className="text-lg font-bold text-amber-800 mb-4 text-center">
            🏆 Your Chocolate Collection
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {chocolatesMade.map((choco, i) => {
              const info = CHOCOLATE_TYPES[choco.type];
              const qualityInfo = getQualityLabel(choco.quality);
              return (
                <div
                  key={i}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 text-center border border-amber-100"
                >
                  <div
                    className="w-12 h-8 rounded-lg mx-auto mb-2 shadow-sm"
                    style={{ backgroundColor: info.color }}
                  />
                  <div className="text-xs font-semibold text-gray-700">{info.name}</div>
                  <div className="text-xs mt-1" style={{ color: qualityInfo.color }}>
                    {getStarRating(choco.quality)}
                  </div>
                  <div className="text-xs text-gray-500">{choco.quality}%</div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="mt-4 pt-4 border-t border-amber-100 flex flex-wrap gap-4 justify-center text-sm">
            <div className="text-center">
              <div className="font-bold text-amber-800">{chocolatesMade.filter(c => c.type === "dark").length}</div>
              <div className="text-gray-500">Dark</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-amber-800">{chocolatesMade.filter(c => c.type === "milk").length}</div>
              <div className="text-gray-500">Milk</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-amber-800">{chocolatesMade.filter(c => c.type === "white").length}</div>
              <div className="text-gray-500">White</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">{chocolatesMade.filter(c => c.quality >= 90).length}</div>
              <div className="text-gray-500">Perfect!</div>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-6 text-center">
        <div className="inline-block bg-amber-100 rounded-lg px-4 py-2 text-sm text-amber-700">
          💡 <strong>Tip:</strong> Watch the optimal values - getting close to them means higher quality chocolate!
        </div>
      </div>
    </div>
  );
}
