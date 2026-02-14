import type { Topic } from '../types';

export const breadAroundTheWorld: Topic = {
  id: 'bread-around-the-world',
  slug: 'bread-around-the-world',
  title: 'Bread Around the World',
  subtitle:
    'The Rise of Humanity\'s Oldest Food',
  status: 'active',
  themeId: 'bread-around-the-world',
  heroIcons: ['\u{1F35E}', '\u{1F30D}', '\u{1FAD3}'],
  navItems: [
    { id: 'birth-of-bread', icon: '\u{1F33E}', label: 'Birth of Bread' },
    { id: 'breads-of-the-world', icon: '\u{1F956}', label: 'Breads of the World' },
    { id: 'bread-science', icon: '\u{1F9EA}', label: 'Bread Science' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F35E}',
      title: 'Welcome to the World of Bread!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Bread is one of the oldest foods ever made by humans. Long before there were ovens, grocery stores, or even farms, ancient people were grinding wild grains and mixing them with water to create the very first flatbreads. That was over 14,000 years ago!',
            'Today, almost every culture on Earth has its own special bread. From the crusty baguettes of France to the spongy injera of Ethiopia, from fluffy Japanese shokupan to warm Indian naan fresh from a tandoor oven \u2014 bread tells the story of who we are and where we come from.',
            'In this adventure, you\'ll travel back in time to discover how bread was born, explore the incredible variety of breads baked around the world, and uncover the fascinating science that makes dough rise and crusts turn golden. Ready to break bread with the world? Let\'s go!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'COfvgNv46Nc',
          title: "WORLD'S OLDEST BREAD has been found at \u00C7ATALH\u00D6Y\u00DCK - or has it?",
          channelName: 'The Prehistory Guys',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: The Birth of Bread ─────────────────────────
    {
      id: 'birth-of-bread',
      icon: '\u{1F33E}',
      title: 'The Birth of Bread',
      readAloudBlocks: [
        {
          id: 'birth-of-bread-intro-text',
          paragraphs: [
            'The story of bread begins in the ancient Middle East, in a region called the Fertile Crescent. Around 14,000 years ago, a group of people called the Natufians made an incredible discovery. They found that wild grains like wheat and barley could be ground into flour, mixed with water, and cooked on hot stones to make flatbread. Archaeologists found charred bread crumbs at a Natufian site called Shubayqa 1 in Jordan \u2014 the oldest bread ever discovered!',
          ],
        },
        {
          id: 'birth-of-bread-details-text',
          paragraphs: [
            'For thousands of years, all bread was flat. Think of a tortilla or a piece of naan \u2014 that\'s what the earliest bread looked like. Then, around 4,000 years ago in ancient Egypt, something magical happened. Someone left dough sitting out too long, and wild yeast from the air landed on it. The dough began to bubble and rise! When they baked it anyway, the result was lighter, fluffier, and tastier than any bread before. The Egyptians had accidentally discovered leavened bread \u2014 bread that rises.',
            'The ancient Egyptians became the master bakers of the ancient world. They built special clay ovens and developed over 50 different types of bread! Bread was so important in Egypt that it was used as a form of currency \u2014 workers who built the pyramids were partly paid in bread and beer. The Egyptian word for bread, "t," was one of the most common hieroglyphs.',
            'Meanwhile, flatbreads were thriving in cultures all around the world. In India, people have been making naan and roti for thousands of years, cooking them in tandoor clay ovens or on flat iron pans called tawas. In Central America, the ancient Maya and Aztec civilizations made tortillas from ground corn (called masa), patting them flat and cooking them on hot stone griddles. In Ethiopia, people developed injera, a large spongy flatbread made from a grain called teff, which grows in the Ethiopian highlands.',
            'But what actually makes bread work? The answer is a protein called gluten. When you mix wheat flour with water and knead the dough, proteins in the flour link together to form stretchy, elastic strands of gluten. These gluten strands create a network that traps gas bubbles. In leavened bread, yeast produces carbon dioxide gas through a process called fermentation, and the gluten network traps those bubbles, causing the dough to rise. It\'s like building a tiny balloon factory inside your bread!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3FA}',
          name: 'Natufian Baker',
          title: 'The First Bread Makers',
          description:
            'The Natufians lived in the Levant region (modern-day Jordan, Israel, and Syria) around 14,000 years ago. They were among the first people to harvest wild grains and grind them into flour using stone tools. Their bread predates agriculture by thousands of years \u2014 they were baking before they were farming!',
          extraTag: 'Era: ~12,000 BCE',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Egyptian Master Baker',
          title: 'Discoverers of Risen Bread',
          description:
            'Ancient Egyptians accidentally discovered leavened bread around 2,000 BCE when wild yeast colonized their dough. They perfected the art, building dedicated bakeries and producing over 50 bread varieties. Bread was so central to Egyptian life that it was offered to the gods and buried in tombs for the afterlife.',
          extraTag: 'Era: ~2,000 BCE',
        },
        {
          emoji: '\u{1FAD3}',
          name: 'Tortilla',
          title: 'Mesoamerica\'s Ancient Flatbread',
          description:
            'Corn tortillas have been a staple food in Mesoamerica for thousands of years. The Maya and Aztec civilizations ground dried corn using a process called nixtamalization \u2014 soaking corn in an alkaline solution \u2014 which makes the nutrients more accessible and the dough easier to work with. This process was a brilliant piece of ancient food science!',
          extraTag: 'Region: Mesoamerica',
        },
        {
          emoji: '\u{1F3AF}',
          name: 'Gluten',
          title: 'Bread\'s Secret Architect',
          description:
            'Gluten is a protein found in wheat, barley, and rye. When flour is mixed with water and kneaded, gluten forms stretchy, elastic strands that create a network inside the dough. This network traps gas bubbles produced by yeast, which is what makes bread rise and gives it its soft, airy texture.',
          extraTag: 'Type: Science',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The oldest bread ever found was discovered at a Natufian archaeological site in northeastern Jordan called Shubayqa 1. It dates back roughly 14,400 years \u2014 about 4,000 years before humans invented agriculture! The ancient bakers made it from wild wheat and plant roots.',
        },
      ],
      videos: [
        {
          youtubeId: 'hQHDulLsYeQ',
          title: 'How Civilization Was Created By Bread',
          channelName: 'Weird History Food',
        },
      ],
      quizIds: ['batw-q1a', 'batw-q1b', 'batw-q1c', 'batw-q1d'],
    },

    // ─── Section 2: Breads of the World ────────────────────────
    {
      id: 'breads-of-the-world',
      icon: '\u{1F956}',
      title: 'Breads of the World',
      readAloudBlocks: [
        {
          id: 'breads-of-the-world-intro-text',
          paragraphs: [
            'Every country and culture has shaped bread in its own unique way, using local grains, techniques, and traditions passed down through generations. Let\'s take a delicious trip around the globe and discover some of the most famous and beloved breads on Earth!',
            'The video for this section is a longer documentary (about 1 hour). You don\'t need to watch it all! Try skipping to the sections about different breads from around the world \u2014 for example, start around the 12-minute mark (t=718) to learn about how bread spread across cultures.',
          ],
        },
        {
          id: 'breads-of-the-world-details-text',
          paragraphs: [
            'The French baguette is perhaps the world\'s most iconic bread. This long, thin loaf with a crispy golden crust and soft, airy interior has been a symbol of France for centuries. In 2022, the French baguette was added to UNESCO\'s Intangible Cultural Heritage list! A proper baguette contains just four ingredients: flour, water, yeast, and salt. French law even regulates how a traditional baguette must be made \u2014 no additives or preservatives allowed. Baguettes are best eaten the same day they\'re baked, which is why French people often visit the bakery (boulangerie) every morning.',
            'Japanese shokupan is a soft, fluffy white bread that\'s taken Japan by storm. Unlike crusty European breads, shokupan is incredibly pillowy and slightly sweet. The secret is a technique called tangzhong (or yudane in Japanese) \u2014 cooking a small portion of the flour with water or milk to create a paste that traps moisture. The result is bread so soft it practically melts in your mouth. Shokupan has become a cultural phenomenon in Japan, with specialty bakeries drawing long lines every morning.',
            'Ethiopian injera is unlike any other bread in the world. This large, spongy flatbread is made from teff, a tiny grain native to the Ethiopian highlands. Teff flour is mixed with water and left to ferment for several days, which gives injera its distinctive sour tang and bubbly texture. Injera serves as both plate and utensil \u2014 stews and dishes are spooned directly onto it, and you tear off pieces to scoop up your food. Sharing injera is an important act of community and togetherness in Ethiopian and Eritrean culture.',
            'Indian naan and roti are two of the most beloved breads in South Asia. Naan is a leavened flatbread traditionally cooked by slapping the dough against the scorching walls of a tandoor clay oven, where temperatures can reach over 480\u00B0C (900\u00B0F). The intense heat causes the bread to puff up dramatically and develop charred, bubbly spots. Roti (also called chapati) is an unleavened whole-wheat flatbread cooked on a flat pan. When placed directly over a flame, roti puffs up like a balloon \u2014 a moment called "phulka" that delights cooks everywhere!',
            'German pumpernickel is a dense, dark rye bread that originated in the Westphalia region of Germany. Traditional pumpernickel is made from coarsely ground rye and baked at low temperatures for up to 24 hours! This incredibly long baking time causes a chemical reaction called the Maillard reaction, which gives the bread its deep brown color and sweet, earthy flavor without any added sugar or coloring. Some bakeries in Westphalia have been making pumpernickel using the same recipe for over 600 years.',
            'Jewish challah is a beautiful braided bread traditionally eaten on Shabbat (the Sabbath) and Jewish holidays. The braiding of challah is both art and tradition \u2014 a standard challah uses three or six strands of dough woven together. On Rosh Hashanah (the Jewish New Year), challah is shaped into a round spiral to symbolize the cycle of the year. The bread is enriched with eggs, which give it a golden color and tender crumb. Challah\'s slightly sweet flavor and soft texture have made it beloved far beyond the Jewish community.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F956}',
          name: 'Baguette',
          title: 'France\'s Golden Icon',
          description:
            'The baguette as we know it today became popular in France in the early 20th century. A French law from 1993 called the "Bread Decree" states that a traditional baguette can only contain wheat flour, water, salt, and yeast. About 10 billion baguettes are baked in France every year \u2014 that\'s roughly 320 baguettes per second!',
          extraTag: 'Country: France',
        },
        {
          emoji: '\u{1F35E}',
          name: 'Injera',
          title: 'Ethiopia\'s Living Bread',
          description:
            'Injera is made from teff, the world\'s smallest grain. Teff is naturally gluten-free and packed with protein, iron, and calcium. The fermentation process that gives injera its sour flavor also makes its nutrients easier for the body to absorb. A single injera can be up to 60 centimeters (2 feet) across!',
          extraTag: 'Country: Ethiopia',
        },
        {
          emoji: '\u{1FAD3}',
          name: 'Naan',
          title: 'India\'s Tandoor Treasure',
          description:
            'Naan has been mentioned in Indian texts since the 1300s. The word "naan" comes from the Persian word "non," meaning bread. A tandoor oven can reach temperatures over 480\u00B0C (900\u00B0F), and naan cooks in just 60\u201390 seconds! The bread sticks to the oven wall by gravity and its own moisture, a technique that takes years of practice to master.',
          extraTag: 'Country: India',
        },
        {
          emoji: '\u{1F365}',
          name: 'Challah',
          title: 'A Bread of Tradition',
          description:
            'Challah has deep roots in Jewish tradition, symbolizing the manna that God provided to the Israelites in the desert. The braided shape can represent unity and togetherness. Challah is traditionally made with eggs, flour, water, sugar, yeast, and salt. On Rosh Hashanah, it is often dipped in honey to symbolize hopes for a sweet new year.',
          extraTag: 'Country: Israel',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The French baguette was added to UNESCO\'s Intangible Cultural Heritage list in November 2022. France produces about 10 billion baguettes every year, and there are roughly 35,000 bakeries across the country \u2014 more than one for every 2,000 people!',
        },
      ],
      videos: [
        {
          youtubeId: '892yaBEwtbM',
          title: 'How Bread Built Civilization: From the First Farmers to the Modern Factory',
          channelName: 'OTR Food & History',
        },
      ],
      quizIds: ['batw-q2a', 'batw-q2b', 'batw-q2c'],
    },

    // ─── Section 3: Bread Science & Modern Baking ──────────────
    {
      id: 'bread-science',
      icon: '\u{1F9EA}',
      title: 'Bread Science & Modern Baking',
      readAloudBlocks: [
        {
          id: 'bread-science-intro-text',
          paragraphs: [
            'Baking bread is one of the most delicious science experiments you can do! Behind every loaf of bread is a world of biology, chemistry, and physics working together. Let\'s put on our lab coats and discover the amazing science that transforms simple flour and water into the bread we love.',
          ],
        },
        {
          id: 'bread-science-details-text',
          paragraphs: [
            'Yeast is a tiny, single-celled fungus that is the engine behind risen bread. When you mix yeast with flour and water, the yeast begins eating the sugars in the flour. As it eats, it produces two byproducts: carbon dioxide gas (CO\u2082) and ethanol (alcohol). The CO\u2082 gas forms tiny bubbles in the dough, and because the stretchy gluten network traps those bubbles, the dough expands and rises. This process is called fermentation, and it\'s the same process used to make beer and wine! During baking, the heat kills the yeast and evaporates the alcohol, while the trapped gas bubbles set in place, giving bread its airy structure.',
            'Gluten development is the other key to bread\'s texture. When you knead dough, you\'re physically aligning and stretching the gluten proteins into long, organized chains. The more you knead, the stronger and more elastic the gluten network becomes. This is why bread recipes ask you to knead for 8\u201310 minutes \u2014 you\'re building the scaffolding that will hold your bread\'s shape. Different breads need different amounts of gluten development: a crusty baguette needs lots of kneading for big, open holes, while a tender cake needs minimal mixing to stay soft.',
            'Sourdough bread uses an ancient technique that predates commercial yeast by thousands of years. Instead of adding packaged yeast, sourdough bakers cultivate a "starter" \u2014 a bubbly mixture of flour and water that captures wild yeast and beneficial bacteria from the environment. These wild microorganisms ferment the dough more slowly than commercial yeast, which develops complex, tangy flavors. Some sourdough starters have been kept alive for decades or even over a century, fed daily with fresh flour and water like a living pet!',
            'The rise of industrial bread in the 20th century changed how most people eat bread. In 1928, Otto Frederick Rohwedder invented the first automatic bread-slicing machine, and sliced bread became so popular that the phrase "the best thing since sliced bread" entered the English language. Modern industrial bakeries can produce thousands of loaves per hour using high-speed mixers, automated ovens, and preservatives that keep bread soft for weeks. However, many people feel that industrial bread lacks the flavor and nutrition of traditional bread.',
            'Today, there\'s a growing movement back toward artisan bread \u2014 bread made by hand with simple ingredients, longer fermentation times, and traditional techniques. Studies have shown that slowly fermented breads like sourdough may be easier to digest and have a lower glycemic index than fast-produced industrial bread. Bread remains one of the most important foods in the world \u2014 it provides about 20% of the world\'s calories. From ancient flatbreads cooked on hot stones to modern sourdough loaves, bread continues to nourish humanity.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9EB}',
          name: 'Yeast',
          title: 'The Tiny Bread Engine',
          description:
            'Saccharomyces cerevisiae (baker\'s yeast) is a single-celled fungus invisible to the naked eye. One gram of active dry yeast contains about 20 billion yeast cells! These microscopic organisms eat sugar and produce CO\u2082 gas and alcohol through fermentation \u2014 the gas makes bread rise, and the alcohol evaporates during baking.',
          extraTag: 'Type: Microorganism',
        },
        {
          emoji: '\u{1F952}',
          name: 'Sourdough Starter',
          title: 'The Living Ingredient',
          description:
            'A sourdough starter is a living colony of wild yeast and lactic acid bacteria maintained in a mixture of flour and water. Bakers feed their starters daily to keep them alive. The Boudin Bakery in San Francisco has kept its sourdough starter alive since 1849 \u2014 over 175 years of continuous fermentation!',
          extraTag: 'Type: Fermentation',
        },
        {
          emoji: '\u{1F3ED}',
          name: 'Otto Rohwedder',
          title: 'Inventor of Sliced Bread',
          description:
            'Otto Frederick Rohwedder was an American inventor who spent 16 years developing the first automatic bread-slicing machine. His first prototype was destroyed in a fire in 1917, but he rebuilt it. In 1928, the Chillicothe Baking Company in Missouri used his machine to sell the first commercially sliced bread.',
          extraTag: 'Era: 1928',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Some sourdough starters are incredibly old! The Boudin Bakery in San Francisco has maintained the same sourdough starter since 1849 \u2014 during the California Gold Rush. Bakers even carried the starter to safety during the 1906 San Francisco earthquake!',
        },
      ],
      videos: [
        {
          youtubeId: 'IIomZb_ex_U',
          title: "How does flour affect bread's texture?",
          channelName: 'Harvard Online',
        },
      ],
      quizIds: ['batw-q3a', 'batw-q3b', 'batw-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: The Birth of Bread
    {
      id: 'batw-q1a',
      sectionId: 'birth-of-bread',
      title: 'Ancient Bread Quiz!',
      question:
        'Who were the ancient people that made the oldest bread ever discovered, around 14,000 years ago?',
      options: [
        { text: 'The ancient Egyptians', isCorrect: false },
        { text: 'The Natufians', isCorrect: true },
        { text: 'The ancient Romans', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'batw-q1b',
      sectionId: 'birth-of-bread',
      title: 'Egyptian Baking Quiz!',
      question:
        'How did the ancient Egyptians discover leavened bread (bread that rises)?',
      options: [
        { text: 'They added baking soda to their dough', isCorrect: false },
        { text: 'Wild yeast from the air landed on dough that was left out', isCorrect: true },
        { text: 'They learned the technique from Chinese traders', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'batw-q1c',
      sectionId: 'birth-of-bread',
      title: 'Flatbread Challenge!',
      question:
        'What special process did the Maya and Aztecs use to prepare corn for making tortillas?',
      options: [
        { text: 'Nixtamalization \u2014 soaking corn in an alkaline solution', isCorrect: true },
        { text: 'Fermentation \u2014 letting the corn sit for weeks', isCorrect: false },
        { text: 'Caramelization \u2014 heating corn until it turned brown', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'batw-q1d',
      sectionId: 'birth-of-bread',
      title: 'Gluten Quiz!',
      question:
        'What does gluten do in bread dough?',
      options: [
        { text: 'It adds flavor and makes bread taste sweet', isCorrect: false },
        { text: 'It forms stretchy strands that trap gas bubbles, helping bread rise', isCorrect: true },
        { text: 'It kills bacteria so the bread stays fresh longer', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Breads of the World
    {
      id: 'batw-q2a',
      sectionId: 'breads-of-the-world',
      title: 'Baguette Quiz!',
      question:
        'What happened in 2022 that honored the French baguette?',
      options: [
        { text: 'It was added to UNESCO\'s Intangible Cultural Heritage list', isCorrect: true },
        { text: 'France declared a national Baguette Holiday', isCorrect: false },
        { text: 'The world\'s longest baguette was baked in Paris', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'batw-q2b',
      sectionId: 'breads-of-the-world',
      title: 'Injera Quiz!',
      question:
        'What grain is Ethiopian injera traditionally made from?',
      options: [
        { text: 'Rice', isCorrect: false },
        { text: 'Wheat', isCorrect: false },
        { text: 'Teff', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'batw-q2c',
      sectionId: 'breads-of-the-world',
      title: 'Pumpernickel Quiz!',
      question:
        'What makes traditional German pumpernickel so dark in color?',
      options: [
        { text: 'Dark food coloring is added to the dough', isCorrect: false },
        { text: 'Baking at low temperatures for up to 24 hours causes the Maillard reaction', isCorrect: true },
        { text: 'The rye grain is naturally black before grinding', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Bread Science & Modern Baking
    {
      id: 'batw-q3a',
      sectionId: 'bread-science',
      title: 'Yeast Science Quiz!',
      question:
        'What two things does yeast produce when it eats sugar during fermentation?',
      options: [
        { text: 'Oxygen and water', isCorrect: false },
        { text: 'Carbon dioxide (CO\u2082) and ethanol (alcohol)', isCorrect: true },
        { text: 'Gluten and starch', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'batw-q3b',
      sectionId: 'bread-science',
      title: 'Sourdough Quiz!',
      question:
        'What is a sourdough starter?',
      options: [
        { text: 'A special type of commercial yeast sold in stores', isCorrect: false },
        { text: 'A machine that kneads dough automatically', isCorrect: false },
        { text: 'A living mixture of flour and water that captures wild yeast and bacteria', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'batw-q3c',
      sectionId: 'bread-science',
      title: 'Sliced Bread Quiz!',
      question:
        'When was the first commercially sliced bread sold?',
      options: [
        { text: '1928', isCorrect: true },
        { text: '1955', isCorrect: false },
        { text: '1901', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'batw-essay',
    prompt:
      'If you could create a brand-new bread for the world, what would it be like?',
    description:
      'Time to become a master baker! Imagine you could invent a completely new type of bread. What grains or ingredients would you use? What shape would it be? Would it be flat or fluffy, sweet or savory? How would people eat it \u2014 by itself, with a meal, or as a special treat? Give your bread a name and describe what makes it special! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'What a delicious invention! Your bread creation has been saved. You\'re a true master baker!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'batw-reward',
    title: 'Bread Atlas Explorer!',
    description:
      'You\'ve unlocked the Bread Atlas! Explore an interactive map of breads from around the world. Click on each country to discover its signature bread, learn how it\'s made, and see what makes it unique!',
    lockMessage: 'Bread Atlas Locked!',
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
    type: 'bread-atlas',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Bread Atlas! You\'re a true global bread expert!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You\'re a Bread Champion!',
    paragraphs: [
      'Congratulations! You\'ve traveled the world and through time to discover the incredible story of bread!',
      'You learned that bread is over 14,000 years old, first made by the Natufians in the Fertile Crescent long before the invention of agriculture. You discovered how the ancient Egyptians accidentally invented risen bread when wild yeast landed on their dough, and how flatbreads like tortillas, naan, and injera developed independently across cultures around the globe.',
      'You explored the amazing diversity of breads worldwide \u2014 from France\'s UNESCO-honored baguette to Japan\'s pillowy shokupan, from Ethiopia\'s spongy injera to Germany\'s slow-baked pumpernickel, and from India\'s tandoor-fired naan to the beautifully braided challah.',
      'And you uncovered the science that makes it all work \u2014 how yeast and fermentation produce gas bubbles, how gluten creates the stretchy network that gives bread its structure, and how ancient sourdough starters are still alive and bubbling today.',
      'The next time you bite into a piece of bread, remember: you\'re enjoying one of humanity\'s oldest, most universal, and most important foods. Every crust, every crumb, and every culture\'s unique bread tells a story of human ingenuity and connection!',
    ],
  },
};
