import type { Topic } from '../types';

export const learnToDrawKpop: Topic = {
  id: 'learn-to-draw-kpop',
  slug: 'learn-to-draw-kpop',
  title: 'Draw K-pop Chibi Stars',
  subtitle: 'Full-figure chibi drawings of 5 members from 5 different girl groups!',
  status: 'active',
  themeId: 'learn-to-draw',
  heroIcons: ['\u{1F3A4}', '\u{1F338}', '\u2728'],
  mode: 'activity',
  navItems: [
    { id: 'get-ready', icon: '\u{1F58D}\uFE0F', label: 'Get Ready' },
    { id: 'lisa', icon: '\u{1F338}', label: 'Lisa' },
    { id: 'nayeon', icon: '\u{1F36D}', label: 'Nayeon' },
    { id: 'minji', icon: '\u{1F430}', label: 'Minji' },
    { id: 'kazuha', icon: '\u{1F98B}', label: 'Kazuha' },
    { id: 'megan', icon: '\u{1F31F}', label: 'Megan' },
    { id: 'gallery', icon: '\u{1F4F7}', label: 'My Gallery' },
  ],
  activityPrompt: {
    title: 'Show off your drawing!',
    description:
      'Take a photo of your chibi drawing and add it to your gallery. It stays right here on your device — only you can see it.',
    completionLabel: 'Add another drawing',
  },
  sections: [
    {
      id: 'get-ready',
      icon: '\u{1F58D}\uFE0F',
      title: 'Grab your supplies!',
      readAloudBlocks: [
        {
          id: 'intro-kpop',
          paragraphs: [
            'Today we\'re drawing K-pop stars in chibi style — a Japanese word that means "short" or "small." Chibi means big head, tiny body, huge eyes, and maximum cuteness.',
            'All five videos teach the full figure with an outfit, not just a face. Pick your favorite group or try them all. You\'ll want a pencil, eraser, black pen for outlines, and markers or colored pencils. Ready? Let\'s go!',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },
    {
      id: 'lisa',
      icon: '\u{1F338}',
      title: 'Lisa \u2014 BLACKPINK',
      readAloudBlocks: [
        {
          id: 'lisa-intro',
          paragraphs: [
            'First up, Lisa from BLACKPINK — famous for her incredible dancing and her signature bangs.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'The first solo global artist from Thailand',
          text:
            'Lisa (full name Lalisa Manoban) grew up in Buriram, Thailand, and was the only non-Korean member to join BLACKPINK. She learned Korean, Japanese, and English as part of her training!',
        },
        {
          title: 'Her cats have their own fan club',
          text:
            'Lisa adores cats and has three of them — Leo, Luca, and Lily. Fans call them "Lloyds" and they have thousands of followers online.',
        },
      ],
      videos: [
        {
          youtubeId: '4KCsdEWpDJA',
          title: 'How to Draw Lisa (BLACKPINK)',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'nayeon',
      icon: '\u{1F36D}',
      title: 'Nayeon \u2014 TWICE',
      readAloudBlocks: [
        {
          id: 'nayeon-intro',
          paragraphs: [
            'Next, Nayeon from TWICE — drawn in her colorful "POP!" music video outfit.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'The first TWICE member to go solo',
          text:
            'Nayeon was the first member of TWICE to release a solo album. Her 2022 hit "POP!" became a viral trend on TikTok and reached #1 on the Billboard World Digital Song Sales chart.',
        },
        {
          title: 'Her bunny smile is world famous',
          text:
            'Fans gave Nayeon the nickname "bunny" because of her front teeth when she smiles. She even has bunny-themed merchandise because of it!',
        },
      ],
      videos: [
        {
          youtubeId: 'J7nNZoeNA6s',
          title: 'How to Draw Nayeon (TWICE) \u2014 POP! outfit',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'minji',
      icon: '\u{1F430}',
      title: 'Minji \u2014 NewJeans',
      readAloudBlocks: [
        {
          id: 'minji-intro',
          paragraphs: [
            'Now Minji from NewJeans — drawn as a Powerpuff Girl! This one is a crossover mashup of two super-cute styles.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'The leader of NewJeans',
          text:
            'Minji is the oldest member and the leader of NewJeans. The group is known for their Y2K fashion style — that\'s the cute early-2000s look with chunky sneakers, cropped jackets, and lots of pastel.',
        },
        {
          title: 'She was scouted on the street',
          text:
            'A talent scout discovered Minji when she was walking down the street in elementary school! She trained for about seven years before debuting with NewJeans in 2022.',
        },
      ],
      videos: [
        {
          youtubeId: 'jJp78-lLnpM',
          title: 'How to Draw Minji (NewJeans) as a Powerpuff Girl',
          channelName: 'Draw So Cute',
        },
      ],
      quizIds: [],
    },
    {
      id: 'kazuha',
      icon: '\u{1F98B}',
      title: 'Kazuha \u2014 LE SSERAFIM',
      readAloudBlocks: [
        {
          id: 'kazuha-intro',
          paragraphs: [
            'Kazuha from LE SSERAFIM — drawn alongside her official fluffy mascot, Zuharong.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'A trained ballerina',
          text:
            'Kazuha trained in classical ballet for over a decade at a prestigious school in the Netherlands before joining LE SSERAFIM. Her graceful moves make her dance solos unforgettable.',
        },
        {
          title: 'Zuharong is her butterfly sidekick',
          text:
            'Zuharong is Kazuha\'s personal mascot — a fluffy white character inspired by a Samoyed dog combined with butterflies. Each LE SSERAFIM member has her own animal character!',
        },
      ],
      videos: [
        {
          youtubeId: 'xOKROUr14V0',
          title: 'How to Draw Kazuha & Zuharong (LE SSERAFIM)',
          channelName: 'Davi Toons Club',
        },
      ],
      quizIds: [],
    },
    {
      id: 'megan',
      icon: '\u{1F31F}',
      title: 'Megan \u2014 KATSEYE',
      readAloudBlocks: [
        {
          id: 'megan-intro',
          paragraphs: [
            'Last but not least, Megan from KATSEYE — a global girl group with members from all around the world.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Chosen from 120,000 hopefuls',
          text:
            'Megan Skiendiel was picked from more than 120,000 people who auditioned for KATSEYE through a reality show called "Dream Academy." She\'s Singaporean-American and grew up in Hawaii!',
        },
        {
          title: 'KATSEYE stands for something',
          text:
            'The name KATSEYE comes from the "cat\'s-eye" marble — a rare, colorful marble loved by kids everywhere. Each member is supposed to be one of the colors inside.',
        },
      ],
      videos: [
        {
          youtubeId: 'QtwoSriskEM',
          title: 'How to Draw Megan from KATSEYE',
          channelName: 'Cute Easy Drawings',
        },
      ],
      quizIds: [],
    },
  ],
  quizzes: [],
  conclusion: {
    title: 'Amazing work!',
    paragraphs: [
      'Chibi style takes practice — those tiny hands and giant eyes are tricky! Come back and try a different member tomorrow, or redraw your favorite with a new outfit.',
      'Your gallery is saved on this device. Tap any drawing to see it bigger, or download it to keep forever.',
    ],
  },
};
