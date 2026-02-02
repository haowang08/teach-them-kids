import type { Topic } from '../types';

export const incaEmpire: Topic = {
  id: 'inca-empire',
  slug: 'inca-empire',
  title: 'The Inca Empire',
  subtitle: 'Empire in the Clouds',
  status: 'active',
  themeId: 'inca-empire',
  heroIcons: ['\u2600\uFE0F', '\u{1F3D4}\uFE0F', '\u{1F999}'],
  navItems: [
    { id: 'gods', icon: '\u2600\uFE0F', label: 'Gods & Beliefs' },
    { id: 'rulers', icon: '\u{1F451}', label: 'Great Rulers' },
    { id: 'inventions', icon: '\u{1F9F6}', label: 'Inventions & Daily Life' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F30E}',
      title: 'Welcome to the Inca Empire!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Are you ready to explore the greatest empire the Americas have ever seen? We\'re heading high into the Andes Mountains to discover the Inca Empire, a civilization so incredible that even today, scientists and engineers are amazed by what they achieved!',
            'The Inca Empire was the largest empire in the Americas before Columbus arrived. Without wheels, horses, iron tools, or even a written language, they built over 25,000 miles of roads, constructed cities in the clouds like the legendary Machu Picchu, and connected nearly 10 million people across mountains, deserts, and jungles.',
            'The Inca invented freeze-dried food thousands of years before modern science, used knotted strings called quipu instead of writing to keep records, and built stone walls so precisely that you can\'t fit a razor blade between the blocks. Get ready to discover how they did all of this and more!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: '',
          title: 'The Rise and Fall of the Inca Empire',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Gods & Beliefs ──────────────────────────────
    {
      id: 'gods',
      icon: '\u2600\uFE0F',
      title: 'Inca Gods & Beliefs: The Three Worlds',
      readAloudBlocks: [
        {
          id: 'gods-intro-text',
          paragraphs: [
            'The Inca believed the universe was divided into three parts. Hanan Pacha was the upper world where the gods lived, including the sun, moon, and stars. Kay Pacha was the middle world where humans lived their everyday lives. And Uku Pacha was the inner world below the earth, the realm of the dead and of new life waiting to be born.',
            'The most important god was Inti, the sun god. The Inca emperor was believed to be a direct descendant of Inti, which made the emperor not just a ruler but a living link to the divine. Every year, the Inca held the spectacular Inti Raymi festival to honor the sun god and ensure good harvests.',
            'Pachamama, or Mother Earth, was deeply loved by the Inca people. She was the goddess of the earth, fertility, and crops. Amazingly, Pachamama is still honored in Peru today! People pour a little of their drink on the ground before taking a sip, a tradition called "paying the earth" that has lasted for hundreds of years.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u2600\uFE0F',
          name: 'Inti',
          title: 'The Sun God',
          description:
            'Inti was the most important god in the Inca religion. The emperor was believed to be his living descendant, which gave the ruler divine authority over the entire empire. The great Temple of the Sun in Cusco, called Coricancha, was covered in sheets of gold to reflect the brilliance of Inti. Every year, the magnificent Inti Raymi festival was held in his honor, a celebration so grand that it is still reenacted in Cusco today!',
          extraTag: 'Sacred metal: Gold',
        },
        {
          emoji: '\u{1F30D}',
          name: 'Pachamama',
          title: 'Mother Earth',
          description:
            'Pachamama was the beloved goddess of the earth, fertility, and crops. She was believed to live within the mountains and helped plants grow and harvests succeed. The Inca made offerings to her before planting and harvesting to ensure her blessing. Remarkably, Pachamama is still honored in Peru and Bolivia today. People pour a little of their drink on the ground before taking a sip, a tradition that has been practiced for hundreds of years!',
          extraTag: 'Still honored: In Peru today',
        },
        {
          emoji: '\u2B50',
          name: 'Viracocha',
          title: 'The Creator God',
          description:
            'Viracocha was the supreme creator god who made the sun, moon, stars, and the earth itself. According to legend, he rose from the waters of Lake Titicaca at the beginning of time. He shaped humans from clay, breathed life into them, and taught them how to live. After creating the world, Viracocha walked westward across the Pacific Ocean and disappeared, promising one day to return.',
          extraTag: 'Origin: Rose from Lake Titicaca',
        },
      ],
      funFacts: [
        {
          title: 'Paying the Earth!',
          text: 'People in Peru still honor Pachamama today by pouring a little of their drink on the ground before taking a sip. This tradition, called "paying the earth," has been practiced for hundreds of years!',
        },
      ],
      videos: [],
      quizIds: ['inca-q1a', 'inca-q1b', 'inca-q1c'],
    },

    // ─── Section 2: Great Rulers & Legends ──────────────────────
    {
      id: 'rulers',
      icon: '\u{1F451}',
      title: 'Great Rulers & Legends',
      readAloudBlocks: [
        {
          id: 'rulers-intro-text',
          paragraphs: [
            'The history of the Inca Empire stretches from the mythical founding by Manco Capac, who was sent by the sun god to bring civilization to the world, to the mighty Pachacuti who transformed a small kingdom into the largest empire in the Americas, to the tragic Atahualpa, whose capture by Spanish conquistadors brought the entire empire crashing down.',
            'These rulers shaped one of the most remarkable civilizations in human history. Some are shrouded in legend, others are well-documented by history, but all of them played a role in the rise and fall of the Empire of the Four Quarters.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u2728',
          name: 'Manco Capac',
          title: 'The First Inca',
          description:
            'Manco Capac was the legendary founder of the Inca civilization. According to myth, the sun god Inti sent Manco Capac and his sister-wife Mama Ocllo from the sacred Island of the Sun in Lake Titicaca to bring civilization, order, and knowledge to the people of the world. They traveled until they found the perfect valley, where Manco Capac plunged a golden staff into the earth. The spot where it sank became the city of Cusco, the "navel of the world" and capital of the Inca Empire!',
          extraTag: 'Founded: The city of Cusco',
        },
        {
          emoji: '\u{1F3D4}\uFE0F',
          name: 'Pachacuti',
          title: 'The Earth-Shaker',
          description:
            'Pachacuti was the ninth emperor and the greatest ruler in Inca history. His name means "he who overturns space and time," and he certainly lived up to it! He transformed a small kingdom around Cusco into the massive Tahuantinsuyu, the Empire of the Four Quarters. He redesigned Cusco into the shape of a puma, built the magnificent Coricancha golden temple covered in gold sheets, and constructed the legendary mountaintop city of Machu Picchu. He was the Inca Alexander the Great!',
          extraTag: 'Built: Machu Picchu',
        },
        {
          emoji: '\u{1F517}',
          name: 'Atahualpa',
          title: 'The Last Emperor',
          description:
            'Atahualpa had just won a brutal civil war against his brother Huascar when disaster struck. In 1532, the Spanish conquistador Francisco Pizarro arrived with fewer than 200 soldiers. Through trickery and surprise, Pizarro captured Atahualpa at the Battle of Cajamarca. Desperate for freedom, Atahualpa offered to fill an entire room with gold and two rooms with silver, one of the largest ransoms in history. The Spanish took the treasure but executed him anyway in 1533, and the mighty Inca Empire came to an end.',
          extraTag: 'Captured: By Francisco Pizarro in 1532',
        },
      ],
      funFacts: [
        {
          title: 'A Room Full of Gold!',
          text: 'When Atahualpa was captured, he offered to fill an entire room with gold and two rooms with silver to buy his freedom. The Spanish accepted the ransom \u2014 one of the largest in history \u2014 but executed him anyway!',
        },
        {
          title: 'Stone Walls Without Cement!',
          text: 'Inca builders cut massive stones to fit together so precisely that no mortar (cement) was needed. These buildings have survived earthquakes for over 500 years! Even modern engineers are amazed.',
        },
      ],
      videos: [],
      quizIds: ['inca-q2a', 'inca-q2b', 'inca-q2c', 'inca-q2d'],
    },

    // ─── Section 3: Amazing Inventions & Daily Life ──────────────
    {
      id: 'inventions',
      icon: '\u{1F9F6}',
      title: 'Amazing Inventions & Daily Life',
      readAloudBlocks: [
        {
          id: 'inventions-intro-text',
          paragraphs: [
            'Here\'s where the Inca Empire gets truly mind-blowing. Remember, the Inca had no wheels, no horses, no iron tools, and no written language. And yet they built one of the most advanced civilizations in the world! How? Through incredible ingenuity and teamwork.',
            'They created the quipu, a system of colorful knotted strings that recorded numbers, counted food supplies, tracked populations, and sent messages across the empire. Only special officials called Quipucamayoc could read them. It was like an ancient computer made of string!',
            'They built over 25,000 miles of roads through some of the most extreme terrain on Earth, including mountains, jungles, and deserts. Relay runners called chasqui could carry messages up to 250 miles in a single day by passing them from runner to runner, faster than any horse! They invented freeze-dried potatoes called chu\u00F1o that could last up to 10 years. They carved terraces into steep mountainsides to grow crops. They built suspension bridges over deep canyons. And their stonework? So precise that even 500 years and countless earthquakes later, the walls still stand perfectly.',
          ],
        },
      ],
      timeline: [
        {
          year: '~1200 AD',
          title: 'Founding of Cusco',
          description:
            'According to legend, Manco Capac founded the city of Cusco, which would become the capital and heart of the Inca Empire. The name Cusco means "navel of the world" in the Quechua language. From this small city in a mountain valley, a mighty empire would one day grow.',
        },
        {
          year: '1438',
          title: 'Pachacuti Transforms the Empire',
          description:
            'The great ruler Pachacuti defeated the powerful Chanca people and began transforming the small Inca kingdom into a massive empire. He redesigned Cusco, built the golden Coricancha temple and the legendary Machu Picchu, and created the system of roads and government that held the empire together.',
        },
        {
          year: '~1470\u20131525',
          title: 'Empire at Its Peak',
          description:
            'The Inca Empire reached its greatest size, stretching 2,500 miles along the western coast of South America. It connected nearly 10 million people across modern-day Peru, Ecuador, Bolivia, Chile, Argentina, and Colombia. Over 25,000 miles of roads linked the empire together, with chasqui runners carrying messages at incredible speed.',
        },
        {
          year: '1527\u20131532',
          title: 'Civil War & Disease',
          description:
            'European diseases like smallpox arrived before the Spanish themselves, killing Emperor Huayna Capac and millions of Inca people. A devastating civil war erupted between his sons Atahualpa and Huascar, tearing the empire apart just as the greatest threat was approaching from across the ocean.',
        },
        {
          year: '1532\u20131533',
          title: 'Spanish Conquest',
          description:
            'Spanish conquistador Francisco Pizarro arrived with fewer than 200 soldiers. Through surprise, trickery, and superior weapons, he captured Emperor Atahualpa at Cajamarca. Despite receiving an enormous ransom of gold and silver, the Spanish executed Atahualpa in 1533. The Inca Empire, which had stood for over 300 years, was brought to its knees.',
        },
      ],
      funFacts: [
        {
          title: 'The Inca Invented Freeze-Dried Food!',
          text: 'They created "chu\u00F1o" \u2014 freeze-dried potatoes \u2014 by leaving potatoes out in the freezing Andes nights and drying them in the sun. These could last up to 10 years! They also grew over 3,000 types of potatoes!',
        },
        {
          title: 'Knotted String Computers!',
          text: 'Instead of writing, the Inca used "quipu" \u2014 bundles of colorful knotted strings \u2014 to record numbers, count food, and send messages. Only special officials called Quipucamayoc could read them. It was like an ancient computer made of string!',
        },
      ],
      videos: [],
      quizIds: ['inca-q3a', 'inca-q3b', 'inca-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Gods & Beliefs
    {
      id: 'inca-q1a',
      sectionId: 'gods',
      title: 'Quick Quiz Time!',
      question: 'What was the name of the Inca sun god?',
      options: [
        { text: 'Viracocha', isCorrect: false },
        { text: 'Pachamama', isCorrect: false },
        { text: 'Inti', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'inca-q1b',
      sectionId: 'gods',
      title: 'Capital City Challenge!',
      question: 'What was the capital city of the Inca Empire?',
      options: [
        { text: 'Machu Picchu', isCorrect: false },
        { text: 'Cusco', isCorrect: true },
        { text: 'Lima', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'inca-q1c',
      sectionId: 'gods',
      title: 'Emperor Quiz!',
      question: 'What did the Inca believe about their emperor?',
      options: [
        { text: 'He was a great warrior', isCorrect: false },
        {
          text: 'He was a descendant of the sun god',
          isCorrect: true,
        },
        {
          text: 'He was the oldest man in the empire',
          isCorrect: false,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Great Rulers
    {
      id: 'inca-q2a',
      sectionId: 'rulers',
      title: 'Quick Quiz Time!',
      question: 'Who was the Inca ruler that built Machu Picchu?',
      options: [
        { text: 'Atahualpa', isCorrect: false },
        { text: 'Manco Capac', isCorrect: false },
        { text: 'Pachacuti', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'inca-q2b',
      sectionId: 'rulers',
      title: 'Last Emperor Challenge!',
      question: 'Who was the last emperor of the Inca Empire?',
      options: [
        { text: 'Pachacuti', isCorrect: false },
        { text: 'Huayna Capac', isCorrect: false },
        { text: 'Atahualpa', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'inca-q2c',
      sectionId: 'rulers',
      title: 'Conquistador Quiz!',
      question:
        'Which Spanish conquistador captured the last Inca emperor?',
      options: [
        { text: 'Hernan Cortes', isCorrect: false },
        { text: 'Francisco Pizarro', isCorrect: true },
        { text: 'Christopher Columbus', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'inca-q2d',
      sectionId: 'rulers',
      title: 'Ransom Challenge!',
      question: 'What did Atahualpa offer for his freedom?',
      options: [
        { text: 'His army', isCorrect: false },
        { text: 'A room full of gold', isCorrect: true },
        { text: 'His crown', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Inventions & Daily Life
    {
      id: 'inca-q3a',
      sectionId: 'inventions',
      title: 'Quick Quiz Time!',
      question:
        'What did the Inca use instead of writing to keep records?',
      options: [
        { text: 'Quipu \u2014 knotted strings', isCorrect: true },
        { text: 'Hieroglyphics', isCorrect: false },
        { text: 'Pictures on llama skin', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'inca-q3b',
      sectionId: 'inventions',
      title: 'Road System Challenge!',
      question: 'How long was the Inca road system?',
      options: [
        { text: 'About 500 miles', isCorrect: false },
        { text: 'About 25,000 miles', isCorrect: true },
        { text: 'About 5,000 miles', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'inca-q3c',
      sectionId: 'inventions',
      title: 'Inca Food Quiz!',
      question: 'What was "chu\u00F1o"?',
      options: [
        { text: 'A type of clothing', isCorrect: false },
        { text: 'Freeze-dried potatoes', isCorrect: true },
        { text: 'A musical instrument', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'inca-essay',
    prompt:
      'How do you think the Inca built such an amazing empire without wheels, horses, or even a written language?',
    description:
      'Now it\'s your turn to think like a historian! The Inca achieved incredible things that still amaze scientists and engineers today. How do you think they did it? What made them so successful? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Amazing thinking! Your answer has been saved. You\'re a true Inca explorer!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'inca-reward',
    title: 'Explore Machu Picchu in 3D!',
    description:
      'Click, drag, and zoom to explore the legendary lost city of the Inca in full 3D! This model lets you see Machu Picchu from every angle, perched high in the Andes Mountains.',
    lockMessage: 'Mountain Citadel Locked!',
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
      'https://sketchfab.com/models/a4d9c4fd9de4a0e888cc1e1bf1de9aa/embed',
    embedTitle: 'Machu Picchu',
    celebrationMessage:
      "INCREDIBLE! You've unlocked the lost city of Machu Picchu! You're a true Inca explorer! Keep scrolling for a BONUS challenge!",
    attribution: {
      modelName: 'Machu Picchu',
      modelUrl: 'https://sketchfab.com/3d-models/machu-picchu',
      authorName: 'TBD',
      authorUrl: 'https://sketchfab.com',
      platformUrl: 'https://sketchfab.com',
    },
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through the clouds and discovered the wonders of the Inca Empire!',
      'You learned about the Inca gods and their belief in three worlds: Hanan Pacha above, Kay Pacha where we live, and Uku Pacha below. You discovered Inti the sun god, Pachamama the beloved Mother Earth who is still honored today, and Viracocha the creator who rose from Lake Titicaca.',
      'You met legendary rulers from Manco Capac, who founded Cusco with a golden staff, to Pachacuti the Earth-Shaker who built Machu Picchu and transformed a small kingdom into a mighty empire, to Atahualpa, the last emperor who offered a room full of gold for his freedom.',
      'You explored incredible inventions: the quipu knotted-string record system, the 25,000-mile road network with chasqui runners faster than horses, freeze-dried chu\u00F1o potatoes that lasted 10 years, terrace farming on steep mountainsides, and stonework so precise it has survived 500 years of earthquakes without mortar.',
      'The Inca proved that a civilization doesn\'t need wheels, horses, or writing to achieve greatness. Their legacy lives on today. The Quechua language they spoke is still used by over 8 million people in South America, and Machu Picchu remains one of the most visited wonders of the world. Keep exploring history \u2014 every civilization has amazing stories waiting to be discovered!',
    ],
  },
};
