import type { Topic } from '../types';

export const foodsThatChangedTheWorld: Topic = {
  id: 'foods-that-changed-the-world',
  slug: 'foods-that-changed-the-world',
  title: 'Foods That Changed the World',
  subtitle:
    'How Spices, Sugar & Potatoes Shaped History',
  status: 'active',
  themeId: 'foods-that-changed-the-world',
  heroIcons: ['\u{1F336}\uFE0F', '\u{1F30D}', '\u{1F954}'],
  navItems: [
    { id: 'spice-wars', icon: '\u{1F336}\uFE0F', label: 'Spice Wars' },
    { id: 'sugar-slavery', icon: '\u{1F36C}', label: 'Sugar & Slavery' },
    { id: 'columbian-exchange', icon: '\u{1F30E}', label: 'The Columbian Exchange' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F30D}',
      title: 'Welcome, Food Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Did you know that a tiny dried berry once convinced explorers to sail across deadly oceans? Or that a sweet plant caused one of the darkest chapters in human history? Food isn\'t just something we eat \u2014 it has shaped empires, started wars, and connected every corner of the globe!',
            'In this adventure, you\'ll discover how pepper, cinnamon, and nutmeg drove brave explorers to risk everything on dangerous voyages. You\'ll learn the bitter truth about sugar and how it changed millions of lives forever. And you\'ll find out how the Columbian Exchange \u2014 the great swap of foods between the Old World and the New World \u2014 transformed the way people eat on every continent.',
            'Get ready to travel through time and taste the foods that changed the world!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'vn3e37VWc0k',
          title: 'The Silk Road: Connecting the Ancient World Through Trade',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'LaLvVc1sS20',
          title: 'The History of Tea',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Spice Wars ──────────────────────────────────
    {
      id: 'spice-wars',
      icon: '\u{1F336}\uFE0F',
      title: 'The Spice Wars: Pepper, Cinnamon & Nutmeg',
      readAloudBlocks: [
        {
          id: 'spice-wars-intro',
          paragraphs: [
            'Imagine a world where a handful of pepper was worth more than gold. That was the reality for thousands of years! Spices like pepper, cinnamon, and nutmeg were so rare and valuable in Europe that people called them "black gold." They traveled thousands of miles from the tropical forests of Asia to the tables of wealthy Europeans.',
            'But why were spices so special? Before refrigerators existed, spices helped preserve food and mask the taste of meat that was going bad. They were also used as medicine and were a symbol of incredible wealth. A bag of pepper could buy you a house!',
            'The desire for spices drove the entire Age of Exploration. Portuguese sailors rounded the tip of Africa to reach India. Columbus sailed west trying to find a shortcut to the Spice Islands and accidentally bumped into the Americas instead! The spice trade literally redrew the map of the world.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4A8}',
          name: 'Black Pepper',
          title: 'The King of Spices',
          description:
            'Black pepper comes from the Malabar Coast of India and was so valuable that the ancient Romans used it as currency. When the Visigoths captured Rome in 410 CE, they demanded 3,000 pounds of pepper as part of the ransom! Pepper drove Vasco da Gama to sail around Africa to India in 1498, opening a sea route that changed world trade forever.',
          extraTag: 'Origin: India',
        },
        {
          emoji: '\u{1F33F}',
          name: 'Cinnamon',
          title: 'The Mystery Spice',
          description:
            'Cinnamon comes from the bark of trees in Sri Lanka and was one of the most mysterious spices in history. Arab traders told wild stories about where it came from \u2014 like claiming giant birds carried cinnamon sticks to their nests on high cliffs! They made up these tales to keep their trade routes secret and prices high.',
          extraTag: 'Origin: Sri Lanka',
        },
        {
          emoji: '\u{1F95C}',
          name: 'Nutmeg',
          title: 'The Spice Worth Killing For',
          description:
            'Nutmeg grew on only a tiny group of islands in Indonesia called the Banda Islands. It was so valuable that the Dutch and English fought brutal wars over these islands. In 1667, the English traded their claim to the Banda Islands to the Dutch in exchange for a small island called Manhattan \u2014 yes, the Manhattan in New York City!',
          extraTag: 'Origin: Banda Islands, Indonesia',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In medieval Europe, peppercorns were counted out one by one and used to pay rent and taxes. The term "peppercorn rent" is still used today to describe a very tiny payment!',
        },
      ],
      videos: [
        {
          youtubeId: 'GpO1YR5bsyk',
          title: 'The Mysterious History of Cinnamon',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['food-world-q1a', 'food-world-q1b', 'food-world-q1c'],
    },

    // ─── Section 2: Sugar & Slavery ─────────────────────────────
    {
      id: 'sugar-slavery',
      icon: '\u{1F36C}',
      title: 'Sugar & Slavery: The Bitter Truth',
      readAloudBlocks: [
        {
          id: 'sugar-slavery-intro',
          paragraphs: [
            'Sugar has a sweet taste but a very bitter history. Sugar cane originally grew in Southeast Asia and was first turned into sugar crystals in India around 350 CE. When European explorers tasted sugar, they became obsessed. They called it "white gold" and wanted as much as they could get.',
            'But sugar cane is incredibly hard to grow and harvest. The work is back-breaking, dangerous, and endless. European colonizers set up enormous sugar plantations in the Caribbean, Brazil, and other tropical regions. To work these plantations, they enslaved millions of African people and forced them to labor in brutal conditions.',
            'The sugar trade became one of the most profitable businesses in history, but it was built on unimaginable suffering. By the 1700s, sugar had gone from a rare luxury to something ordinary people put in their tea. The true cost of that sweetness was paid by enslaved people whose stories we must never forget.',
          ],
        },
        {
          id: 'sugar-slavery-outro',
          paragraphs: [
            'The legacy of the sugar trade shaped the cultures, languages, and populations of the Caribbean and the Americas. Many of the vibrant cultures in these regions today \u2014 their music, food, and traditions \u2014 grew from the resilience and creativity of enslaved people and their descendants.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In the 1500s, sugar was so expensive in England that only royalty could afford it. Queen Elizabeth I ate so much sugar that her teeth turned black \u2014 and it actually became fashionable for wealthy people to have blackened teeth to show they could afford sugar!',
        },
      ],
      videos: [
        {
          youtubeId: 'Njq0UNJw2cA',
          title: 'The Sweet & Bitter History of Sugar',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['food-world-q2a', 'food-world-q2b', 'food-world-q2c', 'food-world-q2d'],
    },

    // ─── Section 3: The Columbian Exchange ──────────────────────
    {
      id: 'columbian-exchange',
      icon: '\u{1F30E}',
      title: 'The Columbian Exchange: The Great Food Swap',
      readAloudBlocks: [
        {
          id: 'columbian-exchange-intro',
          paragraphs: [
            'When Christopher Columbus sailed to the Americas in 1492, he didn\'t just discover new lands \u2014 he started the biggest food swap in history! Scientists call it the Columbian Exchange: the transfer of plants, animals, and diseases between the Americas, Europe, Africa, and Asia.',
            'Before 1492, there were no potatoes in Ireland, no tomatoes in Italy, no chili peppers in Thailand, and no chocolate in Switzerland! Meanwhile, the Americas had never seen wheat, rice, horses, cows, or chickens. The Columbian Exchange completely transformed what people ate on every continent.',
          ],
        },
        {
          id: 'columbian-exchange-details',
          paragraphs: [
            'Potatoes traveled from Peru to Europe and became one of the most important foods in history. They grew in cold climates where wheat wouldn\'t survive, and they produced more calories per acre than any grain. Potatoes helped feed a population boom in Europe, especially in Ireland, where they became the main food source.',
            'Tomatoes went from Mexico to Italy, where they eventually became the base for pasta sauce and pizza \u2014 foods we now think of as totally Italian! But at first, Europeans were terrified of tomatoes because they belong to the nightshade family and people thought they were poisonous.',
            'Chili peppers from Central America traveled to India, Thailand, Korea, and China, completely transforming Asian cuisines. Today, it\'s hard to imagine Thai or Indian food without spicy chilies, but they\'ve only been there for about 500 years!',
          ],
        },
      ],
      timeline: [
        {
          year: '~3000 BCE',
          title: 'Ancient Spice Trade Begins',
          description:
            'The earliest known spice trade routes develop between South Asia and the Middle East. Cinnamon, pepper, and cardamom begin their long journeys across deserts and seas to reach distant civilizations.',
        },
        {
          year: '~100 CE',
          title: 'Roman Spice Obsession',
          description:
            'The Roman Empire imports massive amounts of pepper, cinnamon, and other spices from India and Southeast Asia. Roman writer Pliny the Elder complains that Rome is spending too much gold on foreign spices!',
        },
        {
          year: '1492',
          title: 'Columbus Reaches the Americas',
          description:
            'Christopher Columbus sails west looking for a shortcut to the Spice Islands but accidentally reaches the Caribbean. This begins the Columbian Exchange, the greatest transfer of foods, animals, and plants in history.',
        },
        {
          year: '1498',
          title: 'Vasco da Gama Reaches India by Sea',
          description:
            'Portuguese explorer Vasco da Gama sails around Africa to reach India, opening a direct sea route for the spice trade. Portugal gains enormous wealth from controlling this route.',
        },
        {
          year: '~1550',
          title: 'Sugar Plantations Spread',
          description:
            'European colonizers establish sugar plantations across the Caribbean and Brazil. The transatlantic slave trade grows rapidly to provide forced labor for these plantations, beginning centuries of suffering.',
        },
        {
          year: '1667',
          title: 'Manhattan for Nutmeg',
          description:
            'In the Treaty of Breda, England trades its claim to the nutmeg-producing Banda Islands to the Dutch in exchange for a small island called Manhattan. Today Manhattan is worth billions, while nutmeg is cheap!',
        },
        {
          year: '~1800s',
          title: 'The Potato Changes Europe',
          description:
            'Potatoes from the Americas become a staple crop across Europe, helping feed a massive population boom. Ireland becomes especially dependent on potatoes, making the 1845 potato famine devastating.',
        },
        {
          year: 'Today',
          title: 'Global Food Culture',
          description:
            'Thanks to centuries of food exchange, we live in a world where you can eat Italian pizza with American tomatoes, Indian curry with South American chilies, and Irish stew with Peruvian potatoes \u2014 all in the same day!',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Italians didn\'t have tomatoes until the 1500s, and they were scared of them for over 200 years! The first Italian cookbook to include a tomato recipe wasn\'t published until 1692. Imagine \u2014 pizza without tomato sauce!',
        },
      ],
      videos: [
        {
          youtubeId: 'xROmDsULcLE',
          title: 'History Through the Eyes of the Potato',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['food-world-q3a', 'food-world-q3b', 'food-world-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Spice Wars
    {
      id: 'food-world-q1a',
      sectionId: 'spice-wars',
      title: 'Quick Quiz Time!',
      question:
        'Why did Arab traders make up wild stories about where cinnamon came from?',
      options: [
        { text: 'They thought the stories were true', isCorrect: false },
        {
          text: 'To keep their trade routes secret and prices high',
          isCorrect: true,
        },
        { text: 'To entertain children at bedtime', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'food-world-q1b',
      sectionId: 'spice-wars',
      title: 'Spice Challenge!',
      question:
        'What did the English trade to the Dutch in 1667 in exchange for the nutmeg-producing Banda Islands?',
      options: [
        { text: 'The city of London', isCorrect: false },
        { text: 'The island of Manhattan', isCorrect: true },
        { text: 'A fleet of warships', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'food-world-q1c',
      sectionId: 'spice-wars',
      title: 'Explorer Quiz!',
      question:
        'Which explorer sailed around Africa to reach India in 1498, opening a sea route for the spice trade?',
      options: [
        { text: 'Christopher Columbus', isCorrect: false },
        { text: 'Marco Polo', isCorrect: false },
        { text: 'Vasco da Gama', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Sugar & Slavery
    {
      id: 'food-world-q2a',
      sectionId: 'sugar-slavery',
      title: 'Quick Quiz Time!',
      question: 'Where was sugar cane first turned into sugar crystals?',
      options: [
        { text: 'Brazil', isCorrect: false },
        { text: 'India, around 350 CE', isCorrect: true },
        { text: 'England', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'food-world-q2b',
      sectionId: 'sugar-slavery',
      title: 'Sugar History Challenge!',
      question:
        'Why did Queen Elizabeth I have black teeth?',
      options: [
        { text: 'She never brushed her teeth', isCorrect: false },
        {
          text: 'She ate so much sugar that her teeth decayed',
          isCorrect: true,
        },
        { text: 'It was a fashion trend unrelated to sugar', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'food-world-q2c',
      sectionId: 'sugar-slavery',
      title: 'Plantation Quiz!',
      question:
        'Where did European colonizers set up most of their sugar plantations?',
      options: [
        { text: 'Northern Europe', isCorrect: false },
        { text: 'The Caribbean and Brazil', isCorrect: true },
        { text: 'Australia', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'food-world-q2d',
      sectionId: 'sugar-slavery',
      title: 'Sweet Truth Quiz!',
      question:
        'What did Europeans call sugar because it was so valuable?',
      options: [
        { text: 'Crystal candy', isCorrect: false },
        { text: 'White gold', isCorrect: true },
        { text: 'Sweet silver', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Columbian Exchange
    {
      id: 'food-world-q3a',
      sectionId: 'columbian-exchange',
      title: 'Quick Quiz Time!',
      question:
        'Why were Europeans initially afraid of tomatoes when they arrived from Mexico?',
      options: [
        { text: 'They smelled terrible', isCorrect: false },
        {
          text: 'They belong to the nightshade family, so people thought they were poisonous',
          isCorrect: true,
        },
        { text: 'They were bright red and looked like they were on fire', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'food-world-q3b',
      sectionId: 'columbian-exchange',
      title: 'Exchange Challenge!',
      question:
        'Which food from the Americas became the main food source in Ireland, making the 1845 famine devastating?',
      options: [
        { text: 'Corn', isCorrect: false },
        { text: 'Potatoes', isCorrect: true },
        { text: 'Tomatoes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'food-world-q3c',
      sectionId: 'columbian-exchange',
      title: 'Final Food Challenge!',
      question:
        'Chili peppers came from Central America. How long have they been part of Asian cuisines like Thai and Indian food?',
      options: [
        { text: 'Over 2,000 years', isCorrect: false },
        { text: 'About 500 years', isCorrect: true },
        { text: 'About 100 years', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'food-world-essay',
    prompt:
      'Which food do you think had the biggest impact on history and why?',
    description:
      'Now it\'s your turn! Think about all the foods you\'ve learned about \u2014 spices that launched voyages, sugar that shaped empires, and potatoes that fed nations. Which one do you think changed the world the most? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Fantastic thinking! Your answer has been saved. You\'re a true food historian!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'food-world-reward',
    title: 'Explore the Ancient Spice Trade!',
    description:
      'You\'ve unlocked the Spice Trade Explorer! Discover the incredible routes that connected the ancient world through the trade of precious spices, and see how food shaped the course of human history.',
    lockMessage: 'Spice Vault Locked!',
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
      'AMAZING! You\'ve unlocked the Spice Trade Explorer! You\'re a true food historian!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Food Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled through time and discovered how food shaped the entire course of human history!',
      'You learned that tiny spices like pepper, cinnamon, and nutmeg were so valuable that they drove explorers to sail across uncharted oceans. The spice trade opened new routes, built empires, and even led to the accidental discovery of the Americas!',
      'You discovered the bitter truth about sugar \u2014 how this sweet substance fueled one of history\'s darkest chapters, with millions of people enslaved to work on sugar plantations. The legacy of the sugar trade still shapes cultures around the world today.',
      'And you explored the Columbian Exchange, the great food swap that gave Italy its tomatoes, Ireland its potatoes, and Asia its chili peppers. Foods that seem like they\'ve always belonged to certain countries have actually only been there for about 500 years!',
      'Next time you eat a slice of pizza, sprinkle some pepper, or enjoy a spicy curry, remember \u2014 you\'re tasting the incredible story of human history. Keep exploring!',
    ],
  },
};
