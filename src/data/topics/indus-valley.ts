import type { Topic } from '../types';

export const indusValley: Topic = {
  id: 'indus-valley',
  slug: 'indus-valley',
  title: 'The Indus Valley Civilization',
  subtitle:
    'Discover the world\u2019s first planned cities, where people had indoor plumbing 4,000 years before modern Europe!',
  status: 'active',
  themeId: 'indus-valley',
  heroIcons: ['\u{1F3D9}\uFE0F', '\u{1F6BF}', '\u{1F402}'],
  navItems: [
    { id: 'cities-before-history', icon: '\u{1F3D9}\uFE0F', label: 'Lost Cities' },
    { id: 'great-cities', icon: '\u{1F9F1}', label: 'Great Cities' },
    { id: 'first-plumbing', icon: '\u{1F6BF}', label: 'First Plumbing' },
    { id: 'mystery-script', icon: '\u{1F524}', label: 'Mystery Script' },
    { id: 'trade-daily-life', icon: '\u{1F402}', label: 'Trade & Life' },
    { id: 'disappearance', icon: '\u{1F3DC}\uFE0F', label: 'Disappearance' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'cities-before-history',
      icon: '\u{1F3D9}\uFE0F',
      title: 'Cities Before History',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Imagine digging through layers of dusty earth in a hot, dry part of South Asia. You scrape away centuries of sand and suddenly \u2014 you see it: the perfectly straight edge of a brick wall, still standing after nearly 5,000 years! You keep digging and find another wall, then another, then an entire street stretching out in a perfect line. You\'ve just uncovered one of the oldest and most mysterious cities in all of human history!',
            'This is exactly what happened in the 1920s when archaeologists in British India unearthed something astonishing: the ruins of enormous cities that were older than the Great Pyramids of Egypt! These weren\'t rough, tumbledown settlements. They had perfectly straight streets laid out in a grid pattern, houses with indoor bathrooms, and a city-wide drainage system that wouldn\'t be matched in Europe for thousands of years!',
            'Welcome to the Indus Valley Civilization \u2014 a vast, brilliant society where over five million people lived in some of the most advanced cities the ancient world had ever seen. Stretching across what is now Pakistan and northwest India, along the mighty Indus River, this civilization thrived from about 2600 to 1900 BCE. That\'s roughly 4,600 years ago!',
            'The most amazing part? We still can\'t read their writing. Their script remains one of archaeology\'s greatest unsolved mysteries. Get ready to explore ancient cities, marvel at engineering genius, and try to crack a code that has stumped experts for over a century!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'n7ndRwqJYDM',
          title: 'Indus Valley Civilization \u2014 Crash Course World History #2',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: The Great Cities ─────────────────────────────
    {
      id: 'great-cities',
      icon: '\u{1F9F1}',
      title: 'The Great Cities: Harappa and Mohenjo-daro',
      readAloudBlocks: [
        {
          id: 'great-cities-text',
          paragraphs: [
            'The two greatest cities of the Indus Valley were Harappa and Mohenjo-daro, each home to somewhere between 30,000 and 60,000 people. That might not sound like a lot compared to modern cities, but 4,600 years ago, these were absolutely enormous! Most people on Earth at that time still lived in tiny farming villages.',
            'What made these cities truly extraordinary was their planning. Imagine looking down from above: you\'d see perfectly straight streets crossing each other at right angles, forming a neat grid pattern \u2014 just like modern cities such as New York! This was the very first known urban planning in human history. Nobody else on Earth was building cities this organized.',
            'Every building in the city was made from standardized, kiln-fired bricks. Here\'s the incredible part: the bricks were all exactly the same size, not just within one city, but across different cities hundreds of kilometers apart! This means the Indus people had a system of measurements and standards that covered their entire civilization.',
            'Each city had two main parts: a raised citadel on the western side, probably used for important public buildings and ceremonies, and a lower residential area to the east where most people lived. Houses could be up to two stories tall and had thick walls to keep out the heat. And at the heart of Mohenjo-daro stood the most famous structure of all \u2014 the Great Bath, a massive pool 12 meters long and 7 meters wide, waterproofed with natural tar called bitumen. Scholars think it may have been used for ritual bathing or important community gatherings.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3D7}\uFE0F',
          name: 'The Master Planners',
          title: 'City Builders',
          description:
            'The unknown architects who designed grid-pattern cities with standardized bricks, indoor plumbing, and covered drains \u2014 4,000 years before modern city planning! Their names have been lost to history, but their genius lives on in every ruin.',
          extraTag: 'Achievement: First Urban Planners',
        },
        {
          emoji: '\u{1F524}',
          name: 'The Script Keepers',
          title: 'Mystery Writers',
          description:
            'The scribes who created over 400 unique symbols carved on seals and pottery. No one has cracked their code yet \u2014 it\'s one of history\'s greatest unsolved puzzles! Computer analysis suggests the symbols follow real language-like patterns.',
          extraTag: 'Mystery: Undeciphered Script',
        },
        {
          emoji: '\u{2696}\uFE0F',
          name: 'The Traders',
          title: 'Merchant Voyagers',
          description:
            'Indus merchants who traded beautiful beads, cotton cloth, and carved stone seals with faraway Mesopotamia (modern Iraq), using standardized stone weights to keep trade fair across vast distances!',
          extraTag: 'Trade Route: Indus to Mesopotamia',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Mohenjo-daro and Harappa were thriving cities around 2600 BCE \u2014 that\'s about 4,600 years ago, before the Great Pyramid of Giza was even finished! These cities were some of the most advanced in the entire ancient world.',
        },
      ],
      videos: [
        {
          youtubeId: 'QUng-iHhSzU',
          title: 'Mohenjo Daro 101',
          channelName: 'National Geographic',
        },
      ],
      quizIds: ['indus-q1a', 'indus-q1b', 'indus-q1c'],
    },

    // ─── Section 2: The World's First Plumbing ──────────────────
    {
      id: 'first-plumbing',
      icon: '\u{1F6BF}',
      title: 'The World\u2019s First Plumbing: Drains, Baths, and Toilets',
      readAloudBlocks: [
        {
          id: 'plumbing-text',
          paragraphs: [
            'If you think indoor plumbing is a modern invention, think again! The people of the Indus Valley had indoor bathrooms and toilets connected to a city-wide drainage system nearly 4,500 years ago. Most European cities didn\'t have proper sewers until the 1800s \u2014 that\'s over 4,000 years later!',
            'Almost every single house in the Indus cities had its own private bathroom and toilet. Wastewater from homes flowed through clay pipes into covered drains that ran along the streets. These street drains were covered by large stone slabs that could be easily lifted for cleaning and maintenance. The Indus engineers had even thought about hygiene and maintenance \u2014 brilliant!',
            'Wastewater was carefully channeled away from living areas to prevent disease. Some houses even had separate chutes for trash. Fresh water wells were found throughout the cities, so everyone had access to clean drinking water. The level of sanitation planning was truly extraordinary for any ancient civilization.',
            'And then there was the Great Bath of Mohenjo-daro \u2014 the crown jewel of Indus water engineering. This massive pool was carefully waterproofed with a thick layer of natural tar (bitumen) so not a single drop of water could seep through. Steps led down into the pool from both ends. It may have been the world\'s first public swimming pool, but scholars believe it was more likely used for important religious or purification rituals.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Indus people had indoor toilets connected to underground drains around 2500 BCE \u2014 most European cities didn\'t have proper sewers until the 1800s, over 4,000 years later! The city of London was still dumping waste into the Thames River in the 1850s!',
        },
      ],
      videos: [],
      quizIds: ['indus-q2a', 'indus-q2b'],
    },

    // ─── Section 3: The Mystery Script ──────────────────────────
    {
      id: 'mystery-script',
      icon: '\u{1F524}',
      title: 'The Mystery Script: A Code Nobody Can Crack',
      readAloudBlocks: [
        {
          id: 'script-text',
          paragraphs: [
            'Here\'s one of the greatest unsolved puzzles in all of archaeology: the Indus Valley script. Over 4,000 inscribed objects have been discovered \u2014 small square stone seals, pottery fragments, and clay tablets covered in mysterious symbols. And after more than 100 years of trying, nobody has been able to figure out what they say!',
            'The script contains somewhere between 400 and 600 distinct symbols. That\'s too many for a simple alphabet (English only has 26 letters!) but too few for a pictographic language like ancient Chinese (which has thousands of characters). Most inscriptions are tantalizingly short \u2014 just 4 or 5 symbols on average. It\'s like trying to understand an entire language from reading only bumper stickers!',
            'The symbols are found mainly on small square stamp seals, many of which feature beautiful carvings of animals: powerful bulls, majestic elephants, fierce tigers, and a mysterious creature that looks like a unicorn! These seals were probably used to stamp clay tags on bundles of trade goods \u2014 like an ancient shipping label.',
            'Scientists have fed the symbols into powerful computers to look for patterns, and they\'ve found something exciting: the symbols do seem to follow language-like rules, with certain symbols appearing more often at the beginning or end of inscriptions. This suggests it really is a language \u2014 we just can\'t read it yet. Maybe one day, you could be the one to finally crack the code!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Many Indus seals show an animal that looks like a unicorn \u2014 a bull-like creature with a single horn! Nobody knows if it represents a real animal seen from the side, a mythical beast, or something else entirely. It\'s the most common animal on the seals!',
        },
      ],
      videos: [],
      quizIds: ['indus-q3a', 'indus-q3b'],
    },

    // ─── Section 4: Trade and Daily Life ────────────────────────
    {
      id: 'trade-daily-life',
      icon: '\u{1F402}',
      title: 'Trade, Toys, and Daily Life',
      readAloudBlocks: [
        {
          id: 'trade-text',
          paragraphs: [
            'The Indus Valley people were incredible traders who connected with civilizations thousands of kilometers away! They made beautiful beads from semi-precious stones, wove fine cotton cloth (they were among the first people in the world to grow cotton!), and carved exquisite stone seals. These goods traveled all the way to ancient Mesopotamia \u2014 modern-day Iraq \u2014 where archaeologists have found Indus trade tags in the ruins of Mesopotamian cities.',
            'To keep trade fair across their vast civilization, the Indus people developed a system of standardized stone weights made from a material called chert. These weights were carefully crafted to exact measurements and were the same across all their cities. Imagine being a merchant in Harappa and knowing that the weights used in Mohenjo-daro, hundreds of kilometers away, were exactly the same as yours!',
            'Daily life was rich and varied. People farmed wheat, barley, peas, and sesame, and raised cattle, buffalo, sheep, and goats. Skilled craftspeople made stunning jewelry from gold, copper, and colorful semi-precious stones. The famous "Dancing Girl" bronze statue \u2014 a confident young woman with bangles on her arm \u2014 shows incredible metalworking skill using a technique called lost-wax casting, where a wax model is coated in clay and then melted away to create a mold.',
            'And what about kids? Indus Valley children played with toy carts that had actual working wheels \u2014 some of the oldest wheeled toys ever found! They also had clay animal figurines, dice, and what appear to be ancient board games. Even 4,600 years ago, kids loved to play!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Indus Valley kids played with toy carts that had working wheels \u2014 some of the oldest wheeled toys ever found! They also had dice and board games. Fun has been a part of childhood for thousands of years!',
        },
      ],
      videos: [
        {
          youtubeId: 'KhDY4KJuvc0',
          title: 'Indus Valley Civilization Facts',
          channelName: 'MocomiKids',
        },
      ],
      quizIds: ['indus-q4a', 'indus-q4b'],
    },

    // ─── Section 5: The Great Disappearance ─────────────────────
    {
      id: 'disappearance',
      icon: '\u{1F3DC}\uFE0F',
      title: 'The Great Disappearance',
      readAloudBlocks: [
        {
          id: 'disappearance-intro-text',
          paragraphs: [
            'For centuries, the cities of the Indus Valley hummed with life \u2014 merchants traded in bustling markets, children played in the streets, and water flowed through the ingenious drainage systems. But around 1900 BCE, something began to change. Slowly but surely, the great cities started to empty. Houses were abandoned, streets fell silent, and eventually the magnificent cities of Harappa and Mohenjo-daro were left to crumble under the sun.',
            'What happened? Unlike many ancient civilizations, the Indus Valley wasn\'t destroyed by invaders or conquered by a mighty army. Instead, scientists now believe it was nature itself that brought the civilization to its knees. Studies of ancient climate data reveal that devastating droughts struck the region, lasting between 25 and 90 years at a time. Without enough rainfall, crops withered, rivers shrank, and life became impossible.',
            'The Saraswati River \u2014 also known as the Ghaggar-Hakra \u2014 was one of the civilization\'s most important water sources. But as the climate changed, this once-mighty river dried up completely, leaving behind a dusty, lifeless riverbed. Without water, the cities along its banks simply couldn\'t survive.',
          ],
        },
        {
          id: 'disappearance-outro-text',
          paragraphs: [
            'The people didn\'t just vanish, though! They migrated eastward toward the Ganges River basin, where water was still plentiful. Smaller settlements continued for centuries, and many aspects of Indus culture \u2014 their crafts, their farming techniques, their traditions \u2014 lived on in the communities they joined. But the grand, perfectly planned cities were never rebuilt.',
            'The Indus Valley Civilization was completely forgotten by the wider world until the 1820s, when a man named Charles Masson noticed the ruins of Harappa. But it wasn\'t until the 1920s that Sir John Marshall\'s archaeological team fully excavated Mohenjo-daro and Harappa, revealing to the world a lost civilization that had once rivaled ancient Egypt and Mesopotamia!',
            'Today, archaeologists continue to dig and discover. New sites are still being found, and scientists are working harder than ever to crack the mysterious Indus script. The story of the Indus Valley Civilization is far from over \u2014 there are still secrets buried in the earth, waiting for the next generation of explorers to uncover them!',
          ],
        },
      ],
      timeline: [
        {
          year: '~7000 BCE',
          title: 'First Farming',
          description:
            'Early farming settlements appear in the Indus region at Mehrgarh, among the oldest farming communities in the world.',
        },
        {
          year: '~3300 BCE',
          title: 'Early Harappan',
          description:
            'Small towns begin to grow along the Indus and Saraswati rivers, laying the foundations for great cities to come.',
        },
        {
          year: '~2600 BCE',
          title: 'Mature Phase Begins',
          description:
            'The great cities of Harappa and Mohenjo-daro reach their peak with advanced urban planning, standardized bricks, and grid-pattern streets.',
        },
        {
          year: '~2500 BCE',
          title: 'Great Bath Built',
          description:
            'The Great Bath and massive public buildings are constructed at Mohenjo-daro, showcasing incredible water engineering.',
        },
        {
          year: '~2500 BCE',
          title: 'Long-Distance Trade',
          description:
            'Indus seals and goods appear in Mesopotamian cities \u2014 trade networks now span thousands of kilometers.',
        },
        {
          year: '~1900 BCE',
          title: 'Decline Begins',
          description:
            'Prolonged droughts and the drying Saraswati River force people to abandon the great cities and migrate eastward.',
        },
        {
          year: '~1300 BCE',
          title: 'Civilization Ends',
          description:
            'The last Indus Valley settlements are abandoned, but their cultural legacy lives on in the communities they joined.',
        },
        {
          year: '1826 CE',
          title: 'First Discovery',
          description:
            'Charles Masson notices the ruins of Harappa but doesn\'t realize he\'s looking at a civilization older than ancient Egypt.',
        },
        {
          year: '1920s CE',
          title: 'Excavation Begins',
          description:
            'Sir John Marshall\'s team excavates Mohenjo-daro and Harappa, revealing a lost civilization to the astonished world.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Indus Valley Civilization covered an area of about 1.3 million square kilometers \u2014 larger than ancient Egypt and Mesopotamia combined! It stretched from the Arabian Sea coast to the foothills of the Himalayas.',
        },
      ],
      videos: [
        {
          youtubeId: 'oMXuzp3XcB8',
          title: 'Decline of the Harappan Civilization',
          channelName: 'MocomiKids',
        },
      ],
      quizIds: ['indus-q5a', 'indus-q5b'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: The Great Cities
    {
      id: 'indus-q1a',
      sectionId: 'great-cities',
      title: 'Quick Quiz Time!',
      question: 'What were the two largest cities of the Indus Valley Civilization?',
      options: [
        { text: 'Athens and Sparta', isCorrect: false },
        { text: 'Harappa and Mohenjo-daro', isCorrect: true },
        { text: 'Delhi and Mumbai', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'indus-q1b',
      sectionId: 'great-cities',
      title: 'City Planning Challenge!',
      question: 'What made the Indus cities remarkable for their time?',
      options: [
        { text: 'They were built underground', isCorrect: false },
        { text: 'Grid-pattern streets and indoor plumbing', isCorrect: true },
        { text: 'They were made entirely of gold', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'indus-q1c',
      sectionId: 'great-cities',
      title: 'Great Bath Quiz!',
      question: 'How large was the Great Bath of Mohenjo-daro?',
      options: [
        { text: 'The size of a bathtub', isCorrect: false },
        { text: '100 meters long', isCorrect: false },
        { text: '12 meters long and 7 meters wide', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: First Plumbing
    {
      id: 'indus-q2a',
      sectionId: 'first-plumbing',
      title: 'Plumbing Quiz!',
      question: 'What was special about the bricks used in Indus cities?',
      options: [
        { text: 'They glowed in the dark', isCorrect: false },
        { text: 'They were all the same standardized size across different cities', isCorrect: true },
        { text: 'They could float on water', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'indus-q2b',
      sectionId: 'first-plumbing',
      title: 'Sanitation Challenge!',
      question:
        'When did the Indus people have indoor toilets connected to drains?',
      options: [
        { text: 'Around 2500 BCE \u2014 over 4,000 years before most of Europe', isCorrect: true },
        { text: 'In the year 1800 CE, same as Europe', isCorrect: false },
        { text: 'They never had indoor plumbing', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Mystery Script
    {
      id: 'indus-q3a',
      sectionId: 'mystery-script',
      title: 'Script Quiz!',
      question: 'Why is the Indus script still mysterious?',
      options: [
        { text: 'It was written in invisible ink', isCorrect: false },
        { text: 'No one has been able to decipher it', isCorrect: true },
        { text: 'It was written in English', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'indus-q3b',
      sectionId: 'mystery-script',
      title: 'Symbol Challenge!',
      question: 'What technique was used to make the famous "Dancing Girl" statue?',
      options: [
        { text: 'Stone carving', isCorrect: false },
        { text: 'Lost-wax casting', isCorrect: true },
        { text: '3D printing', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Trade and Daily Life
    {
      id: 'indus-q4a',
      sectionId: 'trade-daily-life',
      title: 'Trade Quiz!',
      question: 'What did Indus Valley people use to keep trade fair?',
      options: [
        { text: 'Gold coins', isCorrect: false },
        { text: 'Standardized stone weights', isCorrect: true },
        { text: 'Credit cards', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'indus-q4b',
      sectionId: 'trade-daily-life',
      title: 'Kids & Play Quiz!',
      question: 'What did Indus Valley children play with?',
      options: [
        { text: 'Nothing \u2014 kids didn\'t play', isCorrect: false },
        { text: 'Toy carts with working wheels and board games', isCorrect: true },
        { text: 'Video games', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: The Great Disappearance
    {
      id: 'indus-q5a',
      sectionId: 'disappearance',
      title: 'Disappearance Quiz!',
      question: 'What likely caused the decline of the Indus Valley Civilization?',
      options: [
        { text: 'An alien invasion', isCorrect: false },
        { text: 'Prolonged droughts and rivers drying up', isCorrect: true },
        { text: 'A massive earthquake', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'indus-q5b',
      sectionId: 'disappearance',
      title: 'Final Challenge!',
      question: 'Where have Indus trade goods been found?',
      options: [
        { text: 'In the Arctic', isCorrect: false },
        { text: 'In ancient Mesopotamia (modern Iraq)', isCorrect: true },
        { text: 'On the Moon', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'indus-essay',
    prompt:
      'Imagine you are an archaeologist who has just discovered the ruins of Mohenjo-daro. As you dig through the layers of earth, what do you find?',
    description:
      'Think about everything you\'ve learned about the Indus Valley. Describe the streets, the houses, the Great Bath, and the mysterious seals with their undeciphered symbols. What clues do these objects give you about how people lived here thousands of years ago? Use what you\'ve learned to bring your discovery to life! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Amazing work! Your archaeological report is fascinating. You\'re a true Indus Valley explorer!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'indus-reward',
    title: 'City Planner!',
    description:
      'Design your own Indus Valley city from scratch! Draw grid streets, place houses and the Great Bath using standardized bricks, connect buildings to the drainage system, and set up market stalls with trade seals. Watch your completed city come to life with animated citizens, ox carts, and children playing with wheeled toys!',
    lockMessage: 'City Plans Locked!',
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
    type: 'city-planner',
    celebrationMessage:
      'You\'ve built an amazing Indus Valley city! Your grid streets and drainage system would make Mohenjo-daro proud! \u{1F3D9}\uFE0F\u{1F6BF}\u2728',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through one of the most mysterious and impressive civilizations in all of history!',
      'You discovered how the Indus Valley people built the world\'s first planned cities \u2014 with perfectly straight streets, standardized bricks, and a level of organization that wouldn\'t be seen again for thousands of years. You explored the incredible Great Bath of Mohenjo-daro and marveled at a civilization that had indoor plumbing 4,000 years before most of Europe!',
      'You tried to crack the mysterious Indus script \u2014 over 400 symbols that have stumped the world\'s greatest code-breakers for more than a century. You learned how Indus merchants traded beads, cotton, and carved seals with distant Mesopotamia, using standardized weights to keep everything fair.',
      'You discovered that even 4,600 years ago, kids played with wheeled toys and board games. And you learned the bittersweet story of how climate change and drying rivers brought this magnificent civilization to a slow end \u2014 but not before its people carried their knowledge and culture to new lands.',
      'The Indus Valley Civilization proves that human ingenuity has been extraordinary for thousands of years. And with their script still unread, there are discoveries waiting to be made. Maybe one day, you\'ll be the one to unlock their secrets!',
      'Keep exploring history! Every civilization has amazing stories waiting to be discovered!',
    ],
  },
};
