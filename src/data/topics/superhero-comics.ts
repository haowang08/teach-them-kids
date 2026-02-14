import type { Topic } from '../types';

export const superheroComics: Topic = {
  id: 'superhero-comics',
  slug: 'superhero-comics',
  title: 'Superhero Comics',
  subtitle:
    'The History & Evolution of Comic Book Heroes',
  status: 'active',
  themeId: 'superhero-comics',
  heroIcons: ['\u{1F4A5}', '\u{1F9B8}', '\u{1F4D6}'],
  navItems: [
    { id: 'golden-age', icon: '\u{1F31F}', label: 'The Golden Age' },
    { id: 'silver-modern', icon: '\u{1F578}\uFE0F', label: 'Silver & Modern Age' },
    { id: 'how-comics-made', icon: '\u{1F58D}\uFE0F', label: 'How Comics Are Made' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F4A5}',
      title: 'Welcome, Future Comic Creator!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'POW! BAM! WHOOSH! Welcome to the incredible world of superhero comics! For nearly a century, comic books have given us heroes who can fly, lift cars, and save the world before breakfast. But the real story behind these comics is just as exciting as the stories inside them.',
            'Superhero comics were created by real people with extraordinary imaginations, many of them outsiders and underdogs who used their characters to stand up for justice. These creators transformed a few pages of illustrated stories into a massive cultural force that now spans movies, TV shows, video games, and more.',
            'In this adventure, you\'ll discover how two teenagers from Cleveland invented the world\'s first superhero, learn how comic books evolved from simple stories into powerful tales about diversity and social justice, and find out exactly how a comic book goes from an idea in someone\'s head to the colorful pages you read. Let\'s go!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'ofk-aw5G-FQ',
          title: 'How comic books can help you learn',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: The Golden Age ──────────────────────────────
    {
      id: 'golden-age',
      icon: '\u{1F31F}',
      title: 'The Golden Age of Comics (1938\u20131956)',
      readAloudBlocks: [
        {
          id: 'golden-age-intro-text',
          paragraphs: [
            'The story of superhero comics begins in 1938, when two teenagers from Cleveland, Ohio changed entertainment forever. Jerry Siegel was a writer and Joe Shuster was an artist. Both were children of Jewish immigrants, both wore glasses, and both felt like outsiders. Together, they created Superman, the world\'s first superhero!',
            'Superman first appeared in Action Comics #1 in June 1938. He was an alien from the planet Krypton who was sent to Earth as a baby and raised by a kind Kansas farming couple. By day he was Clark Kent, a mild-mannered reporter. But when trouble called, he became Superman: faster than a speeding bullet, more powerful than a locomotive, and able to leap tall buildings in a single bound! The first issue sold out immediately, and the superhero era was born.',
            'Superman was a hero for his time. America was struggling through the Great Depression, and people needed hope. Superman stood for truth, justice, and protecting ordinary people from bullies and crooks. Siegel and Shuster, who felt powerless as young outsiders, had created the ultimate symbol of power used for good.',
          ],
        },
        {
          id: 'golden-age-heroes-text',
          paragraphs: [
            'Superman\'s success launched an explosion of new superheroes. In 1939, Batman arrived in Detective Comics #27. Created by Bob Kane and Bill Finger, Batman was different from Superman: he had no superpowers at all! Instead, Bruce Wayne used his intelligence, detective skills, and gadgets to fight crime in the dark streets of Gotham City. Batman proved that you didn\'t need superpowers to be a hero; you just needed determination and a really cool cape.',
            'Then came Wonder Woman in 1941, created by William Moulton Marston, a psychologist who believed women were more honest and reliable than men. He wanted to create a superhero who would inspire girls. Wonder Woman was an Amazon princess named Diana who left her island paradise to fight for peace and justice in the world. She was strong, brave, and compassionate, one of the first major female superheroes.',
            'During World War II, Captain America burst onto the scene. Created by Joe Simon and Jack Kirby, Captain America\'s very first comic cover showed him punching Adolf Hitler in the face! This was published in March 1941, nine months before America even entered the war. The comic was a bold statement against fascism and became hugely popular with soldiers overseas.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u270D\uFE0F',
          name: 'Jerry Siegel & Joe Shuster',
          title: 'The Creators of Superman',
          description:
            'Jerry Siegel (writer) and Joe Shuster (artist) were two teenagers from Cleveland, Ohio, both children of Jewish immigrants. They created Superman in 1933 but couldn\'t find a publisher for five years! They finally sold the rights for just 130 dollars. Their creation became worth billions, but they struggled financially for decades. Their story is a reminder that great ideas don\'t always bring instant rewards.',
          extraTag: 'Created Superman: 1938',
        },
        {
          emoji: '\u{1F9E0}',
          name: 'William Moulton Marston',
          title: 'Creator of Wonder Woman',
          description:
            'William Moulton Marston was a psychologist, inventor, and feminist who also helped invent an early version of the lie detector test! He believed the world needed a female superhero who would triumph not through violence but through love and truth. He created Wonder Woman in 1941, and her golden Lasso of Truth was inspired by his lie detector work.',
          extraTag: 'Created Wonder Woman: 1941',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'A copy of Action Comics #1, the first appearance of Superman, sold at auction in 2014 for 3.2 million dollars! When it was first published in 1938, it cost just 10 cents. That\'s one of the greatest increases in value of any object in history!',
        },
      ],
      videos: [
        {
          youtubeId: 'Hhk4N9A0oCA',
          title: 'What makes a hero?',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'DSGf6is3U2w',
          title: 'The History of Comics',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['sc-q1a', 'sc-q1b', 'sc-q1c', 'sc-q1d'],
    },

    // ─── Section 2: Silver & Modern Age ─────────────────────────
    {
      id: 'silver-modern',
      icon: '\u{1F578}\uFE0F',
      title: 'Silver & Modern Age: Comics Grow Up',
      readAloudBlocks: [
        {
          id: 'silver-age-text',
          paragraphs: [
            'By the late 1950s, superhero comics were ready for a revolution. The Golden Age heroes had been simple characters: good guys fighting bad guys with clear-cut morals. But a new generation of creators was about to change everything, making heroes more human, more flawed, and more relatable.',
            'In 1962, Stan Lee and Steve Ditko created Spider-Man, a hero unlike any before him. Peter Parker wasn\'t a billionaire or an alien. He was an ordinary, nerdy teenager who got bitten by a radioactive spider and gained incredible powers. But what made Spider-Man revolutionary was that he had real problems: he worried about homework, had trouble talking to girls, needed money for rent, and sometimes made terrible mistakes. His famous motto, "With great power comes great responsibility," became one of the most quoted lines in comic book history.',
            'Stan Lee, working with legendary artist Jack Kirby, went on to co-create an entire universe of flawed heroes: the Fantastic Four, a family that bickered constantly; the Hulk, a scientist cursed to become a monster when angry; Iron Man, a genius with a damaged heart; and Thor, a god who needed to learn humility. These weren\'t perfect paragons of virtue. They were complicated people doing their best, just like the readers.',
          ],
        },
        {
          id: 'modern-age-text',
          paragraphs: [
            'Perhaps the most groundbreaking creation was the X-Men, created by Stan Lee and Jack Kirby in 1963. The X-Men were mutants, people born with special powers who were feared and hated by ordinary humans simply for being different. The stories were a powerful metaphor for the civil rights movement and discrimination of all kinds. Professor X, who sought peaceful coexistence, was inspired by Martin Luther King Jr., while Magneto, who believed in fighting back by any means necessary, echoed Malcolm X.',
            'In the modern era, comics continued to push boundaries. Graphic novels like "Maus" by Art Spiegelman told the story of the Holocaust through comics and won the Pulitzer Prize. "Watchmen" by Alan Moore questioned what superheroes would really be like in the real world. Characters became more diverse: Miles Morales became a Black and Latino Spider-Man, Kamala Khan became the first Muslim character to headline a Marvel comic as Ms. Marvel, and the X-Men continued to represent anyone who has ever felt like an outsider.',
            'Today, superhero comics have evolved from simple children\'s entertainment into a respected art form that tackles complex themes like identity, justice, discrimination, and what it means to be a hero in an imperfect world.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F58A}\uFE0F',
          name: 'Stan Lee',
          title: 'The Man Behind Marvel',
          description:
            'Stan Lee was born Stanley Martin Lieber in New York City in 1922. He started working at Timely Comics (later Marvel) as an office assistant at age 17. He revolutionized comics by giving heroes real human problems and personalities. Along with artists Jack Kirby and Steve Ditko, he co-created Spider-Man, the X-Men, the Fantastic Four, the Hulk, Iron Man, Black Panther, and many more. His catchphrase was "Excelsior!" meaning "ever upward!"',
          extraTag: 'Lived: 1922\u20132018',
        },
        {
          emoji: '\u{1F3A8}',
          name: 'Jack Kirby',
          title: 'The King of Comics',
          description:
            'Jack Kirby, born Jacob Kurtzberg, was one of the most influential comic book artists of all time. He co-created Captain America, the Fantastic Four, the X-Men, the Hulk, Thor, and Black Panther, among hundreds of others. His bold, dynamic art style defined what superhero comics looked like for generations. He\'s often called "The King of Comics" for his enormous contribution to the medium.',
          extraTag: 'Lived: 1917\u20131994',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Stan Lee made cameo appearances in nearly every Marvel movie from 2000 to 2019, a total of over 30 films! He appeared as everything from a hot dog vendor to a FedEx delivery man to an alien barber. Fans looked forward to spotting him in every new Marvel movie.',
        },
      ],
      videos: [],
      quizIds: ['sc-q2a', 'sc-q2b', 'sc-q2c'],
    },

    // ─── Section 3: How Comics Are Made ─────────────────────────
    {
      id: 'how-comics-made',
      icon: '\u{1F58D}\uFE0F',
      title: 'How Comics Are Made',
      readAloudBlocks: [
        {
          id: 'comics-process-text',
          paragraphs: [
            'Have you ever wondered how a comic book actually gets made? It\'s a team effort that combines writing, drawing, and design in a unique art form. Let\'s peek behind the curtain!',
            'Every comic starts with a writer who creates the story, dialogue, and describes each panel. The script goes to a penciler, the artist who draws everything in pencil first. Then an inker goes over the pencil lines with ink to make them bold and permanent. A colorist adds all the colors, and a letterer adds the text, including speech bubbles, thought bubbles, captions, and those famous sound effects!',
            'Comic books have their own special visual language that you probably already know without realizing it. Panels are the individual boxes that contain each moment of the story. They can be any shape or size, and creative artists break panels in unexpected ways to create excitement. Speech bubbles with smooth edges show normal talking, while jagged or spiky bubbles mean someone is shouting or scared. Thought bubbles look like clouds.',
          ],
        },
        {
          id: 'comics-language-text',
          paragraphs: [
            'Then there\'s onomatopoeia, those wonderful sound-effect words that comics are famous for! POW! BAM! CRASH! THWIP! (that\'s the sound of Spider-Man\'s web shooters). SNIKT! (Wolverine\'s claws popping out). These words don\'t just describe sounds; they become part of the visual art, often drawn in big, colorful, explosive letters that leap off the page.',
            'Artists use many clever techniques to show action and emotion. Speed lines behind a character show fast movement. Stars circling someone\'s head mean they\'re dizzy or hurt. Sweat drops show nervousness. A light bulb above someone\'s head means they\'ve just had a great idea! These visual shortcuts are so effective that they\'ve spread from comics into cartoons, video games, emojis, and everyday communication.',
            'Making a single issue of a comic book typically takes a team of five to seven people about a month. A 22-page comic might require the penciler to draw over 100 individual panels, each containing detailed characters, backgrounds, and action. It\'s an incredible amount of work, which is why comic book artists are some of the most skilled illustrators in the world!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The word "THWIP!" was invented by Stan Lee specifically for the sound of Spider-Man\'s web shooters. Before Spider-Man, that word didn\'t exist! Comic creators have invented hundreds of new words for sounds, including "SNIKT" for Wolverine\'s claws, "BAMF" for Nightcrawler\'s teleportation, and "SHAZAM" for Captain Marvel\'s transformation.',
        },
      ],
      videos: [],
      quizIds: ['sc-q3a', 'sc-q3b', 'sc-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Golden Age
    {
      id: 'sc-q1a',
      sectionId: 'golden-age',
      title: 'Quick Quiz Time!',
      question:
        'Who created Superman, the world\'s first superhero?',
      options: [
        { text: 'Stan Lee and Jack Kirby', isCorrect: false },
        {
          text: 'Jerry Siegel and Joe Shuster, two teenagers from Cleveland',
          isCorrect: true,
        },
        { text: 'Bob Kane and Bill Finger', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sc-q1b',
      sectionId: 'golden-age',
      title: 'Golden Age Challenge!',
      question:
        'What was special about Batman compared to Superman?',
      options: [
        { text: 'Batman was even stronger than Superman', isCorrect: false },
        { text: 'Batman was an alien from a different planet', isCorrect: false },
        {
          text: 'Batman had no superpowers and used intelligence and gadgets instead',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sc-q1c',
      sectionId: 'golden-age',
      title: 'Wonder Woman Quiz!',
      question:
        'Why did William Moulton Marston create Wonder Woman?',
      options: [
        {
          text: 'He wanted to create a female superhero who would inspire girls',
          isCorrect: true,
        },
        { text: 'He was hired by the government to boost morale', isCorrect: false },
        { text: 'He wanted to compete with Superman\'s popularity', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sc-q1d',
      sectionId: 'golden-age',
      title: 'Captain America Challenge!',
      question:
        'What bold image appeared on the very first Captain America comic cover in March 1941?',
      options: [
        { text: 'Captain America flying over New York City', isCorrect: false },
        {
          text: 'Captain America punching Adolf Hitler in the face',
          isCorrect: true,
        },
        { text: 'Captain America standing on top of the Statue of Liberty', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Silver & Modern Age
    {
      id: 'sc-q2a',
      sectionId: 'silver-modern',
      title: 'Quick Quiz Time!',
      question:
        'What made Spider-Man different from earlier superheroes like Superman?',
      options: [
        { text: 'He was the first hero with a mask', isCorrect: false },
        {
          text: 'He was an ordinary teenager with real everyday problems',
          isCorrect: true,
        },
        { text: 'He was the first hero who could fly', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sc-q2b',
      sectionId: 'silver-modern',
      title: 'X-Men Challenge!',
      question:
        'The X-Men stories were a powerful metaphor for what real-world issue?',
      options: [
        { text: 'Space exploration and science', isCorrect: false },
        { text: 'Environmental pollution', isCorrect: false },
        {
          text: 'The civil rights movement and discrimination',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sc-q2c',
      sectionId: 'silver-modern',
      title: 'Marvel Motto Quiz!',
      question:
        'What is Spider-Man\'s famous motto about power and responsibility?',
      options: [
        { text: '"Power is everything in this world"', isCorrect: false },
        {
          text: '"With great power comes great responsibility"',
          isCorrect: true,
        },
        { text: '"Use your power to defeat all enemies"', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: How Comics Are Made
    {
      id: 'sc-q3a',
      sectionId: 'how-comics-made',
      title: 'Quick Quiz Time!',
      question:
        'What does a jagged or spiky speech bubble mean in a comic book?',
      options: [
        { text: 'The character is whispering quietly', isCorrect: false },
        {
          text: 'The character is shouting or scared',
          isCorrect: true,
        },
        { text: 'The character is thinking to themselves', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sc-q3b',
      sectionId: 'how-comics-made',
      title: 'Sound Effects Challenge!',
      question:
        'What is onomatopoeia in comic books?',
      options: [
        { text: 'The name of a famous comic book villain', isCorrect: false },
        { text: 'A type of comic book panel layout', isCorrect: false },
        {
          text: 'Words that represent sounds, like POW, BAM, and THWIP',
          isCorrect: true,
        },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'sc-q3c',
      sectionId: 'how-comics-made',
      title: 'Final Challenge!',
      question:
        'Which of these roles is NOT part of the comic book creation team?',
      options: [
        { text: 'Penciler and inker', isCorrect: false },
        {
          text: 'Conductor and choreographer',
          isCorrect: true,
        },
        { text: 'Colorist and letterer', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'sc-essay',
    prompt:
      'Design your own superhero - describe their powers, origin story, and what they stand for',
    description:
      'Now it\'s your turn to be a comic creator! Design your very own superhero. What are their powers? How did they get them? What is their origin story? What do they stand for, and what injustice do they fight against? Every great hero starts with someone\'s imagination. Share your thoughts below. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Excelsior! Your superhero has been saved. You\'re a true comic creator!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'sc-reward',
    title: 'Unlock the Comic Creator Studio!',
    description:
      'You\'ve mastered the history and art of comic books! Unlock your special interactive comic creator tool and design your own comic book panels.',
    lockMessage: 'Comic Creator Studio Locked!',
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
    type: 'comic-creator',
    celebrationMessage:
      'KAPOW! You\'ve unlocked the Comic Creator Studio! With great knowledge comes great creative power!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Excelsior, Comic Creator!',
    paragraphs: [
      'Congratulations! You\'ve traveled through the entire history of superhero comics, from their explosive beginnings to the modern age!',
      'You discovered how two teenagers from Cleveland, Jerry Siegel and Joe Shuster, created Superman in 1938 and launched the superhero genre. You met Batman, the hero who proved you don\'t need superpowers to save the day, Wonder Woman, the Amazon princess created to inspire girls, and Captain America, who punched Hitler before America even entered World War II.',
      'You explored how Stan Lee, Jack Kirby, and Steve Ditko revolutionized comics by creating heroes with real human problems, from the nerdy Peter Parker to the feared and hated X-Men who became a powerful symbol for civil rights and acceptance of all people who feel different.',
      'And you peeked behind the curtain to learn how comics are made: the teamwork of writers, pencilers, inkers, colorists, and letterers who create the panels, speech bubbles, and explosive onomatopoeia that make comics such a unique and exciting art form.',
      'Remember: every great comic started with someone\'s imagination. Maybe the next legendary superhero is waiting inside your mind right now. Excelsior!',
    ],
  },
};
