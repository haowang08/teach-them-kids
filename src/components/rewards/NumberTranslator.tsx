import { useState, useCallback, useEffect, useMemo } from 'react';

// ============================================
// TYPES
// ============================================

type GamePhase = 'intro' | 'playing' | 'checking' | 'round-complete' | 'game-complete';
type NumberSystem = 'roman' | 'egyptian' | 'mayan' | 'arabic';
type Difficulty = 'easy' | 'medium' | 'hard';

interface Round {
  sourceSystem: NumberSystem;
  targetSystem: NumberSystem;
  value: number;
  difficulty: Difficulty;
  points: number;
  hint: string;
}

interface NumberSystemInfo {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  origin: string;
  funFact: string;
}

// ============================================
// CONSTANTS
// ============================================

const NUMBER_SYSTEMS: Record<NumberSystem, NumberSystemInfo> = {
  roman: {
    name: 'Roman Numerals',
    emoji: '🏛️',
    color: '#8B0000',
    bgColor: '#FFF5E6',
    borderColor: '#D4A574',
    description: 'Letters represent values. I=1, V=5, X=10, L=50, C=100',
    origin: 'Ancient Rome (~500 BCE)',
    funFact: 'Romans used numerals for counting legions, building monuments, and recording dates!',
  },
  egyptian: {
    name: 'Egyptian Hieroglyphic',
    emoji: '🏺',
    color: '#1B4D3E',
    bgColor: '#F5EDD8',
    borderColor: '#C4A35A',
    description: 'Symbols are repeated and added together. Each symbol has a value.',
    origin: 'Ancient Egypt (~3000 BCE)',
    funFact: 'Egyptians invented one of the first writing systems and used these for pyramids and temples!',
  },
  mayan: {
    name: 'Mayan Numbers',
    emoji: '🌿',
    color: '#2F4F4F',
    bgColor: '#E8F5E9',
    borderColor: '#4CAF50',
    description: 'Dots (1) and bars (5) stack vertically. Zero was a shell!',
    origin: 'Ancient Maya (~400 BCE)',
    funFact: 'The Maya were one of the first to use zero as a number, over 1000 years before Europe!',
  },
  arabic: {
    name: 'Arabic (Modern)',
    emoji: '🔢',
    color: '#1976D2',
    bgColor: '#E3F2FD',
    borderColor: '#64B5F6',
    description: 'The numbers we use today! Digits 0-9 combine by place value.',
    origin: 'India/Arabia (~500 CE)',
    funFact: 'These numerals spread from India to Arabia to Europe, revolutionizing math!',
  },
};

// Roman numeral conversion
const ROMAN_VALUES: [string, number][] = [
  ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
  ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
  ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],
];

// Egyptian hieroglyphic symbols (used in visual display)
// 1 = stroke (|), 10 = heel bone (∩), 100 = coil (𓍢), 1000 = lotus (𓆼)

// ============================================
// CONVERSION FUNCTIONS
// ============================================

