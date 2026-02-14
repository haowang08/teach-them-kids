// ---------------------------------------------------------------------------
// Math problem generators for the /basics math games
// ---------------------------------------------------------------------------

export interface MathProblem {
  a: number;
  b: number;
  operation: '+' | '-' | '\u00d7' | '\u00f7'; // × and ÷
  answer: number;
  choices: number[]; // 4 choices including correct answer
  visual?: { groups: number; perGroup: number }; // for multiplication/division visualization
}

// ── Utilities ─────────────────────────────────────────────────────────────

/** Return a random integer in [min, max] inclusive. */
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Fisher-Yates shuffle (in-place). */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate `count` wrong choices that are plausible (close to the real answer)
 * but never equal to the correct answer or to each other. All values >= 0.
 */
function generateWrongChoices(answer: number, count: number): number[] {
  const wrong = new Set<number>();
  // Spread range: keep it small so choices look plausible
  const spread = Math.max(3, Math.ceil(answer * 0.5));

  let attempts = 0;
  while (wrong.size < count && attempts < 200) {
    attempts++;
    const offset = randInt(1, spread) * (Math.random() < 0.5 ? -1 : 1);
    const candidate = answer + offset;
    if (candidate >= 0 && candidate !== answer && !wrong.has(candidate)) {
      wrong.add(candidate);
    }
  }

  // Safety: fill any remaining slots with sequential values
  let fallback = answer + 1;
  while (wrong.size < count) {
    if (fallback !== answer && !wrong.has(fallback) && fallback >= 0) {
      wrong.add(fallback);
    }
    fallback++;
  }

  return Array.from(wrong);
}

/** Build a complete MathProblem with shuffled choices. */
function makeProblem(
  a: number,
  b: number,
  operation: MathProblem['operation'],
  answer: number,
  visual?: MathProblem['visual'],
): MathProblem {
  const wrongChoices = generateWrongChoices(answer, 3);
  const choices = shuffle([answer, ...wrongChoices]);
  return { a, b, operation, answer, choices, visual };
}

// ── Level ranges ──────────────────────────────────────────────────────────

/** Return [min, max] sum range for addition/subtraction levels. */
function addSubRange(level: number): [number, number] {
  switch (level) {
    case 1: return [1, 5];
    case 2: return [1, 10];
    case 3: return [1, 15];
    case 4: return [1, 20];
    default: return [1, 10];
  }
}

/** Return the multiplier range [lo, hi] for multiplication/division levels. */
function mulDivFactors(level: number): [number, number] {
  switch (level) {
    case 1: return [2, 3];
    case 2: return [4, 5];
    case 3: return [6, 7];
    case 4: return [8, 9];
    default: return [2, 3];
  }
}

// ── Generators ────────────────────────────────────────────────────────────

export function generateAddition(level: number, count: number = 10): MathProblem[] {
  const [, max] = addSubRange(level);
  const problems: MathProblem[] = [];

  for (let i = 0; i < count; i++) {
    const a = randInt(0, max);
    const b = randInt(0, max - a);
    problems.push(makeProblem(a, b, '+', a + b));
  }

  return problems;
}

export function generateSubtraction(level: number, count: number = 10): MathProblem[] {
  const [, max] = addSubRange(level);
  const problems: MathProblem[] = [];

  for (let i = 0; i < count; i++) {
    const a = randInt(1, max);
    const b = randInt(0, a); // ensure a >= b so no negatives
    problems.push(makeProblem(a, b, '-', a - b));
  }

  return problems;
}

