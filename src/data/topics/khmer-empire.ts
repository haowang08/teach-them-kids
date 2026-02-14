import type { Topic } from '../types';

export const khmerEmpire: Topic = {
  id: 'khmer-empire',
  slug: 'khmer-empire',
  title: 'The Khmer Empire',
  subtitle:
    'Discover the builders of Angkor Wat, masters of water, and rulers of the greatest city in the medieval world!',
  status: 'active',
  themeId: 'khmer-empire',
  heroIcons: ['\u{1F3DB}\uFE0F', '\u{1F418}', '\u{1F4A7}'],
  navItems: [
    { id: 'hidden-city', icon: '\u{1F33F}', label: 'Hidden City' },
    { id: 'god-kings', icon: '\u{1F451}', label: 'God-Kings' },
    { id: 'angkor-wat', icon: '\u{1F3DB}\uFE0F', label: 'Angkor Wat' },
    { id: 'water-masters', icon: '\u{1F4A7}', label: 'Water Masters' },
    { id: 'daily-life', icon: '\u{1F418}', label: 'Daily Life' },
    { id: 'decline', icon: '\u{1F327}\uFE0F', label: 'The Decline' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F33F}',
      title: 'A City Hidden in the Jungle',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Imagine walking through a thick, steamy jungle in Southeast Asia. Vines tangle around your feet, monkeys chatter in the trees above, and giant tree roots twist across the ground. Suddenly, through the green curtain of leaves, you spot something incredible: enormous stone towers rising above the treetops, covered in the most detailed carvings you\'ve ever seen!',
            'This is how the wider world first learned about the ancient city of Angkor. In 1860, a French explorer named Henri Mouhot journeyed deep into the Cambodian jungle and found massive stone temples swallowed by nature. He couldn\'t believe his eyes \u2014 a lost city bigger than anything in Europe at the time!',
            'But here\'s the amazing truth: the city was never really "lost." Local Cambodians always knew it was there! Angkor was the capital of the mighty Khmer Empire, one of the most powerful civilizations in history. At its peak around 1150 CE, it was the largest city in the entire world, home to nearly one million people \u2014 at a time when London had only about 50,000!',
            'Get ready to explore the rise and fall of the Khmer Empire, learn how they built the largest religious monument ever constructed, and discover the incredible water engineering that made it all possible!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'vc2IpOYT1Qw',
          title: 'Angkor Wat Temple History and Facts',
          channelName: 'Mocomi Kids',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: The God-Kings ─────────────────────────────
    {
      id: 'god-kings',
      icon: '\u{1F451}',
      title: 'The Rise of the God-Kings',
      readAloudBlocks: [
        {
          id: 'god-kings-text',
          paragraphs: [
            'The Khmer Empire began in 802 CE when a brilliant leader named Jayavarman II held a special ceremony on sacred Mount Kulen in Cambodia. He declared himself a "Devaraja" \u2014 which means "god-king." This wasn\'t just a fancy title! The people truly believed their king was connected to the Hindu gods, making him the most powerful person in all of Southeast Asia.',
            'From this moment, the Khmer Empire grew and grew. Over the next six centuries, a line of powerful kings expanded the empire until it controlled much of what is today Cambodia, Thailand, Laos, and southern Vietnam. That\'s an area roughly the size of France!',
            'The Khmer kings showed their power by building. Each new king tried to outdo the last with bigger temples, larger reservoirs, and more spectacular cities. This competition led to some of the most incredible construction projects the world has ever seen!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F451}',
          name: 'Jayavarman II',
          title: 'The Founder King (802 CE)',
          description:
            'Jayavarman II united many small, squabbling kingdoms into one mighty empire. He held a sacred ceremony on Mount Kulen declaring himself a god-king, launching a dynasty that would last over 600 years! He moved the capital several times before settling near Angkor.',
          extraTag: 'Title: Devaraja (God-King)',
        },
        {
          emoji: '\u{1F3D7}\uFE0F',
          name: 'Suryavarman II',
          title: 'The Master Builder (1113\u20131150 CE)',
          description:
            'Suryavarman II built the crown jewel of the Khmer Empire: Angkor Wat, the largest religious monument ever constructed! He dedicated it to the Hindu god Vishnu. He also expanded the empire through military campaigns, battling the Chams and the Dai Viet.',
          extraTag: 'Built: Angkor Wat',
        },
        {
          emoji: '\u{1F6E1}\uFE0F',
          name: 'Jayavarman VII',
          title: 'The Warrior Healer (1181\u20131218 CE)',
          description:
            'After the Cham kingdom invaded and sacked Angkor, Jayavarman VII fought back and rebuilt the empire even greater than before. A devoted Buddhist, he constructed Angkor Thom with its famous Bayon temple of giant smiling stone faces. He also built 102 hospitals across the empire, a road network with 121 rest houses, and hundreds of temples!',
          extraTag: 'Built: Angkor Thom & the Bayon',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Bayon temple at the center of Angkor Thom has over 200 giant stone faces carved into its towers. Scholars believe they represent King Jayavarman VII himself, or perhaps the Buddhist deity of compassion, always smiling down on his people!',
        },
      ],
      videos: [
        {
          youtubeId: '0N3l8B2xmyk',
          title: 'Rise & Fall of the Khmer Empire',
          channelName: 'Epimetheus',
        },
      ],
      quizIds: ['khmer-q1a', 'khmer-q1b', 'khmer-q1c', 'khmer-q1d'],
    },

    // ─── Section 2: Building Angkor Wat ──────────────────────
    {
      id: 'angkor-wat',
      icon: '\u{1F3DB}\uFE0F',
      title: 'Building Angkor Wat: A Mountain for the Gods',
      readAloudBlocks: [
        {
          id: 'angkor-wat-text',
          paragraphs: [
            'Angkor Wat is not just a temple \u2014 it\'s a stone model of the entire universe! The Khmer believed that the gods lived on a sacred mountain called Mount Meru at the center of the cosmos. Suryavarman II wanted to build a copy of Mount Meru right here on Earth, and that\'s exactly what Angkor Wat is: five towering stone peaks surrounded by a vast moat representing the cosmic ocean.',
            'Building Angkor Wat was an unbelievable achievement. Workers quarried between 5 and 10 million sandstone blocks from a mountain called Phnom Kulen, about 50 kilometers away. Some of these blocks weighed up to 1,500 kilograms! How did they move them? They floated the massive stones on rafts along a specially built canal system. Brilliant!',
            'The temple\'s walls are covered with nearly 2,000 square meters of intricate bas-relief carvings \u2014 the longest continuous stone carving in the world. These carvings show scenes from Hindu mythology, great battles, and daily life in the Khmer Empire. If you unrolled all the carved panels, they would stretch for over 800 meters!',
            'And here\'s something amazing about the engineering: Angkor Wat is oriented to the west, which is unusual for Hindu temples. During the spring equinox, the sun rises directly over the central tower, creating a breathtaking silhouette. The builders planned this alignment with incredible precision \u2014 without any modern instruments!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Angkor Wat\'s moat is 190 meters wide and stretches 5.5 kilometers around the entire temple. That\'s like swimming across 76 Olympic swimming pools laid end to end! The moat also serves as an engineering marvel \u2014 it stabilizes the ground beneath the massive temple.',
        },
      ],
      videos: [
        {
          youtubeId: 'MSpPUFdYpJI',
          title: 'In Cambodia, a City of Towering Temples in the Forest',
          channelName: 'National Geographic',
        },
      ],
      quizIds: ['khmer-q2a', 'khmer-q2b', 'khmer-q2c'],
    },

    // ─── Section 3: Masters of Water ─────────────────────────
    {
      id: 'water-masters',
      icon: '\u{1F4A7}',
      title: 'Masters of Water: The Secret to Khmer Power',
      readAloudBlocks: [
        {
          id: 'water-text',
          paragraphs: [
            'What made the Khmer Empire so powerful? The answer might surprise you: water! The Khmer were some of the greatest water engineers the ancient world has ever seen. In a region with extreme monsoon seasons \u2014 months of flooding rain followed by months of brutal drought \u2014 they built a system to capture, store, and distribute water all year round.',
            'The Khmer constructed enormous reservoirs called "barays." The largest, the West Baray, is a staggering 8 kilometers long and 2.3 kilometers wide. It held about 50 million cubic meters of water \u2014 enough to fill 20,000 Olympic swimming pools! They also built hundreds of kilometers of canals connecting the barays to rice paddies throughout the region.',
            'This water system was the engine of the empire. While neighboring kingdoms could only grow one rice crop per year, the Khmer\'s irrigation allowed three to four harvests annually. This meant food for hundreds of thousands of people, which meant a massive workforce for building temples, an enormous army, and incredible wealth.',
            'Scientists call Angkor a "hydraulic city" because water was literally the foundation of everything. The barays, canals, moats, and channels formed an interconnected network more advanced than anything else in the medieval world. When this system eventually broke down, the empire broke down with it.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Modern scientists using LIDAR (laser scanning from helicopters) discovered that the Khmer water network was even bigger than anyone imagined. The system of canals, reservoirs, and channels covered an area of over 1,000 square kilometers \u2014 that\'s bigger than the entire city of New York!',
        },
      ],
      videos: [
        {
          youtubeId: 'CjqngMY5Vvo',
          title: 'The Khmer Empire: The Civilization That Built a State Around Water',
          channelName: 'Humanity: Facts & Mysteries',
        },
      ],
      quizIds: ['khmer-q3a', 'khmer-q3b'],
    },

    // ─── Section 4: Daily Life ───────────────────────────────
    {
      id: 'daily-life',
      icon: '\u{1F418}',
      title: 'Life in the Great City of Angkor',
      readAloudBlocks: [
        {
          id: 'daily-life-text',
          paragraphs: [
            'What was it like to live in Angkor? Luckily, we have an eyewitness account! In 1296, a Chinese diplomat named Zhou Daguan visited Angkor and wrote down everything he saw. His descriptions paint a vivid picture of a bustling, vibrant city.',
            'Angkor\'s streets were filled with merchants selling silk, spices, and rice. Royal processions featured hundreds of elephants decorated with gold, musicians playing drums and gongs, and dancers performing sacred dances. The king himself rode a golden elephant and wore a crown glittering with diamonds!',
            'Ordinary people lived in wooden houses built on stilts to protect against flooding. Children helped with rice farming, attended lessons at temple schools, and watched spectacular dance performances that told stories of gods and heroes. The staple food was rice, with fish from the enormous Tonle Sap lake and tropical fruits from the surrounding jungle.',
            'Religion was central to daily life. The empire started as Hindu, worshipping gods like Vishnu and Shiva. Under Jayavarman VII, it gradually shifted toward Buddhism. Both religions coexisted peacefully, and you can see Hindu and Buddhist art side by side in many temples. The Khmer also had their own rich mythology that connected to the natural world around them.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Zhou Daguan noted that in Angkor, women ran most of the market stalls and handled trade. He was amazed at how independent Khmer women were compared to women in China at the time!',
        },
      ],
      videos: [
        {
          youtubeId: 'Ul9ysDvkuLA',
          title: 'The Cambodian Myth of Lightning, Thunder, and Rain',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['khmer-q4a'],
    },

    // ─── Section 5: Decline & Fall ───────────────────────────
    {
      id: 'decline',
      icon: '\u{1F327}\uFE0F',
      title: 'The Mysterious Decline of Angkor',
      readAloudBlocks: [
        {
          id: 'decline-intro-text',
          paragraphs: [
            'For over 600 years, the Khmer Empire was one of the most powerful civilizations on Earth. But by the 15th century, something went terribly wrong. The great city of Angkor was abandoned, the temples fell silent, and the jungle slowly crept in to swallow the stone monuments whole.',
            'What happened? Scientists now believe it was a perfect storm of disasters. Studies of ancient tree rings and lake sediments show that the region was hit by devastating climate change: extreme droughts lasting years at a time, followed by massive monsoon floods. This was catastrophic for the Khmer water system, which depended on a delicate balance of water flow.',
            'At the same time, the powerful Thai kingdom of Ayutthaya attacked repeatedly from the west. Weakened by climate disaster and internal conflicts, the Khmer could no longer defend their capital. In 1431, Thai forces sacked Angkor, and the capital was eventually moved south to Phnom Penh, which remains Cambodia\'s capital today.',
          ],
        },
        {
          id: 'decline-outro-text',
          paragraphs: [
            'But the story of Angkor doesn\'t end there! Angkor Wat appears on Cambodia\'s national flag \u2014 making it the only national flag in the world to feature a building. The temple complex was designated a UNESCO World Heritage Site in 1992, and over two million tourists visit every year.',
            'In 2015, scientists used LIDAR technology (laser scanning from helicopters) to peer through the jungle canopy and discovered an entire hidden city called Mahendraparvata \u2014 completely invisible from the ground! There are still secrets waiting to be discovered beneath the trees.',
            'The Khmer Empire may have fallen, but its engineering achievements, its art, and its temples continue to inspire wonder in people all around the world. Every time you see a picture of Angkor Wat, you\'re looking at the legacy of one of history\'s greatest civilizations!',
          ],
        },
      ],
      timeline: [
        {
          year: '~550 CE',
          title: 'Chenla Kingdoms',
          description:
            'Early Khmer kingdoms form in mainland Southeast Asia, setting the stage for the empire to come.',
        },
        {
          year: '802 CE',
          title: 'Empire Founded',
          description:
            'Jayavarman II declares himself Devaraja (god-king) on Mount Kulen, founding the Khmer Empire and beginning 600 years of power.',
        },
        {
          year: '~900 CE',
          title: 'First Capital at Angkor',
          description:
            'Yasovarman I builds the first great capital at Angkor and constructs the massive East Baray reservoir to control water across the region.',
        },
        {
          year: '1113\u20131150 CE',
          title: 'Angkor Wat Built',
          description:
            'Suryavarman II constructs Angkor Wat, the largest religious monument ever built, dedicated to the Hindu god Vishnu.',
        },
        {
          year: '1181\u20131218 CE',
          title: 'Golden Age',
          description:
            'Jayavarman VII expands the empire to its greatest extent, builds Angkor Thom with the Bayon temple, and constructs 102 hospitals across the realm.',
        },
        {
          year: '~1300 CE',
          title: 'Peak Population',
          description:
            'Angkor reaches nearly one million people, making it the largest city in the world at that time.',
        },
        {
          year: '1350\u20131430 CE',
          title: 'Climate Disasters',
          description:
            'Extreme droughts and floods devastate the water system. Wars with the Thai kingdom of Ayutthaya weaken the empire further.',
        },
        {
          year: '1431 CE',
          title: 'Fall of Angkor',
          description:
            'Thai forces sack Angkor. The capital eventually moves south to Phnom Penh. The jungle slowly reclaims the temples.',
        },
        {
          year: '1860 CE',
          title: 'Rediscovery',
          description:
            'French explorer Henri Mouhot brings Angkor to international attention, though local Cambodians never forgot it was there.',
        },
        {
          year: '1992 CE',
          title: 'UNESCO World Heritage',
          description:
            'Angkor is designated a UNESCO World Heritage Site, protecting it for future generations.',
        },
        {
          year: '2015 CE',
          title: 'LIDAR Discoveries',
          description:
            'Scientists use laser scanning from helicopters to reveal massive hidden cities beneath the jungle canopy, rewriting the history of the Khmer Empire.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Cambodia\'s national flag features Angkor Wat \u2014 it\'s the only flag in the entire world with a building on it! The Khmer people are so proud of this temple that it has appeared on nearly every version of their flag since the 1800s.',
        },
      ],
      videos: [],
      quizIds: ['khmer-q5a', 'khmer-q5b'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: God-Kings
    {
      id: 'khmer-q1a',
      sectionId: 'god-kings',
      title: 'Quick Quiz Time!',
      question: 'What year was the Khmer Empire founded, and who founded it?',
      options: [
        { text: '1066 CE by William the Conqueror', isCorrect: false },
        { text: '802 CE by Jayavarman II', isCorrect: true },
        { text: '500 BCE by Suryavarman I', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'khmer-q1b',
      sectionId: 'god-kings',
      title: 'God-King Challenge!',
      question: 'What does "Devaraja" mean?',
      options: [
        { text: 'War leader', isCorrect: false },
        { text: 'God-king', isCorrect: true },
        { text: 'Water master', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'khmer-q1c',
      sectionId: 'god-kings',
      title: 'Builder King Quiz!',
      question: 'Which king built Angkor Wat?',
      options: [
        { text: 'Jayavarman II', isCorrect: false },
        { text: 'Jayavarman VII', isCorrect: false },
        { text: 'Suryavarman II', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'khmer-q1d',
      sectionId: 'god-kings',
      title: 'Warrior Healer Quiz!',
      question:
        'What did Jayavarman VII build across the empire besides temples and roads?',
      options: [
        { text: 'Pyramids', isCorrect: false },
        { text: '102 hospitals', isCorrect: true },
        { text: 'Coliseums for gladiator fights', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Angkor Wat
    {
      id: 'khmer-q2a',
      sectionId: 'angkor-wat',
      title: 'Temple Quiz!',
      question:
        'Angkor Wat was designed to represent which sacred mountain from Hindu mythology?',
      options: [
        { text: 'Mount Olympus', isCorrect: false },
        { text: 'Mount Everest', isCorrect: false },
        { text: 'Mount Meru', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'khmer-q2b',
      sectionId: 'angkor-wat',
      title: 'Engineering Challenge!',
      question:
        'How did the Khmer move massive sandstone blocks from quarries 50 kilometers away?',
      options: [
        { text: 'Elephants carried every block on their backs', isCorrect: false },
        { text: 'They floated them on rafts along canals', isCorrect: true },
        { text: 'They rolled them on wooden logs', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'khmer-q2c',
      sectionId: 'angkor-wat',
      title: 'Carving Quiz!',
      question:
        'What special feature makes Angkor Wat\'s wall carvings world-famous?',
      options: [
        { text: 'They are painted in gold', isCorrect: false },
        {
          text: 'They are the longest continuous stone carving in the world',
          isCorrect: true,
        },
        { text: 'They glow in the dark', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Water Masters
    {
      id: 'khmer-q3a',
      sectionId: 'water-masters',
      title: 'Water Quiz!',
      question: 'What are the massive Khmer reservoirs called?',
      options: [
        { text: 'Aqueducts', isCorrect: false },
        { text: 'Barays', isCorrect: true },
        { text: 'Oases', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'khmer-q3b',
      sectionId: 'water-masters',
      title: 'Farming Challenge!',
      question:
        'How many rice harvests per year did the Khmer water system allow?',
      options: [
        { text: 'Just 1, like everyone else', isCorrect: false },
        { text: '3 to 4 harvests per year', isCorrect: true },
        { text: '10 harvests per year', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Daily Life
    {
      id: 'khmer-q4a',
      sectionId: 'daily-life',
      title: 'Daily Life Quiz!',
      question:
        'Who wrote a detailed eyewitness account of life in Angkor in 1296?',
      options: [
        { text: 'Marco Polo', isCorrect: false },
        { text: 'Henri Mouhot', isCorrect: false },
        { text: 'Zhou Daguan, a Chinese diplomat', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Decline
    {
      id: 'khmer-q5a',
      sectionId: 'decline',
      title: 'Decline Quiz!',
      question: 'What major factor contributed to the fall of the Khmer Empire?',
      options: [
        { text: 'A volcanic eruption buried the city', isCorrect: false },
        {
          text: 'Climate change damaged their water systems',
          isCorrect: true,
        },
        { text: 'They ran out of stone for building', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'khmer-q5b',
      sectionId: 'decline',
      title: 'Final Challenge!',
      question:
        'What technology helped scientists discover hidden cities under the jungle in 2015?',
      options: [
        { text: 'X-ray satellites', isCorrect: false },
        { text: 'Underwater robots', isCorrect: false },
        { text: 'LIDAR (laser scanning from helicopters)', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'khmer-essay',
    prompt:
      'Imagine you are a young person living in Angkor during the Khmer Empire\'s golden age. Describe a day in your life!',
    description:
      'Think about everything you\'ve learned about Angkor. What do you see when you wake up? What do you eat? What sounds and smells surround you? Do you visit the temples, help with rice farming, or watch an elephant procession? Use what you\'ve learned to bring your story to life! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Amazing work! Your story about life in Angkor is wonderful. You\'re a true Khmer Empire scholar!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'khmer-reward',
    title: 'Temple Builder!',
    description:
      'Build your own Khmer-style temple complex! Place sandstone blocks, stack towers, add carvings, and design a canal system to bring water from your reservoir. Watch your temple come to life with animated processions and elephants!',
    lockMessage: 'Temple Plans Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 12 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save an open-ended answer (100+ characters)',
      },
    ],
    type: 'temple-builder',
    celebrationMessage:
      'INCREDIBLE! You\'ve built your own magnificent temple! The Khmer engineers would be proud of your creation! \u{1F3DB}\uFE0F\u{1F418}\u2728',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through one of the most incredible civilizations in history!',
      'You discovered how Jayavarman II founded the Khmer Empire in 802 CE by declaring himself a god-king. You learned how Suryavarman II built the magnificent Angkor Wat \u2014 a stone mountain for the gods made from millions of sandstone blocks. And you met Jayavarman VII, the warrior healer who built hospitals, roads, and the smiling stone faces of the Bayon.',
      'You uncovered the secret to Khmer power: water! Their barays, canals, and irrigation systems fed an empire of nearly one million people and made Angkor the greatest city of its age. You explored daily life through the eyes of Zhou Daguan and learned about the rich mythology and culture of the Khmer people.',
      'And you discovered how climate change, wars, and the collapse of their water system eventually brought down this mighty empire \u2014 but not before they created monuments that still inspire wonder today.',
      'Angkor Wat stands on Cambodia\'s flag as a symbol of pride, and scientists are still discovering hidden cities beneath the jungle. The story of the Khmer Empire is far from over!',
      'Keep exploring history! Every civilization has amazing stories waiting to be discovered!',
    ],
  },
};
