import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AudioPlayer({ audioRef }) {
  const [playing, setPlaying] = useState(true)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(p => !p)
  }

  return (
    <motion.button
      className="audio-btn"
      onClick={toggle}
      title={playing ? 'Pause musik' : 'Putar musik'}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: 'backOut' }}
      whileTap={{ scale: 0.9 }}
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </motion.button>
  )
}