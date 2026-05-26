import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function Pembuka() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-40px' })

  // ─── FUNGSI GENERATE LINK GOOGLE CALENDAR ───
  const handleSaveCalendar = () => {
    const title = 'Pernikahan Khurin & Idzim'
    const location = 'Gondang RT 08 RW 02, Kepulungan, Gempol, Pasuruan'
    const details = 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.'
    
    // Format Waktu Google Calendar (Format UTC). 
    // 12 Juni 2026 jam 19.00 WIB = 12 Juni 2026 jam 12.00 UTC
    const startDate = '20260612T120000Z'
    const endDate = '20260613T140000Z' // Resepsi tanggal 13

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`
    
    // Buka tab baru menuju Google Calendar
    window.open(url, '_blank')
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: '150vh', 
        zIndex: 1,
        background: 'var(--warm-white)'
      }}
    >
      <div style={{
        position: 'sticky', 
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* ── HIASAN BUNGA ATAS KANAN ── */}
        <div style={{
          position: 'absolute', top: 4, right: 4,
          width: '48%', pointerEvents: 'none', zIndex: 5
        }}>
          <img src="/bunga_pojok.png" alt="" className="float-a" style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
        </div>

        {/* ── HIASAN BUNGA ATAS KIRI (MIRROR) ── */}
        <div style={{
          position: 'absolute', top: 4, left: 4,
          width: '48%', pointerEvents: 'none', zIndex: 5,
          transform: 'scaleX(-1)'
        }}>
          <img src="/bunga_pojok.png" alt="" className="float-b" style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
        </div>

        {/* ── FRAME UTAMA PEMBUKA ── */}
        <motion.div
          initial={{ opacity: 0, y: 100 }} 
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }} 
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

          {/* ── TOMBOL DIBERI EVENT onClick ── */}
          <button 
            className="btn-primary" 
            onClick={handleSaveCalendar} 
            style={{ padding: '12px 28px', fontSize: 14 }}
          >
            <Calendar size={15} /> Simpan di Kalender
          </button>
        </motion.div>
      </div>
    </div>
  )
}