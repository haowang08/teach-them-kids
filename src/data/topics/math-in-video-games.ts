import type { Topic } from '../types';

export const mathInVideoGames: Topic = {
  id: 'math-in-video-games',
  slug: 'math-in-video-games',
  title: 'Math in Video Games',
  subtitle:
    'Coordinates, Physics & the Hidden Numbers Powering Every Game',
  status: 'active',
  themeId: 'math-in-video-games',
  heroIcons: ['\u{1F3AE}', '\u{1F4BB}', '\u{1F579}\uFE0F'],
  navItems: [
    { id: 'coordinates-grids', icon: '\u{1F4CD}', label: 'Coordinates & Grids' },
    { id: 'physics-motion', icon: '\u{1F680}', label: 'Physics & Motion' },
    { id: 'probability-randomness', icon: '\u{1F3B2}', label: 'Probability & Randomness' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3AE}',
      title: 'Welcome to the Math Behind the Screen!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Every video game you\'ve ever played is powered by math. When Mario jumps over a gap, math calculates his arc. When you place a block in Minecraft, math tracks its exact position in 3D space. When a racing game feels realistic, math is simulating gravity, friction, and momentum hundreds of times per second!',
            'Game developers are really mathematicians in disguise. They use coordinate systems to position everything on screen, physics equations to make objects move realistically, and probability to decide what treasure you find in a chest or which enemies spawn around the corner.',
            'In this adventure, you\'ll discover how coordinate grids power every pixel you see, how physics equations make games feel real, and how random number generators decide whether you get that rare loot drop. After this, you\'ll see your favorite games in a whole new way!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'yDWPi1pZ0Po',
          title: 'Connect Four - Numberphile',
          channelName: 'Numberphile',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Coordinates & Grids ────────────────────────
    {
      id: 'coordinates-grids',
      icon: '\u{1F4CD}',
      title: 'Coordinates & Grids: Where Everything Lives',
      readAloudBlocks: [
        {
          id: 'coords-intro-text',
          paragraphs: [
            'Every object in a video game has a position, and that position is stored as numbers called coordinates. In a 2D game, every object has an x-coordinate (how far left or right) and a y-coordinate (how far up or down). Together, they pinpoint exactly where something is on screen.',
            'The point (0, 0) is called the origin. In most games, it\'s at the top-left corner of the screen. Moving right increases x, and moving down increases y. If a character is at position (200, 150), that means 200 pixels from the left edge and 150 pixels from the top. When you press the right arrow key, the game adds to the x-coordinate. Press up, and it subtracts from y. It\'s all addition and subtraction!',
            'In 3D games like Minecraft, there\'s a third coordinate: z (depth). Your position might be (100, 64, -230), meaning 100 blocks east, 64 blocks up, and 230 blocks south. Every single block in a Minecraft world has its own unique (x, y, z) coordinate. A standard Minecraft world has over a quadrillion possible block positions!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4CD}',
          name: 'The Coordinate Plane',
          title: 'The Map Behind Every Game',
          description:
            'The coordinate plane was invented by French mathematician Ren\u00E9 Descartes in 1637. He had the idea of using two number lines — one horizontal (x) and one vertical (y) — to describe any point on a flat surface. This idea, called the Cartesian coordinate system (named after Descartes), is the foundation of every 2D and 3D game ever made. Without it, games would have no way to know where anything is!',
          extraTag: 'Invented by Descartes, 1637',
        },
        {
          emoji: '\u{1F3A8}',
          name: 'Pixel Art',
          title: 'Coloring by Coordinates',
          description:
            'The word "pixel" comes from "picture element" — it\'s the smallest dot on a screen. Early video games like Pac-Man (1980) used simple grids of pixels to create characters and backgrounds. Pac-Man himself was designed on an approximately 13\u00D713 pixel grid! Each pixel has a coordinate and a color value. Modern screens have millions of pixels: a 1080p display is a grid of 1,920 \u00D7 1,080 = 2,073,600 pixels, each one placed at a precise coordinate.',
          extraTag: 'Pac-Man: ~13\u00D713 pixel grid',
        },
        {
          emoji: '\u{1F9CA}',
          name: 'Minecraft Coordinates',
          title: '3D Math You Can Walk Through',
          description:
            'Minecraft uses a 3D coordinate system where x is east-west, y is up-down, and z is north-south. Sea level is at y=64. The deepest you can dig is y=-64 (since the Caves and Cliffs update). The world border is at \u00B129,999,984 blocks from the origin. That means a Minecraft world can be nearly 60 million blocks wide! Players use coordinates to navigate, find their bases, and share locations with friends. When you press F3 in Minecraft, you\'re looking at pure coordinate math.',
          extraTag: 'World: 60 million blocks wide',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The classic game Tetris uses a 10-wide by 20-tall grid. Each falling piece is defined by its coordinates on this grid. When a row is completely filled (all 10 positions occupied), the game checks every column\'s coordinate and clears the row. The math behind Tetris is so elegant that computer scientists still study it — and proved in 2002 that the game is "NP-complete," a type of problem that\'s extremely difficult for computers to solve optimally!',
        },
      ],
      videos: [
        {
          youtubeId: 'fNk_zzaMoSs',
          title: 'Vectors | Chapter 1, Essence of linear algebra',
          channelName: '3Blue1Brown',
        },
        {
          youtubeId: 'YJRWBEtAku4',
          title: 'How To Use Coordinates In Minecraft Bedrock! - Tutorial',
          channelName: 'YouTube',
        },
        {
          youtubeId: 'KF6sLCeBj0s',
          title: 'Deep Blue vs Kasparov: How a computer beat best chess player in the world',
          channelName: 'BBC News',
        },
        {
          youtubeId: 'x24KoVNliMk',
          title: 'A brief history of video games (Part I) - Safwat Saleem',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'TOQTZ6N_eVg',
          title: 'Game Design: Crash Course Games #19',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['games-q1a', 'games-q1b', 'games-q1c', 'games-q1d'],
    },

    // ─── Section 2: Physics & Motion ───────────────────────────
    {
      id: 'physics-motion',
      icon: '\u{1F680}',
      title: 'Physics & Motion: Making Games Feel Real',
      readAloudBlocks: [
        {
          id: 'physics-intro-text',
          paragraphs: [
            'When a character jumps in a game, they don\'t just float up and down at the same speed. They launch upward quickly, slow down, pause for a split second at the top, then accelerate back down. This feels natural because the game is simulating gravity, just like in real life!',
            'In the real world, gravity accelerates objects downward at about 9.8 meters per second, every second (written as 9.8 m/s\u00B2). Game developers use this same number — or a modified version of it — in their physics engines. Every frame (usually 60 times per second), the game updates each object\'s velocity by adding the gravity value, then updates its position by adding the velocity. This simple loop of "add gravity to speed, add speed to position" creates realistic-looking motion!',
            'But gravity is just the beginning. Games also simulate friction (slowing down when you stop pressing a button), collision detection (what happens when objects hit each other), and momentum (heavy objects are harder to stop than light ones). All of these use math that runs silently behind the scenes.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4A8}',
          name: 'The Physics Engine',
          title: 'Math Running 60 Times Per Second',
          description:
            'A physics engine is the part of a game that calculates all the motion, collisions, and forces. Popular engines like Unity and Unreal Engine perform millions of math calculations every second. Each frame, the engine: (1) applies forces like gravity and wind, (2) updates velocity (speed + direction), (3) updates position, and (4) checks for collisions. At 60 frames per second, that\'s 60 complete physics updates every second. The math must be fast AND accurate, or the game feels "off."',
          extraTag: '60 updates per second',
        },
        {
          emoji: '\u{1F4A5}',
          name: 'Collision Detection',
          title: 'When Objects Touch',
          description:
            'How does a game know when two objects collide? The simplest method uses "bounding boxes" — invisible rectangles around each object. Two rectangles overlap if their x-ranges overlap AND their y-ranges overlap. The game checks every pair of objects every frame. With 100 objects, that\'s potentially 4,950 pair checks per frame (100 \u00D7 99 \u00F7 2). With 1,000 objects, it\'s nearly 500,000 checks! Game developers use clever math tricks called "spatial partitioning" to reduce these calculations.',
          extraTag: 'Bounding box: invisible rectangle',
        },
        {
          emoji: '\u{1F30D}',
          name: 'The Parabola Jump',
          title: 'Why Game Jumps Feel Natural',
          description:
            'A character\'s jump in a platform game follows a parabolic arc — the same curve a thrown ball makes in real life. The math is: position = initial velocity \u00D7 time + \u00BD \u00D7 gravity \u00D7 time\u00B2. This equation, discovered by Galileo in the 1600s, is why Mario\'s jump looks and feels so satisfying. Game designers adjust gravity, initial jump speed, and maximum height to make jumps feel just right. In Super Mario Bros., gravity is actually about 3 times stronger than real Earth gravity — that\'s why Mario falls so fast!',
          extraTag: 'Mario: ~3\u00D7 Earth gravity',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In the original Super Mario Bros. (1985), Mario\'s running speed is about 11 pixels per frame. The screen scrolls at the same rate, calculated by the game 60 times per second. When Mario runs at full speed, the game is performing hundreds of calculations every single frame just to keep everything moving smoothly!',
        },
      ],
      videos: [],
      quizIds: ['games-q2a', 'games-q2b', 'games-q2c'],
    },

    // ─── Section 3: Probability & Randomness ───────────────────
    {
      id: 'probability-randomness',
      icon: '\u{1F3B2}',
      title: 'Probability & Randomness: The Luck Behind Loot',
      readAloudBlocks: [
        {
          id: 'probability-intro-text',
          paragraphs: [
            'Have you ever opened a treasure chest in a game and gotten an amazing rare item? Or beaten a boss and received a common drop instead of the epic sword you wanted? That\'s probability at work! Game developers use math to decide exactly how likely each outcome is.',
            'Games use something called a Random Number Generator (RNG) to make decisions. The computer picks a random number, then checks: if the number is between 1 and 5, the player gets a rare item (5% chance). If it\'s between 6 and 25, they get an uncommon item (20% chance). If it\'s between 26 and 100, they get a common item (75% chance). The math of probability controls the excitement and challenge of the game!',
            'But here\'s a secret: computers can\'t actually be truly random. They use mathematical formulas called "pseudorandom number generators" that produce sequences of numbers that look random but are actually determined by a starting number called a "seed." If you know the seed, you can predict every "random" event in the game. Speedrunners sometimes exploit this to manipulate what items they get!',
          ],
        },
        {
          id: 'probability-outro-text',
          paragraphs: [
            'From coordinate grids to physics engines to probability, every part of a video game is built on math. Game developers don\'t just play games — they build them with numbers, equations, and algorithms. The next time you pick up a controller, remember: you\'re interacting with thousands of math calculations happening every single second!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3B2}',
          name: 'The Random Number Generator',
          title: 'The Dice Roller Inside Every Game',
          description:
            'A Random Number Generator (RNG) is a math formula that produces a sequence of numbers that appear random. Most games use a method called a "linear congruential generator," invented in 1958. It works like this: take a number, multiply it by a large constant, add another constant, and divide by a third constant. The remainder is your "random" number. Despite being completely determined by math, these sequences are random enough to feel unpredictable to players!',
          extraTag: 'Not truly random — pseudorandom!',
        },
        {
          emoji: '\u{1F48E}',
          name: 'Loot Drop Tables',
          title: 'The Probability Behind Every Treasure',
          description:
            'When you defeat a monster or open a chest, the game consults a "loot table" — a list of possible items with their drop probabilities. For example: Common sword (60%), Rare shield (25%), Epic helmet (10%), Legendary amulet (5%). The game generates a random number from 1 to 100 and checks which range it falls in. In some games, the probability of a legendary item is less than 1%, meaning you might need to open 100 chests on average to find one!',
          extraTag: 'Legendary: often < 1% chance',
        },
        {
          emoji: '\u{1F3AF}',
          name: 'Critical Hits',
          title: 'Probability in Combat',
          description:
            'In many games, attacks have a chance to deal extra damage called a "critical hit." If your critical hit rate is 15%, the game generates a random number from 1 to 100 each time you attack. If the number is 15 or below, it\'s a critical hit! Some games layer multiple probabilities: a 15% crit chance combined with a 25% chance to trigger a bonus effect means the combined probability is only 15% \u00D7 25% = 3.75%. Understanding probability helps you choose the best gear and strategies!',
          extraTag: 'Combined: multiply probabilities',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Many games use "pity timers" — hidden counters that increase your chance of getting a rare item each time you don\'t get one. If a legendary item has a 1% drop rate, after 50 unsuccessful tries, the game might secretly increase it to 5%, then 10%, until you finally get it. This prevents extremely unlucky streaks and keeps players from getting frustrated!',
        },
      ],
      videos: [],
      quizIds: ['games-q3a', 'games-q3b', 'games-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Coordinates & Grids
    {
      id: 'games-q1a',
      sectionId: 'coordinates-grids',
      title: 'Quick Quiz Time!',
      question:
        'What is the name of the point (0, 0) in a coordinate system?',
      options: [
        { text: 'The center', isCorrect: false },
        { text: 'The origin', isCorrect: true },
        { text: 'The base', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'games-q1b',
      sectionId: 'coordinates-grids',
      title: 'Coordinate Challenge!',
      question:
        'In Minecraft, what three coordinates describe a player\'s position?',
      options: [
        { text: 'a, b, c', isCorrect: false },
        { text: 'x, y, z', isCorrect: true },
        { text: 'width, height, depth', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'games-q1c',
      sectionId: 'coordinates-grids',
      title: 'Pixel Quiz!',
      question:
        'What does the word "pixel" stand for?',
      options: [
        { text: 'Picture element', isCorrect: true },
        { text: 'Pixelated image', isCorrect: false },
        { text: 'Point of interest', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'games-q1d',
      sectionId: 'coordinates-grids',
      title: 'History of Coordinates!',
      question:
        'Who invented the coordinate plane in 1637?',
      options: [
        { text: 'Isaac Newton', isCorrect: false },
        { text: 'Albert Einstein', isCorrect: false },
        { text: 'Ren\u00E9 Descartes', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Physics & Motion
    {
      id: 'games-q2a',
      sectionId: 'physics-motion',
      title: 'Quick Quiz Time!',
      question:
        'How many times per second does a typical game running at 60fps update its physics?',
      options: [
        { text: '30 times', isCorrect: false },
        { text: '60 times', isCorrect: true },
        { text: '100 times', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'games-q2b',
      sectionId: 'physics-motion',
      title: 'Collision Detection!',
      question:
        'What is the simplest method games use to detect when two objects collide?',
      options: [
        { text: 'Bounding boxes (invisible rectangles)', isCorrect: true },
        { text: 'Counting pixels', isCorrect: false },
        { text: 'Measuring the screen with a ruler', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'games-q2c',
      sectionId: 'physics-motion',
      title: 'Mario Physics!',
      question:
        'Compared to real Earth gravity, how strong is gravity in Super Mario Bros.?',
      options: [
        { text: 'About the same', isCorrect: false },
        { text: 'About 3 times stronger', isCorrect: true },
        { text: 'About 10 times weaker', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Probability & Randomness
    {
      id: 'games-q3a',
      sectionId: 'probability-randomness',
      title: 'Quick Quiz Time!',
      question:
        'What does RNG stand for in gaming?',
      options: [
        { text: 'Really Nice Graphics', isCorrect: false },
        { text: 'Random Number Generator', isCorrect: true },
        { text: 'Rapid New Game', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'games-q3b',
      sectionId: 'probability-randomness',
      title: 'Loot Drop Math!',
      question:
        'If a legendary item has a 5% drop rate, what random number range (out of 1-100) would trigger the drop?',
      options: [
        { text: '1 to 5', isCorrect: true },
        { text: '50 to 55', isCorrect: false },
        { text: '95 to 100', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'games-q3c',
      sectionId: 'probability-randomness',
      title: 'Probability Challenge!',
      question:
        'If your critical hit chance is 15% and your bonus effect chance is 25%, what is the probability of both happening on the same attack?',
      options: [
        { text: '40%', isCorrect: false },
        { text: '3.75%', isCorrect: true },
        { text: '20%', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'games-essay',
    prompt:
      'What\'s your favorite video game, and what kind of math do you think runs behind the scenes?',
    description:
      'Now it\'s your turn! Think about a game you love playing. Does it use coordinates to position characters? Physics to simulate jumping and gravity? Probability for loot drops or random events? Describe the math you think is happening behind the scenes. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Awesome analysis! You see the math behind the pixels! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'games-reward',
    title: 'Game Physics Sandbox!',
    description:
      'You\'ve unlocked the Game Physics Sandbox! Adjust gravity, launch angle, and speed to land a character on floating platforms. See how changing the math changes the jump arc. Can you find the perfect settings for each challenge?',
    lockMessage: 'Physics Sandbox Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save an open-ended answer (100+ characters)',
      },
    ],
    type: 'game-physics-sandbox',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Physics Sandbox! You\'re a true game mathematician!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Level Complete: Math Master!',
    paragraphs: [
      'Congratulations! You\'ve discovered the incredible math powering every video game!',
      'You learned that coordinate systems, invented by Descartes in 1637, position everything on screen — from Pac-Man\'s 13\u00D713 pixel grid to Minecraft\'s 60-million-block-wide world of (x, y, z) coordinates.',
      'You explored physics engines that run 60 times per second, calculating gravity, velocity, and collisions. You discovered that Mario\'s jump follows a parabolic arc and that his game gravity is about 3 times stronger than Earth\'s. You learned how bounding boxes detect collisions between thousands of objects every frame.',
      'And you dove into probability: how Random Number Generators decide loot drops, how drop tables assign chances to every item, and how combining probabilities (like 15% crit \u00D7 25% bonus = 3.75%) governs combat outcomes.',
      'The next time you play a game, remember: behind every pixel, every jump, and every lucky drop, there\'s math making it all possible. Game on!',
    ],
  },
};
