import { useParams, Link } from 'react-router-dom';
import { getLesson, topics as topicsMap } from '../../data/curriculum';
import { useProgress } from '../../hooks/useProgress';
import LessonProgressBar from './LessonProgressBar';
import TopicNode from './TopicNode';

export default function LessonPage() {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const lesson = lessonSlug ? getLesson(lessonSlug) : undefined;
  const { getLessonCompletion } = useProgress();

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <span className="text-6xl">&#128566;</span>
        <h1 className="font-heading text-2xl text-dark-brown">Lesson Not Found</h1>
        <p className="text-dark-brown/70 text-center">
          We couldn't find that lesson. It might have been moved or doesn't exist yet.
        </p>
        <Link
          to="/"
          className="mt-2 px-6 py-2 bg-gold text-white font-bold rounded-full hover:bg-bronze transition-colors"
        >
          Back to Journey Map
        </Link>
      </div>
    );
  }

  // Build full topic list including coming-soon placeholders
  const allTopicEntries = lesson.topicIds.map((topicId) => {
    const topic = topicsMap[topicId];
    if (topic) {
      return {
        topicId: topic.id,
        slug: topic.slug,
        title: topic.title,
        status: topic.status,
        icon: topic.heroIcons?.[0] || '📖',
      };
    }
    // Topic data not yet created -- show as coming soon
    return {
      topicId,
      slug: topicId,
      title: topicId
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      status: 'coming-soon' as const,
      icon: '📖',
    };
  });

  return (
    <div className="min-h-screen bg-cream pb-16">
      {/* Back link */}
      <div className="max-w-lg mx-auto px-4 pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gold hover:text-bronze transition-colors"
        >
          <span>&#8592;</span> Back to Journey Map
        </Link>
      </div>

      {/* Lesson header */}
      <div className="max-w-lg mx-auto px-4 pt-4 pb-6 text-center">
        <div className="text-5xl mb-3">{lesson.icon}</div>
        <h1 className="font-heading text-2xl md:text-3xl text-dark-brown mb-2">
          {lesson.title}
        </h1>
        <p className="text-dark-brown/70 text-sm md:text-base mb-4">
          {lesson.description}
        </p>
        <div className="max-w-xs mx-auto">
          <LessonProgressBar lessonId={lesson.id} />
        </div>
      </div>

      {/* Winding path */}
      <div className="relative max-w-lg mx-auto px-4">
        {/* Vertical connecting line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, #C9A227 ${getLessonCompletion(lesson.id)}%, #e5e0d5 ${getLessonCompletion(lesson.id)}%)`,
          }}
        />

        {/* Topic nodes */}
        <div className="relative flex flex-col gap-24 py-8">
          {allTopicEntries.map((entry, index) => (
            <TopicNode
              key={entry.topicId}
              topicId={entry.topicId}
              slug={entry.slug}
              title={entry.title}
              status={entry.status}
              icon={entry.icon}
              lessonSlug={lesson.id}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
