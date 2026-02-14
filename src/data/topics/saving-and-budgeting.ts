import type { Topic } from '../types';

export const savingAndBudgeting: Topic = {
  id: 'saving-and-budgeting',
  slug: 'saving-and-budgeting',
  title: 'Saving & Budgeting',
  subtitle: 'Making Your Money Work for You',
  status: 'active',
  themeId: 'saving-and-budgeting',
  heroIcons: ['🐷', '📊', '🎯'],
  navItems: [
    { id: 'why-save', icon: '🎯', label: 'Why Save?' },
    { id: 'three-jars', icon: '🏺', label: 'Three Jars' },
    { id: 'budget', icon: '📊', label: 'Budgets' },
    { id: 'marshmallow', icon: '🍬', label: 'Patience' },
    { id: 'smart-goals', icon: '⭐', label: 'SMART Goals' },
    { id: 'tips', icon: '💡', label: 'Tips & Tricks' },
  ],
  sections: [
    // ─── Section 1: Why Save? ───────────────────────────────────
    {
      id: 'why-save',
      icon: '🎯',
      title: 'Why Save? Short-Term vs. Long-Term Goals',
      readAloudBlocks: [
        {
          id: 'why-save-intro',
          paragraphs: [
            'Imagine you just received ten dollars for your birthday. You could spend it right away on candy or a small toy, and that would feel great for a little while. But what if there is something bigger you really want — like a new video game, a skateboard, or a special pair of sneakers? If you spend all your money the moment you get it, you will never have enough for those bigger dreams. That is where saving comes in!',
            'Saving means setting aside some of your money now so you can use it later. It is like planting a seed: you give up a little today so something much bigger can grow over time. Saving does not mean you never get to buy anything fun. It just means you are making a plan so you can enjoy both small treats now and bigger rewards later.',
            'There are two main types of savings goals. Short-term goals are things you can save up for in a few weeks or months — maybe a book you have been wanting, a movie ticket, or a birthday gift for a friend. Long-term goals take much longer, sometimes a year or more. These might include a bicycle, a laptop, or even money for college one day. Learning to tell the difference between short-term and long-term goals is one of the most important money skills you can develop!',
          ],
        },
        {
          id: 'why-save-power',
          paragraphs: [
            'Here is a secret that many adults wish they had learned as kids: the earlier you start saving, the more powerful your savings become. Even tiny amounts add up over time. If you saved just one dollar a week, you would have over fifty dollars by the end of a year — enough for something really special. And if you kept going for two years? Over a hundred dollars! The key is consistency: saving a little bit regularly is more powerful than saving a big chunk once in a while.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Did You Know?',
          text: 'Warren Buffett, one of the richest people in the world, bought his first stock when he was only 11 years old! He started saving and investing as a kid, and he says that getting an early start was one of the smartest things he ever did.',
        },
      ],
      videos: [
        {
          youtubeId: 'ZrsWh7Bo97A',
          title: "Sesame Street's For Me, For You, For Later: Three Jars",
          channelName: 'Beth Kobliner',
        },
      ],
      quizIds: ['saving-q1a', 'saving-q1b'],
    },

    // ─── Section 2: The Three Jars ──────────────────────────────
    {
      id: 'three-jars',
      icon: '🏺',
      title: 'The Three Jars: Save, Spend, Share',
      readAloudBlocks: [
        {
          id: 'three-jars-intro',
          paragraphs: [
            'One of the best ways to manage your money is to split it into three categories: Save, Spend, and Share. Some people use three actual jars, envelopes, or piggy banks — one for each category. Every time you receive money, whether it is an allowance, a birthday gift, or money you earned from a chore, you divide it up among the three jars before you do anything else.',
            'The Save jar is for your goals. This is money you are setting aside for something special in the future, whether it is a short-term goal like a new book or a long-term goal like a big trip. The Spend jar is for everyday things you want to enjoy right now — a snack, a small toy, or a fun outing with friends. The Share jar is for giving — maybe you want to donate to a cause you care about, buy a gift for someone, or help a friend in need.',
          ],
        },
        {
          id: 'three-jars-how',
          paragraphs: [
            'How much should go into each jar? There is no single right answer, but a popular starting point is to put about one-third into each. If you receive six dollars, that means two dollars for saving, two dollars for spending, and two dollars for sharing. As you get more comfortable, you can adjust the amounts based on your goals. If you are saving up for something big, you might put more into the Save jar for a while.',
            'The magic of the three-jar system is that it teaches you balance. You never feel guilty about spending because you have a jar just for that. You never feel like saving is a punishment because you still get to enjoy some of your money right away. And you get the wonderful feeling of helping others through your Share jar. Many kids who start using this system say it makes money feel less confusing and a lot more fun!',
          ],
        },
      ],
      characters: [
        {
          emoji: '🐷',
          name: 'Penny the Piggy',
          title: 'The Savings Coach',
          description:
            'Penny the Piggy is your personal savings coach! She loves helping kids figure out how much to set aside for their dreams. Her motto is "A little bit today, a big smile tomorrow!" Penny knows that saving does not have to be boring — she makes it a game by tracking progress with colorful charts and celebrating every milestone along the way.',
        },
        {
          emoji: '📊',
          name: 'Budgie the Budget Bird',
          title: 'The Planner',
          description:
            'Budgie the Budget Bird is always thinking ahead. He carries a tiny notebook where he writes down every penny that comes in and every penny that goes out. Budgie believes that a good plan is the secret to reaching any goal. He helps kids create simple budgets and shows them that tracking your money is like having a treasure map to your dreams.',
        },
        {
          emoji: '🍬',
          name: 'Temptation Tim',
          title: 'The Impulse Monster',
          description:
            'Watch out for Temptation Tim! He is the little voice in your head that says "Buy it NOW!" every time you see something shiny or delicious. Tim is not a bad guy — he just has zero patience. Learning to recognize when Tim is talking helps you pause, think, and decide if a purchase is really worth it or just an impulse buy you will regret later.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In Japan, kids receive special envelopes called "otoshidama" filled with money during New Year celebrations. It is a tradition that teaches children about receiving, saving, and sharing money from a very young age. Many Japanese kids use this money to practice their saving skills!',
        },
      ],
      videos: [
        {
          youtubeId: '0iRbD5rM5qc',
          title: 'Financial Literacy for Kids',
          channelName: 'Learn Bright',
        },
      ],
      quizIds: ['saving-q1c', 'saving-q1d'],
    },

    // ─── Section 3: Making a Budget ─────────────────────────────
    {
      id: 'budget',
      icon: '📊',
      title: 'Making a Budget: Tracking Income and Expenses',
      readAloudBlocks: [
        {
          id: 'budget-intro',
          paragraphs: [
            'A budget is simply a plan for your money. It helps you figure out how much money is coming in (your income) and how much money is going out (your expenses). When you know both of those numbers, you can make smart decisions about how to use what you have. Think of a budget as a roadmap — without one, you might wander around and never reach your destination.',
            'Your income as a kid might come from an allowance, money from chores, birthday gifts, or even a small business like a lemonade stand. Your expenses are anything you spend money on: snacks, toys, games, gifts for friends, or saving toward a bigger goal. The first step in making a budget is to write down all the money you expect to receive in a week or a month, and then write down everything you plan to spend.',
          ],
        },
        {
          id: 'budget-how',
          paragraphs: [
            'Once you have both lists, compare them. If your income is bigger than your expenses, that is great news — you have money left over to save or share! If your expenses are bigger than your income, you need to make some changes. Maybe you can cut back on a few things you do not really need, or find a way to earn a little extra. The goal is to make sure you are never spending more than you have.',
            'Here is a simple way to start: grab a notebook or a piece of paper and draw two columns. Label one "Money In" and the other "Money Out." Each day, write down any money you receive and any money you spend. At the end of the week, add up both columns. You will be amazed at how much you learn just by paying attention! Many adults say they wish someone had taught them this simple habit when they were kids.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Did You Know?',
          text: 'The 50/30/20 rule is a popular budgeting guideline used by many adults: 50% of your money goes to needs (things you must have, like food and housing), 30% goes to wants (fun stuff), and 20% goes to savings. Even though your needs as a kid are different, you can use this idea to split your money wisely!',
        },
      ],
      videos: [],
      quizIds: ['saving-q2a', 'saving-q2b'],
    },

    // ─── Section 4: The Marshmallow Test ────────────────────────
    {
      id: 'marshmallow',
      icon: '🍬',
      title: 'The Marshmallow Test: The Power of Patience',
      readAloudBlocks: [
        {
          id: 'marshmallow-intro',
          paragraphs: [
            'In the late 1960s, a psychologist named Walter Mischel ran a famous experiment at Stanford University. He put a marshmallow in front of a young child and said, "You can eat this marshmallow right now if you want. But if you can wait fifteen minutes without eating it, I will give you TWO marshmallows." Then he left the room. What do you think happened?',
            'Some kids ate the marshmallow the second the researcher walked out. Others tried really hard to wait — they covered their eyes, sang songs, sat on their hands, or even turned their chairs around so they would not have to look at the marshmallow. And some kids made it the full fifteen minutes and earned the second marshmallow! This experiment became known as "The Marshmallow Test," and it taught the world something powerful about a skill called delayed gratification.',
          ],
        },
        {
          id: 'marshmallow-meaning',
          paragraphs: [
            'Delayed gratification means choosing to wait for a bigger or better reward instead of taking a smaller reward right now. It is one of the most important skills when it comes to saving money. Every time you decide not to buy something small and impulsive so you can keep saving for something amazing, you are practicing delayed gratification — just like those kids who waited for the second marshmallow.',
            'Years after the original experiment, researchers checked in on the kids who had participated. They found that the children who were able to wait tended to do better in school, had healthier habits, and were better at handling stress. Now, this does not mean that eating the marshmallow right away makes you a bad person! It just shows that the ability to be patient is a really useful skill — and the good news is, it is a skill you can practice and get better at over time.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The marshmallow experiment showed that kids who were able to wait for the second marshmallow often did better in many areas of life later on — from school grades to health. But scientists also found that you can train yourself to be more patient with practice, so do not worry if waiting is hard for you right now!',
        },
      ],
      videos: [
        {
          youtubeId: 'aRcXutXvfmM',
          title: 'Financial Literacy: Needs and Wants',
          channelName: 'Learn Bright',
        },
      ],
      quizIds: ['saving-q2c', 'saving-q2d'],
    },

    // ─── Section 5: Setting SMART Goals ─────────────────────────
    {
      id: 'smart-goals',
      icon: '⭐',
      title: 'Setting SMART Goals for Saving',
      readAloudBlocks: [
        {
          id: 'smart-goals-intro',
          paragraphs: [
            'Saying "I want to save money" is a nice idea, but it is a bit like saying "I want to go somewhere." Where? When? How will you get there? That is why people use something called SMART goals. SMART is an acronym that stands for Specific, Measurable, Achievable, Relevant, and Time-bound. When your savings goal checks all five boxes, you are much more likely to actually reach it!',
            'Let us break it down. Specific means you know exactly what you are saving for — not just "something cool," but "a $30 art set." Measurable means you can track your progress — "I have saved $12 out of $30 so far." Achievable means the goal is realistic for you — if you earn $5 a week, saving $30 in six weeks is achievable, but saving $500 in one week is not. Relevant means the goal matters to you personally — you are more likely to stick with it if you really care about the reward. And Time-bound means you have set a deadline — "I want to reach my goal by spring break."',
          ],
        },
        {
          id: 'smart-goals-example',
          paragraphs: [
            'Here is an example of turning a vague goal into a SMART goal. Vague goal: "I want to save up for a new basketball." SMART goal: "I want to save $25 for a new basketball by putting $5 from my allowance into my Save jar every Friday for the next five weeks." See the difference? The SMART goal tells you exactly what to do, how much to save, when to save it, and when you will reach your goal. It is like giving yourself a step-by-step instruction manual!',
            'Writing your SMART goal down on paper and putting it somewhere you can see it every day makes a huge difference. Some kids tape their goal to their mirror or put it on the fridge. You can even draw a picture of what you are saving for to keep yourself motivated. Every time you add money to your Save jar, color in part of a progress bar or move a marker closer to the finish line. Watching your savings grow is one of the best feelings in the world!',
          ],
        },
      ],
      videos: [],
      quizIds: ['saving-q3a'],
    },

    // ─── Section 6: Tips & Tricks ───────────────────────────────
    {
      id: 'tips',
      icon: '💡',
      title: 'Tips & Tricks: Saving Like a Pro',
      readAloudBlocks: [
        {
          id: 'tips-automatic',
          paragraphs: [
            'Now that you understand why saving matters and how to set goals, let us talk about some tips and tricks that can make saving even easier. The number one tip used by money experts around the world is called "paying yourself first." This means that every time you receive money, the very first thing you do — before spending a single cent — is put some into your savings. It is not about saving whatever is left over at the end; it is about saving right at the beginning so you never forget.',
            'Another powerful trick is to make your savings automatic. If a parent or guardian helps manage your money, ask them to move a set amount into a savings account for you every week or every month. When saving happens automatically, you do not have to rely on willpower or memory. It just happens, like magic! Many of the wealthiest people in the world say that automating their savings was the single best financial habit they ever developed.',
          ],
        },
        {
          id: 'tips-visual',
          paragraphs: [
            'Visual trackers are another fantastic tool. Draw a big thermometer on a piece of poster board and color it in as your savings grow. Or create a chart with boxes you can check off each time you save. Seeing your progress right in front of you makes the goal feel real and keeps you excited. Some kids even use a clear jar so they can literally watch their coins and bills pile up!',
            'Finally, learn to spot and avoid impulse buys. An impulse buy is something you purchase on the spot without thinking about it — like grabbing a candy bar at the checkout counter or clicking "buy now" on something you just saw online. The best defense against impulse buys is the 24-hour rule: when you feel the urge to buy something you had not planned on, wait at least 24 hours. If you still want it the next day, it might be worth it. But you will be surprised how often the urge fades away and you are glad you kept your money!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Did You Know?',
          text: 'The 50/30/20 rule suggests putting 50% of your money toward needs, 30% toward wants, and 20% toward savings. Even as a kid, you can adapt this idea: put about half your money toward things you need or have committed to, a third toward fun stuff, and the rest into savings. It is a simple formula that really works!',
        },
      ],
      videos: [
        {
          youtubeId: 'c9VFbAJRSv0',
          title: 'Financial Literacy: Borrowing vs. Saving',
          channelName: 'Learn Bright',
        },
      ],
      quizIds: ['saving-q3b'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Why Save?
    {
      id: 'saving-q1a',
      sectionId: 'why-save',
      title: 'Quick Quiz Time!',
      question:
        'What is the difference between a short-term and a long-term savings goal?',
      options: [
        { text: 'Short-term goals cost less than a dollar, long-term goals cost more than a dollar', isCorrect: false },
        { text: 'Short-term goals take weeks or months; long-term goals take years', isCorrect: true },
        { text: 'There is no difference — they are the same thing', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'saving-q1b',
      sectionId: 'why-save',
      title: 'Young Investor Quiz!',
      question:
        'At what age did Warren Buffett buy his first stock?',
      options: [
        { text: '5 years old', isCorrect: false },
        { text: '11 years old', isCorrect: true },
        { text: '21 years old', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: The Three Jars
    {
      id: 'saving-q1c',
      sectionId: 'three-jars',
      title: 'Three Jars Challenge!',
      question:
        'What are the three jars (or categories) for splitting your money?',
      options: [
        { text: 'Save, Spend, Share', isCorrect: true },
        { text: 'Earn, Borrow, Return', isCorrect: false },
        { text: 'Coins, Bills, Checks', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'saving-q1d',
      sectionId: 'three-jars',
      title: 'Impulse Monster Quiz!',
      question:
        'What is an impulse buy?',
      options: [
        { text: 'Something you save up for over many months', isCorrect: false },
        { text: 'Something you buy without planning, on the spot', isCorrect: true },
        { text: 'A purchase you make using a coupon', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Making a Budget
    {
      id: 'saving-q2a',
      sectionId: 'budget',
      title: 'Budget Basics Quiz!',
      question:
        'What does a budget help you track?',
      options: [
        { text: 'Only the money you spend on food', isCorrect: false },
        { text: 'What money comes in and what money goes out', isCorrect: true },
        { text: 'How many jars you have at home', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'saving-q2b',
      sectionId: 'budget',
      title: '50/30/20 Challenge!',
      question:
        'What is the 50/30/20 rule?',
      options: [
        { text: '50% saving, 30% spending, 20% sharing', isCorrect: false },
        { text: '50% needs, 30% wants, 20% savings', isCorrect: true },
        { text: '50% for lunch, 30% for dinner, 20% for breakfast', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: The Marshmallow Test
    {
      id: 'saving-q2c',
      sectionId: 'marshmallow',
      title: 'Marshmallow Quiz!',
      question:
        'What is delayed gratification?',
      options: [
        { text: 'Eating all your treats as fast as possible', isCorrect: false },
        { text: 'Waiting for a bigger reward instead of taking a smaller one now', isCorrect: true },
        { text: 'Giving away all your money to friends', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'saving-q2d',
      sectionId: 'marshmallow',
      title: 'Patience Power Quiz!',
      question:
        'What did the marshmallow experiment test?',
      options: [
        { text: 'Whether kids liked marshmallows or chocolate better', isCorrect: false },
        { text: 'Whether kids could wait for a bigger reward', isCorrect: true },
        { text: 'How fast kids could eat a marshmallow', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: SMART Goals
    {
      id: 'saving-q3a',
      sectionId: 'smart-goals',
      title: 'SMART Goals Quiz!',
      question:
        'What does the S in SMART goals stand for?',
      options: [
        { text: 'Spending', isCorrect: false },
        { text: 'Specific', isCorrect: true },
        { text: 'Saving', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 6: Tips & Tricks
    {
      id: 'saving-q3b',
      sectionId: 'tips',
      title: 'Pro Saver Quiz!',
      question:
        'What is "paying yourself first"?',
      options: [
        { text: 'Buying yourself a treat before saving anything', isCorrect: false },
        { text: 'Saving money before spending on anything else', isCorrect: true },
        { text: 'Earning money by doing chores for yourself', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'saving-essay',
    prompt:
      'If you could save up for one dream goal, what would it be and how would you get there?',
    description:
      'Now it is your turn to think big! Imagine you have a dream goal — something you really, truly want to save for. It could be a special toy, a trip, a musical instrument, a new gadget, or anything else you can dream up. Describe what your goal is, how much it might cost, and what plan you would make to save for it. Would you use the three-jar system? How would you resist impulse buys along the way? Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Fantastic plan! Your savings strategy has been saved. You are thinking like a true financial planner!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'saving-reward',
    title: 'Piggy Bank Planner!',
    description:
      'You have unlocked the Piggy Bank Planner! Now you can practice splitting your allowance into Save, Spend, and Share jars, set SMART savings goals, and test your ability to resist Temptation Tim and his impulse-buy tricks.',
    lockMessage: 'Piggy Bank Locked!',
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
    type: 'piggy-bank-planner',
    celebrationMessage:
      'YOU DID IT! You are a savings superstar! You have mastered the three-jar system, learned to set SMART goals, conquered the marshmallow test, and outsmarted Temptation Tim. Your piggy bank is proud of you!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Savings Superstar!',
    paragraphs: [
      'Congratulations! You have completed an incredible journey through the world of saving and budgeting. You now know more about managing money than many adults did when they were your age!',
      'You learned why saving matters and the difference between short-term and long-term goals. You discovered the three-jar system — Save, Spend, and Share — and how splitting your money into categories helps you stay balanced and feel good about every dollar you earn.',
      'You built your own budget by tracking what comes in and what goes out, and you learned the famous 50/30/20 rule that millions of people use to manage their money. You also explored the marshmallow test and discovered the amazing power of delayed gratification — the ability to wait for something bigger and better.',
      'You became a SMART goal setter, learning to make your savings goals Specific, Measurable, Achievable, Relevant, and Time-bound. And you loaded up on pro tips like paying yourself first, using visual trackers, automating your savings, and beating impulse buys with the 24-hour rule.',
      'Remember, great savers are not born — they are made, one small decision at a time. Every time you choose to save even a little bit, you are building a habit that will serve you for the rest of your life. Keep it up, and your future self will thank you!',
    ],
  },
};
