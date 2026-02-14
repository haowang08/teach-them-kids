import type { Topic } from '../types';

export const mathInNature: Topic = {
  id: 'math-in-nature',
  slug: 'math-in-nature',
  title: 'Math in Nature',
  subtitle:
    'Fibonacci, Fractals & the Golden Ratio Hidden All Around You',
  status: 'active',
  themeId: 'math-in-nature',
  heroIcons: ['\u{1F33B}', '\u{1F340}', '\u{1F41A}'],
  navItems: [
    { id: 'fibonacci', icon: '\u{1F33B}', label: 'The Fibonacci Sequence' },
    { id: 'golden-ratio', icon: '\u{1F31F}', label: 'The Golden Ratio' },
    { id: 'fractals', icon: '\u2744\uFE0F', label: 'Fractals Everywhere' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F33F}',
      title: 'Welcome to Nature\'s Secret Math!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'What if nature had a favorite set of numbers? Look closely at a sunflower, a pinecone, or a seashell, and you\'ll find the same mysterious numbers appearing again and again. Nature is full of mathematical patterns that scientists and mathematicians have been studying for centuries!',
            'These patterns aren\'t just pretty — they serve a purpose. Plants arrange their leaves using math to capture the most sunlight. Flowers grow their petals in specific numbers to pack seeds efficiently. Trees branch in patterns that help them stay strong in the wind. Nature has been solving math problems for millions of years longer than humans have!',
            'In this adventure, you\'ll discover the Fibonacci sequence (a pattern of numbers that pops up everywhere in nature), the golden ratio (a special number that artists and architects have used for thousands of years), and fractals (patterns that repeat themselves at every scale, from tiny ferns to enormous mountain ranges). Let\'s explore!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'SjSHVDfXHQ4',
          title: 'The magic of Fibonacci numbers | Arthur Benjamin',
          channelName: 'TED',
        },
        {
          youtubeId: '0C75vRVL5lE',
          title: 'The Case of the Missing Fractals',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: The Fibonacci Sequence ─────────────────────
    {
      id: 'fibonacci',
      icon: '\u{1F33B}',
      title: 'The Fibonacci Sequence: Nature\'s Favorite Numbers',
      readAloudBlocks: [
        {
          id: 'fibonacci-intro-text',
          paragraphs: [
            'In the year 1202, an Italian mathematician named Leonardo of Pisa (later known as Fibonacci) wrote a book about a curious number pattern. The sequence starts with 0 and 1, and each new number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, and so on forever.',
            'This might seem like just a math puzzle, but something remarkable happens when you look for these numbers in nature. Lilies have 3 petals. Buttercups have 5. Delphiniums have 8. Marigolds have 13. Daisies have 21, 34, 55, or even 89 petals. These are all Fibonacci numbers! While not every flower follows this pattern perfectly, the tendency is striking.',
            'The most dramatic example is the sunflower. Look at the center of a sunflower and you\'ll see two sets of spirals: one curving clockwise and one curving counterclockwise. Count the spirals in each direction and you\'ll typically find consecutive Fibonacci numbers — often 34 spirals one way and 55 the other. This arrangement allows the seeds to pack together as tightly as possible!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4D6}',
          name: 'Fibonacci (Leonardo of Pisa)',
          title: 'The Man Behind the Numbers',
          description:
            'Leonardo of Pisa, known as Fibonacci, was born around 1170 in Italy. He traveled across North Africa and the Mediterranean, studying with Arab mathematicians. In his book "Liber Abaci" (1202), he introduced the Hindu-Arabic numeral system (the 0-9 digits we use today) to Europe and posed a famous problem about rabbit populations. The sequence that solved this problem — 1, 1, 2, 3, 5, 8, 13... — now bears his name, though he wasn\'t the first to discover it. Indian mathematicians had described it centuries earlier!',
          extraTag: 'Born: ~1170, Pisa, Italy',
        },
        {
          emoji: '\u{1F33B}',
          name: 'Sunflower Spirals',
          title: '34 and 55: A Fibonacci Masterpiece',
          description:
            'A sunflower head is one of nature\'s most visible examples of Fibonacci numbers. The seeds arrange themselves in two sets of spirals: typically 34 going one direction and 55 going the other — both Fibonacci numbers! This spiral pattern follows a specific angle called the "golden angle" (about 137.5 degrees), which ensures that each new seed is positioned to get the maximum amount of sunlight and space. Mathematicians have proven this is the most efficient packing arrangement possible!',
          extraTag: 'Spiral counts: 34 and 55',
        },
        {
          emoji: '\u{1F332}',
          name: 'Tree Branching',
          title: 'Fibonacci in the Forest',
          description:
            'Many trees grow following Fibonacci-like patterns. A trunk grows until it produces a branch, then it branches again. If you count the branches at each level of a tree, the numbers often follow the Fibonacci sequence: 1, 2, 3, 5, 8, 13. This branching pattern helps trees spread their leaves to capture the most sunlight. The sneezewort plant is a classic example: it branches in an almost perfect Fibonacci pattern!',
          extraTag: 'Branches per level follow the sequence',
        },
        {
          emoji: '\u{1F34D}',
          name: 'Pinecones & Pineapples',
          title: 'Spiral Counting Champions',
          description:
            'Pinecones have spirals going in two directions, and the counts are almost always consecutive Fibonacci numbers — commonly 8 and 13. Pineapples show the same pattern with 8, 13, and 21 spirals visible at different angles. This happens because each new scale or section grows at the golden angle from the previous one, naturally creating these Fibonacci-numbered spiral patterns!',
          extraTag: 'Pinecone spirals: 8 and 13',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Fibonacci\'s original rabbit problem asked: if a pair of rabbits produces a new pair every month, and each new pair starts reproducing after one month, how many pairs will there be after 12 months? The answer is 144 — the 12th Fibonacci number! (In real life, rabbits don\'t reproduce quite so neatly, but the math is beautiful.)',
        },
      ],
      videos: [
        {
          youtubeId: 'Nu-lW-Ifyec',
          title: 'Fibonacci Mystery',
          channelName: 'Numberphile',
        },
      ],
      quizIds: ['nature-q1a', 'nature-q1b', 'nature-q1c', 'nature-q1d'],
    },

    // ─── Section 2: The Golden Ratio ───────────────────────────
    {
      id: 'golden-ratio',
      icon: '\u{1F31F}',
      title: 'The Golden Ratio: The Most Beautiful Number?',
      readAloudBlocks: [
        {
          id: 'golden-intro-text',
          paragraphs: [
            'There\'s a special number that has fascinated mathematicians, artists, and architects for over 2,000 years. It\'s called the golden ratio, and its value is approximately 1.618. Mathematicians represent it with the Greek letter phi (\u03C6).',
            'Here\'s the magical connection to Fibonacci: if you divide any Fibonacci number by the one before it, you get closer and closer to 1.618 as the numbers get bigger! Try it: 8 \u00F7 5 = 1.6, 13 \u00F7 8 = 1.625, 21 \u00F7 13 = 1.615, 34 \u00F7 21 = 1.619, 55 \u00F7 34 = 1.618... The ratios converge on the golden ratio!',
            'A golden rectangle has sides in the ratio 1:1.618. If you cut a square off a golden rectangle, the remaining piece is another, smaller golden rectangle. You can keep cutting squares forever and the remaining piece is always a perfect golden rectangle! If you draw quarter-circle arcs through each square, you get a beautiful spiral called the golden spiral.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'The Parthenon',
          title: 'Golden Ratio in Architecture',
          description:
            'The ancient Greek temple called the Parthenon, built around 438 BCE in Athens, is often cited as an example of the golden ratio in architecture. While scholars debate exactly how intentionally the builders used phi, the proportions of the facade closely approximate golden rectangles. What is certain is that ancient Greek mathematicians, including Euclid, studied the golden ratio extensively and called it the "extreme and mean ratio."',
          extraTag: 'Built: ~438 BCE, Athens',
        },
        {
          emoji: '\u{1F3A8}',
          name: 'Leonardo da Vinci',
          title: 'The Golden Ratio in Art',
          description:
            'Leonardo da Vinci created illustrations for the mathematician Luca Pacioli\'s book "De Divina Proportione" ("The Divine Proportion," 1509), which was entirely about the golden ratio. Da Vinci\'s famous "Vitruvian Man" drawing explores the mathematical proportions of the human body. While claims that the Mona Lisa was designed around the golden ratio are debated, da Vinci was clearly fascinated by the relationship between math and beauty.',
          extraTag: 'Illustrated "The Divine Proportion" (1509)',
        },
        {
          emoji: '\u{1F41A}',
          name: 'Spirals in Nature',
          title: 'Not Quite Golden, But Close!',
          description:
            'The nautilus shell is often called a "golden spiral," but scientists have measured it and found it\'s actually a logarithmic spiral with a different ratio (closer to 1.33, not 1.618). However, many other natural spirals do approximate the golden ratio! The arrangement of seeds in sunflowers, the spiral of a hurricane, and the arms of spiral galaxies all follow patterns related to the golden angle (137.5 degrees), which is derived from the golden ratio.',
          extraTag: 'Golden angle: ~137.5\u00B0',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The golden ratio phi (\u03C6) has a unique mathematical property: \u03C6 \u00D7 \u03C6 = \u03C6 + 1. That means 1.618 \u00D7 1.618 \u2248 2.618, which is exactly 1.618 + 1! No other positive number has this property. Its exact value is (1 + \u221A5) / 2.',
        },
      ],
      videos: [],
      quizIds: ['nature-q2a', 'nature-q2b', 'nature-q2c'],
    },

    // ─── Section 3: Fractals Everywhere ────────────────────────
    {
      id: 'fractals',
      icon: '\u2744\uFE0F',
      title: 'Fractals: Patterns That Repeat Forever',
      readAloudBlocks: [
        {
          id: 'fractals-intro-text',
          paragraphs: [
            'Imagine a shape where every tiny piece looks like the whole thing. Zoom in on a part of the shape, and you see the same pattern. Zoom in again — same pattern! Zoom in a thousand times — STILL the same pattern! These self-repeating shapes are called fractals, and nature is full of them.',
            'The word "fractal" was coined in 1975 by mathematician Benoit Mandelbrot. He noticed that traditional geometry (circles, squares, triangles) couldn\'t describe the rough, irregular shapes found in nature. Coastlines aren\'t straight lines. Mountains aren\'t cones. Clouds aren\'t spheres. Mandelbrot created a new kind of geometry to describe these shapes.',
            'Here\'s a mind-bending idea called the "coastline paradox": the length of a coastline depends on how closely you measure it! Measure Britain\'s coast with a 100-kilometer ruler and you get one answer. Use a 10-kilometer ruler (which catches more small bays and inlets) and the coastline gets longer. Use a 1-meter ruler and it gets even longer! As your ruler gets shorter, the coastline approaches infinite length. This is because coastlines are fractal — they have detail at every scale.',
          ],
        },
        {
          id: 'fractals-outro-text',
          paragraphs: [
            'Fractals aren\'t just a curiosity — they\'re everywhere! Your lungs are fractal: the airways branch into smaller and smaller passages (about 23 levels of branching) to maximize surface area for absorbing oxygen. Your blood vessels are fractal too, branching from large arteries to tiny capillaries. Even the electrical signals in your brain follow fractal patterns!',
            'From the tiniest fern leaf to the largest galaxy cluster, nature uses fractals to create efficient, beautiful structures. The next time you look at a tree, a fern, a river system, or a flash of lightning, you\'re seeing fractal math in action!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4D0}',
          name: 'Benoit Mandelbrot',
          title: 'The Father of Fractals',
          description:
            'Benoit Mandelbrot (1924–2010) was a Polish-born mathematician who worked at IBM. In 1975, he coined the word "fractal" from the Latin word "fractus" meaning "broken" or "irregular." He discovered the famous Mandelbrot Set, an infinitely complex fractal shape generated by a simple mathematical formula: z = z\u00B2 + c. When plotted on a computer, it creates an incredibly beautiful shape with infinite detail at every zoom level. Mandelbrot showed that fractals could describe everything from stock market prices to galaxy distributions!',
          extraTag: 'Coined "fractal" in 1975',
        },
        {
          emoji: '\u{1F33F}',
          name: 'The Fern',
          title: 'Nature\'s Perfect Fractal',
          description:
            'A fern is one of nature\'s most obvious fractals. Each fern frond (leaf) is made up of smaller copies of itself. Look at a single branch of a fern and it looks like a tiny version of the whole frond. Each of those tiny branches has even tinier branches that look the same again! Mathematician Michael Barnsley created the "Barnsley Fern" in 1988, using just four simple mathematical equations to generate a perfectly realistic fern shape on a computer.',
          extraTag: 'Self-similar at 3-4 levels',
        },
        {
          emoji: '\u2744\uFE0F',
          name: 'The Koch Snowflake',
          title: 'Infinite Perimeter, Finite Area',
          description:
            'The Koch Snowflake, invented by Swedish mathematician Helge von Koch in 1904, is a famous mathematical fractal. Start with a triangle. Divide each side into thirds, and add a smaller triangle in the middle of each side. Repeat forever. The result is a snowflake-shaped curve with a mind-bending property: it has INFINITE perimeter (the edge goes on forever) but FINITE area (it fits inside a circle). This "impossible" combination is what makes fractals so fascinating to mathematicians!',
          extraTag: 'Infinite perimeter, finite area',
        },
        {
          emoji: '\u{1F966}',
          name: 'Romanesco Broccoli',
          title: 'The Tastiest Fractal',
          description:
            'Romanesco broccoli (sometimes called Romanesco cauliflower) is perhaps the most striking natural fractal you can find at a grocery store. Its bright green head is made of a series of spiraling cones, and each cone is made of smaller spiraling cones, which are made of even smaller spiraling cones! The number of spirals at each level follows the Fibonacci sequence. Scientists believe this fractal growth pattern allows the plant to maximize its surface area for absorbing sunlight.',
          extraTag: 'Fibonacci spirals you can eat!',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Your lungs contain about 300 million tiny air sacs called alveoli. If you could flatten out all the surfaces in your lungs, they would cover an area roughly the size of a tennis court — about 70 square meters! Fractal branching is how your body fits a tennis court of surface area inside your chest.',
        },
      ],
      videos: [],
      quizIds: ['nature-q3a', 'nature-q3b', 'nature-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Fibonacci Sequence
    {
      id: 'nature-q1a',
      sectionId: 'fibonacci',
      title: 'Quick Quiz Time!',
      question:
        'What is the Fibonacci sequence?',
      options: [
        { text: 'A sequence where each number is double the previous one', isCorrect: false },
        { text: 'A sequence where each number is the sum of the two before it', isCorrect: true },
        { text: 'A sequence of only prime numbers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'nature-q1b',
      sectionId: 'fibonacci',
      title: 'Fibonacci Challenge!',
      question:
        'What number comes next in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, __?',
      options: [
        { text: '18', isCorrect: false },
        { text: '21', isCorrect: true },
        { text: '26', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'nature-q1c',
      sectionId: 'fibonacci',
      title: 'Sunflower Quiz!',
      question:
        'In a sunflower head, what Fibonacci numbers typically describe the two sets of spirals?',
      options: [
        { text: '12 and 24', isCorrect: false },
        { text: '34 and 55', isCorrect: true },
        { text: '50 and 100', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'nature-q1d',
      sectionId: 'fibonacci',
      title: 'History Quiz!',
      question:
        'In what year did Fibonacci publish his famous book "Liber Abaci"?',
      options: [
        { text: '500 BCE', isCorrect: false },
        { text: '1202', isCorrect: true },
        { text: '1750', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Golden Ratio
    {
      id: 'nature-q2a',
      sectionId: 'golden-ratio',
      title: 'Quick Quiz Time!',
      question:
        'What is the approximate value of the golden ratio (phi)?',
      options: [
        { text: '3.14159', isCorrect: false },
        { text: '1.618', isCorrect: true },
        { text: '2.718', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'nature-q2b',
      sectionId: 'golden-ratio',
      title: 'Golden Connection!',
      question:
        'How is the golden ratio connected to the Fibonacci sequence?',
      options: [
        { text: 'They are completely unrelated', isCorrect: false },
        { text: 'Dividing consecutive Fibonacci numbers gives ratios that approach the golden ratio', isCorrect: true },
        { text: 'The golden ratio is the sum of all Fibonacci numbers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'nature-q2c',
      sectionId: 'golden-ratio',
      title: 'Spiral Truth!',
      question:
        'Is the nautilus shell a true "golden spiral"?',
      options: [
        { text: 'Yes, it perfectly follows the golden ratio', isCorrect: false },
        { text: 'No — it\'s a logarithmic spiral with a different ratio (closer to 1.33)', isCorrect: true },
        { text: 'Scientists have never measured it', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Fractals
    {
      id: 'nature-q3a',
      sectionId: 'fractals',
      title: 'Quick Quiz Time!',
      question:
        'Who coined the word "fractal" in 1975?',
      options: [
        { text: 'Albert Einstein', isCorrect: false },
        { text: 'Benoit Mandelbrot', isCorrect: true },
        { text: 'Isaac Newton', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'nature-q3b',
      sectionId: 'fractals',
      title: 'Coastline Paradox!',
      question:
        'What happens to the measured length of a coastline as you use a shorter ruler?',
      options: [
        { text: 'It stays the same', isCorrect: false },
        { text: 'It gets shorter', isCorrect: false },
        { text: 'It gets longer', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'nature-q3c',
      sectionId: 'fractals',
      title: 'Koch Snowflake Challenge!',
      question:
        'What is the special property of the Koch Snowflake?',
      options: [
        { text: 'It has infinite perimeter but finite area', isCorrect: true },
        { text: 'It has finite perimeter but infinite area', isCorrect: false },
        { text: 'It has no perimeter at all', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'nature-essay',
    prompt:
      'Where have you seen mathematical patterns in nature, and which one amazes you the most?',
    description:
      'Now it\'s your turn! Think about the Fibonacci sequence in flowers and pinecones, the golden ratio in spirals, and fractals in ferns and coastlines. Have you ever noticed mathematical patterns in the world around you? Which pattern do you find most amazing and why? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Wonderful observations! You see the math that nature has been hiding! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'nature-reward',
    title: 'Fractal Explorer!',
    description:
      'You\'ve unlocked the Fractal Explorer! Zoom into the mesmerizing Mandelbrot Set and Sierpinski Triangle. Adjust parameters to see how simple math rules create infinitely complex, beautiful patterns. Discover new shapes at every zoom level!',
    lockMessage: 'Fractal Explorer Locked!',
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
    type: 'fractal-explorer',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Fractal Explorer! You\'re a true nature mathematician!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Nature\'s Math Champion!',
    paragraphs: [
      'Congratulations! You\'ve discovered the incredible math hiding in the natural world all around you!',
      'You learned about the Fibonacci sequence — 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 — and how these numbers appear in sunflower spirals, pinecone patterns, flower petals, and tree branching. You traced the sequence back to Fibonacci himself in 1202, though Indian mathematicians knew it even earlier.',
      'You explored the golden ratio (approximately 1.618), discovered its connection to the Fibonacci sequence, and learned that while the nautilus shell isn\'t quite a golden spiral, many other natural patterns do follow this special number. You also met the golden angle (137.5\u00B0) that plants use to arrange their seeds as efficiently as possible.',
      'And you dove into the world of fractals — self-repeating patterns found in ferns, coastlines, snowflakes, and even your own lungs. You learned how Mandelbrot gave these shapes a name and how the Koch Snowflake has infinite perimeter but finite area.',
      'The next time you see a flower, a tree, or a broccoli, look a little closer — nature\'s math is everywhere, waiting to be discovered!',
    ],
  },
};
