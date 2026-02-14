import { useState, useCallback } from 'react';

// ============================================
// TYPES
// ============================================

interface ZerosJourneyProps {
  onComplete?: () => void;
}

type GamePhase = 'intro' | 'place-value' | 'equations' | 'number-systems' | 'complete';

interface PlaceValuePuzzle {
  display: string[];        // e.g. ['1','_','5'] where '_' marks blanks
  answer: string;           // e.g. '105'
  hint: string;
  description: string;      // e.g. 'one hundred and five'
}

interface EquationPuzzle {
  display: string;          // e.g. '5 + ? = 5'
  answer: number;
  hint: string;
  choices: number[];
}

interface NumberSystemPuzzle {
  roman: string;
  value: number;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

// ============================================
// CONSTANTS
// ============================================

const colors = {
  bg: '#1A1040',
  bgCard: '#2A1854',
  bgLight: '#3D2670',
  gold: '#D4A017',
  goldLight: '#F5D76E',
  saffron: '#E8751A',
  saffronLight: '#F5A623',
  correct: '#2ECC71',
  correctGlow: 'rgba(46, 204, 113, 0.4)',
  wrong: '#E74C3C',
  text: '#F0E6FF',
  textMuted: '#B8A0D8',
  zeroGold: '#FFD700',
  white: '#FFFFFF',
};

const PLACE_VALUE_PUZZLES: PlaceValuePuzzle[] = [
  { display: ['1', '_', '5'], answer: '105', hint: 'A zero between 1 and 5', description: 'one hundred and five' },
  { display: ['2', '_', '_', '_'], answer: '2000', hint: 'Two thousand needs three zeros!', description: 'two thousand' },
  { display: ['3', '_', '7'], answer: '307', hint: 'Three hundred and seven', description: 'three hundred and seven' },
  { display: ['5', '_', '_'], answer: '500', hint: 'Five hundred exactly', description: 'five hundred' },
];

const EQUATION_PUZZLES: EquationPuzzle[] = [
  { display: '5 + ? = 5', answer: 0, hint: 'Adding this number changes nothing!', choices: [0, 1, 5, 10] },
  { display: '? \u{00D7} 7 = 0', answer: 0, hint: 'What number makes everything vanish when multiplied?', choices: [1, 7, 0, 49] },
  { display: '12 - 12 = ?', answer: 0, hint: 'What happens when you take away all of something?', choices: [12, 1, 24, 0] },
  { display: '? + 8 = 8', answer: 0, hint: 'Eight stays eight when you add...', choices: [8, 1, 0, 16] },
];

const NUMBER_SYSTEM_PUZZLES: NumberSystemPuzzle[] = [
  {
    roman: 'MIII',
    value: 1003,
    question: 'Romans wrote MIII for 1003, but they had no zero! Using our system with zero, how do YOU write one thousand and three?',
    choices: ['13', '1003', '103', '10003'],
    correctIndex: 1,
    explanation: 'The zero holds the "hundreds" and "tens" place, showing there are none! Without zero, we couldn\'t tell 13 from 103 from 1003.',
  },
  {
    roman: 'XL',
    value: 40,
    question: 'Romans wrote XL for 40. In our number system with place value and zero, how do we write forty?',
    choices: ['4', '40', '400', '14'],
    correctIndex: 1,
    explanation: 'The zero in 40 means "no ones." Without zero, how would you tell four from forty from four hundred?',
  },
  {
    roman: 'CD',
    value: 400,
    question: 'Romans wrote CD for 400. They needed special letter combinations! Our system is simpler. How do we write four hundred?',
    choices: ['40', '4000', '400', '44'],
    correctIndex: 2,
    explanation: 'Two zeros! The zero is a placeholder showing "no tens" and "no ones." Zero makes our number system so much more powerful!',
  },
];

// ============================================
// STYLES
// ============================================

const styles = {
  wrapper: {
    background: `linear-gradient(145deg, ${colors.bg} 0%, #0D0820 100%)`,
    borderRadius: 16,
    padding: '20px',
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    color: colors.text,
    minHeight: 500,
  } as React.CSSProperties,

  title: {
    fontSize: 24,
    fontWeight: 800,
    color: colors.gold,
    margin: '8px 0',
    textAlign: 'center' as const,
    textShadow: '0 2px 8px rgba(212, 160, 23, 0.3)',
  } as React.CSSProperties,

  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center' as const,
    marginBottom: 20,
    lineHeight: 1.6,
    maxWidth: 480,
    marginLeft: 'auto',
    marginRight: 'auto',
  } as React.CSSProperties,

