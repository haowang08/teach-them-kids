'use client';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTopicBySlug, getLessonForTopic } from '../../data/curriculum';
import { useTheme } from '../../hooks/useTheme';
import ScrollProgressBar from './ScrollProgressBar';
import TopicHero from './TopicHero';
import AudioSettingsBar from './AudioSettingsBar';
import TopicNav from './TopicNav';
import ScoreTracker from '../quiz/ScoreTracker';
import BreadcrumbNav from '../navigation/BreadcrumbNav';
import ContentSection from './ContentSection';
import EssaySection from '../essay/EssaySection';
import RewardSection from '../rewards/RewardSection';
import TopicLinks from '../navigation/TopicLinks';
import ScrollToTop from '../common/ScrollToTop';

export default function TopicPage() {
  const { topicSlug, lessonSlug } = useParams<{
    topicSlug: string;
    lessonSlug: string;
  }>();

  const topic = topicSlug ? getTopicBySlug(topicSlug) : undefined;
  const lesson = topic ? getLessonForTopic(topic.id) : undefined;
  const { theme, themeStyle } = useTheme(topic?.themeId ?? '');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [topicSlug]);

  // 404
  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Topic Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            We could not find the topic you are looking for.
          </p>
          <a
            href="/"
            className="inline-block rounded-full bg-gray-800 text-white px-6 py-3 font-semibold hover:bg-gray-700 transition-colors no-underline"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={themeStyle} className="min-h-screen bg-[var(--topic-sand)]/20">
      <ScrollProgressBar />

      <TopicHero topic={topic} theme={theme} />

      <AudioSettingsBar />

      <TopicNav items={topic.navItems} />

      <ScoreTracker topicId={topic.id} />

      <div className="max-w-4xl mx-auto px-4">
        <BreadcrumbNav
          lessonSlug={lessonSlug}
          lessonTitle={lesson?.title}
          topicTitle={topic.title}
        />

        {/* Content sections */}
        {topic.sections.map((section) => (
          <ContentSection
            key={section.id}
            section={section}
            topicId={topic.id}
            quizzes={topic.quizzes}
          />
        ))}

        {/* Essay */}
        <EssaySection essay={topic.essay} topicId={topic.id} />

        {/* Conclusion */}
        <section id="conclusion" className="my-8">
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-5 md:p-8 shadow-sm overflow-hidden relative">
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: 'var(--topic-section-border-gradient)' }}
            />

            <h2 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-[var(--topic-primary)] mb-4">
              {topic.conclusion.title}
            </h2>

            {topic.conclusion.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base text-[var(--topic-dark-brown)] leading-relaxed mb-3 last:mb-0"
                children={p}
              />
            ))}
          </div>
        </section>

        {/* Reward */}
        {topic.reward && (
          <RewardSection reward={topic.reward} topicId={topic.id} />
        )}

        {/* Topic links */}
        <TopicLinks
          currentTopicSlug={topic.slug}
          lessonSlug={lessonSlug ?? lesson?.id ?? ''}
        />
      </div>

      <ScrollToTop />
    </div>
  );
}
