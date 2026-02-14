import { useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Festival {
  id: string;
  name: string;
  icon: string;
  country: string;
  flag: string;
  month: number; // 1-12
  description: string;
  traditions: string;
  category: FestivalCategory;
}

type FestivalCategory =
  | "religious"
  | "harvest"
  | "new-year"
  | "cultural"
  | "seasonal"
  | "national";

interface PlacedFestival {
  festivalId: string;
  monthPlaced: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MONTHS = [
  { id: 1, name: "January", short: "Jan", season: "winter" },
  { id: 2, name: "February", short: "Feb", season: "winter" },
  { id: 3, name: "March", short: "Mar", season: "spring" },
  { id: 4, name: "April", short: "Apr", season: "spring" },
  { id: 5, name: "May", short: "May", season: "spring" },
  { id: 6, name: "June", short: "Jun", season: "summer" },
  { id: 7, name: "July", short: "Jul", season: "summer" },
  { id: 8, name: "August", short: "Aug", season: "summer" },
  { id: 9, name: "September", short: "Sep", season: "autumn" },
  { id: 10, name: "October", short: "Oct", season: "autumn" },
  { id: 11, name: "November", short: "Nov", season: "autumn" },
  { id: 12, name: "December", short: "Dec", season: "winter" },
];

const SEASON_COLORS: Record<string, string> = {
  winter: "from-blue-600 to-cyan-600",
  spring: "from-green-500 to-emerald-500",
  summer: "from-yellow-500 to-orange-500",
  autumn: "from-orange-600 to-red-600",
};

const SEASON_ICONS: Record<string, string> = {
  winter: "\u2744\uFE0F",
  spring: "\uD83C\uDF38",
  summer: "\u2600\uFE0F",
  autumn: "\uD83C\uDF42",
};

const CATEGORY_COLORS: Record<FestivalCategory, string> = {
  religious: "bg-purple-500",
  harvest: "bg-amber-500",
  "new-year": "bg-pink-500",
  cultural: "bg-blue-500",
  seasonal: "bg-green-500",
  national: "bg-red-500",
};

const CATEGORY_LABELS: Record<FestivalCategory, string> = {
  religious: "Religious",
  harvest: "Harvest",
  "new-year": "New Year",
  cultural: "Cultural",
  seasonal: "Seasonal",
  national: "National",
};

const FESTIVALS: Festival[] = [
  // January
  {
    id: "new-year-day",
    name: "New Year's Day",
    icon: "\uD83C\uDF89",
    country: "Worldwide",
    flag: "\uD83C\uDF0D",
    month: 1,
    description:
      "The first day of the year in the Gregorian calendar, celebrated with fireworks, parties, and resolutions.",
    traditions:
      "Watching fireworks at midnight, making resolutions, singing Auld Lang Syne, and spending time with family.",
    category: "new-year",
  },
  // February
  {
    id: "chinese-new-year",
    name: "Chinese New Year",
    icon: "\uD83E\uDDED",
    country: "China",
    flag: "\uD83C\uDDE8\uD83C\uDDF3",
    month: 2,
    description:
      "Also known as Spring Festival, it's the most important traditional Chinese holiday celebrating the lunar new year.",
    traditions:
      "Red envelopes (hongbao), dragon dances, family reunions, lantern festivals, and eating dumplings.",
    category: "new-year",
  },
  {
    id: "carnival",
    name: "Carnival",
    icon: "\uD83C\uDFAD",
    country: "Brazil",
    flag: "\uD83C\uDDE7\uD83C\uDDF7",
    month: 2,
    description:
      "The world's biggest carnival with spectacular parades, samba dancing, and colorful costumes in Rio de Janeiro.",
    traditions:
      "Samba parades, elaborate costumes, street parties (blocos), and dancing until dawn.",
    category: "cultural",
  },
  // March
  {
    id: "holi",
    name: "Holi",
    icon: "\uD83C\uDFA8",
    country: "India",
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
    month: 3,
    description:
      "The Festival of Colors celebrates the victory of good over evil and the arrival of spring.",
    traditions:
      "Throwing colored powder (gulal), water balloons, bonfires the night before, and eating sweets like gujiya.",
    category: "religious",
  },
  {
    id: "st-patricks",
    name: "St. Patrick's Day",
    icon: "\u2618\uFE0F",
    country: "Ireland",
    flag: "\uD83C\uDDEE\uD83C\uDDEA",
    month: 3,
    description:
      "A cultural and religious celebration honoring Saint Patrick, the patron saint of Ireland.",
    traditions:
      "Wearing green, parades, traditional Irish music, and celebrating Irish culture worldwide.",
    category: "cultural",
  },
  // April
  {
    id: "easter",
    name: "Easter",
    icon: "\uD83D\uDC23",
    country: "Worldwide",
    flag: "\uD83C\uDF0D",
    month: 4,
    description:
      "A Christian holiday celebrating the resurrection of Jesus Christ, also associated with spring themes.",
    traditions:
      "Easter egg hunts, decorating eggs, Easter bunny, church services, and family gatherings.",
    category: "religious",
  },
  {
    id: "songkran",
    name: "Songkran",
    icon: "\uD83D\uDCA6",
    country: "Thailand",
    flag: "\uD83C\uDDF9\uD83C\uDDED",
    month: 4,
    description:
      "Thai New Year festival known for its massive water fights symbolizing cleansing and renewal.",
    traditions:
      "Water fights, visiting temples, paying respect to elders, and building sand pagodas.",
    category: "new-year",
  },
  // May
  {
    id: "cinco-de-mayo",
    name: "Cinco de Mayo",
    icon: "\uD83C\uDF85",
    country: "Mexico",
    flag: "\uD83C\uDDF2\uD83C\uDDFD",
    month: 5,
    description:
      "Commemorates the Mexican Army's victory over the French Empire at the Battle of Puebla in 1862.",
    traditions:
      "Parades, mariachi music, folk dancing, traditional Mexican food, and wearing red, white, and green.",
    category: "national",
  },
  // June
  {
    id: "midsummer",
    name: "Midsummer",
    icon: "\uD83C\uDF3B",
    country: "Sweden",
    flag: "\uD83C\uDDF8\uD83C\uDDEA",
    month: 6,
    description:
      "One of the most celebrated Swedish holidays, marking the summer solstice with dancing and festivities.",
    traditions:
      "Dancing around the maypole, wearing flower crowns, eating herring and strawberries, and staying up late.",
    category: "seasonal",
  },
  // July
  {
    id: "independence-day",
    name: "Independence Day",
    icon: "\uD83C\uDF86",
    country: "USA",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    month: 7,
    description:
      "Also known as the Fourth of July, celebrating the Declaration of Independence of the United States.",
    traditions:
      "Fireworks, barbecues, parades, patriotic music, and displaying the American flag.",
    category: "national",
  },
  {
    id: "bastille-day",
    name: "Bastille Day",
    icon: "\uD83C\uDDEB\uD83C\uDDF7",
    country: "France",
    flag: "\uD83C\uDDEB\uD83C\uDDF7",
    month: 7,
    description:
      "The French National Day commemorating the storming of the Bastille during the French Revolution.",
    traditions:
      "Military parade on Champs-\u00C9lys\u00E9es, fireworks at Eiffel Tower, street parties, and picnics.",
    category: "national",
  },
  // August
  {
    id: "obon",
    name: "Obon Festival",
    icon: "\uD83C\uDFEE",
    country: "Japan",
    flag: "\uD83C\uDDEF\uD83C\uDDF5",
    month: 8,
    description:
      "A Japanese Buddhist festival honoring the spirits of ancestors with dance and lanterns.",
    traditions:
      "Bon Odori dancing, floating lanterns, visiting family graves, and family reunions.",
    category: "religious",
  },
  // September
  {
    id: "mid-autumn",
    name: "Mid-Autumn Festival",
    icon: "\uD83E\uDD6E",
    country: "China",
    flag: "\uD83C\uDDE8\uD83C\uDDF3",
    month: 9,
    description:
      "Also known as the Moon Festival, celebrating the harvest moon with mooncakes and family gatherings.",
    traditions:
      "Eating mooncakes, lighting lanterns, admiring the full moon, and telling the legend of Chang'e.",
    category: "harvest",
  },
  // October
  {
    id: "oktoberfest",
    name: "Oktoberfest",
    icon: "\uD83C\uDF7A",
    country: "Germany",
    flag: "\uD83C\uDDE9\uD83C\uDDEA",
    month: 10,
    description:
      "The world's largest folk festival, originally celebrating a royal wedding in Munich, Bavaria.",
    traditions:
      "Traditional Bavarian costumes, folk music, pretzels, sausages, and carnival rides.",
    category: "cultural",
  },
  {
    id: "diwali",
    name: "Diwali",
    icon: "\uD83E\uDE94",
    country: "India",
    flag: "\uD83C\uDDEE\uD83C\uDDF3",
    month: 10,
    description:
      "The Festival of Lights, one of the most important Hindu festivals celebrating light over darkness.",
    traditions:
      "Lighting oil lamps (diyas), rangoli art, fireworks, exchanging sweets, and wearing new clothes.",
    category: "religious",
  },
  {
    id: "halloween",
    name: "Halloween",
    icon: "\uD83C\uDF83",
    country: "USA",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    month: 10,
    description:
      "A spooky celebration with origins in ancient Celtic festivals, now featuring costumes and candy.",
    traditions:
      "Trick-or-treating, carving pumpkins, wearing costumes, haunted houses, and bobbing for apples.",
    category: "cultural",
  },
  // November
  {
    id: "day-of-dead",
    name: "D\u00EDa de los Muertos",
    icon: "\uD83D\uDC80",
    country: "Mexico",
    flag: "\uD83C\uDDF2\uD83C\uDDFD",
    month: 11,
    description:
      "The Day of the Dead, a Mexican holiday honoring deceased loved ones with colorful altars and celebrations.",
    traditions:
      "Building ofrendas (altars), sugar skulls, marigold flowers, visiting cemeteries, and pan de muerto.",
    category: "cultural",
  },
  {
    id: "thanksgiving",
    name: "Thanksgiving",
    icon: "\uD83E\uDD83",
    country: "USA",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    month: 11,
    description:
      "A harvest festival and day of giving thanks, celebrated with a feast of turkey and traditional dishes.",
    traditions:
      "Turkey dinner, pumpkin pie, parades, football, and expressing gratitude with family.",
    category: "harvest",
  },
  // December
  {
    id: "hanukkah",
    name: "Hanukkah",
    icon: "\uD83D\uDD4E",
    country: "Israel",
    flag: "\uD83C\uDDEE\uD83C\uDDF1",
    month: 12,
    description:
      "The Jewish Festival of Lights, commemorating the rededication of the Second Temple in Jerusalem.",
    traditions:
      "Lighting the menorah, playing dreidel, eating latkes and sufganiyot, and exchanging gifts.",
    category: "religious",
  },
  {
    id: "christmas",
    name: "Christmas",
    icon: "\uD83C\uDF84",
    country: "Worldwide",
    flag: "\uD83C\uDF0D",
    month: 12,
    description:
      "A Christian holiday celebrating the birth of Jesus Christ, now also a secular winter celebration.",
    traditions:
      "Decorating Christmas trees, exchanging gifts, Santa Claus, caroling, and family feasts.",
    category: "religious",
  },
  {
    id: "kwanzaa",
    name: "Kwanzaa",
    icon: "\uD83D\uDD6F\uFE0F",
    country: "USA",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    month: 12,
    description:
      "An African American celebration of family, community, and culture held from December 26 to January 1.",
    traditions:
      "Lighting the kinara, African drumming, storytelling, feasting, and discussing the seven principles.",
    category: "cultural",
  },
];

const POINTS_CORRECT = 10;
const TOTAL_FESTIVALS_TO_PLACE = 8;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function selectRandomFestivals(count: number): Festival[] {
  const shuffled = shuffleArray(FESTIVALS);
  return shuffled.slice(0, count);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FestivalCalendar() {
  const [gameState, setGameState] = useState<
    "intro" | "playing" | "review" | "complete"
  >("intro");
  const [availableFestivals, setAvailableFestivals] = useState<Festival[]>([]);
  const [placedFestivals, setPlacedFestivals] = useState<PlacedFestival[]>([]);
  const [draggedFestival, setDraggedFestival] = useState<Festival | null>(null);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [showInfo, setShowInfo] = useState<Festival | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "correct" | "wrong";
    message: string;
    festivalId: string;
  } | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Start new game
  const startGame = useCallback(() => {
    const selected = selectRandomFestivals(TOTAL_FESTIVALS_TO_PLACE);
    setAvailableFestivals(selected);
    setPlacedFestivals([]);
    setScore(0);
    setDraggedFestival(null);
    setSelectedFestival(null);
    setShowInfo(null);
    setFeedback(null);
    setReviewIndex(0);
    setGameState("playing");
  }, []);

  // Handle drag start
  const handleDragStart = useCallback(
    (festival: Festival, e: React.DragEvent) => {
      setDraggedFestival(festival);
      setSelectedFestival(null);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", festival.id);
    },
    []
  );

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedFestival(null);
  }, []);

  // Handle drop on month
  const handleDrop = useCallback(
    (monthId: number, e: React.DragEvent) => {
      e.preventDefault();
      if (!draggedFestival) return;

      // Check if already placed
      const alreadyPlaced = placedFestivals.find(
        (p) => p.festivalId === draggedFestival.id
      );
      if (alreadyPlaced) return;

      const isCorrect = draggedFestival.month === monthId;

      // Add to placed festivals
      setPlacedFestivals((prev) => [
        ...prev,
        { festivalId: draggedFestival.id, monthPlaced: monthId },
      ]);

      // Update score with functional update
      if (isCorrect) {
        setScore((prevScore) => prevScore + POINTS_CORRECT);
        setFeedback({
          type: "correct",
          message: `Correct! ${draggedFestival.name} is celebrated in ${MONTHS[monthId - 1].name}!`,
          festivalId: draggedFestival.id,
        });
      } else {
        setFeedback({
          type: "wrong",
          message: `Not quite! ${draggedFestival.name} is actually in ${MONTHS[draggedFestival.month - 1].name}.`,
          festivalId: draggedFestival.id,
        });
      }

      // Remove from available
      setAvailableFestivals((prev) =>
        prev.filter((f) => f.id !== draggedFestival.id)
      );
      setDraggedFestival(null);

      // Clear feedback after delay
      setTimeout(() => setFeedback(null), 2500);

      // Check if game is complete
      if (placedFestivals.length + 1 >= TOTAL_FESTIVALS_TO_PLACE) {
        setTimeout(() => {
          setGameState("review");
        }, 1500);
      }
    },
    [draggedFestival, placedFestivals]
  );

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  // Handle click to select (mobile-friendly)
  const handleFestivalClick = useCallback((festival: Festival) => {
    setSelectedFestival((prev) =>
      prev?.id === festival.id ? null : festival
    );
  }, []);

  // Handle month click for mobile
  const handleMonthClick = useCallback(
    (monthId: number) => {
      if (!selectedFestival) return;

      // Check if already placed
      const alreadyPlaced = placedFestivals.find(
        (p) => p.festivalId === selectedFestival.id
      );
      if (alreadyPlaced) return;

      const isCorrect = selectedFestival.month === monthId;

      // Add to placed festivals
      setPlacedFestivals((prev) => [
        ...prev,
        { festivalId: selectedFestival.id, monthPlaced: monthId },
      ]);

      // Update score with functional update
      if (isCorrect) {
        setScore((prevScore) => prevScore + POINTS_CORRECT);
        setFeedback({
          type: "correct",
          message: `Correct! ${selectedFestival.name} is celebrated in ${MONTHS[monthId - 1].name}!`,
          festivalId: selectedFestival.id,
        });
      } else {
        setFeedback({
          type: "wrong",
          message: `Not quite! ${selectedFestival.name} is actually in ${MONTHS[selectedFestival.month - 1].name}.`,
          festivalId: selectedFestival.id,
        });
      }

      // Remove from available
      setAvailableFestivals((prev) =>
        prev.filter((f) => f.id !== selectedFestival.id)
      );
      setSelectedFestival(null);

      // Clear feedback after delay
      setTimeout(() => setFeedback(null), 2500);

      // Check if game is complete
      if (placedFestivals.length + 1 >= TOTAL_FESTIVALS_TO_PLACE) {
        setTimeout(() => {
          setGameState("review");
        }, 1500);
      }
    },
    [selectedFestival, placedFestivals]
  );

  // Get festivals placed in a specific month
  const getFestivalsInMonth = useCallback(
    (monthId: number): Festival[] => {
      return placedFestivals
        .filter((p) => p.monthPlaced === monthId)
        .map((p) => FESTIVALS.find((f) => f.id === p.festivalId)!)
        .filter(Boolean);
    },
    [placedFestivals]
  );

  // Check if a placed festival is correct
  const isPlacementCorrect = useCallback(
    (festivalId: string): boolean => {
      const placed = placedFestivals.find((p) => p.festivalId === festivalId);
      const festival = FESTIVALS.find((f) => f.id === festivalId);
      return placed?.monthPlaced === festival?.month;
    },
    [placedFestivals]
  );

  // Get all placed festivals for review
  const getPlacedFestivalsForReview = useCallback((): Array<{
    festival: Festival;
    monthPlaced: number;
    isCorrect: boolean;
  }> => {
    return placedFestivals.map((p) => {
      const festival = FESTIVALS.find((f) => f.id === p.festivalId)!;
      return {
        festival,
        monthPlaced: p.monthPlaced,
        isCorrect: festival.month === p.monthPlaced,
      };
    });
  }, [placedFestivals]);

  // Next in review
  const nextReview = useCallback(() => {
    const reviewData = getPlacedFestivalsForReview();
    if (reviewIndex < reviewData.length - 1) {
      setReviewIndex((prev) => prev + 1);
    } else {
      setGameState("complete");
    }
  }, [reviewIndex, getPlacedFestivalsForReview]);

  // Intro screen
  if (gameState === "intro") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-4">{"\uD83C\uDF89"}{"\uD83C\uDF0D"}{"\uD83C\uDF8A"}</div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Festival Calendar
          </h2>
          <p className="text-purple-200 mb-6 max-w-md mx-auto">
            Learn about festivals from around the world! Drag each festival to
            the month when it's celebrated and discover the traditions of
            different cultures.
          </p>

          <div className="bg-white/10 rounded-xl p-4 mb-6 text-left max-w-sm mx-auto">
            <h3 className="font-bold text-white mb-2 text-sm">
              {"\uD83C\uDFAE"} How to Play:
            </h3>
            <ul className="text-sm text-purple-200 space-y-1">
              <li>{"\u2022"} Drag festivals to the correct month</li>
              <li>{"\u2022"} Or click/tap a festival, then click a month</li>
              <li>{"\u2022"} Click the info icon to learn about each festival</li>
              <li>{"\u2022"} Earn {POINTS_CORRECT} points for each correct placement</li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <span
                key={key}
                className={`${CATEGORY_COLORS[key as FestivalCategory]} text-white text-xs px-2 py-1 rounded-full`}
              >
                {label}
              </span>
            ))}
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400
              text-white font-bold rounded-xl px-8 py-3 text-lg transition-all shadow-lg cursor-pointer"
          >
            {"\uD83C\uDF1F"} Start Exploring!
          </button>
        </div>
      </div>
    );
  }

  // Review screen - show each festival's info
  if (gameState === "review") {
    const reviewData = getPlacedFestivalsForReview();
    const currentReview = reviewData[reviewIndex];
    const correctCount = reviewData.filter((r) => r.isCorrect).length;

    return (
      <div className="rounded-xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            {"\uD83D\uDCDA"} Learning Time!
          </h2>
          <span className="text-sm text-purple-200">
            {reviewIndex + 1} of {reviewData.length}
          </span>
        </div>

        <div
          className={`rounded-xl p-5 mb-4 ${
            currentReview.isCorrect
              ? "bg-green-900/50 border-2 border-green-500"
              : "bg-red-900/30 border-2 border-red-500"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">{currentReview.festival.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">
                  {currentReview.festival.name}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    currentReview.isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {currentReview.isCorrect ? "Correct!" : "Missed"}
                </span>
              </div>
              <p className="text-sm text-white/80 mb-2">
                {currentReview.festival.flag} {currentReview.festival.country}{" "}
                {"\u2022"}{" "}
                <span
                  className={`${CATEGORY_COLORS[currentReview.festival.category]} text-white text-xs px-1.5 py-0.5 rounded`}
                >
                  {CATEGORY_LABELS[currentReview.festival.category]}
                </span>
              </p>

              <div className="bg-black/20 rounded-lg p-3 mb-3">
                <p className="text-sm text-white/90 mb-2">
                  <strong>When:</strong>{" "}
                  {MONTHS[currentReview.festival.month - 1].name}
                  {!currentReview.isCorrect && (
                    <span className="text-red-300">
                      {" "}
                      (you placed it in{" "}
                      {MONTHS[currentReview.monthPlaced - 1].name})
                    </span>
                  )}
                </p>
                <p className="text-sm text-white/90">
                  {currentReview.festival.description}
                </p>
              </div>

              <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-3">
                <h4 className="text-xs font-bold text-yellow-300 mb-1">
                  {"\uD83C\uDF89"} Traditions:
                </h4>
                <p className="text-sm text-yellow-100/90">
                  {currentReview.festival.traditions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-4">
          {reviewData.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === reviewIndex
                  ? "bg-yellow-400"
                  : i < reviewIndex
                    ? "bg-white/60"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-purple-200">
            Score: <span className="font-bold text-yellow-400">{score}</span> /{" "}
            {TOTAL_FESTIVALS_TO_PLACE * POINTS_CORRECT} ({correctCount}/
            {TOTAL_FESTIVALS_TO_PLACE} correct)
          </div>
          <button
            onClick={nextReview}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400
              text-white font-bold rounded-lg px-6 py-2 transition-all cursor-pointer"
          >
            {reviewIndex < reviewData.length - 1 ? "Next" : "See Results"}{" "}
            {"\u2192"}
          </button>
        </div>
      </div>
    );
  }

  // Complete screen
  if (gameState === "complete") {
    const maxScore = TOTAL_FESTIVALS_TO_PLACE * POINTS_CORRECT;
    const percentage = Math.round((score / maxScore) * 100);
    const correctCount = getPlacedFestivalsForReview().filter(
      (r) => r.isCorrect
    ).length;

    let message = "";
    let emoji = "";
    if (percentage >= 90) {
      message = "Festival Expert! You really know your celebrations!";
      emoji = "\uD83C\uDFC6";
    } else if (percentage >= 70) {
      message = "Great job! You've learned a lot about world festivals!";
      emoji = "\uD83C\uDF1F";
    } else if (percentage >= 50) {
      message = "Good effort! Keep exploring world cultures!";
      emoji = "\uD83D\uDC4D";
    } else {
      message = "Nice try! There's so much to learn about world festivals!";
      emoji = "\uD83D\uDCDA";
    }

    return (
      <div className="rounded-xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6 max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">
          {emoji}
          {"\uD83C\uDF0D"}
          {emoji}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Calendar Complete!</h2>
        <p className="text-purple-200 mb-4">{message}</p>

        <div className="bg-white/10 rounded-xl p-5 mb-6 max-w-sm mx-auto">
          <div className="text-4xl font-bold text-yellow-400 mb-1">{score}</div>
          <div className="text-sm text-purple-200">
            out of {maxScore} points
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-green-400">{"\u2713"} {correctCount}</span>
            <span className="text-white/40">|</span>
            <span className="text-red-400">
              {"\u2717"} {TOTAL_FESTIVALS_TO_PLACE - correctCount}
            </span>
          </div>
          <div className="mt-3 h-3 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-purple-300">{percentage}%</div>
        </div>

        <div className="bg-indigo-900/50 border border-indigo-500/50 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
          <h4 className="text-sm font-bold text-indigo-200 mb-2">
            {"\uD83D\uDCA1"} Did You Know?
          </h4>
          <p className="text-sm text-indigo-100/80">
            There are over 3,000 different festivals celebrated around the world
            each year! Each one reflects the unique culture, history, and values
            of its community. Festivals bring people together and help keep
            traditions alive for future generations.
          </p>
        </div>

        <button
          onClick={startGame}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400
            text-white font-bold rounded-xl px-8 py-3 text-lg transition-all shadow-lg cursor-pointer"
        >
          {"\uD83D\uDD04"} Play Again
        </button>
      </div>
    );
  }

  // Playing state
  return (
    <div className="rounded-xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">{"\uD83C\uDF89"}</span> Festival Calendar
          </h2>
          <p className="text-xs text-purple-300">Feasts & Festivals</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-yellow-400 bg-yellow-900/50 rounded-full px-3 py-1 border border-yellow-600">
            Score: {score}
          </span>
          <span className="text-xs text-white/70">
            {placedFestivals.length}/{TOTAL_FESTIVALS_TO_PLACE} placed
          </span>
        </div>
      </div>

      {/* Feedback popup */}
      {feedback && (
        <div
          className={`mb-4 p-3 rounded-lg text-center font-semibold text-sm animate-pulse ${
            feedback.type === "correct"
              ? "bg-green-500/80 text-white"
              : "bg-red-500/80 text-white"
          }`}
        >
          {feedback.type === "correct" ? "\u2713" : "\u2717"} {feedback.message}
        </div>
      )}

      {/* Calendar grid */}
      <div className="bg-black/30 rounded-xl p-3 sm:p-4 mb-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {MONTHS.map((month) => {
            const festivalsInMonth = getFestivalsInMonth(month.id);
            const seasonColor = SEASON_COLORS[month.season];
            const seasonIcon = SEASON_ICONS[month.season];
            const isDropTarget =
              draggedFestival !== null || selectedFestival !== null;

            return (
              <div
                key={month.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(month.id, e)}
                onClick={() => handleMonthClick(month.id)}
                className={`
                  relative min-h-[100px] rounded-lg border-2 transition-all
                  ${
                    isDropTarget
                      ? "border-yellow-400 border-dashed bg-yellow-500/10 cursor-pointer"
                      : "border-white/20"
                  }
                  ${selectedFestival ? "hover:border-yellow-400 hover:bg-yellow-500/10" : ""}
                `}
              >
                {/* Month header */}
                <div
                  className={`bg-gradient-to-r ${seasonColor} rounded-t-md px-2 py-1 text-center`}
                >
                  <span className="text-xs font-bold text-white">
                    {seasonIcon} {month.short}
                  </span>
                </div>

                {/* Festival slots */}
                <div className="p-1.5 space-y-1">
                  {festivalsInMonth.map((festival) => (
                    <div
                      key={festival.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowInfo(festival);
                      }}
                      className={`
                        flex items-center gap-1 p-1 rounded text-xs cursor-pointer
                        ${
                          isPlacementCorrect(festival.id)
                            ? "bg-green-600/60 border border-green-400"
                            : "bg-red-600/60 border border-red-400"
                        }
                      `}
                    >
                      <span>{festival.icon}</span>
                      <span className="truncate text-white text-[10px]">
                        {festival.name}
                      </span>
                    </div>
                  ))}

                  {festivalsInMonth.length === 0 && isDropTarget && (
                    <div className="text-[10px] text-yellow-300/70 text-center py-2">
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Festival cards to drag */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <span>{"\uD83C\uDF0D"}</span> Festivals to Place
          {selectedFestival && (
            <span className="text-xs text-yellow-400 font-normal">
              (tap a month to place {selectedFestival.name})
            </span>
          )}
        </h3>

        {availableFestivals.length === 0 ? (
          <p className="text-sm text-purple-300 text-center py-4">
            All festivals placed! Reviewing your answers...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {availableFestivals.map((festival) => (
              <div
                key={festival.id}
                draggable
                onDragStart={(e) => handleDragStart(festival, e)}
                onDragEnd={handleDragEnd}
                onClick={() => handleFestivalClick(festival)}
                className={`
                  relative bg-white/10 border-2 rounded-lg p-2 cursor-grab active:cursor-grabbing
                  transition-all hover:bg-white/20 hover:scale-102
                  ${
                    selectedFestival?.id === festival.id
                      ? "border-yellow-400 ring-2 ring-yellow-400/50 bg-yellow-500/20"
                      : "border-white/20"
                  }
                  ${
                    draggedFestival?.id === festival.id
                      ? "opacity-50 scale-95"
                      : ""
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{festival.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {festival.name}
                    </p>
                    <p className="text-[10px] text-white/60 flex items-center gap-1">
                      {festival.flag} {festival.country}
                    </p>
                  </div>
                </div>

                {/* Info button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo(festival);
                  }}
                  className="absolute top-1 right-1 text-white/50 hover:text-white text-xs w-5 h-5
                    flex items-center justify-center rounded-full hover:bg-white/20 cursor-pointer"
                  title="Learn more"
                >
                  {"\u2139\uFE0F"}
                </button>

                {/* Category badge */}
                <div
                  className={`absolute bottom-1 right-1 ${CATEGORY_COLORS[festival.category]}
                    text-[8px] text-white px-1.5 py-0.5 rounded-full`}
                >
                  {CATEGORY_LABELS[festival.category]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="mt-3 text-center text-xs text-purple-300">
        Tip: Think about the season! {SEASON_ICONS.spring} Spring festivals often
        celebrate renewal, while {SEASON_ICONS.autumn} autumn brings harvest
        celebrations.
      </div>

      {/* Info popup modal */}
      {showInfo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowInfo(null)}
        >
          <div
            className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-5 max-w-md w-full
              border-2 border-indigo-500 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl">{showInfo.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-white">{showInfo.name}</h3>
                <p className="text-sm text-indigo-200">
                  {showInfo.flag} {showInfo.country}
                </p>
                <div className="flex gap-2 mt-1">
                  <span
                    className={`${CATEGORY_COLORS[showInfo.category]} text-white text-xs px-2 py-0.5 rounded-full`}
                  >
                    {CATEGORY_LABELS[showInfo.category]}
                  </span>
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                    {MONTHS[showInfo.month - 1].name}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-black/20 rounded-lg p-3 mb-3">
              <h4 className="text-xs font-bold text-indigo-300 mb-1">
                About this Festival:
              </h4>
              <p className="text-sm text-white/90">{showInfo.description}</p>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-3 mb-4">
              <h4 className="text-xs font-bold text-yellow-300 mb-1">
                {"\uD83C\uDF89"} Traditions:
              </h4>
              <p className="text-sm text-yellow-100/90">{showInfo.traditions}</p>
            </div>

            <button
              onClick={() => setShowInfo(null)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg px-4 py-2
                transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
