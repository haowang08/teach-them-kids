# Three.js Educational Games for Young Kids (Ages 4-5)

> Research & design document for phonetics/reading and math games

## 1. Project Overview

### Target Audience
- **Ages:** 4-5 years old (pre-K to kindergarten)
- **Reading level:** Pre-reader to early emergent reader
- **Math level:** Pre-counting to counting within 10-20
- **Motor skills:** Large tap targets (min 48px, ideally 64px+), limited precision

### Platform
- Web-based using **React Three Fiber** (@react-three/fiber) + **drei** (@react-three/drei)
- TypeScript + React (consistent with existing teach-them-kids stack)
- Must work on tablets (primary device for this age group) and desktop

### Design Philosophy
1. **Audio-first:** Every interaction must have accompanying audio — letter sounds, word pronunciation, celebration sounds, gentle guidance
2. **Minimal text UI:** Icons, colors, and voice guide the child — not written instructions
3. **Huge tap targets:** 3D objects that are large, colorful, and easy to select
4. **Celebration everywhere:** Every correct answer triggers particles, sounds, character animations
5. **No failure state:** Wrong answers get gentle redirection ("Try again!") not penalties
6. **Self-guided with parent option:** Games work autonomously but parents can adjust difficulty
7. **Short sessions:** 3-5 minute game loops, natural stopping points

### Accessibility Considerations
- **WCAG 2.1 Level AA** compliance (federal deadline: April 2026)
- Color-blind friendly palettes (never rely on color alone)
- Audio descriptions for visual events
- Adjustable speed/volume controls
- Large, clear, sans-serif fonts (Nunito, Verdana, or similar)
- Research note: Specialized dyslexia fonts (OpenDyslexic) did NOT improve reading in studies. Standard clear sans-serif fonts (Arial, Verdana, Nunito) perform better. (Source: PMC5629233)

---

## 2. Phonetics & Reading Games

### 2.1 Learning Progression

```
Level 1: Letter Recognition
  └─ Uppercase letters (A-Z visual + audio)
  └─ Lowercase letters (a-z visual + audio)

Level 2: Letter Sounds (Phonemes)
  └─ Continuous sounds first (f, l, m, n, r, s, v, z — can be "stretched")
  └─ Stop sounds second (b, d, k, p, t — quick burst sounds)
  └─ Vowel sounds (short vowels first: a, e, i, o, u)

Level 3: Letter Combinations (Blends & Digraphs)
  └─ Consonant blends: bl, br, cl, cr, dr, fl, fr, gl, gr, pl, pr, sl, sm, sn, sp, st, tr
  └─ Digraphs: ch, sh, th, wh, ph, ck

Level 4: CVC Words (Consonant-Vowel-Consonant)
  └─ Start with continuous-sound-initial words: sat, mat, fan, sun, vet
  └─ Then stop-sound-initial words: bat, cat, dog, hat, pig
  └─ Word families: -at, -an, -ig, -og, -ug, -en, -et, -in, -ot, -un

Level 5: Simple Sight Words
  └─ the, is, a, to, and, in, it, he, she, we, my, was, for, on, are

Level 6: Short Phrases
  └─ "the big cat", "a red hat", "I can run", "she is fun"

Level 7: Simple Sentences
  └─ "The cat sat on the mat.", "I can see a big dog.", "She has a red hat."
```

### 2.2 Game Designs

---

#### Game 1: Letter Land Explorer 🌍
**Concept:** A 3D island world where each region is shaped like a letter. Children fly over the island on a friendly bird, landing on letter-regions to hear their sounds.

**Three.js Elements:**
- Extruded 3D letter geometries (Text3D from drei) forming terrain
- Animated bird character (simple low-poly mesh with flapping wings)
- Particle effects on each island (sparkles, butterflies)
- Sky dome with clouds, sun cycle

**Gameplay:**
1. Bird flies over a colorful island landscape
2. Child taps a letter-shaped region to land
3. Landing triggers: letter highlights + zooms in → audio says the letter name ("A!") → audio says the sound ("ahhh") → a 3D object appears that starts with that letter (apple, astronaut, alligator)
4. Child can tap the object to hear the word spoken and see it spelled
5. Collectible stars appear after visiting each letter

