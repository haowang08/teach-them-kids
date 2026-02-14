// ---------------------------------------------------------------------------
// Reading content data for the /basics reading games
// ---------------------------------------------------------------------------

// ── CVC words (consonant-vowel-consonant) ─────────────────────────────────
export const CVC_WORDS: { word: string; image: string }[] = [
  // short-a
  { word: 'cat', image: '🐱' },
  { word: 'hat', image: '🎩' },
  { word: 'bat', image: '🦇' },
  { word: 'mat', image: '🧹' },
  { word: 'rat', image: '🐀' },
  { word: 'van', image: '🚐' },
  { word: 'fan', image: '🪭' },
  { word: 'pan', image: '🍳' },
  { word: 'can', image: '🥫' },
  { word: 'map', image: '🗺️' },
  { word: 'cap', image: '🧢' },
  { word: 'bag', image: '👜' },
  { word: 'tag', image: '🏷️' },
  // short-e
  { word: 'bed', image: '🛏️' },
  { word: 'red', image: '🔴' },
  { word: 'hen', image: '🐔' },
  { word: 'pen', image: '🖊️' },
  { word: 'ten', image: '🔟' },
  { word: 'net', image: '🥅' },
  { word: 'wet', image: '💧' },
  { word: 'jet', image: '✈️' },
  // short-i
  { word: 'pig', image: '🐷' },
  { word: 'big', image: '🏔️' },
  { word: 'dig', image: '⛏️' },
  { word: 'wig', image: '💇' },
  { word: 'pin', image: '📌' },
  { word: 'bin', image: '🗑️' },
  { word: 'fin', image: '🦈' },
  { word: 'sit', image: '🪑' },
  { word: 'hit', image: '🥊' },
  { word: 'bit', image: '🍪' },
  { word: 'lip', image: '👄' },
  { word: 'zip', image: '🤐' },
  // short-o
  { word: 'dog', image: '🐕' },
  { word: 'log', image: '🪵' },
  { word: 'fog', image: '🌫️' },
  { word: 'hot', image: '🔥' },
  { word: 'pot', image: '🍲' },
  { word: 'dot', image: '⚫' },
  { word: 'mop', image: '🧹' },
  { word: 'top', image: '🔝' },
  { word: 'box', image: '📦' },
  { word: 'fox', image: '🦊' },
  // short-u
  { word: 'sun', image: '☀️' },
  { word: 'run', image: '🏃' },
  { word: 'fun', image: '🎉' },
  { word: 'bun', image: '🍞' },
  { word: 'gun', image: '🔫' },
  { word: 'bug', image: '🐛' },
  { word: 'rug', image: '🟫' },
  { word: 'mug', image: '☕' },
  { word: 'hug', image: '🤗' },
  { word: 'tub', image: '🛁' },
  { word: 'cup', image: '🥤' },
  { word: 'pup', image: '🐶' },
  { word: 'bus', image: '🚌' },
  { word: 'nut', image: '🥜' },
  { word: 'cut', image: '✂️' },
];

// ── CCVC words (consonant-consonant-vowel-consonant) ──────────────────────
export const CCVC_WORDS: { word: string; image: string }[] = [
  { word: 'stop', image: '🛑' },
  { word: 'flag', image: '🚩' },
  { word: 'trip', image: '🧳' },
  { word: 'crab', image: '🦀' },
  { word: 'frog', image: '🐸' },
  { word: 'drum', image: '🥁' },
  { word: 'swim', image: '🏊' },
  { word: 'clap', image: '👏' },
  { word: 'snap', image: '🫰' },
  { word: 'drip', image: '💧' },
  { word: 'grin', image: '😁' },
  { word: 'sled', image: '🛷' },
  { word: 'plum', image: '🟣' },
  { word: 'step', image: '👣' },
  { word: 'plug', image: '🔌' },
  { word: 'brim', image: '🎩' },
  { word: 'grab', image: '✊' },
  { word: 'trap', image: '🪤' },
  { word: 'slam', image: '🚪' },
  { word: 'spin', image: '🌀' },
];

