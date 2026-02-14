import type { Topic } from '../types';

export const sculpture3dArt: Topic = {
  id: 'sculpture-3d-art',
  slug: 'sculpture-3d-art',
  title: 'Sculpture & 3D Art',
  subtitle:
    'From Ancient Stone to Digital Worlds',
  status: 'active',
  themeId: 'sculpture-3d-art',
  heroIcons: ['\u{1F5FF}', '\u{1F3DB}\uFE0F', '\u{1F9F1}'],
  navItems: [
    { id: 'ancient-sculpture', icon: '\u{1F3DB}\uFE0F', label: 'Ancient Sculpture' },
    { id: 'renaissance-to-modern', icon: '\u{1F9D1}\u200D\u{1F3A8}', label: 'Renaissance to Modern' },
    { id: 'contemporary-digital', icon: '\u{1F5A8}\uFE0F', label: 'Contemporary & Digital' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F5FF}',
      title: 'Welcome, Young Sculptor!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Close your eyes and imagine running your hands over a smooth marble statue, feeling every curve that an artist carved hundreds or even thousands of years ago. Unlike paintings that live on flat surfaces, sculptures are three-dimensional: you can walk around them, see them from every angle, and sometimes even touch them!',
            'Sculpture is one of the oldest art forms in the world. For tens of thousands of years, people have been carving, molding, welding, and assembling materials into works of art. From towering stone pharaohs in Egypt to tiny jade carvings in China, from bronze warriors in ancient Greece to 3D-printed creations made by computers today, sculpture has never stopped evolving.',
            'In this adventure, you will travel across time and around the world to discover how artists have turned stone, clay, metal, ice, and even digital code into breathtaking three-dimensional art. Let\'s get sculpting!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'cTsIqS_H7Jg',
          title: 'Sesame Street: Sculpture with Jon Hamm (Word on the Street Podcast)',
          channelName: 'Sesame Street',
        },
        {
          youtubeId: 'PbRX0JQ68EI',
          title: 'Intro to Sculpture',
          channelName: 'DavidsonArtOnline',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient Sculpture ────────────────────────────
    {
      id: 'ancient-sculpture',
      icon: '\u{1F3DB}\uFE0F',
      title: 'Ancient Sculpture: Shaping the World in Stone and Clay',
      readAloudBlocks: [
        {
          id: 'ancient-egypt-greece-text',
          paragraphs: [
            'Some of the oldest large-scale sculptures come from ancient Egypt. The Great Sphinx of Giza, carved around 2500 BCE, is one of the largest single-stone statues in the world, stretching about 240 feet long and 66 feet high! Egyptian sculptors followed strict rules: pharaohs were shown standing with their left foot forward, arms at their sides, gazing straight ahead. This formal style stayed almost unchanged for over 3,000 years because Egyptians believed these statues housed the spirit of the person they represented.',
            'Ancient Greek sculptors took a very different approach. Early Greek statues, called "kouros" figures, looked stiff and Egyptian-inspired. But around 480 BCE, Greek artists made a revolutionary breakthrough: contrapposto. This technique shows a figure resting their weight on one leg while the other is relaxed, creating a natural S-curve through the body. Suddenly, stone figures looked like they could start walking at any moment! Contrapposto made Greek sculpture feel alive, and artists have used this pose ever since.',
            'The Greeks also pioneered the idea that sculptures should show ideal human beauty. They studied anatomy carefully and used mathematical proportions to create figures that looked perfectly balanced. Many of their bronze statues were later melted down for weapons, but marble copies made by Roman artists survived and continue to inspire sculptors today.',
          ],
        },
        {
          id: 'terracotta-olmec-text',
          paragraphs: [
            'On the other side of the world, China\'s first emperor, Qin Shi Huang, ordered one of the most incredible sculpture projects in history. When he died around 210 BCE, he was buried with an entire army made of terracotta clay: over 8,000 life-sized soldiers, 670 horses, and 130 chariots! Each soldier has a unique face, hairstyle, and expression. Archaeologists believe real soldiers may have served as models. The Terracotta Army was discovered by accident in 1974 when farmers digging a well stumbled upon fragments of the clay warriors.',
            'Meanwhile, in ancient Mesoamerica, the Olmec civilization created some of the most mysterious sculptures ever found. Between about 1500 and 400 BCE, Olmec artists carved colossal stone heads, some weighing up to 50 tons and standing up to 11 feet tall. These massive basalt heads are believed to represent Olmec rulers. The incredible part? The nearest source of basalt stone was over 50 miles away, meaning the Olmec somehow transported these enormous boulders through dense jungle and across rivers without wheels or draft animals!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Phidias',
          title: 'Master Sculptor of Athens',
          description:
            'Phidias was the most famous sculptor in ancient Greece. He oversaw the sculptures of the Parthenon and created the massive gold-and-ivory Statue of Zeus at Olympia, one of the Seven Wonders of the Ancient World. Though that statue is lost, his influence on Western art is immeasurable.',
          extraTag: 'Active: ~480\u2013430 BCE',
        },
        {
          emoji: '\u{1F9F1}',
          name: 'Qin Shi Huang',
          title: 'Emperor Who Built a Clay Army',
          description:
            'China\'s first emperor unified warring states and ordered the creation of over 8,000 terracotta warriors to guard him in the afterlife. The project likely took around 40 years and involved hundreds of thousands of workers and craftsmen.',
          extraTag: 'Lived: 259\u2013210 BCE',
        },
        {
          emoji: '\u{1F5FF}',
          name: 'Olmec Master Carvers',
          title: 'Creators of Colossal Heads',
          description:
            'The Olmec civilization of ancient Mexico carved at least 17 colossal stone heads, each one unique. These enormous basalt sculptures were transported over 50 miles through jungle without wheels, showcasing incredible engineering and artistic skill.',
          extraTag: 'Era: ~1500\u2013400 BCE',
        },
        {
          emoji: '\u{1F43A}',
          name: 'The Sphinx Builders',
          title: 'Royal Sculptors of Egypt',
          description:
            'Ancient Egyptian sculptors carved the Great Sphinx from a single ridge of limestone on the Giza plateau. Standing guard for over 4,500 years, the Sphinx combines a human head with a lion\'s body and remains one of the largest and oldest monumental sculptures on Earth.',
          extraTag: 'Era: ~2500 BCE',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'When the Terracotta Army was first created, each warrior was painted in bright colors: red, green, blue, purple, and yellow! Over the centuries, the paint faded and flaked off. When archaeologists uncovered the warriors in 1974, the exposure to air caused the remaining paint to curl and vanish within minutes. Today scientists use special techniques to preserve any traces of color they find.',
        },
      ],
      videos: [
        {
          youtubeId: 'mP5p4QbvPtc',
          title: 'The incredible history of China\'s terracotta warriors',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['sda-q1a', 'sda-q1b', 'sda-q1c', 'sda-q1d'],
    },

    // ─── Section 2: Renaissance to Modern ────────────────────────
    {
      id: 'renaissance-to-modern',
      icon: '\u{1F9D1}\u200D\u{1F3A8}',
      title: 'Renaissance to Modern: Revolution in Stone and Metal',
      readAloudBlocks: [
        {
          id: 'renaissance-text',
          paragraphs: [
            'In 1501, a 26-year-old artist named Michelangelo Buonarroti took on an impossible challenge. A massive block of marble had been sitting abandoned in a Florence cathedral workshop for 25 years after two other sculptors had given up on it. The block was tall but narrow and had already been partly carved. Michelangelo spent the next three years transforming it into "David," a 17-foot-tall masterpiece that many consider the greatest sculpture ever created.',
            'Michelangelo\'s David shows the biblical hero just before his battle with Goliath. David\'s muscles are tense, his brow is furrowed in concentration, and his veins are visible on his hands. Michelangelo studied human anatomy by dissecting cadavers, which gave him an extraordinary understanding of the body beneath the skin. When it was unveiled in 1504, the people of Florence were so amazed that they placed it in the main public square as a symbol of their city\'s strength and independence.',
            'What makes Michelangelo\'s work so special? He believed that every block of marble already contained a figure inside it, and his job was simply to set it free by removing the stone that didn\'t belong. He once said, "I saw the angel in the marble and carved until I set him free."',
          ],
        },
        {
          id: 'modern-text',
          paragraphs: [
            'Fast forward to the late 1800s, and French sculptor Auguste Rodin was transforming sculpture yet again. His most famous work, "The Thinker," was originally created in 1880 as part of a larger piece called "The Gates of Hell." The figure sits hunched forward, chin resting on the back of his hand, deep in thought. Rodin\'s rough, textured surfaces were revolutionary: instead of smoothing away every chisel mark like previous sculptors, Rodin deliberately left visible marks to show the energy and emotion in his work.',
            'In the early 1900s, Romanian-born sculptor Constantin Brancusi pushed sculpture in an entirely new direction: abstraction. His famous piece "Bird in Space," created between 1923 and 1940 in multiple versions, doesn\'t look like a bird at all. Instead, it\'s a sleek, polished bronze form that captures the feeling of flight itself. Brancusi simplified forms down to their purest essence. When one version of "Bird in Space" was shipped to America in 1926, customs officials refused to believe it was art and taxed it as a manufactured metal object! Brancusi won the court case that followed, changing how abstract art was legally defined.',
            'Another modern revolutionary was Alexander Calder, who asked a simple but radical question: why can\'t sculptures move? In the 1930s, Calder invented the "mobile," a type of kinetic sculpture made of metal shapes balanced on wires that move gently with air currents. His mobiles hang in museums around the world, constantly changing shape as they drift and spin. Calder proved that sculpture didn\'t have to be heavy and still. It could be light, playful, and alive with motion.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u2728',
          name: 'Michelangelo Buonarroti',
          title: 'The Divine Sculptor',
          description:
            'Michelangelo was an Italian sculptor, painter, architect, and poet. Besides "David," he carved the heartbreaking "Piet\u00E0" when he was just 24 and painted the ceiling of the Sistine Chapel. He worked on major projects into his late 80s, an extraordinary career spanning over 70 years.',
          extraTag: 'Lived: 1475\u20131564',
        },
        {
          emoji: '\u{1F914}',
          name: 'Auguste Rodin',
          title: 'Father of Modern Sculpture',
          description:
            'Rodin\'s expressive, textured style broke away from centuries of smooth, idealized sculpture. "The Thinker" is one of the most recognized sculptures in the world. He was rejected from art school three times before eventually becoming the most celebrated sculptor of his era.',
          extraTag: 'Lived: 1840\u20131917',
        },
        {
          emoji: '\u{1F985}',
          name: 'Constantin Brancusi',
          title: 'Pioneer of Abstract Sculpture',
          description:
            'Brancusi was born in rural Romania and walked much of the way to Paris to pursue art. He simplified natural forms into smooth, elegant shapes. His "Bird in Space" series captures the essence of flight without showing a realistic bird, influencing generations of modern artists.',
          extraTag: 'Lived: 1876\u20131957',
        },
        {
          emoji: '\u{1F3A0}',
          name: 'Alexander Calder',
          title: 'Inventor of the Mobile',
          description:
            'Calder started as a mechanical engineer before becoming an artist. He invented kinetic sculpture by creating balanced, moving constructions he called "mobiles." His playful, colorful works brought movement and joy to the world of sculpture. He also created massive outdoor "stabiles," stationary sculptures found in cities worldwide.',
          extraTag: 'Lived: 1898\u20131976',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Michelangelo\'s David has a hidden flaw on purpose! David\'s right hand is oversized compared to the rest of his body. Art historians believe Michelangelo made this choice deliberately to emphasize the hand that would slay the giant Goliath, drawing the viewer\'s eye to David\'s source of power.',
        },
      ],
      videos: [
        {
          youtubeId: 'ubEadhXWwV4',
          title: 'How art can help you analyze - Amy E. Herman',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['sda-q2a', 'sda-q2b', 'sda-q2c'],
    },

    // ─── Section 3: Contemporary & Digital 3D Art ────────────────
    {
      id: 'contemporary-digital',
      icon: '\u{1F5A8}\uFE0F',
      title: 'Contemporary & Digital: Sculpture Without Limits',
      readAloudBlocks: [
        {
          id: 'contemporary-text',
          paragraphs: [
            'Today\'s sculptors have shattered every rule about what sculpture can be. It no longer has to be carved from stone or cast in bronze. It can be made of light, ice, trash, food, or even thin air! Contemporary installation art transforms entire rooms or outdoor spaces into immersive sculpture experiences that visitors can walk through and interact with.',
            'Japanese artist Yayoi Kusama creates "Infinity Mirror Rooms," small chambers lined with mirrors and filled with hanging LED lights that reflect endlessly in every direction. When you step inside, it feels like floating in an infinite universe of stars. British-Indian sculptor Anish Kapoor created "Cloud Gate" in Chicago, a 110-ton polished stainless steel bean shape that reflects the city skyline in warped, dreamlike curves. These artists prove that sculpture can be an experience, not just an object.',
            'Some of the most spectacular sculptures are designed to be temporary. Every year, artists from around the world compete in ice sculpture festivals, carving detailed castles, animals, and fantasy creatures from massive blocks of ice. Sand sculpture competitions produce incredibly detailed works that can stand for weeks before wind and rain reclaim them. Food artists sculpt butter, chocolate, fruits, and vegetables into stunning creations. The temporary nature of these works makes them even more special: you have to be there to see them before they melt, crumble, or get eaten!',
          ],
        },
        {
          id: 'digital-text',
          paragraphs: [
            'Perhaps the biggest revolution in sculpture is happening inside computers. Digital sculpting tools like ZBrush and Blender allow artists to mold virtual clay on a screen, pushing, pulling, and shaping 3D forms with a stylus just as they would with real clay, but with an unlimited supply of material and an "undo" button! Digital sculptors create characters for movies, video games, and animated films. Many of the creatures and characters you see in your favorite films were first sculpted digitally before being brought to life with special effects.',
            '3D printing has taken digital sculpture into the physical world. Artists design a sculpture on a computer, and a 3D printer builds it layer by layer using plastic, resin, metal, or even ceramic. This technology allows artists to create shapes that would be impossible to carve or cast by hand: intricate lattices, interlocking rings, and forms that seem to defy gravity. Some artists, like Joshua Harker, create 3D-printed sculptures with thousands of tiny interconnected details that no human hand could produce.',
            'Another growing movement is recycled material sculpture. Artists like El Anatsui from Ghana create massive shimmering tapestry-like wall sculptures from flattened bottle caps and aluminum scraps. Aurora Robson transforms plastic waste from the ocean into beautiful hanging sculptures, raising awareness about pollution while creating stunning art. These artists show that sculpture can be a powerful tool for sending a message and changing the world.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1FA9E}',
          name: 'Yayoi Kusama',
          title: 'Queen of Infinite Dots',
          description:
            'Japanese artist Yayoi Kusama is famous for her "Infinity Mirror Rooms" and polka-dot-covered sculptures. Now in her 90s, she continues to create art from her studio in Tokyo. Her immersive installations have made her one of the most popular living artists in the world, with people lining up for hours to experience her mirror rooms.',
          extraTag: 'Born: 1929',
        },
        {
          emoji: '\u{1F5A5}\uFE0F',
          name: 'Digital Sculptors',
          title: 'Artists of the Virtual World',
          description:
            'Digital sculptors use tools like ZBrush and Blender to create 3D characters and creatures for movies, games, and art. They combine traditional sculpting knowledge with computer skills, often starting with real clay before moving to digital tools. Their work appears in blockbuster films and AAA video games.',
          extraTag: 'Era: 2000s\u2013Present',
        },
        {
          emoji: '\u267B\uFE0F',
          name: 'El Anatsui',
          title: 'Master of Recycled Art',
          description:
            'Ghanaian sculptor El Anatsui transforms thousands of discarded bottle caps and aluminum scraps into enormous, shimmering wall installations that resemble royal cloth. His work connects African traditions with contemporary global issues about consumption and waste.',
          extraTag: 'Born: 1944',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The world\'s largest 3D-printed structure is a two-story house! In 2023, a company in Texas printed an entire home layer by layer using a giant robotic arm that squeezed out concrete like toothpaste. The technology is being developed to build affordable housing faster and with less waste than traditional construction.',
        },
      ],
      videos: [
        {
          youtubeId: 'bvIN-B2aISQ',
          title: 'Art History for Children / Prehistory to Contemporary Masterpieces',
          channelName: 'Castro Learning House',
        },
      ],
      quizIds: ['sda-q3a', 'sda-q3b', 'sda-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient Sculpture (4 quizzes)
    {
      id: 'sda-q1a',
      sectionId: 'ancient-sculpture',
      title: 'Quick Quiz Time!',
      question:
        'What is "contrapposto" in ancient Greek sculpture?',
      options: [
        { text: 'A type of marble used only in Athens', isCorrect: false },
        {
          text: 'A pose where a figure rests weight on one leg, creating a natural S-curve',
          isCorrect: true,
        },
        { text: 'A tool used to polish bronze statues', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sda-q1b',
      sectionId: 'ancient-sculpture',
      title: 'Ancient Army Challenge!',
      question:
        'How many terracotta warriors were buried with China\'s first emperor?',
      options: [
        { text: 'About 500', isCorrect: false },
        { text: 'Over 8,000', isCorrect: true },
        { text: 'Exactly 1,000', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sda-q1c',
      sectionId: 'ancient-sculpture',
      title: 'Colossal Heads Quiz!',
      question:
        'What is remarkable about how the Olmec created their colossal stone heads?',
      options: [
        { text: 'They carved them from meteorites that fell from space', isCorrect: false },
        { text: 'They used laser-like tools powered by sunlight', isCorrect: false },
        {
          text: 'They transported boulders over 50 miles through jungle without wheels or draft animals',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sda-q1d',
      sectionId: 'ancient-sculpture',
      title: 'Egyptian Art Challenge!',
      question:
        'Why did Egyptian sculptors follow strict rules when carving pharaohs?',
      options: [
        {
          text: 'They believed the statues housed the spirit of the person they represented',
          isCorrect: true,
        },
        { text: 'The pharaohs threatened to punish creative sculptors', isCorrect: false },
        { text: 'They hadn\'t learned more advanced techniques yet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Renaissance to Modern (3 quizzes)
    {
      id: 'sda-q2a',
      sectionId: 'renaissance-to-modern',
      title: 'Renaissance Sculpture Quiz!',
      question:
        'What was special about the marble block Michelangelo used for "David"?',
      options: [
        { text: 'It was the largest marble block ever quarried in Italy', isCorrect: false },
        {
          text: 'Two other sculptors had already given up on it, and it had sat abandoned for 25 years',
          isCorrect: true,
        },
        { text: 'It was imported from Greece at enormous expense', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sda-q2b',
      sectionId: 'renaissance-to-modern',
      title: 'Modern Art Challenge!',
      question:
        'What happened when Brancusi\'s "Bird in Space" was shipped to America in 1926?',
      options: [
        { text: 'It was declared a national treasure and given its own museum room', isCorrect: false },
        { text: 'It broke into pieces during shipping and had to be reassembled', isCorrect: false },
        {
          text: 'Customs officials refused to believe it was art and taxed it as manufactured metal',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sda-q2c',
      sectionId: 'renaissance-to-modern',
      title: 'Kinetic Art Quiz!',
      question:
        'What type of sculpture did Alexander Calder invent?',
      options: [
        {
          text: 'The mobile, a balanced sculpture that moves with air currents',
          isCorrect: true,
        },
        { text: 'The hologram, a sculpture made entirely of light', isCorrect: false },
        { text: 'The monolith, a single piece of uncarved stone displayed as art', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Contemporary & Digital (3 quizzes)
    {
      id: 'sda-q3a',
      sectionId: 'contemporary-digital',
      title: 'Contemporary Art Quiz!',
      question:
        'What are Yayoi Kusama\'s "Infinity Mirror Rooms"?',
      options: [
        { text: 'Outdoor sculptures covered in mirrors that reflect sunlight', isCorrect: false },
        {
          text: 'Small chambers lined with mirrors and LED lights that create the feeling of infinite space',
          isCorrect: true,
        },
        { text: 'Virtual reality experiences viewed through special goggles', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sda-q3b',
      sectionId: 'contemporary-digital',
      title: 'Digital Sculpting Challenge!',
      question:
        'How does 3D printing create a physical sculpture?',
      options: [
        { text: 'It carves the shape out of a solid block using laser beams', isCorrect: false },
        { text: 'It pours liquid metal into a mold created by a computer', isCorrect: false },
        {
          text: 'It builds the sculpture layer by layer using materials like plastic, resin, or metal',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sda-q3c',
      sectionId: 'contemporary-digital',
      title: 'Recycled Art Quiz!',
      question:
        'What materials does artist El Anatsui use to create his massive wall sculptures?',
      options: [
        { text: 'Recycled glass bottles melted and reshaped', isCorrect: false },
        {
          text: 'Discarded bottle caps and aluminum scraps',
          isCorrect: true,
        },
        { text: 'Shredded plastic bags woven into fabric', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'sda-essay',
    prompt:
      'If you could create a sculpture using any material in the world, what would you make and why?',
    description:
      'Now it\'s your turn to think like a sculptor! You can use any material: marble, clay, ice, recycled objects, digital tools, chocolate, or something no one has ever tried before. What would your sculpture look like? What story would it tell? Would it move, glow, or change over time? Share your creative vision below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant creative thinking! Your sculpture idea has been saved. You\'re a true 3D art visionary!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'sda-reward',
    title: 'Unlock the Virtual Clay Studio!',
    description:
      'You\'ve explored sculpture across time and around the world! Unlock your special interactive clay studio and shape your own 3D masterpiece.',
    lockMessage: 'Studio Locked!',
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
    type: 'virtual-clay-studio',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Virtual Clay Studio! Shape, mold, and create like the great sculptors of history!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Master Sculptor!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through thousands of years of sculpture and 3D art, from the ancient world to the digital frontier!',
      'You discovered how Egyptian sculptors carved monumental statues to house the spirits of pharaohs, how Greek artists invented contrapposto to make stone figures look alive, how China\'s first emperor was buried with over 8,000 unique terracotta warriors, and how the Olmec transported 50-ton stone heads through dense jungle.',
      'You met revolutionary artists who changed sculpture forever: Michelangelo, who freed "David" from a rejected block of marble; Rodin, who left his chisel marks visible to show raw emotion; Brancusi, who captured the feeling of flight in polished bronze; and Calder, who made sculpture dance on air.',
      'You explored the cutting edge of contemporary art: Kusama\'s infinite mirror rooms, 3D-printed creations that defy gravity, digital sculpting tools that let anyone shape virtual clay, and recycled-material artists turning trash into treasure.',
      'The next time you mold clay, build with blocks, shape sand at the beach, or even design a character in a video game, remember: you\'re part of a sculpting tradition that stretches back thousands of years. Every material is waiting to become art in your hands!',
    ],
  },
};
