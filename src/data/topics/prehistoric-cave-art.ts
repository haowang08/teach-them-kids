import type { Topic } from '../types';

export const prehistoricCaveArt: Topic = {
  id: 'prehistoric-cave-art',
  slug: 'prehistoric-cave-art',
  title: 'Pre-historic Cave Art Around the World',
  subtitle:
    'The First Artists in Human History',
  status: 'active',
  themeId: 'prehistoric-cave-art',
  heroIcons: ['\u{1F3D4}\uFE0F', '\u270B', '\u{1F525}'],
  navItems: [
    { id: 'lascaux-chauvet', icon: '\u{1F3D4}\uFE0F', label: 'Lascaux & Chauvet' },
    { id: 'worldwide', icon: '\u{1F30D}', label: 'Cave Art Worldwide' },
    { id: 'techniques', icon: '\u{1F58C}\uFE0F', label: 'How They Made It' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u270B',
      title: 'Welcome, Young Time Traveler!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Imagine stepping into a dark cave with nothing but a flickering torch. As the firelight dances across the stone walls, shapes begin to appear: galloping horses, charging bison, leaping deer, and the handprints of people who lived tens of thousands of years ago. This is cave art, the oldest art in human history!',
            'Long before writing was invented, long before cities or farming or even pottery, our ancient ancestors picked up chunks of charcoal and colored earth and created stunning artwork on cave walls. Some of these paintings are over 45,000 years old, yet they still take our breath away today.',
            'In this adventure, you\'ll explore the most famous caves in France, discover ancient art across the globe from Indonesia to Africa to Australia, and learn exactly how prehistoric artists created their masterpieces using only natural materials and firelight. Let\'s step back in time!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'CX4KuIBmnjI',
          title: 'Explore cave paintings in this 360\u00B0 animated cave',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Lascaux & Chauvet ───────────────────────────
    {
      id: 'lascaux-chauvet',
      icon: '\u{1F3D4}\uFE0F',
      title: 'Lascaux & Chauvet: France\'s Legendary Caves',
      readAloudBlocks: [
        {
          id: 'lascaux-text',
          paragraphs: [
            'In September 1940, four teenagers and their dog were exploring the hills near the village of Montignac in southwestern France when their dog fell into a hole. When the boys climbed down to rescue him, they discovered something incredible: a vast underground cave covered in hundreds of ancient paintings! This was Lascaux, one of the most spectacular prehistoric art sites ever found.',
            'Lascaux\'s walls and ceilings are covered with over 600 paintings of horses, bulls, deer, and other animals. The paintings are estimated to be between 17,000 and 22,000 years old! The artists used the natural curves and bumps of the rock to give their animals a three-dimensional look. One section, called the "Hall of the Bulls," features paintings of bulls up to 17 feet long, the largest known prehistoric animal art.',
            'The artists at Lascaux were incredibly skilled. They even used the flickering light of their fat-burning lamps to create the illusion of movement, making animals appear to run across the cave walls as the flames danced!',
          ],
        },
        {
          id: 'chauvet-text',
          paragraphs: [
            'But Lascaux wasn\'t even the oldest cave. In 1994, three explorers led by Jean-Marie Chauvet discovered an even more ancient cave in southern France. The Chauvet Cave contains paintings that are over 30,000 years old, nearly twice as old as those at Lascaux!',
            'What shocked experts about Chauvet was how sophisticated the art was. They expected the oldest paintings to be simple and crude, but Chauvet\'s artists used advanced techniques like shading, perspective, and even animation! One famous bison drawing has eight legs, which researchers believe was meant to show the animal in motion, like an ancient version of a cartoon flip book.',
            'Chauvet also features animals rarely seen in other cave art: lions, rhinoceroses, and bears. These were dangerous predators that early humans encountered in Ice Age Europe. The cave was sealed by a rockfall thousands of years ago, perfectly preserving the art and even ancient bear scratches on the walls.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Lascaux had to be closed to the public in 1963 because the breath and body heat of 1,200 daily visitors was damaging the paintings! The carbon dioxide and moisture caused a green fungus to grow on the cave walls. Today, you can visit an exact replica called Lascaux IV, built right next to the original cave.',
        },
      ],
      videos: [
        {
          youtubeId: 'hJnEQCMA5Sg',
          title: 'Why are these 32 symbols found in ancient caves all over Europe?',
          channelName: 'TED',
        },
      ],
      quizIds: ['pca-q1a', 'pca-q1b', 'pca-q1c'],
    },

    // ─── Section 2: Cave Art Worldwide ──────────────────────────
    {
      id: 'worldwide',
      icon: '\u{1F30D}',
      title: 'Cave Art Around the World',
      readAloudBlocks: [
        {
          id: 'worldwide-intro-text',
          paragraphs: [
            'Cave art isn\'t just a European thing. Ancient humans created stunning artwork on every inhabited continent! Some of the oldest known art in the world comes from surprising places far from France.',
            'On the Indonesian island of Sulawesi, scientists discovered cave paintings of wild pigs and hand stencils dating back an incredible 45,500 years, making them the oldest known figurative art in the world! This discovery changed everything scientists thought they knew about early human creativity. Previously, experts believed art was invented in Europe, but the Sulawesi paintings proved that humans on the other side of the world were creating art at the same time or even earlier.',
            'In Australia, Aboriginal rock art represents the longest continuous artistic tradition on Earth. Aboriginal people have been creating rock art for at least 65,000 years, and some communities continue the tradition today! Their art includes "X-ray style" paintings that show the internal organs and bones of animals, as well as images of spiritual beings called "Dreamtime" figures that tell stories about the creation of the world.',
          ],
        },
        {
          id: 'worldwide-africa-text',
          paragraphs: [
            'In southern Africa, the San people, also known as Bushmen, created thousands of rock paintings across the Drakensberg Mountains and other sites. These paintings, some dating back over 20,000 years, show hunting scenes, dances, and spiritual ceremonies. The San artists used a wide range of colors and created incredibly detailed scenes with dozens of figures in a single painting.',
            'What\'s remarkable is that despite being separated by vast oceans and thousands of miles, ancient artists around the world often painted similar subjects: large animals, human handprints, and abstract symbols. This suggests that the urge to create art is a fundamental part of being human, something deep inside all of us.',
          ],
        },
      ],
      timeline: [
        {
          year: '~45,500 years ago',
          title: 'Sulawesi Cave Art (Indonesia)',
          description:
            'The oldest known figurative art in the world: paintings of wild pigs and hand stencils discovered on the Indonesian island of Sulawesi. These paintings pushed back the timeline of human art by thousands of years.',
        },
        {
          year: '~40,000 years ago',
          title: 'El Castillo Hand Stencils (Spain)',
          description:
            'Some of the oldest cave art in Europe, including red hand stencils and simple discs painted on cave walls in northern Spain. Some researchers believe these could even be the work of Neanderthals!',
        },
        {
          year: '~36,000 years ago',
          title: 'Chauvet Cave Paintings (France)',
          description:
            'Stunning paintings of lions, horses, rhinoceroses, and bison created with advanced techniques including shading and animation. The cave was sealed by a rockfall, perfectly preserving the art.',
        },
        {
          year: '~20,000 years ago',
          title: 'San Rock Art Begins (Southern Africa)',
          description:
            'The San people of southern Africa begin creating detailed rock paintings showing hunting scenes, spiritual ceremonies, and daily life across the Drakensberg Mountains.',
        },
        {
          year: '~17,000 years ago',
          title: 'Lascaux Cave Paintings (France)',
          description:
            'Over 600 stunning paintings of horses, bulls, and deer are created in the caves of Lascaux. The Hall of the Bulls features paintings up to 17 feet long.',
        },
        {
          year: '1940',
          title: 'Discovery of Lascaux',
          description:
            'Four teenagers and their dog accidentally discover Lascaux cave near Montignac, France, revealing one of the most spectacular prehistoric art sites ever found.',
        },
        {
          year: '1994',
          title: 'Discovery of Chauvet Cave',
          description:
            'Three French explorers discover Chauvet Cave, containing paintings over 30,000 years old. The sophistication of the art stunned the scientific world.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In 2021, scientists discovered that the oldest known cave art in the world, found in Sulawesi, Indonesia, was painted 45,500 years ago. That\'s so old that when these artists were painting, woolly mammoths still roamed the Earth and the last Ice Age was in full swing!',
        },
      ],
      videos: [],
      quizIds: ['pca-q2a', 'pca-q2b', 'pca-q2c', 'pca-q2d'],
    },

    // ─── Section 3: How They Made It ────────────────────────────
    {
      id: 'techniques',
      icon: '\u{1F58C}\uFE0F',
      title: 'How They Made It: Ancient Art Techniques',
      readAloudBlocks: [
        {
          id: 'techniques-intro-text',
          paragraphs: [
            'How did people living tens of thousands of years ago, without art stores, factories, or even metal tools, create paintings that have survived for millennia? The answer reveals just how clever and creative our ancestors really were!',
            'Prehistoric artists made their pigments from natural materials found in the earth. Red and yellow came from ochre, a type of iron-rich clay found in riverbeds and rock formations. Black came from charcoal, made by burning wood or bone, or from manganese dioxide, a dark mineral. White came from kaolin clay or ground-up chalk. These pigments were ground into powder using stone tools, then mixed with water, animal fat, or even saliva to create paint.',
            'Some artists applied paint with their fingers, while others used brushes made from animal hair, chewed twigs, or feathers. They also used hollow bones or reeds to blow paint onto the walls, creating a spray-paint effect! This blowing technique was especially popular for making hand stencils: an artist would place their hand flat against the cave wall and blow pigment around it, leaving a perfect outline when they pulled their hand away.',
          ],
        },
        {
          id: 'techniques-light-text',
          paragraphs: [
            'One of the biggest challenges was light. These caves were pitch black! Artists worked by the light of torches made from pine branches or small stone lamps filled with animal fat, with wicks made from moss or juniper bark. Archaeologists have found over 100 ancient stone lamps in the caves of Lascaux alone.',
            'The flickering torchlight wasn\'t just practical. It was part of the art experience! The dancing flames made the painted animals seem to move across the bumpy cave walls. Some researchers believe the caves were like ancient movie theaters, where small groups gathered to watch the "show" by firelight.',
            'Many cave paintings were created in incredibly hard-to-reach places: high up on ceilings, deep in narrow tunnels, or in chambers that required crawling through tiny passages. This tells us the art was important enough to be worth enormous effort. Some scientists believe the caves were sacred spaces used for spiritual ceremonies, while others think they were places for teaching young hunters about the animals they would encounter.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Scientists have found that prehistoric hand stencils come in all sizes, from large adult hands to tiny child hands! This means that kids were taken into the caves and participated in making art over 30,000 years ago. Some of the youngest handprints belong to babies, whose hands were pressed against the wall by an adult. Ancient art was a family activity!',
        },
      ],
      videos: [],
      quizIds: ['pca-q3a', 'pca-q3b', 'pca-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Lascaux & Chauvet
    {
      id: 'pca-q1a',
      sectionId: 'lascaux-chauvet',
      title: 'Quick Quiz Time!',
      question:
        'How were the Lascaux caves discovered in 1940?',
      options: [
        { text: 'By a team of professional archaeologists', isCorrect: false },
        {
          text: 'By four teenagers whose dog fell into a hole',
          isCorrect: true,
        },
        { text: 'By construction workers building a road', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pca-q1b',
      sectionId: 'lascaux-chauvet',
      title: 'Ancient Art Challenge!',
      question:
        'How old are the paintings in Chauvet Cave?',
      options: [
        { text: 'About 5,000 years old', isCorrect: false },
        { text: 'About 17,000 years old', isCorrect: false },
        { text: 'Over 30,000 years old', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pca-q1c',
      sectionId: 'lascaux-chauvet',
      title: 'Cave Technique Quiz!',
      question:
        'Why does a bison drawing in Chauvet Cave have eight legs?',
      options: [
        { text: 'The artist made a mistake and added extra legs', isCorrect: false },
        {
          text: 'It was meant to show the animal in motion, like animation',
          isCorrect: true,
        },
        { text: 'Ancient people believed bison had eight legs', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Worldwide
    {
      id: 'pca-q2a',
      sectionId: 'worldwide',
      title: 'Quick Quiz Time!',
      question:
        'Where is the oldest known figurative cave art in the world located?',
      options: [
        { text: 'Lascaux, France', isCorrect: false },
        { text: 'Sulawesi, Indonesia', isCorrect: true },
        { text: 'Drakensberg, South Africa', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pca-q2b',
      sectionId: 'worldwide',
      title: 'World Art Challenge!',
      question:
        'How old is the cave art found on the island of Sulawesi?',
      options: [
        { text: 'About 10,000 years old', isCorrect: false },
        { text: 'About 30,000 years old', isCorrect: false },
        { text: 'At least 45,500 years old', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pca-q2c',
      sectionId: 'worldwide',
      title: 'Aboriginal Art Quiz!',
      question:
        'What is the "X-ray style" of Aboriginal rock art?',
      options: [
        {
          text: 'Paintings that show the internal organs and bones of animals',
          isCorrect: true,
        },
        { text: 'Art that can only be seen under special light', isCorrect: false },
        { text: 'Paintings made with radioactive minerals', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pca-q2d',
      sectionId: 'worldwide',
      title: 'San Art Challenge!',
      question:
        'What subjects did the San people of southern Africa paint on cave walls?',
      options: [
        { text: 'Only abstract shapes and symbols', isCorrect: false },
        { text: 'Maps of trade routes and rivers', isCorrect: false },
        {
          text: 'Hunting scenes, dances, and spiritual ceremonies',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Techniques
    {
      id: 'pca-q3a',
      sectionId: 'techniques',
      title: 'Quick Quiz Time!',
      question:
        'How did prehistoric artists create hand stencils on cave walls?',
      options: [
        { text: 'They dipped their hands in paint and pressed them on the wall', isCorrect: false },
        {
          text: 'They placed their hand on the wall and blew pigment around it',
          isCorrect: true,
        },
        { text: 'They carved the outline of their hand into the rock', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pca-q3b',
      sectionId: 'techniques',
      title: 'Pigment Challenge!',
      question:
        'Where did prehistoric artists get their red and yellow paint colors?',
      options: [
        { text: 'From crushed berries and flower petals', isCorrect: false },
        {
          text: 'From ochre, an iron-rich clay found in the earth',
          isCorrect: true,
        },
        { text: 'From heated animal blood mixed with water', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pca-q3c',
      sectionId: 'techniques',
      title: 'Final Discovery!',
      question:
        'What did scientists learn from finding tiny child-sized handprints in the caves?',
      options: [
        { text: 'Children were used as workers to paint the caves', isCorrect: false },
        { text: 'The handprints were made by small adults, not children', isCorrect: false },
        {
          text: 'Kids participated in cave art, making it a family activity',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'pca-essay',
    prompt:
      'If you lived 30,000 years ago, what would you paint on a cave wall and why?',
    description:
      'Now it\'s your turn to think like a prehistoric artist! Imagine you\'re living in the Ice Age with only torchlight and natural pigments. What images would you paint on the walls of your cave? Animals you hunted? Your family? Something spiritual? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Wonderful creativity! Your answer has been saved. You\'re a true prehistoric art expert!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'pca-reward',
    title: 'Unlock the Cave Painter Experience!',
    description:
      'You\'ve explored the world\'s oldest art and proven yourself as a cave art expert! Unlock your special interactive cave painting tool and create your own prehistoric masterpiece.',
    lockMessage: 'Ancient Cave Sealed!',
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
    type: 'cave-painter',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Cave Painter Experience! You\'re connected to artists who lived over 30,000 years ago!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Time Traveler!',
    paragraphs: [
      'Congratulations! You\'ve journeyed back tens of thousands of years to discover the very first artists in human history!',
      'You explored France\'s legendary caves: Lascaux with its magnificent Hall of the Bulls discovered by teenagers in 1940, and Chauvet with its 30,000-year-old paintings of lions and bison that use sophisticated techniques like shading and animation.',
      'You traveled the globe to discover ancient art on every continent: the 45,500-year-old paintings in Sulawesi that rewrote the history of art, Aboriginal rock art representing the longest continuous artistic tradition on Earth, and the San paintings of southern Africa showing vibrant hunting scenes and ceremonies.',
      'And you learned the ingenious techniques prehistoric artists used: pigments from ochre and charcoal, brushes from twigs and feathers, spray painting through hollow bones, and the magical flickering torchlight that made painted animals seem to gallop across cave walls.',
      'The next time you pick up a pencil or paintbrush, remember: you\'re continuing a tradition that stretches back over 45,000 years. The urge to create art is one of the oldest and most beautiful parts of being human!',
    ],
  },
};
