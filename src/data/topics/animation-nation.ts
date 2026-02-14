import type { Topic } from '../types';

export const animationNation: Topic = {
  id: 'animation-nation',
  slug: 'animation-nation',
  title: 'Animation Nation',
  subtitle:
    'How Pictures Come to Life',
  status: 'active',
  themeId: 'animation-nation',
  heroIcons: ['\u{1F3AC}', '\u{1F3A8}', '\u2728'],
  navItems: [
    { id: 'early-animation', icon: '\u{1F3AC}', label: 'Early Animation' },
    { id: 'golden-age', icon: '\u{1F31F}', label: 'The Golden Age' },
    { id: 'modern-animation', icon: '\u{1F680}', label: 'Modern Animation' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3AC}',
      title: 'Welcome to Animation Nation!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Have you ever wondered how your favorite cartoon characters move, dance, and come to life on screen? Welcome to Animation Nation, where we\'ll discover the incredible art and science of making pictures move!',
            'Animation is one of the most magical art forms ever invented. At its core, it\'s based on a simple trick: if you show a series of slightly different pictures fast enough, your brain blends them together and sees smooth motion. This is called "persistence of vision." Your eyes hold onto an image for a tiny fraction of a second after it disappears, so when the next image appears, it connects seamlessly to the last one.',
            'From the earliest spinning toys to today\'s billion-dollar computer-animated movies, the story of animation is filled with brilliant inventors, visionary artists, and technological breakthroughs that changed entertainment forever. Let\'s start at the very beginning!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'V8A4qudmsX0',
          title: 'Animation Basics: The Optical Illusion of Motion',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Early Animation ──────────────────────────────
    {
      id: 'early-animation',
      icon: '\u{1F3AC}',
      title: 'Early Animation: The Birth of Moving Pictures',
      readAloudBlocks: [
        {
          id: 'early-animation-intro-text',
          paragraphs: [
            'Long before movies or television existed, people were fascinated by the idea of making pictures move. The history of animation stretches back hundreds of years, starting with simple toys and inventions that seem like magic even today!',
            'The zoetrope, invented in 1834, was one of the earliest animation devices. It\'s a spinning drum with slits cut into the sides and a strip of pictures on the inside. When you spin the drum and look through the slits, the pictures appear to move! Each picture is slightly different from the one before it, creating the illusion of a running horse, a jumping frog, or a dancing figure. Zoetropes were incredibly popular toys in the 1800s.',
            'The flipbook, patented in 1868 by John Barnes Linnett, is perhaps the simplest and most beloved animation device ever created. It\'s just a stack of papers with a slightly different drawing on each page. When you flip through the pages quickly with your thumb, the drawings appear to move! You can make your own flipbook right now with just a notepad and a pencil. Every animator who ever lived started by making flipbooks.',
          ],
        },
        {
          id: 'early-films-text',
          paragraphs: [
            'The first animated films were created in the early 1900s, and they amazed audiences who had never seen drawn characters move on a big screen. In 1908, French artist \u00c9mile Cohl created "Fantasmagorie," which is considered one of the first fully animated films. It featured simple stick figures that transformed into different shapes and characters over the course of about two minutes.',
            'In 1914, American cartoonist Winsor McCay created "Gertie the Dinosaur," a groundbreaking animated short that featured a lovable dinosaur who seemed to interact with McCay himself on stage. McCay drew every single frame by hand, around 10,000 drawings! Gertie could drink water, dance, and even cry. Audiences were absolutely amazed. Gertie is often considered the first animated character with a real personality.',
            'These early pioneers proved that animation could be more than just a novelty trick. It could tell stories, create characters that audiences loved, and express emotions in ways that live-action films couldn\'t. The stage was set for animation\'s golden age!',
          ],
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Winsor McCay hand-drew approximately 10,000 individual frames for his 1914 film "Gertie the Dinosaur." Each drawing had to be slightly different from the last. That\'s incredible dedication! Today, a computer can generate millions of frames, but the principle is exactly the same.',
        },
      ],
      videos: [],
      quizIds: ['anim-q1a', 'anim-q1b', 'anim-q1c', 'anim-q1d'],
    },

    // ─── Section 2: The Golden Age ───────────────────────────────
    {
      id: 'golden-age',
      icon: '\u{1F31F}',
      title: 'The Golden Age of Animation',
      readAloudBlocks: [
        {
          id: 'golden-age-intro-text',
          paragraphs: [
            'The 1930s through the 1960s are known as the Golden Age of Animation, a period when animation went from simple short cartoons to full-length feature films that amazed the world. This era gave us some of the most beloved characters and stories in entertainment history!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3A9}',
          name: 'Walt Disney',
          title: 'The Man Who Built the Magic Kingdom',
          description:
            'Walt Disney transformed animation from a novelty into a major art form. In 1928, he introduced Mickey Mouse in "Steamboat Willie," one of the first cartoons with synchronized sound. Then in 1937, he shocked the world by releasing "Snow White and the Seven Dwarfs," the first full-length animated feature film. People thought he was crazy for trying, calling it "Disney\'s Folly," but Snow White became a massive hit! Disney went on to create Pinocchio, Fantasia, Bambi, and Cinderella, pioneering techniques like the multiplane camera that gave animated scenes a sense of depth. His studio set the standard for animation quality that persists to this day.',
          extraTag: 'Known for: Mickey Mouse and the first animated feature film',
        },
        {
          emoji: '\u{1F407}',
          name: 'Warner Bros. Animation',
          title: 'The Looney Tunes Revolution',
          description:
            'While Disney focused on fairy tales and beauty, Warner Bros. took a completely different approach with their Looney Tunes and Merrie Melodies cartoons. Directors like Chuck Jones, Tex Avery, and Friz Freleng created wild, fast-paced cartoons starring Bugs Bunny, Daffy Duck, and the Road Runner. These cartoons were funnier, crazier, and more irreverent than anything Disney was making. Chuck Jones\' "What\'s Opera, Doc?" (1957), which put Bugs Bunny and Elmer Fudd in a Wagnerian opera, is considered one of the greatest animated shorts ever made.',
          extraTag: 'Known for: Bugs Bunny, Daffy Duck, and wild comedy',
        },
        {
          emoji: '\u{1F9F1}',
          name: 'Ray Harryhausen',
          title: 'The Stop Motion Wizard',
          description:
            'Ray Harryhausen was a visual effects pioneer who brought mythical creatures to life using stop-motion animation. In stop motion, you move a physical model just a tiny bit, take a photograph, move it again, take another photograph, and repeat thousands of times. When the photographs are played back as a film, the model appears to move on its own! Harryhausen created unforgettable creatures including the skeleton army in "Jason and the Argonauts" (1963) and the giant octopus in "It Came from Beneath the Sea" (1955). His work inspired an entire generation of filmmakers, including Steven Spielberg, George Lucas, and Peter Jackson.',
          extraTag: 'Known for: Stop-motion monsters and mythical creatures',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'When Walt Disney was making "Snow White and the Seven Dwarfs," many people in Hollywood called it "Disney\'s Folly" because they were sure nobody would sit through a 90-minute cartoon. The film earned over $8 million at the box office in 1937, which is equivalent to about $170 million today! Disney had the last laugh.',
        },
      ],
      videos: [],
      quizIds: ['anim-q2a', 'anim-q2b', 'anim-q2c'],
    },

    // ─── Section 3: Modern Animation ─────────────────────────────
    {
      id: 'modern-animation',
      icon: '\u{1F680}',
      title: 'Modern Animation: Pixels, Computers, and Anime',
      readAloudBlocks: [
        {
          id: 'modern-intro-text',
          paragraphs: [
            'The world of animation changed forever when computers entered the picture. Today\'s animated films are created using technology that the earliest animators could never have imagined. But even with all the digital wizardry, the heart of great animation remains the same: telling stories that move people emotionally.',
          ],
        },
        {
          id: 'pixar-text',
          paragraphs: [
            'Pixar Animation Studios revolutionized the film industry in 1995 when they released "Toy Story," the world\'s first entirely computer-animated feature film. Using CGI (Computer-Generated Imagery), Pixar created a world where toys came to life when humans weren\'t looking. The film was a massive hit, and suddenly every studio wanted to make computer-animated movies.',
            'But Pixar\'s success wasn\'t just about technology. It was about storytelling. Films like "Finding Nemo," "Up," "Inside Out," and "Coco" are beloved because they tell deeply emotional stories with unforgettable characters. Pixar proved that CGI animation could make audiences laugh, cry, and feel as deeply as any live-action film. Today, CGI is the dominant form of animation in Hollywood, and the technology keeps getting more impressive every year.',
          ],
        },
        {
          id: 'anime-ghibli-text',
          paragraphs: [
            'While Hollywood embraced CGI, Japan developed its own unique style of animation called anime. Anime features distinctive character designs with large expressive eyes, dramatic storylines, and themes that range from lighthearted comedies to epic adventures. Anime covers every genre imaginable and is enjoyed by all ages, not just children.',
            'The greatest anime studio in history is Studio Ghibli, co-founded by the legendary director Hayao Miyazaki. Miyazaki\'s films, including "My Neighbor Totoro," "Spirited Away," "Princess Mononoke," and "Howl\'s Moving Castle," are hand-drawn masterpieces that combine breathtaking artistry with profound storytelling. "Spirited Away" won the Academy Award for Best Animated Feature in 2003, bringing worldwide recognition to Japanese animation.',
            'Miyazaki is famous for his dedication to hand-drawn animation. Even as the rest of the industry moved to computers, he insisted on drawing every frame by hand, believing that the imperfections of hand-drawn art give it warmth and soul. At Studio Ghibli, a single second of animation might require 24 hand-drawn and hand-painted frames! Miyazaki has often been called "the Walt Disney of Japan," though his films have a very different sensibility, often exploring complex themes about nature, war, and growing up.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3A8}',
          name: 'Hayao Miyazaki',
          title: 'The Master of Japanese Animation',
          description:
            'Hayao Miyazaki is one of the greatest animators and filmmakers who ever lived. Born in 1941 in Tokyo, he co-founded Studio Ghibli in 1985 and went on to create some of the most beautiful animated films in history. His movies are known for their strong female characters, stunning hand-drawn visuals, and deep respect for nature. "Spirited Away" became the highest-grossing film in Japanese history and won the Academy Award for Best Animated Feature. Miyazaki has "retired" multiple times but keeps coming back because he simply can\'t stop creating!',
          extraTag: 'Known for: Spirited Away, Totoro, and hand-drawn mastery',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'It took Pixar\'s computers about four years to create "Toy Story," and each individual frame took between four and thirteen hours to render (that\'s the computer calculating what the image should look like). The entire movie is only about 77 minutes long, but it required 800,000 hours of computer processing time! Today\'s computers are much faster, but modern animated films are also much more complex.',
        },
      ],
      videos: [
        {
          youtubeId: '_IZMVMf4NQ0',
          title: 'Pixar: The Math Behind the Movies',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['anim-q3a', 'anim-q3b', 'anim-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Early Animation
    {
      id: 'anim-q1a',
      sectionId: 'early-animation',
      title: 'Quick Quiz Time!',
      question:
        'What is "persistence of vision"?',
      options: [
        { text: 'A type of camera lens', isCorrect: false },
        { text: 'Your eyes holding onto an image briefly, creating the illusion of motion', isCorrect: true },
        { text: 'A special kind of paint used in animation', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'anim-q1b',
      sectionId: 'early-animation',
      title: 'Invention Challenge!',
      question:
        'What is a zoetrope?',
      options: [
        { text: 'A type of video camera', isCorrect: false },
        { text: 'A spinning drum with slits that creates the illusion of moving pictures', isCorrect: true },
        { text: 'A musical instrument from ancient Greece', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'anim-q1c',
      sectionId: 'early-animation',
      title: 'Pioneer Quiz!',
      question:
        'What was special about Winsor McCay\'s "Gertie the Dinosaur" from 1914?',
      options: [
        { text: 'It was made entirely by computer', isCorrect: false },
        { text: 'It was one of the first animated characters with a real personality', isCorrect: true },
        { text: 'It was the first color animated film', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'anim-q1d',
      sectionId: 'early-animation',
      title: 'Flipbook Quiz!',
      question:
        'When was the flipbook patented?',
      options: [
        { text: '1776', isCorrect: false },
        { text: '1868', isCorrect: true },
        { text: '1920', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Golden Age
    {
      id: 'anim-q2a',
      sectionId: 'golden-age',
      title: 'Disney Quiz!',
      question:
        'What was the first full-length animated feature film?',
      options: [
        { text: 'Fantasia', isCorrect: false },
        { text: 'Snow White and the Seven Dwarfs', isCorrect: true },
        { text: 'Bambi', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'anim-q2b',
      sectionId: 'golden-age',
      title: 'Stop Motion Challenge!',
      question:
        'How does stop-motion animation work?',
      options: [
        { text: 'By drawing each frame on paper', isCorrect: false },
        { text: 'By moving a physical model slightly and photographing each position', isCorrect: true },
        { text: 'By filming real actors in costumes', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'anim-q2c',
      sectionId: 'golden-age',
      title: 'Looney Tunes Quiz!',
      question:
        'How was Warner Bros.\' approach to animation different from Disney\'s during the Golden Age?',
      options: [
        { text: 'Warner Bros. made fairy tales and Disney made comedies', isCorrect: false },
        { text: 'Warner Bros. made wild, fast-paced comedies while Disney focused on fairy tales and beauty', isCorrect: true },
        { text: 'There was no difference between them', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Modern Animation
    {
      id: 'anim-q3a',
      sectionId: 'modern-animation',
      title: 'Pixar Quiz!',
      question:
        'What was the world\'s first entirely computer-animated feature film?',
      options: [
        { text: 'Finding Nemo', isCorrect: false },
        { text: 'Toy Story', isCorrect: true },
        { text: 'Shrek', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'anim-q3b',
      sectionId: 'modern-animation',
      title: 'Anime Challenge!',
      question:
        'Which Studio Ghibli film won the Academy Award for Best Animated Feature?',
      options: [
        { text: 'My Neighbor Totoro', isCorrect: false },
        { text: 'Spirited Away', isCorrect: true },
        { text: 'Princess Mononoke', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'anim-q3c',
      sectionId: 'modern-animation',
      title: 'Final Animation Quiz!',
      question:
        'Why does Hayao Miyazaki insist on hand-drawn animation instead of using computers?',
      options: [
        { text: 'Because computers are too expensive', isCorrect: false },
        { text: 'Because he believes the imperfections of hand-drawn art give it warmth and soul', isCorrect: true },
        { text: 'Because he doesn\'t know how to use computers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'animation-essay',
    prompt:
      'If you could create your own animated movie, what would it be about?',
    description:
      'Now it\'s your turn to be an animation director! Imagine you have an entire animation studio at your command. What story would you tell? What characters would you create? Would it be hand-drawn, CGI, stop-motion, or something completely new? You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Incredible imagination! Your animated movie idea has been saved. You\'re a true animation visionary!',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'animation-reward',
    title: 'Flipbook Maker Studio!',
    description:
      'You\'ve unlocked the Flipbook Maker! Explore the magic of animation and discover how simple drawings can come to life through the power of persistence of vision.',
    lockMessage: 'Flipbook Maker Locked!',
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
    type: 'flipbook-maker',
    celebrationMessage:
      'LIGHTS, CAMERA, ACTION! You\'ve unlocked the Flipbook Maker Studio! You\'re a true animation master!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'You Did It, Animation Explorer!',
    paragraphs: [
      'Congratulations! You\'ve completed an amazing journey through the history of animation!',
      'You discovered how the earliest animation devices, like the zoetrope and flipbook, used simple tricks of the eye to make pictures appear to move. You learned about pioneers like \u00c9mile Cohl, who created one of the first animated films, and Winsor McCay, who gave Gertie the Dinosaur a personality that audiences adored.',
      'You explored the Golden Age, when Walt Disney proved that animated feature films could be serious art with "Snow White and the Seven Dwarfs." You met the wild world of Warner Bros.\' Looney Tunes and learned how Ray Harryhausen brought impossible creatures to life with stop-motion magic.',
      'You witnessed the computer revolution, from Pixar\'s groundbreaking "Toy Story" to the emotional masterpieces that followed. And you traveled to Japan to discover the hand-drawn wonders of Studio Ghibli and the visionary genius of Hayao Miyazaki.',
      'The art of animation continues to evolve every day. Who knows? Maybe you\'ll be the next great animator who changes the world with your imagination and creativity. Keep drawing, keep dreaming, and keep making pictures come to life!',
    ],
  },
};
