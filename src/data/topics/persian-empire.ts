import type { Topic } from '../types';

export const persianEmpire: Topic = {
  id: 'persian-empire',
  slug: 'persian-empire',
  title: 'The Persian Empire',
  subtitle: 'The World\'s First Superpower',
  status: 'active',
  themeId: 'persian-empire',
  heroIcons: ['\u{1F451}', '\u2694\uFE0F', '\u{1F525}'],
  navItems: [
    { id: 'beliefs', icon: '\u{1F525}', label: 'Gods & Beliefs' },
    { id: 'kings', icon: '\u{1F451}', label: 'Kings & Warriors' },
    { id: 'rise-fall', icon: '\u{1F3DA}\uFE0F', label: 'Rise & Fall' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F30D}',
      title: 'Welcome to the Persian Empire!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Get ready for an epic journey to the largest empire the ancient world had ever seen! Around 550 BCE, a brilliant leader named Cyrus the Great united the tribes of Persia and built an empire that stretched from modern-day Turkey all the way to India. At its height, the Persian Empire ruled over 44% of the entire world\'s population. That\'s almost half of all the people on Earth!',
            'But the Persians weren\'t just great conquerors. They were famous for their tolerance and respect for other cultures. When Cyrus conquered a new land, he didn\'t destroy its temples or force people to change their religion. Instead, he let them keep their customs and beliefs. He even freed the Jewish people from captivity in Babylon!',
            'The Persians built the incredible Royal Road, a highway stretching over 1,600 miles that connected the empire together. They followed a fascinating religion called Zoroastrianism that taught people to choose between good and evil. In this adventure, you\'ll discover their powerful gods, meet legendary kings, and learn how this mighty empire rose and fell!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'Q-mkVSasZIM',
          title: 'The Persians & Greeks: Crash Course World History #5',
          channelName: 'CrashCourse',
        },
        {
          youtubeId: 'GznV0_JVrZc',
          title: 'Persian Empire - Trade, Government, and Lasting Influence',
          channelName: 'YouTube',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Gods & Beliefs ──────────────────────────────
    {
      id: 'beliefs',
      icon: '\u{1F525}',
      title: 'Zoroastrianism: The Religion of Fire & Truth',
      readAloudBlocks: [
        {
          id: 'beliefs-intro-text',
          paragraphs: [
            'The ancient Persians followed one of the oldest religions in the world: Zoroastrianism! Unlike the Egyptians and Greeks who worshipped many gods, the Persians believed in one supreme god called Ahura Mazda, the "Wise Lord." This was a revolutionary idea that would go on to influence Judaism, Christianity, and Islam.',
            'At the heart of Zoroastrianism was a cosmic battle between good and evil. Ahura Mazda represented truth, light, and goodness, while Angra Mainyu represented lies, darkness, and destruction. Every person had to choose which side they were on! The Zoroastrian motto was simple but powerful: "Good Thoughts, Good Words, Good Deeds."',
            'Fire was sacred to the Persians because they believed it represented Ahura Mazda\'s truth and light. Zoroastrian temples always kept a sacred fire burning, and some of these fires have been kept alive for over a thousand years! The wise priests called the Magi tended these flames and performed sacred rituals. Let\'s meet the key figures of this fascinating belief system!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u2600\uFE0F',
          name: 'Ahura Mazda',
          title: 'The Supreme God of Zoroastrianism',
          description:
            'Ahura Mazda was the supreme creator god of the Persian religion. His name means "Wise Lord," and the Persians believed he created everything good in the universe: the sky, the earth, people, and animals. He was locked in an eternal battle against the forces of darkness and lies. Persian kings like Darius and Xerxes always claimed they ruled by the grace of Ahura Mazda. His symbol, the Faravahar, showed a winged disc and became one of the most recognizable symbols of ancient Persia. Many scholars believe Zoroastrianism\'s idea of one supreme god influenced the later religions of Judaism, Christianity, and Islam!',
          extraTag: 'Name means: Wise Lord',
        },
        {
          emoji: '\u{1F525}',
          name: 'Zoroaster (Zarathustra)',
          title: 'The Prophet of Fire',
          description:
            'Zoroaster, also known as Zarathustra, was the prophet who founded Zoroastrianism, one of the world\'s oldest religions that is still practiced today! He lived sometime between 1500 and 500 BCE and taught that people must choose between good and evil. He introduced the idea of sacred fire as a symbol of truth and righteousness. Zoroaster said that at the end of time, good would finally triumph over evil. His teachings were collected in a holy book called the Avesta. Even today, there are about 200,000 Zoroastrians around the world who follow his ancient wisdom!',
          extraTag: 'Motto: Good Thoughts, Good Words, Good Deeds',
        },
        {
          emoji: '\u{1F311}',
          name: 'Angra Mainyu (Ahriman)',
          title: 'The Spirit of Darkness',
          description:
            'Angra Mainyu, also called Ahriman, was the terrifying evil spirit in Zoroastrianism. He was the complete opposite of Ahura Mazda: where the Wise Lord created truth, Angra Mainyu created lies. Where Ahura Mazda brought light, Angra Mainyu brought darkness. The Persians believed he created diseases, monsters, and all the suffering in the world. Every person had to choose between following Ahura Mazda\'s path of truth or Angra Mainyu\'s path of destruction. The Persians believed that in the final battle at the end of time, Ahura Mazda would defeat Angra Mainyu once and for all!',
        },
        {
          emoji: '\u2B50',
          name: 'The Magi',
          title: 'The Wise Priests',
          description:
            'The Magi were the Zoroastrian priests who were famous throughout the ancient world for their incredible wisdom and knowledge. They tended the sacred fires in Zoroastrian temples, performed rituals, and studied the stars. The word "magic" actually comes from "Magi" because people thought their knowledge was so amazing it seemed supernatural! They served as advisors to the Persian kings and were respected even by the Greeks and Romans. You might recognize the Magi from the Christmas story, where "three wise men" followed a star. That story was inspired by the reputation of these legendary Persian priests!',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Zoroastrianism influenced almost every major religion that came after it! The ideas of heaven and hell, angels and demons, a final judgment day, and a cosmic battle between good and evil all appeared first in Zoroastrianism. When you hear about these concepts in other religions, you\'re hearing echoes of ancient Persia!',
        },
      ],
      videos: [
        {
          youtubeId: '34oQfaJiy7w',
          title: 'Entire History of the Persian Achaemenid Empire',
          channelName: 'History Time',
        },
      ],
      quizIds: ['persia-q1a', 'persia-q1b', 'persia-q1c', 'persia-q1d'],
    },

    // ─── Section 2: Great Kings & Warriors ──────────────────────
    {
      id: 'kings',
      icon: '\u{1F451}',
      title: 'Great Kings & Warriors of Persia',
      readAloudBlocks: [
        {
          id: 'kings-intro-text',
          paragraphs: [
            'The Persian Empire was built and shaped by some of the most remarkable leaders in all of history. From Cyrus the Great, who founded the empire with wisdom and tolerance, to Darius the Great, who organized it into a well-oiled machine, to Xerxes, who led the largest army the world had ever seen against Greece. These kings were called "King of Kings" because they ruled over so many lands and peoples.',
            'But the kings didn\'t fight alone. They had the legendary Immortals, an elite fighting force of exactly 10,000 soldiers who were considered the most fearsome warriors in the ancient world. If one Immortal fell in battle, another soldier was immediately ready to take his place, so the unit always numbered exactly 10,000. To their enemies, it seemed like they could never be defeated!',
          ],
        },
        {
          id: 'kings-outro-text',
          paragraphs: [
            'The Persian kings ruled with a mix of military strength and surprising tolerance. They allowed conquered peoples to keep their religions, languages, and customs. This was revolutionary! Most ancient conquerors destroyed everything and forced their own culture on the defeated. The Persians understood that happy subjects were more loyal and productive than oppressed ones.',
            'This philosophy of tolerance, combined with brilliant engineering like the Royal Road and a standardized system of coins and laws, held the empire together for over 200 years. It was a lesson in leadership that the world has never forgotten.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F451}',
          name: 'Cyrus the Great',
          title: 'Founder of the Persian Empire',
          description:
            'Cyrus the Great was one of the most remarkable leaders in all of history. Starting as the king of a small tribe, he conquered the mighty empires of the Medes, Lydia, and Babylon to create the largest empire the world had ever seen. But what made Cyrus truly special was his kindness to conquered peoples. When he conquered Babylon in 539 BCE, he freed the Jewish people who had been held captive there for decades. He created the Cyrus Cylinder, sometimes called the first declaration of human rights, which proclaimed that all peoples could worship their own gods and follow their own customs. Even today, Iranians call him "The Father of Iran."',
          extraTag: 'Known as: The Father of Iran',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Darius I (Darius the Great)',
          title: 'The Great Organizer & Builder',
          description:
            'If Cyrus built the Persian Empire, Darius organized it into a superpower! He divided the empire into 20 provinces called satrapies, each governed by a satrap, or local governor. He built the famous Royal Road, a 1,677-mile highway stretching from Sardis in Turkey to Susa in Persia, with 111 relay stations where fresh horses and messengers waited. A message could travel the entire road in just 7 days! Darius also built the magnificent capital of Persepolis, introduced standard gold and silver coins called darics, and created a fair system of laws and taxes. He was the CEO of the ancient world!',
          extraTag: 'Built: The Royal Road & Persepolis',
        },
        {
          emoji: '\u2694\uFE0F',
          name: 'Xerxes I',
          title: 'The Warrior King',
          description:
            'Xerxes was the son of Darius and inherited his father\'s burning desire to conquer Greece. In 480 BCE, he assembled the largest army the ancient world had ever seen, possibly over 100,000 soldiers, and marched toward Greece. At the narrow pass of Thermopylae, 300 Spartan warriors and their allies made a legendary last stand against his forces. Xerxes eventually won that battle and burned Athens to the ground. But the Greeks got their revenge at the naval Battle of Salamis, where the Greek fleet destroyed the Persian navy in a brilliant trap. Xerxes was forced to retreat, and Greece remained free.',
          extraTag: 'Famous battle: Thermopylae (480 BCE)',
        },
        {
          emoji: '\u{1F6E1}\uFE0F',
          name: 'The Immortals',
          title: 'The 10,000 Unstoppable Warriors',
          description:
            'The Immortals were the most elite fighting force in the Persian Empire, and they got their name for a terrifying reason: they never seemed to die! The unit always consisted of exactly 10,000 soldiers. Whenever one was killed, wounded, or fell sick, a reserve soldier immediately took his place. To their enemies, it looked like the Immortals could never lose a single man. These warriors were trained from the age of 5 in riding, archery, and combat. They carried spears, bows, and short swords, and their shields had golden counterweights. They served as both the king\'s personal bodyguard and the spearhead of the Persian army in battle.',
          extraTag: 'Always numbered: Exactly 10,000',
        },
      ],
      funFacts: [
        {
          title: 'The World\'s First Postal Service!',
          text: 'The Persian Royal Road was 1,677 miles long with 111 relay stations where fresh horses and riders waited. Messages could travel the entire road in just 7 days, which was astonishingly fast for the ancient world! The Greek historian Herodotus was so impressed that he wrote: "Neither snow nor rain nor heat nor darkness of night prevents these couriers from completing their rounds." Sound familiar? That quote inspired the unofficial motto of the United States Postal Service over 2,000 years later!',
        },
        {
          title: 'The Empire of Equality!',
          text: 'Ancient Persepolis treasury tablets reveal something amazing: female workers at Persepolis received equal pay to men for equal work! Women could own property, run businesses, and even received paid maternity leave. Some women supervised large work crews of both men and women. This level of equality was extremely rare in the ancient world and wouldn\'t be seen again in many places for thousands of years!',
        },
      ],
      videos: [],
      quizIds: ['persia-q2a', 'persia-q2b', 'persia-q2c'],
    },

    // ─── Section 3: Rise & Fall ─────────────────────────────────
    {
      id: 'rise-fall',
      icon: '\u{1F3DA}\uFE0F',
      title: 'The Rise & Fall of the Persian Empire',
      readAloudBlocks: [
        {
          id: 'rise-fall-intro-text',
          paragraphs: [
            'The story of the Persian Empire is one of the most dramatic in all of history. In just a few decades, a small tribal kingdom rose to become the largest empire the world had ever known, stretching across three continents. But empires that rise fast can also fall fast.',
            'From Cyrus the Great\'s founding victories to Alexander the Great\'s final conquest, the Persian Empire lasted about 220 years. During that time, it transformed the world with its ideas about tolerance, governance, and communication. Let\'s follow the timeline of this incredible empire from its triumphant beginning to its dramatic end.',
          ],
        },
        {
          id: 'rise-fall-outro-text',
          paragraphs: [
            'When Alexander the Great conquered Persia in 330 BCE, the Achaemenid Empire came to an end. But Persian culture and ideas lived on! Later Persian empires, the Parthians and the Sassanids, would rise again and rival Rome itself.',
            'The Persian Empire\'s greatest legacy is its philosophy of tolerance and good governance. The idea that an empire could be held together not just by force, but by respecting different peoples and their cultures, was revolutionary. The Royal Road showed that connecting people with communication and trade was just as important as conquering them with armies.',
            'Today, the ruins of Persepolis still stand in modern Iran, a breathtaking reminder of what the Persians achieved. And the Cyrus Cylinder sits in the British Museum, a 2,500-year-old testament to the idea that all peoples deserve freedom and respect.',
          ],
        },
      ],
      timeline: [
        {
          year: '~550 BCE',
          title: 'Cyrus the Great Founds the Empire',
          description:
            'Cyrus II of Persia defeated the Median Empire, united the Persian tribes, and then conquered the wealthy kingdom of Lydia and the mighty Babylonian Empire. In just about 20 years, he created the largest empire the world had ever seen, stretching from modern Turkey to the borders of India.',
        },
        {
          year: '~539 BCE',
          title: 'The Cyrus Cylinder & Freedom',
          description:
            'After conquering Babylon, Cyrus issued the Cyrus Cylinder, a clay document declaring that all peoples in his empire could worship their own gods and follow their own customs. He freed the Jewish people from captivity and allowed them to return home and rebuild their temple. Many historians call this the first declaration of human rights.',
        },
        {
          year: '~522 BCE',
          title: 'Darius Organizes the Empire',
          description:
            'Darius I came to power and transformed the empire into a well-organized superpower. He divided it into 20 satrapies, built the Royal Road with 111 relay stations, constructed the magnificent capital of Persepolis, and introduced standardized coins and laws. Under Darius, the empire reached its greatest extent.',
        },
        {
          year: '490 BCE',
          title: 'The Battle of Marathon',
          description:
            'Darius sent an army across the Aegean Sea to punish Athens for supporting a rebellion in Persian territory. But at the plain of Marathon, the outnumbered Athenian army charged the Persians and won a stunning victory. According to legend, a messenger ran 26 miles from Marathon to Athens to announce the victory, inspiring the modern marathon race!',
        },
        {
          year: '480 BCE',
          title: 'Thermopylae & Salamis',
          description:
            'Xerxes, son of Darius, invaded Greece with a massive army. At Thermopylae, 300 Spartans and their allies made a legendary last stand that delayed the Persians. Xerxes burned Athens, but the Greek fleet lured the Persian navy into the narrow strait of Salamis and destroyed it. Xerxes was forced to retreat, and his dream of conquering Greece was over.',
        },
        {
          year: '~330 BCE',
          title: 'Alexander the Great Conquers Persia',
          description:
            'Alexander the Great of Macedon invaded the Persian Empire and defeated King Darius III in a series of devastating battles. He captured Persepolis and burned the great palace. The Achaemenid Persian Empire, which had ruled for over 200 years and once controlled 44% of the world\'s population, came to an end. But Persian culture and ideas would live on for millennia.',
        },
      ],
      funFacts: [
        {
          title: 'Marathon Came From a Persian Battle!',
          text: 'The word "marathon" comes from the Battle of Marathon in 490 BCE! According to legend, after the Greeks defeated the Persians, a messenger named Pheidippides ran about 26 miles from the battlefield at Marathon all the way to Athens to announce the victory. He shouted "We have won!" and then collapsed. When the modern Olympics began in 1896, they created a 26-mile race and named it the "marathon" in honor of this legendary run!',
        },
      ],
      videos: [],
      quizIds: ['persia-q3a', 'persia-q3b', 'persia-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Beliefs
    {
      id: 'persia-q1a',
      sectionId: 'beliefs',
      title: 'Quick Quiz Time!',
      question:
        'Who was the supreme god of Zoroastrianism, the main religion of the Persian Empire?',
      options: [
        { text: 'Zeus', isCorrect: false },
        { text: 'Ahura Mazda', isCorrect: true },
        { text: 'Angra Mainyu', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'persia-q1b',
      sectionId: 'beliefs',
      title: 'Zoroastrian Motto!',
      question:
        'What was the famous Zoroastrian motto that guided how Persians should live?',
      options: [
        { text: 'Strength, Honor, Victory', isCorrect: false },
        {
          text: 'Good Thoughts, Good Words, Good Deeds',
          isCorrect: true,
        },
        { text: 'Fire, Truth, Power', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'persia-q1c',
      sectionId: 'beliefs',
      title: 'Sacred Fire Quiz!',
      question:
        'Why was fire sacred to the Zoroastrian Persians?',
      options: [
        { text: 'They believed fire could predict the future', isCorrect: false },
        { text: 'They used fire to cook special food for the gods', isCorrect: false },
        {
          text: 'They believed it represented Ahura Mazda\'s truth and light',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'persia-q1d',
      sectionId: 'beliefs',
      title: 'Name Meaning Quiz!',
      question:
        'What does the name "Ahura Mazda" mean?',
      options: [
        { text: 'King of Fire', isCorrect: false },
        { text: 'Wise Lord', isCorrect: true },
        { text: 'Sun God', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Kings
    {
      id: 'persia-q2a',
      sectionId: 'kings',
      title: 'Quick Quiz Time!',
      question:
        'Who founded the Persian Empire by uniting the Persian tribes and conquering Babylon, Lydia, and the Medes?',
      options: [
        { text: 'Darius I', isCorrect: false },
        { text: 'Xerxes I', isCorrect: false },
        { text: 'Cyrus the Great', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'persia-q2b',
      sectionId: 'kings',
      title: 'Immortals Challenge!',
      question:
        'How many soldiers were always in the elite Persian fighting force called the Immortals?',
      options: [
        { text: '1,000', isCorrect: false },
        { text: '10,000', isCorrect: true },
        { text: '100,000', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'persia-q2c',
      sectionId: 'kings',
      title: 'Royal Road Quiz!',
      question:
        'What was the Royal Road built by Darius I used for?',
      options: [
        {
          text: 'Connecting the empire with relay stations for fast communication and trade',
          isCorrect: true,
        },
        { text: 'Racing chariots between cities for entertainment', isCorrect: false },
        { text: 'Marching armies to attack Egypt', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Rise & Fall
    {
      id: 'persia-q3a',
      sectionId: 'rise-fall',
      title: 'Quick Quiz Time!',
      question:
        'At the Battle of Thermopylae in 480 BCE, which famous warriors made a legendary last stand against Xerxes\' Persian army?',
      options: [
        { text: 'The Roman Legions', isCorrect: false },
        { text: '300 Spartans and their allies', isCorrect: true },
        { text: 'The Athenian Navy', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'persia-q3b',
      sectionId: 'rise-fall',
      title: 'Conqueror Challenge!',
      question:
        'Who finally conquered the Persian Empire around 330 BCE?',
      options: [
        { text: 'Julius Caesar', isCorrect: false },
        { text: 'Genghis Khan', isCorrect: false },
        { text: 'Alexander the Great', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'persia-q3c',
      sectionId: 'rise-fall',
      title: 'Empire Size Quiz!',
      question:
        'At its peak, what percentage of the world\'s population did the Persian Empire rule?',
      options: [
        { text: '10%', isCorrect: false },
        { text: '25%', isCorrect: false },
        { text: '44%', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'persia-essay',
    prompt:
      'What do you think made the Persian Empire so successful at ruling so many different peoples?',
    description:
      'Now it\'s your turn to think like a historian! The Persian Empire ruled over millions of people from dozens of different cultures. Was it their tolerance? Their amazing roads and communication? Their strong military? Or something else? Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Great thinking! Your answer has been saved. You\'re a true Persian scholar!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'persia-reward',
    title: 'Ride the Royal Road!',
    description:
      'You\'ve unlocked the Royal Road Messenger game! Ride your horse between relay stations, deliver messages across the empire, and see if you can beat the 7-day record from Sardis to Susa!',
    lockMessage: 'Royal Road Locked!',
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
    type: 'royal-road-messenger',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Royal Road! You\'re a true Persian scholar!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Explorer!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through time and discovered the incredible story of the Persian Empire, the world\'s first superpower!',
      'You learned about Zoroastrianism, one of the world\'s oldest religions, with its powerful ideas about the battle between good and evil, the sacred fire of truth, and the motto "Good Thoughts, Good Words, Good Deeds." You discovered how these ancient ideas went on to influence almost every major religion that came after.',
      'You met legendary kings like Cyrus the Great, who founded the empire and freed captive peoples; Darius the Great, who built the Royal Road and the magnificent Persepolis; and Xerxes, who led the largest army in the ancient world against Greece. You also met the fearsome Immortals, the 10,000 warriors who seemed impossible to defeat!',
      'You followed the rise and fall of an empire that once ruled 44% of the world\'s population, from its founding by Cyrus around 550 BCE to its conquest by Alexander the Great in 330 BCE. Along the way, you discovered how the Persians invented the postal system, gave women equal pay, and showed the world that tolerance and respect can hold an empire together better than fear and force.',
      'Keep exploring history! The ancient world is full of amazing stories waiting to be discovered!',
    ],
  },
};
