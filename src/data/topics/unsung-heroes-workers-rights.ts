import type { Topic } from '../types';

export const unsungHeroesWorkersRights: Topic = {
  id: 'unsung-heroes-workers-rights',
  slug: 'unsung-heroes-workers-rights',
  title: 'Fight for Your Rights: Workers\' Rights',
  subtitle: 'From Child Labor to Fair Wages \u2014 The Battle for Dignity at Work',
  status: 'active',
  themeId: 'unsung-heroes',
  heroIcons: ['\u{1F6E0}\uFE0F', '\u{270A}', '\u{1F525}'],
  navItems: [
    { id: 'intro-workers', icon: '\u{1F6E0}\uFE0F', label: 'Work Before Rights' },
    { id: 'child-labor', icon: '\u{1F9F9}', label: 'Child Labor' },
    { id: 'triangle-fire', icon: '\u{1F525}', label: 'Triangle Fire' },
    { id: 'unions-rise', icon: '\u{270A}', label: 'Rise of Unions' },
    { id: 'cesar-chavez', icon: '\u{1F33E}', label: 'C\u00E9sar Ch\u00E1vez' },
    { id: 'modern-labor', icon: '\u{1F30D}', label: 'The Fight Today' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro-workers',
      icon: '\u{1F6E0}\uFE0F',
      title: 'When Work Was a Nightmare',
      readAloudBlocks: [
        {
          id: 'intro-workers-text',
          paragraphs: [
            'Picture this: it\'s five o\'clock in the morning, pitch dark outside, and a ten-year-old drags themselves out of bed. Not for school. There is no school. This child is heading to a coal mine, where they\'ll crawl through tunnels so narrow an adult can\'t fit, breathing thick black dust for fourteen hours straight. Their pay? A few pennies a day. This wasn\'t a horror story. For millions of kids in the 1800s and early 1900s, this was just... Tuesday.',
            'Today, you have weekends off, a limit on working hours, safety rules, and a minimum wage. None of that existed 150 years ago. Every single one of those protections was fought for, marched for, and sometimes died for by ordinary workers who refused to accept that their lives didn\'t matter.',
            'Get ready to travel back in time to an era when factories were death traps, children were treated like machines, and a single fire changed the laws of an entire nation. This is the story of how workers fought back and won.',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },

    // ─── Section 1: Child Labor ──────────────────────────────────
    {
      id: 'child-labor',
      icon: '\u{1F9F9}',
      title: 'Stolen Childhoods: Kids in the Factories and Mines',
      readAloudBlocks: [
        {
          id: 'child-labor-intro',
          paragraphs: [
            'During the Industrial Revolution (roughly 1760\u20131840 in Britain, later in the United States), new machines powered by steam and coal transformed how things were made. Factories sprang up everywhere, and factory owners needed cheap workers. Their solution? Children. Some as young as four or five years old.',
            'In British cotton mills, children were used as "scavengers," crawling under moving machinery to pick up loose cotton. One wrong move and a finger, hand, or arm could be torn off by the spinning gears. In coal mines, children called "trappers" sat alone in the dark for twelve hours, opening and closing doors to let coal carts pass. "Hurriers" dragged heavy carts of coal on their hands and knees through tunnels barely two feet high.',
          ],
        },
        {
          id: 'child-labor-usa',
          paragraphs: [
            'In the United States, the situation was just as grim. By 1900, an estimated two million children under age fifteen were working in American factories, mines, mills, and farms. In the coal mines of Pennsylvania, boys as young as eight worked as "breaker boys," hunched over conveyor belts picking slate and rocks out of coal for ten hours a day. The coal dust turned their faces black and destroyed their lungs. Many lost fingers to the machinery.',
            'In textile mills across the South, girls as young as six tended spinning machines, breathing in cotton fibers that caused a deadly lung disease called "brown lung." These children worked twelve to fourteen-hour shifts, six days a week, and earned as little as 25 cents a day. They had no time for school, no time to play, and often no hope of a different life.',
          ],
        },
        {
          id: 'child-labor-change',
          paragraphs: [
            'Change came slowly, driven by brave reformers. In 1832, the British Parliament passed the first Factory Act, which said children under nine couldn\'t work in textile factories and those aged nine to thirteen could only work eight hours a day. It was a small step, but a start. In the U.S., photographer Lewis Hine traveled the country taking powerful photographs of child workers, showing Americans the truth of what was happening. His images of exhausted children in coal dust and cotton lint helped turn public opinion.',
            'It wasn\'t until 1938 that the United States passed the Fair Labor Standards Act, which finally set a national minimum age for work and limited children\'s working hours. But even today, some exceptions remain: children can still work on family farms, and in some parts of the world, an estimated 160 million children are still engaged in child labor, according to the International Labour Organization.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4F7}',
          name: 'Lewis Hine',
          title: 'Photographer Who Exposed Child Labor (1874\u20131940)',
          description:
            'Lewis Hine was a teacher and photographer who used his camera as a weapon against child labor. Between 1908 and 1924, he traveled across the United States for the National Child Labor Committee, photographing children working in mines, mills, factories, and fields. He often had to sneak into workplaces because factory owners tried to keep him out. His powerful images of exhausted, hollow-eyed children shocked the nation and helped build support for child labor laws.',
          extraTag: 'Took over 5,000 photos of child workers',
        },
        {
          emoji: '\u{1F3ED}',
          name: 'Mother Jones (Mary Harris Jones)',
          title: 'Labor Organizer "The Most Dangerous Woman in America" (1837\u20131930)',
          description:
            'Mary Harris Jones, known as "Mother Jones," was an Irish-American labor organizer who fought for workers\' rights for over 50 years. After losing her husband and four children to yellow fever, and then her home in the Great Chicago Fire, she dedicated her life to fighting for workers. In 1903, she organized the "March of the Mill Children," leading a group of child workers from Philadelphia to President Theodore Roosevelt\'s home in New York to demand child labor laws.',
          extraTag: 'Led the March of the Mill Children in 1903',
        },
      ],
      funFacts: [
        {
          title: 'The 25-Cent Childhood',
          text: 'In 1900, a child working in an American textile mill earned about 25 cents for a twelve-hour day. That\'s about $9 in today\'s money. For an entire day of dangerous, backbreaking work, a child earned less than you might spend on a snack. And there were no breaks, no safety equipment, and no days off except Sunday.',
        },
      ],
      videos: [
        {
          youtubeId: 'r6tRp-zRUJs',
          title: 'The Industrial Economy: Crash Course US History #23',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['workers-q1', 'workers-q2'],
    },

    // ─── Section 2: Triangle Shirtwaist Fire ─────────────────────
    {
      id: 'triangle-fire',
      icon: '\u{1F525}',
      title: 'The Triangle Shirtwaist Fire: 18 Minutes That Changed America',
      readAloudBlocks: [
        {
          id: 'triangle-intro',
          paragraphs: [
            'On Saturday, March 25, 1911, at about 4:40 in the afternoon, a fire broke out on the eighth floor of the Asch Building in New York City\'s Greenwich Village. The building housed the Triangle Shirtwaist Factory, where about 600 workers, mostly young immigrant women from Italy, Russia, and Eastern Europe, made women\'s blouses called "shirtwaists." Most of the workers were between the ages of sixteen and twenty-three.',
            'The fire spread with terrifying speed. Within minutes, the eighth, ninth, and tenth floors were engulfed in flames. Workers on the tenth floor escaped to the roof. Many on the eighth floor made it to the exits. But the workers on the ninth floor were trapped.',
          ],
        },
        {
          id: 'triangle-horror',
          paragraphs: [
            'Here\'s what made this fire so deadly: the factory owners had locked the exit doors from the outside. They claimed it was to prevent workers from stealing scraps of cloth or taking unauthorized breaks. There was only one fire escape, and it collapsed under the weight of people trying to use it. The fire department\'s tallest ladders only reached the sixth floor. The building had no sprinkler system.',
            'In just 18 minutes, 146 workers died. Some burned. Some were crushed in the stairwells. And some, faced with an impossible choice between fire and a nine-story fall, jumped from the windows. Thousands of New Yorkers watched in horror from the street below as young women leaped from the burning building.',
          ],
        },
        {
          id: 'triangle-change',
          paragraphs: [
            'The Triangle Shirtwaist Fire sparked outrage across the nation. Within weeks, 350,000 people marched through New York City in a funeral procession for the victims. The public demanded change. New York State created the Factory Investigating Commission, led by future U.S. Senator Robert F. Wagner and future Secretary of Labor Frances Perkins (who had witnessed the fire from the street). The commission investigated working conditions across the state and pushed through 36 new labor laws.',
            'These laws required fire escapes, sprinkler systems, unlocked exit doors, and fire drills. They limited working hours for women and children and banned smoking in factories. The Triangle fire didn\'t just change New York. It set the stage for the New Deal labor protections of the 1930s. Frances Perkins, haunted by what she had witnessed, later became the first woman in a U.S. presidential cabinet and helped create Social Security, the minimum wage, and the 40-hour work week.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F525}',
          name: 'Frances Perkins',
          title: 'First Female U.S. Cabinet Member (1880\u20131965)',
          description:
            'Frances Perkins witnessed the Triangle Shirtwaist Fire from the street and said it was "the day the New Deal was born." She dedicated her life to labor reform and became the U.S. Secretary of Labor under President Franklin D. Roosevelt, the first woman to serve in a presidential cabinet. She helped create Social Security, unemployment insurance, the federal minimum wage, the 40-hour work week, and laws against child labor.',
          extraTag: 'Witnessed the Triangle Fire in 1911',
        },
        {
          emoji: '\u{1F3F4}',
          name: 'Clara Lemlich',
          title: 'Labor Activist Who Sparked the Shirtwaist Strike (1886\u20131982)',
          description:
            'Clara Lemlich was a Ukrainian-Jewish immigrant who worked in New York garment factories. In 1909, at age 23, she interrupted a large meeting of garment workers and called for a general strike. Her fiery speech in Yiddish triggered the "Uprising of the 20,000," the largest strike by women workers in U.S. history at that time. The striking workers demanded better pay, shorter hours, and safer conditions. While the strike didn\'t prevent the Triangle fire, it helped build the labor movement that responded to it.',
          extraTag: 'Sparked the Uprising of the 20,000',
        },
      ],
      funFacts: [
        {
          title: '36 Laws from One Tragedy',
          text: 'The Triangle Shirtwaist Fire led to 36 new labor laws in New York State alone. These included requirements for fire escapes, sprinkler systems, and unlocked exit doors during working hours. Before the fire, factory owners could literally lock workers inside. After the fire, that became a crime. Many of these New York laws later became the model for federal labor protections across the entire United States.',
        },
      ],
      videos: [
        {
          youtubeId: 'FguWSsW21CQ',
          title: 'The Rise of Labor Unions',
          channelName: 'History',
        },
      ],
      quizIds: ['workers-q3', 'workers-q4'],
    },

    // ─── Section 3: Rise of Unions ───────────────────────────────
    {
      id: 'unions-rise',
      icon: '\u{270A}',
      title: 'Stronger Together: The Rise of Labor Unions',
      readAloudBlocks: [
        {
          id: 'unions-intro',
          paragraphs: [
            'Imagine you work in a factory where the boss pays you barely enough to eat, makes you work sixteen-hour days, and fires you if you complain. What can you do? If you\'re just one person, probably nothing. But what if every single worker in the factory says "we refuse to work until things change"? Suddenly, the boss has a problem. That\'s the basic idea behind a labor union: workers joining together to demand better treatment.',
            'The idea of workers organizing together goes back centuries, but modern labor unions really took off during the Industrial Revolution when conditions were at their worst. In 1886, American workers launched a massive campaign for the eight-hour workday with the slogan "Eight hours for work, eight hours for rest, eight hours for what we will." On May 1, 1886, over 300,000 workers went on strike across the United States.',
          ],
        },
        {
          id: 'unions-battles',
          paragraphs: [
            'The fight for unions was often violent and dangerous. Factory owners hired private armies to break up strikes. In 1892, during the Homestead Strike at a Carnegie steel mill in Pennsylvania, the company hired 300 Pinkerton agents (private security guards) who arrived on barges and opened fire on striking workers. A battle erupted that left ten people dead. The state militia was called in, and the strike was crushed.',
            'But workers kept fighting. The American Federation of Labor (AFL), founded in 1886 by Samuel Gompers, focused on practical goals: better wages, shorter hours, and safer workplaces. Over time, unions won incredible victories. The eight-hour workday. The weekend. Overtime pay. Workers\' compensation for injuries. The right to collective bargaining, which means the right to negotiate as a group instead of as individuals.',
          ],
        },
        {
          id: 'unions-legacy',
          paragraphs: [
            'Think about this: if you\'ve ever enjoyed a Saturday or Sunday off, thank a union. If your parents get paid extra for working more than 40 hours a week, thank a union. If your school has a fire exit, thank the workers who demanded safety laws after the Triangle fire. These weren\'t gifts from generous employers. They were rights that workers fought for, sometimes with their lives.',
            'The National Labor Relations Act of 1935 (also called the Wagner Act) finally gave American workers the legal right to form unions and bargain collectively. It was a landmark moment. Union membership soared, and by the mid-1950s, about one in three American workers belonged to a union. Today that number has dropped to about one in ten, but unions continue to fight for worker protections around the world.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{270A}',
          name: 'Samuel Gompers',
          title: 'Founder of the AFL (1850\u20131924)',
          description:
            'Samuel Gompers was a British-born American labor leader who founded the American Federation of Labor (AFL) in 1886 and led it for nearly 40 years. A cigar maker by trade, Gompers believed unions should focus on practical goals: higher wages, shorter hours, and better working conditions. Under his leadership, the AFL grew from a small group into the most powerful labor organization in the country, representing millions of workers.',
          extraTag: 'Led the AFL for nearly 40 years',
        },
      ],
      funFacts: [
        {
          title: 'Thank a Union for Your Weekend!',
          text: 'Before the labor movement, there was no such thing as a "weekend." Workers were expected to work six or even seven days a week. The five-day work week wasn\'t common in the United States until the 1930s. Henry Ford actually helped popularize it in 1926, not out of generosity but because he realized rested workers were more productive. But it was unions that fought to make it the law for everyone.',
        },
      ],
      videos: [
        {
          youtubeId: 'YqmPE2HtkyU',
          title: 'Why Do Americans and Canadians Celebrate Labor Day?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['workers-q5', 'workers-q6'],
    },

    // ─── Section 4: C\u00E9sar Ch\u00E1vez ──────────────────────────────────
    {
      id: 'cesar-chavez',
      icon: '\u{1F33E}',
      title: 'C\u00E9sar Ch\u00E1vez and the Farmworkers\' Fight',
      readAloudBlocks: [
        {
          id: 'chavez-intro',
          paragraphs: [
            'C\u00E9sar Est\u00E1da Ch\u00E1vez was born on March 31, 1927, on a small farm near Yuma, Arizona. During the Great Depression, his family lost their farm and became migrant farmworkers, traveling across California to pick crops. From the age of ten, C\u00E9sar worked in the fields alongside his parents, stooping over rows of lettuce, grapes, and cotton in the blazing sun.',
            'Migrant farmworkers in the United States faced brutal conditions. They worked ten to twelve hours in extreme heat with no shade, no clean water, and no bathrooms. Pesticides were sprayed on the fields while workers were still in them, causing rashes, breathing problems, and long-term illnesses. Pay was so low that entire families, including children, had to work just to survive. Farmworkers were specifically excluded from the labor protections other workers had won, because powerful agricultural companies had lobbied to keep them out.',
          ],
        },
        {
          id: 'chavez-fight',
          paragraphs: [
            'In 1962, C\u00E9sar Ch\u00E1vez and Dolores Huerta co-founded the National Farm Workers Association (later the United Farm Workers, or UFW). Their motto was "\u00A1S\u00ED, se puede!" ("Yes, we can!"). In 1965, when Filipino grape workers in Delano, California, went on strike for better pay, Ch\u00E1vez and the UFW joined them. This began the Delano Grape Strike, one of the most important labor actions in American history.',
            'Ch\u00E1vez believed deeply in nonviolent resistance, inspired by Mahatma Gandhi and Martin Luther King Jr. Instead of fighting with fists, the farmworkers marched, picketed, and organized a nationwide boycott of table grapes. Ch\u00E1vez himself went on multiple hunger strikes to draw attention to the cause. His most famous fast lasted 25 days in 1968. Senator Robert F. Kennedy came to Delano to break bread with Ch\u00E1vez when the fast ended, calling him "one of the heroic figures of our time."',
          ],
        },
        {
          id: 'chavez-victory',
          paragraphs: [
            'The grape boycott spread across the country. By 1970, an estimated 17 million Americans had stopped buying grapes. The economic pressure worked: grape growers finally agreed to negotiate. Workers won higher wages, health benefits, protections against pesticide exposure, and the right to form a union. It was a historic victory for some of the poorest and most vulnerable workers in America.',
            'Dolores Huerta, co-founder of the UFW, was just as essential to the movement. She organized workers, negotiated contracts, and lobbied politicians. She is credited with coining the slogan "\u00A1S\u00ED, se puede!" which later became a rallying cry for social justice movements around the world. C\u00E9sar Ch\u00E1vez passed away in 1993, but his birthday, March 31, is now a state holiday in several U.S. states. His legacy reminds us that even the most powerless people can win when they stand together.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F33E}',
          name: 'C\u00E9sar Ch\u00E1vez',
          title: 'Co-Founder of the United Farm Workers (1927\u20131993)',
          description:
            'C\u00E9sar Ch\u00E1vez was an American labor leader who co-founded the United Farm Workers union and fought for the rights of migrant farmworkers. Using nonviolent tactics inspired by Gandhi and Martin Luther King Jr., including strikes, marches, and hunger fasts, he organized the historic Delano Grape Strike and boycott. His efforts won farmworkers better wages, health benefits, and protections against pesticides.',
          extraTag: 'Organized the Delano Grape Boycott',
        },
        {
          emoji: '\u{1F4AA}',
          name: 'Dolores Huerta',
          title: 'Co-Founder of the UFW & "Mother of the Modern Labor Movement" (1930\u2013)',
          description:
            'Dolores Huerta co-founded the United Farm Workers alongside C\u00E9sar Ch\u00E1vez and was instrumental in organizing workers, negotiating contracts, and fighting for labor laws. She coined the famous slogan "\u00A1S\u00ED, se puede!" (Yes, we can!). At age 58, she was severely beaten by police while peacefully protesting, suffering six broken ribs and a ruptured spleen. She continued fighting for workers\' rights into her 90s.',
          extraTag: 'Coined "\u00A1S\u00ED, se puede!"',
        },
      ],
      funFacts: [
        {
          title: '17 Million People Stopped Eating Grapes',
          text: 'During the Delano Grape Boycott, an estimated 17 million Americans refused to buy table grapes to support farmworkers\' rights. That\'s like the entire population of a large state saying "no" to grapes until workers were treated fairly. The boycott lasted five years (1965\u20131970) and was one of the most successful consumer boycotts in American history.',
        },
      ],
      videos: [
        {
          youtubeId: 'Wznw9TA2jXk',
          title: 'C\u00E9sar Ch\u00E1vez and the Farmworkers',
          channelName: 'History',
        },
      ],
      quizIds: ['workers-q7', 'workers-q8'],
    },

    // ─── Section 5: Modern Labor Issues ──────────────────────────
    {
      id: 'modern-labor',
      icon: '\u{1F30D}',
      title: 'The Fight Continues: Workers\' Rights Today',
      readAloudBlocks: [
        {
          id: 'modern-intro',
          paragraphs: [
            'You might think child labor and dangerous factories are problems from the past. Unfortunately, they\'re not. Around the world today, the International Labour Organization estimates that 160 million children are still engaged in child labor, nearly one in ten children worldwide. Many work in agriculture, mining, and manufacturing, sometimes making products that end up in stores near you.',
            'In countries like Bangladesh, Cambodia, and parts of China, workers in garment factories (called sweatshops) make clothing for major brands while earning extremely low wages and working in unsafe conditions. In 2013, the Rana Plaza garment factory in Bangladesh collapsed, killing over 1,100 workers. It was one of the deadliest industrial disasters in history and drew global attention to the conditions in which our clothes are often made.',
          ],
        },
        {
          id: 'modern-change',
          paragraphs: [
            'But people are fighting back, just like workers always have. In the United States, workers at fast-food restaurants, Amazon warehouses, and Starbucks coffee shops have organized for better pay and working conditions. The "Fight for $15" movement, which began in 2012, pushed for a $15 minimum hourly wage and has won raises for millions of workers across the country.',
            'Around the world, organizations like the International Labour Organization (part of the United Nations) work to set standards for fair treatment of workers everywhere. Consumers can also make a difference by supporting companies that treat their workers fairly and asking questions about where and how products are made. The label "Fair Trade" on products like chocolate, coffee, and clothing means the workers who made them received fair wages and worked in safe conditions.',
            'The story of workers\' rights is far from over. It\'s a story that started with children in coal mines and continues today in warehouses, fields, and factories around the world. Every time someone stands up and says "workers deserve better," they\'re carrying on a tradition that stretches back over two hundred years.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F30D}',
          name: 'Kalpona Akter',
          title: 'Bangladeshi Labor Rights Activist (1976\u2013)',
          description:
            'Kalpona Akter began working in a garment factory in Bangladesh at age twelve, sewing clothes for Western brands for just a few cents an hour. She became a labor organizer as a teenager and founded the Bangladesh Center for Worker Solidarity. After the Rana Plaza factory collapse in 2013, she became a leading voice demanding that global companies take responsibility for the safety of workers in their supply chains.',
          extraTag: 'Started factory work at age 12',
        },
      ],
      funFacts: [
        {
          title: 'Your Clothes Have a Story',
          text: 'The average American buys about 68 garments per year. Many of those clothes travel through five or more countries before reaching a store. The cotton might be grown in India, spun into thread in China, dyed in Indonesia, sewn into a shirt in Bangladesh, and shipped to the U.S. Millions of workers around the world are involved in making the clothes you wear every day.',
        },
      ],
      videos: [
        {
          youtubeId: 'afpiUBMZZtY',
          title: 'Workers\' Rights Today',
          channelName: 'History',
        },
      ],
      quizIds: ['workers-q9', 'workers-q10'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Child Labor
    {
      id: 'workers-q1',
      sectionId: 'child-labor',
      title: 'Child Labor Quiz!',
      question:
        'What were "breaker boys" in the coal mines?',
      options: [
        { text: 'Boys who broke rocks with hammers', isCorrect: false },
        { text: 'Boys who picked slate and rocks out of coal on conveyor belts', isCorrect: true },
        { text: 'Boys who broke open mine entrances', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'workers-q2',
      sectionId: 'child-labor',
      title: 'Reform Hero Challenge!',
      question:
        'How did photographer Lewis Hine help fight child labor?',
      options: [
        { text: 'He built schools for working children', isCorrect: false },
        { text: 'He took powerful photographs of child workers that shocked the nation', isCorrect: true },
        { text: 'He paid children not to work', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Triangle Fire
    {
      id: 'workers-q3',
      sectionId: 'triangle-fire',
      title: 'Triangle Fire Quiz!',
      question:
        'Why were workers trapped during the Triangle Shirtwaist Factory fire?',
      options: [
        { text: 'The factory was underground with no windows', isCorrect: false },
        { text: 'The exit doors were locked from the outside', isCorrect: true },
        { text: 'The fire started at all exits simultaneously', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'workers-q4',
      sectionId: 'triangle-fire',
      title: 'Labor History Challenge!',
      question:
        'Who witnessed the Triangle fire and later became the first woman in a U.S. presidential cabinet?',
      options: [
        { text: 'Mother Jones', isCorrect: false },
        { text: 'Clara Lemlich', isCorrect: false },
        { text: 'Frances Perkins', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Unions
    {
      id: 'workers-q5',
      sectionId: 'unions-rise',
      title: 'Union Power Quiz!',
      question:
        'What was the slogan of the eight-hour workday movement in 1886?',
      options: [
        { text: '"Work less, play more!"', isCorrect: false },
        { text: '"Eight hours for work, eight hours for rest, eight hours for what we will"', isCorrect: true },
        { text: '"Fair pay for fair work!"', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'workers-q6',
      sectionId: 'unions-rise',
      title: 'Workers\' Rights Challenge!',
      question:
        'What is "collective bargaining"?',
      options: [
        { text: 'When workers collect donations for charity', isCorrect: false },
        { text: 'When workers negotiate as a group instead of as individuals', isCorrect: true },
        { text: 'When workers bargain for discounts at stores', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: C\u00E9sar Ch\u00E1vez
    {
      id: 'workers-q7',
      sectionId: 'cesar-chavez',
      title: 'Farmworker Rights Quiz!',
      question:
        'Who co-founded the United Farm Workers alongside C\u00E9sar Ch\u00E1vez and coined the slogan "\u00A1S\u00ED, se puede!"?',
      options: [
        { text: 'Frances Perkins', isCorrect: false },
        { text: 'Dolores Huerta', isCorrect: true },
        { text: 'Clara Lemlich', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'workers-q8',
      sectionId: 'cesar-chavez',
      title: 'Boycott Challenge!',
      question:
        'How many Americans stopped buying grapes during the Delano Grape Boycott?',
      options: [
        { text: 'About 1.7 million', isCorrect: false },
        { text: 'About 17 million', isCorrect: true },
        { text: 'About 170 million', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Modern Labor
    {
      id: 'workers-q9',
      sectionId: 'modern-labor',
      title: 'Modern Labor Quiz!',
      question:
        'According to the International Labour Organization, approximately how many children worldwide are still engaged in child labor?',
      options: [
        { text: 'About 16 million', isCorrect: false },
        { text: 'About 160 million', isCorrect: true },
        { text: 'About 1.6 billion', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'workers-q10',
      sectionId: 'modern-labor',
      title: 'Fair Trade Challenge!',
      question:
        'What does a "Fair Trade" label on a product mean?',
      options: [
        { text: 'The product was traded between friendly countries', isCorrect: false },
        { text: 'Workers who made the product received fair wages and worked in safe conditions', isCorrect: true },
        { text: 'The product was made in the United States', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'workers-essay',
    prompt:
      'If you could go back in time and change one thing about working conditions during the Industrial Revolution, what would it be and why?',
    description:
      'Think about all the terrible conditions workers faced: child labor, locked factory doors, sixteen-hour days, and dangerous machines. If you had the power to change just one thing, what would you focus on first? How would that change have helped workers\' lives? Write at least 100 characters to help unlock a special surprise!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Powerful thinking! You clearly care about fairness and justice. Your response has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'workers-reward',
    title: 'Factory Safety Inspector',
    description:
      'You\'ve been appointed as a factory inspector! Find and fix safety violations in a factory to make it safe for workers.',
    lockMessage: 'Inspector Badge Required!',
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
    type: 'factory-inspector',
    celebrationMessage: 'Great work, Inspector! The factory is now safe for workers!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Standing Strong: The Legacy of Workers\' Rights',
    paragraphs: [
      'Congratulations! You\'ve completed your journey through the history of workers\' rights, from the dark coal mines of the 1800s to the global labor struggles of today.',
      'You learned about the heartbreaking reality of child labor during the Industrial Revolution, when kids as young as four worked in mines and mills. You met Lewis Hine, whose photographs exposed the truth, and Mother Jones, who marched children to the president\'s doorstep to demand change.',
      'You witnessed the horror of the Triangle Shirtwaist Fire, where 146 workers died because the exits were locked, and you saw how that tragedy inspired Frances Perkins to fight for laws that protect workers to this day. You discovered how labor unions fought for the eight-hour day, the weekend, and the right to bargain together.',
      'You met C\u00E9sar Ch\u00E1vez and Dolores Huerta, who proved that even the most powerless workers can win when they organize and refuse to give up. And you learned that the fight for workers\' rights is far from over, with millions of children and adults around the world still struggling for fair treatment.',
      'Here\'s the most important lesson: every right you enjoy as a future worker was won by ordinary people who stood up and said "enough." The weekend, the minimum wage, safety regulations, the end of child labor in many countries. None of it was given freely. It was all fought for. And it\'s up to every generation to protect those rights and keep pushing for a world where every worker is treated with dignity.',
    ],
  },
};
