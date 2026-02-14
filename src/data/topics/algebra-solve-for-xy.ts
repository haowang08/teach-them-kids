import type { Topic } from '../types';

export const algebraSolveForXY: Topic = {
  id: 'algebra-solve-for-xy',
  slug: 'algebra-solve-for-xy',
  title: 'Treasure Map Coordinates',
  subtitle: 'Solve Systems of Equations!',
  status: 'active',
  themeId: 'algebra-solve-for-xy',
  heroIcons: ['\u{1F5FA}\uFE0F', '\u{1F4CD}', '\u{1F48E}'],
  navItems: [
    { id: 'two-unknowns', icon: '\u{1F4CD}', label: 'Two Unknowns' },
    { id: 'solving-systems', icon: '\u{1F9E9}', label: 'Solving Systems' },
    { id: 'map-navigation', icon: '\u{1F5FA}\uFE0F', label: 'Map Navigation' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F5FA}\uFE0F',
      title: 'Welcome, Treasure Hunter!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Ahoy, treasure hunter! You\'ve already mastered solving for one unknown (X). But what happens when the treasure map has TWO unknowns? What if you need to find both the X coordinate and the Y coordinate to locate the buried gold?',
            'That\'s where systems of equations come in! A system of equations is just two or more equations that work together, each giving you a different clue about the same mystery numbers. By combining the clues, you can find both X and Y!',
            'Think of it like this: if someone tells you "X + Y = 10," there are lots of possibilities. X could be 3 and Y could be 7, or X could be 6 and Y could be 4. But if they also tell you "X - Y = 2," now you have enough clues to find the EXACT answer. Let\'s learn how!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'nok99JOhcjo',
          title: 'Algebra Basics: Solving 2-Step Equations',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'GmMX3-nTWbE',
          title: 'Systems of Equations with Substitution',
          channelName: 'Khan Academy',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Two Unknowns ────────────────────────────────
    {
      id: 'two-unknowns',
      icon: '\u{1F4CD}',
      title: 'Two Unknowns: X and Y on the Grid!',
      readAloudBlocks: [
        {
          id: 'unknowns-intro-text',
          paragraphs: [
            'On a treasure map, every location has two coordinates: how far east or west (the X coordinate) and how far north or south (the Y coordinate). Together, they\'re written as (X, Y). The point (3, 5) means "go 3 steps east and 5 steps north." This is called a coordinate pair!',
            'When we have two unknown numbers, we use two different variables: X and Y. One equation with two unknowns isn\'t enough to find a single answer. For example, X + Y = 8 could mean X=1, Y=7 or X=2, Y=6 or X=4, Y=4, and so on. There are infinitely many solutions!',
            'But when we have TWO equations with the same two unknowns, the magic happens. The two clues together narrow it down to exactly one answer. It\'s like getting two witnesses who each saw part of the crime. Alone, each witness doesn\'t know the full story. Together, they solve the case!',
          ],
        },
        {
          id: 'unknowns-grid-text',
          paragraphs: [
            'On a coordinate grid, each equation creates a line. One equation = one line with infinitely many points. Two equations = two lines that cross at exactly one point. That crossing point is the answer! The X and Y values at that intersection satisfy both equations at the same time.',
            'For example, if one clue says "the treasure is on the line X + Y = 10" and the other says "the treasure is on the line X - Y = 4," the treasure must be at the point where those two lines cross. That\'s the only point that\'s on BOTH lines!',
          ],
        },
        {
          id: 'unknowns-realworld-text',
          paragraphs: [
            'Two-variable problems show up everywhere in real life! At a store, if you buy X apples and Y oranges and spend $10 total, that\'s one equation. If you know apples cost $1 and oranges cost $2, that gives you: X + 2Y = 10. If someone also tells you that you bought the same number of each fruit (X = Y), now you have two equations and can solve!',
            'Substitute X for Y in the first equation: Y + 2Y = 10, so 3Y = 10, meaning Y is about 3.33. Since you can\'t buy a third of a fruit, you\'d buy 3 of each and spend $9, or adjust your budget! Real-world math doesn\'t always give perfect answers, and that\'s okay. The important thing is setting up the equations correctly.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The coordinate system we use today was invented by French mathematician Ren\u00E9 Descartes in the 1600s. Legend says he got the idea while lying in bed watching a fly on the ceiling and thinking about how to describe its position!',
        },
      ],
      videos: [
        {
          youtubeId: '9Uc62CuQjc4',
          title: 'The Coordinate Plane - Intro to Graphing',
          channelName: 'Math Antics',
        },
      ],
      quizIds: ['alg2-q1a', 'alg2-q1b', 'alg2-q1c', 'alg2-q1d'],
    },

    // ─── Section 2: Solving Simple Systems ──────────────────────
    {
      id: 'solving-systems',
      icon: '\u{1F9E9}',
      title: 'Solving Simple Systems: The Substitution Treasure Hunt!',
      readAloudBlocks: [
        {
          id: 'systems-intro-text',
          paragraphs: [
            'There are several ways to solve a system of equations, but the easiest one for beginners is called substitution. It\'s like passing a secret note from one equation to the other!',
            'Here\'s how it works. Say you have: Equation 1: Y = X + 2, and Equation 2: X + Y = 10. The first equation tells you that Y is the same thing as X + 2. So wherever you see Y in the second equation, you can replace it with X + 2!',
            'Substituting into Equation 2: X + (X + 2) = 10. Now you only have one variable! Combine: 2X + 2 = 10. Subtract 2: 2X = 8. Divide by 2: X = 4. Now plug X = 4 back into Equation 1: Y = 4 + 2 = 6. The answer is X = 4, Y = 6, or the coordinate point (4, 6). Treasure found!',
          ],
        },
        {
          id: 'systems-addition-text',
          paragraphs: [
            'There\'s another cool method called elimination (or the addition method). If you have: X + Y = 10, and X - Y = 4, you can ADD the two equations together! The +Y and -Y cancel each other out: (X + Y) + (X - Y) = 10 + 4, which gives you 2X = 14, so X = 7. Then plug back in: 7 + Y = 10, so Y = 3. The treasure is at (7, 3)!',
            'The elimination method works great when the Y terms (or X terms) are opposites, like +Y and -Y. They cancel when you add the equations, leaving you with just one variable. It\'s like two puzzle pieces clicking together perfectly!',
            'Both methods always give the same answer. Substitution is great when one equation already has a variable by itself (like Y = something). Elimination is great when variables have opposite signs. Pick whichever feels easier for each problem!',
          ],
        },
        {
          id: 'systems-practice-text',
          paragraphs: [
            'Let\'s walk through one more detailed example with substitution. Suppose you have: Equation 1: X = Y + 5 and Equation 2: 2X + Y = 25. Since Equation 1 tells us X equals Y + 5, substitute into Equation 2: 2(Y + 5) + Y = 25. Distribute the 2: 2Y + 10 + Y = 25. Combine like terms: 3Y + 10 = 25. Subtract 10: 3Y = 15. Divide by 3: Y = 5. Now find X: X = 5 + 5 = 10. The treasure is at (10, 5)!',
            'And here\'s an elimination example with a twist. What if you have: 2X + Y = 16 and X + Y = 10? The Y terms are the same (both +Y), so if you SUBTRACT the second equation from the first: (2X + Y) - (X + Y) = 16 - 10, you get X = 6. Then plug back in: 6 + Y = 10, so Y = 4. You can add OR subtract equations in the elimination method!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'GPS satellites use systems of equations with three unknowns (X, Y, and Z for 3D position) to pinpoint your location on Earth. Your phone solves these equations in milliseconds to show you exactly where you are on a map!',
        },
      ],
      videos: [],
      quizIds: ['alg2-q2a', 'alg2-q2b', 'alg2-q2c'],
    },

    // ─── Section 3: Map Navigation Problems ─────────────────────
    {
      id: 'map-navigation',
      icon: '\u{1F5FA}\uFE0F',
      title: 'Map Navigation: Find the Treasure!',
      readAloudBlocks: [
        {
          id: 'navigation-intro-text',
          paragraphs: [
            'Now let\'s use systems of equations to solve real treasure map problems! Each problem gives you two clues, and you need to find the coordinates where X marks the spot.',
            'Treasure Hunt #1: Two pirate crews are racing to find gold. Clue A says the treasure\'s coordinates add up to 12 (X + Y = 12). Clue B says X is twice as big as Y (X = 2Y). Substitute: 2Y + Y = 12, so 3Y = 12, meaning Y = 4. Then X = 2 \u00D7 4 = 8. The treasure is at point (8, 4)!',
            'Treasure Hunt #2: A secret map says the sum of the coordinates is 15 (X + Y = 15) and the difference is 3 (X - Y = 3). Add the equations: 2X = 18, so X = 9. Then 9 + Y = 15, so Y = 6. Dig at (9, 6)!',
            'Treasure Hunt #3: An old riddle says "Together we are 20, but I am 4 more than you." That translates to X + Y = 20 and X = Y + 4. Substitute: (Y + 4) + Y = 20, so 2Y + 4 = 20, meaning 2Y = 16, so Y = 8. Then X = 8 + 4 = 12. The treasure is at (12, 8)! See how word problems become systems of equations?',
          ],
        },
        {
          id: 'navigation-strategy-text',
          paragraphs: [
            'Treasure hunting strategy: when you see a word problem with two unknowns, follow these steps. First, identify your two unknowns and assign them X and Y. Second, find two different relationships (clues) between them and write each as an equation. Third, choose substitution or elimination. Fourth, solve and check!',
            'Here\'s one more for the road. A pirate has gold coins and silver coins. He has 30 coins total (X + Y = 30). Gold coins are worth $5 each, silver coins are worth $2 each, and his treasure is worth $99 total (5X + 2Y = 99). From equation 1: Y = 30 - X. Substitute: 5X + 2(30 - X) = 99, so 5X + 60 - 2X = 99, meaning 3X = 39, so X = 13 gold coins and Y = 17 silver coins. That pirate knows his math!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Real treasure hunters and archaeologists use coordinate grids to map dig sites. They divide the ground into a grid and record the exact (X, Y) position of every artifact they find. Math literally helps uncover history!',
        },
      ],
      videos: [],
      quizIds: ['alg2-q3a', 'alg2-q3b', 'alg2-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Two Unknowns
    {
      id: 'alg2-q1a',
      sectionId: 'two-unknowns',
      title: 'Coordinate Clue!',
      question:
        'X + Y = 10 and X - Y = 4. What is X?',
      options: [
        { text: '5', isCorrect: false },
        { text: '6', isCorrect: false },
        { text: '7', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg2-q1b',
      sectionId: 'two-unknowns',
      title: 'Find Y!',
      question:
        'X + Y = 10 and X - Y = 4. What is Y?',
      options: [
        { text: '3', isCorrect: true },
        { text: '4', isCorrect: false },
        { text: '6', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg2-q1c',
      sectionId: 'two-unknowns',
      title: 'Grid Point!',
      question:
        'X + Y = 12 and X = 2 \u00D7 Y. What is Y?',
      options: [
        { text: '3', isCorrect: false },
        { text: '4', isCorrect: true },
        { text: '6', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg2-q1d',
      sectionId: 'two-unknowns',
      title: 'Map Coordinates!',
      question:
        'X + Y = 12 and X = 2 \u00D7 Y. What is X?',
      options: [
        { text: '6', isCorrect: false },
        { text: '8', isCorrect: true },
        { text: '10', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Solving Systems
    {
      id: 'alg2-q2a',
      sectionId: 'solving-systems',
      title: 'Substitution Challenge!',
      question:
        'Y = X + 3 and X + Y = 11. What is X?',
      options: [
        { text: '4', isCorrect: true },
        { text: '5', isCorrect: false },
        { text: '7', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg2-q2b',
      sectionId: 'solving-systems',
      title: 'Elimination Method!',
      question:
        'X + Y = 20 and X - Y = 6. What is X?',
      options: [
        { text: '10', isCorrect: false },
        { text: '13', isCorrect: true },
        { text: '14', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg2-q2c',
      sectionId: 'solving-systems',
      title: 'System Solver!',
      question:
        'X + Y = 20 and X - Y = 6. What is Y?',
      options: [
        { text: '5', isCorrect: false },
        { text: '7', isCorrect: true },
        { text: '10', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Map Navigation
    {
      id: 'alg2-q3a',
      sectionId: 'map-navigation',
      title: 'Treasure Hunt!',
      question:
        'The treasure\'s coordinates add up to 15 (X + Y = 15) and X is 3 more than Y (X = Y + 3). What is X?',
      options: [
        { text: '8', isCorrect: false },
        { text: '9', isCorrect: true },
        { text: '10', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg2-q3b',
      sectionId: 'map-navigation',
      title: 'Pirate Puzzle!',
      question:
        'Two treasure chests hold a total of 50 gold coins (X + Y = 50). The big chest has 3 times as many as the small chest (X = 3Y). How many coins are in the small chest (Y)?',
      options: [
        { text: '10', isCorrect: false },
        { text: '12.5', isCorrect: true },
        { text: '15', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg2-q3c',
      sectionId: 'map-navigation',
      title: 'Final Navigation!',
      question:
        'A riddle says "Together we are 18, and our difference is 6." (X + Y = 18 and X - Y = 6). What are the coordinates (X, Y)?',
      options: [
        { text: '(10, 8)', isCorrect: false },
        { text: '(12, 6)', isCorrect: true },
        { text: '(9, 9)', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'algebra-solve-for-xy-essay',
    prompt:
      'Explain how you would use X and Y coordinates to find treasure on a map!',
    description:
      'Imagine you\'re a pirate captain and you need to explain to your crew how coordinate systems work. Describe how X and Y values pinpoint a location, and create your own treasure map problem with two clues (two equations). Show how to solve it! Write at least 100 characters to unlock a special surprise below!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Excellent map work! You\'re a true treasure-hunting mathematician!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'algebra-solve-for-xy-reward',
    title: 'Treasure Map Navigator!',
    description:
      'You\'ve unlocked the Treasure Map Navigator! Use your systems-of-equations skills to plot coordinates and navigate your way to hidden treasure.',
    lockMessage: 'Treasure Map Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save your treasure map essay (100+ characters)',
      },
    ],
    type: 'treasure-map',
    celebrationMessage:
      'X MARKS THE SPOT! You\'ve unlocked the Treasure Map Navigator! You\'re a systems-of-equations master!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Certified Treasure Map Navigator!',
    paragraphs: [
      'Congratulations! You\'ve learned one of the most powerful tools in algebra: solving systems of equations!',
      'You discovered that when you have two unknowns (X and Y), you need two equations to find the answer. One equation gives you many possibilities, but two equations together narrow it down to exactly one solution, just like two clues that solve a mystery.',
      'You mastered two methods for solving systems: substitution (replacing one variable with an expression from the other equation) and elimination (adding or subtracting equations to cancel out a variable). Both methods always lead to the same answer!',
      'You also connected algebra to coordinate grids and real-world navigation. Every GPS device, every video game map, and every architect\'s blueprint uses coordinate systems based on the same X and Y values you practiced today.',
      'Keep hunting for treasure in the world of math! Systems of equations are used in science, engineering, economics, and computer graphics. You now have the skills to tackle two unknowns at once!',
    ],
  },
};
