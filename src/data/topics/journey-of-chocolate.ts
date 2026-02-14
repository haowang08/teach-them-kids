import type { Topic } from '../types';

export const journeyOfChocolate: Topic = {
  id: 'journey-of-chocolate',
  slug: 'journey-of-chocolate',
  title: 'The Incredible Journey of Chocolate',
  subtitle:
    'From Sacred Drink to Sweet Treat',
  status: 'active',
  themeId: 'journey-of-chocolate',
  heroIcons: ['\u{1F36B}', '\u{1F3FA}', '\u{1F33F}'],
  navItems: [
    { id: 'ancient-origins', icon: '\u{1F3FA}', label: 'Ancient Origins' },
    { id: 'chocolate-europe', icon: '\u{1F3F0}', label: 'Chocolate Comes to Europe' },
    { id: 'modern-chocolate', icon: '\u{1F36B}', label: 'Modern Chocolate' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F36B}',
      title: 'Welcome, Chocolate Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'What if I told you that the chocolate bar in your pocket has a story that stretches back almost 4,000 years? That\'s right \u2014 chocolate has one of the most incredible journeys of any food in history!',
            'But here\'s the twist: for most of its history, chocolate wasn\'t a sweet treat at all. It was a bitter, spicy drink that ancient peoples considered a gift from the gods! The chocolate you know and love today would be unrecognizable to the ancient Olmec, Maya, and Aztec peoples who first discovered the magic of the cacao bean.',
            'In this adventure, you\'ll travel from the steamy rainforests of Central America to the royal courts of Europe, and finally to the modern chocolate factories that produce billions of chocolate bars every year. Get ready for a journey that\'s as rich and complex as chocolate itself!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'ibjUpk9Iagk',
          title: 'The History of Chocolate',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient Origins ─────────────────────────────
    {
      id: 'ancient-origins',
      icon: '\u{1F3FA}',
      title: 'Ancient Origins: The Sacred Drink of the Gods',
      readAloudBlocks: [
        {
          id: 'ancient-origins-intro',
          paragraphs: [
            'The story of chocolate begins in the hot, humid rainforests of Central America, where the cacao tree grows wild. Around 1900 BCE, the Olmec people \u2014 one of the earliest civilizations in the Americas \u2014 discovered that the seeds inside the cacao tree\'s football-shaped pods could be fermented, dried, roasted, and ground into a paste.',
            'The Olmec mixed this cacao paste with water, chili peppers, and cornmeal to create a frothy, bitter, spicy drink. This was nothing like the hot chocolate you might enjoy today! It was dark, gritty, and had a kick of heat from the chilies. But the Olmec believed this drink had magical powers.',
          ],
        },
        {
          id: 'ancient-origins-maya-aztec',
          paragraphs: [
            'The Maya civilization took cacao culture to a whole new level. They grew cacao trees in their gardens, developed special recipes for cacao drinks, and used cacao in religious ceremonies. Maya artwork shows gods interacting with cacao, and the Maya believed the cacao tree was sacred. They even put cacao beans in the tombs of their rulers!',
            'When the Aztec Empire rose to power, they became the ultimate chocolate lovers. The Aztecs called their cacao drink "xocolatl" (sho-KO-la-tl), which may have meant "bitter water." They believed that the feathered serpent god Quetzalcoatl had stolen cacao from the gods and given it to humans as a gift.',
            'But here\'s something amazing: the Aztecs used cacao beans as money! A rabbit cost about 10 cacao beans, a turkey egg cost 3 beans, and a turkey cost 100 beans. Imagine going to a store and paying with chocolate! The Aztec emperor Montezuma reportedly drank 50 cups of xocolatl every day from golden goblets, believing it gave him energy and wisdom.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F33F}',
          name: 'The Olmec',
          title: 'The First Chocolate Makers (1900 BCE)',
          description:
            'The Olmec civilization in what is now Mexico were the first people known to process cacao beans. They discovered that fermenting and roasting the bitter seeds of the cacao pod produced a rich, complex flavor. They mixed the ground beans with water, chili peppers, and cornmeal to make a frothy, bitter beverage used in ceremonies and rituals.',
          extraTag: 'Period: ~1900\u20131400 BCE',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'The Maya',
          title: 'Cacao Cultivators & Artists',
          description:
            'The Maya cultivated cacao trees and considered the drink sacred. They developed different recipes, adding honey, vanilla, and flowers to create various flavors. Beautiful Maya pottery often shows scenes of cacao preparation and consumption. The Maya word "kakaw" is actually where our word "cacao" comes from!',
          extraTag: 'Period: ~250\u2013900 CE',
        },
        {
          emoji: '\u{1F40D}',
          name: 'The Aztecs & Xocolatl',
          title: 'Chocolate as Currency & Sacred Drink',
          description:
            'The Aztecs couldn\'t grow cacao in their highland capital, so they demanded it as tribute from conquered peoples. They used cacao beans as currency throughout their empire and reserved the xocolatl drink for warriors, nobility, and priests. Emperor Montezuma was famous for his obsession with the drink, reportedly consuming 50 cups daily!',
          extraTag: 'Period: ~1300\u20131521 CE',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Ancient Aztec counterfeiters would carefully empty real cacao beans, fill the shells with mud, and seal them back up to use as fake money! Chocolate fraud is nearly as old as chocolate itself!',
        },
      ],
      videos: [
        {
          youtubeId: '3l3TFieqIvk',
          title: 'Watch the Ancient Art of Chocolate-Making',
          channelName: 'National Geographic',
        },
      ],
      quizIds: ['choco-q1a', 'choco-q1b', 'choco-q1c', 'choco-q1d'],
    },

    // ─── Section 2: Chocolate Comes to Europe ───────────────────
    {
      id: 'chocolate-europe',
      icon: '\u{1F3F0}',
      title: 'Chocolate Comes to Europe: From Bitter to Sweet',
      readAloudBlocks: [
        {
          id: 'europe-intro',
          paragraphs: [
            'In 1519, the Spanish conquistador Hern\u00E1n Cort\u00E9s arrived at the Aztec capital of Tenochtitlan, where Emperor Montezuma served him xocolatl in a golden goblet. Cort\u00E9s was not impressed by the bitter taste, but he was very impressed by the energy the drink seemed to give. He wrote back to Spain: "A cup of this precious drink permits a man to walk for a whole day without food."',
            'When the Spanish brought cacao beans back to Europe, they had a brilliant idea: add sugar! This transformation changed everything. The bitter, spicy Aztec drink became a smooth, sweet beverage that European royalty went absolutely crazy for. Spain kept the recipe secret for nearly 100 years!',
          ],
        },
        {
          id: 'europe-chocolate-houses',
          paragraphs: [
            'Eventually, the secret got out and chocolate spread across Europe. In the 1600s and 1700s, "chocolate houses" opened in London, Paris, and other cities. These were fancy gathering places where wealthy people sipped hot chocolate and discussed politics, business, and gossip. They were the coffee shops of their time!',
            'But chocolate was still only a drink. It was thick, oily, and very expensive. Only the very rich could afford it. Kings and queens gave chocolate as a luxury gift, and it was even believed to have medicinal properties. Doctors prescribed chocolate to cure all sorts of ailments!',
            'The real revolution came in 1828, when a Dutch chemist named Coenraad van Houten invented a press that could separate cacao butter from cacao powder. This made it possible to create smoother chocolate drinks \u2014 and eventually, solid chocolate bars.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The famous White\'s Club in London started as a chocolate house in 1693! It was one of the first places in England where wealthy gentlemen could drink hot chocolate. Today it\'s one of the most exclusive private clubs in the world.',
        },
      ],
      videos: [],
      quizIds: ['choco-q2a', 'choco-q2b', 'choco-q2c'],
    },

    // ─── Section 3: Modern Chocolate ────────────────────────────
    {
      id: 'modern-chocolate',
      icon: '\u{1F36B}',
      title: 'Modern Chocolate: The Sweet Revolution',
      readAloudBlocks: [
        {
          id: 'modern-intro',
          paragraphs: [
            'The 1800s were the golden age of chocolate innovation. Once van Houten\'s press made it possible to work with chocolate in new ways, inventors across Europe raced to create the perfect chocolate bar.',
            'In 1847, a British company called J.S. Fry & Sons created the first modern chocolate bar by mixing cacao powder, sugar, and melted cacao butter into a moldable paste. In 1875, Swiss chocolatier Daniel Peter had the genius idea of adding condensed milk to create milk chocolate \u2014 the smooth, creamy chocolate most people love today! His neighbor Henri Nestl\u00E9 helped him perfect the recipe.',
          ],
        },
        {
          id: 'modern-companies',
          paragraphs: [
            'Meanwhile, in Switzerland, Rodolphe Lindt invented a process called "conching" in 1879, which involved heating and mixing chocolate for hours or even days. This process made chocolate incredibly smooth and silky instead of gritty. Lindt\'s technique is still used by chocolate makers today!',
            'In England, the Cadbury brothers built a chocolate empire and even created an entire village called Bournville for their factory workers. In America, Milton Hershey dreamed of making chocolate affordable for everyone. He built a massive factory in Pennsylvania and created the Hershey bar, making chocolate a treat that ordinary people could enjoy, not just the wealthy.',
            'Today, the journey from cacao bean to chocolate bar is called the "bean to bar" process. It involves harvesting cacao pods, fermenting the beans for days, drying them in the sun, roasting them, cracking and winnowing the shells, grinding the nibs into a paste called chocolate liquor, adding sugar and milk, conching for smoothness, tempering for that perfect snap, and finally molding into bars!',
          ],
        },
      ],
      timeline: [
        {
          year: '~1900 BCE',
          title: 'Olmec Discovery',
          description:
            'The Olmec people in what is now Mexico become the first known civilization to process cacao beans, creating a bitter, spicy drink from fermented and roasted cacao mixed with water, chili peppers, and cornmeal.',
        },
        {
          year: '~250 CE',
          title: 'Maya Cacao Culture',
          description:
            'The Maya civilization develops a rich cacao culture, growing cacao trees in gardens, creating various cacao drink recipes, and using cacao in religious ceremonies. The word "kakaw" enters their language.',
        },
        {
          year: '~1400',
          title: 'Aztec Chocolate Currency',
          description:
            'The Aztec Empire uses cacao beans as currency and creates the drink "xocolatl" for warriors and nobility. Emperor Montezuma reportedly drinks 50 cups daily from golden goblets.',
        },
        {
          year: '1519',
          title: 'Cort\u00E9s Meets Montezuma',
          description:
            'Spanish conquistador Hern\u00E1n Cort\u00E9s arrives at the Aztec capital and tastes xocolatl for the first time. He brings cacao beans back to Spain, where sugar is added to create a sweet chocolate drink.',
        },
        {
          year: '~1600s',
          title: 'Chocolate Houses Open',
          description:
            'Chocolate houses open across Europe, becoming fashionable gathering places for the wealthy. Chocolate is still only consumed as a drink and is extremely expensive.',
        },
        {
          year: '1828',
          title: 'Van Houten\'s Press',
          description:
            'Dutch chemist Coenraad van Houten invents a press that separates cacao butter from cacao powder, making smoother chocolate possible and setting the stage for solid chocolate.',
        },
        {
          year: '1847',
          title: 'First Chocolate Bar',
          description:
            'British company J.S. Fry & Sons creates the first modern chocolate bar by combining cacao powder, sugar, and melted cacao butter into a moldable solid form.',
        },
        {
          year: '1875',
          title: 'Milk Chocolate Invented',
          description:
            'Swiss chocolatier Daniel Peter, with help from his neighbor Henri Nestl\u00E9, adds condensed milk to chocolate for the first time, creating the smooth, creamy milk chocolate we know today.',
        },
        {
          year: '1879',
          title: 'Lindt\'s Conching Process',
          description:
            'Rodolphe Lindt invents conching, a process of heating and mixing chocolate for hours that produces incredibly smooth, silky chocolate. This technique revolutionizes chocolate making.',
        },
        {
          year: 'Today',
          title: 'Craft Chocolate Revolution',
          description:
            'A new generation of "bean to bar" chocolate makers focus on high-quality, single-origin cacao, fair trade practices, and artisan techniques. Chocolate has come full circle, once again being appreciated as a complex, precious food.',
        },
      ],
      characters: [
        {
          emoji: '\u{1F1E8}\u{1F1ED}',
          name: 'Daniel Peter & Henri Nestl\u00E9',
          title: 'Inventors of Milk Chocolate (1875)',
          description:
            'Swiss chocolatier Daniel Peter spent eight years trying to figure out how to add milk to chocolate without it going rancid. His neighbor Henri Nestl\u00E9 had recently invented a process for making condensed milk, and together they cracked the code. Milk chocolate was born, and it became the most popular type of chocolate in the world!',
          extraTag: 'Country: Switzerland',
        },
        {
          emoji: '\u{1F1EC}\u{1F1E7}',
          name: 'The Cadbury Brothers',
          title: 'Chocolate & Social Change',
          description:
            'John and Benjamin Cadbury didn\'t just make chocolate \u2014 they tried to change the world! They built a model village called Bournville for their factory workers with houses, gardens, and parks. They believed that good working conditions made better chocolate. Cadbury is still one of the most famous chocolate brands on Earth.',
          extraTag: 'Country: England',
        },
        {
          emoji: '\u{1F1FA}\u{1F1F8}',
          name: 'Milton Hershey',
          title: 'Chocolate for Everyone',
          description:
            'Milton Hershey had a big dream: to make chocolate so affordable that every American could enjoy it. He built a massive factory in Pennsylvania and created the Hershey bar. He also built an entire town around the factory called Hershey, Pennsylvania, complete with a park, a school, and streets named Chocolate Avenue and Cocoa Avenue!',
          extraTag: 'Country: United States',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'It takes about 400 cacao beans to make just one pound of chocolate! A single cacao tree produces enough beans for about two pounds of chocolate per year. That means your favorite chocolate bar required the work of an entire tree for several months!',
        },
      ],
      videos: [
        {
          youtubeId: 'dBnniua6-oM',
          title: 'How Sugar Affects the Brain',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['choco-q3a', 'choco-q3b', 'choco-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient Origins
    {
      id: 'choco-q1a',
      sectionId: 'ancient-origins',
      title: 'Quick Quiz Time!',
      question:
        'Which civilization was the first known to process cacao beans around 1900 BCE?',
      options: [
        { text: 'The Maya', isCorrect: false },
        { text: 'The Aztecs', isCorrect: false },
        { text: 'The Olmec', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'choco-q1b',
      sectionId: 'ancient-origins',
      title: 'Aztec Challenge!',
      question:
        'What did the Aztecs use cacao beans for, besides making xocolatl?',
      options: [
        { text: 'As jewelry', isCorrect: false },
        { text: 'As currency (money)', isCorrect: true },
        { text: 'As building material', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'choco-q1c',
      sectionId: 'ancient-origins',
      title: 'Sacred Drink Quiz!',
      question:
        'Which god did the Aztecs believe stole cacao from the gods and gave it to humans?',
      options: [
        { text: 'Huitzilopochtli', isCorrect: false },
        { text: 'Quetzalcoatl', isCorrect: true },
        { text: 'Tlaloc', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'choco-q1d',
      sectionId: 'ancient-origins',
      title: 'Ancient Recipe Quiz!',
      question:
        'What spice did the Olmec and Aztecs add to their cacao drink that made it hot and spicy?',
      options: [
        { text: 'Cinnamon', isCorrect: false },
        { text: 'Chili peppers', isCorrect: true },
        { text: 'Black pepper', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Chocolate Comes to Europe
    {
      id: 'choco-q2a',
      sectionId: 'chocolate-europe',
      title: 'Quick Quiz Time!',
      question:
        'What did the Spanish add to the bitter Aztec cacao drink that changed chocolate forever?',
      options: [
        { text: 'Salt', isCorrect: false },
        { text: 'Sugar', isCorrect: true },
        { text: 'Milk', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'choco-q2b',
      sectionId: 'chocolate-europe',
      title: 'Chocolate House Challenge!',
      question:
        'What were "chocolate houses" in 1600s and 1700s Europe?',
      options: [
        { text: 'Buildings made of chocolate', isCorrect: false },
        {
          text: 'Fancy gathering places where wealthy people drank hot chocolate',
          isCorrect: true,
        },
        { text: 'Factories that made chocolate bars', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'choco-q2c',
      sectionId: 'chocolate-europe',
      title: 'Invention Quiz!',
      question:
        'What did Dutch chemist Coenraad van Houten invent in 1828 that changed chocolate history?',
      options: [
        { text: 'The chocolate bar mold', isCorrect: false },
        { text: 'The chocolate fountain', isCorrect: false },
        {
          text: 'A press that separated cacao butter from cacao powder',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Modern Chocolate
    {
      id: 'choco-q3a',
      sectionId: 'modern-chocolate',
      title: 'Quick Quiz Time!',
      question:
        'Who invented milk chocolate in 1875 with help from his neighbor Henri Nestl\u00E9?',
      options: [
        { text: 'Rodolphe Lindt', isCorrect: false },
        { text: 'Daniel Peter', isCorrect: true },
        { text: 'Milton Hershey', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'choco-q3b',
      sectionId: 'modern-chocolate',
      title: 'Process Challenge!',
      question:
        'What is "conching," the process Rodolphe Lindt invented in 1879?',
      options: [
        { text: 'Wrapping chocolate in foil', isCorrect: false },
        {
          text: 'Heating and mixing chocolate for hours to make it smooth and silky',
          isCorrect: true,
        },
        { text: 'Adding fruit and nuts to chocolate', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'choco-q3c',
      sectionId: 'modern-chocolate',
      title: 'Final Chocolate Challenge!',
      question:
        'How many cacao beans does it take to make one pound of chocolate?',
      options: [
        { text: 'About 50 beans', isCorrect: false },
        { text: 'About 400 beans', isCorrect: true },
        { text: 'About 1,000 beans', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'chocolate-essay',
    prompt:
      'Would you rather try ancient Aztec chocolate drink or modern chocolate? Why?',
    description:
      'Now it\'s your turn! Imagine you could travel through time and taste chocolate from any era. Would you try the bitter, spicy xocolatl that Aztec emperors drank from golden goblets? Or would you prefer the smooth, sweet chocolate bars we have today? Maybe you\'d want to visit a 1700s chocolate house in London? Tell us your choice and why! You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Sweet answer! Your response has been saved. You\'re a true chocolate connoisseur!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'chocolate-reward',
    title: 'Welcome to the Chocolate Factory!',
    description:
      'You\'ve unlocked the Chocolate Factory! Explore the incredible journey of chocolate from ancient cacao bean to modern sweet treat.',
    lockMessage: 'Chocolate Factory Locked!',
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
    type: 'chocolate-factory',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Chocolate Factory! You\'re a true chocolate historian!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Chocolate Explorer!',
    paragraphs: [
      'Congratulations! You\'ve traveled nearly 4,000 years through the incredible journey of chocolate!',
      'You discovered how the Olmec people first processed cacao beans around 1900 BCE, creating a bitter, spicy drink. You learned that the Maya considered cacao sacred and the Aztecs used cacao beans as money. Emperor Montezuma drank 50 cups of xocolatl a day, and the Aztecs believed chocolate was a gift from the feathered serpent god Quetzalcoatl.',
      'You followed chocolate across the Atlantic Ocean to Europe, where the Spanish added sugar and transformed it into a sweet drink that royalty adored. You visited the elegant chocolate houses of London and Paris, and learned how van Houten\'s press in 1828 opened the door to solid chocolate.',
      'And you met the innovators who created modern chocolate \u2014 Daniel Peter who invented milk chocolate, Rodolphe Lindt who made chocolate silky smooth, the Cadbury brothers who built a village for their workers, and Milton Hershey who made chocolate affordable for everyone.',
      'From sacred Aztec drink to modern sweet treat, chocolate\'s journey is one of the most remarkable stories in food history. Next time you unwrap a chocolate bar, remember \u2014 you\'re holding nearly 4,000 years of human history in your hands!',
    ],
  },
};
