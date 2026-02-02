import { Link } from 'react-router-dom';

interface BreadcrumbNavProps {
  lessonSlug?: string;
  lessonTitle?: string;
  topicTitle?: string;
}

function ChevronSeparator() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#CD7F32] shrink-0"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function BreadcrumbNav({
  lessonSlug,
  lessonTitle,
  topicTitle,
}: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm flex-wrap py-3 px-4"
    >
      {/* Home */}
      <Link
        to="/"
        className="text-[#C9A227] hover:text-[#3D2914] font-semibold transition-colors no-underline"
      >
        Home
      </Link>

      {/* Lesson */}
      {lessonSlug && lessonTitle && (
        <>
          <ChevronSeparator />
          {topicTitle ? (
            <Link
              to={`/lesson/${lessonSlug}`}
              className="text-[#C9A227] hover:text-[#3D2914] font-semibold transition-colors no-underline"
            >
              {lessonTitle}
            </Link>
          ) : (
            <span className="text-[#3D2914] font-semibold">{lessonTitle}</span>
          )}
        </>
      )}

      {/* Topic (current page, not a link) */}
      {topicTitle && (
        <>
          <ChevronSeparator />
          <span className="text-[#3D2914] font-semibold">{topicTitle}</span>
        </>
      )}
    </nav>
  );
}
