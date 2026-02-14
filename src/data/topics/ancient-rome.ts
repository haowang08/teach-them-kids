import type { Topic } from '../types';

export const ancientRome: Topic = {
  id: 'ancient-rome',
  slug: 'ancient-rome',
  title: 'Ancient Rome Adventure!',
  subtitle:
    'Travel back in time to discover amazing gods, brave soldiers, and a powerful empire!',
  status: 'active',
  themeId: 'ancient-rome',
  heroIcons: ['\u{1F3DB}\uFE0F', '\u2694\uFE0F', '\u{1F451}'],
  navItems: [
    { id: 'gods', icon: '\u26A1', label: 'Gods & Goddesses' },
    { id: 'soldiers', icon: '\u2694\uFE0F', label: 'Famous Soldiers' },
    { id: 'fall', icon: '\u{1F3DA}\uFE0F', label: 'The Fall of Rome' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F4DC}',
      title: 'Welcome, Young Explorer!',
      readAloudBlocks: [
        {
          id: 'rome-intro-text',
          paragraphs: [
            'Are you ready for an amazing adventure? We\'re going to travel back in time, more than two thousand years ago, to a place called Ancient Rome!',
            'Rome was one of the most powerful civilizations ever. It started as a tiny village in Italy and grew into a huge empire that stretched across Europe, Africa, and Asia. Roman soldiers marched thousands of miles, Roman builders created roads we still use today, and Roman ideas about laws and government shape how we live right now!',
            'In this adventure, you\'ll discover why the Romans named their gods the way they did, meet some of the bravest soldiers and smartest generals in history, and find out what happened when this mighty empire finally fell. Let\'s begin!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'Wo0KujQEJ_s',
          title: 'Ancient Rome for Kids - History of the Roman Empire',
          channelName: 'Learn Bright',
        },
        {
          youtubeId: 'juWYhMoDTN0',
          title: 'A Day in the Life of a Roman Teen',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Gods & Goddesses ─────────────────────────────
    {
      id: 'gods',
      icon: '\u26A1',
      title: 'Roman Gods & Goddesses: What\'s in a Name?',
      readAloudBlocks: [
        {
          id: 'rome-gods-intro-text',
          paragraphs: [
            'The ancient Romans believed in many gods and goddesses who controlled different parts of life. But here\'s something super interesting: the Romans didn\'t make up all their gods from scratch. They were inspired by the ancient Greeks, who had their own gods first!',
            'When the Romans met the Greeks, they thought, "Wow, these gods are cool! But we want them to feel Roman." So they gave the Greek gods new Latin names, which was the language Romans spoke.',
            'The names they chose weren\'t random. Each name meant something special about what that god or goddess did. Let\'s meet some of them and discover why they got their names!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u26A1',
          name: 'Jupiter',
          title: 'King of the Gods',
          description:
            'Jupiter was named from the Latin words meaning "Father Sky" or "Sky Father." He controlled thunder, lightning, and storms. When you see lightning flash across the sky, the Romans believed Jupiter was showing his power!',
          extraTag: 'Greek name: Zeus',
        },
        {
          emoji: '\u{1F30A}',
          name: 'Neptune',
          title: 'God of the Sea',
          description:
            'Neptune\'s name probably comes from an old word meaning "moist" or "wet." Makes sense for the god of all the oceans, rivers, and water! Sailors would pray to Neptune before long sea voyages.',
          extraTag: 'Greek name: Poseidon',
        },
        {
          emoji: '\u2694\uFE0F',
          name: 'Mars',
          title: 'God of War',
          description:
            'Mars was super important to Romans because they were great warriors. His name may come from an old word for "man" or "male strength." The month of March is named after him, and so is the planet Mars!',
          extraTag: 'Greek name: Ares',
        },
        {
          emoji: '\u{1F49D}',
          name: 'Venus',
          title: 'Goddess of Love & Beauty',
          description:
            'Venus\'s name comes from the Latin word for "charm" or "desire." She made people fall in love! The planet Venus is named after her because it\'s the brightest and most beautiful thing in the night sky.',
          extraTag: 'Greek name: Aphrodite',
        },
        {
          emoji: '\u{1F33E}',
          name: 'Ceres',
          title: 'Goddess of Harvest',
          description:
            'Ceres watched over crops, farming, and food. Her name comes from a word meaning "to grow." The word "cereal" that we use for breakfast food actually comes from her name!',
          extraTag: 'Greek name: Demeter',
        },
        {
          emoji: '\u{1F989}',
          name: 'Minerva',
          title: 'Goddess of Wisdom',
          description:
            'Minerva\'s name comes from a Latin word related to "mind" and "thinking." She helped people be wise, creative, and good at crafts. Students would ask for her help with their studies!',
          extraTag: 'Greek name: Athena',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'We still use Roman god names every single day! The days of the week and months come from them. Saturday is "Saturn\'s Day," and January comes from Janus, the god of beginnings. Look for more Roman names around you!',
        },
      ],
      videos: [
        {
          youtubeId: 'DeiXeeDciEo',
          title: 'Roman Mythology - Gods and Goddesses Explained',
          channelName: 'Twinkl USA',
        },
      ],
      quizIds: ['rome-q1a', 'rome-q1b', 'rome-q1c'],
    },

    // ─── Section 2: Famous Soldiers & Generals ───────────────────
    {
      id: 'soldiers',
      icon: '\u2694\uFE0F',
      title: 'Famous Roman Soldiers & Generals',
      readAloudBlocks: [
        {
          id: 'rome-soldiers-intro-text',
          paragraphs: [
            'The Roman army was one of the best fighting forces the world has ever seen! Roman soldiers were called legionaries, and they were known for being tough, disciplined, and clever in battle.',
            'But what made Rome truly powerful were its amazing generals, the leaders who commanded thousands of soldiers and won incredible battles. These men became heroes, and some even became rulers of all of Rome!',
            'Let\'s meet some of the most famous Roman military leaders and learn why history remembers them!',
          ],
        },
        {
          id: 'rome-soldiers-outro-text',
          paragraphs: [
            'These generals weren\'t just good at fighting. They inspired their soldiers, made smart decisions under pressure, and often showed mercy to the people they defeated. The best Roman leaders knew that winning battles was only part of being great, you also had to win people\'s hearts.',
            'Roman soldiers themselves were amazing too. They trained hard every single day, could march 20 miles carrying heavy equipment, and worked together like a well-oiled machine. They built roads, forts, and even entire cities wherever they went!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F985}',
          name: 'Julius Caesar',
          title: 'The Greatest General',
          description:
            'Julius Caesar is probably the most famous Roman ever! He conquered a huge area called Gaul, which is modern France. He was so loved by his soldiers that they followed him everywhere. Caesar was brilliant at strategy and once said "I came, I saw, I conquered!" He became so powerful that he was made dictator of Rome. The month of July is named after him!',
        },
        {
          emoji: '\u{1F418}',
          name: 'Scipio Africanus',
          title: 'Defeater of Hannibal',
          description:
            'Scipio was the hero who defeated Rome\'s greatest enemy, the general Hannibal from Carthage. Hannibal had invaded Italy with war elephants! When everyone was afraid, young Scipio came up with a clever plan. He attacked Carthage itself, forcing Hannibal to go home. Scipio beat him in the final battle and saved Rome!',
        },
        {
          emoji: '\u{1F451}',
          name: 'Augustus',
          title: 'The First Emperor',
          description:
            'Augustus was Julius Caesar\'s adopted son. After Caesar died, Rome fell into chaos with lots of fighting. Augustus was smart enough to win all these battles and become the first Emperor of Rome. Under his rule, Rome had peace for many years. August, the month, is named after him!',
        },
        {
          emoji: '\u{1F5E1}\uFE0F',
          name: 'Marcus Aurelius',
          title: 'The Philosopher Emperor',
          description:
            'Marcus Aurelius wasn\'t just a great soldier, he was also a deep thinker! He spent many years fighting to protect Rome\'s borders while also writing books about how to be a good person. Even though he was the most powerful man in the world, he tried to be humble and wise.',
        },
        {
          emoji: '\u2B50',
          name: 'Trajan',
          title: 'Builder of the Biggest Empire',
          description:
            'Under Emperor Trajan, the Roman Empire grew to its biggest size ever! He conquered new lands and was loved by soldiers and regular people alike. He also built amazing things like Trajan\'s Column, a huge stone pillar covered in pictures of his victories that still stands in Rome today!',
        },
        {
          emoji: '\u{1F6E1}\uFE0F',
          name: 'Cincinnatus',
          title: 'The Humble Hero',
          description:
            'Cincinnatus was a farmer who became a hero. When Rome was in danger, the government asked him to become dictator and save the city. He left his farm, defeated the enemy in just 16 days, then gave up all his power and went back to farming! His story teaches us about doing your duty and not wanting too much power.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Roman soldiers had to serve in the army for 25 years! When they retired, they were given land and money. Many Roman cities started as places where retired soldiers settled down.',
        },
      ],
      videos: [
        {
          youtubeId: 'P5e7cl19Ha0',
          title: 'A Day in the Life of a Roman Soldier',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['rome-q2a', 'rome-q2b', 'rome-q2c', 'rome-q2d'],
    },

    // ─── Section 3: Fall of Rome ─────────────────────────────────
    {
      id: 'fall',
      icon: '\u{1F3DA}\uFE0F',
      title: 'How the Mighty Roman Empire Fell',
      readAloudBlocks: [
        {
          id: 'rome-fall-intro-text',
          paragraphs: [
            'For hundreds and hundreds of years, Rome seemed unstoppable. The Roman Empire was so big and powerful that people thought it would last forever. But slowly, over many years, problems started to pile up. It\'s like when you build a really tall tower of blocks, if you\'re not careful, the whole thing can come tumbling down.',
            'The fall of Rome didn\'t happen all at once, like a light switch turning off. It was more like a sunset that took over 200 years! Let\'s explore the reasons why this amazing empire eventually crumbled.',
          ],
        },
        {
          id: 'rome-fall-outro-text',
          paragraphs: [
            'Finally, in the year 476 AD, a barbarian leader named Odoacer defeated the last Roman emperor in the West, a young boy named Romulus Augustulus. The Western Roman Empire was officially over after nearly 1,000 years!',
            'But here\'s something cool: the Eastern Roman Empire, called the Byzantine Empire, kept going for almost another 1,000 years! And Rome\'s ideas about laws, government, language, and building never really died. They lived on and shaped the world we live in today.',
            'When you use words that come from Latin, follow laws based on Roman ideas, or walk on a road that was first built by Romans, you\'re connecting with this amazing civilization. Rome fell, but in many ways, it never really ended!',
          ],
        },
      ],
      timeline: [
        {
          year: 'Problem #1',
          title: 'Too Big to Manage!',
          description:
            'The Roman Empire grew SO big that it became really hard to control. Imagine trying to manage a classroom that stretched from England to Iraq, and from Germany to Egypt! Messages took weeks to travel, and the emperor couldn\'t be everywhere at once. Eventually, the empire split into two parts: West and East.',
        },
        {
          year: 'Problem #2',
          title: 'Running Out of Money',
          description:
            'Rome needed lots of money to pay its soldiers and build things. But when they stopped conquering new lands, they stopped getting new treasures. The government started making coins with less silver in them, which made money worth less. Imagine if your allowance suddenly couldn\'t buy as much candy!',
        },
        {
          year: 'Problem #3',
          title: 'Attacks from Outside',
          description:
            'Groups of people called "barbarians" by the Romans, like the Goths, Vandals, and Huns, started attacking Roman borders. These weren\'t just small raids, but huge migrations of people looking for new homes. The Roman army, which was once the best in the world, had trouble fighting them all.',
        },
        {
          year: 'Problem #4',
          title: 'Bad Leaders',
          description:
            'Rome had some great emperors, but also some really bad ones who cared more about themselves than the empire. There was lots of fighting over who should be emperor. In one period of just 50 years, Rome had over 20 different emperors! Many were killed by their own people.',
        },
        {
          year: 'Problem #5',
          title: 'Disease and Plague',
          description:
            'Terrible diseases spread through the empire, killing millions of people. With fewer people, there were fewer farmers to grow food and fewer soldiers to protect the borders. Some cities that once had hundreds of thousands of people became almost empty.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Many English words come from Latin, the language of Rome! Words like "video" (I see), "audio" (I hear), and even "dinosaur" (terrible lizard) has Greek roots. You\'re speaking a little bit of Roman every day!',
        },
      ],
      videos: [
        {
          youtubeId: '3PszVWZNWVA',
          title: 'Fall of the Roman Empire - History for Kids',
          channelName: 'History for Kids',
        },
        {
          youtubeId: 'aTbZp-grIck',
          title: 'Why Did Rome Fall?',
          channelName: 'History Explained',
        },
      ],
      quizIds: ['rome-q3a', 'rome-q3b', 'rome-q3c', 'rome-q3d'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Gods
    {
      id: 'rome-q1a',
      sectionId: 'gods',
      title: 'Quick Quiz Time!',
      question:
        'Which Roman god is the King of all the Gods and controlled lightning?',
      options: [
        { text: 'Mars', isCorrect: false },
        { text: 'Jupiter', isCorrect: true },
        { text: 'Neptune', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rome-q1b',
      sectionId: 'gods',
      title: 'Name Match Challenge!',
      question:
        'Which breakfast food gets its name from Ceres, the goddess of harvest?',
      options: [
        { text: 'Toast', isCorrect: false },
        { text: 'Cereal', isCorrect: true },
        { text: 'Pancakes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rome-q1c',
      sectionId: 'gods',
      title: 'Planet Quiz!',
      question:
        'Venus was the goddess of love and beauty. Why is the planet Venus named after her?',
      options: [
        { text: "It's the hottest planet", isCorrect: false },
        {
          text: "It's the brightest and most beautiful in the night sky",
          isCorrect: true,
        },
        { text: "It's the closest to the Sun", isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Soldiers
    {
      id: 'rome-q2a',
      sectionId: 'soldiers',
      title: 'Quick Quiz Time!',
      question:
        'Which Roman general defeated Hannibal and his famous war elephants?',
      options: [
        { text: 'Julius Caesar', isCorrect: false },
        { text: 'Scipio Africanus', isCorrect: true },
        { text: 'Augustus', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rome-q2b',
      sectionId: 'soldiers',
      title: 'Emperor Challenge!',
      question:
        'Who was Rome\'s FIRST Emperor and had a month named after him?',
      options: [
        { text: 'Julius Caesar', isCorrect: false },
        { text: 'Trajan', isCorrect: false },
        { text: 'Augustus', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rome-q2c',
      sectionId: 'soldiers',
      title: 'Hero Quiz!',
      question:
        'Cincinnatus was a famous Roman who gave up power after saving Rome. What was his regular job?',
      options: [
        { text: 'Farmer', isCorrect: true },
        { text: 'Blacksmith', isCorrect: false },
        { text: 'Teacher', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rome-q2d',
      sectionId: 'soldiers',
      title: 'Soldier Facts!',
      question:
        'How many years did Roman soldiers have to serve in the army?',
      options: [
        { text: '10 years', isCorrect: false },
        { text: '25 years', isCorrect: true },
        { text: '5 years', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Fall of Rome
    {
      id: 'rome-q3a',
      sectionId: 'fall',
      title: 'Quick Quiz Time!',
      question:
        'In what year did the Western Roman Empire officially fall?',
      options: [
        { text: '100 AD', isCorrect: false },
        { text: '300 AD', isCorrect: false },
        { text: '476 AD', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rome-q3b',
      sectionId: 'fall',
      title: 'Cause Challenge!',
      question:
        'Which of these was NOT a reason the Roman Empire fell?',
      options: [
        { text: 'The empire grew too big to manage', isCorrect: false },
        { text: 'Barbarian invasions', isCorrect: false },
        { text: 'They ran out of gladiators', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rome-q3c',
      sectionId: 'fall',
      title: 'Empire Trivia!',
      question:
        'What was the Eastern Roman Empire called after the West fell?',
      options: [
        { text: 'The Greek Empire', isCorrect: false },
        { text: 'The Byzantine Empire', isCorrect: true },
        { text: 'The New Roman Empire', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rome-q3d',
      sectionId: 'fall',
      title: 'Final Challenge!',
      question:
        'What was the name of the last Western Roman Emperor?',
      options: [
        { text: 'Julius Caesar', isCorrect: false },
        { text: 'Augustus', isCorrect: false },
        { text: 'Romulus Augustulus', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'rome-essay',
    prompt:
      'Why do you think the Roman Empire fell?',
    description:
      'Now it\'s your turn! Think about everything you\'ve learned. What do you believe was the biggest reason Rome fell? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Great thinking! Your answer has been saved. You\'re a true Roman historian!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'rome-reward',
    title: 'Race in the Circus Maximus!',
    description:
      'Complete all challenges to unlock the chariot race experience!',
    lockMessage: 'Arena Gates Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 11 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save an open-ended answer (100+ characters)',
      },
    ],
    type: 'chariot-race',
    celebrationMessage: 'Ave, Champion!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled through time and learned so much about Ancient Rome!',
      'You discovered that Roman gods got their names from Latin words that described their powers. Jupiter meant "Sky Father" because he ruled the heavens. Mars was named for strength because he was the god of war. And we still see these names in our planets, months, and even breakfast cereals!',
      'You met brave generals like Julius Caesar, who conquered Gaul and became dictator, and Scipio Africanus, who saved Rome from Hannibal\'s elephants. You learned that the best Roman leaders were not just good fighters, but also wise and inspiring.',
      'And you explored how the mighty Roman Empire fell: it got too big, ran out of money, faced invasions, had bad leaders, and suffered from diseases. But even though Rome fell, its legacy lives on in our language, our laws, and our world.',
      'Keep exploring history! Every civilization has amazing stories waiting to be discovered. Who knows what adventure you\'ll go on next?',
    ],
  },
};
