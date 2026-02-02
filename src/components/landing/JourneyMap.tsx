import { curriculum, lessons } from '../../data/curriculum';
import { useProgress } from '../../hooks/useProgress';
import ProgressSummary from './ProgressSummary';
import LessonNode from './LessonNode';

export default function JourneyMap() {
  const { getLessonCompletion } = useProgress();

  // Collect all lesson IDs from journeys (in order)
  const lessonIds = curriculum.journeys.flatMap((j) => j.lessonIds);

  // Calculate where gold line should stop (based on completion)
  const completionValues = lessonIds.map((id) => getLessonCompletion(id));
  let goldLinePercent = 0;
  for (let i = 0; i < completionValues.length; i++) {
    if (completionValues[i] > 0) {
      // This node has some progress; gold line extends through it
      goldLinePercent = ((i + 1) / lessonIds.length) * 100;
    } else {
      break;
    }
  }

  return (
    <div className="min-h-screen bg-cream pb-16">
      {/* Header */}
      <div className="text-center pt-8 pb-4 px-4">
        <h1 className="font-heading text-3xl md:text-4xl text-dark-brown mb-1">
          Kids Learn Everything
        </h1>
        <p className="text-dark-brown/60 text-sm md:text-base">
          Your adventure through knowledge starts here!
        </p>
      </div>

      {/* Progress summary */}
      <div className="px-4 mb-8">
        <ProgressSummary />
      </div>

      {/* Journey map path */}
      <div className="relative max-w-lg mx-auto px-4">
        {/* Vertical connecting line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, #C9A227 ${goldLinePercent}%, #e5e0d5 ${goldLinePercent}%)`,
          }}
        />

        {/* Decorative dots along the path */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none">
          {lessonIds.map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
              style={{
                top: `${((i + 0.5) / lessonIds.length) * 100}%`,
                backgroundColor:
                  i < completionValues.filter((v) => v > 0).length
                    ? '#C9A227'
                    : '#e5e0d5',
              }}
            />
          ))}
        </div>

        {/* Lesson nodes */}
        <div className="relative flex flex-col gap-28 py-10">
          {lessonIds.map((lessonId, index) => {
            const lesson = lessons[lessonId];
            if (!lesson) return null;
            return (
              <LessonNode
                key={lesson.id}
                lesson={lesson}
                index={index}
                completion={completionValues[index]}
              />
            );
          })}
        </div>
      </div>

      {/* Footer decoration */}
      <div className="text-center pt-8 opacity-40">
        <span className="text-3xl">&#127775;</span>
        <p className="text-xs text-dark-brown/50 mt-1 font-semibold">
          More adventures coming soon!
        </p>
      </div>
    </div>
  );
}
