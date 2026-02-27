import type { Topic } from '../types';

export const womenInScience: Topic = {
  id: 'women-in-science',
  slug: 'women-in-science',
  title: 'Women in Science',
  subtitle: 'From Ancient to Modern Times',
  status: 'active',
  themeId: 'science',
  heroIcons: ['\u{1F52C}', '\u{1F469}\u200D\u{1F52C}', '\u269B\uFE0F'],
  navItems: [
    { id: 'ws-hypatia', icon: '\u{1F3DB}\uFE0F', label: 'Hypatia' },
    { id: 'ws-wang-zhenyi', icon: '\u{1F319}', label: 'Wang Zhenyi' },
    { id: 'ws-curie', icon: '\u2622\uFE0F', label: 'Marie Curie' },
    { id: 'ws-franklin', icon: '\u{1F9EC}', label: 'Franklin & Lamarr' },
    { id: 'ws-johnson', icon: '\u{1F680}', label: 'Johnson & Jemison' },
    { id: 'ws-tu-youyou', icon: '\u{1F33F}', label: 'Tu Youyou' },
  ],
  sections: [
    // --- Section 1: Hypatia ---
    {
      id: 'ws-hypatia',
      icon: '\u{1F3DB}\uFE0F',
      title: 'The First Scientist We Know By Name -- Hypatia of Alexandria',
      readAloudBlocks: [
        {
          id: 'hypatia-intro',
          paragraphs: [
            'Imagine living in ancient Alexandria, Egypt, around 400 CE. The city is one of the most important centers of learning in the entire world, home to the legendary Great Library and scholars from across the Roman Empire. Walking through the marble colonnades of the city\'s academy, you would find one of the most remarkable people in the ancient world: Hypatia. She was a mathematician, an astronomer, a philosopher, and a teacher. And in a world almost entirely controlled by men, she rose to become the head of her city\'s Neoplatonist school of philosophy -- arguably the most prestigious intellectual position in Alexandria.',
            'Hypatia was born around 355 CE. Her father, Theon, was himself a famous mathematician and astronomer at the Museum of Alexandria. Unlike most girls of her era, Hypatia received a rigorous education in mathematics, astronomy, and philosophy. She surpassed her father in all three fields. She wrote commentaries on advanced mathematical texts, including the works of Diophantus (the "father of algebra") and Apollonius of Perga (who wrote about conic sections). She also improved the designs of scientific instruments: the astrolabe (a device for calculating the position of stars and planets) and the hydrometer (a device for measuring the density of liquids).',
          ],
        },
        {
          id: 'hypatia-legacy',
          paragraphs: [
            'What made Hypatia truly extraordinary was her influence. She was an advisor to Orestes, the Roman governor of Alexandria, and her lectures attracted students from across the Mediterranean -- pagans, Christians, and Jews alike. She taught that knowledge should be open to all, regardless of religion or background. But Alexandria in the early 400s CE was a city torn apart by political and religious conflict. In 415 CE, during a power struggle between Orestes and the Bishop Cyril, a mob dragged Hypatia from her chariot and murdered her. She was about 60 years old.',
            'Hypatia\'s death did not erase her legacy. She became a lasting symbol of intellectual courage and the pursuit of knowledge against all odds. In 1994, the International Astronomical Union named a lunar crater after her. She remains one of the most important figures in the history of women in science.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Hypatia of Alexandria',
          title: 'Mathematician, Astronomer & Philosopher (c. 355\u2013415 CE)',
          description:
            'One of the first known female mathematicians and astronomers. She taught philosophy, mathematics, and astronomy in ancient Alexandria, Egypt. She was murdered by a mob in 415 CE, likely due to political conflicts. Her death is often seen as a symbol of the suppression of intellectual freedom.',
        },
      ],
      funFacts: [
        {
          title: 'Star Navigator',
          text: 'Hypatia is often credited with improving the astrolabe, a handheld device used for over 1,500 years to navigate by the stars. Some historians believe she also invented a device for distilling water and another for measuring water levels. Not bad for the 4th century.',
        },
      ],
      videos: [
        {
          youtubeId: 'n1mwZrVJ-TI',
          title: 'The murder of ancient Alexandria\'s greatest scholar - Soraya Field Fiorio',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['ws-q1', 'ws-q2'],
    },

    // --- Section 2: Wang Zhenyi ---
    {
      id: 'ws-wang-zhenyi',
      icon: '\u{1F319}',
      title: 'Wang Zhenyi -- The Astronomer Who Defied Her Era',
      readAloudBlocks: [
        {
          id: 'wang-intro',
          paragraphs: [
            'In 18th-century China, during the Qing Dynasty, girls were expected to learn embroidery, not equations. Women were not allowed to take the civil service exams, and formal education was largely closed to them. Into this world was born Wang Zhenyi in 1768, a woman who would become one of the most remarkable self-taught scientists in Chinese history.',
            'Wang Zhenyi came from a scholarly family. Her grandfather had a library of over 75 volumes, and young Zhenyi devoured them all -- astronomy, mathematics, geography, medicine. She taught herself from these texts and from scholars she encountered during her family\'s travels. By her teenage years, she was writing her own treatises on mathematics and astronomy. She wrote a simplified explanation of the Pythagorean theorem that made it accessible to ordinary readers.',
          ],
        },
        {
          id: 'wang-work',
          paragraphs: [
            'She studied the movements of the planets and wrote a detailed article called "The Explanation of a Lunar Eclipse," in which she set up a brilliant experiment in her garden shed: she placed a round table as the earth, a lamp on a cord as the sun, and a round mirror as the moon, then moved them to demonstrate exactly how lunar eclipses work.',
            'Wang Zhenyi also challenged the widespread belief that celestial events were caused by the anger of the gods. She wrote clearly and firmly that eclipses, equinoxes, and the movements of stars were governed by natural laws, not divine punishment. In a poem, she wrote: "It\'s made to believe women are the same as men; are you not convinced daughters can also be heroic?" She published articles on weather, the movement of the stars, and mathematics -- all before she died at the tragically young age of 29 in 1797.',
            'Most of her works were lost after her death, and for over two centuries she was largely forgotten outside of Chinese scholarship. But in 2004, the International Astronomical Union named a crater on Venus after her -- a fitting tribute to a woman who spent her short life reaching for the stars.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F319}',
          name: 'Wang Zhenyi',
          title: 'Self-Taught Astronomer & Mathematician (1768\u20131797)',
          description:
            'A remarkable self-taught Chinese scientist who wrote about astronomy, mathematics, and weather during the Qing Dynasty. She demonstrated lunar eclipses using a lamp, mirror, and table, and boldly argued that celestial events followed natural laws, not divine will.',
          extraTag: 'Venus crater named after her',
        },
      ],
      funFacts: [
        {
          title: 'An Independent Spirit',
          text: 'Wang Zhenyi once wrote that she wanted to "travel the China seas in a China ship," even though women of her era almost never traveled independently. Her family was unusually supportive -- her grandmother taught her poetry, her grandfather shared his library, and her father taught her astronomy and mathematics.',
        },
      ],
      videos: [],
      quizIds: ['ws-q3'],
    },

    // --- Section 3: Marie Curie ---
    {
      id: 'ws-curie',
      icon: '\u2622\uFE0F',
      title: 'Marie Curie -- The Woman Who Glowed in the Dark',
      readAloudBlocks: [
        {
          id: 'curie-intro',
          paragraphs: [
            'Marie Sklodowska was born in Warsaw, Poland, in 1867, at a time when Poland was under Russian occupation and universities did not admit women. She attended a secret underground university in Warsaw, then saved up money working as a governess to move to Paris, where she enrolled at the Sorbonne in 1891. She was one of only 23 women among 1,825 students in the Faculty of Sciences. She studied in an unheated attic, sometimes too poor to buy food, and still graduated first in her physics degree.',
            'In Paris, Marie met Pierre Curie, a physicist who shared her passion for science. They married in 1895 and began one of the most famous scientific partnerships in history. Marie became fascinated by a strange phenomenon discovered by Henri Becquerel: certain uranium salts emitted mysterious rays that could expose photographic plates, even in the dark. She coined the term "radioactivity" to describe this phenomenon.',
          ],
        },
        {
          id: 'curie-discovery',
          paragraphs: [
            'Working in a cramped, leaky shed that served as their laboratory, the Curies processed literally tons of a mineral called pitchblende -- crushing, dissolving, filtering, and crystallizing it over and over for four years. Marie discovered two entirely new elements: polonium (named after her homeland, Poland) and radium (from the Latin word for "ray"). Radium was so intensely radioactive that it glowed blue in the dark.',
            'In 1903, Marie and Pierre Curie, along with Henri Becquerel, won the Nobel Prize in Physics. Marie was the first woman to ever win a Nobel Prize. In 1911, she won a second Nobel Prize, this time in Chemistry, for her work isolating pure radium. She remains the only person in history to win Nobel Prizes in two different sciences. During World War I, she developed mobile X-ray units called "petites Curies" that helped battlefield surgeons locate bullets and broken bones, saving countless soldiers\' lives.',
            'Marie Curie died on July 4, 1934, from aplastic anemia caused by her years of radiation exposure. Her notebooks are still so radioactive that they must be stored in lead-lined boxes, and anyone who wants to read them must wear protective clothing.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u2622\uFE0F',
          name: 'Marie Curie',
          title: 'Physicist & Chemist (1867\u20131934)',
          description:
            'Polish-French physicist and chemist who became the first woman to win a Nobel Prize, the first person to win two Nobel Prizes, and the only person ever to win Nobel Prizes in two different sciences (Physics 1903, Chemistry 1911). She discovered the elements polonium and radium and pioneered research on radioactivity.',
          extraTag: 'Only person to win Nobels in 2 different sciences',
        },
      ],
      funFacts: [
        {
          title: 'Radioactive Notebooks',
          text: 'Marie Curie\'s personal belongings -- including her notebooks, furniture, and even her cookbook -- are still dangerously radioactive more than 90 years after her death. They are kept in lead-lined boxes at France\'s national library. Researchers who want to study them must sign a waiver and wear protective gear. The radioactive contamination will persist for another 1,500 years.',
        },
      ],
      videos: [
        {
          youtubeId: 'w6JFRi0Qm_s',
          title: 'The genius of Marie Curie - Shohini Ghose',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['ws-q4', 'ws-q5'],
    },

    // --- Section 4: Rosalind Franklin & Hedy Lamarr ---
    {
      id: 'ws-franklin',
      icon: '\u{1F9EC}',
      title: 'Rosalind Franklin and the Stolen Photo -- Plus Hedy Lamarr\'s Secret Invention',
      readAloudBlocks: [
        {
          id: 'franklin-intro',
          paragraphs: [
            'In the early 1950s, scientists were racing to figure out the structure of DNA -- the molecule that carries the instructions for building every living thing on Earth. At King\'s College London, a chemist named Rosalind Franklin used a technique called X-ray crystallography to take the sharpest images of DNA ever produced. Her most famous image, known as "Photo 51," was a fuzzy X-pattern that, to a trained eye, revealed critical information about DNA\'s shape.',
            'Without Franklin\'s knowledge or consent, her colleague Maurice Wilkins showed Photo 51 to James Watson, a young American scientist working at Cambridge with Francis Crick. Using the measurements from Franklin\'s image -- and her other unpublished data -- Watson and Crick built their famous double-helix model of DNA in 1953. They published their groundbreaking paper in the journal Nature, with only a vague footnote acknowledging Franklin and Wilkins\' unpublished work. In 1962, Watson, Crick, and Wilkins received the Nobel Prize for the discovery. Rosalind Franklin received nothing. She had died of ovarian cancer in 1958, at just 37 years old.',
          ],
        },
        {
          id: 'lamarr-intro',
          paragraphs: [
            'Meanwhile, across the Atlantic, another woman\'s contributions were being overlooked in a completely different field. Hedy Lamarr was one of the most famous movie stars in Hollywood during the 1930s and 1940s. What almost nobody knew was that she was also an inventor. During World War II, Lamarr and composer George Antheil developed a radio guidance system for Allied torpedoes that used "frequency hopping" -- rapidly switching the radio signal between different frequencies to prevent the enemy from jamming it.',
            'They received a patent for the technology in 1942, but the U.S. Navy dismissed the idea. Decades later, this same frequency-hopping concept became the foundation for modern wireless technologies including Bluetooth, GPS, and early Wi-Fi. Lamarr received almost no recognition during her lifetime. In 2014, she was posthumously inducted into the National Inventors Hall of Fame.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F9EC}',
          name: 'Rosalind Franklin',
          title: 'Chemist & X-ray Crystallographer (1920\u20131958)',
          description:
            'British chemist whose "Photo 51" -- an X-ray diffraction image of DNA -- was the critical evidence that revealed DNA\'s double-helix structure. Watson and Crick used her data without her knowledge to build their famous model. She died of ovarian cancer at age 37, likely from radiation exposure during her research.',
          extraTag: 'Photo 51 took 62 hours of X-ray exposure',
        },
        {
          emoji: '\u{1F3AC}',
          name: 'Hedy Lamarr',
          title: 'Actress & Inventor (1914\u20132000)',
          description:
            'Hollywood star who co-invented frequency-hopping spread spectrum technology during WWII. The Navy dismissed her patent, but her concept became the foundation for Bluetooth, GPS, and Wi-Fi. Posthumously inducted into the National Inventors Hall of Fame in 2014.',
          extraTag: 'Invented the basis for Bluetooth & Wi-Fi',
        },
      ],
      funFacts: [
        {
          title: '62 Hours of X-Rays',
          text: 'Rosalind Franklin\'s "Photo 51" took over 62 hours of X-ray exposure to produce. She painstakingly prepared the DNA fiber, kept it at precisely the right humidity level, and aimed the X-ray beam with extreme precision. The resulting image is now considered one of the most important photographs in the history of science.',
        },
      ],
      videos: [
        {
          youtubeId: 'BIP0lYrdirI',
          title: 'Rosalind Franklin: DNA\'s unsung hero - Claudio L. Guerra',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['ws-q6', 'ws-q7'],
    },

    // --- Section 5: Katherine Johnson & Mae Jemison ---
    {
      id: 'ws-johnson',
      icon: '\u{1F680}',
      title: 'Katherine Johnson and Mae Jemison -- Breaking Barriers at NASA',
      readAloudBlocks: [
        {
          id: 'johnson-intro',
          paragraphs: [
            'In the 1950s and 1960s, NASA relied on human computers -- people (mostly women) who performed complex mathematical calculations by hand. Among them was Katherine Johnson, a Black woman from West Virginia who was so brilliant at math that she started high school at age 10 and graduated from college at 18 with degrees in mathematics and French. When she joined NASA\'s predecessor (NACA) in 1953, she was assigned to the "West Computing" group -- a segregated unit of Black female mathematicians forced to use separate bathrooms, dining areas, and office spaces due to Jim Crow laws.',
            'Johnson\'s calculations were so precise and reliable that astronaut John Glenn, before his historic 1962 orbital flight, refused to trust the electronic computers NASA had just installed. He asked mission controllers to "get the girl" -- meaning Katherine Johnson -- to check the computer\'s numbers by hand. She verified the orbital trajectory calculations, and Glenn felt confident enough to fly. Her calculations helped put the first American in orbit and later helped plan the trajectory for the Apollo 11 mission that landed humans on the Moon in 1969.',
          ],
        },
        {
          id: 'jemison-intro',
          paragraphs: [
            'For decades, Johnson\'s contributions were largely unknown to the public. The 2016 book and film "Hidden Figures" by Margot Lee Shetterly finally told the story of Johnson and her colleagues Dorothy Vaughan and Mary Jackson, revealing how Black women mathematicians were essential to America\'s space program. In 2015, President Barack Obama awarded Katherine Johnson the Presidential Medal of Freedom. She lived to be 101 years old, passing away in February 2020.',
            'Mae Jemison continued breaking barriers at NASA. Born in 1956 in Decatur, Alabama, Jemison earned a degree in chemical engineering from Stanford and a medical degree from Cornell. In 1987, she was selected as a NASA astronaut, and on September 12, 1992, she flew aboard the Space Shuttle Endeavour, becoming the first Black woman to travel to space. After leaving NASA, Jemison founded the 100 Year Starship project, whose goal is to make interstellar travel possible within 100 years.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F680}',
          name: 'Katherine Johnson',
          title: 'NASA Mathematician (1918\u20132020)',
          description:
            'A Black mathematician from West Virginia whose calculations were essential to America\'s space program. Astronaut John Glenn trusted her math more than NASA\'s new electronic computers. She helped calculate orbital trajectories for the first American in orbit and for the Apollo 11 Moon landing.',
          extraTag: 'Presidential Medal of Freedom, 2015',
        },
        {
          emoji: '\u{1F469}\u200D\u{1F680}',
          name: 'Mae Jemison',
          title: 'Astronaut, Engineer & Physician (Born 1956)',
          description:
            'The first Black woman to travel to space, flying aboard Space Shuttle Endeavour in 1992. She holds degrees in chemical engineering and medicine, and founded the 100 Year Starship project to pursue interstellar travel.',
          extraTag: 'First Black woman in space',
        },
      ],
      funFacts: [
        {
          title: 'Pencil, Slide Rule, Genius',
          text: 'Katherine Johnson calculated the launch window for Alan Shepard\'s 1961 Freedom 7 mission -- America\'s first human spaceflight -- using only a pencil, a slide rule, and her extraordinary mathematical mind. The flight path she computed was a complex parabolic trajectory that required accounting for the Earth\'s rotation, gravitational forces, and the capsule\'s speed.',
        },
      ],
      videos: [],
      quizIds: ['ws-q8', 'ws-q9'],
    },

    // --- Section 6: Tu Youyou ---
    {
      id: 'ws-tu-youyou',
      icon: '\u{1F33F}',
      title: 'Tu Youyou -- Ancient Medicine Meets Modern Science',
      readAloudBlocks: [
        {
          id: 'tu-intro',
          paragraphs: [
            'In the late 1960s, during the Vietnam War, malaria was killing more soldiers than combat. In 1969, the Chinese government launched a secret military project called "Project 523" to find new malaria treatments, and they put a quiet, determined pharmaceutical chemist named Tu Youyou in charge of one of the research groups.',
            'Tu Youyou\'s approach was unique: she decided to search through ancient Chinese medical texts for clues. Her team screened over 2,000 traditional recipes and tested 380 herbal extracts on malaria-infected mice. One plant kept showing up in the ancient texts -- sweet wormwood (Artemisia annua), called "qinghao" in Chinese. Ancient physicians had used it to treat fevers for over 1,600 years. But when Tu Youyou\'s team prepared extracts using standard boiling methods, the results were inconsistent.',
          ],
        },
        {
          id: 'tu-discovery',
          paragraphs: [
            'Then Tu Youyou found a critical clue in a 1,600-year-old text written by the physician Ge Hong around 340 CE. The text said to soak wormwood in cold water, wring it out, and drink the juice. Tu Youyou realized that the standard boiling process was destroying the active ingredient. She switched to an ether-based extraction that worked at lower temperatures. The result was artemisinin -- a compound that killed malaria parasites with stunning effectiveness. When she tested it on malaria patients, the cure rate was near 100%.',
            'Artemisinin and its derivatives have since saved millions of lives and remain the most effective malaria treatment in the world. In 2015, Tu Youyou won the Nobel Prize in Physiology or Medicine at age 84. She was the first Chinese citizen to win a Nobel Prize in science and the first Chinese woman to win any Nobel Prize. She had no PhD, no research experience abroad, and no membership in any national academy -- she was simply a dedicated scientist who read ancient texts carefully and refused to give up.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F33F}',
          name: 'Tu Youyou',
          title: 'Pharmaceutical Chemist (Born 1930)',
          description:
            'Chinese scientist who discovered artemisinin, the world\'s most effective malaria treatment, by combining ancient Chinese medicine with modern science. She won the 2015 Nobel Prize in Physiology or Medicine at age 84, the first Chinese woman to win a Nobel Prize.',
          extraTag: 'Saved millions of lives',
        },
      ],
      funFacts: [
        {
          title: 'First Human Test Subject',
          text: 'Tu Youyou was so committed to her research that she volunteered to be the first human test subject for artemisinin. She wanted to confirm it was safe before giving it to malaria patients. Her dedication paid off -- the drug worked perfectly and showed no serious side effects.',
        },
      ],
      videos: [],
      quizIds: ['ws-q10', 'ws-q11', 'ws-q12'],
    },
  ],

  // --- Quizzes ---
  quizzes: [
    {
      id: 'ws-q1',
      sectionId: 'ws-hypatia',
      title: 'Ancient Scientist!',
      question: 'What was Hypatia of Alexandria known for?',
      options: [
        { text: 'She was a Roman empress', isCorrect: false },
        { text: 'She was a mathematician, astronomer, and philosopher who led a school in Alexandria', isCorrect: true },
        { text: 'She invented the telescope', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q2',
      sectionId: 'ws-hypatia',
      title: 'Star Instruments!',
      question: 'What scientific instrument did Hypatia help improve?',
      options: [
        { text: 'The telescope', isCorrect: false },
        { text: 'The astrolabe', isCorrect: true },
        { text: 'The microscope', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q3',
      sectionId: 'ws-wang-zhenyi',
      title: 'Eclipse Experiment!',
      question: 'How did Wang Zhenyi demonstrate how lunar eclipses work?',
      options: [
        { text: 'She drew a picture on paper', isCorrect: false },
        { text: 'She set up an experiment with a lamp, mirror, and table in her garden shed', isCorrect: true },
        { text: 'She looked through a telescope', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q4',
      sectionId: 'ws-curie',
      title: 'Nobel Prize Quiz!',
      question: 'How many Nobel Prizes did Marie Curie win?',
      options: [
        { text: 'One', isCorrect: false },
        { text: 'Two, in two different sciences', isCorrect: true },
        { text: 'Three', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q5',
      sectionId: 'ws-curie',
      title: 'Radioactivity!',
      question: 'What term did Marie Curie coin to describe the mysterious rays given off by uranium?',
      options: [
        { text: 'Gamma rays', isCorrect: false },
        { text: 'Radioactivity', isCorrect: true },
        { text: 'X-rays', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q6',
      sectionId: 'ws-franklin',
      title: 'DNA Discovery!',
      question: 'What was "Photo 51"?',
      options: [
        { text: 'A photograph of Rosalind Franklin', isCorrect: false },
        { text: 'An X-ray image of DNA that revealed its helical structure', isCorrect: true },
        { text: 'A picture taken by the Hubble telescope', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q7',
      sectionId: 'ws-franklin',
      title: 'Secret Invention!',
      question: 'What technology did Hedy Lamarr help invent that we still use today?',
      options: [
        { text: 'Television', isCorrect: false },
        { text: 'Frequency-hopping, which became the basis for Bluetooth and Wi-Fi', isCorrect: true },
        { text: 'The telephone', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q8',
      sectionId: 'ws-johnson',
      title: 'Space Math!',
      question: 'Why did astronaut John Glenn ask Katherine Johnson to check the computer\'s calculations?',
      options: [
        { text: 'The computer was broken', isCorrect: false },
        { text: 'He trusted her math skills more than the new electronic computer', isCorrect: true },
        { text: 'She invented the computer', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q9',
      sectionId: 'ws-johnson',
      title: 'Barrier Breaker!',
      question: 'What historic achievement did Mae Jemison accomplish in 1992?',
      options: [
        { text: 'She walked on the Moon', isCorrect: false },
        { text: 'She became the first Black woman to travel to space', isCorrect: true },
        { text: 'She built the International Space Station', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q10',
      sectionId: 'ws-tu-youyou',
      title: 'Ancient Clue!',
      question: 'Where did Tu Youyou find the clue that led to her malaria breakthrough?',
      options: [
        { text: 'In a modern science textbook', isCorrect: false },
        { text: 'In a 1,600-year-old Chinese medical text', isCorrect: true },
        { text: 'In a European chemistry journal', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q11',
      sectionId: 'ws-tu-youyou',
      title: 'Extraction Method!',
      question: 'Why was the standard boiling method not working to extract the active ingredient from wormwood?',
      options: [
        { text: 'The boiling water was not hot enough', isCorrect: false },
        { text: 'The heat was destroying the active compound', isCorrect: true },
        { text: 'The wrong type of wormwood was being used', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'ws-q12',
      sectionId: 'ws-tu-youyou',
      title: 'Nobel Achievement!',
      question: 'What award did Tu Youyou receive in 2015?',
      options: [
        { text: 'The Fields Medal for mathematics', isCorrect: false },
        { text: 'The Nobel Prize in Physiology or Medicine', isCorrect: true },
        { text: 'The Pulitzer Prize', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // --- Essay ---
  essay: {
    id: 'ws-essay',
    prompt:
      'Choose one woman scientist from this topic whose story stood out to you most.',
    description:
      'Write about why her work was important, what obstacles she faced because of her gender or era, and what you think the world would look like today if her discoveries had never happened. What does her story teach us about who gets credit in science and why that matters? Write at least 100 characters to unlock the reward.',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Powerful reflection! You understand why recognizing all scientists matters.',
  },

  // --- Reward ---
  reward: {
    id: 'ws-reward',
    title: 'Science Hall of Fame',
    description:
      'Curate your own interactive museum exhibit! Match discoveries, dates, and obstacles to each scientist, then design a special exhibit for your favorite.',
    lockMessage: 'Complete all quizzes and write your essay to enter the Hall of Fame!',
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
    type: 'science-hall-of-fame',
    celebrationMessage: 'Welcome to the Science Hall of Fame! Build your exhibit!',
  },

  // --- Conclusion ---
  conclusion: {
    title: 'Women in Science: A Legacy of Brilliance',
    paragraphs: [
      'You have just traveled through nearly 2,000 years of scientific history, from Hypatia\'s marble lecture halls in ancient Alexandria to Tu Youyou\'s laboratory in modern Beijing. Along the way, you met eight extraordinary women who made discoveries that changed the world -- and who were often denied the credit they deserved simply because they were women.',
      'Hypatia showed that women were doing groundbreaking mathematics and astronomy as far back as the 4th century. Wang Zhenyi defied her entire era\'s expectations in 18th-century China. Marie Curie discovered entirely new elements and literally gave her life to science. Rosalind Franklin\'s photograph cracked the secret of life itself. Hedy Lamarr\'s frequency-hopping invention became the foundation of our wireless world.',
      'Katherine Johnson calculated the trajectories that put Americans in orbit and on the Moon. Mae Jemison shattered another barrier by flying into space. And Tu Youyou saved millions of lives by looking backward into ancient texts while everyone else was looking forward.',
      'The pattern across these stories is unmistakable. In every era and every culture, brilliant women have been doing science. The problem was never a lack of talent -- it was a world that refused to see it. Your generation will produce the next Hypatia, the next Curie, the next Tu Youyou. The question is: will you recognize them when you see them?',
    ],
  },
};