**Audio Component:**
- **Letter name:** Clear voice says "This is the letter A!"
- **Letter sound:** Voice says "A makes the sound... /æ/... /æ/... apple!"
- **Object naming:** "This is an APPLE! A-P-P-L-E, apple!"
- **Celebration:** Chime + "Great job!" or "You found the letter A!"
- **Background:** Gentle ambient nature sounds (birds, wind)
- **Guidance:** If idle for 10 seconds, bird character says "Tap a letter to explore!"

**Visual Design:** Bright, saturated colors. Each letter region has a distinct color. Low-poly style (friendly, not realistic). Soft shadows.

**Progress Celebration:** After visiting all 26 letters, fireworks burst over the island, bird does a loop-de-loop, and a "You explored the whole alphabet!" message appears with party sounds.

**Difficulty Scaling:**
- Level 1: Uppercase letters only, just letter names
- Level 2: Uppercase + sounds
- Level 3: Lowercase letters introduced
- Level 4: "Find the letter that makes the /s/ sound!" (quiz mode)

**Technical Notes:**
- Use `Text3D` from drei with `ExtrudeGeometry` for letter terrain
- Bird animation via `useFrame` spring-based interpolation
- Particle effects via drei's `Sparkles` component
- Camera on a `CameraControls` rail for guided flight

---

#### Game 2: Sound Bubbles 🫧
**Concept:** 3D bubbles float up from the bottom of the screen, each containing a letter. Child pops bubbles to hear sounds and matches them to pictures.

**Three.js Elements:**
- Translucent sphere geometries with letters inside (Text component)
- Physics-like floating animation (sine wave motion)
- Pop animation (scale up → particle burst)
- 3D picture cards floating on platforms

**Gameplay:**
1. Bubbles with letters float upward slowly
2. Child taps a bubble to hear its sound
3. A picture appears (e.g., picture of a "sun")
4. Child pops the bubble matching the first sound of the picture
5. Correct: bubble pops with sparkle explosion. Wrong: bubble wobbles and a voice says "Hmm, that's the /b/ sound. The sun starts with /s/!"

**Audio Component:**
- **On bubble tap:** Voice pronounces the phoneme clearly, stretched if continuous ("/sssss/")
- **Picture reveal:** "Can you find the sound that starts... SUN?"
- **Correct match:** Pop sound + "Yes! /s/ for sun! Amazing!"
- **Wrong match:** Gentle boing + "That's /b/. Try another bubble!"
- **Idle prompt:** "Pop a bubble to hear its sound!"

**Difficulty Scaling:**
- Level 1: 3 bubbles, obvious choices (s, b, m for "sun")
- Level 2: 5 bubbles, trickier (s, f, z, m, n for "sun")
- Level 3: Match ending sounds instead of beginning
- Level 4: Blends and digraphs in bubbles (sh, ch, th)

---

#### Game 3: Word Builder Workshop 🔧
**Concept:** A workshop where 3D letter blocks sit on shelves. Child drags blocks onto a workbench to build words, hearing each sound as blocks snap together.

**Three.js Elements:**
- Rounded box geometries with embossed letters (3D blocks)
- Workbench surface with snap slots
- Animated conveyor belt bringing blocks
- Completed word triggers a 3D model to appear

**Gameplay:**
1. A picture shows on the wall (e.g., a cat)
2. Voice says "Let's build the word... CAT!"
3. Voice segments: "/k/... /æ/... /t/... CAT!"
4. Letter blocks available on shelves: c, a, t, b, m, s
5. Child drags blocks to the workbench slots
6. Each block snaps in with a satisfying click and its sound plays
7. When complete, the word glows, voice reads it, and a 3D cat appears and does a trick

**Audio Component (CRITICAL - detailed spec):**
- **Picture reveal:** "Look! It's a cat! Can you build the word CAT?"
- **Sound segmentation:** "/k/... /æ/... /t/... /k/-/æ/-/t/... CAT!" (slow, then blended, then whole word)
- **Block pickup:** Clickity sound + "/k/!" (whatever letter it is)
- **Block placed correctly:** Satisfying snap + "/k/!" then blends what's placed so far: "/k/-/æ/... kaa..."
- **Block placed incorrectly:** Gentle slide-back animation + "Hmm, that's /b/. We need the /k/ sound first!"
- **Word complete:** Fanfare + "C-A-T! CAT! You built it! 🎉"
- **Object celebration:** Cat meows, purrs, does a little dance

