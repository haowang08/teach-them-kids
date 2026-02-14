import type { Topic } from '../types';

export const colorsLightIllusions: Topic = {
  id: 'colors-light-illusions',
  slug: 'colors-light-illusions',
  title: 'Colors, Light & Optical Illusions',
  subtitle:
    'How Your Eyes Trick Your Brain',
  status: 'active',
  themeId: 'colors-light-illusions',
  heroIcons: ['\u{1F308}', '\u{1F441}\uFE0F', '\u2728'],
  navItems: [
    { id: 'color-science', icon: '\u{1F308}', label: 'The Science of Color' },
    { id: 'optical-illusions', icon: '\u{1F441}\uFE0F', label: 'Optical Illusions' },
    { id: 'illusion-artists', icon: '\u{1F3A8}', label: 'Famous Illusion Artists' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F308}',
      title: 'Welcome to the World of Color and Illusion!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever looked at a picture and sworn that it was moving, even though you knew it was just a flat image on a page? Or wondered why the sky is blue but sunsets are orange? Welcome to the mind-bending world of colors, light, and optical illusions!',
            'Everything you see is actually your brain\'s best guess at what\'s out there. Light bounces off objects, enters your eyes, and your brain pieces together the image like a puzzle. But sometimes, your brain gets tricked, and that\'s when things get really interesting!',
            'In this adventure, you\'ll discover the science behind the rainbow, explore famous optical illusions that have amazed people for centuries, and meet the brilliant artists who turned visual tricks into breathtaking art. Get ready to question everything you see!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'UZ5UGnU7oOI',
          title: 'What Is Color?',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'l8_fZPHasdo',
          title: 'How We See Color',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: The Science of Color ─────────────────────────
    {
      id: 'color-science',
      icon: '\u{1F308}',
      title: 'The Science of Color: Painting with Light',
      readAloudBlocks: [
        {
          id: 'color-science-intro-text',
          paragraphs: [
            'Color isn\'t really "out there" in the world the way you might think. What we call color is actually our brain\'s way of interpreting different wavelengths of light! When white light from the sun passes through a prism or raindrops, it splits into a rainbow of colors called the visible light spectrum: red, orange, yellow, green, blue, indigo, and violet.',
            'Each color has a different wavelength. Red light has the longest wavelength, and violet has the shortest. When light hits an object, some wavelengths are absorbed and others bounce back to your eyes. A red apple looks red because it absorbs all colors except red, which it reflects back to you!',
            'There are two different systems of primary colors, and they work in completely different ways. With light, the primary colors are red, green, and blue (RGB). When you mix all three together, you get white light! That\'s how your TV and phone screens work. But with paint or ink, the primary colors are red, yellow, and blue (or more precisely, cyan, magenta, and yellow). When you mix all paint colors together, you get a dark muddy brown or black.',
            'Your eyes have special cells called cones that detect color. You have three types: ones that see red, ones that see green, and ones that see blue. Your brain mixes the signals from these three types of cones to create every color you can see. That\'s millions of different colors, all from just three types of detectors!',
            'Color also has a powerful effect on our emotions and behavior. Restaurants often use red and yellow in their decorations because these warm colors can make you feel hungry! Hospitals and doctors\' offices tend to use blue and green because these cool colors have a calming effect. Artists have understood the emotional power of color for centuries, carefully choosing their palettes to create specific moods in their paintings.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Mantis shrimp have 16 different types of color receptors in their eyes, compared to our measly three! Scientists believe they can see colors that humans can\'t even imagine, including ultraviolet light.',
        },
        {
          title: 'Fun Fact!',
          text: 'About 8% of men and 0.5% of women are color blind, meaning their cone cells don\'t work the usual way. The most common form makes it hard to tell the difference between red and green. But being color blind doesn\'t mean you see in black and white. You just see certain colors differently!',
        },
      ],
      videos: [],
      quizIds: ['color-q1a', 'color-q1b', 'color-q1c', 'color-q1d'],
    },

    // ─── Section 2: Optical Illusions ────────────────────────────
    {
      id: 'optical-illusions',
      icon: '\u{1F441}\uFE0F',
      title: 'Optical Illusions: When Your Brain Gets Tricked',
      readAloudBlocks: [
        {
          id: 'illusions-intro-text',
          paragraphs: [
            'An optical illusion is an image that tricks your brain into seeing something that isn\'t really there, or seeing something differently from how it actually is. But here\'s the amazing part: optical illusions aren\'t really failures of your eyes. They\'re actually clues about how your incredibly clever brain processes visual information!',
            'Your brain doesn\'t just passively receive images like a camera. It actively interprets and fills in gaps based on past experience. When you see a flat drawing of a cube, your brain automatically tries to make it three-dimensional because that\'s what cubes look like in real life. Illusions happen when the brain\'s shortcuts and assumptions lead to the wrong conclusion.',
            'There are three main types of optical illusions. Literal illusions create images that are different from the objects that make them, like seeing shapes in clouds. Physiological illusions happen when your eyes get overstimulated by brightness, color, or movement, like seeing spots after looking at a bright light. And cognitive illusions occur when your brain makes unconscious assumptions about what it\'s seeing, filling in gaps that lead to incorrect conclusions.',
            'Some of the most famous optical illusions have been puzzling people for over a hundred years. The M\u00fcller-Lyer illusion uses arrows to make two lines of equal length look different. The Rubin vase can be seen as either a vase or two faces looking at each other. And the Necker cube appears to flip back and forth between two orientations because your brain can\'t decide which way it\'s facing!',
            'Impossible objects are some of the most mind-bending illusions of all. These are drawings that look like real three-dimensional objects at first glance, but when you look more carefully, you realize they could never exist in the real world. The Penrose triangle, created by mathematician Roger Penrose, is a triangle made of three straight beams that connect in a way that\'s physically impossible. The Penrose staircase goes up and up and up, and somehow ends up right back where it started!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The famous "spinning dancer" illusion shows a silhouette of a dancer that some people see spinning clockwise and others see spinning counterclockwise. You can actually train yourself to switch the direction by focusing on different parts of the image! It shows how your brain makes decisions about depth and motion from limited information.',
        },
      ],
      videos: [
        {
          youtubeId: 'rfdJyDfIHIc',
          title: 'How Optical Illusions Trick Your Brain',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: '1xcvWSeZPbw',
          title: 'Why Do We See Illusions?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['color-q2a', 'color-q2b', 'color-q2c'],
    },

    // ─── Section 3: Famous Illusion Artists ──────────────────────
    {
      id: 'illusion-artists',
      icon: '\u{1F3A8}',
      title: 'Famous Illusion Artists: Masters of Visual Trickery',
      readAloudBlocks: [
        {
          id: 'illusion-artists-intro-text',
          paragraphs: [
            'Throughout history, some brilliant artists have devoted their careers to exploring the boundaries between what we see and what we think we see. They\'ve used mathematics, geometry, and a deep understanding of how the human eye works to create art that seems to shimmer, move, and defy the laws of physics.',
            'The Op Art (short for Optical Art) movement of the 1960s was an entire art movement dedicated to creating visual illusions. Op Artists used precise geometric patterns, contrasting colors, and careful repetition to create paintings that appear to vibrate, pulse, and move before your very eyes, even though they\'re completely still!',
          ],
        },
        {
          id: 'illusion-artists-detail-text',
          paragraphs: [
            'M.C. Escher (1898\u20131972) was a Dutch artist who created some of the most mind-bending artwork in history. His lithographs and woodcuts feature impossible buildings where staircases lead both up and down simultaneously, hands that draw themselves into existence, and metamorphoses where one shape gradually transforms into a completely different one. Escher was fascinated by mathematics and used geometric concepts like tessellations (repeating patterns that fit together without gaps) to create his incredible works.',
            'Bridget Riley (born 1931) is a British artist and one of the leading figures of the Op Art movement. Her paintings use precise geometric patterns of lines, curves, and shapes in carefully chosen colors to create powerful visual effects. Her black-and-white paintings from the 1960s appear to ripple and wave like water, even though they\'re completely flat and still. When her work was first exhibited, some viewers reported feeling dizzy or seasick from the intense optical effects!',
            'Victor Vasarely (1906\u20131997), a Hungarian-French artist, is often called the "grandfather of Op Art." He spent decades experimenting with geometric shapes and color combinations to create paintings that appear to bulge, sink, and warp right before your eyes. His colorful grids of circles and squares seem to pop out of the canvas in three dimensions, even though they\'re completely flat. Vasarely believed that art should be accessible to everyone and created designs that were reproduced on posters, fabrics, and public spaces.',
            'The Op Art movement exploded in popularity after the 1965 exhibition "The Responsive Eye" at the Museum of Modern Art in New York. Suddenly, optical illusion art was everywhere, from museum walls to fashion runways. Designers started putting Op Art patterns on dresses, and the bold geometric designs became a defining look of the 1960s.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'M.C. Escher once said, "Are you really sure that a floor can\'t also be a ceiling?" His art constantly challenges us to question what we think we know about space and reality. His most famous work, "Relativity," shows a world where gravity works in three different directions at the same time!',
        },
      ],
      videos: [],
      quizIds: ['color-q3a', 'color-q3b', 'color-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Science of Color
    {
      id: 'color-q1a',
      sectionId: 'color-science',
      title: 'Quick Quiz Time!',
      question:
        'What happens when white light passes through a prism?',
      options: [
        { text: 'It turns black', isCorrect: false },
        { text: 'It splits into a rainbow of colors', isCorrect: true },
        { text: 'It becomes invisible', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'color-q1b',
      sectionId: 'color-science',
      title: 'Color Science Challenge!',
      question:
        'Why does a red apple look red?',
      options: [
        { text: 'It creates red light from inside', isCorrect: false },
        { text: 'It absorbs all colors except red, which it reflects back', isCorrect: true },
        { text: 'Red paint is mixed into the apple skin', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'color-q1c',
      sectionId: 'color-science',
      title: 'Light Mixing Quiz!',
      question:
        'What are the primary colors of light?',
      options: [
        { text: 'Red, yellow, and blue', isCorrect: false },
        { text: 'Red, green, and blue', isCorrect: true },
        { text: 'Cyan, magenta, and yellow', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'color-q1d',
      sectionId: 'color-science',
      title: 'Eye Science Quiz!',
      question:
        'How many types of color-detecting cone cells do human eyes have?',
      options: [
        { text: 'Two types', isCorrect: false },
        { text: 'Three types', isCorrect: true },
        { text: 'Sixteen types', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Optical Illusions
    {
      id: 'color-q2a',
      sectionId: 'optical-illusions',
      title: 'Illusion Quiz!',
      question:
        'What is an optical illusion?',
      options: [
        { text: 'A broken camera lens', isCorrect: false },
        { text: 'An image that tricks your brain into seeing something incorrectly', isCorrect: true },
        { text: 'A special type of painting technique', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'color-q2b',
      sectionId: 'optical-illusions',
      title: 'Impossible Objects Challenge!',
      question:
        'Who created the famous impossible triangle (Penrose triangle)?',
      options: [
        { text: 'M.C. Escher', isCorrect: false },
        { text: 'Roger Penrose', isCorrect: true },
        { text: 'Bridget Riley', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'color-q2c',
      sectionId: 'optical-illusions',
      title: 'Brain Tricks Quiz!',
      question:
        'The Rubin vase illusion can be seen as which two different images?',
      options: [
        { text: 'A vase or two faces', isCorrect: true },
        { text: 'A rabbit or a duck', isCorrect: false },
        { text: 'A young woman or an old woman', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Illusion Artists
    {
      id: 'color-q3a',
      sectionId: 'illusion-artists',
      title: 'Artist Quiz!',
      question:
        'What mathematical concept did M.C. Escher use to create repeating patterns with no gaps?',
      options: [
        { text: 'Fractions', isCorrect: false },
        { text: 'Tessellations', isCorrect: true },
        { text: 'Algebra', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'color-q3b',
      sectionId: 'illusion-artists',
      title: 'Op Art Challenge!',
      question:
        'What does "Op Art" stand for?',
      options: [
        { text: 'Opposite Art', isCorrect: false },
        { text: 'Optical Art', isCorrect: true },
        { text: 'Open Art', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'color-q3c',
      sectionId: 'illusion-artists',
      title: 'Final Illusion Quiz!',
      question:
        'What effect did Bridget Riley\'s black-and-white paintings have on some viewers at exhibitions?',
      options: [
        { text: 'They made people laugh', isCorrect: false },
        { text: 'They made some viewers feel dizzy or seasick', isCorrect: true },
        { text: 'They put people to sleep', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'color-illusions-essay',
    prompt:
      'Describe an optical illusion that amazes you and explain how it tricks your brain.',
    description:
      'Now it\'s your turn to be an illusion expert! Think about an optical illusion you\'ve seen, whether it\'s one from this lesson or one you\'ve discovered on your own. Describe what it looks like and try to explain why your brain gets fooled by it. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant analysis! Your illusion explanation has been saved. You\'re a true visual scientist!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'color-illusions-reward',
    title: 'Illusion Builder Workshop!',
    description:
      'You\'ve unlocked the Illusion Builder! Explore the world of optical illusions and discover how artists and scientists create mind-bending visual tricks.',
    lockMessage: 'Illusion Builder Locked!',
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
    type: 'illusion-builder',
    celebrationMessage:
      'MIND-BLOWING! You\'ve unlocked the Illusion Builder Workshop! You\'re a true master of visual trickery!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Visual Explorer!',
    paragraphs: [
      'Congratulations! You\'ve completed an incredible journey through the world of colors, light, and optical illusions!',
      'You learned that color is actually your brain\'s way of interpreting different wavelengths of light, and that a rainbow is what happens when white light splits into its component colors. You discovered that your eyes have three types of cone cells that work together to let you see millions of colors.',
      'You explored famous optical illusions like the M\u00fcller-Lyer lines, the Rubin vase, and the impossible Penrose triangle. You learned that illusions aren\'t failures of your eyes but rather fascinating clues about how your brain processes the visual world.',
      'You met M.C. Escher, who created impossible worlds with mathematical precision, and Bridget Riley, whose Op Art paintings seem to ripple and pulse with energy. You discovered how the Op Art movement turned visual science into stunning works of art.',
      'You also discovered Victor Vasarely, the grandfather of Op Art, whose colorful geometric grids seem to pop right off the canvas. The Responsive Eye exhibition of 1965 brought illusion art to the masses and changed fashion and design forever.',
      'Remember, every time your brain gets tricked by an illusion, it\'s actually showing you how incredibly powerful and creative it is. Your brain is constantly making predictions and filling in gaps to help you understand the world. Illusions are just moments when those predictions don\'t quite match reality.',
      'The next time you see a rainbow, a visual trick, or a piece of art that makes your eyes do a double take, you\'ll know the science and artistry behind the magic. Keep looking, keep questioning, and keep being amazed!',
    ],
  },
};
