import type { Topic } from '../types';

export const spendingWisely: Topic = {
  id: 'spending-wisely',
  slug: 'spending-wisely',
  title: 'Spending Wisely',
  subtitle: 'Needs, Wants, and Smart Choices',
  status: 'active',
  themeId: 'spending-wisely',
  heroIcons: ['🛒', '💡', '🏷️'],
  navItems: [
    { id: 'needs-wants', icon: '🍎', label: 'Needs vs Wants' },
    { id: 'advertising', icon: '📺', label: 'Advertising' },
    { id: 'comparison', icon: '🔍', label: 'Comparison Shopping' },
    { id: 'patience', icon: '⏰', label: '24-Hour Rule' },
    { id: 'value', icon: '💰', label: 'Best Value' },
    { id: 'plan', icon: '📝', label: 'Shopping Plan' },
  ],
  sections: [
    // ─── Section 1: Needs vs. Wants ──────────────────────────────
    {
      id: 'needs-wants',
      icon: '🍎',
      title: 'Needs vs. Wants',
      readAloudBlocks: [
        {
          id: 'needs-wants-intro',
          paragraphs: [
            'Have you ever been at the grocery store and seen a shiny candy bar near the checkout counter? Maybe you really, really wanted it. But did you actually need it? Understanding the difference between needs and wants is one of the most powerful money skills you can learn, and it all starts with a simple question: "Could I survive without this?"',
            'Needs are things you absolutely must have to stay alive, healthy, and safe. Food is a need — your body requires nutrition to grow and have energy. Shelter is a need — you need a safe place to sleep and stay warm. Clothing is a need — you need something to wear to protect your body from the weather. Medicine when you are sick is a need. Clean water is a need. These are the essentials that every human being requires.',
            'Wants are things that are nice to have but that you could live without. A candy bar is a want — it tastes great, but you will not go hungry without it. A video game is a want. A new pair of trendy sneakers when your current shoes still fit is a want. Wants make life more fun and enjoyable, and there is nothing wrong with wanting things! The key is knowing the difference so you can make sure your needs are covered first.',
          ],
        },
        {
          id: 'needs-wants-tricky',
          paragraphs: [
            'Here is where it gets tricky: sometimes the same category can be both a need and a want depending on the situation. You need food, but you do not need expensive restaurant meals every night — a home-cooked dinner meets the need just fine. You need clothing, but you do not need the most expensive brand-name jacket when a warm coat from a regular store works just as well. Learning to tell the difference within these categories is what makes you a truly smart spender.',
          ],
        },
      ],
      characters: [
        {
          emoji: '🛒',
          name: 'Smarty Cart',
          title: 'The Wise Shopper',
          description:
            'Smarty Cart always thinks before buying. Before anything goes into the cart, Smarty asks: "Is this a need or a want?" This simple question has saved Smarty thousands of dollars over the years and helped ensure there is always enough money left for the truly important things.',
        },
        {
          emoji: '📺',
          name: 'Addy the Ad',
          title: 'The Persuader',
          description:
            'Addy the Ad is flashy, loud, and very convincing. Addy\'s job is to make every product look like the most amazing thing you have ever seen. But remember — Addy works for the companies that make the products, not for you! Learning to see through Addy\'s tricks is a superpower.',
        },
        {
          emoji: '💡',
          name: 'Compare Clara',
          title: 'The Deal Finder',
          description:
            'Compare Clara never buys the first thing she sees. She checks prices at different stores, reads reviews, and always looks for the best value. Clara knows that a little patience and research can save a lot of money — money that can be used for other important things.',
        },
      ],
      videos: [
        {
          youtubeId: '9E2Myy58O04',
          title: 'Needs & Wants Game',
          channelName: 'Marbles Kids Museum',
        },
      ],
      quizIds: ['spend-q1a', 'spend-q1b'],
    },

    // ─── Section 2: The Advertising Trap ─────────────────────────
    {
      id: 'advertising',
      icon: '📺',
      title: 'The Advertising Trap',
      readAloudBlocks: [
        {
          id: 'advertising-intro',
          paragraphs: [
            'Every single day, you are surrounded by advertisements — on TV, on websites, on billboards, in apps, and even in the middle of your favorite YouTube videos. Companies spend billions of dollars every year on advertising for one simple reason: it works. Ads are carefully designed by very smart people whose entire job is to make you want to buy things. But once you understand how ads work, you gain the power to see through their tricks.',
            'One of the most common advertising tricks is making a product look way more exciting than it really is. Have you ever seen a commercial for a toy where it looks incredible — flying through the air, glowing with lights, and making the kids in the commercial look like they are having the best time ever? Then when you actually get the toy, it is... just okay? That is because ads use special camera angles, lighting, sound effects, and even actors to make everything look ten times better than reality.',
            'Another sneaky trick is using celebrities or popular characters to sell products. When your favorite athlete or YouTuber says they love a certain brand of shoes or snack, it makes you feel like buying that product will somehow connect you to them. But the truth is, those celebrities are being paid huge amounts of money to say those things. They might not even use the product in real life!',
          ],
        },
        {
          id: 'advertising-defense',
          paragraphs: [
            'So how do you defend yourself against advertising tricks? The best weapon is a simple question: "Is this ad trying to give me useful information, or is it just trying to make me feel a certain way?" Good information includes what the product actually does, how much it costs, and how it compares to other options. Emotional tricks include making you feel like you will be left out, unpopular, or unhappy if you do not buy something. Once you start asking this question, you will be amazed at how many ads rely on feelings instead of facts.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'WO3REcunyr0',
          title: 'Why Do We Use Money',
          channelName: "Toltol's Playlab",
        },
      ],
      quizIds: ['spend-q1c', 'spend-q2a'],
    },

    // ─── Section 3: Comparison Shopping ──────────────────────────
    {
      id: 'comparison',
      icon: '🔍',
      title: 'Comparison Shopping',
      readAloudBlocks: [
        {
          id: 'comparison-intro',
          paragraphs: [
            'Imagine you want to buy a new backpack for school. You walk into the first store you see and find one you like for thirty dollars. Should you buy it right away? A smart shopper would say: "Not so fast!" Comparison shopping means checking prices at different stores and online before you make a purchase. You might find the exact same backpack for twenty dollars somewhere else — and that ten dollars you saved can go toward something else you need.',
            'Comparison shopping is easier than ever thanks to the internet. You can look up the same product on different websites in just a few minutes and see exactly how prices compare. But comparison shopping is not just about finding the lowest price. You also want to check reviews from other people who have bought the product. A backpack that costs twenty dollars but falls apart after two weeks is not a better deal than one that costs thirty dollars and lasts all year.',
            'Reading reviews is like getting advice from hundreds of people at once. Look for patterns in the reviews: if many people say the zipper breaks easily, that is a real concern. If most people say the product is great and only one person had a problem, it was probably just bad luck. Pay attention to reviews from people who have used the product for a while, not just first impressions.',
          ],
        },
        {
          id: 'comparison-practice',
          paragraphs: [
            'Here is a great habit to build: whenever you want to buy something that costs more than a few dollars, check at least three different places before you decide. Compare not just the price, but also the quality, the return policy, and whether shipping is included if you are buying online. With practice, comparison shopping becomes second nature, and you will be amazed at how much money you save over time.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'D0slPLpCYFM',
          title: 'Does More Money Equal More Happiness?',
          channelName: 'After Skool',
        },
      ],
      quizIds: ['spend-q2b', 'spend-q2c'],
    },

    // ─── Section 4: The 24-Hour Rule ─────────────────────────────
    {
      id: 'patience',
      icon: '⏰',
      title: 'The 24-Hour Rule',
      readAloudBlocks: [
        {
          id: 'patience-intro',
          paragraphs: [
            'Have you ever bought something on impulse — grabbed it off the shelf without really thinking — and then later wondered why you even wanted it? That is called an impulse purchase, and it happens to everyone, even adults. Stores are actually designed to encourage impulse buying. That is why candy and small toys are placed right next to the checkout counter: they want you to grab something at the last second while you are waiting in line.',
            'The 24-Hour Rule is a simple but incredibly powerful strategy to fight impulse purchases. Here is how it works: whenever you see something you want to buy but did not plan on buying, you wait 24 hours before making the decision. Just one day. If you still want it after a full day has passed, and you can afford it without giving up something more important, then maybe it is worth buying. But you will be surprised how often that burning desire to buy something fades away completely after just one night of sleep.',
            'Why does this work so well? Because impulse purchases are driven by emotion, not logic. When you see something shiny and exciting, your brain releases chemicals that make you feel a rush of excitement. That rush makes you want the item right now. But those feelings are temporary. After 24 hours, the emotional rush fades, and your logical brain takes over. You can then make a clear-headed decision about whether this purchase truly makes sense for you.',
          ],
        },
        {
          id: 'patience-practice',
          paragraphs: [
            'Try this the next time you are shopping: if you see something you really want, take a picture of it or write it down instead of buying it. Then walk away. Go home and sleep on it. The next day, ask yourself three questions: "Do I really need this? Can I afford it without giving up something more important? Will I still use or enjoy this a month from now?" If the answer to all three is yes, go ahead and get it. If not, you just saved yourself money and avoided buyer\'s remorse!',
          ],
        },
      ],
      videos: [],
      quizIds: ['spend-q3a'],
    },

    // ─── Section 5: Getting the Best Value ───────────────────────
    {
      id: 'value',
      icon: '💰',
      title: 'Getting the Best Value',
      readAloudBlocks: [
        {
          id: 'value-intro',
          paragraphs: [
            'Getting the best value does not always mean buying the cheapest option. Value means getting the most for your money — the best combination of quality, quantity, and price. One of the most useful tools for finding good value is understanding "price per unit." Price per unit tells you how much you are paying for one single item, one ounce, or one gram of something, making it easy to compare products of different sizes.',
            'For example, imagine you are buying cereal. A small box costs three dollars and contains 12 ounces. A large box costs five dollars and contains 24 ounces. Which is the better deal? The small box costs 25 cents per ounce (three dollars divided by 12 ounces), while the large box costs about 21 cents per ounce (five dollars divided by 24 ounces). The large box is a better value per ounce, even though it costs more upfront. Many grocery stores actually show the price per unit on the shelf tag — look for it next time you go shopping!',
            'But here is an important lesson: the cheapest option per unit is not always the best choice. If you buy a giant bag of apples because the price per apple is lower, but half of them go bad before you can eat them, you actually wasted money. Quality matters too. A well-made pair of shoes that costs fifty dollars and lasts two years is a much better value than a cheap pair that costs twenty dollars but falls apart in three months. Smart shoppers think about the long run, not just the price tag.',
          ],
        },
        {
          id: 'value-sales',
          paragraphs: [
            'Sales and discounts can be great ways to get better value, but they can also be traps. A sale is only a good deal if you were going to buy the item anyway. "Fifty percent off!" sounds amazing, but if you spend twenty dollars on something you never would have bought otherwise, you did not save ten dollars — you spent twenty dollars you did not need to spend. The best time to take advantage of sales is when they happen to line up with something you already planned to buy.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: '41RA_m2KHUU',
          title: 'Can Money Buy Your Happiness?',
          channelName: 'TEDx Talks',
        },
      ],
      quizIds: ['spend-q3b', 'spend-q3c'],
    },

    // ─── Section 6: Making a Shopping Plan ────────────────────────
    {
      id: 'plan',
      icon: '📝',
      title: 'Making a Shopping Plan',
      readAloudBlocks: [
        {
          id: 'plan-intro',
          paragraphs: [
            'Every smart shopper knows that the best shopping trip starts before you ever leave the house. Making a shopping plan means deciding what you need to buy, how much you can spend, and sticking to both of those decisions. It sounds simple, but this one habit can save you hundreds or even thousands of dollars over a lifetime.',
            'The first step in any shopping plan is making a list. Before you go to the store or start browsing online, write down exactly what you need to buy. Be specific — do not just write "snacks," write "one bag of pretzels and one box of granola bars." The more specific your list, the less likely you are to wander around the store picking up things you did not plan on buying. Studies have shown that shoppers who use lists spend significantly less money than those who shop without one.',
            'The second step is setting a budget. A budget is simply the maximum amount of money you are willing to spend on this shopping trip. Once you have your list, estimate how much each item will cost and add it up. If the total is more than your budget, you need to prioritize: which items are the most important? Can any of them wait until next time? Are there cheaper alternatives for some items on the list?',
          ],
        },
        {
          id: 'plan-stick',
          paragraphs: [
            'The hardest part of any shopping plan is sticking to it. Stores are designed to tempt you at every turn — bright displays, enticing smells, end-of-aisle deals, and limited-time offers all exist to pull you away from your plan. But now that you know about needs vs. wants, advertising tricks, comparison shopping, the 24-Hour Rule, and getting the best value, you have a complete toolkit for smart spending. Keep your list in your hand, your budget in your mind, and remember: every dollar you save by shopping smart is a dollar you can put toward something that truly matters to you.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'juO4zxsjSjw',
          title: 'Would winning the lottery make you happier?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['spend-q3d'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Needs vs. Wants
    {
      id: 'spend-q1a',
      sectionId: 'needs-wants',
      title: 'Quick Quiz Time!',
      question: 'What is the difference between a need and a want?',
      options: [
        { text: 'A need is something you must have to survive; a want is something nice to have', isCorrect: true },
        { text: 'A need is something expensive; a want is something cheap', isCorrect: false },
        { text: 'There is no difference — needs and wants are the same thing', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spend-q1b',
      sectionId: 'needs-wants',
      title: 'Essentials Challenge!',
      question: 'Which of the following lists contains only needs?',
      options: [
        { text: 'Video games, candy, and sneakers', isCorrect: false },
        { text: 'Food, shelter, and clothing', isCorrect: true },
        { text: 'Toys, soda, and comic books', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: The Advertising Trap
    {
      id: 'spend-q1c',
      sectionId: 'advertising',
      title: 'Ad Awareness Quiz!',
      question: 'How do ads try to make you buy things?',
      options: [
        { text: 'By giving you all the facts and letting you decide calmly', isCorrect: false },
        { text: 'By making products look more exciting than they really are', isCorrect: true },
        { text: 'By showing you only negative reviews so you feel sorry for the product', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spend-q2a',
      sectionId: 'advertising',
      title: 'Smart Shopper Challenge!',
      question: 'What is comparison shopping?',
      options: [
        { text: 'Buying the first thing you see in a store', isCorrect: false },
        { text: 'Checking prices at different stores before buying', isCorrect: true },
        { text: 'Only shopping at the most expensive store', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Comparison Shopping
    {
      id: 'spend-q2b',
      sectionId: 'comparison',
      title: 'Patience Power Quiz!',
      question: 'What is the 24-Hour Rule?',
      options: [
        { text: 'You can only shop for 24 hours at a time', isCorrect: false },
        { text: 'Stores are only open for 24 hours', isCorrect: false },
        { text: 'Waiting 24 hours before making a purchase to avoid impulse buying', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spend-q2c',
      sectionId: 'comparison',
      title: 'Value Detective Quiz!',
      question: 'What is "price per unit"?',
      options: [
        { text: 'The total price of everything in your cart', isCorrect: false },
        { text: 'The cost for one single item or one ounce/gram', isCorrect: true },
        { text: 'The price of the most expensive item in the store', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: The 24-Hour Rule
    {
      id: 'spend-q3a',
      sectionId: 'patience',
      title: 'Impulse Check Quiz!',
      question: 'What is an impulse purchase?',
      options: [
        { text: 'Something you buy after careful planning and research', isCorrect: false },
        { text: 'Something you buy without thinking or planning', isCorrect: true },
        { text: 'Something you buy because it is on sale', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Getting the Best Value
    {
      id: 'spend-q3b',
      sectionId: 'value',
      title: 'Shopping List Quiz!',
      question: 'Why should you make a shopping list?',
      options: [
        { text: 'To impress the store employees', isCorrect: false },
        { text: 'To stay focused and avoid buying things you don\'t need', isCorrect: true },
        { text: 'Because stores require you to have one', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spend-q3c',
      sectionId: 'value',
      title: 'Beyond the Price Tag Quiz!',
      question: 'What should you check besides price when shopping?',
      options: [
        { text: 'Only the color of the packaging', isCorrect: false },
        { text: 'Quality, reviews, and whether you really need it', isCorrect: true },
        { text: 'How many commercials the product has on TV', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 6: Making a Shopping Plan
    {
      id: 'spend-q3d',
      sectionId: 'plan',
      title: 'Ad Defense Quiz!',
      question: 'What is the best way to resist advertising tricks?',
      options: [
        { text: 'Never watch TV or use the internet', isCorrect: false },
        { text: 'Ask yourself: "Do I really need this, or do I just want it?"', isCorrect: true },
        { text: 'Buy everything you see advertised so you don\'t miss out', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'spend-essay',
    prompt:
      'Tell us about a time you had to choose between something you needed and something you wanted.',
    description:
      'Think about a real moment when you had to make a choice between a need and a want. Maybe you were at a store with your allowance and had to decide between buying lunch and buying a toy. Maybe you had to choose between saving for something important and spending on something fun right away. What did you choose, and how did you feel about your decision? Would you make the same choice again? You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Great reflection! Your thoughtful answer has been saved. You are becoming a truly wise spender!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'spend-reward',
    title: 'Smart Shopper Challenge!',
    description:
      'You\'ve unlocked the Smart Shopper Challenge! Step into a virtual store where you have a limited budget and a shopping list. Can you find the best deals, avoid impulse purchases, and get everything you need without going over budget? Put all your smart spending skills to the test!',
    lockMessage: 'Store Closed!',
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
    type: 'smart-shopper-challenge',
    celebrationMessage:
      'AMAZING! You completed the Smart Shopper Challenge! You are a savvy shopper who knows how to spend wisely, spot advertising tricks, compare prices, and stick to a budget. Your wallet thanks you!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Smart Shopper!',
    paragraphs: [
      'Congratulations! You have completed your journey through the world of smart spending, and you are now equipped with skills that will serve you for the rest of your life!',
      'You learned the crucial difference between needs and wants — understanding that food, shelter, and clothing are essentials, while candy bars, video games, and trendy sneakers are nice extras. You discovered that the same category can sometimes be both a need and a want, and the truly smart spender knows how to tell the difference.',
      'You pulled back the curtain on advertising tricks, learning how companies use special effects, celebrities, and emotional manipulation to make you want things you might not need. Now that you can spot these tricks, you have the power to make decisions based on facts, not feelings.',
      'You mastered the art of comparison shopping — checking prices at multiple stores, reading reviews, and looking at the full picture before buying. You learned the 24-Hour Rule for fighting impulse purchases, the concept of price per unit for finding the best value, and the importance of quality over just the lowest price.',
      'Most importantly, you learned that smart spending is not about never buying anything fun — it is about making thoughtful choices so that your money goes where it matters most to you. Every time you make a shopping list, set a budget, compare prices, or wait before buying, you are building habits that will make you financially strong for years to come. Keep spending wisely!',
    ],
  },
};
