import type { Topic } from '../types';

export const historyOfCounting: Topic = {
  id: 'history-of-counting',
  slug: 'history-of-counting',
  title: 'History of Counting: From Fingers to Computers',
  subtitle:
    'How Humans Learned to Count',
  status: 'active',
  themeId: 'history-of-counting',
  heroIcons: ['\u{1F9EE}', '\u{1F522}', '\u{1F4BB}'],
  navItems: [
    { id: 'ancient-numbers', icon: '\u{1F9EE}', label: 'Ancient Number Systems' },
    { id: 'invention-of-zero', icon: '\u{1F30C}', label: 'The Invention of Zero' },
    { id: 'modern-numbers', icon: '\u{1F4BB}', label: 'Modern Numbers' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F522}',
      title: 'Welcome, Number Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'How high can you count? To a hundred? A thousand? A million? Today, counting feels as natural as breathing. But thousands of years ago, humans had no numbers at all! Imagine trying to run a farm, build a pyramid, or trade goods without being able to count. How would you keep track of anything?',
            'The story of counting is one of the greatest adventures in human history. It took thousands of years and dozens of civilizations to develop the number system we use today. Along the way, brilliant thinkers from India, Babylon, Egypt, China, and the Maya all contributed pieces to the puzzle.',
            'In this adventure, you\'ll discover how ancient people first learned to count using nothing but their fingers and tally marks. You\'ll learn about the revolutionary invention of zero, an idea so powerful it changed everything. And you\'ll see how numbers evolved into the binary code that powers every computer and phone in the world today. Let\'s start counting!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'cZH0YnFpjwU',
          title: 'A Brief History of Numerical Systems',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient Number Systems ──────────────────────
    {
      id: 'ancient-numbers',
      icon: '\u{1F9EE}',
      title: 'Ancient Number Systems: The First Ways to Count',
      readAloudBlocks: [
        {
          id: 'ancient-intro-text',
          paragraphs: [
            'The oldest evidence of counting dates back about 43,000 years! Archaeologists found a baboon bone in Africa called the Lebombo Bone with 29 tally marks scratched into it. Was someone counting the days of the moon cycle? We\'ll never know for sure, but this shows that even our ancient ancestors needed to count!',
            'As civilizations grew, simple tally marks weren\'t enough. The Egyptians created one of the first number systems around 3000 BCE, using special hieroglyphs for 1, 10, 100, 1,000, and even 1,000,000! The Babylonians developed an even more sophisticated system based on the number 60 (called sexagesimal), which is why we still have 60 seconds in a minute and 60 minutes in an hour!',
            'The Romans created a system using letters (I, V, X, L, C, D, M) that we still see on clock faces and movie credits today. And the ancient Chinese developed their own rod numeral system that could handle very large calculations. Each civilization found its own clever way to represent numbers!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9B4}',
          name: 'The Lebombo Bone',
          title: 'The Oldest Known Counting Tool',
          description:
            'The Lebombo Bone is a baboon fibula (leg bone) with 29 tally marks carved into it, discovered in a cave in the Lebombo Mountains between South Africa and Eswatini. It\'s about 43,000 years old, making it one of the oldest known mathematical objects! The 29 notches may represent a lunar month (the moon takes about 29.5 days to complete its cycle). This simple bone shows that humans have been counting for tens of thousands of years, long before writing, cities, or agriculture existed!',
          extraTag: 'Age: ~43,000 years old',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Egyptian Numerals',
          title: 'Hieroglyphs for Numbers',
          description:
            'The ancient Egyptians used special hieroglyphs for powers of 10: a vertical stroke for 1, a heel bone for 10, a coiled rope for 100, a lotus flower for 1,000, a finger for 10,000, a tadpole for 100,000, and a seated god for 1,000,000! To write a number, they simply repeated the symbols. The number 365 would be three coiled ropes, six heel bones, and five strokes. It was simple but bulky. Writing 999,999 required 54 symbols!',
          extraTag: 'Base-10 system with hieroglyphs',
        },
        {
          emoji: '\u{1F312}',
          name: 'Babylonian Base-60',
          title: 'Why We Have 60 Seconds in a Minute',
          description:
            'The ancient Babylonians (in modern-day Iraq) developed a number system based on 60 instead of 10. Why 60? Because 60 can be evenly divided by 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, and 60, making fractions much easier! This system, developed around 1800 BCE, is why we have 60 seconds in a minute, 60 minutes in an hour, and 360 degrees in a circle. The Babylonians were also the first to use a positional number system, where a digit\'s position changes its value, just like our modern system!',
          extraTag: 'Legacy: 60 seconds, 60 minutes, 360\u00B0',
        },
        {
          emoji: '\u{1F531}',
          name: 'Roman Numerals',
          title: 'Letters as Numbers',
          description:
            'The Romans used seven letters to write numbers: I (1), V (5), X (10), L (50), C (100), D (500), and M (1,000). The trick is that placing a smaller numeral before a larger one means subtraction: IV = 4 (not 6), IX = 9, XL = 40. Roman numerals are still used today for clock faces, Super Bowl numbers, book chapters, and movie copyright dates. However, Roman numerals had a big weakness: they made math really hard! Try multiplying XLVII by XXIX without converting to regular numbers!',
          extraTag: 'Still used on clocks and films!',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The word "calculate" comes from the Latin word "calculus," which means "small stone." Ancient Romans used small stones on a counting board (called an abacus) to do arithmetic. So when you do calculations, you\'re literally "playing with stones!"',
        },
      ],
      videos: [
        {
          youtubeId: 'Ar7CNsJUm58',
          title: 'The Ancient Origins of Numbers',
          channelName: 'History Channel',
        },
      ],
      quizIds: ['counting-q1a', 'counting-q1b', 'counting-q1c', 'counting-q1d'],
    },

    // ─── Section 2: The Invention of Zero ───────────────────────
    {
      id: 'invention-of-zero',
      icon: '\u{1F30C}',
      title: 'The Invention of Zero: Nothing Changed Everything',
      readAloudBlocks: [
        {
          id: 'zero-intro-text',
          paragraphs: [
            'It might seem strange, but the number zero was one of the hardest ideas in the history of mathematics. How can "nothing" be "something"? This question puzzled brilliant minds for thousands of years!',
            'The Babylonians were the first to use a placeholder symbol (around 300 BCE) to show an empty position in a number, like the difference between 305 and 35. But they didn\'t think of it as a real number. The Maya civilization in Central America independently invented a true zero around 36 BCE, represented by a shell symbol.',
            'But it was Indian mathematicians who truly revolutionized mathematics by treating zero as a full number, one that you could add, subtract, multiply, and use in equations. The great mathematician Brahmagupta wrote the first rules for calculating with zero in 628 CE. This idea traveled through the Islamic world to Europe and changed mathematics forever!',
          ],
        },
        {
          id: 'zero-outro-text',
          paragraphs: [
            'Without zero, we wouldn\'t have algebra, calculus, physics, engineering, or computers. The simple idea that "nothing" is a number unlocked the ability to do advanced mathematics that built our modern world. Every time you see a 0 on a calculator, phone, or computer, remember that this tiny circle represents one of humanity\'s greatest inventions!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9D8}',
          name: 'Brahmagupta',
          title: 'The Man Who Gave Zero Its Rules',
          description:
            'Brahmagupta was an Indian mathematician and astronomer who lived from 598 to 668 CE. In his book "Brahmasphutasiddhanta" (628 CE), he wrote the first known rules for calculating with zero: any number plus zero equals itself, any number minus itself equals zero, and any number multiplied by zero equals zero. He also worked with negative numbers, calling them "debts" and positive numbers "fortunes." His ideas about zero traveled along trade routes to the Islamic world and eventually to Europe, changing mathematics forever!',
          extraTag: 'Wrote rules for zero in 628 CE',
        },
        {
          emoji: '\u{1F40C}',
          name: 'The Mayan Zero',
          title: 'A Zero from the Americas',
          description:
            'The Maya civilization of Central America independently invented the concept of zero around 36 BCE, represented by a shell-like symbol. They used a base-20 number system (probably because humans have 20 fingers and toes!) and zero was essential for their incredibly accurate astronomical calculations. The Maya could predict eclipses hundreds of years in advance! Their zero was a true placeholder and concept of "completeness" or "nothing," developed completely independently from the Old World. This shows how fundamental the idea of zero is to advanced mathematics!',
          extraTag: 'Symbol: Shell shape \u{1F41A}',
        },
        {
          emoji: '\u{1F4D6}',
          name: 'Al-Khwarizmi',
          title: 'The Bridge Between East and West',
          description:
            'Muhammad ibn Musa al-Khwarizmi was a Persian mathematician working in Baghdad around 820 CE. He wrote a book explaining the Indian number system, including zero, to the Islamic world. His work was later translated into Latin, which is how these "Arabic numerals" (really Indian numerals!) reached Europe. The word "algorithm" comes from the Latin version of his name, and the word "algebra" comes from the title of another of his books, "al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala"!',
          extraTag: 'Gave us: "algorithm" and "algebra"',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'When European merchants first encountered zero in the 12th century, many were deeply suspicious of it! The city of Florence, Italy, actually banned Arabic numerals (including zero) in 1299 because officials thought they were too easy to forge. Some people thought the idea of "nothing being something" was dangerous or even evil!',
        },
      ],
      videos: [
        {
          youtubeId: 'rkZrzmVZnCA',
          title: 'Mysteries of vernacular: Zero - Jessica Oreck and Rachael Teel',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['counting-q2a', 'counting-q2b', 'counting-q2c'],
    },

    // ─── Section 3: Modern Numbers ──────────────────────────────
    {
      id: 'modern-numbers',
      icon: '\u{1F4BB}',
      title: 'Modern Numbers: From Arabic Numerals to Binary',
      readAloudBlocks: [
        {
          id: 'modern-intro-text',
          paragraphs: [
            'The number system you use every day, the digits 0 through 9, is called the Hindu-Arabic numeral system. Developed in India, refined in the Islamic world, and brought to Europe by traders and scholars, it took about 1,000 years to spread around the globe! Italian mathematician Fibonacci (yes, the same Fibonacci from the famous sequence!) helped popularize these numerals in Europe through his book "Liber Abaci" in 1202.',
            'What makes our modern system so powerful? Two things: it uses only 10 symbols (0-9), and it\'s positional, meaning a digit\'s value depends on where it sits. The 3 in 300 is worth ten times more than the 3 in 30, and a hundred times more than the 3 in 3. This simple idea makes arithmetic much easier than Roman numerals or Egyptian hieroglyphs!',
            'In the 20th century, mathematicians and engineers realized that computers work best with an even simpler system: binary, which uses just two digits, 0 and 1. Every photo, video, song, and website you\'ve ever seen is stored as long strings of 0s and 1s. And mathematicians continue to explore the wild frontier of infinity, numbers so large (and so small!) that they challenge our understanding of reality itself!',
          ],
        },
        {
          id: 'modern-outro-text',
          paragraphs: [
            'From scratching tally marks on bones to building quantum computers, the story of counting is really the story of human civilization. Every great achievement in science, engineering, and technology depended on our ability to count, calculate, and understand numbers. The next time you see the number 0, remember: that simple little circle represents one of the most revolutionary ideas in human history!',
          ],
        },
      ],
      timeline: [
        {
          year: '~43,000 BCE',
          title: 'Tally Marks on Bone',
          description:
            'The Lebombo Bone, found in southern Africa, has 29 tally marks carved into a baboon bone. It\'s one of the oldest known counting tools, suggesting that ancient humans tracked lunar cycles by making marks on bones.',
        },
        {
          year: '~3000 BCE',
          title: 'Egyptian Hieroglyphic Numbers',
          description:
            'Ancient Egyptians developed hieroglyphic symbols for powers of 10, from a simple stroke for 1 to a seated god symbol for 1,000,000. This base-10 system was used for trade, construction, and astronomy.',
        },
        {
          year: '~1800 BCE',
          title: 'Babylonian Base-60 System',
          description:
            'The Babylonians developed a base-60 number system with positional notation. Their legacy lives on: 60 seconds in a minute, 60 minutes in an hour, and 360 degrees in a circle all come from the Babylonians.',
        },
        {
          year: '~500 BCE',
          title: 'Roman Numerals',
          description:
            'The Romans developed their famous system using letters I, V, X, L, C, D, and M. While elegant for carving into stone, Roman numerals made arithmetic very difficult. They persisted in Europe for over 1,000 years.',
        },
        {
          year: '~36 BCE',
          title: 'Mayan Zero',
          description:
            'The Maya civilization independently invented the concept of zero, represented by a shell symbol. They used a base-20 system and made incredibly accurate astronomical calculations.',
        },
        {
          year: '628 CE',
          title: 'Brahmagupta\'s Rules for Zero',
          description:
            'Indian mathematician Brahmagupta wrote the first formal rules for calculating with zero and negative numbers. This was the crucial step that turned zero from a mere placeholder into a true number.',
        },
        {
          year: '~820 CE',
          title: 'Al-Khwarizmi Spreads the System',
          description:
            'Persian mathematician al-Khwarizmi wrote books explaining the Indian number system to the Islamic world. His work gave us the words "algorithm" and "algebra" and started the spread of these numbers westward.',
        },
        {
          year: '1202 CE',
          title: 'Fibonacci Brings Numbers to Europe',
          description:
            'Italian mathematician Fibonacci published "Liber Abaci," introducing Hindu-Arabic numerals to Europe. He showed that these numbers were far easier to work with than Roman numerals, though adoption took centuries.',
        },
        {
          year: '1679 CE',
          title: 'Leibniz Develops Binary',
          description:
            'German mathematician Gottfried Wilhelm Leibniz developed the modern binary number system using only 0 and 1. He was inspired by the ancient Chinese I Ching. Binary would later become the foundation of all computers.',
        },
        {
          year: '1945 CE',
          title: 'Computers Use Binary',
          description:
            'The first electronic general-purpose computers were built using binary. Since electronic switches are naturally either ON (1) or OFF (0), binary was the perfect language for machines. Today, billions of devices run on binary!',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The number googol (10\u00B9\u2070\u2070, or 1 followed by 100 zeros) was named by a 9-year-old boy! In 1920, mathematician Edward Kasner asked his nephew Milton Sirotta what to call a really big number, and Milton said "googol." This name later inspired the founders of Google, who liked the idea of organizing a "googol" of information!',
        },
      ],
      videos: [
        {
          youtubeId: 'wgbV6DLVezo',
          title: 'How Exactly Does Binary Code Work?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['counting-q3a', 'counting-q3b', 'counting-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient Numbers
    {
      id: 'counting-q1a',
      sectionId: 'ancient-numbers',
      title: 'Quick Quiz Time!',
      question:
        'What is the Lebombo Bone, and approximately how old is it?',
      options: [
        { text: 'A stone tablet, about 5,000 years old', isCorrect: false },
        { text: 'A baboon bone with tally marks, about 43,000 years old', isCorrect: true },
        { text: 'A clay pot with numbers, about 2,000 years old', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'counting-q1b',
      sectionId: 'ancient-numbers',
      title: 'Babylonian Brainteaser!',
      question:
        'Why do we have 60 seconds in a minute and 60 minutes in an hour?',
      options: [
        { text: 'Because of the ancient Egyptian calendar', isCorrect: false },
        { text: 'Because the Babylonians used a base-60 number system', isCorrect: true },
        { text: 'Because 60 is the largest two-digit number', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'counting-q1c',
      sectionId: 'ancient-numbers',
      title: 'Roman Numeral Challenge!',
      question:
        'In Roman numerals, what does IX equal?',
      options: [
        { text: '11', isCorrect: false },
        { text: '9', isCorrect: true },
        { text: '4', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'counting-q1d',
      sectionId: 'ancient-numbers',
      title: 'Word Origins!',
      question:
        'Where does the word "calculate" come from?',
      options: [
        { text: 'A Greek word meaning "to think"', isCorrect: false },
        { text: 'A Latin word meaning "small stone"', isCorrect: true },
        { text: 'An Egyptian word meaning "to write"', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Invention of Zero
    {
      id: 'counting-q2a',
      sectionId: 'invention-of-zero',
      title: 'Quick Quiz Time!',
      question:
        'Who wrote the first known rules for calculating with zero?',
      options: [
        { text: 'Pythagoras', isCorrect: false },
        { text: 'Brahmagupta', isCorrect: true },
        { text: 'Archimedes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'counting-q2b',
      sectionId: 'invention-of-zero',
      title: 'Mayan Math!',
      question:
        'What symbol did the Maya civilization use to represent zero?',
      options: [
        { text: 'A circle', isCorrect: false },
        { text: 'A shell shape', isCorrect: true },
        { text: 'A star', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'counting-q2c',
      sectionId: 'invention-of-zero',
      title: 'Word Detective!',
      question:
        'The words "algorithm" and "algebra" both come from the work of which mathematician?',
      options: [
        { text: 'Fibonacci', isCorrect: false },
        { text: 'Euclid', isCorrect: false },
        { text: 'Al-Khwarizmi', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Modern Numbers
    {
      id: 'counting-q3a',
      sectionId: 'modern-numbers',
      title: 'Quick Quiz Time!',
      question:
        'Who helped introduce Hindu-Arabic numerals to Europe in 1202 with the book "Liber Abaci"?',
      options: [
        { text: 'Galileo', isCorrect: false },
        { text: 'Fibonacci', isCorrect: true },
        { text: 'Newton', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'counting-q3b',
      sectionId: 'modern-numbers',
      title: 'Binary Basics!',
      question:
        'What two digits does the binary number system use?',
      options: [
        { text: '0 and 1', isCorrect: true },
        { text: '1 and 2', isCorrect: false },
        { text: 'A and B', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'counting-q3c',
      sectionId: 'modern-numbers',
      title: 'Fun Number Facts!',
      question:
        'Who named the number "googol" (1 followed by 100 zeros)?',
      options: [
        { text: 'Albert Einstein', isCorrect: false },
        { text: 'The founders of Google', isCorrect: false },
        { text: 'A 9-year-old boy named Milton Sirotta', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'counting-essay',
    prompt:
      'Why do you think the invention of zero was so important?',
    description:
      'Think about everything you\'ve learned about the history of counting. Zero might seem like a simple idea, but it took thousands of years to develop! Why do you think zero was so important for mathematics and civilization? What would the world be like without it? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Fantastic reasoning! You understand the power of nothing! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'counting-reward',
    title: 'Number System Translator!',
    description:
      'You\'ve unlocked the Number System Translator! Convert numbers between Egyptian hieroglyphs, Roman numerals, Babylonian base-60, Mayan base-20, binary, and modern Arabic numerals. See how the same number looks in different systems from around the world!',
    lockMessage: 'Number Translator Locked!',
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
    type: 'number-translator',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Number Translator! Explore how numbers look in systems from around the world!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'ve Counted Through History!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through the entire history of counting, from ancient tally marks to modern computers!',
      'You discovered the Lebombo Bone, one of the oldest counting tools, scratched 43,000 years ago. You learned how the Egyptians used hieroglyphs for numbers, how the Babylonians gave us 60-second minutes with their base-60 system, and why Roman numerals made math really difficult.',
      'You explored the revolutionary invention of zero: how Brahmagupta wrote the first rules for calculating with nothing, how the Maya independently created their own zero, and how al-Khwarizmi bridged East and West, giving us the words "algorithm" and "algebra."',
      'And you traced the path of our modern number system from India through the Islamic world to Europe, where Fibonacci helped popularize the digits we use today. You learned how Leibniz developed binary, and how those simple 0s and 1s now power every computer on Earth.',
      'The next time you write a number, remember that you\'re using one of humanity\'s greatest inventions, a system that took 43,000 years and countless brilliant minds to create!',
    ],
  },
};
