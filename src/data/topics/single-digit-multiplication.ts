import type { Topic } from '../types';

export const singleDigitMultiplication: Topic = {
  id: 'single-digit-multiplication',
  slug: 'single-digit-multiplication',
  title: 'Pirate Treasure Counter',
  subtitle: 'Master Single-Digit Multiplication',
  status: 'active',
  themeId: 'single-digit-multiplication',
  heroIcons: ['\u{1F3F4}\u200D\u2620\uFE0F', '\u2716\uFE0F', '\u{1FA99}'],
  navItems: [
    { id: 'treasure-groups', icon: '\u{1FA99}', label: 'Treasure Groups' },
    { id: 'times-tables-tricks', icon: '\u{1F9ED}', label: 'Times Tables Tricks' },
    { id: 'pirate-challenges', icon: '\u2694\uFE0F', label: 'Pirate Challenges' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3F4}\u200D\u2620\uFE0F',
      title: 'Welcome Aboard, Young Pirate!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Ahoy, matey! Welcome aboard the S.S. Multiplier, the fastest ship on the seven seas! Captain Calculator here, and I\'ve got a very special mission for you.',
            'You see, pirates collect treasure all day long, but counting gold coins one by one takes forever! That\'s why the smartest pirates learned a secret trick called MULTIPLICATION. Instead of counting every single coin, they learned to count in groups!',
            'Multiplication is really just a faster way to add the same number over and over. If you have 3 treasure chests with 5 gold coins in each one, you could add 5 + 5 + 5. But a clever pirate knows that 3 groups of 5 is 3 \u00D7 5 = 15! That\'s multiplication, and it makes counting treasure a breeze!',
            'In this adventure, you\'ll learn how to think about multiplication as groups, discover amazing tricks for remembering your times tables, and solve real pirate treasure problems. Are you ready to become the fastest treasure counter on the high seas? Let\'s set sail!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'mvOkMYCygps',
          title: 'Introduction to Multiplication',
          channelName: 'Khan Academy',
        },
        {
          youtubeId: 'dSz62j9JNb4',
          title: 'Multiplication as Equal Groups',
          channelName: 'Math Antics',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Treasure Groups ─────────────────────────────
    {
      id: 'treasure-groups',
      icon: '\u{1FA99}',
      title: 'Treasure Groups: What Multiplication Really Means',
      readAloudBlocks: [
        {
          id: 'treasure-groups-intro',
          paragraphs: [
            'First Mate Multiply here! Let me teach you the most important idea in all of multiplication: it\'s all about GROUPS of equal size.',
            'Imagine you found 4 treasure bags, and each bag holds exactly 6 gold coins. How many coins do you have? You could count them one at a time: 1, 2, 3, 4, 5, 6... that\'s one bag. Then 7, 8, 9, 10, 11, 12... that\'s two bags. It would take a long time! But with multiplication, you just say 4 \u00D7 6 = 24. Four groups of six equals twenty-four!',
            'Here\'s the pirate secret: the first number tells you HOW MANY groups, and the second number tells you HOW MANY are in each group. So 3 \u00D7 5 means 3 groups of 5. And 5 \u00D7 3 means 5 groups of 3. The amazing thing? Both equal 15! The order doesn\'t matter! Pirates call this the "swap trick."',
            'Let\'s try some treasure counting! If Captain Calculator stores 7 rubies in each of 2 treasure boxes, that\'s 2 \u00D7 7 = 14 rubies. If there are 5 pirates and each one finds 8 pearls, that\'s 5 \u00D7 8 = 40 pearls! See how fast that is?',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9ED}',
          name: 'Captain Calculator',
          title: 'Leader of the S.S. Multiplier',
          description:
            'Captain Calculator has sailed the seven seas for thirty years and knows that the fastest way to count treasure is multiplication! He always says, "Why add when you can multiply?" He can count a mountain of gold coins in seconds using his trusty multiplication skills.',
          extraTag: 'Motto: "Count in groups, not one by one!"',
        },
        {
          emoji: '\u2693',
          name: 'First Mate Multiply',
          title: 'Expert in Equal Groups',
          description:
            'First Mate Multiply got her name because she can spot equal groups anywhere! Whether it\'s cannonballs stacked in rows, barrels of provisions, or piles of treasure, she instantly sees the multiplication. She loves teaching young pirates that multiplication is just repeated addition made easy.',
          extraTag: 'Skill: Spotting equal groups instantly',
        },
        {
          emoji: '\u{1F9FF}',
          name: 'Navigator Nine',
          title: 'Master of the Nine Times Table',
          description:
            'Navigator Nine is famous across all the pirate seas for his incredible nine times table tricks. He can use his ten fingers to solve any 9 \u00D7 problem in a flash! He also knows secret patterns in every times table that make memorizing them much easier.',
          extraTag: 'Special power: The finger trick for nines',
        },
      ],
      funFacts: [
        {
          title: 'Pirate Math Fact!',
          text: 'Did you know that multiplication has a special "swap" property called the commutative property? It means 3 \u00D7 7 always equals 7 \u00D7 3. Imagine 3 rows of 7 coins. Now turn the grid sideways and you get 7 rows of 3 coins. Same total either way: 21 coins!',
        },
      ],
      videos: [
        {
          youtubeId: 'AuKs2AEsFSo',
          title: 'Multiplication as Repeated Addition',
          channelName: 'Numberblocks',
        },
      ],
      quizIds: ['mult-q1a', 'mult-q1b', 'mult-q1c', 'mult-q1d'],
    },

    // ─── Section 2: Times Tables Tricks ─────────────────────────
    {
      id: 'times-tables-tricks',
      icon: '\u{1F9ED}',
      title: 'Times Tables Tricks Every Pirate Should Know',
      readAloudBlocks: [
        {
          id: 'tricks-intro',
          paragraphs: [
            'Navigator Nine here with some of the best-kept secrets of the pirate world: times tables tricks! You don\'t have to memorize every single fact. Smart pirates use patterns and tricks.',
            'The TWO times table is just doubling! 2 \u00D7 6? Just double 6 to get 12. The FIVE times table always ends in 0 or 5. Count by fives: 5, 10, 15, 20, 25! The TEN times table is the easiest of all. Just add a zero! 10 \u00D7 7 = 70.',
            'Now here\'s my favorite: the NINE times table finger trick! Hold up all ten fingers. To find 9 \u00D7 4, put down your 4th finger (counting from the left). You\'ll see 3 fingers on the left and 6 on the right. The answer is 36! Try it with 9 \u00D7 7: put down your 7th finger. You see 6 on the left and 3 on the right. That\'s 63!',
            'Here\'s another nines pattern: the digits of any answer in the nine times table always add up to 9! Check it: 9 \u00D7 3 = 27, and 2 + 7 = 9. Try 9 \u00D7 8 = 72, and 7 + 2 = 9. It works every time!',
            'For SKIP COUNTING, try counting by threes (3, 6, 9, 12, 15...) or by fours (4, 8, 12, 16, 20...). The more you practice skip counting, the faster your times tables will become. You\'ll be counting treasure faster than any pirate on the seven seas!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Navigator Nine\'s Secret!',
          text: 'Here\'s a wild pattern: in the nine times table, as the tens digit goes up by one (0, 1, 2, 3, 4, 5, 6, 7, 8), the ones digit goes down by one (9, 8, 7, 6, 5, 4, 3, 2, 1). So the answers are 9, 18, 27, 36, 45, 54, 63, 72, 81. Reverse mirror magic!',
        },
      ],
      videos: [
        {
          youtubeId: 'OCWjkMPzJng',
          title: 'Times Tables Tips and Tricks',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'jaDSjEfNhu8',
          title: '9 Times Table Trick on Your Fingers',
          channelName: 'Jack Hartmann',
        },
      ],
      quizIds: ['mult-q2a', 'mult-q2b', 'mult-q2c'],
    },

    // ─── Section 3: Pirate Challenges ───────────────────────────
    {
      id: 'pirate-challenges',
      icon: '\u2694\uFE0F',
      title: 'Pirate Treasure Challenges',
      readAloudBlocks: [
        {
          id: 'challenges-intro',
          paragraphs: [
            'Now it\'s time to put your multiplication skills to the ultimate test! Captain Calculator has set up some real pirate treasure challenges for you.',
            'When you see a word problem, here\'s the pirate method: First, find the GROUPS (how many sets?). Second, find the SIZE (how many in each group?). Third, MULTIPLY them together. Fourth, write your answer with a label (coins, gems, etc.)!',
            'For example: "A pirate ship has 6 cannons on each side, and it has 2 sides. How many cannons total?" Groups = 2 sides. Size = 6 cannons each. Multiply: 2 \u00D7 6 = 12 cannons!',
            'Remember, multiplication shows up everywhere in a pirate\'s life: counting coins, loading cannonballs, dividing up loot, measuring distances on maps, and even figuring out how many days until you reach the treasure island! The more you practice, the faster you\'ll become.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Real Pirate Math!',
          text: 'Real pirates actually needed math! They had to divide treasure fairly among crew members, calculate distances using navigation charts, and keep track of supplies. A pirate captain who couldn\'t do math would quickly lose his crew\'s trust!',
        },
      ],
      videos: [
        {
          youtubeId: 'YBqSJSqP9RE',
          title: 'Multiplication Word Problems',
          channelName: 'Khan Academy',
        },
      ],
      quizIds: ['mult-q3a', 'mult-q3b', 'mult-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Treasure Groups
    {
      id: 'mult-q1a',
      sectionId: 'treasure-groups',
      title: 'Treasure Counting!',
      question:
        'The pirate found 4 bags with 7 gold coins in each bag. How many gold coins did the pirate find in total?',
      options: [
        { text: '21', isCorrect: false },
        { text: '28', isCorrect: true },
        { text: '32', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mult-q1b',
      sectionId: 'treasure-groups',
      title: 'Cannon Count!',
      question:
        'There are 3 rows of cannonballs, with 8 cannonballs in each row. How many cannonballs are there?',
      options: [
        { text: '11', isCorrect: false },
        { text: '21', isCorrect: false },
        { text: '24', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mult-q1c',
      sectionId: 'treasure-groups',
      title: 'Gem Collection!',
      question:
        'Captain Calculator has 6 treasure chests, each with 5 rubies inside. How many rubies does he have altogether?',
      options: [
        { text: '25', isCorrect: false },
        { text: '30', isCorrect: true },
        { text: '35', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mult-q1d',
      sectionId: 'treasure-groups',
      title: 'Pirate Crew!',
      question:
        'There are 9 pirates, and each pirate carries 3 swords. How many swords are there in total?',
      options: [
        { text: '27', isCorrect: true },
        { text: '24', isCorrect: false },
        { text: '12', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Times Tables Tricks
    {
      id: 'mult-q2a',
      sectionId: 'times-tables-tricks',
      title: 'Nines Trick Challenge!',
      question:
        'Using the finger trick for nines, what is 9 \u00D7 6? (Put down your 6th finger: you see 5 on the left and 4 on the right.)',
      options: [
        { text: '56', isCorrect: false },
        { text: '54', isCorrect: true },
        { text: '45', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mult-q2b',
      sectionId: 'times-tables-tricks',
      title: 'Skip Counting!',
      question:
        'Navigator Nine is skip counting by 7s: 7, 14, 21, __. What number comes next?',
      options: [
        { text: '27', isCorrect: false },
        { text: '28', isCorrect: true },
        { text: '35', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mult-q2c',
      sectionId: 'times-tables-tricks',
      title: 'Double Trouble!',
      question:
        'The 2 times table is all about doubling. What is 2 \u00D7 8?',
      options: [
        { text: '14', isCorrect: false },
        { text: '16', isCorrect: true },
        { text: '18', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Pirate Challenges
    {
      id: 'mult-q3a',
      sectionId: 'pirate-challenges',
      title: 'Treasure Island!',
      question:
        'On Treasure Island, there are 7 palm trees. Each tree has 6 coconuts. How many coconuts are there on the island?',
      options: [
        { text: '42', isCorrect: true },
        { text: '36', isCorrect: false },
        { text: '48', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mult-q3b',
      sectionId: 'pirate-challenges',
      title: 'Ship Supply!',
      question:
        'The pirate ship needs supplies for 8 days. Each day the crew eats 9 barrels of food. How many barrels do they need?',
      options: [
        { text: '63', isCorrect: false },
        { text: '72', isCorrect: true },
        { text: '81', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mult-q3c',
      sectionId: 'pirate-challenges',
      title: 'Gold Sharing!',
      question:
        'Five pirates each found 5 gold coins on the beach. How many gold coins did they find altogether?',
      options: [
        { text: '10', isCorrect: false },
        { text: '20', isCorrect: false },
        { text: '25', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'mult-essay',
    prompt:
      'Create your own pirate multiplication word problem!',
    description:
      'Ahoy, matey! It\'s your turn to be the captain! Write your own pirate-themed multiplication word problem. Include the number of groups, the number in each group, and the answer. For example: "There are __ ships with __ cannons each. How many cannons total?" Be creative and make it fun! Write at least 100 characters to unlock a special surprise below!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Shiver me timbers! That\'s an amazing pirate math problem! You\'re a true treasure-counting master!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'mult-reward',
    title: 'Open the Pirate Treasure Chest!',
    description:
      'You\'ve proven yourself as the fastest treasure counter on the seven seas! Open the treasure chest to discover what\'s inside. You\'ve earned it, pirate!',
    lockMessage: 'Treasure Chest Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save a pirate word problem (100+ characters)',
      },
    ],
    type: 'treasure-chest',
    celebrationMessage:
      'YO HO HO! You\'ve unlocked the Pirate Treasure Chest! You\'re the greatest treasure counter on all seven seas!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Multiplication Master, Pirate!',
    paragraphs: [
      'Congratulations, matey! You\'ve completed your pirate multiplication training!',
      'You learned that multiplication is really just counting equal groups. Instead of adding 5 + 5 + 5 + 5, you now know to say 4 \u00D7 5 = 20. That\'s the pirate way: fast and smart!',
      'You discovered amazing tricks for your times tables: the finger trick for nines, doubling for twos, skip counting for fives and tens, and the incredible swap trick that means 3 \u00D7 7 is the same as 7 \u00D7 3.',
      'You solved real pirate treasure problems by finding the groups, finding the size, and multiplying them together. Whether it\'s counting gold coins, cannonballs, or coconuts, you can now handle it all!',
      'Keep practicing your times tables every day, and soon they\'ll be as natural as breathing. Fair winds and following seas, young pirate! Your multiplication adventures have only just begun!',
    ],
  },
};
