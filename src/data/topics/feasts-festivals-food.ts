import type { Topic } from '../types';

export const feastsFestivalsFood: Topic = {
  id: 'feasts-festivals-food',
  slug: 'feasts-festivals-food',
  title: 'Feasts, Festivals & Food Traditions',
  subtitle:
    'How the World Celebrates with Food',
  status: 'active',
  themeId: 'feasts-festivals-food',
  heroIcons: ['\u{1F389}', '\u{1F372}', '\u{1F38A}'],
  navItems: [
    { id: 'asian-celebrations', icon: '\u{1F9E7}', label: 'Asian Celebrations' },
    { id: 'western-middle-eastern', icon: '\u{1F357}', label: 'Western & Middle Eastern' },
    { id: 'latin-african', icon: '\u{1F480}', label: 'Latin American & African' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F30D}',
      title: 'Every Celebration Has a Feast!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever wondered why we eat certain foods on special holidays? All around the world, people celebrate their most important days with feasts. Food isn\'t just fuel for our bodies \u2014 it\'s a way to tell stories, honor ancestors, and bring families together!',
            'From dumplings at Chinese New Year to turkey at Thanksgiving, every culture has dishes that carry deep meaning. Some foods symbolize good luck, others represent new beginnings, and many are recipes that grandparents have passed down for hundreds of years.',
            'In this adventure, you\'ll travel the globe to discover the most amazing food traditions from festivals in Asia, the Western world, the Middle East, Latin America, and Africa. Get ready for a delicious journey!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'jQTPJ1WrBBo',
          title: 'History of Latkes',
          channelName: 'YouTube',
        },
        {
          youtubeId: 'LTUg62MZLqQ',
          title: 'Why Chinese people eat dumplings on Lunar New Year',
          channelName: 'YouTube',
        },
        {
          youtubeId: 'gd0CSEi67_s',
          title: 'Five Ramadan Iftar Meals Around the World',
          channelName: 'YouTube',
        },
        {
          youtubeId: 'NdMbvIR2fGE',
          title: 'West Africans Try Other West Africans Jollof Rice',
          channelName: 'YouTube',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Asian Celebrations ──────────────────────────
    {
      id: 'asian-celebrations',
      icon: '\u{1F9E7}',
      title: 'Asian Celebrations: Food for Luck & Togetherness',
      readAloudBlocks: [
        {
          id: 'asian-intro-text',
          paragraphs: [
            'Across Asia, festivals are bursting with color, fireworks, and incredible food. Many of these celebrations follow the lunar calendar, which is based on the phases of the moon. The foods served at these festivals aren\'t chosen randomly \u2014 each dish carries a special meaning!',
            'In China, the shape of a food might represent coins or gold bars. In India, sweets are offered to the gods before being shared with family. In Japan, every dish served at New Year\'s has a wish for the coming year built right in. Let\'s explore some of the most delicious festival foods in Asia!',
          ],
        },
        {
          id: 'asian-details-text',
          paragraphs: [
            'Chinese New Year is the biggest celebration in the Chinese calendar, and food is at the very heart of it. Families gather to make jiaozi, crescent-shaped dumplings that look like ancient gold ingots. The more dumplings you eat, legend says, the more wealth you\'ll have in the new year! Fish is always served whole because the Chinese word for fish, "y\u00FA," sounds like the word for surplus. Long, uncut noodles represent a long life, so don\'t break them!',
            'During Diwali, the Hindu Festival of Lights, Indian families prepare mountains of sweets called mithai. Round ladoo made from chickpea flour, ghee, and sugar are shared with neighbors and friends. Barfi, a dense milk-based sweet, and jalebi, bright orange spirals of fried batter soaked in syrup, fill every home with sweetness. These sweets are first offered to the gods, especially Lakshmi, the goddess of wealth, before everyone enjoys them together.',
            'In Japan, New Year\'s food is called osechi-ryori, and it comes in beautiful stacked boxes called jubako. Each item has a meaning: shrimp represent long life because their curved backs look like elderly people, black beans called kuromame mean good health, and sweet chestnuts with gold-colored sweet potato represent golden treasure. Mochi, pounded sticky rice cakes, are essential \u2014 families even have mochi-pounding ceremonies!',
            'Korean families celebrate Chuseok, the harvest festival, by making songpyeon \u2014 half-moon-shaped rice cakes stuffed with sesame seeds, sweet beans, or chestnuts, then steamed on a bed of pine needles. There\'s even a saying that whoever makes the prettiest songpyeon will find a beautiful partner! Families also prepare japchae, colorful stir-fried glass noodles, and savory jeon pancakes.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'During Chinese New Year, families sometimes hide a coin inside one lucky dumpling. Whoever finds the coin in their dumpling is said to have extra good fortune for the entire year!',
        },
      ],
      videos: [
        {
          youtubeId: 'may2s9j4RLk',
          title: 'The Myth Behind the Chinese Zodiac',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['feast-q1a', 'feast-q1b', 'feast-q1c', 'feast-q1d'],
    },

    // ─── Section 2: Western & Middle Eastern ────────────────────
    {
      id: 'western-middle-eastern',
      icon: '\u{1F357}',
      title: 'Western & Middle Eastern Food Traditions',
      readAloudBlocks: [
        {
          id: 'western-intro-text',
          paragraphs: [
            'Western and Middle Eastern festivals also have deep connections to food. Many of these celebrations have roots in religious traditions that go back thousands of years. The foods served at these feasts often have symbolic meanings tied to history, gratitude, and faith.',
          ],
        },
        {
          id: 'western-details-text',
          paragraphs: [
            'Thanksgiving in the United States is perhaps the most food-focused holiday in the Western world. Families gather around enormous tables loaded with roasted turkey, cranberry sauce, mashed potatoes, cornbread stuffing, and pumpkin pie. The holiday celebrates gratitude and the harvest season. The tradition traces back to 1621, when English colonists and Wampanoag people shared an autumn feast in Plymouth, Massachusetts.',
            'Christmas pudding, also called plum pudding, is a beloved British tradition that dates back to medieval times. Families stir the pudding together on "Stir-up Sunday," five weeks before Christmas, and each person makes a wish while stirring. Silver coins are sometimes hidden inside! The pudding is doused in brandy and set on fire before serving, creating a spectacular blue flame that delights children every year.',
            'During Eid al-Fitr, the celebration that marks the end of Ramadan, Muslim families around the world prepare incredible feasts. In the Middle East, tables overflow with lamb dishes, fragrant rice pilafs flavored with saffron and cardamom, and trays of sweet baklava \u2014 layers of thin pastry filled with chopped nuts and soaked in honey syrup. Dates, the traditional food used to break the daily fast during Ramadan, hold a place of honor at every Eid table.',
            'The Jewish Passover seder is one of the oldest food traditions still practiced today, dating back over 3,000 years. Every food on the seder plate tells part of the story of the Israelites\' escape from slavery in ancient Egypt. Bitter herbs represent the bitterness of slavery, a lamb shank bone recalls the sacrifice offered before the exodus, and charoset \u2014 a sweet paste of apples, nuts, and wine \u2014 represents the mortar used by enslaved people to build the pharaoh\'s buildings. Matzah, flat unleavened bread, reminds everyone that the Israelites left in such a hurry their bread didn\'t have time to rise!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Americans eat approximately 46 million turkeys every Thanksgiving! That\'s nearly one turkey for every seven people in the country. If you lined up all those turkeys beak to tail, they would stretch from New York to Los Angeles and back!',
        },
      ],
      videos: [
        {
          youtubeId: 'QKae1k1BDdA',
          title: 'A Brie(f) History of Cheese',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['feast-q2a', 'feast-q2b', 'feast-q2c'],
    },

    // ─── Section 3: Latin American & African ────────────────────
    {
      id: 'latin-african',
      icon: '\u{1F480}',
      title: 'Latin American & African Food Celebrations',
      readAloudBlocks: [
        {
          id: 'latin-intro-text',
          paragraphs: [
            'Latin America and Africa have some of the most vibrant and colorful food traditions in the world. Many of these celebrations blend ancient indigenous customs with traditions brought by colonizers and traders over the centuries, creating truly unique festivals that you won\'t find anywhere else.',
          ],
        },
        {
          id: 'latin-details-text',
          paragraphs: [
            'D\u00EDa de los Muertos, the Day of the Dead, is Mexico\'s most famous festival, celebrated on November 1st and 2nd. Families create beautiful altars called ofrendas, decorated with marigold flowers, candles, and the favorite foods of loved ones who have passed away. The star of the feast is pan de muerto, a sweet bread decorated with bone-shaped dough on top, dusted with sugar. Families also prepare tamales, mole sauce, and sugar skulls. The belief is that the spirits of the dead return to enjoy the aromas and flavors of these offerings.',
            'During Carnival, the massive celebration before Lent, Latin American and Caribbean countries erupt with music, dancing, and incredible street food. In Brazil, feijoada, a rich black bean stew with pork, is a Carnival staple, along with coxinha \u2014 crispy fried dough filled with shredded chicken. In Trinidad and Tobago, doubles, a street food made of fried flatbread with curried chickpeas, fuel the dancers through the night. Each country has its own special Carnival treats!',
            'In Ethiopia, the festival of Meskel celebrates the finding of the True Cross and marks the end of the rainy season. Families gather around a large bonfire called a demera and share a feast of injera, a spongy sourdough flatbread that doubles as both plate and utensil. Doro wot, a spicy chicken stew simmered with berbere spice and hard-boiled eggs, is the centerpiece of the Meskel feast. Everyone tears off pieces of injera and uses them to scoop up the stew \u2014 no forks needed! The communal eating from a shared plate symbolizes unity and love.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'During D\u00EDa de los Muertos, families believe that the spirits of deceased loved ones can actually smell the food placed on the ofrendas. After the celebration, the living eat the food, but some say it tastes different because the spirits have already enjoyed its essence!',
        },
      ],
      videos: [
        {
          youtubeId: '8FHrhH9k-PY',
          title: 'What is D\u00EDa de los Muertos, the Day of the Dead?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['feast-q3a', 'feast-q3b', 'feast-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Asian Celebrations
    {
      id: 'feast-q1a',
      sectionId: 'asian-celebrations',
      title: 'Dumpling Quiz!',
      question:
        'Why do Chinese families eat dumplings shaped like crescents during Chinese New Year?',
      options: [
        { text: 'Because they are easier to fold that way', isCorrect: false },
        {
          text: 'Because they look like ancient gold ingots and symbolize wealth',
          isCorrect: true,
        },
        { text: 'Because the moon is crescent-shaped at New Year', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'feast-q1b',
      sectionId: 'asian-celebrations',
      title: 'Festival of Lights Quiz!',
      question:
        'During Diwali, who are the traditional sweets first offered to before the family eats them?',
      options: [
        { text: 'The eldest family member', isCorrect: false },
        { text: 'The gods, especially Lakshmi', isCorrect: true },
        { text: 'The neighbors next door', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'feast-q1c',
      sectionId: 'asian-celebrations',
      title: 'Japanese New Year Quiz!',
      question:
        'In Japanese New Year food (osechi-ryori), what do shrimp represent?',
      options: [
        { text: 'Good luck in fishing', isCorrect: false },
        { text: 'Long life, because their curved shape looks like elderly people', isCorrect: true },
        { text: 'Wealth from the ocean', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'feast-q1d',
      sectionId: 'asian-celebrations',
      title: 'Korean Harvest Quiz!',
      question:
        'What is the name of the half-moon-shaped rice cakes that Korean families make during Chuseok?',
      options: [
        { text: 'Mochi', isCorrect: false },
        { text: 'Songpyeon', isCorrect: true },
        { text: 'Japchae', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Western & Middle Eastern
    {
      id: 'feast-q2a',
      sectionId: 'western-middle-eastern',
      title: 'Thanksgiving Quiz!',
      question:
        'The Thanksgiving tradition traces back to 1621. Which two groups shared the original autumn feast?',
      options: [
        { text: 'French explorers and Cherokee people', isCorrect: false },
        {
          text: 'English colonists and Wampanoag people',
          isCorrect: true,
        },
        { text: 'Spanish settlers and Aztec people', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'feast-q2b',
      sectionId: 'western-middle-eastern',
      title: 'Eid Celebration Quiz!',
      question:
        'What is the traditional food used to break the daily fast during Ramadan, which also holds a place of honor at Eid al-Fitr?',
      options: [
        { text: 'Baklava', isCorrect: false },
        { text: 'Dates', isCorrect: true },
        { text: 'Lamb kebabs', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'feast-q2c',
      sectionId: 'western-middle-eastern',
      title: 'Passover Seder Quiz!',
      question:
        'On the Passover seder plate, what does matzah (flat unleavened bread) remind people of?',
      options: [
        { text: 'The sweetness of freedom', isCorrect: false },
        { text: 'The bitterness of slavery', isCorrect: false },
        {
          text: 'That the Israelites left Egypt in such a hurry their bread didn\'t rise',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Latin American & African
    {
      id: 'feast-q3a',
      sectionId: 'latin-african',
      title: 'Day of the Dead Quiz!',
      question:
        'What is the special sweet bread decorated with bone-shaped dough that is made for D\u00EDa de los Muertos?',
      options: [
        { text: 'Tortilla de az\u00FAcar', isCorrect: false },
        { text: 'Pan de muerto', isCorrect: true },
        { text: 'Churro de los muertos', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'feast-q3b',
      sectionId: 'latin-african',
      title: 'Carnival Food Quiz!',
      question:
        'Which Brazilian dish, a rich black bean stew with pork, is a traditional Carnival staple?',
      options: [
        { text: 'Coxinha', isCorrect: false },
        { text: 'Feijoada', isCorrect: true },
        { text: 'A\u00E7a\u00ED bowl', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'feast-q3c',
      sectionId: 'latin-african',
      title: 'Ethiopian Festival Quiz!',
      question:
        'During the Ethiopian festival of Meskel, what spongy flatbread is used as both a plate and an utensil?',
      options: [
        { text: 'Naan', isCorrect: false },
        { text: 'Pita', isCorrect: false },
        { text: 'Injera', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'feast-essay',
    prompt:
      'Describe your favorite holiday food tradition and what it means to your family.',
    description:
      'Now it\'s your turn! Think about a special food your family makes for a holiday or celebration. What is the dish? Who makes it? Why is it important to your family? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Wonderful! Your food tradition story has been saved. You\'re a true global food explorer!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'feast-reward',
    title: 'Build Your Own Festival Calendar!',
    description:
      'You\'ve unlocked the Festival Calendar! Explore food celebrations from around the world, month by month. Discover what people are feasting on in every corner of the globe throughout the year!',
    lockMessage: 'Festival Calendar Locked!',
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
    type: 'festival-calendar',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Festival Calendar! You\'re a true world food celebration expert!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'What a Feast, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled the globe and discovered the incredible ways people celebrate with food!',
      'You learned that Chinese New Year dumplings represent wealth, Diwali sweets are offerings to the gods, Japanese osechi-ryori carries wishes for the new year, and Korean songpyeon are shaped like half moons on beds of fragrant pine needles.',
      'You explored Western and Middle Eastern traditions, from the Thanksgiving turkey to Christmas pudding set ablaze, from Eid al-Fitr feasts of baklava and lamb to the ancient Passover seder where every food tells a story of freedom.',
      'And you discovered the vibrant food traditions of Latin America and Africa \u2014 pan de muerto honoring the spirits of loved ones, Carnival street food fueling dancers through the night, and Ethiopian injera bringing families together around a shared plate.',
      'No matter where in the world you go, food brings people together. Every dish has a story, and every feast is an act of love. Keep exploring the world\'s delicious traditions!',
    ],
  },
};
