import type { Topic } from '../types';

export const fermentationYummyScience: Topic = {
  id: 'fermentation-yummy-science',
  slug: 'fermentation-yummy-science',
  title: 'Fermentation: The Yummy Science',
  subtitle:
    'How Tiny Microbes Make Our Favorite Foods',
  status: 'active',
  themeId: 'fermentation-yummy-science',
  heroIcons: ['\u{1F9C0}', '\u{1FAD9}', '\u{1F35E}'],
  navItems: [
    { id: 'what-is-fermentation', icon: '\u{1F9EC}', label: 'What Is Fermentation?' },
    { id: 'fermented-foods-world', icon: '\u{1F30D}', label: 'Fermented Foods Around the World' },
    { id: 'fermentation-science-health', icon: '\u{1F9EA}', label: 'Science & Health' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1FAD9}',
      title: 'Welcome to the World of Fermentation!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever wondered how a plain cucumber becomes a crunchy pickle? Or how milk turns into creamy yogurt? The answer is fermentation \u2014 one of the oldest and coolest science tricks on the planet!',
            'Fermentation is what happens when tiny living things called microorganisms \u2014 like bacteria and yeast \u2014 eat sugars in food and transform them into new substances. These little helpers have been working with humans for thousands of years, long before anyone even knew they existed!',
            'In this adventure, you\'ll discover how fermentation works, taste your way around the world through fermented foods, and learn why these microscopic chefs are so important for your health. Get ready to explore the yummiest science there is!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'MzOQplxHc1k',
          title: 'What is Fermentation and How Does it Work?',
          channelName: 'Zeleon Science',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: What is Fermentation? ────────────────────────
    {
      id: 'what-is-fermentation',
      icon: '\u{1F9EC}',
      title: 'What Is Fermentation?',
      readAloudBlocks: [
        {
          id: 'fermentation-basics',
          paragraphs: [
            'Fermentation is a natural process where microorganisms like yeast and bacteria break down sugars and convert them into other substances, such as alcohol, acids, or gases. Yeast is a tiny single-celled fungus, while bacteria are even smaller single-celled organisms. Both have been used in food-making for thousands of years!',
            'There are two main types of fermentation. Anaerobic fermentation happens without oxygen \u2014 this is the kind that yeast uses to make bread rise and turn grape juice into wine. Aerobic fermentation needs oxygen and is used in some industrial processes like making vinegar. Most of the fermentation in your favorite foods is anaerobic, happening in sealed jars, covered dough, or the depths of a cheese cave!',
          ],
        },
        {
          id: 'fermentation-history',
          paragraphs: [
            'In 1857, the French scientist Louis Pasteur proved that fermentation was caused by living microorganisms, not just a simple chemical reaction. Before his discovery, people had been fermenting food for thousands of years without understanding why it worked! Pasteur showed that specific types of yeast and bacteria were responsible for different kinds of fermentation.',
            'But humans were fermenting long before Pasteur. Archaeologists have found evidence of fermented beverages in ancient China dating back to around 7000 BCE \u2014 that\'s about 9,000 years ago! These early drinks were made from rice, honey, and fruit. Ancient Egyptians used yeast to bake leavened bread and brew beer over 5,000 years ago. Fermentation also preserves food by creating an acidic environment where harmful bacteria cannot survive, which was essential before refrigerators existed.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1FAD8}',
          name: 'Yeast',
          title: 'The Bubbly Baker',
          description:
            'Yeast is a single-celled fungus that eats sugar and produces carbon dioxide gas and a small amount of alcohol. The CO\u2082 bubbles are what make bread dough rise and give it that fluffy texture. Humans have been using yeast in baking for over 5,000 years!',
          extraTag: 'Type: Single-celled fungus',
        },
        {
          emoji: '\u{1F9AB}',
          name: 'Lactobacillus',
          title: 'The Acid Producer',
          description:
            'Lactobacillus is a rod-shaped bacterium that converts sugars into lactic acid. This process is called lactic acid fermentation, and it\'s responsible for the tangy taste of yogurt, sauerkraut, and pickles. These bacteria are also probiotics that help keep your gut healthy!',
          extraTag: 'Type: Beneficial bacteria',
        },
        {
          emoji: '\u{1F52C}',
          name: 'Louis Pasteur',
          title: 'Father of Fermentation Science',
          description:
            'French scientist Louis Pasteur (1822\u20131895) proved in 1857 that living microorganisms cause fermentation. His work also led to pasteurization \u2014 the process of heating liquids to kill harmful bacteria \u2014 which made milk and juice much safer to drink.',
          extraTag: 'Era: 19th Century France',
        },
        {
          emoji: '\u{1F3FA}',
          name: 'Ancient Brewers',
          title: 'The First Fermenters',
          description:
            'People in ancient China were making fermented beverages from rice, honey, and fruit around 7000 BCE. Ancient Egyptians, Mesopotamians, and many other civilizations all independently discovered fermentation, making it one of the oldest food technologies in human history.',
          extraTag: 'Era: ~7000 BCE onward',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A single gram of sourdough starter contains about 50 million yeast cells and 5 billion bacteria! These tiny organisms work together to make the bread rise and develop its signature tangy flavor.',
        },
      ],
      videos: [
        {
          youtubeId: 'FYClCHVT00M',
          title: 'Fermentation of Yeast & Sugar',
          channelName: 'The Sci Guys',
        },
      ],
      quizIds: ['fys-q1a', 'fys-q1b', 'fys-q1c', 'fys-q1d'],
    },

    // ─── Section 2: Fermented Foods Around the World ──────────────
    {
      id: 'fermented-foods-world',
      icon: '\u{1F30D}',
      title: 'Fermented Foods Around the World',
      readAloudBlocks: [
        {
          id: 'fermented-foods-asia',
          paragraphs: [
            'Every culture on Earth has its own special fermented foods, and many of them have been made the same way for hundreds or even thousands of years! In Korea, kimchi is a national treasure \u2014 it\'s made by salting and fermenting vegetables like napa cabbage with chili pepper, garlic, and ginger. Korean families traditionally make huge batches every autumn in a celebration called kimjang.',
            'In Japan, fermentation is behind some of the most important ingredients in the cuisine. Miso is a thick paste made by fermenting soybeans with a mold called koji (Aspergillus oryzae). Soy sauce is also made using koji to ferment soybeans and wheat \u2014 the process takes months and creates that deep, savory flavor called umami. In India, yogurt and the refreshing yogurt drink called lassi have been staples for thousands of years, made by fermenting milk with Lactobacillus bacteria.',
          ],
        },
        {
          id: 'fermented-foods-europe-africa',
          paragraphs: [
            'In Germany, sauerkraut \u2014 which means "sour cabbage" \u2014 is made by finely shredding cabbage, mixing it with salt, and letting lactic acid bacteria ferment it for several weeks. The result is a tangy, crunchy side dish packed with vitamin C. European sailors, including Captain James Cook, brought sauerkraut on long voyages to prevent scurvy!',
            'In Ethiopia, the spongy flatbread called injera is made by fermenting teff flour batter for several days. The fermentation gives injera its distinctive sour taste and bubbly texture. Sourdough bread, popular in places like San Francisco, relies on wild yeast and bacteria captured from the air. And let\'s not forget cheese \u2014 one of the world\'s most beloved fermented foods! Cheesemaking begins when bacteria or rennet curdle milk, separating it into solid curds and liquid whey. The curds are then aged, sometimes for years, developing complex flavors.',
          ],
        },
        {
          id: 'fermented-foods-pickles',
          paragraphs: [
            'Pickles and pickling traditions exist in nearly every culture. The word "pickle" comes from the Dutch word "pekel," meaning brine. Traditional pickles are made through lacto-fermentation, where vegetables are submerged in salt water and beneficial bacteria produce lactic acid. This is different from vinegar pickles you find in most grocery stores, which use vinegar instead of fermentation. Fermented pickles have that complex, tangy flavor and are full of probiotics!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F962}',
          name: 'Kimchi',
          title: 'Korea\'s Spicy Superstar',
          description:
            'Kimchi has been made in Korea for over 2,000 years. There are more than 200 varieties, from mild white kimchi to fiery red kimchi. In 2013, the Korean tradition of making kimchi, called kimjang, was added to UNESCO\'s list of Intangible Cultural Heritage.',
          extraTag: 'Origin: Korea',
        },
        {
          emoji: '\u{1F363}',
          name: 'Miso & Soy Sauce',
          title: 'Japan\'s Umami Duo',
          description:
            'Miso and soy sauce are both made using koji mold (Aspergillus oryzae). Miso paste is used in soups and glazes, while soy sauce adds deep savory flavor to stir-fries and sushi. Both are rich in umami, the "fifth taste" that makes food taste savory and satisfying.',
          extraTag: 'Origin: Japan & China',
        },
        {
          emoji: '\u{1F9C0}',
          name: 'Cheese',
          title: 'The Aged Wonder',
          description:
            'There are over 1,800 types of cheese in the world! Cheese starts when bacteria or rennet cause milk to separate into curds and whey. Some cheeses are eaten fresh, while others like Parmesan are aged for up to 3 years, developing intense flavor as bacteria and enzymes continue to work.',
          extraTag: 'Varieties: Over 1,800 types',
        },
        {
          emoji: '\u{1F35E}',
          name: 'Sourdough',
          title: 'The Wild Bread',
          description:
            'Unlike regular bread that uses commercial yeast, sourdough relies on wild yeast and bacteria from the environment. A sourdough starter is a living culture that bakers feed with flour and water. Some bakeries have kept the same starter alive for over 100 years!',
          extraTag: 'Key: Wild yeast & bacteria',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The world\'s oldest known cheese was found in an ancient Egyptian tomb and is about 3,200 years old! It was made from a mixture of cow\'s milk and sheep or goat milk.',
        },
      ],
      videos: [
        {
          youtubeId: 'eksagPy5tmQ',
          title: 'The Beneficial Bacteria That Make Delicious Food',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['fys-q2a', 'fys-q2b', 'fys-q2c'],
    },

    // ─── Section 3: Fermentation Science & Health ─────────────────
    {
      id: 'fermentation-science-health',
      icon: '\u{1F9EA}',
      title: 'Fermentation Science & Health',
      readAloudBlocks: [
        {
          id: 'gut-microbiome',
          paragraphs: [
            'Your body is home to trillions of microorganisms \u2014 mostly bacteria \u2014 that live in your digestive system. Together, they\'re called your gut microbiome, and they play a huge role in your health! These microscopic residents help you digest food, produce vitamins, and even support your immune system.',
            'Fermented foods like yogurt, kimchi, and sauerkraut contain live beneficial bacteria called probiotics. When you eat these foods, the probiotics join the community of helpful microbes already living in your gut. Lactobacillus and Bifidobacterium are two of the most common probiotic bacteria found in fermented foods. Scientists are still learning about all the ways these tiny organisms affect our health, but research shows that a diverse gut microbiome is linked to better digestion and overall well-being.',
          ],
        },
        {
          id: 'fermentation-flavor-medicine',
          paragraphs: [
            'Fermentation doesn\'t just preserve food \u2014 it transforms flavors in amazing ways! During fermentation, microorganisms break down proteins into amino acids, including glutamate, which is the source of umami \u2014 the savory "fifth taste." This is why fermented foods like soy sauce, miso, and aged cheese have such rich, deep flavors that you can\'t get any other way.',
            'Fermentation has also revolutionized medicine. In 1928, Alexander Fleming discovered that a mold called Penicillium produced a substance that killed bacteria \u2014 this led to penicillin, the first antibiotic, which has saved millions of lives. Today, many medicines, including some antibiotics and insulin, are produced using fermentation in large tanks called bioreactors, where microorganisms are grown under carefully controlled conditions.',
          ],
        },
        {
          id: 'fermentation-future',
          paragraphs: [
            'Modern fermentation technology is helping build a more sustainable future. Scientists use bioreactors \u2014 large vessels where microorganisms grow and produce useful substances \u2014 to make everything from biofuels to plant-based proteins. Some companies are even using fermentation to create dairy proteins without cows, which could reduce the environmental impact of farming.',
            'Fermentation also helps reduce food waste! When fruits and vegetables are a little too ripe to eat fresh, they can be fermented into delicious foods instead of being thrown away. From ancient clay pots to modern bioreactors, fermentation has been helping humanity for thousands of years \u2014 and its future is more exciting than ever!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9A0}',
          name: 'Gut Microbiome',
          title: 'Your Inner Ecosystem',
          description:
            'Your gut contains roughly 38 trillion bacteria, which is about the same as the number of human cells in your body! These bacteria help break down food, produce vitamins like B12 and K, and train your immune system. Eating fermented foods helps keep this microscopic ecosystem diverse and healthy.',
          extraTag: 'Population: ~38 trillion bacteria',
        },
        {
          emoji: '\u{1F344}',
          name: 'Penicillium',
          title: 'The Mold That Changed Medicine',
          description:
            'Alexander Fleming discovered in 1928 that Penicillium mold produces a bacteria-killing substance. This led to penicillin, the first widely-used antibiotic. Penicillium is also used to make blue cheese \u2014 those blue-green veins running through Roquefort and Gorgonzola are actually the mold growing inside the cheese!',
          extraTag: 'Discovery: 1928 by Alexander Fleming',
        },
        {
          emoji: '\u{2696}\u{FE0F}',
          name: 'Bioreactors',
          title: 'The Fermentation Factories',
          description:
            'Bioreactors are large, high-tech vessels used to grow microorganisms under precise conditions. Temperature, pH, oxygen levels, and nutrients are all carefully controlled. Today, bioreactors are used to produce medicines, biofuels, food ingredients, and even lab-grown proteins for a more sustainable food system.',
          extraTag: 'Used for: Medicine, food, fuel',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Your gut microbiome weighs about 1 to 2 kilograms (2 to 4 pounds) \u2014 that\'s about as heavy as your brain! Scientists sometimes call it your "second brain" because gut bacteria produce many of the same chemical signals that brain cells use.',
        },
      ],
      videos: [
        {
          youtubeId: '1sISguPDlhY',
          title: 'How the Food You Eat Affects Your Gut',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['fys-q3a', 'fys-q3b', 'fys-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: What is Fermentation?
    {
      id: 'fys-q1a',
      sectionId: 'what-is-fermentation',
      title: 'Quick Quiz Time!',
      question:
        'What did Louis Pasteur prove about fermentation in 1857?',
      options: [
        { text: 'That fermentation is a purely chemical reaction with no living things involved', isCorrect: false },
        { text: 'That living microorganisms like yeast and bacteria cause fermentation', isCorrect: true },
        { text: 'That fermentation only works in cold temperatures', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fys-q1b',
      sectionId: 'what-is-fermentation',
      title: 'Fermentation Types!',
      question:
        'What is the main difference between anaerobic and aerobic fermentation?',
      options: [
        { text: 'Anaerobic fermentation is faster than aerobic fermentation', isCorrect: false },
        { text: 'Anaerobic fermentation happens without oxygen, while aerobic fermentation needs oxygen', isCorrect: true },
        { text: 'Aerobic fermentation only uses yeast, while anaerobic uses only bacteria', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fys-q1c',
      sectionId: 'what-is-fermentation',
      title: 'Ancient History!',
      question:
        'Where have archaeologists found evidence of some of the earliest fermented beverages, dating to around 7000 BCE?',
      options: [
        { text: 'Ancient Greece', isCorrect: false },
        { text: 'Ancient China', isCorrect: true },
        { text: 'Ancient Mexico', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fys-q1d',
      sectionId: 'what-is-fermentation',
      title: 'Preservation Power!',
      question:
        'How does fermentation help preserve food?',
      options: [
        { text: 'It freezes the food from the inside', isCorrect: false },
        { text: 'It removes all water from the food', isCorrect: false },
        { text: 'It creates an acidic environment where harmful bacteria cannot survive', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Fermented Foods Around the World
    {
      id: 'fys-q2a',
      sectionId: 'fermented-foods-world',
      title: 'World Foods Quiz!',
      question:
        'What is the name of the mold used to make miso and soy sauce in Japan?',
      options: [
        { text: 'Penicillium', isCorrect: false },
        { text: 'Koji (Aspergillus oryzae)', isCorrect: true },
        { text: 'Lactobacillus', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fys-q2b',
      sectionId: 'fermented-foods-world',
      title: 'Sauerkraut Challenge!',
      question:
        'Why did European sailors like Captain James Cook bring sauerkraut on long sea voyages?',
      options: [
        { text: 'Because it was the cheapest food available', isCorrect: false },
        { text: 'Because its vitamin C helped prevent scurvy', isCorrect: true },
        { text: 'Because it stayed frozen in the cold sea air', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fys-q2c',
      sectionId: 'fermented-foods-world',
      title: 'Pickle Knowledge!',
      question:
        'How are traditional fermented pickles made?',
      options: [
        { text: 'By soaking vegetables in vinegar', isCorrect: false },
        { text: 'By submerging vegetables in salt water and letting beneficial bacteria produce lactic acid', isCorrect: true },
        { text: 'By drying vegetables in the sun for several weeks', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Fermentation Science & Health
    {
      id: 'fys-q3a',
      sectionId: 'fermentation-science-health',
      title: 'Gut Health Quiz!',
      question:
        'What are probiotics?',
      options: [
        { text: 'Vitamins added to food during processing', isCorrect: false },
        { text: 'Live beneficial bacteria found in fermented foods that support gut health', isCorrect: true },
        { text: 'Chemicals used to preserve food in cans', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fys-q3b',
      sectionId: 'fermentation-science-health',
      title: 'Medicine Discovery!',
      question:
        'What important medicine was discovered because of the Penicillium mold?',
      options: [
        { text: 'Aspirin', isCorrect: false },
        { text: 'Insulin', isCorrect: false },
        { text: 'Penicillin, the first widely-used antibiotic', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fys-q3c',
      sectionId: 'fermentation-science-health',
      title: 'Flavor Science!',
      question:
        'Fermentation creates the savory "fifth taste" found in soy sauce and aged cheese. What is this taste called?',
      options: [
        { text: 'Umami', isCorrect: true },
        { text: 'Salty', isCorrect: false },
        { text: 'Bitter', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'fys-essay',
    prompt:
      'If you could create your own fermented food, what would it be?',
    description:
      'Now it\'s your turn to be a fermentation scientist! Imagine you could create your own brand-new fermented food. What ingredients would you use? What microorganisms would help you? What would it taste like? Describe your creation and explain the science behind it. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Fantastic fermentation idea! Your answer has been saved. You\'re a true fermentation scientist!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'fys-reward',
    title: 'Welcome to the Pickle Maker!',
    description:
      'You\'ve unlocked the Pickle Maker! Experiment with different vegetables, salt concentrations, and fermentation times to create your own virtual fermented foods.',
    lockMessage: 'Pickle Maker Locked!',
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
    type: 'pickle-maker',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Pickle Maker! You\'re a true fermentation scientist!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Fermentation Scientist!',
    paragraphs: [
      'Congratulations! You\'ve explored the wonderful world of fermentation \u2014 from ancient clay pots to modern bioreactors!',
      'You learned what fermentation is and how tiny microorganisms like yeast and bacteria transform sugars into acids, gases, and alcohol. You discovered that Louis Pasteur proved microbes cause fermentation in 1857, but humans had been fermenting food since at least 7000 BCE!',
      'You traveled the world through fermented foods \u2014 from Korean kimchi and Japanese miso to German sauerkraut, Ethiopian injera, and sourdough bread. You learned how cheese is made and why traditional pickles are different from vinegar pickles.',
      'And you explored how fermented foods support your gut microbiome, how the Penicillium mold led to life-saving antibiotics, and how modern bioreactors are using fermentation to build a more sustainable future.',
      'Next time you eat yogurt, bread, or cheese, remember the trillions of tiny microbes that made it possible. Keep exploring and stay curious \u2014 the world of fermentation is always bubbling with new discoveries!',
    ],
  },
};
