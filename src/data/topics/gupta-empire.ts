import type { Topic } from '../types';

export const guptaEmpire: Topic = {
  id: 'gupta-empire',
  slug: 'gupta-empire',
  title: 'The Gupta Empire',
  subtitle:
    'Discover India\u2019s Golden Age of science, math, and art \u2014 where zero was born and the world was changed forever!',
  status: 'active',
  themeId: 'gupta-empire',
  heroIcons: ['\u{1F522}', '\u{1F451}', '\u{1F9EA}'],
  navItems: [
    { id: 'golden-age', icon: '\u{1F451}', label: 'Golden Age' },
    { id: 'gift-of-zero', icon: '\u{1F522}', label: 'Gift of Zero' },
    { id: 'inventions', icon: '\u{1F9EA}', label: 'Inventions' },
    { id: 'art-learning', icon: '\u{1F3AD}', label: 'Art & Learning' },
    { id: 'daily-life', icon: '\u{1F3D8}\uFE0F', label: 'Daily Life' },
    { id: 'end-golden-age', icon: '\u{1F305}', label: 'The End' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'golden-age',
      icon: '\u{1F451}',
      title: 'The Golden Age Begins',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Imagine a time when India was the smartest place on the entire planet. Scientists were mapping the stars, mathematicians were inventing numbers that the whole world would use forever, poets were writing plays so beautiful that people still perform them today, and a university had more students than most modern colleges. Welcome to the Gupta Empire \u2014 India\u2019s Golden Age!',
            'Around 320 CE, a clever prince named Chandragupta I pulled off something incredible. He married a princess from the powerful Licchavi family, uniting two great families and creating a kingdom that would grow into one of the mightiest empires in history. His family \u2014 the Guptas \u2014 would rule northern India for over 200 years, and during that time, Indian thinkers changed the world in ways we still feel today.',
            'How did they change the world? Well, every single time you write down a number, solve a math problem, or play a game of chess, you\u2019re using something that was invented right here, during the Gupta period. The number zero, the decimal system, the game of chess \u2014 all of these came from Gupta-era India!',
            'Get ready to explore an age of genius, discovery, and wonder. You\u2019re about to meet some of the greatest minds in human history!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'bDQkpNbsly4',
          title: 'India \u2014 Crash Course History of Science #4',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: The Gift of Zero ─────────────────────────────
    {
      id: 'gift-of-zero',
      icon: '\u{1F522}',
      title: 'The Gift of Zero: The Number That Changed Everything',
      readAloudBlocks: [
        {
          id: 'gift-of-zero-text',
          paragraphs: [
            'Quick question: what\u2019s the most important number ever invented? You might say 1, or 10, or a million. But the real answer is\u2026 zero! And it was invented right here in India during the Gupta period. Before zero existed, doing math was incredibly hard. The Romans had to write numbers like MCMLXXXVIII just to say 1988. With zero and the decimal system, you just write\u2026 1988. Easy!',
            'The genius behind this revolution was a mathematician named Aryabhata, born in 476 CE. By the time he was just 23 years old, Aryabhata had already written a masterwork called the Aryabhatiya that would change mathematics forever. He developed the concept of zero as a placeholder and a number, calculated the value of pi (\u03C0) to four decimal places \u2014 getting 3.1416, which is amazingly accurate \u2014 and figured out that the Earth is round and spins on its own axis!',
            'Think about that: Aryabhata knew the Earth rotated over 1,000 years before the European astronomer Copernicus figured it out! He also understood that the moon and planets shine by reflecting sunlight, and he could predict eclipses with remarkable precision.',
            'Later, another brilliant mathematician named Brahmagupta took things even further. He wrote down the formal rules for zero: what happens when you add zero to a number, subtract zero, or multiply by zero. These rules are the exact same ones you learn in math class today! The numbers we call "Arabic numerals" (1, 2, 3, 4, 5\u2026) were actually invented in India \u2014 Arab traders later carried them to Europe, which is how they got their misleading name.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F522}',
          name: 'Aryabhata',
          title: 'The Star Counter (476\u2013550 CE)',
          description:
            'A mathematical genius who invented the concept of zero, calculated pi, and figured out that the Earth spins on its axis \u2014 all by age 23! His masterwork, the Aryabhatiya, revolutionized mathematics and astronomy across the entire world.',
          extraTag: 'Masterwork: Aryabhatiya',
        },
        {
          emoji: '\u{1F4DC}',
          name: 'Kalidasa',
          title: 'The Shakespeare of India',
          description:
            'The greatest poet and playwright in the Sanskrit language. His play "Shakuntala" is still performed today, nearly 1,600 years later! He was one of the legendary "Nine Jewels" at the royal court.',
          extraTag: 'Masterpiece: Shakuntala',
        },
        {
          emoji: '\u{1F3EB}',
          name: 'Kumaragupta I',
          title: 'The University Builder (~415\u2013455 CE)',
          description:
            'Founded Nalanda University around 427 CE \u2014 one of the world\u2019s first universities, with over 10,000 students from across Asia! The library had three massive buildings, one nine stories tall.',
          extraTag: 'Founded: Nalanda University',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The numbers you use every day (1, 2, 3, 4, 5\u2026) are called "Arabic numerals," but they were actually invented in India during the Gupta period! Arab traders brought them to Europe, which is why they got the wrong name.',
        },
      ],
      videos: [
        {
          youtubeId: 'D-oxsEknlIc',
          title: 'When Zero Was First Discovered',
          channelName: 'Science Museum',
        },
      ],
      quizIds: ['gupta-q1a', 'gupta-q1b', 'gupta-q1c', 'gupta-q1d'],
    },

    // ─── Section 2: Inventions That Changed the World ────────────
    {
      id: 'inventions',
      icon: '\u{1F9EA}',
      title: 'Inventions That Changed the World',
      readAloudBlocks: [
        {
          id: 'inventions-text',
          paragraphs: [
            'The Gupta Empire wasn\u2019t just about numbers \u2014 it was a hotbed of incredible inventions! One of the most surprising? Chess! The game you might play at home or in school was invented in India during the Gupta period. It was originally called "Chaturanga," which means "four divisions of the army" \u2014 infantry, cavalry, elephants, and chariots. Sound familiar? Those became the pawns, knights, bishops, and rooks we know today!',
            'But perhaps the most mind-blowing Gupta invention is standing right in the middle of Delhi, India, to this very day. The Iron Pillar of Delhi is 7 meters tall, weighs over 6 tonnes, and is made of 98% pure wrought iron. Here\u2019s the incredible part: it has stood in the open air for over 1,600 years and has NOT rusted! Even modern scientists are amazed by this. They discovered that the pillar is protected by a thin layer of a special compound called "misawite" that acts like an invisible shield against rust. Gupta-era metalworkers figured this out by accident, using techniques that we still don\u2019t fully understand!',
            'The Guptas were also pioneers in medicine. They developed an early form of inoculation \u2014 a way to protect people against the deadly disease smallpox. This was centuries before vaccination was "invented" in Europe! Their iron and steel were considered among the finest in the ancient world, and they even pioneered techniques for refining sugar. In fact, the English word "sugar" comes from the Sanskrit word "sharkara"!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Iron Pillar of Delhi has stood in the open air for over 1,600 years without rusting! Scientists discovered it\u2019s protected by a thin layer of "misawite" \u2014 a compound that forms a protective shield. Ancient Indian metalworkers figured this out by accident!',
        },
      ],
      videos: [
        {
          youtubeId: '8Nn5uqE3C9w',
          title: 'Buddha and Ashoka \u2014 Crash Course World History #6',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['gupta-q2a', 'gupta-q2b', 'gupta-q2c'],
    },

    // ─── Section 3: Art, Literature, and Learning ────────────────
    {
      id: 'art-learning',
      icon: '\u{1F3AD}',
      title: 'Art, Literature, and the Greatest University',
      readAloudBlocks: [
        {
          id: 'art-learning-text',
          paragraphs: [
            'During the Gupta Golden Age, India became the learning capital of the world. Students traveled thousands of miles \u2014 from China, Korea, Japan, Tibet, and Central Asia \u2014 just to study at one extraordinary place: Nalanda University. Founded around 427 CE by Emperor Kumaragupta I, Nalanda was one of the very first universities in human history!',
            'Nalanda was enormous. It had over 10,000 students and 2,000 teachers studying everything from mathematics and astronomy to medicine, philosophy, and languages. The university\u2019s library was legendary \u2014 it had three massive buildings, and one of them was nine stories tall! It was said to contain hundreds of thousands of manuscripts. When the library was later destroyed by invaders, it reportedly burned for months because there were so many books.',
            'Meanwhile, the great poet Kalidasa was writing masterpieces that would echo through the centuries. His play "Abhijnanashakuntala" (The Recognition of Shakuntala) is considered one of the greatest works of literature ever written in any language. It tells the love story of King Dushyanta and the beautiful Shakuntala, and it\u2019s still performed on stages around the world nearly 1,600 years later!',
            'The Gupta period also produced breathtaking art. The Ajanta and Ellora cave paintings are stunning frescoes carved and painted deep inside rock caves \u2014 scenes of daily life, religious stories, and nature that still survive today. Gupta astronomers mapped the stars with incredible accuracy and could predict solar and lunar eclipses, helping farmers plan their harvests and priests plan their ceremonies.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Nalanda University\u2019s library had three buildings, and one was nine stories tall! When it was later destroyed, it reportedly burned for months because there were so many books and manuscripts inside.',
        },
      ],
      videos: [
        {
          youtubeId: 'KH89FuKd6Co',
          title: 'The Mighty Gupta Empire of India',
          channelName: 'History Dose',
        },
      ],
      quizIds: ['gupta-q3a', 'gupta-q3b'],
    },

    // ─── Section 4: Daily Life ───────────────────────────────────
    {
      id: 'daily-life',
      icon: '\u{1F3D8}\uFE0F',
      title: 'Life in the Golden Age',
      readAloudBlocks: [
        {
          id: 'daily-life-text',
          paragraphs: [
            'What was it like to live during India\u2019s Golden Age? Luckily, we have an amazing eyewitness account! Around 400 CE, a Chinese Buddhist pilgrim named Faxian traveled all the way from China to India, a journey of thousands of miles across deserts and mountains. He spent years exploring the Gupta Empire and wrote down everything he saw.',
            'Faxian described a peaceful and prosperous land with clean, well-organized cities. He was amazed by the charitable hospitals where sick people could get free treatment, and the rest houses where travelers could stay for free. He noted that the government was fair, taxes were reasonable, and people were generally happy and well-fed.',
            'Hindu temples were becoming more elaborate and grand during this period, with towering stone structures covered in intricate carvings of gods and mythological scenes. Festivals filled the calendar \u2014 celebrations with music, dancing, theater performances, and feasting. People enjoyed playing chess, dice games, and polo.',
            'But not everything was perfect. The caste system became more rigid during the Gupta period, dividing society into strict social groups that determined what jobs people could have, who they could marry, and where they could live. Still, for many people, the Gupta era was a time of remarkable prosperity, learning, and cultural achievement.',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The Chinese pilgrim Faxian traveled all the way from China to India around 400 CE and spent years exploring the Gupta Empire. He was so impressed by the peaceful, prosperous land that he wrote a detailed account that historians still study today!',
        },
      ],
      videos: [],
      quizIds: ['gupta-q4a'],
    },

    // ─── Section 5: The End of the Golden Age ────────────────────
    {
      id: 'end-golden-age',
      icon: '\u{1F305}',
      title: 'The End of the Golden Age',
      readAloudBlocks: [
        {
          id: 'end-intro-text',
          paragraphs: [
            'For over 200 years, the Gupta Empire shone like a golden beacon of knowledge and culture. But by the middle of the 500s CE, storm clouds were gathering. From the mountains of Central Asia came fierce warriors called the Hunas (also known as the Hephthalites or "White Huns"). Wave after wave of Huna invasions crashed against the empire\u2019s borders, draining the treasury and weakening the army.',
            'At the same time, problems were growing inside the empire. Regional governors, who had been loyal to the Gupta emperors for generations, started to declare independence and set up their own little kingdoms. The once-mighty empire began to crack and fragment, like a beautiful vase slowly breaking into pieces.',
            'By around 550 CE, the Gupta Empire had splintered into many smaller kingdoms, and the Golden Age came to an end. But here\u2019s the amazing thing: the knowledge didn\u2019t disappear! Indian mathematics, astronomy, and literature spread across the entire world through Arab scholars and traders.',
          ],
        },
        {
          id: 'end-outro-text',
          paragraphs: [
            'The decimal system and the concept of zero traveled from India to the Arab world, and then from the Arab world to Europe, where they transformed science, engineering, and commerce forever. Without zero and the decimal system, there would be no computers, no smartphones, no space travel \u2014 none of the modern technology we take for granted!',
            'Chess traveled along the Silk Road from India to Persia, then to the Arab world, and finally to Europe, becoming one of the most beloved games on Earth. The plays of Kalidasa influenced writers across Asia for centuries. And the Iron Pillar of Delhi still stands today, a 1,600-year-old monument to Gupta engineering genius.',
            'The Gupta Empire may have fallen, but its gifts to the world \u2014 zero, the decimal system, chess, and so much more \u2014 live on in everything we do. Every time you write a number, every time you play chess, every time you use a computer, you\u2019re using the legacy of India\u2019s Golden Age!',
          ],
        },
      ],
      timeline: [
        {
          year: '~320 CE',
          title: 'Empire Founded',
          description:
            'Chandragupta I unites northern India through a marriage alliance with the powerful Licchavi family, founding the Gupta Empire.',
        },
        {
          year: '~335\u2013375 CE',
          title: 'Great Expansion',
          description:
            'Samudragupta conquers most of the Indian subcontinent through brilliant military campaigns, earning the title "Indian Napoleon."',
        },
        {
          year: '~375\u2013415 CE',
          title: 'Peak Glory',
          description:
            'Chandragupta II (Vikramaditya) presides over the "Nine Jewels" \u2014 the greatest scholars and artists of the age.',
        },
        {
          year: '~400 CE',
          title: 'Faxian Visits',
          description:
            'Chinese pilgrim Faxian travels through India and describes a prosperous, peaceful empire with free hospitals and rest houses.',
        },
        {
          year: '~427 CE',
          title: 'Nalanda Founded',
          description:
            'Kumaragupta I establishes Nalanda University, one of the world\u2019s first great universities with over 10,000 students.',
        },
        {
          year: '~476 CE',
          title: 'Aryabhata Born',
          description:
            'The great mathematician and astronomer who will revolutionize math with zero, pi, and Earth\u2019s rotation is born.',
        },
        {
          year: '~499 CE',
          title: 'Aryabhatiya Published',
          description:
            'Aryabhata publishes his masterwork containing the concepts of zero, pi calculated to 3.1416, and the theory that Earth rotates on its axis.',
        },
        {
          year: '~500 CE',
          title: 'Chess Invented',
          description:
            'Chaturanga, the ancestor of modern chess, is developed in India with four divisions representing the army.',
        },
        {
          year: '~510\u2013530 CE',
          title: 'Huna Invasions',
          description:
            'Central Asian Huna warriors invade and weaken the empire, draining the treasury and the army.',
        },
        {
          year: '~550 CE',
          title: 'Empire Ends',
          description:
            'The Gupta Empire fragments into smaller kingdoms, but its knowledge spreads across the world through Arab scholars and traders.',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Without the Gupta Empire\u2019s invention of zero and the decimal system, there would be no computers, no smartphones, and no internet! All modern computing is built on the binary system, which relies on\u2026 zero.',
        },
      ],
      videos: [],
      quizIds: ['gupta-q5a', 'gupta-q5b'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Gift of Zero
    {
      id: 'gupta-q1a',
      sectionId: 'gift-of-zero',
      title: 'Quick Quiz Time!',
      question: 'What is the Gupta period often called?',
      options: [
        { text: 'The Dark Ages', isCorrect: false },
        { text: 'India\u2019s Golden Age', isCorrect: true },
        { text: 'The Ice Age', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'gupta-q1b',
      sectionId: 'gift-of-zero',
      title: 'Zero Challenge!',
      question: 'Who invented the concept of zero as a number?',
      options: [
        { text: 'Greek mathematicians', isCorrect: false },
        { text: 'Indian mathematicians during the Gupta period', isCorrect: true },
        { text: 'Roman engineers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'gupta-q1c',
      sectionId: 'gift-of-zero',
      title: 'Math Genius Quiz!',
      question: 'What did Aryabhata figure out about the Earth?',
      options: [
        { text: 'The Earth is flat', isCorrect: false },
        { text: 'The Earth is round and rotates on its axis', isCorrect: true },
        { text: 'The Earth is the center of the universe', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'gupta-q1d',
      sectionId: 'gift-of-zero',
      title: 'Number System Quiz!',
      question:
        'What number system do we use today that was invented during the Gupta period?',
      options: [
        { text: 'Roman numerals', isCorrect: false },
        { text: 'The decimal (base-10) system', isCorrect: true },
        { text: 'Tally marks', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Inventions
    {
      id: 'gupta-q2a',
      sectionId: 'inventions',
      title: 'Invention Quiz!',
      question: 'What was Chaturanga?',
      options: [
        { text: 'A type of food', isCorrect: false },
        { text: 'The ancient Indian game that became chess', isCorrect: true },
        { text: 'A weapon used in battle', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'gupta-q2b',
      sectionId: 'inventions',
      title: 'Iron Pillar Challenge!',
      question: 'What is special about the Iron Pillar of Delhi?',
      options: [
        { text: 'It\u2019s the tallest structure in India', isCorrect: false },
        { text: 'It has not rusted in over 1,600 years', isCorrect: true },
        { text: 'It\u2019s made of pure gold', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'gupta-q2c',
      sectionId: 'inventions',
      title: 'Sweet Science Quiz!',
      question:
        'Where does the English word "sugar" come from?',
      options: [
        { text: 'The Latin word "sucrus"', isCorrect: false },
        { text: 'The Sanskrit word "sharkara"', isCorrect: true },
        { text: 'The Greek word "sykaron"', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Art & Learning
    {
      id: 'gupta-q3a',
      sectionId: 'art-learning',
      title: 'University Quiz!',
      question: 'What was Nalanda?',
      options: [
        { text: 'A mountain in northern India', isCorrect: false },
        {
          text: 'One of the world\u2019s first universities with 10,000+ students',
          isCorrect: true,
        },
        { text: 'A river that powered the empire', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'gupta-q3b',
      sectionId: 'art-learning',
      title: 'Literature Challenge!',
      question: 'Who was Kalidasa?',
      options: [
        { text: 'A warrior king who conquered all of Asia', isCorrect: false },
        { text: 'The greatest Sanskrit poet and playwright', isCorrect: true },
        { text: 'A famous chef who invented biryani', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Daily Life
    {
      id: 'gupta-q4a',
      sectionId: 'daily-life',
      title: 'Daily Life Quiz!',
      question:
        'Which Chinese traveler described the Gupta Empire as peaceful and prosperous?',
      options: [
        { text: 'Marco Polo', isCorrect: false },
        { text: 'Faxian', isCorrect: true },
        { text: 'Zheng He', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: End of the Golden Age
    {
      id: 'gupta-q5a',
      sectionId: 'end-golden-age',
      title: 'Decline Quiz!',
      question: 'What caused the Gupta Empire to decline?',
      options: [
        { text: 'A massive flood destroyed the capital', isCorrect: false },
        {
          text: 'Invasions by the Huna peoples from Central Asia',
          isCorrect: true,
        },
        { text: 'Everyone moved to Europe', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'gupta-q5b',
      sectionId: 'end-golden-age',
      title: 'Final Challenge!',
      question:
        'How did Gupta knowledge reach Europe and transform the world?',
      options: [
        { text: 'European explorers visited India and stole the books', isCorrect: false },
        { text: 'Arab scholars and traders carried it from India to the Arab world, then to Europe', isCorrect: true },
        { text: 'The Guptas sent missionaries to teach Europeans', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'gupta-essay',
    prompt:
      'You are a student at Nalanda University during the Gupta Golden Age. You\u2019ve traveled from far away to study here. Describe what the university looks like, what subjects you\u2019re learning, and what amazing discoveries your teachers are making. What is the most exciting thing about living during India\u2019s Golden Age?',
    description:
      'Think about everything you\u2019ve learned about the Gupta Empire. What does Nalanda University look like when you arrive? How tall is the library? What are the other students studying? Do you attend a lecture by Aryabhata about the stars, or watch Kalidasa perform one of his plays? Use what you\u2019ve learned to bring your story to life! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Brilliant work! Your story about life at Nalanda during the Golden Age is wonderful. You\u2019re a true Gupta Empire scholar!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'gupta-reward',
    title: 'Zero\u2019s Journey!',
    description:
      'Follow the journey of the number zero from India to the world! Solve math puzzles with Roman numerals vs. the decimal system, forge a rust-proof iron pillar, play ancient Chaturanga, map the stars with Aryabhata, and watch how Indian numbers traveled along trade routes to change the world forever!',
    lockMessage: 'Discovery Plans Locked!',
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
    type: 'zeros-journey',
    celebrationMessage:
      'INCREDIBLE! You\u2019ve mastered the power of zero and unlocked the secrets of India\u2019s Golden Age! Aryabhata would be proud! \u{1F522}\u2728\u{1F451}',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\u2019ve journeyed through one of the most brilliant chapters in human history!',
      'You discovered how Chandragupta I founded the Gupta Empire around 320 CE and launched India\u2019s Golden Age. You met Aryabhata, the mathematical genius who invented zero, calculated pi, and figured out that the Earth spins on its axis \u2014 over a thousand years before European scientists! You learned how the decimal system you use every single day was born right here in Gupta-era India.',
      'You explored incredible inventions: chess (originally Chaturanga), the rust-proof Iron Pillar of Delhi, early vaccination, and sugar refining. You visited the legendary Nalanda University with its nine-story library and 10,000 students, and you met Kalidasa, whose plays are still performed around the world.',
      'You traveled through the Gupta Empire with Faxian, the Chinese pilgrim who described a peaceful, prosperous land. And you learned how the Huna invasions eventually brought the Golden Age to an end \u2014 but not before Gupta knowledge spread across the globe through Arab scholars and traders.',
      'The decimal system, zero, chess, and so much more \u2014 these gifts from India\u2019s Golden Age are woven into the fabric of our everyday lives. Every number you write, every game of chess you play, every calculation a computer makes \u2014 it all traces back to the Gupta Empire!',
      'Keep exploring history! Every civilization has amazing stories waiting to be discovered!',
    ],
  },
};
