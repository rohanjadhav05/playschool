import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import StickyBottomBar from './components/common/StickyBottomBar'
import WhatsAppButton from './components/common/WhatsAppButton'
import MobileLangPill from './components/common/MobileLangPill'

const HomePage = lazy(() => import('./pages/HomePage'))
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const ContactTriagePage = lazy(() => import('./pages/ContactTriagePage'))
const BranchesIndexPage = lazy(() => import('./pages/BranchesIndexPage'))
const BranchPage = lazy(() => import('./pages/BranchPage'))
const BranchContactPage = lazy(() => import('./pages/BranchContactPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen flex flex-col bg-bg">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/branches" element={<BranchesIndexPage />} />
            <Route path="/branches/:slug" element={<BranchPage />} />
            <Route path="/branches/:slug/contact" element={<BranchContactPage />} />
            <Route path="/contact" element={<ContactTriagePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <StickyBottomBar />
      <MobileLangPill />
      <WhatsAppButton />
    </div>
    </MotionConfig>
  )
}