**Difficulty Scaling:**
- Level 1: CVC words with visual letter outlines in slots (tracing)
- Level 2: CVC words, no outlines, but sounds segmented
- Level 3: CCVC/CVCC words (stop, fish, lamp)
- Level 4: Sight words and simple phrases

---

#### Game 4: Phonics Train 🚂
**Concept:** A 3D train travels through a landscape. Each car carries a letter/sound. Child combines train cars to form words, and the train chugs forward when a word is complete.

**Three.js Elements:**
- Low-poly train with detachable cars
- Colorful landscape with tunnels, bridges, stations
- Station platforms with word goals
- Smoke particles from engine

**Gameplay:**
1. Train sits at a station with a picture/word goal (e.g., "dog")
2. Train cars with letters are scattered on side tracks
3. Child taps cars to hear their sounds, then drags them to connect to the engine
4. Correct order → train chugs to next station
5. Each station gets progressively harder (CVC → blends → phrases)

**Audio Component:**
- **Station arrival:** "Welcome to Dog Station! Build the word DOG to keep going!"
- **Car tap:** Individual phoneme plays ("/d/!")
- **Car attached:** Sound plays + blend so far ("/d/-/ɒ/... do...")
- **Word complete:** Train whistle + "D-O-G! DOG! All aboard!" + chug-chug-chug sounds
- **Progress:** "Next stop... CAT station!"

---

#### Game 5: Storybook World 📖
**Concept:** An interactive 3D storybook where pages come alive. Child reads along with highlighted text, taps words to hear them, and completes fill-in-the-blank challenges.

