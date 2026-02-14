import type { Topic } from '../types';

export const pizzaAGlobalStory: Topic = {
  id: 'pizza-a-global-story',
  slug: 'pizza-a-global-story',
  title: 'Pizza: A Global Story',
  subtitle:
    'From Ancient Flatbreads to the World\'s Favorite Food',
  status: 'active',
  themeId: 'pizza-a-global-story',
  heroIcons: ['\u{1F355}', '\u{1F9C0}', '\u{1F35D}'],
  navItems: [
    { id: 'origins-of-pizza', icon: '\u{1F3DB}\uFE0F', label: 'Origins of Pizza' },
    { id: 'pizza-goes-global', icon: '\u{1F30D}', label: 'Pizza Goes Global' },
    { id: 'science-of-pizza', icon: '\u{1F52C}', label: 'The Science of Pizza' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F355}',
      title: 'Welcome, Pizza Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Pizza is one of the most beloved foods on the entire planet. Every single day, people in nearly every country enjoy some version of this incredible creation \u2014 dough topped with delicious ingredients and baked until bubbly and golden. But have you ever wondered where pizza actually came from?',
            'The answer might surprise you. Pizza\'s story doesn\'t begin in a single place or time. It stretches back thousands of years, across ancient civilizations, and has been shaped by cultures all around the world. The flatbread-with-toppings idea is so simple and so brilliant that people on different continents came up with it independently!',
            'In this adventure, you\'ll travel from the ancient Mediterranean to the bustling streets of Naples, across the Atlantic to New York City, and all the way to Tokyo, S\u00E3o Paulo, and beyond. You\'ll even discover the surprising science that makes pizza so irresistibly delicious. Let\'s dig in!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: '5eFhsXqy-Jk',
          title: 'The History of Pizza For Kids: From Naples to Now',
          channelName: 'Bedtime History',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Origins of Pizza ─────────────────────────────
    {
      id: 'origins-of-pizza',
      icon: '\u{1F3DB}\uFE0F',
      title: 'Origins of Pizza: Ancient Flatbreads to Naples',
      readAloudBlocks: [
        {
          id: 'origins-ancient',
          paragraphs: [
            'Thousands of years before anyone called it "pizza," people across the ancient world were already baking flatbreads and loading them with toppings. In ancient Greece, people ate a flatbread called "plakous" that was flavored with herbs, onion, cheese, and garlic. The Persians baked flatbreads on their shields during military campaigns and topped them with cheese and dates.',
            'In ancient Egypt, flatbreads were a staple food, often baked in clay ovens and eaten with various toppings. The Romans had their own version called "panis focacius" \u2014 the ancestor of modern focaccia \u2014 a baked flatbread seasoned with olive oil and herbs. These ancient flatbreads weren\'t exactly pizza, but they planted the seeds of the idea: bread plus toppings equals something wonderful.',
          ],
        },
        {
          id: 'origins-naples',
          paragraphs: [
            'The city of Naples, Italy, is where the modern pizza story truly begins. By the 1700s and 1800s, Naples was one of the largest cities in Europe and was packed with working-class people who needed cheap, filling food they could eat quickly. Street vendors and small shops began selling flatbreads topped with tomatoes, cheese, oil, anchovies, and garlic.',
            'Here\'s an important detail: tomatoes didn\'t arrive in Europe until the 1500s, brought back from the Americas by Spanish explorers. At first, many Europeans thought tomatoes were poisonous! But the people of Naples were among the first to embrace the tomato, and adding it to their flatbreads changed food history forever.',
            'The most famous pizza legend involves Queen Margherita of Italy. In 1889, pizza maker Raffaele Esposito of Pizzeria Brandi was asked to make pizzas for the queen during her visit to Naples. He created a pizza topped with tomatoes, mozzarella cheese, and fresh basil \u2014 representing the red, white, and green of the Italian flag. The queen loved it, and the "Pizza Margherita" was born. While some historians debate the exact details of this story, the Margherita pizza remains one of the most iconic pizzas in the world.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Ancient Greeks',
          title: 'Early Flatbread Pioneers',
          description:
            'The ancient Greeks baked a flatbread called "plakous" that was topped with herbs, onion, cheese, and garlic. The Roman writer Cato the Elder even recorded flatbread recipes with olive oil and seasonings in his farming manual. These early creations show that the idea of topping bread with flavorful ingredients is truly ancient.',
          extraTag: 'Period: ~500 BCE',
        },
        {
          emoji: '\u{1F345}',
          name: 'The Neapolitan Street Vendors',
          title: 'Inventors of Modern Pizza',
          description:
            'In the 1700s and 1800s, the working-class people of Naples needed cheap, fast food. Street vendors sold flatbreads with simple toppings like tomatoes, cheese, and garlic. These humble beginnings gave birth to the pizza we know and love today.',
          extraTag: 'Location: Naples, Italy',
        },
        {
          emoji: '\u{1F451}',
          name: 'Queen Margherita & Raffaele Esposito',
          title: 'The Famous Pizza Legend (1889)',
          description:
            'According to popular tradition, pizza maker Raffaele Esposito created a special pizza for Queen Margherita of Italy in 1889, topping it with tomatoes, mozzarella, and basil to represent the Italian flag. Whether or not every detail is true, the Pizza Margherita became world-famous.',
          extraTag: 'Year: 1889',
        },
        {
          emoji: '\u{1F35E}',
          name: 'Roman Bakers',
          title: 'Creators of Focaccia',
          description:
            'The ancient Romans baked "panis focacius," a flatbread cooked in the hearth and seasoned with olive oil, herbs, and salt. This bread is the ancestor of modern focaccia and one of the earliest relatives of pizza. Roman soldiers carried it as a portable, filling meal.',
          extraTag: 'Period: ~100 BCE',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The word "pizza" first appeared in a Latin text from the town of Gaeta in southern Italy in 997 CE. The document mentions that a tenant of a property was required to give the bishop "duodecim pizze" (twelve pizzas) every Christmas Day and every Easter Sunday!',
        },
      ],
      videos: [
        {
          youtubeId: 'PRn5iONxSQQ',
          title: 'The Secret History of Pizza',
          channelName: 'Epicurious',
        },
      ],
      quizIds: ['pgs-q1a', 'pgs-q1b', 'pgs-q1c', 'pgs-q1d'],
    },

    // ─── Section 2: Pizza Goes Global ────────────────────────────
    {
      id: 'pizza-goes-global',
      icon: '\u{1F30D}',
      title: 'Pizza Goes Global: From New York to Tokyo',
      readAloudBlocks: [
        {
          id: 'global-america',
          paragraphs: [
            'Pizza crossed the Atlantic Ocean in the late 1800s and early 1900s, carried by millions of Italian immigrants who came to America seeking a better life. They brought their recipes, their traditions, and their love of pizza with them. In the Italian neighborhoods of New York City, small bakeries and pizzerias began popping up.',
            'In 1905, Gennaro Lombardi opened what is widely considered the first licensed pizzeria in the United States at 53\u00BD Spring Street in Manhattan. Lombardi\'s served a style of pizza based on the Neapolitan tradition \u2014 thin crust, simple tomato sauce, and fresh mozzarella, baked in a coal-fired oven. The restaurant still exists today! After World War II, returning American soldiers who had tasted pizza in Italy helped fuel a pizza craze across the entire country.',
          ],
        },
        {
          id: 'global-styles',
          paragraphs: [
            'As pizza spread across America, different cities developed their own unique styles. New York-style pizza features a large, foldable slice with a thin, crispy crust and a classic tomato-and-mozzarella combination. Chicago deep-dish pizza, created in the 1940s at Pizzeria Uno, is almost the opposite \u2014 a thick, buttery crust pressed into a deep pan, layered with cheese, toppings, and a chunky tomato sauce on top.',
            'But pizza didn\'t just conquer America \u2014 it went truly global! In Japan, pizza chains offer toppings like teriyaki chicken, squid, and mayo, influenced by the country\'s own savory pancake tradition called okonomiyaki. In Brazil, pizza is hugely popular, and you\'ll find creative toppings like catupiry (a creamy cheese), corn, green peas, and even chocolate and banana for dessert pizza!',
            'Turkey has its own ancient pizza cousin called lahmacun \u2014 a thin, crispy flatbread topped with minced meat, vegetables, and herbs, often rolled up with fresh lemon juice and parsley. In India, pizza has been adapted with local flavors like tandoori chicken, paneer tikka, and spicy chutneys. Every culture that encounters pizza makes it their own, and that\'s what makes pizza\'s story so amazing.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F1FA}\u{1F1F8}',
          name: 'Gennaro Lombardi',
          title: 'Father of American Pizza (1905)',
          description:
            'Italian immigrant Gennaro Lombardi opened the first licensed pizzeria in the United States in 1905 on Spring Street in New York City. His coal-fired oven produced thin, crispy pizzas in the Neapolitan style. Lombardi\'s is still open today and is a pilgrimage site for pizza lovers from around the world.',
          extraTag: 'Location: New York City',
        },
        {
          emoji: '\u{1F1EF}\u{1F1F5}',
          name: 'Japanese Pizza Innovation',
          title: 'East Meets West on a Crust',
          description:
            'When pizza arrived in Japan in the 1950s, Japanese chefs put their own spin on it. Toppings like teriyaki chicken, corn, squid, seaweed, and Japanese mayo became popular. Japan\'s love of okonomiyaki \u2014 a savory pancake loaded with toppings \u2014 made the country a natural home for creative pizza styles.',
          extraTag: 'Influence: Okonomiyaki tradition',
        },
        {
          emoji: '\u{1F1E7}\u{1F1F7}',
          name: 'Brazilian Pizza Culture',
          title: 'The Pizza Capital of South America',
          description:
            'S\u00E3o Paulo, Brazil, has more pizzerias per capita than almost any city outside Italy! Italian immigrants brought pizza to Brazil in the late 1800s, and Brazilians took it to wild new places with toppings like catupiry cheese, hearts of palm, corn, and dessert pizzas with chocolate and banana.',
          extraTag: 'Location: S\u00E3o Paulo, Brazil',
        },
        {
          emoji: '\u{1F1F9}\u{1F1F7}',
          name: 'Turkish Lahmacun',
          title: 'The Ancient Pizza Cousin',
          description:
            'Lahmacun is a thin, crispy flatbread topped with minced meat, onions, tomatoes, and herbs, baked in a very hot oven. It has been eaten in Turkey and the surrounding region for centuries. Often called "Turkish pizza," it is traditionally rolled up with fresh vegetables, lemon juice, and parsley.',
          extraTag: 'Region: Turkey & Middle East',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Americans eat approximately 3 billion pizzas every year \u2014 that\'s about 100 acres of pizza per day, or roughly 23 pounds of pizza per person per year! The United States is the largest consumer of pizza in the world.',
        },
      ],
      videos: [
        {
          youtubeId: 'mupBtw-dSUo',
          title: 'Kids Try 10 Styles of Pizza from Around the World',
          channelName: 'Epicurious',
        },
      ],
      quizIds: ['pgs-q2a', 'pgs-q2b', 'pgs-q2c'],
    },

    // ─── Section 3: The Science of Pizza ─────────────────────────
    {
      id: 'science-of-pizza',
      icon: '\u{1F52C}',
      title: 'The Science of Pizza: Why It Tastes So Good',
      readAloudBlocks: [
        {
          id: 'science-dough',
          paragraphs: [
            'Have you ever wondered why pizza tastes SO good? The answer lies in some truly fascinating science! It all starts with the dough. When you mix flour, water, salt, and yeast together, something magical begins. Yeast is a tiny living organism \u2014 a single-celled fungus \u2014 that eats the sugars in flour and produces carbon dioxide gas and alcohol as byproducts. This process is called fermentation.',
            'The carbon dioxide gas gets trapped in the stretchy gluten network of the dough, creating those beautiful air bubbles you see in a good pizza crust. The longer you let dough ferment, the more complex flavors develop. Many of the best pizzerias let their dough ferment for 24 to 72 hours! The alcohol produced during fermentation evaporates during baking but contributes to flavor development.',
          ],
        },
        {
          id: 'science-baking',
          paragraphs: [
            'When pizza hits a hot oven, chemistry takes over. The most important reaction is called the Maillard reaction, named after French chemist Louis-Camille Maillard, who first described it in 1912. This reaction occurs when amino acids (from proteins) and sugars are heated together, creating hundreds of new flavor compounds and that gorgeous golden-brown color on the crust. It\'s the same reaction that makes toast, grilled steak, and roasted coffee taste so delicious!',
            'Mozzarella cheese has its own science. Traditional mozzarella is a "pasta filata" cheese, meaning the curds are stretched in hot water to create its signature stringy, melty texture. When heated, the proteins in mozzarella relax and the cheese flows beautifully, creating that irresistible stretch we all love. The browning on top of the cheese is \u2014 you guessed it \u2014 more Maillard reaction!',
            'Authentic Neapolitan pizza has strict rules set by the Associazione Verace Pizza Napoletana. The pizza must be baked in a wood-fired oven at about 485\u00B0C (905\u00B0F) for just 60 to 90 seconds! At these extreme temperatures, the crust puffs up rapidly, gets beautifully charred in spots, while the center stays soft and slightly chewy. Modern pizza technology has come a long way too \u2014 conveyor belt ovens, rotating deck ovens, and even AI-powered pizza-making robots now help produce millions of pizzas around the world. And here\'s a bonus: pizza can actually be a balanced meal, combining carbohydrates from the dough, protein and calcium from the cheese, vitamins from the tomato sauce, and additional nutrients from vegetable toppings!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9EC}',
          name: 'Yeast: The Tiny Chef',
          title: 'The Living Organism in Your Dough',
          description:
            'Saccharomyces cerevisiae \u2014 baker\'s yeast \u2014 is a single-celled fungus that has been used by humans for thousands of years. In pizza dough, yeast consumes sugars and produces carbon dioxide gas (which makes the dough rise) and alcohol (which adds flavor). Without yeast, pizza dough would be flat and dense!',
          extraTag: 'Type: Single-celled fungus',
        },
        {
          emoji: '\u{1F525}',
          name: 'The Maillard Reaction',
          title: 'The Flavor Factory',
          description:
            'First described by French chemist Louis-Camille Maillard in 1912, this chemical reaction between amino acids and sugars at high heat creates hundreds of new flavor and aroma compounds. It\'s responsible for the golden-brown color and delicious taste of pizza crust, as well as the browning on melted cheese.',
          extraTag: 'Discovered: 1912',
        },
        {
          emoji: '\u{1F9C0}',
          name: 'Mozzarella Science',
          title: 'The Stretchiest Cheese',
          description:
            'Traditional mozzarella is made by stretching cheese curds in hot water, a method called "pasta filata." This aligns the proteins into long strands, which is why mozzarella melts into those amazing stretchy strings. The fat and moisture content of the cheese determine how well it browns and bubbles in the oven.',
          extraTag: 'Method: Pasta filata',
        },
        {
          emoji: '\u{1F525}',
          name: 'The Neapolitan Oven',
          title: 'Extreme Heat, Perfect Pizza',
          description:
            'Authentic Neapolitan pizza must be baked at about 485\u00B0C (905\u00B0F) for just 60 to 90 seconds in a wood-fired oven. This extreme temperature creates a puffed, slightly charred crust called "leopard spotting" while keeping the center soft. The Associazione Verace Pizza Napoletana sets strict standards for this traditional method.',
          extraTag: 'Temperature: 485\u00B0C / 905\u00B0F',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'In 2001, Pizza Hut made history by delivering a pizza to the International Space Station! Russian cosmonaut Yuri Usachov received a specially made salami pizza (pepperoni was replaced with salami because it preserved better in space). It cost about $1 million to deliver!',
        },
      ],
      videos: [
        {
          youtubeId: 'tOkCgAwhh9U',
          title: 'Why is Pizza So Good?',
          channelName: 'Reactions',
        },
      ],
      quizIds: ['pgs-q3a', 'pgs-q3b', 'pgs-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Origins of Pizza
    {
      id: 'pgs-q1a',
      sectionId: 'origins-of-pizza',
      title: 'Quick Quiz Time!',
      question:
        'What did the ancient Greeks call their flatbread that was topped with herbs, onion, cheese, and garlic?',
      options: [
        { text: 'Focaccia', isCorrect: false },
        { text: 'Plakous', isCorrect: true },
        { text: 'Lahmacun', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pgs-q1b',
      sectionId: 'origins-of-pizza',
      title: 'Naples Challenge!',
      question:
        'Why did the people of Naples start putting tomatoes on their flatbreads in the 1700s?',
      options: [
        { text: 'Tomatoes had always grown in Italy', isCorrect: false },
        { text: 'Tomatoes arrived from the Americas in the 1500s and Neapolitans embraced them', isCorrect: true },
        { text: 'A king ordered everyone to eat tomatoes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pgs-q1c',
      sectionId: 'origins-of-pizza',
      title: 'Royal Pizza Quiz!',
      question:
        'According to the famous legend, who made the Pizza Margherita for Queen Margherita in 1889?',
      options: [
        { text: 'Gennaro Lombardi', isCorrect: false },
        { text: 'Raffaele Esposito', isCorrect: true },
        { text: 'Marco Polo', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pgs-q1d',
      sectionId: 'origins-of-pizza',
      title: 'Ancient Bread Quiz!',
      question:
        'What Roman flatbread, seasoned with olive oil and herbs, is considered an ancestor of modern pizza?',
      options: [
        { text: 'Panis focacius (focaccia)', isCorrect: true },
        { text: 'Pita bread', isCorrect: false },
        { text: 'Tortilla', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Pizza Goes Global
    {
      id: 'pgs-q2a',
      sectionId: 'pizza-goes-global',
      title: 'Quick Quiz Time!',
      question:
        'What is widely considered the first licensed pizzeria in the United States, opened in 1905?',
      options: [
        { text: 'Pizza Hut', isCorrect: false },
        { text: 'Lombardi\'s in New York City', isCorrect: true },
        { text: 'Pizzeria Uno in Chicago', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pgs-q2b',
      sectionId: 'pizza-goes-global',
      title: 'Global Pizza Challenge!',
      question:
        'What is lahmacun, sometimes called "Turkish pizza"?',
      options: [
        { text: 'A thick, deep-dish pizza with lots of cheese', isCorrect: false },
        { text: 'A thin, crispy flatbread topped with minced meat, vegetables, and herbs', isCorrect: true },
        { text: 'A sweet dessert pizza with chocolate', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pgs-q2c',
      sectionId: 'pizza-goes-global',
      title: 'Style Quiz!',
      question:
        'How is Chicago deep-dish pizza different from New York-style pizza?',
      options: [
        { text: 'Chicago deep-dish has a thick, buttery crust pressed into a deep pan with cheese and sauce layered on top', isCorrect: true },
        { text: 'Chicago deep-dish is thinner and crispier than New York-style', isCorrect: false },
        { text: 'There is no real difference between them', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: The Science of Pizza
    {
      id: 'pgs-q3a',
      sectionId: 'science-of-pizza',
      title: 'Quick Quiz Time!',
      question:
        'What does yeast produce in pizza dough that makes it rise?',
      options: [
        { text: 'Oxygen gas', isCorrect: false },
        { text: 'Carbon dioxide gas', isCorrect: true },
        { text: 'Nitrogen gas', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pgs-q3b',
      sectionId: 'science-of-pizza',
      title: 'Chemistry Challenge!',
      question:
        'What chemical reaction gives pizza crust its golden-brown color and delicious flavor?',
      options: [
        { text: 'Photosynthesis', isCorrect: false },
        { text: 'The Maillard reaction', isCorrect: true },
        { text: 'Oxidation', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'pgs-q3c',
      sectionId: 'science-of-pizza',
      title: 'Hot Oven Quiz!',
      question:
        'How hot must an authentic Neapolitan pizza oven be, and how long does the pizza bake?',
      options: [
        { text: 'About 200\u00B0C (400\u00B0F) for 15 minutes', isCorrect: false },
        { text: 'About 485\u00B0C (905\u00B0F) for 60 to 90 seconds', isCorrect: true },
        { text: 'About 300\u00B0C (575\u00B0F) for 5 minutes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'pgs-essay',
    prompt:
      'If you could create your own pizza inspired by any country or culture, what would it look like?',
    description:
      'Now it\'s your turn! Imagine you\'re a pizza chef who can combine ingredients and flavors from any culture in the world. What would your dream pizza look like? What toppings would you choose and why? Would it be inspired by Japanese, Brazilian, Indian, or another cuisine \u2014 or maybe a mashup of several? Tell us about your creation! You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Delicious answer! Your pizza creation has been saved. You\'re a true global pizza chef!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'pgs-reward',
    title: 'Pizza World Tour Unlocked!',
    description:
      'You\'ve unlocked the Pizza Party! Celebrate your journey through pizza history from ancient flatbreads to modern global creations.',
    lockMessage: 'Pizza Party Locked!',
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
    type: 'pizza-world-tour',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Pizza Party! You\'re a true pizza historian and scientist!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Pizza Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled thousands of years and across the entire globe on an incredible pizza journey!',
      'You discovered that the idea of flatbread with toppings goes all the way back to ancient Greece, Egypt, Persia, and Rome. You learned how the people of Naples transformed humble street food into the modern pizza we know today, and how the legendary Pizza Margherita was created for Queen Margherita in 1889 by Raffaele Esposito.',
      'You followed pizza across the Atlantic with Italian immigrants to America, where Gennaro Lombardi opened the first licensed U.S. pizzeria in 1905. You explored how different cities and countries created their own unique pizza styles \u2014 from New York\'s foldable slices and Chicago\'s deep dish to Japan\'s teriyaki-topped pies, Brazil\'s creative combinations, Turkey\'s lahmacun, and India\'s tandoori pizza.',
      'And you uncovered the amazing science behind pizza \u2014 how yeast makes dough rise through fermentation, how the Maillard reaction creates that perfect golden-brown crust, why mozzarella stretches so beautifully, and how Neapolitan pizza bakes in just 60 to 90 seconds at an incredible 485\u00B0C!',
      'Pizza\'s story is really the story of human creativity. Every culture that encounters pizza makes it their own, adding local flavors and traditions to create something new and delicious. Next time you take a bite of pizza, remember \u2014 you\'re enjoying a food with a history that spans thousands of years and connects people all around the world!',
    ],
  },
};
