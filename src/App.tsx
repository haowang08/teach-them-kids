import { useState, useCallback, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import AppLayout from './components/layout/AppLayout'
import JourneyMapPage from './components/landing/JourneyMap'
import LessonPage from './components/lesson/LessonPage'
import TopicPage from './components/topic/TopicPage'

const BasicsLayout = lazy(() => import('./basics/components/layout/BasicsLayout'))
const BasicsMapPage = lazy(() => import('./basics/components/layout/BasicsMapPage'))
const GameShell = lazy(() => import('./basics/components/layout/GameShell'))
import UsernameModal from './components/common/UsernameModal'
import FeaturedTopicsModal from './components/common/FeaturedTopicsModal'
import { useProgress } from './hooks/useProgress'
import { getStoredUsername } from './lib/cloudSync'
import type { CurriculumProgress } from './data/types'

type ModalState = 'username' | 'featured' | 'none'

function AppInner() {
  const { setUsername, applyMergedProgress, progress } = useProgress()
  // Determine initial modal state
  const [modalState, setModalState] = useState<ModalState>(() => {
    const storedUsername = getStoredUsername()
    return storedUsername ? 'none' : 'username'
  })

  const handleUsernameComplete = useCallback(
    (newUsername: string, mergedProgress: CurriculumProgress | null) => {
      setUsername(newUsername)
      if (mergedProgress) {
        applyMergedProgress(mergedProgress)
      }
      // Show featured topics modal after username creation
      setModalState('featured')
    },
    [setUsername, applyMergedProgress],
  )

  const handleUsernameSkip = useCallback(() => {
    // Show featured topics modal even if they skip username
    setModalState('featured')
  }, [])

  const handleFeaturedSkip = useCallback(() => {
    setModalState('none')
  }, [])

  return (
    <>
      {modalState === 'username' && (
        <UsernameModal
          onComplete={handleUsernameComplete}
          onSkip={handleUsernameSkip}
          localProgress={progress}
        />
      )}
      {modalState === 'featured' && (
        <FeaturedTopicsModal onSkip={handleFeaturedSkip} />
      )}
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<JourneyMapPage />} />
          <Route path="/lesson/:lessonSlug" element={<LessonPage />} />
          <Route path="/lesson/:lessonSlug/:topicSlug" element={<TopicPage />} />
        </Route>
        <Route element={<Suspense fallback={null}><BasicsLayout /></Suspense>}>
          <Route path="/basics" element={<Suspense fallback={null}><BasicsMapPage /></Suspense>} />
          <Route path="/basics/:gameSlug" element={<Suspense fallback={null}><GameShell /></Suspense>} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <ProgressProvider>
      <AppInner />
    </ProgressProvider>
  )
}

export default App
