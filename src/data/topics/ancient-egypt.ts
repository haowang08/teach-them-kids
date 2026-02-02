import type { Topic } from '../types';

export const ancientEgypt: Topic = {
  id: 'ancient-egypt',
  slug: 'ancient-egypt',
  title: 'Ancient Egypt Adventure!',
  subtitle:
    'Journey back thousands of years to discover powerful gods, legendary pharaohs, and a civilization that amazed the world!',
  status: 'active',
  themeId: 'ancient-egypt',
  heroIcons: ['\u{1F3DB}\uFE0F', '\u{1F4DC}', '\u{1F451}'],
  navItems: [
    { id: 'gods', icon: '\u{1F3DB}\uFE0F', label: 'Gods & Goddesses' },
    { id: 'pharaohs', icon: '\u{1F451}', label: 'Pharaohs & Priests' },
    { id: 'decline', icon: '\u{1F3DA}\uFE0F', label: 'The Decline of Egypt' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F4DC}',
      title: 'Welcome, Young Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Are you ready for an incredible adventure? We\'re going to travel back in time, more than four thousand years ago, to a place called Ancient Egypt!',
            'Egypt was one of the most amazing civilizations the world has ever seen. It grew along the banks of the Nile River, the longest river in Africa. The ancient Egyptians built enormous pyramids, invented a writing system called hieroglyphics, and created art and medicine that still amazes us today!',
            'In this adventure, you\'ll discover why the Egyptians gave their gods and goddesses such special names, meet legendary pharaohs and powerful priests, and find out how this incredible empire slowly declined and finally fell. Let\'s explore!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'hO1tzmi1V5g',
          title: 'Ancient Egypt 101',
          channelName: 'National Geographic',
        },
        {
          youtubeId: 'fJBlEPOj4Fk',
          title: 'How Did They Build the Great Pyramid of Giza?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Gods & Goddesses ─────────────────────────────
    {
      id: 'gods',
      icon: '\u{1F3DB}\uFE0F',
      title: 'Egyptian Gods & Goddesses: What\'s in a Name?',
      readAloudBlocks: [
        {
          id: 'gods-intro-text',
          paragraphs: [
            'The ancient Egyptians believed in hundreds of gods and goddesses who controlled every part of life, from the sun rising each morning to the flooding of the Nile River. Unlike the Romans who borrowed their gods from the Greeks, the Egyptians created their own unique gods over thousands of years!',
            'Egyptian gods often had animal heads on human bodies. This wasn\'t because the Egyptians thought gods were actually animals. Each animal represented a special power or quality that the god had. A falcon meant speed and the sky, a jackal meant protection of the dead, and a cat meant grace and mystery.',
            'The names the Egyptians gave their gods came from the ancient Egyptian language and usually described what the god did or what they looked like. Let\'s meet some of the most important ones and learn what their names really meant!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u2600\uFE0F',
          name: 'Ra (Re)',
          title: 'King of the Gods & God of the Sun',
          description:
            'Ra was the most important god in ancient Egypt. His name simply means "sun" in ancient Egyptian. The Egyptians believed Ra sailed across the sky in a golden boat every day, carrying the sun. At night, he traveled through the underworld and defeated the serpent of chaos, Apophis, before rising again at dawn!',
          extraTag: 'Name means: "Sun"',
        },
        {
          emoji: '\u{1F54B}',
          name: 'Osiris',
          title: 'God of the Afterlife & Resurrection',
          description:
            'Osiris\'s name may come from words meaning "powerful one" or "he who is on the throne." He was murdered by his jealous brother Set, who trapped him in a wooden chest. But his wife Isis brought him back, and he became the ruler of the land of the dead. Egyptians believed he judged every person\'s soul after death!',
          extraTag: 'Name means: "Powerful One"',
        },
        {
          emoji: '\u{1F985}',
          name: 'Horus',
          title: 'God of the Sky & Kingship',
          description:
            'Horus\'s name means "the one far above" or "the distant one," referring to a falcon soaring high in the sky. He had the head of a falcon, and every pharaoh was believed to be a living form of Horus on Earth. The famous Eye of Horus was a magical symbol of protection!',
          extraTag: 'Name means: "The Distant One"',
        },
        {
          emoji: '\u{1F312}',
          name: 'Isis',
          title: 'Goddess of Magic & Motherhood',
          description:
            'Isis\'s name in ancient Egyptian was "Aset," which means "she of the throne." She was the most powerful magician in all of Egypt and could even trick Ra himself! She was so beloved that people worshipped her for thousands of years, even outside Egypt. She protected children and healed the sick.',
          extraTag: 'Name means: "She of the Throne"',
        },
        {
          emoji: '\u2696\uFE0F',
          name: 'Anubis',
          title: 'God of Mummification & the Dead',
          description:
            'Anubis had the head of a jackal, a wild dog found near cemeteries. His Egyptian name "Anpu" may mean "to decay" or "royal child." He guided dead souls to the afterlife and weighed their hearts on a scale against the feather of truth. If your heart was lighter than the feather, you passed!',
          extraTag: 'Name means: "Royal Child"',
        },
        {
          emoji: '\u{1F4DA}',
          name: 'Thoth',
          title: 'God of Wisdom & Writing',
          description:
            'Thoth had the head of an ibis bird. His Egyptian name "Djehuty" means "he who is like the ibis." The Egyptians believed Thoth invented hieroglyphics, their writing system, and he kept records of everything. He also invented the calendar and was the smartest of all the gods!',
          extraTag: 'Name means: "He Who is Like the Ibis"',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Ancient Egyptians believed cats were sacred because they were connected to the goddess Bastet, whose name means "she of the ointment jar." Bastet protected homes and families. Hurting a cat in ancient Egypt was a serious crime!',
        },
      ],
      videos: [
        {
          youtubeId: 'O5dXz1Tq_Yg',
          title: 'The Egyptian Myth of the Death of Osiris',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'JycXLG6GeYk',
          title: 'The Egyptian Myth of Isis and the Seven Scorpions',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: '1yv_MXNYbAo',
          title: 'The Egyptian Book of the Dead',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['egypt-q1a', 'egypt-q1b', 'egypt-q1c', 'egypt-q1d'],
    },

    // ─── Section 2: Pharaohs & Priests ───────────────────────────
    {
      id: 'pharaohs',
      icon: '\u{1F451}',
      title: 'Famous Pharaohs & Powerful Priests',
      readAloudBlocks: [
        {
          id: 'pharaohs-intro-text',
          paragraphs: [
            'The pharaoh was the most powerful person in all of Egypt. Egyptians believed the pharaoh was a living god on Earth, a human form of the falcon god Horus. The word "pharaoh" actually comes from the Egyptian words "per-aa," meaning "great house," because the ruler was so important that people just called him "the palace"!',
            'But pharaohs weren\'t the only powerful people. High priests controlled the temples, which were the richest buildings in Egypt. They performed secret rituals, managed enormous wealth, and sometimes became even more powerful than the pharaoh!',
            'Let\'s meet some of the most legendary pharaohs and priests, both men and women, who shaped Egyptian history!',
          ],
        },
        {
          id: 'pharaohs-outro-text',
          paragraphs: [
            'The power of the pharaohs came from the belief that they were connected to the gods. They built enormous temples and tombs to prove this connection. But as centuries passed, the priests of the temples, especially those of the god Amun at Karnak, grew so wealthy and powerful that they sometimes rivaled the pharaoh himself!',
            'The High Priest of Amun at Thebes controlled vast farmlands, thousands of workers, and enormous gold reserves. During the reign of Ramesses III, the priests even led a conspiracy against the pharaoh. The balance of power between pharaohs and priests would shape Egypt\'s future for centuries.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F451}',
          name: 'Hatshepsut',
          title: 'The Woman Who Became Pharaoh',
          description:
            'Hatshepsut was one of the most successful pharaohs ever, and she was a woman! In a time when pharaohs were expected to be men, she took the throne and even wore a fake beard to show her authority. She built magnificent temples and sent trade expeditions to the land of Punt. After she died, someone tried to erase her name from history by smashing her statues, but she was too great to be forgotten!',
        },
        {
          emoji: '\u{1F3D7}\uFE0F',
          name: 'Khufu',
          title: 'Builder of the Great Pyramid',
          description:
            'Pharaoh Khufu ordered the construction of the Great Pyramid of Giza, one of the Seven Wonders of the Ancient World! It took about 20 years to build and remained the tallest human-made structure for over 3,800 years. His architect, Hemiunu, organized thousands of skilled workers who moved 2.3 million stone blocks, each weighing about 2.5 tons!',
        },
        {
          emoji: '\u2694\uFE0F',
          name: 'Ramesses II',
          title: 'Ramesses the Great',
          description:
            'Ramesses II reigned for nearly 70 years in the 13th century BCE, one of the longest reigns ever. He built more temples and statues than any other pharaoh. He fought the famous Battle of Kadesh against the Hittites and signed the world\'s first known peace treaty! But was he a model leader or a master of propaganda? He made sure everyone knew his name!',
        },
        {
          emoji: '\u{1F31F}',
          name: 'Tutankhamun',
          title: 'The Boy King',
          description:
            'Tutankhamun became pharaoh when he was only about 9 years old! He\'s famous today because his tomb was found almost completely untouched in 1922, filled with golden treasures including his spectacular gold death mask. His name means "living image of Amun," showing he was named after the powerful god Amun. He died young, at about 19.',
        },
        {
          emoji: '\u{1F48E}',
          name: 'Cleopatra VII',
          title: 'The Last Pharaoh',
          description:
            'Cleopatra was the last active ruler of ancient Egypt. Far from being just a beauty, she was incredibly smart, spoke nine languages, studied science and mathematics, and was a skilled diplomat. She allied with the Roman generals Julius Caesar and Mark Antony. Her defeat at the Battle of Actium in 30 BCE ended ancient Egyptian independence forever.',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Imhotep',
          title: 'The Genius Priest & Architect',
          description:
            'Imhotep was a high priest, doctor, and architect who designed the very first pyramid, the Step Pyramid at Saqqara, for Pharaoh Djoser. He was so brilliant that after his death, the Egyptians actually made him a god! He\'s one of the few non-royals ever worshipped as a deity. He\'s considered the world\'s first known architect and one of the first physicians.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Pharaoh Khufu\'s Great Pyramid is made of about 2.3 million stone blocks. If you tried to count each block at one per second, it would take you about 27 days, without sleeping!',
        },
      ],
      videos: [
        {
          youtubeId: '8bYRy_wZEJI',
          title: 'The Pharaoh That Wouldn\'t Be Forgotten (Hatshepsut)',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'fVcKBox97P0',
          title: 'History vs. Egypt\'s Most Powerful Pharaoh (Ramesses II)',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'Y6EhRwn4zkc',
          title: 'History vs. Cleopatra',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['egypt-q2a', 'egypt-q2b', 'egypt-q2c'],
    },

    // ─── Section 3: Decline & Fall ───────────────────────────────
    {
      id: 'decline',
      icon: '\u{1F3DA}\uFE0F',
      title: 'How Ancient Egypt Declined and Fell',
      readAloudBlocks: [
        {
          id: 'decline-intro-text',
          paragraphs: [
            'Ancient Egypt lasted for an incredible 3,000 years, longer than almost any civilization in history! But even the mightiest empires eventually weaken. Egypt\'s fall didn\'t happen overnight. It was a slow decline that took hundreds of years, like a great river slowly drying up.',
            'The story of Egypt\'s decline involves power-hungry priests, foreign invaders, iron weapons the Egyptians couldn\'t make, and finally the mighty Roman Empire. Let\'s explore what went wrong for this amazing civilization.',
          ],
        },
        {
          id: 'decline-outro-text',
          paragraphs: [
            'In 30 BCE, when Cleopatra died and Egypt became part of the Roman Empire, the age of the pharaohs ended forever. But Egypt\'s legacy lives on everywhere!',
            'The pyramids still stand as wonders of the world. Egyptian mathematics helped create the geometry you learn in school. Their medicine influenced doctors for thousands of years. The calendar we use today is based on the one Egyptians created. And hieroglyphics inspired other writing systems that eventually led to the alphabet you\'re reading right now!',
            'Ancient Egypt may have fallen, but its ideas, its art, and its mysteries continue to amaze people all around the world. Every time you see a pyramid, think of a mummy, or write with an alphabet, you\'re connecting with a civilization that shaped human history!',
          ],
        },
      ],
      timeline: [
        {
          year: '~1070 BCE',
          title: 'Priests Became Too Powerful',
          description:
            'After the death of Ramesses III around 1155 BCE, the pharaohs grew weaker while the priests of Amun at Thebes grew stronger. Eventually, Egypt split in two: pharaohs ruled the north while high priests controlled the south. Without a united leadership, Egypt became weak and vulnerable to attack.',
        },
        {
          year: '~900 BCE',
          title: 'The Iron Problem',
          description:
            'Other civilizations like the Assyrians learned to make weapons from iron, which was much harder and stronger than the bronze Egypt used. Egypt didn\'t have iron ore, so they couldn\'t make these superior weapons. Imagine trying to fight someone with a wooden sword while they have a metal one!',
        },
        {
          year: '671 BCE',
          title: 'The Assyrian Invasion',
          description:
            'The powerful Assyrian Empire invaded and conquered Egypt. These fierce warriors from Mesopotamia had iron weapons and powerful siege machines. Egypt was occupied by foreigners for the first time in its long history. Though the Egyptians eventually pushed them out, the damage was done.',
        },
        {
          year: '525 BCE',
          title: 'The Persian Conquest',
          description:
            'The Persian King Cambyses II defeated the Egyptian pharaoh and made Egypt part of the vast Persian Empire. Egypt would be ruled by Persians on and off for nearly 200 years. The Egyptians rebelled several times but could never fully break free from Persian control.',
        },
        {
          year: '332 BCE',
          title: 'Alexander the Great Arrives',
          description:
            'Alexander the Great of Macedon conquered Egypt from the Persians. He founded the great city of Alexandria, which became one of the most important cities in the ancient world. After Alexander died, his general Ptolemy took over, starting the Ptolemaic dynasty. Greek culture began mixing with Egyptian traditions.',
        },
        {
          year: '30 BCE',
          title: 'The Final Fall',
          description:
            'Cleopatra VII, the last pharaoh, allied with Roman general Mark Antony against Rome\'s Octavian (later Emperor Augustus). They lost the Battle of Actium in 31 BCE. Both Cleopatra and Antony died the following year. Egypt became a Roman province, and the age of the pharaohs was over forever after nearly 3,000 years!',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Cleopatra lived closer in time to the Moon landing (1969) than to the building of the Great Pyramid (~2560 BCE)! The Great Pyramid was already over 2,500 years old when Cleopatra was born. That\'s how incredibly ancient Egyptian civilization was!',
        },
      ],
      videos: [],
      quizIds: ['egypt-q3a', 'egypt-q3b', 'egypt-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Gods
    {
      id: 'egypt-q1a',
      sectionId: 'gods',
      title: 'Quick Quiz Time!',
      question:
        'In the TED-Ed video, the warrior god Set was jealous of his older brother Osiris. How did Set trap Osiris?',
      options: [
        { text: 'He threw him into the Nile', isCorrect: false },
        {
          text: 'He tricked him into a wooden chest at a party',
          isCorrect: true,
        },
        { text: 'He turned him into a stone statue', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'egypt-q1b',
      sectionId: 'gods',
      title: 'God Name Challenge!',
      question:
        'The god Ra\'s name simply means "sun" in ancient Egyptian. What did the Egyptians believe Ra did every day?',
      options: [
        { text: 'He created a new world', isCorrect: false },
        {
          text: 'He sailed across the sky in a golden boat',
          isCorrect: true,
        },
        { text: 'He painted the clouds different colors', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'egypt-q1c',
      sectionId: 'gods',
      title: 'Sacred Animals Quiz!',
      question:
        'In the TED-Ed video about Isis, she was accompanied by seven scorpions. What happened when a rich woman slammed the door on Isis?',
      options: [
        { text: 'Isis turned the woman into a frog', isCorrect: false },
        { text: 'The scorpions destroyed the house', isCorrect: false },
        {
          text: 'A scorpion stung the woman\'s son, and Isis healed him',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'egypt-q1d',
      sectionId: 'gods',
      title: 'Afterlife Quiz!',
      question:
        'According to the Book of the Dead video, what did Anubis weigh against the feather of truth to judge a soul?',
      options: [
        { text: "The person's brain", isCorrect: false },
        { text: "The person's heart", isCorrect: true },
        { text: "The person's treasure", isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Pharaohs
    {
      id: 'egypt-q2a',
      sectionId: 'pharaohs',
      title: 'Quick Quiz Time!',
      question:
        'In the TED-Ed video, what happened to Hatshepsut\'s statues and name after she died?',
      options: [
        { text: 'They were sent to the British Museum', isCorrect: false },
        {
          text: 'Someone smashed them and tried to erase her name',
          isCorrect: true,
        },
        {
          text: 'They were buried with her in a secret tomb',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'egypt-q2b',
      sectionId: 'pharaohs',
      title: 'Pharaoh Challenge!',
      question: 'How long did Ramesses II reign as pharaoh of Egypt?',
      options: [
        { text: 'About 20 years', isCorrect: false },
        { text: 'About 40 years', isCorrect: false },
        { text: 'Nearly 70 years', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'egypt-q2c',
      sectionId: 'pharaohs',
      title: 'Boy King Quiz!',
      question: 'How old was Tutankhamun when he became pharaoh?',
      options: [
        { text: 'About 9 years old', isCorrect: true },
        { text: 'About 18 years old', isCorrect: false },
        { text: 'About 25 years old', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Decline
    {
      id: 'egypt-q3a',
      sectionId: 'decline',
      title: 'Quick Quiz Time!',
      question:
        'In what year did ancient Egypt officially become a Roman province, ending the age of the pharaohs?',
      options: [
        { text: "332 BCE (Alexander's arrival)", isCorrect: false },
        { text: "30 BCE (Cleopatra's defeat)", isCorrect: true },
        { text: '525 BCE (Persian conquest)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'egypt-q3b',
      sectionId: 'decline',
      title: 'Decline Challenge!',
      question:
        'What material for weapons did Egypt lack that made them weaker than the Assyrians?',
      options: [
        { text: 'Gold', isCorrect: false },
        { text: 'Iron', isCorrect: true },
        { text: 'Silver', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'egypt-q3c',
      sectionId: 'decline',
      title: 'Final Challenge!',
      question: 'Who was the very last pharaoh of ancient Egypt?',
      options: [
        { text: 'Ramesses II', isCorrect: false },
        { text: 'Tutankhamun', isCorrect: false },
        { text: 'Cleopatra VII', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'egypt-essay',
    prompt:
      'What do you think was the biggest reason ancient Egypt fell?',
    description:
      'Now it\'s your turn! Think about everything you\'ve learned. Was it the power-hungry priests? The lack of iron? The foreign invasions? Or something else? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Great thinking! Your answer has been saved. You\'re a true Egyptian scholar!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'egypt-reward',
    title: 'Explore the Great Pyramid of Giza!',
    description:
      'Click, drag, and zoom to explore the Great Pyramid of Giza in full 3D! This model lets you see the pyramid from every angle, just like you were there in Egypt. Rotate it, zoom in, and discover its incredible structure!',
    lockMessage: 'Secret Chamber Locked!',
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
    type: 'sketchfab',
    embedUrl:
      'https://sketchfab.com/models/01810314feca4415a33a51dd151eacb3/embed',
    embedTitle: 'Great Pyramid of Giza',
    celebrationMessage:
      "AMAZING! You've unlocked the Secret Pyramid Chamber! You're a true Egyptian scholar!",
    attribution: {
      modelName: 'Great Pyramid of Giza',
      modelUrl:
        'https://sketchfab.com/3d-models/great-pyramid-of-giza-01810314feca4415a33a51dd151eacb3',
      authorName: 'saVRee',
      authorUrl: 'https://sketchfab.com/saVRee',
      platformUrl: 'https://sketchfab.com',
    },
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled through time and learned so much about Ancient Egypt!',
      'You discovered that Egyptian gods got their names from words describing their powers. Ra meant "sun" because he carried the sun across the sky. Isis was "she of the throne" because she was the most powerful goddess. And Anubis guided the dead because jackals were found near cemeteries.',
      'You met legendary pharaohs like Hatshepsut, the woman who wore a fake beard to rule as pharaoh, and Khufu, who built the Great Pyramid. You learned about Ramesses the Great, who reigned for 70 years, and Cleopatra, the brilliant last pharaoh. You also met Imhotep, the genius priest who became a god!',
      'And you explored how this mighty civilization declined: split by powerful priests, weakened by lack of iron, conquered by Assyrians, Persians, and Greeks, and finally absorbed by Rome. But Egypt\'s legacy lives on in our mathematics, our calendar, our alphabet, and our endless fascination with pyramids and mummies.',
      'Keep exploring history! Every civilization has amazing stories waiting to be discovered!',
    ],
  },
};
