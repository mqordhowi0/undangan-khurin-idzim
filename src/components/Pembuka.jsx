import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar } from 'lucide-react'

export default function Pembuka() {
  const ref = useRef(null)
  // Margin diset agar tidak ada efek kedip/flash di awal
  const inView = useInView(ref, { margin: '-40px' })

  // ─── FUNGSI GENERATE LINK GOOGLE CALENDAR ───
  const handleSaveCalendar = () => {
    const title = 'Pernikahan Khurin & Idzim'
    const location = 'Gondang RT 08 RW 02, Kepulungan, Gempol, Pasuruan'
    const details = 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.'
    
    // Format Waktu Google Calendar (Format UTC). 
    const startDate = '20260612T120000Z'
    const endDate = '20260613T140000Z' 

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`
    
    window.open(url, '_blank')
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height: '150vh', // Ruang untuk scroll layer SalamCountdown
        zIndex: 1,
      }}
    >
      {/* ── CONTAINER STICKY ── */}
      <div style={{
        position: 'sticky', 
        top: 0,
        height: '100vh', // Layar diam
        background: 'var(--warm-white)', // Background warna utuh agar menutupi elemen di belakangnya
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden' // Mengunci layar agar tidak bisa digeser horizontal
      }}>
        
        {/* ── HIASAN BUNGA ATAS KANAN (DI LUAR FRAME) ── */}
        <div style={{
          position: 'absolute', top: 0, right: 0, 
          width: '50%', maxWidth: '200px', pointerEvents: 'none', zIndex: 1
        }}>
          <img src="/bunga_pojok.png" alt="" className="float-a" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
        </div>

        {/* ── HIASAN BUNGA ATAS KIRI (DI LUAR FRAME) ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, 
          width: '50%', maxWidth: '200px', pointerEvents: 'none', zIndex: 1,
          transform: 'scaleX(-1)'
        }}>
          <img src="/bunga_pojok.png" alt="" className="float-b" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
        </div>

        {/* ── FRAME UTAMA PEMBUKA ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} 
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} 
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="card-arch"
          style={{
            margin: '0 auto',
            width: '85%', 
            maxWidth: '340px', // Sedikit diperkecil lebarnya agar lengkungannya pas setengah lingkaran
            background: 'var(--ivory)', 
            position: 'relative', 
            zIndex: 5, // Harus lebih tinggi dari bunga agar teks tidak tertutup
            // KUNCI LENGKUNGAN SEMPURNA: 200px memastikan lengkungan berbentuk kubah bulat, tidak gepeng/runcing
            borderRadius: '200px 200px 24px 24px', 
            padding: '70px 24px 50px',
            boxShadow: '0 12px 40px rgba(184,154,103,0.1)',
            border: '1.5px solid var(--gold-border)',
            textAlign: 'center'
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

          <button 
            className="btn-primary" 
            onClick={handleSaveCalendar} 
            style={{ padding: '12px 28px', fontSize: 14 }}
          >
            <Calendar size={15} style={{ marginRight: 6 }}/> Simpan di Kalender
          </button>
        </motion.div>

      </div>
    </div>
  )
}