// ── CVCC words (consonant-vowel-consonant-consonant) ──────────────────────
export const CVCC_WORDS: { word: string; image: string }[] = [
  { word: 'milk', image: '🥛' },
  { word: 'jump', image: '🤸' },
  { word: 'nest', image: '🪺' },
  { word: 'desk', image: '🪑' },
  { word: 'lamp', image: '💡' },
  { word: 'belt', image: '👔' },
  { word: 'gift', image: '🎁' },
  { word: 'pond', image: '🌊' },
  { word: 'tent', image: '⛺' },
  { word: 'hand', image: '✋' },
  { word: 'sand', image: '🏖️' },
  { word: 'band', image: '🎵' },
  { word: 'wind', image: '💨' },
  { word: 'hunt', image: '🔍' },
  { word: 'fast', image: '⚡' },
  { word: 'dust', image: '🌪️' },
  { word: 'rust', image: '🟤' },
  { word: 'pump', image: '⛽' },
  { word: 'dump', image: '🚛' },
  { word: 'mask', image: '🎭' },
];

// ── CVCe words (consonant-vowel-consonant-silent e) ───────────────────────
export const CVCE_WORDS: { word: string; image: string }[] = [
  { word: 'cake', image: '🎂' },
  { word: 'bike', image: '🚲' },
  { word: 'nose', image: '👃' },
  { word: 'kite', image: '🪁' },
  { word: 'bone', image: '🦴' },
  { word: 'home', image: '🏠' },
  { word: 'lake', image: '🏞️' },
  { word: 'pine', image: '🌲' },
  { word: 'mine', image: '⛏️' },
  { word: 'rope', image: '🪢' },
  { word: 'rose', image: '🌹' },
  { word: 'tube', image: '🧪' },
  { word: 'cube', image: '🧊' },
  { word: 'game', image: '🎮' },
  { word: 'name', image: '📛' },
  { word: 'wave', image: '🌊' },
  { word: 'cave', image: '🕳️' },
  { word: 'hive', image: '🐝' },
  { word: 'fire', image: '🔥' },
  { word: 'mule', image: '🫏' },
];

// ── Sight words (4 sets of 10) ────────────────────────────────────────────
export const SIGHT_WORDS: string[][] = [
  // Level 1 – 10 most common
  ['the', 'a', 'is', 'to', 'and', 'I', 'it', 'in', 'my', 'we'],
  // Level 2 – next 10
  ['he', 'she', 'was', 'for', 'are', 'you', 'they', 'his', 'her', 'has'],
  // Level 3 – next 10
  ['said', 'have', 'what', 'were', 'when', 'your', 'can', 'each', 'do', 'how'],
  // Level 4 – all 40 mixed (10 more new words + the previous 30 get mixed at runtime)
  ['come', 'some', 'could', 'would', 'make', 'like', 'been', 'there', 'from', 'many'],
];

