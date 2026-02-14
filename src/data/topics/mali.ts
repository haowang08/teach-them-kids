import type { Topic } from '../types';

export const mali: Topic = {
  id: 'mali',
  slug: 'mali',
  title: 'The Mali Empire',
  subtitle:
    'Golden Kings, Great Griots & the Richest Man in History',
  status: 'active',
  themeId: 'mali-empire',
  heroIcons: ['\u{1F451}', '\u{1F30D}', '\u{1F4D6}'],
  navItems: [
    { id: 'legends', icon: '\u{1F4D6}', label: 'Legends & Stories' },
    { id: 'rulers', icon: '\u{1F451}', label: 'Great Rulers' },
    { id: 'trade', icon: '\u{1F42B}', label: 'Trade & Timbuktu' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F30D}',
      title: 'Welcome, Young Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Are you ready for an amazing journey? We\'re heading to West Africa to discover one of the greatest empires the world has ever known: the Mali Empire!',
            'The Mali Empire rose in the 13th century and became one of the largest and wealthiest empires on Earth. Its rulers controlled gold mines that made them fabulously rich. Its cities became centers of learning and trade. And its stories were kept alive not by books, but by incredible storytellers called griots!',
            'In this adventure, you\'ll hear legendary tales of warrior kings and sorcerers, meet the richest person who ever lived, and explore the great city of Timbuktu, where scholars came from all over the world to study. Let\'s explore!',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },

    // ─── Section 1: Legends & Stories ────────────────────────────
    {
      id: 'legends',
      icon: '\u{1F4D6}',
      title: 'Legends & Stories of Old Mali',
      readAloudBlocks: [
        {
          id: 'legends-intro-text',
          paragraphs: [
            'The story of the Mali Empire begins with one of the greatest legends in all of African history: the epic of Sundiata Keita. This tale has been passed down for nearly 800 years by griots, the oral historians of West Africa, who memorized every detail and passed it from generation to generation.',
            'The epic tells of a young prince who was born unable to walk, yet rose to become the mightiest warrior king West Africa had ever seen. Along the way, he faced a terrifying sorcerer king, united the Mande people, and founded an empire that would last for centuries.',
            'Let\'s meet the legendary figures of this incredible story!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F981}',
          name: 'Sundiata Keita',
          title: 'The Lion King of Mali',
          description:
            'Sundiata Keita was the founder of the Mali Empire. Born with a disability that prevented him from walking as a child, he was mocked and exiled. But Sundiata overcame every obstacle and became a great warrior king. Around 1235 CE, he defeated the sorcerer king Soumaoro Kante at the Battle of Kirina and united the Mande people into the mighty Mali Empire!',
          extraTag: 'Title means: "Lion Prince"',
        },
        {
          emoji: '\u{1F9D9}',
          name: 'Soumaoro Kante',
          title: 'The Sorcerer King of Sosso',
          description:
            'Soumaoro Kante was Sundiata\'s great rival and the feared king of the Sosso kingdom. He was said to possess dark magical powers. He wore magical armor that made him nearly invincible and played a magical instrument called the balafon, a West African wooden xylophone. Only Sundiata had the courage and power to defeat him!',
          extraTag: 'Known as: "The Sorcerer King"',
        },
        {
          emoji: '\u{1F3B6}',
          name: 'The Griots',
          title: 'Living Libraries of West Africa',
          description:
            'The griots were the oral historians of West Africa, living libraries who memorized centuries of history through songs and stories. They preserved the knowledge of kings, battles, and traditions without ever writing them down. A griot could recite the history of an entire family going back hundreds of years! They were trusted advisors to kings and the keepers of cultural memory.',
          extraTag: 'Role: "Keepers of Memory"',
        },
        {
          emoji: '\u{1F54A}\uFE0F',
          name: 'The Mande Charter',
          title: 'One of the World\'s Oldest Declarations of Human Rights',
          description:
            'The Mande Charter, also known as the Kouroukan Fouga, is one of the world\'s oldest declarations of human rights. It was proclaimed by Sundiata Keita after he founded the Mali Empire. The charter declared principles of peace, justice, and the sanctity of human life. It organized society, abolished slavery among the Mande people, and established rules for fair governance!',
          extraTag: 'Also called: "Kouroukan Fouga"',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Sundiata\'s story is believed to have inspired Disney\'s "The Lion King"! Just like Simba, Sundiata was a prince who was exiled from his homeland and had to return to reclaim his rightful throne. Even his title, "Lion Prince," echoes the movie!',
        },
      ],
      videos: [
        {
          youtubeId: 'O3YJMaL55TM',
          title: 'Mansa Musa, One of the Wealthiest People Who Ever Lived',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'UkayShPilkw',
          title: 'The Mali Empire - Extra History - Part 1',
          channelName: 'Extra History',
        },
        {
          youtubeId: 'YPytwp5ll9g',
          title: 'The Mali Empire - Extra History - Part 2',
          channelName: 'Extra History',
        },
      ],
      quizIds: ['mali-q1a', 'mali-q1b', 'mali-q1c'],
    },

    // ─── Section 2: Great Rulers ─────────────────────────────────
    {
      id: 'rulers',
      icon: '\u{1F451}',
      title: 'Great Rulers of the Mali Empire',
      readAloudBlocks: [
        {
          id: 'rulers-intro-text',
          paragraphs: [
            'After Sundiata founded the Mali Empire, a line of powerful rulers called Mansas (meaning "kings of kings") led the empire to even greater heights. The most famous of all was Mansa Musa, who became the richest person in all of history!',
            'The Mali Empire\'s rulers were known not just for their wealth, but for their wisdom, their commitment to learning, and their ability to govern a vast empire that stretched across West Africa. Travelers from far-away lands visited Mali and wrote in amazement about what they found.',
            'Let\'s meet the rulers and travelers who made Mali famous across the world!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4B0}',
          name: 'Mansa Musa',
          title: 'The Richest Person in ALL of History',
          description:
            'Mansa Musa is considered the richest person who ever lived. His wealth was so enormous it\'s almost impossible to calculate in today\'s money. In 1324, he made a legendary pilgrimage to Mecca with a caravan of 60,000 people and 80 camels carrying tons of gold. When he passed through Egypt and gave away gold to the poor, he accidentally crashed the Egyptian economy for 10 years because there was suddenly too much gold!',
        },
        {
          emoji: '\u{1F9ED}',
          name: 'Ibn Battuta',
          title: 'The Great Moroccan Traveler',
          description:
            'Ibn Battuta was a famous Moroccan explorer who traveled over 75,000 miles across the medieval world. In 1352, he visited the Mali Empire and wrote detailed accounts of its wealth, organization, and justice system. He was impressed by the safety of the roads, the discipline of the people, and the fairness of the courts. His writings are one of our best sources of knowledge about medieval Mali!',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Mansa Sulayman',
          title: 'Keeper of the Empire',
          description:
            'Mansa Sulayman was Mansa Musa\'s brother who took the throne after Musa\'s son Mansa Maghan I ruled for about four years. He continued building Mali\'s power and prestige. He maintained the empire\'s vast trading networks and kept the government running smoothly. He was the ruler who hosted Ibn Battuta during his famous visit. Sulayman proved that Mali\'s greatness didn\'t depend on just one ruler but was built on strong institutions!',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Mansa Musa was so rich that when he gave away gold in Egypt during his pilgrimage to Mecca, he crashed the price of gold for a decade! The Egyptian economy took about 10 years to recover from all the extra gold he flooded into their markets!',
        },
      ],
      videos: [
        {
          youtubeId: '4-Un2xx6Pzo',
          title: 'The Mali Empire - Extra History - Part 3',
          channelName: 'Extra History',
        },
        {
          youtubeId: 'lkTF0TGBDNc',
          title: 'The Mali Empire - Extra History - Part 4',
          channelName: 'Extra History',
        },
      ],
      quizIds: ['mali-q2a', 'mali-q2b', 'mali-q2c', 'mali-q2d'],
    },

    // ─── Section 3: Trade & Timbuktu ─────────────────────────────
    {
      id: 'trade',
      icon: '\u{1F42B}',
      title: 'Trade & the Great City of Timbuktu',
      readAloudBlocks: [
        {
          id: 'trade-intro-text',
          paragraphs: [
            'The Mali Empire\'s wealth came from controlling the trans-Saharan trade routes that connected West Africa to North Africa and beyond. Enormous camel caravans crossed the scorching Sahara Desert, carrying gold from the south and salt from the north. These two goods were so valuable that they were literally traded pound for pound!',
            'At the heart of this trade network sat the legendary city of Timbuktu. Far from being a remote outpost, Timbuktu was one of the greatest centers of learning in the entire world. Its famous Sankore Mosque and University attracted up to 25,000 students and scholars from across Africa and the Islamic world!',
            'Let\'s journey along the trade routes and explore the wonders of Timbuktu!',
          ],
        },
        {
          id: 'trade-outro-text',
          paragraphs: [
            'The trans-Saharan trade routes were the highways of the medieval world. Camel caravans sometimes numbering thousands of camels would make the dangerous journey across the Sahara Desert, traveling from oasis to oasis. Gold flowed north while salt, books, and other goods flowed south.',
            'Timbuktu\'s Sankore University was one of the world\'s first great universities. Scholars there studied astronomy, mathematics, medicine, law, and theology. The city\'s libraries held hundreds of thousands of manuscripts, many of which survive today. Timbuktu proved that Africa was a center of learning and civilization long before European explorers ever arrived.',
          ],
        },
      ],
      timeline: [
        {
          year: 'c. 1235 CE',
          title: 'Sundiata Founds the Mali Empire',
          description:
            'After defeating Soumaoro Kante at the Battle of Kirina, Sundiata Keita united the Mande people and founded the Mali Empire. He established the Mande Charter and built the foundations of one of Africa\'s greatest civilizations.',
        },
        {
          year: 'c. 1280 CE',
          title: 'Timbuktu Becomes a Major Trading Center',
          description:
            'Timbuktu grew into one of the most important trading cities in the world. Located at the edge of the Sahara Desert, it became the meeting point for camel caravans carrying gold, salt, books, and other precious goods.',
        },
        {
          year: '1312 CE',
          title: 'Mansa Musa Becomes Ruler',
          description:
            'Mansa Musa took the throne of the Mali Empire and would go on to become the richest person in all of history. Under his rule, Mali reached the height of its power and influence.',
        },
        {
          year: '1324 CE',
          title: 'Mansa Musa\'s Legendary Pilgrimage to Mecca',
          description:
            'Mansa Musa embarked on his famous hajj (pilgrimage) to Mecca with a caravan of 60,000 people and 80 camels loaded with gold. His generosity along the way crashed the Egyptian economy and put Mali on the maps of the entire world.',
        },
        {
          year: '1352 CE',
          title: 'Ibn Battuta Visits Mali',
          description:
            'The great Moroccan traveler Ibn Battuta visited the Mali Empire and wrote detailed accounts of its wealth, justice, and organization. His writings remain one of the most important historical records of medieval West Africa.',
        },
        {
          year: 'c. 1600 CE',
          title: 'The Mali Empire Declines',
          description:
            'After centuries of greatness, the Mali Empire slowly declined due to internal conflicts, the rise of neighboring empires like the Songhai, and shifts in trade routes. But its cultural legacy, stories, and traditions live on to this day.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Salt was literally worth its weight in gold in parts of Africa! In the Sahara Desert, where salt was scarce in the south and gold was scarce in the north, traders would exchange equal weights of salt and gold. Imagine trading a block of salt for the same weight in gold!',
        },
      ],
      videos: [
        {
          youtubeId: '-DWZUvDleSQ',
          title: 'The Mali Empire - Extra History - Part 5',
          channelName: 'Extra History',
        },
        {
          youtubeId: 'jvnU0v6hcUo',
          title: 'Mansa Musa and Islam in Africa',
          channelName: 'Crash Course',
        },
      ],
      quizIds: ['mali-q3a', 'mali-q3b', 'mali-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Legends & Stories
    {
      id: 'mali-q1a',
      sectionId: 'legends',
      title: 'Quick Quiz Time!',
      question:
        'What disability did Sundiata Keita overcome before becoming the great Lion King of Mali?',
      options: [
        { text: 'He was born blind', isCorrect: false },
        {
          text: 'He was unable to walk as a child',
          isCorrect: true,
        },
        { text: 'He could not speak until age 10', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mali-q1b',
      sectionId: 'legends',
      title: 'Griot Challenge!',
      question:
        'What were the griots of West Africa, and how did they preserve history?',
      options: [
        {
          text: 'They were scribes who wrote history on papyrus scrolls',
          isCorrect: false,
        },
        {
          text: 'They were oral historians who memorized centuries of history through songs and stories',
          isCorrect: true,
        },
        {
          text: 'They were painters who recorded history on cave walls',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mali-q1c',
      sectionId: 'legends',
      title: 'Mande Charter Quiz!',
      question:
        'What was the Mande Charter proclaimed by Sundiata Keita?',
      options: [
        {
          text: 'A declaration of war against all neighboring kingdoms',
          isCorrect: false,
        },
        {
          text: 'One of the world\'s oldest declarations of human rights, establishing peace and justice',
          isCorrect: true,
        },
        {
          text: 'A trade agreement with the Egyptian Empire',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Great Rulers
    {
      id: 'mali-q2a',
      sectionId: 'rulers',
      title: 'Quick Quiz Time!',
      question:
        'Why is Mansa Musa considered the richest person in all of history?',
      options: [
        {
          text: 'He discovered a mountain made entirely of diamonds',
          isCorrect: false,
        },
        {
          text: 'He controlled Mali\'s vast gold mines and had wealth almost impossible to calculate',
          isCorrect: true,
        },
        {
          text: 'He conquered Europe and took all their treasure',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mali-q2b',
      sectionId: 'rulers',
      title: 'Pilgrimage Challenge!',
      question:
        'What happened when Mansa Musa gave away gold in Egypt during his pilgrimage to Mecca in 1324?',
      options: [
        {
          text: 'Egypt became the richest country in the world',
          isCorrect: false,
        },
        {
          text: 'He crashed the price of gold and damaged the Egyptian economy for about 10 years',
          isCorrect: true,
        },
        {
          text: 'The Egyptians refused to accept his gold',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mali-q2c',
      sectionId: 'rulers',
      title: 'Explorer Quiz!',
      question:
        'Who was Ibn Battuta and why is he important to the history of Mali?',
      options: [
        {
          text: 'A Moroccan traveler who visited Mali and wrote detailed accounts of its wealth and organization',
          isCorrect: true,
        },
        {
          text: 'A Chinese explorer who brought silk to Mali',
          isCorrect: false,
        },
        {
          text: 'A Roman general who tried to conquer Mali',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mali-q2d',
      sectionId: 'rulers',
      title: 'Ruler Challenge!',
      question:
        'How many people traveled with Mansa Musa on his famous pilgrimage to Mecca?',
      options: [
        { text: 'About 1,000 people', isCorrect: false },
        { text: 'About 60,000 people', isCorrect: true },
        { text: 'About 500,000 people', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Trade & Timbuktu
    {
      id: 'mali-q3a',
      sectionId: 'trade',
      title: 'Quick Quiz Time!',
      question:
        'What made Timbuktu one of the greatest centers of learning in the medieval world?',
      options: [
        {
          text: 'It had the world\'s largest army',
          isCorrect: false,
        },
        {
          text: 'Its Sankore University attracted up to 25,000 students and scholars from across Africa and the Islamic world',
          isCorrect: true,
        },
        {
          text: 'It was built entirely out of gold',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mali-q3b',
      sectionId: 'trade',
      title: 'Trade Challenge!',
      question:
        'What two goods were the most important in the trans-Saharan trade?',
      options: [
        { text: 'Silk and spices', isCorrect: false },
        { text: 'Gold and salt', isCorrect: true },
        { text: 'Iron and copper', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mali-q3c',
      sectionId: 'trade',
      title: 'Saharan Routes Quiz!',
      question:
        'How were goods transported across the vast Sahara Desert on the trans-Saharan trade routes?',
      options: [
        {
          text: 'By enormous camel caravans traveling from oasis to oasis',
          isCorrect: true,
        },
        {
          text: 'By sailing ships along the coast',
          isCorrect: false,
        },
        {
          text: 'By horse-drawn wagons on paved roads',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'mali-essay',
    prompt:
      'What aspect of the Mali Empire impressed you the most?',
    description:
      'Now it\'s your turn! Think about everything you\'ve learned about the Mali Empire. Was it the legendary story of Sundiata? The incredible wealth of Mansa Musa? The great university at Timbuktu? Or the griots who kept history alive through songs? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Wonderful thinking! Your answer has been saved. You\'re a true scholar of the Mali Empire!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'mali-reward',
    title: 'Lead the Gold Caravan!',
    description:
      'Guide your own camel caravan across the Sahara Desert, trading gold and salt along the ancient trans-Saharan trade routes! Navigate from oasis to oasis, barter with merchants, and see if you can make it to Timbuktu with your goods intact!',
    lockMessage: 'Caravan Route Locked!',
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
    type: 'gold-caravan',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Gold Caravan! You\'re a true scholar of the Mali Empire!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve journeyed across West Africa and discovered the wonders of the Mali Empire!',
      'You heard the legendary tale of Sundiata Keita, the Lion King who overcame disability to found one of the greatest empires in history. You learned about the griots, the living libraries who kept centuries of history alive through songs and stories. And you discovered the Mande Charter, one of the world\'s oldest declarations of human rights.',
      'You met Mansa Musa, the richest person who ever lived, whose pilgrimage to Mecca was so lavish he crashed the Egyptian economy! You learned about Ibn Battuta, the great traveler who wrote about Mali\'s wealth and justice, and Mansa Sulayman, who kept the empire strong.',
      'And you explored the wonders of Timbuktu, home to one of the world\'s first great universities, and the trans-Saharan trade routes where gold and salt were worth their weight in each other. Camel caravans crossed the mighty Sahara, connecting civilizations and spreading knowledge.',
      'Keep exploring history! Every civilization has amazing stories waiting to be discovered!',
    ],
  },
};
