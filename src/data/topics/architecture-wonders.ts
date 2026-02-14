import type { Topic } from '../types';

export const architectureWonders: Topic = {
  id: 'architecture-wonders',
  slug: 'architecture-wonders',
  title: 'Architecture Wonders',
  subtitle:
    'From Pyramids to Skyscrapers: The Buildings That Changed the World',
  status: 'active',
  themeId: 'architecture-wonders',
  heroIcons: ['\u{1F3D7}\uFE0F', '\u{1F309}', '\u{1F3DB}\uFE0F'],
  navItems: [
    { id: 'ancient-wonders', icon: '\u{1F3DB}\uFE0F', label: 'Ancient Wonders' },
    { id: 'bridges-towers', icon: '\u{1F309}', label: 'Bridges & Towers' },
    { id: 'modern-marvels', icon: '\u{1F3D7}\uFE0F', label: 'Modern Marvels' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3D7}\uFE0F',
      title: 'Welcome, Young Architect!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Look around you. Every building, bridge, and tower you see was designed by an architect and built by engineers who solved problems using math, science, and creativity. Architecture is one of the oldest and most impressive human achievements — it\'s art that you can walk inside!',
            'For thousands of years, humans have been building structures that push the limits of what seems possible. The ancient Egyptians stacked 2.3 million stone blocks to build the Great Pyramid. The Romans invented concrete and built a dome that stood for nearly 2,000 years. And today, engineers build towers that stretch more than half a mile into the sky!',
            'In this adventure, you\'ll explore the genius engineering behind ancient wonders, discover how bridges and towers defy gravity, and meet the modern marvels that are reshaping our cities. Get ready to build your knowledge from the ground up!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'fJBlEPOj4Fk',
          title: 'How Did They Build the Great Pyramid of Giza?',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'oVOnRPefcno',
          title: 'What Makes Bridges So Strong? | Engineering for Kids | STEAM | SciShow Kids',
          channelName: 'SciShow Kids',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient Wonders ────────────────────────────
    {
      id: 'ancient-wonders',
      icon: '\u{1F3DB}\uFE0F',
      title: 'Ancient Wonders: Building Without Modern Tools',
      readAloudBlocks: [
        {
          id: 'ancient-intro-text',
          paragraphs: [
            'Imagine building a structure taller than a 40-story building using only human labor, copper tools, and ramps — no cranes, no trucks, no computers. That\'s exactly what the ancient Egyptians did when they built the Great Pyramid of Giza around 2560 BCE. It stood as the tallest human-made structure in the world for over 3,800 years!',
            'But the Egyptians weren\'t the only ancient builders who amazed the world. The Greeks perfected the art of columns and proportions, creating temples like the Parthenon that still look beautiful today. The Romans revolutionized construction by inventing concrete and perfecting the arch, allowing them to build massive structures like the Colosseum and aqueducts that carried water for hundreds of miles.',
            'What made these civilizations such incredible builders? They understood fundamental engineering principles: distributing weight, using geometry, and choosing the right materials. Many of their innovations are still used in modern architecture!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4D0}',
          name: 'The Great Pyramid of Giza',
          title: 'The Original Engineering Marvel',
          description:
            'Built around 2560 BCE for Pharaoh Khufu, the Great Pyramid was 146.6 meters (481 feet) tall and remained the world\'s tallest structure until Lincoln Cathedral in England surpassed it around 1300 CE. It\'s made of about 2.3 million limestone blocks, each weighing an average of 2.5 tons. The base is almost perfectly level — the difference between the highest and lowest corners is only 2.1 centimeters across a base that\'s 230 meters wide! That\'s more precise than many modern buildings.',
          extraTag: 'Height: 146.6m (481 ft)',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'The Parthenon',
          title: 'Greek Perfection in Stone',
          description:
            'The Parthenon was built in Athens between 447 and 432 BCE as a temple to the goddess Athena. Its architects, Ictinus and Callicrates, used clever tricks to make it look perfect. The columns lean slightly inward, and the floor curves gently upward in the middle. These subtle adjustments counteract optical illusions that would otherwise make straight lines look bent. The Greeks called this "entasis" — using math to make buildings look more beautiful to the human eye!',
          extraTag: 'Built: 447–432 BCE',
        },
        {
          emoji: '\u{1F3DF}\uFE0F',
          name: 'The Roman Colosseum',
          title: 'The Arena That Held 50,000',
          description:
            'The Colosseum in Rome, completed in 80 CE, could seat about 50,000 spectators — roughly the same as many modern stadiums. The Romans built it using a revolutionary material: concrete (called "opus caementicium"). They also perfected the arch, stacking them in rows to create the massive oval structure. The building had 80 entrances and a clever numbering system on tickets and arches that allowed the entire audience to be seated in about 15 minutes! Modern stadiums borrowed this crowd management design.',
          extraTag: 'Capacity: ~50,000 spectators',
        },
        {
          emoji: '\u{1F30A}',
          name: 'The Pantheon\'s Dome',
          title: 'A Concrete Record That Lasted 1,300 Years',
          description:
            'The Pantheon in Rome, built around 125 CE under Emperor Hadrian, has a concrete dome that is 43.3 meters (142 feet) in diameter — and it remained the largest unreinforced concrete dome in the world for nearly 1,900 years! The dome gets thinner and lighter toward the top, and the interior features recessed panels (called coffers) that reduce weight. At the very top is an open hole called the "oculus" (8.2 meters wide) that lets in light and rain. Roman concrete was so good that the dome still stands perfectly today!',
          extraTag: 'Dome: 43.3m (142 ft) wide',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Roman concrete is actually STRONGER than modern concrete in some ways! Scientists discovered that Roman concrete gets stronger over time because seawater triggers a chemical reaction in the volcanic ash they used, creating minerals that fill cracks. Some Roman harbor structures are still standing after 2,000 years of ocean waves!',
        },
      ],
      videos: [],
      quizIds: ['arch-q1a', 'arch-q1b', 'arch-q1c', 'arch-q1d'],
    },

    // ─── Section 2: Bridges & Towers ───────────────────────────
    {
      id: 'bridges-towers',
      icon: '\u{1F309}',
      title: 'Bridges & Towers: Defying Gravity',
      readAloudBlocks: [
        {
          id: 'bridges-intro-text',
          paragraphs: [
            'Bridges are some of the most impressive structures ever built because they must do something extraordinary: support enormous weight while spanning empty space. A bridge over a river can\'t have supports in the middle of the water, so engineers have invented brilliant designs that transfer weight to the banks on either side.',
            'There are four main types of bridges: beam bridges (the simplest — a flat surface resting on supports), arch bridges (where the curved shape pushes weight outward and down to the foundations), suspension bridges (where the deck hangs from massive cables attached to tall towers), and cable-stayed bridges (where cables run directly from towers to the deck). Each design uses different engineering principles to solve the problem of spanning a gap.',
            'Towers face the opposite challenge: instead of spanning sideways, they must resist the downward pull of gravity and the sideways push of wind. The taller a building gets, the more it sways in the wind. Engineers use clever techniques like tapered shapes, tuned mass dampers (heavy pendulums that swing to counteract swaying), and aerodynamic profiles to keep skyscrapers stable.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F309}',
          name: 'The Golden Gate Bridge',
          title: 'A Suspension Masterpiece',
          description:
            'The Golden Gate Bridge in San Francisco, completed in 1937, was the longest suspension bridge in the world at the time, spanning 1,280 meters (4,200 feet). Its two main cables are each 0.92 meters (36 inches) thick and contain 27,572 individual wires. If you unwound all the wire in both cables and laid it in a straight line, it would stretch over 129,000 kilometers — enough to wrap around the Earth more than 3 times! The bridge\'s famous "International Orange" color was chosen because it\'s visible in San Francisco\'s frequent fog.',
          extraTag: 'Main span: 1,280m (4,200 ft)',
        },
        {
          emoji: '\u{1F5FC}',
          name: 'The Eiffel Tower',
          title: 'Built to Be Temporary',
          description:
            'When Gustave Eiffel built his iron tower for the 1889 World\'s Fair in Paris, it was meant to stand for just 20 years! At 330 meters (1,083 feet), it was the world\'s tallest structure until the Chrysler Building in New York surpassed it in 1930. The tower uses 18,038 iron pieces connected by 2.5 million rivets. Despite weighing 7,300 tons, the tower\'s iron structure is so efficiently designed that if you melted it down and poured it into the base, the pool of iron would be only 6 centimeters (2.4 inches) deep!',
          extraTag: 'Originally temporary (1889)',
        },
        {
          emoji: '\u{1F3D7}\uFE0F',
          name: 'The Arch Bridge',
          title: 'The Shape That Beats Gravity',
          description:
            'The arch is one of the most important shapes in architecture. When weight pushes down on an arch, the curved shape transfers the force outward and downward to the foundations on each side. This means the arch is always in compression (being squeezed), and stone and concrete are incredibly strong under compression. The Romans used arches everywhere — in bridges, aqueducts, and buildings. Some Roman arch bridges built over 2,000 years ago are still carrying traffic today!',
          extraTag: 'Key principle: compression',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Millau Viaduct in France is the tallest bridge in the world. Its tallest pillar reaches 343 meters (1,125 feet) — taller than the Eiffel Tower! Cars crossing it are literally driving higher than the clouds. The bridge was designed by architect Norman Foster and engineer Michel Virlogeux.',
        },
      ],
      videos: [],
      quizIds: ['arch-q2a', 'arch-q2b', 'arch-q2c'],
    },

    // ─── Section 3: Modern Marvels ─────────────────────────────
    {
      id: 'modern-marvels',
      icon: '\u{1F3D7}\uFE0F',
      title: 'Modern Marvels: Reaching for the Sky',
      readAloudBlocks: [
        {
          id: 'modern-intro-text',
          paragraphs: [
            'The invention of steel-frame construction and the elevator in the late 1800s changed architecture forever. Instead of walls holding up a building (which limits height), a steel skeleton carries all the weight, and walls are just lightweight curtains hung on the frame. This breakthrough made skyscrapers possible.',
            'The race to build the tallest building has produced some incredible structures. The Empire State Building (1931) held the record for nearly 40 years at 443 meters. The Petronas Towers in Kuala Lumpur (1998) reclaimed the record for Asia. Then Dubai\'s Burj Khalifa shattered all records in 2010, reaching 828 meters (2,717 feet) — nearly a full kilometer into the sky!',
            'Modern architecture isn\'t just about height, though. Sustainable or "green" architecture uses design principles to reduce energy use and environmental impact. Buildings like the Bosco Verticale (Vertical Forest) in Milan have thousands of trees and plants growing on their balconies, absorbing carbon dioxide and producing oxygen. The future of architecture is about building smarter, not just taller.',
          ],
        },
        {
          id: 'modern-outro-text',
          paragraphs: [
            'From the perfectly leveled base of the Great Pyramid to the cloud-piercing height of the Burj Khalifa, architecture tells the story of human ambition, creativity, and engineering genius. Every building you see started as an idea in someone\'s mind and became real through math, science, and hard work. Who knows? Maybe you\'ll design the next great wonder of the world!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3D9}\uFE0F',
          name: 'Burj Khalifa',
          title: 'The World\'s Tallest Building',
          description:
            'The Burj Khalifa in Dubai stands at 828 meters (2,717 feet) with 163 floors. Its design was inspired by a desert flower called the Hymenocallis. The Y-shaped floor plan isn\'t just beautiful — it\'s engineering genius. The three "wings" brace each other against wind forces, and the building\'s setbacks (where it gets narrower as it goes up) confuse the wind, preventing it from forming organized vortexes that could shake the building. At the top, the building sways about 1.5 meters (5 feet) in strong winds — and that\'s intentional!',
          extraTag: 'Height: 828m (2,717 ft)',
        },
        {
          emoji: '\u{1F333}',
          name: 'Bosco Verticale',
          title: 'The Vertical Forest',
          description:
            'The Bosco Verticale (Vertical Forest) in Milan, Italy, completed in 2014, is a pair of residential towers covered in 900 trees, 5,000 shrubs, and 11,000 ground cover plants. That\'s the equivalent of 2 hectares (about 5 acres) of forest growing on the building\'s balconies! The plants filter dust, absorb carbon dioxide, produce oxygen, and provide shade that reduces the need for air conditioning. Each tree was individually selected and tested in a wind tunnel to make sure it could survive at its specific height!',
          extraTag: '900 trees on balconies',
        },
        {
          emoji: '\u{1F3D7}\uFE0F',
          name: 'Steel-Frame Construction',
          title: 'The Invention That Made Skyscrapers Possible',
          description:
            'Before steel frames, buildings relied on thick walls to support weight. The higher you built, the thicker the walls at the base needed to be. The 16-story Monadnock Building in Chicago (1891) has walls 1.8 meters (6 feet) thick at the base! Steel-frame construction, pioneered by engineer William Le Baron Jenney in the 1880s, changed everything. The steel skeleton carries all the weight, so walls can be thin glass curtains. This is why modern skyscrapers have so much glass — the walls aren\'t structural!',
          extraTag: 'Pioneered: 1880s, Chicago',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Burj Khalifa is so tall that the temperature at the top can be 10\u00B0C (18\u00B0F) cooler than at the base. During Ramadan, people on the top floors can see the sun for about 2-3 extra minutes after it has already set at ground level. They even have a slightly later prayer schedule!',
        },
      ],
      videos: [],
      quizIds: ['arch-q3a', 'arch-q3b', 'arch-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient Wonders
    {
      id: 'arch-q1a',
      sectionId: 'ancient-wonders',
      title: 'Quick Quiz Time!',
      question:
        'About how many stone blocks make up the Great Pyramid of Giza?',
      options: [
        { text: 'About 500,000', isCorrect: false },
        { text: 'About 2.3 million', isCorrect: true },
        { text: 'About 10 million', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'arch-q1b',
      sectionId: 'ancient-wonders',
      title: 'Greek Architecture!',
      question:
        'What visual trick did the Parthenon\'s architects use to make the temple look perfect?',
      options: [
        { text: 'They painted optical illusions on the walls', isCorrect: false },
        { text: 'They tilted columns inward and curved the floor upward', isCorrect: true },
        { text: 'They used mirrors to reflect light', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'arch-q1c',
      sectionId: 'ancient-wonders',
      title: 'Roman Engineering!',
      question:
        'What revolutionary building material did the Romans invent?',
      options: [
        { text: 'Steel', isCorrect: false },
        { text: 'Concrete', isCorrect: true },
        { text: 'Glass', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'arch-q1d',
      sectionId: 'ancient-wonders',
      title: 'Pantheon Challenge!',
      question:
        'What is the diameter of the Pantheon\'s dome, which remained the world\'s largest unreinforced concrete dome for nearly 1,900 years?',
      options: [
        { text: '21.5 meters (70 feet)', isCorrect: false },
        { text: '43.3 meters (142 feet)', isCorrect: true },
        { text: '86 meters (282 feet)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Bridges & Towers
    {
      id: 'arch-q2a',
      sectionId: 'bridges-towers',
      title: 'Quick Quiz Time!',
      question:
        'What type of bridge is the Golden Gate Bridge?',
      options: [
        { text: 'Arch bridge', isCorrect: false },
        { text: 'Beam bridge', isCorrect: false },
        { text: 'Suspension bridge', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'arch-q2b',
      sectionId: 'bridges-towers',
      title: 'Eiffel Tower Quiz!',
      question:
        'The Eiffel Tower was originally built to be permanent. True or false?',
      options: [
        { text: 'True — it was always meant to be permanent', isCorrect: false },
        { text: 'False — it was meant to stand for only 20 years', isCorrect: true },
        { text: 'True — but it was almost torn down in 1920', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'arch-q2c',
      sectionId: 'bridges-towers',
      title: 'Arch Bridge Science!',
      question:
        'Why are arch bridges so strong?',
      options: [
        { text: 'The curved shape transfers weight outward and down through compression', isCorrect: true },
        { text: 'They are made of special unbreakable materials', isCorrect: false },
        { text: 'They use hidden internal cables', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Modern Marvels
    {
      id: 'arch-q3a',
      sectionId: 'modern-marvels',
      title: 'Quick Quiz Time!',
      question:
        'How tall is the Burj Khalifa?',
      options: [
        { text: '528 meters (1,732 feet)', isCorrect: false },
        { text: '828 meters (2,717 feet)', isCorrect: true },
        { text: '1,028 meters (3,373 feet)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'arch-q3b',
      sectionId: 'modern-marvels',
      title: 'Green Architecture!',
      question:
        'How many trees grow on the Bosco Verticale (Vertical Forest) in Milan?',
      options: [
        { text: 'About 100', isCorrect: false },
        { text: 'About 900', isCorrect: true },
        { text: 'About 5,000', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'arch-q3c',
      sectionId: 'modern-marvels',
      title: 'Skyscraper Science!',
      question:
        'What invention made skyscrapers with glass curtain walls possible?',
      options: [
        { text: 'Reinforced concrete walls', isCorrect: false },
        { text: 'Steel-frame construction', isCorrect: true },
        { text: 'Extra-thick glass panels', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'arch-essay',
    prompt:
      'If you could design any building or structure, what would it be and why?',
    description:
      'Now it\'s your turn to think like an architect! You\'ve seen ancient pyramids, Roman domes, suspension bridges, and sky-high towers. If you could design any structure in the world, what would you build? A towering treehouse? An underwater school? A bridge between two mountains? Describe your dream building and what engineering principles you\'d use. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Incredible design thinking! You\'re a true architect! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'arch-reward',
    title: 'Bridge Builder!',
    description:
      'You\'ve unlocked the Bridge Builder! Place beams, cables, and supports to construct a bridge strong enough to hold a truck. Test your design with real physics — if the bridge can\'t hold the weight, it collapses! Can you build the strongest bridge with the fewest pieces?',
    lockMessage: 'Bridge Builder Locked!',
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
    type: 'bridge-builder',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Bridge Builder! You\'re a true structural engineer!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Master Builder!',
    paragraphs: [
      'Congratulations! You\'ve explored the world\'s most incredible buildings and structures!',
      'You discovered how the ancient Egyptians built the Great Pyramid with astonishing precision, how the Greeks used optical tricks to perfect the Parthenon, how the Romans invented concrete and built a dome that lasted nearly 2,000 years, and how the Colosseum\'s crowd management design inspired modern stadiums.',
      'You learned about the four types of bridges and how each one transfers weight differently. You met the Golden Gate Bridge\'s massive cables (enough wire to circle the Earth 3 times!) and the Eiffel Tower that was only meant to last 20 years.',
      'And you explored modern marvels: the Burj Khalifa\'s wind-defeating Y-shaped design, the Bosco Verticale\'s 900 trees growing on balconies, and the steel-frame revolution that made glass skyscrapers possible.',
      'Architecture is where art meets engineering. Every great building started as a dream. Keep dreaming big — the next wonder of the world might be yours to design!',
    ],
  },
};