  card: {
    background: colors.bgCard,
    borderRadius: 12,
    padding: '16px',
    marginBottom: 16,
    border: `1px solid ${colors.bgLight}`,
  } as React.CSSProperties,

  phaseLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.saffron,
    textTransform: 'uppercase' as const,
    letterSpacing: 2,
    textAlign: 'center' as const,
    marginBottom: 8,
  } as React.CSSProperties,

  progressBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  } as React.CSSProperties,

  button: {
    padding: '12px 32px',
    fontSize: 16,
    fontWeight: 700,
    color: colors.bg,
    background: `linear-gradient(180deg, ${colors.gold} 0%, ${colors.saffron} 100%)`,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(212, 160, 23, 0.4)',
    transition: 'transform 0.15s, box-shadow 0.15s',
    display: 'block',
    margin: '0 auto',
  } as React.CSSProperties,

  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  } as React.CSSProperties,

  digitSlot: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 56,
    fontSize: 28,
    fontWeight: 800,
    borderRadius: 8,
    margin: '0 3px',
    transition: 'all 0.3s ease',
  } as React.CSSProperties,

  choiceButton: {
    padding: '12px 24px',
    fontSize: 18,
    fontWeight: 700,
    borderRadius: 8,
    border: `2px solid ${colors.bgLight}`,
    background: colors.bgCard,
    color: colors.gold,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: 64,
  } as React.CSSProperties,

  feedbackCorrect: {
    color: colors.correct,
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center' as const,
    padding: '8px 0',
  } as React.CSSProperties,

  feedbackWrong: {
    color: colors.wrong,
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center' as const,
    padding: '8px 0',
  } as React.CSSProperties,

  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 16,
  } as React.CSSProperties,

  statItem: {
    textAlign: 'center' as const,
  } as React.CSSProperties,

  statNumber: {
    fontSize: 32,
    fontWeight: 800,
    color: colors.gold,
  } as React.CSSProperties,

  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  } as React.CSSProperties,
};

// ============================================
// HELPER: animated zero character
// ============================================

const ANIM_KEY = 'zj-anim';

const cssAnimations = `
@keyframes ${ANIM_KEY}-glow {
  0%, 100% { text-shadow: 0 0 6px ${colors.correctGlow}; }
  50% { text-shadow: 0 0 18px ${colors.correct}, 0 0 32px ${colors.correctGlow}; }
}
@keyframes ${ANIM_KEY}-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}
@keyframes ${ANIM_KEY}-drop {
  0% { transform: translateY(-20px); opacity: 0; }
  60% { transform: translateY(4px); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes ${ANIM_KEY}-sparkle {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
@keyframes ${ANIM_KEY}-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
`;

// ============================================
// COMPONENT
// ============================================

