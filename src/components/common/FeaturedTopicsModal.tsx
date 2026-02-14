import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { topicMeta, getLessonForTopic } from '../../data/curriculum';
import type { TopicMeta } from '../../data/types';

interface FeaturedTopicsModalProps {
  onSkip: () => void;
}

// Get a shuffled selection of topics
function getRandomTopics(count: number): TopicMeta[] {
  const allTopics = Object.values(topicMeta);
  const shuffled = [...allTopics].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function FeaturedTopicsModal({ onSkip }: FeaturedTopicsModalProps) {
  const navigate = useNavigate();

  // Get 6 random featured topics
  const featuredTopics = useMemo(() => getRandomTopics(6), []);

  const handleTopicClick = (topic: TopicMeta) => {
    const lesson = getLessonForTopic(topic.id);
    if (lesson) {
      navigate(`/lesson/${lesson.id}/${topic.slug}`);
      onSkip(); // Close modal after navigation
    }
  };

  const handleSurpriseMe = () => {
    const allTopics = Object.values(topicMeta);
    const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
    const lesson = getLessonForTopic(randomTopic.id);
    if (lesson) {
      navigate(`/lesson/${lesson.id}/${randomTopic.slug}`);
      onSkip();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[#FFF8E7] rounded-2xl shadow-2xl p-6 md:p-8 text-center space-y-5 border-2 border-[#C9A227]/40 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-4xl leading-none select-none" aria-hidden="true">
          🌟🗺️✨
        </div>

        <h2 className="text-2xl font-bold text-[#3D2914] font-[family-name:var(--font-heading)]">
          Where Would You Like to Explore?
        </h2>

        <p className="text-sm text-[#6B5B3E]">
          Pick a topic that sounds fun, or let us surprise you!
        </p>

        {/* Featured Topics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {featuredTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className="group p-4 rounded-xl bg-white border-2 border-[#C9A227]/30
                hover:border-[#C9A227] hover:shadow-lg transition-all
                text-left cursor-pointer"
            >
              <div className="text-2xl mb-2 select-none">
                {topic.heroIcons.slice(0, 2).join(' ')}
              </div>
              <h3 className="text-sm font-bold text-[#3D2914] leading-tight group-hover:text-[#C9A227] transition-colors">
                {topic.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Surprise Me Button */}
        <button
          onClick={handleSurpriseMe}
          className="w-full py-3 rounded-xl font-bold text-lg text-[#FFF8E7]
            bg-gradient-to-r from-[#C9A227] to-[#CD7F32]
            hover:from-[#d4ac2f] hover:to-[#d98a3a]
            transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          🎲 Surprise Me!
        </button>

        {/* Skip link */}
        <button
          onClick={onSkip}
          className="text-xs text-[#8B7355] hover:text-[#6B5B3E] underline underline-offset-2 transition-colors"
        >
          Let me explore on my own
        </button>
      </div>
    </div>
  );
}
