import type { Topic } from '../types';

export const musicThroughTheAges: Topic = {
  id: 'music-through-the-ages',
  slug: 'music-through-the-ages',
  title: 'Music Through the Ages',
  subtitle:
    'From Ancient Drums to Digital Beats: A Journey Through the World of Sound',
  status: 'active',
  themeId: 'music-through-the-ages',
  heroIcons: ['\u{1F3B5}', '\u{1F3BB}', '\u{1FA98}'],
  navItems: [
    { id: 'ancient-medieval-music', icon: '\u{1FA98}', label: 'Ancient & Medieval' },
    { id: 'classical-to-modern', icon: '\u{1F3B9}', label: 'Classical to Modern' },
    { id: 'global-music-technology', icon: '\u{1F30D}', label: 'Global Music & Tech' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro',
      icon: '\u{1F3B5}',
      title: 'Welcome, Young Music Explorer!',
      readAloudBlocks: [
        {
          id: 'intro-text',
          paragraphs: [
            'Music is one of the oldest human activities. Long before people invented writing or built cities, they were making music. Archaeologists have found bone flutes in European caves that are over 40,000 years old! From the very beginning, music has brought people together, told stories, celebrated victories, and soothed sorrows.',
            'Every culture on Earth has its own musical traditions, instruments, and styles. Some music uses just the human voice, while other traditions use instruments made from animal bones, wood, metal, or even electronics. What all music shares is rhythm, melody, and the incredible power to make us feel something deep inside.',
            'In this adventure, you\'ll travel through thousands of years of music history. You\'ll discover ancient instruments, learn how orchestras and jazz were born, explore music from around the globe, and find out how technology transformed the way we create and listen to music. Let\'s turn up the volume on history!',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'R0JKCYZ8hng',
          title: 'How Playing an Instrument Benefits Your Brain',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: Ancient & Medieval Music ─────────────────────
    {
      id: 'ancient-medieval-music',
      icon: '\u{1FA98}',
      title: 'Ancient & Medieval Music: The First Sounds',
      readAloudBlocks: [
        {
          id: 'ancient-intro-text',
          paragraphs: [
            'The oldest known musical instruments are bone flutes discovered in caves in present-day Germany. Found at sites like Hohle Fels and Geissenklosterle in the Swabian Alps, these flutes were carved from the wing bones of griffon vultures and from mammoth ivory roughly 40,000 years ago. They could play several notes and suggest that music was already an important part of early human culture.',
            'Ancient civilizations developed rich musical traditions. In Mesopotamia (modern-day Iraq), people played lyres, harps, and drums as early as 3000 BCE. The "Royal Lyre of Ur," discovered in a royal tomb dating to about 2500 BCE, is one of the oldest stringed instruments ever found. In ancient Egypt, musicians played harps, flutes, and clappers at religious ceremonies and celebrations. The ancient Greeks believed music had the power to heal the sick and calm the mind, and they developed early music theory that still influences Western music today.',
            'In ancient China, a remarkable set of bone flutes was found at Jiahu, dating to about 7000 BCE. In Africa, drumming traditions stretching back thousands of years served as a way to communicate across long distances, celebrate harvests, and mark important life events. Music was truly a universal language from the very beginning.',
            'During the medieval period in Europe (roughly 500\u20131400 CE), monks in Christian monasteries developed Gregorian chant \u2014 a style of singing that used a single melody line without any instruments or harmony. Named after Pope Gregory I, who is traditionally credited with organizing these chants in the late 500s CE, Gregorian chant became the foundation of Western music. Over time, composers began adding a second voice singing a different melody at the same time, creating "polyphony" \u2014 the beginning of harmony as we know it.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1FA98}',
          name: 'The Bone Flutes of Hohle Fels',
          title: 'The Oldest Known Musical Instruments',
          description:
            'In 2008, archaeologists in the Hohle Fels cave in southern Germany discovered a five-holed flute carved from the wing bone of a griffon vulture. Radiocarbon dating placed it at approximately 40,000 years old, making it one of the oldest confirmed musical instruments in the world. Nearby caves in the Swabian Alps also yielded flutes made from mammoth ivory. These instruments show that early modern humans (Homo sapiens) had already developed complex musical abilities when they first arrived in Europe.',
          extraTag: 'Discovered: 2008, ~40,000 years old',
        },
        {
          emoji: '\u{1F3B6}',
          name: 'The Royal Lyre of Ur',
          title: 'Ancient Mesopotamia\'s Golden Instrument',
          description:
            'The Royal Lyre of Ur was discovered by archaeologist Leonard Woolley in the 1920s in the Royal Cemetery of Ur (in present-day Iraq). Dating to approximately 2500 BCE, this magnificent stringed instrument is decorated with a golden bull\'s head and lapis lazuli inlays. It had eleven strings and was played by plucking. The lyre shows that the ancient Sumerians had sophisticated instrument-building skills and a rich musical culture over 4,500 years ago. A replica can be seen at the British Museum in London.',
          extraTag: 'Discovered: 1920s, ~2500 BCE',
        },
        {
          emoji: '\u{1F3B5}',
          name: 'Gregorian Chant',
          title: 'The Voice of the Medieval Church',
          description:
            'Gregorian chant is a form of sacred song developed in medieval European monasteries, traditionally attributed to Pope Gregory I (who served as Pope from 590 to 604 CE). Monks sang these single-melody chants in Latin during religious services, without any instrumental accompaniment. Gregorian chant used a system of musical notation called "neumes," which was one of the earliest ways of writing music down. This notation system eventually evolved into the standard musical notation (with five-line staffs and note shapes) that musicians still use today.',
          extraTag: 'Tradition: ~6th century CE onward',
        },
        {
          emoji: '\u{1FA71}',
          name: 'African Drumming Traditions',
          title: 'The Heartbeat of a Continent',
          description:
            'Drumming in Africa is one of the oldest and most widespread musical traditions in the world. The djembe, a goblet-shaped hand drum from West Africa, has been played by the Mandinka people for at least 700 years. In many African cultures, drums are used not just for music but for communication. "Talking drums" like the Yoruba dundun can mimic the tones of spoken language, allowing drummers to send messages across villages. African drumming traditions have influenced virtually every popular music genre in the world today, from jazz to rock to hip-hop.',
          extraTag: 'Djembe origins: ~13th century, West Africa',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The oldest known written song is the "Hurrian Hymn No. 6," inscribed on a clay tablet found in the ancient city of Ugarit (in present-day Syria) dating to about 1400 BCE. It was a hymn to Nikkal, the goddess of orchards. Musicologists have deciphered the cuneiform notation and recreated what this 3,400-year-old song may have sounded like!',
        },
      ],
      videos: [
        {
          youtubeId: 'Am18ZxKgi_g',
          title: '40,000 Years of Music Explained in 8 Minutes',
          channelName: 'Big Think',
        },
      ],
      quizIds: ['mta-q1a', 'mta-q1b', 'mta-q1c', 'mta-q1d'],
    },

    // ─── Section 2: Classical to Modern ──────────────────────────
    {
      id: 'classical-to-modern',
      icon: '\u{1F3B9}',
      title: 'Classical to Modern: Orchestras, Pianos, and the Birth of New Genres',
      readAloudBlocks: [
        {
          id: 'classical-intro-text',
          paragraphs: [
            'The period from about 1600 to 1900 saw an incredible explosion of musical creativity in Europe. During the Baroque era (1600\u20131750), composers like Johann Sebastian Bach and Antonio Vivaldi wrote complex, ornate music for small ensembles. Vivaldi\'s "The Four Seasons" (1725) is one of the most recognizable pieces of classical music ever written. The piano was invented around 1700 by Italian instrument maker Bartolomeo Cristofori, and it gradually became the most popular instrument in Western music.',
            'The Classical era (1750\u20131820) brought composers like Wolfgang Amadeus Mozart and Ludwig van Beethoven. Mozart, a child prodigy who began composing at age five, wrote over 600 works in his short 35-year life. Beethoven pushed music to new emotional heights, continuing to compose masterpieces even after losing his hearing in his late twenties. The modern symphony orchestra, with its sections of strings, woodwinds, brass, and percussion, took shape during this period.',
            'In the late 1800s and early 1900s, a brand-new kind of music was born in the United States. Jazz emerged in New Orleans, Louisiana, from the African American community, blending African rhythmic traditions, blues, ragtime, and European harmony. Musicians like Louis Armstrong and Duke Ellington helped spread jazz across America and the world. Jazz introduced improvisation \u2014 making up music on the spot \u2014 as a central element of performance.',
            'In the 1950s, rock and roll burst onto the scene, powered by the electric guitar, drums, and youthful energy. Artists like Chuck Berry, Little Richard, and Elvis Presley drew on rhythm and blues, country, and gospel music to create a sound that transformed popular culture. Rock and roll gave rise to countless sub-genres and showed that music could be a powerful force for social change.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3B9}',
          name: 'The Piano',
          title: 'The King of Instruments',
          description:
            'The piano was invented around 1700 by Bartolomeo Cristofori, a harpsichord maker in Florence, Italy. He called it the "gravicembalo col piano e forte" (harpsichord with soft and loud), because unlike the harpsichord, the piano could play both soft and loud notes depending on how hard you pressed the keys. A modern grand piano has 88 keys and over 200 strings stretched across a cast-iron frame. The piano became so popular because a single player could produce melody, harmony, and bass all at once \u2014 like a one-person orchestra!',
          extraTag: 'Invented: ~1700, Bartolomeo Cristofori',
        },
        {
          emoji: '\u{1F3BC}',
          name: 'Ludwig van Beethoven',
          title: 'The Composer Who Defied Silence',
          description:
            'Ludwig van Beethoven (1770\u20131827) is one of the most celebrated composers in history. Born in Bonn, Germany, he moved to Vienna, Austria, where he composed symphonies, concertos, and sonatas that pushed the boundaries of music. Beethoven began to lose his hearing in his late twenties and was almost completely deaf by his mid-forties, yet he continued to compose some of his greatest works, including his Ninth Symphony with its famous "Ode to Joy." He used a special rod attached to his piano that he clenched in his teeth to feel the vibrations.',
          extraTag: 'Born: 1770, Bonn, Germany',
        },
        {
          emoji: '\u{1F3B7}',
          name: 'Louis Armstrong',
          title: 'The Ambassador of Jazz',
          description:
            'Louis Armstrong (1901\u20131971), nicknamed "Satchmo," was born in New Orleans, Louisiana, and learned to play the cornet as a teenager at a home for troubled youth. He became the most influential jazz musician of the 20th century, known for his brilliant trumpet playing and his distinctive gravelly singing voice. His recordings like "What a Wonderful World" and "West End Blues" are beloved worldwide. Armstrong helped transform jazz from a regional New Orleans style into an international art form.',
          extraTag: 'Born: 1901, New Orleans, Louisiana',
        },
        {
          emoji: '\u{1F3B8}',
          name: 'The Electric Guitar',
          title: 'The Sound of Rock and Roll',
          description:
            'The electric guitar was developed in the 1930s when musicians needed guitars that could be heard over big band horns and drums. In 1931, George Beauchamp and Adolph Rickenbacker created the "Frying Pan," one of the first electric lap steel guitars. Leo Fender introduced the Telecaster in 1950 and the Stratocaster in 1954, making electric guitars affordable and widely available. The electric guitar\'s ability to produce everything from clean tones to heavy distortion made it the defining instrument of rock and roll, blues, and many other genres.',
          extraTag: 'First solid-body: Fender Telecaster, 1950',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'Mozart began composing music at age five and wrote his first symphony at age eight! By the time he died at just 35 years old in 1791, he had composed over 600 works, including 41 symphonies, 27 piano concertos, and 22 operas. Some scholars estimate that if you wrote out all of Mozart\'s music by hand, it would take over 25 years of nonstop writing!',
        },
      ],
      videos: [
        {
          youtubeId: 'otp9kxIyfhQ',
          title: 'Where Does Jazz Come From?',
          channelName: 'mrmylesmusic',
        },
      ],
      quizIds: ['mta-q2a', 'mta-q2b', 'mta-q2c'],
    },

    // ─── Section 3: Global Music & Technology ────────────────────
    {
      id: 'global-music-technology',
      icon: '\u{1F30D}',
      title: 'Global Music & Technology: A World of Sound',
      readAloudBlocks: [
        {
          id: 'global-intro-text',
          paragraphs: [
            'Music sounds different in every corner of the world, and that diversity is one of its greatest treasures. In India, classical music is built on ragas \u2014 melodic frameworks that are associated with specific times of day, seasons, or emotions. Indian classical music has two major traditions: Hindustani (from North India) and Carnatic (from South India). The sitar, a long-necked stringed instrument, became world-famous when Ravi Shankar performed at the Monterey Pop Festival in 1967 and influenced musicians like the Beatles\' George Harrison.',
            'In West Africa, the griot tradition preserves history and culture through music and storytelling. Griots are hereditary musicians and oral historians who have kept their communities\' histories alive for centuries using instruments like the kora (a 21-string harp-lute) and the balafon (a wooden xylophone). In Latin America, rhythms like salsa, samba, and bossa nova blend Indigenous, African, and European musical traditions. The Brazilian samba, with its driving percussion and infectious energy, has roots in the Afro-Brazilian communities of Bahia and Rio de Janeiro.',
            'Technology has completely transformed how music is made and heard. Thomas Edison invented the phonograph in 1877, allowing sound to be recorded and played back for the first time. Vinyl records, cassette tapes, CDs, and MP3s each changed the music industry. In the 1960s and 1970s, electronic instruments like the Moog synthesizer opened up entirely new sounds that no acoustic instrument could produce. Robert Moog built his first synthesizer in 1964, and musicians like Wendy Carlos and Kraftwerk showed the world what electronic music could be.',
            'Today, anyone with a laptop and the right software can produce professional-quality music. Streaming services like Spotify (launched in 2008 in Sweden) and Apple Music give listeners access to over 100 million songs from every genre and every corner of the globe. Music has never been more accessible \u2014 or more diverse \u2014 than it is right now.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3B6}',
          name: 'Indian Ragas',
          title: 'Melodies That Paint Emotions',
          description:
            'A raga is a melodic framework in Indian classical music that provides a set of rules for building a melody \u2014 which notes to use, how to move between them, and what mood to create. There are hundreds of ragas, each associated with a specific time of day, season, or emotion. For example, Raga Bhairav is a morning raga with a solemn, devotional mood. Indian classical musicians spend years learning to master ragas through a guru-student tradition that has been passed down for over 2,000 years. The sitar and tabla are among the most well-known instruments used to perform ragas.',
          extraTag: 'Tradition: Over 2,000 years old',
        },
        {
          emoji: '\u{1FA87}',
          name: 'The Griot Tradition',
          title: 'West Africa\'s Living Libraries',
          description:
            'Griots (also called "jelis" in Mande languages) are hereditary musicians, storytellers, and oral historians found throughout West Africa, particularly among the Mandinka, Fula, and Wolof peoples. Griots memorize the genealogies, histories, and legends of their communities and pass them down through song and story. The kora, their most famous instrument, is a 21-string harp-lute made from a large calabash gourd, and its shimmering sound has been described as a cross between a harp and a flamenco guitar. The griot tradition dates back to at least the 13th-century Mali Empire.',
          extraTag: 'Tradition: At least 800 years old',
        },
        {
          emoji: '\u{1F4BF}',
          name: 'Thomas Edison\'s Phonograph',
          title: 'The Machine That Captured Sound',
          description:
            'In 1877, Thomas Edison invented the phonograph, the first device that could both record and play back sound. He spoke the words "Mary had a little lamb" into the machine, and when the device played them back, he was reportedly astonished that it actually worked! The phonograph used a needle to etch sound waves into a cylinder wrapped in tin foil. This invention changed the world forever \u2014 for the first time, music could be preserved and listened to again and again, without needing live musicians present.',
          extraTag: 'Invented: 1877, Thomas Edison',
        },
        {
          emoji: '\u{1F3B9}',
          name: 'The Moog Synthesizer',
          title: 'The Birth of Electronic Sound',
          description:
            'Robert Moog built his first synthesizer in 1964, creating an instrument that could generate entirely new sounds using electrical signals instead of vibrating strings or air columns. In 1968, musician Wendy Carlos released "Switched-On Bach," an album of Bach compositions performed entirely on a Moog synthesizer \u2014 it became one of the first classical music albums to go platinum. Synthesizers went on to define the sound of genres from disco to new wave to electronic dance music, and they remain essential tools in modern music production.',
          extraTag: 'First Moog: 1964, Robert Moog',
        },
      ],
      funFacts: [
        {
          title: 'Fun Fact!',
          text: 'The most-streamed song on Spotify as of late 2024 is "Blinding Lights" by The Weeknd, with over 4.6 billion streams. But here\'s a wild comparison: if every stream represented one second, listening to "Blinding Lights" 4.6 billion times back to back would take over 48,000 years \u2014 that\'s longer than the bone flutes from Hohle Fels have existed!',
        },
      ],
      videos: [
        {
          youtubeId: 'XxBlgi9hX7A',
          title: 'How Does Music Make Us Feel?',
          channelName: 'Class in the Cloud',
        },
      ],
      quizIds: ['mta-q3a', 'mta-q3b', 'mta-q3c'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Ancient & Medieval Music
    {
      id: 'mta-q1a',
      sectionId: 'ancient-medieval-music',
      title: 'Quick Quiz Time!',
      question:
        'How old are the bone flutes discovered in the Hohle Fels cave in Germany?',
      options: [
        { text: 'About 5,000 years old', isCorrect: false },
        { text: 'About 40,000 years old', isCorrect: true },
        { text: 'About 1,000 years old', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mta-q1b',
      sectionId: 'ancient-medieval-music',
      title: 'Ancient Instruments!',
      question:
        'What ancient stringed instrument was discovered in the Royal Cemetery of Ur in present-day Iraq?',
      options: [
        { text: 'The Royal Lyre of Ur', isCorrect: true },
        { text: 'The Egyptian Harp of Giza', isCorrect: false },
        { text: 'The Greek Kithara of Athens', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mta-q1c',
      sectionId: 'ancient-medieval-music',
      title: 'Medieval Music!',
      question:
        'What is Gregorian chant?',
      options: [
        { text: 'A fast dance with drums popular in medieval castles', isCorrect: false },
        { text: 'A style of single-melody sacred singing developed in medieval monasteries', isCorrect: true },
        { text: 'A type of ancient Greek battle music', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mta-q1d',
      sectionId: 'ancient-medieval-music',
      title: 'Music Communication!',
      question:
        'What special ability do African "talking drums" have?',
      options: [
        { text: 'They can play themselves without a drummer', isCorrect: false },
        { text: 'They can mimic the tones of spoken language to send messages', isCorrect: true },
        { text: 'They can produce sounds louder than thunder', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Classical to Modern
    {
      id: 'mta-q2a',
      sectionId: 'classical-to-modern',
      title: 'Quick Quiz Time!',
      question:
        'Who invented the piano around 1700?',
      options: [
        { text: 'Ludwig van Beethoven', isCorrect: false },
        { text: 'Bartolomeo Cristofori', isCorrect: true },
        { text: 'Antonio Vivaldi', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mta-q2b',
      sectionId: 'classical-to-modern',
      title: 'Jazz Origins!',
      question:
        'In which city did jazz music originate?',
      options: [
        { text: 'New York City', isCorrect: false },
        { text: 'Chicago', isCorrect: false },
        { text: 'New Orleans, Louisiana', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mta-q2c',
      sectionId: 'classical-to-modern',
      title: 'Beethoven\'s Story!',
      question:
        'What remarkable challenge did Beethoven face while composing some of his greatest works?',
      options: [
        { text: 'He lost his ability to see', isCorrect: false },
        { text: 'He lost his hearing', isCorrect: true },
        { text: 'He lost the use of his hands', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Global Music & Technology
    {
      id: 'mta-q3a',
      sectionId: 'global-music-technology',
      title: 'Quick Quiz Time!',
      question:
        'What is a raga in Indian classical music?',
      options: [
        { text: 'A type of drum used in ceremonies', isCorrect: false },
        { text: 'A melodic framework with rules for building a melody', isCorrect: true },
        { text: 'A fast-paced dance performed at festivals', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mta-q3b',
      sectionId: 'global-music-technology',
      title: 'Sound Recording!',
      question:
        'Who invented the phonograph in 1877, allowing sound to be recorded and played back for the first time?',
      options: [
        { text: 'Alexander Graham Bell', isCorrect: false },
        { text: 'Thomas Edison', isCorrect: true },
        { text: 'Nikola Tesla', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'mta-q3c',
      sectionId: 'global-music-technology',
      title: 'West African Traditions!',
      question:
        'What role do griots play in West African culture?',
      options: [
        { text: 'They are hereditary musicians and oral historians who preserve community history through song', isCorrect: true },
        { text: 'They are warriors who use drums to coordinate battles', isCorrect: false },
        { text: 'They are potters who decorate instruments with patterns', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'mta-essay',
    prompt:
      'If you could travel back in time to hear any musical performance in history, which one would you choose and why?',
    description:
      'Now it\'s your turn to think like a music historian! Imagine you have a time machine that can take you to any musical performance in history \u2014 a medieval monastery hearing Gregorian chant, a Beethoven symphony premiere, a New Orleans jazz club in the 1920s, or an ancient African drumming ceremony. Where and when would you go? What would you hope to hear and see? You can type your answer or click the microphone to speak it! Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Wonderful! You have a true ear for music history! Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'mta-reward',
    title: 'Rhythm Timeline!',
    description:
      'You\'ve unlocked the Rhythm Timeline! Explore an interactive timeline of music history where you can hear samples of instruments and styles from every era \u2014 from ancient bone flutes to modern electronic beats. Tap on each era to hear its signature sounds!',
    lockMessage: 'Rhythm Timeline Locked!',
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
    type: 'rhythm-timeline',
    celebrationMessage:
      'AMAZING! You\'ve unlocked the Rhythm Timeline! You\'re a true music historian!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Take a Bow, Music Explorer!',
    paragraphs: [
      'Congratulations! You\'ve journeyed through thousands of years of music history from around the world!',
      'You discovered that the oldest musical instruments \u2014 bone flutes from Hohle Fels, Germany \u2014 are over 40,000 years old, and that ancient civilizations from Mesopotamia to China to Africa all developed rich musical traditions. You learned how Gregorian chant in medieval monasteries laid the foundation for Western music notation.',
      'You traced the rise of the piano (invented by Cristofori around 1700), marveled at Beethoven composing masterpieces while deaf, and followed jazz from New Orleans to the world stage with Louis Armstrong. You saw how the electric guitar powered the rock and roll revolution of the 1950s.',
      'You explored the incredible diversity of global music \u2014 Indian ragas, West African griots and the kora, and the infectious rhythms of Latin American samba and salsa. And you traced how technology, from Edison\'s 1877 phonograph to the Moog synthesizer to modern streaming services, has made music more accessible than ever.',
      'Music connects every culture, every generation, and every corner of the globe. Whether you pick up a drum, a guitar, a piano, or just sing in the shower \u2014 you\'re part of a tradition that stretches back to the very dawn of humanity. Keep listening, keep exploring, and keep making music!',
    ],
  },
};
