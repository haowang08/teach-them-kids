import type { Topic } from '../types';

export const streetFoodAroundTheWorld: Topic = {
  id: 'street-food-around-the-world',
  slug: 'street-food-around-the-world',
  title: 'Street Food Around the World',
  subtitle:
    'Delicious Bites From Every Corner of the Globe',
  status: 'active',
  themeId: 'street-food-around-the-world',
  heroIcons: ['\u{1F35C}', '\u{1F32E}', '\u{1F354}'],
  navItems: [
    { id: 'asian-street-food', icon: '\u{1F35C}', label: 'Asian Street Food' },
    { id: 'latin-middle-east', icon: '\u{1F32E}', label: 'Latin American & Middle Eastern' },
    { id: 'african-european', icon: '\u{1F35F}', label: 'African & European' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F30D}',
      title: 'Welcome, Street Food Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Imagine walking down a bustling street and smelling something so delicious that you just have to follow your nose. That\'s the magic of street food! All around the world, from the night markets of Bangkok to the food carts of Mexico City, incredible chefs cook up amazing dishes right on the sidewalk.',
            'Street food isn\'t just tasty \u2014 it tells the story of a culture. Every dish carries centuries of history, family recipes passed down through generations, and the flavors of local ingredients. Street food is often the most authentic food you can find in any country because it\'s made by people who learned to cook from their parents and grandparents.',
            'In this adventure, you\'ll travel the world through your taste buds! We\'ll explore the sizzling woks of Asia, the vibrant flavors of Latin America and the Middle East, and the incredible street foods of Africa and Europe. Get ready to discover dishes you\'ve never heard of \u2014 and some that might become your new favorites!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'ahEesHYyyvk',
          title: 'Exploring Mumbai\'s Busiest Street Food Market',
          channelName: 'Bon Appetit',
        },
        {
          youtubeId: 'gLECSBLcBlk',
          title: 'Kids Try Street Food from Around the World',
          channelName: 'HiHo Kids',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Asian Street Food ───────────────────────────
    {
      id: 'asian-street-food',
      icon: '\u{1F35C}',
      title: 'Asian Street Food: Woks, Noodles & Bold Flavors',
      readAloudBlocks: [
        {
          id: 'asian-street-food-intro',
          paragraphs: [
            'Asia is the undisputed king of street food! From the bustling night markets of Taiwan to the hawker centers of Singapore, millions of people eat incredible meals on the street every single day. In many Asian countries, street food isn\'t just a snack \u2014 it\'s how most people eat their meals.',
            'What makes Asian street food so special? It\'s the perfect combination of fresh ingredients, bold flavors, and techniques that have been perfected over centuries. A street vendor in Bangkok might use the same recipe that their great-grandmother created a hundred years ago. Let\'s explore some of the most amazing Asian street foods!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F35C}',
          name: 'Pad Thai',
          title: 'Thailand\'s National Dish',
          description:
            'Pad Thai is stir-fried rice noodles with eggs, tofu or shrimp, bean sprouts, and a sweet-sour-salty sauce made from tamarind, fish sauce, and palm sugar. Amazingly, it was actually invented by the Thai government in the 1930s to promote national unity and use more rice noodles! Today, you can find pad Thai vendors on almost every street corner in Bangkok.',
          extraTag: 'Country: Thailand',
        },
        {
          emoji: '\u{1F419}',
          name: 'Takoyaki',
          title: 'Japanese Octopus Balls',
          description:
            'Takoyaki are crispy-on-the-outside, gooey-on-the-inside balls made from a wheat flour batter with a piece of octopus inside. They were invented in Osaka, Japan in 1935 by a street vendor named Tomekichi Endo. Vendors cook them in special cast-iron pans with half-sphere molds, flipping each ball with a pick to get them perfectly round. They\'re topped with a sweet sauce, mayo, bonito flakes, and seaweed.',
          extraTag: 'Country: Japan',
        },
        {
          emoji: '\u{1F35B}',
          name: 'Chaat',
          title: 'India\'s Flavor Explosion',
          description:
            'Chaat is a family of savory snacks from India that are an explosion of flavors and textures. The word "chaat" means "to lick" in Hindi because the flavors are so good you\'ll want to lick your fingers! A plate of chaat might include crispy fried dough, tangy tamarind chutney, cooling yogurt, spicy green chutney, and crunchy onions. Every region of India has its own special version.',
          extraTag: 'Country: India',
        },
        {
          emoji: '\u{1F525}',
          name: 'Tteokbokki',
          title: 'Korean Spicy Rice Cakes',
          description:
            'Tteokbokki is one of Korea\'s most beloved street foods \u2014 chewy rice cakes swimming in a spicy, sweet, and slightly sticky red sauce made from gochujang (fermented red chili paste). It started as a royal court dish centuries ago but became a street food sensation in the 1950s when a vendor in Seoul added gochujang to the recipe. Today, it\'s the ultimate Korean comfort food!',
          extraTag: 'Country: South Korea',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Singapore\'s hawker centers are so culturally important that they were added to UNESCO\'s list of Intangible Cultural Heritage in 2020! These open-air food courts have hundreds of stalls serving dishes from Chinese, Malay, Indian, and other cuisines, all in one place.',
        },
      ],
      videos: [
        {
          youtubeId: 'SehlhJ3casI',
          title: 'Mexico City\'s Best Street Food & Where to Find It',
          channelName: 'Travel + Leisure',
        },
      ],
      quizIds: ['street-q1a', 'street-q1b', 'street-q1c', 'street-q1d'],
    },

    // ─── Section 2: Latin American & Middle Eastern ──────────────
    {
      id: 'latin-middle-east',
      icon: '\u{1F32E}',
      title: 'Latin American & Middle Eastern Street Food',
      readAloudBlocks: [
        {
          id: 'latin-middle-east-intro',
          paragraphs: [
            'From the colorful food stands of Mexico City to the sizzling grills of Istanbul, Latin America and the Middle East serve up some of the world\'s most incredible street food. These regions have ancient food traditions that go back thousands of years, and their street food reflects that rich history.',
            'In Mexico, street food is called "antojitos," which means "little cravings." In the Middle East, the tradition of cooking food on the street goes back to ancient times when vendors sold food in bazaars and marketplaces. Let\'s discover some mouthwatering dishes from these amazing food cultures!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F32E}',
          name: 'Tacos al Pastor',
          title: 'Mexico\'s Greatest Fusion Food',
          description:
            'Tacos al pastor is one of the most amazing fusion foods in history! It was created by Lebanese immigrants who came to Mexico in the early 1900s and brought their shawarma recipe with them. They adapted it using local ingredients: pork instead of lamb, a corn tortilla instead of pita bread, and added pineapple, cilantro, and salsa. The result? Pure deliciousness on a spinning vertical spit!',
          extraTag: 'Country: Mexico',
        },
        {
          emoji: '\u{1F944}',
          name: 'Arepas',
          title: 'Venezuela & Colombia\'s Corn Pockets',
          description:
            'Arepas are round, golden cornmeal patties that are grilled, baked, or fried and then split open and stuffed with all kinds of fillings. They\'ve been eaten in South America for over 3,000 years \u2014 long before Europeans arrived! Indigenous peoples made them from ground maize, and today they\'re the ultimate street food in Venezuela and Colombia, stuffed with cheese, beans, meat, or avocado.',
          extraTag: 'Countries: Venezuela & Colombia',
        },
        {
          emoji: '\u{1F9C6}',
          name: 'Falafel',
          title: 'The Middle East\'s Crispy Treasure',
          description:
            'Falafel are crispy, golden balls made from ground chickpeas (or fava beans in Egypt), mixed with herbs, spices, and onion, then deep-fried to perfection. Nobody knows exactly who invented falafel \u2014 several countries claim it! Whether it started in Egypt, Palestine, or Lebanon, falafel is now one of the world\'s most popular street foods, served in a warm pita with tahini sauce, pickles, and fresh vegetables.',
          extraTag: 'Region: Middle East',
        },
        {
          emoji: '\u{1F356}',
          name: 'Shawarma',
          title: 'The Spinning Meat Tower',
          description:
            'Shawarma is made by stacking seasoned slices of meat (chicken, lamb, or beef) on a tall vertical spit that slowly rotates in front of a heat source. As the outside layer cooks and becomes crispy and caramelized, the vendor shaves off thin slices and tucks them into a warm flatbread. This cooking method originated in the Ottoman Empire and has spread around the world!',
          extraTag: 'Region: Middle East & Mediterranean',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Tacos al pastor and Turkish d\u00F6ner kebab are actually cousins! Both were inspired by the same cooking technique \u2014 stacking meat on a vertical spinning spit. Lebanese immigrants brought the idea from the Middle East to Mexico, where it was adapted with Mexican flavors and became a completely new dish.',
        },
      ],
      videos: [
        {
          youtubeId: 'o1ajIArgiBw',
          title: 'American Family tries VIETNAMESE STREET FOOD',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['street-q2a', 'street-q2b', 'street-q2c'],
    },

    // ─── Section 3: African & European ──────────────────────────
    {
      id: 'african-european',
      icon: '\u{1F35F}',
      title: 'African & European Street Food',
      readAloudBlocks: [
        {
          id: 'african-european-intro',
          paragraphs: [
            'Africa and Europe have street food traditions that are just as incredible and diverse as anywhere else in the world! Africa is home to vibrant food cultures that have been perfecting their recipes for thousands of years, while Europe\'s street food ranges from crispy Belgian frites to sizzling Italian arancini.',
            'What\'s amazing about street food from these continents is how it reflects history. African street food often uses ancient cooking techniques like grilling over open flames, while European street food tells the story of trade, migration, and cultural exchange. Let\'s explore some incredible dishes!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F356}',
          name: 'Suya',
          title: 'West Africa\'s Smoky Skewers',
          description:
            'Suya is one of West Africa\'s most popular street foods \u2014 spicy, smoky grilled meat skewers that are absolutely irresistible! Thinly sliced beef, chicken, or ram is coated in a special spice mix called "yaji" made from ground peanuts, cayenne pepper, ginger, garlic, and other spices. The skewers are grilled over charcoal and served with sliced onions, tomatoes, and sometimes cabbage. Suya originated with the Hausa people of Nigeria and has spread across West Africa.',
          extraTag: 'Region: West Africa (Nigeria)',
        },
        {
          emoji: '\u{1F35E}',
          name: 'Bunny Chow',
          title: 'South Africa\'s Bread Bowl Curry',
          description:
            'Bunny chow is a hollowed-out loaf of white bread filled with spicy curry! Despite its funny name, it has nothing to do with rabbits. It was created by the Indian community in Durban, South Africa in the 1940s. Workers needed a portable lunch, so they scooped out the inside of a bread loaf and filled it with curry. The bread served as both container and utensil \u2014 you tear off pieces and scoop up the curry!',
          extraTag: 'Country: South Africa',
        },
        {
          emoji: '\u{1F35F}',
          name: 'Belgian Frites',
          title: 'The Original French Fry',
          description:
            'Despite being called "French fries" in many countries, the crispy golden potato fry was likely invented in Belgium! Belgians have been frying potatoes since the late 1600s. What makes Belgian frites special is that they\'re fried twice: once at a low temperature to cook the inside, then again at a high temperature to get that perfect crispy exterior. They\'re served in a paper cone with mayonnaise!',
          extraTag: 'Country: Belgium',
        },
        {
          emoji: '\u{1F35A}',
          name: 'Arancini',
          title: 'Italy\'s Golden Rice Balls',
          description:
            'Arancini are crispy, golden-fried rice balls from Sicily, Italy. They\'re made by taking leftover risotto, stuffing it with a filling (often rag\u00F9 sauce, mozzarella, and peas), rolling it into a ball, coating it in breadcrumbs, and deep-frying it until perfectly golden. The name "arancini" means "little oranges" in Italian because they look like small oranges! They were first created in 10th-century Sicily during Arab rule.',
          extraTag: 'Country: Italy (Sicily)',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Belgium has over 5,000 friteries (frite shops)! That\'s roughly one frite shop for every 2,200 people. Belgian frites culture is so important that it was added to Belgium\'s list of national intangible cultural heritage in 2017.',
        },
      ],
      videos: [
        {
          youtubeId: 'qpz31pHf_uI',
          title: 'Top 7 Foods at Taiwan\'s Busiest Night Market',
          channelName: 'Bon Appetit',
        },
      ],
      quizIds: ['street-q3a', 'street-q3b', 'street-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Asian Street Food
    {
      id: 'street-q1a',
      sectionId: 'asian-street-food',
      title: 'Quick Quiz Time!',
      question:
        'Which country\'s government actually invented pad Thai in the 1930s to promote national unity?',
      options: [
        { text: 'Japan', isCorrect: false },
        { text: 'Thailand', isCorrect: true },
        { text: 'China', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q1b',
      sectionId: 'asian-street-food',
      title: 'Street Food Challenge!',
      question:
        'What are takoyaki, the popular Japanese street food, filled with?',
      options: [
        { text: 'Cheese', isCorrect: false },
        { text: 'Octopus', isCorrect: true },
        { text: 'Chicken', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q1c',
      sectionId: 'asian-street-food',
      title: 'Flavor Quiz!',
      question:
        'What does the Hindi word "chaat" mean, reflecting how tasty this Indian street food is?',
      options: [
        { text: 'To lick', isCorrect: true },
        { text: 'To share', isCorrect: false },
        { text: 'To celebrate', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q1d',
      sectionId: 'asian-street-food',
      title: 'Korean Food Quiz!',
      question:
        'What is gochujang, the key ingredient in tteokbokki sauce?',
      options: [
        { text: 'A type of soy sauce', isCorrect: false },
        { text: 'Fermented red chili paste', isCorrect: true },
        { text: 'A sweet sesame oil', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Latin American & Middle Eastern
    {
      id: 'street-q2a',
      sectionId: 'latin-middle-east',
      title: 'Quick Quiz Time!',
      question:
        'Tacos al pastor were created by immigrants from which country who brought their shawarma recipe to Mexico?',
      options: [
        { text: 'Spain', isCorrect: false },
        { text: 'Lebanon', isCorrect: true },
        { text: 'Italy', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q2b',
      sectionId: 'latin-middle-east',
      title: 'Ancient Food Challenge!',
      question:
        'How long have arepas been eaten in South America?',
      options: [
        { text: 'About 500 years', isCorrect: false },
        { text: 'About 1,000 years', isCorrect: false },
        { text: 'Over 3,000 years', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q2c',
      sectionId: 'latin-middle-east',
      title: 'Falafel Quiz!',
      question:
        'What is the main ingredient in falafel?',
      options: [
        { text: 'Lentils', isCorrect: false },
        { text: 'Ground chickpeas (or fava beans)', isCorrect: true },
        { text: 'Wheat flour', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: African & European
    {
      id: 'street-q3a',
      sectionId: 'african-european',
      title: 'Quick Quiz Time!',
      question:
        'What is the special spice mix called that is used to coat suya skewers in West Africa?',
      options: [
        { text: 'Garam masala', isCorrect: false },
        { text: 'Yaji', isCorrect: true },
        { text: 'Berbere', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q3b',
      sectionId: 'african-european',
      title: 'Street Food Origins Quiz!',
      question:
        'Why is bunny chow served in a hollowed-out bread loaf?',
      options: [
        { text: 'Because plates were too expensive', isCorrect: false },
        {
          text: 'Workers needed a portable lunch where the bread served as both container and utensil',
          isCorrect: true,
        },
        { text: 'Because bread absorbs extra oil from the curry', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'street-q3c',
      sectionId: 'african-european',
      title: 'Final Food Challenge!',
      question:
        'What does the Italian word "arancini" mean, describing the shape of these fried rice balls?',
      options: [
        { text: 'Little stars', isCorrect: false },
        { text: 'Little oranges', isCorrect: true },
        { text: 'Little suns', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'street-food-essay',
    prompt:
      'If you had a street food cart, what would you serve and why?',
    description:
      'Now it\'s your turn! Imagine you could set up your very own street food cart anywhere in the world. What would you serve? Would you create a fusion dish that mixes flavors from different countries, or would you perfect a classic recipe? Tell us about your dream street food! You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Delicious idea! Your answer has been saved. You\'re a true street food expert!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'street-food-reward',
    title: 'Open Your Street Food Stand!',
    description:
      'You\'ve unlocked the Street Food Stand! Celebrate your journey around the world through incredible street foods from every continent.',
    lockMessage: 'Street Food Stand Locked!',
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
    type: 'street-food-stand',
    celebrationMessage:
      'AMAZING! You\'ve opened your Street Food Stand! You\'re a true global food explorer!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Food Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled the world and discovered the incredible diversity of street food from every continent!',
      'You explored Asia\'s amazing street food scene \u2014 from Thailand\'s pad Thai (invented by the government!) to Japan\'s crispy takoyaki, India\'s flavor-packed chaat, and Korea\'s spicy tteokbokki. You learned that in many Asian countries, street food isn\'t just a snack, it\'s how millions of people eat every day.',
      'You discovered the delicious fusion foods of Latin America and the Middle East \u2014 how Lebanese immigrants created tacos al pastor in Mexico, how arepas have been eaten for over 3,000 years, and how nobody can agree on who invented falafel! You also learned about the spinning meat towers of shawarma.',
      'And you explored the rich street food traditions of Africa and Europe \u2014 from West Africa\'s smoky suya skewers to South Africa\'s creative bunny chow, Belgium\'s perfectly double-fried frites, and Sicily\'s golden arancini.',
      'Street food connects us all. Every dish tells a story of culture, history, and the creativity of people who turn simple ingredients into extraordinary flavors. Keep exploring and tasting the world!',
    ],
  },
};
