import type { Topic } from '../types';

export const earningMoney: Topic = {
  id: 'earning-money',
  slug: 'earning-money',
  title: 'Earning Money',
  subtitle: 'From Lemonade Stands to Dream Jobs',
  status: 'active',
  themeId: 'earning-money',
  heroIcons: ['💪', '🍋', '💡'],
  navItems: [
    { id: 'how-earn', icon: '💼', label: 'How People Earn' },
    { id: 'kid-entrepreneurs', icon: '🍋', label: 'Kid Entrepreneurs' },
    { id: 'entrepreneurship', icon: '💡', label: 'What Is Entrepreneurship' },
    { id: 'skills', icon: '🛠️', label: 'Skills That Pay' },
    { id: 'first-job', icon: '🧹', label: 'Your First Job' },
    { id: 'dream-big', icon: '🌟', label: 'Dream Big' },
  ],
  sections: [
    // ─── Section 1: How Do People Earn Money? ─────────────────────
    {
      id: 'how-earn',
      icon: '💼',
      title: 'How Do People Earn Money?',
      readAloudBlocks: [
        {
          id: 'how-earn-intro',
          paragraphs: [
            'Have you ever wondered where money comes from? Not the printing press — but how people actually get money in their pockets? The truth is, there are many different ways people earn money, and understanding them is one of the most important things you can learn. Whether someone works at a hospital, builds furniture, writes stories, or sells lemonade on the corner, they are all earning money by providing something valuable to other people.',
            'The most common way people earn money is by having a job. When you have a job, you work for a company or organization, and they pay you a wage or salary in return for your time and effort. A teacher earns money by educating students. A firefighter earns money by keeping the community safe. A software engineer earns money by building apps and websites. Each of these people has a skill that others need, and they trade their time and skill for money.',
            'But jobs are not the only way to earn money! Some people start their own businesses. Instead of working for someone else, they create a product or service and sell it directly to customers. A baker might open a cupcake shop. An artist might sell paintings online. A teenager might mow lawns in the neighborhood. When you run your own business, you get to be your own boss — but you also take on more responsibility and risk.',
          ],
        },
        {
          id: 'how-earn-creative',
          paragraphs: [
            'There is also a third way people earn money: through creative work and intellectual property. Musicians earn money when people listen to their songs. Authors earn royalties when their books are sold. Inventors earn licensing fees when companies use their patented ideas. YouTubers earn ad revenue when viewers watch their videos. In all of these cases, people create something once and can keep earning money from it over time — this is sometimes called "passive income."',
          ],
        },
      ],
      videos: [
        {
          youtubeId: '-pVyrW_vwaw',
          title: 'Jobs I Can Have When I Grow Up',
          channelName: 'Highlights Kids',
        },
      ],
      quizIds: ['earn-q1a', 'earn-q1b'],
    },

    // ─── Section 2: Kid Entrepreneurs ─────────────────────────────
    {
      id: 'kid-entrepreneurs',
      icon: '🍋',
      title: 'Kid Entrepreneurs',
      readAloudBlocks: [
        {
          id: 'kid-entrepreneurs-intro',
          paragraphs: [
            'You do not have to wait until you are a grown-up to start earning money. All around the world, kids just like you have started their own businesses, invented cool products, and found creative ways to earn money while still going to school. These kid entrepreneurs prove that age is just a number when it comes to great ideas!',
            'Take Mikaila Ulmer, for example. When she was just four years old, she got stung by a bee — twice! Instead of being scared of bees, she got curious. She learned that bees are incredibly important for our food supply and that their populations are declining. Mikaila started making lemonade using her great-grandmother\'s recipe, which included flaxseed and honey. She called her company "Me & the Bees Lemonade" and donated a percentage of every sale to organizations that protect honeybees. By the time she was eleven, her lemonade was being sold in hundreds of stores across the United States!',
            'Then there is Moziah Bridges, who started his bow tie business, Mo\'s Bows, when he was just nine years old. He loved fashion but could never find bow ties that matched his style, so he asked his grandmother to teach him how to sew. He started making his own colorful, handmade bow ties and selling them online. His business grew so fast that he appeared on the TV show Shark Tank and landed a deal worth $150,000. Today, Mo\'s Bows is a well-known brand, and Moziah has even designed a line of bow ties for the NBA!',
          ],
        },
        {
          id: 'kid-entrepreneurs-more',
          paragraphs: [
            'What do all these kid entrepreneurs have in common? They noticed a problem or something missing in the world, and they used their creativity to fill that gap. They did not let their age stop them. They learned new skills, asked for help from family and mentors, and kept going even when things got tough. And here is the best part: you can do it too! Every big business started as just an idea in someone\'s head.',
          ],
        },
      ],
      characters: [
        {
          emoji: '🍋',
          name: 'Lemon Lucy',
          title: 'The Kid CEO',
          description:
            'Lemon Lucy represents every kid who has ever set up a lemonade stand, bake sale, or craft booth. She shows that the simplest ideas — like selling a refreshing drink on a hot day — can teach you everything about running a business: buying supplies, setting prices, attracting customers, and counting your profits at the end of the day.',
          extraTag: 'Role: Kid Business Owner',
        },
        {
          emoji: '🔧',
          name: 'Fix-It Felix Jr.',
          title: 'The Problem Solver',
          description:
            'Fix-It Felix Jr. is the kid who sees a broken thing and thinks, "I can fix that!" Whether it is helping a neighbor with yard work, organizing a messy garage, or figuring out why a computer is running slow, Felix earns money by solving problems. He reminds us that some of the best businesses start by simply helping people with what they need.',
          extraTag: 'Role: Problem Solver',
        },
        {
          emoji: '🎨',
          name: 'Creative Chris',
          title: 'The Side Hustler',
          description:
            'Creative Chris turns hobbies into income. Whether it is drawing custom portraits, making friendship bracelets, designing digital art, or editing videos for friends, Chris shows that your passions and creative talents can become a way to earn money. The key is finding people who value what you create and are willing to pay for it.',
          extraTag: 'Role: Creative Entrepreneur',
        },
      ],
      videos: [
        {
          youtubeId: 'hQ6HGsxmtFI',
          title: 'Money Tips for Kids: Ways to Make Money',
          channelName: 'Clearly Luminus',
        },
      ],
      quizIds: ['earn-q1c', 'earn-q1d'],
    },

    // ─── Section 3: What Is Entrepreneurship? ─────────────────────
    {
      id: 'entrepreneurship',
      icon: '💡',
      title: 'What Is Entrepreneurship?',
      readAloudBlocks: [
        {
          id: 'entrepreneurship-intro',
          paragraphs: [
            'You have probably heard the word "entrepreneur" before, but what does it really mean? An entrepreneur is someone who identifies a problem and creates a solution — usually in the form of a product or service — and builds a business around it. Entrepreneurs take an idea from their imagination and turn it into something real that people can buy and use.',
            'The first step of entrepreneurship is identifying a problem. Look around you — is there something that bugs you? Something that could be better? Maybe the school cafeteria line is always too long, or maybe your little sibling can never find matching socks. Every problem is an opportunity! Entrepreneurs train themselves to see problems not as annoyances, but as chances to create something new.',
            'Once you have identified a problem, the next step is creating a solution. This is where creativity comes in. You brainstorm ideas, test them out, get feedback from others, and improve your solution until it really works. Then comes the business part: figuring out how much it costs to make your product or deliver your service (these are your "expenses"), how much to charge for it (your "price"), and how much money you will have left over after paying your costs (your "profit"). The total money your business takes in is called "revenue," and profit is revenue minus expenses.',
          ],
        },
        {
          id: 'entrepreneurship-mindset',
          paragraphs: [
            'But entrepreneurship is not just about money — it is also a mindset. Entrepreneurs are resilient, which means they bounce back from failure. Almost every successful business owner has failed at something before finding what works. They are curious, always asking "why?" and "what if?" They are willing to take calculated risks, meaning they think carefully about what could go wrong but still have the courage to try new things. And most importantly, they never stop learning.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: '73IetI9oG20',
          title: 'Entrepreneurship for Kids',
        },
      ],
      quizIds: ['earn-q2a', 'earn-q2b'],
    },

    // ─── Section 4: Skills That Pay ───────────────────────────────
    {
      id: 'skills',
      icon: '🛠️',
      title: 'Skills That Pay',
      readAloudBlocks: [
        {
          id: 'skills-hard',
          paragraphs: [
            'If earning money is about providing value to others, then the question becomes: how do you become more valuable? The answer is simple — learn skills! Skills are the abilities and knowledge you develop through practice and education, and they are the foundation of every career, business, and side hustle. The more skills you have, the more ways you can earn money.',
            'There are two main types of skills: hard skills and soft skills. Hard skills are specific, teachable abilities that you can measure and demonstrate. Examples include coding and programming, cooking and baking, playing a musical instrument, doing math and handling money, writing and storytelling, building and fixing things, drawing and graphic design, and speaking another language. These skills take time and practice to develop, but once you have them, they open doors to all kinds of earning opportunities.',
          ],
        },
        {
          id: 'skills-soft',
          paragraphs: [
            'Soft skills are just as important, even though they are harder to measure. These are the "people skills" that help you work well with others and navigate the world. Communication is a soft skill — being able to explain your ideas clearly, listen to others, and write well. Teamwork is a soft skill — knowing how to collaborate, compromise, and support the people around you. Creativity, problem-solving, time management, and leadership are all soft skills too.',
            'Here is the secret that many successful people know: the combination of hard skills and soft skills is what makes you truly valuable. A brilliant coder who cannot communicate with teammates will struggle. A friendly, charismatic person who does not have any technical abilities may have trouble finding work. But someone who can code AND explain their ideas clearly? Someone who can bake amazing cakes AND market them on social media? That person is unstoppable!',
          ],
        },
        {
          id: 'skills-learning',
          paragraphs: [
            'The best part about skills is that anyone can learn them. You do not need to be born with a special talent. You just need curiosity, practice, and patience. Read books, watch tutorials, take classes, and most importantly — practice, practice, practice. Every expert was once a beginner. Every master was once a disaster. The skills you start building today will pay off for the rest of your life.',
          ],
        },
      ],
      videos: [],
      quizIds: ['earn-q2c', 'earn-q2d'],
    },

    // ─── Section 5: Your First "Job" ──────────────────────────────
    {
      id: 'first-job',
      icon: '🧹',
      title: 'Your First "Job"',
      readAloudBlocks: [
        {
          id: 'first-job-ideas',
          paragraphs: [
            'You do not need a fancy office or a college degree to start earning money. In fact, some of the best ways to learn about work and money are right in your own neighborhood! Your first "job" might not look like a traditional grown-up job, but the lessons you learn from it will stay with you forever.',
            'One of the most classic kid businesses is the lemonade stand. It might sound simple, but running a lemonade stand teaches you real business skills. You have to buy your supplies (lemons, sugar, cups), figure out your costs, set a fair price, find a good location, attract customers with a sign, provide good service with a smile, and count your earnings at the end. That is a complete business experience!',
            'But lemonade is just the beginning. You could offer pet sitting or dog walking services to neighbors. You could do yard work — raking leaves, pulling weeds, watering gardens, or shoveling snow. If you are crafty, you could make friendship bracelets, painted rocks, or custom cards and sell them at a school fair or online with a parent\'s help. If you are good with technology, you could help older neighbors set up their phones or tablets.',
          ],
        },
        {
          id: 'first-job-tips',
          paragraphs: [
            'Doing chores at home is another great way to start learning about work and earning. Many families have an allowance system where kids earn money for completing tasks like cleaning their room, doing the dishes, taking out the trash, or helping with laundry. Even if you do not get paid for chores, you are still building important work habits: showing up, doing a good job, finishing what you start, and being reliable.',
            'Whatever your first "job" is, here are some tips to make it a success. First, always do your best work — your reputation is everything. If you mow someone\'s lawn, make it look amazing. If you pet-sit, treat that pet like your own. Second, be reliable — show up when you say you will and do what you promise. Third, be polite and professional — say please and thank you, and treat every customer with respect. These habits will serve you well no matter what career you choose in the future.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'zaOYxctwE-o',
          title: 'Kids Running Their Own Business',
          channelName: 'Behind the News',
        },
      ],
      quizIds: ['earn-q3a'],
    },

    // ─── Section 6: Dream Big ─────────────────────────────────────
    {
      id: 'dream-big',
      icon: '🌟',
      title: 'Dream Big',
      readAloudBlocks: [
        {
          id: 'dream-big-explore',
          paragraphs: [
            'Now that you know how people earn money, what entrepreneurship is, and what skills are valuable, it is time to dream big! The world is full of incredible careers, and the one that is right for you might be something you have never even heard of yet. The key is to stay curious, keep exploring, and never put limits on what you think you can achieve.',
            'Some people dream of being doctors, saving lives and helping people feel better every single day. Others dream of being engineers, designing bridges, rockets, or robots that change the world. Some people want to be artists, musicians, or writers, creating beauty and stories that touch people\'s hearts. Others want to be teachers, coaches, or mentors, helping the next generation learn and grow. And some people want to be entrepreneurs, building businesses that solve big problems and create jobs for others.',
            'Here is something important to remember: many of the jobs that will exist when you are a grown-up have not been invented yet! Twenty years ago, nobody was a social media manager, an app developer, a drone pilot, a podcast host, or a virtual reality designer. Technology and the world are always changing, which means new careers are being created all the time. That is exciting because it means the future is wide open for you.',
          ],
        },
        {
          id: 'dream-big-advice',
          paragraphs: [
            'The best advice anyone can give you about your future career is this: follow your curiosity. Pay attention to what excites you, what you are good at, and what problems you care about solving. Try lots of different things — join clubs, take classes, volunteer, read books about different careers, and talk to adults about what they do for work. The more you explore, the more you will discover about yourself and what you want your life to look like. Your dream job might be something totally unexpected, and that is perfectly okay!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'Fkd9TWUtFm0',
          title: 'A 12-year-old app developer - Thomas Suarez',
          channelName: 'TED',
        },
      ],
      quizIds: ['earn-q3b'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: How Do People Earn Money?
    {
      id: 'earn-q1a',
      sectionId: 'how-earn',
      title: 'Quick Quiz Time!',
      question: 'What are the main ways people earn money?',
      options: [
        { text: 'Only by having a job at a big company', isCorrect: false },
        { text: 'Jobs, running a business, or creative work', isCorrect: true },
        { text: 'By finding coins on the ground', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'earn-q1b',
      sectionId: 'how-earn',
      title: 'Entrepreneur Check!',
      question: 'What is an entrepreneur?',
      options: [
        { text: 'Someone who works for the government', isCorrect: false },
        { text: 'Someone who starts a business to solve a problem', isCorrect: true },
        { text: 'Someone who only invests in stocks', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Kid Entrepreneurs
    {
      id: 'earn-q1c',
      sectionId: 'kid-entrepreneurs',
      title: 'Revenue Quiz!',
      question: 'What is revenue?',
      options: [
        { text: 'The money left over after paying all your costs', isCorrect: false },
        { text: 'The total money a business takes in', isCorrect: true },
        { text: 'The money you borrow from a bank', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'earn-q1d',
      sectionId: 'kid-entrepreneurs',
      title: 'Profit Challenge!',
      question: 'What is profit?',
      options: [
        { text: 'The total amount of money you earn', isCorrect: false },
        { text: 'Revenue minus expenses (costs)', isCorrect: true },
        { text: 'The price you charge for your product', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: What Is Entrepreneurship?
    {
      id: 'earn-q2a',
      sectionId: 'entrepreneurship',
      title: 'Hard Skills Quiz!',
      question: 'What are "hard skills"?',
      options: [
        { text: 'Skills that are very difficult to learn', isCorrect: false },
        { text: 'Specific abilities like coding, cooking, or math', isCorrect: true },
        { text: 'Skills you can only learn in college', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'earn-q2b',
      sectionId: 'entrepreneurship',
      title: 'Soft Skills Quiz!',
      question: 'What are "soft skills"?',
      options: [
        { text: 'Skills that are easy and require no practice', isCorrect: false },
        { text: 'People skills like communication, teamwork, and creativity', isCorrect: true },
        { text: 'Skills used only in sports', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Skills That Pay
    {
      id: 'earn-q2c',
      sectionId: 'skills',
      title: 'First Step Quiz!',
      question: 'What is a good first step to earning money as a kid?',
      options: [
        { text: 'Waiting until you are old enough to get a real job', isCorrect: false },
        { text: 'Identifying a problem you can solve for others', isCorrect: true },
        { text: 'Asking your parents for a bigger allowance', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'earn-q2d',
      sectionId: 'skills',
      title: 'Lifelong Learning Quiz!',
      question: 'Why is it important to keep learning new skills?',
      options: [
        { text: 'Because schools require it', isCorrect: false },
        { text: 'More skills mean more ways to earn', isCorrect: true },
        { text: 'Because your parents told you to', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Your First "Job"
    {
      id: 'earn-q3a',
      sectionId: 'first-job',
      title: 'Side Hustle Quiz!',
      question: 'What is a "side hustle"?',
      options: [
        { text: 'A full-time job at a large corporation', isCorrect: false },
        { text: 'A way to earn extra money outside your main job', isCorrect: true },
        { text: 'A type of dance move', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 6: Dream Big
    {
      id: 'earn-q3b',
      sectionId: 'dream-big',
      title: 'Entrepreneur Mindset Quiz!',
      question: 'What makes a successful entrepreneur?',
      options: [
        { text: 'Having a lot of money to start with', isCorrect: false },
        { text: 'They identify problems and create solutions', isCorrect: true },
        { text: 'Being the smartest person in the room', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'earn-essay',
    prompt:
      'If you could start your own kid business, what would it be?',
    description:
      'Now it\'s your turn! Imagine you are designing your very own kid business. What problem would you solve? What product or service would you offer? How would you find customers, and how much would you charge? Think about what skills you already have and how you could use them to earn money. Describe your business idea in detail — give it a name, explain how it works, and tell us why people would want to buy from you! You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant business plan! Your kid business idea has been saved. You are a true young entrepreneur!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'earn-reward',
    title: 'Kid Biz Tycoon!',
    description:
      'You\'ve proven you know what it takes to run a kid business! From identifying problems to building skills, setting prices, and serving customers, you\'ve got the entrepreneurial spirit.',
    lockMessage: 'Business Closed!',
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
    type: 'kid-biz-tycoon',
    celebrationMessage:
      'CONGRATULATIONS! You\'ve unlocked the Kid Biz Tycoon reward! You are a true young entrepreneur with the skills, knowledge, and mindset to turn ideas into action. The business world better watch out!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Future Entrepreneur!',
    paragraphs: [
      'Congratulations! You have completed an incredible journey through the world of earning money, from understanding how people make a living to dreaming about your own future career!',
      'You learned that there are three main ways people earn money: through jobs, by running their own businesses, and through creative work. You discovered inspiring stories of kid entrepreneurs like Mikaila Ulmer and Moziah Bridges who proved that age is no barrier to starting a successful business.',
      'You explored the world of entrepreneurship and learned how to identify problems, create solutions, and understand key business concepts like revenue, profit, and expenses. You discovered the difference between hard skills and soft skills, and why the combination of both makes a person truly valuable in the working world.',
      'You also explored practical ways to start earning money right now — from lemonade stands and pet sitting to chores and creative side hustles — and learned that doing great work, being reliable, and treating people with respect are the foundations of any successful career.',
      'Remember, the future is wide open and full of possibilities. Many of the jobs you will have as a grown-up might not even exist yet! Keep learning, keep exploring, stay curious, and never be afraid to try something new. Your entrepreneurial journey is just beginning, and the world is waiting for your big ideas!',
    ],
  },
};