const ZerosJourney: React.FC<ZerosJourneyProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [selectedSlots, setSelectedSlots] = useState<Set<number>>(new Set());
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // ---- phase helpers ----

  const currentPlaceValue = PLACE_VALUE_PUZZLES[puzzleIndex];
  const currentEquation = EQUATION_PUZZLES[puzzleIndex];
  const currentNumberSystem = NUMBER_SYSTEM_PUZZLES[puzzleIndex];

  const resetForNextPuzzle = useCallback(() => {
    setFeedback('none');
    setSelectedSlots(new Set());
    setSelectedChoice(null);
    setShowExplanation(false);
  }, []);

  const advanceOrFinishPhase = useCallback((
    currentPhaseMax: number,
    _requiredCorrect: number,
    nextPhase: GamePhase,
  ) => {
    if (puzzleIndex >= currentPhaseMax - 1) {
      // Phase complete
      setTotalCorrect(prev => prev + correctCount + (feedback === 'correct' ? 0 : 0));
      setTimeout(() => {
        setPuzzleIndex(0);
        setCorrectCount(0);
        resetForNextPuzzle();
        setPhase(nextPhase);
      }, 1200);
    } else {
      setTimeout(() => {
        setPuzzleIndex(prev => prev + 1);
        resetForNextPuzzle();
      }, 1200);
    }
  }, [puzzleIndex, correctCount, feedback, resetForNextPuzzle]);

  // ---- INTRO ----

  const handleStart = useCallback(() => {
    setPhase('place-value');
    setPuzzleIndex(0);
    setCorrectCount(0);
    setTotalCorrect(0);
    resetForNextPuzzle();
  }, [resetForNextPuzzle]);

  // ---- PLACE VALUE handlers ----

  const handleSlotTap = useCallback((index: number) => {
    if (feedback !== 'none') return;
    if (!currentPlaceValue) return;
    if (currentPlaceValue.display[index] !== '_') return;

    setSelectedSlots(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, [feedback, currentPlaceValue]);

  const handlePlaceValueCheck = useCallback(() => {
    if (!currentPlaceValue) return;

    // Build what the user constructed
    const built = currentPlaceValue.display.map((ch, i) =>
      ch === '_' ? (selectedSlots.has(i) ? '0' : '_') : ch
    ).join('');

    // All blanks must be filled
    if (built.includes('_')) {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 800);
      return;
    }

    if (built === currentPlaceValue.answer) {
      setFeedback('correct');
      setCorrectCount(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
      advanceOrFinishPhase(PLACE_VALUE_PUZZLES.length, 3, 'equations');
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback('none');
        setSelectedSlots(new Set());
      }, 1000);
    }
  }, [currentPlaceValue, selectedSlots, advanceOrFinishPhase]);

  // ---- EQUATIONS handlers ----

  const handleEquationChoice = useCallback((choice: number) => {
    if (feedback !== 'none') return;
    if (!currentEquation) return;

    setSelectedChoice(choice);

    if (choice === currentEquation.answer) {
      setFeedback('correct');
      setCorrectCount(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
      advanceOrFinishPhase(EQUATION_PUZZLES.length, 3, 'number-systems');
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback('none');
        setSelectedChoice(null);
      }, 1000);
    }
  }, [feedback, currentEquation, advanceOrFinishPhase]);

  // ---- NUMBER SYSTEMS handlers ----

  const handleNumberSystemChoice = useCallback((index: number) => {
    if (feedback !== 'none') return;
    if (!currentNumberSystem) return;

    setSelectedChoice(index);
    setShowExplanation(true);

    if (index === currentNumberSystem.correctIndex) {
      setFeedback('correct');
      setCorrectCount(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
      setTimeout(() => {
        if (puzzleIndex >= NUMBER_SYSTEM_PUZZLES.length - 1) {
          setPhase('complete');
        } else {
          setPuzzleIndex(prev => prev + 1);
          resetForNextPuzzle();
        }
      }, 2500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback('none');
        setSelectedChoice(null);
        setShowExplanation(false);
      }, 2500);
    }
  }, [feedback, currentNumberSystem, puzzleIndex, resetForNextPuzzle]);

  // ---- COMPLETE handler ----

  const handleComplete = useCallback(() => {
    if (onComplete) onComplete();
  }, [onComplete]);

  // ============================================
  // RENDER HELPERS
  // ============================================

  const renderProgressDots = (total: number, current: number) => (
    <div style={styles.progressBar}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: i < current ? colors.correct
            : i === current ? colors.gold
            : colors.bgLight,
          border: `1px solid ${i <= current ? colors.gold : colors.bgLight}`,
          transition: 'all 0.3s',
        }} />
      ))}
    </div>
  );

  const renderHeader = (phaseLabel: string, phaseNum: number) => (
    <div style={{ marginBottom: 12 }}>
      <div style={styles.phaseLabel}>{phaseLabel}</div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 13,
        color: colors.textMuted,
      }}>
        <span>Phase {phaseNum} of 3</span>
        <span>{correctCount} correct so far</span>
      </div>
    </div>
  );

  // ============================================
  // RENDER: INTRO
  // ============================================

  if (phase === 'intro') {
    return (
      <div style={styles.wrapper}>
        <style>{cssAnimations}</style>

        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          {/* Big zero */}
          <div style={{
            fontSize: 64,
            fontWeight: 900,
            color: colors.zeroGold,
            textShadow: `0 0 24px rgba(255, 215, 0, 0.5)`,
            animation: `${ANIM_KEY}-float 3s ease-in-out infinite`,
            marginBottom: 4,
          }}>
            0
          </div>

          <div style={styles.title}>
            Zero's Journey
          </div>
          <div style={{
            fontSize: 15,
            color: colors.saffronLight,
            fontWeight: 600,
            marginBottom: 16,
            textAlign: 'center' as const,
          }}>
            The Number That Changed Everything!
          </div>

          <div style={styles.subtitle}>
            Over 1,500 years ago in ancient India, brilliant mathematicians
            of the <strong style={{ color: colors.gold }}>Gupta Empire</strong> invented
            something incredible: the number <strong style={{ color: colors.zeroGold }}>zero</strong>.
            {'\n\n'}
            Before zero existed, people struggled to write large numbers or do
            advanced math. Zero gave us the <strong style={{ color: colors.saffronLight }}>place-value
            system</strong> we use every day -- where the position of a digit tells
            you its value.
          </div>

          <div style={{
            ...styles.card,
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            flexWrap: 'wrap' as const,
            padding: '12px 16px',
          }}>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 4 }}>Phase 1</div>
              <div style={{ fontSize: 13, color: colors.gold }}>
                {'\u{1F522}'} Place Value
              </div>
            </div>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 4 }}>Phase 2</div>
              <div style={{ fontSize: 13, color: colors.gold }}>
                {'\u{2795}'} Equations
              </div>
            </div>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 4 }}>Phase 3</div>
              <div style={{ fontSize: 13, color: colors.gold }}>
                {'\u{1F30D}'} Number Systems
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            style={styles.button}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Begin the Journey {'\u{1F680}'}
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: PLACE VALUE
  // ============================================

  if (phase === 'place-value' && currentPlaceValue) {
    const allSlotsFilled = currentPlaceValue.display.every((ch, i) =>
      ch !== '_' || selectedSlots.has(i)
    );

    return (
      <div style={styles.wrapper}>
        <style>{cssAnimations}</style>

        {renderHeader('Place Value: Fill in the Zeros', 1)}
        {renderProgressDots(PLACE_VALUE_PUZZLES.length, puzzleIndex)}

        <div style={styles.card}>
          <div style={{
            fontSize: 14,
            color: colors.textMuted,
            textAlign: 'center' as const,
            marginBottom: 12,
          }}>
            Tap the blank spots to place a <strong style={{ color: colors.zeroGold }}>zero</strong>!
          </div>

          <div style={{
            fontSize: 13,
            color: colors.saffronLight,
            textAlign: 'center' as const,
            marginBottom: 16,
          }}>
            Target: <strong>{currentPlaceValue.description}</strong>
          </div>

          {/* Digit slots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap' as const,
            gap: 4,
            marginBottom: 16,
          }}>
            {currentPlaceValue.display.map((ch, i) => {
              const isBlank = ch === '_';
              const isFilled = isBlank && selectedSlots.has(i);
              const isCorrectFeedback = feedback === 'correct';
              const isWrongFeedback = feedback === 'wrong';

              return (
                <div
                  key={i}
                  onClick={() => handleSlotTap(i)}
                  style={{
                    ...styles.digitSlot,
                    background: isBlank
                      ? (isFilled
                        ? (isCorrectFeedback ? colors.correct : isWrongFeedback ? colors.wrong : colors.bgLight)
                        : 'rgba(255,255,255,0.08)')
                      : colors.bgCard,
                    color: isBlank
                      ? (isFilled ? colors.zeroGold : colors.textMuted)
                      : colors.gold,
                    border: isBlank
                      ? `2px dashed ${isFilled ? colors.gold : colors.bgLight}`
                      : `2px solid ${colors.bgLight}`,
                    cursor: isBlank && feedback === 'none' ? 'pointer' : 'default',
                    boxShadow: isFilled && isCorrectFeedback
                      ? `0 0 16px ${colors.correctGlow}`
                      : 'none',
                    animation: isFilled
                      ? (isCorrectFeedback
                        ? `${ANIM_KEY}-glow 1s ease-in-out infinite`
                        : isWrongFeedback
                        ? `${ANIM_KEY}-shake 0.4s ease-in-out`
                        : `${ANIM_KEY}-drop 0.3s ease-out`)
                      : 'none',
                  }}
                >
                  {isBlank ? (isFilled ? '0' : '?') : ch}
                </div>
              );
            })}
          </div>

          {/* Hint */}
          <div style={{
            fontSize: 12,
            color: colors.textMuted,
            textAlign: 'center' as const,
            fontStyle: 'italic',
            marginBottom: 12,
          }}>
            {'\u{1F4A1}'} {currentPlaceValue.hint}
          </div>

          {/* Feedback */}
          {feedback === 'correct' && (
            <div style={styles.feedbackCorrect}>
              {'\u{2705}'} Correct! {currentPlaceValue.answer} = {currentPlaceValue.description}
            </div>
          )}
          {feedback === 'wrong' && (
            <div style={styles.feedbackWrong}>
              {'\u{274C}'} Not quite -- try again!
            </div>
          )}

          {/* Check button */}
          {feedback === 'none' && (
            <button
              onClick={handlePlaceValueCheck}
              disabled={!allSlotsFilled}
              style={{
                ...styles.button,
                ...(allSlotsFilled ? {} : styles.buttonDisabled),
                marginTop: 8,
              }}
              onMouseEnter={e => { if (allSlotsFilled) e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Check Answer
            </button>
          )}
        </div>

        {/* Fun fact card */}
        <div style={{
          ...styles.card,
          borderLeft: `3px solid ${colors.saffron}`,
          fontSize: 13,
          color: colors.textMuted,
          lineHeight: 1.6,
        }}>
          {'\u{1F4DC}'} <strong style={{ color: colors.gold }}>Did you know?</strong>{' '}
          The word "zero" comes from the Sanskrit word <em>shunya</em>, meaning "empty" or "void."
          The Indian mathematician Brahmagupta wrote rules for zero in 628 CE!
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: EQUATIONS
  // ============================================

  if (phase === 'equations' && currentEquation) {
    return (
      <div style={styles.wrapper}>
        <style>{cssAnimations}</style>

        {renderHeader('Equations: Zero in Action', 2)}
        {renderProgressDots(EQUATION_PUZZLES.length, puzzleIndex)}

        <div style={styles.card}>
          <div style={{
            fontSize: 14,
            color: colors.textMuted,
            textAlign: 'center' as const,
            marginBottom: 16,
          }}>
            What number makes this equation true?
          </div>

          {/* Equation display */}
          <div style={{
            fontSize: 32,
            fontWeight: 800,
            color: colors.gold,
            textAlign: 'center' as const,
            padding: '16px 0',
            marginBottom: 16,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 12,
            letterSpacing: 4,
            fontFamily: "'Courier New', Courier, monospace",
          }}>
            {currentEquation.display}
          </div>

          {/* Choices */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap' as const,
            marginBottom: 16,
          }}>
            {currentEquation.choices.map((choice, i) => {
              const isSelected = selectedChoice === choice;
              const isCorrectChoice = choice === currentEquation.answer;
              const showCorrect = feedback === 'correct' && isSelected;
              const showWrong = feedback === 'wrong' && isSelected;

              return (
                <button
                  key={i}
                  onClick={() => handleEquationChoice(choice)}
                  disabled={feedback !== 'none'}
                  style={{
                    ...styles.choiceButton,
                    background: showCorrect
                      ? colors.correct
                      : showWrong
                      ? colors.wrong
                      : (feedback === 'correct' && isCorrectChoice)
                      ? colors.correct
                      : colors.bgCard,
                    color: (showCorrect || showWrong || (feedback === 'correct' && isCorrectChoice))
                      ? colors.white
                      : colors.gold,
                    borderColor: showCorrect
                      ? colors.correct
                      : showWrong
                      ? colors.wrong
                      : colors.bgLight,
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: showCorrect
                      ? `0 0 16px ${colors.correctGlow}`
                      : 'none',
                    animation: showWrong
                      ? `${ANIM_KEY}-shake 0.4s ease-in-out`
                      : showCorrect
                      ? `${ANIM_KEY}-sparkle 0.5s ease-in-out`
                      : 'none',
                    cursor: feedback !== 'none' ? 'default' : 'pointer',
                    opacity: feedback !== 'none' && !isSelected && !isCorrectChoice ? 0.4 : 1,
                  }}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Hint */}
          <div style={{
            fontSize: 12,
            color: colors.textMuted,
            textAlign: 'center' as const,
            fontStyle: 'italic',
            marginBottom: 8,
          }}>
            {'\u{1F4A1}'} {currentEquation.hint}
          </div>

          {/* Feedback */}
          {feedback === 'correct' && (
            <div style={styles.feedbackCorrect}>
              {'\u{2705}'} Yes! The answer is zero!
            </div>
          )}
          {feedback === 'wrong' && (
            <div style={styles.feedbackWrong}>
              {'\u{274C}'} Not quite -- think about what zero does!
            </div>
          )}
        </div>

        {/* Fun fact */}
        <div style={{
          ...styles.card,
          borderLeft: `3px solid ${colors.saffron}`,
          fontSize: 13,
          color: colors.textMuted,
          lineHeight: 1.6,
        }}>
          {'\u{2728}'} <strong style={{ color: colors.gold }}>Zero is special:</strong>{' '}
          Adding zero changes nothing, but multiplying by zero makes everything zero!
          These aren't just rules -- they're discoveries that transformed all of mathematics.
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: NUMBER SYSTEMS
  // ============================================

  if (phase === 'number-systems' && currentNumberSystem) {
    return (
      <div style={styles.wrapper}>
        <style>{cssAnimations}</style>

        {renderHeader('Number Systems: The Power of Zero', 3)}
        {renderProgressDots(NUMBER_SYSTEM_PUZZLES.length, puzzleIndex)}

        <div style={styles.card}>
          {/* Roman numeral display */}
          <div style={{
            textAlign: 'center' as const,
            marginBottom: 16,
          }}>
            <div style={{
              fontSize: 12,
              color: colors.textMuted,
              marginBottom: 8,
            }}>
              {'\u{1F3DB}'} Roman Numeral
            </div>
            <div style={{
              display: 'inline-flex',
              gap: 6,
              padding: '8px 20px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 8,
              border: `1px solid ${colors.bgLight}`,
            }}>
              {currentNumberSystem.roman.split('').map((ch, i) => (
                <span key={i} style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: colors.saffronLight,
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                }}>
                  {ch}
                </span>
              ))}
            </div>
            <div style={{
              fontSize: 12,
              color: colors.textMuted,
              marginTop: 6,
            }}>
              = {currentNumberSystem.value}
            </div>
          </div>

          {/* Question */}
          <div style={{
            fontSize: 14,
            color: colors.text,
            textAlign: 'center' as const,
            lineHeight: 1.6,
            marginBottom: 16,
            padding: '0 8px',
          }}>
            {currentNumberSystem.question}
          </div>

          {/* Choices */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap' as const,
            marginBottom: 16,
          }}>
            {currentNumberSystem.choices.map((choice, i) => {
              const isSelected = selectedChoice === i;
              const isCorrect = i === currentNumberSystem.correctIndex;
              const showCorrect = feedback === 'correct' && isSelected;
              const showWrong = feedback === 'wrong' && isSelected;

              return (
                <button
                  key={i}
                  onClick={() => handleNumberSystemChoice(i)}
                  disabled={feedback !== 'none'}
                  style={{
                    ...styles.choiceButton,
                    fontSize: 22,
                    padding: '14px 28px',
                    background: showCorrect
                      ? colors.correct
                      : showWrong
                      ? colors.wrong
                      : (feedback === 'correct' && isCorrect)
                      ? colors.correct
                      : colors.bgCard,
                    color: (showCorrect || showWrong || (feedback === 'correct' && isCorrect))
                      ? colors.white
                      : colors.gold,
                    borderColor: showCorrect
                      ? colors.correct
                      : showWrong
                      ? colors.wrong
                      : colors.bgLight,
                    boxShadow: showCorrect
                      ? `0 0 16px ${colors.correctGlow}`
                      : 'none',
                    animation: showWrong
                      ? `${ANIM_KEY}-shake 0.4s ease-in-out`
                      : showCorrect
                      ? `${ANIM_KEY}-sparkle 0.5s ease-in-out`
                      : 'none',
                    cursor: feedback !== 'none' ? 'default' : 'pointer',
                    opacity: feedback !== 'none' && !isSelected && !isCorrect ? 0.4 : 1,
                  }}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && feedback === 'correct' && (
            <div style={{
              background: 'rgba(46, 204, 113, 0.1)',
              border: `1px solid ${colors.correct}`,
              borderRadius: 8,
              padding: '12px 16px',
              fontSize: 13,
              color: colors.text,
              lineHeight: 1.6,
              textAlign: 'center' as const,
            }}>
              {'\u{1F31F}'} {currentNumberSystem.explanation}
            </div>
          )}

          {/* Feedback */}
          {feedback === 'correct' && !showExplanation && (
            <div style={styles.feedbackCorrect}>
              {'\u{2705}'} Correct!
            </div>
          )}
          {feedback === 'wrong' && (
            <div style={styles.feedbackWrong}>
              {'\u{274C}'} Not quite -- think about which digits hold the place!
            </div>
          )}
        </div>

        {/* Fun fact */}
        <div style={{
          ...styles.card,
          borderLeft: `3px solid ${colors.saffron}`,
          fontSize: 13,
          color: colors.textMuted,
          lineHeight: 1.6,
        }}>
          {'\u{1F3DB}'} <strong style={{ color: colors.gold }}>Romans had no zero!</strong>{' '}
          That's why their numbers got complicated for large values. The Indian place-value system
          with zero was so brilliant that it spread to Arabia, then to Europe, and today the
          whole world uses it!
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: COMPLETE
  // ============================================

  if (phase === 'complete') {
    const totalPuzzles = PLACE_VALUE_PUZZLES.length + EQUATION_PUZZLES.length + NUMBER_SYSTEM_PUZZLES.length;
    const percentage = Math.round((totalCorrect / totalPuzzles) * 100);
    const rank = percentage >= 90 ? 'Master of Zero'
      : percentage >= 70 ? 'Zero Scholar'
      : percentage >= 50 ? 'Zero Explorer'
      : 'Zero Apprentice';

    return (
      <div style={styles.wrapper}>
        <style>{cssAnimations}</style>

        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          {/* Celebration */}
          <div style={{
            fontSize: 56,
            animation: `${ANIM_KEY}-sparkle 1.5s ease-in-out infinite`,
            marginBottom: 8,
          }}>
            {'\u{1F31F}'}
          </div>

          <div style={{
            ...styles.title,
            fontSize: 22,
          }}>
            You've Mastered the Power of Zero!
          </div>

          <div style={{
            fontSize: 15,
            color: colors.saffronLight,
            fontWeight: 600,
            marginBottom: 20,
          }}>
            Rank: {rank}
          </div>

          {/* Stats */}
          <div style={{
            ...styles.card,
            padding: '20px',
          }}>
            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>{totalCorrect}</div>
                <div style={styles.statLabel}>Puzzles Solved</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>{totalPuzzles}</div>
                <div style={styles.statLabel}>Total Puzzles</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>{percentage}%</div>
                <div style={styles.statLabel}>Accuracy</div>
              </div>
            </div>
          </div>

          {/* History summary */}
          <div style={{
            ...styles.card,
            textAlign: 'left' as const,
            lineHeight: 1.7,
            fontSize: 13,
            color: colors.textMuted,
          }}>
            <div style={{ fontSize: 15, color: colors.gold, fontWeight: 700, marginBottom: 8 }}>
              {'\u{1F4DC}'} What You Learned
            </div>
            <div style={{ marginBottom: 8 }}>
              {'\u{2022}'} <strong style={{ color: colors.text }}>Place Value:</strong>{' '}
              Zero acts as a placeholder -- it's the difference between 15, 105, and 150!
            </div>
            <div style={{ marginBottom: 8 }}>
              {'\u{2022}'} <strong style={{ color: colors.text }}>Zero in Math:</strong>{' '}
              Adding zero changes nothing; multiplying by zero gives zero. These simple rules
              unlocked centuries of mathematical discovery.
            </div>
            <div>
              {'\u{2022}'} <strong style={{ color: colors.text }}>A Global Gift:</strong>{' '}
              Ancient Indian mathematicians gave the world zero, transforming how every
              civilization counts, calculates, and builds technology.
            </div>
          </div>

          <button
            onClick={handleComplete}
            style={{
              ...styles.button,
              fontSize: 18,
              padding: '14px 40px',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Amazing! {'\u{1F389}'}
          </button>
        </div>
      </div>
    );
  }

  // Fallback (should not reach here)
  return null;
};

export default ZerosJourney;
