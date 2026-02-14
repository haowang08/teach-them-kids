import type { Topic } from '../types';

export const mysteriousPaintings: Topic = {
  id: 'mysterious-paintings',
  slug: 'mysterious-paintings',
  title: 'The World\'s Most Mysterious Paintings',
  subtitle:
    'Secrets Hidden in Famous Art',
  status: 'active',
  themeId: 'mysterious-paintings',
  heroIcons: ['\u{1F5BC}\uFE0F', '\u{1F50D}', '\u{1F3A8}'],
  navItems: [
    { id: 'mona-lisa', icon: '\u{1F5BC}\uFE0F', label: 'The Mona Lisa' },
    { id: 'masterpieces', icon: '\u{1F31F}', label: 'Mysterious Masterpieces' },
    { id: 'forgeries', icon: '\u{1F575}\uFE0F', label: 'Forgeries & Stolen Art' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F50D}',
      title: 'Welcome, Young Art Detective!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever looked at a painting and wondered what secrets it might be hiding? Throughout history, artists have tucked mysteries, hidden messages, and secret symbols into their masterpieces. Some of these puzzles have taken hundreds of years to solve, and some remain unsolved to this day!',
            'In this adventure, you\'ll become an art detective. You\'ll investigate the world\'s most famous painting and its many mysteries, discover hidden details in masterpieces that most people walk right past, and learn about daring art heists and cunning forgers who fooled the entire art world.',
            'Get your magnifying glass ready, because we\'re about to uncover secrets that have been hiding in plain sight for centuries!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'yRK_uCMwZPY',
          title: 'Why is the Mona Lisa so famous?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: The Mona Lisa Mysteries ─────────────────────
    {
      id: 'mona-lisa',
      icon: '\u{1F5BC}\uFE0F',
      title: 'The Mona Lisa Mysteries',
      readAloudBlocks: [
        {
          id: 'mona-lisa-intro-text',
          paragraphs: [
            'The Mona Lisa by Leonardo da Vinci is the most famous painting in the world. Every year, millions of visitors crowd into the Louvre Museum in Paris just to catch a glimpse of her mysterious smile. But what makes this particular portrait so special? The answer lies in the many mysteries that surround it.',
            'Who is the woman in the painting? Most historians believe she is Lisa Gherardini, the wife of a wealthy Florentine merchant named Francesco del Giocondo. That\'s why the painting is also called "La Gioconda." But some researchers think it could be someone else entirely, or even a hidden self-portrait of Leonardo himself!',
            'Then there\'s her famous smile. Is she happy? Sad? Amused? Scientists have discovered that her expression actually changes depending on where you look! When you focus on her eyes, she seems to be smiling. But when you look directly at her mouth, the smile seems to fade. Leonardo used a special painting technique called "sfumato," which means "smoky," to blur the corners of her eyes and mouth so subtly that her expression seems to shift.',
          ],
        },
        {
          id: 'mona-lisa-hidden-text',
          paragraphs: [
            'Modern technology has revealed even more secrets. Using special scanning equipment, French scientist Pascal Cotte discovered a hidden portrait underneath the Mona Lisa! This earlier version shows a different woman, without the famous smile, suggesting Leonardo changed his mind during the painting process.',
            'In 1911, the Mona Lisa was stolen right off the wall of the Louvre by an Italian handyman named Vincenzo Peruggia, who hid in the museum overnight and walked out with the painting under his coat! The theft made headlines around the world and actually helped make the painting even more famous. It was missing for over two years before being recovered in Florence, Italy.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3A8}',
          name: 'Leonardo da Vinci',
          title: 'The Ultimate Renaissance Genius',
          description:
            'Leonardo da Vinci was not just a painter. He was an inventor, scientist, engineer, and musician all rolled into one! He filled thousands of notebook pages with drawings of flying machines, anatomical studies, and inventions centuries ahead of his time. He worked on the Mona Lisa for about 16 years, carrying it with him everywhere and constantly adding tiny details.',
          extraTag: 'Lived: 1452\u20131519',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Mona Lisa has her own mailbox at the Louvre because she receives so many love letters and fan mail from visitors around the world! She even has her own security detail and sits behind bulletproof glass.',
        },
      ],
      videos: [
        {
          youtubeId: 'pM_IzEAv5d4',
          title: 'Why is Vermeer\'s "Girl with the Pearl Earring" considered a masterpiece?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['mp-q1a', 'mp-q1b', 'mp-q1c', 'mp-q1d'],
    },

    // ─── Section 2: Mysterious Masterpieces ─────────────────────
    {
      id: 'masterpieces',
      icon: '\u{1F31F}',
      title: 'Mysterious Masterpieces',
      readAloudBlocks: [
        {
          id: 'masterpieces-intro-text',
          paragraphs: [
            'The Mona Lisa isn\'t the only painting hiding secrets. Some of the world\'s most beloved artworks have mysteries that continue to puzzle experts to this day. Let\'s investigate three of the most intriguing ones!',
            'First up is "Girl with a Pearl Earring" by Johannes Vermeer, painted around 1665. Often called the "Mona Lisa of the North," this painting shows a young woman turning toward us with a large pearl earring catching the light. But who is she? Vermeer left no record of the girl\'s identity. And here\'s a twist: scientists now believe the giant pearl is probably fake! A real pearl that size would have been impossibly expensive. It was likely a polished glass or tin drop coated in varnish to mimic a pearl\'s glow.',
            'Next is "The Scream" by Edvard Munch, created in 1893. The figure in the painting isn\'t actually screaming! Munch wrote in his diary that he was walking at sunset when the sky turned blood red and he "sensed an infinite scream passing through nature." The wavy figure is actually covering its ears, overwhelmed by the scream of nature around it. The blood-red sky may have been inspired by the 1883 eruption of Krakatoa, which turned sunsets vivid red across Europe for months.',
          ],
        },
        {
          id: 'masterpieces-starry-text',
          paragraphs: [
            'Finally, there\'s "The Starry Night" by Vincent van Gogh, painted in 1889 while he was staying at a mental health asylum in southern France. Van Gogh painted the swirling night sky from his window, but he added the village below from his imagination. Here\'s the amazing hidden detail: scientists discovered that the swirling patterns in the painting perfectly match the mathematical patterns of turbulence, a concept that physicists still struggle to fully understand! Van Gogh somehow captured one of science\'s most complex ideas purely through artistic intuition.',
            'Van Gogh himself thought The Starry Night was a failure. In a letter to his friend, he called it too abstract. Today, it\'s one of the most recognized paintings in the world, visited by millions at the Museum of Modern Art in New York City.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F48E}',
          name: 'Johannes Vermeer',
          title: 'The Master of Light',
          description:
            'Vermeer was a Dutch painter who created only about 34 known paintings in his entire life. He was a master of capturing light, making his scenes glow with an almost magical quality. After his death, he was nearly forgotten for almost 200 years until art critics rediscovered his genius in the 1860s!',
          extraTag: 'Lived: 1632\u20131675',
        },
        {
          emoji: '\u{1F30C}',
          name: 'Vincent van Gogh',
          title: 'The Starry Night Dreamer',
          description:
            'Van Gogh created over 2,000 artworks in just ten years, yet he sold only one painting during his lifetime! He struggled with mental illness throughout his life but channeled his emotions into incredibly powerful art. Today, his paintings sell for tens of millions of dollars, and he is considered one of the greatest artists who ever lived.',
          extraTag: 'Lived: 1853\u20131890',
        },
        {
          emoji: '\u{1F30A}',
          name: 'Edvard Munch',
          title: 'The Artist of Anxiety',
          description:
            'Norwegian painter Edvard Munch created art that expressed deep human emotions like fear, loneliness, and love. "The Scream" has been stolen twice from museums and recovered both times! Munch actually created four versions of The Scream: two paintings and two pastels. One of the pastel versions sold at auction for nearly 120 million dollars in 2012.',
          extraTag: 'Lived: 1863\u20131944',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Van Gogh\'s painting "The Starry Night" captures real scientific turbulence patterns so accurately that mathematicians have studied it alongside the work of physicist Andrei Kolmogorov. Van Gogh painted this masterpiece during one of his most troubled periods, yet his brushstrokes contain a mathematical order that scientists are still trying to fully explain!',
        },
      ],
      videos: [
        {
          youtubeId: 'teJAmgiMVIo',
          title: 'Why is "The Scream" screaming?',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'PMerSm2ToFY',
          title: 'The unexpected math behind Van Gogh\'s "Starry Night"',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['mp-q2a', 'mp-q2b', 'mp-q2c'],
    },

    // ─── Section 3: Art Forgeries & Stolen Art ──────────────────
    {
      id: 'forgeries',
      icon: '\u{1F575}\uFE0F',
      title: 'Art Forgeries & Stolen Art',
      readAloudBlocks: [
        {
          id: 'forgeries-intro-text',
          paragraphs: [
            'Some of the most thrilling mysteries in the art world involve daring heists and cunning fakes. Art crime is a multi-billion dollar business, and some of the stories are stranger than fiction!',
            'On the night of March 18, 1990, two men dressed as police officers knocked on the door of the Isabella Stewart Gardner Museum in Boston, Massachusetts. They told the night guards they were responding to a disturbance call. Once inside, they tied up the guards and spent 81 minutes carefully removing 13 works of art worth an estimated 500 million dollars. The stolen works included paintings by Vermeer, Rembrandt, and Degas. To this day, not a single piece has been recovered, and the empty frames still hang on the museum walls as a reminder. The museum offers a 10-million-dollar reward for information leading to their return!',
            'Then there\'s the incredible story of Han van Meegeren, a Dutch painter who became one of history\'s most famous art forgers. Bitter that critics rejected his original work, van Meegeren spent six years perfecting the art of faking Vermeer paintings. He mixed his own paints using 17th-century recipes, bought old canvases, and even baked his finished paintings in an oven to crack them like genuine antiques!',
          ],
        },
        {
          id: 'forgeries-outro-text',
          paragraphs: [
            'Van Meegeren\'s most audacious move was selling a fake Vermeer to Nazi leader Hermann G\u00F6ring during World War II. After the war, van Meegeren was arrested for selling a Dutch national treasure to the enemy. His defense? He painted it himself! To prove it, he was forced to paint another "Vermeer" in his jail cell while officials watched. His forgeries had fooled the world\'s greatest art experts for years.',
            'These stories remind us that the art world is full of secrets, deceptions, and unsolved mysteries. Every painting has a story, and sometimes the most fascinating tales are the ones we haven\'t figured out yet. Keep your detective instincts sharp, because you never know what hidden secrets might be waiting in the next painting you see!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3A8}',
          name: 'Han van Meegeren',
          title: 'The Master Forger',
          description:
            'Han van Meegeren was a Dutch painter who became one of history\'s greatest art forgers. Rejected by critics as an artist, he spent years learning to perfectly copy the style of the Old Masters. He made millions selling fake Vermeers and even tricked the Nazis! When put on trial, he had to prove he was a forger to save his life. His story shows how even experts can be fooled.',
          extraTag: 'Lived: 1889\u20131947',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Isabella Stewart Gardner Museum heist in 1990 is the largest unsolved art theft in history. The stolen artworks are estimated to be worth over 500 million dollars today. The museum still displays the empty frames where the stolen paintings once hung, waiting for the day they might return!',
        },
      ],
      videos: [
        {
          youtubeId: 'Y5JdbuBe6SY',
          title: 'The art forger who tricked the Nazis',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: '6aKUQr4YTgE',
          title: 'The strange history of the world\'s most stolen painting',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['mp-q3a', 'mp-q3b', 'mp-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Mona Lisa
    {
      id: 'mp-q1a',
      sectionId: 'mona-lisa',
      title: 'Quick Quiz Time!',
      question:
        'What special painting technique did Leonardo da Vinci use to make the Mona Lisa\'s smile seem to change?',
      options: [
        { text: 'Impasto, using thick layers of paint', isCorrect: false },
        {
          text: 'Sfumato, meaning "smoky," to blur edges softly',
          isCorrect: true,
        },
        { text: 'Pointillism, using tiny dots of color', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mp-q1b',
      sectionId: 'mona-lisa',
      title: 'Mona Lisa Mystery!',
      question:
        'Who is believed to be the woman in the Mona Lisa?',
      options: [
        { text: 'A queen of France', isCorrect: false },
        { text: 'Leonardo\'s mother', isCorrect: false },
        {
          text: 'Lisa Gherardini, wife of a Florentine merchant',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mp-q1c',
      sectionId: 'mona-lisa',
      title: 'Art Heist Challenge!',
      question:
        'In 1911, who stole the Mona Lisa from the Louvre?',
      options: [
        {
          text: 'Vincenzo Peruggia, an Italian handyman',
          isCorrect: true,
        },
        { text: 'A team of international art thieves', isCorrect: false },
        { text: 'A rival artist who wanted revenge', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mp-q1d',
      sectionId: 'mona-lisa',
      title: 'Hidden Secrets Quiz!',
      question:
        'What did French scientist Pascal Cotte discover hidden underneath the Mona Lisa using special scanning equipment?',
      options: [
        { text: 'A secret map of Florence', isCorrect: false },
        { text: 'An earlier portrait of a different woman', isCorrect: true },
        { text: 'A written message from Leonardo', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Masterpieces
    {
      id: 'mp-q2a',
      sectionId: 'masterpieces',
      title: 'Quick Quiz Time!',
      question:
        'In "The Scream" by Edvard Munch, what is the figure in the painting actually doing?',
      options: [
        { text: 'Screaming at the top of their lungs', isCorrect: false },
        {
          text: 'Covering their ears from a scream passing through nature',
          isCorrect: true,
        },
        { text: 'Calling out to a friend on the bridge', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mp-q2b',
      sectionId: 'masterpieces',
      title: 'Pearl Earring Mystery!',
      question:
        'What do scientists now believe about the pearl in Vermeer\'s "Girl with a Pearl Earring"?',
      options: [
        { text: 'It was a priceless diamond in disguise', isCorrect: false },
        { text: 'It was a real pearl from the East Indies', isCorrect: false },
        {
          text: 'It was probably a fake made from polished glass or tin',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mp-q2c',
      sectionId: 'masterpieces',
      title: 'Starry Night Challenge!',
      question:
        'What amazing scientific pattern did researchers discover in Van Gogh\'s "The Starry Night"?',
      options: [
        { text: 'Hidden constellation maps', isCorrect: false },
        {
          text: 'Mathematical patterns of turbulence',
          isCorrect: true,
        },
        { text: 'Secret musical notes in the brushstrokes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Forgeries
    {
      id: 'mp-q3a',
      sectionId: 'forgeries',
      title: 'Quick Quiz Time!',
      question:
        'How many artworks were stolen from the Isabella Stewart Gardner Museum in 1990?',
      options: [
        { text: '5 works of art', isCorrect: false },
        { text: '13 works of art', isCorrect: true },
        { text: '27 works of art', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mp-q3b',
      sectionId: 'forgeries',
      title: 'Forger Challenge!',
      question:
        'How did Han van Meegeren prove in court that he was an art forger and not a traitor?',
      options: [
        { text: 'He showed photographs of himself painting the fakes', isCorrect: false },
        {
          text: 'He painted another fake Vermeer in his jail cell while officials watched',
          isCorrect: true,
        },
        { text: 'He confessed and named all his accomplices', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mp-q3c',
      sectionId: 'forgeries',
      title: 'Final Mystery!',
      question:
        'What does the Isabella Stewart Gardner Museum still display where the stolen paintings once hung?',
      options: [
        { text: 'Copies of the stolen paintings', isCorrect: false },
        { text: 'Photographs of the original works', isCorrect: false },
        {
          text: 'The empty frames, waiting for the art to return',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'mp-essay',
    prompt:
      'If the Mona Lisa could talk, what do you think she would say?',
    description:
      'Now it\'s your turn to be creative! Imagine the Mona Lisa could suddenly speak after 500 years of silence. What would she tell us? Would she reveal who she really is? Explain her mysterious smile? Complain about the crowds? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant detective work! Your answer has been saved. You\'re a true art mystery solver!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'mp-reward',
    title: 'Unlock the Art Detective Badge!',
    description:
      'You\'ve solved the mysteries and proven yourself as a top-notch art detective! Unlock your special interactive art investigation tool and explore hidden details in famous paintings.',
    lockMessage: 'Art Detective Case Locked!',
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
    type: 'art-detective',
    celebrationMessage:
      'INCREDIBLE! You\'ve earned the Art Detective Badge! You\'ve uncovered secrets that took experts centuries to find!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Case Closed, Detective!',
    paragraphs: [
      'Congratulations! You\'ve completed your investigation into the world\'s most mysterious paintings!',
      'You discovered the many mysteries of the Mona Lisa: her shifting smile created by Leonardo\'s sfumato technique, the hidden portrait beneath the paint, and the daring 1911 theft that made her a global celebrity. You learned that Leonardo worked on this single painting for about 16 years!',
      'You investigated mysterious masterpieces like the "Girl with a Pearl Earring" and her probably-fake pearl, "The Scream" where the figure isn\'t actually screaming but hearing nature\'s cry, and "The Starry Night" with its scientifically perfect turbulence patterns painted by a troubled genius.',
      'And you explored the shadowy world of art crime, from the unsolved 500-million-dollar Gardner Museum heist to Han van Meegeren, the forger who tricked the Nazis and had to prove his own guilt to save his life.',
      'Keep looking closely at art wherever you go. You never know what mysteries might be hiding in the next painting you see!',
    ],
  },
};
