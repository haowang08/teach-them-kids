import type { Topic } from '../types';

export const howStuffSmells: Topic = {
  id: 'how-stuff-smells',
  slug: 'how-stuff-smells',
  title: 'How Stuff Smells',
  subtitle: 'The Stinky, Smelly Science of Your Nose',
  status: 'active',
  themeId: 'science',
  heroIcons: ['\u{1F443}', '\u{1F9C0}', '\u{1F9A8}'],
  navItems: [
    { id: 'smell-nose', icon: '\u{1F443}', label: 'Your Nose' },
    { id: 'smell-farts', icon: '\u{1F4A8}', label: 'Why Farts Smell' },
    { id: 'smell-cheese', icon: '\u{1F9C0}', label: 'Stinky Cheese' },
    { id: 'smell-flowers', icon: '\u{1F33A}', label: 'Flowers & Durians' },
    { id: 'smell-animals', icon: '\u{1F9A8}', label: 'Wet Dogs & Skunks' },
    { id: 'smell-future', icon: '\u{1F52C}', label: 'Future of Smell' },
  ],
  sections: [
    // --- Section 1: Your Nose ---
    {
      id: 'smell-nose',
      icon: '\u{1F443}',
      title: 'Your Nose -- The Smell Superhighway',
      readAloudBlocks: [
        {
          id: 'nose-intro',
          paragraphs: [
            'Get ready to take a deep breath, because you are about to discover one of the most amazing things your body does every single day without you even thinking about it. Right now, as you read this, tiny invisible molecules are floating through the air and streaming into your nose. Some of them smell like fresh cookies. Others smell like a garbage truck on a hot day. Your nose can tell the difference between roughly 10,000 distinct scents -- and it does it in a fraction of a second. That is faster than you can blink.',
            'Here is how it works. When you breathe in, air rushes up through your two nostrils and into a space called the nasal cavity. Way up at the top of this cavity, tucked behind the bridge of your nose, sits a small patch of tissue about the size of a postage stamp. This is your olfactory epithelium -- your personal smell detector. It is covered in about 10 million specialized nerve cells called olfactory receptor neurons, and each one is tipped with tiny hair-like structures called cilia that wave around in a thin layer of mucus. Yes, mucus. Snot is actually essential to smelling. Those odor molecules from the air dissolve into the mucus, and the cilia grab onto them like a catcher\'s mitt snagging a baseball.',
          ],
        },
        {
          id: 'nose-receptors',
          paragraphs: [
            'But here is where it gets truly wild. Humans have roughly 400 different types of smell receptors (scientists Linda Buck and Richard Axel won the Nobel Prize in 2004 for figuring this out). Each type of receptor responds to a different set of molecule shapes. When a smell molecule locks into a receptor, it triggers an electrical signal that zips along a nerve fiber straight to your olfactory bulb -- a structure at the base of your brain. From there, the signal fans out to parts of your brain that handle memory and emotion. That is why a whiff of sunscreen can instantly transport you back to a beach vacation, or the smell of a certain perfume reminds you of your grandmother. Smell and memory are wired together.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9EC}',
          name: 'Linda Buck',
          title: 'Nobel Prize-Winning Biologist (Born 1947)',
          description:
            'American biologist who won the 2004 Nobel Prize for discovering how the olfactory system works. She and Richard Axel identified around 1,000 different olfactory receptor genes, showing how we can distinguish roughly 10,000 different smells.',
        },
        {
          emoji: '\u{1F9EC}',
          name: 'Richard Axel',
          title: 'Nobel Prize-Winning Neuroscientist (Born 1946)',
          description:
            'American neuroscientist who shared the 2004 Nobel Prize with Linda Buck. Together they mapped out how smell receptors in the nose send signals to the brain, revolutionizing our understanding of the sense of smell.',
        },
      ],
      funFacts: [
        {
          title: 'Dog vs. Human Nose',
          text: 'Dogs have about 300 million olfactory receptors compared to our measly 10 million. A bloodhound\'s sense of smell is roughly 1,000 times more sensitive than yours -- they can follow a scent trail that is days old.',
        },
      ],
      videos: [
        {
          youtubeId: 'snJnO6OpjCs',
          title: 'How do we smell? - Rose Eveleth',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'mFm3yA1nslE',
          title: 'Taste & Smell: Crash Course Anatomy & Physiology #16',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['smell-q1', 'smell-q2'],
    },

    // --- Section 2: Why Farts Smell ---
    {
      id: 'smell-farts',
      icon: '\u{1F4A8}',
      title: 'Why Farts Smell (and Why Some Are Worse Than Others)',
      readAloudBlocks: [
        {
          id: 'farts-intro',
          paragraphs: [
            'Alright, let\'s talk about the thing everyone giggles about but nobody wants to admit they do: farting. The average person passes gas between 13 and 21 times per day. That is totally normal. Your digestive system is basically a long, winding factory that breaks down food, and gas is one of the byproducts. But why do some farts barely register while others can clear an entire room?',
            'When you eat food, it travels from your stomach into your small intestine, where most nutrients get absorbed. But some stuff -- especially complex carbohydrates like those found in beans, broccoli, and whole grains -- cannot be fully broken down there. So it moves on to your large intestine, which is home to trillions of bacteria. These gut bacteria feast on the leftovers and produce gas as a byproduct, mainly nitrogen, hydrogen, carbon dioxide, and methane. None of these gases have any smell at all. The smelly part? That comes from the tiny fraction of gas (less than 1 percent) that contains sulfur compounds.',
          ],
        },
        {
          id: 'farts-chemistry',
          paragraphs: [
            'The main culprit behind stinky farts is hydrogen sulfide -- the exact same chemical that gives rotten eggs their horrific stench. When you eat foods rich in sulfur, like eggs, cheese, meat, broccoli, and cauliflower, your gut bacteria produce more hydrogen sulfide as they break these foods down. Other sulfur compounds in the mix include methanethiol (which smells like rotting cabbage) and dimethyl sulfide. The combination of these chemicals is what produces that distinctive "silent but deadly" experience. Interestingly, the louder a fart is, the less it usually smells -- loud farts tend to involve more of those odorless gases rushing out quickly, while the quiet ones are often richer in concentrated sulfur compounds.',
            'Methane, another fart gas, is actually flammable -- which is why you may have heard that farts can be lit on fire. This is technically true but extremely dangerous, so never, ever try it. About one-third of people produce methane-rich farts, depending on the specific mix of bacteria in their gut.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Half a Liter a Day!',
          text: 'The average person produces about half a liter of fart gas every single day. Most of it (99%) is odorless -- it is the tiny 1% of sulfur compounds that does all the stinking.',
        },
      ],
      videos: [
        {
          youtubeId: 'GTvnjaUU6Xk',
          title: 'Why do we pass gas? - Purna Kashyap',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: '6mnCF3L6YgI',
          title: 'Why Do Some Farts Smell So Bad?',
          channelName: 'SciShow',
        },
        {
          youtubeId: '3CVoTfcdd4w',
          title: 'Why Do We Burp and Fart (So Much)?!',
          channelName: 'SciShow',
        },
        {
          youtubeId: 'zfttRfTmtuE',
          title: 'The world\'s most dangerous fart - Nick Caruso and Dani Rabaiotti',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['smell-q3', 'smell-q4'],
    },

    // --- Section 3: Stinky Cheese ---
    {
      id: 'smell-cheese',
      icon: '\u{1F9C0}',
      title: 'Stinky Cheese and Bacterial Banquets',
      readAloudBlocks: [
        {
          id: 'cheese-intro',
          paragraphs: [
            'Imagine walking into a fancy cheese shop in France. The air hits you with a wave of smells that range from nutty and sweet to something that honestly smells like old gym socks stuffed inside a wet boot. Welcome to the world of stinky cheese, where bacteria are the real chefs.',
            'All cheese starts as milk. To turn milk into cheese, cheesemakers add special bacteria cultures and an enzyme called rennet that makes the milk curdle into solid chunks (curds) and liquid (whey). The curds get pressed together and then aged -- sometimes for weeks, sometimes for years. During aging, bacteria and fungi go to work. They break down proteins and fats in the cheese, releasing a cocktail of chemical compounds that give each cheese its unique flavor and aroma. The smelliest cheeses, like Limburger, Epoisses, and Stinking Bishop, get their powerful odors from a bacterium called Brevibacterium linens. Here is the disgusting part: this is the exact same species of bacteria that lives between your toes and causes foot odor. You are basically eating foot-smell cheese. Delicious, right?',
          ],
        },
        {
          id: 'cheese-types',
          paragraphs: [
            'Different bacteria produce different smells. Propionibacterium is responsible for the sweet, nutty aroma of Swiss cheese (and for making those famous holes -- the bacteria produce carbon dioxide bubbles as they eat lactic acid). Blue cheeses like Roquefort and Stilton get their pungent, sharp smell from Penicillium mold that grows in the veins running through the cheese. The mold breaks down fats into compounds called methyl ketones, which produce that strong, tangy blue-cheese smell.',
            'Parmesan cheese contains butyric acid -- the same compound found in vomit. Yet somehow, in the right concentration and combined with other compounds, it creates a rich, savory flavor that people pay good money for. The difference between "disgusting" and "delicious" often comes down to concentration and context. Your brain learns to associate certain smells with good food experiences, which is why cheese lovers find these stinky smells appetizing while newcomers might gag.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Mosquito Trap Cheese',
          text: 'Limburger cheese smells so much like human feet that a 2006 study found that mosquitoes were equally attracted to Limburger cheese and smelly feet. Scientists have actually used Limburger cheese in mosquito traps!',
        },
      ],
      videos: [
        {
          youtubeId: 'eksagPy5tmQ',
          title: 'The beneficial bacteria that make delicious food - Erez Garty',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'g96z1P3z5yU',
          title: 'What causes body odor? - Mel Rosenberg',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['smell-q5', 'smell-q6'],
    },

    // --- Section 4: Flowers & Durians ---
    {
      id: 'smell-flowers',
      icon: '\u{1F33A}',
      title: 'Flowers, Durians, and Nature\'s Smell Signals',
      readAloudBlocks: [
        {
          id: 'flowers-intro',
          paragraphs: [
            'Flowers do not smell nice just to make you happy. Every petal-perfume is a carefully evolved chemical signal designed to attract pollinators -- the bees, butterflies, moths, and other creatures that carry pollen from flower to flower, allowing plants to reproduce. A rose produces a complex bouquet of over 400 different volatile chemical compounds. When sunlight warms the petals, these compounds evaporate into the air, creating a scent plume that pollinators can detect from hundreds of meters away. Different flowers produce different scent cocktails to target specific pollinators. Flowers that need bee pollination tend to produce sweet, fresh fragrances. Flowers pollinated by moths release their strongest scents at night. And flowers pollinated by flies and beetles? They often smell like rotting meat, because that is what attracts those insects.',
          ],
        },
        {
          id: 'flowers-corpse',
          paragraphs: [
            'The titan arum (also called the "corpse flower") is the undisputed champion of stinky plants. Native to the rainforests of Sumatra, Indonesia, this enormous flower can grow over three meters tall and, when it blooms, releases a stench often compared to rotting flesh, old fish, and sweaty socks combined. The smell comes from chemicals including dimethyl trisulfide (which smells like Limburger cheese) and trimethylamine (which smells like rotting fish). The corpse flower heats itself up to about 36 degrees Celsius (roughly human body temperature) to help waft these smells further through the forest, attracting carrion beetles and flesh flies that normally feed on dead animals. The corpse flower only blooms once every 7-10 years, and each bloom lasts just 24-48 hours.',
            'Then there is the durian, the "King of Fruits" in Southeast Asia. Imagine a spiky football-sized fruit that smells so intensely that it is banned from hotels, airports, and public transit across Singapore, Thailand, Malaysia, and Japan. Scientists have identified over 50 different odor compounds in durian, including chemicals that individually smell like rotten onions, turpentine, raw sewage, and caramel. Despite the smell, durian tastes rich and creamy -- fans describe it as custard mixed with almonds. But you have to get past the smell first.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Durian Evacuation',
          text: 'In 2018, a durian fruit caused the evacuation of a university library in Canberra, Australia. About 550 people were evacuated because staff thought there was a gas leak. It was just someone\'s lunch!',
        },
      ],
      videos: [
        {
          youtubeId: 'OyClEw5GCMA',
          title: 'The World\'s Smelliest Flower',
          channelName: 'SciShow Kids',
        },
      ],
      quizIds: ['smell-q7', 'smell-q8'],
    },

    // --- Section 5: Wet Dogs & Skunks ---
    {
      id: 'smell-animals',
      icon: '\u{1F9A8}',
      title: 'Wet Dogs, Skunks, and Other Smelly Mysteries',
      readAloudBlocks: [
        {
          id: 'animals-dogs',
          paragraphs: [
            'You know that unmistakable soggy, musty, slightly sour smell when a dog comes in from the rain? Wet dog smell is not actually the dog\'s fault. A dog\'s fur is home to a hidden ecosystem of yeast and bacteria that quietly produce waste chemicals called volatile organic compounds as they live their microscopic lives. When the dog is dry, most of these compounds stay trapped in the fur. But add water, and everything changes. As the water evaporates from the fur, it carries those smelly compounds into the air like tiny hitchhikers, creating a concentrated stink cloud that follows the dog around the room.',
          ],
        },
        {
          id: 'animals-skunks',
          paragraphs: [
            'Skunks take chemical warfare to an entirely different level. When a skunk feels threatened, it can spray a noxious liquid from two glands near the base of its tail with startling accuracy up to 3 meters (about 10 feet). The spray contains a group of sulfur-based chemicals called thiols. Thiols are some of the most potent smell chemicals in nature; the human nose can detect them at concentrations as low as 10 parts per billion. That is like detecting one drop in an Olympic swimming pool. Skunk spray also contains thioacetates, which do not smell much at first but slowly convert into more thiols when they get wet. That is why a dog that got sprayed might seem okay after a bath, then suddenly stink again the next time it rains.',
            'The old folk remedy of washing skunk smell with tomato juice does not actually work -- it just masks the smell temporarily while your nose gets desensitized (a process called olfactory fatigue). The real chemistry fix is a mixture of hydrogen peroxide, baking soda, and dish soap. The hydrogen peroxide oxidizes the thiols, breaking the sulfur bonds and converting them into odorless sulfonic acids. Science to the rescue.',
          ],
        },
        {
          id: 'animals-genes',
          paragraphs: [
            'Some people can smell certain things that other people cannot detect at all. The most famous example is asparagus pee. After eating asparagus, your body breaks down asparagusic acid into sulfur-containing compounds that are excreted in urine. About 40% of people can smell these compounds, while the rest genuinely cannot, due to genetic variations in their olfactory receptors. Similarly, some people think cilantro tastes like soap because of a specific variation in olfactory receptor genes (OR6A2) that makes them hypersensitive to aldehyde chemicals found in cilantro leaves.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Skunk Warning System',
          text: 'A skunk gives plenty of warning before it sprays. First, it stamps its feet. Then it hisses and raises its tail. The spotted skunk even does a dramatic handstand to look bigger. Only if all those warnings are ignored does it actually spray. Skunks carry only enough spray for about five or six uses, and it takes roughly 10 days to produce more, so they use it as a last resort.',
        },
      ],
      videos: [
        {
          youtubeId: 'QNTRGa3ZSKg',
          title: 'Smelly Animals and Why They Stink',
          channelName: 'SciShow',
        },
      ],
      quizIds: ['smell-q9', 'smell-q10'],
    },

    // --- Section 6: Future of Smell ---
    {
      id: 'smell-future',
      icon: '\u{1F52C}',
      title: 'The Future of Smell Science',
      readAloudBlocks: [
        {
          id: 'future-theories',
          paragraphs: [
            'Believe it or not, scientists are still debating exactly how we smell things. The leading theory, called the "shape theory," says that each olfactory receptor has a specific shape, and only molecules with the matching shape can lock into it -- like a key fitting into a lock. But a biophysicist named Luca Turin proposed an alternative: the "vibration theory," which suggests that our noses actually detect the quantum vibrations of molecules, not just their shapes. Two molecules with the same shape but different vibration patterns would smell different. This idea is still controversial and unproven, but it shows just how much mystery remains in smell science.',
          ],
        },
        {
          id: 'future-enoses',
          paragraphs: [
            'Scientists are also developing "electronic noses" -- devices packed with chemical sensors that can detect and identify odors the way our biological noses do. These e-noses are already being used to sniff out spoiled food in packaging plants, detect diseases from a patient\'s breath (some cancers and infections produce specific smell signatures), and even identify landmines by their chemical traces in the soil. Trained dogs can already detect certain cancers by smell with over 90% accuracy, and researchers hope to replicate this ability with artificial sensors.',
            'Meanwhile, our understanding of how smell connects to health keeps growing. Losing your sense of smell (a condition called anosmia) was brought into the spotlight during the COVID-19 pandemic, when millions of people temporarily lost their ability to smell. Scientists discovered that the SARS-CoV-2 virus attacks the supporting cells in the olfactory epithelium, disrupting the signaling pathway. For most people, smell returned within weeks, but for some it took months or never fully recovered. This experience reminded the world just how deeply smell is woven into our daily lives -- from tasting food to detecting danger (like smelling smoke from a fire) to forming emotional memories.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F52C}',
          name: 'Luca Turin',
          title: 'Biophysicist (Born 1953)',
          description:
            'Biophysicist who proposed the controversial "vibration theory" of smell, suggesting our noses detect molecular vibrations rather than just molecular shapes. His work highlights how much we still have to learn about olfaction.',
        },
      ],
      funFacts: [
        {
          title: 'How Many Smells?',
          text: 'There is no scientific consensus on exactly how many distinct smells humans can detect. An often-cited 2014 study in the journal Science estimated 1 trillion smells, but other researchers have criticized the methodology and argue the real number might be closer to 10,000. The truth is, nobody knows for sure yet.',
        },
      ],
      videos: [],
      quizIds: ['smell-q11', 'smell-q12'],
    },
  ],

  // --- Quizzes ---
  quizzes: [
    {
      id: 'smell-q1',
      sectionId: 'smell-nose',
      title: 'Smell Science!',
      question: 'About how many different scents can the human nose distinguish?',
      options: [
        { text: '500', isCorrect: false },
        { text: '10,000', isCorrect: true },
        { text: '1 million', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q2',
      sectionId: 'smell-nose',
      title: 'Nose Anatomy!',
      question: 'What is the name of the tissue patch in your nose that detects smells?',
      options: [
        { text: 'The olfactory epithelium', isCorrect: true },
        { text: 'The nasal drum', isCorrect: false },
        { text: 'The scent gland', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q3',
      sectionId: 'smell-farts',
      title: 'Fart Chemistry!',
      question: 'What chemical compound is mainly responsible for making farts smell like rotten eggs?',
      options: [
        { text: 'Carbon dioxide', isCorrect: false },
        { text: 'Methane', isCorrect: false },
        { text: 'Hydrogen sulfide', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q4',
      sectionId: 'smell-farts',
      title: 'Gas Facts!',
      question: 'About how many times does the average person fart per day?',
      options: [
        { text: '2-5 times', isCorrect: false },
        { text: '13-21 times', isCorrect: true },
        { text: '50-100 times', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q5',
      sectionId: 'smell-cheese',
      title: 'Cheesy Science!',
      question: 'What bacterium makes both Limburger cheese AND foot odor?',
      options: [
        { text: 'E. coli', isCorrect: false },
        { text: 'Brevibacterium linens', isCorrect: true },
        { text: 'Salmonella', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q6',
      sectionId: 'smell-cheese',
      title: 'Parmesan Puzzle!',
      question: 'What compound in Parmesan cheese is also found in vomit?',
      options: [
        { text: 'Hydrogen sulfide', isCorrect: false },
        { text: 'Butyric acid', isCorrect: true },
        { text: 'Citric acid', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q7',
      sectionId: 'smell-flowers',
      title: 'Flower Power!',
      question: 'Why do flowers produce scents?',
      options: [
        { text: 'To scare away all insects', isCorrect: false },
        { text: 'To attract pollinators like bees and butterflies', isCorrect: true },
        { text: 'To make humans buy them', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q8',
      sectionId: 'smell-flowers',
      title: 'Durian Challenge!',
      question: 'Why is durian fruit banned from many hotels and public places in Southeast Asia?',
      options: [
        { text: 'It is poisonous', isCorrect: false },
        { text: 'Its smell is extremely intense and unpleasant to many people', isCorrect: true },
        { text: 'It attracts dangerous animals', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q9',
      sectionId: 'smell-animals',
      title: 'Wet Dog Quiz!',
      question: 'Why does a wet dog suddenly smell much worse than a dry dog?',
      options: [
        { text: 'Water creates new smell chemicals on the spot', isCorrect: false },
        { text: 'Evaporating water carries bacterial smell compounds into the air', isCorrect: true },
        { text: 'Dogs produce more sweat when wet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q10',
      sectionId: 'smell-animals',
      title: 'Skunk Science!',
      question: 'What chemical trick actually removes skunk smell?',
      options: [
        { text: 'Tomato juice', isCorrect: false },
        { text: 'Hydrogen peroxide, baking soda, and dish soap', isCorrect: true },
        { text: 'Lemon juice and salt', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q11',
      sectionId: 'smell-future',
      title: 'E-Nose Quiz!',
      question: 'What are "electronic noses" designed to do?',
      options: [
        { text: 'Replace human noses entirely', isCorrect: false },
        { text: 'Detect and identify specific odors using chemical sensors', isCorrect: true },
        { text: 'Create new artificial smells', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'smell-q12',
      sectionId: 'smell-future',
      title: 'COVID & Smell!',
      question: 'What happened to many people\'s sense of smell during the COVID-19 pandemic?',
      options: [
        { text: 'It became 100 times stronger', isCorrect: false },
        { text: 'Many people temporarily lost it due to the virus attacking olfactory cells', isCorrect: true },
        { text: 'Nothing changed', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // --- Essay ---
  essay: {
    id: 'smell-essay',
    prompt:
      'If you could design a completely new smell that has never existed before, what would it smell like and what purpose would it serve?',
    description:
      'Think about how smells work in nature -- attracting pollinators, warning of danger, signaling food is ready, or defending against predators. Describe your new smell, explain its chemical purpose, and tell us who or what would benefit from it. Would it be a smell that attracts, repels, or warns? Be creative but think scientifically! Write at least 100 characters to unlock the reward.',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Amazing work, Smell Scientist! Your new smell design is scientifically creative!',
  },

  // --- Reward ---
  reward: {
    id: 'smell-reward',
    title: 'Smell Laboratory',
    description:
      'Mix molecular ingredients to create specific target smells! You are a Smell Scientist hired to recreate famous smells by combining the right chemical compounds.',
    lockMessage: 'Complete all quizzes and write your essay to unlock the Smell Lab!',
    requirements: [
      {
        type: 'all-quizzes-correct',
        label: 'Get all 12 quiz questions correct',
      },
      {
        type: 'essay-saved-with-min-chars',
        label: 'Save an open-ended answer (100+ characters)',
      },
    ],
    type: 'smell-lab',
    celebrationMessage: 'Welcome to the Smell Lab! Mix chemicals to recreate famous scents!',
  },

  // --- Conclusion ---
  conclusion: {
    title: 'The Science of Smell: Mission Complete!',
    paragraphs: [
      'You have just taken a wild ride through the stinkiest, most fascinating corners of smell science. From the 10 million olfactory receptor neurons waving around in the mucus of your nasal cavity to the sulfur-packed chemical bombs that skunks fire at their enemies, smell turns out to be one of the most complex and surprising senses we have.',
      'You learned that farts are mainly odorless gas, and the stink comes from a tiny fraction of sulfur compounds produced by trillions of bacteria in your gut. You discovered that the stinkiest cheeses in the world owe their smell to the same bacteria that live on human feet. You found out that flowers are not just being pretty -- they are running a sophisticated chemical advertising campaign to attract specific pollinators.',
      'Perhaps most amazingly, you discovered that scientists are still arguing about how smell even works at the molecular level. Is it about shape or vibrations? Electronic noses are being built to detect cancer and explosives. Dogs are being trained to sniff out diseases.',
      'The next time someone rips a fart and blames the dog, you will know exactly what is happening at a molecular level. And that, right there, is the power of science.',
    ],
  },
};
