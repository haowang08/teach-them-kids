import type { Topic } from '../types';

export const crazyWeather: Topic = {
  id: 'crazy-weather',
  slug: 'crazy-weather',
  title: 'Crazy Weather',
  subtitle: 'The Most Extreme Storms on Earth',
  status: 'active',
  themeId: 'science',
  heroIcons: ['\u{1F32A}\uFE0F', '\u{1F329}\uFE0F', '\u{1F300}'],
  navItems: [
    { id: 'weather-tornadoes', icon: '\u{1F32A}\uFE0F', label: 'Tornadoes' },
    { id: 'weather-hurricanes', icon: '\u{1F300}', label: 'Hurricanes' },
    { id: 'weather-tsunamis', icon: '\u{1F30A}', label: 'Tsunamis' },
    { id: 'weather-lightning', icon: '\u26A1', label: 'Lightning' },
    { id: 'weather-other', icon: '\u{1F327}\uFE0F', label: 'Hail & Dust' },
    { id: 'weather-predict', icon: '\u{1F4E1}', label: 'Prediction' },
  ],
  sections: [
    // --- Section 1: Tornadoes ---
    {
      id: 'weather-tornadoes',
      icon: '\u{1F32A}\uFE0F',
      title: 'Tornadoes -- Nature\'s Most Violent Storms',
      readAloudBlocks: [
        {
          id: 'tornado-intro',
          paragraphs: [
            'Picture a warm, muggy afternoon in central Oklahoma. The sky turns an eerie greenish-black. The air feels heavy and electric. Suddenly, the clouds begin to rotate, and a funnel drops from the sky like a dark finger reaching for the ground. The moment it touches down, it becomes a tornado -- a violently rotating column of air that connects a thunderstorm to the Earth\'s surface, capable of shredding buildings, tossing cars like toys, and driving pieces of straw through wooden planks.',
            'Tornadoes begin inside supercell thunderstorms, which are massive, long-lasting thunderstorms with a deep, rotating updraft called a mesocyclone. When warm, moist air from the Gulf of Mexico collides with cool, dry air from Canada over the central United States, the warm air rushes upward rapidly. Meanwhile, winds at different altitudes create horizontal rolling tubes of spinning air called wind shear. The powerful updraft tilts this horizontal spin into a vertical position, creating the mesocyclone.',
          ],
        },
        {
          id: 'tornado-scale',
          paragraphs: [
            'The Enhanced Fujita Scale (EF0-EF5) measures tornado intensity based on damage. An EF0 tornado has winds of 105-137 km/h and might peel shingles off roofs. An EF5 -- the rarest and most catastrophic -- has winds exceeding 322 km/h and can level well-built houses. The original scale was developed by Dr. Tetsuya "Ted" Fujita, who earned the nickname "Mr. Tornado." Fujita also discovered microbursts -- sudden downdrafts that caused several catastrophic airplane crashes before he identified them, leading to changes in aviation safety that have saved thousands of lives.',
            '"Tornado Alley" refers to a stretch of the central United States where conditions for tornadoes are most common. The United States experiences roughly 1,200 tornadoes per year, more than any other country.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F32A}\uFE0F',
          name: 'Tetsuya Theodore Fujita',
          title: '"Mr. Tornado" (1920\u20131998)',
          description:
            'Japanese-American meteorologist who created the Fujita Scale for measuring tornado intensity based on damage. He also discovered microbursts -- sudden, powerful downdrafts that caused multiple plane crashes before he identified them. His work has saved countless lives.',
          extraTag: 'Invented the tornado damage scale',
        },
      ],
      funFacts: [
        {
          title: 'Inside a Tornado',
          text: 'Tim Samaras, a famous storm chaser, designed special instrument packages called "turtles" that he placed directly in the paths of tornadoes. In 2003, he recorded the largest pressure drop ever measured inside a tornado: 100 millibars in just seconds. That is like going from sea level to the top of a 1,000-meter mountain instantly.',
        },
      ],
      videos: [
        {
          youtubeId: 'lmWh9jV_1ac',
          title: 'How do tornadoes form? - James Spann',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'qhbX_BPrJwU',
          title: 'How to track a tornado - Karen Kosiba',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['weather-q1', 'weather-q2'],
    },

    // --- Section 2: Hurricanes ---
    {
      id: 'weather-hurricanes',
      icon: '\u{1F300}',
      title: 'Hurricanes -- The Biggest Storms on Earth',
      readAloudBlocks: [
        {
          id: 'hurricane-intro',
          paragraphs: [
            'If tornadoes are nature\'s most violent storms, hurricanes are the most powerful. A single large hurricane releases energy equivalent to about 10 atomic bombs per second -- through the condensation of water vapor into rain. That energy output is roughly 200 times the total electrical generating capacity of the entire world.',
            'Hurricanes form over warm tropical ocean water, at least 26.5 degrees Celsius. The warm water evaporates rapidly, sending massive amounts of moist air upward. As this air rises and cools, the water vapor condenses into clouds and releases heat energy, creating a self-sustaining heat engine. The Coriolis effect -- caused by the Earth\'s rotation -- creates the hurricane\'s characteristic spiral shape.',
          ],
        },
        {
          id: 'hurricane-structure',
          paragraphs: [
            'At the center of the spiral is the eye -- a calm, clear area typically 30-65 kilometers wide, surrounded by the eyewall, the most violent part of the storm. A mature hurricane can be 500-1,000 kilometers in diameter.',
            'Joanne Simpson, the first American woman to earn a PhD in meteorology, made critical contributions to understanding hurricanes. Her "hot tower" hypothesis explained how giant thunderstorm towers within hurricanes act as engines that power the storm. Modern hurricane forecasting uses satellites, hurricane hunter aircraft (which fly directly into storms), ocean buoys, and computer models to predict storm tracks days in advance.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F300}',
          name: 'Joanne Simpson',
          title: 'Meteorologist (1923\u20132010)',
          description:
            'The first woman in the United States to earn a PhD in meteorology. She pioneered the study of tropical clouds and hurricanes, and her "hot tower" hypothesis explained how heat energy drives hurricane formation.',
          extraTag: 'First woman with a meteorology PhD',
        },
      ],
      funFacts: [
        {
          title: 'Hurricane Hunters',
          text: 'The "hurricane hunter" aircraft of the U.S. Air Force routinely fly directly into the eyewalls of hurricanes at about 3,000 meters altitude. During these flights, the plane can experience extreme turbulence -- drops of hundreds of feet in seconds -- while the crew launches instruments called dropsondes that measure conditions all the way down to the ocean surface.',
        },
      ],
      videos: [],
      quizIds: ['weather-q3', 'weather-q4'],
    },

    // --- Section 3: Tsunamis ---
    {
      id: 'weather-tsunamis',
      icon: '\u{1F30A}',
      title: 'Tsunamis -- Waves That Swallow Coastlines',
      readAloudBlocks: [
        {
          id: 'tsunami-intro',
          paragraphs: [
            'A tsunami is not a normal wave. Regular ocean waves are created by wind pushing on the water\'s surface. A tsunami is created by a sudden, massive displacement of water -- usually caused by an earthquake on the ocean floor. A wind wave moves only the top few meters of water, while a tsunami moves the entire water column, from the surface all the way down to the ocean floor.',
            'In the open ocean, a tsunami might be only 30-60 centimeters high -- you could be in a boat and not even notice it pass beneath you. But it travels at incredible speed: up to 800 km/h in deep water, roughly the speed of a commercial jet. As the tsunami approaches shore, the water gets shallower, and the wave slows down but grows dramatically taller -- reaching 10-30 meters high.',
          ],
        },
        {
          id: 'tsunami-2004',
          paragraphs: [
            'The deadliest tsunami in recorded history struck on December 26, 2004. A magnitude 9.1 earthquake off the coast of Sumatra, Indonesia displaced a massive section of the ocean floor along a fault line 1,300 kilometers long. The resulting tsunami struck coastlines across the Indian Ocean, killing approximately 230,000 people in 14 countries.',
            'At the time, there was no tsunami warning system in the Indian Ocean. After the disaster, the international community established a network of seismometers, ocean floor pressure sensors, and satellite monitoring that can detect a tsunami within minutes of the triggering earthquake.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'The Deadly Drawback',
          text: 'Before a tsunami hits, the ocean often pulls far back from shore, exposing the sea floor. This looks fascinating but is actually a deadly warning sign. If you ever see the ocean suddenly pull way back, do not go look. Run to high ground immediately. You may have only minutes.',
        },
      ],
      videos: [
        {
          youtubeId: 'Wx9vPv-T51I',
          title: 'How tsunamis work - Alex Gendler',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['weather-q5', 'weather-q6'],
    },

    // --- Section 4: Lightning ---
    {
      id: 'weather-lightning',
      icon: '\u26A1',
      title: 'Lightning -- Hotter Than the Sun',
      readAloudBlocks: [
        {
          id: 'lightning-intro',
          paragraphs: [
            'Right now, as you read this sentence, approximately 1,800 thunderstorms are happening simultaneously across the Earth, producing roughly 100 lightning strikes every single second. That adds up to about 8 million lightning strikes per day.',
            'A lightning bolt can heat the air around it to approximately 30,000 degrees Celsius. That is roughly five times hotter than the surface of the Sun. This extreme heating causes the air to expand explosively, creating a shock wave that you hear as thunder. You can estimate your distance from a lightning strike by counting the seconds between the flash and the thunder, then dividing by three for kilometers.',
          ],
        },
        {
          id: 'lightning-places',
          paragraphs: [
            'Lake Maracaibo in Venezuela holds the record for the most lightning-struck place on Earth. Thanks to a unique combination of warm Caribbean winds, cold Andes mountain air, and moisture from the lake, this area experiences lightning storms roughly 300 nights per year, with up to 28 strikes per minute. The phenomenon is called "Catatumbo lightning" and has been used as a natural lighthouse by sailors for centuries.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Lightning Strikes Twice',
          text: 'Lightning can absolutely strike the same place twice. In fact, tall structures get struck repeatedly. The Empire State Building in New York City gets hit by lightning about 20-25 times per year. Lightning rods, invented by Benjamin Franklin in 1752, work by providing a safe path for the electrical current to follow into the ground.',
        },
      ],
      videos: [
        {
          youtubeId: 'doy2BsHc-44',
          title: 'The most lightning-struck place on Earth - Graeme Anderson',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['weather-q7', 'weather-q8'],
    },

    // --- Section 5: Hail, Dust Storms ---
    {
      id: 'weather-other',
      icon: '\u{1F327}\uFE0F',
      title: 'Hail, Dust Storms, and Other Extreme Phenomena',
      readAloudBlocks: [
        {
          id: 'hail-intro',
          paragraphs: [
            'Hailstones start their lives as tiny ice pellets inside the powerful updrafts of severe thunderstorms. The updraft carries the pellet upward, where it collides with supercooled water droplets. Each collision adds a layer of ice. The stronger the updraft, the bigger the hailstones can grow. If you cut a large hailstone in half, you can see concentric rings of alternating clear and milky ice -- each ring represents one trip up and down through the storm.',
            'The largest authenticated hailstone ever recorded fell in Vivian, South Dakota, on July 23, 2010. It measured 20.3 centimeters in diameter and weighed 0.88 kilograms -- about the size of a volleyball.',
          ],
        },
        {
          id: 'dust-storms',
          paragraphs: [
            'Dust storms occur when powerful winds lift loose sand and dirt from dry ground, creating a wall of dust that can be over a kilometer tall and hundreds of kilometers wide. In the 1930s, the American Midwest experienced the "Dust Bowl" -- a decade of catastrophic dust storms caused by drought and poor farming practices that destroyed crops across 400,000 square kilometers and displaced over 2.5 million people.',
            'Waterspouts are essentially tornadoes that form over water. Fire tornadoes form when intense heat from a large wildfire creates an updraft that interacts with crosswinds, generating a spinning vortex of flame. During the 2018 Carr Fire in Redding, California, a fire tornado with winds estimated at over 230 km/h formed and caused catastrophic damage.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F32A}\uFE0F',
          name: 'Tim Samaras',
          title: 'Storm Chaser & Engineer (1957\u20132013)',
          description:
            'American storm chaser and engineer who built instruments to deploy inside tornadoes to measure pressure, temperature, and humidity. He was killed along with his son and a colleague while chasing a tornado in Oklahoma in 2013.',
          extraTag: 'Built instruments to survive tornadoes',
        },
      ],
      funFacts: [
        {
          title: 'Black Sunday',
          text: 'During the Dust Bowl, on April 14, 1935 -- known as "Black Sunday" -- a single dust storm stretched from Canada to Texas, turning day into night across the Great Plains. People could not see their own hands in front of their faces. Static electricity from the blowing dust was so intense that it shorted out car engines and people who shook hands could knock each other down with the electrical discharge.',
        },
      ],
      videos: [],
      quizIds: ['weather-q9', 'weather-q10'],
    },

    // --- Section 6: Predicting Weather ---
    {
      id: 'weather-predict',
      icon: '\u{1F4E1}',
      title: 'Predicting and Surviving Extreme Weather',
      readAloudBlocks: [
        {
          id: 'predict-tools',
          paragraphs: [
            'Humanity\'s ability to predict dangerous weather has improved dramatically. Today, meteorologists use a vast network of tools: weather satellites orbiting 36,000 kilometers above the equator capture images of entire hemispheres every few minutes; Doppler radar stations detect precipitation, wind speed and direction, and rotation inside thunderstorms; weather balloons are launched twice daily from nearly 900 stations worldwide; and supercomputers run complex mathematical models that simulate the atmosphere days in advance.',
            'For tornadoes, the average warning time has improved from less than 5 minutes in the 1980s to about 13 minutes today. For hurricanes, the average 3-day track forecast error has shrunk from about 650 kilometers in 1990 to about 180 kilometers today. For tsunamis, the DART network of ocean floor sensors can detect a tsunami in minutes and issue warnings hours before it reaches distant coastlines.',
          ],
        },
        {
          id: 'predict-safety',
          paragraphs: [
            'But prediction is only useful if people act on warnings. For tornadoes, get to the lowest, most interior room in a sturdy building. For hurricanes, evacuate if told to do so -- storm surge kills more people than wind. For tsunamis, a sudden drawback of the ocean is a warning to immediately move to high ground. For lightning, follow the 30/30 rule: if the time between lightning and thunder is less than 30 seconds, get indoors and stay there for 30 minutes after the last thunder.',
            'Scientists are also developing new technologies. Experimental drone swarms are being tested to fly into tornadoes. AI-powered weather models can now generate 10-day forecasts in seconds that rival traditional supercomputer models taking hours. And citizen science programs allow anyone with a smartphone to report weather conditions in real time.',
          ],
        },
      ],
      funFacts: [
        {
          title: '36 Minutes Warning',
          text: 'The United States has an average tornado warning lead time of about 13 minutes. But in May 2013, the National Weather Service issued a tornado warning for the devastating EF5 Moore, Oklahoma, tornado a full 36 minutes before it struck, giving people significantly more time to seek shelter.',
        },
      ],
      videos: [],
      quizIds: ['weather-q11', 'weather-q12'],
    },
  ],

  // --- Quizzes ---
  quizzes: [
    {
      id: 'weather-q1',
      sectionId: 'weather-tornadoes',
      title: 'Storm Science!',
      question: 'What type of thunderstorm produces most tornadoes?',
      options: [
        { text: 'Regular thunderstorms', isCorrect: false },
        { text: 'Supercell thunderstorms with rotating updrafts', isCorrect: true },
        { text: 'Snow thunderstorms', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q2',
      sectionId: 'weather-tornadoes',
      title: 'Scale It!',
      question: 'What does the Enhanced Fujita Scale measure?',
      options: [
        { text: 'Earthquake strength', isCorrect: false },
        { text: 'Tornado intensity based on damage', isCorrect: true },
        { text: 'Hurricane wind speed', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q3',
      sectionId: 'weather-hurricanes',
      title: 'Hurricane Formation!',
      question: 'What minimum ocean temperature is needed for a hurricane to form?',
      options: [
        { text: '10 degrees Celsius', isCorrect: false },
        { text: '26.5 degrees Celsius', isCorrect: true },
        { text: '50 degrees Celsius', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q4',
      sectionId: 'weather-hurricanes',
      title: 'Eye of the Storm!',
      question: 'What is the calm center of a hurricane called?',
      options: [
        { text: 'The funnel', isCorrect: false },
        { text: 'The eye', isCorrect: true },
        { text: 'The core', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q5',
      sectionId: 'weather-tsunamis',
      title: 'Tsunami Speed!',
      question: 'How fast can a tsunami travel in deep ocean water?',
      options: [
        { text: 'About 30 km/h', isCorrect: false },
        { text: 'About 800 km/h, similar to a jet airplane', isCorrect: true },
        { text: 'About 5,000 km/h', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q6',
      sectionId: 'weather-tsunamis',
      title: 'Tsunami Safety!',
      question: 'What should you do if you see the ocean suddenly pull far back from shore?',
      options: [
        { text: 'Go explore the exposed sea floor', isCorrect: false },
        { text: 'Run to high ground immediately -- a tsunami may be coming', isCorrect: true },
        { text: 'Stay where you are and wait', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q7',
      sectionId: 'weather-lightning',
      title: 'Hot Stuff!',
      question: 'How hot is a lightning bolt compared to the surface of the Sun?',
      options: [
        { text: 'About the same temperature', isCorrect: false },
        { text: 'About five times hotter than the Sun\'s surface', isCorrect: true },
        { text: 'Much cooler than the Sun', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q8',
      sectionId: 'weather-lightning',
      title: 'Lightning Count!',
      question: 'How many lightning strikes occur on Earth each day?',
      options: [
        { text: 'About 100', isCorrect: false },
        { text: 'About 8 million', isCorrect: true },
        { text: 'About 10 billion', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q9',
      sectionId: 'weather-other',
      title: 'Hail Layers!',
      question: 'How do hailstones grow so large inside a thunderstorm?',
      options: [
        { text: 'They absorb water from the ground', isCorrect: false },
        { text: 'Powerful updrafts carry them up and down repeatedly, adding ice layers each time', isCorrect: true },
        { text: 'Lightning freezes raindrops into giant ice balls', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q10',
      sectionId: 'weather-other',
      title: 'Dust Bowl!',
      question: 'What caused the Dust Bowl of the 1930s?',
      options: [
        { text: 'Volcanic eruptions', isCorrect: false },
        { text: 'Drought combined with poor farming practices that exposed loose soil to wind', isCorrect: true },
        { text: 'A meteor impact', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q11',
      sectionId: 'weather-predict',
      title: 'Radar Power!',
      question: 'What tool do meteorologists use to detect rotation inside thunderstorms that might signal a tornado?',
      options: [
        { text: 'Thermometers', isCorrect: false },
        { text: 'Doppler radar', isCorrect: true },
        { text: 'Barometers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'weather-q12',
      sectionId: 'weather-predict',
      title: 'Safety Rule!',
      question: 'What is the 30/30 rule for lightning safety?',
      options: [
        { text: 'Run 30 meters in 30 seconds', isCorrect: false },
        { text: 'If flash-to-thunder time is under 30 seconds, get indoors and stay 30 minutes after the last thunder', isCorrect: true },
        { text: 'Wait 30 minutes between meals during a storm', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // --- Essay ---
  essay: {
    id: 'weather-essay',
    prompt:
      'Imagine you are a storm chaser who has decided to specialize in studying one type of extreme weather.',
    description:
      'Which type would you choose (tornadoes, hurricanes, tsunamis, lightning, or another)? Explain why you chose it, what tools you would use to study it safely, what scientific questions you would try to answer, and what risks you would face. How could your research help protect people? Write at least 100 characters to unlock the reward.',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Outstanding storm chaser report! You clearly understand extreme weather science!',
  },

  // --- Reward ---
  reward: {
    id: 'weather-reward',
    title: 'Storm Chaser Command',
    description:
      'Run a weather command center! Track storms, identify their type, issue warnings, and protect communities using your knowledge of extreme weather.',
    lockMessage: 'Complete all quizzes and write your essay to enter Storm Chaser Command!',
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
    type: 'storm-chaser',
    celebrationMessage: 'Welcome to Storm Chaser Command! Track storms and save lives!',
  },

  // --- Conclusion ---
  conclusion: {
    title: 'Extreme Weather: Knowledge Is Your Best Shield',
    paragraphs: [
      'From the rotating fury of a supercell tornado to the planet-wide energy engine of a hurricane, from the silent speed of a deep-ocean tsunami to the blinding heat of a lightning bolt, extreme weather is nature at its most powerful and terrifying.',
      'But you also learned that extreme weather is not random chaos. Tornadoes form through a specific sequence of events. Hurricanes are heat engines powered by warm ocean water. Tsunamis follow the laws of physics across entire ocean basins. Each phenomenon follows rules, and understanding those rules is what makes prediction and survival possible.',
      'You met scientists like Ted Fujita, who invented the tornado damage scale and discovered microbursts. Joanne Simpson, who broke through gender barriers to explain hurricane engines. Tim Samaras, who built instruments tough enough to survive being hit by a tornado.',
      'The next time a thunderstorm rolls in, you will not just see clouds and hear noise. You will understand the physics of rising warm air, the electrical charge building between ice particles, the shock wave of superheated air expanding at 30,000 degrees. And you will know exactly what to do to stay safe.',
    ],
  },
};