function toRoman(num: number): string {
  if (num <= 0 || num >= 4000) return '';
  let result = '';
  let remaining = num;
  for (const [symbol, value] of ROMAN_VALUES) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function fromRoman(roman: string): number {
  const romanMap: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
  };
  let result = 0;
  const upper = roman.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    const current = romanMap[upper[i]] || 0;
    const next = romanMap[upper[i + 1]] || 0;
    if (current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

function toEgyptian(num: number): string[] {
  const symbols: string[] = [];
  let remaining = num;

  const thousands = Math.floor(remaining / 1000);
  for (let i = 0; i < thousands; i++) symbols.push('🌸'); // lotus flower
  remaining %= 1000;

  const hundreds = Math.floor(remaining / 100);
  for (let i = 0; i < hundreds; i++) symbols.push('🌀'); // coil of rope
  remaining %= 100;

  const tens = Math.floor(remaining / 10);
  for (let i = 0; i < tens; i++) symbols.push('∩'); // heel bone
  remaining %= 10;

  for (let i = 0; i < remaining; i++) symbols.push('|'); // stroke

  return symbols;
}

function toMayan(num: number): { dots: number; bars: number }[] {
  // Mayan uses base 20, but we'll simplify to show 0-19 as single level
  // For larger numbers, we show multiple levels (bottom to top)
  if (num === 0) return [{ dots: 0, bars: 0 }];

  const levels: { dots: number; bars: number }[] = [];
  let remaining = num;

  while (remaining > 0) {
    const levelValue = remaining % 20;
    const bars = Math.floor(levelValue / 5);
    const dots = levelValue % 5;
    levels.push({ dots, bars });
    remaining = Math.floor(remaining / 20);
  }

  return levels; // bottom level first
}

// ============================================
// ROUND GENERATION
// ============================================

function generateRounds(): Round[] {
  const rounds: Round[] = [];

  // Round 1: Easy - Arabic to Roman (1-10)
  const r1val = Math.floor(Math.random() * 10) + 1;
  rounds.push({
    sourceSystem: 'arabic',
    targetSystem: 'roman',
    value: r1val,
    difficulty: 'easy',
    points: 10,
    hint: 'Remember: I=1, V=5, X=10. Put smaller values before larger to subtract (IV=4).',
  });

  // Round 2: Easy - Roman to Arabic (1-20)
  const r2val = Math.floor(Math.random() * 20) + 1;
  rounds.push({
    sourceSystem: 'roman',
    targetSystem: 'arabic',
    value: r2val,
    difficulty: 'easy',
    points: 15,
    hint: 'Add up the values! If a smaller numeral comes before a larger one, subtract it.',
  });

  // Round 3: Medium - Arabic to Egyptian (1-50)
  const r3val = Math.floor(Math.random() * 50) + 1;
  rounds.push({
    sourceSystem: 'arabic',
    targetSystem: 'egyptian',
    value: r3val,
    difficulty: 'medium',
    points: 20,
    hint: 'Egyptian: | = 1, heel bone = 10. Just add the right number of each symbol!',
  });

  // Round 4: Medium - Arabic to Mayan (1-19)
  const r4val = Math.floor(Math.random() * 19) + 1;
  rounds.push({
    sourceSystem: 'arabic',
    targetSystem: 'mayan',
    value: r4val,
    difficulty: 'medium',
    points: 25,
    hint: 'Mayan: dot = 1, bar = 5. Stack dots on top of bars!',
  });

  // Round 5: Medium - Egyptian to Arabic (10-99)
  const r5val = Math.floor(Math.random() * 90) + 10;
  rounds.push({
    sourceSystem: 'egyptian',
    targetSystem: 'arabic',
    value: r5val,
    difficulty: 'medium',
    points: 25,
    hint: 'Count each symbol type and multiply by its value, then add together.',
  });

  // Round 6: Hard - Roman to Egyptian (20-100)
  const r6val = Math.floor(Math.random() * 81) + 20;
  rounds.push({
    sourceSystem: 'roman',
    targetSystem: 'egyptian',
    value: r6val,
    difficulty: 'hard',
    points: 30,
    hint: 'First convert Roman to a regular number, then build the Egyptian version!',
  });

  // Round 7: Hard - Mayan to Arabic (1-30)
  const r7val = Math.floor(Math.random() * 30) + 1;
  rounds.push({
    sourceSystem: 'mayan',
    targetSystem: 'arabic',
    value: r7val,
    difficulty: 'hard',
    points: 35,
    hint: 'Count bars (x5) and dots (x1). For two levels, bottom is ones, top is twenties!',
  });

  // Round 8: Challenge - Arabic to Roman (50-500)
  const r8val = Math.floor(Math.random() * 451) + 50;
  rounds.push({
    sourceSystem: 'arabic',
    targetSystem: 'roman',
    value: r8val,
    difficulty: 'hard',
    points: 40,
    hint: 'Use C=100, L=50, D=500. Break the number into hundreds, fifties, tens, etc.',
  });

  return rounds;
}

// ============================================
// VISUAL COMPONENTS
// ============================================

interface RomanDisplayProps {
  value: number;
  interactive?: boolean;
  showValue?: boolean;
}

function RomanDisplay({ value, showValue = false }: RomanDisplayProps) {
  const roman = toRoman(value);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center gap-1">
        {roman.split('').map((char, i) => (
          <div
            key={i}
            className="w-10 h-12 flex items-center justify-center bg-amber-50 border-2 border-amber-700 rounded font-serif text-2xl font-bold text-amber-900 shadow-md"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            {char}
          </div>
        ))}
      </div>
      {showValue && (
        <div className="text-sm text-amber-700 font-medium">= {value}</div>
      )}
    </div>
  );
}

interface EgyptianDisplayProps {
  value: number;
  showValue?: boolean;
}

function EgyptianDisplay({ value, showValue = false }: EgyptianDisplayProps) {
  const symbols = toEgyptian(value);

  // Group symbols by type for better display
  const grouped = {
    lotus: symbols.filter(s => s === '🌸').length,
    coil: symbols.filter(s => s === '🌀').length,
    heel: symbols.filter(s => s === '∩').length,
    stroke: symbols.filter(s => s === '|').length,
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center gap-3 p-3 bg-amber-50 border-2 border-amber-600 rounded-lg min-h-[60px]">
        {grouped.lotus > 0 && (
          <div className="flex gap-1">
            {Array(grouped.lotus).fill(0).map((_, i) => (
              <span key={`lotus-${i}`} className="text-2xl" title="Lotus = 1000">🌸</span>
            ))}
          </div>
        )}
        {grouped.coil > 0 && (
          <div className="flex gap-1">
            {Array(grouped.coil).fill(0).map((_, i) => (
              <span key={`coil-${i}`} className="text-2xl" title="Coil = 100">🌀</span>
            ))}
          </div>
        )}
        {grouped.heel > 0 && (
          <div className="flex gap-0.5">
            {Array(grouped.heel).fill(0).map((_, i) => (
              <span
                key={`heel-${i}`}
                className="text-xl font-bold text-amber-800"
                title="Heel bone = 10"
                style={{ fontFamily: 'serif' }}
              >
                ∩
              </span>
            ))}
          </div>
        )}
        {grouped.stroke > 0 && (
          <div className="flex gap-0.5">
            {Array(grouped.stroke).fill(0).map((_, i) => (
              <span
                key={`stroke-${i}`}
                className="text-xl font-bold text-amber-800"
                title="Stroke = 1"
              >
                |
              </span>
            ))}
          </div>
        )}
        {value === 0 && (
          <span className="text-gray-400 italic">zero (empty)</span>
        )}
      </div>
      {showValue && (
        <div className="text-sm text-amber-700 font-medium">= {value}</div>
      )}
    </div>
  );
}

interface MayanDisplayProps {
  value: number;
  showValue?: boolean;
}

function MayanDisplay({ value, showValue = false }: MayanDisplayProps) {
  const levels = toMayan(value);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col-reverse items-center gap-2 p-3 bg-green-50 border-2 border-green-700 rounded-lg min-w-[80px]">
        {levels.map((level, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {level.dots === 0 && level.bars === 0 ? (
              // Mayan zero (shell shape)
              <div className="w-8 h-6 border-2 border-green-800 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-4 h-3 border border-green-700 rounded-full"></div>
              </div>
            ) : (
              <>
                {/* Dots on top */}
                {level.dots > 0 && (
                  <div className="flex gap-1 mb-1">
                    {Array(level.dots).fill(0).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-green-800"
                      />
                    ))}
                  </div>
                )}
                {/* Bars below */}
                {level.bars > 0 && (
                  <div className="flex flex-col gap-1">
                    {Array(level.bars).fill(0).map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-2 bg-green-800 rounded-sm"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
            {idx > 0 && (
              <div className="text-xs text-green-600 mt-1">
                (x{Math.pow(20, idx)})
              </div>
            )}
          </div>
        ))}
      </div>
      {showValue && (
        <div className="text-sm text-green-700 font-medium">= {value}</div>
      )}
    </div>
  );
}

interface ArabicDisplayProps {
  value: number;
  showValue?: boolean;
}

function ArabicDisplay({ value }: ArabicDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="px-6 py-3 bg-blue-50 border-2 border-blue-600 rounded-lg">
        <span className="text-4xl font-bold text-blue-800 font-mono">
          {value}
        </span>
      </div>
    </div>
  );
}

// Number display router
interface NumberDisplayProps {
  system: NumberSystem;
  value: number;
  showValue?: boolean;
}

function NumberDisplay({ system, value, showValue = false }: NumberDisplayProps) {
  switch (system) {
    case 'roman':
      return <RomanDisplay value={value} showValue={showValue} />;
    case 'egyptian':
      return <EgyptianDisplay value={value} showValue={showValue} />;
    case 'mayan':
      return <MayanDisplay value={value} showValue={showValue} />;
    case 'arabic':
      return <ArabicDisplay value={value} showValue={showValue} />;
  }
}

// ============================================
// INTERACTIVE BUILDERS
// ============================================

interface RomanBuilderProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function RomanBuilder({ value, onChange, disabled }: RomanBuilderProps) {
  const romanChars = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  const charValues = [1, 5, 10, 50, 100, 500, 1000];

  const addChar = (char: string) => {
    if (!disabled) onChange(value + char);
  };

  const removeChar = () => {
    if (!disabled && value.length > 0) onChange(value.slice(0, -1));
  };

  const clear = () => {
    if (!disabled) onChange('');
  };

  const currentValue = fromRoman(value);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Current input display */}
      <div className="w-full min-h-[50px] p-3 bg-amber-50 border-2 border-amber-600 rounded-lg flex items-center justify-center flex-wrap gap-1">
        {value ? (
          value.split('').map((char, i) => (
            <span key={i} className="text-2xl font-bold text-amber-900 font-serif">
              {char}
            </span>
          ))
        ) : (
          <span className="text-gray-400 italic">Click letters below to build</span>
        )}
      </div>

      {/* Current calculated value */}
      {value && (
        <div className="text-sm text-amber-700">
          Current value: <strong>{currentValue}</strong>
        </div>
      )}

      {/* Roman numeral buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {romanChars.map((char, idx) => (
          <button
            key={char}
            onClick={() => addChar(char)}
            disabled={disabled}
            className="w-12 h-12 bg-amber-100 hover:bg-amber-200 border-2 border-amber-700 rounded font-serif text-xl font-bold text-amber-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center"
          >
            <span>{char}</span>
            <span className="text-xs text-amber-600">{charValues[idx]}</span>
          </button>
        ))}
      </div>

      {/* Control buttons */}
      <div className="flex gap-2">
        <button
          onClick={removeChar}
          disabled={disabled || !value}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium text-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Backspace
        </button>
        <button
          onClick={clear}
          disabled={disabled || !value}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded font-medium text-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

interface EgyptianBuilderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  maxValue?: number;
}

function EgyptianBuilder({ value, onChange, disabled, maxValue = 9999 }: EgyptianBuilderProps) {
  const symbols = [
    { symbol: '|', label: 'Stroke', amount: 1 },
    { symbol: '∩', label: 'Heel', amount: 10 },
    { symbol: '🌀', label: 'Coil', amount: 100 },
    { symbol: '🌸', label: 'Lotus', amount: 1000 },
  ];

  const add = (amount: number) => {
    if (!disabled && value + amount <= maxValue) {
      onChange(value + amount);
    }
  };

  const subtract = (amount: number) => {
    if (!disabled && value - amount >= 0) {
      onChange(value - amount);
    }
  };

  const clear = () => {
    if (!disabled) onChange(0);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Current display */}
      <EgyptianDisplay value={value} />

      {/* Current value */}
      <div className="text-sm text-amber-700">
        Current value: <strong>{value}</strong>
      </div>

      {/* Symbol controls */}
      <div className="flex flex-wrap justify-center gap-2">
        {symbols.map(({ symbol, label, amount }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="text-xs text-gray-600">{label} ({amount})</span>
            <div className="flex gap-1">
              <button
                onClick={() => subtract(amount)}
                disabled={disabled || value < amount}
                className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded font-bold text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <div className="w-10 h-8 flex items-center justify-center bg-amber-100 border border-amber-600 rounded text-lg">
                {symbol}
              </div>
              <button
                onClick={() => add(amount)}
                disabled={disabled || value + amount > maxValue}
                className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded font-bold text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={clear}
        disabled={disabled || value === 0}
        className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded font-medium text-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear All
      </button>
    </div>
  );
}

interface MayanBuilderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  maxValue?: number;
}

function MayanBuilder({ value, onChange, disabled, maxValue = 399 }: MayanBuilderProps) {
  const add = (amount: number) => {
    if (!disabled && value + amount <= maxValue) {
      onChange(value + amount);
    }
  };

  const subtract = (amount: number) => {
    if (!disabled && value - amount >= 0) {
      onChange(value - amount);
    }
  };

  const clear = () => {
    if (!disabled) onChange(0);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Current display */}
      <MayanDisplay value={value} />

      {/* Current value */}
      <div className="text-sm text-green-700">
        Current value: <strong>{value}</strong>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-600">Dot (1)</span>
          <div className="flex gap-1">
            <button
              onClick={() => subtract(1)}
              disabled={disabled || value < 1}
              className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded font-bold text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <div className="w-8 h-8 flex items-center justify-center bg-green-100 border border-green-600 rounded">
              <div className="w-3 h-3 rounded-full bg-green-800" />
            </div>
            <button
              onClick={() => add(1)}
              disabled={disabled || value + 1 > maxValue}
              className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded font-bold text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-600">Bar (5)</span>
          <div className="flex gap-1">
            <button
              onClick={() => subtract(5)}
              disabled={disabled || value < 5}
              className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded font-bold text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <div className="w-12 h-8 flex items-center justify-center bg-green-100 border border-green-600 rounded">
              <div className="w-8 h-2 bg-green-800 rounded-sm" />
            </div>
            <button
              onClick={() => add(5)}
              disabled={disabled || value + 5 > maxValue}
              className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded font-bold text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-600">Level (20)</span>
          <div className="flex gap-1">
            <button
              onClick={() => subtract(20)}
              disabled={disabled || value < 20}
              className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded font-bold text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <div className="w-8 h-8 flex items-center justify-center bg-green-100 border border-green-600 rounded text-xs font-bold text-green-800">
              20
            </div>
            <button
              onClick={() => add(20)}
              disabled={disabled || value + 20 > maxValue}
              className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded font-bold text-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={clear}
        disabled={disabled || value === 0}
        className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded font-medium text-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear All
      </button>
    </div>
  );
}

interface ArabicBuilderProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  maxValue?: number;
}

