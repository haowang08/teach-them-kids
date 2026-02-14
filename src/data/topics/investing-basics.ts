import type { Topic } from '../types';

export const investingBasics: Topic = {
  id: 'investing-basics',
  slug: 'investing-basics',
  title: 'Investing Basics',
  subtitle: 'Growing Your Money Like a Garden',
  status: 'active',
  themeId: 'investing-basics',
  heroIcons: ['\u{1F4C8}', '\u{1F331}', '\u{1F4B9}'],
  navItems: [
    { id: 'what-investing', icon: '\u{1F4B0}', label: 'What Is Investing' },
    { id: 'compound-interest', icon: '\u{2728}', label: 'Compound Interest' },
    { id: 'stocks', icon: '\u{1F4C8}', label: 'Stocks' },
    { id: 'bonds', icon: '\u{1F4DC}', label: 'Bonds' },
    { id: 'risk-reward', icon: '\u{2696}\uFE0F', label: 'Risk vs Reward' },
    { id: 'start-early', icon: '\u{23F0}', label: 'Start Early' },
  ],
  sections: [
    // ─── Section 1: What Is Investing? ──────────────────────────
    {
      id: 'what-investing',
      icon: '\u{1F4B0}',
      title: 'What Is Investing?',
      readAloudBlocks: [
        {
          id: 'what-investing-text',
          paragraphs: [
            'Have you ever planted a seed and watched it grow into a tall, beautiful plant? Investing is a lot like gardening! When you invest, you take some of your money and put it to work so it can grow over time. Instead of keeping all your money in a piggy bank where it just sits there, investing lets your money earn even more money.',
            'Here is the big idea: when you invest, you are giving your money a job. You might buy a tiny piece of a company, lend money to a business, or put it in a special savings account that pays you extra. Over time, that money works hard and earns more money for you, even while you sleep!',
            'Investing is different from saving. Saving means setting money aside for later, usually in a safe place like a bank account. Investing means taking a little bit of risk with your money in hopes that it will grow much bigger. Think of saving as putting seeds in a jar, and investing as planting those seeds in rich soil where they can sprout and flourish.',
            'The best part? You do not need to be a grown-up to start thinking like an investor. Understanding how money grows is one of the most powerful skills you can learn. By the time you finish this lesson, you will know the basics that even many adults wish they had learned as kids!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F331}',
          name: 'Sprout',
          title: 'The Growth Expert',
          description:
            'Sprout loves watching things grow, especially money! Sprout knows that the secret to building wealth is patience. Just like a tiny seed needs water, sunlight, and time to become a mighty oak tree, your investments need time to grow. Sprout\'s motto is: "Plant early, water often, and let time do the magic!"',
        },
        {
          emoji: '\u{1F4CA}',
          name: 'Stocky',
          title: 'The Market Watcher',
          description:
            'Stocky spends every day watching the stock market go up and down. Stocky knows that the market can be like a roller coaster with exciting highs and scary dips, but over long periods of time, it has always trended upward. Stocky\'s best advice is: "Don\'t panic when the market dips. Zoom out and look at the big picture!"',
        },
        {
          emoji: '\u{2696}\uFE0F',
          name: 'Balancer',
          title: 'The Risk Manager',
          description:
            'Balancer is the wisest investor of all because Balancer knows that you should never put all your eggs in one basket. By spreading investments across different types, like stocks, bonds, and savings, you protect yourself if one investment does not do well. Balancer always says: "Balance your risks, and your money will thank you!"',
        },
      ],
      videos: [
        {
          youtubeId: 'b8uJQPo8yq0',
          title: 'Human, Capital & Natural Resources for Kids',
          channelName: 'Kids Academy',
        },
      ],
      quizIds: ['invest-q1a', 'invest-q1b'],
    },

    // ─── Section 2: Compound Interest ───────────────────────────
    {
      id: 'compound-interest',
      icon: '\u{2728}',
      title: 'The Magic of Compound Interest',
      readAloudBlocks: [
        {
          id: 'compound-interest-text',
          paragraphs: [
            'Albert Einstein reportedly called compound interest "the eighth wonder of the world." He said, "He who understands it, earns it. He who doesn\'t, pays it." That is a pretty big deal coming from one of the smartest people who ever lived! So what exactly is compound interest, and why is it so magical?',
            'Imagine you put ten dollars in a special jar that pays you ten percent interest every year. After one year, you earn one dollar of interest, so now you have eleven dollars. But here is where the magic happens: in the second year, you earn interest not just on your original ten dollars, but also on the one dollar of interest you already earned. So you earn $1.10 instead of just $1.00. That extra ten cents might seem tiny, but over many years, it adds up to something incredible!',
            'Here is a famous example that shows the power of compound interest: imagine someone offers you a million dollars right now, or a single penny that doubles every day for thirty days. Which would you choose? Most people grab the million dollars, but the penny that doubles is actually worth over five million dollars by day thirty! On day one it is one cent, day two it is two cents, day ten it is $5.12, day twenty it is $5,242.88, and by day thirty it is $5,368,709.12. That is the magic of compounding!',
            'The key ingredient that makes compound interest so powerful is time. The longer your money compounds, the faster it grows. This is why even small amounts invested early can turn into huge sums later. A teenager who invests a little bit each month can end up with more money than an adult who starts investing much larger amounts later in life!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'jBfqlsz6mAo',
          title: 'CashVille Kidz Episode 22: Saving vs Investing',
          channelName: 'CashVilleKidz',
        },
      ],
      quizIds: ['invest-q1c', 'invest-q1d'],
    },

    // ─── Section 3: Stocks ──────────────────────────────────────
    {
      id: 'stocks',
      icon: '\u{1F4C8}',
      title: 'What Are Stocks?',
      readAloudBlocks: [
        {
          id: 'stocks-text',
          paragraphs: [
            'Have you ever wished you could own a piece of your favorite company, like the one that makes your favorite video games, sneakers, or snacks? Well, with stocks, you can! A stock is a tiny piece of ownership in a company. When you buy a stock, you become a part-owner, called a shareholder. If the company has a million shares and you own one, you own one-millionth of that company!',
            'Companies sell stocks to raise money. Let us say a kid named Maria invents an amazing new board game. She needs money to manufacture thousands of copies, so she divides her company into one hundred shares and sells fifty of them to friends and family. Each person who buys a share now owns a piece of Maria\'s company. If the board game becomes a huge hit and the company becomes more valuable, each share becomes worth more too!',
            'Stock prices go up and down every day based on what people think a company is worth. If a company announces a great new product, more people want to buy its stock, so the price goes up. If a company has bad news, people might sell their stock, and the price goes down. This buying and selling happens on a stock exchange, which is like a giant marketplace for stocks.',
            'The most famous stock exchange in the world is the New York Stock Exchange, or NYSE. Over long periods of time, the stock market has grown an average of about ten percent per year. That means if you invested one hundred dollars and left it alone, it would roughly double every seven years! Of course, some years the market goes up a lot, and other years it goes down. That is why investing in stocks works best when you are patient and think long-term.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Wall Street History!',
          text: 'The New York Stock Exchange started in 1792 when twenty-four stockbrokers signed an agreement under a buttonwood tree on Wall Street in New York City. That tree became one of the most famous trees in financial history!',
        },
      ],
      videos: [
        {
          youtubeId: 'p7HKvqRI_Bo',
          title: 'How does the stock market work?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['invest-q2a', 'invest-q2b'],
    },

    // ─── Section 4: Bonds ───────────────────────────────────────
    {
      id: 'bonds',
      icon: '\u{1F4DC}',
      title: 'What Are Bonds?',
      readAloudBlocks: [
        {
          id: 'bonds-text',
          paragraphs: [
            'If stocks are like owning a tiny piece of a company, then bonds are like being the bank! When you buy a bond, you are lending your money to a company or a government. In return, they promise to pay you back the full amount on a specific date, plus extra money called interest along the way. It is like an official IOU with a reward for your patience.',
            'Governments sell bonds to pay for things like roads, schools, and hospitals. Companies sell bonds to fund new projects or expand their businesses. When you buy a government bond, you are basically lending money to your country! The United States government sells Treasury bonds that are considered some of the safest investments in the world because the government has always paid its debts.',
            'Bonds are generally safer than stocks, but they usually earn less money over time. Think of it this way: with a stock, you are riding a roller coaster that might go very high but also dip down. With a bond, you are on a gentle train ride that moves steadily forward. You know exactly how much interest you will earn and when you will get your money back.',
            'Smart investors often own both stocks and bonds. When they are young and have many years ahead, they might own more stocks because they can handle the ups and downs. As they get older and need their money sooner, they might shift to more bonds for safety. This mix of different investment types is called asset allocation, and it is one of the most important decisions an investor makes!',
          ],
        },
      ],
      videos: [],
      quizIds: ['invest-q2c', 'invest-q2d'],
    },

    // ─── Section 5: Risk vs. Reward ─────────────────────────────
    {
      id: 'risk-reward',
      icon: '\u{2696}\uFE0F',
      title: 'Risk vs. Reward',
      readAloudBlocks: [
        {
          id: 'risk-reward-text',
          paragraphs: [
            'In investing, there is a golden rule: the higher the potential reward, the higher the risk. This means investments that can make you a lot of money can also lose you a lot of money. And investments that are very safe usually do not grow as fast. Understanding this trade-off is one of the most important lessons in all of investing!',
            'Think of it like a video game. Playing on easy mode is safe but the rewards are small. Playing on hard mode is risky but the prizes are much bigger. A savings account at a bank is like easy mode: your money is very safe, but it grows slowly. Buying stocks in a brand-new company is like hard mode: you could make a fortune if the company succeeds, but you could also lose everything if it fails.',
            'This is where diversification comes in, and it is a word every smart investor knows! Diversification means spreading your money across many different investments instead of putting it all in one place. Imagine you have twelve eggs. Would you carry them all in one basket, where dropping it means losing everything? Or would you split them into four baskets, so if you drop one, you still have nine eggs? Smart investors spread their money across stocks, bonds, and other investments so one bad pick does not ruin everything.',
            'Throughout history, investors who panicked and sold everything during market crashes almost always regretted it. The market has recovered from every single crash in history, including the Great Depression, the 2008 financial crisis, and more. Patient investors who stayed calm and kept their investments ended up doing much better than those who sold in fear.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Compound Growth Power!',
          text: 'If you invested just $1 at a 10% annual return, you would have about $117 after 50 years! That is the power of compound growth turning a single dollar into over a hundred dollars without you lifting a finger.',
        },
        {
          title: 'The Oracle of Omaha!',
          text: 'Warren Buffett, one of the richest people in the world, made 99% of his wealth AFTER his 50th birthday. He started investing at age 11 and let compound interest do its magic over decades. His story proves that patience is the investor\'s greatest superpower!',
        },
      ],
      videos: [
        {
          youtubeId: 'I5ZR0jMlxX0',
          title: 'What causes economic bubbles?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['invest-q3a', 'invest-q3b'],
    },

    // ─── Section 6: Start Early! ────────────────────────────────
    {
      id: 'start-early',
      icon: '\u{23F0}',
      title: 'Start Early!',
      readAloudBlocks: [
        {
          id: 'start-early-text',
          paragraphs: [
            'Here is one of the biggest secrets in investing: it is not about how much money you have, it is about how much time you have. The earlier you start investing, the more time compound interest has to work its magic. Even tiny amounts can grow into something huge if you give them enough time!',
            'Let us look at two friends, Early Emma and Late Leo. Emma starts investing fifty dollars a month when she is fifteen years old. Leo waits until he is thirty to start investing one hundred dollars a month, which is twice as much as Emma! By the time they are both sixty, Emma has invested a total of $27,000 over 45 years, while Leo has invested $36,000 over 30 years. But guess who has more money? Emma does, by a huge margin! Even though she invested less total money, she had fifteen extra years of compound growth working in her favor.',
            'You might think you are too young to invest, but you are actually at the perfect age to start learning. Many families open special investment accounts for kids, and even learning the basics now gives you a massive head start. Every dollar you invest as a young person has decades to grow, and that time is your greatest advantage over every adult investor in the world.',
            'Remember, the best time to plant a tree was twenty years ago. The second-best time is today! The same is true for investing. Every day you wait is a day of compound growth you miss out on. So start learning, start planning, and when you are ready, start growing your money like a beautiful garden that blooms bigger and bigger each year!',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: What Is Investing?
    {
      id: 'invest-q1a',
      sectionId: 'what-investing',
      title: 'Quick Quiz Time!',
      question: 'What is investing?',
      options: [
        { text: 'Hiding your money under your mattress', isCorrect: false },
        { text: 'Putting money to work so it can grow over time', isCorrect: true },
        { text: 'Spending all your money as fast as possible', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'invest-q1b',
      sectionId: 'what-investing',
      title: 'Interest Basics!',
      question: 'What is compound interest?',
      options: [
        { text: 'Interest you only earn once', isCorrect: false },
        { text: 'Earning interest on your interest', isCorrect: true },
        { text: 'A fee the bank charges you', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Compound Interest
    {
      id: 'invest-q1c',
      sectionId: 'compound-interest',
      title: 'Penny Power!',
      question: 'Why is starting to invest early so important?',
      options: [
        { text: 'Because banks give kids special rates', isCorrect: false },
        { text: 'More time equals more compound growth', isCorrect: true },
        { text: 'Because you can only invest when you are young', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'invest-q1d',
      sectionId: 'compound-interest',
      title: 'Dollar Growth Challenge!',
      question: 'If you invested $1 at 10% per year, about how much would you have in 50 years?',
      options: [
        { text: 'About $50', isCorrect: false },
        { text: 'Over $117', isCorrect: true },
        { text: 'Exactly $10', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Stocks
    {
      id: 'invest-q2a',
      sectionId: 'stocks',
      title: 'Stock Market Quiz!',
      question: 'What is a stock?',
      options: [
        { text: 'A loan you make to the government', isCorrect: false },
        { text: 'A tiny piece of ownership in a company', isCorrect: true },
        { text: 'A type of savings account at a bank', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'invest-q2b',
      sectionId: 'stocks',
      title: 'Wall Street History!',
      question: 'When did the New York Stock Exchange start?',
      options: [
        { text: '1492', isCorrect: false },
        { text: '1792', isCorrect: true },
        { text: '1900', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Bonds
    {
      id: 'invest-q2c',
      sectionId: 'bonds',
      title: 'Bond Basics!',
      question: 'What is a bond?',
      options: [
        { text: 'A tiny piece of ownership in a company', isCorrect: false },
        { text: 'A loan you make to a company or government', isCorrect: true },
        { text: 'A type of cryptocurrency', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'invest-q2d',
      sectionId: 'bonds',
      title: 'Smart Investing!',
      question: 'What does "diversification" mean?',
      options: [
        { text: 'Putting all your money in one stock', isCorrect: false },
        { text: 'Spreading your investments across different types', isCorrect: true },
        { text: 'Only investing in bonds', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Risk vs. Reward
    {
      id: 'invest-q3a',
      sectionId: 'risk-reward',
      title: 'Risk & Reward Challenge!',
      question: 'Why are riskier investments potentially better?',
      options: [
        { text: 'They are guaranteed to make money', isCorrect: false },
        { text: 'They can earn higher returns', isCorrect: true },
        { text: 'They are safer than savings accounts', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'invest-q3b',
      sectionId: 'risk-reward',
      title: 'Buffett Brainteaser!',
      question: 'What percentage of Warren Buffett\'s wealth came after age 50?',
      options: [
        { text: '50%', isCorrect: false },
        { text: '99%', isCorrect: true },
        { text: '75%', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'invest-essay',
    prompt:
      'Imagine your best friend has never heard of compound interest. How would you explain it to them in a fun and simple way?',
    description:
      'Now it is your turn to be the teacher! Think about everything you learned about compound interest, the penny-doubling example, and why starting early matters so much. Write an explanation that would make your friend excited about investing. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Fantastic explanation! You really understand compound interest! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'invest-reward',
    title: 'Compound Growth Garden!',
    description:
      'You have unlocked the Compound Growth Garden! Plant your money seeds in different types of soil, from safe savings to adventurous stocks, and watch compound interest make them grow over time. See how a tiny seed planted early can grow into a mighty money forest!',
    lockMessage: 'Garden Locked!',
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
    type: 'compound-growth-garden',
    celebrationMessage:
      'AMAZING! You have grown a magnificent money forest! Your Compound Growth Garden is blooming with the power of patience and compound interest. You are a true investing expert!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Are an Investing Pro!',
    paragraphs: [
      'Congratulations! You have completed your journey through the world of investing basics! You now know things about money and growing wealth that many adults wish they had learned at your age.',
      'You discovered that investing means putting your money to work so it can grow, just like planting seeds in a garden. You learned about the incredible magic of compound interest, where your money earns money on top of money, and how even a single penny can become millions through the power of doubling.',
      'You explored stocks, which let you own a tiny piece of your favorite companies, and bonds, which turn you into a lender who earns interest. You learned that the New York Stock Exchange started under a buttonwood tree in 1792, and that smart investors spread their money across different types of investments through diversification.',
      'Most importantly, you learned the biggest secret of all: time is your greatest superpower as an investor. Warren Buffett made 99% of his wealth after turning fifty because he started investing at age eleven and let compound interest work for decades. You have even more time than he did!',
      'Keep learning about money, keep thinking like an investor, and remember: the best time to start is now. Your future self will thank you for every seed you plant today. Happy investing!',
    ],
  },
};