export function generateMixed(level: number, count: number = 10): MathProblem[] {
  const problems: MathProblem[] = [];
  const half = Math.ceil(count / 2);

  // Level 1: bridging 10 (sums that cross 10)
  // Level 2: teen + single digit
  // Level 3: within 20
  // Level 4: mixed +/-
  for (let i = 0; i < count; i++) {
    const doAdd = i < half || Math.random() < 0.5;

    switch (level) {
      case 1: {
        // Bridging 10
        if (doAdd) {
          const a = randInt(6, 9);
          const b = randInt(2, 10 - a + 3); // force crossing 10
          const sum = a + b;
          problems.push(makeProblem(a, b, '+', sum));
        } else {
          const answer = randInt(1, 9);
          const a = randInt(11, 14);
          const b = a - answer;
          problems.push(makeProblem(a, b, '-', answer));
        }
        break;
      }
      case 2: {
        // Teens + single
        const a = randInt(10, 15);
        const b = randInt(1, 5);
        if (doAdd) {
          problems.push(makeProblem(a, b, '+', a + b));
        } else {
          problems.push(makeProblem(a, b, '-', a - b));
        }
        break;
      }
      case 3: {
        // Within 20
        if (doAdd) {
          const a = randInt(1, 15);
          const b = randInt(1, 20 - a);
          problems.push(makeProblem(a, b, '+', a + b));
        } else {
          const a = randInt(2, 20);
          const b = randInt(1, a);
          problems.push(makeProblem(a, b, '-', a - b));
        }
        break;
      }
      default: {
        // Level 4: fully mixed +/- within 20
        if (doAdd) {
          const a = randInt(1, 15);
          const b = randInt(1, 20 - a);
          problems.push(makeProblem(a, b, '+', a + b));
        } else {
          const a = randInt(2, 20);
          const b = randInt(1, a);
          problems.push(makeProblem(a, b, '-', a - b));
        }
        break;
      }
    }
  }

  return shuffle(problems);
}

export function generateMultiplication(level: number, count: number = 10): MathProblem[] {
  const [lo, hi] = mulDivFactors(level);
  const problems: MathProblem[] = [];

  for (let i = 0; i < count; i++) {
    const factor = randInt(lo, hi);
    const other = randInt(1, 10);
    const answer = factor * other;
    problems.push(
      makeProblem(other, factor, '\u00d7', answer, { groups: other, perGroup: factor }),
    );
  }

  return problems;
}

export function generateDivision(level: number, count: number = 10): MathProblem[] {
  const [lo, hi] = mulDivFactors(level);
  const problems: MathProblem[] = [];

  for (let i = 0; i < count; i++) {
    const divisor = randInt(lo, hi);
    const quotient = randInt(1, 10);
    const dividend = divisor * quotient; // exact division only
    problems.push(
      makeProblem(dividend, divisor, '\u00f7', quotient, { groups: divisor, perGroup: quotient }),
    );
  }

  return problems;
}

export function generateAllOps(level: number, count: number = 10): MathProblem[] {
  const problems: MathProblem[] = [];

  for (let i = 0; i < count; i++) {
    // Decide which operation based on level
    let opChoice: number;
    switch (level) {
      case 1:
        // +/- only
        opChoice = randInt(0, 1);
        break;
      case 2:
        // +, -, x
        opChoice = randInt(0, 2);
        break;
      case 3:
        // +, -, x, /
        opChoice = randInt(0, 3);
        break;
      default:
        // All four
        opChoice = randInt(0, 3);
        break;
    }

    switch (opChoice) {
      case 0: {
        // Addition within 20
        const a = randInt(1, 15);
        const b = randInt(1, 20 - a);
        problems.push(makeProblem(a, b, '+', a + b));
        break;
      }
      case 1: {
        // Subtraction within 20
        const a = randInt(2, 20);
        const b = randInt(1, a);
        problems.push(makeProblem(a, b, '-', a - b));
        break;
      }
      case 2: {
        // Multiplication (small factors)
        const factor = randInt(2, 5);
        const other = randInt(1, 6);
        problems.push(
          makeProblem(other, factor, '\u00d7', other * factor, {
            groups: other,
            perGroup: factor,
          }),
        );
        break;
      }
      case 3: {
        // Division (exact, small)
        const divisor = randInt(2, 5);
        const quotient = randInt(1, 6);
        const dividend = divisor * quotient;
        problems.push(
          makeProblem(dividend, divisor, '\u00f7', quotient, {
            groups: divisor,
            perGroup: quotient,
          }),
        );
        break;
      }
    }
  }

  return shuffle(problems);
}
