import { motion } from 'framer-motion'
import { Heart, ChevronDown } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

// Animasi dari kiri atas
const floralLeft = {
  hidden:  { opacity: 0, x: -90, y: -60 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.5, ease } },
}
// Animasi dari kanan bawah
const floralRight = {
  hidden:  { opacity: 0, x: 90, y: 60 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.5, ease } },
}

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease } },
})

export default function Cover({ onOpen }) {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 24px 60px',
      background: 'linear-gradient(170deg, var(--ivory) 0%, var(--beige) 100%)', 
      borderRadius: '48px', 
      overflow: 'hidden',
    }}>

      {/* ── Top-Left Floral ── */}
      <motion.div
        variants={floralLeft}
        initial="hidden"
        animate="visible"
        className="float-b"
        style={{
          position: 'absolute', top: -20, left: -20,
          width: '65%', zIndex: 1, pointerEvents: 'none',
        }}
      >
        <img src="/bunga_pojok.png" alt="" className="floral-img" style={{ width: '100%', height: 'auto', transform: 'scaleX(-1)' }} />
      </motion.div>

      {/* ── Bottom-Right Floral ── */}
      <motion.div
        variants={floralRight}
        initial="hidden"
        animate="visible"
        className="float-a"
        style={{
          position: 'absolute', bottom: -20, right: -20,
          width: '65%', zIndex: 1, pointerEvents: 'none',
        }}
      >
        <img src="/bunga_pojok.png" alt="" className="floral-img" style={{ width: '100%', height: 'auto', transform: 'scaleY(-1)' }} />
      </motion.div>

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%' }}>

        <motion.p variants={fadeUp(0.45)} initial="hidden" animate="visible"
          style={{
            fontFamily: 'Nunito, sans-serif', fontSize: 10.5, letterSpacing: '4px',
            textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20,
          }}
        >
          Save the Date
        </motion.p>

        <motion.p variants={fadeUp(0.62)} initial="hidden" animate="visible"
          style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 13.5, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10,
          }}
        >
          The Wedding Of
        </motion.p>

        <motion.div variants={fadeUp(0.80)} initial="hidden" animate="visible">
          <h1 style={{
            fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(54px, 14vw, 76px)',
            color: 'var(--text-dark)', lineHeight: 1.08,
          }}>
            Khurin
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '2px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold-border))' }} />
            <Heart size={13} color="var(--gold)" fill="var(--gold)" />
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--gold-border), transparent)' }} />
          </div>

          <h1 style={{
            fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(54px, 14vw, 76px)',
            color: 'var(--text-dark)', lineHeight: 1.08, marginBottom: 22,
          }}>
            Idzim
          </h1>
        </motion.div>

        <motion.div variants={fadeUp(0.98)} initial="hidden" animate="visible" style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16.5, color: 'var(--text-soft)', letterSpacing: 1.2, marginBottom: 4 }}>
            12 · 06 · 2026
          </p>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11.5, color: 'var(--text-muted)', letterSpacing: 0.8 }}>
            Gondang, Kepulungan Gempol
          </p>
        </motion.div>

        <motion.div variants={fadeUp(1.10)} initial="hidden" animate="visible"
          style={{
            background: 'var(--gold-light)', border: '1px solid var(--gold-border)',
            borderRadius: 16, padding: '13px 20px', marginBottom: 32, maxWidth: 290,
            marginLeft: 'auto', marginRight: 'auto',
          }}
        >
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 5 }}>
            Kepada Yth.
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17.5, fontStyle: 'italic', color: 'var(--text-main)' }}>
            Tamu Undangan
          </p>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
            & Keluarga
          </p>
        </motion.div>

        <motion.div variants={fadeUp(1.26)} initial="hidden" animate="visible">
          <button className="btn-primary" onClick={onOpen}>
            <Heart size={14} fill="currentColor" />
            Buka Undangan
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }} style={{ marginTop: 40 }}>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={18} color="var(--gold)" style={{ opacity: 0.45, margin: '0 auto' }} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}