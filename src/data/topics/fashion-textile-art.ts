import type { Topic } from '../types';

export const fashionTextileArt: Topic = {
  id: 'fashion-textile-art',
  slug: 'fashion-textile-art',
  title: 'Fashion & Textile Art',
  subtitle:
    'Threads, Fabrics & Style Across the Ages',
  status: 'active',
  themeId: 'fashion-textile-art',
  heroIcons: ['👗', '🧵', '🪡'],
  navItems: [
    { id: 'ancient-textiles', icon: '🏺', label: 'Ancient Textiles & Clothing' },
    { id: 'fashion-as-art', icon: '👘', label: 'Fashion as Art & Expression' },
    { id: 'modern-fashion', icon: '♻️', label: 'Modern Fashion & Sustainability' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '👗',
      title: 'Welcome to the World of Fashion & Textile Art!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever thought about the clothes you\'re wearing right now? Every thread, every color, and every stitch tells a story that stretches back thousands of years. Fashion isn\'t just about looking good. It\'s one of the oldest and most creative art forms in human history!',
            'People have been spinning fibers, weaving cloth, and decorating fabrics since ancient times. From the shimmering silk robes of Chinese emperors to the brilliant indigo-dyed textiles of West Africa, every culture on Earth has found unique and beautiful ways to turn simple threads into wearable art.',
            'In this adventure, you\'ll travel through time to discover how ancient civilizations created incredible fabrics, explore how fashion became a powerful form of artistic expression around the world, and learn about the exciting future of sustainable and high-tech fashion. Let\'s unravel the story of fashion and textile art!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: '7bgQdPgWWhA',
          title: 'History of Clothing: Clothes History for Kids',
          channelName: 'Plufo',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient Textiles & Clothing ──────────────────
    {
      id: 'ancient-textiles',
      icon: '🏺',
      title: 'Ancient Textiles & Clothing',
      readAloudBlocks: [
        {
          id: 'ancient-textiles-intro',
          paragraphs: [
            'Long before shopping malls and fashion magazines existed, ancient civilizations were already creating stunning textiles that took incredible skill and creativity. The story of fabric begins with some of the earliest human inventions: spinning fibers into thread and weaving thread into cloth.',
            'The ancient Egyptians were masters of linen, a lightweight fabric made from the flax plant. Egyptian linen was so finely woven that some pieces were nearly see-through! Pharaohs and priests wore the whitest, finest linen as a symbol of purity and status. Linen mummy wrappings have survived for over 3,000 years, showing just how durable this amazing fabric can be.',
            'Meanwhile, in ancient China, silk production was one of the most closely guarded secrets in history. According to legend, Empress Leizu discovered silk around 2700 BCE when a silkworm cocoon fell into her tea. The Chinese kept the secret of silk-making for thousands of years, and anyone caught smuggling silkworms out of China could face severe punishment. Silk became so valuable that it was traded along the famous Silk Road, connecting East Asia to Europe.',
          ],
        },
        {
          id: 'ancient-textiles-detail',
          paragraphs: [
            'Indigo dyeing is one of the oldest and most widespread textile traditions in the world. The deep blue dye comes from the leaves of the indigo plant, and civilizations in Africa, Asia, and the Americas all independently discovered how to use it. In West Africa, indigo dyeing became a highly respected art form, with master dyers spending years learning the craft. The Tuareg people of the Sahara became known as the "Blue People" because their indigo-dyed clothing would stain their skin blue.',
            'In ancient Rome, clothing was a clear marker of social status. Roman citizens wore the toga, a large semicircular piece of woolen cloth draped over the body. Only freeborn Roman men could wear a toga, and the color and decoration of your toga told everyone your rank. A toga with a purple border, called a toga praetexta, was worn by magistrates and freeborn boys. Purple dye, made from thousands of tiny sea snails called murex, was so expensive that it became associated with royalty across the ancient world.',
            'Weaving looms were among the most important inventions in textile history. The earliest looms, dating back over 7,000 years, were simple frames that held threads taut while weavers passed other threads through them. Over the centuries, looms became more sophisticated, from the backstrap looms used by the Maya and Andean peoples to the massive floor looms of medieval Europe. The Jacquard loom, invented in France in 1804, used punch cards to create complex patterns automatically, and it later inspired early computer programming!',
          ],
        },
      ],
      characters: [
        {
          emoji: '👑',
          name: 'Empress Leizu',
          title: 'Legendary Mother of Silk',
          description:
            'According to Chinese legend, Empress Leizu, wife of the Yellow Emperor, discovered silk around 2700 BCE. She is credited with inventing the silk loom and teaching her people how to raise silkworms and weave silk cloth. Whether the legend is entirely true or not, silk production began in ancient China and remained a closely guarded secret for thousands of years. Silk became one of the most valuable trade goods in the ancient world.',
          extraTag: 'Known for: Discovering silk production',
        },
        {
          emoji: '🏛️',
          name: 'Roman Togatus',
          title: 'The Toga-Wearing Citizen',
          description:
            'In ancient Rome, the toga was much more than just clothing. It was a symbol of Roman citizenship and status. A full toga required about 5.5 meters (18 feet) of woolen fabric and was so complicated to drape that wealthy Romans needed help from servants to put it on. Different colors and decorations indicated different ranks: senators wore togas with broad purple stripes, while generals celebrating a triumph wore entirely purple togas.',
          extraTag: 'Known for: The toga as a symbol of citizenship',
        },
        {
          emoji: '🌿',
          name: 'West African Indigo Dyers',
          title: 'Masters of the Blue Art',
          description:
            'In West Africa, indigo dyeing has been practiced for centuries. In cities like Kano, Nigeria, ancient indigo dye pits have been in use for over 500 years. Master dyers, often women, carefully fermented indigo leaves in large clay pots to create rich blue dyes. The Yoruba people of Nigeria developed a technique called adire, using wax or stitching to resist the dye and create beautiful patterns on cloth.',
          extraTag: 'Known for: Centuries-old indigo dyeing traditions',
        },
        {
          emoji: '🧶',
          name: 'Joseph Marie Jacquard',
          title: 'Inventor of the Programmable Loom',
          description:
            'Joseph Marie Jacquard was a French weaver and inventor who created the Jacquard loom in 1804. His brilliant idea was to use a series of punch cards to control which threads were lifted during weaving, allowing complex patterns like flowers and landscapes to be woven automatically. This punch card system was so revolutionary that it later inspired Charles Babbage and Ada Lovelace in developing early computing concepts.',
          extraTag: 'Known for: Punch card loom that inspired computers',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'To produce just one pound of silk, about 2,500 silkworms must spin their cocoons. Each silkworm produces a single silk thread that can be up to 900 meters (almost 3,000 feet) long!',
        },
      ],
      videos: [
        {
          youtubeId: 'vn3e37VWc0k',
          title: 'The Silk Road: Connecting the Ancient World Through Trade',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['fta-q1a', 'fta-q1b', 'fta-q1c', 'fta-q1d'],
    },

    // ─── Section 2: Fashion as Art & Expression ──────────────────
    {
      id: 'fashion-as-art',
      icon: '👘',
      title: 'Fashion as Art & Expression',
      readAloudBlocks: [
        {
          id: 'fashion-as-art-intro',
          paragraphs: [
            'Fashion has always been more than just protection from the weather. Across cultures and centuries, people have used clothing to express who they are, show their creativity, and celebrate their traditions. In many cultures, the way a garment is made, its colors, and its patterns carry deep meaning.',
            'During the European Renaissance (roughly the 1400s to 1600s), fashion became an extravagant art form. Wealthy nobles competed to wear the most elaborate outfits, featuring rich fabrics like velvet and brocade, intricate embroidery, and jeweled accessories. Sumptuary laws even tried to regulate who could wear certain fabrics and colors, so clothing became a clear display of wealth and power.',
          ],
        },
        {
          id: 'fashion-as-art-detail',
          paragraphs: [
            'In Japan, the kimono is one of the most beautiful and meaningful garments ever created. The word "kimono" literally means "thing to wear," but these robes are far more than simple clothing. Traditional kimonos are made from a single bolt of silk fabric about 12 meters long, and are decorated with elaborate hand-painted or embroidered designs. The patterns on a kimono often reflect the season, the wearer\'s age, and the occasion. Kimono-making is considered such an important art that some kimono artists have been designated as Living National Treasures in Japan.',
            'In West Africa, Kente cloth is a brilliantly colored woven fabric that originated with the Ashanti people of Ghana. Kente is woven on narrow strip looms, and each strip is about 10 centimeters (4 inches) wide. The strips are sewn together to create larger cloths. Every color and pattern in Kente cloth has a specific meaning: gold represents royalty and wealth, green symbolizes growth and harvest, and blue stands for peace and love. Traditionally, Kente was reserved for royalty and worn during important ceremonies.',
            'The world of haute couture, meaning "high sewing" in French, emerged in the mid-1800s when English-born designer Charles Frederick Worth opened his fashion house in Paris in 1858. Worth is often called the father of haute couture because he was the first designer to sew labels into his garments and present seasonal collections on live models. Paris became the fashion capital of the world, and haute couture set the standard for fashion as a true art form, with each garment handmade and custom-fitted to the client.',
          ],
        },
      ],
      characters: [
        {
          emoji: '🎎',
          name: 'Kimono Artisans of Kyoto',
          title: 'Masters of Wearable Art',
          description:
            'The city of Kyoto, Japan, has been the center of kimono production for centuries. Artisans there practice techniques like yuzen, a method of hand-painting designs onto silk using rice paste to resist dyes. A single formal kimono can take over a year to complete and may cost more than a car. The Nishijin district of Kyoto is especially famous for its woven silk textiles, which have been produced there for over 1,200 years.',
          extraTag: 'Known for: Yuzen hand-painting and Nishijin weaving',
        },
        {
          emoji: '🟡',
          name: 'Ashanti Kente Weavers',
          title: 'Keepers of the Royal Cloth',
          description:
            'According to Ashanti legend, Kente weaving was inspired by watching a spider spin its web. The first Kente cloths were woven from black and white raffia fibers, but as trade brought colorful silk threads to West Africa, Kente became the dazzling multicolored fabric we know today. Kente was originally reserved for Ashanti royalty and was worn only on special occasions. Today, Kente is a symbol of African cultural pride worn around the world.',
          extraTag: 'Known for: Symbolic woven cloth with meaningful patterns',
        },
        {
          emoji: '✂️',
          name: 'Charles Frederick Worth',
          title: 'Father of Haute Couture',
          description:
            'Charles Frederick Worth was born in England in 1825 but moved to Paris, where he revolutionized the fashion industry. Before Worth, dressmakers simply followed their clients\' instructions. Worth changed everything by designing his own creations and presenting them on live models for clients to choose from. He dressed royalty and celebrities, including Empress Eugénie of France, and established Paris as the world capital of fashion.',
          extraTag: 'Known for: Inventing the modern fashion house',
        },
        {
          emoji: '👗',
          name: 'Coco Chanel',
          title: 'Revolutionary of Modern Fashion',
          description:
            'Gabrielle "Coco" Chanel transformed women\'s fashion in the early 1900s by freeing women from the tight corsets and heavy fabrics of the era. She introduced comfortable jersey fabric, the little black dress, and the iconic Chanel suit. She believed fashion should be practical and elegant at the same time. Her perfume, Chanel No. 5, launched in 1921, remains one of the best-selling fragrances in history.',
          extraTag: 'Known for: The little black dress and Chanel No. 5',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A single formal Japanese kimono can require over 60 individual steps to create, from spinning and dyeing the silk to painting the designs and sewing the garment. Some kimono designs are so elaborate that they are displayed in museums as works of art!',
        },
      ],
      videos: [
        {
          youtubeId: '5qTKWA2q_m4',
          title: "Kente: Ghana's Colourful Cloth - Meet a Kente Weaver",
          channelName: 'Wonderspaced',
        },
      ],
      quizIds: ['fta-q2a', 'fta-q2b', 'fta-q2c'],
    },

    // ─── Section 3: Modern Fashion & Sustainability ──────────────
    {
      id: 'modern-fashion',
      icon: '♻️',
      title: 'Modern Fashion & Sustainability',
      readAloudBlocks: [
        {
          id: 'modern-fashion-intro',
          paragraphs: [
            'Fashion today moves faster than ever before. Thanks to global supply chains and online shopping, new styles can go from a designer\'s sketch to a store shelf in just a few weeks. But this speed has come at a huge cost to our planet. The fashion industry is one of the world\'s biggest polluters, responsible for about 10% of global carbon emissions and enormous amounts of water waste.',
            '"Fast fashion" is the term used to describe cheap, trendy clothing that is designed to be worn just a few times before being thrown away. Every year, the world produces about 100 billion garments, and a significant portion ends up in landfills. A single cotton T-shirt requires about 2,700 liters of water to produce, which is enough drinking water for one person for over two years!',
          ],
        },
        {
          id: 'modern-fashion-detail',
          paragraphs: [
            'The good news is that a growing movement called "slow fashion" is fighting back. Slow fashion encourages people to buy fewer, higher-quality clothes that are made to last. It promotes fair wages for garment workers, environmentally friendly materials, and timeless designs instead of throwaway trends. Brands and designers around the world are finding creative ways to make fashion more sustainable.',
            'Upcycling is one of the most creative solutions to fashion waste. Instead of throwing old clothes away, upcycling transforms them into something new and even better. Designers are turning old jeans into bags, vintage curtains into dresses, and discarded plastic bottles into sneakers. The sportswear company Adidas, for example, has partnered with Parley for the Oceans to create shoes made from recycled ocean plastic.',
            'Fashion technology is also pushing boundaries in exciting ways. Scientists have developed fabrics made from surprising materials like mushroom leather (called mycelium leather), pineapple leaf fiber (called Piñatex), and even spider silk produced by engineered bacteria. Wearable technology is blending fashion with electronics: think jackets with built-in solar panels to charge your phone, or dresses with LED lights that change color based on your mood. The future of fashion is creative, sustainable, and full of possibilities!',
          ],
        },
      ],
      characters: [
        {
          emoji: '🌍',
          name: 'Stella McCartney',
          title: 'Pioneer of Sustainable Luxury Fashion',
          description:
            'Stella McCartney, daughter of former Beatle Paul McCartney, has been a champion of sustainable fashion since launching her own label in 2001. She has never used leather or fur in her designs, proving that luxury fashion can be ethical. Her brand uses recycled materials, organic cotton, and sustainable viscose. She has pushed the entire fashion industry to think more seriously about its environmental impact.',
          extraTag: 'Known for: Cruelty-free luxury fashion',
        },
        {
          emoji: '👟',
          name: 'Adidas x Parley',
          title: 'Turning Ocean Plastic into Sneakers',
          description:
            'In 2015, Adidas partnered with the environmental organization Parley for the Oceans to create sneakers made from recycled ocean plastic. Plastic waste is collected from beaches and coastal communities, cleaned, and spun into yarn that becomes the upper part of the shoe. By 2021, Adidas had produced over 30 million pairs of shoes using Parley ocean plastic, showing that large-scale sustainable manufacturing is possible.',
          extraTag: 'Known for: Shoes made from recycled ocean plastic',
        },
        {
          emoji: '🍄',
          name: 'Mycelium Leather Innovators',
          title: 'Growing Fabric from Mushrooms',
          description:
            'Companies like Bolt Threads and MycoWorks have developed a remarkable material called mycelium leather, made from the root structure of mushrooms. This material looks and feels like animal leather but can be grown in a lab in just days, using a fraction of the water and producing far fewer emissions than raising cattle. Major fashion brands including Hermès and Stella McCartney have begun experimenting with mycelium leather in their products.',
          extraTag: 'Known for: Lab-grown mushroom-based leather',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'It takes about 2,700 liters (713 gallons) of water to produce a single cotton T-shirt. That is enough water for one person to drink for two and a half years! Choosing organic cotton or recycled fabrics can significantly reduce this water footprint.',
        },
      ],
      videos: [
        {
          youtubeId: 'BiSYoeqb_VY',
          title: 'The Life Cycle of a T-Shirt',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['fta-q3a', 'fta-q3b', 'fta-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient Textiles & Clothing
    {
      id: 'fta-q1a',
      sectionId: 'ancient-textiles',
      title: 'Ancient Fabric Quiz!',
      question:
        'What lightweight fabric were the ancient Egyptians famous for producing from the flax plant?',
      options: [
        { text: 'Silk', isCorrect: false },
        { text: 'Linen', isCorrect: true },
        { text: 'Cotton', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fta-q1b',
      sectionId: 'ancient-textiles',
      title: 'Silk Road Challenge!',
      question:
        'According to Chinese legend, who is credited with discovering silk production?',
      options: [
        { text: 'Empress Leizu', isCorrect: true },
        { text: 'Cleopatra', isCorrect: false },
        { text: 'Empress Wu Zetian', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fta-q1c',
      sectionId: 'ancient-textiles',
      title: 'True Blue Quiz!',
      question:
        'What plant was used across Africa, Asia, and the Americas to create a deep blue dye for textiles?',
      options: [
        { text: 'Lavender', isCorrect: false },
        { text: 'Indigo', isCorrect: true },
        { text: 'Saffron', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fta-q1d',
      sectionId: 'ancient-textiles',
      title: 'Loom Innovation Quiz!',
      question:
        'What did the Jacquard loom use to automatically weave complex patterns?',
      options: [
        { text: 'Steam power', isCorrect: false },
        { text: 'Electric motors', isCorrect: false },
        { text: 'Punch cards', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Fashion as Art & Expression
    {
      id: 'fta-q2a',
      sectionId: 'fashion-as-art',
      title: 'Kimono Knowledge Quiz!',
      question:
        'What does the Japanese word "kimono" literally mean?',
      options: [
        { text: 'Beautiful robe', isCorrect: false },
        { text: 'Thing to wear', isCorrect: true },
        { text: 'Silk garment', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fta-q2b',
      sectionId: 'fashion-as-art',
      title: 'Kente Cloth Challenge!',
      question:
        'Kente cloth originated with which people of Ghana?',
      options: [
        { text: 'The Zulu', isCorrect: false },
        { text: 'The Maasai', isCorrect: false },
        { text: 'The Ashanti', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fta-q2c',
      sectionId: 'fashion-as-art',
      title: 'Haute Couture Quiz!',
      question:
        'Who is often called the "father of haute couture" for opening the first modern fashion house in Paris?',
      options: [
        { text: 'Coco Chanel', isCorrect: false },
        { text: 'Charles Frederick Worth', isCorrect: true },
        { text: 'Christian Dior', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Modern Fashion & Sustainability
    {
      id: 'fta-q3a',
      sectionId: 'modern-fashion',
      title: 'Fast Fashion Quiz!',
      question:
        'Approximately what percentage of global carbon emissions does the fashion industry produce?',
      options: [
        { text: 'About 1%', isCorrect: false },
        { text: 'About 10%', isCorrect: true },
        { text: 'About 50%', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fta-q3b',
      sectionId: 'modern-fashion',
      title: 'Eco-Fashion Challenge!',
      question:
        'What innovative material is made from the root structure of mushrooms and can replace animal leather?',
      options: [
        { text: 'Bamboo leather', isCorrect: false },
        { text: 'Mycelium leather', isCorrect: true },
        { text: 'Coconut leather', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'fta-q3c',
      sectionId: 'modern-fashion',
      title: 'Upcycling Quiz!',
      question:
        'Adidas partnered with which organization to create sneakers from recycled ocean plastic?',
      options: [
        { text: 'Greenpeace', isCorrect: false },
        { text: 'World Wildlife Fund', isCorrect: false },
        { text: 'Parley for the Oceans', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'fta-essay',
    prompt:
      'If you could design a piece of clothing or a textile artwork, what would it look like and what story would it tell?',
    description:
      'Now it\'s your turn to be a fashion designer! Imagine you can create any garment or textile artwork using any materials, techniques, and inspirations from history or the future. What would you make? What colors, patterns, or materials would you use? What story or message would your design express? You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant design thinking! Your fashion creation has been saved. You\'re a true textile artist!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'fta-reward',
    title: 'Fashion Mix & Match Studio!',
    description:
      'You\'ve unlocked the Fashion Mix & Match Studio! Explore different historical and modern fashion styles and create your own unique outfit combinations.',
    lockMessage: 'Fashion Studio Locked!',
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
    type: 'fashion-mix-match',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Fashion Mix & Match Studio! You\'re a true fashion and textile art superstar!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Fashion Explorer!',
    paragraphs: [
      'Congratulations! You\'ve completed an incredible journey through the world of fashion and textile art!',
      'You traveled back thousands of years to discover how ancient Egyptians wove fine linen, how Chinese silk became one of the most valuable materials in history, and how indigo dyeing connected cultures across continents. You learned about the Roman toga as a symbol of citizenship and how the Jacquard loom\'s punch cards inspired the first computers.',
      'You explored fashion as a powerful form of artistic expression, from the elaborate costumes of the European Renaissance to the meaningful patterns of Japanese kimonos and Ghanaian Kente cloth. You met the pioneers of haute couture who transformed fashion into a true art form.',
      'You also discovered the challenges of modern fast fashion and the inspiring solutions that designers and innovators are creating, from sneakers made of ocean plastic to leather grown from mushrooms. The future of fashion is in the hands of creative thinkers just like you!',
      'Next time you get dressed, remember: you\'re not just putting on clothes. You\'re participating in one of humanity\'s oldest and most creative art forms!',
    ],
  },
};
