import { Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import AppLayout from './components/layout/AppLayout'
import JourneyMapPage from './components/landing/JourneyMap'
import LessonPage from './components/lesson/LessonPage'
import TopicPage from './components/topic/TopicPage'

function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<JourneyMapPage />} />
          <Route path="/lesson/:lessonSlug" element={<LessonPage />} />
          <Route path="/lesson/:lessonSlug/:topicSlug" element={<TopicPage />} />
        </Route>
      </Routes>
    </ProgressProvider>
  )
}

export default App
