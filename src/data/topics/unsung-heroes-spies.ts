import type { Topic } from '../types';

export const unsungHeroesSpies: Topic = {
  id: 'unsung-heroes-spies',
  slug: 'unsung-heroes-spies',
  title: 'Spies for the Good Guys',
  subtitle: 'Secret Heroes Who Changed the Course of History',
  status: 'active',
  themeId: 'unsung-heroes',
  heroIcons: ['\u{1F575}\uFE0F', '\u{1F5DD}\uFE0F', '\u{1F9ED}'],
  navItems: [
    { id: 'intro-spies', icon: '\u{1F575}\uFE0F', label: 'Secret Missions' },
    { id: 'harriet-tubman-spy', icon: '\u{1F31F}', label: 'Harriet Tubman' },
    { id: 'virginia-hall', icon: '\u{1F5DD}\uFE0F', label: 'Virginia Hall' },
    { id: 'juan-pujol-garcia', icon: '\u{1F3AD}', label: 'Agent Garbo' },
    { id: 'noor-inayat-khan', icon: '\u{1F54C}', label: 'Noor Inayat Khan' },
    { id: 'nancy-wake', icon: '\u{1F43F}\uFE0F', label: 'Nancy Wake' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro-spies',
      icon: '\u{1F575}\uFE0F',
      title: 'The Secret World of Real-Life Spies',
      readAloudBlocks: [
        {
          id: 'intro-spies-text',
          paragraphs: [
            'Forget what you\'ve seen in movies with their fancy gadgets and car chases. Real spies don\'t usually look like action heroes. Some of the bravest spies in history were ordinary people who did extraordinary things because they believed in justice and freedom. And many of them were people the enemy would never suspect.',
            'Imagine risking your life every single day, pretending to be someone you\'re not, knowing that one tiny mistake could mean capture or worse. That\'s what these incredible people did. They used their wits, their courage, and sometimes a healthy dose of humor to outsmart some of the most dangerous forces in history.',
            'Get ready to meet a formerly enslaved woman who became a Union Army spy, a one-legged American who became the Gestapo\'s most wanted, a chicken farmer who fooled the entire Nazi military, an Indian princess who transmitted secret radio messages from occupied Paris, and an Australian journalist the Germans called "the White Mouse" because she was impossible to catch. These are the spies for the good guys.',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },

    // ─── Section 1: Harriet Tubman ──────────────────────────────
    {
      id: 'harriet-tubman-spy',
      icon: '\u{1F31F}',
      title: 'Harriet Tubman: The Moses Who Became a Spy',
      readAloudBlocks: [
        {
          id: 'tubman-intro',
          paragraphs: [
            'You probably know Harriet Tubman as the hero of the Underground Railroad, the brave woman who escaped slavery and then went back again and again to lead others to freedom. But did you know she was also a military spy? That\'s right: Harriet Tubman was the first woman in United States history to plan and lead a military raid.',
            'Born around 1822 in Dorchester County, Maryland, Araminta Ross (her birth name) was enslaved from birth. When she was just a teenager, an overseer threw a heavy metal weight at another enslaved person and hit Harriet in the head instead. The injury caused her terrible headaches and sudden blackouts for the rest of her life. But it never stopped her.',
          ],
        },
        {
          id: 'tubman-spy-work',
          paragraphs: [
            'In 1849, Harriet escaped to freedom by traveling nearly 90 miles on foot to Philadelphia, using the North Star to guide her. But she didn\'t just save herself. Over the next eleven years, she returned to the South at least thirteen times, personally leading about 70 people to freedom along the Underground Railroad. Slaveholders put a $40,000 bounty on her head (that\'s over a million dollars today!), but she was never caught and never lost a single passenger.',
            'When the Civil War broke out in 1861, Harriet volunteered her services to the Union Army. Because of her years navigating secretly through enemy territory, she was a perfect spy. She recruited and managed a network of formerly enslaved people who gathered intelligence behind Confederate lines. They reported on troop movements, supply routes, and the locations of mines planted in rivers.',
          ],
        },
        {
          id: 'tubman-raid',
          paragraphs: [
            'On June 2, 1863, Harriet Tubman guided Colonel James Montgomery and about 150 Black Union soldiers up the Combahee River in South Carolina. Using intelligence she had gathered, they dodged every underwater mine and launched a surprise attack that destroyed Confederate supplies and set plantations ablaze. More than 700 enslaved people rushed to the Union boats and were freed that night.',
            'Think about that for a moment. A woman who had been born into slavery, who couldn\'t read or write, who suffered from a traumatic brain injury, planned and led a military operation that freed hundreds of people. After the war, Harriet Tubman continued fighting for women\'s right to vote and opened a home for elderly African Americans in Auburn, New York. She passed away in 1913, but her legacy as both a liberator and a spy lives on.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F31F}',
          name: 'Harriet Tubman',
          title: 'Underground Railroad Conductor & Union Army Spy (c. 1822\u20131913)',
          description:
            'Born into slavery in Maryland, Harriet Tubman escaped to freedom and then risked her life thirteen times to lead about 70 others to freedom via the Underground Railroad. During the Civil War, she served the Union Army as a nurse, cook, scout, and spy. In 1863, she became the first woman in U.S. history to plan and lead a military raid, the Combahee River Raid, which liberated more than 700 enslaved people. The Gestapo\'s bounty for her capture reached $40,000.',
          extraTag: 'Code name: Moses',
        },
        {
          emoji: '\u{2B50}',
          name: 'Colonel James Montgomery',
          title: 'Commander of the 2nd South Carolina Volunteers',
          description:
            'James Montgomery was a Union Army colonel who commanded the 2nd South Carolina Volunteers, one of the first Black regiments in the Civil War. He worked closely with Harriet Tubman on the Combahee River Raid in 1863, relying heavily on the intelligence she had gathered. Montgomery recognized Tubman\'s extraordinary abilities at a time when most people in power dismissed both women and African Americans.',
          extraTag: 'Worked with Tubman on the Combahee Raid',
        },
      ],
      funFacts: [
        {
          title: 'The $40,000 Ghost',
          text: 'Slaveholders offered a combined bounty of about $40,000 for Harriet Tubman\'s capture (over $1.4 million in today\'s money!). But in all her years of leading people to freedom, she was never caught. She later said, "I was the conductor of the Underground Railroad for eight years, and I can say what most conductors can\'t say: I never ran my train off the track and I never lost a passenger."',
        },
      ],
      videos: [
        {
          youtubeId: 'Dv7YhVKFqbQ',
          title: 'The Breathtaking Courage of Harriet Tubman',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['spies-q1', 'spies-q2'],
    },

    // ─── Section 2: Virginia Hall ────────────────────────────────
    {
      id: 'virginia-hall',
      icon: '\u{1F5DD}\uFE0F',
      title: 'Virginia Hall: The Limping Lady Who Terrified the Nazis',
      readAloudBlocks: [
        {
          id: 'hall-intro',
          paragraphs: [
            'Imagine being told you could never be a diplomat because you\'re a woman and you have a disability. That\'s exactly what happened to Virginia Hall, an American from Baltimore, Maryland. In 1933, a hunting accident in Turkey led to the amputation of her left leg below the knee. She wore a wooden prosthetic leg that she nicknamed "Cuthbert." The U.S. State Department rejected her dream of becoming a diplomat, saying her disability made her unfit for the job.',
            'But Virginia Hall wasn\'t the kind of person who gave up. When World War II began, she joined Britain\'s Special Operations Executive (SOE), a secret spy organization Winston Churchill created to "set Europe ablaze." In 1941, she was sent to Lyon, France, becoming one of the first Allied agents in occupied France.',
          ],
        },
        {
          id: 'hall-france',
          paragraphs: [
            'In France, Virginia pretended to be a journalist while secretly organizing the French Resistance. She set up safe houses, arranged parachute drops of weapons and supplies, helped escaped prisoners of war, and recruited French citizens to fight the Nazis from the inside. She organized jailbreaks, helped downed Allied pilots return home, and smuggled messages and tools to prisoners hidden inside cans of sardines.',
            'The Gestapo, the Nazi secret police, called her "the most dangerous of all Allied spies" and launched a massive manhunt to catch her. They circulated wanted posters describing a woman with a limp. When she learned the Nazis were closing in, Virginia made a daring escape. In the dead of winter, she hiked over the Pyrenees Mountains into Spain, trekking through deep snow on her prosthetic leg. During the crossing, she sent a message to London saying that "Cuthbert is giving me trouble." Her handlers, not knowing Cuthbert was her wooden leg, replied: "If Cuthbert is giving you trouble, have him eliminated."',
          ],
        },
        {
          id: 'hall-return',
          paragraphs: [
            'Most people would have stayed safely in England after that escape. Not Virginia. In 1944, she volunteered to return to France, this time working for the American Office of Strategic Services (OSS), the forerunner of the CIA. She disguised herself as a frail old peasant woman, dying her hair grey, wearing baggy clothes, and shuffling her walk to hide her limp. She lived on a farm and organized a guerrilla force of French Resistance fighters who sabotaged bridges and rail lines ahead of the D-Day invasion.',
            'After the war, Virginia Hall received the Distinguished Service Cross, the only civilian woman in World War II to earn this honor. President Truman wanted to present it in a public ceremony, but Virginia declined. True to her spy nature, she said she was "still operational and didn\'t want any publicity." She later joined the newly created CIA and worked there until her retirement in 1966.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F5DD}\uFE0F',
          name: 'Virginia Hall',
          title: 'SOE & OSS Agent, "The Limping Lady" (1906\u20131982)',
          description:
            'Virginia Hall was an American spy who operated in Nazi-occupied France during World War II. Despite having a prosthetic leg she called "Cuthbert," she became one of the most effective Allied agents of the war. She organized French Resistance networks, arranged supply drops, freed prisoners, and helped downed pilots escape. The Gestapo called her "the most dangerous of all Allied spies." She later joined the CIA and was awarded the Distinguished Service Cross.',
          extraTag: 'Gestapo\'s Most Wanted',
        },
      ],
      funFacts: [
        {
          title: 'The Leg Named Cuthbert',
          text: 'Virginia Hall named her wooden prosthetic leg "Cuthbert." When she was fleeing over the Pyrenees Mountains and radioed London that "Cuthbert is giving me trouble," her handlers didn\'t realize she was talking about her leg. They radioed back: "If Cuthbert is giving you trouble, have him eliminated." Virginia reportedly found this hilarious.',
        },
      ],
      videos: [
        {
          youtubeId: 'Y7zyB7rsvHU',
          title: 'From Pacifist to Spy: WWII\'s Surprising Secret Agent',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['spies-q3', 'spies-q4'],
    },

    // ─── Section 3: Juan Pujol Garcia ────────────────────────────
    {
      id: 'juan-pujol-garcia',
      icon: '\u{1F3AD}',
      title: 'Juan Pujol Garcia: The Spy Who Saved D-Day',
      readAloudBlocks: [
        {
          id: 'garcia-intro',
          paragraphs: [
            'Here\'s a story so wild it sounds like fiction. Juan Pujol Garcia was a Spanish chicken farmer who hated both fascism and communism. When World War II broke out, he decided he wanted to spy for the British. There was just one problem: he had no training, no connections, and the British rejected him. Twice.',
            'So Juan came up with a wild plan. If the British wouldn\'t hire him, he\'d make himself so valuable they\'d have to. He approached the Germans and offered to spy for them. The Nazis, amazingly, said yes. They gave him invisible ink and cash and told him to go to Britain and report back. But Juan never went to Britain. Instead, he moved to Lisbon, Portugal, and started making up everything.',
          ],
        },
        {
          id: 'garcia-network',
          paragraphs: [
            'Using a tourist guidebook, a map of England, and old newsreels from the cinema, Juan invented an entire network of 27 imaginary agents supposedly scattered across Britain. He gave them names, backstories, and personalities. One was a wealthy Venezuelan businessman. Another was a waiter in a military canteen. He even "killed off" one fake agent and had the agent\'s fake widow write to the Germans demanding a fake pension, which they actually paid!',
            'His fake reports were so convincing that the Germans thought he was their top spy in Britain. Meanwhile, the British intelligence service MI5 finally noticed that someone in Lisbon was feeding the Germans detailed (but wrong) information about Britain. When they tracked Juan down, they were stunned to learn he was doing it all on his own. They immediately recruited him and gave him the code name "Garbo" because he was such a brilliant actor.',
          ],
        },
        {
          id: 'garcia-dday',
          paragraphs: [
            'Juan Pujol Garcia\'s greatest moment came on D-Day, June 6, 1944. The Allies were about to invade Nazi-occupied France at Normandy, but they needed the Germans to think the real attack would come at Pas-de-Calais, 150 miles away. As part of Operation Fortitude, Juan sent frantic messages to the Germans warning that Normandy was just a diversion. The real attack, he insisted, would come at Calais.',
            'The Germans believed him so completely that even after the Normandy invasion had begun, Hitler kept 150,000 troops waiting at Calais for an attack that would never come. This was crucial: if those troops had been sent to Normandy, D-Day might have failed. Juan Pujol Garcia, the chicken farmer with no spy training, may have helped save the entire Allied invasion.',
            'After the war, Juan was awarded medals by both the British (an MBE from King George VI) and the Germans (an Iron Cross from Hitler), making him one of the very few people honored by both sides. He faked his own death in 1949 and quietly moved to Venezuela, where he ran a bookshop until his real identity was rediscovered in 1984.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F3AD}',
          name: 'Juan Pujol Garcia',
          title: 'Double Agent "Garbo" (1912\u20131988)',
          description:
            'Juan Pujol Garcia was a Spanish chicken farmer who became one of history\'s most successful double agents. With no spy training, he convinced the Nazis he was their top agent in Britain while actually feeding them false information. His fake network of 27 imaginary agents helped convince the Germans that D-Day would happen at Calais instead of Normandy, potentially saving the entire Allied invasion. He received medals from both Britain and Germany.',
          extraTag: 'Created 27 fake agents',
        },
        {
          emoji: '\u{1F3C5}',
          name: 'Tom\u00E1s Harris',
          title: 'MI5 Handler for Agent Garbo',
          description:
            'Tom\u00E1s Harris was a British-Spanish MI5 officer who became Juan Pujol Garcia\'s handler. Together, they crafted the elaborate web of fake intelligence reports and imaginary agents that fooled the German military. Harris was an art dealer before the war and brought a creative flair to their deception work. The partnership between Harris and Garcia is considered one of the greatest intelligence operations in history.',
          extraTag: 'Art dealer turned spy handler',
        },
      ],
      funFacts: [
        {
          title: 'The Fake Widow\'s Real Pension',
          text: 'When Juan Pujol Garcia needed to "retire" one of his 27 imaginary agents, he reported that the agent had died. He then had the agent\'s equally imaginary widow write to the Germans demanding a pension for her "husband\'s" service. The Germans actually paid the pension! Juan pocketed the money and used it to fund more of his spy operations.',
        },
      ],
      videos: [
        {
          youtubeId: 'sPH5cOHD4Z0',
          title: 'The Spy Who Saved D-Day',
          channelName: 'History',
        },
      ],
      quizIds: ['spies-q5', 'spies-q6'],
    },

    // ─── Section 4: Noor Inayat Khan ─────────────────────────────
    {
      id: 'noor-inayat-khan',
      icon: '\u{1F54C}',
      title: 'Noor Inayat Khan: The Princess Who Became a Spy',
      readAloudBlocks: [
        {
          id: 'noor-intro',
          paragraphs: [
            'Noor Inayat Khan was born on January 1, 1914, in Moscow, Russia, into an extraordinary family. Her father, Hazrat Inayat Khan, was an Indian Sufi musician and teacher who was a direct descendant of Tipu Sultan, the famous Tiger of Mysore who had fought against British colonialism in India. Her American mother, Ora Ray Baker, had been raised in a tradition of peace. Noor grew up in a household that valued nonviolence, music, and spirituality above all else.',
            'The family moved to Paris when Noor was young, and she grew up to become a children\'s book author and a talented musician who played the harp and piano. She was gentle, shy, and deeply committed to her father\'s teachings of peace and love. She seemed like the last person in the world who would become a spy. But when the Nazis invaded France in 1940, everything changed.',
          ],
        },
        {
          id: 'noor-soe',
          paragraphs: [
            'Noor and her family fled to England. Horrified by what the Nazis were doing, she joined the Women\'s Auxiliary Air Force (WAAF) and trained as a radio operator. Her skill with Morse code caught the attention of the Special Operations Executive (SOE), which recruited her for an incredibly dangerous mission: to go to Nazi-occupied Paris as a secret radio operator for the French Resistance.',
            'Her instructors had doubts. They described her as "not overburdened with brains" and worried she was too gentle for such dangerous work. They were spectacularly wrong. In June 1943, Noor was flown into France, becoming the first female radio operator sent into occupied Paris. Her code name was "Madeleine."',
          ],
        },
        {
          id: 'noor-paris',
          paragraphs: [
            'Within weeks of Noor\'s arrival, disaster struck. The Gestapo arrested almost every other SOE agent in her network. London ordered her to return immediately. Noor refused. She was the last radio link between the French Resistance in Paris and the Allies in London. If she left, the entire network would go dark. For four months, she worked alone, constantly moving between safe houses, disguising her radio in shopping bags, and transmitting vital messages while Nazi detection vans prowled the streets trying to triangulate her signal.',
            'She changed her appearance repeatedly, dyeing her hair different colors and altering her clothes. She was one person doing the work of an entire spy network. Tragically, in October 1943, she was betrayed by a French woman who sold her identity to the Germans for 100,000 francs. Noor was arrested, tortured, and imprisoned. Despite months of brutal interrogation, she never revealed a single piece of information about her fellow agents or the Resistance network.',
            'Noor Inayat Khan was executed at Dachau concentration camp on September 13, 1944, at the age of 30. Witnesses said her last word was "Libert\u00E9" (Freedom). In 2012, a bronze bust of Noor was unveiled in London, making her the first Muslim war heroine to be honored with a memorial in Britain.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F54C}',
          name: 'Noor Inayat Khan',
          title: 'SOE Radio Operator "Madeleine" (1914\u20131944)',
          description:
            'Born to Indian Sufi royalty, Noor Inayat Khan was a gentle children\'s book author who became one of the bravest spies of World War II. As the first female radio operator sent into occupied Paris, she single-handedly maintained the only radio link between the French Resistance and London for four months after the rest of her network was captured. Betrayed and arrested, she never gave up any information despite months of torture. She was executed at Dachau at age 30. Her last word was "Libert\u00E9."',
          extraTag: 'Descendant of Tipu Sultan',
        },
      ],
      funFacts: [
        {
          title: 'A Princess and a Children\'s Author',
          text: 'Before becoming a spy, Noor Inayat Khan was a children\'s book author! She published a collection of children\'s stories called "Twenty Jataka Tales," which retold ancient Buddhist stories about compassion and kindness. She was also a direct descendant of Tipu Sultan, making her an actual princess. From children\'s author to princess to secret agent, her life reads like a novel.',
        },
      ],
      videos: [
        {
          youtubeId: 'kQ05ycJwKkM',
          title: 'Noor Inayat Khan: The Spy Princess',
          channelName: 'History',
        },
      ],
      quizIds: ['spies-q7', 'spies-q8'],
    },

    // ─── Section 5: Nancy Wake ───────────────────────────────────
    {
      id: 'nancy-wake',
      icon: '\u{1F43F}\uFE0F',
      title: 'Nancy Wake: The White Mouse',
      readAloudBlocks: [
        {
          id: 'wake-intro',
          paragraphs: [
            'Nancy Wake was born in New Zealand in 1912, grew up in Australia, and ran away from home at sixteen with 200 pounds she had earned from working as a nurse. She moved to New York, then London, then Paris, where she became a journalist. While reporting from Vienna in the 1930s, she witnessed Nazi stormtroopers brutalizing Jewish people in the streets. "I resolved there and then," she later said, "that if I ever had the chance, I would do anything I could to stop them."',
            'When the Nazis invaded France in 1940, Nancy was living in Marseille with her French husband, Henri Fiocca. She immediately joined the Resistance. Using her charm and her position in high society, she became a courier, carrying secret messages and helping smuggle Allied soldiers and refugees out of occupied France through an escape network called the Pat O\'Leary Line. She helped over 1,000 people escape.',
          ],
        },
        {
          id: 'wake-mouse',
          paragraphs: [
            'The Gestapo became desperate to catch her. They tapped her phone, intercepted her mail, and followed her constantly. But Nancy always managed to slip away at the last second, earning her the nickname "the White Mouse." The Gestapo placed a bounty of five million francs on her head, making her the most wanted person in France.',
            'In 1943, with the Gestapo closing in, Nancy escaped France by hiking over the Pyrenees Mountains into Spain (sound familiar? Virginia Hall did the same thing!). She made it to London, where the SOE trained her as a special agent. On April 30, 1944, she parachuted back into France to prepare for D-Day. When her parachute got tangled in a tree, a French Resistance fighter joked: "I hope that all the trees in France bear such beautiful fruit." Nancy replied: "Don\'t give me that French stuff."',
          ],
        },
        {
          id: 'wake-fighter',
          paragraphs: [
            'In France, Nancy commanded a force of 7,000 Maquis (French Resistance fighters). She organized weapons drops, led attacks on German positions, and once cycled 500 kilometers (310 miles) in 72 hours through German checkpoints to replace codes that had been destroyed in a raid. She personally took part in combat, and her fighters ambushed German convoys and blew up bridges to disrupt Nazi supply lines before D-Day.',
            'Nancy Wake was one of the most decorated women of World War II. She received the George Medal from Britain, the Medal of Freedom from the United States, the L\u00E9gion d\'Honneur and the Croix de Guerre (three times!) from France, and the Companion of the Order of Australia. When asked in an interview how she wanted to be remembered, the woman who had outwitted the entire Gestapo simply replied: "I\'d like to be remembered as a woman who did her best." She passed away in 2011 at the age of 98.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F43F}\uFE0F',
          name: 'Nancy Wake',
          title: 'SOE Agent "The White Mouse" (1912\u20132011)',
          description:
            'Born in New Zealand and raised in Australia, Nancy Wake became one of the most daring Allied agents of WWII. She helped over 1,000 people escape occupied France, commanded 7,000 Resistance fighters, and cycled 500 km in 72 hours through German checkpoints. The Gestapo placed a 5 million franc bounty on her head but could never catch "the White Mouse." She received medals from Britain, the U.S., France, and Australia.',
          extraTag: '5 million franc Gestapo bounty',
        },
        {
          emoji: '\u{1F1EB}\u{1F1F7}',
          name: 'Henri Fiocca',
          title: 'Nancy Wake\'s Husband and Resistance Supporter',
          description:
            'Henri Fiocca was Nancy Wake\'s French husband, a wealthy industrialist who supported her Resistance activities. When Nancy fled France in 1943, Henri stayed behind to protect their network. The Gestapo captured him and tortured him for information about Nancy\'s whereabouts. Henri never talked. He was executed by the Nazis. Nancy didn\'t learn of his death until after the war ended. She was devastated but said Henri would have been proud of the work she continued to do.',
          extraTag: 'Executed by the Gestapo, never betrayed Nancy',
        },
      ],
      funFacts: [
        {
          title: 'The Most Decorated Woman of WWII',
          text: 'Nancy Wake received more military decorations than almost any other woman in World War II. Among her many medals were the George Medal (UK), Medal of Freedom (USA), Croix de Guerre with two Palms and a Star (France), the L\u00E9gion d\'Honneur (France), and the Companion of the Order of Australia. When she passed away at 98, her ashes were scattered in the mountains of southern France where she had once fought alongside the Maquis.',
        },
      ],
      videos: [
        {
          youtubeId: 'PrWcEhZgP7U',
          title: 'Nancy Wake: The White Mouse',
          channelName: 'History',
        },
      ],
      quizIds: ['spies-q9', 'spies-q10'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Harriet Tubman
    {
      id: 'spies-q1',
      sectionId: 'harriet-tubman-spy',
      title: 'Spy Challenge!',
      question:
        'What historic military achievement did Harriet Tubman accomplish during the Civil War?',
      options: [
        { text: 'She invented a new code-breaking machine', isCorrect: false },
        { text: 'She became the first woman to plan and lead a military raid', isCorrect: true },
        { text: 'She commanded an entire naval fleet', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spies-q2',
      sectionId: 'harriet-tubman-spy',
      title: 'Underground Railroad Quiz!',
      question:
        'Approximately how many people did Harriet Tubman personally lead to freedom on the Underground Railroad?',
      options: [
        { text: 'About 700 people', isCorrect: false },
        { text: 'About 70 people', isCorrect: true },
        { text: 'About 7 people', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Virginia Hall
    {
      id: 'spies-q3',
      sectionId: 'virginia-hall',
      title: 'Limping Lady Challenge!',
      question:
        'What was the name Virginia Hall gave to her prosthetic leg?',
      options: [
        { text: 'Cuthbert', isCorrect: true },
        { text: 'Montgomery', isCorrect: false },
        { text: 'Garbo', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spies-q4',
      sectionId: 'virginia-hall',
      title: 'Spy Escape Quiz!',
      question:
        'What did the Gestapo call Virginia Hall?',
      options: [
        { text: 'The White Mouse', isCorrect: false },
        { text: 'The most dangerous of all Allied spies', isCorrect: true },
        { text: 'Agent Madeleine', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Juan Pujol Garcia
    {
      id: 'spies-q5',
      sectionId: 'juan-pujol-garcia',
      title: 'Double Agent Quiz!',
      question:
        'How many imaginary agents did Juan Pujol Garcia invent to fool the Nazis?',
      options: [
        { text: '7 agents', isCorrect: false },
        { text: '27 agents', isCorrect: true },
        { text: '127 agents', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spies-q6',
      sectionId: 'juan-pujol-garcia',
      title: 'D-Day Deception!',
      question:
        'What did Juan Pujol Garcia convince the Germans the real target of D-Day was, instead of Normandy?',
      options: [
        { text: 'Berlin', isCorrect: false },
        { text: 'Paris', isCorrect: false },
        { text: 'Pas-de-Calais', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Noor Inayat Khan
    {
      id: 'spies-q7',
      sectionId: 'noor-inayat-khan',
      title: 'Secret Agent Quiz!',
      question:
        'What was Noor Inayat Khan\'s reported last word before her execution?',
      options: [
        { text: 'Courage', isCorrect: false },
        { text: 'Libert\u00E9 (Freedom)', isCorrect: true },
        { text: 'Madeleine', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spies-q8',
      sectionId: 'noor-inayat-khan',
      title: 'Radio Operator Challenge!',
      question:
        'Why did Noor refuse to leave Paris when ordered to return to London?',
      options: [
        { text: 'She wanted to write a book about the war', isCorrect: false },
        { text: 'She was the last radio link between the Resistance and London', isCorrect: true },
        { text: 'She was too afraid to travel', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Nancy Wake
    {
      id: 'spies-q9',
      sectionId: 'nancy-wake',
      title: 'White Mouse Quiz!',
      question:
        'Why did the Gestapo give Nancy Wake the nickname "the White Mouse"?',
      options: [
        { text: 'She always wore white clothes', isCorrect: false },
        { text: 'She had white hair from birth', isCorrect: false },
        { text: 'She always managed to slip away when they tried to catch her', isCorrect: true },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'spies-q10',
      sectionId: 'nancy-wake',
      title: 'Resistance Hero Challenge!',
      question:
        'How far did Nancy Wake cycle in 72 hours through German checkpoints to replace destroyed codes?',
      options: [
        { text: '50 kilometers', isCorrect: false },
        { text: '500 kilometers', isCorrect: true },
        { text: '5,000 kilometers', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'spies-essay',
    prompt:
      'Which spy from this lesson do you think showed the most courage, and why?',
    description:
      'Think about all the incredible spies you learned about: Harriet Tubman, Virginia Hall, Juan Pujol Garcia, Noor Inayat Khan, and Nancy Wake. Each of them risked everything for what they believed in. Which one inspires you the most? What qualities did they have that you admire? Write at least 100 characters to help unlock a special surprise at the bottom of the page!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Outstanding work, Agent! You clearly understand what true courage looks like. Your response has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'spies-reward',
    title: 'Spy Network Builder',
    description:
      'Build a secret spy network across Europe by decoding ciphers! Each decoded message connects a new city to your network.',
    lockMessage: 'Classified Access Required!',
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
    type: 'spy-network-builder',
    celebrationMessage: 'Mission accomplished, Agent! Your spy network is active!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'Mission Complete: The Unsung Heroes of Espionage',
    paragraphs: [
      'Congratulations, Agent! You\'ve completed your journey through the secret world of spies who fought for justice and freedom.',
      'You met Harriet Tubman, who went from escaped slave to Union Army spy, planning the Combahee River Raid that freed over 700 people. You learned about Virginia Hall, who refused to let a prosthetic leg stop her from becoming the Gestapo\'s most wanted spy. You discovered the incredible true story of Juan Pujol Garcia, the chicken farmer who invented 27 fake agents and helped save D-Day.',
      'You were introduced to Noor Inayat Khan, the gentle children\'s book author and Indian princess who became the only radio link between the Paris Resistance and London, and who chose "Libert\u00E9" as her final word. And you met Nancy Wake, the unstoppable "White Mouse" who commanded 7,000 fighters and earned more military decorations than almost any other woman in World War II.',
      'These spies came from different countries, different backgrounds, and different walks of life. Some were born into slavery, some into royalty. One was a chicken farmer. But they all shared something in common: the courage to risk everything for what was right. They remind us that heroes don\'t always wear uniforms or capes. Sometimes, the bravest people are the ones you\'d never suspect.',
      'Their stories also teach us that anyone can make a difference, no matter who you are or where you come from. A disability didn\'t stop Virginia Hall. A quiet personality didn\'t stop Noor Inayat Khan. Having no spy training didn\'t stop Juan Pujol Garcia. What mattered was their determination, their cleverness, and their belief that the world could be better.',
    ],
  },
};
