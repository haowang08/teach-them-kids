import type { Topic } from '../types';

export const streetArt: Topic = {
  id: 'street-art',
  slug: 'street-art',
  title: 'Street Art Superstars',
  subtitle:
    'From Graffiti to Gallery Walls',
  status: 'active',
  themeId: 'street-art',
  heroIcons: ['\u{1F3A8}', '\u{1F5BC}\uFE0F', '\u2728'],
  navItems: [
    { id: 'history', icon: '\u{1F3A8}', label: 'History of Street Art' },
    { id: 'artists', icon: '\u{1F5BC}\uFE0F', label: 'Famous Street Artists' },
    { id: 'techniques', icon: '\u{1F6E0}\uFE0F', label: 'Street Art Techniques' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3A8}',
      title: 'Welcome to the World of Street Art!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever walked down a street and noticed a giant, colorful painting covering an entire building? Or seen a clever stencil on a wall that made you stop and think? That\'s street art, and it\'s one of the most exciting forms of creativity in the world today!',
            'Street art is art that\'s made in public places, like walls, sidewalks, bridges, and buildings. It can be a tiny sticker on a lamppost or a mural that stretches across an entire city block. Some people think it\'s the most important art movement of our time, while others debate whether it\'s art or vandalism.',
            'In this adventure, you\'ll discover how street art grew from underground graffiti into a global phenomenon. You\'ll meet legendary artists who changed the game, and learn the cool techniques they use to create their masterpieces. Let\'s hit the streets!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'JX02QQXfb_o',
          title: 'The Chaotic Brilliance of Artist Jean-Michel Basquiat',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: History of Street Art ────────────────────────
    {
      id: 'history',
      icon: '\u{1F3A8}',
      title: 'The History of Street Art',
      readAloudBlocks: [
        {
          id: 'history-intro-text',
          paragraphs: [
            'Street art didn\'t just appear overnight. It has deep roots that stretch back decades, starting in the gritty subway tunnels and brick walls of New York City. In the 1970s and 1980s, young artists began tagging their names on subway cars and buildings. What started as simple signatures evolved into elaborate, colorful pieces that turned the city into an open-air gallery.',
            'New York City\'s subway system became a rolling canvas. Artists like TAKI 183 and CORNBREAD became famous for getting their tags seen all over the city. Soon, the movement exploded, and talented artists began creating much more than just names. They painted full murals, wild-style lettering, and characters that told stories about their communities.',
            'Two artists from this era stand out as true pioneers who helped bridge the gap between street art and the fine art world: Keith Haring and Jean-Michel Basquiat. Both started on the streets of New York and ended up in the most prestigious galleries on earth.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3A8}',
          name: 'Keith Haring',
          title: 'The Subway Art Revolutionary',
          description:
            'Keith Haring began his art career by drawing with white chalk on the blank black advertising panels in New York City subway stations. His bold, simple figures of dancing people, barking dogs, and radiant babies became iconic symbols recognized around the world. Haring believed art should be for everyone, not just rich collectors in fancy galleries. He created over 50 public artworks and opened a Pop Shop where anyone could buy his art affordably. Sadly, he passed away in 1990 at just 31, but his joyful art lives on everywhere.',
          extraTag: 'Known for: Dancing figures and radiant babies',
        },
        {
          emoji: '\u{1F451}',
          name: 'Jean-Michel Basquiat',
          title: 'From SAMO to Superstar',
          description:
            'Jean-Michel Basquiat started as a graffiti artist in New York City, writing mysterious phrases under the tag SAMO (Same Old thing). His raw, expressive paintings mixed words, symbols, skulls, and references to African American history. By his early twenties, he had gone from sleeping on park benches to selling paintings for millions of dollars. He became friends with Andy Warhol and was the first Black American artist to achieve international superstardom in the contemporary art world. He passed away in 1988 at only 27 years old.',
          extraTag: 'Known for: Neo-expressionist paintings with text and symbols',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In the early 1980s, New York City spent over $300 million trying to remove graffiti from subway cars. But the more they cleaned, the more artists painted! It became a constant cat-and-mouse game between the city and the graffiti writers.',
        },
      ],
      videos: [
        {
          youtubeId: 'FVOldfcU5F4',
          title: 'The Story of Graffiti',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'uKrqJdZQGNM',
          title: 'Street Art Around the World',
          channelName: 'Art History',
        },
      ],
      quizIds: ['street-q1a', 'street-q1b', 'street-q1c', 'street-q1d'],
    },

    // ─── Section 2: Famous Street Artists ────────────────────────
    {
      id: 'artists',
      icon: '\u{1F5BC}\uFE0F',
      title: 'Famous Street Artists Who Changed the World',
      readAloudBlocks: [
        {
          id: 'artists-intro-text',
          paragraphs: [
            'Street art has produced some of the most fascinating and mysterious artists of our time. Some hide behind masks and aliases, while others have become international celebrities. What they all share is a passion for bringing art out of museums and into the everyday world where anyone can enjoy it.',
            'From anonymous pranksters to world-famous muralists, these artists have turned city walls into canvases and challenged what we think art should be. Let\'s meet some of the biggest names in street art!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3AD}',
          name: 'Banksy',
          title: 'The Mystery Artist',
          description:
            'Banksy is the world\'s most famous street artist, and nobody knows who he really is! Working in secret, usually at night, Banksy creates witty stencil artworks that comment on war, poverty, politics, and consumer culture. His pieces have appeared on walls from London to Palestine to New York City. In 2018, one of his paintings famously shredded itself right after selling at auction for over one million pounds! Despite his anonymity, his art sells for millions and has appeared in major museums worldwide.',
          extraTag: 'Known for: Satirical stencil art and secret identity',
        },
        {
          emoji: '\u2B50',
          name: 'Shepard Fairey',
          title: 'Obey the Giant',
          description:
            'Shepard Fairey started his street art career with a simple sticker campaign featuring the face of wrestler Andr\u00e9 the Giant and the word "OBEY." What began as a skateboarding inside joke became one of the most recognizable images in street art history. Fairey later created the iconic "Hope" poster of Barack Obama during the 2008 presidential campaign, proving that street art could influence politics and pop culture on a massive scale. He founded the clothing brand OBEY and continues to create powerful political art.',
          extraTag: 'Known for: OBEY Giant and the Obama Hope poster',
        },
        {
          emoji: '\u{1F308}',
          name: 'Os G\u00eameos',
          title: 'The Twin Brothers from Brazil',
          description:
            'Os G\u00eameos (which means "The Twins" in Portuguese) are identical twin brothers Gustavo and Otavio Pandolfo from S\u00e3o Paulo, Brazil. They paint enormous, dreamlike murals featuring yellow-skinned characters in fantastical worlds. Their art is inspired by Brazilian hip-hop culture, folk art, and their own vivid imaginations. They\'ve painted giant murals on buildings, trains, and even a Boeing 737 airplane for the 2014 World Cup! Their colorful, surreal style has made them two of the most beloved street artists on the planet.',
          extraTag: 'Known for: Giant yellow characters and dreamlike murals',
        },
        {
          emoji: '\u{1F47E}',
          name: 'Invader',
          title: 'The Pixel Art Invader',
          description:
            'The French artist known as Invader creates mosaic artworks inspired by the 1978 arcade game Space Invaders. Using small ceramic tiles, he installs pixelated characters on buildings in cities around the world. He\'s "invaded" over 80 cities across six continents! Each invasion is carefully documented and scored like a video game. He even sent one of his artworks to the International Space Station, making him the first street artist in outer space!',
          extraTag: 'Known for: Pixelated mosaic tile invasions',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Banksy once snuck his own artwork into major museums, including the Louvre in Paris and the Metropolitan Museum of Art in New York, and hung them on the walls without anyone noticing! Some stayed up for days before museum staff discovered them.',
        },
      ],
      videos: [],
      quizIds: ['street-q2a', 'street-q2b', 'street-q2c'],
    },

    // ─── Section 3: Street Art Techniques ────────────────────────
    {
      id: 'techniques',
      icon: '\u{1F6E0}\uFE0F',
      title: 'Street Art Techniques: How It\'s Made',
      readAloudBlocks: [
        {
          id: 'techniques-intro-text',
          paragraphs: [
            'Street artists are incredibly creative, not just in what they make, but in how they make it. From high-tech stencils to old-fashioned wheat paste, the methods used in street art are as diverse as the artists themselves. Some techniques allow artists to work quickly (very important when you might get caught!), while others require days of careful planning and teamwork.',
            'Let\'s explore the most popular street art techniques and discover how these amazing works come to life on the streets!',
          ],
        },
        {
          id: 'techniques-detail-text',
          paragraphs: [
            'Stencils are one of the most popular street art techniques because they allow artists to create detailed, repeatable images very quickly. The artist cuts a design out of cardboard, plastic, or metal, holds it against a wall, and sprays paint over it. Banksy is the most famous stencil artist, and he can create an entire artwork in just minutes!',
            'Wheat pasting is another classic technique. Artists print or paint their artwork on thin paper, then use a paste made from flour and water (like wallpaper paste) to glue it to walls. This method lets artists prepare detailed work in their studios and then quickly install it on the street.',
            'Large-scale murals are the biggest and most ambitious form of street art. These can cover entire buildings and take days or even weeks to complete. Artists often use cherry pickers, scaffolding, and hundreds of cans of spray paint. Cities around the world now commission muralists to brighten up neighborhoods.',
            'Yarn bombing is one of the most unexpected forms of street art. Instead of paint, yarn bombers wrap trees, lampposts, benches, and even buses in colorful knitted or crocheted coverings! It started in Texas in 2005 when a knit shop owner named Magda Sayeg wrapped her door handle in yarn. Now yarn bombing happens in cities all over the world, turning ordinary objects into cozy, colorful sculptures.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The world\'s largest mural covers over 200,000 square feet on the side of a building in S\u00e3o Paulo, Brazil. It took artist Eduardo Kobra and his team over two months and 3,000 cans of spray paint to complete!',
        },
      ],
      videos: [],
      quizIds: ['street-q3a', 'street-q3b', 'street-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: History
    {
      id: 'street-q1a',
      sectionId: 'history',
      title: 'Quick Quiz Time!',
      question:
        'In which city did the modern street art and graffiti movement begin in the 1970s?',
      options: [
        { text: 'Los Angeles', isCorrect: false },
        { text: 'New York City', isCorrect: true },
        { text: 'London', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q1b',
      sectionId: 'history',
      title: 'Art Pioneer Challenge!',
      question:
        'Where did Keith Haring first create his famous chalk drawings?',
      options: [
        { text: 'On canvas in his studio', isCorrect: false },
        { text: 'On blank advertising panels in subway stations', isCorrect: true },
        { text: 'On the walls of art galleries', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q1c',
      sectionId: 'history',
      title: 'Basquiat Quiz!',
      question:
        'What graffiti tag did Jean-Michel Basquiat use before becoming a famous painter?',
      options: [
        { text: 'KAWS', isCorrect: false },
        { text: 'SAMO', isCorrect: true },
        { text: 'OBEY', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q1d',
      sectionId: 'history',
      title: 'Street Art Origins!',
      question:
        'What part of New York City\'s transportation system became a famous canvas for early graffiti artists?',
      options: [
        { text: 'Taxi cabs', isCorrect: false },
        { text: 'Subway cars', isCorrect: true },
        { text: 'City buses', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Famous Artists
    {
      id: 'street-q2a',
      sectionId: 'artists',
      title: 'Mystery Artist Quiz!',
      question:
        'What makes Banksy unique compared to most other famous artists?',
      options: [
        { text: 'He only paints in one color', isCorrect: false },
        { text: 'Nobody knows his real identity', isCorrect: true },
        { text: 'He only works indoors', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q2b',
      sectionId: 'artists',
      title: 'OBEY Challenge!',
      question:
        'What famous political poster did Shepard Fairey create during the 2008 presidential campaign?',
      options: [
        { text: 'The "Change" poster', isCorrect: false },
        { text: 'The "Hope" poster of Barack Obama', isCorrect: true },
        { text: 'The "Freedom" poster', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q2c',
      sectionId: 'artists',
      title: 'Pixel Art Quiz!',
      question:
        'What classic arcade game inspired the French artist Invader\'s mosaic artworks?',
      options: [
        { text: 'Pac-Man', isCorrect: false },
        { text: 'Space Invaders', isCorrect: true },
        { text: 'Tetris', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Techniques
    {
      id: 'street-q3a',
      sectionId: 'techniques',
      title: 'Technique Quiz!',
      question:
        'Why are stencils a popular technique for street artists?',
      options: [
        { text: 'They are the cheapest option', isCorrect: false },
        { text: 'They allow artists to create detailed images very quickly', isCorrect: true },
        { text: 'They are the only legal method', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q3b',
      sectionId: 'techniques',
      title: 'Wheat Paste Challenge!',
      question:
        'What is wheat pasting in street art?',
      options: [
        { text: 'Painting directly on wheat fields', isCorrect: false },
        { text: 'Gluing printed artwork to walls using a flour-based paste', isCorrect: true },
        { text: 'Carving designs into wooden surfaces', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q3c',
      sectionId: 'techniques',
      title: 'Yarn Bombing Quiz!',
      question:
        'What material do yarn bombers use to create their street art?',
      options: [
        { text: 'Spray paint', isCorrect: false },
        { text: 'Ceramic tiles', isCorrect: false },
        { text: 'Knitted or crocheted yarn', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'street-art-essay',
    prompt:
      'If you could create street art anywhere in the world, what would you make and where?',
    description:
      'Now it\'s your turn to be a street artist! Imagine you have permission to create any kind of street art, anywhere on Earth. What would your artwork look like? What message would it share? Where would you put it and why? You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Amazing creativity! Your street art vision has been saved. You\'re a true street art superstar!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'street-art-reward',
    title: 'Virtual Spray Can Studio!',
    description:
      'You\'ve unlocked the Virtual Spray Can! Explore the world of street art and imagine creating your own colorful masterpiece on a city wall.',
    lockMessage: 'Spray Can Locked!',
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
    type: 'virtual-spray-can',
    celebrationMessage:
      'INCREDIBLE! You\'ve unlocked the Virtual Spray Can Studio! You\'re a true street art superstar!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Street Art Explorer!',
    paragraphs: [
      'Congratulations! You\'ve completed an amazing journey through the world of street art!',
      'You discovered how graffiti evolved from simple tags on New York subway cars into a worldwide art movement. You met Keith Haring, who brought joy to subway stations with his dancing figures, and Jean-Michel Basquiat, who went from writing SAMO on walls to selling paintings for millions.',
      'You learned about Banksy\'s secret identity and satirical stencils, Shepard Fairey\'s OBEY campaign and the Hope poster, Os G\u00eameos\' dreamlike yellow characters, and Invader\'s pixelated mosaic invasions across the globe.',
      'You explored the techniques of street art, from quick stencils and wheat paste to massive building-sized murals and cozy yarn bombing. Street art proves that creativity can happen anywhere and that art truly belongs to everyone.',
      'Keep your eyes open! The next time you walk down a street, you might spot a masterpiece hiding in plain sight!',
    ],
  },
};
