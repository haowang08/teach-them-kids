import type { Topic } from '../types';

export const learnToDrawDesserts: Topic = {
  id: 'learn-to-draw-desserts',
  slug: 'learn-to-draw-desserts',
  title: 'Draw Cute Desserts & Drinks',
  subtitle: 'Kawaii donuts, ice cream, bubble tea, and two kinds of cake!',
  status: 'active',
  themeId: 'learn-to-draw',
  heroIcons: ['\u{1F369}', '\u{1F366}', '\u{1F382}'],
  mode: 'activity',
  navItems: [
    { id: 'get-ready', icon: '\u{1F58D}\uFE0F', label: 'Get Ready' },
    { id: 'donut', icon: '\u{1F369}', label: 'Donut' },
    { id: 'ice-cream', icon: '\u{1F366}', label: 'Ice Cream' },
    { id: 'cupcake', icon: '\u{1F9C1}', label: 'Cupcake' },
    { id: 'macarons', icon: '\u{1F36A}', label: 'Macarons' },
    { id: 'boba', icon: '\u{1F9CB}', label: 'Bubble Tea' },
    { id: 'cake-slice', icon: '\u{1F370}', label: 'Cake Slice' },
    { id: 'birthday-cake', icon: '\u{1F382}', label: 'Birthday Cake' },
    { id: 'gallery', icon: '\u{1F4F7}', label: 'My Gallery' },
  ],
  activityPrompt: {
    title: 'Show off your drawing!',
    description:
      'Take a photo of anything you drew today and add it to your gallery. It stays right here on your device, so you can come back and admire your work anytime.',
    completionLabel: 'Add another drawing',
  },
  sections: [
    {
      id: 'get-ready',
      icon: '\u{1F58D}\uFE0F',
      title: 'Grab your supplies!',
      readAloudBlocks: [
        {
          id: 'intro-desserts',
          paragraphs: [
            'Welcome, artist! Today we\'re drawing seven of the cutest desserts and drinks around. Pick one to start, or try them all. Each lesson is taught by a real art teacher on YouTube.',
            'You\'ll want a piece of paper, a pencil to sketch, a black pen or thin marker for outlining, and some markers or colored pencils for coloring. No fancy supplies needed! When you finish a drawing, scroll down to the gallery and snap a photo of it.',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },
    {
      id: 'donut',
      icon: '\u{1F369}',
      title: 'Cartoon Donut',
      readAloudBlocks: [
        {
          id: 'donut-intro',
          paragraphs: [
            'A sweet, simple warm-up: a cartoon donut with frosting and sprinkles. This one is quick, so it\'s perfect for a first drawing!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'The hole has a story',
          text:
            'A 16-year-old sailor named Hanson Gregory is said to have invented the donut hole in 1847 because raw dough in the middle never cooked through. He punched the middle out with a pepper tin!',
        },
      ],
      videos: [
        {
          youtubeId: 'OaiT-PWTcig',
          title: 'How To Draw A Doughnut',
          channelName: 'Art for Kids Hub',
        },
      ],
      quizIds: [],
    },
    {
      id: 'ice-cream',
      icon: '\u{1F366}',
      title: 'Cute Ice Cream Cone',
      readAloudBlocks: [
        {
          id: 'ice-cream-intro',
          paragraphs: [
            'A kawaii ice cream cone with a big smile. Try adding extra scoops or toppings to make it your own!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Invented at a World\'s Fair',
          text:
            'The waffle cone became super popular at the 1904 St. Louis World\'s Fair, when an ice cream seller ran out of bowls and a nearby waffle maker rolled his waffles into cones to help out.',
        },
      ],
      videos: [
        {
          youtubeId: 'UW6H5dAPuhY',
          title: 'How To Draw A Cute Ice Cream Cone',
          channelName: 'Art for Kids Hub',
        },
      ],
      quizIds: [],
    },
    {
      id: 'cupcake',
      icon: '\u{1F9C1}',
      title: 'Rainbow Cupcake',
      readAloudBlocks: [
        {
          id: 'cupcake-intro',
          paragraphs: [
            'A rainbow cupcake with swirly frosting and a happy face. The rainbow colors make it fun to personalize.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Named after a measuring cup',
          text:
            'Cupcakes got their name in the 1800s because the ingredients were measured by the cup (not the pound), which made them much easier to bake in small batches.',
        },
      ],
      videos: [
        {
          youtubeId: '1Qk6lYHBUdM',
          title: 'How to Draw a Rainbow Cupcake Easy',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'macarons',
      icon: '\u{1F36A}',
      title: 'Stack of Macarons',
      readAloudBlocks: [
        {
          id: 'macarons-intro',
          paragraphs: [
            'A stack of pastel macarons, outlined and colored step by step. This video has no talking, so you can follow along at your own pace.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Not the same as a macaroon!',
          text:
            'A macaron (one "o") is a crunchy almond cookie from France. A macaroon (two "o"s) is a chewy coconut cookie. They sound the same but they\'re totally different desserts!',
        },
      ],
      videos: [
        {
          youtubeId: 'V8BUKjj698k',
          title: 'How To Draw Macarons — Easy Drawing Tutorial',
          channelName: 'Winnicorn',
        },
      ],
      quizIds: [],
    },
    {
      id: 'boba',
      icon: '\u{1F9CB}',
      title: 'Bubble Tea',
      readAloudBlocks: [
        {
          id: 'boba-intro',
          paragraphs: [
            'A smiling cup of boba with a striped straw and chewy tapioca pearls. This is one of the longer videos, so grab a drink (boba?) and settle in.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Born in Taiwan in the 1980s',
          text:
            'Bubble tea was invented in Taiwan around 1986. The "bubbles" in the name actually refer to the frothy foam on top — not the tapioca pearls everyone loves today!',
        },
      ],
      videos: [
        {
          youtubeId: '_n04MQySqaY',
          title: 'How to Draw a Cup of Boba Milk Cute',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'cake-slice',
      icon: '\u{1F370}',
      title: 'Kawaii Cake Slice',
      readAloudBlocks: [
        {
          id: 'cake-slice-intro',
          paragraphs: [
            'A cute slice of cake with a cherry on top. A perfect warm-up for anyone who wants to try the big birthday cake next.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Cake used to mean bread',
          text:
            'The word "cake" is over a thousand years old and first meant a small, flat, round loaf of bread. Sweet frosted cakes as we know them today didn\'t really exist until the 1800s.',
        },
      ],
      videos: [
        {
          youtubeId: 'LDIE2ZWqEEE',
          title: 'How to Draw a Cake Slice Easy',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'birthday-cake',
      icon: '\u{1F382}',
      title: 'Tiered Birthday Cake',
      readAloudBlocks: [
        {
          id: 'birthday-cake-intro',
          paragraphs: [
            'Ready for a bigger challenge? A tiered birthday cake with candles, layers, and all the decorations. This video is longer — take breaks and pause whenever you need to.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Blowing out candles is ancient',
          text:
            'People in Ancient Greece made round cakes topped with candles to honor the goddess Artemis. The candles\' smoke carried wishes up to the gods — which is where our "make a wish" tradition comes from!',
        },
      ],
      videos: [
        {
          youtubeId: '2iU-CkbGnPg',
          title: 'How to Draw a Cute Cake step by step Easy',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
  ],
  quizzes: [],
  conclusion: {
    title: 'You did it!',
    paragraphs: [
      'Awesome work today, artist. Drawing gets easier every time you try it, so come back tomorrow and pick a new dessert (or redo one of these and see how much better it looks!).',
      'Don\'t forget: your gallery is saved right on this device. Tap on any drawing to see it big, or download it to save a copy to your Photos.',
    ],
  },
};
