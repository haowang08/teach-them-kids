import type { Topic } from '../types';

export const geometryVolume: Topic = {
  id: 'geometry-volume',
  slug: 'geometry-volume',
  title: 'Aquarium Architect',
  subtitle: 'Master Volume & 3D Shapes (Advanced)',
  status: 'active',
  themeId: 'geometry-volume',
  heroIcons: ['\u{1F41F}', '\u{1F4E6}', '\u{1F30A}'],
  navItems: [
    { id: 'what-is-volume', icon: '\u{1F4E6}', label: 'What is Volume?' },
    { id: 'volume-shapes', icon: '\u{1F4D0}', label: 'Volume of Shapes' },
    { id: 'aquarium-design', icon: '\u{1F41F}', label: 'Aquarium Design' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F41F}',
      title: 'Welcome, Aquarium Architect!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever been to an aquarium and watched colorful fish swim through giant glass tanks? Have you ever wondered how they figure out exactly how much water goes into those enormous tanks? The answer is a math concept called volume!',
            'Today, you\'re going to become an aquarium architect. You\'ll learn how to calculate the volume of 3D shapes so you can design tanks for tropical fish, sea turtles, and even sharks! But volume isn\'t just for aquariums. It\'s used to fill swimming pools, measure boxes for shipping, figure out how much soil goes in a garden bed, and so much more.',
            'While area measures flat surfaces (2D), volume measures the space inside three-dimensional objects (3D). Think of it this way: area is like wrapping paper on a gift, but volume is how much stuff fits inside the box. Let\'s dive in!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'qJwecTgce6c',
          title: 'Math Antics - Volume',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'By7sVb2IhFs',
          title: 'Volume of a Rectangular Prism',
          channelName: 'Khan Academy',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: What is Volume? ─────────────────────────────
    {
      id: 'what-is-volume',
      icon: '\u{1F4E6}',
      title: 'What is Volume? Filling Boxes with Cubes!',
      readAloudBlocks: [
        {
          id: 'volume-intro-text',
          paragraphs: [
            'Imagine you have a bunch of tiny cubes, each one exactly 1 inch on every side. These are called "unit cubes." If you packed them inside a box with no gaps and no overlaps, the number of cubes that fit inside is the volume of that box!',
            'For a rectangular box (also called a rectangular prism), there\'s a simple formula: Volume = Length \u00D7 Width \u00D7 Height, or V = L \u00D7 W \u00D7 H. If a box is 5 inches long, 3 inches wide, and 2 inches tall, the volume is 5 \u00D7 3 \u00D7 2 = 30 cubic inches. We say "cubic" because we\'re counting little cubes!',
            'Notice something cool? Area uses two measurements (length and width) and gives you square units. Volume uses three measurements (length, width, and height) and gives you cubic units. Every time you add a dimension, you\'re going one step further into geometry!',
          ],
        },
        {
          id: 'volume-water-text',
          paragraphs: [
            'For aquariums, we usually measure volume in gallons or liters. Here\'s a handy trick: if you measure your aquarium in inches, multiply L \u00D7 W \u00D7 H to get cubic inches, then divide by 231 to convert to gallons. A tank that is 24 inches long, 12 inches wide, and 16 inches tall has a volume of 24 \u00D7 12 \u00D7 16 = 4,608 cubic inches, which is about 20 gallons!',
            'Fish need a certain amount of water to stay healthy. The general rule is about 1 gallon per inch of fish. So a 20-gallon tank could hold about twenty 1-inch fish, or four 5-inch fish. Volume calculations literally keep fish alive!',
          ],
        },
        {
          id: 'volume-comparison-text',
          paragraphs: [
            'Here\'s something surprising: two boxes can look very different but hold the same amount! A box that is 12 \u00D7 3 \u00D7 2 inches has a volume of 72 cubic inches. So does a box that is 6 \u00D7 6 \u00D7 2 inches (also 72 cubic inches). And a box that is 9 \u00D7 4 \u00D7 2 inches? That\'s only 72 cubic inches too! Same volume, three totally different shapes.',
            'This is important for aquarium design because the shape of a tank affects how much surface area touches the air. Fish breathe oxygen that enters the water from the surface. A long, shallow tank with the same volume as a tall, narrow tank will actually keep fish healthier because more water surface touches the air!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Georgia Aquarium in Atlanta holds 10 million gallons of water, making it one of the largest aquariums in the world. That\'s enough water to fill about 15 Olympic swimming pools!',
        },
      ],
      videos: [],
      quizIds: ['vol-q1a', 'vol-q1b', 'vol-q1c', 'vol-q1d'],
    },

    // ─── Section 2: Volume of Different Shapes ──────────────────
    {
      id: 'volume-shapes',
      icon: '\u{1F4D0}',
      title: 'Volume of Different 3D Shapes',
      readAloudBlocks: [
        {
          id: 'shapes-intro-text',
          paragraphs: [
            'Not all aquariums are rectangular boxes! Some are shaped like cylinders (round tanks), and understanding different 3D shapes helps you calculate any volume. Let\'s explore the most common ones.',
            'The rectangular prism (box shape) is the most common aquarium shape. You already know this one: V = L \u00D7 W \u00D7 H. A shoe box, a cereal box, a fish tank, and even your room are all rectangular prisms!',
            'The cube is a special rectangular prism where all sides are equal. If each side is "s," then V = s \u00D7 s \u00D7 s, or V = s\u00B3. A Rubik\'s Cube that is 3 inches on each side has a volume of 3 \u00D7 3 \u00D7 3 = 27 cubic inches.',
          ],
        },
        {
          id: 'shapes-cylinder-text',
          paragraphs: [
            'The cylinder is like a can of soda or a round fish tank. Its volume formula uses pi (\u03C0 \u2248 3.14): V = \u03C0 \u00D7 r\u00B2 \u00D7 h, where r is the radius (half the width across) and h is the height. A cylindrical tank with a radius of 6 inches and height of 12 inches has a volume of 3.14 \u00D7 36 \u00D7 12 = about 1,357 cubic inches.',
            'Don\'t worry if cylinders seem tricky right now. The most important thing is understanding that volume always measures the 3D space inside a shape. As long as you know L \u00D7 W \u00D7 H for rectangular shapes, you\'re in great shape for designing aquariums!',
          ],
        },
        {
          id: 'shapes-surface-area-text',
          paragraphs: [
            'Bonus concept: surface area! While volume tells you how much fits INSIDE a shape, surface area tells you how much material covers the OUTSIDE. For a rectangular box, you\'d add up the area of all six faces. Aquarium builders need surface area to know how much glass to buy!',
            'For a rectangular tank that is 24 \u00D7 12 \u00D7 16 inches, the surface area would be: two sides of 24 \u00D7 16 = 768 sq in, two sides of 12 \u00D7 16 = 384 sq in, and the bottom of 24 \u00D7 12 = 288 sq in (the top is open!). Total glass needed: 768 + 384 + 288 = 1,440 square inches. Volume tells you water capacity, surface area tells you glass cost!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The International Space Station has a pressurized volume of about 32,333 cubic feet. That\'s roughly the same as a Boeing 747 airplane. Astronauts float around in all that volume since there\'s no gravity!',
        },
      ],
      videos: [
        {
          youtubeId: 'cC0fZ_lkFpQ',
          title: 'Math Antics - Circles, What Is PI?',
          channelName: 'Math Antics',
        },
      ],
      quizIds: ['vol-q2a', 'vol-q2b', 'vol-q2c'],
    },

    // ─── Section 3: Aquarium Design Problems ────────────────────
    {
      id: 'aquarium-design',
      icon: '\u{1F41F}',
      title: 'Aquarium Design Problems: Build Your Tank!',
      readAloudBlocks: [
        {
          id: 'design-intro-text',
          paragraphs: [
            'Now let\'s put on our architect hats and solve real aquarium design problems! These are the kinds of challenges that aquarium builders face every day.',
            'Problem type one: sizing your tank. A clownfish needs at least 20 gallons of water. If your tank is 24 inches long and 12 inches wide, how tall does it need to be? You work backwards! 20 gallons \u00D7 231 = 4,620 cubic inches. Then 4,620 \u00F7 (24 \u00D7 12) = 4,620 \u00F7 288 = about 16 inches tall.',
            'Problem type two: comparing tanks. Which holds more water: a tank that is 30 \u00D7 12 \u00D7 18 inches or one that is 24 \u00D7 18 \u00D7 16 inches? Calculate both! Tank A: 30 \u00D7 12 \u00D7 18 = 6,480 cubic inches. Tank B: 24 \u00D7 18 \u00D7 16 = 6,912 cubic inches. Tank B wins even though Tank A is longer!',
            'Problem type three: stacking tanks. If you stack three identical tanks that are each 2 feet long, 1 foot wide, and 1 foot tall, the total volume is 3 \u00D7 (2 \u00D7 1 \u00D7 1) = 6 cubic feet. But remember, you need a strong shelf to hold all that water. Water weighs about 62 pounds per cubic foot!',
          ],
        },
        {
          id: 'design-advanced-text',
          paragraphs: [
            'Advanced challenge: working backwards! Sometimes you know the volume you need and have to figure out the dimensions. If you need a 48 cubic foot tank and you know it must be 4 feet long and 3 feet wide, how tall should it be? Set up the equation: 4 \u00D7 3 \u00D7 H = 48, so 12 \u00D7 H = 48, meaning H = 4 feet tall.',
            'Real aquarium architects also have to account for the space taken up by gravel, decorations, filters, and other equipment inside the tank. A tank with a volume of 50 gallons might only hold about 45 gallons of actual water after you add 2 inches of gravel and a big filter. That\'s why professionals always plan for about 10% less usable water than the total volume!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'One cubic foot of water weighs about 62.4 pounds. A 100-gallon aquarium holds about 13.4 cubic feet of water and weighs over 800 pounds when full. That\'s heavier than a grand piano!',
        },
      ],
      videos: [],
      quizIds: ['vol-q3a', 'vol-q3b', 'vol-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: What is Volume?
    {
      id: 'vol-q1a',
      sectionId: 'what-is-volume',
      title: 'Volume Basics!',
      question:
        'An aquarium is 3 feet long, 2 feet wide, and 2 feet tall. What is its volume?',
      options: [
        { text: '7 cubic feet', isCorrect: false },
        { text: '10 cubic feet', isCorrect: false },
        { text: '12 cubic feet', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'vol-q1b',
      sectionId: 'what-is-volume',
      title: 'Box Volume!',
      question:
        'A shipping box is 10 inches long, 8 inches wide, and 5 inches tall. What is its volume?',
      options: [
        { text: '400 cubic inches', isCorrect: true },
        { text: '230 cubic inches', isCorrect: false },
        { text: '350 cubic inches', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'vol-q1c',
      sectionId: 'what-is-volume',
      title: 'Fish Tank Challenge!',
      question:
        'A fish tank is 20 inches long, 10 inches wide, and 12 inches tall. What is its volume in cubic inches?',
      options: [
        { text: '2,400 cubic inches', isCorrect: true },
        { text: '1,200 cubic inches', isCorrect: false },
        { text: '2,000 cubic inches', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'vol-q1d',
      sectionId: 'what-is-volume',
      title: 'Unit Cubes!',
      question:
        'How many 1-inch unit cubes can fit inside a box that is 4 inches long, 3 inches wide, and 2 inches tall?',
      options: [
        { text: '9 cubes', isCorrect: false },
        { text: '24 cubes', isCorrect: true },
        { text: '18 cubes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Volume of Different Shapes
    {
      id: 'vol-q2a',
      sectionId: 'volume-shapes',
      title: 'Cube Volume!',
      question:
        'A cube-shaped fish tank has sides that are 2 feet long. What is its volume?',
      options: [
        { text: '6 cubic feet', isCorrect: false },
        { text: '8 cubic feet', isCorrect: true },
        { text: '4 cubic feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'vol-q2b',
      sectionId: 'volume-shapes',
      title: 'Shape Comparison!',
      question:
        'Tank A is 6 ft \u00D7 2 ft \u00D7 3 ft. Tank B is 4 ft \u00D7 3 ft \u00D7 3 ft. Which holds more water?',
      options: [
        { text: 'Tank A (36 cubic feet)', isCorrect: false },
        { text: 'Tank B (36 cubic feet)', isCorrect: false },
        { text: 'They hold the same amount', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'vol-q2c',
      sectionId: 'volume-shapes',
      title: 'Missing Dimension!',
      question:
        'A tank has a volume of 60 cubic feet. It is 5 feet long and 3 feet wide. How tall is it?',
      options: [
        { text: '3 feet', isCorrect: false },
        { text: '4 feet', isCorrect: true },
        { text: '5 feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Aquarium Design
    {
      id: 'vol-q3a',
      sectionId: 'aquarium-design',
      title: 'Aquarium Planning!',
      question:
        'You want to build a tank that is 4 feet long, 2 feet wide, and 3 feet tall. How many cubic feet of water will it hold?',
      options: [
        { text: '24 cubic feet', isCorrect: true },
        { text: '20 cubic feet', isCorrect: false },
        { text: '9 cubic feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'vol-q3b',
      sectionId: 'aquarium-design',
      title: 'Stacking Tanks!',
      question:
        'You stack 2 identical tanks. Each is 3 ft long, 2 ft wide, and 1 ft tall. What is the total volume of both tanks?',
      options: [
        { text: '6 cubic feet', isCorrect: false },
        { text: '12 cubic feet', isCorrect: true },
        { text: '10 cubic feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'vol-q3c',
      sectionId: 'aquarium-design',
      title: 'Architect Challenge!',
      question:
        'A large display tank is 10 ft long, 4 ft wide, and 5 ft tall. What is its volume?',
      options: [
        { text: '100 cubic feet', isCorrect: false },
        { text: '200 cubic feet', isCorrect: true },
        { text: '150 cubic feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'geometry-volume-essay',
    prompt:
      'Design your dream aquarium and calculate how much water it would hold!',
    description:
      'Time to be an aquarium architect! Describe your dream aquarium: what shape would it be, how long, wide, and tall? What fish or sea creatures would live in it? Calculate the volume to figure out how much water it would hold. Show your math! Write at least 100 characters to unlock a special surprise below!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Amazing aquarium design! You\'re thinking like a real marine architect!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'geometry-volume-reward',
    title: 'Aquarium Builder Workshop!',
    description:
      'You\'ve unlocked the Aquarium Builder! Use your volume skills to explore 3D tank designs and see how math helps create underwater worlds.',
    lockMessage: 'Aquarium Workshop Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save your aquarium design essay (100+ characters)',
      },
    ],
    type: 'aquarium-builder',
    celebrationMessage:
      'SPECTACULAR! You\'ve unlocked the Aquarium Builder Workshop! You\'re a volume master!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Certified Aquarium Architect!',
    paragraphs: [
      'Congratulations! You\'ve mastered one of the most important 3D geometry concepts: volume!',
      'You learned that volume measures the space inside a 3D shape, counted in cubic units. For rectangular prisms (box shapes), you multiply Length \u00D7 Width \u00D7 Height. For cubes, you use Side \u00D7 Side \u00D7 Side. You even got a taste of cylinder volume with pi!',
      'You discovered that volume isn\'t just abstract math. It tells aquarium builders how much water a tank holds, shipping companies how much fits in a box, and construction workers how much concrete to pour.',
      'You solved real design problems: sizing tanks for fish, comparing different shaped containers, and figuring out missing dimensions. These are skills that engineers, architects, and scientists use every single day.',
      'Keep exploring the 3D world around you. Every box, bottle, and building has a volume waiting to be calculated!',
    ],
  },
};
