import type { Topic } from '../types';

export const photography: Topic = {
  id: 'photography',
  slug: 'photography',
  title: 'Photography',
  subtitle:
    'Capturing Light: From the First Camera to Your Phone',
  status: 'active',
  themeId: 'photography',
  heroIcons: ['\u{1F4F7}', '\u{1F4F8}', '\u{1F305}'],
  navItems: [
    { id: 'history-of-photography', icon: '\u{1F4F7}', label: 'History of Photography' },
    { id: 'light-composition', icon: '\u2600\uFE0F', label: 'Light & Composition' },
    { id: 'photography-world', icon: '\u{1F30D}', label: 'Photography & the World' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F4F7}',
      title: 'Welcome, Young Photographer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Every day, people around the world take about 1.8 trillion photos per year — that\'s roughly 57,000 photos every single second! But just 200 years ago, the only way to record what something looked like was to draw or paint it. The invention of photography changed the world forever.',
            'Photography is both a science and an art. The science is about capturing light — understanding how lenses focus light rays and how sensors (or film) record them. The art is about deciding what to capture and how: choosing the right moment, framing the shot, and using light to create mood and meaning.',
            'In this adventure, you\'ll travel through the fascinating history of photography from the very first blurry image to the incredible cameras in today\'s smartphones. You\'ll learn the principles of composition that make photos look professional, and you\'ll discover how photography has shaped how we see the world. Say cheese!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'XaGUL8B-BrE',
          title: 'Illuminating Photography: From Camera Obscura to Camera Phone',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: History of Photography ─────────────────────
    {
      id: 'history-of-photography',
      icon: '\u{1F4F7}',
      title: 'History of Photography: From Pinhole to Pixel',
      readAloudBlocks: [
        {
          id: 'history-intro-text',
          paragraphs: [
            'The story of photography begins with a simple idea: light traveling through a tiny hole into a dark room creates an upside-down image of the outside world on the opposite wall. This effect, called the "camera obscura" (Latin for "dark room"), was described by the Arab scientist Ibn al-Haytham (Alhazen) around 1021 CE in his groundbreaking book on optics.',
            'For centuries, artists used the camera obscura as a drawing aid, but nobody could figure out how to capture the image permanently — until the 1820s. French inventor Joseph Nic\u00E9phore Ni\u00E9pce created the first known photograph in 1826 or 1827 by exposing a pewter plate coated with a light-sensitive substance to light for about 8 hours! The image, called "View from the Window at Le Gras," was blurry and faint, but it was the world\'s first photograph.',
            'Photography improved rapidly after that. Louis Daguerre invented the daguerreotype in 1839, which produced sharp, detailed images on silver-coated copper plates. Then came flexible film (1880s), color photography (early 1900s), instant Polaroid cameras (1948), and finally digital cameras (1975). Today\'s smartphone cameras take sharp, colorful photos in a fraction of a second — a far cry from Ni\u00E9pce\'s 8-hour exposure!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F4DC}',
          name: 'Ibn al-Haytham (Alhazen)',
          title: 'The Father of Optics',
          description:
            'Ibn al-Haytham (c. 965–1040 CE) was an Arab mathematician and scientist who wrote "Book of Optics," one of the most important scientific works ever written. He was the first person to explain how vision works (light enters the eye, not the other way around) and to describe the camera obscura in detail. He proved his theories through experiments — making him one of the first scientists to use the experimental method. His work influenced European scientists for centuries and laid the foundation for photography!',
          extraTag: 'Book of Optics: ~1021 CE',
        },
        {
          emoji: '\u{1F5BC}\uFE0F',
          name: 'The Daguerreotype',
          title: 'The First Practical Photograph',
          description:
            'Invented by Louis Daguerre and announced in 1839, the daguerreotype was the first commercially practical photographic process. It produced incredibly detailed images on silver-coated copper plates. Each daguerreotype was unique — there was no negative, so you couldn\'t make copies. Exposure times started at about 15 minutes but eventually dropped to under a minute. "Daguerreotype-mania" swept the world, and portrait studios opened in every major city. By the 1850s, millions of daguerreotypes had been made!',
          extraTag: 'Announced: August 19, 1839',
        },
        {
          emoji: '\u{1F4F1}',
          name: 'The Digital Revolution',
          title: 'From Film to Pixels',
          description:
            'The first digital camera was built by Kodak engineer Steven Sasson in 1975. It weighed 3.6 kg (8 pounds), took 23 seconds to capture one image, and the resolution was only 0.01 megapixels (100 \u00D7 100 pixels)! Compare that to a modern smartphone camera at 12-200 megapixels that captures images instantly. Digital cameras replaced film because photos could be stored, copied, edited, and shared instantly. Ironically, Kodak, the company that invented digital photography, went bankrupt in 2012 because it was too slow to switch from selling film!',
          extraTag: 'First digital camera: 1975, Kodak',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The longest camera exposure ever taken lasted 3 years! Photographer Michael Wesely used a pinhole camera to capture construction projects in Berlin and New York, leaving the camera open for years at a time. The resulting images show the entire construction process compressed into a single, dreamlike photo.',
        },
      ],
      videos: [
        {
          youtubeId: '21cxZa0laOA',
          title: 'History of Photography',
          channelName: 'National Geographic',
        },
        {
          youtubeId: 'H9SKnyzNxmU',
          title: 'How Cameras Work',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'QBb6NynV408',
          title: 'Photography Basics',
          channelName: 'Photography',
        },
      ],
      quizIds: ['photo-q1a', 'photo-q1b', 'photo-q1c', 'photo-q1d'],
    },

    // ─── Section 2: Light & Composition ────────────────────────
    {
      id: 'light-composition',
      icon: '\u2600\uFE0F',
      title: 'Light & Composition: What Makes a Great Photo',
      readAloudBlocks: [
        {
          id: 'light-intro-text',
          paragraphs: [
            'The word "photography" comes from Greek: "photos" (light) and "graphein" (to write). Photography literally means "writing with light." Light is the most important element in any photo. The direction, color, and intensity of light determine the mood, texture, and drama of an image.',
            'But knowing how to use light is only half the story. Composition — how you arrange the elements in your frame — is what turns a snapshot into a great photograph. Professional photographers use rules and techniques that have been refined over centuries to create images that grab your attention and hold it.',
            'The most famous rule is the "Rule of Thirds." Imagine dividing your image into 9 equal parts with two horizontal and two vertical lines (like a tic-tac-toe grid). Place the most important elements along these lines or at their intersections, NOT in the center. This creates a more dynamic, interesting image. Our eyes naturally travel to these intersection points first!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u2600\uFE0F',
          name: 'The Rule of Thirds',
          title: 'Photography\'s Most Important Guideline',
          description:
            'The Rule of Thirds was first described by painter and engraver John Thomas Smith in 1797. He noticed that dividing a landscape painting into three horizontal bands (one-third sky, two-thirds land, or vice versa) created a more pleasing image than placing the horizon in the center. Today, every smartphone camera has a "grid" option that overlays this tic-tac-toe pattern. Placing your subject at one of the four intersection points instead of dead center makes photos feel more natural and engaging.',
          extraTag: 'First described: 1797',
        },
        {
          emoji: '\u{1F4A1}',
          name: 'The Exposure Triangle',
          title: 'Three Settings That Control Light',
          description:
            'Every camera controls light with three settings: aperture (how wide the lens opens — like the pupil of your eye), shutter speed (how long the sensor is exposed to light), and ISO (how sensitive the sensor is to light). A wide aperture (low f-number like f/1.8) lets in lots of light and blurs the background. A fast shutter speed (like 1/1000 second) freezes fast motion. A high ISO (like 3200) makes the sensor very sensitive but adds "noise" (graininess). Balancing these three settings is like solving a math equation!',
          extraTag: 'Aperture + Shutter + ISO',
        },
        {
          emoji: '\u{1F308}',
          name: 'Golden Hour',
          title: 'Photography\'s Magic Moment',
          description:
            'The "golden hour" is the period just after sunrise or just before sunset when sunlight is warm, soft, and golden. Photographers love this time because the low angle of the sun creates long shadows, warm colors, and a beautiful glow on everything it touches. The opposite of golden hour is "blue hour" — the brief period before sunrise or after sunset when the sky turns deep blue. Professional photographers plan their shoots around these magical lighting moments!',
          extraTag: 'Just after sunrise / before sunset',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Your smartphone camera actually takes multiple photos every time you press the shutter button! It captures several images at different exposures (light levels) and combines them using software called "computational photography." This technique, called HDR (High Dynamic Range), is why modern phone photos look better than expensive cameras from 20 years ago — even though the sensor is much smaller!',
        },
      ],
      videos: [],
      quizIds: ['photo-q2a', 'photo-q2b', 'photo-q2c'],
    },

    // ─── Section 3: Photography & the World ────────────────────
    {
      id: 'photography-world',
      icon: '\u{1F30D}',
      title: 'Photography & the World: Images That Changed History',
      readAloudBlocks: [
        {
          id: 'world-intro-text',
          paragraphs: [
            'Photography hasn\'t just recorded history — it has changed it. A single photograph can spark a movement, change public opinion, or show the world something it has never seen before. Some photos are so powerful that they become symbols of entire events or eras.',
            'The "Blue Marble" photograph of Earth taken by the Apollo 17 crew in 1972 was one of the first clear photos of the whole planet. Seeing Earth as a small, fragile sphere floating in the darkness of space helped inspire the modern environmental movement. Sometimes seeing something clearly for the first time changes how people think about it forever.',
            'Today, photography is more accessible than ever. Billions of people carry cameras in their pockets. Social media platforms share trillions of images. Photography has become a universal language that crosses borders, languages, and cultures. Whether you\'re photographing your pet, a sunset, or a moment with friends, you\'re participating in an art form that connects people all around the world.',
          ],
        },
        {
          id: 'world-outro-text',
          paragraphs: [
            'From the camera obscura to your smartphone, photography has come an extraordinary distance in just 200 years. It combines art and science in a way that few other mediums can. Every time you take a photo, you\'re writing with light — capturing a moment in time that will never happen exactly the same way again. That makes every photo a small piece of magic!',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F30D}',
          name: 'The Blue Marble',
          title: 'The Photo That Changed How We See Earth',
          description:
            'On December 7, 1972, the crew of Apollo 17 took a photo of Earth from about 29,000 kilometers (18,000 miles) away. Called "The Blue Marble," it was one of the first clear photographs showing the entire sunlit Earth. The image became one of the most reproduced photographs in history and is credited with helping inspire the environmental movement. Seeing Earth as one small, beautiful sphere made people think about protecting it.',
          extraTag: 'December 7, 1972 (Apollo 17)',
        },
        {
          emoji: '\u{1F4F8}',
          name: 'Dorothea Lange',
          title: 'Photography as a Force for Change',
          description:
            'Dorothea Lange (1895–1965) was an American photographer whose images of the Great Depression, especially "Migrant Mother" (1936), showed the world the suffering of displaced farm families. Her photographs were so powerful that they helped convince the U.S. government to send food aid to starving workers. Lange proved that a single photograph could move a nation to action. She said: "The camera is an instrument that teaches people how to see without a camera."',
          extraTag: '"Migrant Mother" (1936)',
        },
        {
          emoji: '\u{1F4F1}',
          name: 'Smartphone Photography',
          title: 'Everyone Is a Photographer Now',
          description:
            'The first smartphone with a built-in camera was the Sharp J-SH04, released in Japan in November 2000. Its camera had a resolution of only 0.11 megapixels! Today, smartphones have multi-lens camera systems with 12 to 200 megapixels, optical zoom, night mode, and AI-powered features. About 92.5% of all photos taken today are shot on smartphones. The best camera, as photographers like to say, is the one you have with you — and that\'s almost always a phone.',
          extraTag: 'First camera phone: 2000 (Sharp J-SH04)',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The most-liked photo on Instagram (as of 2024) is a photo of an egg! Posted by the account @world_record_egg in January 2019, the photo of a plain brown egg was created specifically to break the Instagram record. It received over 60 million likes, proving that sometimes the simplest image captures the world\'s attention!',
        },
      ],
      videos: [],
      quizIds: ['photo-q3a', 'photo-q3b', 'photo-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: History of Photography
    {
      id: 'photo-q1a',
      sectionId: 'history-of-photography',
      title: 'Quick Quiz Time!',
      question:
        'Who first described the camera obscura in detail around 1021 CE?',
      options: [
        { text: 'Leonardo da Vinci', isCorrect: false },
        { text: 'Ibn al-Haytham (Alhazen)', isCorrect: true },
        { text: 'Louis Daguerre', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'photo-q1b',
      sectionId: 'history-of-photography',
      title: 'First Photo Quiz!',
      question:
        'How long did the exposure take for the world\'s first photograph by Ni\u00E9pce?',
      options: [
        { text: 'About 1 minute', isCorrect: false },
        { text: 'About 8 hours', isCorrect: true },
        { text: 'About 1 second', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'photo-q1c',
      sectionId: 'history-of-photography',
      title: 'Digital Revolution!',
      question:
        'What was the resolution of the first digital camera built by Kodak in 1975?',
      options: [
        { text: '1 megapixel', isCorrect: false },
        { text: '0.01 megapixels (100\u00D7100 pixels)', isCorrect: true },
        { text: '12 megapixels', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'photo-q1d',
      sectionId: 'history-of-photography',
      title: 'Photography History!',
      question:
        'What year was the daguerreotype announced to the world?',
      options: [
        { text: '1826', isCorrect: false },
        { text: '1839', isCorrect: true },
        { text: '1875', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Light & Composition
    {
      id: 'photo-q2a',
      sectionId: 'light-composition',
      title: 'Quick Quiz Time!',
      question:
        'What does the "Rule of Thirds" tell you to do?',
      options: [
        { text: 'Always center your subject', isCorrect: false },
        { text: 'Place important elements along grid lines or their intersections, not in the center', isCorrect: true },
        { text: 'Take three photos of every subject', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'photo-q2b',
      sectionId: 'light-composition',
      title: 'Exposure Triangle!',
      question:
        'What are the three settings that control how much light reaches a camera\'s sensor?',
      options: [
        { text: 'Zoom, flash, and timer', isCorrect: false },
        { text: 'Aperture, shutter speed, and ISO', isCorrect: true },
        { text: 'Brightness, contrast, and saturation', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'photo-q2c',
      sectionId: 'light-composition',
      title: 'Golden Hour Quiz!',
      question:
        'What is the "golden hour" in photography?',
      options: [
        { text: 'The busiest hour at a photo studio', isCorrect: false },
        { text: 'The period just after sunrise or before sunset with warm, soft light', isCorrect: true },
        { text: 'The first hour after buying a new camera', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Photography & the World
    {
      id: 'photo-q3a',
      sectionId: 'photography-world',
      title: 'Quick Quiz Time!',
      question:
        'What famous photograph, taken by the Apollo 17 crew in 1972, helped inspire the environmental movement?',
      options: [
        { text: 'The Milky Way', isCorrect: false },
        { text: 'The Blue Marble', isCorrect: true },
        { text: 'The Pale Blue Dot', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'photo-q3b',
      sectionId: 'photography-world',
      title: 'Powerful Photos!',
      question:
        'Which photographer\'s images of the Great Depression helped convince the U.S. government to send food aid?',
      options: [
        { text: 'Ansel Adams', isCorrect: false },
        { text: 'Dorothea Lange', isCorrect: true },
        { text: 'Annie Leibovitz', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'photo-q3c',
      sectionId: 'photography-world',
      title: 'Camera Phone History!',
      question:
        'In what year was the first smartphone with a built-in camera released?',
      options: [
        { text: '1995', isCorrect: false },
        { text: '2000', isCorrect: true },
        { text: '2007', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'photo-essay',
    prompt:
      'What moment or subject would you most want to photograph, and why?',
    description:
      'Now it\'s your turn to think like a photographer! If you could photograph anything in the world — a place, a person, an event, an animal, a moment — what would it be? Think about what makes a great photo: interesting light, strong composition, and a meaningful subject. Describe the photo you\'d take and what would make it special. You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Beautiful vision! You see the world like a true photographer! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'photo-reward',
    title: 'Photo Compositor!',
    description:
      'You\'ve unlocked the Photo Compositor! Arrange subjects, adjust lighting, and apply the Rule of Thirds to create perfectly composed photographs. Get scored on your composition skills and learn what makes a photo truly great!',
    lockMessage: 'Photo Compositor Locked!',
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
    type: 'photo-compositor',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Photo Compositor! You\'re a true photographer!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Picture Perfect!',
    paragraphs: [
      'Congratulations! You\'ve explored the fascinating world of photography from its very beginnings to today!',
      'You discovered how Ibn al-Haytham described the camera obscura over 1,000 years ago, how Ni\u00E9pce took the first photograph with an 8-hour exposure, and how the daguerreotype sparked "photograph mania" in 1839. You traced the journey from Kodak\'s 0.01-megapixel first digital camera to the 200-megapixel smartphones we carry today.',
      'You learned the art of composition: the Rule of Thirds (place subjects off-center), the exposure triangle (aperture + shutter speed + ISO), and the magic of golden hour lighting. These principles help you take better photos with any camera, even a phone!',
      'And you saw how photography changed the world: how "The Blue Marble" inspired environmentalism, how Dorothea Lange\'s "Migrant Mother" moved a nation, and how camera phones put photography in billions of pockets.',
      'Now grab any camera — even a phone — and start seeing the world through a photographer\'s eye. Every great photo starts with noticing something beautiful, interesting, or meaningful. That\'s a skill anyone can learn!',
    ],
  },
};