**Three.js Elements:**
- 3D book with animated page turns (plane geometries with textures)
- Pop-up style 3D scenes rising from pages
- Animated characters acting out the story
- Highlighted text overlay (HTML overlay via drei's Html component)

**Gameplay:**
1. Book opens to a page with a simple sentence and 3D scene
2. Text highlights word-by-word as narrator reads: "The **cat** sat on the **mat**."
3. 3D scene shows a cat sitting on a mat
4. Child taps any word to hear it again, isolated
5. Next page has a blank: "The ___ sat on the mat." + 3 word choices appear as 3D blocks
6. Child picks the right word to continue the story

**Audio Component:**
- **Narration:** Full sentence read with word-by-word highlighting sync
- **Word tap:** Individual word pronounced clearly and slowly
- **Fill-in-blank:** "What word goes here? The _____ sat on the mat."
- **Correct:** "The CAT sat on the mat! That's right!" + page turn sound
- **Story completion:** Celebration music + "You read the whole story! 📚"

**Difficulty Scaling:**
- Level 1: 3-word sentences, CVC words only
- Level 2: 5-word sentences, sight words included
- Level 3: Multi-sentence pages
- Level 4: Child records themselves reading the sentence (speech recognition)

---

#### Game 6: Alphabet Zoo 🦁
**Concept:** A 3D zoo where each enclosure holds an animal starting with a different letter. Child walks through the zoo, interacts with animals, and learns letter-animal-sound associations.

**Three.js Elements:**
- Low-poly animal models (simple geometries: spheres, cones, cylinders composed into animals)
- Zoo path with signposts
- First-person or top-down camera following a child avatar
- Animal animations (bounce, wiggle, fly)

**Gameplay:**
1. Child walks their character through the zoo
2. Each enclosure has a letter sign and animal
3. Tapping the sign: "A is for Alligator! /æ/-/æ/-alligator!"
4. Tapping the animal: Animal animation + sound + fun fact
5. Collect stamps in a "Zoo Passport" for each letter visited
6. Challenge mode: "Find the animal that starts with /m/!"

**Audio Component:**
- **Sign tap:** "The letter B! B makes the /b/ sound. B is for BEAR!"
- **Animal interaction:** Bear growl + "Bears love to eat fish and honey!"
- **Challenge:** "Can you find which animal starts with the /m/ sound?"
- **Correct find:** "MONKEY! M-M-Monkey starts with /m/! 🐒"
- **Zoo passport full:** "You visited every animal! You're an Alphabet Zookeeper! 🏆"

---

### 2.3 Audio System Design

#### Architecture
```
AudioManager
├── PhonemeLibrary (pre-recorded audio files)
│   ├── /a/ through /z/ (26 phonemes, multiple variants)
│   ├── blends (bl, br, ch, sh, th, etc.)
│   └── vowel variants (short/long)
├── WordPronunciationEngine
│   ├── Pre-recorded common words (200+ words)
│   └── TTS fallback for uncommon words
├── CelebrationSounds
│   ├── Correct answer chimes (5 variants for variety)
│   ├── Level complete fanfares (3 variants)
│   ├── Encouragement phrases (10+ variants)
│   └── Gentle redirection phrases (5+ variants)
├── NarrationEngine
│   ├── Pre-recorded guided instructions
│   └── Dynamic word-highlighting sync
└── BackgroundMusic
    ├── Ambient loops (calm, playful themes)
    └── Volume ducking during speech
```

#### TTS vs Pre-recorded Audio
| Use Case | Recommendation | Rationale |
|---|---|---|
| Individual phonemes | **Pre-recorded** | TTS cannot accurately produce isolated phonemes |
| Common words (CVC, sight words) | **Pre-recorded** | Higher quality, consistent pronunciation |
| Sentences & stories | **Pre-recorded with TTS fallback** | Best quality pre-recorded; TTS for user-generated |
| Celebration phrases | **Pre-recorded** | Warm, enthusiastic human voice matters for engagement |
| Instructions & guidance | **Pre-recorded** | Consistent, tested for clarity |

#### Recommended Audio Libraries
- **Howler.js** — Battle-tested, handles audio sprites, spatial audio, mobile quirks
- **Web Audio API** — Low-level fallback for precise timing and phoneme blending
- **Tone.js** — For musical celebration sounds (chimes, fanfares)

#### Phoneme Audio Specifications
- Format: MP3 (broad compatibility) + OGG (better quality fallback)
- Sample rate: 44.1kHz
- Bit depth: 16-bit
- Recording: Professional voice artist, clear enunciation, warm tone
- Each phoneme recorded in 3 contexts: isolated, word-initial, word-final
- Audio sprites for fast loading (all phonemes in one file with timing metadata)

---

## 3. Math Games

### 3.1 Learning Progression

```
Level 1: Number Recognition
  └─ Numbers 1-10 (visual + audio + quantity)
  └─ Numbers 11-20

Level 2: Counting Objects
  └─ Count objects 1-10 with 1:1 correspondence
  └─ Count objects 1-20

Level 3: Comparing Quantities
  └─ More / Less / Equal (visual groups)
  └─ Greater than / Less than symbols

Level 4: Simple Addition (within 10)
  └─ Combining groups of objects
  └─ Number sentences (3 + 2 = 5)

Level 5: Simple Subtraction (within 10)
  └─ Taking away from groups
  └─ Number sentences (5 - 2 = 3)

Level 6: Shapes
  └─ Circle, Square, Triangle, Rectangle
  └─ 3D: Sphere, Cube, Cone, Cylinder

Level 7: Patterns
  └─ AB patterns (red, blue, red, blue, ?)
  └─ ABC patterns
  └─ Number patterns (1, 2, 3, ?)
```

### 3.2 Game Designs

---

#### Game 1: Number Mountain 🏔️
**Concept:** A 3D mountain with numbered platforms. Child climbs by counting correctly, reaching the summit for a celebration.

**Three.js Elements:**
- Stylized low-poly mountain with spiral path
- Numbered stepping stones (3D platforms)
- Character avatar climbing/jumping
- Clouds, birds, snow at higher levels

**Gameplay:**
1. Character starts at base of mountain
2. Voice says "Count with me! One..." and the first platform glows
3. Child taps each platform in order to count up
4. Each tap: number highlights + voice says number + character jumps to platform
5. At the top: panoramic view reveal + celebration

**Audio Component:**
- **Each number:** "One! Two! Three!" (enthusiastic counting voice)
- **Encouragement:** "Keep climbing! You're doing great!"
- **Mistake:** "That's 5. We need 4 next! Can you find 4?"
- **Summit:** Triumph music + "You counted all the way to 10! You reached the top!"

**Difficulty Scaling:**
- Level 1: Count 1-5 (numbers visible)
- Level 2: Count 1-10 (numbers visible)
- Level 3: Count 1-20 (some numbers hidden — child fills in)
- Level 4: Count by 2s, 5s, or 10s

---

#### Game 2: Shape Safari 🔍
**Concept:** A 3D jungle where shapes are hidden in the environment. Child uses a "shape detector" to find circles, squares, and triangles in nature.

**Three.js Elements:**
- Lush 3D jungle scene (low-poly trees, flowers, water)
- Hidden shapes integrated into scenery (circular pond, triangular mountain, rectangular door)
- "Detector" beam effect (cylinder with glow material)
- Found shapes fly out and add to collection

**Gameplay:**
1. "Shape Detective" mission card shows target shape (e.g., circle)
2. Child moves a detector beam around the 3D scene
3. When beam passes over a hidden shape, it glows and pulses
4. Child taps it: shape flies out, spins, voice identifies it
5. After finding all shapes, level complete

**Audio Component:**
- **Mission:** "Can you find all the CIRCLES hidden in the jungle?"
- **Detection:** Humming/pulsing sound when near a shape
- **Found:** "You found a circle! The pond is a circle! 🔵"
- **Collection complete:** "You found all the circles! You're a Shape Detective!"

---

#### Game 3: Addition Aquarium 🐠
**Concept:** A 3D aquarium where fish swim in two groups. Child counts fish in each group and combines them, learning addition through visual grouping.

**Three.js Elements:**
- Glass aquarium with water shader (drei's MeshTransmissionMaterial)
- Animated fish (simple shapes with tail wiggle via useFrame)
- Bubbles, coral, seaweed decorations
- Number display overlay

**Gameplay:**
1. Fish swim into the aquarium in two groups (e.g., 3 blue fish, then 2 orange fish)
2. Voice: "Look! 3 blue fish... and 2 orange fish! How many fish altogether?"
3. Number choices appear as 3D bubbles (4, 5, 6)
4. Child counts and taps the right answer
5. Correct: All fish do a synchronized loop + "3 plus 2 equals 5! Five fish!"

**Audio Component:**
- **Group 1 arrives:** "Here come 3 blue fish! One... two... three!"
- **Group 2 arrives:** "And 2 more orange fish! One... two!"
- **Question:** "How many fish are there altogether? Count them!"
- **Correct:** Bubble pop + "Five! 3 plus 2 equals 5! You're amazing!"
- **Wrong:** "Hmm, let's count together... 1, 2, 3, 4, 5! There are 5 fish!"

---

#### Game 4: Subtraction Spaceship 🚀
**Concept:** A spaceship drops off alien passengers at different planets. Child calculates how many aliens remain after each stop.

**Three.js Elements:**
- Cartoon spaceship interior with alien passengers (simple sphere+antenna characters)
- Planet surfaces visible through windows
- Aliens wave goodbye and float to planets
- Star field background

**Gameplay:**
1. Spaceship starts with X aliens
2. "We have 5 aliens! 2 aliens get off at Mars. How many are left?"
3. 2 aliens wave goodbye and float out the airlock
4. Child counts remaining aliens and selects answer
5. Correct: Spaceship blasts off to next planet with thrust particles

---

#### Game 5: Pattern Party 🎪
**Concept:** A 3D party/carnival where decorations follow patterns. Child extends patterns by placing the next item in sequence.

**Three.js Elements:**
- Festive carnival scene with string lights, banners, balloons
- Pattern items on strings (3D shapes/colors in sequence)
- Empty hook at the end where next item goes
- Available items on a tray below

**Gameplay:**
1. A string of decorations shows a pattern: 🔴🔵🔴🔵🔴❓
2. Voice: "Red, blue, red, blue, red... what comes next?"
3. Child picks from available items and places on the hook
4. Correct: Banner unfurls + "Blue! Red, blue, red, blue, red, blue! You got it!"

---

#### Game 6: Counting Kitchen 🍳
**Concept:** A 3D kitchen where child is a chef. Recipes require specific numbers of ingredients. Child counts and adds correct quantities.

**Three.js Elements:**
- Cartoon kitchen with counter, mixing bowl, oven
- 3D food items (simple geometries: sphere=apple, cylinder=carrot, box=butter)
- Recipe card with pictures and numbers
- Mixing bowl animation when ingredients added

**Gameplay:**
1. Recipe card appears: "Fruit Salad: 3 apples + 2 bananas"
2. Fruit items are on the counter
3. Child taps and drags correct quantities into the bowl
4. Bowl counts each addition aloud
5. Complete recipe: Mixing animation + final dish appears

---

## 4. Technical Architecture

### 4.1 React Three Fiber Setup

#### Recommended Stack
```json
{
  "@react-three/fiber": "^9.x",
  "@react-three/drei": "^10.x",
  "@react-three/rapier": "^2.x",
  "three": "^0.182.x",
  "howler": "^2.2.x",
  "zustand": "^5.x",
  "leva": "^0.10.x"
}
```

#### Performance Considerations
- **Target:** 60fps on iPad (primary device)
- **Polygon budget:** <10K triangles per scene
- **Textures:** Max 512x512, compressed (WebP)
- **Instancing:** Use `InstancedMesh` for repeated objects (fish, bubbles, blocks)
- **Level-of-detail:** Not needed at this poly count
- **Suspense boundaries:** Wrap each game in `<Suspense>` for loading states
- **Asset preloading:** `useGLTF.preload()` and `useTexture.preload()`

### 4.2 Audio Architecture

```typescript
// AudioManager singleton
class AudioManager {
  private phonemes: Map<string, Howl>;     // Pre-loaded phoneme audio
  private words: Map<string, Howl>;        // Pre-loaded word audio
  private effects: Map<string, Howl>;      // Sound effects
  private music: Howl;                      // Background music

  playPhoneme(phoneme: string): void;
  playWord(word: string): void;
  playSequence(sounds: string[], delay: number): void;  // For segmented pronunciation
  playCelebration(type: 'correct' | 'levelComplete' | 'encouragement'): void;
  setVolume(channel: 'voice' | 'effects' | 'music', volume: number): void;
}
```

**Preloading Strategy:**
- Load all phonemes as a single audio sprite (26 phonemes + variants, ~2MB)
- Load per-game word packs on game entry (~500KB per game)
- Celebration sounds as shared sprite (~1MB)
- Total audio budget per game: ~4MB

### 4.3 Progress Tracking

```typescript
interface ChildProgress {
  // Phonics
  lettersRecognized: Set<string>;          // Which letters identified correctly
  phonemesMastered: Set<string>;           // Which sounds produced/matched correctly
  wordsRead: Set<string>;                  // Words built/read successfully
  currentPhonicsLevel: number;             // 1-7

  // Math
  numbersRecognized: Set<number>;
  additionFacts: Map<string, number>;      // "3+2" → accuracy count
  subtractionFacts: Map<string, number>;
  shapesKnown: Set<string>;
  currentMathLevel: number;                // 1-7

  // Engagement
  totalPlayTime: number;
  sessionsCompleted: number;
  streakDays: number;
  lastActivity: Date;
}
```

**Adaptive Difficulty:**
- Track accuracy over last 10 attempts per skill
- >80% accuracy → advance to next level
- <50% accuracy → offer easier variant or more scaffolding
- Never go backward without parent approval

### 4.4 Shared Components

```
SharedComponents/
├── CelebrationParticles.tsx    — Confetti/sparkle burst on correct answers
├── EncouragementVoice.tsx      — Random encouragement audio picker
├── ProgressBar3D.tsx           — 3D star/gem collection display
├── TapTarget3D.tsx             — Large, accessible 3D button with hover/press states
├── AudioButton.tsx             — Play/replay audio for any word/sound
├── DifficultySelector.tsx      — Parent-facing difficulty control
├── CharacterGuide.tsx          — Animated helper character (bird, robot, etc.)
├── TransitionPortal.tsx        — 3D doorway/portal transition between games
└── LoadingScene.tsx            — Fun loading animation (bouncing letters/numbers)
```

---

## 5. Art Direction

### Color Palette
| Color | Hex | Usage |
|---|---|---|
| Sky Blue | `#4FC3F7` | Backgrounds, calm areas |
| Sunshine Yellow | `#FFD54F` | Highlights, correct answers |
| Grass Green | `#81C784` | Nature elements, progress |
| Coral Pink | `#FF8A80` | Warm accents, hearts |
| Soft Purple | `#CE93D8` | Magic effects, special items |
| Cloud White | `#F5F5F5` | Text backgrounds |
| Warm Brown | `#8D6E63` | Wood, earth tones |

### Character Design
- **Round, soft shapes** — no sharp angles or scary features
- **Big eyes, small bodies** — cute proportion (chibi-style)
- **Consistent helper character** across all games (friendly robot or animal)
- **Minimal detail** — 4-5 year olds respond better to simple, clear designs
- **Expressive animations** — characters react to player actions (clap, cheer, think, wave)

### Typography
- **Primary font:** Nunito (rounded sans-serif, already in the teach-them-kids stack)
- **Letter display:** Large (48px+ equivalent), bold weight, high contrast
- **Number display:** Tabular figures, bold, slightly larger than letters
- **No italic or decorative fonts** — research confirms these slow reading for all children
- **Color contrast:** Minimum 7:1 ratio (WCAG AAA for large text)

---

## 6. Research References

### Phonics & Reading Instruction
- **National Reading Panel (2000):** Systematic phonics instruction is more effective than non-systematic or no phonics instruction
- **Science of Reading:** Decades of research support explicit, systematic phonics instruction as the most effective way to teach children to read
- **CVC Word Progression:** Start with continuous-sound initial words before stop-sound initial words. Start with VC words (at, in) to reduce cognitive load before CVC.
- Source: [Time 4 Kindergarten](https://www.time4kindergarten.com/2021/03/cvc-word-activities-for-building.html)

### Educational Game Design for Young Children
- **Large tap targets:** WCAG recommends minimum 44x44px; for ages 4-5, use 64px+ minimum
- **Audio feedback:** Young pre-readers depend on audio for all guidance and feedback
- **Session length:** 3-5 minutes optimal for sustained attention at age 4-5
- **No-fail design:** Incorrect answers should redirect, not penalize
- Source: [Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/)

### Typography & Dyslexia
- OpenDyslexic did NOT improve reading speed or accuracy vs. Arial/Times New Roman (Wery & Diliberto, 2017)
- British Dyslexia Association recommends Arial, Verdana, Tahoma
- Source: [PMC5629233](https://pmc.ncbi.nlm.nih.gov/articles/PMC5629233/)

### Three.js / React Three Fiber
- Text3D from drei for 3D letter rendering; fonts must be in JSON typeface format
- Performance: Use instancing, compressed textures, <10K triangles per scene
- Audio: Howler.js recommended for cross-browser compatibility
- Source: [drei Text3D docs](https://drei.docs.pmnd.rs/abstractions/text3d), [R3F performance tips](https://medium.com/@ertugrulyaman99/react-three-fiber-enhancing-scene-quality-with-drei-performance-tips-976ba3fba67a)

---

## 7. Open Questions

1. **Phoneme audio library:** Should we hire a voice artist to record all phonemes and words, or start with a high-quality TTS engine? (Pre-recorded is better but more expensive)
2. **3D model pipeline:** Should we create our own low-poly models or use a library like KayKit (free low-poly game assets)?
3. **Separate app or integrated?** Should these games live inside teach-them-kids as a new "age group" mode, or be a standalone app?
4. **Parent dashboard:** How much detail should the parent progress dashboard show? Simple stars/badges or detailed skill breakdowns?
5. **Offline support:** Should games work offline (service worker + cached audio)? Important for tablets used without reliable WiFi.
6. **Speech recognition:** For Level 4+ in phonics, should we add speech recognition so kids can say the word aloud? Web Speech API is inconsistent on mobile.
7. **Tablet-first design:** Should the 3D scenes be designed primarily for landscape (tablet) or portrait (phone) orientation?