// ── Phoneme data for Sound Safari ─────────────────────────────────────────
export const PHONEMES: {
  phoneme: string;
  words: { word: string; image: string }[];
  distractors: { word: string; image: string }[];
}[] = [
  // Beginning consonants
  {
    phoneme: 'b',
    words: [
      { word: 'bat', image: '🦇' },
      { word: 'bed', image: '🛏️' },
      { word: 'bus', image: '🚌' },
    ],
    distractors: [
      { word: 'cat', image: '🐱' },
      { word: 'dog', image: '🐕' },
    ],
  },
  {
    phoneme: 'c',
    words: [
      { word: 'cat', image: '🐱' },
      { word: 'cup', image: '🥤' },
      { word: 'car', image: '🚗' },
    ],
    distractors: [
      { word: 'hat', image: '🎩' },
      { word: 'sun', image: '☀️' },
    ],
  },
  {
    phoneme: 'd',
    words: [
      { word: 'dog', image: '🐕' },
      { word: 'duck', image: '🦆' },
      { word: 'drum', image: '🥁' },
    ],
    distractors: [
      { word: 'pig', image: '🐷' },
      { word: 'run', image: '🏃' },
    ],
  },
  {
    phoneme: 'f',
    words: [
      { word: 'fox', image: '🦊' },
      { word: 'fan', image: '🪭' },
      { word: 'fish', image: '🐟' },
    ],
    distractors: [
      { word: 'hat', image: '🎩' },
      { word: 'net', image: '🥅' },
    ],
  },
  {
    phoneme: 'm',
    words: [
      { word: 'map', image: '🗺️' },
      { word: 'mug', image: '☕' },
      { word: 'moon', image: '🌙' },
    ],
    distractors: [
      { word: 'sun', image: '☀️' },
      { word: 'pen', image: '🖊️' },
    ],
  },
  {
    phoneme: 's',
    words: [
      { word: 'sun', image: '☀️' },
      { word: 'sock', image: '🧦' },
      { word: 'star', image: '⭐' },
    ],
    distractors: [
      { word: 'bug', image: '🐛' },
      { word: 'hat', image: '🎩' },
    ],
  },
  // Digraphs
  {
    phoneme: 'sh',
    words: [
      { word: 'ship', image: '🚢' },
      { word: 'shell', image: '🐚' },
      { word: 'shoe', image: '👟' },
    ],
    distractors: [
      { word: 'sun', image: '☀️' },
      { word: 'cat', image: '🐱' },
    ],
  },
  {
    phoneme: 'ch',
    words: [
      { word: 'chair', image: '🪑' },
      { word: 'cheese', image: '🧀' },
      { word: 'cherry', image: '🍒' },
    ],
    distractors: [
      { word: 'car', image: '🚗' },
      { word: 'shoe', image: '👟' },
    ],
  },
  {
    phoneme: 'th',
    words: [
      { word: 'thumb', image: '👍' },
      { word: 'three', image: '3️⃣' },
      { word: 'think', image: '🤔' },
    ],
    distractors: [
      { word: 'tree', image: '🌳' },
      { word: 'ship', image: '🚢' },
    ],
  },
  // Blends
  {
    phoneme: 'bl',
    words: [
      { word: 'block', image: '🧱' },
      { word: 'blue', image: '🔵' },
      { word: 'blow', image: '🌬️' },
    ],
    distractors: [
      { word: 'ball', image: '⚽' },
      { word: 'clap', image: '👏' },
    ],
  },
  {
    phoneme: 'cr',
    words: [
      { word: 'crab', image: '🦀' },
      { word: 'crown', image: '👑' },
      { word: 'cry', image: '😢' },
    ],
    distractors: [
      { word: 'car', image: '🚗' },
      { word: 'frog', image: '🐸' },
    ],
  },
  {
    phoneme: 'st',
    words: [
      { word: 'star', image: '⭐' },
      { word: 'stop', image: '🛑' },
      { word: 'stick', image: '🥢' },
    ],
    distractors: [
      { word: 'sun', image: '☀️' },
      { word: 'tree', image: '🌳' },
    ],
  },
  {
    phoneme: 'gr',
    words: [
      { word: 'grapes', image: '🍇' },
      { word: 'green', image: '🟢' },
      { word: 'grin', image: '😁' },
    ],
    distractors: [
      { word: 'goat', image: '🐐' },
      { word: 'drum', image: '🥁' },
    ],
  },
  {
    phoneme: 'tr',
    words: [
      { word: 'tree', image: '🌳' },
      { word: 'train', image: '🚂' },
      { word: 'truck', image: '🚛' },
    ],
    distractors: [
      { word: 'tent', image: '⛺' },
      { word: 'crab', image: '🦀' },
    ],
  },
  {
    phoneme: 'pl',
    words: [
      { word: 'plane', image: '✈️' },
      { word: 'plant', image: '🌱' },
      { word: 'plate', image: '🍽️' },
    ],
    distractors: [
      { word: 'pan', image: '🍳' },
      { word: 'block', image: '🧱' },
    ],
  },
];

// ── Stories for Story Book game ───────────────────────────────────────────
export const STORIES: {
  title: string;
  pages: {
    text: string;
    image: string;
    blankWord?: string;
    options?: string[];
  }[];
}[] = [
  // Story 1 – The Red Hen (progressive sentence length)
  {
    title: 'The Red Hen',
    pages: [
      { text: 'A red hen.', image: '🐔' },
      { text: 'The hen sat.', image: '🪺' },
      { text: 'She sat on eggs.', image: '🥚' },
      {
        text: 'The eggs went pop!',
        image: '🐣',
        blankWord: 'pop',
        options: ['pop', 'mop', 'top', 'hop'],
      },
      { text: 'Now she has three baby chicks.', image: '🐥' },
      {
        text: 'The hen and her chicks are happy.',
        image: '🐔',
        blankWord: 'happy',
        options: ['happy', 'sleepy', 'hungry', 'funny'],
      },
    ],
  },
  // Story 2 – The Big Dog
  {
    title: 'The Big Dog',
    pages: [
      { text: 'A big dog.', image: '🐕' },
      { text: 'The dog can run.', image: '🏃' },
      { text: 'He ran to the park.', image: '🌳' },
      {
        text: 'At the park he saw a cat.',
        image: '🐱',
        blankWord: 'cat',
        options: ['cat', 'bat', 'rat', 'hat'],
      },
      { text: 'The dog and the cat played all day.', image: '🎾' },
      {
        text: 'Then they went home and had a big nap.',
        image: '😴',
        blankWord: 'nap',
        options: ['nap', 'map', 'cap', 'lap'],
      },
    ],
  },
  // Story 3 – The Lost Kite
  {
    title: 'The Lost Kite',
    pages: [
      { text: 'I got a kite.', image: '🪁' },
      { text: 'My kite is blue.', image: '🔵' },
      { text: 'The wind took my kite!', image: '💨' },
      {
        text: 'It went up high in the sky.',
        image: '☁️',
        blankWord: 'sky',
        options: ['sky', 'fly', 'cry', 'dry'],
      },
      { text: 'A bird found my kite in a tree.', image: '🌲' },
      {
        text: 'Dad helped me get it down from the tree.',
        image: '👨',
        blankWord: 'tree',
        options: ['tree', 'free', 'three', 'bee'],
      },
    ],
  },
];

