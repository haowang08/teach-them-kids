import type { Topic } from '../types';

export const dividingBySingleDigits: Topic = {
  id: 'dividing-by-single-digits',
  slug: 'dividing-by-single-digits',
  title: 'Pizza Party Planner',
  subtitle: 'Master Dividing by Single Digits',
  status: 'active',
  themeId: 'dividing-by-single-digits',
  heroIcons: ['\u{1F355}', '\u2797', '\u{1F389}'],
  navItems: [
    { id: 'fair-sharing', icon: '\u{1F355}', label: 'Fair Sharing' },
    { id: 'remainders', icon: '\u{1F9E9}', label: 'Remainders' },
    { id: 'party-planning', icon: '\u{1F389}', label: 'Party Planning' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F355}',
      title: 'Welcome to the Pizza Party!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Hey there, party planner! Chef Divide here, and I\'ve got the most important job in the world: making sure everyone at the pizza party gets a FAIR share!',
            'Have you ever had to split something equally among your friends? Maybe you had 12 cookies and wanted to share them with 3 friends. How many would each person get? That\'s division! Division is all about splitting things into equal groups.',
            'Think of it this way: multiplication puts groups TOGETHER, and division breaks groups APART. They\'re like opposites! If 4 \u00D7 3 = 12, then 12 \u00F7 3 = 4 and 12 \u00F7 4 = 3. Knowing your multiplication facts actually helps you divide faster!',
            'In this adventure, you\'ll learn how to share things fairly using division, discover what happens when things don\'t split evenly (hello, remainders!), and solve real pizza party planning problems. Let\'s get this party started!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'KGMf314LUc0',
          title: 'Basic Division',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'ndfeFjoperg',
          title: 'Introduction to Division',
          channelName: 'Homeschool Pop',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Fair Sharing ────────────────────────────────
    {
      id: 'fair-sharing',
      icon: '\u{1F355}',
      title: 'Fair Sharing: Dividing Things Equally',
      readAloudBlocks: [
        {
          id: 'fair-sharing-intro',
          paragraphs: [
            'Pepperoni Pete here! Let me show you how division works at a pizza party.',
            'Imagine you ordered pizza and got 24 slices total. There are 6 friends at the party. How many slices does each friend get? To find out, you divide: 24 \u00F7 6 = 4. Each friend gets 4 slices! Fair and square!',
            'Here\'s what\'s happening when you divide: you\'re asking "How many times does 6 fit into 24?" Well, 6 \u00D7 4 = 24, so 6 fits into 24 exactly 4 times. That\'s why multiplication and division are best friends!',
            'Let\'s try another one: You bought 35 party hats for 7 tables. How many hats per table? 35 \u00F7 7 = 5. Each table gets 5 hats! How did I know? Because 7 \u00D7 5 = 35.',
            'The big number being divided is called the DIVIDEND (that\'s your total pizza slices). The number you\'re dividing by is the DIVISOR (that\'s how many friends). And the answer is the QUOTIENT (that\'s how many each person gets). Dividend \u00F7 Divisor = Quotient!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F468}\u200D\u{1F373}',
          name: 'Chef Divide',
          title: 'Master Pizza Party Planner',
          description:
            'Chef Divide has been running pizza parties for twenty years and has never once given someone an unfair share! He knows that division is the secret to keeping everyone happy. His golden rule: "If it\'s not equal, it\'s not fair!"',
          extraTag: 'Motto: "Equal shares for everyone!"',
        },
        {
          emoji: '\u{1F355}',
          name: 'Pepperoni Pete',
          title: 'Division Facts Expert',
          description:
            'Pepperoni Pete loves pizza almost as much as he loves division facts! He knows all his division facts by heart because he practices them with pizza slices. He figured out that knowing your multiplication tables backwards is the fastest way to divide!',
          extraTag: 'Tip: "Multiply backwards to divide!"',
        },
        {
          emoji: '\u{1F967}',
          name: 'Remainder Rose',
          title: 'Leftover Slice Specialist',
          description:
            'Remainder Rose is the expert on what happens when things DON\'T divide evenly. She knows that sometimes there are leftovers, and that\'s perfectly okay! She says the remainder is always smaller than the number you\'re dividing by, and she\'s never wrong!',
          extraTag: 'Specialty: Making sense of leftovers',
        },
      ],
      funFacts: [
        {
          title: 'Pizza Math Fact!',
          text: 'Division and multiplication are "inverse operations," which means they undo each other. If you know that 8 \u00D7 6 = 48, you automatically know two division facts: 48 \u00F7 6 = 8 and 48 \u00F7 8 = 6. That\'s like getting three facts for the price of one!',
        },
      ],
      videos: [
        {
          youtubeId: 'it1cdxAefsk',
          title: 'Basic Division for Kids | Learn to Divide Using Grouping, Sharing, and Array Models',
          channelName: 'Tutoring Hour',
        },
      ],
      quizIds: ['div-q1a', 'div-q1b', 'div-q1c', 'div-q1d'],
    },

    // ─── Section 2: Remainders ──────────────────────────────────
    {
      id: 'remainders',
      icon: '\u{1F9E9}',
      title: 'Remainders: When Things Don\'t Divide Evenly',
      readAloudBlocks: [
        {
          id: 'remainders-intro',
          paragraphs: [
            'Remainder Rose here! Sometimes at a pizza party, things don\'t divide perfectly, and that\'s where I come in!',
            'Picture this: you have 25 pizza slices and 4 friends at the party. How do you split them? 25 \u00F7 4 = ? Well, 4 \u00D7 6 = 24, which is close but not quite 25. Each friend gets 6 slices, and there\'s 1 slice left over. We write this as 25 \u00F7 4 = 6 remainder 1, or 6 R1.',
            'The remainder is the leftover part that doesn\'t fit into equal groups. It\'s ALWAYS smaller than the divisor. If you\'re dividing by 4, the remainder can only be 0, 1, 2, or 3. If the remainder were 4 or bigger, that means everyone could get one more!',
            'Here\'s another example: 17 pizza rolls shared among 5 friends. 5 \u00D7 3 = 15, so each person gets 3 rolls, with 17 - 15 = 2 rolls left over. That\'s 17 \u00F7 5 = 3 R2. Those 2 extra rolls? Maybe the chef gets them!',
            'In real life, you have to decide what to do with the remainder. Sometimes you give the extra to one person, sometimes you save it for later, and sometimes you need to round up (like if you need cars to carry people, you need an extra car for the remainder!).',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Remainder Rose\'s Tip!',
          text: 'Want to check if your division is right? Multiply your answer by the divisor and add the remainder. You should get back to the original number! For example: 23 \u00F7 5 = 4 R3. Check: 4 \u00D7 5 = 20, and 20 + 3 = 23. It works!',
        },
      ],
      videos: [
        {
          youtubeId: '-fbioMIaNG0',
          title: 'Long Division WITH Remainders!',
          channelName: 'Math & Learning Videos 4 Kids',
        },
      ],
      quizIds: ['div-q2a', 'div-q2b', 'div-q2c'],
    },

    // ─── Section 3: Party Planning Problems ─────────────────────
    {
      id: 'party-planning',
      icon: '\u{1F389}',
      title: 'Party Planning Problems',
      readAloudBlocks: [
        {
          id: 'party-planning-intro',
          paragraphs: [
            'Time to plan the ultimate pizza party! Chef Divide has some real-world party planning challenges for you.',
            'When you see a division word problem, use Chef Divide\'s party method: First, find the TOTAL (what\'s being shared?). Second, find the GROUPS (how many people or groups?). Third, DIVIDE the total by the groups. Fourth, check for REMAINDERS!',
            'For example: "You have 42 party favors to put into bags for 7 guests. How many favors per bag?" Total = 42 favors. Groups = 7 guests. Divide: 42 \u00F7 7 = 6 favors per bag!',
            'Here\'s a trickier one: "You have 50 balloons for 8 tables. How many balloons per table, and how many are left over?" 50 \u00F7 8 = 6 R2. Each table gets 6 balloons, with 2 extra balloons for decoration!',
            'Remember, division is everywhere in party planning: splitting food, arranging seating, dividing decorations, and even figuring out how much each person should pay! Master division and you\'ll be the greatest party planner ever!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Chef Divide\'s Fun Fact!',
          text: 'The average American eats about 23 pounds of pizza per year! If a family of 4 orders a pizza with 8 slices, each person gets 8 \u00F7 4 = 2 slices. But if someone is extra hungry, you might need to order another pizza! That\'s real-life division in action!',
        },
      ],
      videos: [
        {
          youtubeId: 'igpVebLCD8k',
          title: 'How to Solve Multiplication and Division Word Problems',
          channelName: 'Miacademy Learning Channel',
        },
      ],
      quizIds: ['div-q3a', 'div-q3b', 'div-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Fair Sharing
    {
      id: 'div-q1a',
      sectionId: 'fair-sharing',
      title: 'Pizza Sharing!',
      question:
        'You have 36 pizza slices to share equally among 9 friends. How many slices does each friend get?',
      options: [
        { text: '3', isCorrect: false },
        { text: '4', isCorrect: true },
        { text: '5', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'div-q1b',
      sectionId: 'fair-sharing',
      title: 'Party Hats!',
      question:
        'There are 48 party hats to divide equally among 8 tables. How many hats does each table get?',
      options: [
        { text: '5', isCorrect: false },
        { text: '6', isCorrect: true },
        { text: '7', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'div-q1c',
      sectionId: 'fair-sharing',
      title: 'Drink Division!',
      question:
        'Chef Divide has 21 juice boxes for 7 kids. How many juice boxes does each kid get?',
      options: [
        { text: '2', isCorrect: false },
        { text: '3', isCorrect: true },
        { text: '4', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'div-q1d',
      sectionId: 'fair-sharing',
      title: 'Cookie Split!',
      question:
        'Pepperoni Pete baked 54 cookies. He wants to put them in bags of 6. How many bags will he fill?',
      options: [
        { text: '8', isCorrect: false },
        { text: '9', isCorrect: true },
        { text: '10', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Remainders
    {
      id: 'div-q2a',
      sectionId: 'remainders',
      title: 'Leftover Slices!',
      question:
        'There are 25 pizza slices shared among 4 friends. How many slices does each friend get, and how many are left over?',
      options: [
        { text: '5 slices each, 5 left over', isCorrect: false },
        { text: '6 slices each, 1 left over', isCorrect: true },
        { text: '7 slices each, 0 left over', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'div-q2b',
      sectionId: 'remainders',
      title: 'Remainder Check!',
      question:
        'What is 29 \u00F7 6?',
      options: [
        { text: '4 remainder 5', isCorrect: true },
        { text: '5 remainder 1', isCorrect: false },
        { text: '4 remainder 3', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'div-q2c',
      sectionId: 'remainders',
      title: 'Extra Treats!',
      question:
        'Remainder Rose has 43 gummy bears to share among 5 friends. How many does each friend get, and how many are left over?',
      options: [
        { text: '8 each, 3 left over', isCorrect: true },
        { text: '9 each, 2 left over', isCorrect: false },
        { text: '7 each, 8 left over', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Party Planning Problems
    {
      id: 'div-q3a',
      sectionId: 'party-planning',
      title: 'Table Seating!',
      question:
        'There are 32 guests at a party. Each table seats 4 people. How many tables are needed?',
      options: [
        { text: '6 tables', isCorrect: false },
        { text: '8 tables', isCorrect: true },
        { text: '9 tables', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'div-q3b',
      sectionId: 'party-planning',
      title: 'Balloon Bunches!',
      question:
        'Chef Divide has 56 balloons to tie in bunches of 7. How many bunches can he make?',
      options: [
        { text: '7 bunches', isCorrect: false },
        { text: '8 bunches', isCorrect: true },
        { text: '9 bunches', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'div-q3c',
      sectionId: 'party-planning',
      title: 'Pizza Budget!',
      question:
        'A group of 6 friends ordered pizza that cost $42 total. If they split the cost equally, how much does each friend pay?',
      options: [
        { text: '$6', isCorrect: false },
        { text: '$7', isCorrect: true },
        { text: '$8', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'div-essay',
    prompt:
      'Explain how you would plan a pizza party for 8 friends!',
    description:
      'You\'re the party planner now! Write about how you would plan a pizza party for 8 friends. How many pizzas would you order? How would you divide the slices? What about drinks, plates, and party favors? Use division to explain your math! Write at least 100 characters to unlock a special surprise below!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Amazing party plan! You\'re a division superstar and the best party planner ever!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'div-reward',
    title: 'Throw the Ultimate Pizza Party!',
    description:
      'You\'ve mastered fair sharing and can handle any remainder! Now it\'s time to celebrate with the ultimate pizza party reward!',
    lockMessage: 'Pizza Party Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save a party plan (100+ characters)',
      },
    ],
    type: 'pizza-party',
    celebrationMessage:
      'PARTY TIME! You\'ve unlocked the Ultimate Pizza Party! You\'re the greatest party planner and division master ever!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Division Champion!',
    paragraphs: [
      'Congratulations, party planner! You\'ve mastered single-digit division!',
      'You learned that division is all about fair sharing: splitting a total into equal groups. You discovered that 24 \u00F7 6 = 4 means 24 things shared among 6 groups gives 4 in each group.',
      'You became an expert on remainders! You now know that when things don\'t divide evenly, the leftover part is the remainder, and it\'s always smaller than the divisor. You can even check your work by multiplying back and adding the remainder!',
      'You solved real party planning problems, from splitting pizza slices and arranging table seating to dividing up budgets and party favors. Division is everywhere in real life!',
      'Remember: multiplication and division are best friends. If you know your times tables, you already know your division facts! Keep practicing and you\'ll divide any number in a flash. Party on, champion!',
    ],
  },
};
