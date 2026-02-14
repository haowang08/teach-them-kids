import type { Topic } from '../types';

export const geometryArea: Topic = {
  id: 'geometry-area',
  slug: 'geometry-area',
  title: 'Dream Room Designer',
  subtitle: 'Master Area & Perimeter',
  status: 'active',
  themeId: 'geometry-area',
  heroIcons: ['\u{1F3E0}', '\u{1F4D0}', '\u{1F4CF}'],
  navItems: [
    { id: 'what-is-area', icon: '\u{1F532}', label: 'What is Area?' },
    { id: 'perimeter', icon: '\u{1F6E1}\uFE0F', label: 'Perimeter' },
    { id: 'design-challenges', icon: '\u{1F3E0}', label: 'Design Challenges' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3E0}',
      title: 'Welcome, Room Designer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever looked at your room and thought, "I wish I could redesign this whole thing"? Well, today you\'re going to learn the math that real interior designers, architects, and builders use every single day!',
            'Imagine you\'re planning your ultimate dream room. Maybe it has a giant gaming area, a cozy reading nook, or a mini basketball court. But before you can buy carpet, paint the walls, or arrange furniture, you need to know two very important measurements: area and perimeter.',
            'Area tells you how much space is inside a shape, like how much carpet you need for the floor. Perimeter tells you the distance around the outside, like how much border trim you need around the ceiling. Let\'s learn both and become master room designers!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'xCdxURXMdFY',
          title: 'Math Antics - Area',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'AAY1bsazcgM',
          title: 'Math Antics - Perimeter',
          channelName: 'Math Antics',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: What is Area? ───────────────────────────────
    {
      id: 'what-is-area',
      icon: '\u{1F532}',
      title: 'What is Area? Filling Up Your Floor!',
      readAloudBlocks: [
        {
          id: 'area-intro-text',
          paragraphs: [
            'Imagine you have a bunch of square tiles, each one exactly 1 foot by 1 foot. If you laid them out to cover your entire bedroom floor without any gaps or overlaps, the number of tiles you used would be the area of your room! Area is simply the amount of space inside a flat shape.',
            'For rectangles and squares, there\'s a super easy shortcut. Instead of counting every single tile, you just multiply the length times the width. If your room is 10 feet long and 8 feet wide, the area is 10 \u00D7 8 = 80 square feet. That\'s 80 tiles! We write this as 80 sq ft or 80 ft\u00B2.',
            'But what about triangles? Sometimes rooms have triangular nooks or you might want a triangular rug. For triangles, the formula is one-half times the base times the height, or \u00BD \u00D7 B \u00D7 H. Think of it this way: a triangle is exactly half of a rectangle, so you take the rectangle formula and cut it in half!',
          ],
        },
        {
          id: 'area-examples-text',
          paragraphs: [
            'Let\'s try some examples! A square closet that is 4 feet on each side has an area of 4 \u00D7 4 = 16 square feet. A rectangular kitchen that is 12 feet long and 9 feet wide has an area of 12 \u00D7 9 = 108 square feet. A triangular reading nook with a base of 6 feet and a height of 4 feet has an area of \u00BD \u00D7 6 \u00D7 4 = 12 square feet.',
            'Here\'s a pro tip from real designers: always measure twice and calculate once! Making a mistake on area could mean buying too much carpet (wasting money) or too little (leaving bare floor). Math saves the day!',
          ],
        },
        {
          id: 'area-composite-text',
          paragraphs: [
            'What about rooms that aren\'t simple rectangles? Many real rooms have L-shapes, T-shapes, or other unusual layouts. The trick is to break the shape into smaller rectangles and triangles, calculate each area separately, and add them all together. This is called finding the area of a composite shape.',
            'For example, imagine a room shaped like the letter L. The top part is 8 feet by 4 feet and the bottom part is 12 feet by 6 feet. The top area is 8 \u00D7 4 = 32 square feet, and the bottom area is 12 \u00D7 6 = 72 square feet. The total area is 32 + 72 = 104 square feet. Architects use this technique for every building they design!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The largest room in the world is the Boeing factory in Everett, Washington. Its floor area is about 98 acres, which is roughly 4,300,000 square feet. That\'s about the same as 75 football fields!',
        },
      ],
      videos: [
        {
          youtubeId: 'l6-rO6jx28E',
          title: 'Math Antics - Area of a Triangle',
          channelName: 'Math Antics',
        },
      ],
      quizIds: ['area-q1a', 'area-q1b', 'area-q1c', 'area-q1d'],
    },

    // ─── Section 2: Perimeter ───────────────────────────────────
    {
      id: 'perimeter',
      icon: '\u{1F6E1}\uFE0F',
      title: 'Perimeter: The Fence Around Your Yard!',
      readAloudBlocks: [
        {
          id: 'perimeter-intro-text',
          paragraphs: [
            'Imagine you have a backyard and you want to build a fence all the way around it. The total length of that fence is the perimeter! Perimeter is the distance around the outside of any shape. The word "perimeter" actually comes from Greek words meaning "around measure."',
            'To find the perimeter of any shape, you simply add up the lengths of all its sides. For a rectangle, you can use the shortcut: Perimeter = 2 \u00D7 Length + 2 \u00D7 Width, or P = 2L + 2W. For a square, it\'s even simpler: P = 4 \u00D7 Side, since all four sides are the same.',
            'In room design, perimeter matters a lot! You need it to figure out how much baseboard trim to buy for the bottom of your walls, how much crown molding for the ceiling, or how many LED light strips to line around your room. Builders use perimeter every single day!',
          ],
        },
        {
          id: 'perimeter-examples-text',
          paragraphs: [
            'Let\'s practice! A rectangular room that is 12 feet long and 10 feet wide has a perimeter of 2 \u00D7 12 + 2 \u00D7 10 = 24 + 20 = 44 feet. That means you\'d need 44 feet of baseboard trim! A square patio that is 8 feet on each side has a perimeter of 4 \u00D7 8 = 32 feet of fencing.',
            'Here\'s a tricky question: can two rooms have the same area but different perimeters? Absolutely! A 6 \u00D7 6 room and a 4 \u00D7 9 room both have an area of 36 square feet, but the first has a perimeter of 24 feet and the second has a perimeter of 26 feet. Designers think about both measurements when planning spaces!',
          ],
        },
        {
          id: 'perimeter-irregular-text',
          paragraphs: [
            'What about shapes that aren\'t rectangles? For any polygon (a shape with straight sides), you still just add up all the side lengths. A triangle with sides of 5, 7, and 8 feet has a perimeter of 5 + 7 + 8 = 20 feet. A pentagon-shaped room would need you to add all five side lengths together.',
            'Here\'s another designer trick: sometimes you know the perimeter but need to find a missing side. If a rectangular room has a perimeter of 40 feet and you know it\'s 12 feet long, you can work backwards! P = 2L + 2W, so 40 = 2(12) + 2W, which means 40 = 24 + 2W, so 2W = 16 and W = 8 feet. Algebra and geometry working together!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Great Wall of China has a perimeter-like measurement of about 13,171 miles! If you walked 20 miles a day, it would take you nearly two years to walk its entire length.',
        },
      ],
      videos: [
        {
          youtubeId: 'MTSlKifo4js',
          title: 'Interior Design Math',
          channelName: 'Helpful DIY',
        },
      ],
      quizIds: ['area-q2a', 'area-q2b', 'area-q2c'],
    },

    // ─── Section 3: Design Challenges ───────────────────────────
    {
      id: 'design-challenges',
      icon: '\u{1F3E0}',
      title: 'Design Challenges: Floor Plans, Carpet & Paint!',
      readAloudBlocks: [
        {
          id: 'challenges-intro-text',
          paragraphs: [
            'Now let\'s put your skills to work on real design problems! Professional interior designers solve these kinds of puzzles every day. They read floor plans, calculate how much material to order, and make sure everything fits perfectly.',
            'Challenge type one: carpet and flooring. When you buy carpet, it\'s sold by the square foot. If your bedroom is 11 feet by 13 feet, you need 11 \u00D7 13 = 143 square feet of carpet. But what if your room has an L-shape? You split it into two rectangles, find the area of each, and add them together!',
            'Challenge type two: wall paint. To figure out how much paint you need, you calculate the area of each wall. A wall that is 12 feet wide and 8 feet tall has an area of 96 square feet. One gallon of paint typically covers about 350 square feet, so you\'d need to add up all your walls and divide by 350.',
            'Challenge type three: border and trim. LED light strips, wallpaper borders, and baseboards all require perimeter calculations. Measure around the room, subtract the width of any doors, and you\'ll know exactly how much to buy. Real designers even add 10% extra just in case!',
          ],
        },
        {
          id: 'challenges-pro-tips-text',
          paragraphs: [
            'Pro tip from real architects: when calculating paint for a room, don\'t forget to subtract the area of windows and doors! A standard door is about 20 square feet and a typical window is about 12 square feet. If a wall has an area of 120 square feet but includes one door and one window, you really only need to paint 120 - 20 - 12 = 88 square feet.',
            'Another real-world challenge is buying materials that come in fixed sizes. Carpet rolls are usually 12 feet wide, and tiles come in boxes that cover a set number of square feet. Designers always round UP to make sure they have enough. If you need 143 square feet of tile and each box covers 25 square feet, you\'d need 143 \u00F7 25 = 5.72 boxes, so you\'d buy 6 boxes!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Professional interior designers often use graph paper where each square represents one foot. This way, they can literally count squares to check their area calculations, just like you learned!',
        },
      ],
      videos: [],
      quizIds: ['area-q3a', 'area-q3b', 'area-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: What is Area?
    {
      id: 'area-q1a',
      sectionId: 'what-is-area',
      title: 'Area Calculation!',
      question:
        'A rug is 8 feet long and 6 feet wide. What is its area?',
      options: [
        { text: '42 square feet', isCorrect: false },
        { text: '48 square feet', isCorrect: true },
        { text: '56 square feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'area-q1b',
      sectionId: 'what-is-area',
      title: 'Square Room Challenge!',
      question:
        'A square bathroom has sides that are 7 feet long. What is the area of the floor?',
      options: [
        { text: '28 square feet', isCorrect: false },
        { text: '42 square feet', isCorrect: false },
        { text: '49 square feet', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'area-q1c',
      sectionId: 'what-is-area',
      title: 'Triangle Area Quiz!',
      question:
        'A triangular shelf has a base of 10 inches and a height of 6 inches. What is its area? (Remember: \u00BD \u00D7 B \u00D7 H)',
      options: [
        { text: '30 square inches', isCorrect: true },
        { text: '60 square inches', isCorrect: false },
        { text: '16 square inches', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'area-q1d',
      sectionId: 'what-is-area',
      title: 'Carpet Shopping!',
      question:
        'You need carpet for a room that is 15 feet long and 10 feet wide. How many square feet of carpet do you need?',
      options: [
        { text: '50 square feet', isCorrect: false },
        { text: '150 square feet', isCorrect: true },
        { text: '125 square feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Perimeter
    {
      id: 'area-q2a',
      sectionId: 'perimeter',
      title: 'Perimeter Problem!',
      question:
        'A rectangular garden is 20 feet long and 12 feet wide. How much fencing do you need to go all the way around it?',
      options: [
        { text: '32 feet', isCorrect: false },
        { text: '64 feet', isCorrect: true },
        { text: '240 feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'area-q2b',
      sectionId: 'perimeter',
      title: 'Baseboard Challenge!',
      question:
        'A square room has sides of 9 feet. How many feet of baseboard trim do you need for the perimeter?',
      options: [
        { text: '27 feet', isCorrect: false },
        { text: '36 feet', isCorrect: true },
        { text: '81 feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'area-q2c',
      sectionId: 'perimeter',
      title: 'LED Light Strip!',
      question:
        'You want LED lights around a room that is 14 feet long and 11 feet wide. How many feet of LED strip do you need?',
      options: [
        { text: '50 feet', isCorrect: true },
        { text: '25 feet', isCorrect: false },
        { text: '154 feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Design Challenges
    {
      id: 'area-q3a',
      sectionId: 'design-challenges',
      title: 'Paint Puzzle!',
      question:
        'One wall is 13 feet wide and 8 feet tall. What is the area of that wall?',
      options: [
        { text: '42 square feet', isCorrect: false },
        { text: '104 square feet', isCorrect: true },
        { text: '84 square feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'area-q3b',
      sectionId: 'design-challenges',
      title: 'L-Shaped Room!',
      question:
        'An L-shaped room can be split into two rectangles: one is 10 ft \u00D7 8 ft and the other is 6 ft \u00D7 4 ft. What is the total area?',
      options: [
        { text: '80 square feet', isCorrect: false },
        { text: '104 square feet', isCorrect: true },
        { text: '96 square feet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'area-q3c',
      sectionId: 'design-challenges',
      title: 'Designer Math!',
      question:
        'A room is 12 feet long and 10 feet wide. What is the difference between its area and its perimeter (in their respective units)?',
      options: [
        { text: 'Area is 120 sq ft and perimeter is 44 ft', isCorrect: true },
        { text: 'Area is 44 sq ft and perimeter is 120 ft', isCorrect: false },
        { text: 'Area is 110 sq ft and perimeter is 48 ft', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'geometry-area-essay',
    prompt:
      'Describe your dream room and calculate how much carpet you would need!',
    description:
      'It\'s your turn to be the designer! Describe your dream room: what shape is it, how long and wide would it be, and what would you put in it? Then calculate the area of the floor to figure out how much carpet you\'d need. Don\'t forget to show your math! Write at least 100 characters to unlock a special surprise below!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Awesome design work! You\'re thinking like a real interior designer!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'geometry-area-reward',
    title: 'Dream Room Designer Studio!',
    description:
      'You\'ve unlocked the Dream Room Designer! Use your area and perimeter skills to explore room layouts and see how math makes design possible.',
    lockMessage: 'Design Studio Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save your dream room design essay (100+ characters)',
      },
    ],
    type: 'room-designer',
    celebrationMessage:
      'INCREDIBLE! You\'ve unlocked the Dream Room Designer Studio! You\'re a geometry master!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Certified Room Designer!',
    paragraphs: [
      'Congratulations! You\'ve mastered two of the most important concepts in geometry: area and perimeter!',
      'You learned that area is the space inside a shape, measured in square units. For rectangles, you multiply Length \u00D7 Width. For triangles, you use \u00BD \u00D7 Base \u00D7 Height. These formulas help you figure out how much carpet, tile, or paint you need.',
      'You also learned that perimeter is the distance around the outside of a shape. For rectangles, you use 2L + 2W. This helps you buy the right amount of fencing, baseboard trim, or LED light strips.',
      'Best of all, you discovered that these aren\'t just boring math formulas. They\'re the tools that real architects, interior designers, and builders use every single day to create the rooms and buildings we live in!',
      'Keep measuring, keep calculating, and keep designing. The world needs creative people who understand math!',
    ],
  },
};