// ── Sentence templates for Sentence Builder ───────────────────────────────
export const SENTENCES: { level: number; words: string[]; correct: string }[] = [
  // Level 1 – 4-5 words
  { level: 1, words: ['the', 'cat', 'sat', 'down'], correct: 'the cat sat down' },
  { level: 1, words: ['I', 'like', 'my', 'dog'], correct: 'I like my dog' },
  { level: 1, words: ['we', 'can', 'run', 'fast'], correct: 'we can run fast' },
  { level: 1, words: ['she', 'is', 'my', 'mom'], correct: 'she is my mom' },
  { level: 1, words: ['the', 'sun', 'is', 'hot'], correct: 'the sun is hot' },
  { level: 1, words: ['he', 'has', 'a', 'hat'], correct: 'he has a hat' },

  // Level 2 – 6-7 words
  { level: 2, words: ['the', 'big', 'dog', 'can', 'run', 'fast'], correct: 'the big dog can run fast' },
  { level: 2, words: ['I', 'like', 'to', 'eat', 'red', 'apples'], correct: 'I like to eat red apples' },
  { level: 2, words: ['she', 'went', 'to', 'the', 'park', 'today'], correct: 'she went to the park today' },
  { level: 2, words: ['we', 'can', 'see', 'the', 'blue', 'bird'], correct: 'we can see the blue bird' },
  { level: 2, words: ['he', 'plays', 'with', 'his', 'red', 'ball'], correct: 'he plays with his red ball' },
  { level: 2, words: ['my', 'cat', 'sat', 'on', 'the', 'mat'], correct: 'my cat sat on the mat' },
  { level: 2, words: ['the', 'fish', 'swam', 'in', 'the', 'pond'], correct: 'the fish swam in the pond' },

  // Level 3 – 8-10 words
  { level: 3, words: ['the', 'little', 'bird', 'sang', 'a', 'song', 'in', 'the', 'tree'], correct: 'the little bird sang a song in the tree' },
  { level: 3, words: ['I', 'went', 'to', 'the', 'store', 'with', 'my', 'dad'], correct: 'I went to the store with my dad' },
  { level: 3, words: ['she', 'likes', 'to', 'read', 'books', 'before', 'she', 'sleeps'], correct: 'she likes to read books before she sleeps' },
  { level: 3, words: ['the', 'frog', 'jumped', 'over', 'the', 'big', 'brown', 'log'], correct: 'the frog jumped over the big brown log' },
  { level: 3, words: ['we', 'had', 'fun', 'playing', 'in', 'the', 'rain', 'today'], correct: 'we had fun playing in the rain today' },

  // Level 4 – two sentences (joined by period)
  { level: 4, words: ['I', 'have', 'a', 'pet.', 'It', 'is', 'a', 'cat.'], correct: 'I have a pet. It is a cat.' },
  { level: 4, words: ['The', 'dog', 'ran.', 'He', 'ran', 'to', 'me.'], correct: 'The dog ran. He ran to me.' },
  { level: 4, words: ['She', 'is', 'sad.', 'Her', 'toy', 'is', 'lost.'], correct: 'She is sad. Her toy is lost.' },
  { level: 4, words: ['We', 'like', 'cake.', 'It', 'is', 'so', 'good.'], correct: 'We like cake. It is so good.' },
  { level: 4, words: ['The', 'sun', 'set.', 'It', 'was', 'very', 'pretty.'], correct: 'The sun set. It was very pretty.' },
];
