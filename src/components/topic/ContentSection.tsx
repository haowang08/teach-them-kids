import type { TopicSection, Quiz } from '../../data/types';
import ReadAloudBlock from './ReadAloudBlock';
import CharacterGrid from './CharacterGrid';
import Timeline from './Timeline';
import FunFact from './FunFact';
import VideoEmbed from './VideoEmbed';
import QuizBox from '../quiz/QuizBox';

interface ContentSectionProps {
  section: TopicSection;
  topicId: string;
  quizzes: Quiz[];
}

export default function ContentSection({
  section,
  topicId,
  quizzes,
}: ContentSectionProps) {
  const sectionQuizzes = section.quizIds
    .map((qid) => quizzes.find((q) => q.id === qid))
    .filter((q): q is Quiz => q !== undefined);

  return (
    <section
      id={section.id}
      className="relative rounded-2xl bg-white/80 backdrop-blur-sm p-5 md:p-8 my-8 shadow-sm overflow-hidden"
    >
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: 'var(--topic-section-border-gradient)' }}
      />

      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl" aria-hidden="true">
          {section.icon}
        </span>
        <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--topic-primary)]">
          {section.title}
        </h2>
      </div>

      {/* Intro text */}
      {section.introText && (
        <p className="text-[var(--topic-dark-brown)] text-base mb-6 leading-relaxed">
          {section.introText}
        </p>
      )}

      {/* Read-aloud blocks */}
      {section.readAloudBlocks.map((block) => (
        <ReadAloudBlock key={block.id} block={block} />
      ))}

      {/* Characters */}
      {section.characters && section.characters.length > 0 && (
        <CharacterGrid characters={section.characters} />
      )}

      {/* Timeline */}
      {section.timeline && section.timeline.length > 0 && (
        <Timeline entries={section.timeline} />
      )}

      {/* Fun facts */}
      {section.funFacts && section.funFacts.length > 0 && (
        <div className="my-6">
          {section.funFacts.map((fact, i) => (
            <FunFact key={i} fact={fact} />
          ))}
        </div>
      )}

      {/* Videos */}
      {section.videos.length > 0 && (
        <div className="my-6">
          {section.videos.map((video) => (
            <VideoEmbed key={video.youtubeId} video={video} />
          ))}
        </div>
      )}

      {/* Quizzes */}
      {sectionQuizzes.length > 0 && (
        <div className="my-6 space-y-6">
          {sectionQuizzes.map((quiz) => (
            <QuizBox key={quiz.id} quiz={quiz} topicId={topicId} />
          ))}
        </div>
      )}
    </section>
  );
}
