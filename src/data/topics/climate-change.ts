import type { Topic } from '../types';

export const climateChange: Topic = {
  id: 'climate-change',
  slug: 'climate-change',
  title: 'How the Climate Is Changing Today',
  subtitle: 'Understanding Our Warming World',
  status: 'active',
  themeId: 'science',
  heroIcons: ['\u{1F321}\uFE0F', '\u{1F310}', '\u{1F33F}'],
  navItems: [
    { id: 'climate-greenhouse', icon: '\u{1F321}\uFE0F', label: 'Greenhouse Effect' },
    { id: 'climate-evidence', icon: '\u{1F4C8}', label: 'The Evidence' },
    { id: 'climate-droughts', icon: '\u{1F525}', label: 'Droughts & Fires' },
    { id: 'climate-history', icon: '\u{1F9CA}', label: 'Natural Cycles' },
    { id: 'climate-human', icon: '\u{1F3ED}', label: 'Human Activity' },
    { id: 'climate-hope', icon: '\u{1F33F}', label: 'Reasons for Hope' },
  ],
  sections: [
    // --- Section 1: Greenhouse Effect ---
    {
      id: 'climate-greenhouse',
      icon: '\u{1F321}\uFE0F',
      title: 'The Greenhouse Effect -- Earth\'s Invisible Blanket',
      readAloudBlocks: [
        {
          id: 'greenhouse-intro',
          paragraphs: [
            'Imagine the Earth without any atmosphere at all. With no air, no clouds, and no gases wrapping around the planet, the average surface temperature would be about minus 18 degrees Celsius -- well below freezing. So what keeps us warm? The answer is the greenhouse effect.',
            'Energy from the Sun reaches Earth as visible light. About 30% bounces right back into space. The remaining 70% is absorbed by the land, oceans, and atmosphere. The warmed Earth then radiates energy back toward space as infrared radiation (heat). But certain gases -- called greenhouse gases -- absorb this outgoing heat and re-radiate some of it back toward the surface. This "trapping" of heat raises Earth\'s average temperature from minus 18 to a livable plus 15 degrees Celsius. Without it, we would not be here.',
          ],
        },
        {
          id: 'greenhouse-gases',
          paragraphs: [
            'The main greenhouse gases are carbon dioxide (CO2), methane (CH4), water vapor, and nitrous oxide. CO2 is released when fossil fuels are burned. Methane is released from livestock digestion (cow burps and farts, seriously), rice paddies, landfills, and thawing permafrost. Methane is over 80 times more potent as a greenhouse gas than CO2 over a 20-year period, but it breaks down in the atmosphere faster.',
            'A scientist named Eunice Newton Foote demonstrated this concept way back in 1856. She placed glass cylinders filled with different gases in sunlight and found that the one filled with CO2 heated up more and stayed hotter longer. Because she was a woman, a male colleague had to read her paper at the conference. Three years later, John Tyndall published similar findings and received the credit for decades. Foote\'s contribution was only rediscovered in 2011.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F52C}',
          name: 'Eunice Newton Foote',
          title: 'Scientist (1819\u20131888)',
          description:
            'American scientist who in 1856 -- three years before John Tyndall\'s more famous work -- demonstrated that carbon dioxide traps heat from the sun. Her work was largely ignored because she was a woman.',
          extraTag: 'Discovered greenhouse effect 3 years before Tyndall',
        },
      ],
      funFacts: [
        {
          title: 'Runaway Venus',
          text: 'Venus has a runaway greenhouse effect: its atmosphere is 96% CO2, which traps so much heat that the surface temperature is about 465 degrees Celsius -- hot enough to melt lead. Venus is actually hotter than Mercury, even though Mercury is closer to the Sun.',
        },
      ],
      videos: [
        {
          youtubeId: 'ztWHqUFJRTs',
          title: 'Climate change: Earth\'s giant game of Tetris - Joss Fong',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'wbR-5mHI6bo',
          title: 'Is It Too Late To Stop Climate Change? Well, it\'s Complicated.',
          channelName: 'Kurzgesagt',
        },
      ],
      quizIds: ['climate-q1', 'climate-q2'],
    },

    // --- Section 2: The Evidence ---
    {
      id: 'climate-evidence',
      icon: '\u{1F4C8}',
      title: 'The Evidence -- Ice Caps, Sea Levels, and the Keeling Curve',
      readAloudBlocks: [
        {
          id: 'evidence-keeling',
          paragraphs: [
            'In 1958, a scientist named Charles David Keeling began taking daily measurements of CO2 from the Mauna Loa Observatory in Hawaii. His measurements, plotted over time, created the Keeling Curve: a line that zigzags up and down with the seasons but trends relentlessly upward year after year. When Keeling began measuring, atmospheric CO2 was about 315 parts per million (ppm). As of 2025, it has surpassed 425 ppm -- the highest concentration in at least 800,000 years.',
            'This CO2 increase is directly traceable to human activity, primarily burning fossil fuels. Scientists can identify carbon from fossil fuels using isotope ratios. The correlation between rising CO2 and rising global temperatures is clear: Earth\'s average surface temperature has risen by approximately 1.1 degrees Celsius since the late 1800s, with most of the warming occurring since the 1970s. The ten warmest years in the modern record have all occurred since 2010.',
          ],
        },
        {
          id: 'evidence-ice',
          paragraphs: [
            'The effects are visible across the planet. Arctic sea ice has declined by about 40% since satellite monitoring began in 1979. The Greenland Ice Sheet is losing approximately 270 billion tons of ice per year. Mountain glaciers are retreating worldwide -- Glacier National Park in Montana had 150 glaciers in 1850 and now has 26.',
            'Global sea levels have risen about 21-24 centimeters since 1880 and the rate is accelerating. The rise comes from thermal expansion (water expands as it warms) and melting land ice. Current projections estimate sea levels could rise another 0.3 to 1.0 meter by 2100. Cities like Miami, New York, Shanghai, and low-lying island nations face increasing flooding and, in some cases, existential threats.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4C8}',
          name: 'Charles David Keeling',
          title: 'Scientist (1928\u20132005)',
          description:
            'American scientist who began measuring atmospheric CO2 levels at Mauna Loa Observatory in 1958. His continuous measurements created the "Keeling Curve," one of the most important datasets in climate science.',
          extraTag: 'Created the Keeling Curve',
        },
      ],
      funFacts: [
        {
          title: 'Ancient Air Bubbles',
          text: 'Scientists can determine past CO2 levels by drilling into Antarctic ice sheets and extracting ice cores -- cylinders of ice that contain tiny air bubbles trapped when the snow originally fell, up to 800,000 years ago. Current CO2 levels are about 50% higher than at any point in those 800,000 years.',
        },
      ],
      videos: [],
      quizIds: ['climate-q3', 'climate-q4'],
    },

    // --- Section 3: Droughts & Wildfires ---
    {
      id: 'climate-droughts',
      icon: '\u{1F525}',
      title: 'Droughts, Wildfires, and Extreme Heat',
      readAloudBlocks: [
        {
          id: 'droughts-intro',
          paragraphs: [
            'As global temperatures rise, weather patterns shift. Warmer air holds more moisture (about 7% more per degree Celsius of warming), which means more intense rainfall in some areas and more severe drought in others, because the increased evaporation dries out soils faster between storms.',
            'The western United States has experienced a "megadrought" since 2000 that is the worst in at least 1,200 years. Lake Mead, the largest reservoir in the United States, dropped to just 27% of capacity in 2022. The Colorado River, which provides water to 40 million people, has seen its flow decrease by about 20% since 2000.',
          ],
        },
        {
          id: 'droughts-fires',
          paragraphs: [
            'Wildfire seasons have lengthened and intensified. In Australia, the 2019-2020 "Black Summer" bushfires burned an estimated 186,000 square kilometers (larger than Greece), destroyed over 5,900 buildings, and an estimated 3 billion animals were killed or displaced.',
            'Heat waves are becoming more frequent and longer-lasting. In June 2021, a heat dome over the Pacific Northwest shattered records. Lytton, British Columbia, reached 49.6 degrees Celsius -- the highest temperature ever recorded in Canada. The next day, the town was largely destroyed by a wildfire. A study estimated that the 2021 heat dome was virtually impossible without human-caused climate change.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Tree Ring Time Machine',
          text: 'Trees record drought history in their growth rings. In wet years, trees grow quickly and produce wide rings. In dry years, growth slows and rings are narrow. By studying ancient trees, scientists can reconstruct rainfall patterns stretching back thousands of years. This science is called dendrochronology.',
        },
      ],
      videos: [],
      quizIds: ['climate-q5', 'climate-q6'],
    },

    // --- Section 4: Natural Climate Cycles ---
    {
      id: 'climate-history',
      icon: '\u{1F9CA}',
      title: 'Context -- Natural Climate Cycles Through History',
      readAloudBlocks: [
        {
          id: 'history-cycles',
          paragraphs: [
            'Earth\'s climate has always changed. Over the past 2.6 million years, Earth has experienced repeated ice ages separated by warmer interglacial periods. These cycles are primarily driven by Milankovitch cycles -- slow, predictable changes in Earth\'s orbit around the Sun and the tilt of its axis. During the Last Glacial Maximum, about 20,000 years ago, ice sheets up to 3 kilometers thick covered much of North America and Europe. Sea levels were about 120 meters lower than today.',
            'Volcanic eruptions can cool the planet temporarily. The 1815 eruption of Mount Tambora caused the "Year Without a Summer" in 1816. Temperatures dropped, crops failed across Europe and North America, and frost occurred in June in New England.',
          ],
        },
        {
          id: 'history-difference',
          paragraphs: [
            'So how is today\'s warming different from these natural cycles? Three critical ways. First, speed: natural climate shifts typically occur over thousands of years. Current warming is happening over decades -- roughly 10 times faster. Second, cause: the current warming correlates precisely with rising atmospheric CO2 from burning fossil fuels, not with any known natural forcing. Third, magnitude: if emissions continue unabated, projected warming by 2100 would rival the temperature difference between the last ice age and today -- but compressed into 200 years instead of 10,000.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Walking to Australia',
          text: 'During the Last Glacial Maximum, so much water was locked up in ice sheets that sea levels were about 120 meters lower than today. The English Channel was dry land. Australia was connected to New Guinea. Humans walked from Southeast Asia to Australia across land bridges that are now submerged.',
        },
      ],
      videos: [
        {
          youtubeId: 'I4EZCy14te0',
          title: 'When will the next ice age happen? - Lorraine Lisiecki',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['climate-q7', 'climate-q8'],
    },

    // --- Section 5: Human Activity ---
    {
      id: 'climate-human',
      icon: '\u{1F3ED}',
      title: 'Human Activity and the Carbon Footprint',
      readAloudBlocks: [
        {
          id: 'human-sources',
          paragraphs: [
            'The connection between human activity and rising greenhouse gas levels is as well-established as the link between smoking and lung cancer. The IPCC stated in its 2021 report: "It is unequivocal that human influence has warmed the atmosphere, ocean and land."',
            'Where do the emissions come from? The largest source is energy production (electricity and heat) at about 25%. Transportation contributes about 16%. Industry about 21%. Agriculture and forestry about 22%. Buildings about 6%.',
          ],
        },
        {
          id: 'human-inequality',
          paragraphs: [
            'Deforestation is a double problem. When forests are cut down and burned, the stored carbon is released as CO2. At the same time, the forest\'s ability to absorb future CO2 is permanently lost. The Amazon Rainforest alone absorbs about 2.2 billion tons of CO2 per year -- but deforestation has reduced this capacity.',
            'Individual and national "carbon footprints" vary enormously. The average American produces about 15 tons of CO2 equivalent per year. The average European about 7 tons. The average Indian about 2 tons. The richest 1% of the world\'s population produces more than twice the emissions of the poorest 50%. Climate change is fundamentally an issue of inequality.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'A Cube of Carbon',
          text: 'If all the CO2 emitted by human activities since the Industrial Revolution were compressed into solid blocks, it would form a cube roughly 35 kilometers on each side. That is a cube taller than the cruising altitude of a commercial airplane, made entirely of carbon dioxide.',
        },
      ],
      videos: [],
      quizIds: ['climate-q9', 'climate-q10'],
    },

    // --- Section 6: Reasons for Hope ---
    {
      id: 'climate-hope',
      icon: '\u{1F33F}',
      title: 'What We Can Do -- Reasons for Hope',
      readAloudBlocks: [
        {
          id: 'hope-progress',
          paragraphs: [
            'This is not a hopeless story. The cost of solar energy has dropped by over 90% since 2010. Wind energy costs have fallen by about 70%. Global renewable energy capacity reached over 3,800 gigawatts in 2023, surpassing coal for the first time. Electric vehicle sales have surged -- in 2023, about one in five new cars sold globally was electric.',
            'Countries are making commitments. Over 140 countries have pledged to reach "net zero" emissions by 2050 or 2060. The United States passed the Inflation Reduction Act in 2022, investing over $369 billion in clean energy -- the largest climate investment in American history.',
          ],
        },
        {
          id: 'hope-youth',
          paragraphs: [
            'Young people are leading the way. In August 2018, a 15-year-old Swedish student named Greta Thunberg sat alone outside the Swedish parliament with a sign reading "Skolstrejk for klimatet" (School Strike for Climate). Within months, her solo protest had sparked the Fridays for Future movement, with millions of students in over 150 countries demanding climate action.',
            'What can you do right now? Talk about it -- discussing climate change with friends and family is one of the most effective things individuals can do. Reduce food waste. Walk, bike, or take public transit when possible. Support policies and leaders who take climate action seriously. The climate crisis is real, serious, and caused by human activity. It is also solvable. The technologies exist. The economics increasingly favor clean energy. The young generation is fired up.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F33F}',
          name: 'Greta Thunberg',
          title: 'Climate Activist (Born 2003)',
          description:
            'Swedish climate activist who, at age 15 in 2018, began skipping school every Friday to protest outside the Swedish parliament. Her "Fridays for Future" movement inspired millions of young people worldwide to join climate strikes.',
          extraTag: 'Started Fridays for Future',
        },
      ],
      funFacts: [
        {
          title: 'Renewables Are Here',
          text: 'In 2023, Denmark generated nearly 60% of its electricity from wind power alone. Costa Rica generated over 98% from renewable sources. Iceland generates 100% from renewables. These countries prove that running a modern economy on clean energy is not a fantasy -- it is already happening.',
        },
      ],
      videos: [
        {
          youtubeId: 'yiw6_JakZFc',
          title: 'Can YOU Fix Climate Change?',
          channelName: 'Kurzgesagt',
        },
        {
          youtubeId: 'xKxrkht7CpY',
          title: 'How do solar panels work? - Richard Komp',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['climate-q11', 'climate-q12'],
    },
  ],

  // --- Quizzes ---
  quizzes: [
    {
      id: 'climate-q1',
      sectionId: 'climate-greenhouse',
      title: 'Greenhouse Basics!',
      question: 'What would Earth\'s average temperature be without the greenhouse effect?',
      options: [
        { text: 'About 15 degrees Celsius (same as now)', isCorrect: false },
        { text: 'About minus 18 degrees Celsius -- well below freezing', isCorrect: true },
        { text: 'About 100 degrees Celsius', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q2',
      sectionId: 'climate-greenhouse',
      title: 'Forgotten Scientist!',
      question: 'Who first demonstrated that CO2 traps heat, three years before John Tyndall?',
      options: [
        { text: 'Marie Curie', isCorrect: false },
        { text: 'Eunice Newton Foote', isCorrect: true },
        { text: 'Albert Einstein', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q3',
      sectionId: 'climate-evidence',
      title: 'Keeling Curve!',
      question: 'What is the Keeling Curve?',
      options: [
        { text: 'A curve in a road near a volcano', isCorrect: false },
        { text: 'A graph showing the continuous rise of atmospheric CO2 since 1958', isCorrect: true },
        { text: 'A type of ocean wave', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q4',
      sectionId: 'climate-evidence',
      title: 'Temperature Rise!',
      question: 'About how much has Earth\'s average temperature risen since the late 1800s?',
      options: [
        { text: '0.01 degrees Celsius', isCorrect: false },
        { text: '1.1 degrees Celsius', isCorrect: true },
        { text: '10 degrees Celsius', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q5',
      sectionId: 'climate-droughts',
      title: 'Weather Paradox!',
      question: 'Why does warmer air lead to both more intense rainfall AND more severe drought?',
      options: [
        { text: 'Warmer air holds more moisture, so more evaporation dries soils between storms while storms dump more rain when they occur', isCorrect: true },
        { text: 'Warm air prevents rain from forming', isCorrect: false },
        { text: 'Droughts and floods are unrelated to temperature', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q6',
      sectionId: 'climate-droughts',
      title: 'Black Summer!',
      question: 'What fueled the record 2019-2020 bushfires in Australia?',
      options: [
        { text: 'Arson alone', isCorrect: false },
        { text: 'Drought, record heat, and strong winds worsened by climate change', isCorrect: true },
        { text: 'Volcanic eruptions', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q7',
      sectionId: 'climate-history',
      title: 'Ice Age Cycles!',
      question: 'What primarily drives Earth\'s natural ice age cycles?',
      options: [
        { text: 'Changes in ocean currents only', isCorrect: false },
        { text: 'Milankovitch cycles -- slow changes in Earth\'s orbit and axial tilt', isCorrect: true },
        { text: 'Volcanic eruptions every year', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q8',
      sectionId: 'climate-history',
      title: 'What\'s Different?',
      question: 'How is today\'s climate change different from past natural changes?',
      options: [
        { text: 'It is not different at all', isCorrect: false },
        { text: 'It is happening much faster (decades instead of thousands of years) and is caused by human activity', isCorrect: true },
        { text: 'Today\'s change is slower than past changes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q9',
      sectionId: 'climate-human',
      title: 'Biggest Source!',
      question: 'What is the largest single source of global greenhouse gas emissions?',
      options: [
        { text: 'Cars and trucks', isCorrect: false },
        { text: 'Energy production (electricity and heat)', isCorrect: true },
        { text: 'Agriculture', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q10',
      sectionId: 'climate-human',
      title: 'Double Problem!',
      question: 'Why is deforestation a "double problem" for climate change?',
      options: [
        { text: 'It makes forests grow faster', isCorrect: false },
        { text: 'It releases stored carbon AND removes the forest\'s ability to absorb future CO2', isCorrect: true },
        { text: 'It creates more oxygen', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q11',
      sectionId: 'climate-hope',
      title: 'Solar Progress!',
      question: 'By how much has the cost of solar energy dropped since 2010?',
      options: [
        { text: 'About 10%', isCorrect: false },
        { text: 'Over 90%', isCorrect: true },
        { text: 'About 50%', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'climate-q12',
      sectionId: 'climate-hope',
      title: 'Youth Power!',
      question: 'What did Greta Thunberg do in 2018 that sparked a global movement?',
      options: [
        { text: 'She invented a new type of solar panel', isCorrect: false },
        { text: 'She began a solo school strike for climate outside the Swedish parliament', isCorrect: true },
        { text: 'She became the youngest president of a country', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // --- Essay ---
  essay: {
    id: 'climate-essay',
    prompt:
      'Some people feel scared and hopeless about climate change. Others feel angry. Others feel motivated to act. How do you feel, and why?',
    description:
      'Based on what you learned, write about what you think are the strongest reasons for concern AND the strongest reasons for hope. Then describe three specific things you, your family, or your school could do in the next year to make a difference -- and explain why those actions matter based on the science. Write at least 100 characters to unlock the reward.',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Thoughtful and grounded! You understand both the challenge and the hope.',
  },

  // --- Reward ---
  reward: {
    id: 'climate-reward',
    title: 'Climate Action Dashboard',
    description:
      'Manage a simplified Earth simulator! Make policy and technology choices over 50 years and watch the effects on temperature, CO2, sea level, and renewable energy.',
    lockMessage: 'Complete all quizzes and write your essay to unlock the Climate Dashboard!',
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
    type: 'climate-dashboard',
    celebrationMessage: 'Welcome to the Climate Dashboard! Your choices shape the future!',
  },

  // --- Conclusion ---
  conclusion: {
    title: 'Climate Change: The Science Is in Your Hands',
    paragraphs: [
      'You have just learned about one of the most important scientific stories of your lifetime. Climate change is not a prediction about some distant future -- it is happening right now, measurably, in every part of the world.',
      'You learned that a woman named Eunice Newton Foote demonstrated the greenhouse effect in 1856 and was ignored. You learned that Charles David Keeling patiently measured CO2 for decades, creating one of the most important datasets in all of science. You saw how ice caps are shrinking, how droughts and wildfires are intensifying, and how entire cities are at risk.',
      'Most importantly, you learned that the story is not over. The cost of clean energy has plummeted. Countries are making commitments. Electric vehicles are going mainstream. Young people like Greta Thunberg are demanding change and winning legal victories.',
      'You are growing up in the generation that will determine whether this story ends well or badly. That is an enormous weight to carry -- and an enormous opportunity. The science is in your hands now. What you do with it is up to you.',
    ],
  },
};
