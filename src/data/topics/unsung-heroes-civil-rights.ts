import type { Topic } from '../types';

export const unsungHeroesCivilRights: Topic = {
  id: 'unsung-heroes-civil-rights',
  slug: 'unsung-heroes-civil-rights',
  title: 'Fight for Your Rights: Civil Rights',
  subtitle: 'From Segregation to Standing Rock \u2014 The Global March for Justice',
  status: 'active',
  themeId: 'unsung-heroes',
  heroIcons: ['\u{270A}\u{1F3FE}', '\u{1F54A}\uFE0F', '\u{2696}\uFE0F'],
  navItems: [
    { id: 'intro-civil', icon: '\u{270A}\u{1F3FE}', label: 'What Are Civil Rights?' },
    { id: 'us-civil-rights', icon: '\u{1F1FA}\u{1F1F8}', label: 'U.S. Civil Rights' },
    { id: 'south-africa', icon: '\u{1F1FF}\u{1F1E6}', label: 'South Africa' },
    { id: 'indigenous-rights', icon: '\u{1F30D}', label: 'Indigenous Rights' },
    { id: 'disability-rights', icon: '\u{267F}', label: 'Disability Rights' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro-civil',
      icon: '\u{270A}\u{1F3FE}',
      title: 'What Does It Mean to Have Civil Rights?',
      readAloudBlocks: [
        {
          id: 'intro-civil-text',
          paragraphs: [
            'Civil rights are the basic rights that every person should have: the right to be treated equally, to vote, to go to school, to live where you want, to eat at any restaurant, and to be judged by who you are rather than the color of your skin, your religion, your gender, or your disability. These rights seem obvious today. But for most of human history, they didn\'t exist for huge numbers of people.',
            'In the United States, Black Americans were enslaved for over 200 years, and even after slavery ended, laws called "Jim Crow" kept them segregated and unequal for another century. In South Africa, a brutal system called apartheid separated people by race from 1948 to 1994. Indigenous peoples on every continent have had their lands stolen and cultures suppressed. People with disabilities have been locked away in institutions and denied basic participation in society.',
            'This lesson tells the stories of the people who fought back. From the lunch counters of Nashville to the prisons of Robben Island, from Standing Rock to the steps of the U.S. Capitol, these are stories of extraordinary courage in the face of enormous injustice. And the fight is far from over.',
          ],
        },
      ],
      videos: [
        {
          youtubeId: 'S64zRnnn4Po',
          title: 'Civil Rights and the 1950s: Crash Course US History #39',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: [],
    },

    // ─── Section 1: U.S. Civil Rights ────────────────────────────
    {
      id: 'us-civil-rights',
      icon: '\u{1F1FA}\u{1F1F8}',
      title: 'The American Civil Rights Movement',
      readAloudBlocks: [
        {
          id: 'us-civil-intro',
          paragraphs: [
            'After the Civil War ended slavery in 1865, Southern states quickly created new laws to keep Black Americans as second-class citizens. These "Jim Crow" laws enforced racial segregation: separate schools, separate water fountains, separate restaurants, separate seats on buses. Everything was "separate but equal," except it was never equal. Black schools got old, torn-up textbooks. Black neighborhoods had unpaved roads and no services. Black people who tried to vote faced impossible "literacy tests," poll taxes, and violent threats.',
            'The modern civil rights movement exploded in the 1950s and 1960s, but its roots go much deeper. Organizations like the NAACP (National Association for the Advancement of Colored People), founded in 1909, had been fighting segregation in courts for decades.',
          ],
        },
        {
          id: 'us-civil-rosa-ruby',
          paragraphs: [
            'On December 1, 1955, Rosa Parks, a 42-year-old seamstress in Montgomery, Alabama, refused to give up her bus seat to a white passenger. She was arrested. But Rosa Parks wasn\'t just a tired woman who\'d had enough. She was a trained activist who had attended workshops on nonviolent resistance. Her arrest sparked the Montgomery Bus Boycott: for 381 days, Black residents of Montgomery refused to ride the buses. They walked, carpooled, and organized. The boycott was led by a young minister named Dr. Martin Luther King Jr., who was just 26 years old.',
            'In 1960, a six-year-old girl named Ruby Bridges walked into William Frantz Elementary School in New Orleans, Louisiana, becoming the first Black child to attend an all-white elementary school in the Deep South. Federal marshals had to escort her past screaming mobs of white adults. For an entire year, Ruby sat alone in her classroom because white parents pulled their children out. Her teacher, Barbara Henry, taught only Ruby for the whole year. Ruby later said: "My message is that racism is a grown-up disease, and we must stop using our children to spread it."',
          ],
        },
        {
          id: 'us-civil-mlk',
          paragraphs: [
            'The movement grew through sit-ins, where Black students peacefully sat at "whites only" lunch counters and refused to leave. The Freedom Riders, groups of Black and white activists, rode buses through the South to challenge segregated interstate travel. They were attacked, beaten, and their buses were firebombed. In 1957, nine Black students known as the Little Rock Nine enrolled at Central High School in Little Rock, Arkansas, facing violent mobs so dangerous that President Eisenhower sent the 101st Airborne Division of the U.S. Army to protect them.',
            'Dr. Martin Luther King Jr. led the movement with a philosophy of nonviolent resistance, inspired by Mahatma Gandhi. His "I Have a Dream" speech, delivered to over 250,000 people at the March on Washington on August 28, 1963, is one of the most famous speeches in history. The movement\'s sustained pressure led to the Civil Rights Act of 1964, which outlawed discrimination based on race, color, religion, sex, or national origin, and the Voting Rights Act of 1965, which protected Black Americans\' right to vote.',
            'The victories came at a terrible cost. Medgar Evers, an NAACP field secretary, was assassinated in 1963. Four young girls were killed when the 16th Street Baptist Church in Birmingham was bombed the same year. And on April 4, 1968, Dr. Martin Luther King Jr. himself was assassinated in Memphis, Tennessee. He was only 39 years old. But the laws he helped pass transformed America.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F54A}\uFE0F',
          name: 'Dr. Martin Luther King Jr.',
          title: 'Civil Rights Leader & Nobel Laureate (1929\u20131968)',
          description:
            'Dr. Martin Luther King Jr. was the most prominent leader of the American civil rights movement. A Baptist minister from Atlanta, Georgia, he led the Montgomery Bus Boycott at age 26 and went on to organize nonviolent protests across the South. His "I Have a Dream" speech at the 1963 March on Washington is one of the greatest speeches ever delivered. He won the Nobel Peace Prize in 1964 and was assassinated in 1968 at age 39.',
          extraTag: 'Led the March on Washington, 1963',
        },
        {
          emoji: '\u{1F6F8}',
          name: 'Rosa Parks',
          title: '"Mother of the Civil Rights Movement" (1913\u20132005)',
          description:
            'Rosa Parks was a civil rights activist whose refusal to give up her bus seat to a white passenger in Montgomery, Alabama, on December 1, 1955, sparked the Montgomery Bus Boycott. Far from a spontaneous act, Parks was a trained activist who had studied nonviolent resistance. The 381-day boycott she inspired led to a Supreme Court ruling that bus segregation was unconstitutional.',
          extraTag: 'Sparked the 381-day Montgomery Bus Boycott',
        },
        {
          emoji: '\u{1F393}',
          name: 'Ruby Bridges',
          title: 'First Black Child to Desegregate a Southern Elementary School (1954\u2013)',
          description:
            'In 1960, six-year-old Ruby Bridges walked past screaming mobs of white adults, escorted by federal marshals, to become the first Black child to attend an all-white elementary school in the Deep South. For a year, she was the only student in her class because white parents pulled their children from the school. Her courage at such a young age became a symbol of the civil rights movement. Norman Rockwell immortalized her walk in his famous painting "The Problem We All Live With."',
          extraTag: 'Just 6 years old when she made history',
        },
      ],
      funFacts: [
        {
          title: 'The 381-Day Walk to Freedom',
          text: 'During the Montgomery Bus Boycott, Black residents refused to ride city buses for 381 days, over a year! The boycott cost the bus company 65% of its revenue. People walked miles to work, organized carpools, and even rode mules. Dr. King\'s house was bombed during the boycott, but he told the angry crowd that gathered: "We must meet hate with love." The boycott ended when the Supreme Court ruled bus segregation unconstitutional.',
        },
      ],
      videos: [
        {
          youtubeId: 'tLfbmepDd4c',
          title: 'The Hidden Life of Rosa Parks',
          channelName: 'TED-Ed',
        },
        {
          youtubeId: 'F624q1jBd0Y',
          title: 'Student Civil Rights Activism: Crash Course Black American History #37',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['civil-q1', 'civil-q2', 'civil-q3'],
    },

    // ─── Section 2: South Africa ─────────────────────────────────
    {
      id: 'south-africa',
      icon: '\u{1F1FF}\u{1F1E6}',
      title: 'Apartheid and Freedom in South Africa',
      readAloudBlocks: [
        {
          id: 'sa-intro',
          paragraphs: [
            'In 1948, the South African government made racism into law. The system was called "apartheid," an Afrikaans word meaning "separateness." Under apartheid, every person in South Africa was classified by race: White, Black, Coloured (mixed race), or Indian. Where you could live, work, go to school, eat, swim, or even sit on a park bench was determined entirely by the color of your skin.',
            'Black South Africans, who made up about 80% of the population, were forced onto just 13% of the land. They were required to carry passes everywhere and could be arrested for being in a "white area" without permission. Black schools received a fraction of the funding that white schools got. Interracial marriage was illegal. Black people couldn\'t vote.',
          ],
        },
        {
          id: 'sa-mandela',
          paragraphs: [
            'Nelson Mandela was born in 1918 in the Transkei region of South Africa. He studied law and joined the African National Congress (ANC), the main organization fighting apartheid. At first, the ANC used peaceful protest: strikes, boycotts, and civil disobedience. But after the Sharpeville Massacre of 1960, when police opened fire on unarmed protesters and killed 69 people, Mandela concluded that nonviolent protest alone wasn\'t enough. He helped form a militant wing of the ANC.',
            'In 1962, Mandela was arrested and, in 1964, sentenced to life in prison. He spent 27 years behind bars, mostly on Robben Island, a bleak prison off the coast of Cape Town. He was kept in a tiny cell, forced to do hard labor, and allowed just one visitor and one letter every six months. But imprisonment didn\'t break him. It made him a global symbol of resistance against injustice.',
          ],
        },
        {
          id: 'sa-freedom',
          paragraphs: [
            'Archbishop Desmond Tutu, an Anglican priest, became another powerful voice against apartheid. He used his position to speak out fearlessly, calling for economic sanctions against South Africa and leading peaceful marches. In 1984, he won the Nobel Peace Prize for his nonviolent opposition to apartheid. He famously said: "If you are neutral in situations of injustice, you have chosen the side of the oppressor."',
            'By the late 1980s, international pressure was crushing South Africa\'s economy. Countries imposed sanctions, athletes and musicians boycotted, and the world demanded Mandela\'s release. On February 11, 1990, Nelson Mandela walked out of prison a free man. In 1994, in South Africa\'s first fully democratic election, Mandela was elected president. Instead of seeking revenge, he focused on reconciliation, creating the Truth and Reconciliation Commission to help the country heal from decades of hatred.',
            'Nelson Mandela served as president until 1999 and passed away on December 5, 2013, at the age of 95. His journey from prisoner to president remains one of the most extraordinary stories of the 20th century. He showed the world that even the most deeply entrenched injustice can be overcome.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{270A}\u{1F3FE}',
          name: 'Nelson Mandela',
          title: 'Anti-Apartheid Leader & President of South Africa (1918\u20132013)',
          description:
            'Nelson Mandela spent 27 years in prison for fighting South Africa\'s apartheid system, becoming the world\'s most famous political prisoner. After his release in 1990, he led negotiations to end apartheid peacefully and was elected South Africa\'s first Black president in 1994. Rather than seeking revenge, he focused on reconciliation and healing. He won the Nobel Peace Prize in 1993 and is remembered as one of history\'s greatest leaders.',
          extraTag: '27 years imprisoned on Robben Island',
        },
        {
          emoji: '\u{271D}\uFE0F',
          name: 'Desmond Tutu',
          title: 'Archbishop & Anti-Apartheid Activist (1931\u20132021)',
          description:
            'Archbishop Desmond Tutu was a South African Anglican priest who became one of the most prominent voices against apartheid. He used his moral authority to call for nonviolent resistance and international sanctions against South Africa. He won the Nobel Peace Prize in 1984 and later chaired the Truth and Reconciliation Commission, which helped South Africa confront its painful past. He was known for his joyful spirit and his famous statement: "My humanity is bound up in yours."',
          extraTag: 'Chaired the Truth and Reconciliation Commission',
        },
      ],
      funFacts: [
        {
          title: 'From Prisoner to President',
          text: 'Nelson Mandela spent 27 years in prison, from 1964 to 1990. For 18 of those years, he was on Robben Island, kept in a cell just 8 feet by 7 feet. He slept on a thin mat on the floor. But just four years after his release, he became the president of South Africa. His prisoner number, 46664, became the name of a global AIDS awareness campaign.',
        },
      ],
      videos: [
        {
          youtubeId: 'ke4kVFycpYY',
          title: 'How Did Apartheid Happen, and How Did It Finally End?',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['civil-q4', 'civil-q5'],
    },

    // ─── Section 3: Indigenous Rights ────────────────────────────
    {
      id: 'indigenous-rights',
      icon: '\u{1F30D}',
      title: 'Indigenous Rights: Standing Rock and Beyond',
      readAloudBlocks: [
        {
          id: 'indigenous-intro',
          paragraphs: [
            'Indigenous peoples are the original inhabitants of lands around the world: Native Americans, Aboriginal Australians, Maori in New Zealand, First Nations in Canada, Sami in Scandinavia, and many others. For centuries, colonial powers seized their lands, destroyed their cultures, and denied them basic rights. The scars of colonialism are still felt today.',
            'In the United States, the government forced Native Americans off their ancestral lands through a series of broken treaties and violent campaigns. The Trail of Tears in the 1830s forcibly relocated over 60,000 Native Americans from their homelands in the southeastern United States to "Indian Territory" (present-day Oklahoma). Thousands died during the journey from cold, hunger, and disease.',
          ],
        },
        {
          id: 'indigenous-standing-rock',
          paragraphs: [
            'In 2016, the Standing Rock Sioux Tribe in North Dakota took a stand that captured the world\'s attention. The U.S. government had approved the Dakota Access Pipeline, which would carry crude oil under the Missouri River, the tribe\'s main source of drinking water. The pipeline also crossed land sacred to the Sioux people. The tribe said they had never been properly consulted.',
            'Thousands of people from over 300 Native American nations and their allies gathered at the Standing Rock reservation in a massive peaceful protest. They called themselves "water protectors," not protesters. Despite facing freezing temperatures, rubber bullets, water cannons in subzero weather, and mass arrests, they held their ground for months. While the pipeline was ultimately completed, the protest sparked a global conversation about indigenous rights, treaty obligations, and environmental justice.',
          ],
        },
        {
          id: 'indigenous-australia',
          paragraphs: [
            'In Australia, Aboriginal and Torres Strait Islander peoples, the oldest continuous civilization on Earth (over 65,000 years!), were not even counted as citizens until a 1967 referendum. Before that, they were governed under "flora and fauna" laws. The Australian government\'s policy of forcibly removing Aboriginal children from their families and placing them in white institutions, a practice that lasted from the early 1900s into the 1970s, created what is known as the Stolen Generations. In 2008, Prime Minister Kevin Rudd issued a formal apology, but the effects of these policies continue to impact Aboriginal communities today.',
            'Around the world, indigenous peoples are still fighting for their rights. In 2007, the United Nations adopted the Declaration on the Rights of Indigenous Peoples, affirming their right to self-determination, their lands, and their cultural practices. Progress is slow and uneven, but the movement is growing. As LaDonna Brave Bull Allard, a Standing Rock elder, said: "We are here to protect the water. That\'s it. That\'s our purpose."',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F30A}',
          name: 'LaDonna Brave Bull Allard',
          title: 'Standing Rock Sioux Elder & Water Protector (1956\u20132021)',
          description:
            'LaDonna Brave Bull Allard was a historian and educator of the Standing Rock Sioux Tribe who established the Sacred Stone Camp, the first camp in the Dakota Access Pipeline protests. She was a keeper of her people\'s history and dedicated her life to preserving Lakota culture and protecting sacred sites and water sources. Her camp became the spark that drew thousands of indigenous people and allies from around the world.',
          extraTag: 'Founded the Sacred Stone Camp',
        },
      ],
      funFacts: [
        {
          title: 'The Oldest Continuous Civilization on Earth',
          text: 'Aboriginal Australians have lived continuously on the Australian continent for over 65,000 years, making them the oldest continuous civilization on Earth. By comparison, the ancient Egyptian pyramids are about 4,500 years old. Aboriginal oral traditions, art, and cultural practices have been passed down for tens of thousands of years, containing knowledge about landscapes, ecosystems, and astronomical events.',
        },
      ],
      videos: [
        {
          youtubeId: '_UpcEPxUQXI',
          title: 'Indigenous Rights and Standing Rock',
          channelName: 'History',
        },
      ],
      quizIds: ['civil-q6', 'civil-q7'],
    },

    // ─── Section 4: Disability Rights ────────────────────────────
    {
      id: 'disability-rights',
      icon: '\u{267F}',
      title: 'The Disability Rights Revolution',
      readAloudBlocks: [
        {
          id: 'disability-intro',
          paragraphs: [
            'For most of history, people with disabilities were hidden away, locked in institutions, or simply forgotten. They were told they couldn\'t go to school, couldn\'t hold jobs, and couldn\'t participate in public life. Buildings had no ramps. There were no sign language interpreters. No Braille signs. No accessible buses. Society was literally built without disabled people in mind.',
            'But in the 1960s and 1970s, inspired by the civil rights movement, people with disabilities began to organize and fight back. And one person more than any other sparked this revolution.',
          ],
        },
        {
          id: 'disability-ed-roberts',
          paragraphs: [
            'Ed Roberts contracted polio at age fourteen in 1953, leaving him paralyzed from the neck down and dependent on an iron lung to breathe at night. Doctors told his mother he would be a "vegetable" for the rest of his life. Ed proved them spectacularly wrong. In 1962, he applied to the University of California, Berkeley. The university tried to reject him, saying there was no way to accommodate a student who used a wheelchair and an iron lung. Ed fought back and won admission, becoming the first severely disabled student to attend UC Berkeley.',
            'Ed didn\'t just attend classes. He transformed the university. He founded the Physically Disabled Students\' Program and organized other disabled students. They called themselves the "Rolling Quads." They fought for curb cuts (ramps at sidewalk corners), accessible buildings, and the right to live independently. Ed Roberts later became the director of California\'s Department of Rehabilitation, the same agency that had once told him he was "too disabled to work."',
          ],
        },
        {
          id: 'disability-ada',
          paragraphs: [
            'The disability rights movement won its biggest victory on July 26, 1990, when President George H.W. Bush signed the Americans with Disabilities Act (ADA) into law. The ADA prohibits discrimination against people with disabilities in employment, public spaces, transportation, and telecommunications. It requires wheelchair ramps, accessible bathrooms, sign language interpreters, and much more.',
            'But the ADA didn\'t happen easily. In March 1990, over 1,000 disability rights activists gathered at the U.S. Capitol. When Congress was slow to act, dozens of wheelchair users got out of their chairs and crawled up the 83 marble steps of the Capitol building to demand action. An eight-year-old girl named Jennifer Keelan, who had cerebral palsy, pulled herself up the steps saying: "I\'ll take all night if I have to." The image shocked the nation and helped push the ADA through Congress.',
            'Today, thanks to the ADA and similar laws around the world, people with disabilities have far more opportunities than ever before. But barriers remain. Many buildings in older cities are still inaccessible. Employment rates for disabled people remain significantly lower than for non-disabled people. The fight for full inclusion continues.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{267F}',
          name: 'Ed Roberts',
          title: '"Father of the Disability Rights Movement" (1939\u20131995)',
          description:
            'Ed Roberts contracted polio at age 14 and was paralyzed from the neck down. Despite being told he would be a "vegetable," he became the first severely disabled student at UC Berkeley, founded the independent living movement, and became director of California\'s Department of Rehabilitation, the same agency that once said he was too disabled to work. He is widely considered the father of the disability rights movement.',
          extraTag: 'Proved doctors wrong about his potential',
        },
        {
          emoji: '\u{1F3DB}\uFE0F',
          name: 'Judy Heumann',
          title: '"Mother of the Disability Rights Movement" (1947\u20132023)',
          description:
            'Judy Heumann contracted polio as an infant and used a wheelchair her entire life. In 1970, she sued the New York City Board of Education for denying her a teaching license because of her wheelchair, and won. In 1977, she led the famous 504 Sit-in in San Francisco, where disability activists occupied a federal building for 25 days to force the government to implement disability rights regulations. She later served in both the Clinton and Obama administrations.',
          extraTag: 'Led the historic 504 Sit-in for 25 days',
        },
      ],
      funFacts: [
        {
          title: 'Crawling Up the Capitol Steps',
          text: 'On March 12, 1990, disability rights activists staged the "Capitol Crawl." Dozens of wheelchair users abandoned their chairs and crawled up the 83 marble steps of the U.S. Capitol to demand passage of the Americans with Disabilities Act. Eight-year-old Jennifer Keelan, who had cerebral palsy, pulled herself up the steps saying "I\'ll take all night if I have to." The ADA was signed into law four months later.',
        },
      ],
      videos: [
        {
          youtubeId: '7i_ZJxVhdhU',
          title: 'The Disability Rights Movement',
          channelName: 'History',
        },
      ],
      quizIds: ['civil-q8', 'civil-q9', 'civil-q10'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: U.S. Civil Rights
    {
      id: 'civil-q1',
      sectionId: 'us-civil-rights',
      title: 'Civil Rights Challenge!',
      question:
        'How long did the Montgomery Bus Boycott last?',
      options: [
        { text: '30 days', isCorrect: false },
        { text: '381 days', isCorrect: true },
        { text: '3 years', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'civil-q2',
      sectionId: 'us-civil-rights',
      title: 'Brave Kids Quiz!',
      question:
        'How old was Ruby Bridges when she desegregated William Frantz Elementary School?',
      options: [
        { text: 'Six years old', isCorrect: true },
        { text: 'Ten years old', isCorrect: false },
        { text: 'Fourteen years old', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'civil-q3',
      sectionId: 'us-civil-rights',
      title: 'Freedom Fighters Challenge!',
      question:
        'What were the "Freedom Riders" challenging?',
      options: [
        { text: 'Segregated interstate bus travel', isCorrect: true },
        { text: 'Unfair train ticket prices', isCorrect: false },
        { text: 'Speed limits on highways', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: South Africa
    {
      id: 'civil-q4',
      sectionId: 'south-africa',
      title: 'Apartheid Quiz!',
      question:
        'How many years did Nelson Mandela spend in prison?',
      options: [
        { text: '10 years', isCorrect: false },
        { text: '27 years', isCorrect: true },
        { text: '45 years', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'civil-q5',
      sectionId: 'south-africa',
      title: 'Freedom in South Africa!',
      question:
        'What did Desmond Tutu famously say about being neutral in situations of injustice?',
      options: [
        { text: '"Neutrality is the safest position"', isCorrect: false },
        { text: '"You have chosen the side of the oppressor"', isCorrect: true },
        { text: '"Neutral people always win in the end"', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Indigenous Rights
    {
      id: 'civil-q6',
      sectionId: 'indigenous-rights',
      title: 'Water Protectors Quiz!',
      question:
        'What did the Standing Rock Sioux call themselves during the Dakota Access Pipeline protests?',
      options: [
        { text: 'Pipeline fighters', isCorrect: false },
        { text: 'Water protectors', isCorrect: true },
        { text: 'Land defenders', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'civil-q7',
      sectionId: 'indigenous-rights',
      title: 'Indigenous History Challenge!',
      question:
        'How long have Aboriginal Australians lived continuously on the Australian continent?',
      options: [
        { text: 'About 5,000 years', isCorrect: false },
        { text: 'About 65,000 years', isCorrect: true },
        { text: 'About 500 years', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Disability Rights
    {
      id: 'civil-q8',
      sectionId: 'disability-rights',
      title: 'Disability Rights Quiz!',
      question:
        'Who is considered the "Father of the Disability Rights Movement"?',
      options: [
        { text: 'Martin Luther King Jr.', isCorrect: false },
        { text: 'Ed Roberts', isCorrect: true },
        { text: 'Nelson Mandela', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'civil-q9',
      sectionId: 'disability-rights',
      title: 'Capitol Crawl Challenge!',
      question:
        'What did disability activists do at the U.S. Capitol to push for the ADA\'s passage?',
      options: [
        { text: 'They held a silent candlelight vigil', isCorrect: false },
        { text: 'They crawled up the 83 marble Capitol steps', isCorrect: true },
        { text: 'They gave speeches from the Senate floor', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'civil-q10',
      sectionId: 'disability-rights',
      title: 'ADA Knowledge Check!',
      question:
        'What does the Americans with Disabilities Act (ADA) require?',
      options: [
        { text: 'That all disabled people receive free healthcare', isCorrect: false },
        { text: 'Wheelchair ramps, accessible spaces, and protection from discrimination', isCorrect: true },
        { text: 'That every school hire a disability specialist', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'civil-essay',
    prompt:
      'Civil rights movements happen all over the world. What is one civil rights issue you care about, and what would you do to help?',
    description:
      'You\'ve learned about civil rights struggles in the United States, South Africa, indigenous communities, and the disability rights movement. All of these started with people who saw injustice and decided to act. Is there a civil rights issue that matters to you? What would you do to make a difference? Write at least 100 characters to help unlock a special surprise!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'What powerful ideas! The world needs people like you who care about justice. Your answer has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'civil-reward',
    title: 'March for Justice',
    description:
      'Lead a march through the city, gathering supporters by answering civil rights questions at each stop!',
    lockMessage: 'March Route Locked!',
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
    type: 'march-for-justice',
    celebrationMessage: 'Together, we are unstoppable! Your march was a success!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Marching Forward: The Unfinished Story of Civil Rights',
    paragraphs: [
      'Congratulations! You\'ve completed your journey through the civil rights struggles that have shaped our world, from Montgomery to Robben Island, from Standing Rock to the steps of the U.S. Capitol.',
      'You learned how Rosa Parks, Dr. King, Ruby Bridges, the Freedom Riders, and the Little Rock Nine fought segregation in America with dignity and nonviolent resistance. You traveled to South Africa and witnessed Nelson Mandela\'s extraordinary journey from 27 years in prison to the presidency, and how Desmond Tutu used moral courage to help dismantle apartheid.',
      'You discovered how indigenous peoples around the world, from the Standing Rock Sioux to Aboriginal Australians, continue to fight for their rights to land, water, and cultural survival. And you met Ed Roberts, Judy Heumann, and eight-year-old Jennifer Keelan, who showed the world that people with disabilities deserve full participation in society.',
      'The civil rights story is not a story with a neat ending. It\'s ongoing. Racial inequality, discrimination against indigenous peoples, and barriers for people with disabilities persist around the world. But the heroes you\'ve learned about show us the path forward: courage, solidarity, persistence, and an unshakeable belief that all people deserve to be treated with dignity.',
      'Dr. King once said: "The arc of the moral universe is long, but it bends toward justice." Every person who stands up for what\'s right helps bend that arc a little more. That includes you.',
    ],
  },
};
