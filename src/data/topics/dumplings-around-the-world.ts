import type { Topic } from '../types';

export const dumplingsAroundTheWorld: Topic = {
  id: 'dumplings-around-the-world',
  slug: 'dumplings-around-the-world',
  title: 'Dumplings Around the World',
  subtitle:
    'Every Culture Has a Dumpling!',
  status: 'active',
  themeId: 'dumplings-around-the-world',
  heroIcons: ['\u{1F95F}', '\u{1F30D}', '\u{1F373}'],
  navItems: [
    { id: 'asian-dumplings', icon: '\u{1F962}', label: 'Asian Dumplings' },
    { id: 'world-dumplings', icon: '\u{1F30E}', label: 'World Dumplings' },
    { id: 'dumpling-connections', icon: '\u{1F517}', label: 'Dumpling Connections' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F95F}',
      title: 'Welcome to the World of Dumplings!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Here\'s something amazing: almost every culture on Earth has invented its own version of a dumpling! Whether it\'s a Chinese jiaozi, a Polish pierogi, or a Latin American empanada, humans everywhere figured out the same brilliant idea \u2014 wrap something delicious in dough!',
            'But how did so many different cultures, separated by oceans and mountains, all come up with the same concept? Did they learn from each other, or did people just naturally discover that wrapping filling in dough is one of the best ideas in the history of food?',
            'In this adventure, you\'ll travel across continents to discover the incredible variety of dumplings our world has to offer. You\'ll learn their stories, their shapes, and the traditions behind them. Let\'s unwrap this delicious mystery!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'iHqzHrEFFTU',
          title: 'A Brief History of Dumplings',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Asian Dumplings ─────────────────────────────
    {
      id: 'asian-dumplings',
      icon: '\u{1F962}',
      title: 'Asian Dumplings: Where It All Began',
      readAloudBlocks: [
        {
          id: 'asian-dumplings-intro-text',
          paragraphs: [
            'Asia is the birthplace of many of the world\'s most beloved dumplings. Archaeologists have actually found ancient dumplings preserved in tombs in western China that are over 1,000 years old! From the steamed and boiled dumplings of East Asia to the spiced parcels of South Asia, this continent offers an incredible variety of dumpling traditions.',
          ],
        },
        {
          id: 'asian-dumplings-details-text',
          paragraphs: [
            'Chinese jiaozi are perhaps the most famous dumplings in the world. These crescent-shaped beauties are filled with minced pork, cabbage, ginger, and garlic, then pleated shut with a series of tiny folds. They can be boiled (shuijiao), steamed (zhengjiao), or pan-fried with a crispy golden bottom (guotie, also known as potstickers). A scholar named Shu Xi wrote a poem praising dumplings over 1,700 years ago! Wontons are another Chinese dumpling, smaller and silkier, often swimming in fragrant broth.',
            'Japanese gyoza were inspired by Chinese jiaozi. When Japanese soldiers returned from China after World War II, they brought back a love for dumplings. Japanese cooks adapted the recipe, making the wrappers thinner and the garlic more prominent. Gyoza are typically pan-fried on one side until golden and crispy, then steamed until the tops become translucent. The combination of crispy bottom and soft top is what makes gyoza so irresistible!',
            'Korean mandu have their own fascinating origin story. When Mongol armies invaded Korea in the 13th century, they brought their dumpling traditions with them. Korean cooks made the recipe their own, filling mandu with a unique combination of pork, tofu, kimchi, and glass noodles. Mandu are an essential part of Korean New Year celebrations and the harvest festival of Chuseok.',
            'Nepalese momo are plump, juicy dumplings that originated in the Himalayan region. They\'re typically filled with spiced buffalo or chicken meat, seasoned with cumin, coriander, and Sichuan pepper, then shaped into pleated purses or crescent moons. What makes momo truly special is the fiery tomato-based dipping sauce called achar that accompanies them. Momo shops line the streets of Kathmandu, and the aroma of steaming dumplings fills the mountain air!',
            'Indian samosas are perhaps the world\'s most popular fried dumpling. These golden triangular parcels are filled with spiced potatoes, peas, and sometimes meat, wrapped in a crispy pastry shell. Samosas traveled along ancient trade routes and have been enjoyed in India since at least the 13th century. Street vendors across India serve them with tangy tamarind chutney and spicy green chutney. From Delhi to Mumbai, the samosa is the undisputed king of Indian street food!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F95F}',
          name: 'Jiaozi',
          title: 'China\'s Crescent-Shaped Classic',
          description:
            'Jiaozi have been made in China for over 1,800 years. Legend says they were invented by a famous doctor named Zhang Zhongjing who wrapped medicine in dough to help people with frostbitten ears during a harsh winter. The crescent shape resembles ancient Chinese gold ingots, making them a symbol of wealth.',
          extraTag: 'Country: China',
        },
        {
          emoji: '\u{1F961}',
          name: 'Gyoza',
          title: 'Japan\'s Crispy-Bottom Favorite',
          description:
            'Gyoza arrived in Japan after World War II and quickly became one of the country\'s most beloved foods. The city of Utsunomiya in Japan is famous as the gyoza capital, with over 200 gyoza restaurants! Japanese gyoza are known for their thin, delicate wrappers and perfect crispy-on-the-bottom technique.',
          extraTag: 'Country: Japan',
        },
        {
          emoji: '\u{1F958}',
          name: 'Momo',
          title: 'Nepal\'s Mountain Dumpling',
          description:
            'Momo originated in the highlands of Nepal and Tibet. These juicy dumplings are now the most popular street food in Nepal. Every momo shop has its own secret recipe for the spicy tomato achar dipping sauce. Some momos are even deep-fried for an extra crunchy exterior called "C-momo" or "kothey momo"!',
          extraTag: 'Country: Nepal',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Archaeologists discovered ancient dumplings in tombs in the Turpan region of western China. Even though these dumplings are over 1,000 years old, you can still see their crescent shape perfectly preserved! They were placed in tombs as food for the afterlife.',
        },
      ],
      videos: [],
      quizIds: ['dumpling-q1a', 'dumpling-q1b', 'dumpling-q1c', 'dumpling-q1d'],
    },

    // ─── Section 2: World Dumplings ─────────────────────────────
    {
      id: 'world-dumplings',
      icon: '\u{1F30E}',
      title: 'Dumplings Go Global!',
      readAloudBlocks: [
        {
          id: 'world-dumplings-intro-text',
          paragraphs: [
            'Dumplings aren\'t just an Asian tradition \u2014 they\'re found on every inhabited continent! From the snowy plains of Poland to the highlands of Georgia in the Caucasus Mountains, from sunny Italy to the bustling streets of Latin America, people everywhere have created their own versions of dough wrapped around delicious fillings.',
          ],
        },
        {
          id: 'world-dumplings-details-text',
          paragraphs: [
            'Polish pierogi are one of Europe\'s most beloved dumplings. These half-moon-shaped parcels can be filled with mashed potatoes and cheese (ruskie), sauerkraut and mushrooms, ground meat, or even sweet fillings like blueberries or strawberries! Pierogi are boiled first, then often pan-fried in butter until golden. They\'re the national dish of Poland and are served at Christmas Eve dinner, weddings, and every celebration in between. There are even pierogi festivals in Poland with giant pierogi sculptures!',
            'Italian ravioli are elegant pillows of pasta filled with ricotta cheese and spinach, butternut squash, or slow-braised meat. The oldest known recipe for ravioli dates back to the 14th century! Each Italian region has its own special version: tortellini in Bologna are shaped like tiny belly buttons, agnolotti in Piedmont are pinched at the edges, and culurgiones in Sardinia are twisted shut like little wheat sheaves. The Italians turned the simple dumpling into an art form!',
            'Latin American empanadas are golden, crescent-shaped turnovers found throughout Central and South America. Every country has its own style: Argentine empanadas are baked with spiced beef and olives, Colombian empanadas are fried with a cornmeal crust, and Chilean empanadas are enormous and filled with onions, raisins, and hard-boiled eggs. The name comes from the Spanish word "empanar," meaning "to wrap in bread." Empanadas were brought to the Americas by Spanish colonizers and have been adapted in countless delicious ways.',
            'Georgian khinkali are one of the world\'s most dramatic dumplings. These large, twisted-top pouches are filled with spiced meat and broth. The proper way to eat them is to hold the twisted knob on top, take a small bite, and slurp out the hot, flavorful broth inside before eating the rest. The knob is traditionally left on the plate so you can count how many you\'ve eaten \u2014 a true khinkali champion can eat twenty or more!',
            'Ethiopian tibs aren\'t a traditional dumpling, but Ethiopia has its own version of the "food-in-a-wrapper" concept. Sambusas, the Ethiopian cousin of the Indian samosa, are crispy triangular pastries filled with spiced lentils or minced meat. They arrived in Ethiopia through centuries of trade across the Red Sea and Indian Ocean, showing how food ideas travel along trade routes.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F954}',
          name: 'Pierogi',
          title: 'Poland\'s National Treasure',
          description:
            'Pierogi are so important to Polish culture that there\'s a legend about a saint named Hyacinth who saved people from famine by praying for pierogi to rain from the sky! Today, pierogi festivals across Poland celebrate this beloved dumpling with cooking competitions and giant pierogi floats.',
          extraTag: 'Country: Poland',
        },
        {
          emoji: '\u{1F35D}',
          name: 'Ravioli',
          title: 'Italy\'s Pasta Pillows',
          description:
            'The earliest known recipe for ravioli appears in the writings of a 14th-century Italian merchant. Ravioli were originally a way for cooks to use leftover meat and cheese by wrapping them in pasta. Today, Italian grandmothers (called nonnas) are famous for spending entire mornings hand-making hundreds of ravioli for family Sunday dinners.',
          extraTag: 'Country: Italy',
        },
        {
          emoji: '\u{1F32E}',
          name: 'Empanada',
          title: 'Latin America\'s Golden Crescent',
          description:
            'Empanadas are believed to have originated in Galicia, Spain, before traveling to Latin America with Spanish colonizers in the 1500s. In Argentina, each province has its own signature empanada style! The province of Tucum\u00E1n holds an annual empanada festival where bakers compete to make the most perfectly folded empanada with the tastiest filling.',
          extraTag: 'Region: Latin America',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Scientists believe that many cultures invented dumplings independently, without ever learning from each other. This is called "convergent cultural evolution" \u2014 the same great idea appearing in different places because wrapping tasty filling in dough is just so universally brilliant!',
        },
      ],
      videos: [
        {
          youtubeId: '_-w2Bs7GjkE',
          title: 'The Journey of Empanadas + Homemade Empanada Recipe',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['dumpling-q2a', 'dumpling-q2b', 'dumpling-q2c'],
    },

    // ─── Section 3: Dumpling Connections ─────────────────────────
    {
      id: 'dumpling-connections',
      icon: '\u{1F517}',
      title: 'The Amazing Connections Between Dumplings',
      readAloudBlocks: [
        {
          id: 'connections-text',
          paragraphs: [
            'One of the most fascinating things about dumplings is how they reveal the hidden connections between cultures. Trade routes, wars, migrations, and explorations carried dumpling recipes across continents, and each new culture adapted them to local tastes and ingredients.',
            'The ancient Silk Road, stretching from China to the Mediterranean, was a highway for dumpling ideas. Traders carried recipes along with their silk and spices. The Mongol Empire, which stretched from Korea to Eastern Europe in the 13th century, spread dumpling-making traditions across the largest land empire in history. That\'s why you can find similar dumplings from Korea all the way to Turkey!',
            'But not all dumpling similarities come from trade and travel. Some cultures invented dumplings completely on their own. The idea of wrapping food in dough is so practical and delicious that humans in different parts of the world simply arrived at the same conclusion independently. Archaeologists call this "parallel invention," and dumplings are one of the best examples in food history.',
            'Today, dumplings continue to evolve. Fusion dumplings combine traditions \u2014 imagine a pierogi filled with Korean kimchi, or a gyoza stuffed with Mexican-spiced beef! Food trucks and restaurants around the world are creating new dumpling varieties every day, proving that this ancient idea still has endless possibilities.',
          ],
        },
      ],
      timeline: [
        {
          year: '~200 CE',
          title: 'Ancient Chinese Jiaozi',
          description:
            'The earliest written records of Chinese dumplings appear. Legend credits the doctor Zhang Zhongjing with inventing jiaozi to help people with frostbitten ears during winter.',
        },
        {
          year: '~700 CE',
          title: 'Dumplings in Central Asia',
          description:
            'Dumpling traditions spread along the Silk Road to Central Asian cultures. Manti, large steamed dumplings filled with lamb, become popular across the region from Turkey to Kazakhstan.',
        },
        {
          year: '~1200 CE',
          title: 'Mongol Empire Spreads Dumplings',
          description:
            'The vast Mongol Empire carries dumpling traditions from China to Eastern Europe. Korean mandu, Tibetan momo, and Turkish manti all trace connections to this era of conquest and cultural exchange.',
        },
        {
          year: '~1300 CE',
          title: 'Ravioli Appears in Italy',
          description:
            'The earliest known recipe for Italian ravioli is recorded by a merchant. Whether pasta dumplings arrived via trade routes or were independently invented in Italy remains a delicious mystery!',
        },
        {
          year: '~1500 CE',
          title: 'Empanadas Travel to the Americas',
          description:
            'Spanish colonizers bring empanadas to Latin America, where local cooks adapt them with indigenous ingredients like corn dough, chili peppers, and new fillings unique to each region.',
        },
        {
          year: '~1940s',
          title: 'Gyoza Born in Japan',
          description:
            'Japanese soldiers returning from China after World War II bring back a love for dumplings. Japanese cooks create gyoza with thinner wrappers, more garlic, and a signature crispy pan-fried bottom.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The word "dumpling" first appeared in English around the year 1600. Nobody knows exactly where the word came from, but it might be related to the word "dump," an old English word meaning a small lump. From a humble lump of dough to a global food phenomenon!',
        },
      ],
      videos: [],
      quizIds: ['dumpling-q3a', 'dumpling-q3b', 'dumpling-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Asian Dumplings
    {
      id: 'dumpling-q1a',
      sectionId: 'asian-dumplings',
      title: 'Ancient Dumplings Quiz!',
      question:
        'According to the TED-Ed video, where did archaeologists discover ancient preserved dumplings in tombs?',
      options: [
        { text: 'Eastern Japan', isCorrect: false },
        { text: 'Western China', isCorrect: true },
        { text: 'Northern India', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'dumpling-q1b',
      sectionId: 'asian-dumplings',
      title: 'Chinese Dumpling Quiz!',
      question:
        'What does the legend say about why Zhang Zhongjing invented jiaozi?',
      options: [
        { text: 'He wanted to win a cooking competition', isCorrect: false },
        {
          text: 'He wrapped medicine in dough to help people with frostbitten ears',
          isCorrect: true,
        },
        { text: 'He was trying to preserve food for long journeys', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'dumpling-q1c',
      sectionId: 'asian-dumplings',
      title: 'Gyoza Challenge!',
      question:
        'How did gyoza arrive in Japan?',
      options: [
        { text: 'Japanese monks brought the recipe from Korea', isCorrect: false },
        { text: 'Chinese merchants sold them in Tokyo markets', isCorrect: false },
        {
          text: 'Japanese soldiers brought back a love for dumplings after returning from China',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'dumpling-q1d',
      sectionId: 'asian-dumplings',
      title: 'Samosa Quiz!',
      question:
        'What shape are Indian samosas?',
      options: [
        { text: 'Crescent-shaped like a half moon', isCorrect: false },
        { text: 'Round like a ball', isCorrect: false },
        { text: 'Triangular', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: World Dumplings
    {
      id: 'dumpling-q2a',
      sectionId: 'world-dumplings',
      title: 'Pierogi Quiz!',
      question:
        'Which of these is NOT a traditional Polish pierogi filling?',
      options: [
        { text: 'Mashed potatoes and cheese', isCorrect: false },
        { text: 'Sauerkraut and mushrooms', isCorrect: false },
        { text: 'Curry chicken and rice', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'dumpling-q2b',
      sectionId: 'world-dumplings',
      title: 'Georgian Dumpling Quiz!',
      question:
        'What is the proper way to eat Georgian khinkali?',
      options: [
        { text: 'Cut them open with a knife and fork', isCorrect: false },
        {
          text: 'Hold the top knob, take a bite, and slurp out the broth first',
          isCorrect: true,
        },
        { text: 'Pop the whole thing in your mouth at once', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'dumpling-q2c',
      sectionId: 'world-dumplings',
      title: 'Empanada Quiz!',
      question:
        'What does the word "empanada" come from?',
      options: [
        { text: 'The Spanish word "empanar," meaning "to wrap in bread"', isCorrect: true },
        { text: 'The Portuguese word for "golden crescent"', isCorrect: false },
        { text: 'The name of the cook who invented them', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Dumpling Connections
    {
      id: 'dumpling-q3a',
      sectionId: 'dumpling-connections',
      title: 'Dumpling History Quiz!',
      question:
        'Which empire helped spread dumpling traditions from China to Eastern Europe in the 1200s?',
      options: [
        { text: 'The Roman Empire', isCorrect: false },
        { text: 'The Mongol Empire', isCorrect: true },
        { text: 'The Ottoman Empire', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'dumpling-q3b',
      sectionId: 'dumpling-connections',
      title: 'Trade Route Quiz!',
      question:
        'Which famous trade route helped carry dumpling recipes between China and the Mediterranean?',
      options: [
        { text: 'The Spice Route', isCorrect: false },
        { text: 'The Silk Road', isCorrect: true },
        { text: 'The Tea Trail', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'dumpling-q3c',
      sectionId: 'dumpling-connections',
      title: 'Parallel Invention Quiz!',
      question:
        'What do scientists call it when different cultures independently invent the same thing, like dumplings?',
      options: [
        { text: 'Cultural copying', isCorrect: false },
        { text: 'Food migration', isCorrect: false },
        { text: 'Convergent cultural evolution (or parallel invention)', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'dumpling-essay',
    prompt:
      'If you could invent a new type of dumpling, what filling and wrapper would you use?',
    description:
      'Time to get creative! Imagine you\'re a master dumpling chef. What would your dream dumpling look like? What would you put inside? What kind of dough would you use for the wrapper? Would you steam it, fry it, or boil it? Give your dumpling a name! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Delicious idea! Your dream dumpling has been saved. You\'re a true dumpling inventor!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'dumpling-reward',
    title: 'Virtual Dumpling Wrapper!',
    description:
      'You\'ve unlocked the Dumpling Wrapper! Try your hand at virtually wrapping dumplings from around the world. Choose your dough, pick your filling, and fold your creation!',
    lockMessage: 'Dumpling Kitchen Locked!',
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
    type: 'dumpling-wrapper',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Dumpling Wrapper! You\'re a true global dumpling expert!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Dumpling Champion!',
    paragraphs: [
      'Congratulations! You\'ve traveled the world and discovered the incredible story of dumplings!',
      'You explored Asian dumplings from Chinese jiaozi and Japanese gyoza to Nepalese momo and Indian samosas. You learned that archaeologists found 1,000-year-old dumplings in Chinese tombs and that a 1,700-year-old poem praised the art of dumpling making.',
      'You discovered world dumplings from Polish pierogi and Italian ravioli to Latin American empanadas and Georgian khinkali. Each culture took the simple idea of dough and filling and turned it into something uniquely their own.',
      'And you uncovered the amazing connections between dumplings \u2014 how the Silk Road and Mongol Empire spread recipes across continents, while other cultures invented dumplings completely independently through parallel invention.',
      'The next time you eat a dumpling, remember: you\'re enjoying one of humanity\'s oldest and most universal foods. Every fold, every filling, and every flavor tells a story of human creativity and connection!',
    ],
  },
};
