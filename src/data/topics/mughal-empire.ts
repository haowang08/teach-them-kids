import type { Topic } from '../types';

export const mughalEmpire: Topic = {
  id: 'mughal-empire',
  slug: 'mughal-empire',
  title: 'The Mughal Empire',
  subtitle:
    'Builders of the Taj Mahal & Masters of Tolerance',
  status: 'active',
  themeId: 'mughal-empire',
  heroIcons: ['\u{1F54C}', '\u{1F451}', '\u{1F91D}'],
  navItems: [
    { id: 'who-were-mughals', icon: '\u{1F451}', label: 'The Mughals' },
    { id: 'akbar-tolerance', icon: '\u{1F91D}', label: 'Akbar' },
    { id: 'taj-mahal', icon: '\u{1F54C}', label: 'Taj Mahal' },
    { id: 'art-culture', icon: '\u{1F3A8}', label: 'Art & Culture' },
    { id: 'daily-life', icon: '\u{1F3D8}\uFE0F', label: 'Daily Life' },
    { id: 'decline', icon: '\u{1F305}', label: 'The Decline' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'who-were-mughals',
      icon: '\u{1F451}',
      title: 'Who Were the Mughals?',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Imagine being a young prince, only twelve years old, who already dreams of building an empire. Now imagine that your great-great-great-grandfather on one side was Genghis Khan \u2014 the most fearsome conqueror the world had ever known \u2014 and on the other side, you were descended from Timur, also called Tamerlane, who had built a vast empire stretching from Turkey to India. That young prince was named Babur, and he was about to change the history of India forever!',
            'Babur lost his first kingdom as a teenager, wandered for years as a refugee, and nearly gave up on his dreams. But in 1526, with just 12,000 soldiers, he faced an enemy army of 100,000 warriors at the Battle of Panipat in northern India. Against all odds, Babur won! He used a secret weapon that Indian armies had never seen before: cannons and muskets. The thundering guns terrified the enemy\'s war elephants, sending them stampeding through their own troops!',
            'That incredible victory launched the Mughal Empire \u2014 one of the greatest and richest empires in all of human history. The word "Mughal" actually comes from "Mongol," because of the family\'s connection to Genghis Khan. But the Mughals were so much more than conquerors. Over the next 300 years, they would build the Taj Mahal, create a revolutionary system of religious tolerance, blend Persian, Islamic, and Indian cultures into something entirely new, and rule over one of the wealthiest civilizations the world has ever seen!',
            'Get ready to explore the rise and fall of the Mughal Empire, meet emperors who were warrior poets and master builders, and discover how this empire shaped the food, art, and culture of India in ways that still live on today!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'nbuM0aJjVgE',
          title: 'The Mughal Empire and Historical Reputation',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Akbar the Great ─────────────────────────────
    {
      id: 'akbar-tolerance',
      icon: '\u{1F91D}',
      title: 'Akbar the Great \u2014 Master of Tolerance',
      readAloudBlocks: [
        {
          id: 'akbar-text',
          paragraphs: [
            'Of all the Mughal emperors, none was more extraordinary than Akbar. He became emperor at just thirteen years old, after his father Humayun died in a tragic accident \u2014 he slipped on the stairs of his library! Young Akbar inherited a shaky empire surrounded by enemies. But over the next fifty years, he transformed it into one of the most powerful and progressive civilizations on Earth.',
            'Here\'s what made Akbar truly special: he believed that people of all religions should live together in peace and respect. In 1564, he did something revolutionary \u2014 he abolished the "jizya," a special tax that non-Muslims had to pay. This was an incredibly bold move! He then created a policy called "Sulh-i-Kul," which means "Universal Peace." Under this policy, Hindus, Muslims, Christians, Jains, Zoroastrians, and people of all faiths were treated equally in his empire.',
            'Akbar went even further. In 1575, he built the Ibadat Khana \u2014 the "House of Worship" \u2014 in his magnificent new city of Fatehpur Sikri. Here, scholars from every religion in the world came together to debate and share their ideas. Imagine a room where Hindu priests, Muslim scholars, Catholic missionaries from faraway Portugal, Jain monks, and Zoroastrian priests all sat together, discussing the biggest questions about life \u2014 and the emperor listened to every single one of them!',
            'And here\'s a truly amazing fact about Akbar: he could not read or write! But that didn\'t stop him. He had people read books aloud to him and memorized entire libraries worth of knowledge. He spoke multiple languages, understood complex philosophy, and was considered one of the sharpest minds of his age. Akbar proved that wisdom doesn\'t come from books alone \u2014 it comes from listening, thinking, and keeping an open mind.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F91D}',
          name: 'Akbar',
          title: 'The Great Unifier (1556\u20131605 CE)',
          description:
            'Became emperor at thirteen years old and created a policy of religious tolerance that was centuries ahead of its time. He couldn\'t read or write, but had one of the sharpest minds in history! He built the House of Worship where scholars of every faith debated together.',
          extraTag: 'Policy: Sulh-i-Kul (Universal Peace)',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Shah Jahan',
          title: 'The Master Builder (1628\u20131658 CE)',
          description:
            'Built the Taj Mahal as a monument of love for his wife Mumtaz Mahal. He also constructed the Red Fort in Delhi and the legendary Peacock Throne, which was studded with priceless gems including the famous Koh-i-Noor diamond!',
          extraTag: 'Built: Taj Mahal',
        },
        {
          emoji: '\u{2694}\uFE0F',
          name: 'Babur',
          title: 'The Tiger Prince (1526\u20131530 CE)',
          description:
            'Descended from Genghis Khan and Timur, this adventurous young prince conquered India with a tiny army of just 12,000 soldiers against 100,000 at the Battle of Panipat. He also wrote a famous autobiography and loved gardens!',
          extraTag: 'Founded: The Mughal Dynasty',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Akbar held debates between scholars of every religion in his House of Worship. Imagine a room where Hindu priests, Muslim scholars, Catholic missionaries, and Jain monks all argued about the meaning of life \u2014 and the emperor listened to everyone! This level of religious dialogue was almost unheard of anywhere in the world at that time.',
        },
      ],
      videos: [
        {
          youtubeId: 'fMsmCxIEQr4',
          title: 'The Rise and Fall of the Mughal Empire',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['mughal-q1a', 'mughal-q1b', 'mughal-q1c'],
    },

    // ─── Section 2: Building the Taj Mahal ──────────────────────
    {
      id: 'taj-mahal',
      icon: '\u{1F54C}',
      title: 'Building the Taj Mahal: A Monument of Love',
      readAloudBlocks: [
        {
          id: 'taj-mahal-text',
          paragraphs: [
            'The Taj Mahal is often called the most beautiful building in the world, and when you hear the story of why it was built, you\'ll understand why it touches people\'s hearts. Emperor Shah Jahan was deeply in love with his wife, Mumtaz Mahal. She was his trusted companion and advisor, and they were inseparable for nineteen years. When Mumtaz died in 1631 while giving birth to their fourteenth child, Shah Jahan was so heartbroken that his hair reportedly turned white overnight.',
            'To honor her memory, Shah Jahan decided to build the most magnificent monument the world had ever seen. Construction began in 1632 and took an incredible twenty-two years to complete! Over 20,000 workers and 1,000 elephants labored day and night. The gleaming white marble was brought from Rajasthan, 300 kilometers away. But the marble was just the beginning \u2014 the Taj Mahal is decorated with twenty-eight different types of precious and semi-precious stones! Jade came from China, turquoise from Tibet, sapphires from Sri Lanka, and lapis lazuli from Afghanistan.',
            'The engineering of the Taj Mahal is pure genius. See those four tall towers called minarets at the corners? They lean slightly outward on purpose! The architects designed them so that if an earthquake ever toppled them, they would fall away from the precious central dome instead of crashing into it. That\'s incredibly clever thinking from 400 years ago!',
            'And here\'s something magical: the Taj Mahal changes color throughout the day. At dawn, it glows a soft pink. At noon, it shines brilliant white. At sunset, it turns golden. And by moonlight, it shimmers silver. The builders chose this particular marble because they knew it would interact with light in this extraordinary way. The Taj Mahal isn\'t just a building \u2014 it\'s a work of art that\'s different every time you look at it!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Taj Mahal\'s four minarets are designed to lean slightly outward so that if an earthquake toppled them, they would fall away from the precious central dome rather than crashing into it. Smart engineering from 400 years ago! The building is also perfectly symmetrical \u2014 except for Shah Jahan\'s own tomb, which was added later and breaks the symmetry.',
        },
      ],
      videos: [
        {
          youtubeId: 'v580zy82rcE',
          title: 'Is This the Most Beautiful Building in the World?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['mughal-q2a', 'mughal-q2b', 'mughal-q2c'],
    },

    // ─── Section 3: Art, Architecture, and Culture ──────────────
    {
      id: 'art-culture',
      icon: '\u{1F3A8}',
      title: 'Art, Architecture, and Culture: A Dazzling Blend',
      readAloudBlocks: [
        {
          id: 'art-culture-text',
          paragraphs: [
            'The Mughals were artists as much as they were rulers. They created a dazzling new style by blending three great traditions: Persian elegance, Islamic geometry, and Indian color and energy. The result was something the world had never seen before \u2014 and it\'s still breathtaking today!',
            'Mughal artists created some of the most incredible miniature paintings in history. These tiny masterpieces, sometimes no bigger than a book page, show incredibly detailed scenes of court life, epic battles, hunting expeditions, and the natural world. Artists used brushes made from just a few squirrel hairs to paint details so fine you need a magnifying glass to see them! Emperors kept massive libraries of these illustrated books, and court painters were considered some of the most important people in the empire.',
            'The Mughals also built on a massive scale. The Red Fort in Delhi, with its towering sandstone walls stretching over two kilometers, was the heart of Mughal power. Inside, the walls were lined with white marble and decorated with precious stones. The legendary Peacock Throne sat here \u2014 made of solid gold and studded with the Koh-i-Noor diamond and thousands of rubies, emeralds, and pearls. It was so valuable that when a Persian invader stole it in 1739, it helped fund an entire empire!',
            'And the Mughals gave the world an entirely new language! Urdu developed in the Mughal army camps as a blend of Persian, Arabic, Turkish, and Hindi. Today, over 230 million people speak Urdu. The Mughals also designed the famous "charbagh" gardens \u2014 four-part Persian gardens with flowing water channels, fragrant flowers, and shady trees. These gardens were meant to be a little piece of paradise on Earth!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Many foods we enjoy today were invented or perfected in Mughal kitchens \u2014 biryani, naan bread, samosas, and even ice cream flavored with saffron and pistachios! The Mughals loved elaborate feasts with hundreds of dishes, and their royal chefs were treated like superstars.',
        },
      ],
      videos: [],
      quizIds: ['mughal-q3a', 'mughal-q3b'],
    },

    // ─── Section 4: Daily Life ─────────────────────────────────
    {
      id: 'daily-life',
      icon: '\u{1F3D8}\uFE0F',
      title: 'Daily Life in the Mughal Empire',
      readAloudBlocks: [
        {
          id: 'daily-life-text',
          paragraphs: [
            'At its peak, the Mughal Empire was one of the richest civilizations in the entire world. Historians estimate that it controlled an astonishing twenty-five percent of the entire world\'s economy! That means one out of every four coins\' worth of goods produced on the whole planet came from Mughal India. The empire\'s bustling cities were filled with bazaars selling silk, spices, jewels, and textiles that traders carried to markets in Europe, Africa, and East Asia.',
            'Cities like Delhi, Agra, and Lahore were thriving metropolises with wide streets, magnificent mosques, and caravanserais \u2014 roadside inns where traveling merchants could rest, feed their horses, and trade stories from distant lands. A sophisticated postal system with horse-mounted messengers kept the vast empire connected, carrying messages across hundreds of kilometers in just days.',
            'Education was highly valued in the Mughal Empire. Madrasas \u2014 schools attached to mosques \u2014 taught reading, writing, mathematics, and religion. Children from wealthy families also studied poetry, music, and calligraphy. The Mughals believed that beautiful handwriting was a sign of a cultured mind!',
            'Women in the royal court had surprising influence. Nur Jahan, the wife of Emperor Jahangir, was one of the most powerful women in the world during her time. She effectively co-ruled the empire, issued her own coins, and was a skilled hunter and sharp political strategist. The whole empire celebrated festivals together \u2014 Diwali, Eid, Holi, and Nauroz (the Persian New Year) were enjoyed by people of all faiths, reflecting Akbar\'s vision of harmony between communities.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Nur Jahan, wife of Emperor Jahangir, was one of the most powerful women in the medieval world. She issued coins in her own name, designed buildings and gardens, and was famous for once killing four tigers with just six shots on a royal hunt!',
        },
      ],
      videos: [],
      quizIds: ['mughal-q4a'],
    },

    // ─── Section 5: Decline & Fall ─────────────────────────────
    {
      id: 'decline',
      icon: '\u{1F305}',
      title: 'The Long Decline of the Mughal Empire',
      readAloudBlocks: [
        {
          id: 'decline-intro-text',
          paragraphs: [
            'For nearly two hundred years, the Mughal Empire was a beacon of wealth, art, and tolerance. But in 1658, everything began to change when Emperor Aurangzeb seized the throne from his own father, Shah Jahan \u2014 and locked him in a room in Agra Fort for the rest of his life. Legend says Shah Jahan spent his final years gazing out at the Taj Mahal, the monument he built for his beloved wife, visible in the distance across the river.',
            'Aurangzeb was a brilliant military commander who expanded the empire to its largest size ever, stretching from Afghanistan to the southern tip of India. But he made a fateful decision that would tear the empire apart: he reversed the tolerance policies that had held the empire together. He reinstated the jizya tax on non-Muslims and destroyed Hindu temples, creating deep anger and resentment among millions of his subjects.',
            'Rebellions erupted across the empire. The Marathas, led by the legendary warrior Shivaji, built a powerful kingdom in western India. The Sikhs rose in defiance in the north. Constant wars drained the treasury, and the empire that had once controlled a quarter of the world\'s wealth was going bankrupt. When Aurangzeb died in 1707 after nearly fifty years of exhausting warfare, the empire shattered like glass. Regional governors declared independence, and rival kingdoms carved up Mughal territory.',
          ],
        },
        {
          id: 'decline-outro-text',
          paragraphs: [
            'Into this chaos stepped a new power: the British East India Company. What started as a humble trading company gradually became the real power behind the Mughal throne. The last Mughal emperor, Bahadur Shah II, was little more than a figurehead. In 1857, after a massive Indian rebellion against British control, the British exiled the last emperor to Burma, officially ending over 300 years of Mughal rule.',
            'But the Mughal legacy lives on everywhere! The Taj Mahal is one of the Seven Wonders of the Modern World and a symbol of India itself. Mughal cuisine \u2014 biryani, naan, samosas, and kebabs \u2014 is loved by billions of people worldwide. The Urdu language, Mughal architecture, miniature painting traditions, and the dream of religious tolerance all trace back to this incredible empire.',
            'Akbar\'s vision of "Sulh-i-Kul" \u2014 Universal Peace between all religions \u2014 was an idea far ahead of its time. In a world that still struggles with intolerance, the story of the Mughal Empire reminds us that some of history\'s greatest achievements came from bringing different cultures together, not keeping them apart!',
          ],
        },
      ],
      timeline: [
        {
          year: '1526 CE',
          title: 'Empire Founded',
          description:
            'Babur defeats Sultan Ibrahim Lodi at the Battle of Panipat with just 12,000 soldiers against 100,000, founding the Mughal Empire.',
        },
        {
          year: '1556 CE',
          title: 'Akbar Takes Power',
          description:
            'Thirteen-year-old Akbar becomes emperor and begins transforming India with his vision of tolerance and unity.',
        },
        {
          year: '1564 CE',
          title: 'Jizya Abolished',
          description:
            'Akbar eliminates the tax on non-Muslims \u2014 a revolutionary act of religious tolerance unmatched anywhere in the world.',
        },
        {
          year: '1575 CE',
          title: 'House of Worship Built',
          description:
            'Akbar builds the Ibadat Khana at Fatehpur Sikri, where scholars of all religions come together to debate.',
        },
        {
          year: '1605 CE',
          title: 'Jahangir\'s Rule',
          description:
            'Akbar\'s son Jahangir continues the empire; his wife Nur Jahan becomes one of the most powerful women in the world.',
        },
        {
          year: '1631 CE',
          title: 'Taj Mahal Begins',
          description:
            'Shah Jahan begins building the Taj Mahal in memory of his beloved wife Mumtaz Mahal.',
        },
        {
          year: '1653 CE',
          title: 'Taj Mahal Complete',
          description:
            'After twenty-two years and 20,000 workers, the Taj Mahal is finished \u2014 a masterpiece of marble, gems, and engineering.',
        },
        {
          year: '1658 CE',
          title: 'Aurangzeb\'s Rule',
          description:
            'Aurangzeb seizes the throne, expands the empire to its largest size, but reverses tolerance policies.',
        },
        {
          year: '1707 CE',
          title: 'Empire Fractures',
          description:
            'Aurangzeb dies after fifty years of warfare. The empire rapidly splinters as regional powers rise.',
        },
        {
          year: '1857 CE',
          title: 'Last Emperor Exiled',
          description:
            'Bahadur Shah II, the last Mughal emperor, is exiled by the British after the Indian Rebellion, ending 331 years of Mughal rule.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Taj Mahal is one of the New Seven Wonders of the World and appears on almost every list of the most beautiful buildings ever constructed. Over eight million people visit it every year, and it has been called "a teardrop on the cheek of time" by the poet Rabindranath Tagore.',
        },
      ],
      videos: [
        {
          youtubeId: 'x1trgRlaw6Y',
          title: 'The Warrior Who Defeated the Mighty Mughals',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['mughal-q5a', 'mughal-q5b'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Akbar the Great
    {
      id: 'mughal-q1a',
      sectionId: 'akbar-tolerance',
      title: 'Quick Quiz Time!',
      question: 'Who founded the Mughal Empire by winning the Battle of Panipat in 1526?',
      options: [
        { text: 'Akbar', isCorrect: false },
        { text: 'Babur', isCorrect: true },
        { text: 'Shah Jahan', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mughal-q1b',
      sectionId: 'akbar-tolerance',
      title: 'Tolerance Challenge!',
      question: 'What did Akbar do that was revolutionary for religious tolerance?',
      options: [
        { text: 'He forced everyone to convert to one religion', isCorrect: false },
        { text: 'He abolished the jizya tax on non-Muslims', isCorrect: true },
        { text: 'He banned all religious celebrations', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mughal-q1c',
      sectionId: 'akbar-tolerance',
      title: 'Emperor Quiz!',
      question: 'How old was Akbar when he became emperor?',
      options: [
        { text: '25 years old', isCorrect: false },
        { text: '13 years old', isCorrect: true },
        { text: '5 years old', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Taj Mahal
    {
      id: 'mughal-q2a',
      sectionId: 'taj-mahal',
      title: 'Taj Mahal Quiz!',
      question: 'Why was the Taj Mahal built?',
      options: [
        { text: 'As a fort for soldiers', isCorrect: false },
        { text: 'As a memorial for Shah Jahan\'s beloved wife Mumtaz Mahal', isCorrect: true },
        { text: 'As a school for children', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mughal-q2b',
      sectionId: 'taj-mahal',
      title: 'Engineering Challenge!',
      question: 'Why do the Taj Mahal\'s minarets lean slightly outward?',
      options: [
        { text: 'It was a building mistake', isCorrect: false },
        { text: 'To look more artistic', isCorrect: false },
        { text: 'So they would fall away from the dome in an earthquake', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mughal-q2c',
      sectionId: 'taj-mahal',
      title: 'Gem Quiz!',
      question: 'How many types of precious and semi-precious stones are inlaid in the Taj Mahal?',
      options: [
        { text: '3', isCorrect: false },
        { text: '28', isCorrect: true },
        { text: '100', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Art & Culture
    {
      id: 'mughal-q3a',
      sectionId: 'art-culture',
      title: 'Culture Quiz!',
      question: 'What popular food today came from Mughal kitchens?',
      options: [
        { text: 'Pizza and pasta', isCorrect: false },
        { text: 'Biryani and naan', isCorrect: true },
        { text: 'Sushi and ramen', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mughal-q3b',
      sectionId: 'art-culture',
      title: 'Language Quiz!',
      question:
        'What famous ancestors was Babur descended from?',
      options: [
        { text: 'Julius Caesar and Cleopatra', isCorrect: false },
        { text: 'Alexander the Great and King David', isCorrect: false },
        { text: 'Timur (Tamerlane) and Genghis Khan', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Daily Life
    {
      id: 'mughal-q4a',
      sectionId: 'daily-life',
      title: 'Daily Life Quiz!',
      question:
        'What percentage of the world\'s economy did the Mughal Empire control at its peak?',
      options: [
        { text: 'About 5%', isCorrect: false },
        { text: 'About 25%', isCorrect: true },
        { text: 'About 75%', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Decline
    {
      id: 'mughal-q5a',
      sectionId: 'decline',
      title: 'Decline Quiz!',
      question: 'What caused the Mughal Empire to decline?',
      options: [
        { text: 'A natural disaster destroyed all the cities', isCorrect: false },
        {
          text: 'Aurangzeb reversed tolerance, constant wars, and rising regional powers',
          isCorrect: true,
        },
        { text: 'Everyone moved to another continent', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mughal-q5b',
      sectionId: 'decline',
      title: 'Final Challenge!',
      question:
        'How long did it take to build the Taj Mahal?',
      options: [
        { text: '2 years', isCorrect: false },
        { text: '22 years', isCorrect: true },
        { text: '100 years', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'mughal-essay',
    prompt:
      'Emperor Akbar believed that people of all religions should live in peace and respect each other. He even built a special room where scholars from every faith could discuss their ideas. Do you think Akbar\'s approach was a good idea? Why or why not? How could his ideas about tolerance help us today?',
    description:
      'Think about everything you\'ve learned about Akbar\'s policy of Sulh-i-Kul (Universal Peace) and his House of Worship. Why do you think he wanted people of different religions to talk to each other? What can we learn from his example? Do you see ways his ideas could be useful in the world today? Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Wonderful thinking! Your ideas about tolerance and peace are inspiring. Akbar himself would be proud of your wisdom!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'mughal-reward',
    title: 'Taj Mahal Architect!',
    description:
      'Design and build your own Mughal monument! Lay the marble foundation, stack the dome, arches, and minarets, inlay precious gems into decorative patterns, and design a beautiful charbagh garden with flowing water channels. Watch the day cycle from dawn to night as your monument changes color!',
    lockMessage: 'Blueprint Plans Locked!',
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
    type: 'taj-architect',
    celebrationMessage:
      'Your monument is complete! Shah Jahan himself would marvel at your creation! \u{1F54C}\u{1F48E}\u2728',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through one of the most magnificent empires in history!',
      'You discovered how Babur, a young prince descended from Genghis Khan and Timur, defeated an army of 100,000 with just 12,000 soldiers to found the Mughal Empire. You met Akbar the Great, who couldn\'t read but created a revolutionary policy of religious tolerance called Sulh-i-Kul \u2014 Universal Peace \u2014 that was centuries ahead of its time.',
      'You explored the breathtaking Taj Mahal, built by Shah Jahan over twenty-two years with 20,000 workers and twenty-eight types of precious stones \u2014 a monument of love that changes color from dawn to midnight. You discovered how the Mughals blended Persian, Islamic, and Indian art into something entirely new, creating miniature paintings, the Urdu language, and foods like biryani and naan that billions of people enjoy today.',
      'You learned about daily life in an empire that controlled one-quarter of the world\'s wealth, with bustling bazaars, powerful women like Nur Jahan, and festivals celebrated by people of all faiths. And you saw how Aurangzeb\'s reversal of tolerance led to the empire\'s decline, as regional powers rose and the British East India Company gradually took control.',
      'The Mughal legacy lives on in the Taj Mahal, in the food we eat, in the Urdu language, and most importantly, in Akbar\'s dream that people of all backgrounds can live together in peace. That dream is still worth fighting for today!',
      'Keep exploring history \u2014 every empire has incredible stories waiting to be discovered!',
    ],
  },
};
