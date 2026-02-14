import type { Topic } from '../types';

export const algebraSolveForX: Topic = {
  id: 'algebra-solve-for-x',
  slug: 'algebra-solve-for-x',
  title: 'Mystery Detective',
  subtitle: 'Solve for the Unknown! (Advanced)',
  status: 'active',
  themeId: 'algebra-solve-for-x',
  heroIcons: ['\u{1F50D}', '\u2753', '\u{1F9E9}'],
  navItems: [
    { id: 'what-is-variable', icon: '\u2753', label: 'What is a Variable?' },
    { id: 'one-step-equations', icon: '\u{1F9EE}', label: 'One-Step Equations' },
    { id: 'detective-casework', icon: '\u{1F50D}', label: 'Detective Casework' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F50E}',
      title: 'Welcome, Mystery Detective!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Put on your detective hat and grab your magnifying glass! Today you\'re going to learn one of the most powerful skills in all of mathematics: solving for the unknown. In algebra, the unknown is usually called X, and your job is to figure out what X equals!',
            'Think of every algebra equation as a mystery. Someone has hidden a number and replaced it with the letter X. There are clues all around it, and if you follow the right steps, you can crack the case every single time. The best part? Unlike real mysteries, algebra always has a definite answer!',
            'Detectives use logic and evidence to solve crimes. Algebra detectives use logic and math operations to solve equations. By the end of this lesson, you\'ll be cracking cases left and right. Let\'s investigate!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'NybHckSEQBI',
          title: 'Algebra Basics: What Is Algebra? - Math Antics',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'l3XzepN03KQ',
          title: 'Algebra Basics: Solving Basic Equations Part 1',
          channelName: 'Math Antics',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: What is a Variable? ─────────────────────────
    {
      id: 'what-is-variable',
      icon: '\u2753',
      title: 'What is a Variable? X Marks the Spot!',
      readAloudBlocks: [
        {
          id: 'variable-intro-text',
          paragraphs: [
            'A variable is simply a letter that stands in for a number we don\'t know yet. It\'s like a disguise! The number is hiding behind the letter, and our job is to unmask it. We usually use X, but you could use any letter: Y, N, or even a smiley face if you wanted!',
            'Here\'s a simple example: X + 3 = 7. This equation is saying "some mystery number, plus 3, equals 7." You probably already know the answer is 4, because 4 + 3 = 7. But how did your brain figure that out? You subtracted 3 from 7! That\'s exactly what algebra teaches you to do, step by step.',
            'The key rule of algebra is: whatever you do to one side of the equals sign, you must do to the other side too. Think of it like a balance scale. If both sides are equal and you take 3 pounds off one side, you must take 3 pounds off the other side to keep it balanced!',
          ],
        },
        {
          id: 'variable-balance-text',
          paragraphs: [
            'Let\'s see the balance in action. Start with X + 5 = 12. We want X all by itself on one side. Since 5 is being added to X, we subtract 5 from both sides: X + 5 - 5 = 12 - 5. The +5 and -5 cancel out on the left, leaving us with X = 7. Case solved!',
            'This works the same way with multiplication. If 3 \u00D7 X = 21, we divide both sides by 3: X = 21 \u00F7 3 = 7. Addition is undone by subtraction, and multiplication is undone by division. These are called "inverse operations," and they are a detective\'s best tools!',
          ],
        },
        {
          id: 'variable-everyday-text',
          paragraphs: [
            'You actually use variables in everyday life without realizing it! When you say "I wonder how many minutes until lunch," you\'re thinking about an unknown number. When a recipe says "add enough water to make 2 cups," the amount of water is a variable. Your brain naturally thinks in algebra!',
            'Variables can represent anything: the number of apples in a basket, the temperature outside tomorrow, the number of points you\'ll score in a game, or the cost of a movie ticket next year. Algebra gives us a way to write down our thinking and solve problems step by step, rather than just guessing.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The word "algebra" comes from the Arabic word "al-jabr," which means "the reunion of broken parts." It was popularized by the Persian mathematician al-Khwarizmi around 820 CE. The word "algorithm" also comes from his name!',
        },
      ],
      videos: [
        {
          youtubeId: 'tBJ0tYVb_hc',
          title: 'Variables in Algebra - Why Do We Use Them?',
          channelName: 'Math Antics',
        },
      ],
      quizIds: ['alg1-q1a', 'alg1-q1b', 'alg1-q1c', 'alg1-q1d'],
    },

    // ─── Section 2: Solving One-Step Equations ──────────────────
    {
      id: 'one-step-equations',
      icon: '\u{1F9EE}',
      title: 'Solving One-Step Equations: Crack the Code!',
      readAloudBlocks: [
        {
          id: 'onestep-add-text',
          paragraphs: [
            'Let\'s master the four types of one-step equations. First up: addition and subtraction equations!',
            'When X has something added to it, you subtract to find X. Example: X + 9 = 15. Subtract 9 from both sides: X = 15 - 9 = 6. Check: 6 + 9 = 15. Correct!',
            'When X has something subtracted from it, you add to find X. Example: X - 4 = 11. Add 4 to both sides: X = 11 + 4 = 15. Check: 15 - 4 = 11. Correct! Always check your answer by plugging it back in!',
          ],
        },
        {
          id: 'onestep-mult-text',
          paragraphs: [
            'Now for multiplication and division equations!',
            'When X is multiplied by something, you divide to find X. Example: 5 \u00D7 X = 35. Divide both sides by 5: X = 35 \u00F7 5 = 7. Check: 5 \u00D7 7 = 35. Correct!',
            'When X is divided by something, you multiply to find X. Example: X \u00F7 3 = 8. Multiply both sides by 3: X = 8 \u00D7 3 = 24. Check: 24 \u00F7 3 = 8. Correct!',
            'See the pattern? Every operation has an opposite that undoes it. Addition undoes subtraction, and multiplication undoes division. Once you know this, you can solve any one-step equation in the world!',
          ],
        },
        {
          id: 'onestep-checking-text',
          paragraphs: [
            'The best detectives always double-check their work, and so should you! After you find X, plug your answer back into the original equation to make sure both sides are equal. This is called "checking your solution."',
            'For example, if you solved X + 9 = 22 and got X = 13, check it: 13 + 9 = 22. Yes! That\'s correct. But if you accidentally got X = 11, checking would reveal the error: 11 + 9 = 20, which is NOT 22. Checking saves you from wrong answers and builds confidence that your detective work is solid!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The equals sign (=) was invented in 1557 by Welsh mathematician Robert Recorde. He chose two parallel lines because, as he wrote, "no two things can be more equal." Before that, people just wrote out the word "equals"!',
        },
      ],
      videos: [
        {
          youtubeId: 'Qyd_v3DGzTM',
          title: 'Algebra Basics: Solving Basic Equations Part 2',
          channelName: 'Math Antics',
        },
        {
          youtubeId: 'LDIiYKYvvdA',
          title: 'Algebra Basics: Solving 2-Step Equations',
          channelName: 'Math Antics',
        },
      ],
      quizIds: ['alg1-q2a', 'alg1-q2b', 'alg1-q2c'],
    },

    // ─── Section 3: Detective Casework ──────────────────────────
    {
      id: 'detective-casework',
      icon: '\u{1F50D}',
      title: 'Detective Casework: Word Problem Mysteries!',
      readAloudBlocks: [
        {
          id: 'casework-intro-text',
          paragraphs: [
            'Real detectives don\'t get handed neat equations. They get messy clues and have to figure out the math themselves! Word problems are the same way. You read the story, figure out what\'s unknown, set up an equation, and solve it.',
            'Case File #1: A baker made X cookies in the morning. She sold 15 cookies and had 23 left. How many did she start with? Set up: X - 15 = 23. Add 15 to both sides: X = 38. The baker started with 38 cookies!',
            'Case File #2: Three friends split a bag of marbles equally and each got 12. How many marbles were in the bag? Set up: X \u00F7 3 = 12. Multiply both sides by 3: X = 36. There were 36 marbles in the bag!',
            'Case File #3: You saved $8 each week for X weeks and now have $56. How many weeks did you save? Set up: 8 \u00D7 X = 56. Divide both sides by 8: X = 7. You saved for 7 weeks! The key to word problems is translating the story into an equation. Once you have the equation, you already know how to solve it!',
          ],
        },
        {
          id: 'casework-tips-text',
          paragraphs: [
            'Detective\'s Guide to Word Problems: First, read the problem carefully and identify what\'s unknown (that becomes X). Second, look for key words: "total" and "altogether" usually mean addition, "left" or "remaining" mean subtraction, "each" or "per" often mean multiplication, and "split equally" means division.',
            'Third, write the equation. Fourth, solve for X using inverse operations. Fifth, check your answer by reading the original problem again and making sure your number makes sense. If the problem asks how many students are in a class and you get X = 500, something probably went wrong! Always ask yourself: does this answer make sense in the real world?',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Computer programmers use variables every single day! When you play a video game, your score, health points, and position are all stored in variables. The computer is constantly solving equations to update your game in real time!',
        },
      ],
      videos: [
        {
          youtubeId: 'F1LTPDMxwRc',
          title: 'Word Problems with Equations',
          channelName: 'Khan Academy',
        },
      ],
      quizIds: ['alg1-q3a', 'alg1-q3b', 'alg1-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: What is a Variable?
    {
      id: 'alg1-q1a',
      sectionId: 'what-is-variable',
      title: 'Solve for X!',
      question: 'X + 6 = 14. What is X?',
      options: [
        { text: '6', isCorrect: false },
        { text: '8', isCorrect: true },
        { text: '20', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg1-q1b',
      sectionId: 'what-is-variable',
      title: 'Balance the Scale!',
      question: 'X - 7 = 13. What is X?',
      options: [
        { text: '6', isCorrect: false },
        { text: '20', isCorrect: true },
        { text: '21', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg1-q1c',
      sectionId: 'what-is-variable',
      title: 'Multiplication Mystery!',
      question: '4 \u00D7 X = 28. What is X?',
      options: [
        { text: '6', isCorrect: false },
        { text: '7', isCorrect: true },
        { text: '8', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg1-q1d',
      sectionId: 'what-is-variable',
      title: 'Division Detective!',
      question: 'X \u00F7 5 = 9. What is X?',
      options: [
        { text: '45', isCorrect: true },
        { text: '14', isCorrect: false },
        { text: '4', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: One-Step Equations
    {
      id: 'alg1-q2a',
      sectionId: 'one-step-equations',
      title: 'Quick Case!',
      question: 'X + 15 = 32. What is X?',
      options: [
        { text: '17', isCorrect: true },
        { text: '47', isCorrect: false },
        { text: '15', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg1-q2b',
      sectionId: 'one-step-equations',
      title: 'Equation Cracker!',
      question: '6 \u00D7 X = 54. What is X?',
      options: [
        { text: '8', isCorrect: false },
        { text: '9', isCorrect: true },
        { text: '48', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg1-q2c',
      sectionId: 'one-step-equations',
      title: 'Inverse Operation!',
      question: 'X - 23 = 19. What is X?',
      options: [
        { text: '42', isCorrect: true },
        { text: '4', isCorrect: false },
        { text: '38', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Detective Casework
    {
      id: 'alg1-q3a',
      sectionId: 'detective-casework',
      title: 'Cookie Case!',
      question:
        'A thief stole X cookies from the bakery. He ate 5 and had 12 left. What is X?',
      options: [
        { text: '7', isCorrect: false },
        { text: '17', isCorrect: true },
        { text: '15', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg1-q3b',
      sectionId: 'detective-casework',
      title: 'Savings Mystery!',
      question:
        'You saved X dollars each week for 4 weeks and now have $52. How much did you save each week?',
      options: [
        { text: '$48', isCorrect: false },
        { text: '$13', isCorrect: true },
        { text: '$56', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'alg1-q3c',
      sectionId: 'detective-casework',
      title: 'Party Puzzle!',
      question:
        'At a party, X kids split into 5 equal teams of 7. How many kids were at the party?',
      options: [
        { text: '12', isCorrect: false },
        { text: '30', isCorrect: false },
        { text: '35', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'algebra-solve-for-x-essay',
    prompt:
      'Write your own mystery that can be solved with algebra!',
    description:
      'Now it\'s your turn to be the mystery writer! Create a short story where someone needs to figure out an unknown number. Set up the clues so that a reader could write an equation and solve for X. Be creative with your story! Write at least 100 characters to unlock a special surprise below!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant mystery! You think like both a detective and a mathematician!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'algebra-solve-for-x-reward',
    title: 'Mystery Solver Badge!',
    description:
      'You\'ve unlocked the Mystery Solver! Use your algebra skills to crack increasingly challenging cases and prove you\'re the ultimate equation detective.',
    lockMessage: 'Case File Locked!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 10 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save your mystery story essay (100+ characters)',
      },
    ],
    type: 'mystery-solver',
    celebrationMessage:
      'CASE CLOSED! You\'ve unlocked the Mystery Solver Badge! You\'re an algebra detective extraordinaire!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Certified Mystery Detective!',
    paragraphs: [
      'Congratulations! You\'ve cracked the code of algebra and learned how to solve for the unknown!',
      'You discovered that a variable is just a letter standing in for a mystery number. You learned the golden rule of algebra: whatever you do to one side of the equation, you must do to the other side to keep it balanced.',
      'You mastered all four types of one-step equations: addition (undo with subtraction), subtraction (undo with addition), multiplication (undo with division), and division (undo with multiplication). These inverse operations are your detective toolkit!',
      'Best of all, you learned to translate real-world word problems into equations. Whether it\'s cookies, marbles, money, or any other mystery, you now have the power to set up an equation and solve it step by step.',
      'Keep solving mysteries! Algebra is the foundation of all higher math, computer science, engineering, and even game design. Every equation you solve makes you a stronger thinker!',
    ],
  },
};