function ArabicBuilder({ value, onChange, disabled, maxValue = 9999 }: ArabicBuilderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, '');
    const numValue = parseInt(newValue, 10);
    if (newValue === '' || (numValue >= 0 && numValue <= maxValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Enter number..."
        className="w-32 px-4 py-3 text-center text-3xl font-mono font-bold bg-blue-50 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="text-sm text-blue-600">Type the number (0-{maxValue})</div>
    </div>
  );
}

// Answer builder router
interface AnswerBuilderProps {
  system: NumberSystem;
  value: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  maxValue?: number;
}

function AnswerBuilder({ system, value, onChange, disabled, maxValue }: AnswerBuilderProps) {
  switch (system) {
    case 'roman':
      return (
        <RomanBuilder
          value={String(value)}
          onChange={(v) => onChange(v)}
          disabled={disabled}
        />
      );
    case 'egyptian':
      return (
        <EgyptianBuilder
          value={typeof value === 'number' ? value : parseInt(String(value), 10) || 0}
          onChange={(v) => onChange(v)}
          disabled={disabled}
          maxValue={maxValue}
        />
      );
    case 'mayan':
      return (
        <MayanBuilder
          value={typeof value === 'number' ? value : parseInt(String(value), 10) || 0}
          onChange={(v) => onChange(v)}
          disabled={disabled}
          maxValue={maxValue}
        />
      );
    case 'arabic':
      return (
        <ArabicBuilder
          value={String(value)}
          onChange={(v) => onChange(v)}
          disabled={disabled}
          maxValue={maxValue}
        />
      );
  }
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function NumberTranslator() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<string | number>('');
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [selectedSystem, setSelectedSystem] = useState<NumberSystem | null>(null);

  const round = rounds[currentRound];

  // Reset answer when round changes
  useEffect(() => {
    if (phase === 'playing' && round) {
      // Initialize answer based on target system type
      if (round.targetSystem === 'roman') {
        setAnswer('');
      } else if (round.targetSystem === 'arabic') {
        setAnswer('');
      } else {
        setAnswer(0);
      }
      setFeedback('none');
      setShowHint(false);
      setAttempts(0);
    }
  }, [currentRound, phase, round]);

  const handleStart = useCallback(() => {
    const newRounds = generateRounds();
    setRounds(newRounds);
    setCurrentRound(0);
    setScore(0);
    setAnswer('');
    setFeedback('none');
    setShowHint(false);
    setAttempts(0);
    setPhase('playing');
  }, []);

  const getAnswerValue = useCallback((): number => {
    if (!round) return 0;

    if (round.targetSystem === 'roman') {
      return fromRoman(String(answer));
    } else if (round.targetSystem === 'arabic') {
      return parseInt(String(answer), 10) || 0;
    } else {
      return typeof answer === 'number' ? answer : parseInt(String(answer), 10) || 0;
    }
  }, [round, answer]);

  const checkAnswer = useCallback(() => {
    if (!round) return;

    setPhase('checking');
    const userValue = getAnswerValue();

    if (userValue === round.value) {
      setFeedback('correct');

      // Calculate points with bonuses/penalties
      const attemptBonus = Math.max(0, 3 - attempts) * 5;
      const hintPenalty = showHint ? Math.floor(round.points * 0.25) : 0;
      const earnedPoints = Math.max(
        Math.floor(round.points / 2),
        round.points + attemptBonus - hintPenalty
      );

      // CRITICAL: Use functional state update for score
      setScore(prev => prev + earnedPoints);

      setTimeout(() => {
        setPhase('round-complete');
      }, 1500);
    } else {
      setFeedback('incorrect');
      // CRITICAL: Use functional state update for attempts
      setAttempts(prev => prev + 1);

      setTimeout(() => {
        setFeedback('none');
        setPhase('playing');
      }, 1200);
    }
  }, [round, getAnswerValue, attempts, showHint]);

  const handleNextRound = useCallback(() => {
    if (currentRound >= rounds.length - 1) {
      setPhase('game-complete');
    } else {
      setCurrentRound(prev => prev + 1);
      setPhase('playing');
    }
  }, [currentRound, rounds.length]);

  const handleRestart = useCallback(() => {
    setPhase('intro');
    setRounds([]);
    setCurrentRound(0);
    setScore(0);
    setAnswer('');
    setFeedback('none');
    setShowHint(false);
    setAttempts(0);
    setSelectedSystem(null);
  }, []);

  // Calculate max possible score
  const maxScore = useMemo(() => {
    return rounds.reduce((sum, r) => sum + r.points + 15, 0);
  }, [rounds]);

  // ============================================
  // RENDER: INTRO SCREEN
  // ============================================

  if (phase === 'intro') {
    return (
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-400 overflow-hidden shadow-xl">
        {/* Header pattern */}
        <div className="h-3 bg-gradient-to-r from-red-600 via-amber-500 to-green-600" />

        <div className="p-6 text-center">
          <div className="text-5xl mb-3">🔢</div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">
            Number Translator
          </h2>
          <p className="text-amber-700 mb-4">
            Journey through the History of Counting!
          </p>

          {/* System showcase */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(Object.keys(NUMBER_SYSTEMS) as NumberSystem[]).map((sys) => {
              const info = NUMBER_SYSTEMS[sys];
              const isSelected = selectedSystem === sys;
              return (
                <button
                  key={sys}
                  onClick={() => setSelectedSystem(isSelected ? null : sys)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-amber-600 bg-white shadow-lg scale-105'
                      : 'border-amber-200 bg-white/50 hover:bg-white hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{info.emoji}</span>
                    <span className="font-bold text-sm" style={{ color: info.color }}>
                      {info.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{info.origin}</p>
                </button>
              );
            })}
          </div>

          {/* Selected system info */}
          {selectedSystem && (
            <div
              className="mb-6 p-4 rounded-xl border-2 text-left"
              style={{
                backgroundColor: NUMBER_SYSTEMS[selectedSystem].bgColor,
                borderColor: NUMBER_SYSTEMS[selectedSystem].borderColor,
              }}
            >
              <h3
                className="font-bold mb-2"
                style={{ color: NUMBER_SYSTEMS[selectedSystem].color }}
              >
                {NUMBER_SYSTEMS[selectedSystem].emoji} {NUMBER_SYSTEMS[selectedSystem].name}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                {NUMBER_SYSTEMS[selectedSystem].description}
              </p>
              <p className="text-sm text-gray-600 italic">
                {NUMBER_SYSTEMS[selectedSystem].funFact}
              </p>

              {/* Example display */}
              <div className="mt-3 pt-3 border-t border-amber-300">
                <p className="text-xs text-gray-500 mb-2">Example: The number 23</p>
                <NumberDisplay system={selectedSystem} value={23} />
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-white/70 rounded-xl p-4 mb-6 text-left border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-2">How to Play:</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>1. You will see a number in one ancient system</li>
              <li>2. Convert it to a different number system</li>
              <li>3. Use the interactive builder to create your answer</li>
              <li>4. Complete 8 rounds of increasing difficulty!</li>
            </ul>
          </div>

          <button
            onClick={handleStart}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Start Translating!
          </button>
        </div>

        <div className="h-3 bg-gradient-to-r from-red-600 via-amber-500 to-green-600" />
      </div>
    );
  }

  // ============================================
  // RENDER: GAME COMPLETE
  // ============================================

  if (phase === 'game-complete') {
    const percentage = Math.round((score / maxScore) * 100);
    const rank = percentage >= 90 ? 'Master Numerologist'
      : percentage >= 70 ? 'Number Scholar'
      : percentage >= 50 ? 'Counting Apprentice'
      : 'Number Novice';

    return (
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-400 overflow-hidden shadow-xl">
        <div className="h-3 bg-gradient-to-r from-red-600 via-amber-500 to-green-600" />

        <div className="p-6 text-center">
          <div className="text-6xl mb-3">🏆</div>
          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">
            Translation Complete!
          </h2>
          <p className="text-lg text-amber-700 mb-4">
            Rank: <strong>{rank}</strong>
          </p>

          <div className="bg-white rounded-xl p-6 mb-6 border-2 border-amber-300">
            <div className="text-5xl font-bold text-amber-600 mb-2">
              {score}
            </div>
            <div className="text-gray-600 mb-4">Total Points</div>

            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {rounds.length}
                </div>
                <div className="text-sm text-gray-500">Rounds</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  4
                </div>
                <div className="text-sm text-gray-500">Systems Learned</div>
              </div>
            </div>
          </div>

          <p className="text-amber-700 mb-6 max-w-md mx-auto">
            Amazing! You have learned how ancient civilizations counted and recorded numbers.
            From Roman legions to Mayan astronomers, numbers connected the world!
          </p>

          <button
            onClick={handleRestart}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Play Again
          </button>
        </div>

        <div className="h-3 bg-gradient-to-r from-red-600 via-amber-500 to-green-600" />
      </div>
    );
  }

  // ============================================
  // RENDER: ROUND COMPLETE
  // ============================================

  if (phase === 'round-complete' && round) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-400 overflow-hidden shadow-xl">
        <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-500" />

        <div className="p-6 text-center">
          <div className="text-5xl mb-3">✨</div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Correct Translation!
          </h2>

          <div className="bg-white rounded-xl p-4 mb-6 border-2 border-green-300">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {NUMBER_SYSTEMS[round.sourceSystem].name}
                </div>
                <NumberDisplay system={round.sourceSystem} value={round.value} />
              </div>
              <div className="text-3xl text-green-600">=</div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {NUMBER_SYSTEMS[round.targetSystem].name}
                </div>
                <NumberDisplay system={round.targetSystem} value={round.value} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-green-700">
              = {round.value}
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{score}</div>
              <div className="text-sm text-gray-500">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {currentRound + 1}/{rounds.length}
              </div>
              <div className="text-sm text-gray-500">Rounds</div>
            </div>
          </div>

          <button
            onClick={handleNextRound}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            {currentRound >= rounds.length - 1 ? 'See Results' : 'Next Round'}
          </button>
        </div>

        <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-500" />
      </div>
    );
  }

  // ============================================
  // RENDER: PLAYING / CHECKING
  // ============================================

  if (!round) return null;

  const sourceInfo = NUMBER_SYSTEMS[round.sourceSystem];
  const targetInfo = NUMBER_SYSTEMS[round.targetSystem];

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-400 overflow-hidden shadow-xl">
      <div className="h-3 bg-gradient-to-r from-red-600 via-amber-500 to-green-600" />

      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: sourceInfo.color }}
            >
              Round {currentRound + 1}/{rounds.length}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                round.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                round.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}
            >
              {round.difficulty.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-700 font-medium">Score:</span>
            <span className="text-xl font-bold text-amber-600">{score}</span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-4">
          {rounds.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < currentRound ? 'bg-green-500' :
                i === currentRound ? 'bg-amber-500 scale-125' :
                'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Task description */}
        <div className="text-center mb-4 p-3 bg-white/70 rounded-xl border border-amber-200">
          <p className="text-amber-800">
            Convert from <strong style={{ color: sourceInfo.color }}>{sourceInfo.name}</strong>
            {' '}to <strong style={{ color: targetInfo.color }}>{targetInfo.name}</strong>
          </p>
        </div>

        {/* Source number display */}
        <div
          className="mb-4 p-4 rounded-xl border-2 text-center"
          style={{ backgroundColor: sourceInfo.bgColor, borderColor: sourceInfo.borderColor }}
        >
          <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
            {sourceInfo.emoji} {sourceInfo.name}
          </div>
          <NumberDisplay system={round.sourceSystem} value={round.value} />
        </div>

        {/* Arrow */}
        <div className="flex justify-center mb-4">
          <div className="text-3xl text-amber-500">↓</div>
        </div>

        {/* Answer builder */}
        <div
          className={`mb-4 p-4 rounded-xl border-2 ${
            feedback === 'correct' ? 'border-green-500 bg-green-50' :
            feedback === 'incorrect' ? 'border-red-500 bg-red-50 animate-pulse' :
            ''
          }`}
          style={feedback === 'none' ? { backgroundColor: targetInfo.bgColor, borderColor: targetInfo.borderColor } : {}}
        >
          <div className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide text-center">
            {targetInfo.emoji} Build your answer in {targetInfo.name}
          </div>
          <AnswerBuilder
            system={round.targetSystem}
            value={answer}
            onChange={setAnswer}
            disabled={phase === 'checking'}
            maxValue={round.value + 500}
          />
        </div>

        {/* Feedback message */}
        {feedback !== 'none' && (
          <div className={`text-center mb-4 py-2 rounded-lg font-bold ${
            feedback === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {feedback === 'correct' ? '✓ Correct! Great translation!' : '✗ Not quite right. Try again!'}
          </div>
        )}

        {/* Hint section */}
        {!showHint ? (
          <div className="text-center mb-4">
            <button
              onClick={() => setShowHint(true)}
              disabled={phase === 'checking'}
              className="px-4 py-2 text-sm bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-all disabled:opacity-50"
            >
              Need a hint? (-25% points)
            </button>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-amber-100 border border-amber-300 rounded-lg text-center">
            <p className="text-amber-800 text-sm">
              💡 <strong>Hint:</strong> {round.hint}
            </p>
          </div>
        )}

        {/* Attempts counter */}
        {attempts > 0 && (
          <div className="text-center mb-4 text-sm text-orange-600">
            Attempts: {attempts} {attempts >= 3 && '- Check the symbols carefully!'}
          </div>
        )}

        {/* Submit button */}
        <div className="text-center">
          <button
            onClick={checkAnswer}
            disabled={
              phase === 'checking' ||
              (round.targetSystem === 'roman' && !answer) ||
              (round.targetSystem === 'arabic' && !answer)
            }
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Check Answer
          </button>
        </div>

        {/* Quick reference */}
        <div className="mt-6 pt-4 border-t border-amber-200">
          <details className="group">
            <summary className="cursor-pointer text-sm text-amber-700 font-medium hover:text-amber-800">
              📚 Quick Reference Guide
            </summary>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2 bg-amber-50 rounded border border-amber-200">
                <strong className="text-amber-800">🏛️ Roman:</strong>
                <div className="text-gray-600 mt-1">
                  I=1, V=5, X=10, L=50, C=100, D=500, M=1000
                </div>
              </div>
              <div className="p-2 bg-amber-50 rounded border border-amber-200">
                <strong className="text-amber-800">🏺 Egyptian:</strong>
                <div className="text-gray-600 mt-1">
                  | = 1, ∩ = 10, 🌀 = 100, 🌸 = 1000
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded border border-green-200">
                <strong className="text-green-800">🌿 Mayan:</strong>
                <div className="text-gray-600 mt-1">
                  Dot = 1, Bar = 5, Shell = 0 (base 20)
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <strong className="text-blue-800">🔢 Arabic:</strong>
                <div className="text-gray-600 mt-1">
                  0-9 digits with place value (base 10)
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className="h-3 bg-gradient-to-r from-red-600 via-amber-500 to-green-600" />
    </div>
  );
}
