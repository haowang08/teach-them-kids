import type { Topic } from '../types';

export const shapeShifters: Topic = {
  id: 'shape-shifters',
  slug: 'shape-shifters',
  title: 'Shape Shifters: Geometry in the Real World',
  subtitle:
    'How Shapes Build Our World',
  status: 'active',
  themeId: 'shape-shifters',
  heroIcons: ['\u{1F4D0}', '\u2B21', '\u{1F3DB}\uFE0F'],
  navItems: [
    { id: 'shapes-everywhere', icon: '\u{1F4D0}', label: 'Shapes Everywhere' },
    { id: 'tessellations-symmetry', icon: '\u{1F3A8}', label: 'Tessellations & Symmetry' },
    { id: '3d-architecture', icon: '\u{1F3DB}\uFE0F', label: '3D Shapes & Architecture' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F4D0}',
      title: 'Welcome, Shape Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Look around you right now. Everything you see is made of shapes! The rectangular screen you\'re reading this on, the circular clock on the wall, the triangular roof of a house. Shapes aren\'t just something you learn about in math class. They\'re the building blocks of everything in our world!',
            'But have you ever wondered WHY certain shapes are used for certain things? Why are most wheels circles and not squares? Why do bridges use triangles instead of rectangles? Why do bees build hexagonal honeycombs instead of round ones? The answers are all about geometry, the math of shapes!',
            'In this adventure, you\'ll discover why triangles are the strongest shape in engineering, how artists and mathematicians create mind-bending tessellation patterns, and how 3D shapes have been used to build some of the most amazing structures in human history. Let\'s shape up!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'QEzlsjAqADA',
          title: 'Why Do Honeybees Love Hexagons?',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'IaoZhhx_I9s',
          title: 'Math Antics - Polygons',
          channelName: 'Math Antics',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Shapes Everywhere ───────────────────────────
    {
      id: 'shapes-everywhere',
      icon: '\u{1F4D0}',
      title: 'Shapes Everywhere: Geometry in Daily Life',
      readAloudBlocks: [
        {
          id: 'shapes-intro-text',
          paragraphs: [
            'Every shape has special properties that make it perfect for certain jobs. Triangles are incredibly strong because they can\'t be deformed without breaking a side. That\'s why they\'re used in bridges, roof trusses, and crane arms. Try pushing on a triangle made of sticks, it won\'t collapse! But a square made of sticks will easily fold into a parallelogram.',
            'Hexagons are nature\'s favorite tile. Bees use hexagonal cells in their honeycombs because hexagons fit together perfectly with no gaps and use the least amount of wax to create the most storage space. This is called the "honeycomb conjecture," and mathematicians proved it was optimal in 1999!',
            'Circles are everywhere because they have a special property: every point on a circle is the same distance from the center. That\'s what makes wheels work! If wheels were oval or square, the center would move up and down, making for a very bumpy ride.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4D0}',
          name: 'The Mighty Triangle',
          title: 'The Strongest Shape in Engineering',
          description:
            'Why are triangles so strong? Because they\'re the only polygon that can\'t change shape without changing the length of one of its sides! Push on any corner of a triangle and the forces are distributed along all three sides. This is called "structural rigidity." That\'s why the Eiffel Tower contains over 18,000 iron pieces, most arranged in triangular patterns! The Golden Gate Bridge, the Sydney Harbour Bridge, and countless other structures all rely on triangles for their incredible strength.',
          extraTag: 'Property: Structural rigidity',
        },
        {
          emoji: '\u2B21',
          name: 'The Hexagon',
          title: 'Nature\'s Perfect Tile',
          description:
            'Only three regular shapes can tile a flat surface with no gaps: triangles, squares, and hexagons. But hexagons are special because they enclose the most area with the least perimeter. This means bees use the minimum amount of wax to create the maximum storage space! Hexagons also appear in the Giant\'s Causeway in Northern Ireland, where volcanic rock naturally cooled into thousands of hexagonal columns. Even Saturn has a massive hexagonal storm at its north pole!',
          extraTag: 'Most efficient tiling shape',
        },
        {
          emoji: '\u{1F6DE}',
          name: 'The Circle',
          title: 'The Shape That Rolls',
          description:
            'A circle is defined as all points equidistant from a center point. This constant distance (the radius) is what makes wheels work: the center stays at a constant height as the wheel rolls, giving a smooth ride. But here\'s a fun twist: circles aren\'t the only shape that could make a smooth-riding wheel! Shapes called Reuleaux triangles (curved triangles) also have constant width and could theoretically work as wheels, though they\'d need special axles. British 20p and 50p coins are Reuleaux polygons!',
          extraTag: 'Key property: Constant radius',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Eiffel Tower uses over 18,000 pieces of iron arranged primarily in triangular patterns. If you melted all the iron down and spread it over the base of the tower, it would only be about 6 centimeters thick! Triangles make it incredibly strong while using surprisingly little material.',
        },
      ],
      videos: [
        {
          youtubeId: 'k5etrWdIY6o',
          title: 'Math Antics: Points, Lines, and Planes',
          channelName: 'Math Antics',
        },
      ],
      quizIds: ['shapes-q1a', 'shapes-q1b', 'shapes-q1c', 'shapes-q1d'],
    },

    // ─── Section 2: Tessellations & Symmetry ────────────────────
    {
      id: 'tessellations-symmetry',
      icon: '\u{1F3A8}',
      title: 'Tessellations & Symmetry: Where Math Meets Art',
      readAloudBlocks: [
        {
          id: 'tessellations-intro-text',
          paragraphs: [
            'A tessellation is a pattern of shapes that covers a surface completely with no gaps and no overlaps, like tiles on a floor. While this sounds simple, tessellations can create some of the most beautiful and mind-bending art in the world!',
            'The Dutch artist M.C. Escher was a master of tessellations. He created incredible artworks where birds transformed into fish, angels morphed into demons, and lizards crawled off the page in impossible patterns. Escher wasn\'t a mathematician by training, but he used deep mathematical principles to create his art!',
            'Tessellations also have a long and beautiful history in Islamic art. Because Islamic tradition discouraged images of people or animals, artists created stunning geometric patterns using mathematical tessellations. The Alhambra palace in Spain has tessellations that use all 17 possible types of mathematical symmetry!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3A8}',
          name: 'M.C. Escher',
          title: 'The Master of Mathematical Art',
          description:
            'Maurits Cornelis Escher (1898-1972) was a Dutch graphic artist who created some of the most famous mathematical art ever made. His tessellations feature interlocking shapes that transform and morph in incredible ways: fish become birds, angels merge with demons, and lizards seem to crawl right off the page. Escher was inspired by a visit to the Alhambra palace in Spain in 1936, where he spent days sketching the Islamic tile patterns. He then combined these mathematical ideas with his artistic vision to create a completely new art form!',
          extraTag: 'Inspired by Alhambra, 1936',
        },
        {
          emoji: '\u{1F54C}',
          name: 'Islamic Geometric Art',
          title: 'Mathematical Beauty in Sacred Spaces',
          description:
            'Islamic geometric art represents one of the greatest achievements of mathematical art in history. Using only a compass and straightedge, Islamic artists created incredibly complex patterns from simple shapes like circles, squares, and hexagons. The patterns often have multiple layers of symmetry and can seem to extend infinitely in all directions. Mathematicians have discovered that some medieval Islamic tiles, particularly at the Darb-i Imam shrine in Iran from 1453, use quasi-crystalline patterns that Western scientists didn\'t discover until 1974!',
          extraTag: 'Uses all 17 symmetry types',
        },
        {
          emoji: '\u{1F9F5}',
          name: 'Quilt Mathematics',
          title: 'Tessellations You Can Snuggle With',
          description:
            'Quilting is one of the most common real-world applications of tessellation! Traditional quilt patterns like "Log Cabin," "Flying Geese," and "Pinwheel" are all mathematical tessellations. Quilters use transformations, translations (slides), rotations (turns), and reflections (flips), to create complex patterns from simple shapes. Many traditional quilt patterns were used on the Underground Railroad as secret codes, with specific patterns hung on clotheslines to signal safe houses to escaping enslaved people!',
          extraTag: 'Math you can wrap up in!',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In 2023, mathematicians discovered a brand-new shape called "the hat" that can tile a surface infinitely without ever repeating! This was a problem mathematicians had been trying to solve for over 60 years. The 13-sided shape was found by David Smith, a retired print technician and amateur mathematician!',
        },
      ],
      videos: [
        {
          youtubeId: 'Ty1twivydVA',
          title: 'M.C. Escher: The Mathematical Artist',
          channelName: 'Art History School',
        },
      ],
      quizIds: ['shapes-q2a', 'shapes-q2b', 'shapes-q2c'],
    },

    // ─── Section 3: 3D Shapes & Architecture ────────────────────
    {
      id: '3d-architecture',
      icon: '\u{1F3DB}\uFE0F',
      title: '3D Shapes & Architecture: Building the Impossible',
      readAloudBlocks: [
        {
          id: '3d-intro-text',
          paragraphs: [
            'When shapes go three-dimensional, amazing things happen! The ancient Egyptians discovered that pyramids, with their triangular faces meeting at a point, create incredibly stable structures that have lasted over 4,500 years. The Romans figured out that domes, essentially 3D arches, could cover huge spaces without pillars.',
            'In the 20th century, architect Buckminster Fuller invented the geodesic dome, a sphere-like structure made of triangles. Geodesic domes are incredibly strong: they can withstand hurricanes and earthquakes while using very little material. The famous Spaceship Earth at Disney\'s Epcot is a geodesic sphere!',
            'Today, architects use computer geometry to design buildings that would have been impossible just decades ago. From the twisting curves of the Guggenheim Museum to the crystalline shape of the Beijing Water Cube, math makes impossible architecture possible!',
          ],
        },
        {
          id: '3d-outro-text',
          paragraphs: [
            'Every building you see, from a simple house to a towering skyscraper, exists because someone understood the geometry of shapes. The pyramids proved that triangles last forever. Domes showed us how to create grand interior spaces. And geodesic structures taught us how to build strong while using less. Geometry isn\'t just abstract math. It\'s the science that literally holds our world together!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4D0}',
          name: 'The Great Pyramids',
          title: '4,500 Years of Geometric Perfection',
          description:
            'The Great Pyramid of Giza is a masterpiece of geometry. Each side of the base is 230 meters long, and they differ by no more than 4.4 centimeters! The pyramid\'s base is level to within just 2.1 centimeters across its entire area. The Egyptians achieved this precision without modern tools, using geometry, astronomy, and remarkably clever engineering. The pyramid\'s shape distributes its enormous weight (6.1 million tons!) evenly down to the ground, which is why it has stood for over 4,500 years.',
          extraTag: 'Base accuracy: within 4.4 cm',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'The Dome',
          title: 'The 3D Arch That Changed Architecture',
          description:
            'A dome is essentially an arch rotated in three dimensions. The Romans perfected dome construction with the Pantheon in 125 CE, which has a 43-meter diameter dome that was the largest in the world for over 1,300 years! The secret is that a dome distributes weight evenly in all directions, like an eggshell. The Pantheon\'s dome gets thinner and uses lighter materials as it rises, showing that the Romans understood the geometry of stress distribution. The oculus (hole) at the top actually makes the dome stronger!',
          extraTag: 'Pantheon dome: 43 meters wide',
        },
        {
          emoji: '\u{1F310}',
          name: 'Geodesic Spheres',
          title: 'Buckminster Fuller\'s Genius Invention',
          description:
            'Buckminster Fuller patented the geodesic dome in 1954. It\'s made of a network of triangles that approximate a sphere. Because triangles are the strongest shape, a geodesic dome is incredibly strong, light, and efficient. Spaceship Earth at Epcot is a geodesic sphere made of 11,324 triangular panels! Geodesic domes can cover huge areas without any interior supports. They\'re used as radar stations in the Arctic, sports arenas, greenhouses, and even emergency shelters. Fuller dreamed of putting a geodesic dome over all of Manhattan!',
          extraTag: 'Patented by Fuller, 1954',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Buckminster Fuller once proposed putting a two-mile-wide geodesic dome over all of Midtown Manhattan! He calculated it would pay for itself in 10 years just from savings on snow removal. While it was never built, the idea showed the incredible potential of geodesic geometry.',
        },
      ],
      videos: [
        {
          youtubeId: 'D8h2DL-gWg8',
          title: 'Why Are Geodesic Domes So Strong?',
          channelName: 'Practical Engineering',
        },
      ],
      quizIds: ['shapes-q3a', 'shapes-q3b', 'shapes-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Shapes Everywhere
    {
      id: 'shapes-q1a',
      sectionId: 'shapes-everywhere',
      title: 'Quick Quiz Time!',
      question:
        'Why are triangles used so much in bridges and buildings?',
      options: [
        { text: 'They look the nicest', isCorrect: false },
        { text: 'They can\'t be deformed without breaking a side', isCorrect: true },
        { text: 'They use the most material', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'shapes-q1b',
      sectionId: 'shapes-everywhere',
      title: 'Hexagon Challenge!',
      question:
        'Why do bees build hexagonal honeycombs instead of other shapes?',
      options: [
        { text: 'Hexagons are the prettiest shape', isCorrect: false },
        { text: 'Hexagons use the least wax while creating the most storage space', isCorrect: true },
        { text: 'Bees can only make six-sided shapes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'shapes-q1c',
      sectionId: 'shapes-everywhere',
      title: 'Wheel Wonder!',
      question:
        'What special property of circles makes them perfect for wheels?',
      options: [
        { text: 'They are the largest shape', isCorrect: false },
        { text: 'Every point on the circle is the same distance from the center', isCorrect: true },
        { text: 'They can bounce higher than other shapes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'shapes-q1d',
      sectionId: 'shapes-everywhere',
      title: 'Tiling Quiz!',
      question:
        'Which three regular shapes can tile a flat surface with no gaps?',
      options: [
        { text: 'Circles, ovals, and pentagons', isCorrect: false },
        { text: 'Triangles, squares, and hexagons', isCorrect: true },
        { text: 'Rectangles, diamonds, and octagons', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Tessellations & Symmetry
    {
      id: 'shapes-q2a',
      sectionId: 'tessellations-symmetry',
      title: 'Quick Quiz Time!',
      question:
        'What is a tessellation?',
      options: [
        { text: 'A 3D model of a building', isCorrect: false },
        { text: 'A pattern of shapes that covers a surface with no gaps and no overlaps', isCorrect: true },
        { text: 'A type of symmetry found in snowflakes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'shapes-q2b',
      sectionId: 'tessellations-symmetry',
      title: 'Escher Expert!',
      question:
        'What inspired M.C. Escher to create his famous tessellation artworks?',
      options: [
        { text: 'A visit to a modern art museum', isCorrect: false },
        { text: 'Islamic tile patterns at the Alhambra palace in Spain', isCorrect: true },
        { text: 'A math textbook about geometry', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'shapes-q2c',
      sectionId: 'tessellations-symmetry',
      title: 'New Discovery!',
      question:
        'In 2023, what did mathematicians discover about a shape called "the hat"?',
      options: [
        { text: 'It was the largest shape ever measured', isCorrect: false },
        { text: 'It can tile a surface infinitely without ever repeating', isCorrect: true },
        { text: 'It has exactly 100 sides', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: 3D Architecture
    {
      id: 'shapes-q3a',
      sectionId: '3d-architecture',
      title: 'Quick Quiz Time!',
      question:
        'Who invented and patented the geodesic dome?',
      options: [
        { text: 'Leonardo da Vinci', isCorrect: false },
        { text: 'Buckminster Fuller', isCorrect: true },
        { text: 'Frank Lloyd Wright', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'shapes-q3b',
      sectionId: '3d-architecture',
      title: 'Ancient Architecture!',
      question:
        'How accurately aligned are the sides of the Great Pyramid of Giza\'s base?',
      options: [
        { text: 'Within about 10 meters', isCorrect: false },
        { text: 'Within about 4.4 centimeters', isCorrect: true },
        { text: 'Within about 1 kilometer', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'shapes-q3c',
      sectionId: '3d-architecture',
      title: 'Dome Knowledge!',
      question:
        'The Roman Pantheon\'s dome held the record for the world\'s largest for how many years?',
      options: [
        { text: 'About 200 years', isCorrect: false },
        { text: 'About 700 years', isCorrect: false },
        { text: 'Over 1,300 years', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'shapes-essay',
    prompt:
      'What\'s your favorite shape and where do you see it in the world around you?',
    description:
      'Think about all the shapes you\'ve learned about: triangles in bridges, hexagons in honeycombs, circles in wheels, domes in buildings, and tessellations in art. What\'s your favorite shape? Where have you noticed it in the world around you? Why do you think it\'s used there? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Great geometric thinking! You see shapes everywhere! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'shapes-reward',
    title: 'Tessellation Builder!',
    description:
      'You\'ve unlocked the Tessellation Builder! Create your own Escher-style tessellation patterns by choosing shapes, adding transformations, and watching your design tile infinitely across the screen. Save your creations and share them!',
    lockMessage: 'Tessellation Builder Locked!',
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
    type: 'tessellation-builder',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Tessellation Builder! Create mathematical art like M.C. Escher!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Shape Shifter Now!',
    paragraphs: [
      'Congratulations! You\'ve explored the incredible world of geometry in the real world!',
      'You discovered why triangles are the strongest shape in engineering, powering everything from the Eiffel Tower to suspension bridges. You learned that hexagons are nature\'s most efficient tile, used by bees to build their honeycombs with minimum wax. And you found out that circles make perfect wheels because every point is equidistant from the center.',
      'You explored the beautiful world of tessellations, from M.C. Escher\'s morphing masterpieces to the stunning geometric patterns of Islamic art. You even learned about "the hat," a brand-new shape discovered in 2023 that tiles without repeating!',
      'And you journeyed through 3D architecture: the pyramids that have stood for 4,500 years, the Roman domes that covered vast spaces, and the geodesic structures that Buckminster Fuller dreamed could cover entire cities.',
      'Geometry is all around you, every building, every bridge, every tile floor, every honeycomb. Now that you know the math behind shapes, you\'ll never look at the world the same way again!',
    ],
  },
};
