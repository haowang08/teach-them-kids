import type { Topic } from '../types';

export const mathInSports: Topic = {
  id: 'math-in-sports',
  slug: 'math-in-sports',
  title: 'Math in Sports',
  subtitle:
    'The Hidden Numbers Behind Every Game',
  status: 'active',
  themeId: 'math-in-sports',
  heroIcons: ['\u{1F3C0}', '\u26BD', '\u{1F3C8}'],
  navItems: [
    { id: 'angles-trajectories', icon: '\u{1F3C0}', label: 'Angles & Trajectories' },
    { id: 'speed-distance', icon: '\u{1F3C3}', label: 'Speed & Distance' },
    { id: 'strategy-probability', icon: '\u{1F3AF}', label: 'Strategy & Probability' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3C6}',
      title: 'Welcome to the Math Arena!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'What if we told you that every slam dunk, every goal, and every world record is powered by math? It\'s true! Behind every amazing play in sports, there are numbers, angles, and equations working their magic.',
            'Athletes might not sit down with a calculator before a game, but their bodies instinctively use mathematical principles every time they throw a ball, sprint down a track, or plan a winning strategy. Coaches use statistics to make game-changing decisions, and scientists use physics to help athletes break world records!',
            'In this adventure, you\'ll discover how the perfect basketball shot follows a mathematical arc, why a soccer ball curves through the air, and how probability helps teams decide whether to go for it on fourth down. Get ready to see sports in a whole new way!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'sDbmcPnzwy4',
          title: 'The Math Behind Michael Jordan\'s Legendary Hang Time',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'm57cimnJ7fc',
          title: 'Football Physics: The Impossible Free Kick',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Angles & Trajectories ───────────────────────
    {
      id: 'angles-trajectories',
      icon: '\u{1F3C0}',
      title: 'Angles & Trajectories: The Art of the Perfect Shot',
      readAloudBlocks: [
        {
          id: 'angles-intro-text',
          paragraphs: [
            'Every time a basketball player shoots a free throw, they\'re solving a math problem without even knowing it! The ball follows a curved path called a parabola, and the angle at which the ball leaves the player\'s hand determines whether it swishes through the net or bounces off the rim.',
            'Scientists have found that the optimal release angle for a free throw is about 52 degrees. Shoot too flat (low angle) and the ball has a tiny window to enter the hoop. Shoot too high (steep angle) and you waste energy. The math of parabolas explains why great shooters have that beautiful arc on their shots!',
            'But basketball isn\'t the only sport where angles matter. Soccer players use the Magnus effect to bend the ball around a wall of defenders, and baseball pitchers use spin rates and release angles to make their pitches nearly impossible to hit.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3C0}',
          name: 'The Perfect Arc',
          title: 'Basketball\'s Mathematical Sweet Spot',
          description:
            'A basketball rim is 18 inches wide, but the ball is about 9.4 inches across. That means there\'s only a few inches of room for error! Mathematical analysis shows that a 52-degree release angle gives the ball the widest possible entry window into the hoop. Players like Stephen Curry have an almost perfect arc, which is why they rarely miss. The math of projectile motion, including gravity, velocity, and angle, determines every single shot!',
          extraTag: 'Optimal angle: ~52 degrees',
        },
        {
          emoji: '\u26BD',
          name: 'The Banana Kick',
          title: 'How Soccer Balls Curve Through Air',
          description:
            'When Roberto Carlos scored his famous free kick in 1997, the ball seemed to defy physics. It flew wide of the wall, then curved dramatically into the goal! This is the Magnus effect: when a spinning ball moves through air, it creates different air pressures on each side, causing it to curve. The faster the spin and the more precise the angle of contact, the more dramatic the curve. Soccer players use this math every time they "bend it like Beckham!"',
          extraTag: 'Physics: Magnus Effect',
        },
        {
          emoji: '\u26BE',
          name: 'Moneyball Statistics',
          title: 'How Math Changed Baseball Forever',
          description:
            'In 2002, the Oakland Athletics baseball team couldn\'t afford expensive star players. So their general manager, Billy Beane, used a math-based approach called sabermetrics to find undervalued players using statistics like on-base percentage instead of traditional stats. The team won 20 games in a row! This story, told in the book and movie "Moneyball," changed how every sport uses data and statistics. Now every major team has data analysts!',
          extraTag: 'Approach: Sabermetrics',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A curveball in baseball can break by up to 17 inches from a straight path! The spin creates a pressure difference that pushes the ball sideways. A pitcher throwing a good curveball applies about 1,500 revolutions per minute of spin to the ball!',
        },
      ],
      videos: [
        {
          youtubeId: 'AyvTcWVYCss',
          title: 'The Physics of a Curveball',
          channelName: 'YouTube',
        },
      ],
      quizIds: ['sports-q1a', 'sports-q1b', 'sports-q1c', 'sports-q1d'],
    },

    // ─── Section 2: Speed & Distance ────────────────────────────
    {
      id: 'speed-distance',
      icon: '\u{1F3C3}',
      title: 'Speed & Distance: Racing Against the Numbers',
      readAloudBlocks: [
        {
          id: 'speed-intro-text',
          paragraphs: [
            'Speed, distance, and time are connected by one of the most important equations in sports: Speed = Distance \u00F7 Time. This simple formula is behind every world record, every race, and every game clock!',
            'When Usain Bolt set the 100-meter world record of 9.58 seconds in 2009, his average speed was about 23.4 miles per hour. But his top speed during the race actually reached an incredible 27.8 mph! That\'s faster than most people drive through a neighborhood. The math of acceleration explains why sprinters don\'t reach top speed until about 60 meters into the race.',
            'In swimming, cycling, and track, athletes and coaches use math to find tiny improvements. Shaving just one-hundredth of a second off a time can be the difference between a gold medal and no medal at all. That\'s why modern athletes study the math behind their movements so carefully!',
          ],
        },
        {
          id: 'speed-outro-text',
          paragraphs: [
            'The quest for speed has always been a numbers game. From the ancient Greek Olympic athletes to today\'s high-tech training facilities, math helps athletes push the boundaries of what the human body can achieve. Every record that\'s broken is a mathematical equation solved in a new and better way!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u26A1',
          name: 'Usain Bolt',
          title: 'The Fastest Human in History',
          description:
            'Usain Bolt\'s 100-meter world record of 9.58 seconds is a masterpiece of mathematical analysis. Scientists calculated that Bolt\'s stride length of 2.44 meters (about 8 feet) combined with his stride frequency allowed him to cover the distance in just 41 steps. Most sprinters need 44-47 steps! His long legs gave him a mathematical advantage: fewer steps means less time touching the ground, which means less braking force. Math explains why taller sprinters often dominate the 100 meters.',
          extraTag: 'World record: 9.58 seconds',
        },
        {
          emoji: '\u{1F3CA}',
          name: 'Swimming Splits',
          title: 'How Swimmers Calculate Their Race Strategy',
          description:
            'In swimming, a "split" is the time for each lap. Swimmers and coaches use math to plan the perfect race strategy. Should you go fast early and slow down, or start steady and finish strong? Math shows that negative splitting, swimming the second half faster than the first, usually produces faster overall times. Coaches calculate ideal split times before every race to help swimmers pace themselves perfectly.',
          extraTag: 'Strategy: Negative splits',
        },
        {
          emoji: '\u{1F6B4}',
          name: 'Cycling Aerodynamics',
          title: 'The Math of Drafting and Wind Resistance',
          description:
            'In cycling, about 90% of a rider\'s energy goes to fighting air resistance! That\'s why cyclists ride in groups called pelotons. The math of drafting shows that riding behind another cyclist reduces air resistance by up to 40%. This means the rider in back uses 40% less energy while maintaining the same speed! Teams use complex math to decide when to draft, when to lead, and when to make a breakaway.',
          extraTag: 'Drafting saves ~40% energy',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'If Usain Bolt could maintain his top speed of 27.8 mph for an entire marathon (26.2 miles), he would finish in about 56 minutes. The actual marathon world record is about 2 hours and 35 seconds. That shows how hard it is to maintain sprint speed over long distances!',
        },
      ],
      videos: [
        {
          youtubeId: 'RaGUW1d0w8g',
          title: 'An Athlete Uses Physics to Shatter World Records',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['sports-q2a', 'sports-q2b', 'sports-q2c'],
    },

    // ─── Section 3: Strategy & Probability ──────────────────────
    {
      id: 'strategy-probability',
      icon: '\u{1F3AF}',
      title: 'Strategy & Probability: The Mind Game',
      readAloudBlocks: [
        {
          id: 'strategy-intro-text',
          paragraphs: [
            'Sports aren\'t just about physical ability. The smartest teams use math to outsmart their opponents! Probability, the math of how likely something is to happen, helps coaches make critical decisions during games.',
            'Should a football team go for it on fourth down or punt? Mathematicians have analyzed thousands of games and found that teams should go for it much more often than they actually do! The expected value calculation shows that the risk of failing is often outweighed by the reward of keeping the ball. Coaches who follow the math tend to win more games.',
            'Game theory, a branch of mathematics, studies how people make decisions when the outcome depends on what others do. In sports, this means predicting what your opponent will do and choosing the best response. Penalty kicks in soccer, play-calling in football, and even pitch selection in baseball all involve game theory!',
          ],
        },
        {
          id: 'strategy-outro-text',
          paragraphs: [
            'The next time you watch a game, pay attention to the strategy. Every decision, from lineup choices to timeout calls, involves math. The teams that use numbers wisely often have an invisible advantage that\'s just as powerful as any athlete on the field!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3C8}',
          name: 'Fourth Down Math',
          title: 'The Probability Behind Football\'s Biggest Decision',
          description:
            'Should a team go for it on fourth down? Traditional coaching says punt. But math tells a different story! Statisticians analyzed thousands of NFL games and found that teams would win more often if they went for it on fourth down in many situations. The Philadelphia Eagles used this data-driven approach and won the Super Bowl! The math considers field position, yards needed, score, and time remaining to calculate the best decision.',
          extraTag: 'Math says: Go for it more often!',
        },
        {
          emoji: '\u26BD',
          name: 'Penalty Kick Game Theory',
          title: 'The Math of Predicting Your Opponent',
          description:
            'A soccer penalty kick is a perfect example of game theory. The kicker must decide which direction to shoot, and the goalkeeper must decide which way to dive, all at nearly the same moment! Mathematicians found that the best strategy is to randomize your choices so your opponent can\'t predict you. Data shows that about 58% of penalty kicks go to the kicker\'s natural side, but goalkeepers know this. The math of mixed strategies explains the cat-and-mouse game!',
          extraTag: 'Game theory in action',
        },
        {
          emoji: '\u{1F4CA}',
          name: 'Batting Average',
          title: 'The Most Famous Number in Baseball',
          description:
            'A batting average is one of the simplest and most famous statistics in sports. It\'s calculated by dividing the number of hits by the number of at-bats. A .300 batting average (getting a hit 30% of the time) is considered excellent. That means even the best hitters in baseball fail 70% of the time! Ted Williams was the last player to bat over .400 in a season, back in 1941. The math of probability explains why this record has stood for over 80 years.',
          extraTag: 'Formula: Hits \u00F7 At-Bats',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A basketball player who makes 50% of their free throws has only a 12.5% chance of making three in a row! The math of probability says 0.5 \u00D7 0.5 \u00D7 0.5 = 0.125, or 12.5%. That\'s why clutch free throw shooting is so impressive!',
        },
      ],
      videos: [
        {
          youtubeId: 'MpLHMKTolVw',
          title: 'The Math Behind Sports Analytics',
          channelName: 'SciShow',
        },
      ],
      quizIds: ['sports-q3a', 'sports-q3b', 'sports-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Angles & Trajectories
    {
      id: 'sports-q1a',
      sectionId: 'angles-trajectories',
      title: 'Quick Quiz Time!',
      question:
        'What is the optimal release angle for a basketball free throw?',
      options: [
        { text: 'About 30 degrees', isCorrect: false },
        { text: 'About 52 degrees', isCorrect: true },
        { text: 'About 75 degrees', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sports-q1b',
      sectionId: 'angles-trajectories',
      title: 'Physics of Sports!',
      question:
        'What causes a soccer ball to curve in flight during a free kick?',
      options: [
        { text: 'The weight of the ball', isCorrect: false },
        { text: 'The Magnus effect from the ball\'s spin', isCorrect: true },
        { text: 'Wind blowing the ball sideways', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sports-q1c',
      sectionId: 'angles-trajectories',
      title: 'Moneyball Challenge!',
      question:
        'What math-based approach did the Oakland Athletics use to find undervalued baseball players?',
      options: [
        { text: 'Geometry', isCorrect: false },
        { text: 'Sabermetrics', isCorrect: true },
        { text: 'Calculus', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sports-q1d',
      sectionId: 'angles-trajectories',
      title: 'Trajectory Quiz!',
      question:
        'What curved shape does a basketball follow when shot toward the hoop?',
      options: [
        { text: 'A straight line', isCorrect: false },
        { text: 'A circle', isCorrect: false },
        { text: 'A parabola', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Speed & Distance
    {
      id: 'sports-q2a',
      sectionId: 'speed-distance',
      title: 'Quick Quiz Time!',
      question:
        'What is the formula that connects speed, distance, and time?',
      options: [
        { text: 'Speed = Distance + Time', isCorrect: false },
        { text: 'Speed = Distance \u00F7 Time', isCorrect: true },
        { text: 'Speed = Distance \u00D7 Time', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sports-q2b',
      sectionId: 'speed-distance',
      title: 'Speed Record Challenge!',
      question:
        'What was Usain Bolt\'s top speed during his world record 100-meter sprint?',
      options: [
        { text: 'About 20 mph', isCorrect: false },
        { text: 'About 27.8 mph', isCorrect: true },
        { text: 'About 35 mph', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sports-q2c',
      sectionId: 'speed-distance',
      title: 'Cycling Math Quiz!',
      question:
        'How much can air resistance be reduced by drafting behind another cyclist?',
      options: [
        { text: 'About 10%', isCorrect: false },
        { text: 'About 25%', isCorrect: false },
        { text: 'Up to about 40%', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Strategy & Probability
    {
      id: 'sports-q3a',
      sectionId: 'strategy-probability',
      title: 'Quick Quiz Time!',
      question:
        'What branch of mathematics studies decision-making when outcomes depend on others\' choices?',
      options: [
        { text: 'Geometry', isCorrect: false },
        { text: 'Game theory', isCorrect: true },
        { text: 'Algebra', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sports-q3b',
      sectionId: 'strategy-probability',
      title: 'Batting Average Brainteaser!',
      question:
        'If a baseball player gets a hit 30% of the time, what is their batting average?',
      options: [
        { text: '.030', isCorrect: false },
        { text: '.300', isCorrect: true },
        { text: '3.00', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sports-q3c',
      sectionId: 'strategy-probability',
      title: 'Probability Challenge!',
      question:
        'A basketball player who makes 50% of free throws has what chance of making three in a row?',
      options: [
        { text: '50%', isCorrect: false },
        { text: '25%', isCorrect: false },
        { text: '12.5%', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'sports-essay',
    prompt:
      'How does math make sports more exciting or fair?',
    description:
      'Think about all the ways math is used in sports: angles for the perfect shot, speed records measured to the hundredth of a second, statistics that find hidden talent, and probability that guides strategy. How do you think math makes sports better? Does it make games more exciting to watch, fairer for everyone, or both? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Awesome thinking! You see the game behind the game! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'sports-reward',
    title: 'Perfect Shot Simulator!',
    description:
      'You\'ve unlocked the Perfect Shot Simulator! Adjust the angle, speed, and spin to score the perfect basketball shot, curve a soccer free kick, or throw the ultimate curveball. See how changing the math changes the result!',
    lockMessage: 'Perfect Shot Locked!',
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
    type: 'perfect-shot',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Perfect Shot Simulator! You\'re a true math athlete!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Champion Knowledge Unlocked!',
    paragraphs: [
      'Congratulations! You\'ve discovered the incredible math hiding inside every sport!',
      'You learned that a basketball shot follows a parabola with an optimal 52-degree release angle, and that Roberto Carlos\'s famous banana kick was powered by the Magnus effect. You saw how Moneyball changed baseball forever by using statistics to find undervalued talent.',
      'You discovered that Usain Bolt\'s world record is a masterpiece of stride length and frequency, that swimmers use negative splits to swim faster, and that cyclists save 40% of their energy by drafting behind each other.',
      'And you explored the mind game of sports: how game theory explains penalty kicks, how probability guides fourth-down decisions, and why even the best baseball hitters fail 70% of the time.',
      'The next time you watch or play a sport, remember: math is always there, helping athletes perform their best and coaches make winning decisions. Now you see the numbers behind the game!',
    ],
  },
};
