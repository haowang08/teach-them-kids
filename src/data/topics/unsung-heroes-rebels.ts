import type { Topic } from '../types';

export const unsungHeroesRebels: Topic = {
  id: 'unsung-heroes-rebels',
  slug: 'unsung-heroes-rebels',
  title: 'Rebels with a Cause',
  subtitle: 'Revolutions, Uprisings & the Messy Reality of Fighting for Freedom',
  status: 'active',
  themeId: 'unsung-heroes',
  heroIcons: ['\u{1F3F4}', '\u{1F525}', '\u{2696}\uFE0F'],
  navItems: [
    { id: 'intro-rebels', icon: '\u{1F3F4}', label: 'Revolution Is Complicated' },
    { id: 'gandhi-india', icon: '\u{1F54E}', label: 'Gandhi & India' },
    { id: 'haitian-revolution', icon: '\u{1F1ED}\u{1F1F9}', label: 'Haiti' },
    { id: 'bolivar', icon: '\u{2694}\uFE0F', label: 'Sim\u00F3n Bol\u00EDvar' },
    { id: 'stonewall', icon: '\u{1F308}', label: 'Stonewall' },
    { id: 'solidarity-poland', icon: '\u{1F91D}', label: 'Solidarity' },
  ],
  sections: [
    // ─── Introduction ────────────────────────────────────────────
    {
      id: 'intro-rebels',
      icon: '\u{1F3F4}',
      title: 'When People Say "Enough!"',
      readAloudBlocks: [
        {
          id: 'intro-rebels-text',
          paragraphs: [
            'Sometimes, when injustice becomes unbearable, ordinary people rise up and change the course of history. They overthrow empires, tear down walls, and demand freedom. These moments are thrilling and inspiring. But here\'s something that history books sometimes skip: revolutions are messy. They don\'t always go the way people hope.',
            'A revolution might overthrow a cruel dictator, but what happens next? Sometimes the new leaders are just as bad. Sometimes freedom for one group comes at the expense of another. Sometimes a country wins its independence only to collapse into chaos. Understanding revolutions means understanding their complexity: the good, the bad, and the complicated.',
            'In this lesson, you\'ll meet a man who freed a nation with salt and spinning wheels, enslaved people who created the first free Black republic in the Western Hemisphere, a South American general who liberated half a continent, ordinary people at a bar who launched a global rights movement, and shipyard workers who helped bring down an empire. Get ready for revolutions, because they\'re not what you might expect.',
          ],
        },
      ],
      videos: [],
      quizIds: [],
    },

    // ─── Section 1: Gandhi and Indian Independence ───────────────
    {
      id: 'gandhi-india',
      icon: '\u{1F54E}',
      title: 'Gandhi and the Liberation of India',
      readAloudBlocks: [
        {
          id: 'gandhi-intro',
          paragraphs: [
            'By the early 1900s, the British Empire controlled India, a land of over 300 million people, and had done so for nearly 200 years. The British took India\'s resources, taxed its people, and treated Indians as second-class citizens in their own country. Many Indians wanted independence, but the British Empire was the most powerful force on Earth. How do you fight the mightiest empire in history?',
            'Mohandas Karamchand Gandhi had an answer: you don\'t fight them at all. At least, not with weapons. Born on October 2, 1869, in Porbandar, India, Gandhi studied law in London and then moved to South Africa, where he experienced racial discrimination firsthand. There, he developed his philosophy of "satyagraha," a Sanskrit word meaning "truth force" or "soul force." The idea was simple but revolutionary: resist injustice not with violence, but with peaceful non-cooperation. If enough people simply refuse to obey unjust laws, no government can function.',
          ],
        },
        {
          id: 'gandhi-salt',
          paragraphs: [
            'Gandhi returned to India in 1915 and became the leader of the Indian independence movement. He urged Indians to boycott British goods, especially cloth. He spun his own cloth on a simple spinning wheel, which became a symbol of Indian self-reliance. He organized strikes, marches, and acts of civil disobedience across the country.',
            'His most famous protest was the Salt March. Under British law, Indians were forbidden from collecting or selling salt and had to buy expensive, heavily taxed British salt. On March 12, 1930, Gandhi and 78 followers set out on a 240-mile march from his ashram to the coastal town of Dandi. Over 24 days, walking about 12 miles a day, thousands of people joined him along the way. When he reached the sea on April 6, he bent down, picked up a handful of salt from the mud, and broke the law. Millions of Indians followed his example. The British arrested over 60,000 people, but they couldn\'t stop the movement.',
          ],
        },
        {
          id: 'gandhi-complexity',
          paragraphs: [
            'India finally won its independence on August 15, 1947. But freedom came with a devastating price: Partition. The British divided India into two countries: India (majority Hindu) and Pakistan (majority Muslim). The partition triggered one of the largest and most violent mass migrations in human history. An estimated 10 to 20 million people were displaced, and between 200,000 and 2 million people were killed in the communal violence that erupted.',
            'Gandhi, who had dreamed of a united India where Hindus and Muslims lived together in peace, was heartbroken. He tried desperately to stop the violence, going on hunger strikes to shame people into peace. On January 30, 1948, just five months after independence, Gandhi was assassinated by Nathuram Godse, a Hindu extremist who believed Gandhi was too sympathetic to Muslims.',
            'Gandhi\'s legacy is complex. He inspired Martin Luther King Jr., Nelson Mandela, and countless other leaders with his philosophy of nonviolent resistance. But India\'s independence also brought partition, violence, and a wound between India and Pakistan that has never fully healed. Real history is rarely a simple story of heroes and villains. The truth is messier, and more human.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F54E}',
          name: 'Mohandas K. Gandhi',
          title: 'Leader of Indian Independence (1869\u20131948)',
          description:
            'Mohandas Karamchand Gandhi, known as "Mahatma" (Great Soul), led India\'s independence movement through nonviolent resistance called satyagraha. His Salt March in 1930, where he walked 240 miles to protest the British salt tax, became one of the most iconic acts of civil disobedience in history. He helped free India from British rule in 1947 but was devastated by the Partition that divided the country. He was assassinated in 1948.',
          extraTag: 'Inspired MLK, Mandela, and many others',
        },
        {
          emoji: '\u{1F4DC}',
          name: 'Jawaharlal Nehru',
          title: 'First Prime Minister of Independent India (1889\u20131964)',
          description:
            'Jawaharlal Nehru worked closely with Gandhi in the independence movement, spending a total of nine years in British prisons. When India gained independence in 1947, Nehru became its first prime minister and served until his death in 1964. His famous "Tryst with Destiny" speech at midnight on August 14, 1947, declared: "At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom."',
          extraTag: 'Served as PM for 17 years',
        },
      ],
      funFacts: [
        {
          title: 'The Power of Salt',
          text: 'Gandhi chose salt for his most famous protest because it was something every person in India needed, rich or poor, Hindu or Muslim. By taxing salt, the British were taxing life itself. When Gandhi picked up a handful of natural salt from the mudflats of Dandi on April 6, 1930, he broke an unjust law so simple and so visual that the entire world could understand it. Sometimes the most powerful acts of rebellion are the simplest.',
        },
      ],
      videos: [
        {
          youtubeId: 'T_sGTspaF4Y',
          title: 'Decolonization and Nationalism Triumphant: Crash Course World History #40',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['rebels-q1', 'rebels-q2'],
    },

    // ─── Section 2: Haitian Revolution ───────────────────────────
    {
      id: 'haitian-revolution',
      icon: '\u{1F1ED}\u{1F1F9}',
      title: 'The Haitian Revolution: Freedom\'s Price',
      readAloudBlocks: [
        {
          id: 'haiti-intro',
          paragraphs: [
            'The Haitian Revolution (1791\u20131804) is one of the most extraordinary and underappreciated events in world history. It was the only successful large-scale revolt by enslaved people in human history, and it created the first free Black republic in the Western Hemisphere. But its story is also heartbreaking.',
            'In the late 1700s, the French colony of Saint-Domingue (present-day Haiti) was the richest colony in the Americas. Its wealth came entirely from enslaved people, about 500,000 of them, who were forced to work on sugar, coffee, and cotton plantations under conditions so brutal that the average enslaved person survived only about seven years after arriving. The colony imported about 40,000 new enslaved people every year just to replace those who died from overwork, disease, and violence.',
          ],
        },
        {
          id: 'haiti-revolution',
          paragraphs: [
            'On August 22, 1791, enslaved people in the northern part of Saint-Domingue launched a massive uprising. Within weeks, they had burned hundreds of plantations and killed thousands of enslavers. The rebellion was led by brilliant military strategists, most notably Toussaint Louverture, a formerly enslaved man who had educated himself by reading military strategy books.',
            'Toussaint was an extraordinary leader. Over the next decade, he defeated the local French planters, the Spanish, the British (who tried to seize the colony), and even a massive French army sent by Napoleon Bonaparte. Toussaint reorganized the colony\'s economy, wrote a constitution that abolished slavery, and tried to build a stable government. But in 1802, he was tricked into attending a negotiation, arrested, and sent to a freezing prison in the French mountains, where he died on April 7, 1803.',
          ],
        },
        {
          id: 'haiti-aftermath',
          paragraphs: [
            'Toussaint\'s death didn\'t stop the revolution. Jean-Jacques Dessalines, one of his generals, led the final push for independence. On January 1, 1804, Dessalines declared the independence of Haiti, making it the first free Black republic in the Western Hemisphere and only the second independent nation in the Americas after the United States.',
            'But here\'s where the story gets painful. France, furious at losing its richest colony, demanded that Haiti pay reparations, the equivalent of $21 billion in today\'s money, to compensate former slaveholders for their "lost property" (meaning the human beings they had enslaved). To avoid invasion, Haiti agreed and spent the next 122 years, until 1947, paying off this debt. This financial burden, combined with political instability, foreign interference, and devastating natural disasters, left Haiti one of the poorest countries in the Western Hemisphere.',
            'The Haitian Revolution is a story of incredible courage: enslaved people who rose up and defeated the most powerful armies in the world. But it\'s also a story of how the world punished them for their freedom. Understanding Haiti means understanding both the triumph and the injustice that followed.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{2694}\uFE0F',
          name: 'Toussaint Louverture',
          title: 'Leader of the Haitian Revolution (c. 1743\u20131803)',
          description:
            'Toussaint Louverture was a formerly enslaved man who became the leader of the Haitian Revolution. Self-educated in military strategy, he defeated French, Spanish, and British forces and governed Saint-Domingue with remarkable skill. He abolished slavery and tried to build a stable, multiracial society. Tricked into capture by the French, he died in a freezing prison in 1803, but his revolution continued and led to Haiti\'s independence in 1804.',
          extraTag: 'Defeated three European empires',
        },
        {
          emoji: '\u{1F1ED}\u{1F1F9}',
          name: 'Jean-Jacques Dessalines',
          title: 'First Leader of Independent Haiti (c. 1758\u20131806)',
          description:
            'Jean-Jacques Dessalines was a formerly enslaved man who served as a general under Toussaint Louverture. After Toussaint\'s capture, Dessalines led the final battles for independence and declared Haiti free on January 1, 1804. He became Haiti\'s first ruler. However, his rule was authoritarian, and he was assassinated in 1806, showing how the struggle for freedom doesn\'t always lead to stable democracy.',
          extraTag: 'Declared Haitian independence, January 1, 1804',
        },
      ],
      funFacts: [
        {
          title: 'A $21 Billion Penalty for Being Free',
          text: 'After Haiti won its independence, France demanded payment of 150 million francs (about $21 billion in today\'s money) to compensate former slaveholders for their "lost property," meaning the enslaved human beings who had freed themselves. Haiti was forced to take out loans from French banks to pay this debt, which took 122 years to pay off. Many historians argue this unjust debt is a major reason Haiti remains economically struggling today.',
        },
      ],
      videos: [
        {
          youtubeId: '5A_o-nU5s2U',
          title: 'Haitian Revolutions: Crash Course World History #30',
          channelName: 'CrashCourse',
        },
        {
          youtubeId: 'q7lfSjjMNU8',
          title: 'The First and Last King of Haiti',
          channelName: 'TED-Ed',
        },
      ],
      quizIds: ['rebels-q3', 'rebels-q4'],
    },

    // ─── Section 3: Sim\u00F3n Bol\u00EDvar ──────────────────────────────────
    {
      id: 'bolivar',
      icon: '\u{2694}\uFE0F',
      title: 'Sim\u00F3n Bol\u00EDvar: The Liberator of South America',
      readAloudBlocks: [
        {
          id: 'bolivar-intro',
          paragraphs: [
            'In the early 1800s, Spain controlled a vast empire stretching from Mexico to the tip of South America. Colonists, especially those of Spanish descent born in the Americas (called "criollos"), had little say in how they were governed. The wealth of South America flowed to Spain, and the Spanish crown appointed all the important officials. Inspired by the American and French Revolutions, and by the Haitian Revolution, criollos began to dream of independence.',
            'Sim\u00F3n Bol\u00EDvar was born on July 24, 1783, in Caracas, Venezuela, to one of the wealthiest families in the colony. Orphaned young, he was educated in Europe, where he encountered the ideas of the Enlightenment: liberty, equality, and popular sovereignty. Legend says he stood on a hill in Rome and swore he would not rest until South America was free from Spanish rule.',
          ],
        },
        {
          id: 'bolivar-campaigns',
          paragraphs: [
            'Bol\u00EDvar\'s military campaigns were staggering in their ambition and difficulty. He led armies across some of the most challenging terrain on Earth: the towering Andes Mountains, dense tropical jungles, and vast plains. In 1819, he pulled off one of the most daring military maneuvers in history, leading 2,500 soldiers over the Andes during the rainy season through freezing mountain passes at over 13,000 feet. About a third of his army died along the way, but those who survived surprised the Spanish forces in New Granada (present-day Colombia) and won a decisive victory at the Battle of Boyac\u00E1.',
            'Over the next decade, Bol\u00EDvar and other South American leaders, including Jos\u00E9 de San Mart\u00EDn from Argentina, liberated what would become the nations of Venezuela, Colombia, Ecuador, Peru, and Bolivia (named after Bol\u00EDvar himself). He dreamed of uniting all of South America into one great republic, like the United States, calling it "Gran Colombia."',
          ],
        },
        {
          id: 'bolivar-complexity',
          paragraphs: [
            'But Bol\u00EDvar\'s dream crumbled. The newly independent nations quickly descended into political infighting. Regional leaders refused to cooperate. Gran Colombia broke apart by 1831 into separate countries. Bol\u00EDvar himself was accused of becoming a dictator, and there were even assassination attempts against him. Disillusioned and suffering from tuberculosis, he died on December 17, 1830, at the age of 47. His last words were reportedly: "All who have served the revolution have plowed the sea."',
            'Bol\u00EDvar\'s story shows the difficult truth about revolutions: winning independence is hard, but building a stable, free nation afterward can be even harder. He freed millions of people from colonial rule, which was a magnificent achievement. But he also struggled with the contradictions of his time. He spoke of liberty while at times ruling as a dictator. He freed his own enslaved people but was slow to abolish slavery across the new nations. History remembers him as "El Libertador" (The Liberator), but his legacy, like all legacies, is complicated.',
            'Today, Bol\u00EDvar is honored as a national hero in multiple South American countries. The nation of Bolivia bears his name. His vision of a united, free Latin America continues to inspire people across the continent, even if that vision was never fully realized.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{2694}\uFE0F',
          name: 'Sim\u00F3n Bol\u00EDvar',
          title: '"El Libertador" \u2014 The Liberator (1783\u20131830)',
          description:
            'Sim\u00F3n Bol\u00EDvar was a Venezuelan military and political leader who led the liberation of Venezuela, Colombia, Ecuador, Peru, and Bolivia from Spanish colonial rule. His daring march over the Andes in 1819 is considered one of history\'s greatest military feats. He dreamed of a united South America but died disillusioned at 47 when his dream of Gran Colombia fell apart. Bolivia is named in his honor.',
          extraTag: 'A country was named after him',
        },
        {
          emoji: '\u{1F1E6}\u{1F1F7}',
          name: 'Jos\u00E9 de San Mart\u00EDn',
          title: 'Liberator of Argentina, Chile & Peru (1778\u20131850)',
          description:
            'Jos\u00E9 de San Mart\u00EDn was an Argentine general who liberated Argentina, Chile, and Peru from Spanish rule. While Bol\u00EDvar freed northern South America, San Mart\u00EDn liberated the south. The two met in person only once, at the famous Guayaquil Conference in 1822. After their meeting, San Mart\u00EDn quietly withdrew from public life, leaving Bol\u00EDvar to continue the fight. He is honored as a national hero across South America.',
          extraTag: 'Freed southern South America',
        },
      ],
      funFacts: [
        {
          title: 'A Country Named After You',
          text: 'Bolivia is the only country in South America named after a real person: Sim\u00F3n Bol\u00EDvar. When the region (formerly known as Upper Peru) gained independence in 1825, its leaders named it "Bol\u00EDvia" in honor of their liberator. Bol\u00EDvar also wrote the country\'s first constitution. Imagine having an entire country named after you!',
        },
      ],
      videos: [
        {
          youtubeId: 'ZBw35Ze3bg8',
          title: 'Latin American Revolutions: Crash Course World History #31',
          channelName: 'CrashCourse',
        },
      ],
      quizIds: ['rebels-q5', 'rebels-q6'],
    },

    // ─── Section 4: Stonewall ────────────────────────────────────
    {
      id: 'stonewall',
      icon: '\u{1F308}',
      title: 'The Stonewall Uprising: A Rebellion That Changed a Movement',
      readAloudBlocks: [
        {
          id: 'stonewall-intro',
          paragraphs: [
            'In the 1960s, being gay, lesbian, bisexual, or transgender in the United States was not just socially unacceptable; it was often illegal. In most states, it was a crime for two people of the same sex to dance together, hold hands, or even gather in a bar. Police regularly raided bars and clubs that served LGBTQ+ customers, arresting people simply for being who they were. People could lose their jobs, their homes, and their families if their identity was discovered.',
            'One of the few places LGBTQ+ people could gather was the Stonewall Inn, a bar in New York City\'s Greenwich Village. It wasn\'t a fancy place. It was small, sometimes dirty, and run by organized crime. But it was one of the few bars in the city that welcomed gay, lesbian, and transgender patrons, especially people of color and those who were homeless or living in poverty.',
          ],
        },
        {
          id: 'stonewall-uprising',
          paragraphs: [
            'In the early morning hours of June 28, 1969, police raided the Stonewall Inn, as they had done many times before. But this time, something was different. The patrons fought back. As police tried to arrest people and load them into a paddy wagon, a crowd gathered outside. Accounts vary, but many credit Marsha P. Johnson, a Black transgender woman, and Stormie DeLarverie, a biracial lesbian, as being among the first to physically resist.',
            'The crowd grew. People threw coins, bottles, and debris at the police. Officers barricaded themselves inside the bar. The uprising lasted for several nights, with thousands of people flooding the streets of Greenwich Village. It wasn\'t planned. It wasn\'t organized. It was a spontaneous eruption of anger from people who had endured years of harassment, violence, and discrimination.',
          ],
        },
        {
          id: 'stonewall-legacy',
          paragraphs: [
            'The Stonewall uprising didn\'t happen in a vacuum. LGBTQ+ activists had been organizing for years before Stonewall. Groups like the Mattachine Society and the Daughters of Bilitis had been quietly advocating for gay rights since the 1950s. But Stonewall changed the energy of the movement. It was louder, bolder, and more visible.',
            'Within months, new activist organizations formed, and the first Gay Pride marches were held in New York, Los Angeles, San Francisco, and Chicago on June 28, 1970, the first anniversary of the uprising. Today, Pride celebrations happen in cities around the world every June, commemorating the people at Stonewall who said "enough."',
            'The progress since Stonewall has been remarkable but uneven. In 2015, the U.S. Supreme Court legalized same-sex marriage nationwide. Many countries have passed anti-discrimination laws. But in over 60 countries, same-sex relationships are still criminalized. The fight for LGBTQ+ rights, like all civil rights struggles, continues around the world. The Stonewall Inn was designated a National Monument in 2016, the first U.S. National Monument honoring LGBTQ+ history.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F308}',
          name: 'Marsha P. Johnson',
          title: 'Transgender Activist & Stonewall Veteran (1945\u20131992)',
          description:
            'Marsha P. Johnson was a Black transgender woman and activist who is widely credited as one of the key figures in the Stonewall uprising. She was a regular at the Stonewall Inn and was among the first to resist during the police raid on June 28, 1969. After Stonewall, she co-founded STAR (Street Transvestite Action Revolutionaries) with Sylvia Rivera, an organization that provided housing and support for homeless LGBTQ+ youth. When asked what the "P" in her name stood for, she replied: "Pay it no mind."',
          extraTag: 'Co-founded STAR for homeless LGBTQ+ youth',
        },
      ],
      funFacts: [
        {
          title: 'The First National Monument for LGBTQ+ Rights',
          text: 'In 2016, President Barack Obama designated the Stonewall Inn and the surrounding area as the Stonewall National Monument. It was the first U.S. National Monument dedicated to LGBTQ+ rights and history. The designation covers about 7.7 acres in Greenwich Village, Manhattan, and includes the Stonewall Inn, Christopher Park, and the surrounding streets where the uprising took place.',
        },
      ],
      videos: [
        {
          youtubeId: 'ftcvaJCKVjs',
          title: 'Solidarity and the Fall of Communism',
          channelName: 'History',
        },
        {
          youtubeId: 'wr3kUfW2fM0',
          title: 'The Fall of the Berlin Wall',
          channelName: 'History',
        },
      ],
      quizIds: ['rebels-q7', 'rebels-q8'],
    },

    // ─── Section 5: Solidarity in Poland ─────────────────────────
    {
      id: 'solidarity-poland',
      icon: '\u{1F91D}',
      title: 'Solidarity: The Workers Who Brought Down an Empire',
      readAloudBlocks: [
        {
          id: 'solidarity-intro',
          paragraphs: [
            'After World War II, Poland fell under the control of the Soviet Union. For over 40 years, the Polish people lived under a communist government that controlled the economy, censored the press, and crushed any opposition. People couldn\'t speak freely, couldn\'t travel freely, and couldn\'t organize independently. Secret police monitored citizens, and dissidents were arrested, beaten, or worse.',
            'In the summer of 1980, the Polish government raised food prices, sparking strikes across the country. At the Lenin Shipyard in Gda\u0144sk, a charismatic electrician named Lech Wa\u0142\u0119sa (pronounced "Lekh Va-WEN-sa") climbed over the shipyard wall to join the workers. He quickly became their leader and their voice.',
          ],
        },
        {
          id: 'solidarity-movement',
          paragraphs: [
            'On August 31, 1980, the strikers won an unprecedented victory: the government agreed to allow an independent trade union. They called it "Solidarno\u015B\u0107" (Solidarity). Within a year, Solidarity had over 10 million members, about a third of Poland\'s working-age population. It was the first independent labor union in a Soviet-bloc country, and it terrified the communist government.',
            'In December 1981, the government declared martial law. Solidarity was banned, its leaders were arrested, including Wa\u0142\u0119sa, and tanks rolled through Polish streets. But Solidarity didn\'t die. It went underground. Workers organized in secret, printed underground newspapers, and kept the movement alive. The Catholic Church, led by Polish-born Pope John Paul II, provided moral support and safe spaces for organizing.',
          ],
        },
        {
          id: 'solidarity-victory',
          paragraphs: [
            'By the late 1980s, Poland\'s economy was crumbling and the Soviet Union under Mikhail Gorbachev was loosening its grip on Eastern Europe. In 1989, the government agreed to semi-free elections. Solidarity won every seat it was allowed to contest. The communist system in Poland collapsed. On December 9, 1990, Lech Wa\u0142\u0119sa was elected president of Poland.',
            'Poland\'s Solidarity movement set off a chain reaction. Within months, communist governments fell across Eastern Europe: Hungary, East Germany, Czechoslovakia, Bulgaria, Romania. The Berlin Wall came down on November 9, 1989. The Soviet Union itself dissolved in 1991. A movement that started with shipyard workers in Gda\u0144sk had helped topple one of the most powerful empires in history.',
            'But, as with all revolutions, the aftermath was complicated. The transition from communism to capitalism caused economic hardship for many Poles. Wa\u0142\u0119sa\'s presidency was controversial, and he lost re-election in 1995. Poland\'s journey to democracy has had ups and downs. But the Solidarity movement proved something profound: that ordinary workers, armed with nothing but courage and unity, can change the world.',
          ],
        },
      ],
      characters: [
        {
          emoji: '\u{1F91D}',
          name: 'Lech Wa\u0142\u0119sa',
          title: 'Leader of Solidarity & President of Poland (1943\u2013)',
          description:
            'Lech Wa\u0142\u0119sa was an electrician at the Lenin Shipyard in Gda\u0144sk, Poland, who became the leader of Solidarity, the first independent trade union in the Soviet bloc. Despite being arrested and the movement being banned under martial law, he kept fighting for workers\' rights and democracy. He won the Nobel Peace Prize in 1983 and was elected president of Poland in 1990 after communism fell.',
          extraTag: 'From electrician to president',
        },
        {
          emoji: '\u{1F4F0}',
          name: 'Anna Walentynowicz',
          title: 'Crane Operator & Solidarity Co-Founder (1929\u20132010)',
          description:
            'Anna Walentynowicz was a crane operator at the Lenin Shipyard in Gda\u0144sk whose firing in August 1980 sparked the strike that led to the creation of Solidarity. She had been an activist for years, collecting money for workers\' families and distributing underground publications. While Lech Wa\u0142\u0119sa became the public face of Solidarity, Walentynowicz was the spark that lit the flame.',
          extraTag: 'Her firing sparked the Solidarity movement',
        },
      ],
      funFacts: [
        {
          title: '10 Million Members in One Year',
          text: 'Solidarity grew from a shipyard strike to a movement of over 10 million members in just one year. That was about one-third of Poland\'s entire working-age population! No other organization in the Soviet bloc had ever come close to that level of support. The sheer number of members made it impossible for the government to simply arrest everyone, though they certainly tried.',
        },
      ],
      videos: [
        {
          youtubeId: 'f0-n_nWOYOQ',
          title: 'Solidarity: The Movement That Changed Europe',
          channelName: 'History',
        },
      ],
      quizIds: ['rebels-q9', 'rebels-q10'],
    },
  ],

  // ─── Quizzes ─────────────────────────────────────────────────
  quizzes: [
    // Section 1: Gandhi
    {
      id: 'rebels-q1',
      sectionId: 'gandhi-india',
      title: 'Nonviolent Resistance Quiz!',
      question:
        'What was Gandhi\'s philosophy of nonviolent resistance called?',
      options: [
        { text: 'Apartheid', isCorrect: false },
        { text: 'Satyagraha', isCorrect: true },
        { text: 'Solidarno\u015B\u0107', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rebels-q2',
      sectionId: 'gandhi-india',
      title: 'Salt March Challenge!',
      question:
        'What was the devastating consequence of India\'s independence in 1947?',
      options: [
        { text: 'India was invaded by China', isCorrect: false },
        { text: 'The country was partitioned into India and Pakistan, causing massive violence', isCorrect: true },
        { text: 'The British destroyed all of India\'s factories before leaving', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 2: Haiti
    {
      id: 'rebels-q3',
      sectionId: 'haitian-revolution',
      title: 'Haitian Revolution Quiz!',
      question:
        'Why is the Haitian Revolution unique in world history?',
      options: [
        { text: 'It was the shortest revolution ever', isCorrect: false },
        { text: 'It was the only successful large-scale revolt by enslaved people', isCorrect: true },
        { text: 'It was the first revolution to use cannons', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rebels-q4',
      sectionId: 'haitian-revolution',
      title: 'Freedom\'s Price Challenge!',
      question:
        'What did France force Haiti to pay after independence?',
      options: [
        { text: 'A yearly tribute of sugar and coffee', isCorrect: false },
        { text: 'Reparations of about $21 billion (in today\'s money) to former slaveholders', isCorrect: true },
        { text: 'Free passage for French ships through Haitian waters', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 3: Bol\u00EDvar
    {
      id: 'rebels-q5',
      sectionId: 'bolivar',
      title: 'Liberator Quiz!',
      question:
        'Which country is named after Sim\u00F3n Bol\u00EDvar?',
      options: [
        { text: 'Brazil', isCorrect: false },
        { text: 'Bolivia', isCorrect: true },
        { text: 'Belize', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rebels-q6',
      sectionId: 'bolivar',
      title: 'Revolution Reality Check!',
      question:
        'What happened to Bol\u00EDvar\'s dream of a united South America ("Gran Colombia")?',
      options: [
        { text: 'It thrived and became the most powerful nation in the world', isCorrect: false },
        { text: 'It broke apart into separate countries due to political infighting', isCorrect: true },
        { text: 'Spain reconquered it within ten years', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 4: Stonewall
    {
      id: 'rebels-q7',
      sectionId: 'stonewall',
      title: 'Stonewall Quiz!',
      question:
        'What year did the Stonewall uprising take place?',
      options: [
        { text: '1959', isCorrect: false },
        { text: '1969', isCorrect: true },
        { text: '1979', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rebels-q8',
      sectionId: 'stonewall',
      title: 'Pride History Challenge!',
      question:
        'What special designation did the Stonewall Inn receive in 2016?',
      options: [
        { text: 'It was named a UNESCO World Heritage Site', isCorrect: false },
        { text: 'It became the first U.S. National Monument honoring LGBTQ+ history', isCorrect: true },
        { text: 'It was declared a National Historic Library', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },

    // Section 5: Solidarity
    {
      id: 'rebels-q9',
      sectionId: 'solidarity-poland',
      title: 'Solidarity Quiz!',
      question:
        'How many members did Solidarity have at its peak?',
      options: [
        { text: 'About 100,000', isCorrect: false },
        { text: 'About 10 million', isCorrect: true },
        { text: 'About 1 million', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
    {
      id: 'rebels-q10',
      sectionId: 'solidarity-poland',
      title: 'Domino Effect Challenge!',
      question:
        'What happened across Eastern Europe after Solidarity\'s success in Poland?',
      options: [
        { text: 'Other countries invaded Poland to stop the movement', isCorrect: false },
        { text: 'Communist governments fell in Hungary, East Germany, Czechoslovakia, and more', isCorrect: true },
        { text: 'The Soviet Union strengthened its control over the region', isCorrect: false },
      ],
      xpCorrectFirstTry: 100,
      xpCorrectRetry: 50,
    },
  ],

  // ─── Essay ───────────────────────────────────────────────────
  essay: {
    id: 'rebels-essay',
    prompt:
      'Revolutions can bring freedom but also new problems. Pick one revolution from this lesson and explain both the good and the bad that came from it.',
    description:
      'You learned that revolutions are complicated. Gandhi freed India but partition caused millions to suffer. Haiti won freedom but was punished with crippling debt. Bol\u00EDvar liberated nations but his dream of unity fell apart. Pick one revolution and explain both the positive changes it brought and the problems that followed. Write at least 100 characters to help unlock a special surprise!',
    minCharacters: 100,
    xpValue: 75,
    successMessage:
      'Excellent critical thinking! Understanding that history is complicated is a sign of real wisdom. Your response has been saved.',
  },

  // ─── Reward ──────────────────────────────────────────────────
  reward: {
    id: 'rebels-reward',
    title: 'Revolution Timeline',
    description:
      'Arrange causes, turning points, and consequences for each revolution. Then flip the cards to discover the complicated truth!',
    lockMessage: 'Timeline Access Locked!',
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
    type: 'revolution-timeline',
    celebrationMessage: 'You\'re a true historian! Understanding complexity is wisdom!',
  },

  // ─── Conclusion ──────────────────────────────────────────────
  conclusion: {
    title: 'The Complicated Courage of Rebels',
    paragraphs: [
      'Congratulations! You\'ve completed your journey through some of history\'s most significant rebellions and uprisings, and you\'ve learned that the real story is always more complicated than it first appears.',
      'You walked 240 miles with Gandhi on the Salt March and saw how nonviolent resistance freed a nation of 300 million, but also how Partition tore that nation apart. You witnessed the Haitian Revolution, where enslaved people achieved the impossible and created the first free Black republic, only to be punished by France with a crushing debt that lasted over a century.',
      'You followed Sim\u00F3n Bol\u00EDvar across the Andes as he liberated half a continent, and watched his dream of Gran Colombia crumble. You stood with the patrons of the Stonewall Inn as they fought back against years of persecution, launching a global movement for LGBTQ+ rights. And you joined the shipyard workers of Gda\u0144sk whose Solidarity movement helped bring down the entire Soviet empire.',
      'The most important lesson from all these stories is that revolutions don\'t end when the old system falls. The hardest work often comes after: building a fair society, healing old wounds, and making sure that freedom is real for everyone, not just a lucky few. Heroes are real, but so are the messy, complicated consequences of even the most just causes.',
      'These rebels weren\'t perfect. But they all shared one thing: the courage to say "enough" when faced with injustice. That courage changed the world, even when the results were imperfect. And the work of building a more just world continues today, carried forward by people like you who take the time to learn these stories and think critically about what they mean.',
    ],
  },
};
