import type { Topic } from '../types';

export const secretCodes: Topic = {
  id: 'secret-codes',
  slug: 'secret-codes',
  title: 'The Secret Language of Codes',
  subtitle:
    'Ciphers, Puzzles & Hidden Messages',
  status: 'active',
  themeId: 'secret-codes',
  heroIcons: ['\u{1F510}', '\u{1F4DC}', '\u{1F575}\uFE0F'],
  navItems: [
    { id: 'ancient-codes', icon: '\u{1F3DB}\uFE0F', label: 'Ancient Codes' },
    { id: 'code-breakers', icon: '\u{1F9E0}', label: 'Famous Code Breakers' },
    { id: 'modern-codes', icon: '\u{1F4BB}', label: 'Modern Codes' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F510}',
      title: 'Welcome, Secret Agent!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever wanted to send a secret message that only your best friend could read? For thousands of years, people have been inventing clever ways to hide messages in plain sight. This is the world of codes and ciphers!',
            'A code replaces whole words or phrases with other words, numbers, or symbols. A cipher scrambles individual letters using a set of rules. Both are part of cryptography, the science of secret writing. From ancient generals to modern computers, codes have changed the course of history!',
            'In this adventure, you\'ll learn how Julius Caesar sent secret orders to his armies, how codebreakers cracked the "unbreakable" Enigma machine during World War II, and how the secret codes inside your computer keep your information safe every single day. Let\'s crack some codes!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'ybkkiGtJmkM',
          title: 'How Did the Enigma Machine Work?',
          channelName: 'Jared Owen',
        },
        {
          youtubeId: 'jhXCTbFnK8o',
          title: 'How to Make & Break Secret Codes',
          channelName: 'SciShow Kids',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient Codes ───────────────────────────────
    {
      id: 'ancient-codes',
      icon: '\u{1F3DB}\uFE0F',
      title: 'Ancient Codes: Where It All Began',
      readAloudBlocks: [
        {
          id: 'ancient-codes-intro-text',
          paragraphs: [
            'Long before computers existed, ancient civilizations needed to keep their messages secret. Generals sending orders to distant armies, kings communicating with spies, and merchants protecting trade secrets all relied on clever ways to hide information.',
            'The earliest known use of cryptography dates back over 3,900 years to ancient Egypt, where a scribe used unusual hieroglyphs to make an inscription harder to read. But the most famous ancient cipher belongs to one of history\'s greatest leaders: Julius Caesar!',
            'Let\'s meet the brilliant minds who invented the first secret codes and discover how their ideas still influence cryptography today.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Julius Caesar',
          title: 'Inventor of the Caesar Cipher',
          description:
            'Julius Caesar, the famous Roman general and dictator, needed to send secret messages to his troops. His solution was brilliantly simple: shift every letter in the alphabet by three positions. So A became D, B became E, and so on. The word "HELLO" would become "KHOOR." This is now called the Caesar Cipher, and it\'s one of the oldest known encryption techniques! While it\'s easy to crack today, it was very effective 2,000 years ago when most people couldn\'t even read.',
          extraTag: 'Cipher type: Substitution',
        },
        {
          emoji: '\u{1F4DC}',
          name: 'The Spartan Scytale',
          title: 'The World\'s First Cipher Device',
          description:
            'Ancient Sparta invented one of the earliest cipher devices: the scytale (pronounced "SKIT-ah-lee"). It was a wooden rod around which a strip of leather or parchment was wrapped tightly. The secret message was written across the wrapped strip. When unwrapped, the letters appeared scrambled and meaningless. Only someone with a rod of the exact same diameter could wrap the strip again and read the message! It was an ancient form of what we call a transposition cipher.',
          extraTag: 'Cipher type: Transposition',
        },
        {
          emoji: '\u{1F4BF}',
          name: 'The Alberti Cipher Disk',
          title: 'The First Polyalphabetic Cipher',
          description:
            'In 1467, Italian architect Leon Battista Alberti invented the cipher disk, two rotating disks with alphabets that could create multiple different substitution alphabets in a single message. This was revolutionary because it meant codebreakers couldn\'t just use letter frequency analysis to crack the code. Alberti is often called the "Father of Western Cryptology" for this brilliant invention!',
          extraTag: 'Cipher type: Polyalphabetic',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Ancient Egyptian hieroglyphs were themselves a kind of code! For over a thousand years after Egyptian civilization fell, nobody could read them. It wasn\'t until 1799, when the Rosetta Stone was discovered, that scholars finally cracked the code of hieroglyphics!',
        },
      ],
      videos: [
        {
          youtubeId: 'o6TPx1Co_wg',
          title: 'Caesar Cipher Explained',
          channelName: 'Khan Academy',
        },
      ],
      quizIds: ['codes-q1a', 'codes-q1b', 'codes-q1c', 'codes-q1d'],
    },

    // ─── Section 2: Famous Code Breakers ────────────────────────
    {
      id: 'code-breakers',
      icon: '\u{1F9E0}',
      title: 'Famous Code Breakers Who Changed History',
      readAloudBlocks: [
        {
          id: 'breakers-intro-text',
          paragraphs: [
            'Making codes is only half the story. For every brilliant code maker, there\'s an equally brilliant code breaker trying to crack the secret! Throughout history, codebreaking has decided the outcome of wars, uncovered conspiracies, and even sentenced queens to death.',
            'During World War II, codebreaking became more important than ever. The Nazis believed their Enigma machine created an unbreakable code. But a team of brilliant mathematicians, working in secret at a place called Bletchley Park in England, proved them wrong. Their work may have shortened the war by two years and saved millions of lives!',
          ],
        },
        {
          id: 'breakers-outro-text',
          paragraphs: [
            'The story of codebreaking teaches us that no code is truly unbreakable. Every cipher has a weakness waiting to be found. The race between code makers and code breakers continues to this day, now fought with supercomputers and quantum physics!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4BB}',
          name: 'Alan Turing',
          title: 'The Man Who Cracked Enigma',
          description:
            'Alan Turing was a mathematical genius who helped crack the Nazi Enigma code during World War II. He designed a machine called the Bombe that could test thousands of possible Enigma settings at incredible speed. His work at Bletchley Park helped the Allies read secret German messages, which was crucial to winning the war. Turing is also considered the father of modern computer science and artificial intelligence!',
          extraTag: 'Helped shorten WWII by ~2 years',
        },
        {
          emoji: '\u{1F1FA}\u{1F1F8}',
          name: 'Navajo Code Talkers',
          title: 'The Unbreakable Human Code',
          description:
            'During World War II, the U.S. Marines recruited Navajo Native Americans to use their complex language as a military code. The Navajo language had no written form and was incredibly difficult to learn unless you grew up speaking it. The Code Talkers created special code words within Navajo for military terms. For example, a tank was called "turtle" in Navajo. The Japanese never broke this code! About 400 Navajo served as Code Talkers, and they are celebrated as heroes today.',
          extraTag: 'Never broken by the enemy',
        },
        {
          emoji: '\u{1F451}',
          name: 'Mary Queen of Scots',
          title: 'Doomed by a Broken Code',
          description:
            'Mary Queen of Scots used a secret cipher to plot against her cousin, Queen Elizabeth I of England, in 1586. She replaced letters with special symbols and even had code words for important people. But England\'s master spy, Sir Francis Walsingham, intercepted her messages and his codebreaker, Thomas Phelippes, cracked the cipher. The decoded messages proved Mary was plotting to assassinate Elizabeth. Mary was found guilty of treason and executed. Her story is a famous example of how breaking a code changed history!',
          extraTag: 'Code broken in 1586',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Enigma machine could be set up in 158,962,555,217,826,360,000 different ways! That\'s over 158 quintillion combinations. No wonder the Nazis thought it was unbreakable. But Alan Turing and his team at Bletchley Park found clever shortcuts to crack it!',
        },
      ],
      videos: [
        {
          youtubeId: 'V4V2bpZlqx8',
          title: 'How the Enigma Machine Worked',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'pV9Ewr586Zc',
          title: 'Flaw in the Enigma Code',
          channelName: 'Numberphile',
        },
      ],
      quizIds: ['codes-q2a', 'codes-q2b', 'codes-q2c'],
    },

    // ─── Section 3: Modern Codes ────────────────────────────────
    {
      id: 'modern-codes',
      icon: '\u{1F4BB}',
      title: 'Modern Codes: The Digital Age of Secrets',
      readAloudBlocks: [
        {
          id: 'modern-intro-text',
          paragraphs: [
            'Today, codes aren\'t just for spies and soldiers. Every time you use a computer, phone, or tablet, you\'re surrounded by codes! The words you\'re reading right now are stored inside your device as long strings of 1s and 0s called binary code.',
            'Binary is the simplest possible code: it uses only two symbols, 0 and 1. But from those two tiny symbols, computers can represent everything: letters, numbers, photos, videos, music, and even entire video games! Each 0 or 1 is called a "bit," and eight bits together make a "byte."',
            'Modern encryption protects your passwords, messages, and online purchases. When you see a little padlock icon in your web browser, that means your connection is encrypted. The math behind modern encryption is so complex that even the world\'s fastest supercomputers would take millions of years to crack it!',
          ],
        },
        {
          id: 'modern-outro-text',
          paragraphs: [
            'From Caesar\'s simple letter shifts to quantum encryption, the story of codes spans thousands of years. But the core idea remains the same: finding clever ways to share secrets with the right people while keeping everyone else out. The next time you scan a QR code or type a password, remember that you\'re part of this incredible history of hidden messages!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4F1}',
          name: 'QR Codes',
          title: 'Quick Response Codes',
          description:
            'Those black-and-white squares you see everywhere are QR codes, invented in 1994 in Japan. QR stands for "Quick Response." They work like super-powered barcodes that can store much more information: website addresses, contact details, even Wi-Fi passwords! Your phone\'s camera reads the pattern of black and white squares and decodes the hidden information. QR codes even have built-in error correction, so they still work even if part of the code is damaged!',
          extraTag: 'Invented in Japan, 1994',
        },
        {
          emoji: '\u{1F5A5}\uFE0F',
          name: 'Binary Code',
          title: 'The Language of Computers',
          description:
            'Every computer in the world speaks binary: a language made of just 1s and 0s. In binary, the letter A is 01000001, and the number 42 is 00101010. Computers use tiny electronic switches called transistors that are either ON (1) or OFF (0). A modern smartphone has billions of these switches! Binary might look simple, but it\'s powerful enough to run every app, game, and website in the world.',
          extraTag: 'Uses only 0 and 1',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A single emoji on your phone is actually stored as a long string of binary code. The smiley face \u{1F600} is stored as the binary number 11110000100111111001100010000000. That\'s 32 bits of data just for one tiny picture!',
        },
      ],
      videos: [
        {
          youtubeId: 'wgbV6DLVezo',
          title: 'How Exactly Does Binary Code Work?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['codes-q3a', 'codes-q3b', 'codes-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient Codes
    {
      id: 'codes-q1a',
      sectionId: 'ancient-codes',
      title: 'Quick Quiz Time!',
      question:
        'In the Caesar Cipher, each letter is shifted by how many positions?',
      options: [
        { text: '1 position', isCorrect: false },
        { text: '3 positions', isCorrect: true },
        { text: '5 positions', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'codes-q1b',
      sectionId: 'ancient-codes',
      title: 'Ancient Codes Challenge!',
      question:
        'What was the Spartan scytale?',
      options: [
        { text: 'A secret alphabet carved in stone', isCorrect: false },
        {
          text: 'A wooden rod used to wrap and reveal hidden messages',
          isCorrect: true,
        },
        { text: 'A type of invisible ink', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'codes-q1c',
      sectionId: 'ancient-codes',
      title: 'Cipher Types Quiz!',
      question:
        'What is the difference between a code and a cipher?',
      options: [
        {
          text: 'A code replaces whole words; a cipher scrambles individual letters',
          isCorrect: true,
        },
        { text: 'They are exactly the same thing', isCorrect: false },
        { text: 'A cipher uses pictures; a code uses numbers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'codes-q1d',
      sectionId: 'ancient-codes',
      title: 'Cryptography Pioneer!',
      question:
        'Who is often called the "Father of Western Cryptology" for inventing the cipher disk?',
      options: [
        { text: 'Julius Caesar', isCorrect: false },
        { text: 'Leon Battista Alberti', isCorrect: true },
        { text: 'Leonardo da Vinci', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Code Breakers
    {
      id: 'codes-q2a',
      sectionId: 'code-breakers',
      title: 'Quick Quiz Time!',
      question:
        'What was the name of the machine Alan Turing designed to help crack the Enigma code?',
      options: [
        { text: 'The Calculator', isCorrect: false },
        { text: 'The Bombe', isCorrect: true },
        { text: 'The Decoder', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'codes-q2b',
      sectionId: 'code-breakers',
      title: 'Code Talkers Challenge!',
      question:
        'Why was the Navajo language so effective as a military code?',
      options: [
        { text: 'It was a computer language', isCorrect: false },
        { text: 'It had no written form and was extremely difficult to learn', isCorrect: true },
        { text: 'It used only numbers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'codes-q2c',
      sectionId: 'code-breakers',
      title: 'Royal Code Quiz!',
      question:
        'What happened to Mary Queen of Scots when her secret cipher was cracked?',
      options: [
        { text: 'She escaped to France', isCorrect: false },
        { text: 'She was found guilty of treason and executed', isCorrect: true },
        { text: 'She became Queen of England', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Modern Codes
    {
      id: 'codes-q3a',
      sectionId: 'modern-codes',
      title: 'Quick Quiz Time!',
      question:
        'What does binary code use to represent all information?',
      options: [
        { text: 'The letters A through Z', isCorrect: false },
        { text: 'Just two symbols: 0 and 1', isCorrect: true },
        { text: 'The numbers 0 through 9', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'codes-q3b',
      sectionId: 'modern-codes',
      title: 'Digital Code Challenge!',
      question:
        'What does QR stand for in "QR code"?',
      options: [
        { text: 'Quantum Reading', isCorrect: false },
        { text: 'Quick Response', isCorrect: true },
        { text: 'Quiet Recognition', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'codes-q3c',
      sectionId: 'modern-codes',
      title: 'Binary Brainteaser!',
      question:
        'How many bits make up one byte?',
      options: [
        { text: '4 bits', isCorrect: false },
        { text: '8 bits', isCorrect: true },
        { text: '16 bits', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'codes-essay',
    prompt:
      'Which code or cipher do you think was the most clever and why?',
    description:
      'Now it\'s your turn to think like a codebreaker! Consider all the codes and ciphers you\'ve learned about, from Caesar\'s letter-shifting trick to the Navajo Code Talkers\' unbreakable language to modern binary code. Which one impresses you the most? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant analysis! You think like a true codebreaker! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'codes-reward',
    title: 'Build Your Own Cipher Machine!',
    description:
      'You\'ve unlocked the interactive Cipher Machine! Encode and decode secret messages using the Caesar Cipher, Atbash Cipher, and more. Try sending a secret message to a friend and see if they can crack it!',
    lockMessage: 'Cipher Machine Locked!',
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
    type: 'cipher-machine',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Cipher Machine! You\'re a true master of secret codes!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Mission Complete, Agent!',
    paragraphs: [
      'Congratulations! You\'ve completed your journey through the secret world of codes and ciphers!',
      'You discovered how Julius Caesar shifted letters to send secret orders, how the Spartans wrapped messages around wooden rods, and how Alberti invented the first polyalphabetic cipher with his clever disk.',
      'You met Alan Turing, who cracked the "unbreakable" Enigma machine and helped shorten World War II. You learned about the Navajo Code Talkers, whose language became the only military code never broken by the enemy. And you heard the dramatic story of Mary Queen of Scots, whose broken cipher cost her everything.',
      'Finally, you explored the modern world of binary code, QR codes, and encryption that keeps billions of people safe online every day. From ancient scrolls to quantum computers, the story of secret codes is really the story of human cleverness!',
      'Keep exploring the world of codes! You never know when you might need to send a secret message.',
    ],
  },
};
