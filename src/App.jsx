import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import Hero from './sections/Hero'
import ProductShowcase from './sections/ProductShowcase'
import ContextStory from './sections/ContextStory'
import FinalCTA from './sections/FinalCTA'
import Footer from './components/Footer'
import TracebackMode from './components/TracebackMode'
import { useKonamiCode } from './hooks/useKonamiCode'

export default function App() {
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useKonamiCode(() => {
    setShowEasterEgg(true)
  })

  return (
    <>
      <Hero />
      <ProductShowcase />
      <ContextStory />
      <FinalCTA />
      <Footer />

      <AnimatePresence>
        {showEasterEgg && (
          <TracebackMode onClose={() => setShowEasterEgg(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
