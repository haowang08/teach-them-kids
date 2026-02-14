import type { Topic } from '../types';

export const iceCreamFrozenTreats: Topic = {
  id: 'ice-cream-frozen-treats',
  slug: 'ice-cream-frozen-treats',
  title: 'Ice Cream & Frozen Treats',
  subtitle:
    'From Ancient Snow Desserts to Modern Scoops',
  status: 'active',
  themeId: 'ice-cream-frozen-treats',
  heroIcons: ['🍦', '🍧', '🍨'],
  navItems: [
    { id: 'frozen-history', icon: '🏛️', label: 'A Frozen History' },
    { id: 'frozen-world', icon: '🌍', label: 'Frozen Treats Around the World' },
    { id: 'science-of-ice-cream', icon: '🔬', label: 'The Science of Ice Cream' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '🍦',
      title: 'Welcome, Frozen Treat Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'What if I told you that people have been enjoying frozen treats for thousands of years — long before refrigerators or freezers were ever invented? That\'s right! The story of ice cream and frozen desserts stretches back to ancient civilizations who found clever ways to mix snow and ice with fruits, honey, and spices.',
            'But here\'s the surprising part: what we call "ice cream" today is actually a very modern invention. For most of history, frozen treats looked nothing like the scoops in a cone you might enjoy on a hot summer day. They were icy drinks, frozen fruit mixtures, and stretchy concoctions that would blow your mind!',
            'In this adventure, you\'ll travel from the snowy mountains of ancient China to the bustling streets of modern-day Tokyo and Istanbul. You\'ll discover how science makes ice cream possible, why some frozen treats are stretchy, and what actually causes brain freeze. Get ready for a journey that\'s as cool as it is delicious!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: '7K3KdgDcdYc',
          title: 'How Did Ancient Civilizations Make Ice Cream?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: A Frozen History ─────────────────────────────
    {
      id: 'frozen-history',
      icon: '🏛️',
      title: 'A Frozen History: From Snow to Scoops',
      readAloudBlocks: [
        {
          id: 'frozen-history-ancient',
          paragraphs: [
            'The earliest frozen treats date back thousands of years to ancient China, where people would mix snow and ice from the mountains with fruit juices and honey to create refreshing icy desserts. Chinese rulers during the Shang Dynasty (around 1600 BCE) are believed to have enjoyed mixtures of snow, fruit, and fermented milk.',
            'Meanwhile, in ancient Persia (modern-day Iran), people created one of the oldest known frozen desserts: faloodeh. Dating back to around 400 BCE, faloodeh is made from thin noodles of frozen starch mixed with rose water and lime juice. Persians had an ingenious system for storing ice — they built massive structures called "yakhchāls," which were ancient ice houses that could keep ice frozen even in the desert heat!',
          ],
        },
        {
          id: 'frozen-history-medieval',
          paragraphs: [
            'The Arab world gave us "sharbat" — a chilled drink made from fruit juices, flower petals, and sugar, cooled with snow brought down from mountaintops. The word "sharbat" is actually where our English word "sherbet" comes from! Arab traders and scholars spread their knowledge of frozen treats across the Mediterranean.',
            'There\'s a famous legend that the explorer Marco Polo brought a recipe for a frozen milk dessert from China to Italy in the late 1200s. However, most food historians consider this story to be a myth — there\'s no mention of it in Marco Polo\'s actual writings. The real story of how frozen desserts reached Europe is more gradual and complex.',
            'What we do know is that by the 1500s, Italian cooks were experimenting with freezing sweetened cream and fruit mixtures. The Medici family of Florence were great patrons of the culinary arts. When Catherine de\' Medici married King Henry II of France in 1533, she brought Italian cooks to the French court, and they introduced elaborate frozen desserts to French nobility. Italian gelato as we know it began taking shape in the Renaissance, with the first gelato shop opening in Paris in 1686, run by a Sicilian named Francesco Procopio dei Coltelli.',
          ],
        },
      ],
      characters: [
        {
          emoji: '🏔️',
          name: 'Ancient Chinese Snow Mixers',
          title: 'The First Frozen Treat Makers',
          description:
            'As far back as the Shang Dynasty (around 1600 BCE), people in China mixed snow and ice from the mountains with fruit, honey, and fermented milk to create chilled desserts. They were among the first to discover that mixing ice with sweet ingredients created something truly special.',
          extraTag: 'Period: ~1600 BCE onward',
        },
        {
          emoji: '🧊',
          name: 'Persian Faloodeh Makers',
          title: 'Masters of Ancient Ice Houses',
          description:
            'Around 400 BCE, Persians created faloodeh — thin frozen starch noodles with rose water and lime juice. They also built massive yakhchāls (ancient refrigerators) that could store ice in the middle of the desert, proving that human ingenuity can beat even the hottest climates!',
          extraTag: 'Period: ~400 BCE',
        },
        {
          emoji: '🍋',
          name: 'Arab Sharbat Creators',
          title: 'Inventors of Sherbet',
          description:
            'Arab cultures perfected the art of the "sharbat" — chilled, sweetened drinks made from fruit juices, flower petals, and sugar, cooled with mountain snow. The word "sharbat" gave us "sherbet" and "sorbet" — two words (and treats!) we still use today.',
          extraTag: 'Origin: Medieval Middle East',
        },
        {
          emoji: '🇮🇹',
          name: 'Francesco Procopio dei Coltelli',
          title: 'Father of the Gelato Shop',
          description:
            'This Sicilian chef opened the Café Procope in Paris in 1686, which is often credited as the first establishment to serve gelato to the general public. His café became wildly popular and helped spread the love of frozen desserts across Europe.',
          extraTag: 'Year: 1686, Paris',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Persian yakhchāls could store ice all through the scorching summer! These cone-shaped mud-brick structures used thick walls, underground channels, and clever ventilation to keep ice frozen — all without any electricity. Some yakhchāls still stand in Iran today, over 2,000 years old!',
        },
      ],
      videos: [
        {
          youtubeId: '53noEBeu9gQ',
          title: 'The History of Ice Cream | Food: Now and Then',
          channelName: 'NowThis Impact',
        },
      ],
      quizIds: ['icft-q1a', 'icft-q1b', 'icft-q1c', 'icft-q1d'],
    },

    // ─── Section 2: Frozen Treats Around the World ────────────────
    {
      id: 'frozen-world',
      icon: '🌍',
      title: 'Frozen Treats Around the World',
      readAloudBlocks: [
        {
          id: 'frozen-world-gelato',
          paragraphs: [
            'If you\'ve ever wondered why Italian gelato tastes different from American ice cream, the answer comes down to science! Gelato is churned at a slower speed than ice cream, which means less air gets whipped into it. While American ice cream can contain up to 50% air (called "overrun"), gelato typically has only 20–30% air. Gelato also has a lower fat content — usually 4–8% milkfat compared to ice cream\'s minimum of 10%. Less air and less fat means gelato is denser, silkier, and the flavors taste more intense!',
            'In Japan, mochi ice cream combines two beloved treats: chewy mochi (pounded rice cake) wrapped around a ball of ice cream. It was popularized in the United States by Japanese-American businesswoman Frances Hashimoto in the early 1990s, though the concept of wrapping ice cream in mochi originated in Japan. The stretchy, chewy mochi shell and the cold, creamy ice cream inside create an amazing contrast of textures.',
          ],
        },
        {
          id: 'frozen-world-varieties',
          paragraphs: [
            'Perhaps the most spectacular frozen treat is Turkish dondurma. This stretchy, chewy ice cream gets its incredible texture from two special ingredients: salep (a flour made from wild orchid tubers) and mastic (a tree resin). Dondurma is so thick and elastic that vendors in Istanbul put on shows, stretching it like taffy and playfully teasing customers by flipping the cone upside down — and the ice cream doesn\'t fall out!',
            'Indian kulfi is one of the oldest frozen desserts in South Asia, denser than regular ice cream because it is not whipped. Traditional kulfi is made by slowly simmering milk for hours until it reduces to about half its volume, then flavoring it with cardamom, saffron, pistachios, or mango and freezing it in molds. Because it contains no added air, kulfi is incredibly rich and creamy.',
            'In Mexico, paletas are frozen fruit bars made with fresh fruits, juices, and sometimes cream. The word "paleta" means "little stick," and these popsicles come in amazing flavors like mango with chili, watermelon with lime, and creamy coconut. Thai rolled ice cream, also called "stir-fried ice cream," is made by pouring a liquid ice cream base onto a freezing-cold metal plate (around -30°C/-22°F), mixing in toppings, and scraping it into beautiful rolls.',
          ],
        },
        {
          id: 'frozen-world-sorbet',
          paragraphs: [
            'You might wonder: what\'s the difference between sorbet and sherbet? Sorbet is made from fruit juice or purée, sugar, and water — it contains no dairy at all, making it a great option for people who can\'t eat milk products. Sherbet, on the other hand, contains a small amount of dairy (usually 1–2% milkfat), giving it a slightly creamier texture than sorbet but less richness than ice cream. Both are delicious, but they\'re definitely not the same thing!',
          ],
        },
      ],
      characters: [
        {
          emoji: '🇹🇷',
          name: 'Turkish Dondurma Vendors',
          title: 'Masters of Stretchy Ice Cream',
          description:
            'Turkish dondurma vendors are famous for their playful performances. Using long metal paddles, they stretch, flip, and twirl the elastic ice cream, teasing customers by pulling the cone away at the last second. The secret ingredients — salep from orchid tubers and mastic tree resin — make dondurma resist melting and stretch like taffy!',
          extraTag: 'Country: Turkey',
        },
        {
          emoji: '🇮🇳',
          name: 'Indian Kulfi Makers',
          title: 'Creators of the Densest Frozen Treat',
          description:
            'Kulfi makers patiently simmer milk for hours until it thickens and reduces, then flavor it with cardamom, saffron, pistachios, or mango. Because kulfi is not churned or whipped, it\'s much denser and creamier than Western ice cream. It\'s traditionally frozen in cone-shaped metal molds called "kulhar."',
          extraTag: 'Country: India',
        },
        {
          emoji: '🇲🇽',
          name: 'Mexican Paleteros',
          title: 'Artisans of Frozen Fruit Bars',
          description:
            'Paleteros push colorful carts through neighborhoods selling paletas — handmade frozen fruit bars in incredible flavors like mango-chili, tamarind, and strawberries-and-cream. Using fresh, local fruits, these artisans have turned a simple frozen treat into an art form loved across Latin America and beyond.',
          extraTag: 'Country: Mexico',
        },
        {
          emoji: '🇯🇵',
          name: 'Mochi Ice Cream Creators',
          title: 'Combining Two Beloved Treats',
          description:
            'Japanese mochi ice cream wraps a ball of ice cream inside soft, chewy pounded rice cake. The combination of the stretchy, slightly sweet mochi and the cold, creamy ice cream is a textural masterpiece. Frances Hashimoto helped popularize mochi ice cream in the U.S. in the 1990s through her family\'s company.',
          extraTag: 'Country: Japan',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Turkish dondurma is so stretchy and resistant to melting that you can literally flip a cone upside down and the ice cream stays put! The salep flour from wild orchid tubers acts as a natural thickener, but harvesting wild orchids is now restricted in Turkey to protect the plants, making authentic dondurma increasingly rare.',
        },
      ],
      videos: [
        {
          youtubeId: 'MH4GgKsf7-U',
          title: 'Mass-Producing Ice Cream with Food Engineering',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['icft-q2a', 'icft-q2b', 'icft-q2c'],
    },

    // ─── Section 3: The Science of Ice Cream ──────────────────────
    {
      id: 'science-of-ice-cream',
      icon: '🔬',
      title: 'The Science of Ice Cream',
      readAloudBlocks: [
        {
          id: 'science-freezing',
          paragraphs: [
            'Ice cream is one of the most scientifically fascinating foods you can eat! It\'s a complex mixture that exists as a solid, a liquid, and a gas all at the same time. Let\'s start with one of the most important concepts: freezing point depression.',
            'Pure water freezes at 0°C (32°F), but when you dissolve sugar or salt in water, the freezing point drops lower. That\'s why we add sugar to ice cream — it\'s not just for sweetness! The sugar prevents the mixture from freezing into a solid block of ice and instead creates a softer, scoopable texture. This is also why you sprinkle salt on an ice cream maker\'s ice bath: the salt lowers the ice\'s melting point, making the salty ice water colder than 0°C, which helps freeze the cream mixture faster.',
          ],
        },
        {
          id: 'science-fat-air',
          paragraphs: [
            'Fat and air are two other crucial ingredients in ice cream science. The fat in cream coats tiny air bubbles and ice crystals, preventing them from clumping together and keeping the texture smooth. Without enough fat, ice cream would be icy and crunchy instead of creamy.',
            'The amount of air whipped into ice cream is called "overrun." If you start with one liter of ice cream base and end up with two liters of ice cream, that\'s 100% overrun — half of your ice cream is actually air! Cheap ice cream often has high overrun (up to 100%), which is why it feels lighter and less flavorful. Premium ice cream has lower overrun (around 25%), making it denser and richer. Gelato has even less air, which is why it tastes so intense.',
            'Emulsifiers — ingredients like egg yolks and lecithin — play a vital role too. They help fat and water mix together evenly (normally they would separate, like oil and vinegar). Emulsifiers keep ice cream smooth by surrounding fat droplets and preventing them from joining together into large, greasy clumps.',
          ],
        },
        {
          id: 'science-modern',
          paragraphs: [
            'One of the coolest modern ice cream techniques uses liquid nitrogen! At -196°C (-321°F), liquid nitrogen freezes the ice cream base almost instantly. Because the freezing happens so fast, the ice crystals that form are incredibly tiny — and tiny crystals mean ultra-smooth, ultra-creamy ice cream. Some restaurants and ice cream shops make liquid nitrogen ice cream right in front of you in a cloud of dramatic white vapor!',
            'Ever gotten an "ice cream headache" or brain freeze? Here\'s what actually happens: when something very cold touches the roof of your mouth, it rapidly cools the blood vessels there. Your body responds by quickly dilating (widening) the blood vessels to warm the area back up. This rapid dilation triggers pain receptors, and because the nerves in the roof of your mouth are connected to your head through the trigeminal nerve, you feel the pain in your forehead! The fix is simple: press your tongue to the roof of your mouth to warm it up faster.',
            'Today, the frozen treat world is more innovative than ever. Dairy-free alternatives made from oat milk, coconut milk, and cashew milk have exploded in popularity, using ingredients like coconut oil and tapioca starch to mimic the creamy texture of traditional ice cream. Scientists are even experimenting with protein-based ice creams and probiotic frozen treats. The future of frozen desserts is looking cooler than ever!',
          ],
        },
      ],
      characters: [
        {
          emoji: '🧪',
          name: 'Freezing Point Depression',
          title: 'The Science Behind Scoopability',
          description:
            'When you add sugar or salt to water, the freezing point drops below 0°C. This is why ice cream doesn\'t freeze into a rock-hard block — the sugar in the mixture keeps it soft and scoopable. It\'s also why old-fashioned ice cream makers use salt and ice: the salt makes the ice bath colder than normal freezing temperature!',
          extraTag: 'Key Concept: Colligative Properties',
        },
        {
          emoji: '💨',
          name: 'Overrun (Air Content)',
          title: 'The Invisible Ingredient',
          description:
            'Air is a key ingredient in ice cream! The percentage of air whipped into ice cream is called "overrun." Budget ice cream can be up to 100% overrun (half air!), while premium ice cream has about 25% overrun. Gelato has even less air, which is why it\'s denser and more flavorful. Next time you pick up a pint, check the weight — heavier usually means less air and more quality!',
          extraTag: 'Range: 25%–100% overrun',
        },
        {
          emoji: '🥚',
          name: 'Emulsifiers',
          title: 'The Peacemakers of Ice Cream',
          description:
            'Fat and water normally don\'t mix — think of oil floating on top of vinegar. Emulsifiers like egg yolks and lecithin act as peacemakers, surrounding fat droplets and helping them blend smoothly with the water-based ingredients. Without emulsifiers, ice cream would be greasy and icy instead of smooth and creamy.',
          extraTag: 'Examples: Egg yolks, lecithin',
        },
        {
          emoji: '🧊',
          name: 'Liquid Nitrogen Ice Cream',
          title: 'Flash-Frozen at -196°C',
          description:
            'At -196°C (-321°F), liquid nitrogen freezes ice cream base almost instantly. The ultra-fast freezing creates tiny ice crystals, resulting in the smoothest, creamiest ice cream possible. The dramatic clouds of white vapor make it look like a science experiment — because it is one!',
          extraTag: 'Temperature: -196°C / -321°F',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Brain freeze has a scientific name: sphenopalatine ganglioneuralgia! Try saying that five times fast! The pain happens because cold food rapidly cools the blood vessels in the roof of your mouth, causing them to swell quickly. To stop brain freeze, just press your tongue against the roof of your mouth to warm it up!',
        },
      ],
      videos: [
        {
          youtubeId: '-rlapUkWCSM',
          title: 'How Science Affects Your Ice Cream',
          channelName: 'Reactions',
        },
      ],
      quizIds: ['icft-q3a', 'icft-q3b', 'icft-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: A Frozen History
    {
      id: 'icft-q1a',
      sectionId: 'frozen-history',
      title: 'Quick Quiz Time!',
      question:
        'What is faloodeh, one of the oldest known frozen desserts from ancient Persia?',
      options: [
        { text: 'Frozen fruit juice on a stick', isCorrect: false },
        { text: 'Thin frozen starch noodles with rose water and lime juice', isCorrect: true },
        { text: 'Whipped cream with honey', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'icft-q1b',
      sectionId: 'frozen-history',
      title: 'Ancient Ice Challenge!',
      question:
        'What were Persian "yakhchāls" used for?',
      options: [
        { text: 'Growing fruit in the desert', isCorrect: false },
        { text: 'Storing and keeping ice frozen, even in hot climates', isCorrect: true },
        { text: 'Cooking food over open flames', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'icft-q1c',
      sectionId: 'frozen-history',
      title: 'Word Origins Quiz!',
      question:
        'Which Arabic word gave us the English words "sherbet" and "sorbet"?',
      options: [
        { text: 'Sharbat', isCorrect: true },
        { text: 'Faloodeh', isCorrect: false },
        { text: 'Dondurma', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'icft-q1d',
      sectionId: 'frozen-history',
      title: 'History Detective Quiz!',
      question:
        'What is the story about Marco Polo bringing a frozen dessert recipe from China to Italy?',
      options: [
        { text: 'A well-documented historical event', isCorrect: false },
        { text: 'Likely a myth — there\'s no mention of it in his actual writings', isCorrect: true },
        { text: 'A recipe he published in a famous cookbook', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Frozen Treats Around the World
    {
      id: 'icft-q2a',
      sectionId: 'frozen-world',
      title: 'Quick Quiz Time!',
      question:
        'Why does Italian gelato taste more intense than American ice cream?',
      options: [
        { text: 'It has more sugar added to it', isCorrect: false },
        { text: 'It contains less air and less fat, making it denser', isCorrect: true },
        { text: 'It is served at a much colder temperature', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'icft-q2b',
      sectionId: 'frozen-world',
      title: 'Stretchy Treat Challenge!',
      question:
        'What two special ingredients make Turkish dondurma so stretchy and elastic?',
      options: [
        { text: 'Gelatin and cornstarch', isCorrect: false },
        { text: 'Salep (orchid flour) and mastic (tree resin)', isCorrect: true },
        { text: 'Egg whites and tapioca', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'icft-q2c',
      sectionId: 'frozen-world',
      title: 'Dairy or No Dairy Quiz!',
      question:
        'What is the main difference between sorbet and sherbet?',
      options: [
        { text: 'Sorbet has no dairy; sherbet contains a small amount of dairy (1–2% milkfat)', isCorrect: true },
        { text: 'Sorbet is frozen and sherbet is served as a liquid drink', isCorrect: false },
        { text: 'They are exactly the same thing with different names', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: The Science of Ice Cream
    {
      id: 'icft-q3a',
      sectionId: 'science-of-ice-cream',
      title: 'Quick Quiz Time!',
      question:
        'Why do we add sugar to ice cream, besides making it sweet?',
      options: [
        { text: 'To make it freeze faster', isCorrect: false },
        { text: 'To lower the freezing point so it stays soft and scoopable', isCorrect: true },
        { text: 'To preserve it for longer', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'icft-q3b',
      sectionId: 'science-of-ice-cream',
      title: 'Air Science Challenge!',
      question:
        'What is "overrun" in ice cream making?',
      options: [
        { text: 'The amount of sugar added to the mix', isCorrect: false },
        { text: 'The percentage of air whipped into the ice cream', isCorrect: true },
        { text: 'The speed at which the ice cream is frozen', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'icft-q3c',
      sectionId: 'science-of-ice-cream',
      title: 'Brain Freeze Challenge!',
      question:
        'What causes brain freeze (ice cream headache)?',
      options: [
        { text: 'Your brain actually gets colder from the ice cream', isCorrect: false },
        { text: 'Cold food rapidly cools blood vessels in the roof of your mouth, causing them to quickly dilate', isCorrect: true },
        { text: 'The sugar in ice cream temporarily shocks your taste buds', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'icft-essay',
    prompt:
      'If you could invent a brand-new frozen treat, what would it be like?',
    description:
      'Now it\'s your turn! Imagine you\'re a frozen treat inventor. What kind of frozen dessert would you create? Would it be stretchy like Turkish dondurma? Made with unusual flavors like mango-chili? Flash-frozen with liquid nitrogen? Maybe inspired by a frozen treat from another country? Describe your invention — what ingredients would you use, what would it look like, and what would you call it? You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Cool creation! Your frozen treat invention has been saved. You\'re a true ice cream innovator!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'icft-reward',
    title: 'Welcome to the Ice Cream Factory!',
    description:
      'You\'ve unlocked the Ice Cream Factory! Explore the incredible world of frozen treats, from ancient Persian faloodeh to modern liquid nitrogen ice cream.',
    lockMessage: 'Ice Cream Factory Locked!',
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
    type: 'ice-cream-factory',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Ice Cream Factory! You\'re a true frozen treat scientist!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Frozen Treat Explorer!',
    paragraphs: [
      'Congratulations! You\'ve completed an incredible journey through the world of ice cream and frozen treats!',
      'You discovered that frozen desserts go back thousands of years — from ancient Chinese snow mixed with fruit and honey, to Persian faloodeh dating back to around 400 BCE, to Arab sharbat that gave us the words "sherbet" and "sorbet." You followed the trail to Renaissance Italy, where gelato took shape and Francesco Procopio dei Coltelli opened the first gelato shop in Paris in 1686.',
      'You traveled the world tasting incredible frozen treats: dense Italian gelato with its low air and intense flavors, stretchy Turkish dondurma made with orchid flour and tree resin, rich Indian kulfi simmered for hours, refreshing Mexican paletas bursting with fresh fruit, chewy Japanese mochi ice cream, and mesmerizing Thai rolled ice cream.',
      'And you became an ice cream scientist! You learned how sugar lowers the freezing point to keep ice cream scoopable, how air (overrun) affects density and flavor, how emulsifiers keep everything smooth, how liquid nitrogen creates the creamiest ice cream possible, and why brain freeze happens (blame the trigeminal nerve!).',
      'Next time you enjoy a scoop of ice cream, a paleta, or a cup of gelato, remember — you\'re tasting thousands of years of human creativity, science, and deliciousness!',
    ],
  },
};
