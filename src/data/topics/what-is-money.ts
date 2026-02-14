import type { Topic } from '../types';

export const whatIsMoney: Topic = {
  id: 'what-is-money',
  slug: 'what-is-money',
  title: 'What Is Money?',
  subtitle: 'From Trading Cows to Digital Dollars',
  status: 'active',
  themeId: 'what-is-money',
  heroIcons: ['\u{1F4B0}', '\u{1FA99}', '\u{1F4B3}'],
  navItems: [
    { id: 'barter', icon: '\u{1F404}', label: 'Barter' },
    { id: 'first-money', icon: '\u{1F41A}', label: 'First Money' },
    { id: 'coins', icon: '\u{1FA99}', label: 'Coins' },
    { id: 'paper-money', icon: '\u{1F4B5}', label: 'Paper Money' },
    { id: 'modern-money', icon: '\u{1F4B3}', label: 'Modern Money' },
    { id: 'value', icon: '\u{1F3DB}\uFE0F', label: 'Value' },
  ],
  sections: [
    // --- Section 1: Barter ------------------------------------------
    {
      id: 'barter',
      icon: '\u{1F404}',
      title: 'Before Money: The Barter System',
      readAloudBlocks: [
        {
          id: 'barter-text',
          paragraphs: [
            'Imagine you live thousands of years ago, long before coins or dollar bills existed. You are a farmer with a big flock of chickens, and you really need some wheat to bake bread for your family. So you walk to your neighbor\'s farm and say, "Hey, I\'ll trade you two chickens for a bag of wheat!" If your neighbor happens to want chickens, great \u2014 you have a deal! This is called bartering, and it is the oldest way humans have exchanged goods with each other.',
            'But here\'s the tricky part. What if your neighbor already has plenty of chickens and doesn\'t want any more? Now you\'re stuck! You have to go find someone else who wants chickens AND has wheat to trade. Economists call this the "double coincidence of wants" \u2014 which is just a fancy way of saying both people have to want exactly what the other person has. That can be really, really hard!',
            'People all around the world used barter for thousands of years. In ancient Mesopotamia, farmers traded grain for tools. In the Pacific Islands, people swapped fish for coconuts. Native Americans exchanged animal furs for arrowheads and pottery. Even today, kids barter on the playground when they trade snacks or toys!',
            'But as communities grew larger and people needed more things, barter became more and more difficult. Imagine trying to trade your way through a busy market when you need bread, sandals, a cooking pot, and some rope \u2014 and all you have are chickens! People needed something better. They needed... money.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'YCN2aTlocOw',
          title: 'The History of Money (From Barter to Bitcoin)',
          channelName: 'Be Smart',
        },
      ],
      quizIds: ['money-q1a', 'money-q1b'],
    },

    // --- Section 2: First Money -------------------------------------
    {
      id: 'first-money',
      icon: '\u{1F41A}',
      title: 'First Forms of Money',
      readAloudBlocks: [
        {
          id: 'first-money-text',
          paragraphs: [
            'So how did people solve the barter problem? They started picking special items that everyone agreed were valuable, and they used those items like money! These are called "commodity money" because they are real things \u2014 commodities \u2014 that also work as a way to pay for stuff.',
            'One of the most popular forms of early money was the cowrie shell. These small, shiny shells from the ocean were used as currency in Africa, China, India, and Southeast Asia for thousands of years. They were perfect because they were small enough to carry, pretty enough that everyone wanted them, and hard enough to find that people couldn\'t just pick up a million of them on the beach.',
            'In ancient Rome, soldiers were sometimes paid in salt \u2014 yes, the same salt you sprinkle on your food! Salt was incredibly valuable because it was used to preserve meat before refrigerators existed. In fact, the English word "salary," which means the money you earn from a job, comes from the Latin word "salarium," meaning "salt money." So when someone says you\'re "worth your salt," they\'re using a saying that\'s over 2,000 years old!',
            'Other civilizations got creative too. In China, people pressed tea leaves into hard bricks and used them as money. In Mesoamerica \u2014 the land of the Maya and Aztec \u2014 cacao beans (the beans used to make chocolate!) were so valuable that they were used to buy food, clothing, and even pay taxes. Imagine paying for your lunch with chocolate beans!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F404}',
          name: "Barterin' Betty",
          title: 'The Trader',
          description:
            'Tries to trade her cow for everything she needs \u2014 and learns why money was invented!',
        },
        {
          emoji: '\u{1FA99}',
          name: 'Coinsworth',
          title: 'The Coin Collector',
          description:
            'A wise old coin who has traveled the world and seen how different cultures use money.',
        },
        {
          emoji: '\u{1F4B3}',
          name: 'Digi',
          title: 'The Digital Dollar',
          description:
            'A modern digital payment who explains how money works in the 21st century.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The word "salary" comes from the Latin word "salarium," meaning "salt money." Ancient Roman soldiers were sometimes paid in salt because it was so valuable for preserving food. That\'s where the expression "worth your salt" comes from!',
        },
      ],
      videos: [
        {
          youtubeId: 'GZ7y-yFdX9M',
          title: 'Who Invented Money? The History of Money',
          channelName: 'Peekaboo Kidz',
        },
      ],
      quizIds: ['money-q1c', 'money-q1d'],
    },

    // --- Section 3: Coins -------------------------------------------
    {
      id: 'coins',
      icon: '\u{1FA99}',
      title: 'Coins Are Born!',
      readAloudBlocks: [
        {
          id: 'coins-text',
          paragraphs: [
            'Commodity money like shells and salt was a great improvement over barter, but it still had problems. How do you make sure every bag of salt weighs exactly the same? How do you carry a heavy tea brick all the way across town? And what if your cowrie shells crack or break? People needed something even better \u2014 and around 600 BCE, in the ancient kingdom of Lydia (in what is now Turkey), someone had a brilliant idea: metal coins!',
            'The Lydians took a natural mixture of gold and silver called electrum and stamped it into small, round discs with a lion\'s head on the front. Each coin weighed the same and had the same value, so you didn\'t have to weigh or measure anything. You just counted your coins! This was a huge breakthrough. For the first time in history, money had a standard, official value that everyone could agree on.',
            'The idea spread like wildfire. The ancient Greeks started making their own coins with images of owls and gods. The Romans minted coins with the faces of their emperors and spread them across their vast empire, from Britain to Egypt. Roman coins were so well-made and trusted that people used them for hundreds of years. In fact, archaeologists still find Roman coins buried in fields all over Europe!',
            'Coins changed the world. With standardized money, trade became faster, easier, and fairer. Merchants could travel to distant cities and buy goods without worrying about whether the locals wanted their chickens or salt. Markets grew, cities expanded, and economies boomed \u2014 all because of those little metal discs jingling in people\'s pockets.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The world\'s largest coin is Australian! It weighs over 1 tonne (that\'s about as heavy as a small car), is 80 centimeters wide, and is worth 1 million Australian dollars. You definitely couldn\'t carry that one in your pocket!',
        },
      ],
      videos: [
        {
          youtubeId: '7QW5Qw81yIY',
          title: 'The Money Song - USA Coins & Bills',
          channelName: 'Scratch Garden',
        },
      ],
      quizIds: ['money-q1e', 'money-q1f'],
    },

    // --- Section 4: Paper Money -------------------------------------
    {
      id: 'paper-money',
      icon: '\u{1F4B5}',
      title: 'Paper Money Takes Over',
      readAloudBlocks: [
        {
          id: 'paper-money-text',
          paragraphs: [
            'Coins were wonderful, but they had one big drawback: they were heavy! Imagine you\'re a wealthy Chinese merchant in the year 700 CE, and you need to buy a shipload of silk. You\'d need to haul around bags and bags of heavy metal coins \u2014 some merchants needed entire ox carts just to carry their money! There had to be a lighter way.',
            'And there was! During the Tang Dynasty (around 700 CE), the Chinese invented something revolutionary: paper money. Instead of lugging around heavy coins, merchants could deposit their coins at a special shop and receive a paper receipt. That piece of paper was a promise that said, "This note is worth 1,000 coins." You could then use that paper to buy things, and the other person could trade it in for the real coins whenever they wanted. Genius!',
            'When the famous Italian explorer Marco Polo traveled to China in the 1200s, he was absolutely amazed by paper money. In Europe, everyone was still hauling around bags of gold and silver coins, but in China, the emperor could just print paper and everyone accepted it! Marco Polo wrote about it in his travel book, and many Europeans back home thought he was making it up. They couldn\'t believe money could be made of paper!',
            'It took several more centuries for paper money to catch on in Europe. Sweden became the first European country to issue paper banknotes in 1661. Slowly, other countries followed. Today, paper money (and its cousin, polymer or plastic banknotes) is used all over the world. Every country has its own designs \u2014 from the colorful Australian dollar to the familiar green US dollar bill.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'Z2ejhmKHY3k',
          title: 'Making Change by Counting Up - Money Math',
          channelName: 'MooMooMath and Science',
        },
      ],
      quizIds: ['money-q1g', 'money-q1h'],
    },

    // --- Section 5: Modern Money ------------------------------------
    {
      id: 'modern-money',
      icon: '\u{1F4B3}',
      title: 'Modern Money',
      readAloudBlocks: [
        {
          id: 'modern-money-text',
          paragraphs: [
            'Fast-forward to the 20th century, and money was about to change again \u2014 in a really big way. In 1950, a businessman named Frank McNamara went out for a fancy dinner in New York City. When the check came, he reached for his wallet and \u2014 oh no! \u2014 he had forgotten it at home. He was so embarrassed that he invented the very first credit card, called the Diners\' Club card. Instead of paying with cash, you could just hand over a small plastic card and pay the bill later. The restaurant world would never be the same!',
            'Credit cards were just the beginning. In the decades that followed, money went digital. Banks started using computers to keep track of everyone\'s money electronically. When your parents use a debit card at the grocery store, no physical cash moves at all \u2014 numbers just change on a computer screen! Today, people can pay for things with their phones, smartwatches, and apps like Apple Pay and Google Pay. You can even send money to a friend instantly with just a few taps.',
            'In 2009, something even newer appeared: cryptocurrency. This is a type of digital money, like Bitcoin, that isn\'t controlled by any government or bank. Instead, it uses special computer code and a technology called blockchain to keep track of transactions. While cryptocurrency is still pretty new and can be complicated (even for adults!), it shows that people are always inventing new ways to buy, sell, and trade.',
            'Here\'s a mind-blowing fact: about 92% of all the money in the world today exists only as numbers on computer screens. It\'s never been printed as cash or minted as coins. That means most of the world\'s money is completely invisible! The way we think about and use money is still evolving, and who knows what the future will bring?',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The first credit card was invented in 1950 after a businessman named Frank McNamara forgot his wallet at a fancy restaurant dinner. He was so embarrassed that he created the Diners\' Club card so he\'d never be caught without a way to pay again!',
        },
        {
          title: 'Fun Fact!',
          text: 'About 92% of all the money in the world exists only as digital numbers on computer screens. It has never been printed as cash or stamped into coins. Most money is completely invisible!',
        },
      ],
      videos: [
        {
          youtubeId: 'bUzr9APgb4Q',
          title: 'Currencies Around The World',
          channelName: "Ailani's Little World",
        },
      ],
      quizIds: ['money-q1i'],
    },

    // --- Section 6: Value -------------------------------------------
    {
      id: 'value',
      icon: '\u{1F3DB}\uFE0F',
      title: 'What Gives Money Value?',
      readAloudBlocks: [
        {
          id: 'value-text',
          paragraphs: [
            'Have you ever held a dollar bill and wondered: why is this little piece of paper worth anything? You can\'t eat it, you can\'t wear it, and it\'s not even very pretty. So what makes it valuable? The answer is surprisingly simple: trust. Money works because everyone agrees it works. When you hand a dollar to a shopkeeper, they accept it because they trust that someone else will accept it from them later. It\'s like a giant game of make-believe that the whole world plays together!',
            'But trust alone isn\'t enough. Governments play a huge role in keeping money valuable. When a government says, "This piece of paper is official money and you can use it to pay taxes and buy things," people believe it. This kind of money is called "fiat money" \u2014 the word "fiat" is Latin for "let it be done." It\'s money because the government says so! Almost all money in the world today is fiat money, including the US dollar, the euro, the Japanese yen, and hundreds of others.',
            'There\'s another important reason money has value: scarcity. If the government printed a trillion new dollar bills tomorrow and gave them to everyone, each dollar would become almost worthless. Why? Because when there\'s way too much of something, it stops being special. That\'s why governments and central banks carefully control how much money is in circulation. Printing too much money too fast can cause something called inflation, where prices go up and up and your money buys less and less.',
            'Long ago, money was valuable for a different reason \u2014 it was made of valuable stuff! Gold coins were worth something because gold itself is rare and beautiful. This is called "commodity money." Today\'s fiat money is different: a $100 bill costs only about 17 cents to print! Its value comes from trust and the rules of the system, not from the paper it\'s made of. Pretty wild, right?',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'L3Ej3wr__w0',
          title: 'Foreign Currency for Kids',
          channelName: 'Kids2GrownupsFinance',
        },
      ],
      quizIds: ['money-q1j'],
    },
  ],

  // --- Quizzes -------------------------------------------------------
  quizzes: [
    // Section 1: Barter
    {
      id: 'money-q1a',
      sectionId: 'barter',
      title: 'Barter Quiz!',
      question: 'What was the biggest problem with the barter system?',
      options: [
        { text: 'People didn\'t have anything to trade', isCorrect: false },
        {
          text: 'You needed to find someone who wanted exactly what you had',
          isCorrect: true,
        },
        { text: 'Bartering was illegal in most places', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'money-q1b',
      sectionId: 'barter',
      title: 'Trade Challenge!',
      question: 'What were cowrie shells used as?',
      options: [
        { text: 'Decorations only', isCorrect: false },
        { text: 'Money', isCorrect: true },
        { text: 'Weapons', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: First Money
    {
      id: 'money-q1c',
      sectionId: 'first-money',
      title: 'Salary Quiz!',
      question: 'What does the word "salary" originally relate to?',
      options: [
        { text: 'Gold', isCorrect: false },
        { text: 'Salt', isCorrect: true },
        { text: 'Silk', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'money-q1d',
      sectionId: 'first-money',
      title: 'Explorer Quiz!',
      question: 'Who was amazed by Chinese paper money during his travels?',
      options: [
        { text: 'Christopher Columbus', isCorrect: false },
        { text: 'Marco Polo', isCorrect: true },
        { text: 'Vasco da Gama', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Coins
    {
      id: 'money-q1e',
      sectionId: 'coins',
      title: 'Coins Quiz!',
      question: 'Which civilization created the first standardized coins?',
      options: [
        { text: 'The Romans', isCorrect: false },
        { text: 'The Lydians', isCorrect: true },
        { text: 'The Egyptians', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'money-q1f',
      sectionId: 'coins',
      title: 'Problem Solver Quiz!',
      question: 'What problem did coins solve?',
      options: [
        { text: 'They made food taste better', isCorrect: false },
        {
          text: 'They had a standard value everyone agreed on',
          isCorrect: true,
        },
        { text: 'They could float on water', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Paper Money
    {
      id: 'money-q1g',
      sectionId: 'paper-money',
      title: 'Paper Money Quiz!',
      question: 'Where was paper money invented?',
      options: [
        { text: 'England', isCorrect: false },
        { text: 'China', isCorrect: true },
        { text: 'Egypt', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'money-q1h',
      sectionId: 'paper-money',
      title: 'Digital Money Quiz!',
      question: 'What percentage of the world\'s money exists only digitally?',
      options: [
        { text: 'About 25%', isCorrect: false },
        { text: 'About 92%', isCorrect: true },
        { text: 'About 50%', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Modern Money
    {
      id: 'money-q1i',
      sectionId: 'modern-money',
      title: 'Credit Card Quiz!',
      question: 'What year was the first credit card invented?',
      options: [
        { text: '1920', isCorrect: false },
        { text: '1950', isCorrect: true },
        { text: '1975', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 6: Value
    {
      id: 'money-q1j',
      sectionId: 'value',
      title: 'Value Quiz!',
      question: 'What gives modern money its value?',
      options: [
        { text: 'The paper it is printed on', isCorrect: false },
        { text: 'Trust and government backing', isCorrect: true },
        { text: 'The ink used to print it', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // --- Essay ---------------------------------------------------------
  essay: {
    id: 'money-essay',
    prompt:
      'If you could invent a brand new type of money, what would it look like?',
    description:
      'Think about what makes money useful. What would your new money be made of? How would people use it? Explain why your new money would be better than what we use today! Write at least 100 characters.',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Fantastic idea! You really thought about what makes money work. You\'re a true Money Master!',
  },

  // --- Reward --------------------------------------------------------
  reward: {
    id: 'money-reward',
    title: 'Barter Town Builder!',
    description:
      'Trade goods in an ancient village using barter, then commodity money, then coins. Experience how each innovation speeds up trade!',
    lockMessage: 'Market Closed!',
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
    type: 'barter-town-builder',
    celebrationMessage:
      'AMAZING! You built a thriving trading town!',
  },

  // --- Conclusion ----------------------------------------------------
  conclusion: {
    title: 'You Did It, Money Master!',
    paragraphs: [
      'Congratulations! You\'ve traveled through the entire history of money \u2014 from the earliest days of trading chickens and wheat all the way to the invisible digital dollars zooming around the world today!',
      'You learned how the barter system worked and why the "double coincidence of wants" made trading so tricky. You discovered how people solved that problem by using special items like cowrie shells, salt, tea bricks, and even chocolate beans as the world\'s first forms of money.',
      'You explored how the Lydians invented standardized coins around 600 BCE, and how the Chinese revolutionized everything again with paper money during the Tang Dynasty. You even learned how Marco Polo couldn\'t believe his eyes when he saw paper being used as money!',
      'Then you fast-forwarded to the modern age, where credit cards, digital payments, and even cryptocurrency have transformed the way we buy and sell. And you uncovered the biggest secret of all: money only works because we all agree to trust it!',
      'The story of money is really the story of human creativity and cooperation. Every time people faced a problem \u2014 from heavy coins to forgotten wallets \u2014 they invented something new. Keep that spirit of curiosity alive, and who knows? Maybe YOU will invent the next big thing in money!',
    ],
  },
};
