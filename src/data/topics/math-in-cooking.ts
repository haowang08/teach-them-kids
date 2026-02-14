import type { Topic } from '../types';

export const mathInCooking: Topic = {
  id: 'math-in-cooking',
  slug: 'math-in-cooking',
  title: 'Math in Cooking',
  subtitle:
    'Measuring, Mixing & the Secret Math Behind Every Recipe',
  status: 'active',
  themeId: 'math-in-cooking',
  heroIcons: ['\u{1F9C1}', '\u{1F373}', '\u{1F4CF}'],
  navItems: [
    { id: 'measuring-fractions', icon: '\u{1F944}', label: 'Measuring & Fractions' },
    { id: 'ratios-scaling', icon: '\u{1F4D0}', label: 'Ratios & Scaling' },
    { id: 'temperature-time', icon: '\u{1F321}\uFE0F', label: 'Temperature & Time' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F373}',
      title: 'Welcome to the Math Kitchen!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Every time someone bakes a cake, stirs a pot of soup, or follows a recipe, they\'re doing math! Cooking is one of the most delicious ways to use fractions, ratios, multiplication, and even a little bit of science.',
            'Think about it: a recipe calls for \u00BE cup of flour, 2\u00BD teaspoons of vanilla, and you need to double it for a party. How much flour is that? How many teaspoons? Cooks solve problems like this every single day. Professional bakers use math so precise that even a small mistake can ruin an entire batch of bread!',
            'In this adventure, you\'ll discover how measuring cups are really fraction tools in disguise, how ratios help you scale any recipe up or down, and how temperature math turns raw dough into golden, fluffy bread. Put on your apron and let\'s cook with math!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'bIKmw0aTmYc',
          title: 'Equivalent Ratios: Recipe',
          channelName: 'Khan Academy',
        },
        {
          youtubeId: 's4LJcqulrwk',
          title: 'Math in the Kitchen',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'etuEBgNdR38',
          title: 'Fractions in Recipes',
          channelName: 'Khan Academy',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Measuring & Fractions ──────────────────────
    {
      id: 'measuring-fractions',
      icon: '\u{1F944}',
      title: 'Measuring & Fractions: Every Scoop is Math',
      readAloudBlocks: [
        {
          id: 'measuring-intro-text',
          paragraphs: [
            'Open any cookbook and you\'ll see fractions everywhere: \u00BD cup of sugar, \u00BC teaspoon of salt, \u00BE cup of milk. Measuring cups and spoons are fraction tools! A set of measuring cups typically includes 1 cup, \u00BD cup, \u2153 cup, and \u00BC cup. Every time you grab one, you\'re working with fractions.',
            'Here\'s the math that every cook needs to know: 1 cup equals 16 tablespoons. 1 tablespoon equals 3 teaspoons. So 1 cup equals 48 teaspoons! These conversions are essential when you need to measure something precisely but don\'t have the right size cup.',
            'But what happens when a recipe says you need \u2154 cup of butter and you only have a \u2153 cup measure? You fill it twice! \u2153 + \u2153 = \u2154. What about \u00BE cup using only a \u00BC cup? Fill it three times: \u00BC + \u00BC + \u00BC = \u00BE. Cooking is fraction practice you can eat!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F944}',
          name: 'The Measuring Cup',
          title: 'A Fraction in Your Hand',
          description:
            'A standard set of measuring cups is a fraction lesson you can hold! The 1-cup measure is the whole. The \u00BD-cup is one-half, meaning you need 2 of them to make 1 cup. The \u2153-cup needs 3 fills to make a cup. The \u00BC-cup needs 4 fills. In baking, precision matters: too much flour makes a cake dense, too little makes it crumbly. That\'s why bakers measure carefully, using these fractions to get exact amounts.',
          extraTag: '1 cup = 16 tablespoons',
        },
        {
          emoji: '\u{1F375}',
          name: 'The Teaspoon',
          title: 'The Tiniest Fraction',
          description:
            'A teaspoon is a small but mighty measure! There are 3 teaspoons in 1 tablespoon, and 48 teaspoons in 1 cup. When a recipe calls for \u00BD teaspoon of baking soda, that tiny amount creates a powerful chemical reaction that makes your muffins rise! Professional bakers often use grams instead of cups for even more precision. One cup of all-purpose flour weighs about 120 grams, but it can vary by 20 grams depending on how you scoop it!',
          extraTag: '3 teaspoons = 1 tablespoon',
        },
        {
          emoji: '\u2696\uFE0F',
          name: 'The Kitchen Scale',
          title: 'The Most Precise Measure',
          description:
            'Professional bakers around the world prefer weighing ingredients over using measuring cups. Why? Because cups are inconsistent — the same cup of flour can weigh anywhere from 100 to 140 grams depending on how you scoop it. A kitchen scale gives you exact amounts every time. In countries like France, Germany, and Japan, all recipes use grams. The metric system makes scaling recipes much easier too: doubling 250g is simply 500g!',
          extraTag: '1 cup flour \u2248 120g (varies!)',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A "pinch" of salt is an actual (if informal) measurement! It\'s about 1/16 of a teaspoon. A "dash" is about 1/8 teaspoon. And a "smidgen" is 1/32 teaspoon. Even the tiniest amounts in cooking have fractional names!',
        },
      ],
      videos: [],
      quizIds: ['cooking-q1a', 'cooking-q1b', 'cooking-q1c', 'cooking-q1d'],
    },

    // ─── Section 2: Ratios & Scaling ───────────────────────────
    {
      id: 'ratios-scaling',
      icon: '\u{1F4D0}',
      title: 'Ratios & Scaling: Big Batch, Small Batch',
      readAloudBlocks: [
        {
          id: 'ratios-intro-text',
          paragraphs: [
            'Imagine you have a cookie recipe that makes 24 cookies, but you need 48 for a school bake sale. What do you do? You double every ingredient! If the recipe calls for 2 cups of flour, you use 4. If it calls for \u00BE cup of sugar, you use 1\u00BD cups (\u00BE \u00D7 2 = 6/4 = 1\u00BD). Scaling a recipe is multiplication with fractions!',
            'But what about cutting a recipe in half? If a cake recipe calls for 3 eggs and you want to halve it, you need 1\u00BD eggs. That\'s tricky! Experienced bakers crack 1 egg into a bowl, beat it, measure the volume, and use half. Math helps solve real cooking problems.',
            'Professional bakers use something called "baker\'s percentage" (also known as baker\'s math). In this system, the weight of flour is always set to 100%, and every other ingredient is expressed as a percentage of the flour. A basic bread recipe might be: flour 100%, water 65%, salt 2%, yeast 1%. This makes it incredibly easy to scale the recipe to any amount — just decide how much flour you want and calculate the rest!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F35E}',
          name: 'Baker\'s Percentage',
          title: 'The Professional\'s Secret Formula',
          description:
            'Baker\'s percentage is how every professional bakery in the world writes recipes. Flour is always 100%. If you use 1,000g of flour and the recipe says water is 65%, you use 650g of water (1,000 \u00D7 0.65 = 650). Salt at 2% means 20g (1,000 \u00D7 0.02 = 20). This system works at any scale: whether you\'re making one loaf at home or a thousand loaves in a bakery, the ratios stay the same and the bread turns out perfectly every time!',
          extraTag: 'Flour = always 100%',
        },
        {
          emoji: '\u{1F370}',
          name: 'The Ratio Rule',
          title: 'The Secret Behind All Recipes',
          description:
            'Many classic recipes are built on simple ratios. A basic vinaigrette (salad dressing) is 3 parts oil to 1 part vinegar — a 3:1 ratio. A basic cake is roughly a 1:1:1:1 ratio of flour, sugar, butter, and eggs by weight (called a "pound cake" because the original recipe used 1 pound of each!). Once you know these ratios, you can make these foods without even looking at a recipe, at any size you want.',
          extraTag: 'Vinaigrette: 3:1 oil to vinegar',
        },
        {
          emoji: '\u{1F4CA}',
          name: 'Unit Conversion',
          title: 'Switching Between Systems',
          description:
            'Recipes from different countries use different units. American recipes use cups and Fahrenheit, British recipes use grams and Celsius, and some old recipes use fluid ounces. Converting between them requires math! One cup equals about 237 milliliters. One ounce equals about 28 grams. Knowing these conversions means you can cook recipes from anywhere in the world!',
          extraTag: '1 cup \u2248 237 mL',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The word "recipe" comes from the Latin word "recipere," meaning "to receive." Old recipes used to start with the command "Recipe:" (meaning "Take:"). And the pound cake got its name because the original recipe was 1 pound of butter, 1 pound of sugar, 1 pound of eggs, and 1 pound of flour — the simplest ratio possible!',
        },
      ],
      videos: [],
      quizIds: ['cooking-q2a', 'cooking-q2b', 'cooking-q2c'],
    },

    // ─── Section 3: Temperature & Time ─────────────────────────
    {
      id: 'temperature-time',
      icon: '\u{1F321}\uFE0F',
      title: 'Temperature & Time: The Science of Heat',
      readAloudBlocks: [
        {
          id: 'temp-intro-text',
          paragraphs: [
            'Baking is chemistry, and temperature is the key variable! The formula to convert Fahrenheit to Celsius is: \u00B0C = (\u00B0F \u2212 32) \u00D7 5/9. And to go the other way: \u00B0F = (\u00B0C \u00D7 9/5) + 32. So when a recipe says to bake at 350\u00B0F, that\'s (350 \u2212 32) \u00D7 5/9 = 176.7\u00B0C.',
            'Why does temperature matter so much? At 100\u00B0C (212\u00B0F), water boils and turns to steam. This is what makes bread rise in the oven — the water in the dough turns to steam and creates air pockets! At about 140\u00B0C (280\u00B0F), the Maillard reaction begins: sugars and proteins react together to create the golden-brown color and delicious flavor on the crust of bread, roasted meat, and toasted marshmallows.',
            'Timing is math too. If a recipe says to bake a cake for 25 minutes and you\'re making two cakes, do they each bake for 25 minutes or 50? The answer is still 25 minutes (if they\'re on separate racks), because the oven temperature doesn\'t change. But the cakes might need a few extra minutes because more mass in the oven absorbs more heat. Professional bakers use thermometers, not timers, to know when something is perfectly done!',
          ],
        },
        {
          id: 'temp-outro-text',
          paragraphs: [
            'From measuring fractions to scaling ratios to converting temperatures, math is the secret ingredient in every kitchen. The best cooks understand that baking is really a form of applied mathematics — and the delicious results are the best reward for getting the math right!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F321}\uFE0F',
          name: 'The Maillard Reaction',
          title: 'The Math of Deliciousness',
          description:
            'The Maillard reaction, discovered by French chemist Louis-Camille Maillard in 1912, is the chemical reaction between amino acids and sugars that gives browned food its distinctive flavor. It begins at about 140\u00B0C (280\u00B0F) and accelerates as temperature increases. This is why bread baked at 220\u00B0C (425\u00B0F) has a darker, crunchier crust than bread baked at 175\u00B0C (350\u00B0F). Temperature control is the math that separates good bread from great bread!',
          extraTag: 'Starts at ~140\u00B0C (280\u00B0F)',
        },
        {
          emoji: '\u{1F9EA}',
          name: 'Baking Soda Math',
          title: 'The Chemistry of Rising',
          description:
            'Baking soda (sodium bicarbonate) is a leavening agent that makes baked goods rise. When it reacts with an acid (like lemon juice or buttermilk), it produces carbon dioxide gas — tiny bubbles that make your cake fluffy! The reaction requires precise ratios: too much baking soda and your cake tastes bitter and soapy, too little and it stays flat. The general rule is about \u00BC teaspoon of baking soda per 1 cup of flour. That\'s a ratio of about 1:200 by weight!',
          extraTag: '\u00BC tsp per 1 cup flour',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'There\'s one temperature where Fahrenheit and Celsius are equal: \u221240\u00B0! If you plug \u221240 into the conversion formula: (\u221240 \u2212 32) \u00D7 5/9 = \u221272 \u00D7 5/9 = \u221240. It\'s the only point where the two scales meet. Fortunately, no kitchen ever gets that cold!',
        },
      ],
      videos: [],
      quizIds: ['cooking-q3a', 'cooking-q3b', 'cooking-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Measuring & Fractions
    {
      id: 'cooking-q1a',
      sectionId: 'measuring-fractions',
      title: 'Quick Quiz Time!',
      question:
        'How many tablespoons are in 1 cup?',
      options: [
        { text: '8 tablespoons', isCorrect: false },
        { text: '16 tablespoons', isCorrect: true },
        { text: '12 tablespoons', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'cooking-q1b',
      sectionId: 'measuring-fractions',
      title: 'Teaspoon Challenge!',
      question:
        'How many teaspoons are in 1 tablespoon?',
      options: [
        { text: '2 teaspoons', isCorrect: false },
        { text: '3 teaspoons', isCorrect: true },
        { text: '4 teaspoons', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'cooking-q1c',
      sectionId: 'measuring-fractions',
      title: 'Fraction Fill!',
      question:
        'If you only have a \u00BC cup measure, how many times do you fill it to get \u00BE cup?',
      options: [
        { text: '2 times', isCorrect: false },
        { text: '3 times', isCorrect: true },
        { text: '4 times', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'cooking-q1d',
      sectionId: 'measuring-fractions',
      title: 'Precision Quiz!',
      question:
        'Why do professional bakers prefer weighing ingredients on a scale instead of using cups?',
      options: [
        { text: 'Scales are cheaper than cups', isCorrect: false },
        { text: 'Cups are inconsistent — the same cup of flour can vary in weight', isCorrect: true },
        { text: 'Scales are easier to clean', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Ratios & Scaling
    {
      id: 'cooking-q2a',
      sectionId: 'ratios-scaling',
      title: 'Quick Quiz Time!',
      question:
        'If a recipe calls for \u00BE cup of sugar and you need to double it, how much sugar do you use?',
      options: [
        { text: '1 cup', isCorrect: false },
        { text: '1\u00BD cups', isCorrect: true },
        { text: '1\u00BE cups', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'cooking-q2b',
      sectionId: 'ratios-scaling',
      title: 'Baker\'s Percentage!',
      question:
        'In baker\'s percentage, which ingredient is always set to 100%?',
      options: [
        { text: 'Water', isCorrect: false },
        { text: 'Sugar', isCorrect: false },
        { text: 'Flour', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'cooking-q2c',
      sectionId: 'ratios-scaling',
      title: 'Ratio Challenge!',
      question:
        'A vinaigrette uses a 3:1 ratio of oil to vinegar. If you use 6 tablespoons of oil, how much vinegar do you need?',
      options: [
        { text: '1 tablespoon', isCorrect: false },
        { text: '2 tablespoons', isCorrect: true },
        { text: '3 tablespoons', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Temperature & Time
    {
      id: 'cooking-q3a',
      sectionId: 'temperature-time',
      title: 'Quick Quiz Time!',
      question:
        'At what temperature does water boil?',
      options: [
        { text: '90\u00B0C (194\u00B0F)', isCorrect: false },
        { text: '100\u00B0C (212\u00B0F)', isCorrect: true },
        { text: '120\u00B0C (248\u00B0F)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'cooking-q3b',
      sectionId: 'temperature-time',
      title: 'Temperature Conversion!',
      question:
        'What is the formula to convert Fahrenheit to Celsius?',
      options: [
        { text: '\u00B0C = (\u00B0F \u2212 32) \u00D7 5/9', isCorrect: true },
        { text: '\u00B0C = \u00B0F \u00D7 2 \u2212 30', isCorrect: false },
        { text: '\u00B0C = (\u00B0F + 32) \u00D7 9/5', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'cooking-q3c',
      sectionId: 'temperature-time',
      title: 'Maillard Reaction Quiz!',
      question:
        'The Maillard reaction that creates golden-brown color and flavor begins at about what temperature?',
      options: [
        { text: '100\u00B0C (212\u00B0F)', isCorrect: false },
        { text: '140\u00B0C (280\u00B0F)', isCorrect: true },
        { text: '200\u00B0C (400\u00B0F)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'cooking-essay',
    prompt:
      'What\'s a recipe you love, and how does math help make it turn out right?',
    description:
      'Now it\'s your turn! Think about your favorite food to cook or bake. What measurements, ratios, or temperatures are important to get it just right? Maybe you\'ve had to double a recipe or convert between units. Share your experience below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Delicious thinking! You\'re a true math chef! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'cooking-reward',
    title: 'Baking Lab!',
    description:
      'You\'ve unlocked the Baking Lab! Mix ingredients in the right ratios to bake the perfect cake. Too much flour? It\'s dry! Too little? It collapses! Find the golden ratio of ingredients and watch your creation come out of the oven.',
    lockMessage: 'Baking Lab Locked!',
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
    type: 'baking-lab',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Baking Lab! You\'re a true math chef!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Master Chef Mathematician!',
    paragraphs: [
      'Congratulations! You\'ve discovered the math hiding in every kitchen!',
      'You learned that measuring cups are fraction tools — 1 cup = 16 tablespoons = 48 teaspoons — and that professional bakers use scales for precision because a cup of flour can vary by 20 grams depending on how you scoop it.',
      'You explored ratios and scaling, from doubling cookie recipes to baker\'s percentage where flour is always 100%. You discovered that classic recipes like pound cake are built on beautifully simple ratios (1:1:1:1) and that vinaigrette is always 3 parts oil to 1 part vinegar.',
      'And you learned the temperature math behind cooking: how to convert between Fahrenheit and Celsius, why the Maillard reaction at 140\u00B0C creates that golden-brown deliciousness, and how baking soda at the precise ratio of \u00BC teaspoon per cup of flour makes your baked goods rise perfectly.',
      'The next time you step into a kitchen, remember: you\'re not just cooking — you\'re doing math! And the proof is in the (perfectly measured) pudding.',
    ],
  },
};
