import type { Topic } from '../types';

export const artAroundTheWorld: Topic = {
  id: 'art-around-the-world',
  slug: 'art-around-the-world',
  title: 'Art From Around the World',
  subtitle:
    'A Global Journey Through Creativity',
  status: 'active',
  themeId: 'art-around-the-world',
  heroIcons: ['\u{1F30D}', '\u{1F3A8}', '\u{1F3AD}'],
  navItems: [
    { id: 'asian-art', icon: '\u{1F3EF}', label: 'Asian Art Traditions' },
    { id: 'african-islamic', icon: '\u{1F54C}', label: 'African & Islamic Art' },
    { id: 'indigenous-folk', icon: '\u{1F3A8}', label: 'Indigenous & Folk Art' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F30D}',
      title: 'Welcome to a Global Art Adventure!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Art is one of the things that makes us human. Every culture on every continent has created beautiful, meaningful art since the very beginning of civilization. From the delicate brush strokes of Japanese paintings to the bold geometric patterns of Islamic tiles, from the vibrant colors of Indian rangoli to the dreamtime stories told through Aboriginal dot paintings, art is a universal language that connects us all.',
            'In this adventure, we\'re going on a trip around the world without ever leaving our seats! You\'ll discover incredible art traditions from Asia, Africa, the Middle East, Australia, and the Americas. Each tradition has its own unique story, techniques, and meaning.',
            'The best part? Many of these art traditions are thousands of years old and are still practiced today. Artists around the world continue to honor their cultural heritage while also pushing boundaries and creating something new. Let\'s explore!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'pg1NpMmPv48',
          title: 'The Complex Geometry of Islamic Design',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Asian Art Traditions ─────────────────────────
    {
      id: 'asian-art',
      icon: '\u{1F3EF}',
      title: 'Asian Art Traditions: Beauty and Balance',
      readAloudBlocks: [
        {
          id: 'asian-art-intro-text',
          paragraphs: [
            'Asia is home to some of the oldest and most refined art traditions in the world. From Japan to China to India, Asian art reflects thousands of years of philosophy, spirituality, and a deep appreciation for nature and harmony. Let\'s explore three incredible art forms that have captivated people for centuries!',
          ],
        },
        {
          id: 'asian-art-ukiyoe-text',
          paragraphs: [
            'Japanese ukiyo-e, which means "pictures of the floating world," is a style of woodblock printing that flourished from the 1600s to the 1800s. These beautiful prints depicted everything from famous actors and beautiful landscapes to scenes of everyday life in Japan\'s bustling cities. The process was incredibly detailed: an artist would create the original drawing, a carver would carefully cut the design into wooden blocks (one block for each color!), and a printer would press the inked blocks onto paper by hand.',
            'The most famous ukiyo-e print in the world is "The Great Wave off Kanagawa" by Katsushika Hokusai, created around 1831. This iconic image of a towering wave with Mount Fuji in the background has been reproduced on everything from T-shirts to coffee mugs. When ukiyo-e prints reached Europe in the 1800s, they completely transformed Western art. Painters like Vincent van Gogh, Claude Monet, and Edgar Degas were deeply inspired by the bold outlines, flat colors, and dramatic compositions of Japanese prints.',
          ],
        },
        {
          id: 'asian-art-calligraphy-text',
          paragraphs: [
            'Chinese calligraphy is the art of beautiful writing, but it\'s so much more than just handwriting. In Chinese culture, calligraphy is considered the highest form of visual art, even more important than painting! Using a brush dipped in ink, calligraphers create characters with flowing, expressive strokes on paper or silk. Each stroke must be made with the right speed, pressure, and angle. Masters spend decades perfecting their technique.',
            'The four essential tools of Chinese calligraphy are called the "Four Treasures of the Study": the brush, the ink, the inkstone (used to grind the ink), and the paper. These tools have remained largely unchanged for over two thousand years! Chinese calligraphy influenced the writing systems and art traditions of Korea, Japan, and Vietnam, making it one of the most widespread art forms in history.',
          ],
        },
        {
          id: 'asian-art-rangoli-text',
          paragraphs: [
            'Rangoli is a colorful art form from India where intricate patterns are created on the ground using colored powders, flower petals, rice, and sand. Rangoli designs are usually made at the entrance of homes, especially during festivals like Diwali (the Festival of Lights). The patterns often feature geometric shapes, flowers, peacocks, and other symbols of good luck and prosperity.',
            'What makes rangoli truly special is that it\'s meant to be temporary. After hours of careful creation, the wind, rain, or foot traffic will eventually wash the design away. This impermanence is part of the beauty. Rangoli teaches us that art doesn\'t have to last forever to be meaningful. The joy is in the making!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Hokusai, the creator of "The Great Wave," didn\'t consider himself a great artist until he was in his seventies! He once wrote that nothing he created before age 70 was worth anything, and he hoped to become truly excellent by age 110. He died at 88, still striving for perfection.',
        },
      ],
      videos: [
        {
          youtubeId: 'B9XYtPqWLB4',
          title: 'The History of Japanese Art',
          channelName: 'Smarthistory',
        },
      ],
      quizIds: ['world-q1a', 'world-q1b', 'world-q1c', 'world-q1d'],
    },

    // ─── Section 2: African & Islamic Art ────────────────────────
    {
      id: 'african-islamic',
      icon: '\u{1F54C}',
      title: 'African & Islamic Art: Patterns, Masks, and Meaning',
      readAloudBlocks: [
        {
          id: 'african-islamic-intro-text',
          paragraphs: [
            'Africa and the Islamic world have produced some of the most visually stunning and mathematically sophisticated art in human history. From the powerful carved masks of West Africa to the breathtaking geometric tilework of Islamic mosques, these traditions combine deep spiritual meaning with incredible technical skill.',
          ],
        },
        {
          id: 'african-art-text',
          paragraphs: [
            'African art is incredibly diverse, reflecting the cultures of over 50 countries and thousands of ethnic groups. One of the most iconic forms of African art is the ceremonial mask. African masks aren\'t meant to be hung on walls and admired. They\'re powerful spiritual objects used in dances, ceremonies, and rituals. Each mask represents a specific spirit, ancestor, or character, and wearing one is believed to transform the wearer.',
            'African geometric patterns are another stunning art form. The Kuba people of the Democratic Republic of Congo are famous for their elaborate textiles woven from raffia palm leaves, featuring complex geometric designs. The Ndebele people of South Africa paint the walls of their homes with bold, colorful geometric patterns. These patterns aren\'t just decorative. They carry cultural meaning and tell stories about the community\'s identity and history.',
          ],
        },
        {
          id: 'islamic-art-text',
          paragraphs: [
            'Islamic art is famous for its spectacular geometric patterns. Because traditional Islamic art avoids depicting human or animal figures in religious settings, artists developed an extraordinary tradition of geometric and floral design. Using just a compass and a straightedge, Islamic artists created patterns of incredible complexity and beauty that tile perfectly across surfaces, covering walls, floors, and ceilings of mosques and palaces.',
            'Zellige is a form of Islamic mosaic tilework that originated in Morocco over a thousand years ago. Artisans hand-cut tiny geometric pieces from glazed terracotta tiles and assemble them into dazzling patterns. A single zellige panel might contain thousands of individually cut pieces! The patterns often feature stars, interlocking shapes, and infinite repeating designs that symbolize the infinite nature of creation. The Alhambra palace in Spain is one of the most famous examples of Islamic geometric art, and it inspired M.C. Escher to create his famous tessellations.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'When Pablo Picasso first saw African masks in a museum in Paris in 1907, he was so inspired that it completely changed his art. He went on to create "Les Demoiselles d\'Avignon," one of the most revolutionary paintings of the 20th century, which features faces clearly inspired by African masks. This moment helped launch the Cubist movement!',
        },
      ],
      videos: [],
      quizIds: ['world-q2a', 'world-q2b', 'world-q2c'],
    },

    // ─── Section 3: Indigenous & Folk Art ────────────────────────
    {
      id: 'indigenous-folk',
      icon: '\u{1F3A8}',
      title: 'Indigenous & Folk Art: Stories in Every Dot and Bead',
      readAloudBlocks: [
        {
          id: 'indigenous-folk-intro-text',
          paragraphs: [
            'Indigenous and folk art traditions carry the stories, beliefs, and identities of communities that have lived on their lands for thousands of years. These art forms are more than beautiful objects. They\'re living connections to ancestors, nature, and the spirit world. Let\'s explore three remarkable traditions from different corners of the globe!',
          ],
        },
        {
          id: 'aboriginal-text',
          paragraphs: [
            'Aboriginal Australian dot painting is one of the oldest continuous art traditions on Earth, stretching back at least 65,000 years! Aboriginal Australians use dots, circles, lines, and symbols to tell Dreamtime stories, which are the creation stories of the land, animals, and people. Each painting is like a map and a story combined, showing waterholes, animal tracks, meeting places, and the journeys of ancestral spirits.',
            'The dot painting technique that is famous today actually started in the 1970s when Aboriginal artists began using acrylic paint on canvas. They deliberately used dots to hide the most sacred parts of their stories from outsiders, while still sharing the beauty and meaning of their culture. The layers of dots create a shimmering effect that makes the paintings seem alive and full of energy.',
          ],
        },
        {
          id: 'alebrijes-text',
          paragraphs: [
            'Alebrijes are brightly colored Mexican folk art sculptures of fantastical creatures. They were invented in 1936 by Pedro Linares, a Mexico City craftsman who had a vivid fever dream about a strange, magical forest filled with bizarre hybrid animals: a donkey with butterfly wings, a rooster with bull horns, a lion with eagle claws. When he recovered, he began creating these creatures out of papier-m\u00e2ch\u00e9 and painting them in vibrant colors.',
            'Today, the tradition of making alebrijes is especially strong in the Oaxacan region of Mexico, where artisans carve them from copal wood and paint them with incredibly detailed patterns. Each alebrije is unique, and the most elaborate ones can take weeks to complete. They\'ve become beloved symbols of Mexican creativity and were even featured in the Pixar movie "Coco"!',
          ],
        },
        {
          id: 'beadwork-text',
          paragraphs: [
            'Native American beadwork is a treasured art form with roots going back thousands of years. Before European contact, Indigenous peoples used shells, bones, quills, and seeds to create intricate decorative designs. When glass beads arrived through trade, artists incorporated them into their existing traditions, creating stunning works of wearable art on clothing, moccasins, bags, and ceremonial objects.',
            'Each Native American nation has its own distinct beadwork style and patterns. The Lakota people are known for their geometric designs, while the Haudenosaunee (Iroquois) are famous for their floral patterns. The colors, patterns, and symbols all carry specific meanings related to nature, spirituality, and tribal identity. Beadwork is still a thriving art form today, with contemporary Indigenous artists creating both traditional and modern designs.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Aboriginal Australian art is the oldest continuous art tradition in the world. Some rock art sites in Australia are over 40,000 years old! That means Aboriginal people were creating art tens of thousands of years before the ancient Egyptians built the pyramids.',
        },
      ],
      videos: [],
      quizIds: ['world-q3a', 'world-q3b', 'world-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Asian Art
    {
      id: 'world-q1a',
      sectionId: 'asian-art',
      title: 'Quick Quiz Time!',
      question:
        'What does the Japanese term "ukiyo-e" mean?',
      options: [
        { text: 'Pictures of the mountain world', isCorrect: false },
        { text: 'Pictures of the floating world', isCorrect: true },
        { text: 'Pictures of the underwater world', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'world-q1b',
      sectionId: 'asian-art',
      title: 'Great Wave Challenge!',
      question:
        'Who created the famous print "The Great Wave off Kanagawa"?',
      options: [
        { text: 'Hiroshige', isCorrect: false },
        { text: 'Katsushika Hokusai', isCorrect: true },
        { text: 'Utamaro', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'world-q1c',
      sectionId: 'asian-art',
      title: 'Calligraphy Quiz!',
      question:
        'What are the "Four Treasures of the Study" in Chinese calligraphy?',
      options: [
        { text: 'Brush, ink, inkstone, and paper', isCorrect: true },
        { text: 'Pen, pencil, eraser, and ruler', isCorrect: false },
        { text: 'Paint, canvas, palette, and easel', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'world-q1d',
      sectionId: 'asian-art',
      title: 'Rangoli Quiz!',
      question:
        'What makes rangoli art special compared to most other art forms?',
      options: [
        { text: 'It can only be made with paint', isCorrect: false },
        { text: 'It is meant to be temporary', isCorrect: true },
        { text: 'It must always be square-shaped', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: African & Islamic Art
    {
      id: 'world-q2a',
      sectionId: 'african-islamic',
      title: 'Mask Quiz!',
      question:
        'What is the purpose of traditional African ceremonial masks?',
      options: [
        { text: 'They are only meant for wall decoration', isCorrect: false },
        { text: 'They are used in dances, ceremonies, and spiritual rituals', isCorrect: true },
        { text: 'They are worn as everyday fashion', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'world-q2b',
      sectionId: 'african-islamic',
      title: 'Islamic Art Challenge!',
      question:
        'What simple tools do Islamic artists traditionally use to create their complex geometric patterns?',
      options: [
        { text: 'A computer and printer', isCorrect: false },
        { text: 'A compass and a straightedge', isCorrect: true },
        { text: 'Scissors and glue', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'world-q2c',
      sectionId: 'african-islamic',
      title: 'Zellige Quiz!',
      question:
        'Where did zellige, the art of mosaic tilework, originate?',
      options: [
        { text: 'Egypt', isCorrect: false },
        { text: 'Morocco', isCorrect: true },
        { text: 'Turkey', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Indigenous & Folk Art
    {
      id: 'world-q3a',
      sectionId: 'indigenous-folk',
      title: 'Dot Painting Quiz!',
      question:
        'Why did Aboriginal artists start using dots in their paintings in the 1970s?',
      options: [
        { text: 'Because dots were easier and faster to paint', isCorrect: false },
        { text: 'To hide the most sacred parts of their stories from outsiders', isCorrect: true },
        { text: 'Because they ran out of other colors', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'world-q3b',
      sectionId: 'indigenous-folk',
      title: 'Alebrijes Challenge!',
      question:
        'How were alebrijes (Mexican fantastical creatures) invented?',
      options: [
        { text: 'They were found in ancient Aztec ruins', isCorrect: false },
        { text: 'Pedro Linares dreamed of them during a fever', isCorrect: true },
        { text: 'They were designed by a computer', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'world-q3c',
      sectionId: 'indigenous-folk',
      title: 'Final World Art Quiz!',
      question:
        'Approximately how old is the Aboriginal Australian art tradition?',
      options: [
        { text: 'About 500 years old', isCorrect: false },
        { text: 'About 5,000 years old', isCorrect: false },
        { text: 'At least 65,000 years old', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'world-art-essay',
    prompt:
      'Which art tradition from another culture inspires you the most and why?',
    description:
      'Now it\'s your turn to be a global art explorer! Think about all the art traditions you\'ve learned about, from Japanese ukiyo-e to Aboriginal dot painting, from Islamic geometric art to Mexican alebrijes. Which one inspires you the most? What do you love about it? You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Wonderful reflection! Your thoughts have been saved. You\'re a true global art explorer!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'world-art-reward',
    title: 'Pattern Maker Studio!',
    description:
      'You\'ve unlocked the Pattern Maker! Explore the incredible geometric patterns from art traditions around the world and discover the mathematics behind their beauty.',
    lockMessage: 'Pattern Maker Locked!',
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
    type: 'pattern-maker',
    celebrationMessage:
      'SPECTACULAR! You\'ve unlocked the Pattern Maker Studio! You\'re a true world art explorer!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, World Art Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled the globe and discovered incredible art traditions from every corner of the world!',
      'You explored the elegant world of Japanese ukiyo-e prints and learned how "The Great Wave" by Hokusai changed Western art forever. You discovered the meditative discipline of Chinese calligraphy with its Four Treasures of the Study, and the joyful impermanence of Indian rangoli patterns.',
      'You dove into the powerful tradition of African ceremonial masks and the mathematical genius of Islamic geometric design. You learned how zellige tilework artisans hand-cut thousands of tiny pieces to create dazzling mosaics that have inspired artists for over a thousand years.',
      'You explored Aboriginal dot painting, one of the oldest art traditions on Earth, and discovered how the dots themselves are used to protect sacred knowledge. You met the fantastical alebrijes of Mexico and learned about the rich tradition of Native American beadwork.',
      'Art truly is a universal language. No matter where people live or what language they speak, they create art to express their deepest feelings, tell their most important stories, and connect with something greater than themselves. Keep exploring the world through art!',
    ],
  },
};
