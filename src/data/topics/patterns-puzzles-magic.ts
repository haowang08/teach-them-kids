import type { Topic } from '../types';

export const patternsPuzzlesMagic: Topic = {
  id: 'patterns-puzzles-magic',
  slug: 'patterns-puzzles-magic',
  title: 'Patterns, Puzzles & Magic Tricks',
  subtitle:
    'The Math Behind the Magic',
  status: 'active',
  themeId: 'patterns-puzzles-magic',
  heroIcons: ['\u{1F33B}', '\u{1F9E9}', '\u2728'],
  navItems: [
    { id: 'patterns-nature', icon: '\u{1F33B}', label: 'Patterns in Nature' },
    { id: 'famous-puzzles', icon: '\u{1F9E9}', label: 'Famous Puzzles' },
    { id: 'math-magic', icon: '\u{1FA84}', label: 'Math Magic Tricks' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u2728',
      title: 'Welcome to the World of Wonder!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Did you know that sunflowers, pinecones, and seashells all share a secret mathematical pattern? Or that there are puzzles so tricky they took mathematicians hundreds of years to solve? Or that you can amaze your friends with magic tricks that are secretly powered by math?',
            'Mathematics isn\'t just about numbers on a page. It\'s a hidden language that creates the beautiful patterns we see everywhere in nature, the mind-bending puzzles that challenge our brains, and the seemingly impossible magic tricks that leave audiences gasping in amazement!',
            'In this adventure, you\'ll discover the Fibonacci sequence hiding in flower petals, learn about puzzles that have fascinated the world\'s greatest minds, and master math-powered magic tricks that will make you the coolest kid in the room. Let\'s unlock the magic of math!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'bY1sOzTLrQQ',
          title: 'Doodling in Math: Spirals, Fibonacci, and Being a Plant',
          channelName: 'Vi Hart',
        },
        {
          youtubeId: '4oyyXC5IzEE',
          title: 'The Fractal Nature of Reality',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Patterns in Nature ──────────────────────────
    {
      id: 'patterns-nature',
      icon: '\u{1F33B}',
      title: 'Patterns in Nature: Math\'s Hidden Art Gallery',
      readAloudBlocks: [
        {
          id: 'patterns-intro-text',
          paragraphs: [
            'Look closely at a sunflower and you\'ll see something magical: its seeds are arranged in two sets of spirals going in opposite directions. Count those spirals and you\'ll almost always get two consecutive Fibonacci numbers, like 34 and 55! This isn\'t a coincidence. It\'s mathematics at work in nature.',
            'The Fibonacci sequence is one of the most famous patterns in all of mathematics: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89... Each number is the sum of the two before it. This simple rule creates patterns that appear everywhere in nature, from the spiral of a nautilus shell to the branching of trees to the arrangement of petals on a flower.',
            'But Fibonacci numbers are just the beginning! Nature is full of mathematical patterns: fractals that repeat the same shape at every scale, symmetry that creates beauty, and spirals that follow the golden ratio. Let\'s explore nature\'s incredible math!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F33B}',
          name: 'The Fibonacci Sequence',
          title: 'Nature\'s Favorite Number Pattern',
          description:
            'The Fibonacci sequence was introduced to Western mathematics by Leonardo of Pisa (nicknamed Fibonacci) in 1202, though Indian mathematicians had known about it centuries earlier. The pattern is simple: start with 1, 1, then each new number is the sum of the two before it. What makes it magical is how often it appears in nature! Lilies have 3 petals (a Fibonacci number), buttercups have 5, daisies have 34 or 55, and sunflowers have 89 spirals. The ratio between consecutive Fibonacci numbers approaches the golden ratio, approximately 1.618, which appears in art, architecture, and nature!',
          extraTag: 'Sequence: 1, 1, 2, 3, 5, 8, 13, 21...',
        },
        {
          emoji: '\u{1F300}',
          name: 'Fractals',
          title: 'Infinity in a Finite Shape',
          description:
            'A fractal is a shape that looks the same no matter how much you zoom in. Think of a fern leaf: each small branch looks like a tiny copy of the whole fern! Broccoli does the same thing, and so do coastlines, mountain ranges, and lightning bolts. The mathematician Benoit Mandelbrot coined the word "fractal" in 1975 and showed that these self-repeating patterns are everywhere in nature. The famous Mandelbrot Set is a fractal that contains infinite complexity, no matter how deeply you zoom in, you\'ll always find more intricate patterns!',
          extraTag: 'Coined by Mandelbrot, 1975',
        },
        {
          emoji: '\u{1F98B}',
          name: 'Symmetry',
          title: 'Nature\'s Mirror Magic',
          description:
            'Symmetry is when one half of something is a mirror image of the other half. Butterflies have bilateral symmetry (left matches right), snowflakes have six-fold rotational symmetry, and starfish have five-fold symmetry. But here\'s what\'s fascinating: symmetry in nature isn\'t just beautiful, it\'s useful! Animals with more symmetrical features tend to be healthier, which is why our brains are wired to find symmetry attractive. Mathematicians study symmetry through a branch of math called group theory!',
          extraTag: 'Types: bilateral, rotational, radial',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Almost all flowers have a Fibonacci number of petals! Lilies have 3, buttercups have 5, delphiniums have 8, marigolds have 13, asters have 21, and daisies have 34, 55, or even 89 petals. Finding a four-leaf clover is rare because 4 is NOT a Fibonacci number!',
        },
      ],
      videos: [
        {
          youtubeId: 'wTlw7fNcO-0',
          title: 'The Fibonacci Sequence in Nature',
          channelName: 'National Geographic',
        },
      ],
      quizIds: ['patterns-q1a', 'patterns-q1b', 'patterns-q1c', 'patterns-q1d'],
    },

    // ─── Section 2: Famous Puzzles ──────────────────────────────
    {
      id: 'famous-puzzles',
      icon: '\u{1F9E9}',
      title: 'Famous Puzzles That Stumped the World',
      readAloudBlocks: [
        {
          id: 'puzzles-intro-text',
          paragraphs: [
            'Humans have loved puzzles for thousands of years. From ancient Chinese tangrams to the Rubik\'s Cube craze of the 1980s, mathematical puzzles challenge our brains and teach us to think in creative ways. Some puzzles are so famous that the world\'s greatest mathematicians have spent years trying to solve them!',
            'What makes math puzzles special is that they look simple but hide incredible complexity. The Towers of Hanoi puzzle has just three pegs and some disks, but solving it with 64 disks would take longer than the age of the universe! Magic squares, where every row, column, and diagonal adds up to the same number, have fascinated people from ancient China to Benjamin Franklin. And the Rubik\'s Cube has 43 quintillion possible positions, yet it can always be solved in 20 moves or fewer!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F7E5}',
          name: 'The Rubik\'s Cube',
          title: '43 Quintillion Possibilities',
          description:
            'Invented in 1974 by Hungarian professor Ern\u0151 Rubik, the Rubik\'s Cube has 43,252,003,274,489,856,000 possible positions. That\'s over 43 quintillion! Yet mathematicians proved that any scrambled cube can be solved in 20 moves or fewer, a number they call "God\'s Number." The current world record for solving a Rubik\'s Cube is about 3.13 seconds! Competitive speedcubers use mathematical algorithms, memorized sequences of moves, to solve the cube incredibly fast.',
          extraTag: 'God\'s Number: 20 moves',
        },
        {
          emoji: '\u{1F4DA}',
          name: 'Towers of Hanoi',
          title: 'The Puzzle That Takes Longer Than the Universe',
          description:
            'The Towers of Hanoi is a puzzle with three pegs and a stack of disks of different sizes. The goal is to move all the disks from one peg to another, but you can only move one disk at a time and you can never place a larger disk on top of a smaller one. With 3 disks, it takes 7 moves. With 10 disks, it takes 1,023 moves. The pattern is 2\u207F - 1 moves, where n is the number of disks. With the legendary 64 disks from the original story, it would take 18,446,744,073,709,551,615 moves!',
          extraTag: 'Formula: 2\u207F - 1 moves',
        },
        {
          emoji: '\u{1F522}',
          name: 'Magic Squares',
          title: 'Every Direction Adds Up the Same',
          description:
            'A magic square is a grid of numbers where every row, column, and diagonal adds up to the same total, called the "magic constant." The simplest 3\u00D73 magic square uses the numbers 1 through 9 and has a magic constant of 15. Ancient Chinese mathematicians discovered the first magic square, called the Lo Shu, over 4,000 years ago! Benjamin Franklin loved magic squares so much that he created complex 8\u00D78 and 16\u00D716 versions with amazing properties that mathematicians still study today.',
          extraTag: 'Lo Shu: oldest known magic square',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'It took mathematicians 30 years of work and millions of hours of computer time to prove that any Rubik\'s Cube can be solved in 20 moves or fewer. They had to check all 43 quintillion positions! The proof was finally completed in 2010 by a team using Google\'s computers.',
        },
      ],
      videos: [
        {
          youtubeId: 'FW2Hvs5WaRY',
          title: 'Group Theory 101: How to Play a Rubik\'s Cube Like a Piano',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['patterns-q2a', 'patterns-q2b', 'patterns-q2c'],
    },

    // ─── Section 3: Math Magic Tricks ───────────────────────────
    {
      id: 'math-magic',
      icon: '\u{1FA84}',
      title: 'Math Magic Tricks: Amaze Your Friends!',
      readAloudBlocks: [
        {
          id: 'magic-intro-text',
          paragraphs: [
            'Here\'s a secret that magicians don\'t want you to know: many of the most impressive magic tricks are actually powered by math! Number prediction tricks, card tricks, and mind-reading illusions all use mathematical principles to create seemingly impossible effects.',
            'Try this: think of any number. Double it. Add 10. Divide by 2. Subtract your original number. Your answer is 5! How did we know? It\'s algebra in disguise! If your number is x, the steps are: 2x \u2192 2x+10 \u2192 x+5 \u2192 5. The original number always cancels out, leaving 5 every single time!',
            'Math magicians, sometimes called "mathemagicians," use properties of numbers, probability, and algebra to perform tricks that seem like real magic. The beauty is that once you understand the math, you can invent your own tricks! Let\'s learn some mathemagic!',
          ],
        },
        {
          id: 'magic-outro-text',
          paragraphs: [
            'The best part about math magic is that it really works, every single time! Unlike regular magic tricks that rely on hidden cards or secret pockets, math magic is powered by the unbreakable rules of mathematics. Once you understand the patterns, you\'ll see that math itself is the most magical thing in the universe!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3A9}',
          name: 'The 1089 Trick',
          title: 'A Number Prediction That Always Works',
          description:
            'Here\'s a trick to amaze your friends! Ask someone to pick any three-digit number where the first digit is bigger than the last (like 742). Reverse the digits (247). Subtract the smaller from the larger (742 - 247 = 495). Now reverse THAT result (594). Add the two numbers together (495 + 594). The answer is ALWAYS 1089! This works because of how place values behave in subtraction and addition. The mathematical proof involves algebra with hundreds, tens, and ones places!',
          extraTag: 'Answer: Always 1089',
        },
        {
          emoji: '\u{1F0CF}',
          name: 'The 27 Card Trick',
          title: 'A 400-Year-Old Mathematical Card Trick',
          description:
            'This famous trick uses math to find a chosen card. Deal 27 cards into three columns. Ask someone to point to the column containing their card. Pick up the cards with their column in the middle. Repeat two more times. Their card will always end up in position 14 (the middle)! This works because placing the chosen column in the middle narrows down the position using base-3 mathematics. With each deal, the card moves closer to the center position. It\'s been amazing audiences for over 400 years!',
          extraTag: 'Based on base-3 math',
        },
        {
          emoji: '\u{1F52E}',
          name: 'The Birthday Prediction',
          title: 'Guess Someone\'s Birthday With Math',
          description:
            'Ask someone to multiply their birth month by 5, add 6, multiply by 4, add 9, multiply by 5, then add their birth day. When they tell you the final number, subtract 165, and you\'ll have their birthday! The first one or two digits are the month and the last two are the day. This works because the algebraic steps isolate the month in the hundreds place and the day in the ones and tens places. The constants (6, 9, and 165) are carefully chosen to make the algebra work perfectly!',
          extraTag: 'Algebra in disguise',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Arthur Benjamin, a famous "mathemagician" and math professor, can square any two-digit number in his head faster than someone can type it into a calculator! He uses clever algebraic tricks. For example, to square 73, he thinks: 73\u00D773 = 73\u00D770 + 73\u00D73 = 5110 + 219 = 5329. Practice makes perfect!',
        },
      ],
      videos: [
        {
          youtubeId: 'e4PTvXtz4GM',
          title: 'A Performance of "Mathemagic"',
          channelName: 'TED',
        },
      ],
      quizIds: ['patterns-q3a', 'patterns-q3b', 'patterns-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Patterns in Nature
    {
      id: 'patterns-q1a',
      sectionId: 'patterns-nature',
      title: 'Quick Quiz Time!',
      question:
        'What is the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, __?',
      options: [
        { text: '18', isCorrect: false },
        { text: '21', isCorrect: true },
        { text: '26', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'patterns-q1b',
      sectionId: 'patterns-nature',
      title: 'Nature\'s Patterns Challenge!',
      question:
        'What is a fractal?',
      options: [
        { text: 'A shape that looks the same no matter how much you zoom in', isCorrect: true },
        { text: 'A number that can only be divided by itself and 1', isCorrect: false },
        { text: 'A straight line that goes on forever', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'patterns-q1c',
      sectionId: 'patterns-nature',
      title: 'Golden Ratio Quiz!',
      question:
        'The ratio between consecutive Fibonacci numbers approaches what famous mathematical value?',
      options: [
        { text: 'Pi (3.14159...)', isCorrect: false },
        { text: 'The golden ratio (1.618...)', isCorrect: true },
        { text: 'Euler\'s number (2.718...)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'patterns-q1d',
      sectionId: 'patterns-nature',
      title: 'Symmetry Spotter!',
      question:
        'What type of symmetry does a butterfly have?',
      options: [
        { text: 'Rotational symmetry', isCorrect: false },
        { text: 'Bilateral symmetry (left matches right)', isCorrect: true },
        { text: 'Asymmetry (no symmetry)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Famous Puzzles
    {
      id: 'patterns-q2a',
      sectionId: 'famous-puzzles',
      title: 'Quick Quiz Time!',
      question:
        'How many possible positions does a Rubik\'s Cube have?',
      options: [
        { text: 'About 1 million', isCorrect: false },
        { text: 'About 43 quintillion', isCorrect: true },
        { text: 'About 1 billion', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'patterns-q2b',
      sectionId: 'famous-puzzles',
      title: 'Towers of Hanoi Challenge!',
      question:
        'If you have 10 disks in the Towers of Hanoi puzzle, how many moves does it take to solve?',
      options: [
        { text: '100 moves', isCorrect: false },
        { text: '512 moves', isCorrect: false },
        { text: '1,023 moves', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'patterns-q2c',
      sectionId: 'famous-puzzles',
      title: 'Magic Square Master!',
      question:
        'In a 3\u00D73 magic square using numbers 1-9, what is the magic constant (the sum of each row, column, and diagonal)?',
      options: [
        { text: '12', isCorrect: false },
        { text: '15', isCorrect: true },
        { text: '18', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Math Magic
    {
      id: 'patterns-q3a',
      sectionId: 'math-magic',
      title: 'Quick Quiz Time!',
      question:
        'In the math trick "think of a number, double it, add 10, divide by 2, subtract your number," what is the answer always?',
      options: [
        { text: '10', isCorrect: false },
        { text: '5', isCorrect: true },
        { text: '0', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'patterns-q3b',
      sectionId: 'math-magic',
      title: 'Mathemagic Challenge!',
      question:
        'In the 1089 trick, you pick a three-digit number, reverse it, subtract, reverse again, and add. What is the answer always?',
      options: [
        { text: '999', isCorrect: false },
        { text: '1089', isCorrect: true },
        { text: '1111', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'patterns-q3c',
      sectionId: 'math-magic',
      title: 'Card Trick Math!',
      question:
        'The 27 Card Trick uses what mathematical base to locate the chosen card?',
      options: [
        { text: 'Base-2 (binary)', isCorrect: false },
        { text: 'Base-3 (ternary)', isCorrect: true },
        { text: 'Base-10 (decimal)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'patterns-essay',
    prompt:
      'Describe a pattern you\'ve noticed in nature and explain why you think it exists.',
    description:
      'Think about the world around you. Have you ever noticed patterns in leaves, flowers, clouds, snowflakes, or animal markings? Describe a pattern you\'ve observed and share your ideas about why nature creates it. Is there a mathematical reason? Does it help the plant or animal survive? Be creative! You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Wonderful observation! You have the eyes of a mathematician! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'patterns-reward',
    title: 'Fractal Explorer!',
    description:
      'You\'ve unlocked the Fractal Explorer! Zoom into the infinite world of the Mandelbrot Set and discover beautiful patterns that repeat forever. Change the colors, zoom deeper, and find hidden shapes within shapes!',
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
      'AMAZING! You\'ve unlocked the Fractal Explorer! Dive into the infinite beauty of mathematics!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'ve Unlocked the Magic of Math!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through the most magical side of mathematics!',
      'You discovered the Fibonacci sequence hiding in sunflowers and seashells, fractals that repeat infinitely in ferns and coastlines, and the beautiful symmetry of butterflies and snowflakes. Nature is the greatest mathematician of all!',
      'You tackled some of the world\'s most famous puzzles: the Rubik\'s Cube with its 43 quintillion positions, the Towers of Hanoi that would outlast the universe, and magic squares that have fascinated people for 4,000 years.',
      'And you learned the secrets of math magic: tricks that work every single time because they\'re powered by algebra, number properties, and probability. Now you can amaze your friends with the 1089 trick, the 27 Card Trick, and the birthday prediction!',
      'Remember: math isn\'t just about doing homework. It\'s the hidden language that creates beauty, solves puzzles, and makes the impossible possible. Keep looking for patterns, and you\'ll find math everywhere!',
    ],
  },
};
