import type { Topic } from '../types';

export const multiDigitDivision: Topic = {
  id: 'multi-digit-division',
  slug: 'multi-digit-division',
  title: 'Lemonade Stand Tycoon',
  subtitle: 'Master Multi-Digit Division',
  status: 'active',
  themeId: 'multi-digit-division',
  heroIcons: ['\u{1F34B}', '\u2797', '\u{1F4B0}'],
  navItems: [
    { id: 'long-division-steps', icon: '\u{1F4DD}', label: 'Long Division Steps' },
    { id: 'checking-your-work', icon: '\u2705', label: 'Checking Your Work' },
    { id: 'business-problems', icon: '\u{1F4B0}', label: 'Business Problems' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F34B}',
      title: 'Welcome to Your Lemonade Empire!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Hey there, future business tycoon! Boss Divide here, and I\'m about to help you build the greatest lemonade stand the world has ever seen!',
            'Running a lemonade business means dealing with big numbers. You might make $156 over 6 days and need to figure out how much you earned per day. Or you might have 252 lemons to split equally into 7 batches of lemonade. That\'s where multi-digit division comes in!',
            'You already know basic division, but now we\'re going bigger. When the numbers are too large to divide in your head, you need a powerful tool called LONG DIVISION. It\'s a step-by-step method that breaks any big division problem into smaller, manageable pieces.',
            'In this adventure, you\'ll learn the four steps of long division (Divide, Multiply, Subtract, Bring Down), discover how to check your answers by multiplying back, and solve real lemonade business problems. Ready to become a math-powered business tycoon? Let\'s squeeze some numbers!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'LGqBQrUYua4',
          title: 'Long Division',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'KGMf314LUc0',
          title: 'Basic Division',
          channelName: 'Math Antics',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Long Division Steps ─────────────────────────
    {
      id: 'long-division-steps',
      icon: '\u{1F4DD}',
      title: 'Long Division: Divide, Multiply, Subtract, Bring Down',
      readAloudBlocks: [
        {
          id: 'long-div-intro',
          paragraphs: [
            'Manager Math here! Long division has four steps that repeat like a recipe. I call them D-M-S-B: Divide, Multiply, Subtract, Bring Down. Let me show you with a lemonade example!',
            'Let\'s solve 156 \u00F7 6. Set up the long division: 6 goes into 156.',
            'Step 1 \u2013 DIVIDE: Look at the first digit, 1. Does 6 go into 1? No! So look at the first two digits: 15. How many times does 6 go into 15? It goes 2 times (because 6 \u00D7 2 = 12). Write 2 above the 5.',
            'Step 2 \u2013 MULTIPLY: Multiply 2 \u00D7 6 = 12. Write 12 below the 15.',
            'Step 3 \u2013 SUBTRACT: Subtract 15 - 12 = 3. Write 3 below.',
            'Step 4 \u2013 BRING DOWN: Bring down the next digit, 6, to make 36.',
            'Now REPEAT! Divide: 6 goes into 36 exactly 6 times. Multiply: 6 \u00D7 6 = 36. Subtract: 36 - 36 = 0. No more digits to bring down, and the remainder is 0. The answer is 26!',
            'So if your lemonade stand made $156 over 6 days, you earned $26 per day! Let\'s try another one: 345 \u00F7 5. Divide: 5 into 3? No. 5 into 34? That\'s 6 (5 \u00D7 6 = 30). Multiply: 30. Subtract: 34 - 30 = 4. Bring down: 45. Divide: 5 into 45 = 9. Multiply: 45. Subtract: 0. Answer: 69!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F454}',
          name: 'Boss Divide',
          title: 'Lemonade Empire CEO',
          description:
            'Boss Divide started with one small lemonade stand and built it into an empire! He says the secret to business success is knowing your numbers, and the most important skill is long division. He uses it every day to calculate prices, profits, and how much lemonade each stand needs!',
          extraTag: 'Motto: "Divide and conquer your math problems!"',
        },
        {
          emoji: '\u{1F4CB}',
          name: 'Manager Math',
          title: 'Long Division Step Expert',
          description:
            'Manager Math remembers the four steps of long division with the phrase "Does McDonald\'s Serve Burgers?" \u2013 Divide, Multiply, Subtract, Bring Down! She\'s never met a division problem she couldn\'t solve, and she always writes her work neatly so she can track every step.',
          extraTag: 'Memory trick: "Does McDonald\'s Serve Burgers?"',
        },
        {
          emoji: '\u{1F4B5}',
          name: 'Cashier Calculate',
          title: 'Checking Work Champion',
          description:
            'Cashier Calculate handles all the money at the lemonade stand, so accuracy is everything! She always checks her division by multiplying the answer back. She says, "If you don\'t check your work, you might give the wrong change, and that\'s bad for business!"',
          extraTag: 'Rule: "Always multiply back to check!"',
        },
      ],
      funFacts: [
        {
          title: 'Manager Math\'s Memory Trick!',
          text: 'Can\'t remember the long division steps? Use this phrase: "Does McDonald\'s Serve Burgers?" D = Divide, M = Multiply, S = Subtract, B = Bring Down. Some kids also use "Dad, Mom, Sister, Brother" or "Dirty Monkeys Smell Bad!" Pick your favorite and you\'ll never forget!',
        },
      ],
      videos: [
        {
          youtubeId: 'HdU_rf7eMTI',
          title: 'Long Division Made Easy',
          channelName: 'Math Antics',
        },
      ],
      quizIds: ['mdiv-q1a', 'mdiv-q1b', 'mdiv-q1c', 'mdiv-q1d'],
    },

    // ─── Section 2: Checking Your Work ──────────────────────────
    {
      id: 'checking-your-work',
      icon: '\u2705',
      title: 'Checking Your Work: Multiply Back to Verify',
      readAloudBlocks: [
        {
          id: 'checking-intro',
          paragraphs: [
            'Cashier Calculate here! In the lemonade business, every penny counts. That\'s why I ALWAYS check my division answers by multiplying back. Let me show you how!',
            'The checking rule is simple: Quotient \u00D7 Divisor + Remainder = Dividend. If it doesn\'t equal the original number, something went wrong!',
            'Let\'s check our earlier answer: 156 \u00F7 6 = 26. Check: 26 \u00D7 6 = 156. It matches! The answer is correct!',
            'What about division with remainders? Let\'s say 200 \u00F7 7 = 28 R4. To check: 28 \u00D7 7 = 196. Then 196 + 4 = 200. It matches our original number!',
            'Here\'s a trick for catching common mistakes: always make sure your remainder is LESS than the divisor. If you get 200 \u00F7 7 = 27 R11, something is wrong because 11 is bigger than 7! That means 7 could go in one more time. The correct answer is 28 R4.',
            'Estimation is also a great checking tool. Before dividing 432 \u00F7 8, think: 400 \u00F7 8 = 50. So the answer should be around 50. If you get 54, great! If you get 540, you know something went wrong. Smart business owners always estimate first!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Cashier Calculate\'s Business Tip!',
          text: 'Real businesses use division every single day. When a store buys 500 items for $2,000 total, they divide to find the cost per item: $2,000 \u00F7 500 = $4 each. Then they decide to sell each one for $7, making $3 profit per item. Division helps businesses set prices and calculate profits!',
        },
      ],
      videos: [
        {
          youtubeId: 'fc2zif8oKt8',
          title: 'The Relationship between Division and Multiplication',
          channelName: 'MightyOwl',
        },
      ],
      quizIds: ['mdiv-q2a', 'mdiv-q2b', 'mdiv-q2c'],
    },

    // ─── Section 3: Business Problems ───────────────────────────
    {
      id: 'business-problems',
      icon: '\u{1F4B0}',
      title: 'Lemonade Business Problems',
      readAloudBlocks: [
        {
          id: 'business-intro',
          paragraphs: [
            'Boss Divide here with the ultimate business challenges! Running a lemonade stand means solving division problems all day long.',
            'When you see a business word problem, follow the Tycoon Method: First, find the TOTAL (how much altogether?). Second, find what you\'re DIVIDING BY (how many groups?). Third, use LONG DIVISION to solve. Fourth, CHECK your answer by multiplying back!',
            'Example: "Your lemonade stand earned $378 over 9 weeks. What were your average weekly earnings?" Total = $378. Dividing by 9 weeks. Long division: 378 \u00F7 9 = 42. Check: 42 \u00D7 9 = 378. You earned $42 per week!',
            'Here\'s a trickier one: "You have 500 cups and sell about 8 cups per hour. How many hours will your cups last?" 500 \u00F7 8 = 62 R4. That\'s 62 full hours with 4 cups remaining. In a real business, you\'d say "about 62 hours" or plan to buy more cups soon!',
            'Division also helps with pricing. If it costs $120 to make 8 batches of lemonade, each batch costs $120 \u00F7 8 = $15 to make. If you sell each batch for $25, your profit per batch is $25 - $15 = $10! That\'s the power of math in business!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Real Business Fact!',
          text: 'The world\'s most famous lemonade stand story is about Alexandra Scott, who at age 4 started "Alex\'s Lemonade Stand" to raise money for childhood cancer research. Her stand grew into a foundation that has raised over $250 million! She definitely used a lot of division to keep track of all that lemonade!',
        },
      ],
      videos: [
        {
          youtubeId: 'Jdwu2UpQnQ0',
          title: 'Two-Step Multiplication and Division Word Problems Made Easy!',
          channelName: 'IXL',
        },
      ],
      quizIds: ['mdiv-q3a', 'mdiv-q3b', 'mdiv-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Long Division Steps
    {
      id: 'mdiv-q1a',
      sectionId: 'long-division-steps',
      title: 'Daily Earnings!',
      question:
        'Your lemonade stand made $156 over 6 days. How much did you earn per day?',
      options: [
        { text: '$24', isCorrect: false },
        { text: '$26', isCorrect: true },
        { text: '$28', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mdiv-q1b',
      sectionId: 'long-division-steps',
      title: 'Lemon Batches!',
      question:
        'You have 252 lemons to split equally into 7 batches. How many lemons go into each batch?',
      options: [
        { text: '32', isCorrect: false },
        { text: '36', isCorrect: true },
        { text: '38', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mdiv-q1c',
      sectionId: 'long-division-steps',
      title: 'Step Check!',
      question:
        'In the first step of 345 \u00F7 5, you look at the first digit (3). Since 5 doesn\'t go into 3, what do you do next?',
      options: [
        { text: 'Write 0 above the 3 and stop', isCorrect: false },
        { text: 'Look at the first two digits (34) and divide 5 into 34', isCorrect: true },
        { text: 'Skip to the last digit and divide 5 into 5', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mdiv-q1d',
      sectionId: 'long-division-steps',
      title: 'Cup Count!',
      question:
        'You ordered 168 cups and need to stack them in towers of 8. How many towers will you have?',
      options: [
        { text: '19', isCorrect: false },
        { text: '21', isCorrect: true },
        { text: '24', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Checking Your Work
    {
      id: 'mdiv-q2a',
      sectionId: 'checking-your-work',
      title: 'Check It!',
      question:
        'Someone says 195 \u00F7 5 = 38. How do you check? Multiply 38 \u00D7 5. What do you get?',
      options: [
        { text: '185', isCorrect: false },
        { text: '190', isCorrect: true },
        { text: '195', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mdiv-q2b',
      sectionId: 'checking-your-work',
      title: 'Remainder Verify!',
      question:
        'You calculate 200 \u00F7 7 = 28 R4. To check, you compute 28 \u00D7 7 + 4. What should you get?',
      options: [
        { text: '196', isCorrect: false },
        { text: '200', isCorrect: true },
        { text: '204', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mdiv-q2c',
      sectionId: 'checking-your-work',
      title: 'Spot the Error!',
      question:
        'A friend says 145 \u00F7 6 = 23 R7. Why is this answer wrong?',
      options: [
        { text: 'The quotient should be bigger', isCorrect: false },
        { text: 'The remainder (7) is bigger than the divisor (6), so 6 can go in one more time', isCorrect: true },
        { text: 'You can\'t divide 145 by 6', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Business Problems
    {
      id: 'mdiv-q3a',
      sectionId: 'business-problems',
      title: 'Weekly Earnings!',
      question:
        'Your lemonade stand earned $378 over 9 weeks. What were your average weekly earnings?',
      options: [
        { text: '$38', isCorrect: false },
        { text: '$42', isCorrect: true },
        { text: '$45', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mdiv-q3b',
      sectionId: 'business-problems',
      title: 'Cost Per Batch!',
      question:
        'It costs $120 to make 8 batches of lemonade. What is the cost per batch?',
      options: [
        { text: '$12', isCorrect: false },
        { text: '$15', isCorrect: true },
        { text: '$18', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mdiv-q3c',
      sectionId: 'business-problems',
      title: 'Splitting Profits!',
      question:
        'You and 3 friends ran a lemonade stand together and made $284 in total. If you split the profits equally among all 4 of you, how much does each person get?',
      options: [
        { text: '$68', isCorrect: false },
        { text: '$71', isCorrect: true },
        { text: '$74', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'mdiv-essay',
    prompt:
      'Describe how you would use division to run a lemonade stand!',
    description:
      'You\'re the boss now! Write about how you would use division in your lemonade stand business. Think about splitting supplies, calculating daily earnings, pricing your lemonade, and dividing profits with partners. Give at least one example with actual numbers! Write at least 100 characters to unlock a special surprise below!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant business plan! You\'re a true lemonade tycoon and division master!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'mdiv-reward',
    title: 'Open Your Lemonade Empire!',
    description:
      'You\'ve mastered long division and proven you can run a lemonade business like a pro! It\'s time to open your very own lemonade empire!',
    lockMessage: 'Lemonade Stand Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save a business plan (100+ characters)',
      },
    ],
    type: 'lemonade-stand',
    celebrationMessage:
      'KA-CHING! You\'ve unlocked the Lemonade Stand Empire! You\'re the ultimate math-powered business tycoon!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Division Tycoon!',
    paragraphs: [
      'Congratulations, Tycoon! You\'ve mastered multi-digit division!',
      'You learned the four steps of long division: Divide, Multiply, Subtract, Bring Down. You can remember them with "Does McDonald\'s Serve Burgers?" and you know these steps repeat until you\'ve worked through every digit.',
      'You became a pro at checking your work by multiplying back. Quotient times Divisor plus Remainder must always equal the Dividend. If it doesn\'t match, you know to try again!',
      'You solved real lemonade business problems: calculating daily earnings, figuring out cost per batch, splitting profits among partners, and planning supplies. Division is the key to running any successful business!',
      'These skills will take you far, whether you\'re running a lemonade stand, managing your savings, or tackling even bigger math challenges. Keep dividing and conquering, Tycoon! Your math empire has only just begun!',
    ],
  },
};
