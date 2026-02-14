import type { Topic } from '../types';

export const mathInMusic: Topic = {
  id: 'math-in-music',
  slug: 'math-in-music',
  title: 'Math in Music',
  subtitle:
    'Discover the Hidden Numbers Behind Every Beat, Note & Song',
  status: 'active',
  themeId: 'math-in-music',
  heroIcons: ['\u{1F3B5}', '\u{1F3B9}', '\u{1F3B6}'],
  navItems: [
    { id: 'rhythms-fractions', icon: '\u{1F941}', label: 'Rhythms & Fractions' },
    { id: 'sound-waves', icon: '\u{1F50A}', label: 'Sound Waves & Frequency' },
    { id: 'patterns-in-music', icon: '\u{1F3BC}', label: 'Patterns in Music' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3B5}',
      title: 'Welcome to the Math of Music!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'What if we told you that every song you love is built on math? Every beat you tap your foot to, every melody that gets stuck in your head, and every chord that gives you goosebumps is powered by numbers, patterns, and ratios!',
            'Music and math have been connected for over 2,500 years, ever since the ancient Greek mathematician Pythagoras discovered that the beautiful sounds of musical notes come from simple number ratios. A guitar string cut in half plays a note exactly one octave higher. A string divided into thirds creates a perfect musical fifth. Math is literally the language of music!',
            'In this adventure, you\'ll discover how musical rhythms are really fractions in disguise, how sound waves create the pitches we hear, and how composers use mathematical patterns to write music that moves us. Let\'s turn up the volume on math!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'R0JKCYZ8hng',
          title: 'How playing an instrument benefits your brain - Anita Collins',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: '3-xKZKxXuu0',
          title: 'What is Sound?',
          channelName: 'SciShow Kids',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Rhythms & Fractions ────────────────────────
    {
      id: 'rhythms-fractions',
      icon: '\u{1F941}',
      title: 'Rhythms & Fractions: The Beat of Math',
      readAloudBlocks: [
        {
          id: 'rhythms-intro-text',
          paragraphs: [
            'Here\'s a secret that musicians know: reading rhythm is basically reading fractions! When you clap along to a song, you\'re actually counting mathematical divisions of time.',
            'In music, time is divided into equal parts called beats, and beats are grouped into measures. A time signature at the beginning of a piece of sheet music tells you how many beats are in each measure. The most common time signature is 4/4, which means four quarter-note beats per measure. That fraction isn\'t a coincidence — it\'s real math!',
            'Musical notes are named after their fractional value. A whole note fills an entire measure of 4/4 time (4 beats). A half note lasts for half of that (2 beats). A quarter note is one-quarter of a whole note (1 beat). An eighth note is one-eighth (half a beat). And a sixteenth note is one-sixteenth (a quarter of a beat). Every time you see a note on sheet music, you\'re looking at a fraction!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3B5}',
          name: 'The Whole Note',
          title: '4 Beats — The Big One',
          description:
            'A whole note is the longest common note value, lasting 4 beats in 4/4 time. It looks like an open oval with no stem. Think of it as a full pizza — it takes up the whole measure! If you split a whole note in half, you get two half notes. Split each half note, and you get four quarter notes. Music is a fraction party!',
          extraTag: 'Duration: 4 beats',
        },
        {
          emoji: '\u{1F3B6}',
          name: 'The Quarter Note',
          title: '1 Beat — The Heartbeat of Music',
          description:
            'The quarter note is the most common note in music. It gets exactly 1 beat — like a steady heartbeat. It\'s called a "quarter" note because it\'s one-quarter of a whole note. When you tap your foot to a song, you\'re usually tapping quarter notes! Four quarter notes fill one measure of 4/4 time: 1/4 + 1/4 + 1/4 + 1/4 = 4/4 = 1 whole measure.',
          extraTag: 'Duration: 1 beat',
        },
        {
          emoji: '\u26A1',
          name: 'The Sixteenth Note',
          title: '1/4 Beat — The Speed Demon',
          description:
            'Sixteenth notes are the fast ones! Each one lasts just one-sixteenth of a whole note, or one-quarter of a beat. You need 16 of them to fill one measure of 4/4 time. When a drummer plays a rapid-fire drum roll, they\'re playing sixteenth notes. The math: 16 × (1/16) = 16/16 = 1 whole measure. Fractions keep the music perfectly balanced!',
          extraTag: 'Duration: 1/4 beat',
        },
        {
          emoji: '\u{1F3B9}',
          name: 'Time Signatures',
          title: 'The Fraction at the Start',
          description:
            'Every piece of sheet music starts with a time signature, which is literally a fraction. The top number tells you how many beats per measure, and the bottom number tells you which note value gets one beat. So 3/4 time (used in waltzes) means 3 quarter-note beats per measure. 6/8 time means 6 eighth-note beats per measure. Even the structure of music is built on fractions!',
          extraTag: 'Example: 3/4 = waltz time',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A dotted note adds half of the note\'s value to itself. A dotted half note = 2 beats + 1 beat = 3 beats. In fraction math: 1/2 + 1/4 = 3/4 of a whole note. Even dots in music are fractions!',
        },
      ],
      videos: [
        {
          youtubeId: 'ZN41d7Txcq0',
          title: 'How to read music - Tim Hansen',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['music-q1a', 'music-q1b', 'music-q1c', 'music-q1d'],
    },

    // ─── Section 2: Sound Waves & Frequency ────────────────────
    {
      id: 'sound-waves',
      icon: '\u{1F50A}',
      title: 'Sound Waves & Frequency: The Science of Pitch',
      readAloudBlocks: [
        {
          id: 'waves-intro-text',
          paragraphs: [
            'What makes a note high or low? It\'s all about vibrations! Sound is created when something vibrates — a guitar string, a drum head, your vocal cords. These vibrations travel through the air as invisible waves, and when they reach your ears, you hear sound.',
            'The speed of these vibrations is called frequency, and it\'s measured in Hertz (Hz). One Hertz means one vibration per second. The higher the frequency (more vibrations per second), the higher the pitch you hear. A deep bass note might vibrate at around 80 Hz, while a high-pitched whistle can reach 2,000 Hz or more!',
            'The ancient Greek mathematician Pythagoras made an amazing discovery around 500 BCE. He found that the most pleasing musical intervals come from simple number ratios. When one string is exactly half the length of another, it vibrates twice as fast and produces a note one octave higher. This 2:1 ratio is the foundation of all music!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3BB}',
          name: 'Pythagoras',
          title: 'The Father of Musical Math',
          description:
            'Around 500 BCE, Pythagoras discovered that musical harmony is based on simple number ratios. According to legend, he noticed that blacksmiths\' hammers of different weights produced different pitches. He experimented with strings and found that a 2:1 ratio creates an octave, a 3:2 ratio creates a perfect fifth, and a 4:3 ratio creates a perfect fourth. These ratios are still the foundation of music theory today, over 2,500 years later!',
          extraTag: 'Discovered: ~500 BCE',
        },
        {
          emoji: '\u{1F4C8}',
          name: 'The Octave',
          title: 'The Perfect 2:1 Ratio',
          description:
            'An octave is the most fundamental interval in music. When you go up one octave, the frequency exactly doubles. The note A above middle C vibrates at 440 Hz (this is the standard tuning reference used worldwide, called A440). The A one octave higher vibrates at 880 Hz — exactly double! And the A one octave lower vibrates at 220 Hz — exactly half. This doubling pattern continues in both directions.',
          extraTag: 'A440: International tuning standard',
        },
        {
          emoji: '\u{1F30A}',
          name: 'Sound Waves',
          title: 'Vibrations You Can Hear',
          description:
            'Sound waves are vibrations that travel through the air (or water, or solid objects) to reach your ears. They have two key properties: frequency (how fast the vibrations are, which determines pitch) and amplitude (how big the vibrations are, which determines volume). Humans can hear frequencies between about 20 Hz and 20,000 Hz. Dogs can hear up to 65,000 Hz, and bats can hear up to 100,000 Hz!',
          extraTag: 'Human hearing: 20–20,000 Hz',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Western chromatic scale has 12 notes (the white and black keys on a piano before the pattern repeats). The frequency ratio between each consecutive note is the 12th root of 2, which is approximately 1.05946. Multiply any note\'s frequency by this number 12 times, and you\'ll get exactly double — one octave up!',
        },
      ],
      videos: [
        {
          youtubeId: 'LkGOGzpbrCk',
          title: 'The science of hearing - Douglas L. Oliver',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['music-q2a', 'music-q2b', 'music-q2c'],
    },

    // ─── Section 3: Patterns in Music ──────────────────────────
    {
      id: 'patterns-in-music',
      icon: '\u{1F3BC}',
      title: 'Patterns in Music: Repetition, Symmetry & Structure',
      readAloudBlocks: [
        {
          id: 'patterns-intro-text',
          paragraphs: [
            'Have you ever noticed that songs have a structure? A verse, then a chorus, then another verse, then the chorus again? That\'s not random — it\'s a mathematical pattern! Composers use repetition, symmetry, and structure to create music that our brains find satisfying.',
            'One of the most common song structures is ABAB, where A is the verse and B is the chorus. Other patterns include AABA (common in jazz standards) and ABCBA (a palindrome pattern that reads the same forwards and backwards, just like the number 12321!). These patterns help listeners know what to expect while still surprising them.',
            'Some composers went even further with math. Johann Sebastian Bach was famous for using mathematical structures like canons (where a melody is played, then repeated starting a few beats later, creating layers) and fugues (where a theme is woven through multiple voices following strict mathematical rules). Bach\'s music is so mathematically precise that computer scientists still study it today!',
          ],
        },
        {
          id: 'patterns-outro-text',
          paragraphs: [
            'From the fractions in rhythms to the physics of sound waves to the patterns in song structure, math is the hidden language of all music. The next time you listen to your favorite song, try to spot the patterns. Count the beats, listen for the repeating sections, and remember: your brain loves music because your brain loves math!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3B9}',
          name: 'Johann Sebastian Bach',
          title: 'The Mathematical Musician',
          description:
            'Bach (1685–1750) was a German composer whose music is packed with mathematical structure. His "Crab Canon" from The Musical Offering is a piece that sounds correct when played forwards AND backwards — it\'s a musical palindrome! His fugues follow strict rules about how melodies interact, using transformations like inversion (flipping the melody upside down) and retrograde (playing it backwards). Mathematicians and musicians alike consider him a genius.',
          extraTag: 'Era: Baroque (1685–1750)',
        },
        {
          emoji: '\u{1F504}',
          name: 'The Canon',
          title: 'A Pattern That Chases Itself',
          description:
            'A canon is a musical pattern where a melody is played, and then the same melody starts again a few beats later in another voice, creating a layered, interlocking effect. "Row, Row, Row Your Boat" is a simple canon — when one group starts singing and another group joins in later, the melodies overlap perfectly. This works because the math of the melody is designed so that the notes harmonize when offset in time!',
          extraTag: 'Example: Row, Row, Row Your Boat',
        },
        {
          emoji: '\u{1F4CA}',
          name: 'The Fibonacci Connection',
          title: 'Nature\'s Numbers in Music',
          description:
            'Some music scholars have found Fibonacci numbers (1, 1, 2, 3, 5, 8, 13...) in music. A piano octave has 13 keys: 8 white and 5 black. A pentatonic scale (used in folk music worldwide) has 5 notes. Composer Béla Bartók reportedly used Fibonacci proportions to decide where climactic moments in his pieces should occur. While debated among scholars, the connection between Fibonacci numbers and musical structure is a fascinating area of study!',
          extraTag: 'Piano octave: 13 keys = 8 + 5',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The song "Twinkle, Twinkle, Little Star" follows an AABBA pattern. Mozart wrote 12 variations on this melody, each one using the same mathematical structure but transforming it in creative ways. He was only 25 years old when he composed them!',
        },
      ],
      videos: [],
      quizIds: ['music-q3a', 'music-q3b', 'music-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Rhythms & Fractions
    {
      id: 'music-q1a',
      sectionId: 'rhythms-fractions',
      title: 'Quick Quiz Time!',
      question:
        'How many beats does a quarter note last in 4/4 time?',
      options: [
        { text: '4 beats', isCorrect: false },
        { text: '2 beats', isCorrect: false },
        { text: '1 beat', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'music-q1b',
      sectionId: 'rhythms-fractions',
      title: 'Fraction Beat Challenge!',
      question:
        'How many eighth notes do you need to fill one measure of 4/4 time?',
      options: [
        { text: '4 eighth notes', isCorrect: false },
        { text: '8 eighth notes', isCorrect: true },
        { text: '16 eighth notes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'music-q1c',
      sectionId: 'rhythms-fractions',
      title: 'Time Signature Quiz!',
      question:
        'In a time signature, what does the bottom number tell you?',
      options: [
        { text: 'How many beats per measure', isCorrect: false },
        { text: 'Which note value gets one beat', isCorrect: true },
        { text: 'How fast the song should be played', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'music-q1d',
      sectionId: 'rhythms-fractions',
      title: 'Dotted Note Challenge!',
      question:
        'A dotted half note lasts how many beats in 4/4 time?',
      options: [
        { text: '2 beats', isCorrect: false },
        { text: '3 beats', isCorrect: true },
        { text: '4 beats', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Sound Waves & Frequency
    {
      id: 'music-q2a',
      sectionId: 'sound-waves',
      title: 'Quick Quiz Time!',
      question:
        'What unit is used to measure the frequency of sound waves?',
      options: [
        { text: 'Watts', isCorrect: false },
        { text: 'Hertz (Hz)', isCorrect: true },
        { text: 'Decibels', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'music-q2b',
      sectionId: 'sound-waves',
      title: 'Pythagoras Challenge!',
      question:
        'What is the frequency ratio between two notes that are one octave apart?',
      options: [
        { text: '3:2', isCorrect: false },
        { text: '2:1', isCorrect: true },
        { text: '4:3', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'music-q2c',
      sectionId: 'sound-waves',
      title: 'A440 Quiz!',
      question:
        'If the note A4 vibrates at 440 Hz, what is the frequency of A5 (one octave higher)?',
      options: [
        { text: '660 Hz', isCorrect: false },
        { text: '880 Hz', isCorrect: true },
        { text: '440 Hz', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Patterns in Music
    {
      id: 'music-q3a',
      sectionId: 'patterns-in-music',
      title: 'Quick Quiz Time!',
      question:
        'What mathematical concept did Beethoven use in structuring his compositions, such as the Moonlight Sonata?',
      options: [
        { text: 'Random number generation', isCorrect: false },
        { text: 'Repeating mathematical patterns and ratios', isCorrect: true },
        { text: 'The Pythagorean theorem', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'music-q3b',
      sectionId: 'patterns-in-music',
      title: 'Musical Structure Challenge!',
      question:
        'What is a canon in music?',
      options: [
        { text: 'A song played only on cannons', isCorrect: false },
        { text: 'A melody that is repeated starting a few beats later, creating overlapping layers', isCorrect: true },
        { text: 'A song with no repeating patterns', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'music-q3c',
      sectionId: 'patterns-in-music',
      title: 'Bach Brainteaser!',
      question:
        'What is special about Bach\'s "Crab Canon"?',
      options: [
        { text: 'It was written for crabs', isCorrect: false },
        { text: 'It only uses two notes', isCorrect: false },
        { text: 'It sounds correct played both forwards and backwards', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'music-essay',
    prompt:
      'How does knowing about the math in music change the way you listen to songs?',
    description:
      'Now it\'s your turn! Think about everything you\'ve learned — fractions in rhythm, the physics of sound waves, and the patterns that composers use. Does knowing the math behind music make you appreciate it more or hear it differently? Maybe you notice things you didn\'t before! Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant thinking! You hear the math in the music! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'music-reward',
    title: 'Frequency Explorer!',
    description:
      'You\'ve unlocked the Frequency Explorer! Slide controls to mix sound waves, see how different frequencies create different pitches, and discover how simple math ratios create beautiful musical harmonies. Experiment with octaves, fifths, and more!',
    lockMessage: 'Frequency Explorer Locked!',
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
    type: 'frequency-explorer',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Frequency Explorer! You\'re a true math musician!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Encore! You Did It!',
    paragraphs: [
      'Congratulations! You\'ve discovered the incredible math hiding inside every song and melody!',
      'You learned that musical rhythms are fractions in disguise — whole notes, half notes, quarter notes, and eighth notes divide time into precise mathematical portions. Time signatures are literally fractions that organize music into measures.',
      'You discovered that Pythagoras found simple number ratios behind musical harmony over 2,500 years ago, and that the frequency of a note doubles with every octave. The standard tuning note A440 vibrates at exactly 440 times per second!',
      'And you explored how composers like Bach used mathematical structures — canons, fugues, palindromes, and even Fibonacci proportions — to create music that still amazes us centuries later.',
      'The next time you listen to music, remember: you\'re not just hearing sounds — you\'re hearing math come alive! Keep exploring the beautiful connection between numbers and notes.',
    ],
  },
};
