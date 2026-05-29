import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Cover from './components/Cover'
import Pembuka from './components/Pembuka'
import SalamCountdown from './components/SalamCountdown'
import Mempelai from './components/Mempelai'
import Acara from './components/Acara'
import LoveStory from './components/LoveStory'
// LiveStreaming dihilangkan dari import
import WeddingGift from './components/WeddingGift'
import RSVP from './components/RSVP'
import Penutup from './components/Penutup'
import AudioPlayer from './components/AudioPlayer'
import './index.css'

export default function Undangan({ variant }) {
  const [isOpen, setIsOpen] = useState(false)
  const audioRef = useRef(null)

  const handleOpen = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className="app-bg">
      <div className="invitation-frame">
        <audio
          ref={audioRef}
          src="/rey-mbayang-di-sepertiga-malam.mp3"
          loop
          preload="none"
        />

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="cover"
              exit={{ opacity: 0, y: -40 }} 
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <Cover onOpen={handleOpen} variant={variant} />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <AudioPlayer audioRef={audioRef} />
              
              <Pembuka variant={variant} />
              <SalamCountdown />

              <div style={{ overflowX: 'clip', width: '100%' }}>
                <Mempelai variant={variant} />
                <Acara variant={variant} />
                <LoveStory variant={variant} />
                
                {/* Komponen LiveStreaming sudah dihapus dari sini */}
                
                <WeddingGift variant={variant} />
                <RSVP variant={variant} />
                <Penutup variant={variant} />
              </div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}