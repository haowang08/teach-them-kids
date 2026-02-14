import type { Topic } from '../types';

export const givingAndSharing: Topic = {
  id: 'giving-and-sharing',
  slug: 'giving-and-sharing',
  title: 'Giving & Sharing',
  subtitle: 'The Joy of Generosity',
  status: 'active',
  themeId: 'giving-and-sharing',
  heroIcons: ['❤️', '🤝', '🌊'],
  navItems: [
    { id: 'why-give', icon: '🧠', label: 'Why Give' },
    { id: 'ways-give', icon: '🎁', label: 'Ways to Give' },
    { id: 'kid-heroes', icon: '🌟', label: 'Kid Heroes' },
    { id: 'nonprofits', icon: '🏛️', label: 'Nonprofits' },
    { id: 'choose-cause', icon: '🧭', label: 'Choose a Cause' },
    { id: 'ripple', icon: '🌊', label: 'Ripple Effect' },
  ],
  sections: [
    // ─── Section 1: Why Give? ─────────────────────────────────────
    {
      id: 'why-give',
      icon: '🧠',
      title: 'Why Give? The Science of Generosity',
      readAloudBlocks: [
        {
          id: 'why-give-brain',
          paragraphs: [
            'Have you ever given someone a gift, helped a friend, or shared your favorite snack — and noticed that warm, glowing feeling inside? That feeling is not just in your imagination. Scientists have discovered that when you do something generous, your brain literally lights up with happiness! Using special brain scanners called fMRI machines, researchers have watched what happens inside people\'s brains when they give. The result? The brain\'s reward center — the same area that activates when you eat your favorite food or play your favorite game — fires up when you help someone else.',
            'This response is sometimes called the "helper\'s high." When you give or share, your brain releases chemicals called endorphins and oxytocin. Endorphins are your body\'s natural feel-good chemicals — they\'re the same ones that make you feel great after exercising. Oxytocin is sometimes called the "bonding hormone" because it helps you feel connected to other people. Together, these chemicals create a powerful sense of joy and well-being that can last for hours or even days after a generous act.',
            'But the science gets even more amazing. A famous study at Harvard Business School asked people to spend money either on themselves or on someone else. The people who spent money on others reported feeling significantly happier than those who spent it on themselves — no matter how much money was involved! Even spending just a few dollars on someone else made people happier than buying something for themselves. Other studies have found that generous people tend to live longer, have lower blood pressure, and experience less stress. It turns out that giving really is good for you — body and mind!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'osCUTGkKVRg',
          title: 'Understanding Charities and Donations',
          channelName: 'Easy Peasy Finance',
        },
      ],
      quizIds: ['give-q1a', 'give-q1b'],
    },

    // ─── Section 2: Many Ways to Give ─────────────────────────────
    {
      id: 'ways-give',
      icon: '🎁',
      title: 'Many Ways to Give',
      readAloudBlocks: [
        {
          id: 'ways-give-money',
          paragraphs: [
            'When most people think about giving, they think about donating money. And yes, donating money is a wonderful way to help! Even small amounts — a few coins from your allowance, a dollar from a birthday card — can make a real difference when many people give together. Imagine if every kid in your school donated just one dollar. If there are 500 students, that\'s $500 — enough to buy supplies for a classroom, provide meals for a family, or fund a small project in your community. That\'s the power of many small gifts adding up to something big!',
            'But here\'s something important to know: money is just one of many ways to give. You can also give your time by volunteering — helping at a food bank, reading to younger kids, visiting elderly neighbors, or cleaning up a park. Volunteering means giving your time and energy to help others without being paid for it. In the United States alone, over 60 million people volunteer every year, contributing billions of hours of service. Time is one of the most valuable things you can give because it shows someone that you truly care.',
            'You can also give your skills and talents! Are you good at drawing? You could make cards for people in hospitals. Do you love baking? You could make treats for a bake sale to raise money for a cause. Are you great with computers? You could help an older neighbor learn to use email. And never underestimate the power of simple kindness — a smile, a kind word, holding the door for someone, or including a classmate who seems lonely. These small acts of generosity cost nothing but can mean everything to the person who receives them.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'OQIKGUaXlRo',
          title: 'Charitable Giving for Kids',
          channelName: 'Twinkl USA',
        },
      ],
      quizIds: ['give-q1c', 'give-q1d'],
    },

    // ─── Section 3: Kid Philanthropists ───────────────────────────
    {
      id: 'kid-heroes',
      icon: '🌟',
      title: 'Kid Philanthropists: Young Heroes Who Changed the World',
      readAloudBlocks: [
        {
          id: 'kid-heroes-alex',
          paragraphs: [
            'You might think you have to be a grown-up to make a big difference in the world. But some of the most inspiring stories of generosity come from kids just like you! One of the most incredible kid heroes of all time is Alexandra "Alex" Scott. When Alex was just one year old, she was diagnosed with neuroblastoma, a type of childhood cancer. Despite spending much of her young life in and out of hospitals, Alex had an amazing spirit and a huge heart.',
            'When Alex was just four years old, she told her parents she wanted to set up a lemonade stand in their front yard — not to buy toys or treats for herself, but to raise money to help doctors find a cure for cancer so that other kids wouldn\'t have to be sick like her. Her first lemonade stand raised an incredible $2,000! Alex continued holding lemonade stands every year, and as word spread about her mission, people across the country were inspired to set up their own lemonade stands to support her cause.',
            'Sadly, Alex passed away in 2004 at the age of eight, but her legacy is extraordinary. Alex\'s Lemonade Stand Foundation, the charity created in her honor, has raised over $250 million for childhood cancer research and has funded more than 1,000 research projects. Every year, thousands of lemonade stands pop up across the country in Alex\'s memory. One little girl with a big dream and a pitcher of lemonade sparked a movement that has changed — and saved — countless lives.',
          ],
        },
        {
          id: 'kid-heroes-ryan',
          paragraphs: [
            'Another amazing kid hero is Ryan Hickman from Orange County, California. When Ryan was just three years old, he went with his dad to a local recycling center. He was fascinated by the process of turning used cans and bottles into something new. That simple trip sparked a passion that would change his life and his community forever. Ryan started collecting recyclables from his neighbors, loading them into his little red wagon, and hauling them to the recycling center himself.',
            'As Ryan grew older, his recycling mission grew with him. He started a company called Ryan\'s Recycling, and by the time he was a teenager, he had recycled over 1.6 million cans and bottles! But Ryan didn\'t stop there — he used the money he earned from recycling to support ocean conservation efforts and beach cleanups. He has been featured on national television, given talks about the importance of recycling and protecting the environment, and inspired kids all over the world to take action in their own communities.',
            'What makes Alex and Ryan so inspiring is that they didn\'t wait until they were adults to make a difference. They saw a problem, felt something in their hearts, and took action — no matter how small the first step was. Alex started with a pitcher of lemonade. Ryan started with a little red wagon. Both of them proved that age is no barrier to making the world a better place. You don\'t have to be big to do big things!',
          ],
        },
      ],
      characters: [
        {
          emoji: '❤️',
          name: 'Heart',
          title: 'The Generosity Guide',
          description:
            'Heart is your guide through the world of giving and sharing. With a warm glow and an endless supply of encouragement, Heart helps you understand why generosity matters and how even the smallest acts of kindness can create powerful change. Heart believes that every single person — no matter how young — has something wonderful to give.',
        },
        {
          emoji: '🍋',
          name: 'Alex',
          title: 'The Young Hero',
          description:
            'Inspired by the real-life Alexandra Scott, Alex represents the incredible courage and determination of kids who refuse to let obstacles stop them from helping others. At just four years old, Alex set up a lemonade stand to fight childhood cancer — and sparked a movement that has raised over $250 million. Alex reminds us that one small idea, powered by a big heart, can change the world.',
        },
        {
          emoji: '🌊',
          name: 'Ripple',
          title: 'The Chain Reactor',
          description:
            'Ripple shows how one kind act can spread outward like a stone dropped in a pond. When you help someone, they feel inspired to help someone else, and that person helps another — creating a chain reaction of kindness that can reach people you\'ve never even met. Ripple proves that your generosity doesn\'t stop with you; it keeps going and going!',
        },
      ],
      videos: [
        {
          youtubeId: 'vbpFASNKe28',
          title: "The Story of Alex's Lemonade Stand Foundation",
          channelName: 'ALSF',
        },
      ],
      quizIds: ['give-q2a', 'give-q2b'],
    },

    // ─── Section 4: What Is a Nonprofit? ──────────────────────────
    {
      id: 'nonprofits',
      icon: '🏛️',
      title: 'What Is a Nonprofit? Organizations That Help',
      readAloudBlocks: [
        {
          id: 'nonprofits-basics',
          paragraphs: [
            'You\'ve probably heard of companies like toy stores, restaurants, and tech companies — these are all businesses that exist to make money, which is called making a profit. But there is a special kind of organization that works differently. A nonprofit organization is a group of people who come together not to make money for themselves, but to help others, solve problems, or make the world a better place. Instead of keeping the money they raise, nonprofits use every dollar to support their mission — whether that\'s feeding hungry families, protecting endangered animals, building schools, or funding medical research.',
            'Nonprofits come in all shapes and sizes. Some are huge international organizations like UNICEF, which helps children in need around the world, or the Red Cross, which provides disaster relief and emergency services. Others are small, local groups — like a neighborhood food pantry that collects and distributes groceries to families who need them, or an animal shelter that rescues and cares for stray pets. No matter the size, every nonprofit starts with people who care deeply about a cause and decide to take action.',
            'So where does the money come from? Nonprofits get their funding from donations — gifts of money from individuals, businesses, and sometimes governments. They also raise money through fundraisers, events, grants, and sales of goods or services. For example, a nonprofit might hold a fun run, a bake sale, or a charity concert to raise funds. Some nonprofits also have volunteers — people who give their time for free — to help carry out their work. When you donate to Alex\'s Lemonade Stand Foundation or drop coins in a charity jar, you\'re supporting a nonprofit!',
          ],
        },
      ],
      videos: [],
      quizIds: ['give-q2c', 'give-q2d'],
    },

    // ─── Section 5: Choosing a Cause ──────────────────────────────
    {
      id: 'choose-cause',
      icon: '🧭',
      title: 'Choosing a Cause: Finding What Matters to You',
      readAloudBlocks: [
        {
          id: 'choose-cause-explore',
          paragraphs: [
            'There are so many important causes in the world — helping animals, protecting the environment, fighting hunger, supporting education, funding medical research, building homes for people who need them, and so many more. With so many choices, how do you decide where to focus your generosity? The answer starts with looking inside yourself and asking: "What do I care about the most?"',
            'Think about what makes you feel the strongest emotions. Does it break your heart to see pictures of animals without homes? Do you feel angry when you learn about pollution in the ocean? Does it make you sad to know that some kids don\'t have enough food or can\'t go to school? Those strong feelings are your compass — they point you toward the causes that matter most to you personally. There\'s no wrong answer! The best cause to support is the one that lights a fire in your heart.',
            'Once you\'ve found a cause that excites you, the next step is learning more about it. Who is already working on this problem? What organizations are making a difference? How can you help — with your time, your skills, your voice, or your money? You might discover that the best way for you to help is by volunteering at a local shelter, or organizing a fundraiser at school, or even just spreading the word by telling friends and family about an issue you care about. The important thing is to start somewhere, even if your first step is small.',
            'Remember, you don\'t have to choose just one cause forever. As you grow and learn, your interests might change — and that\'s perfectly okay! The important thing is that you\'re paying attention to the world around you and looking for ways to make it better. Every person who cares and takes action, no matter how small, is making a real difference.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'JicGbdUtMJg',
          title: 'How Kids Change the World - Ryan Hickman',
          channelName: 'National Theatre for Children',
        },
      ],
      quizIds: ['give-q3a'],
    },

    // ─── Section 6: The Ripple Effect ─────────────────────────────
    {
      id: 'ripple',
      icon: '🌊',
      title: 'The Ripple Effect: How Small Acts Create Big Waves',
      readAloudBlocks: [
        {
          id: 'ripple-intro',
          paragraphs: [
            'Have you ever dropped a pebble into a pond and watched what happens? The spot where the pebble lands creates a tiny splash — but then something amazing occurs. Rings of ripples spread outward from that single point, growing larger and larger, reaching further and further across the water. One small pebble can send waves all the way to the edges of the pond! Kindness works the exact same way. This is called the "ripple effect," and it\'s one of the most powerful forces in the world.',
            'Here\'s how it works: when you do something kind for someone — maybe you help a classmate pick up their dropped books, share your lunch with a friend who forgot theirs, or write a thank-you note to a teacher — that person feels good. And when people feel good because of someone else\'s kindness, research shows they are much more likely to be kind to another person. That person then passes the kindness on to someone else, and that person passes it on again. One simple act of generosity can start a chain reaction that touches dozens, hundreds, or even thousands of people!',
            'Scientists have actually studied this phenomenon. In one experiment at the University of California, researchers found that when one person performed a generous act, it inspired others to be generous too — and the effect rippled through social networks, influencing people up to three degrees of separation away. That means your one kind act could inspire a friend, who inspires their cousin, who inspires their neighbor — people you\'ve never even met could be affected by your generosity!',
            'Think about Alexandra Scott\'s lemonade stand. She started with one small stand in her front yard. That one act of generosity inspired her family, then her neighbors, then her whole community. News spread, and soon thousands of people across the country were setting up their own lemonade stands. One four-year-old girl\'s idea rippled outward until it became a $250 million wave of hope and healing. Your ripple may start small, but you never know how far it will travel or how many lives it will touch.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'XQdekLt7Tw8',
          title: 'How to Start Your Own Charity',
          channelName: 'ICON Network',
        },
      ],
      quizIds: ['give-q3b'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Why Give?
    {
      id: 'give-q1a',
      sectionId: 'why-give',
      title: 'Quick Quiz Time!',
      question: 'Why does giving make you feel good?',
      options: [
        { text: 'Because someone tells you to feel happy', isCorrect: false },
        { text: 'Your brain\'s reward center lights up and releases feel-good chemicals', isCorrect: true },
        { text: 'It doesn\'t actually make you feel good', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'give-q1b',
      sectionId: 'why-give',
      title: 'Generosity Science Quiz!',
      question: 'What are ways to give besides money?',
      options: [
        { text: 'There are no other ways to give', isCorrect: false },
        { text: 'Time, skills, and kindness', isCorrect: true },
        { text: 'Only expensive gifts count as giving', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Many Ways to Give
    {
      id: 'give-q1c',
      sectionId: 'ways-give',
      title: 'Ways to Give Quiz!',
      question: 'How much did Alex\'s Lemonade Stand raise for cancer research?',
      options: [
        { text: 'About $1,000', isCorrect: false },
        { text: 'Over $250 million', isCorrect: true },
        { text: 'Exactly $50,000', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'give-q1d',
      sectionId: 'ways-give',
      title: 'Nonprofit Knowledge Check!',
      question: 'What is a nonprofit organization?',
      options: [
        { text: 'A business that makes lots of money for its owners', isCorrect: false },
        { text: 'An organization that helps people without making profit for itself', isCorrect: true },
        { text: 'A government agency that collects taxes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Kid Philanthropists
    {
      id: 'give-q2a',
      sectionId: 'kid-heroes',
      title: 'Kid Heroes Quiz!',
      question: 'How did Ryan Hickman help his community?',
      options: [
        { text: 'By starting a toy company', isCorrect: false },
        { text: 'By recycling and cleaning up the environment', isCorrect: true },
        { text: 'By building houses for people', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'give-q2b',
      sectionId: 'kid-heroes',
      title: 'Ripple Effect Quiz!',
      question: 'What is the "ripple effect"?',
      options: [
        { text: 'A type of water sport', isCorrect: false },
        { text: 'When one kind act inspires others, creating a chain reaction', isCorrect: true },
        { text: 'A special effect in movies', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Nonprofits
    {
      id: 'give-q2c',
      sectionId: 'nonprofits',
      title: 'Young Hero Challenge!',
      question: 'At what age did Alexandra Scott start her lemonade stand?',
      options: [
        { text: '10 years old', isCorrect: false },
        { text: '4 years old', isCorrect: true },
        { text: '7 years old', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'give-q2d',
      sectionId: 'nonprofits',
      title: 'Cause Finder Quiz!',
      question: 'What should you think about when choosing a cause?',
      options: [
        { text: 'Only what your friends are doing', isCorrect: false },
        { text: 'What matters most to you and where you can help', isCorrect: true },
        { text: 'Whatever is the most popular cause right now', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Choosing a Cause
    {
      id: 'give-q3a',
      sectionId: 'choose-cause',
      title: 'Community Hero Quiz!',
      question: 'Can kids make a difference in their community?',
      options: [
        { text: 'No, only adults can make a difference', isCorrect: false },
        { text: 'Yes, kids of any age can help!', isCorrect: true },
        { text: 'Only teenagers can make a difference', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 6: The Ripple Effect
    {
      id: 'give-q3b',
      sectionId: 'ripple',
      title: 'Volunteering Quiz!',
      question: 'What is volunteering?',
      options: [
        { text: 'Working at a job for a paycheck', isCorrect: false },
        { text: 'Helping others without being paid', isCorrect: true },
        { text: 'Buying things for yourself', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'give-essay',
    prompt:
      'Tell us about a cause you care about and how you would help!',
    description:
      'Now it\'s your turn to think like a philanthropist! What cause or issue matters most to you? It could be helping animals, protecting the environment, fighting hunger, supporting kids who are sick, or anything else that tugs at your heartstrings. Describe the cause you care about, explain why it\'s important to you, and share your ideas for how you could help — whether through volunteering, fundraising, spreading awareness, or acts of kindness. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'What a generous heart you have! Your thoughts about giving back have been saved. You\'re already making the world a better place by caring!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'give-reward',
    title: 'Kindness Ripple Effect!',
    description:
      'You\'ve unlocked the Kindness Ripple Effect! Watch as your acts of generosity create beautiful ripples of kindness that spread throughout an entire community — touching neighbors, friends, and even strangers with warmth and compassion.',
    lockMessage: 'Kindness Locked!',
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
    type: 'kindness-ripple',
    celebrationMessage:
      'INCREDIBLE! You\'ve unlocked the Kindness Ripple Effect! Just like Alex\'s lemonade stand and Ryan\'s recycling wagon, your generosity creates ripples that spread far and wide. Keep spreading kindness — the world needs your big, generous heart!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Generosity Champion!',
    paragraphs: [
      'Congratulations! You\'ve completed an amazing journey through the world of giving and sharing, and you\'ve discovered something truly powerful: generosity isn\'t just about money — it\'s about heart, action, and the belief that every single person can make a difference.',
      'You learned that giving literally makes your brain happier — your reward center lights up, endorphins and oxytocin flood your system, and studies prove that spending on others brings more joy than spending on yourself. Generosity is good for your happiness, your health, and your connections with the people around you.',
      'You explored the many ways to give — from donating money and volunteering your time, to sharing your skills and offering simple acts of kindness. You met incredible kid heroes like Alexandra Scott, who raised over $250 million for cancer research starting with a single lemonade stand at age four, and Ryan Hickman, who has recycled over 1.6 million cans and bottles since he was three years old. They proved that you are never too young to change the world.',
      'You discovered how nonprofit organizations work, learned how to choose a cause that matters to you by listening to your heart, and explored the incredible ripple effect — how one small act of kindness can inspire a chain reaction that touches hundreds or even thousands of lives, reaching people you\'ve never even met.',
      'Now it\'s your turn to create your own ripple. Whether you set up a lemonade stand, volunteer at a local shelter, recycle cans in your neighborhood, or simply smile at someone who looks like they need it — your generosity matters. Every kind act, no matter how small, sends waves of goodness out into the world. Go out there and make your ripple!',
    ],
  },
};
