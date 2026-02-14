import type { Topic } from '../types';

export const mathMagicTricks: Topic = {
  id: 'math-magic-tricks',
  slug: 'math-magic-tricks',
  title: 'Math Magic Tricks',
  subtitle:
    'Amaze Your Friends with the Power of Numbers!',
  status: 'active',
  themeId: 'math-magic-tricks',
  heroIcons: ['\u{1FA84}', '\u{1F0CF}', '\u2728'],
  navItems: [
    { id: 'number-prediction', icon: '\u{1F52E}', label: 'Number Prediction' },
    { id: 'card-magic', icon: '\u{1F0CF}', label: 'Card Magic & Algebra' },
    { id: 'mind-reading', icon: '\u{1F9E0}', label: 'Mind Reading & Binary' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1FA84}',
      title: 'Welcome, Young Mathemagician!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'What if you could read minds, predict the future, and amaze your friends — using nothing but math? Welcome to the world of mathematical magic tricks, where algebra, number theory, and clever patterns create illusions that seem truly impossible!',
            'Math magicians (sometimes called "mathemagicians") have been entertaining audiences for centuries. The tricks look like magic, but they work every single time because they\'re based on mathematical properties that are always true, no matter what numbers you choose. Once you understand the math, you can perform these tricks perfectly — and even invent your own!',
            'In this adventure, you\'ll learn number prediction tricks that always arrive at the same answer, card tricks powered by algebra, and a mind-reading technique that uses binary numbers. Get ready to become a mathemagician!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'ObiqJzfyACM',
          title: 'Math Magic',
          channelName: 'Vsauce',
        },
        {
          youtubeId: 'M4vqr3_ROIk',
          title: 'A Performance of "Mathemagic"',
          channelName: 'TED',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Number Prediction ──────────────────────────
    {
      id: 'number-prediction',
      icon: '\u{1F52E}',
      title: 'Number Prediction: Always Landing on the Same Answer',
      readAloudBlocks: [
        {
          id: 'prediction-intro-text',
          paragraphs: [
            'Here\'s a trick you can try right now. Think of any number between 1 and 10. Double it. Add 8. Divide by 2. Subtract your original number. Your answer is 4! It doesn\'t matter what number you started with — the result is always 4. How?',
            'Let\'s use algebra to see why. Call your number n. Double it: 2n. Add 8: 2n + 8. Divide by 2: (2n + 8)/2 = n + 4. Subtract your original number: (n + 4) \u2212 n = 4. The n cancels itself out! No matter what number you pick, the algebra always simplifies to 4. This is the secret behind number prediction tricks.',
            'One of the most famous number tricks is the "1089 trick." Take any three-digit number where the first digit is bigger than the last by at least 2 (like 742). Reverse the digits (247). Subtract the smaller from the larger (742 \u2212 247 = 495). Reverse that result (594). Add them together (495 + 594 = 1089). The answer is ALWAYS 1089! The algebra behind it is more complex, but the principle is the same: the variables cancel out, leaving a constant.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F522}',
          name: 'The 1089 Trick',
          title: 'A 300-Year-Old Math Mystery',
          description:
            'The 1089 trick was first described in a 1726 book and has amazed people ever since. Here\'s why it works: any three-digit number where the first and last digits differ by at least 2 will, after the reverse-subtract-reverse-add process, always produce 1089. The middle digit always becomes 9, and the outer digits always sum to 9. This means the subtraction result is always one of: 099, 198, 297, 396, 495, 594, 693, 792, or 891. Each of these, when reversed and added to itself, equals 1089!',
          extraTag: 'First published: 1726',
        },
        {
          emoji: '\u{1F9EE}',
          name: 'The Algebra Behind the Magic',
          title: 'Why Variables Cancel Out',
          description:
            'Number prediction tricks work because of a mathematical principle: when you perform the same operations on an unknown number and then undo them, the unknown disappears. "Think of a number, double it, add 6, divide by 2, subtract your number" always gives 3, because the algebra simplifies to (2n + 6)/2 \u2212 n = (n + 3) \u2212 n = 3. The "n" is eliminated! Mathemagicians design their instructions so that no matter what the audience chooses, the algebra always reaches the same destination.',
          extraTag: 'Key: variables cancel out',
        },
        {
          emoji: '\u{1F31F}',
          name: 'The Number 9 Trick',
          title: 'The Magic of Nines',
          description:
            'The number 9 has a special property: any number multiplied by 9 has digits that add up to 9 (or a multiple of 9). Try it: 9 \u00D7 7 = 63, and 6 + 3 = 9. 9 \u00D7 123 = 1107, and 1 + 1 + 0 + 7 = 9. This property is called "digital root" and it\'s the basis for many prediction tricks. Ask someone to multiply any number by 9, then add up all the digits of the result. No matter what they chose, you can predict their answer!',
          extraTag: 'Digits of 9\u00D7n always sum to 9',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'There\'s a trick called "Think of a number" that\'s been found in ancient texts from India and the Middle East dating back over 1,000 years. Medieval mathematicians used these tricks not just for entertainment, but to teach algebra to their students! The tricks are fun precisely because algebra is powerful.',
        },
      ],
      videos: [],
      quizIds: ['magic-q1a', 'magic-q1b', 'magic-q1c', 'magic-q1d'],
    },

    // ─── Section 2: Card Magic & Algebra ───────────────────────
    {
      id: 'card-magic',
      icon: '\u{1F0CF}',
      title: 'Card Magic & Algebra: Tricks That Never Fail',
      readAloudBlocks: [
        {
          id: 'card-intro-text',
          paragraphs: [
            'Card tricks are some of the most impressive magic tricks because there are so many possibilities — a deck has 52 cards, and they can be arranged in more ways than there are atoms in the observable universe (52! = about 8 \u00D7 10\u2076\u2077 arrangements). Yet mathematical card tricks work perfectly every time because they exploit hidden mathematical structures.',
            'The most famous mathematical card trick is the "21-card trick." Deal 21 cards face-up into three columns of 7 cards each. Ask someone to think of a card and tell you which column it\'s in. Gather the cards, placing the chosen column in the middle. Deal into three columns again. Ask which column. Gather again with the chosen column in the middle. Deal one more time. Ask which column. Gather the same way. The chosen card is now exactly in position 11 — the middle of the 21 cards!',
            'Why does this work? Each time the person identifies their column, you narrow the card\'s possible position. After the first round, it\'s one of 7 cards in the middle group. After the second, it\'s one of about 3. After the third, it\'s exactly 1 — always in position 11. The math is based on a principle in combinatorics called the Gergonne pile principle, named after French mathematician Joseph Gergonne.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F0CF}',
          name: 'The 21-Card Trick',
          title: 'Three Deals to Perfection',
          description:
            'The 21-card trick works because of the mathematics of positioning. When you place the chosen column between the other two columns, you\'re putting the card somewhere in positions 8-14. When dealt again into 3 columns of 7, the card lands in a new column, and the person tells you which one. Each gathering narrows the position. After 3 rounds, the card converges to exactly position 11. This trick is actually a special case of a more general principle: with n columns and k deals, you can find a card among n\u1D4F cards!',
          extraTag: '3 deals \u2192 position 11',
        },
        {
          emoji: '\u{1F3AD}',
          name: 'Mathematical Card Forces',
          title: 'Making Someone "Choose" Your Card',
          description:
            'A "force" is when a magician makes the audience think they have a free choice, but math guarantees a specific outcome. One famous force: lay out pairs of cards. Ask someone to point to a pair; if it contains your target card, remove the other pair. If it doesn\'t, remove the pointed-to pair. Repeat until one card remains — your target! This is related to a math concept called "invariant" — something that stays the same no matter what choices are made.',
          extraTag: 'Concept: mathematical invariant',
        },
        {
          emoji: '\u{1F3B0}',
          name: 'Gilbreath\'s Principle',
          title: 'A Shuffle That Can\'t Be Broken',
          description:
            'Discovered by mathematician Norman Gilbreath in 1958, this principle says: if you arrange a deck in alternating red-black order, cut it anywhere, then riffle shuffle (interleave) the two halves together, every pair of adjacent cards will contain exactly one red and one black card! No matter how the shuffle goes, the pattern is guaranteed. This mathematical property is the basis for many impressive card tricks that seem to survive a "random" shuffle.',
          extraTag: 'Discovered: 1958',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A standard deck of 52 cards can be arranged in 52! (52 factorial) different orders. That\'s approximately 80,658,175,170,943,878,571,660,636,856,404,000,000,000,000,000,000,000,000,000,000,000,000 arrangements. Every time you shuffle a deck thoroughly, it\'s almost certainly in an order that has never existed before in the history of the universe!',
        },
      ],
      videos: [
        {
          youtubeId: 'l7lP9y7Bb5g',
          title: 'Beautiful Card Trick (27-Card Trick)',
          channelName: 'Numberphile',
        },
      ],
      quizIds: ['magic-q2a', 'magic-q2b', 'magic-q2c'],
    },

    // ─── Section 3: Mind Reading & Binary ──────────────────────
    {
      id: 'mind-reading',
      icon: '\u{1F9E0}',
      title: 'Mind Reading & Binary: The Trick That Reads Your Mind',
      readAloudBlocks: [
        {
          id: 'binary-intro-text',
          paragraphs: [
            'This is one of the coolest math tricks you can learn. You show a friend six cards, each with a grid of numbers from 1 to 63. You ask them to think of any number in that range and tell you which cards their number appears on. Instantly, you tell them their number. It looks like mind reading, but it\'s actually binary math!',
            'Here\'s the secret: each card represents a power of 2 (1, 2, 4, 8, 16, 32). The first card has every number whose binary representation has a 1 in the "ones" place. The second card has every number with a 1 in the "twos" place. And so on. When someone tells you which cards contain their number, they\'re really telling you its binary representation!',
            'For example, if someone says their number is on cards 1, 3, and 6, they\'ve told you it has 1s in the 1, 4, and 32 positions. So their number is 1 + 4 + 32 = 37! You just add the top-left numbers of each card they selected. This works because every number from 1 to 63 has a unique binary representation using 6 digits (bits), and each card corresponds to one bit.',
          ],
        },
        {
          id: 'binary-outro-text',
          paragraphs: [
            'From number prediction to card algebra to binary mind reading, mathematical magic shows us something wonderful: math isn\'t just useful — it\'s genuinely magical. The patterns and properties of numbers create effects that seem impossible until you understand the hidden structure. Every mathemagician knows: the best magic is the kind that works every single time, and only math can guarantee that!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4BB}',
          name: 'The Binary Number System',
          title: 'How Computers (and Magicians) Think',
          description:
            'Binary uses only two digits: 0 and 1. Every number can be written in binary: 1 is 000001, 5 is 000101, 37 is 100101, and 63 is 111111. The six positions represent 32, 16, 8, 4, 2, and 1 (the powers of 2). The binary mind-reading trick works because these six values can combine to make any number from 1 to 63 (since 32 + 16 + 8 + 4 + 2 + 1 = 63). With a 7th card (representing 64), you could go up to 127!',
          extraTag: 'Powers of 2: 1, 2, 4, 8, 16, 32',
        },
        {
          emoji: '\u{1FA84}',
          name: 'Arthur Benjamin',
          title: 'The World\'s Most Famous Mathemagician',
          description:
            'Arthur Benjamin is a professor of mathematics at Harvey Mudd College and one of the world\'s most famous mathemagicians. He can multiply large numbers in his head faster than a calculator, and his TED talk on "mathemagic" has been viewed millions of times. He demonstrates that math isn\'t just about formulas on paper — it\'s a performing art! His book "Secrets of Mental Math" teaches anyone how to do seemingly impossible calculations in their head.',
          extraTag: 'Professor at Harvey Mudd College',
        },
        {
          emoji: '\u{1F3B2}',
          name: 'The Nim Game',
          title: 'A Game You Can Always Win with Math',
          description:
            'Nim is an ancient strategy game where two players take turns removing objects from piles. The player who takes the last object wins (or loses, depending on the version). Here\'s the amazing part: there\'s a mathematical strategy that guarantees you win if you go first (or second, depending on the starting position). The strategy uses binary: write each pile size in binary, and make sure each binary column has an even number of 1s. If you can always maintain this condition, you cannot lose!',
          extraTag: 'Strategy: binary XOR = 0',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The binary mind-reading trick can be scaled up! With 7 cards, you can guess numbers up to 127. With 8 cards, up to 255. With 10 cards, up to 1,023! Each additional card doubles the range. This is the same principle that makes computers so powerful: every extra bit of memory doubles the number of values it can store.',
        },
      ],
      videos: [
        {
          youtubeId: '4izjrtR8Ozg',
          title: 'Little Fibs (Fibonacci Card Trick)',
          channelName: 'Numberphile',
        },
      ],
      quizIds: ['magic-q3a', 'magic-q3b', 'magic-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Number Prediction
    {
      id: 'magic-q1a',
      sectionId: 'number-prediction',
      title: 'Quick Quiz Time!',
      question:
        'In the trick "think of a number, double it, add 8, divide by 2, subtract your number," what is the answer always?',
      options: [
        { text: '2', isCorrect: false },
        { text: '4', isCorrect: true },
        { text: '8', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'magic-q1b',
      sectionId: 'number-prediction',
      title: '1089 Challenge!',
      question:
        'In the 1089 trick, what three-digit number do you always end up with?',
      options: [
        { text: '1001', isCorrect: false },
        { text: '1089', isCorrect: true },
        { text: '9801', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'magic-q1c',
      sectionId: 'number-prediction',
      title: 'Algebra Magic!',
      question:
        'Why do number prediction tricks always work?',
      options: [
        { text: 'Because they use special magic numbers', isCorrect: false },
        { text: 'Because the variable (unknown number) always cancels out in the algebra', isCorrect: true },
        { text: 'Because they only work with certain numbers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'magic-q1d',
      sectionId: 'number-prediction',
      title: 'The Number 9 Quiz!',
      question:
        'What special property does the number 9 have when you multiply it by any whole number?',
      options: [
        { text: 'The result is always even', isCorrect: false },
        { text: 'The result is always a prime number', isCorrect: false },
        { text: 'The digits of the result always add up to 9 (or a multiple of 9)', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Card Magic & Algebra
    {
      id: 'magic-q2a',
      sectionId: 'card-magic',
      title: 'Quick Quiz Time!',
      question:
        'In the 21-card trick, after three rounds of dealing and gathering, what position is the chosen card always in?',
      options: [
        { text: 'Position 1', isCorrect: false },
        { text: 'Position 7', isCorrect: false },
        { text: 'Position 11', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'magic-q2b',
      sectionId: 'card-magic',
      title: 'Card Math Challenge!',
      question:
        'In Gilbreath\'s Principle, if you arrange a deck in alternating red-black order, cut it, and riffle shuffle, what is guaranteed?',
      options: [
        { text: 'The deck returns to its original order', isCorrect: false },
        { text: 'Every pair of adjacent cards has one red and one black', isCorrect: true },
        { text: 'All red cards end up on top', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'magic-q2c',
      sectionId: 'card-magic',
      title: 'Deck Shuffle Quiz!',
      question:
        'Approximately how many different ways can a standard 52-card deck be arranged?',
      options: [
        { text: 'About 52 thousand', isCorrect: false },
        { text: 'About 52 million', isCorrect: false },
        { text: 'About 8 \u00D7 10\u2076\u2077 (more than atoms in the universe)', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Mind Reading & Binary
    {
      id: 'magic-q3a',
      sectionId: 'mind-reading',
      title: 'Quick Quiz Time!',
      question:
        'In the binary mind-reading trick with 6 cards, what range of numbers can you guess?',
      options: [
        { text: '1 to 10', isCorrect: false },
        { text: '1 to 63', isCorrect: true },
        { text: '1 to 100', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'magic-q3b',
      sectionId: 'mind-reading',
      title: 'Binary Challenge!',
      question:
        'If someone says their number appears on cards with values 1, 4, and 32, what is their number?',
      options: [
        { text: '36', isCorrect: false },
        { text: '37', isCorrect: true },
        { text: '42', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'magic-q3c',
      sectionId: 'mind-reading',
      title: 'Nim Strategy Quiz!',
      question:
        'What number system does the winning strategy for the game of Nim use?',
      options: [
        { text: 'Decimal (base 10)', isCorrect: false },
        { text: 'Roman numerals', isCorrect: false },
        { text: 'Binary (base 2)', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'magic-essay',
    prompt:
      'Which math magic trick impressed you the most, and how would you explain it to a friend?',
    description:
      'Now it\'s your turn! Think about the tricks you\'ve learned — number predictions, the 1089 trick, the 21-card trick, binary mind reading, or the Nim strategy. Which one amazes you the most? Try explaining how it works in your own words. The best mathemagicians can both perform a trick AND explain the math behind it! You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Magical explanation! You\'re a true mathemagician! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'magic-reward',
    title: 'Card Trick Simulator!',
    description:
      'You\'ve unlocked the Card Trick Simulator! Step through the famous 21-card trick and see exactly why the math guarantees the card always ends up in position 11. Then try variations with different numbers of cards and columns!',
    lockMessage: 'Card Trick Simulator Locked!',
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
    type: 'card-trick-simulator',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Card Trick Simulator! You\'re a true mathemagician!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'The Grand Finale, Mathemagician!',
    paragraphs: [
      'Congratulations! You\'ve mastered the art of mathematical magic!',
      'You learned how number prediction tricks use algebra to make variables cancel out, always arriving at the same answer no matter what number your audience picks. You discovered the 1089 trick that\'s been amazing people since 1726, and the magical properties of the number 9.',
      'You explored card magic powered by math: the 21-card trick that uses the Gergonne principle to find a card in exactly 3 rounds, Gilbreath\'s shuffle principle that guarantees red-black pairs, and the mind-boggling fact that 52 cards can be arranged in more ways than there are atoms in the universe.',
      'And you learned the ultimate mind-reading trick: using binary numbers and six simple cards to guess any number from 1 to 63. You met mathemagician Arthur Benjamin and discovered how binary strategy makes you unbeatable at the game of Nim.',
      'Now go amaze your friends and family! And remember: the best part of math magic is that you can always explain how it works. The real magic is the math itself!',
    ],
  },
};
