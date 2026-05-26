import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function Pembuka() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: '150vh', // Height for sticky scroll duration
        zIndex: 1,
        background: 'var(--warm-white)',
        // ── KUNCI PERBAIKAN 1: Menjaga sudut luar tetap melengkung rapi saat scrolling ──
        borderTopLeftRadius: '48px', 
        borderTopRightRadius: '48px',
      }}
    >
      <div style={{
        position: 'sticky', // Makes the frame sticky
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        // ── KUNCI PERBAIKAN 2: Sudut konten sticky juga harus melengkung agar serasi ──
        borderTopLeftRadius: '48px', 
        borderTopRightRadius: '48px',
      }}>
        {/* ── Top-Right Floral ── */}
        <div style={{
          position: 'absolute', top: 4, right: 4,
          width: '48%', pointerEvents: 'none', zIndex: 5
        }}>
          <img src="/bunga_pojok.png" alt="" className="float-a" style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
        </div>

        {/* ── Top-Left Floral (Mirror) ── */}
        <div style={{
          position: 'absolute', top: 4, left: 4,
          width: '48%', pointerEvents: 'none', zIndex: 5,
          transform: 'scaleX(-1)'
        }}>
          <img src="/bunga_pojok.png" alt="" className="float-b" style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
        </div>

        {/* ── Pembuka Main Frame ── */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="card-arch"
          style={{
            margin: '0 auto',
            width: '85%', maxWidth: '360px',
            background: 'var(--ivory)', position: 'relative', zIndex: 2,
            paddingTop: '60px', paddingBottom: '70px',
            boxShadow: '0 12px 40px rgba(184,154,103,0.1)'
          }}
        >
          <p style={{
            fontFamily: 'Nunito, sans-serif', fontSize: 11,
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.6
          }}>
            We invite you to our<br />wedding celebration
          </p>

          <h1 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 58, color: 'var(--gold)', lineHeight: 1.1 }}>
            Khurin
          </h1>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontStyle: 'italic', color: 'var(--text-soft)', margin: '10px 0' }}>
            &
          </div>
          <h1 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 58, color: 'var(--gold)', lineHeight: 1.1, marginBottom: 36 }}>
            Idzim
          </h1>

          <button className="btn-primary" style={{ padding: '12px 28px', fontSize: 14 }}>
            <Calendar size={15} /> Save to Calendar
          </button>
        </motion.div>
      </div>
    </div>
  )
}