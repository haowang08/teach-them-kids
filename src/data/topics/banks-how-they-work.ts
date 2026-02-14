import type { Topic } from '../types';

export const banksHowTheyWork: Topic = {
  id: 'banks-how-they-work',
  slug: 'banks-how-they-work',
  title: 'Banks & How They Work',
  subtitle: 'Where Your Money Sleeps at Night',
  status: 'active',
  themeId: 'banks-how-they-work',
  heroIcons: ['🏦', '🔐', '💻'],
  navItems: [
    { id: 'what-bank', icon: '🏦', label: 'What Is a Bank' },
    { id: 'history', icon: '🏛️', label: 'History of Banking' },
    { id: 'accounts', icon: '💳', label: 'Account Types' },
    { id: 'how-banks-earn', icon: '💰', label: 'How Banks Make Money' },
    { id: 'digital', icon: '💻', label: 'Digital Banking' },
    { id: 'safety', icon: '🔐', label: 'Money Safety' },
  ],
  sections: [
    // ─── Section 1: What Is a Bank? ─────────────────────────────
    {
      id: 'what-bank',
      icon: '🏦',
      title: 'What Is a Bank?',
      readAloudBlocks: [
        {
          id: 'what-bank-intro',
          paragraphs: [
            'Imagine you have a piggy bank at home filled with coins and dollar bills. It works great for small amounts, but what happens when you start earning more money from birthday gifts, chores, or even a lemonade stand? Keeping hundreds of dollars under your mattress or in a ceramic pig is not very safe. That is where a real bank comes in! A bank is a special building — and nowadays a special app — where people, families, and businesses keep their money safe.',
            'But a bank does much more than just store your cash. When you put your money into a bank, the bank actually pays you a little extra money called "interest." Think of it like a thank-you gift for letting the bank hold onto your money for a while. The longer you keep your money in the bank, the more interest you earn. It is like planting a tiny seed and watching it slowly grow into a bigger plant!',
            'Banks also help people borrow money when they need it. If someone wants to buy a house or start a business but does not have enough cash, the bank can lend them money. The borrower then pays it back over time, plus a little extra. This system of saving, lending, and earning interest is the engine that makes banks work — and it has been running for thousands of years.',
          ],
        },
      ],
      characters: [
        {
          emoji: '🏦',
          name: 'Banksy',
          title: 'The Bank Manager',
          description:
            'Banksy keeps the whole bank running smoothly! From greeting customers to making sure every dollar is accounted for, Banksy knows all the ins and outs of how a bank operates. Ask Banksy anything about savings, loans, or how interest works.',
          extraTag: 'Role: Branch Manager',
        },
        {
          emoji: '🔐',
          name: 'Vault',
          title: 'The Security Guard',
          description:
            'Vault is in charge of protecting every penny in the bank. With thick steel doors, security cameras, and time-locked safes, Vault makes sure no one can get to the money without permission. Vault also knows all about FDIC insurance and why your money is always protected.',
          extraTag: 'Role: Chief of Security',
        },
        {
          emoji: '💻',
          name: 'Appy',
          title: 'The Digital Banker',
          description:
            'Appy lives inside your phone and computer! This tech-savvy banker helps people check their balances, transfer money, and even deposit checks just by taking a photo. Appy is proof that you do not always need to visit a physical building to use the bank.',
          extraTag: 'Role: Digital Services',
        },
      ],
      videos: [
        {
          youtubeId: 'CqD3hnjZBTM',
          title: 'What is a Bank? Lessons in Money for Kids',
          channelName: 'Chad Schiel',
        },
      ],
      quizIds: ['bank-q1a', 'bank-q1b'],
    },

    // ─── Section 2: The History of Banking ──────────────────────
    {
      id: 'history',
      icon: '🏛️',
      title: 'The History of Banking',
      readAloudBlocks: [
        {
          id: 'history-ancient',
          paragraphs: [
            'The story of banking goes all the way back to ancient Mesopotamia, around 2000 BCE. Long before there were shiny bank buildings on every corner, people stored their grain, gold, and precious items in temples. Temples were the safest buildings in town — thick stone walls, guarded day and night — so it made sense to keep valuables there. Priests would keep records on clay tablets, tracking who deposited what and how much they owed. These temple records are some of the earliest examples of banking in human history!',
            'As trade grew across the ancient world, so did the need for more organized money systems. In ancient Greece, money changers set up tables in marketplaces to exchange coins from different city-states. The Greek word for table, "trapeza," actually became the word for bank in modern Greek! In ancient Rome, bankers called "argentarii" sat on benches in the forum, accepting deposits, making loans, and even transferring money between accounts — surprisingly similar to what banks do today.',
            'During the Middle Ages, Italian merchant families in cities like Florence, Venice, and Genoa transformed banking into a powerful international business. The famous Medici family of Florence built one of the largest banking networks in Europe, with branches in London, Rome, and beyond. In fact, the English word "bank" comes from the Italian word "banco," meaning bench — because Italian bankers conducted business from benches in the marketplace.',
          ],
        },
        {
          id: 'history-modern',
          paragraphs: [
            'The first official public bank, the Banco di San Giorgio, was established in Genoa, Italy, in 1407. But the real revolution came centuries later. In 1694, the Bank of England was founded to help fund a war against France, and it became a model for central banks around the world. Central banks are special government-connected banks that manage a country\'s money supply and help keep the economy stable. Today, nearly every country has a central bank — like the Federal Reserve in the United States, which was established in 1913.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: '1asz-h_0TLg',
          title: 'How Does Money Travel Around The World?',
          channelName: 'Big Questions Quest',
        },
      ],
      quizIds: ['bank-q1c', 'bank-q1d'],
    },

    // ─── Section 3: Checking vs. Savings Accounts ───────────────
    {
      id: 'accounts',
      icon: '💳',
      title: 'Checking vs. Savings Accounts',
      readAloudBlocks: [
        {
          id: 'accounts-savings',
          paragraphs: [
            'When you open an account at a bank, you usually get to choose between two main types: a savings account and a checking account. A savings account is like a treasure chest for money you want to keep for the future. Maybe you are saving up for a new bike, a video game, or even college someday. The bank pays you interest on the money sitting in your savings account, so your balance slowly grows over time without you doing anything extra!',
            'However, savings accounts come with some rules. Most banks limit how many times you can take money out each month. That is because the whole point of a savings account is to encourage you to leave the money alone and let it grow. Think of it like a garden — if you keep pulling up the seeds, the flowers will never bloom. Banks want you to save, and they reward your patience with interest.',
          ],
        },
        {
          id: 'accounts-checking',
          paragraphs: [
            'A checking account, on the other hand, is built for everyday spending. It is the account you use to pay for groceries, buy lunch, or pay the electric bill. With a checking account, you usually get a debit card — a plastic card that lets you swipe or tap to pay for things — and sometimes a book of paper checks (that is where the name "checking" comes from!). You can take money in and out as often as you like, making it perfect for daily life.',
            'The trade-off? Checking accounts usually earn little or no interest. Since the money is constantly moving in and out, the bank cannot use it as reliably for loans. Many smart savers use both types of accounts together: a checking account for everyday expenses and a savings account for long-term goals. Some families even set up automatic transfers so that a little bit of money moves from checking to savings every month — a simple trick that helps your savings grow without even thinking about it!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'XNu5ppFZbHo',
          title: 'What gives a dollar bill its value?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['bank-q2a', 'bank-q2b'],
    },

    // ─── Section 4: How Banks Make Money ────────────────────────
    {
      id: 'how-banks-earn',
      icon: '💰',
      title: 'How Banks Make Money',
      readAloudBlocks: [
        {
          id: 'how-banks-earn-basics',
          paragraphs: [
            'Have you ever wondered how banks can afford those big, fancy buildings and pay all of their employees? Banks are actually businesses, and like any business, they need to earn money to keep going. The main way a bank makes money is through the difference between the interest it pays you on your savings and the interest it charges people who borrow money. This difference is called the "spread," and it is the heartbeat of the banking business.',
            'Here is how it works: let us say you deposit one hundred dollars into your savings account, and the bank pays you two percent interest per year. That means the bank pays you two dollars for keeping your money there. But then the bank takes your one hundred dollars and lends it to someone who wants to buy a car. The bank charges the car buyer five percent interest on the loan. That means the borrower pays the bank five dollars. The bank paid you two dollars but earned five dollars — so the bank keeps the three-dollar difference. Multiply that by millions of customers, and you can see how banks earn billions of dollars every year!',
          ],
        },
        {
          id: 'how-banks-earn-fees',
          paragraphs: [
            'Banks also earn money through fees. You might be charged a fee for using an ATM that belongs to a different bank, for overdrawing your account (spending more than you have), or for certain special services. Some banks charge a monthly maintenance fee just for having an account, although many banks have eliminated these fees to attract new customers. Credit card interest is another massive source of income for banks — when people do not pay their full credit card bill each month, the bank charges them interest on the remaining balance.',
            'Beyond loans and fees, banks invest money in bonds, stocks, and other financial instruments. They might also earn fees from helping businesses with payroll, processing payments, or managing investments. All of these streams of income add up, making banking one of the most profitable industries in the world. Understanding how banks make money helps you become a smarter customer — because the more you know, the better decisions you can make with your own money!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'ScXAyGh0MRg',
          title: 'Checking and Savings Accounts',
          channelName: 'Learn Bright',
        },
      ],
      quizIds: ['bank-q2c', 'bank-q3a'],
    },

    // ─── Section 5: Digital Banking ─────────────────────────────
    {
      id: 'digital',
      icon: '💻',
      title: 'Digital Banking',
      readAloudBlocks: [
        {
          id: 'digital-intro',
          paragraphs: [
            'Not so long ago, if you wanted to check how much money was in your bank account, you had to drive to the bank, stand in line, and ask a teller behind a counter. If you wanted to send money to a friend in another city, you would have to write a check or get a money order and mail it — which could take days! But today, thanks to digital banking, you can do almost everything from a tiny screen in your pocket.',
            'Digital banking started in the 1990s when banks first launched websites where customers could view their balances online. Then came mobile banking apps in the late 2000s, which let people check accounts, transfer money, and even deposit checks by simply taking a photo with their phone\'s camera. Today, there are entire banks that exist only online — they have no physical buildings at all! These are called "neobanks" or "digital-only banks," and they often offer lower fees and higher interest rates because they save money by not maintaining brick-and-mortar branches.',
            'Digital payments have also transformed how we buy things. Services like Venmo, Zelle, Apple Pay, and Google Pay let you send money to friends instantly or tap your phone to pay at a store. In some countries, like Sweden and China, cash is becoming so rare that street vendors and even some banks no longer accept it. The future of money is digital, and it is happening faster than anyone predicted.',
          ],
        },
      ],
      videos: [],
      quizIds: ['bank-q3b'],
    },

    // ─── Section 6: Is My Money Safe? ───────────────────────────
    {
      id: 'safety',
      icon: '🔐',
      title: 'Is My Money Safe?',
      readAloudBlocks: [
        {
          id: 'safety-vaults',
          paragraphs: [
            'One of the biggest questions people have about banks is: "What if the bank loses my money?" It is a great question, and the answer is both reassuring and fascinating. First, let us talk about physical security. Banks store cash and valuables in massive vaults made of reinforced steel and concrete, often weighing several tons. These vaults have time-locks that prevent them from being opened outside of business hours, security cameras watching every angle, and alarm systems that alert the police instantly if anything goes wrong.',
            'But the real superhero of bank safety is something called FDIC insurance. FDIC stands for the Federal Deposit Insurance Corporation, and it was created in 1933 after thousands of banks failed during the Great Depression. Here is how it works: if your bank ever goes out of business, the FDIC guarantees that you will get your money back — up to two hundred and fifty thousand dollars per depositor, per bank. That means even if the bank disappears tomorrow, the United States government makes sure you do not lose a penny (up to that limit). This is why you see the "Member FDIC" label on bank doors and websites — it is a promise that your deposits are protected.',
          ],
        },
        {
          id: 'safety-digital',
          paragraphs: [
            'In the digital age, cybersecurity is just as important as physical vaults. Banks spend billions of dollars every year protecting their computer systems from hackers. They use encryption — a way of scrambling data so that only authorized people can read it — to protect your account information when you log in online or use a banking app. Two-factor authentication, where you need both a password and a code sent to your phone, adds another layer of protection.',
            'You can help keep your money safe too! Never share your bank password with anyone, be cautious about emails or texts that ask for your account information (these are often "phishing" scams designed to trick you), and always log out of banking apps when you are done using them. Banks and customers work together as a team to keep money secure. With strong vaults, government insurance, and smart digital security, your money is safer in a bank than just about anywhere else in the world!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'EfKuZayeksI',
          title: 'What is Crypto? Cryptocurrency for Kids',
          channelName: 'Hey! Guess What',
        },
      ],
      quizIds: ['bank-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: What Is a Bank?
    {
      id: 'bank-q1a',
      sectionId: 'what-bank',
      title: 'Quick Quiz Time!',
      question: 'What is a bank?',
      options: [
        { text: 'A store where you buy coins and paper money', isCorrect: false },
        { text: 'A safe place to keep money that helps it grow through interest', isCorrect: true },
        { text: 'A government office that prints dollar bills', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'bank-q1b',
      sectionId: 'what-bank',
      title: 'Interest Explorer!',
      question: 'What is interest?',
      options: [
        { text: 'A fee the bank charges you for opening an account', isCorrect: false },
        { text: 'Money the bank pays you for keeping your money there', isCorrect: true },
        { text: 'The total amount of money in your piggy bank', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: The History of Banking
    {
      id: 'bank-q1c',
      sectionId: 'history',
      title: 'Ancient Banking Quiz!',
      question: 'Where did the first banks start?',
      options: [
        { text: 'In medieval European castles', isCorrect: false },
        { text: 'Ancient temples in Mesopotamia', isCorrect: true },
        { text: 'On pirate ships crossing the ocean', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'bank-q1d',
      sectionId: 'history',
      title: 'Word Origins Challenge!',
      question: 'What is an ATM?',
      options: [
        { text: 'A type of bank account for kids only', isCorrect: false },
        { text: 'A machine that lets you deposit or withdraw cash from your account', isCorrect: true },
        { text: 'An alarm system that protects bank vaults', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Checking vs. Savings Accounts
    {
      id: 'bank-q2a',
      sectionId: 'accounts',
      title: 'Savings Account Quiz!',
      question: 'What is a savings account for?',
      options: [
        { text: 'Buying things every day at the store', isCorrect: false },
        { text: 'Saving money for the future and earning interest', isCorrect: true },
        { text: 'Sending money to friends instantly', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'bank-q2b',
      sectionId: 'accounts',
      title: 'Checking Account Quiz!',
      question: 'What is a checking account for?',
      options: [
        { text: 'Everyday spending and paying bills', isCorrect: true },
        { text: 'Storing gold bars in a vault', isCorrect: false },
        { text: 'Earning the highest possible interest rate', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: How Banks Make Money
    {
      id: 'bank-q2c',
      sectionId: 'how-banks-earn',
      title: 'Bank Business Quiz!',
      question: 'How do banks make money?',
      options: [
        { text: 'They print their own dollar bills in the basement', isCorrect: false },
        { text: 'They charge more interest on loans than they pay on deposits', isCorrect: true },
        { text: 'They sell coins to the government at a profit', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'bank-q3a',
      sectionId: 'how-banks-earn',
      title: 'Vault Mystery Quiz!',
      question: 'Why don\'t banks keep all deposited money in the vault?',
      options: [
        { text: 'The vault is not big enough to hold it all', isCorrect: false },
        { text: 'They lend most of it out to earn interest', isCorrect: true },
        { text: 'The government takes most of it as taxes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Digital Banking
    {
      id: 'bank-q3b',
      sectionId: 'digital',
      title: 'Digital Banking Quiz!',
      question: 'What is digital banking?',
      options: [
        { text: 'A video game where you pretend to run a bank', isCorrect: false },
        { text: 'Using apps and websites to manage your money', isCorrect: true },
        { text: 'A type of bank that only accepts digital currencies', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 6: Is My Money Safe?
    {
      id: 'bank-q3c',
      sectionId: 'safety',
      title: 'Money Safety Quiz!',
      question: 'What is FDIC insurance?',
      options: [
        { text: 'A type of savings account with extra interest', isCorrect: false },
        { text: 'A lock on the bank vault that only the manager can open', isCorrect: false },
        { text: 'Government protection that keeps your deposits safe', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'bank-essay',
    prompt:
      'If you could run your own bank, what would it be like?',
    description:
      'Imagine you are the founder of a brand-new bank! What would you name it? What would make your bank special or different from other banks? Would you have a physical building, an app, or both? What interest rates would you offer to savers? Would you have any special programs for kids? Describe your dream bank — how it would work, who it would help, and what would make people want to keep their money there. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Fantastic work, future bank founder! Your bank plan has been saved. You really understand how banking works!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'bank-reward',
    title: 'Bank Manager Simulator!',
    description:
      'You have unlocked the Bank Manager Simulator! Step into the shoes of a real bank manager and run your very own community bank. Accept deposits, approve loans, set interest rates, and watch your bank grow. Can you keep your customers happy while keeping the bank profitable?',
    lockMessage: 'Bank Vault Sealed!',
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
    type: 'bank-manager-sim',
    celebrationMessage:
      'CONGRATULATIONS! You have unlocked the Bank Manager Simulator! You proved you are a true banking expert and a great bank manager. Now go run that bank!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Banking Expert!',
    paragraphs: [
      'Congratulations! You have completed an incredible journey through the world of banks and how they work. You are now a certified banking expert!',
      'You discovered that banks are far more than just buildings with vaults — they are the engines of the modern economy. From ancient Mesopotamian temples where priests tracked grain deposits on clay tablets, to Italian merchant families who built international banking empires, to the creation of central banks like the Federal Reserve, you traced the entire history of how banking evolved over thousands of years.',
      'You learned the difference between savings accounts and checking accounts, and why smart savers use both. You uncovered the secret of how banks make money through the interest rate spread — paying you a little for your deposits while charging borrowers a bit more for loans. You explored the incredible world of digital banking, from mobile apps and online-only neobanks to instant payment systems that are making cash nearly obsolete in some countries.',
      'Most importantly, you learned that your money is safe. Between reinforced steel vaults, FDIC insurance protecting up to two hundred and fifty thousand dollars, and billions of dollars spent on cybersecurity, banks work tirelessly to keep every penny secure. And you learned how to do your part too — by protecting your passwords, watching out for scams, and making smart decisions with your money.',
      'Next time you walk past a bank, use a banking app, or swipe a debit card, remember everything you learned here. You understand the system now — and that knowledge is one of the most valuable things you will ever have!',
    ],
  },
};
