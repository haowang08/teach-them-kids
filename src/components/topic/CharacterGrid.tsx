import type { CharacterData } from '../../data/types';
import CharacterCard from './CharacterCard';

interface CharacterGridProps {
  characters: CharacterData[];
}

export default function CharacterGrid({ characters }: CharacterGridProps) {
  if (characters.length === 0) return null;

  return (
    <div
      className="my-6"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
      }}
    >
      {characters.map((character, i) => (
        <CharacterCard key={`${character.name}-${i}`} character={character} />
      ))}
    </div>
  );
}
