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
        background: 'var(--warm-white)',
        borderRadius: '48px 48px 0 0' // Melengkung mengikuti bentuk frame HP
      }}
    >
      {/* ── CONTAINER STICKY ── */}
      <div style={{
        position: 'sticky', 
        top: 0,
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', 
        borderRadius: '48px 48px 0 0', 
      }}>

        {/* ── BACKGROUND BUNGA TRANSPARAN (WATERMARK TENGAH) ── */}
        {/* Opacity dinaikkan jadi 0.25 dan blur dihilangkan agar lebih kelihatan jelas */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '120%', maxWidth: '500px', pointerEvents: 'none', zIndex: 0, 
          opacity: 0.25 
        }}>
          <img src="/bunga_tengah.png" alt="" style={{ width: '100%', height: 'auto' }} />
        </div>
        
        {/* ── HIASAN BUNGA ATAS (Menggunakan Bunga Tengah) ── */}
        <div style={{
          position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
          width: '80%', maxWidth: '300px', pointerEvents: 'none', zIndex: 1
        }}>
          <img src="/bunga_tengah.png" alt="" className="float-a" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
        </div>

        {/* ── TAMBAHAN BUNGA BAWAH KANAN (Menggunakan Bunga Kecil) ── */}
        <div style={{
          position: 'absolute', bottom: -10, right: -15, 
          width: '50%', maxWidth: '180px', pointerEvents: 'none', zIndex: 1,
          opacity: 0.85
        }}>
          <img src="/bunga_kecil.png" alt="" className="float-c" style={{ width: '100%', height: 'auto' }} />
        </div>
        
        {/* ── TAMBAHAN BUNGA BAWAH KIRI (Menggunakan Bunga Kecil, Dimirror) ── */}
        <div style={{
          position: 'absolute', bottom: -10, left: -15, 
          width: '50%', maxWidth: '180px', pointerEvents: 'none', zIndex: 1,
          transform: 'scaleX(-1)', opacity: 0.85
        }}>
          <img src="/bunga_kecil.png" alt="" className="float-d" style={{ width: '100%', height: 'auto' }} />
        </div>

        {/* ── FRAME UTAMA PEMBUKA (ARCH SEMPURNA) ── */}
        <motion.div
          initial={{ opacity: 0, y: 70 }} 
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }} 
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="card-arch"
          style={{
            margin: '0 auto',
            width: '85%', maxWidth: '340px', 
            background: 'var(--ivory)', 
            position: 'relative', 
            zIndex: 5, 
            borderRadius: '200px 200px 24px 24px', 
            padding: '70px 24px 50px',
            boxShadow: '0 12px 40px rgba(30, 58, 138, 0.08)',
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