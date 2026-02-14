import type { Topic } from '../types';

export const historyOfNoodles: Topic = {
  id: 'history-of-noodles',
  slug: 'history-of-noodles',
  title: 'The History of Noodles',
  subtitle:
    'The 4,000-Year Journey of the World\'s Favorite Food',
  status: 'active',
  themeId: 'history-of-noodles',
  heroIcons: ['\u{1F35C}', '\u{1F30F}', '\u{1F9C6}'],
  navItems: [
    { id: 'ancient-origins', icon: '\u{1F3FA}', label: 'Ancient Origins' },
    { id: 'noodles-go-global', icon: '\u{1F35D}', label: 'Noodles Go Global' },
    { id: 'instant-revolution', icon: '\u26A1', label: 'Instant Noodle Revolution' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F35C}',
      title: 'The Incredible Story of Noodles!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'What if someone told you that one of the world\'s oldest and most popular foods is something you\'ve probably eaten dozens of times? That\'s right \u2014 we\'re talking about noodles! From a steaming bowl of ramen to a plate of spaghetti, noodles have been feeding humans for thousands of years.',
            'The story of noodles is an epic adventure that spans 4,000 years, crosses every continent, and involves ancient emperors, famous explorers, and one brilliant inventor who changed the world from his backyard shed. Along the way, noodles have traveled the Silk Road, survived wars, and become the most consumed food on the planet!',
            'Ready to slurp up some history? Let\'s dive into the amazing journey of the world\'s favorite food!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'GTOCBaDBVGI',
          title: 'The Secret History of Pasta',
          channelName: 'YouTube',
        },
        {
          youtubeId: 'g_ou-T0Puh4',
          title: 'Invention of Noodles - Origin and History of Noodles',
          channelName: 'Dr. Binocs',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient Origins ─────────────────────────────
    {
      id: 'ancient-origins',
      icon: '\u{1F3FA}',
      title: 'Ancient Origins: The World\'s Oldest Noodles',
      readAloudBlocks: [
        {
          id: 'ancient-intro-text',
          paragraphs: [
            'For centuries, people argued about where noodles were first invented. The Italians claimed pasta was their creation. The Chinese said noodles originated in China. And the Arabs pointed out that they had been making noodle-like foods for a very long time. Then, in 2005, an incredible archaeological discovery settled the debate once and for all!',
          ],
        },
        {
          id: 'ancient-details-text',
          paragraphs: [
            'In 2005, archaeologists were excavating the ancient settlement of Lajia in northwestern China, near the upper reaches of the Yellow River. Buried beneath three meters of earth and sediment, sealed inside an overturned clay bowl, they found something astonishing: a bundle of perfectly preserved noodles that were approximately 4,000 years old! These ancient noodles were long, thin, and yellow, made from millet grain rather than the wheat we use today.',
            'The Lajia settlement had been destroyed by a catastrophic earthquake followed by a massive flood around 2000 BCE. The disaster happened so suddenly that people left their food on the table. When the bowl was flipped upside down by the flood, it created an airtight seal that preserved the noodles for four millennia. It was like finding a time capsule of ancient dinner!',
            'But the Lajia noodles are just one piece of the puzzle. Written records from China mention noodles as early as the Han Dynasty, around 200 BCE. In those days, all noodle-like foods were called "bing." It wasn\'t until the Song Dynasty (around 960-1279 CE) that different types of noodles got their own specific names.',
            'One of the most spectacular noodle traditions from ancient China is the art of hand-pulled noodles, called la mian. A skilled noodle master takes a single lump of dough and stretches, folds, and pulls it repeatedly until it transforms into hundreds of thin, perfectly even strands \u2014 all without using a knife or any cutting tools! The technique has been practiced for over a thousand years and is still performed today. Watching a la mian master work is like watching a magician!',
            'Now, here\'s a famous myth that needs busting: many people believe that the Italian explorer Marco Polo brought noodles from China to Italy in 1295. It\'s a great story, but it\'s not true! Italian pasta was already being made long before Marco Polo\'s journey. Written references to pasta in Italy date back to at least 1154 CE, over a century before Polo was even born. The truth is that noodles were likely invented independently in both China and the Mediterranean region.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The 4,000-year-old Lajia noodles were made from millet, not wheat! Millet was the most important grain in ancient northern China. Today, most Chinese noodles are made from wheat flour, but millet noodles are still enjoyed in some regions as a connection to this incredibly ancient tradition.',
        },
      ],
      videos: [
        {
          youtubeId: 'B8FZ5pOYPBM',
          title: 'Origin of Ramen Noodles',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['noodle-q1a', 'noodle-q1b', 'noodle-q1c', 'noodle-q1d'],
    },

    // ─── Section 2: Noodles Go Global ───────────────────────────
    {
      id: 'noodles-go-global',
      icon: '\u{1F35D}',
      title: 'Noodles Go Global: From Italy to Thailand',
      readAloudBlocks: [
        {
          id: 'global-intro-text',
          paragraphs: [
            'As noodles spread across the world, every culture transformed them into something uniquely their own. Different grains, different shapes, different sauces, and different cooking methods created an incredible diversity of noodle dishes. Let\'s travel the world and taste the amazing variety!',
          ],
        },
        {
          id: 'global-details-text',
          paragraphs: [
            'Italian pasta is probably the most famous noodle tradition in the Western world. Dried pasta made from durum wheat became a major food in Italy by the 12th century, especially in Sicily and southern Italy where the dry climate was perfect for drying and storing pasta. Italian cooks invented hundreds of pasta shapes, each designed to hold different sauces: long spaghetti for tomato sauce, tube-shaped penne for chunky sauces, and flat lasagna sheets for layered baking. When Italian immigrants moved to America in the late 1800s, they brought their pasta traditions with them, making spaghetti and meatballs an American classic!',
            'Japanese noodle culture is a world of its own. Ramen, originally inspired by Chinese wheat noodles, became Japan\'s most iconic comfort food. Every region of Japan has its own ramen style: rich, creamy tonkotsu pork bone broth in Hakata, soy sauce-based shoyu ramen in Tokyo, and miso ramen in Sapporo. Soba noodles, made from buckwheat flour, have been eaten in Japan since the Edo period (1603-1868) and are traditionally slurped on New Year\'s Eve for good luck. Udon are thick, chewy wheat noodles often served in a light dashi broth. In Japan, slurping your noodles loudly is not rude \u2014 it\'s a compliment to the chef!',
            'Korean japchae is a beautiful dish of glass noodles made from sweet potato starch, stir-fried with colorful vegetables, beef, and sesame oil. It was first served to a Korean king during a royal banquet in the 17th century and has been a celebration food ever since. The glass noodles are translucent and wonderfully chewy, unlike any wheat noodle you\'ve ever tasted.',
            'Vietnamese pho is one of the most beloved noodle soups on Earth. Flat rice noodles swim in a fragrant broth that has been simmered for hours with star anise, cinnamon, cloves, and charred ginger. The dish is topped with thin slices of beef or chicken, fresh herbs, bean sprouts, and lime. Pho emerged in northern Vietnam in the early 20th century, influenced by both Chinese and French colonial cooking traditions. Today, pho shops open at dawn across Vietnam, because pho is a breakfast food!',
            'Thai pad thai might be the world\'s most famous stir-fried noodle dish. Thin rice noodles are wok-fried with eggs, tofu, shrimp, bean sprouts, and crushed peanuts in a sweet-sour-salty sauce. Surprisingly, pad thai was created in the 1930s and 1940s as part of a government campaign to build Thai national identity and reduce rice consumption during a rice shortage. A dish created for political reasons became one of the most loved foods on the planet!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F35C}',
          name: 'Ramen',
          title: 'Japan\'s Comfort Food King',
          description:
            'Ramen started as a simple Chinese-style noodle soup in Japan in the early 1900s. After World War II, cheap and filling ramen became incredibly popular with workers. Today, Japan has over 30,000 ramen shops, and some famous ones have lines that stretch around the block. Ramen has become a global phenomenon with devoted fans on every continent!',
          extraTag: 'Country: Japan',
        },
        {
          emoji: '\u{1F35D}',
          name: 'Spaghetti',
          title: 'Italy\'s Most Famous Export',
          description:
            'Spaghetti gets its name from the Italian word "spago," meaning "thin string." When millions of Italian immigrants arrived in America between 1880 and 1920, they brought their beloved spaghetti with them. Spaghetti with tomato sauce and meatballs became so popular that many Americans thought it was an ancient Italian recipe \u2014 but the meatball version was actually invented in America!',
          extraTag: 'Country: Italy',
        },
        {
          emoji: '\u{1F963}',
          name: 'Pho',
          title: 'Vietnam\'s Breakfast Champion',
          description:
            'Pho is traditionally eaten for breakfast in Vietnam, though tourists enjoy it at all hours. The broth is the secret: beef bones, charred onions, and whole spices are simmered for 12 to 24 hours to create an incredibly deep, aromatic flavor. Pho vendors in Hanoi often use recipes that have been passed down through three or four generations!',
          extraTag: 'Country: Vietnam',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In Japan, slurping your noodles loudly is considered polite! The Japanese believe that slurping aerates the noodles, enhances the flavor, and cools them down. It also shows the chef that you\'re really enjoying your meal. So next time you eat ramen, slurp away!',
        },
      ],
      videos: [
        {
          youtubeId: 'YqlCcYhw5eE',
          title: 'The History of Pho - Vietnam\'s Most Famous Soup!',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['noodle-q2a', 'noodle-q2b', 'noodle-q2c'],
    },

    // ─── Section 3: Instant Noodle Revolution ───────────────────
    {
      id: 'instant-revolution',
      icon: '\u26A1',
      title: 'The Instant Noodle Revolution',
      readAloudBlocks: [
        {
          id: 'instant-intro-text',
          paragraphs: [
            'The most revolutionary chapter in noodle history happened not in an ancient palace or a famous restaurant, but in a small wooden shed in a backyard in Osaka, Japan. This is the story of Momofuku Ando, the man who invented instant noodles and changed the way the world eats forever.',
          ],
        },
        {
          id: 'instant-details-text',
          paragraphs: [
            'After World War II, Japan was devastated and food was scarce. Momofuku Ando saw long lines of hungry people waiting in the cold for a bowl of hot ramen. He thought: what if there was a way to make delicious noodles that anyone could prepare in just minutes, with nothing more than boiling water? That idea became his obsession.',
            'In 1957, Ando built a small wooden shed in his backyard and began experimenting. For an entire year, he worked tirelessly, sleeping only four hours a night, trying to figure out how to make noodles that were pre-cooked, could be stored for months without refrigeration, and could be prepared almost instantly. He tried everything \u2014 drying noodles in the sun, smoking them, and dozens of other methods. Nothing worked.',
            'Then one day, watching his wife make tempura (Japanese deep-fried food), Ando had his breakthrough moment. He noticed that when food was dipped into hot oil, the moisture was driven out, leaving behind a dry, porous structure. What if he flash-fried cooked noodles in oil? The hot oil would remove the water while creating tiny holes throughout the noodle. Later, when boiling water was poured over these dried noodles, the water would rush into all those tiny holes and rehydrate the noodles in minutes!',
            'On August 25, 1958, Momofuku Ando introduced "Chikin Ramen" \u2014 the world\'s first instant noodle. It cost six times more than fresh udon noodles, but the convenience was irresistible. Just add boiling water, wait three minutes, and you had a hot, satisfying meal. The product was an instant success!',
            'But Ando wasn\'t finished. In 1971, at the age of 61, he invented Cup Noodles \u2014 instant noodles in a waterproof, heat-resistant foam cup. The idea came to him while watching American supermarket buyers break dried noodles into cups and pour hot water over them. He realized the cup itself could be the cooking vessel! Cup Noodles became a global phenomenon.',
            'Today, over 100 billion servings of instant noodles are consumed worldwide every year. That\'s roughly 13 servings for every person on Earth! Instant noodles are eaten in over 80 countries. They\'re a lifeline during natural disasters, a cheap meal for college students, and a canvas for creative cooking. South Korea, Indonesia, and Japan are the biggest consumers per capita. Momofuku Ando, who kept inventing until his death at age 96 in 2007, believed that "peace will come to the world when the people have enough to eat." His humble instant noodle has come closer to fulfilling that dream than almost any other food in history.',
          ],
        },
      ],
      timeline: [
        {
          year: '~2000 BCE',
          title: 'The Oldest Known Noodles',
          description:
            'Noodles made from millet are preserved in an overturned bowl at the Lajia settlement in China after a catastrophic earthquake and flood. They remain buried for 4,000 years until archaeologists discover them in 2005.',
        },
        {
          year: '~200 BCE',
          title: 'Noodles in Written Records',
          description:
            'Chinese texts from the Han Dynasty mention noodle-like foods called "bing." Noodle-making becomes an established part of Chinese cuisine, with techniques for cutting, pulling, and shaving dough into noodle shapes.',
        },
        {
          year: '~1154 CE',
          title: 'Pasta Documented in Italy',
          description:
            'Arab geographer al-Idrisi describes dried pasta being produced in Sicily, more than a century before Marco Polo\'s journey. This proves that Italian pasta existed independently from Chinese noodles.',
        },
        {
          year: '1295 CE',
          title: 'The Marco Polo Myth',
          description:
            'Marco Polo returns from his travels to China. The popular legend that he brought noodles back to Italy is a myth \u2014 Italians were already eating pasta! But Polo\'s journey does increase European interest in Asian foods and spices.',
        },
        {
          year: '~1600s CE',
          title: 'Japchae Serves a Korean King',
          description:
            'Korean glass noodles made from sweet potato starch are stir-fried with vegetables and served at a royal banquet. Japchae becomes a beloved celebration dish that is still enjoyed at Korean festivals today.',
        },
        {
          year: '~1900s CE',
          title: 'Pho Emerges in Vietnam',
          description:
            'In the early 20th century, Vietnamese cooks in Hanoi create pho by combining Chinese noodle-soup traditions with French colonial influences. Beef bones and aromatic spices simmer for hours to make the iconic broth.',
        },
        {
          year: '1958',
          title: 'Instant Noodles Invented',
          description:
            'Momofuku Ando introduces Chikin Ramen, the world\'s first instant noodle, after a year of experiments in his backyard shed. The flash-frying technique he discovers revolutionizes the food industry forever.',
        },
        {
          year: '1971',
          title: 'Cup Noodles Changes Everything',
          description:
            'Ando invents Cup Noodles at age 61, putting instant noodles in a waterproof cup. The portable, self-contained meal becomes a worldwide phenomenon and one of the most consumed foods on the planet.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Over 100 billion servings of instant noodles are consumed worldwide every year! If you stacked all those instant noodle cups on top of each other, they would reach from Earth to the Moon and back over 30 times. Momofuku Ando\'s backyard invention truly changed the world!',
        },
      ],
      videos: [
        {
          youtubeId: 'b92wMj_Fp-0',
          title: 'Why Does Pasta Come in So Many Different Shapes?',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['noodle-q3a', 'noodle-q3b', 'noodle-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient Origins
    {
      id: 'noodle-q1a',
      sectionId: 'ancient-origins',
      title: 'Ancient Noodle Quiz!',
      question:
        'How old are the noodles discovered at the Lajia archaeological site in China?',
      options: [
        { text: 'About 1,000 years old', isCorrect: false },
        { text: 'About 4,000 years old', isCorrect: true },
        { text: 'About 10,000 years old', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'noodle-q1b',
      sectionId: 'ancient-origins',
      title: 'Noodle Ingredients Quiz!',
      question:
        'What grain were the ancient Lajia noodles made from?',
      options: [
        { text: 'Wheat', isCorrect: false },
        { text: 'Rice', isCorrect: false },
        { text: 'Millet', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'noodle-q1c',
      sectionId: 'ancient-origins',
      title: 'Marco Polo Myth Buster!',
      question:
        'Did Marco Polo really bring noodles from China to Italy?',
      options: [
        { text: 'Yes, he introduced pasta to the Italians in 1295', isCorrect: false },
        {
          text: 'No, Italians were already eating pasta before Marco Polo was even born',
          isCorrect: true,
        },
        { text: 'Yes, but only a few types of pasta', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'noodle-q1d',
      sectionId: 'ancient-origins',
      title: 'Hand-Pulled Noodle Quiz!',
      question:
        'What is the Chinese art of hand-pulled noodles called?',
      options: [
        { text: 'Chow mein', isCorrect: false },
        { text: 'La mian', isCorrect: true },
        { text: 'Wonton', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Noodles Go Global
    {
      id: 'noodle-q2a',
      sectionId: 'noodles-go-global',
      title: 'Noodle Etiquette Quiz!',
      question:
        'In Japan, what does slurping your noodles loudly signal?',
      options: [
        { text: 'You are being rude to the chef', isCorrect: false },
        {
          text: 'You are enjoying the meal \u2014 it\'s a compliment!',
          isCorrect: true,
        },
        { text: 'You want more noodles', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'noodle-q2b',
      sectionId: 'noodles-go-global',
      title: 'Pho Quiz!',
      question:
        'In Vietnam, what time of day is pho traditionally eaten?',
      options: [
        { text: 'Lunch', isCorrect: false },
        { text: 'Dinner', isCorrect: false },
        { text: 'Breakfast', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'noodle-q2c',
      sectionId: 'noodles-go-global',
      title: 'Pad Thai Surprise Quiz!',
      question:
        'Why was pad thai originally created in the 1930s-1940s?',
      options: [
        { text: 'A famous chef won a cooking contest with it', isCorrect: false },
        { text: 'It was part of a government campaign to build Thai national identity', isCorrect: true },
        { text: 'Foreign tourists demanded a signature Thai dish', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Instant Noodle Revolution
    {
      id: 'noodle-q3a',
      sectionId: 'instant-revolution',
      title: 'Instant Noodle Inventor Quiz!',
      question:
        'Who invented instant noodles, and in what year?',
      options: [
        { text: 'Jiro Tanaka in 1965', isCorrect: false },
        { text: 'Momofuku Ando in 1958', isCorrect: true },
        { text: 'Haruki Murakami in 1972', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'noodle-q3b',
      sectionId: 'instant-revolution',
      title: 'Eureka Moment Quiz!',
      question:
        'What was Momofuku Ando watching his wife cook when he had his breakthrough idea for instant noodles?',
      options: [
        { text: 'Ramen in a pot', isCorrect: false },
        { text: 'Tempura (deep-fried food)', isCorrect: true },
        { text: 'Rice in a rice cooker', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'noodle-q3c',
      sectionId: 'instant-revolution',
      title: 'Global Noodle Quiz!',
      question:
        'How many servings of instant noodles are consumed worldwide every year?',
      options: [
        { text: 'About 10 billion', isCorrect: false },
        { text: 'About 50 billion', isCorrect: false },
        { text: 'Over 100 billion', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'noodle-essay',
    prompt:
      'What\'s your favorite type of noodle and what do you think makes noodles so popular worldwide?',
    description:
      'Now it\'s your turn! Think about all the noodles you\'ve learned about. Do you have a favorite? Is it ramen, spaghetti, pho, pad thai, or something else entirely? Why do you think noodles became so popular all over the world? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Great thinking! Your noodle thoughts have been saved. You\'re a true noodle historian!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'noodle-reward',
    title: 'Virtual Noodle Puller!',
    description:
      'You\'ve unlocked the Noodle Puller! Try the ancient art of hand-pulling noodles. Stretch, fold, and pull virtual dough to create perfectly thin noodle strands, just like a la mian master!',
    lockMessage: 'Noodle Kitchen Locked!',
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
    type: 'noodle-puller',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Noodle Puller! You\'re a true noodle history expert!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Noodle Master!',
    paragraphs: [
      'Congratulations! You\'ve traveled through 4,000 years of noodle history!',
      'You discovered that the world\'s oldest known noodles were found buried at Lajia in China, made from millet grain 4,000 years ago. You learned the art of hand-pulled la mian and busted the myth that Marco Polo brought pasta from China to Italy.',
      'You explored how noodles went global \u2014 from Italian spaghetti and Japanese ramen to Vietnamese pho, Korean japchae, and Thai pad thai. Each culture transformed the humble noodle into something uniquely their own, with flavors and traditions that make them special.',
      'And you met Momofuku Ando, the brilliant inventor who watched his wife cook tempura and realized he could flash-fry noodles to create the world\'s first instant ramen. His invention now feeds over 100 billion servings per year across more than 80 countries!',
      'The next time you sit down to a bowl of noodles, remember: you\'re eating a food with 4,000 years of history behind it. From ancient China to your dinner table, noodles have connected cultures and filled bellies around the world. Keep exploring food history \u2014 every meal has a story!',
    ],
  },
};
