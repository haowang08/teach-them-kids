import type { Topic } from '../types';

export const unsungHeroesWomensRights: Topic = {
  id: 'unsung-heroes-womens-rights',
  slug: 'unsung-heroes-womens-rights',
  title: 'Fight for Your Rights: Women\'s Rights',
  subtitle: 'Votes, Voices & Victory \u2014 The Global Struggle for Equality',
  status: 'active',
  themeId: 'unsung-heroes',
  heroIcons: ['\u{2640}\uFE0F', '\u{1F5F3}\uFE0F', '\u{1F4AA}'],
  navItems: [
    { id: 'intro-women', icon: '\u{2640}\uFE0F', label: 'A World Without Rights' },
    { id: 'suffragettes', icon: '\u{1F5F3}\uFE0F', label: 'Suffragettes' },
    { id: 'sojourner-truth', icon: '\u{1F399}\uFE0F', label: 'Sojourner Truth' },
    { id: 'education-rights', icon: '\u{1F4DA}', label: 'Education Rights' },
    { id: 'title-ix-workplace', icon: '\u{26BD}', label: 'Title IX & Work' },
    { id: 'global-women-leaders', icon: '\u{1F30D}', label: 'Global Leaders' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro-women',
      icon: '\u{2640}\uFE0F',
      title: 'Imagine a World Where Half the People Can\'t Vote',
      readAloudBlocks: [
        {
          id: 'intro-women-text',
          paragraphs: [
            'Imagine this: it\'s 1910, and you\'re a woman living in the United States. You cannot vote. You cannot serve on a jury. If you\'re married, your husband legally controls your money, your property, and even your children. Most universities won\'t admit you. Most professions are closed to you. If you work, you earn a fraction of what a man earns for the same job. And if you complain? People tell you that\'s just the way things are.',
            'This wasn\'t ancient history. Your great-great-grandmother might have lived in this world. Women in the United States couldn\'t vote until 1920. In Switzerland, women couldn\'t vote until 1971! In Saudi Arabia, it was 2015. The rights that many women enjoy today were won through decades and even centuries of struggle, sacrifice, and sheer stubbornness.',
            'Get ready to meet the suffragettes who smashed windows and went on hunger strikes for the right to vote, the formerly enslaved woman who asked "Ain\'t I a woman?", the teenager who was shot for going to school, and the athletes who fought for the right to play. This is the story of women\'s rights, and it spans the entire globe.',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },

    // ─── Section 1: Suffragettes ─────────────────────────────────
    {
      id: 'suffragettes',
      icon: '\u{1F5F3}\uFE0F',
      title: 'Suffragettes: Smashing Windows and Glass Ceilings',
      readAloudBlocks: [
        {
          id: 'suffragettes-intro',
          paragraphs: [
            'The word "suffrage" means the right to vote. Women who fought for this right were called "suffragists," and the more militant ones in Britain were called "suffragettes." For decades, women had asked politely for the vote. They signed petitions, gave speeches, and held meetings. And for decades, governments ignored them.',
            'In the United States, the fight for women\'s suffrage kicked off at the Seneca Falls Convention in 1848, organized by Elizabeth Cady Stanton and Lucretia Mott. About 300 people attended, and they signed the "Declaration of Sentiments," which boldly stated: "We hold these truths to be self-evident: that all men and women are created equal." At the time, many people thought this was ridiculous. Newspapers mocked them.',
          ],
        },
        {
          id: 'suffragettes-militants',
          paragraphs: [
            'Susan B. Anthony became the face of the American suffrage movement. In 1872, she was actually arrested for voting illegally in a presidential election! At her trial, the judge wouldn\'t let her speak and fined her $100 (which she refused to pay). She spent the next 30 years traveling the country, giving speeches, and organizing. She died in 1906, fourteen years before women finally won the right to vote.',
            'In Britain, Emmeline Pankhurst took a more radical approach. Frustrated by decades of being ignored, she founded the Women\'s Social and Political Union (WSPU) in 1903 with the motto "Deeds, not words." The suffragettes smashed shop windows, chained themselves to railings, set fire to mailboxes, and disrupted political meetings. When arrested, they went on hunger strikes in prison. The authorities responded by force-feeding them, a brutal process that horrified the public.',
          ],
        },
        {
          id: 'suffragettes-victory',
          paragraphs: [
            'World War I (1914\u20131918) proved to be a turning point. With men away fighting, women took over factory jobs, drove ambulances, worked as nurses near the front lines, and kept entire economies running. It became very hard for governments to argue that women were too delicate or unintelligent to vote when they were clearly running the country.',
            'In 1918, Britain granted limited voting rights to women over 30 who met property qualifications (full equal voting rights came in 1928). In the United States, the Nineteenth Amendment was ratified on August 18, 1920, giving all American women the right to vote. However, it\'s important to note that in practice, many Black women (and Black men) were still prevented from voting by discriminatory practices like literacy tests, poll taxes, and outright intimidation until the Voting Rights Act of 1965.',
            'New Zealand actually led the world, becoming the first self-governing country to grant women the right to vote in 1893, thanks to the tireless campaigning of Kate Sheppard, who collected a petition with over 25,000 signatures (nearly a quarter of the adult women in the country!).',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F5F3}\uFE0F',
          name: 'Emmeline Pankhurst',
          title: 'Founder of the WSPU (1858\u20131928)',
          description:
            'Emmeline Pankhurst was a British political activist who founded the Women\'s Social and Political Union (WSPU) in 1903 with the motto "Deeds, not words." Frustrated by decades of peaceful protest being ignored, she led the suffragettes in increasingly dramatic actions: smashing windows, chaining themselves to railings, and going on hunger strikes in prison. She was arrested multiple times. Her confrontational tactics divided opinion but kept women\'s suffrage in the headlines and helped win the vote.',
          extraTag: 'Motto: "Deeds, not words"',
        },
        {
          emoji: '\u{2696}\uFE0F',
          name: 'Susan B. Anthony',
          title: 'American Suffrage Pioneer (1820\u20131906)',
          description:
            'Susan B. Anthony was an American civil rights leader who spent over 50 years fighting for women\'s right to vote. In 1872, she was arrested for voting illegally. She traveled the country giving an estimated 75 to 100 speeches per year, pushing for a constitutional amendment. She didn\'t live to see victory: the Nineteenth Amendment, sometimes called the "Susan B. Anthony Amendment," was ratified 14 years after her death.',
          extraTag: 'Arrested for voting in 1872',
        },
      ],
      funFacts: [
        {
          title: 'New Zealand Led the Way!',
          text: 'New Zealand became the first self-governing country in the world to give women the right to vote in 1893, 27 years before the United States. Suffragist Kate Sheppard led the campaign and collected a petition with over 25,000 signatures, the largest petition ever presented to the New Zealand Parliament. The petition was so long that it had to be rolled into a scroll!',
        },
      ],
      videos: [
        {
          youtubeId: 'HGEMscZE5dY',
          title: 'Women\'s Suffrage: Crash Course US History #31',
          channelName: 'CrashCourse',
        },
        {
          youtubeId: '_KhYRqozTDE',
          title: 'The Historic Women\'s Suffrage March on Washington',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['women-q1', 'women-q2'],
    },

    // ─── Section 2: Sojourner Truth ──────────────────────────────
    {
      id: 'sojourner-truth',
      icon: '\u{1F399}\uFE0F',
      title: 'Sojourner Truth: "Ain\'t I a Woman?"',
      readAloudBlocks: [
        {
          id: 'truth-intro',
          paragraphs: [
            'Isabella Baumfree was born into slavery in Ulster County, New York, around 1797. She was sold multiple times, separated from her family, and forced to work under brutal conditions. In 1826, she escaped to freedom with her infant daughter (slavery was gradually being abolished in New York). She later successfully sued to recover her son, becoming one of the first Black women in the United States to win a court case against a white man.',
            'In 1843, she changed her name to Sojourner Truth and became a traveling preacher, abolitionist, and women\'s rights activist. Standing nearly six feet tall with a deep, powerful voice, she was an electrifying speaker who could silence an entire hall.',
          ],
        },
        {
          id: 'truth-speech',
          paragraphs: [
            'Sojourner Truth\'s most famous moment came at the Women\'s Rights Convention in Akron, Ohio, in 1851. Male ministers in the audience argued that women were too weak and delicate to deserve equal rights. Sojourner Truth stood up and responded with one of the most powerful speeches in American history.',
            'She pointed to her own life: she had plowed fields, planted crops, and been whipped. She had borne thirteen children and watched most of them sold into slavery. "And ain\'t I a woman?" she demanded. She challenged the idea that women were fragile creatures who needed to be protected. Her speech exposed a crucial truth that the early women\'s movement often overlooked: the experience of Black women was vastly different from that of white women. Black women faced the double burden of racism and sexism.',
            'Sojourner Truth continued fighting for both abolition and women\'s rights until her death in 1883 at the age of 86. She met President Abraham Lincoln at the White House in 1864 and helped recruit Black troops for the Union Army during the Civil War. Her legacy reminds us that the fight for women\'s rights must include all women, regardless of race or background.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F399}\uFE0F',
          name: 'Sojourner Truth',
          title: 'Abolitionist & Women\'s Rights Activist (c. 1797\u20131883)',
          description:
            'Born into slavery as Isabella Baumfree, Sojourner Truth escaped to freedom and became one of America\'s most powerful speakers against slavery and for women\'s rights. Her famous "Ain\'t I a Woman?" speech at the 1851 Women\'s Rights Convention in Akron, Ohio, challenged both racism and sexism. She was one of the first to point out that the women\'s movement needed to fight for all women, including Black women.',
          extraTag: 'One of the first Black women to win a U.S. court case',
        },
      ],
      funFacts: [
        {
          title: 'A Voice That Filled the Room',
          text: 'Sojourner Truth stood nearly six feet tall at a time when the average woman was about five feet two inches. She couldn\'t read or write, but she had a powerful, deep voice that could silence an entire audience. Despite never receiving a formal education, she was one of the most quoted speakers of the 19th century. She once said: "Truth is powerful and it prevails."',
        },
      ],
      videos: [
        {
          youtubeId: '0sn8CUyvG2k',
          title: 'The Electrifying Speeches of Sojourner Truth',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['women-q3', 'women-q4'],
    },

    // ─── Section 3: Education Rights ─────────────────────────────
    {
      id: 'education-rights',
      icon: '\u{1F4DA}',
      title: 'The Right to Learn: Malala and the Fight for Girls\' Education',
      readAloudBlocks: [
        {
          id: 'education-intro',
          paragraphs: [
            'In many parts of the world, girls have been denied the right to go to school. Even today, UNESCO estimates that 129 million girls worldwide are out of school. The reasons vary: poverty, cultural traditions, early marriage, conflict, and in some places, outright bans on girls\' education. But brave people have always fought back.',
            'In the early 1800s, most American universities refused to admit women. Oberlin College in Ohio became the first co-educational college in the United States in 1833. In Britain, women couldn\'t earn full degrees from Cambridge University until 1948! In many countries, educating girls was seen as pointless or even dangerous. The idea that girls deserved the same education as boys was considered radical.',
          ],
        },
        {
          id: 'education-malala',
          paragraphs: [
            'Malala Yousafzai was born on July 12, 1997, in the Swat Valley of Pakistan. When the Taliban took control of her region, they banned girls from attending school. Malala was just eleven years old when she began writing an anonymous blog for the BBC describing life under Taliban rule and her desire to go to school. "How dare the Taliban take away my basic right to education?" she wrote.',
            'On October 9, 2012, when Malala was fifteen, a Taliban gunman boarded her school bus, asked "Who is Malala?", and shot her in the head. She was airlifted to a hospital in Birmingham, England, where doctors saved her life after multiple surgeries. The attack shocked the world, but it didn\'t silence Malala. It made her louder.',
          ],
        },
        {
          id: 'education-victory',
          paragraphs: [
            'Malala recovered and became the world\'s most prominent advocate for girls\' education. In 2013, she spoke at the United Nations on her sixteenth birthday, telling world leaders: "One child, one teacher, one book, one pen can change the world." In 2014, at the age of seventeen, she became the youngest person ever to receive the Nobel Peace Prize.',
            'Through the Malala Fund, she has worked to ensure that every girl can complete twelve years of free, safe, quality education. Her story echoes the struggles of countless other girls and women around the world who risk everything for the simple right to learn. From the first women who insisted on entering universities to Malala standing before the United Nations, the fight for girls\' education is one of the most important human rights battles of our time.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4DA}',
          name: 'Malala Yousafzai',
          title: 'Nobel Peace Prize Laureate & Education Activist (1997\u2013)',
          description:
            'Malala Yousafzai is a Pakistani education activist who defied the Taliban\'s ban on girls\' education. Shot in the head at age fifteen, she survived and became the world\'s most prominent advocate for girls\' right to learn. In 2014, at age seventeen, she became the youngest Nobel Peace Prize laureate in history. Through the Malala Fund, she continues to fight for every girl\'s right to twelve years of free, safe education.',
          extraTag: 'Youngest Nobel Prize laureate in history',
        },
        {
          emoji: '\u{1F393}',
          name: 'Mary McLeod Bethune',
          title: 'Educator & Civil Rights Leader (1875\u20131955)',
          description:
            'Mary McLeod Bethune was the daughter of formerly enslaved parents who founded the Daytona Normal and Industrial Institute for Negro Girls in 1904 with just $1.50, five students, and packing crates for desks. The school eventually became Bethune-Cookman University. She served as an advisor to President Franklin D. Roosevelt and was the highest-ranking African American woman in government at the time.',
          extraTag: 'Started a school with $1.50',
        },
      ],
      funFacts: [
        {
          title: 'The Youngest Nobel Prize Winner Ever',
          text: 'When Malala Yousafzai won the Nobel Peace Prize in 2014, she was just seventeen years old, making her the youngest Nobel laureate in history. She shared the prize with Indian children\'s rights activist Kailash Satyarthi. When asked what she would do if someone came to attack her again, she said she would tell them about the importance of education first.',
        },
      ],
      videos: [
        {
          youtubeId: 'fM1czS_VYDI',
          title: 'Women in the 19th Century: Crash Course US History #16',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['women-q5', 'women-q6'],
    },

    // ─── Section 4: Title IX and Workplace Equality ──────────────
    {
      id: 'title-ix-workplace',
      icon: '\u{26BD}',
      title: 'Title IX, Sports, and the Fight for Equal Pay',
      readAloudBlocks: [
        {
          id: 'title-ix-intro',
          paragraphs: [
            'Do you play on a school sports team? Thank Title IX. Before 1972, schools in the United States could (and did) refuse to fund girls\' sports. Most high schools had no girls\' teams at all. Colleges spent millions on men\'s athletics and almost nothing on women\'s. If a girl wanted to play basketball, soccer, or swim competitively, she was usually out of luck.',
            'Title IX of the Education Amendments of 1972 changed everything. This federal law says that no person in the United States can be excluded from or discriminated against in any educational program receiving federal funding, based on sex. That means schools have to give girls equal opportunities in sports, scholarships, and all other programs.',
          ],
        },
        {
          id: 'title-ix-impact',
          paragraphs: [
            'The impact was staggering. Before Title IX, only about 295,000 girls played high school sports in the United States. Today, that number is over 3.4 million. Women\'s college sports have exploded. The U.S. Women\'s National Soccer Team has won four World Cups. Women\'s basketball, gymnastics, and track have become some of the most watched events at the Olympics.',
            'But the fight for equality in sports and the workplace is far from over. In 2019, the U.S. Women\'s Soccer Team sued the U.S. Soccer Federation for paying them less than the men\'s team, even though the women\'s team had won far more championships. The case drew worldwide attention and in 2022, they won: U.S. Soccer agreed to equal pay for the men\'s and women\'s teams.',
          ],
        },
        {
          id: 'workplace-equality',
          paragraphs: [
            'Outside of sports, women still earn less than men in most countries. In the United States, women earn about 84 cents for every dollar a man earns for similar work, and the gap is even wider for Black women (about 70 cents) and Latina women (about 65 cents). In many countries, women are still barred from certain professions or face discrimination when they become mothers.',
            'The fight for workplace equality has a long history. In 1963, the U.S. passed the Equal Pay Act, which said men and women must receive equal pay for equal work. In 1964, the Civil Rights Act banned employment discrimination based on sex. In Iceland, a tiny Nordic nation, women went on strike on October 24, 1975, refusing to work, cook, or care for children for an entire day to show how much the country depended on their labor. The strike paralyzed the nation and is called "the long Friday." Iceland now consistently ranks as the most gender-equal country on Earth.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{26BD}',
          name: 'Billie Jean King',
          title: 'Tennis Champion & Gender Equality Pioneer (1943\u2013)',
          description:
            'Billie Jean King is a tennis champion who won 39 Grand Slam titles and fought tirelessly for gender equality in sports. In 1973, she defeated Bobby Riggs in the famous "Battle of the Sexes" tennis match, watched by 90 million people worldwide. She was a driving force behind the passage of Title IX and founded the Women\'s Sports Foundation. She proved that women\'s sports could be just as exciting and competitive as men\'s.',
          extraTag: '39 Grand Slam titles',
        },
        {
          emoji: '\u{1F3C6}',
          name: 'Megan Rapinoe',
          title: 'Soccer Star & Equal Pay Activist (1985\u2013)',
          description:
            'Megan Rapinoe is a two-time World Cup champion who became one of the most vocal advocates for equal pay in women\'s sports. She was a leader in the U.S. Women\'s Soccer Team\'s lawsuit against U.S. Soccer for gender discrimination in pay. In 2022, the team won their case, securing equal pay and equal working conditions. Rapinoe used her platform to fight for equality both on and off the field.',
          extraTag: 'Won the fight for equal pay in U.S. Soccer',
        },
      ],
      funFacts: [
        {
          title: 'From 295,000 to 3.4 Million!',
          text: 'Before Title IX passed in 1972, only about 295,000 girls played high school sports in the United States. Today, over 3.4 million girls play high school sports. That\'s more than a tenfold increase! Title IX didn\'t just change sports; it changed how an entire society thinks about girls\' abilities and potential.',
        },
      ],
      videos: [
        {
          youtubeId: 'KymR6N1HT88',
          title: 'Equality, Sports, and Title IX',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['women-q7', 'women-q8'],
    },

    // ─── Section 5: Global Women Leaders ─────────────────────────
    {
      id: 'global-women-leaders',
      icon: '\u{1F30D}',
      title: 'Women Who Led Nations and Changed the World',
      readAloudBlocks: [
        {
          id: 'leaders-intro',
          paragraphs: [
            'For most of recorded history, political leadership was considered a man\'s job. But women have been breaking that barrier around the world. In 1960, Sirimavo Bandaranaike of Sri Lanka became the world\'s first female prime minister. Since then, over 70 countries have had a female head of state or government, from Angela Merkel in Germany to Jacinda Ardern in New Zealand to Ellen Johnson Sirleaf in Liberia.',
            'In India, Indira Gandhi served as prime minister for nearly 16 years. In Britain, Margaret Thatcher was prime minister for eleven years. In Liberia, Ellen Johnson Sirleaf became Africa\'s first elected female head of state in 2006 and won the Nobel Peace Prize. In New Zealand, Jacinda Ardern became the world\'s youngest female head of government in 2017 and was praised for her compassionate leadership during crises.',
          ],
        },
        {
          id: 'leaders-global',
          paragraphs: [
            'The fight for women\'s political representation is a global story. Rwanda currently leads the world, with women holding over 60% of seats in its parliament. In Saudi Arabia, women only gained the right to vote and run for office in 2015. In Afghanistan, the Taliban\'s return to power in 2021 reversed years of progress, banning girls from secondary school and women from most jobs.',
            'Wangari Maathai of Kenya combined women\'s rights with environmental activism. In 1977, she founded the Green Belt Movement, which empowered women to plant over 51 million trees across Kenya while fighting for democracy and human rights. She was beaten, arrested, and threatened, but never stopped. In 2004, she became the first African woman to win the Nobel Peace Prize.',
          ],
        },
        {
          id: 'leaders-future',
          paragraphs: [
            'Progress has been real but uneven. Women still hold only about 26% of parliamentary seats worldwide. In many countries, women face legal barriers to owning property, inheriting wealth, or traveling without a male guardian\'s permission. But every year, more barriers fall. In 2021, Kamala Harris became the first woman, and the first person of South Asian and African American descent, to serve as Vice President of the United States.',
            'The story of women\'s rights is not just a women\'s story. It\'s a human story about whether we truly believe that all people deserve equal rights and opportunities. Every girl who goes to school, every woman who votes, every female athlete who competes, and every woman who leads is standing on the shoulders of the brave people you\'ve learned about in this lesson.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F333}',
          name: 'Wangari Maathai',
          title: 'Kenyan Activist & Nobel Laureate (1940\u20132011)',
          description:
            'Wangari Maathai was a Kenyan environmental and political activist who founded the Green Belt Movement in 1977, empowering women to plant over 51 million trees while fighting for democracy and human rights. She was beaten, arrested, and threatened by the government but never backed down. In 2004, she became the first African woman to win the Nobel Peace Prize, recognized for her contribution to sustainable development, democracy, and peace.',
          extraTag: 'Over 51 million trees planted',
        },
      ],
      funFacts: [
        {
          title: 'Rwanda: World Leader in Women\'s Representation',
          text: 'Rwanda, a small country in East Africa, has the highest percentage of women in parliament of any country in the world: over 60%. After the devastating 1994 genocide, women played a crucial role in rebuilding the country. Today, Rwanda requires that at least 30% of parliamentary seats be held by women, but women have consistently won far more than that minimum.',
        },
      ],
      videos: [],
      quizIds: ['women-q9', 'women-q10'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Suffragettes
    {
      id: 'women-q1',
      sectionId: 'suffragettes',
      title: 'Suffrage Challenge!',
      question:
        'Which country was the first self-governing nation to grant women the right to vote?',
      options: [
        { text: 'The United States', isCorrect: false },
        { text: 'New Zealand', isCorrect: true },
        { text: 'Britain', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'women-q2',
      sectionId: 'suffragettes',
      title: 'Deeds Not Words!',
      question:
        'What was the motto of Emmeline Pankhurst\'s Women\'s Social and Political Union?',
      options: [
        { text: '"Votes for Women Now!"', isCorrect: false },
        { text: '"Deeds, not words"', isCorrect: true },
        { text: '"All men and women are created equal"', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Sojourner Truth
    {
      id: 'women-q3',
      sectionId: 'sojourner-truth',
      title: 'Truth\'s Legacy Quiz!',
      question:
        'What crucial point did Sojourner Truth make in her famous "Ain\'t I a Woman?" speech?',
      options: [
        { text: 'That women should only focus on abolishing slavery first', isCorrect: false },
        { text: 'That Black women faced the double burden of racism and sexism', isCorrect: true },
        { text: 'That women should be allowed to fight in wars', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'women-q4',
      sectionId: 'sojourner-truth',
      title: 'History Maker Challenge!',
      question:
        'What was Sojourner Truth\'s birth name?',
      options: [
        { text: 'Isabella Baumfree', isCorrect: true },
        { text: 'Harriet Tubman', isCorrect: false },
        { text: 'Mary McLeod Bethune', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Education
    {
      id: 'women-q5',
      sectionId: 'education-rights',
      title: 'Education Rights Quiz!',
      question:
        'How old was Malala Yousafzai when she won the Nobel Peace Prize?',
      options: [
        { text: 'Fifteen', isCorrect: false },
        { text: 'Seventeen', isCorrect: true },
        { text: 'Twenty-one', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'women-q6',
      sectionId: 'education-rights',
      title: 'Brave Educator Challenge!',
      question:
        'How much money did Mary McLeod Bethune have when she started her school for African American girls?',
      options: [
        { text: '$150', isCorrect: false },
        { text: '$1.50', isCorrect: true },
        { text: '$15,000', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Title IX
    {
      id: 'women-q7',
      sectionId: 'title-ix-workplace',
      title: 'Title IX Quiz!',
      question:
        'How many girls played high school sports in the U.S. before Title IX, compared to today?',
      options: [
        { text: 'About 295,000 before, over 3.4 million today', isCorrect: true },
        { text: 'About 1 million before, about 2 million today', isCorrect: false },
        { text: 'About 3 million before, about 3.4 million today', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'women-q8',
      sectionId: 'title-ix-workplace',
      title: 'Equal Pay Challenge!',
      question:
        'What happened in Iceland on October 24, 1975, that became known as "the long Friday"?',
      options: [
        { text: 'A volcanic eruption shut down the whole country', isCorrect: false },
        { text: 'Women went on strike, refusing to work, cook, or care for children for a day', isCorrect: true },
        { text: 'Parliament voted to abolish all gender laws', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Global Leaders
    {
      id: 'women-q9',
      sectionId: 'global-women-leaders',
      title: 'World Leaders Quiz!',
      question:
        'Which country has the highest percentage of women in parliament in the world?',
      options: [
        { text: 'Sweden', isCorrect: false },
        { text: 'Rwanda', isCorrect: true },
        { text: 'New Zealand', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'women-q10',
      sectionId: 'global-women-leaders',
      title: 'Green Leader Challenge!',
      question:
        'What did Wangari Maathai\'s Green Belt Movement accomplish in Kenya?',
      options: [
        { text: 'Built green energy power plants across Africa', isCorrect: false },
        { text: 'Empowered women to plant over 51 million trees while fighting for democracy', isCorrect: true },
        { text: 'Created the first all-women parliament in Africa', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'women-essay',
    prompt:
      'If you could interview one woman from this lesson, who would it be and what would you ask her?',
    description:
      'Think about all the remarkable women you learned about: the suffragettes, Sojourner Truth, Malala, Billie Jean King, Wangari Maathai, and more. If you could sit down and talk to one of them, who would you choose? What questions would you ask? What do you think she would say? Write at least 100 characters to help unlock a special surprise!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'What a thoughtful response! You clearly understand the importance of these women\'s stories. Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'women-reward',
    title: 'Voices of Change',
    description:
      'Build an inspiring speech using words from history\'s bravest women and watch your crowd grow!',
    lockMessage: 'Podium Access Locked!',
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
    type: 'voices-of-change',
    celebrationMessage: 'Your voice inspired the crowd! Words really can change the world!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Equality Earned: The Ongoing Story of Women\'s Rights',
    paragraphs: [
      'Congratulations! You\'ve completed your journey through the history of women\'s rights, from the suffragettes\' struggle for the vote to the global fight for equality today.',
      'You met the suffragettes who refused to be ignored: Emmeline Pankhurst with her "Deeds, not words," Susan B. Anthony who was arrested for daring to vote, and Kate Sheppard who helped New Zealand lead the world. You heard the powerful voice of Sojourner Truth, who reminded everyone that the fight for women\'s rights must include all women.',
      'You were inspired by Malala Yousafzai, who was shot for going to school and responded by becoming the world\'s youngest Nobel Prize winner. You learned how Title IX transformed girls\' sports in America and how the U.S. Women\'s Soccer Team fought for and won equal pay. And you discovered women leaders from around the globe, from Wangari Maathai planting millions of trees in Kenya to Rwanda having the most gender-balanced parliament on Earth.',
      'The story of women\'s rights is not just history. It\'s happening right now. Women in Afghanistan are fighting for the right to go to school. Women around the world are fighting for equal pay. Girls everywhere are breaking into fields that were once closed to them. Every step forward was earned by someone brave enough to demand change.',
      'Remember: every right that women enjoy today was won through the courage, sacrifice, and determination of people who refused to accept that "the way things are" is the way things have to be. That spirit of fighting for what\'s right belongs to everyone, regardless of gender. The question is: what will you do with it?',
    ],
  },
};
