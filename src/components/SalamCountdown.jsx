import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Countdown from 'react-countdown'

const ease = [0.16, 1, 0.3, 1]

/* ─── Countdown Renderer (Kotak 2x2) ─── */
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 24, color: 'var(--gold)', textAlign: 'center' }}>Tiba 🌸</p>
  }
  
  const units = [
    { num: days, lbl: 'Hari' }, { num: hours, lbl: 'Jam' },
    { num: minutes, lbl: 'Menit' }, { num: seconds, lbl: 'Detik' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 12 }}>
      {units.map((u) => (
        <div key={u.lbl} style={{
          background: '#fff', border: '1px solid rgba(184,154,103,0.15)', 
          borderRadius: '8px', padding: '10px 0', textAlign: 'center',
          boxShadow: '0 4px 12px rgba(184,154,103,0.04)'
        }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: 'var(--text-main)', lineHeight: 1 }}>
            {String(u.num).padStart(2,'0')}
          </div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4 }}>
            {u.lbl}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SalamCountdown() {
  const ref = useRef(null)
// Hapus once: true
  const inView = useInView(ref, { margin: '0px 0px -50px 0px' })
  const target = new Date('2026-06-12T19:00:00+07:00')

  return (
    <div 
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 10,
        // KUNCI 3: Tarik ke atas menggunakan satuan vh agar responsif menutupi sisa scroll Pembuka
        marginTop: '-40vh', 
        paddingBottom: '80px',
      }}
    >
      <div style={{ 
        display: 'flex', alignItems: 'flex-start', padding: '0 16px', 
        position: 'relative', maxWidth: '420px', margin: '0 auto' 
      }}>
        
        {/* ── FRAME KIRI: Bismillah & Salam ── */}
        <motion.div
            initial={{ opacity: 0, y: 100 }} 
            // Beri nilai untuk saat inView false
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{
            width: '60%',
            background: 'var(--ivory)',
            border: '1.5px solid var(--gold-border)',
            borderRadius: '100px 100px 20px 20px', 
            padding: '40px 16px 28px',
            zIndex: 2,
            boxShadow: '0 -8px 30px rgba(0,0,0,0.04), 4px 8px 30px rgba(184,154,103,0.1)'
          }}
        >
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, textAlign: 'center', color: 'var(--gold)', marginBottom: 16 }}>
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 10.5, textAlign: 'center', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14, lineHeight: 1.5 }}>
            Assalamu'alaikum<br/>Warahmatullahi Wabarakatuh
          </p>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 10, textAlign: 'center', color: 'var(--text-soft)', lineHeight: 1.7 }}>
            Segala puji bagi Allah SWT yang telah menjadikan hamba-Nya hidup berpasang-pasangan. Dengan memohon Ridho, Rahmat, dan Berkah Allah SWT, kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i dalam acara pernikahan yang kami selenggarakan.
          </p>
        </motion.div>

        {/* ── FRAME KANAN: Countdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 100 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} 
          style={{
            width: '50%',
            marginLeft: '-10%',
            marginTop: '110px', 
            background: 'var(--warm-white)',
            border: '1.5px solid var(--gold-border)',
            borderRadius: '80px 80px 20px 20px', 
            padding: '36px 12px 20px',
            zIndex: 1,
            boxShadow: '4px 8px 30px rgba(184,154,103,0.1)'
          }}
        >
          <p style={{
            fontFamily: 'Cormorant Garamond, serif', fontSize: 15, textAlign: 'center',
            color: 'var(--text-main)', letterSpacing: '1.5px', marginBottom: 4,
            textTransform: 'uppercase', lineHeight: 1.2
          }}>
            Count<br/>Down
          </p>
          <Countdown date={target} renderer={countdownRenderer} />
        </motion.div>

      </div>

      {/* ── PEMBATAS BUNGA BAWAH ── */}
      <div style={{
        position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)',
        width: '105%', minWidth: 380, zIndex: 50, pointerEvents: 'none'
      }}>
        <img src="/bunga_pembatas.png" alt="" className="float-d" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
      </div>

    </div>
  )
}