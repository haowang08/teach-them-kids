import { Link } from 'react-router-dom';
import { getTopicsForLesson, getLessonForTopic } from '../../data/curriculum';
import ComingSoonBadge from '../common/ComingSoonBadge';

interface TopicLinksProps {
  currentTopicSlug: string;
  lessonSlug: string;
}

export default function TopicLinks({ currentTopicSlug, lessonSlug }: TopicLinksProps) {
  const lesson = getLessonForTopic(currentTopicSlug);
  const lessonId = lesson?.id ?? lessonSlug;
  const topics = getTopicsForLesson(lessonId);

  // Filter out the current topic
  const otherTopics = topics.filter((t) => t.slug !== currentTopicSlug);

  if (otherTopics.length === 0 && !lesson) return null;

  return (
    <section className="mt-12 mb-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-[family-name:var(--font-heading)] text-[#3D2914] mb-4">
          Explore More
        </h3>

        {otherTopics.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {otherTopics.map((topic) => {
              const isComingSoon = topic.status === 'coming-soon';

              if (isComingSoon) {
                return (
                  <div
                    key={topic.id}
                    className="relative flex items-center gap-3 p-4 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed"
                  >
                    <span className="text-2xl opacity-40">
                      {topic.heroIcons[0] ?? '\u{1F4DA}'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{topic.title}</p>
                      <p className="text-xs truncate">{topic.subtitle}</p>
                    </div>
                    <ComingSoonBadge className="absolute top-2 right-2 text-[10px] px-2 py-0.5" />
                  </div>
                );
              }

              return (
                <Link
                  key={topic.id}
                  to={`/lesson/${lessonSlug}/${topic.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all no-underline text-[#3D2914]"
                >
                  <span className="text-2xl">
                    {topic.heroIcons[0] ?? '\u{1F4DA}'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{topic.title}</p>
                    <p className="text-xs text-[#CD7F32] truncate">{topic.subtitle}</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#C9A227] shrink-0"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        )}

        {/* Back to Lesson link */}
        <Link
          to={`/lesson/${lessonSlug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#C9A227] hover:text-[#3D2914] transition-colors no-underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to {lesson?.title ?? 'Lesson'}
        </Link>
      </div>
    </section>
  );
}
