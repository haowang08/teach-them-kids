import type { Topic } from '../types';

export const multiDigitMultiplication: Topic = {
  id: 'multi-digit-multiplication',
  slug: 'multi-digit-multiplication',
  title: 'Space Station Builder',
  subtitle: 'Master Multi-Digit Multiplication',
  status: 'active',
  themeId: 'multi-digit-multiplication',
  heroIcons: ['\u{1F680}', '\u2716\uFE0F', '\u{1F6F8}'],
  navItems: [
    { id: 'building-blocks', icon: '\u{1F9F1}', label: 'Building Blocks Method' },
    { id: 'standard-algorithm', icon: '\u{1F680}', label: 'The Standard Algorithm' },
    { id: 'space-missions', icon: '\u{1F30D}', label: 'Space Mission Problems' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F680}',
      title: 'Mission Briefing: Space Station Builder!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Attention, Space Cadet! This is Commander Calculate from Space Station Alpha. We have an important mission for you!',
            'We\'re building the biggest space station ever, and we need someone who can handle BIG multiplication problems. You see, single-digit multiplication was great for counting small things, but when you\'re building a space station, the numbers get much bigger!',
            'Imagine this: each wing of the space station needs 23 solar panels. If we\'re building 4 wings, how many solar panels do we need total? That\'s 23 \u00D7 4, and you can\'t just look that up on a times table! You need a strategy for multiplying bigger numbers.',
            'In this mission, you\'ll learn the Building Blocks Method (breaking big problems into smaller ones), the Standard Algorithm (the step-by-step method that works for ANY multiplication), and you\'ll solve real space mission problems. Ready for liftoff? 3, 2, 1... blast off!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'FJ5qLWP3Fqo',
          title: 'Multi-Digit Multiplication Pt 1',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'xO_1bYgoQvA',
          title: 'Multi-Digit Multiplication',
          channelName: 'Khan Academy',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Building Blocks Method ──────────────────────
    {
      id: 'building-blocks',
      icon: '\u{1F9F1}',
      title: 'The Building Blocks Method: Break It Apart!',
      readAloudBlocks: [
        {
          id: 'building-blocks-intro',
          paragraphs: [
            'Engineer Estimate here! Before I build anything on the space station, I always break the job into smaller parts. That\'s exactly how the Building Blocks Method works for multiplication!',
            'Here\'s the big idea: you can break a big number into its place value parts and multiply each part separately. Let me show you with 23 \u00D7 4.',
            'Step 1: Break 23 into 20 + 3. Step 2: Multiply each part by 4. That gives you 20 \u00D7 4 = 80 and 3 \u00D7 4 = 12. Step 3: Add the results together: 80 + 12 = 92. So 23 \u00D7 4 = 92!',
            'Let\'s try a bigger one: 45 \u00D7 6. Break 45 into 40 + 5. Now multiply: 40 \u00D7 6 = 240 and 5 \u00D7 6 = 30. Add them: 240 + 30 = 270. So 45 \u00D7 6 = 270!',
            'This method works because of the distributive property: when you multiply a sum, you can multiply each part and then add. It\'s like building a space station module by module: each piece is manageable, and together they make something incredible!',
            'You can even use estimation first! Before solving 38 \u00D7 5, think: 40 \u00D7 5 = 200. So the answer should be close to 200 but a little less. Now solve: 30 \u00D7 5 = 150, 8 \u00D7 5 = 40, total = 190. That\'s close to our estimate of 200. Great check!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F468}\u200D\u{1F680}',
          name: 'Commander Calculate',
          title: 'Space Station Mission Leader',
          description:
            'Commander Calculate has led 47 space missions and knows that careful multiplication is the key to a successful mission. One wrong calculation could mean not enough fuel or too few supplies! He always double-checks his work and teaches cadets to do the same.',
          extraTag: 'Motto: "Measure twice, multiply once!"',
        },
        {
          emoji: '\u{1F527}',
          name: 'Engineer Estimate',
          title: 'Building Blocks Expert',
          description:
            'Engineer Estimate loves the Building Blocks Method because it\'s how she designs space station modules. Just as she breaks a big structure into smaller parts, she breaks big multiplication into smaller, easier problems. She always estimates first to make sure her answer makes sense!',
          extraTag: 'Specialty: Breaking big problems into small ones',
        },
        {
          emoji: '\u{1F4BB}',
          name: 'Astronaut Algorithm',
          title: 'Standard Algorithm Specialist',
          description:
            'Astronaut Algorithm is the crew\'s math computer! She can multiply any two numbers using the Standard Algorithm, step by step, never missing a beat. She knows exactly when to carry, when to add, and how to line up all the digits perfectly. She calls it "the recipe that never fails!"',
          extraTag: 'Special power: Flawless carrying and regrouping',
        },
      ],
      funFacts: [
        {
          title: 'Space Math Fact!',
          text: 'The International Space Station orbits Earth about 16 times per day. Each orbit takes about 90 minutes. To figure out total orbit time per day, you multiply: 16 \u00D7 90 = 1,440 minutes, which is exactly 24 hours! Real astronauts use multi-digit multiplication every day!',
        },
      ],
      videos: [
        {
          youtubeId: 'qhHdZPyAB8E',
          title: 'Distributive Property of Multiplication',
          channelName: 'Math with Mr. J',
        },
      ],
      quizIds: ['mmult-q1a', 'mmult-q1b', 'mmult-q1c', 'mmult-q1d'],
    },

    // ─── Section 2: The Standard Algorithm ──────────────────────
    {
      id: 'standard-algorithm',
      icon: '\u{1F680}',
      title: 'The Standard Algorithm: Step by Step',
      readAloudBlocks: [
        {
          id: 'algorithm-intro',
          paragraphs: [
            'Astronaut Algorithm here! The Building Blocks Method is fantastic for understanding WHY multiplication works, but when you need to be fast and precise, the Standard Algorithm is your best friend.',
            'Let\'s multiply 36 \u00D7 7 step by step. Write 36 on top and 7 below, lined up on the right side.',
            'Step 1: Multiply the ones digit. 7 \u00D7 6 = 42. Write the 2 in the ones place and CARRY the 4 above the tens place. Step 2: Multiply the tens digit. 7 \u00D7 3 = 21. Now ADD the carried 4: 21 + 4 = 25. Write 25. The answer is 252!',
            'Let\'s check: Using Building Blocks, 30 \u00D7 7 = 210 and 6 \u00D7 7 = 42. Total: 210 + 42 = 252. Same answer! The Standard Algorithm is just a faster way to do the same thing.',
            'Now let\'s try two 2-digit numbers: 24 \u00D7 13. This time you need two rows! First, multiply by the ones: 3 \u00D7 24 = 72. Then multiply by the tens: 10 \u00D7 24 = 240. Add them: 72 + 240 = 312!',
            'The carrying part is what makes this tricky, so here\'s my tip: always write your carried number small and neat above the next column. Cross it out after you\'ve used it. This keeps everything organized, just like organizing tools on a space station!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Astronaut Algorithm\'s Tip!',
          text: 'The Standard Algorithm was used by ancient mathematicians over 800 years ago! A mathematician named al-Khwarizmi wrote about it, and the word "algorithm" actually comes from his name! So every time you use the Standard Algorithm, you\'re following a method that\'s been trusted for centuries.',
        },
      ],
      videos: [
        {
          youtubeId: 'RVYwunbpMHA',
          title: 'Multi-Digit Multiplication Pt 2',
          channelName: 'Math Antics',
        },
      ],
      quizIds: ['mmult-q2a', 'mmult-q2b', 'mmult-q2c'],
    },

    // ─── Section 3: Space Mission Problems ──────────────────────
    {
      id: 'space-missions',
      icon: '\u{1F30D}',
      title: 'Space Mission Problems',
      readAloudBlocks: [
        {
          id: 'missions-intro',
          paragraphs: [
            'Commander Calculate here with your final mission challenges! These are real problems that space engineers solve every day.',
            'When you see a multi-digit multiplication word problem, follow the mission protocol: First, IDENTIFY the numbers you need to multiply. Second, ESTIMATE the answer to make sure you\'re in the right range. Third, CALCULATE using either the Building Blocks Method or the Standard Algorithm. Fourth, CHECK your answer against your estimate!',
            'For example: "The space station has 15 modules. Each module has 24 windows for observing Earth. How many windows are on the entire station?" Identify: 15 \u00D7 24. Estimate: 15 \u00D7 25 = 375, so the answer should be near 375. Calculate: 15 \u00D7 24 = 15 \u00D7 20 + 15 \u00D7 4 = 300 + 60 = 360. Check: 360 is close to 375. Mission accomplished!',
            'Remember, multi-digit multiplication is used everywhere: calculating distances in space, figuring out how many supplies to pack, determining power needs, and even scheduling crew rotations. Every great astronaut is also a great mathematician!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Real Space Math!',
          text: 'The Space Shuttle traveled at about 17,500 miles per hour in orbit. To figure out how far it traveled in 24 hours, NASA engineers multiplied 17,500 \u00D7 24 = 420,000 miles! That\'s like going around Earth almost 17 times in a single day! Multi-digit multiplication is rocket science!',
        },
      ],
      videos: [
        {
          youtubeId: 'rw7G9F3dBTc',
          title: 'Multiplying Multi-Digit Numbers',
          channelName: 'Math with Mr. J',
        },
      ],
      quizIds: ['mmult-q3a', 'mmult-q3b', 'mmult-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Building Blocks
    {
      id: 'mmult-q1a',
      sectionId: 'building-blocks',
      title: 'Solar Panel Count!',
      question:
        'The space station needs 12 solar panels on each of its 24 wings. Using the Building Blocks Method, how many solar panels are needed in total? (Hint: 12 \u00D7 24 = 12 \u00D7 20 + 12 \u00D7 4)',
      options: [
        { text: '248', isCorrect: false },
        { text: '288', isCorrect: true },
        { text: '312', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mmult-q1b',
      sectionId: 'building-blocks',
      title: 'Fuel Calculation!',
      question:
        'Each fuel tank holds 35 gallons. The rocket has 6 fuel tanks. How many gallons of fuel are there in total?',
      options: [
        { text: '180', isCorrect: false },
        { text: '210', isCorrect: true },
        { text: '240', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mmult-q1c',
      sectionId: 'building-blocks',
      title: 'Building Blocks Check!',
      question:
        'Engineer Estimate breaks 47 \u00D7 3 into (40 \u00D7 3) + (7 \u00D7 3). What is 40 \u00D7 3?',
      options: [
        { text: '110', isCorrect: false },
        { text: '120', isCorrect: true },
        { text: '130', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mmult-q1d',
      sectionId: 'building-blocks',
      title: 'Crew Supplies!',
      question:
        'Each astronaut needs 28 meals for a week-long mission. If there are 5 astronauts, how many meals must be packed?',
      options: [
        { text: '130', isCorrect: false },
        { text: '140', isCorrect: true },
        { text: '150', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Standard Algorithm
    {
      id: 'mmult-q2a',
      sectionId: 'standard-algorithm',
      title: 'Carrying Practice!',
      question:
        'Using the Standard Algorithm, what is 56 \u00D7 7? (Hint: 7 \u00D7 6 = 42, carry the 4. Then 7 \u00D7 5 = 35, plus 4 = 39.)',
      options: [
        { text: '382', isCorrect: false },
        { text: '392', isCorrect: true },
        { text: '402', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mmult-q2b',
      sectionId: 'standard-algorithm',
      title: 'Two-Digit Challenge!',
      question:
        'The space station has 13 corridors, each with 15 lights. How many lights are there in total?',
      options: [
        { text: '185', isCorrect: false },
        { text: '195', isCorrect: true },
        { text: '205', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mmult-q2c',
      sectionId: 'standard-algorithm',
      title: 'Oxygen Tanks!',
      question:
        'Each oxygen module contains 48 tanks. The station has 9 oxygen modules. How many oxygen tanks are there?',
      options: [
        { text: '422', isCorrect: false },
        { text: '432', isCorrect: true },
        { text: '442', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Space Missions
    {
      id: 'mmult-q3a',
      sectionId: 'space-missions',
      title: 'Distance Calculator!',
      question:
        'A supply rocket travels 125 miles every minute. How many miles does it travel in 8 minutes?',
      options: [
        { text: '900', isCorrect: false },
        { text: '1,000', isCorrect: true },
        { text: '1,100', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mmult-q3b',
      sectionId: 'space-missions',
      title: 'Photo Mission!',
      question:
        'The space telescope takes 32 photos every orbit. It completes 16 orbits per day. How many photos does it take in a day?',
      options: [
        { text: '480', isCorrect: false },
        { text: '512', isCorrect: true },
        { text: '544', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mmult-q3c',
      sectionId: 'space-missions',
      title: 'Satellite Array!',
      question:
        'A satellite array has 25 rows of solar cells with 36 cells in each row. How many solar cells are in the entire array?',
      options: [
        { text: '850', isCorrect: false },
        { text: '900', isCorrect: true },
        { text: '950', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'mmult-essay',
    prompt:
      'Explain in your own words how to multiply a 2-digit number by a 1-digit number.',
    description:
      'Mission report time, cadet! Explain how to multiply a 2-digit number by a 1-digit number. You can use the Building Blocks Method, the Standard Algorithm, or both! Use an example like 34 \u00D7 5 to show each step. Write at least 100 characters to unlock a special surprise below!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Outstanding mission report, cadet! Your explanation is crystal clear. You\'re ready to build space stations!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'mmult-reward',
    title: 'Build Your Own Space Station!',
    description:
      'You\'ve proven your multi-digit multiplication skills are out of this world! Build your very own space station as a reward for your incredible math achievements!',
    lockMessage: 'Space Station Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save a mission report (100+ characters)',
      },
    ],
    type: 'space-station',
    celebrationMessage:
      'LIFTOFF! You\'ve unlocked the Space Station Builder! Your multiplication skills are truly out of this world, astronaut!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Mission Complete, Astronaut!',
    paragraphs: [
      'Congratulations, Space Cadet! You\'ve completed your multi-digit multiplication training!',
      'You mastered the Building Blocks Method, learning to break big numbers apart by place value. You now know that 23 \u00D7 4 is really (20 \u00D7 4) + (3 \u00D7 4) = 80 + 12 = 92. Breaking big problems into smaller ones makes everything manageable!',
      'You learned the Standard Algorithm, the step-by-step method that works for any multiplication problem. You know how to multiply each digit, carry when needed, and add up the results. It\'s the recipe that never fails!',
      'You solved real space mission problems, from counting solar panels and oxygen tanks to calculating distances and photo missions. You learned to estimate first and check your answers against your estimates.',
      'These skills will launch you into even bigger math adventures. Whether you\'re multiplying 3-digit numbers, working with money, or solving real-world problems, you now have the tools. Keep reaching for the stars, astronaut!',
    ],
  },
};
