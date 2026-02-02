import type { Topic } from '../types';

export const chineseDynasties: Topic = {
  id: 'chinese-dynasties',
  slug: 'chinese-dynasties',
  title: 'Ancient Chinese Dynasties',
  subtitle: 'Dragons, Emperors & World-Changing Inventions',
  status: 'active',
  themeId: 'chinese-dynasties',
  heroIcons: ['\u{1F409}', '\u{1F3EF}', '\u{1F9E8}'],
  navItems: [
    { id: 'myths', icon: '\u{1F409}', label: 'Myths & Dragons' },
    { id: 'emperors', icon: '\u{1F451}', label: 'Emperors & Warriors' },
    { id: 'inventions', icon: '\u{1F4A1}', label: 'Amazing Inventions' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F30F}',
      title: 'Welcome to Ancient China!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Get ready for an extraordinary journey to one of the oldest and most incredible civilizations in all of human history: Ancient China! Spanning thousands of years through many powerful dynasties, from the Shang and Zhou to the Qin, Han, Tang, Song, and Ming, China shaped the world in ways you might never have imagined.',
            'Did you know that the Chinese gave the world some of its most important inventions? Paper, gunpowder, the compass, and printing all came from ancient China! They also built the Great Wall, an unbelievable structure stretching over 13,000 miles across mountains, deserts, and grasslands. That\'s long enough to stretch halfway around the entire Earth!',
            'Ancient China was also home to Confucius, one of history\'s greatest thinkers, and to an incredible world of mythology filled with friendly dragons that bring good luck, not fire! So grab your explorer\'s hat and let\'s travel back in time to discover the wonders of ancient China!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'BYJfOJDLqcE',
          title: 'Ancient China: A Journey Through Time',
          channelName: 'SchoolTube',
        },
        {
          youtubeId: '23oHqNEqRyo',
          title: 'What makes the Great Wall of China so extraordinary',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Myths & Dragons ─────────────────────────────
    {
      id: 'myths',
      icon: '\u{1F409}',
      title: 'Myths & Dragons',
      readAloudBlocks: [
        {
          id: 'myths-intro-text',
          paragraphs: [
            'Ancient China had one of the richest mythologies in the world! The Chinese believed in four sacred animals that guarded the four directions of the compass: the Dragon of the East, the Phoenix of the South, the Tiger of the West, and the Tortoise of the North. Together, these magical creatures protected China from harm.',
            'But here\'s something amazing: Chinese dragons are completely different from the scary, fire-breathing dragons you might know from European stories! In China, dragons are wise, kind, and powerful creatures associated with water, rain, and good fortune. They were considered the ultimate symbol of good luck, and the emperor himself was said to be descended from dragons!',
            'Chinese mythology is also full of legendary heroes. One of the most famous is Mulan, a brave young woman who disguised herself as a man to fight in the army in place of her elderly father. Her story of courage and loyalty has inspired people for over 1,500 years. Let\'s meet some of these incredible mythological figures!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F409}',
          name: 'The Dragon King',
          title: 'Ruler of the Seas',
          description:
            'The Dragon King was the most powerful dragon in all of Chinese mythology. He controlled rain and weather, and lived in a magnificent crystal palace beneath the ocean. Fishermen and farmers would pray to him for rain during droughts and safe passage across the seas. Unlike the scary, fire-breathing dragons of Western legends, Chinese dragons were kind protectors who brought prosperity and good fortune to the people!',
          extraTag: 'Also known as: Long Wang',
        },
        {
          emoji: '\u2694\uFE0F',
          name: 'Mulan',
          title: 'The Legendary Warrior',
          description:
            'Mulan was a brave young woman who disguised herself as a man to join the army in place of her elderly father. She trained alongside soldiers, fought in battles, and became a respected warrior, all without anyone discovering her secret! Her story, which is over 1,500 years old, teaches us about courage, loyalty, and the incredible things people will do for the ones they love.',
          extraTag: 'Story dates back: Over 1,500 years',
        },
        {
          emoji: '\u{1F4D6}',
          name: 'Confucius',
          title: 'The Great Teacher',
          description:
            'Born around 551 BCE, Confucius became one of the most influential thinkers in all of human history. He taught that kindness, respect, and a love of learning were the keys to a good life and a peaceful society. His sayings and teachings are still quoted and studied around the world, over 2,500 years later! He believed that everyone, rich or poor, deserved an education.',
          extraTag:
            'Famous saying: Do not do to others what you do not want done to yourself',
        },
        {
          emoji: '\u2728',
          name: 'The Four Sacred Animals',
          title: 'Guardians of the Compass',
          description:
            'The ancient Chinese believed that four magical animals guarded the four directions: the Dragon watched over the East, the Phoenix protected the South, the Tiger guarded the West, and the Tortoise defended the North. Together, they protected China from all directions and maintained balance and harmony in the world. Each animal also represented a season and an element of nature.',
        },
      ],
      funFacts: [
        {
          title: 'Chinese Dragons Do NOT Breathe Fire!',
          text: 'Unlike European dragons, Chinese dragons are friendly creatures associated with water, rain, and good luck. The emperor\'s throne was called the "Dragon Throne"!',
        },
      ],
      videos: [
        {
          youtubeId: 'wFt_VGG0kJU',
          title: 'Who was Confucius?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['china-q1a', 'china-q1b', 'china-q1c'],
    },

    // ─── Section 2: Great Emperors & Warriors ───────────────────
    {
      id: 'emperors',
      icon: '\u{1F451}',
      title: 'Great Emperors & Warriors',
      readAloudBlocks: [
        {
          id: 'emperors-intro-text',
          paragraphs: [
            'For centuries, ancient China was divided into many small kingdoms that constantly fought each other. Then, in 221 BCE, a ruthless and brilliant ruler named Qin Shi Huang conquered all the warring states and united them into one mighty empire. He became the First Emperor of China!',
            'Qin Shi Huang didn\'t just unite the country. He standardized weights, measures, and money so that everyone used the same system. He connected existing walls into the beginning of the Great Wall to keep out invaders from the north. And he ordered the construction of the incredible Terracotta Army, over 8,000 life-size clay soldiers to guard his tomb!',
            'After the Qin Dynasty, China was ruled by many different dynasties, each bringing new achievements, inventions, and heroes. From the Han Dynasty\'s invention of paper to the Ming Dynasty\'s great ocean voyages, each era added something remarkable to China\'s story. Let\'s meet some of the most important figures!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F451}',
          name: 'Qin Shi Huang',
          title: 'The First Emperor',
          description:
            'Qin Shi Huang united the warring states of China around 221 BCE and became the very first emperor of a unified China. He was a brilliant but ruthless leader who standardized weights, measures, and money across the entire empire. He connected existing walls into the beginnings of the Great Wall and ordered the construction of the famous Terracotta Army to guard him in the afterlife. He was obsessed with finding the secret to living forever!',
          extraTag: 'Created: The first unified Chinese empire',
        },
        {
          emoji: '\u{1F4DC}',
          name: 'Cai Lun',
          title: 'Inventor of Paper',
          description:
            'Cai Lun was a court official during the Han Dynasty who, around 105 AD, perfected the art of making paper from bark, rags, and old fishing nets. Before his invention, people had to write on heavy bamboo strips or expensive silk cloth! His paper was light, cheap, and easy to make, and it changed the entire world. Without Cai Lun\'s invention, books, newspapers, and even this lesson might never have existed!',
          extraTag: 'Invention: Paper (c. 105 AD)',
        },
        {
          emoji: '\u{1F6A2}',
          name: 'Zheng He',
          title: 'The Great Explorer',
          description:
            'Zheng He was a Ming Dynasty admiral who commanded enormous treasure fleets on seven epic voyages across the seas. His ships were five times bigger than the ships Columbus would later sail! With a fleet of over 300 ships and 28,000 crew members, he sailed to Southeast Asia, India, and even the east coast of Africa, decades before European explorers made similar journeys.',
          extraTag: 'Fleet: Over 300 ships',
        },
        {
          emoji: '\u{1F6E1}\uFE0F',
          name: 'The Terracotta Warriors',
          title: '8,000 Silent Soldiers',
          description:
            'The Terracotta Army is a collection of over 8,000 life-size clay soldiers buried near the tomb of Emperor Qin Shi Huang. They were discovered completely by accident in 1974 when farmers were digging a well! Each warrior has a unique face, as if they were modeled after real soldiers. They were armed with real bronze weapons and arranged in battle formation to protect the emperor in the afterlife.',
          extraTag: 'Discovered: 1974 by farmers',
        },
      ],
      funFacts: [
        {
          title: 'Ketchup Came From China!',
          text: 'The word "ketchup" likely comes from the Chinese word "ke-tsiap," a fermented fish sauce from southern China. It traveled along trade routes to Europe, where it was transformed into the tomato version we know today!',
        },
        {
          title: 'The Great Wall is NOT Visible From Space!',
          text: 'This is a popular myth! The wall is very long (over 13,000 miles) but only about 15-30 feet wide \u2014 far too narrow to see from orbit. However, walking the entire Great Wall would take about 18 months of non-stop walking!',
        },
      ],
      videos: [
        {
          youtubeId: 'mP5p4QbvPtc',
          title: 'The incredible history of China\'s terracotta warriors',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['china-q2a', 'china-q2b', 'china-q2c', 'china-q2d'],
    },

    // ─── Section 3: Amazing Inventions ──────────────────────────
    {
      id: 'inventions',
      icon: '\u{1F4A1}',
      title: 'Amazing Inventions that Changed the World',
      readAloudBlocks: [
        {
          id: 'inventions-intro-text',
          paragraphs: [
            'Ancient China gave the world four incredible inventions that completely changed human history: paper, printing, the compass, and gunpowder. These are known as the "Four Great Inventions," and without them, the modern world as we know it simply wouldn\'t exist!',
            'Paper made it possible to record and share knowledge. Printing meant books could be made quickly and cheaply, spreading ideas to millions of people. The compass allowed sailors to navigate the open seas, leading to the age of exploration. And gunpowder, originally invented by accident, transformed warfare and eventually led to fireworks!',
            'These inventions didn\'t stay in China. They traveled across the world along the famous Silk Road, a vast network of trade routes that connected China to Central Asia, the Middle East, and Europe. Along with silk, spices, and tea, Chinese ideas and inventions spread to every corner of the globe, shaping the course of history forever.',
          ],
        },
      ],
      timeline: [
        {
          year: 'c. 1600 BCE',
          title: 'Shang Dynasty Begins',
          description:
            'The Shang Dynasty was one of the earliest Chinese dynasties with written records. They used oracle bones, pieces of turtle shell or animal bone, to ask questions of the gods. These oracle bones contain the earliest known examples of Chinese writing!',
        },
        {
          year: '551 BCE',
          title: 'Confucius is Born',
          description:
            'The great teacher Confucius was born in the state of Lu. His teachings about kindness, respect, and the importance of education would shape Chinese culture and philosophy for thousands of years to come.',
        },
        {
          year: '221 BCE',
          title: 'Qin Shi Huang Unites China',
          description:
            'The first emperor conquered the warring states and created a unified Chinese empire. He standardized everything from weights and measures to the width of cart axles, and began construction of the Great Wall to defend against invaders from the north.',
        },
        {
          year: '105 AD',
          title: 'Cai Lun Invents Paper',
          description:
            'During the Han Dynasty, court official Cai Lun perfected the process of making paper from bark, rags, and fishing nets. This revolutionary invention made writing materials cheap and accessible, changing the world forever.',
        },
        {
          year: 'c. 850 AD',
          title: 'Gunpowder Invented',
          description:
            'During the Tang Dynasty, Chinese chemists accidentally invented gunpowder while searching for an immortality potion! They mixed saltpeter, sulfur, and charcoal, and instead of eternal life, they got explosions. It was later used for fireworks and weapons.',
        },
        {
          year: '1405 AD',
          title: 'Zheng He\'s First Voyage',
          description:
            'Ming Dynasty Admiral Zheng He set sail on the first of seven incredible voyages with a massive treasure fleet of over 300 ships. He explored Southeast Asia, India, and Africa, decades before European explorers sailed similar routes.',
        },
      ],
      funFacts: [
        {
          title: 'Searching for Immortality, Finding Explosions!',
          text: 'Chinese chemists in the 9th century accidentally invented gunpowder while trying to create a potion for eternal life! Talk about an unexpected result!',
        },
      ],
      videos: [
        {
          youtubeId: 'mqHVRgCkCDE',
          title: 'The deadly irony of gunpowder',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'vn3e37VWc0k',
          title:
            'The Silk Road: Connecting the ancient world through trade',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['china-q3a', 'china-q3b', 'china-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Myths
    {
      id: 'china-q1a',
      sectionId: 'myths',
      title: 'Quick Quiz Time!',
      question:
        'How are Chinese dragons different from European dragons?',
      options: [
        { text: 'They are much smaller', isCorrect: false },
        { text: 'They breathe ice instead of fire', isCorrect: false },
        {
          text: 'They are friendly and bring good luck',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'china-q1b',
      sectionId: 'myths',
      title: 'Great Teacher Quiz!',
      question: 'What is Confucius most famous for?',
      options: [
        { text: 'Being a great warrior', isCorrect: false },
        {
          text: 'Teaching kindness, respect, and learning',
          isCorrect: true,
        },
        { text: 'Inventing fireworks', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'china-q1c',
      sectionId: 'myths',
      title: 'Legend of Mulan Quiz!',
      question: 'What did the legend of Mulan teach?',
      options: [
        { text: 'How to train dragons', isCorrect: false },
        {
          text: 'Courage and loyalty to family',
          isCorrect: true,
        },
        { text: 'How to build the Great Wall', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Emperors
    {
      id: 'china-q2a',
      sectionId: 'emperors',
      title: 'Quick Quiz Time!',
      question: 'Who was the first emperor of unified China?',
      options: [
        { text: 'Confucius', isCorrect: false },
        { text: 'Qin Shi Huang', isCorrect: true },
        { text: 'Zheng He', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'china-q2b',
      sectionId: 'emperors',
      title: 'Invention Challenge!',
      question: 'What did Cai Lun invent during the Han Dynasty?',
      options: [
        { text: 'The compass', isCorrect: false },
        { text: 'Paper', isCorrect: true },
        { text: 'Silk cloth', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'china-q2c',
      sectionId: 'emperors',
      title: 'Terracotta Army Quiz!',
      question: 'How many terracotta warriors were found?',
      options: [
        { text: 'About 800', isCorrect: false },
        { text: 'About 8,000', isCorrect: true },
        { text: 'About 80,000', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'china-q2d',
      sectionId: 'emperors',
      title: 'Great Wall Quiz!',
      question: 'Why did Qin Shi Huang build the Great Wall?',
      options: [
        {
          text: 'To keep out invaders from the north',
          isCorrect: true,
        },
        {
          text: 'To create a road for trading silk',
          isCorrect: false,
        },
        { text: 'To build a home for dragons', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Inventions
    {
      id: 'china-q3a',
      sectionId: 'inventions',
      title: 'Quick Quiz Time!',
      question:
        'What were Chinese chemists trying to make when they invented gunpowder?',
      options: [
        { text: 'A new type of paint', isCorrect: false },
        { text: 'An immortality potion', isCorrect: true },
        { text: 'A stronger metal', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'china-q3b',
      sectionId: 'inventions',
      title: 'Silk Road Challenge!',
      question: 'What was the Silk Road?',
      options: [
        { text: 'A single road made of silk', isCorrect: false },
        {
          text: 'A network of trade routes connecting China to the world',
          isCorrect: true,
        },
        { text: 'A river in ancient China', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'china-q3c',
      sectionId: 'inventions',
      title: 'Four Great Inventions Quiz!',
      question:
        'Which was NOT one of China\'s Four Great Inventions?',
      options: [
        { text: 'Gunpowder', isCorrect: false },
        { text: 'Paper', isCorrect: false },
        { text: 'The telescope', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'china-essay',
    prompt:
      'Which ancient Chinese invention do you think changed the world the most, and why?',
    description:
      'Now it\'s your turn to think like a historian! Ancient China gave us paper, printing, the compass, and gunpowder. Which one do you think had the biggest impact on the world? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Excellent thinking! Your answer has been saved. You\'re a true Chinese history scholar!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'china-reward',
    title: 'Design Your Own Fireworks!',
    description:
      'You\'ve unlocked the Fireworks Designer! Mix ingredients like ancient Chinese chemists and design beautiful firework patterns that launch into the night sky!',
    lockMessage: 'Fireworks Workshop Locked!',
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
    type: 'fireworks-designer',
    celebrationMessage:
      'SPECTACULAR! You\'ve unlocked the Fireworks Workshop! You\'re a true Chinese history scholar!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through thousands of years of ancient Chinese history and discovered some truly amazing things!',
      'You explored the rich world of Chinese mythology, where friendly dragons bring good luck and rain, four sacred animals guard the compass directions, and the legendary Mulan showed that courage and loyalty know no bounds. You learned from the great teacher Confucius, whose wisdom about kindness and respect still guides people today.',
      'You met incredible historical figures like Qin Shi Huang, the ruthless First Emperor who united China and built the Terracotta Army; Cai Lun, whose invention of paper changed the world forever; and Zheng He, the great admiral whose treasure fleet dwarfed anything Europe had ever seen.',
      'You discovered how China\'s Four Great Inventions, paper, printing, the compass, and gunpowder, traveled along the Silk Road and transformed every civilization they touched. And you learned that gunpowder was invented by accident while searching for a potion of immortality!',
      'Ancient China\'s legacy surrounds us every day, from the paper we write on to the compasses that guide our way. Keep exploring history, because every civilization has incredible stories waiting to be discovered!',
    ],
  },
};
