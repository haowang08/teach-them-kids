import type { Topic } from '../types';

export const theStoryOfSpices: Topic = {
  id: 'the-story-of-spices',
  slug: 'the-story-of-spices',
  title: 'Spices and Silk',
  subtitle:
    'From Ancient Spice Routes to the Silk Road and Your Kitchen Table',
  status: 'active',
  themeId: 'the-story-of-spices',
  heroIcons: ['\u{1F9C2}', '\u{1F336}\uFE0F', '\u{1F33F}'],
  navItems: [
    { id: 'ancient-spice-origins', icon: '\u{1F3FA}', label: 'Ancient Origins' },
    { id: 'spice-trade-exploration', icon: '\u{26F5}', label: 'Trade & Exploration' },
    { id: 'spices-today', icon: '\u{1F32E}', label: 'Spices Today' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F9C2}',
      title: 'Welcome, Spice Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever sprinkled cinnamon on your toast or tasted pepper on your scrambled eggs? Those tiny grains of flavor have an incredible story that stretches back thousands of years! Spices were once so precious that people risked their lives sailing across dangerous oceans and trekking through scorching deserts just to get them. And alongside spices, another luxury transformed the ancient world: silk.',
            'In this adventure, you will travel back to ancient Egypt, where spices were used to preserve mummies. You will follow daring traders along the legendary Spice Routes and the Silk Road that connected Asia, Africa, and Europe. And you will discover how spices and silk changed the course of history \u2014 launching voyages of exploration, building vast empires, and shaping the cultures we know today.',
            'Get ready to explore the amazing world of spices and silk, from ancient temples and caravans to your dinner table!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'E1mMgwp7iaE',
          title: 'The Geography of Spices and Herbs',
          channelName: 'Atlas Pro',
        },
        {
          youtubeId: 'vn3e37VWc0k',
          title: 'The Silk Road: Connecting the ancient world through trade',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient Spice Origins ─────────────────────────
    {
      id: 'ancient-spice-origins',
      icon: '\u{1F3FA}',
      title: 'Ancient Spice Origins',
      readAloudBlocks: [
        {
          id: 'ancient-origins-intro',
          paragraphs: [
            'Spices have been treasured by humans for thousands of years. In ancient Egypt, spices were not just used for cooking \u2014 they played a crucial role in mummification. The Egyptians used cinnamon, cassia, and cumin to preserve the bodies of pharaohs and nobles. They believed that spices helped the dead travel safely to the afterlife. Archaeologists have found traces of black pepper in the nostrils of the mummy of Pharaoh Ramesses II, who died around 1213 BCE!',
            'India is often called the homeland of spices. For thousands of years, the lush tropical forests of southern India produced pepper, turmeric, cardamom, and ginger. The Malabar Coast of India, in present-day Kerala, was the world\'s greatest source of black pepper. Ancient Indian texts called the Vedas, written around 1500 BCE, mention turmeric, ginger, and pepper as both foods and medicines.',
          ],
        },
        {
          id: 'ancient-origins-expansion',
          paragraphs: [
            'Meanwhile, in ancient China, spices were prized as powerful medicines. Chinese emperor Shen Nung is said to have written about the healing properties of spices around 2700 BCE. Star anise, cassia (a type of cinnamon), and ginger were used in traditional Chinese medicine for thousands of years. China was also the birthplace of silk \u2014 legend says Empress Leizu discovered silk around 2700 BCE when a cocoon fell into her tea! Chinese courtiers in the Han Dynasty (206 BCE \u2013 220 CE) were even required to hold cloves in their mouths when speaking to the emperor, to keep their breath fresh.',
            'By around 2000 BCE, trade routes were already connecting these ancient civilizations. Arab traders sailed across the Indian Ocean to buy spices from India, then carried them overland through the deserts of Arabia to sell to merchants in Egypt and the Mediterranean. These early spice routes eventually merged with the famous Silk Road, a vast network of overland and maritime paths that carried silk from China alongside spices from India to eager buyers in the Mediterranean world.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F330}',
          name: 'Black Pepper',
          title: 'The King of Spices',
          description:
            'Black pepper comes from a flowering vine native to the Malabar Coast of India. It has been traded for at least 4,000 years and was so valuable in ancient Rome that it was used as currency. The Romans spent enormous amounts of gold importing pepper from India, and the writer Pliny the Elder complained about how much money was flowing out of the empire to pay for it!',
          extraTag: 'Origin: Southern India',
        },
        {
          emoji: '\u{1F7E1}',
          name: 'Turmeric',
          title: 'The Golden Spice',
          description:
            'Turmeric has been used in India for over 4,000 years as a spice, medicine, and dye. Its brilliant golden-yellow color comes from a compound called curcumin. Ancient Indians used turmeric to treat wounds, digestive problems, and skin conditions. It was so important in Indian culture that it was used in wedding ceremonies and religious rituals.',
          extraTag: 'Origin: Indian Subcontinent',
        },
        {
          emoji: '\u{1F33F}',
          name: 'Cardamom',
          title: 'The Queen of Spices',
          description:
            'Cardamom is one of the world\'s most expensive spices, right after saffron and vanilla. It grows wild in the tropical forests of southern India and was traded as early as 3000 BCE. The ancient Egyptians chewed cardamom seeds to clean their teeth, and the Vikings discovered cardamom during their travels and brought it home to Scandinavia, where it remains popular in baked goods to this day.',
          extraTag: 'Origin: Western Ghats, India',
        },
        {
          emoji: '\u{1F9C5}',
          name: 'Ginger',
          title: 'The Universal Healer',
          description:
            'Ginger has been cultivated in tropical Asia for over 5,000 years. It was one of the first spices to be exported from Asia and was well known in ancient Rome. Chinese sailors used to carry ginger on long voyages to prevent seasickness \u2014 and modern science has shown that ginger really does help with nausea! By the Middle Ages, ginger was the second most commonly traded spice after pepper.',
          extraTag: 'Origin: Southeast Asia',
        },
      ],
      funFacts: [
        {
          title: 'Spicy Mummies!',
          text: 'Ancient Egyptians used so many spices in mummification that the English word "embalm" comes from the word "balm," meaning a fragrant spice mixture. Cinnamon, cassia, and myrrh were all used to preserve mummies for the afterlife!',
        },
      ],
      videos: [
        {
          youtubeId: 'sGeXtUZQScc',
          title: 'The Age Of Exploration',
          channelName: 'Explainer14',
        },
      ],
      quizIds: ['tsos-q1a', 'tsos-q1b', 'tsos-q1c', 'tsos-q1d'],
    },

    // ─── Section 2: The Spice Trade & Exploration ──────────────────
    {
      id: 'spice-trade-exploration',
      icon: '\u{26F5}',
      title: 'The Spice Trade & Exploration',
      readAloudBlocks: [
        {
          id: 'spice-trade-intro',
          paragraphs: [
            'For centuries, Arab traders controlled the spice trade between Asia and Europe. They sailed across the Indian Ocean to buy spices in India and the Spice Islands (modern-day Indonesia), then transported them overland through Arabia to ports in Egypt and the eastern Mediterranean. Alongside spices, bolts of Chinese silk traveled the same routes, making the Silk Road one of the greatest trade networks in history. To keep their sources secret and justify high prices, Arab merchants invented fantastic stories. They told Europeans that cinnamon grew in deep valleys guarded by giant winged serpents!',
            'By the Middle Ages, the Italian city of Venice had become the spice and silk trading capital of Europe. Venetian merchants bought spices and fine silks from Arab traders in Alexandria, Egypt, and sold them at huge markups across Europe. Spices passed through so many hands that by the time a pinch of pepper reached a kitchen in England, it could cost more than a day\'s wages for a laborer. Venice grew fabulously wealthy \u2014 the magnificent palaces along the Grand Canal were built with profits from the spice and silk trade.',
          ],
        },
        {
          id: 'spice-trade-explorers',
          paragraphs: [
            'European nations desperately wanted to find their own route to the spice lands and cut out the middlemen. In 1498, the Portuguese explorer Vasco da Gama became the first European to reach India by sailing around the southern tip of Africa. When he arrived in Calicut (now Kozhikode) on the Malabar Coast, he famously declared that he had come seeking "Christians and spices." Portugal quickly built a trading empire that stretched from Africa to India to the Spice Islands.',
            'Meanwhile, Christopher Columbus sailed west from Spain in 1492, convinced he could reach the Spice Islands by crossing the Atlantic Ocean. He never found the spices he was looking for, but he stumbled upon the Americas instead \u2014 and brought back chili peppers, which Europeans had never tasted before! Later, in the 1600s, the Dutch East India Company (known as the VOC) became the world\'s most powerful trading company by controlling the Spice Islands of Indonesia, where nutmeg, mace, and cloves grew.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{26F5}',
          name: 'Vasco da Gama',
          title: 'The Pepper Pioneer',
          description:
            'In 1498, Portuguese explorer Vasco da Gama completed the first sea voyage from Europe to India by sailing around the Cape of Good Hope at the southern tip of Africa. The journey took about 10 months and opened a direct sea route for the spice trade. His cargo of pepper and cinnamon from India was worth 60 times the cost of the entire expedition!',
          extraTag: 'Portugal, 1460\u20131524',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Venice',
          title: 'Queen of the Spice Trade',
          description:
            'The city of Venice dominated European spice trade for centuries. Venetian merchants had exclusive deals with Arab traders in Egypt and became incredibly rich. The famous explorer Marco Polo was a Venetian who traveled to China in the 1270s, and his stories about Asian spices inspired generations of explorers to seek new routes to the East.',
          extraTag: 'Italy, 800\u20131600s',
        },
        {
          emoji: '\u{1F95C}',
          name: 'Nutmeg',
          title: 'The Island Treasure',
          description:
            'Nutmeg originally grew on only the tiny Banda Islands in Indonesia. It was so incredibly valuable that the Dutch and English fought wars over these islands. In the 1667 Treaty of Breda, England traded its claim to the nutmeg-rich island of Run to the Dutch in exchange for Manhattan \u2014 yes, the island that became New York City! At the time, nutmeg was worth more by weight than gold.',
          extraTag: 'Origin: Banda Islands, Indonesia',
        },
        {
          emoji: '\u{1F4E6}',
          name: 'The Dutch East India Company',
          title: 'The Spice Empire',
          description:
            'Founded in 1602, the Dutch East India Company (VOC) was the first multinational corporation and the first company to issue stock. At its peak, it was worth roughly $7.9 trillion in today\'s money, making it the most valuable company in history. The VOC controlled the production and trade of nutmeg, mace, and cloves by taking over the Spice Islands of Indonesia.',
          extraTag: 'Netherlands, 1602\u20131799',
        },
      ],
      funFacts: [
        {
          title: 'The Price of Pepper!',
          text: 'When the Visigoths besieged Rome in 408 CE, they demanded a ransom that included 3,000 pounds of pepper \u2014 showing that pepper was literally as valuable as gold and silver. The English word "peppercorn rent" still means a very tiny payment, but back then, a peppercorn was anything but tiny in value!',
        },
      ],
      videos: [
        {
          youtubeId: '4KKc5ep0jp0',
          title: 'The History of Pepper - The Spice That Built Empires',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['tsos-q2a', 'tsos-q2b', 'tsos-q2c'],
    },

    // ─── Section 3: Spices Today ──────────────────────────────────
    {
      id: 'spices-today',
      icon: '\u{1F32E}',
      title: 'Spices Today',
      readAloudBlocks: [
        {
          id: 'spices-today-growing',
          paragraphs: [
            'Did you know that spices come from almost every part of a plant? Cinnamon is the inner bark of a tree. Ginger is a root (technically a rhizome). Saffron comes from the tiny thread-like stigmas of a crocus flower \u2014 it takes about 75,000 flowers to make just one pound of saffron, which is why it is the most expensive spice in the world! Pepper comes from berries, cumin and coriander are seeds, and cloves are dried flower buds.',
            'Scientists have discovered that many spices have real health benefits. Turmeric contains curcumin, a compound that researchers have found has anti-inflammatory properties. Cinnamon has been shown in some studies to help regulate blood sugar levels. Ginger has been proven to help with nausea and digestion \u2014 the same reason ancient Chinese sailors carried it on long voyages thousands of years ago!',
          ],
        },
        {
          id: 'spices-today-blends',
          paragraphs: [
            'Around the world, different cultures have created their own signature spice blends that define their cuisines. India\'s garam masala is a warm blend of cardamom, cinnamon, cloves, cumin, and coriander. Morocco\'s ras el hanout, meaning "head of the shop" in Arabic, can contain over 30 different spices and represents the best a spice merchant has to offer. China\'s five-spice powder combines star anise, cloves, cinnamon, Sichuan pepper, and fennel seeds into a blend that balances all five flavors in Chinese cooking: sweet, sour, bitter, salty, and savory.',
            'Today, India is the world\'s largest producer, consumer, and exporter of spices. And if you love spicy food, you might know about the Scoville scale, which measures the heat of chili peppers. A sweet bell pepper scores 0 Scoville Heat Units (SHU), a jalapeno scores about 2,500 to 8,000 SHU, and the Carolina Reaper \u2014 one of the world\'s hottest peppers \u2014 scores over 2.2 million SHU! The Scoville scale was invented by pharmacist Wilbur Scoville in 1912.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F525}',
          name: 'The Carolina Reaper',
          title: 'The World\'s Hottest Pepper',
          description:
            'The Carolina Reaper held the Guinness World Record as the hottest chili pepper, scoring over 2.2 million Scoville Heat Units. It was created by Ed Currie in South Carolina, USA, by crossing a Pakistani Naga pepper with a red habanero. For comparison, a regular jalapeno is about 300 times milder! The heat in chili peppers comes from a chemical called capsaicin.',
          extraTag: 'Over 2.2 Million SHU',
        },
        {
          emoji: '\u{1F9F5}',
          name: 'Saffron',
          title: 'The World\'s Most Expensive Spice',
          description:
            'Saffron comes from the stigmas of the crocus flower. Each flower produces only three tiny red threads, and they must all be picked by hand. It takes about 75,000 flowers to produce just one pound of saffron, which can cost between $5,000 and $10,000 per pound! Iran produces about 90% of the world\'s saffron today.',
          extraTag: 'Origin: Mediterranean/Southwest Asia',
        },
        {
          emoji: '\u{2B50}',
          name: 'Star Anise',
          title: 'The Star-Shaped Spice',
          description:
            'Star anise is a beautiful star-shaped fruit that comes from an evergreen tree native to southern China and Vietnam. It is a key ingredient in Chinese five-spice powder and Vietnamese pho. Amazingly, star anise is also used to make Tamiflu, the flu medicine \u2014 it contains a compound called shikimic acid that is used in the drug\'s production.',
          extraTag: 'Origin: Southern China & Vietnam',
        },
      ],
      funFacts: [
        {
          title: 'Scoville Scale Showdown!',
          text: 'The Scoville scale was originally measured by having a panel of taste-testers try diluted pepper solutions until they could no longer feel the burn! Today, scientists use high-tech machines called HPLC (High Performance Liquid Chromatography) to measure capsaicin levels instead. Much safer for everyone\'s taste buds!',
        },
      ],
      videos: [
        {
          youtubeId: 'F2aYh_Iw-yY',
          title: 'The History of Salt (Remastered, 2025)',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['tsos-q3a', 'tsos-q3b', 'tsos-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient Spice Origins
    {
      id: 'tsos-q1a',
      sectionId: 'ancient-spice-origins',
      title: 'Mummy Spice Quiz!',
      question:
        'What did the ancient Egyptians use spices like cinnamon and cassia for, besides cooking?',
      options: [
        { text: 'Building pyramids', isCorrect: false },
        { text: 'Preserving mummies for the afterlife', isCorrect: true },
        { text: 'Painting tomb walls', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'tsos-q1b',
      sectionId: 'ancient-spice-origins',
      title: 'Spice Homeland Quiz!',
      question:
        'Which region is often called the "homeland of spices" and has been producing pepper, turmeric, and cardamom for thousands of years?',
      options: [
        { text: 'China', isCorrect: false },
        { text: 'Southern India', isCorrect: true },
        { text: 'Egypt', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'tsos-q1c',
      sectionId: 'ancient-spice-origins',
      title: 'Fresh Breath Challenge!',
      question:
        'In ancient China during the Han Dynasty, what were courtiers required to hold in their mouths when speaking to the emperor?',
      options: [
        { text: 'Peppercorns', isCorrect: false },
        { text: 'Cloves', isCorrect: true },
        { text: 'Cardamom seeds', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'tsos-q1d',
      sectionId: 'ancient-spice-origins',
      title: 'Ancient Trade Quiz!',
      question:
        'Approximately when did trade routes begin connecting ancient civilizations through the spice trade?',
      options: [
        { text: 'Around 500 CE', isCorrect: false },
        { text: 'Around 2000 BCE', isCorrect: true },
        { text: 'Around 100 BCE', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: The Spice Trade & Exploration
    {
      id: 'tsos-q2a',
      sectionId: 'spice-trade-exploration',
      title: 'Spice Secrets Quiz!',
      question:
        'Why did Arab traders invent stories about cinnamon being guarded by giant winged serpents?',
      options: [
        { text: 'They thought the stories were true', isCorrect: false },
        { text: 'To keep their trade sources secret and prices high', isCorrect: true },
        { text: 'To scare children away from the spice markets', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'tsos-q2b',
      sectionId: 'spice-trade-exploration',
      title: 'Explorer Challenge!',
      question:
        'In 1498, which explorer became the first European to reach India by sailing around Africa?',
      options: [
        { text: 'Christopher Columbus', isCorrect: false },
        { text: 'Marco Polo', isCorrect: false },
        { text: 'Vasco da Gama', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'tsos-q2c',
      sectionId: 'spice-trade-exploration',
      title: 'Spice Empire Quiz!',
      question:
        'Which European city became the spice trading capital by buying spices from Arab traders and selling them across Europe?',
      options: [
        { text: 'London', isCorrect: false },
        { text: 'Venice', isCorrect: true },
        { text: 'Paris', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Spices Today
    {
      id: 'tsos-q3a',
      sectionId: 'spices-today',
      title: 'Plant Parts Quiz!',
      question:
        'Cinnamon comes from which part of a tree?',
      options: [
        { text: 'The leaves', isCorrect: false },
        { text: 'The inner bark', isCorrect: true },
        { text: 'The roots', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'tsos-q3b',
      sectionId: 'spices-today',
      title: 'Spice Blend Challenge!',
      question:
        'What does "ras el hanout," the Moroccan spice blend name, mean in Arabic?',
      options: [
        { text: 'Fire of the desert', isCorrect: false },
        { text: 'Head of the shop', isCorrect: true },
        { text: 'Gift of the king', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'tsos-q3c',
      sectionId: 'spices-today',
      title: 'Hot Pepper Quiz!',
      question:
        'What scale is used to measure the heat level of chili peppers?',
      options: [
        { text: 'The Richter scale', isCorrect: false },
        { text: 'The Fahrenheit scale', isCorrect: false },
        { text: 'The Scoville scale', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'tsos-essay',
    prompt:
      'If you could travel back in time along an ancient spice route, where would you go and what spice would you trade?',
    description:
      'Now it\'s your turn to be a spice trader! Imagine you could travel back in time to any point along the ancient spice routes. Where would you go? What spice would you want to trade, and why? Would you sail across the Indian Ocean, trek through the Arabian desert, or explore the Spice Islands? Share your adventure below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Amazing adventure story! Your answer has been saved. You\'re a true spice explorer!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'tsos-reward',
    title: 'Explore the Ancient Spice Trade Routes!',
    description:
      'You\'ve unlocked the Spice Trade Adventure! Navigate the legendary routes that carried precious spices across oceans and deserts, connecting civilizations from India to Europe.',
    lockMessage: 'Spice Chest Locked!',
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
    type: 'spice-trade',
    celebrationMessage:
      'INCREDIBLE! You\'ve unlocked the Spice Trade Adventure! You\'re a master spice explorer!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Spice and Silk Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled through thousands of years of history and discovered the incredible story of spices and silk!',
      'You learned that ancient Egyptians used spices to preserve mummies, that India has been the homeland of pepper, turmeric, and cardamom for thousands of years, and that China gave the world both powerful spice-based medicines and the secret of silk. Trade routes connecting these civilizations \u2014 including the legendary Silk Road \u2014 existed as far back as 2000 BCE!',
      'You discovered how Arab traders kept their spice sources secret with wild stories, how Venice grew rich as Europe\'s spice and silk capital, and how the search for spices sent explorers like Vasco da Gama and Columbus on voyages that changed the world. The Dutch East India Company built a massive empire just to control tiny islands where nutmeg and cloves grew.',
      'And you explored how spices come from every part of a plant, how turmeric and ginger have real health benefits backed by science, and how cultures around the world have created signature spice blends like garam masala, ras el hanout, and five-spice powder. You even learned about the Scoville scale and the fiery Carolina Reaper!',
      'Next time you taste cinnamon, pepper, or ginger \u2014 or feel a smooth silk fabric \u2014 remember that you\'re experiencing treasures that people once risked everything to find. Keep exploring!',
    ],
  },
};
