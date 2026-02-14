import type { Topic } from '../types';

export const kitchenScienceLab: Topic = {
  id: 'kitchen-science-lab',
  slug: 'kitchen-science-lab',
  title: 'Kitchen Science Lab',
  subtitle:
    'The Amazing Science of Cooking',
  status: 'active',
  themeId: 'kitchen-science-lab',
  heroIcons: ['\u{1F9EA}', '\u{1F373}', '\u{1F525}'],
  navItems: [
    { id: 'chemical-reactions', icon: '\u{1F9EA}', label: 'Chemical Reactions' },
    { id: 'states-of-matter', icon: '\u{1F9CA}', label: 'States of Matter' },
    { id: 'fermentation', icon: '\u{1F35E}', label: 'Fermentation & Preservation' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F373}',
      title: 'Welcome to the Kitchen Lab!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Did you know that every time you cook, you\'re doing science? Your kitchen is actually an amazing laboratory where chemistry, physics, and biology all come together to create delicious food!',
            'When you bake a cake, you\'re causing chemical reactions. When you boil water for pasta, you\'re changing states of matter. When you make yogurt or let bread dough rise, tiny living organisms called microbes are doing the work for you!',
            'In this adventure, you\'ll discover the incredible science hiding in your kitchen. You\'ll learn why baking soda makes things fizz, what gives toasted bread its amazing smell, and how ancient people used science to keep food from going bad \u2014 even without refrigerators! Let\'s put on our lab coats and start cooking up some science!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'n6wpNhyreDE',
          title: 'The Chemistry of Cookies',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Chemical Reactions in Cooking ───────────────
    {
      id: 'chemical-reactions',
      icon: '\u{1F9EA}',
      title: 'Chemical Reactions in Cooking',
      readAloudBlocks: [
        {
          id: 'chemical-reactions-intro',
          paragraphs: [
            'Every time you cook, you\'re a chemist! Cooking is all about chemical reactions \u2014 when substances combine and transform into something completely new. You can\'t un-bake a cookie or un-fry an egg, because cooking causes permanent chemical changes.',
            'One of the most exciting kitchen reactions happens when you mix baking soda with an acid like vinegar or lemon juice. The baking soda (sodium bicarbonate) reacts with the acid to produce carbon dioxide gas \u2014 that\'s what makes the fizzing and bubbling! In baking, this same reaction creates tiny gas bubbles that get trapped in the dough, making your cakes and muffins light and fluffy.',
          ],
        },
        {
          id: 'chemical-reactions-maillard',
          paragraphs: [
            'Have you ever noticed that toasted bread smells way better than plain bread? That\'s thanks to the Maillard reaction, one of the most important reactions in cooking! When food is heated above about 140\u00B0C (280\u00B0F), the sugars and proteins in the food react together to create hundreds of new flavor and aroma compounds. This is what gives grilled steak its crust, toast its golden color, and french fries their incredible smell.',
            'The Maillard reaction is different from caramelization, which happens when sugar alone is heated. Caramelization turns white sugar into a brown, nutty-flavored liquid. Think of the golden top of a cr\u00E8me br\u00FBl\u00E9e or the sticky coating on caramel apples. Both reactions involve browning, but they create completely different flavors!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9CB}',
          name: 'Baking Soda',
          title: 'The Fizzing Wonder',
          description:
            'Baking soda (sodium bicarbonate) is a base that reacts with acids to produce carbon dioxide gas. This is why your pancakes are fluffy and your muffins rise in the oven! When baking soda meets buttermilk, lemon juice, or vinegar in a recipe, it creates millions of tiny gas bubbles that get trapped in the batter as it cooks.',
          extraTag: 'Chemical formula: NaHCO\u2083',
        },
        {
          emoji: '\u{1F356}',
          name: 'The Maillard Reaction',
          title: 'The Flavor Factory',
          description:
            'Named after French chemist Louis-Camille Maillard, this reaction happens when proteins and sugars are heated together. It creates over 600 different flavor compounds! The Maillard reaction is responsible for the delicious taste of toasted bread, grilled burgers, roasted coffee, and even chocolate. Without it, most cooked food would taste bland and boring.',
          extraTag: 'Temperature: Above 140\u00B0C (280\u00B0F)',
        },
        {
          emoji: '\u{1F36E}',
          name: 'Caramelization',
          title: 'The Sweet Transformer',
          description:
            'When sugar is heated above 170\u00B0C (340\u00B0F), it goes through caramelization. The sugar molecules break apart and reassemble into hundreds of new compounds with complex, butterscotch-like flavors. This is how plain white sugar transforms into golden caramel sauce, toffee, and the crunchy topping on cr\u00E8me br\u00FBl\u00E9e!',
          extraTag: 'Temperature: Above 170\u00B0C (340\u00B0F)',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Maillard reaction creates over 600 different flavor and aroma compounds. That\'s why a simple piece of toast smells so incredible \u2014 your nose is detecting hundreds of different molecules all at once!',
        },
      ],
      videos: [
        {
          youtubeId: 'qD0_yWgifDM',
          title: 'The Science of Spiciness',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['kitchen-q1a', 'kitchen-q1b', 'kitchen-q1c', 'kitchen-q1d'],
    },

    // ─── Section 2: States of Matter ────────────────────────────
    {
      id: 'states-of-matter',
      icon: '\u{1F9CA}',
      title: 'States of Matter in the Kitchen',
      readAloudBlocks: [
        {
          id: 'states-of-matter-intro',
          paragraphs: [
            'Your kitchen is a perfect laboratory for observing the three states of matter: solid, liquid, and gas. Every time you make ice cubes, boil water, or see steam rising from a pot, you\'re watching matter change from one state to another!',
            'Water is the superstar of state changes. At 0\u00B0C (32\u00B0F), liquid water freezes into solid ice. At 100\u00B0C (212\u00B0F), it boils and turns into steam, a gas. These transformations are called phase changes, and they\'re happening all around you in the kitchen. When you see steam rising from a boiling pot, that water vapor is escaping into the air. If it hits a cold lid, it condenses back into liquid water droplets!',
          ],
        },
        {
          id: 'states-of-matter-crystals',
          paragraphs: [
            'Crystallization is one of the coolest things you can do in a kitchen. When you dissolve a lot of sugar in hot water and then let it cool slowly, the sugar molecules arrange themselves into neat, repeating patterns to form crystals. This is how rock candy is made! Fudge, on the other hand, is made by stirring the sugar solution while it cools, which creates tiny crystals that give fudge its smooth, creamy texture.',
            'Emulsions are another kitchen wonder. Oil and water normally don\'t mix \u2014 try shaking them together and watch them separate. But if you add an emulsifier, like the lecithin found in egg yolk, you can force oil and water to blend into a smooth, creamy mixture. This is exactly how mayonnaise works! The egg yolk acts like a peacekeeper between the oil and vinegar, holding them together.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'When water boils, it expands to about 1,600 times its original volume as it turns into steam! That\'s why pressure cookers need safety valves \u2014 all that expanding steam creates enormous pressure inside the pot.',
        },
      ],
      videos: [
        {
          youtubeId: 'KXs_axKuPvE',
          title: 'Candy Science - Boiling Sugar',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['kitchen-q2a', 'kitchen-q2b', 'kitchen-q2c'],
    },

    // ─── Section 3: Fermentation & Preservation ─────────────────
    {
      id: 'fermentation',
      icon: '\u{1F35E}',
      title: 'Fermentation & Preservation: Nature\'s Kitchen Helpers',
      readAloudBlocks: [
        {
          id: 'fermentation-intro',
          paragraphs: [
            'Long before refrigerators were invented, people needed ways to keep food from spoiling. They discovered that certain natural processes could actually preserve food and make it taste even better! The most important of these is fermentation.',
            'Fermentation happens when tiny microorganisms like yeast and bacteria eat sugars in food and transform them into other substances. When yeast eats the sugar in bread dough, it burps out carbon dioxide gas, which is what makes bread rise! The little gas bubbles get trapped in the stretchy gluten network of the dough, creating the airy, fluffy texture we love.',
          ],
        },
        {
          id: 'fermentation-details',
          paragraphs: [
            'Yogurt is made by a different kind of fermentation. Special bacteria called Lactobacillus eat the lactose sugar in milk and produce lactic acid. This acid makes the milk thicken and become tangy. The same process gives us cheese, sour cream, and sourdough bread!',
            'Pickling is another ancient preservation method. When you submerge vegetables in vinegar or salt water, you create an environment where harmful bacteria can\'t survive, but helpful bacteria thrive. These good bacteria produce lactic acid, which preserves the food and gives pickles their sour taste. Sauerkraut, kimchi, and pickled cucumbers all use this method.',
          ],
        },
        {
          id: 'fermentation-spoilage',
          paragraphs: [
            'But why does food spoil in the first place? When food is left at room temperature, millions of bacteria and molds start breaking it down. They feed on the nutrients in the food and produce waste products that smell bad and can make you sick. Refrigeration slows these microbes down (they\'re less active in the cold), and freezing almost stops them completely. Drying, smoking, and salting food all work by removing the water that microbes need to survive.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F35E}',
          name: 'Yeast',
          title: 'The Bread Maker',
          description:
            'Yeast is a tiny single-celled fungus that has been helping humans bake bread for over 5,000 years! When yeast eats sugar, it produces carbon dioxide gas and a tiny bit of alcohol (which evaporates during baking). Ancient Egyptians were some of the first to use yeast to make light, fluffy bread instead of flat, hard bread.',
          extraTag: 'Type: Single-celled fungus',
        },
        {
          emoji: '\u{1F95B}',
          name: 'Lactobacillus',
          title: 'The Yogurt Maker',
          description:
            'Lactobacillus is a friendly bacterium that turns milk into yogurt, cheese, and other fermented dairy products. It eats lactose (milk sugar) and produces lactic acid, which thickens the milk and gives yogurt its tangy flavor. These bacteria are also great for your gut health!',
          extraTag: 'Type: Beneficial bacteria',
        },
        {
          emoji: '\u{1F952}',
          name: 'Pickling',
          title: 'The Preservation Champion',
          description:
            'Pickling has been used for over 4,000 years to preserve food. The ancient Mesopotamians pickled food in vinegar, and sailors brought barrels of pickled vegetables on long voyages to prevent scurvy. Even Cleopatra reportedly ate pickles because she believed they made her beautiful!',
          extraTag: 'Age: Over 4,000 years old',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A single teaspoon of yogurt contains about 100 million bacteria! But don\'t worry \u2014 they\'re the good kind. These helpful bacteria are called probiotics, and they actually help keep your digestive system healthy.',
        },
      ],
      videos: [
        {
          youtubeId: 'qnTrdAjXX8s',
          title: 'What Are Pickles? - The Science of Food! - SciShow Kids',
          channelName: 'SciShow Kids',
        },
      ],
      quizIds: ['kitchen-q3a', 'kitchen-q3b', 'kitchen-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Chemical Reactions
    {
      id: 'kitchen-q1a',
      sectionId: 'chemical-reactions',
      title: 'Quick Quiz Time!',
      question:
        'What gas is produced when baking soda reacts with vinegar or lemon juice?',
      options: [
        { text: 'Oxygen', isCorrect: false },
        { text: 'Carbon dioxide', isCorrect: true },
        { text: 'Nitrogen', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'kitchen-q1b',
      sectionId: 'chemical-reactions',
      title: 'Reaction Challenge!',
      question:
        'The Maillard reaction creates the delicious flavor of toasted bread and grilled steak. What two types of molecules react together?',
      options: [
        { text: 'Water and salt', isCorrect: false },
        { text: 'Sugars and proteins', isCorrect: true },
        { text: 'Fat and vitamins', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'kitchen-q1c',
      sectionId: 'chemical-reactions',
      title: 'Temperature Quiz!',
      question:
        'At what temperature does the Maillard reaction begin to happen?',
      options: [
        { text: 'Above 50\u00B0C (122\u00B0F)', isCorrect: false },
        { text: 'Above 100\u00B0C (212\u00B0F)', isCorrect: false },
        { text: 'Above 140\u00B0C (280\u00B0F)', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'kitchen-q1d',
      sectionId: 'chemical-reactions',
      title: 'Sweet Science Quiz!',
      question:
        'What is the difference between the Maillard reaction and caramelization?',
      options: [
        {
          text: 'The Maillard reaction involves sugars AND proteins, while caramelization involves only sugar',
          isCorrect: true,
        },
        { text: 'They are exactly the same thing', isCorrect: false },
        { text: 'Caramelization happens at a lower temperature', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: States of Matter
    {
      id: 'kitchen-q2a',
      sectionId: 'states-of-matter',
      title: 'Quick Quiz Time!',
      question:
        'How much does water expand when it turns from liquid into steam?',
      options: [
        { text: 'About 10 times', isCorrect: false },
        { text: 'About 100 times', isCorrect: false },
        { text: 'About 1,600 times', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'kitchen-q2b',
      sectionId: 'states-of-matter',
      title: 'Crystal Challenge!',
      question:
        'How is rock candy made?',
      options: [
        {
          text: 'By dissolving sugar in hot water and letting it cool slowly to form crystals',
          isCorrect: true,
        },
        { text: 'By freezing sugar water into ice', isCorrect: false },
        { text: 'By mixing sugar with baking soda', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'kitchen-q2c',
      sectionId: 'states-of-matter',
      title: 'Emulsion Quiz!',
      question:
        'What ingredient in egg yolk acts as an emulsifier to hold oil and vinegar together in mayonnaise?',
      options: [
        { text: 'Protein', isCorrect: false },
        { text: 'Lecithin', isCorrect: true },
        { text: 'Cholesterol', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Fermentation & Preservation
    {
      id: 'kitchen-q3a',
      sectionId: 'fermentation',
      title: 'Quick Quiz Time!',
      question:
        'What does yeast produce when it eats sugar in bread dough?',
      options: [
        { text: 'Oxygen and water', isCorrect: false },
        { text: 'Carbon dioxide gas and a tiny bit of alcohol', isCorrect: true },
        { text: 'Vinegar and salt', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'kitchen-q3b',
      sectionId: 'fermentation',
      title: 'Bacteria Challenge!',
      question:
        'Which friendly bacterium turns milk into yogurt by producing lactic acid?',
      options: [
        { text: 'E. coli', isCorrect: false },
        { text: 'Lactobacillus', isCorrect: true },
        { text: 'Salmonella', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'kitchen-q3c',
      sectionId: 'fermentation',
      title: 'Preservation Quiz!',
      question:
        'Why does refrigeration help keep food from spoiling?',
      options: [
        { text: 'It kills all bacteria instantly', isCorrect: false },
        { text: 'It removes water from the food', isCorrect: false },
        {
          text: 'It slows down bacteria because they are less active in the cold',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'kitchen-essay',
    prompt:
      'Describe a science experiment you could do in your kitchen',
    description:
      'Now it\'s your turn! Think about everything you\'ve learned about chemical reactions, states of matter, and fermentation. Can you come up with a fun science experiment using things you\'d find in your kitchen? Describe what you would do and what science is involved. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant experiment idea! Your answer has been saved. You\'re a true kitchen scientist!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'kitchen-reward',
    title: 'Welcome to the Kitchen Lab!',
    description:
      'You\'ve unlocked the Kitchen Lab! Explore the amazing chemical reactions, state changes, and fermentation processes that happen every time you cook.',
    lockMessage: 'Kitchen Lab Locked!',
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
    type: 'kitchen-lab',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Kitchen Lab! You\'re a true kitchen scientist!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Kitchen Scientist!',
    paragraphs: [
      'Congratulations! You\'ve discovered that your kitchen is one of the most amazing science laboratories in the world!',
      'You learned about chemical reactions in cooking \u2014 how baking soda creates fizzy bubbles, how the Maillard reaction gives toasted bread its incredible flavor, and how caramelization transforms plain sugar into golden, delicious caramel.',
      'You explored states of matter and discovered how water changes between ice, liquid, and steam. You learned how crystallization creates rock candy and fudge, and how emulsifiers like lecithin hold oil and water together in mayonnaise.',
      'And you met the tiny microorganisms that help us make some of our favorite foods! Yeast makes bread rise, Lactobacillus turns milk into yogurt, and pickling preserves food for months or even years. These ancient techniques were discovered thousands of years ago and we still use them today.',
      'Next time you\'re in the kitchen, remember \u2014 you\'re not just cooking, you\'re doing science! Keep experimenting and stay curious!',
    ],
  },
};
