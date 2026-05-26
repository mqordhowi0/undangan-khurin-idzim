import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Cover from './components/Cover'
import Pembuka from './components/Pembuka'
import SalamCountdown from './components/SalamCountdown'
import Mempelai from './components/Mempelai'
import Acara from './components/Acara'
import LoveStory from './components/LoveStory'
import LiveStreaming from './components/LiveStreaming'
import WeddingGift from './components/WeddingGift'
import RSVP from './components/RSVP'
import Penutup from './components/Penutup'
import AudioPlayer from './components/AudioPlayer'
import './index.css'

export default function Undangan() {
  const [isOpen, setIsOpen] = useState(false)
  const audioRef = useRef(null)

  const handleOpen = () => {
    setIsOpen(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
    // Memastikan saat buka undangan posisi scroll berada di paling atas
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Mengunci scroll browser saat cover belum dibuka
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
              <Cover onOpen={handleOpen} />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <AudioPlayer audioRef={audioRef} />
              
              {/* Komponen Pembuka dan SalamCountdown TIDAK dibungkus overflow 
                agar fitur position: sticky tetap berjalan sempurna 
              */}
              <Pembuka />
              <SalamCountdown />

              {/* Sisa konten (Mempelai, Acara, dsb) DIBUNGKUS overflow-x: hidden 
                Ini yang akan secara otomatis dan paksa memotong semua animasi 
                framer-motion yang "bocor" ke kanan atau kiri layar HP. 
              */}
              <div style={{ overflowX: 'hidden', width: '100%' }}>
                <Mempelai />
                <Acara />
                <LoveStory />
                <LiveStreaming />
                <WeddingGift />
                <RSVP />
                <Penutup />
              </div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}