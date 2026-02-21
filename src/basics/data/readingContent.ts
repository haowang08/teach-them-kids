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
// Each word can optionally have an `asset` path pointing to a kenney PNG in
// public/kenney/. When present the game renders an <img>; otherwise the emoji.

export interface PhonemeWord {
  word: string;
  image: string;
  asset?: string;
}

export interface PhonemeEntry {
  phoneme: string;
  words: PhonemeWord[];
  distractors: PhonemeWord[];
}

export const PHONEMES: PhonemeEntry[] = [
  // ─── Beginning consonants ────────────────────────────────────────────────
  {
    phoneme: 'b',
    words: [
      { word: 'bear', image: '🐻', asset: '/kenney/animals/bear.png' },
      { word: 'banana', image: '🍌', asset: '/kenney/food/banana.png' },
      { word: 'bread', image: '🍞', asset: '/kenney/food/bread.png' },
      { word: 'bat', image: '🦇' },
      { word: 'bus', image: '🚌' },
    ],
    distractors: [
      { word: 'cow', image: '🐄', asset: '/kenney/animals/cow.png' },
      { word: 'dog', image: '🐕', asset: '/kenney/animals/dog.png' },
      { word: 'apple', image: '🍎', asset: '/kenney/food/apple.png' },
    ],
  },
  {
    phoneme: 'c',
    words: [
      { word: 'cow', image: '🐄', asset: '/kenney/animals/cow.png' },
      { word: 'cake', image: '🎂', asset: '/kenney/food/cake.png' },
      { word: 'carrot', image: '🥕', asset: '/kenney/food/carrot.png' },
      { word: 'cookie', image: '🍪', asset: '/kenney/food/cookie.png' },
      { word: 'car', image: '🚗' },
    ],
    distractors: [
      { word: 'dog', image: '🐕', asset: '/kenney/animals/dog.png' },
      { word: 'tomato', image: '🍅', asset: '/kenney/food/tomato.png' },
    ],
  },
  {
    phoneme: 'd',
    words: [
      { word: 'dog', image: '🐕', asset: '/kenney/animals/dog.png' },
      { word: 'duck', image: '🦆', asset: '/kenney/animals/duck.png' },
      { word: 'donut', image: '🍩', asset: '/kenney/food/donut.png' },
      { word: 'drum', image: '🥁' },
    ],
    distractors: [
      { word: 'pig', image: '🐷', asset: '/kenney/animals/pig.png' },
      { word: 'frog', image: '🐸', asset: '/kenney/animals/frog.png' },
    ],
  },
  {
    phoneme: 'f',
    words: [
      { word: 'frog', image: '🐸', asset: '/kenney/animals/frog.png' },
      { word: 'fish', image: '🐟', asset: '/kenney/food/fish.png' },
      { word: 'fries', image: '🍟', asset: '/kenney/food/fries.png' },
      { word: 'fox', image: '🦊' },
    ],
    distractors: [
      { word: 'bear', image: '🐻', asset: '/kenney/animals/bear.png' },
      { word: 'lemon', image: '🍋', asset: '/kenney/food/lemon.png' },
    ],
  },
  {
    phoneme: 'g',
    words: [
      { word: 'goat', image: '🐐', asset: '/kenney/animals/goat.png' },
      { word: 'gorilla', image: '🦍', asset: '/kenney/animals/gorilla.png' },
      { word: 'grapes', image: '🍇', asset: '/kenney/food/grapes.png' },
      { word: 'giraffe', image: '🦒', asset: '/kenney/animals/giraffe.png' },
    ],
    distractors: [
      { word: 'bear', image: '🐻', asset: '/kenney/animals/bear.png' },
      { word: 'cake', image: '🎂', asset: '/kenney/food/cake.png' },
    ],
  },
  {
    phoneme: 'h',
    words: [
      { word: 'horse', image: '🐴', asset: '/kenney/animals/horse.png' },
      { word: 'hippo', image: '🦛', asset: '/kenney/animals/hippo.png' },
      { word: 'hot dog', image: '🌭', asset: '/kenney/food/hot-dog.png' },
      { word: 'hat', image: '🎩' },
    ],
    distractors: [
      { word: 'pig', image: '🐷', asset: '/kenney/animals/pig.png' },
      { word: 'banana', image: '🍌', asset: '/kenney/food/banana.png' },
    ],
  },
  {
    phoneme: 'j',
    words: [
      { word: 'jet', image: '✈️' },
      { word: 'jar', image: '🫙' },
      { word: 'jam', image: '🫐' },
    ],
    distractors: [
      { word: 'goat', image: '🐐', asset: '/kenney/animals/goat.png' },
      { word: 'fish', image: '🐟', asset: '/kenney/food/fish.png' },
    ],
  },
  {
    phoneme: 'k',
    words: [
      { word: 'kite', image: '🪁' },
      { word: 'king', image: '🤴' },
      { word: 'key', image: '🔑' },
    ],
    distractors: [
      { word: 'goat', image: '🐐', asset: '/kenney/animals/goat.png' },
      { word: 'pie', image: '🥧', asset: '/kenney/food/pie.png' },
    ],
  },
  {
    phoneme: 'l',
    words: [
      { word: 'lemon', image: '🍋', asset: '/kenney/food/lemon.png' },
      { word: 'lollipop', image: '🍭', asset: '/kenney/food/lollypop.png' },
      { word: 'lion', image: '🦁' },
      { word: 'lamp', image: '💡' },
    ],
    distractors: [
      { word: 'rabbit', image: '🐰', asset: '/kenney/animals/rabbit.png' },
      { word: 'orange', image: '🍊', asset: '/kenney/food/orange.png' },
    ],
  },
  {
    phoneme: 'm',
    words: [
      { word: 'monkey', image: '🐒', asset: '/kenney/animals/monkey.png' },
      { word: 'moose', image: '🫎', asset: '/kenney/animals/moose.png' },
      { word: 'mushroom', image: '🍄', asset: '/kenney/food/mushroom.png' },
      { word: 'muffin', image: '🧁', asset: '/kenney/food/muffin.png' },
      { word: 'moon', image: '🌙' },
    ],
    distractors: [
      { word: 'narwhal', image: '🦄', asset: '/kenney/animals/narwhal.png' },
      { word: 'pear', image: '🍐', asset: '/kenney/food/pear.png' },
    ],
  },
  {
    phoneme: 'n',
    words: [
      { word: 'narwhal', image: '🦄', asset: '/kenney/animals/narwhal.png' },
      { word: 'nest', image: '🪺' },
      { word: 'net', image: '🥅' },
      { word: 'nut', image: '🥜' },
    ],
    distractors: [
      { word: 'monkey', image: '🐒', asset: '/kenney/animals/monkey.png' },
      { word: 'lemon', image: '🍋', asset: '/kenney/food/lemon.png' },
    ],
  },
  {
    phoneme: 'p',
    words: [
      { word: 'pig', image: '🐷', asset: '/kenney/animals/pig.png' },
      { word: 'penguin', image: '🐧', asset: '/kenney/animals/penguin.png' },
      { word: 'pizza', image: '🍕', asset: '/kenney/food/pizza.png' },
      { word: 'pie', image: '🥧', asset: '/kenney/food/pie.png' },
      { word: 'pear', image: '🍐', asset: '/kenney/food/pear.png' },
    ],
    distractors: [
      { word: 'bear', image: '🐻', asset: '/kenney/animals/bear.png' },
      { word: 'taco', image: '🌮', asset: '/kenney/food/taco.png' },
    ],
  },
  {
    phoneme: 'r',
    words: [
      { word: 'rabbit', image: '🐰', asset: '/kenney/animals/rabbit.png' },
      { word: 'rhino', image: '🦏', asset: '/kenney/animals/rhino.png' },
      { word: 'rice ball', image: '🍙', asset: '/kenney/food/rice-ball.png' },
      { word: 'ring', image: '💍' },
    ],
    distractors: [
      { word: 'whale', image: '🐋', asset: '/kenney/animals/whale.png' },
      { word: 'strawberry', image: '🍓', asset: '/kenney/food/strawberry.png' },
    ],
  },
  {
    phoneme: 's',
    words: [
      { word: 'snake', image: '🐍', asset: '/kenney/animals/snake.png' },
      { word: 'strawberry', image: '🍓', asset: '/kenney/food/strawberry.png' },
      { word: 'sandwich', image: '🥪', asset: '/kenney/food/sandwich.png' },
      { word: 'sun', image: '☀️' },
      { word: 'star', image: '⭐' },
    ],
    distractors: [
      { word: 'crocodile', image: '🐊', asset: '/kenney/animals/crocodile.png' },
      { word: 'banana', image: '🍌', asset: '/kenney/food/banana.png' },
    ],
  },
  {
    phoneme: 't',
    words: [
      { word: 'tomato', image: '🍅', asset: '/kenney/food/tomato.png' },
      { word: 'taco', image: '🌮', asset: '/kenney/food/taco.png' },
      { word: 'tent', image: '⛺' },
      { word: 'train', image: '🚂' },
    ],
    distractors: [
      { word: 'snake', image: '🐍', asset: '/kenney/animals/snake.png' },
      { word: 'pizza', image: '🍕', asset: '/kenney/food/pizza.png' },
    ],
  },
  {
    phoneme: 'v',
    words: [
      { word: 'van', image: '🚐' },
      { word: 'vase', image: '🏺' },
      { word: 'vest', image: '🦺' },
    ],
    distractors: [
      { word: 'walrus', image: '🦭', asset: '/kenney/animals/walrus.png' },
      { word: 'egg', image: '🥚', asset: '/kenney/food/egg.png' },
    ],
  },
  {
    phoneme: 'w',
    words: [
      { word: 'whale', image: '🐋', asset: '/kenney/animals/whale.png' },
      { word: 'walrus', image: '🦭', asset: '/kenney/animals/walrus.png' },
      { word: 'waffle', image: '🧇', asset: '/kenney/food/waffle.png' },
      { word: 'watermelon', image: '🍉', asset: '/kenney/food/watermelon.png' },
    ],
    distractors: [
      { word: 'rabbit', image: '🐰', asset: '/kenney/animals/rabbit.png' },
      { word: 'lemon', image: '🍋', asset: '/kenney/food/lemon.png' },
    ],
  },
  {
    phoneme: 'x',
    words: [
      { word: 'x-ray', image: '🩻' },
      { word: 'xylophone', image: '🎵' },
      { word: 'fox', image: '🦊' },
    ],
    distractors: [
      { word: 'zebra', image: '🦓', asset: '/kenney/animals/zebra.png' },
      { word: 'onion', image: '🧅', asset: '/kenney/food/onion.png' },
    ],
  },
  {
    phoneme: 'y',
    words: [
      { word: 'yak', image: '🐂' },
      { word: 'yarn', image: '🧶' },
      { word: 'yo-yo', image: '🪀' },
    ],
    distractors: [
      { word: 'zebra', image: '🦓', asset: '/kenney/animals/zebra.png' },
      { word: 'waffle', image: '🧇', asset: '/kenney/food/waffle.png' },
    ],
  },
  {
    phoneme: 'z',
    words: [
      { word: 'zebra', image: '🦓', asset: '/kenney/animals/zebra.png' },
      { word: 'zoo', image: '🦁' },
      { word: 'zip', image: '🤐' },
    ],
    distractors: [
      { word: 'snake', image: '🐍', asset: '/kenney/animals/snake.png' },
      { word: 'apple', image: '🍎', asset: '/kenney/food/apple.png' },
    ],
  },
  {
    phoneme: 'q',
    words: [
      { word: 'queen', image: '👸' },
      { word: 'quilt', image: '🛏️' },
      { word: 'quiz', image: '❓' },
    ],
    distractors: [
      { word: 'penguin', image: '🐧', asset: '/kenney/animals/penguin.png' },
      { word: 'cake', image: '🎂', asset: '/kenney/food/cake.png' },
    ],
  },

  // ─── Digraphs ────────────────────────────────────────────────────────────
  {
    phoneme: 'sh',
    words: [
      { word: 'ship', image: '🚢', asset: '/kenney/watercraft/ship-small.png' },
      { word: 'shell', image: '🐚' },
      { word: 'shoe', image: '👟' },
      { word: 'shark', image: '🦈' },
    ],
    distractors: [
      { word: 'chicken', image: '🐔', asset: '/kenney/animals/chicken.png' },
      { word: 'strawberry', image: '🍓', asset: '/kenney/food/strawberry.png' },
    ],
  },
  {
    phoneme: 'ch',
    words: [
      { word: 'chicken', image: '🐔', asset: '/kenney/animals/chicken.png' },
      { word: 'cherries', image: '🍒', asset: '/kenney/food/cherries.png' },
      { word: 'cheese', image: '🧀' },
      { word: 'chair', image: '🪑' },
    ],
    distractors: [
      { word: 'ship', image: '🚢', asset: '/kenney/watercraft/ship-small.png' },
      { word: 'tomato', image: '🍅', asset: '/kenney/food/tomato.png' },
    ],
  },
  {
    phoneme: 'th',
    words: [
      { word: 'thumb', image: '👍' },
      { word: 'three', image: '3️⃣' },
      { word: 'think', image: '🤔' },
      { word: 'thorn', image: '🌹' },
    ],
    distractors: [
      { word: 'chicken', image: '🐔', asset: '/kenney/animals/chicken.png' },
      { word: 'ship', image: '🚢', asset: '/kenney/watercraft/ship-small.png' },
    ],
  },
  {
    phoneme: 'wh',
    words: [
      { word: 'whale', image: '🐋', asset: '/kenney/animals/whale.png' },
      { word: 'wheel', image: '🛞' },
      { word: 'whistle', image: '🎵' },
      { word: 'whisk', image: '🥄' },
    ],
    distractors: [
      { word: 'walrus', image: '🦭', asset: '/kenney/animals/walrus.png' },
      { word: 'ship', image: '🚢', asset: '/kenney/watercraft/ship-small.png' },
    ],
  },
  {
    phoneme: 'ck',
    words: [
      { word: 'duck', image: '🦆', asset: '/kenney/animals/duck.png' },
      { word: 'chick', image: '🐤', asset: '/kenney/animals/chick.png' },
      { word: 'clock', image: '🕐' },
      { word: 'sock', image: '🧦' },
    ],
    distractors: [
      { word: 'dog', image: '🐕', asset: '/kenney/animals/dog.png' },
      { word: 'cake', image: '🎂', asset: '/kenney/food/cake.png' },
    ],
  },
  {
    phoneme: 'ng',
    words: [
      { word: 'ring', image: '💍' },
      { word: 'king', image: '🤴' },
      { word: 'sing', image: '🎤' },
      { word: 'swing', image: '🛝' },
    ],
    distractors: [
      { word: 'duck', image: '🦆', asset: '/kenney/animals/duck.png' },
      { word: 'pie', image: '🥧', asset: '/kenney/food/pie.png' },
    ],
  },
  {
    phoneme: 'ph',
    words: [
      { word: 'phone', image: '📱' },
      { word: 'photo', image: '📸' },
      { word: 'pharaoh', image: '🏛️' },
    ],
    distractors: [
      { word: 'frog', image: '🐸', asset: '/kenney/animals/frog.png' },
      { word: 'fish', image: '🐟', asset: '/kenney/food/fish.png' },
    ],
  },

  // ─── Blends ──────────────────────────────────────────────────────────────
  {
    phoneme: 'bl',
    words: [
      { word: 'block', image: '🧱' },
      { word: 'blue', image: '🔵' },
      { word: 'blow', image: '🌬️' },
    ],
    distractors: [
      { word: 'crocodile', image: '🐊', asset: '/kenney/animals/crocodile.png' },
      { word: 'grapes', image: '🍇', asset: '/kenney/food/grapes.png' },
    ],
  },
  {
    phoneme: 'cr',
    words: [
      { word: 'crocodile', image: '🐊', asset: '/kenney/animals/crocodile.png' },
      { word: 'crown', image: '👑' },
      { word: 'cry', image: '😢' },
    ],
    distractors: [
      { word: 'frog', image: '🐸', asset: '/kenney/animals/frog.png' },
      { word: 'strawberry', image: '🍓', asset: '/kenney/food/strawberry.png' },
    ],
  },
  {
    phoneme: 'st',
    words: [
      { word: 'strawberry', image: '🍓', asset: '/kenney/food/strawberry.png' },
      { word: 'star', image: '⭐' },
      { word: 'stop', image: '🛑' },
    ],
    distractors: [
      { word: 'tomato', image: '🍅', asset: '/kenney/food/tomato.png' },
      { word: 'crocodile', image: '🐊', asset: '/kenney/animals/crocodile.png' },
    ],
  },
  {
    phoneme: 'gr',
    words: [
      { word: 'grapes', image: '🍇', asset: '/kenney/food/grapes.png' },
      { word: 'gorilla', image: '🦍', asset: '/kenney/animals/gorilla.png' },
      { word: 'green', image: '🟢' },
    ],
    distractors: [
      { word: 'bear', image: '🐻', asset: '/kenney/animals/bear.png' },
      { word: 'banana', image: '🍌', asset: '/kenney/food/banana.png' },
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
      { word: 'crocodile', image: '🐊', asset: '/kenney/animals/crocodile.png' },
      { word: 'pizza', image: '🍕', asset: '/kenney/food/pizza.png' },
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
      { word: 'banana', image: '🍌', asset: '/kenney/food/banana.png' },
      { word: 'elephant', image: '🐘', asset: '/kenney/animals/elephant.png' },
    ],
  },
  {
    phoneme: 'fl',
    words: [
      { word: 'flag', image: '🚩' },
      { word: 'flower', image: '🌸' },
      { word: 'fly', image: '🪰' },
    ],
    distractors: [
      { word: 'grapes', image: '🍇', asset: '/kenney/food/grapes.png' },
      { word: 'elephant', image: '🐘', asset: '/kenney/animals/elephant.png' },
    ],
  },
  {
    phoneme: 'br',
    words: [
      { word: 'bread', image: '🍞', asset: '/kenney/food/bread.png' },
      { word: 'bridge', image: '🌉' },
      { word: 'broom', image: '🧹' },
    ],
    distractors: [
      { word: 'frog', image: '🐸', asset: '/kenney/animals/frog.png' },
      { word: 'grapes', image: '🍇', asset: '/kenney/food/grapes.png' },
    ],
  },
  {
    phoneme: 'dr',
    words: [
      { word: 'drum', image: '🥁' },
      { word: 'dragon', image: '🐉' },
      { word: 'dress', image: '👗' },
    ],
    distractors: [
      { word: 'bear', image: '🐻', asset: '/kenney/animals/bear.png' },
      { word: 'crocodile', image: '🐊', asset: '/kenney/animals/crocodile.png' },
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
