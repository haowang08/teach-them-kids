import type { Topic } from '../types';

export const naturalEcosystems: Topic = {
  id: 'natural-ecosystems',
  slug: 'natural-ecosystems',
  title: 'Natural Ecosystems',
  subtitle: 'Earth\'s Incredible Living Networks',
  status: 'active',
  themeId: 'science',
  heroIcons: ['\u{1F333}', '\u{1FAB8}', '\u{1F30E}'],
  navItems: [
    { id: 'eco-rainforest', icon: '\u{1F333}', label: 'Rainforest' },
    { id: 'eco-tundra', icon: '\u2744\uFE0F', label: 'Tundra' },
    { id: 'eco-desert', icon: '\u{1F3DC}\uFE0F', label: 'Deserts' },
    { id: 'eco-coral', icon: '\u{1FAB8}', label: 'Coral Reefs' },
    { id: 'eco-deep-ocean', icon: '\u{1F30A}', label: 'Deep Ocean' },
    { id: 'eco-connections', icon: '\u{1F30E}', label: 'Connections' },
  ],
  sections: [
    // --- Section 1: Rainforest ---
    {
      id: 'eco-rainforest',
      icon: '\u{1F333}',
      title: 'The Tropical Rainforest -- Earth\'s Green Engine',
      readAloudBlocks: [
        {
          id: 'rainforest-intro',
          paragraphs: [
            'Imagine standing on the forest floor of the Amazon Rainforest. It is dark down here -- only about 2% of the sunlight that hits the canopy above actually reaches the ground. The air is thick with moisture, and the temperature hovers around 27 degrees Celsius (80 degrees Fahrenheit) year-round. You can hear the screech of howler monkeys echoing from somewhere high above, the buzzing of thousands of insect species, and the constant drip-drip of water falling from leaf to leaf. You are standing in the most biodiverse place on Earth.',
            'Tropical rainforests cover only about 6% of the Earth\'s land surface, yet they contain more than half of all known plant and animal species. The Amazon alone spans 5.5 million square kilometers across nine South American countries and contains roughly 10% of all species on the planet.',
          ],
        },
        {
          id: 'rainforest-layers',
          paragraphs: [
            'Rainforests are organized into four distinct vertical layers. The emergent layer is the roof of the forest, where the tallest trees punch through the main canopy and reach heights of 45-60 meters. Harpy eagles, macaws, and butterflies live up here. Below that is the canopy layer, a dense ceiling of interlocking branches and leaves about 25-35 meters high. This is where 70-90% of all species live. Toucans, sloths, tree frogs, and epiphytic orchids make their homes here. Below the canopy is the understory, a dim, humid layer of shorter trees, palms, and giant ferns. Finally, the forest floor is almost completely dark, carpeted with decomposing leaves.',
            'The Amazon Rainforest produces about 20% of the world\'s oxygen through photosynthesis and absorbs massive amounts of carbon dioxide. Its most important role is as a carbon sink -- storing an estimated 150-200 billion tons of carbon in its trees and soil. When the rainforest is burned or cut down, that stored carbon is released as CO2. As of 2022, approximately 17% of the Amazon has been deforested, and scientists warn that a "tipping point" may exist around 20-25%.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F30E}',
          name: 'Alexander von Humboldt',
          title: 'Naturalist & Explorer (1769\u20131859)',
          description:
            'Prussian naturalist who was the first to describe how climate, plants, and geography are all interconnected. He essentially invented the concept of ecosystems and biogeography. He traveled across South America documenting everything from jungle canopy layers to volcanic soils.',
        },
      ],
      funFacts: [
        {
          title: 'More Trees Than Continents',
          text: 'A single hectare (about 2.5 acres) of Amazon Rainforest can contain over 400 different tree species. For comparison, the entire continent of North America north of Mexico has only about 620 native tree species total.',
        },
      ],
      videos: [
        {
          youtubeId: 'Qxby1J5bnPQ',
          title: 'Is the Amazon Rainforest disappearing? - Anna Rothschild',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'KQF9WdZrH_c',
          title: 'What Are Ecosystems? Crash Course Geography #15',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['eco-q1', 'eco-q2'],
    },

    // --- Section 2: Tundra ---
    {
      id: 'eco-tundra',
      icon: '\u2744\uFE0F',
      title: 'The Tundra -- Life on the Frozen Edge',
      readAloudBlocks: [
        {
          id: 'tundra-intro',
          paragraphs: [
            'Now travel with us to the complete opposite of the rainforest. The Arctic tundra stretches across the northernmost parts of Alaska, Canada, Russia, Greenland, Iceland, and Scandinavia -- a vast, treeless landscape where winter temperatures drop to minus 40 degrees Celsius. The sun disappears entirely for weeks during winter, then refuses to set during the summer months.',
            'Beneath the tundra\'s surface lies permafrost -- soil that has been continuously frozen for at least two consecutive years, and in many places for thousands or even hundreds of thousands of years. In Siberia, some permafrost is over 700 meters deep and has been frozen for over 650,000 years. The permafrost creates a hard, impenetrable layer that prevents tree roots from growing deep enough to support large trees. That is why the tundra is treeless.',
          ],
        },
        {
          id: 'tundra-animals',
          paragraphs: [
            'Animals that live in the tundra year-round have remarkable adaptations. The Arctic fox changes its fur from brown in summer to pure white in winter for camouflage. Musk oxen have a double layer of fur: a coarse outer layer that reaches nearly to the ground and a fine inner layer called qiviut that is eight times warmer than sheep\'s wool. Caribou have hollow hairs that trap air for insulation and wide, flat hooves that work like snowshoes.',
            'Migratory species flood into the tundra during summer. Over 100 species of birds travel thousands of kilometers to breed in the tundra, taking advantage of the endless daylight and massive insect hatches. The Arctic tern holds the record for the longest migration of any animal: it flies from the Arctic to the Antarctic and back every year, a round trip of roughly 70,000 kilometers.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'The Permafrost Carbon Bomb',
          text: 'Permafrost contains an estimated 1,500 billion tons of carbon -- roughly twice the amount of carbon currently in the Earth\'s atmosphere. As global temperatures rise and permafrost thaws, this carbon is released as CO2 and methane, potentially creating a dangerous feedback loop that accelerates climate change.',
        },
      ],
      videos: [],
      quizIds: ['eco-q3', 'eco-q4'],
    },

    // --- Section 3: Deserts ---
    {
      id: 'eco-desert',
      icon: '\u{1F3DC}\uFE0F',
      title: 'Deserts -- Hot, Cold, and Surprisingly Full of Life',
      readAloudBlocks: [
        {
          id: 'desert-intro',
          paragraphs: [
            'When you hear the word "desert," you probably picture sand dunes, scorching heat, and camels. But here is a fact that surprises most people: the largest desert on Earth is not the Sahara. It is Antarctica. A desert is defined not by heat, but by precipitation -- any area that receives less than 250 millimeters of rain or snow per year qualifies. The Sahara, at about 9.2 million square kilometers, is the largest hot desert.',
            'The Sahara stretches across 11 countries in North Africa. Daytime temperatures can soar above 50 degrees Celsius, while nighttime temperatures can plummet to near freezing. This extreme temperature swing -- sometimes 30-40 degrees in a single day -- is caused by the dry air\'s inability to hold heat.',
          ],
        },
        {
          id: 'desert-adaptations',
          paragraphs: [
            'Life in hot deserts has evolved extraordinary adaptations. The fennec fox has enormous ears that radiate excess body heat. The thorny devil lizard of Australia has skin covered in tiny channels that funnel morning dew straight to its mouth. The Namibian fog-basking beetle does headstands on sand dunes at dawn, letting fog condense on its back and trickle down into its mouth. Camels do not actually store water in their humps -- they store fat, which provides energy.',
            'Desert plants are equally inventive. The saguaro cactus can grow over 12 meters tall and store up to 760 liters of water after a single rainstorm. Its pleated skin expands like an accordion to hold the water. Creosote bushes release chemicals into the soil around them that prevent competing plants from germinating nearby -- essentially claiming territory through chemical warfare.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Camel Hump Myth',
          text: 'Camels do NOT store water in their humps. The humps contain fat -- up to 36 kilograms of it -- which the camel metabolizes for energy when food is scarce. A camel can drink up to 113 liters (30 gallons) of water in about 13 minutes when it finally reaches a water source, storing the water in its bloodstream and body tissues.',
        },
      ],
      videos: [],
      quizIds: ['eco-q5', 'eco-q6'],
    },

    // --- Section 4: Coral Reefs ---
    {
      id: 'eco-coral',
      icon: '\u{1FAB8}',
      title: 'Coral Reefs -- Underwater Cities of the Sea',
      readAloudBlocks: [
        {
          id: 'coral-intro',
          paragraphs: [
            'Dive below the surface of a warm, tropical ocean and you will discover a world of staggering color and complexity. Coral reefs are sometimes called the "rainforests of the sea," and for good reason: although they cover less than 0.1% of the ocean floor, they support about 25% of all marine species.',
            'But here is the twist -- corals are not rocks, and they are not plants. They are animals. Each coral is a colony of thousands of tiny creatures called polyps, each no bigger than a pinhead. A polyp is essentially a tiny soft-bodied animal with a mouth surrounded by stinging tentacles (they are relatives of jellyfish). The polyps secrete hard calcium carbonate skeletons around themselves, and over thousands of years, these skeletons build up into massive reef structures. The Great Barrier Reef in Australia stretches over 2,300 kilometers and can be seen from space.',
          ],
        },
        {
          id: 'coral-bleaching',
          paragraphs: [
            'Most reef-building corals have a secret weapon: a symbiotic relationship with microscopic algae called zooxanthellae that live inside the coral\'s tissue. The algae use photosynthesis to provide up to 90% of the coral\'s energy needs. This partnership is what gives coral its beautiful colors.',
            'When ocean water gets too warm (even just 1-2 degrees Celsius above normal), the coral becomes stressed and expels its zooxanthellae. Without the algae, the coral turns ghostly white -- a phenomenon called coral bleaching. If temperatures return to normal quickly, the coral recovers. But if the heat stress continues for weeks, the coral dies. Scientists estimate that half of the Great Barrier Reef\'s coral cover has been lost since the 1990s.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F30A}',
          name: 'Sylvia Earle',
          title: 'Marine Biologist & Oceanographer (Born 1935)',
          description:
            'American marine biologist nicknamed "Her Deepness." She has led over 100 expeditions, logged more than 7,000 hours underwater, and held the record for the deepest solo dive (381 meters). She is a leading advocate for ocean conservation.',
        },
      ],
      funFacts: [
        {
          title: 'Centuries to Build, Weeks to Destroy',
          text: 'Coral reefs grow incredibly slowly -- most species add only 0.3 to 2 centimeters per year. The Great Barrier Reef took roughly half a million years to build. A single bleaching event can destroy in weeks what took centuries to grow.',
        },
      ],
      videos: [
        {
          youtubeId: 'TPmlD6demPk',
          title: 'Conserving our spectacular, vulnerable coral reefs - Joshua Drew',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'WihqHrR7XLw',
          title: 'The Hidden World of Coral Reefs',
          channelName: 'SciShow',
        },
      ],
      quizIds: ['eco-q7', 'eco-q8'],
    },

    // --- Section 5: Deep Ocean ---
    {
      id: 'eco-deep-ocean',
      icon: '\u{1F30A}',
      title: 'The Deep Ocean -- Life Without Sunlight',
      readAloudBlocks: [
        {
          id: 'deep-intro',
          paragraphs: [
            'Below about 1,000 meters, the ocean is completely dark. No sunlight penetrates this deep. The water is near-freezing, hovering around 1-4 degrees Celsius. The pressure is crushing. For centuries, scientists assumed nothing could live in these conditions. They were spectacularly wrong.',
            'In 1977, researchers aboard the submersible Alvin discovered hydrothermal vents -- cracks in the ocean floor where superheated water (up to 400 degrees Celsius) erupts from the Earth\'s interior, laden with dissolved minerals. The hot water creates billowing plumes of dark, mineral-rich fluid called "black smokers." Clustered around these vents, they found thriving ecosystems: giant tube worms up to 2 meters long, massive colonies of white clams, dense mats of shrimp, and bizarre fish. None of these organisms depend on sunlight.',
          ],
        },
        {
          id: 'deep-life',
          paragraphs: [
            'Instead, the base of the food chain is chemosynthetic bacteria -- microbes that convert hydrogen sulfide into energy through chemosynthesis. This was the first time scientists had found a complex ecosystem powered entirely by chemical energy from the Earth\'s interior, not by the sun.',
            'The deep ocean also hosts bioluminescent creatures -- animals that produce their own light through chemical reactions. Below 200 meters, roughly 90% of all organisms are bioluminescent. Anglerfish dangle glowing lures to attract prey. Lanternfish use patterns of light organs to communicate. The vampire squid turns itself inside out when threatened, exposing bioluminescent spots on its arms.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'The Last Frontier',
          text: 'Scientists estimate that we have explored less than 5% of the ocean floor. Every time a submersible dives to a new hydrothermal vent field, researchers discover species that have never been seen before. In 2023, scientists found over 100 new species on a single expedition to a deep-sea ridge in the eastern Pacific.',
        },
      ],
      videos: [],
      quizIds: ['eco-q9', 'eco-q10'],
    },

    // --- Section 6: How Ecosystems Are Connected ---
    {
      id: 'eco-connections',
      icon: '\u{1F30E}',
      title: 'How Ecosystems Are Connected',
      readAloudBlocks: [
        {
          id: 'connections-intro',
          paragraphs: [
            'Here is the mind-bending part: none of these ecosystems exist in isolation. They are all connected through global cycles of water, carbon, and energy that link the deepest ocean vent to the highest rainforest canopy.',
            'The Amazon Rainforest generates enormous amounts of water vapor through transpiration. A single large tree can transpire over 1,000 liters of water per day. The collective transpiration creates "flying rivers" -- masses of airborne water vapor that travel across South America, seeding clouds and generating rainfall as far south as Buenos Aires. If the Amazon is destroyed, rainfall patterns across the continent shift.',
          ],
        },
        {
          id: 'connections-global',
          paragraphs: [
            'Coral reefs protect coastlines from storms, but they depend on clean water flowing from the land. When forests upstream are cut down, soil erodes into rivers and washes into the ocean, smothering reefs with sediment. Deforestation in one country can kill coral reefs in another.',
            'The tundra\'s permafrost holds 1,500 billion tons of carbon. As the Arctic warms, permafrost thaws, releasing CO2 and methane. These greenhouse gases warm the atmosphere further, which melts more permafrost -- a feedback loop that connects the frozen tundra to climate patterns everywhere on Earth.',
            'Even the deep ocean is connected. The "ocean conveyor belt" (thermohaline circulation) moves cold, dense water from the poles along the ocean floor toward the tropics, carrying nutrients from the deep that fuel plankton growth near the surface. These plankton produce roughly 50% of the world\'s oxygen -- making the ocean, not the rainforest, the planet\'s true "lungs."',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4DA}',
          name: 'Rachel Carson',
          title: 'Marine Biologist & Author (1907\u20131964)',
          description:
            'American marine biologist and author of "Silent Spring" (1962), a groundbreaking book that documented the environmental damage caused by pesticides. Her work led to the creation of the U.S. Environmental Protection Agency and a nationwide ban on DDT.',
        },
      ],
      funFacts: [
        {
          title: 'Desert Feeds Rainforest',
          text: 'The Amazon Rainforest gets a significant portion of its mineral nutrients from the Sahara Desert. Every year, an estimated 27.7 million tons of Saharan dust are blown across the Atlantic Ocean. The dust contains phosphorus, a critical nutrient for plant growth that is scarce in Amazonian soils. The world\'s largest desert literally fertilizes the world\'s largest rainforest -- from 5,000 kilometers away.',
        },
      ],
      videos: [],
      quizIds: ['eco-q11', 'eco-q12'],
    },
  ],

  // --- Quizzes ---
  quizzes: [
    {
      id: 'eco-q1',
      sectionId: 'eco-rainforest',
      title: 'Rainforest Basics!',
      question: 'About what percentage of Earth\'s land surface do tropical rainforests cover?',
      options: [
        { text: '30%', isCorrect: false },
        { text: '6%', isCorrect: true },
        { text: '50%', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q2',
      sectionId: 'eco-rainforest',
      title: 'Forest Layers!',
      question: 'Which layer of the rainforest is home to 70-90% of all rainforest species?',
      options: [
        { text: 'The forest floor', isCorrect: false },
        { text: 'The canopy layer', isCorrect: true },
        { text: 'The emergent layer', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q3',
      sectionId: 'eco-tundra',
      title: 'Frozen Ground!',
      question: 'What is permafrost?',
      options: [
        { text: 'A type of ice cream found only in the Arctic', isCorrect: false },
        { text: 'Soil that has been continuously frozen for at least two years', isCorrect: true },
        { text: 'A special kind of rock found in mountains', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q4',
      sectionId: 'eco-tundra',
      title: 'Treeless Zone!',
      question: 'Why can\'t trees grow in the tundra?',
      options: [
        { text: 'There is too much sunlight', isCorrect: false },
        { text: 'Permafrost prevents roots from growing deep enough', isCorrect: true },
        { text: 'Animals eat all the seedlings', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q5',
      sectionId: 'eco-desert',
      title: 'Desert Surprise!',
      question: 'What is the largest desert on Earth?',
      options: [
        { text: 'The Sahara', isCorrect: false },
        { text: 'The Gobi', isCorrect: false },
        { text: 'Antarctica', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q6',
      sectionId: 'eco-desert',
      title: 'Camel Myth!',
      question: 'Do camels store water in their humps?',
      options: [
        { text: 'Yes, that is how they survive', isCorrect: false },
        { text: 'No, the humps store fat for energy', isCorrect: true },
        { text: 'Yes, but only during summer', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q7',
      sectionId: 'eco-coral',
      title: 'Coral Quiz!',
      question: 'What are corals -- rocks, plants, or animals?',
      options: [
        { text: 'Rocks', isCorrect: false },
        { text: 'Plants', isCorrect: false },
        { text: 'Animals', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q8',
      sectionId: 'eco-coral',
      title: 'Bleaching Alert!',
      question: 'What is coral bleaching?',
      options: [
        { text: 'When coral gets painted white by humans', isCorrect: false },
        { text: 'When stressed coral expels its symbiotic algae and turns white', isCorrect: true },
        { text: 'When coral grows faster than usual', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q9',
      sectionId: 'eco-deep-ocean',
      title: 'Deep Sea Discovery!',
      question: 'What are hydrothermal vents?',
      options: [
        { text: 'Underwater volcanoes that shoot lava', isCorrect: false },
        { text: 'Cracks in the ocean floor where superheated, mineral-rich water erupts', isCorrect: true },
        { text: 'Air vents on submarines', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q10',
      sectionId: 'eco-deep-ocean',
      title: 'No Sunlight Needed!',
      question: 'How do organisms near hydrothermal vents get their energy if there is no sunlight?',
      options: [
        { text: 'They eat sunlight stored in rocks', isCorrect: false },
        { text: 'Chemosynthetic bacteria convert chemicals from the vent water into energy', isCorrect: true },
        { text: 'They do not need energy because it is so cold', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q11',
      sectionId: 'eco-connections',
      title: 'Flying Rivers!',
      question: 'What are "flying rivers" in the Amazon?',
      options: [
        { text: 'Rivers that flow uphill', isCorrect: false },
        { text: 'Masses of water vapor released by trees that create clouds and rainfall far away', isCorrect: true },
        { text: 'Flocks of birds that follow river paths', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'eco-q12',
      sectionId: 'eco-connections',
      title: 'Ocean Oxygen!',
      question: 'Roughly what percentage of the world\'s oxygen is produced by ocean plankton?',
      options: [
        { text: '5%', isCorrect: false },
        { text: '50%', isCorrect: true },
        { text: '95%', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // --- Essay ---
  essay: {
    id: 'eco-essay',
    prompt:
      'Choose two ecosystems you learned about and explain how they are connected to each other, even though they might be on opposite sides of the planet.',
    description:
      'Use specific examples -- like the Saharan dust that fertilizes the Amazon, or the permafrost carbon that warms the oceans. Why does this interconnectedness matter when we think about protecting the environment? Write at least 100 characters to unlock the reward.',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Excellent systems thinking! You understand how Earth\'s ecosystems are all connected.',
  },

  // --- Reward ---
  reward: {
    id: 'eco-reward',
    title: 'Ecosystem Builder',
    description:
      'Build and balance living ecosystems! Place organisms into the correct biome and watch the food web come alive across 3 different ecosystems.',
    lockMessage: 'Complete all quizzes and write your essay to build your ecosystems!',
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
    type: 'ecosystem-builder',
    celebrationMessage: 'Time to build some ecosystems! Place organisms and watch the food web grow!',
  },

  // --- Conclusion ---
  conclusion: {
    title: 'Earth\'s Living Networks: Connected Everywhere',
    paragraphs: [
      'You have traveled from the towering emergent trees of the Amazon to the frozen plains of the Arctic tundra, from the scorching sands of the Sahara to the vibrant underwater cities of coral reefs, and all the way down to the crushing darkness of hydrothermal vents on the ocean floor.',
      'The rainforest taught you about layers -- how the same patch of ground supports entirely different communities of life at different heights. The tundra showed you how life finds a way even in the most extreme cold. The desert revealed that heat and dryness are not obstacles to life but challenges that evolution meets with stunningly creative solutions.',
      'Most importantly, you discovered that no ecosystem is an island. Saharan dust feeds the Amazon. Amazon moisture generates rainfall across a continent. Tundra permafrost affects global temperatures. Ocean currents carry deep-sea nutrients to surface plankton that produce half the world\'s oxygen. Pull one thread, and the whole tapestry shifts.',
      'Understanding these connections is not just academic -- it is survival knowledge. Every decision humans make about forests, oceans, ice caps, and deserts ripples through this web. Now that you understand how these systems work, you are better equipped than most adults to ask the right questions about the world around you.',
    ],
  },
};
