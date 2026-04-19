import type { Topic } from '../types';

export const learnToDrawFruit: Topic = {
  id: 'learn-to-draw-fruit',
  slug: 'learn-to-draw-fruit',
  title: 'Draw Kawaii Fruit',
  subtitle: 'From classic strawberries to exotic dragon fruit!',
  status: 'active',
  themeId: 'learn-to-draw',
  heroIcons: ['\u{1F353}', '\u{1F349}', '\u{1F34D}'],
  mode: 'activity',
  navItems: [
    { id: 'get-ready', icon: '\u{1F58D}\uFE0F', label: 'Get Ready' },
    { id: 'strawberry', icon: '\u{1F353}', label: 'Strawberry' },
    { id: 'watermelon', icon: '\u{1F349}', label: 'Watermelon' },
    { id: 'pineapple', icon: '\u{1F34D}', label: 'Pineapple' },
    { id: 'banana', icon: '\u{1F34C}', label: 'Banana' },
    { id: 'dragon-fruit', icon: '\u{1F409}', label: 'Dragon Fruit' },
    { id: 'gallery', icon: '\u{1F4F7}', label: 'My Gallery' },
  ],
  activityPrompt: {
    title: 'Show off your drawing!',
    description:
      'Snap a photo of your fruit drawing and add it to the gallery. It stays right here on your device — nothing gets uploaded anywhere.',
    completionLabel: 'Add another drawing',
  },
  sections: [
    {
      id: 'get-ready',
      icon: '\u{1F58D}\uFE0F',
      title: 'Grab your supplies!',
      readAloudBlocks: [
        {
          id: 'intro-fruit',
          paragraphs: [
            'Fruit is the perfect first drawing subject: simple shapes, bright colors, and you get to put a cute face on everything! Today we have five fruits to try.',
            'You\'ll want a pencil, a black pen or marker for outlines, and colored pencils or markers for coloring. Don\'t worry if your drawing doesn\'t look exactly like the video — your version is the best version. Let\'s draw!',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },
    {
      id: 'strawberry',
      icon: '\u{1F353}',
      title: 'Kawaii Strawberry',
      readAloudBlocks: [
        {
          id: 'strawberry-intro',
          paragraphs: [
            'A classic kawaii strawberry with a little smile — a great one to start with.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Seeds on the outside!',
          text:
            'Strawberries are the only fruit that wears its seeds on the outside — about 200 of them per berry. And technically, they aren\'t even true berries. They\'re called "aggregate fruits."',
        },
        {
          title: 'Ancient Romans used them as medicine',
          text:
            'In Ancient Rome, people ate strawberries to help with sore throats, fevers, and even fainting spells. They didn\'t know about vitamins yet, but the vitamin C was probably doing the trick!',
        },
      ],
      videos: [
        {
          youtubeId: '6kIWWLZql3c',
          title: 'How to Draw a Strawberry Easy',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'watermelon',
      icon: '\u{1F349}',
      title: 'Cartoon Watermelon',
      readAloudBlocks: [
        {
          id: 'watermelon-intro',
          paragraphs: [
            'A smiling slice of watermelon — a summer classic.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'It\'s 92% water',
          text:
            'A watermelon is made of about 92% water — that\'s why it\'s so refreshing on a hot day. The name literally tells you what\'s inside.',
        },
        {
          title: 'There are square ones in Japan',
          text:
            'Japanese farmers grow cube-shaped watermelons inside clear boxes so they stack better in the fridge. A single square watermelon can cost around $100!',
        },
      ],
      videos: [
        {
          youtubeId: 'I-9UxsWEi2k',
          title: 'How To Draw A Cartoon Watermelon',
          channelName: 'Art for Kids Hub',
        },
      ],
      quizIds: [],
    },
    {
      id: 'pineapple',
      icon: '\u{1F34D}',
      title: 'Cute Pineapple',
      readAloudBlocks: [
        {
          id: 'pineapple-intro',
          paragraphs: [
            'A kawaii pineapple with a spiky leafy crown. Drawing the diamond pattern is surprisingly fun.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Not one fruit — it\'s actually many!',
          text:
            'Each diamond-shaped section on a pineapple is actually a separate little fruit that fused together as the pineapple grew. So when you eat one pineapple, you\'re eating hundreds of fruits at once.',
        },
        {
          title: 'It takes two years to grow',
          text:
            'A pineapple plant takes about 18 to 24 months to grow a single pineapple. That\'s a lot of patience for one snack!',
        },
      ],
      videos: [
        {
          youtubeId: 'm6tRM1uBhTU',
          title: 'How to Draw a Pineapple Easy',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'banana',
      icon: '\u{1F34C}',
      title: 'Cute Banana',
      readAloudBlocks: [
        {
          id: 'banana-intro',
          paragraphs: [
            'The video shows two levels: a single banana for an easy win, or a whole bunch if you want more of a challenge.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Bananas ARE berries',
          text:
            'Plot twist: bananas are actually botanical berries, but strawberries aren\'t! Scientists classify fruits by how they grow on the plant, not by their shape or size.',
        },
        {
          title: 'Grown from shoots, not seeds',
          text:
            'Every banana you\'ve ever eaten is basically a clone. Farmers plant shoots from a parent banana plant instead of seeds — which means all bananas of the same type are genetically identical.',
        },
      ],
      videos: [
        {
          youtubeId: '90CaHw6HAsQ',
          title: 'How to Draw a Banana Easy',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'dragon-fruit',
      icon: '\u{1F409}',
      title: 'Funny Dragon Fruit',
      readAloudBlocks: [
        {
          id: 'dragon-fruit-intro',
          paragraphs: [
            'A dragon fruit with a goofy face. This one lets you invent your own expression — go wild!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Grows on a cactus',
          text:
            'Dragon fruit (also called pitaya) grows on tall climbing cacti. Its flowers only bloom at night and shrivel up by morning — which is why you almost never see the flowers at a store.',
        },
        {
          title: 'The name comes from its scales',
          text:
            'People thought the fruit\'s bright pink skin covered in green leafy scales looked like a dragon\'s body — which is exactly how it got its fiery name.',
        },
      ],
      videos: [
        {
          youtubeId: '5KrxaucLXa0',
          title: 'How To Draw A Funny Dragon Fruit',
          channelName: 'Art for Kids Hub',
        },
      ],
      quizIds: [],
    },
  ],
  quizzes: [],
  conclusion: {
    title: 'Fantastic work!',
    paragraphs: [
      'Five fruits down! Try drawing the same fruit a few times — each one will look a little different, and that\'s the fun part. You can also mix fruits together into a smoothie drawing or a fruit basket.',
      'Your gallery is saved on this device. Tap any drawing to see it bigger, or download it to keep a copy in your Photos.',
    ],
  },
};
