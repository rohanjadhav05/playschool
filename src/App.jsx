import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import StickyBottomBar from './components/common/StickyBottomBar'
import WhatsAppButton from './components/common/WhatsAppButton'

const HomePage = lazy(() => import('./pages/HomePage'))
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <StickyBottomBar />
      <WhatsAppButton />
    </div>
  )
}
