import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Countdown from 'react-countdown'

const ease = [0.16, 1, 0.3, 1]

/* ─── Countdown Renderer ─── */
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 24, color: 'var(--gold)', textAlign: 'center' }}>Hari Bahagia Telah Tiba 🌸</p>
  }
  
  const units = [
    { num: days, lbl: 'Hari' }, { num: hours, lbl: 'Jam' },
    { num: minutes, lbl: 'Menit' }, { num: seconds, lbl: 'Detik' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '14px', width: '100%' }}>
      {units.map((u) => (
        <div key={u.lbl} style={{
          background: '#fff', 
          border: '1px solid var(--gold-light)', 
          borderRadius: '12px', 
          padding: '10px 0', 
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(30,58,138,0.03)'
        }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1 }}>
            {String(u.num).padStart(2,'0')}
          </div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)', marginTop: 4 }}>
            {u.lbl}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SalamCountdown() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '0px 0px -100px 0px' })
  const target = new Date('2026-06-12T19:00:00+07:00')

  return (
    <div 
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 20,
        marginTop: '-65vh', 
        background: 'none', 
      }}
    >
      
      {/* ── CONTAINER UTAMA PILAR ── */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'stretch', 
        justifyContent: 'flex-start', 
        width: '100%', 
        overflow: 'hidden', 
        position: 'relative', 
        paddingTop: '20px',
        paddingBottom: '0px' 
      }}>
        
        {/* ── HIASAN BUNGA 1 (Area Merah Atas Kanan Pilar Kiri) ── */}
        <div style={{
          position: 'absolute',
          top: '5px', 
          right: '-40%', 
          width: '100%', 
          maxWidth: '400px',
          zIndex: 0, 
          pointerEvents: 'none',
        }}>
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            src="/bunga_tengah.png" 
            alt="" 
            style={{ width: '100%', height: 'auto', transform: 'rotate(15deg)' }} 
            className="float-b"
          />
        </div>

        {/* ── PILAR KIRI: SALAM (zIndex: 1) ── */}
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }}
          transition={{ duration: 1.4, ease, delay: 0.1 }}
          style={{
            width: '100%', 
            flexShrink: 0,
            marginLeft: '-40%', // Menyembunyikan persis 4/10 bagian (Sisa 6/10 muncul di layar)
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid var(--gold-border)',
            borderRadius: '350px 350px 0 0', 
            // Padding presisi: 46% kiri agar teks terdorong ke 60% area yang terlihat
            padding: '70px 6% 130px 46%', 
            zIndex: 1, 
            boxShadow: '4px 10px 40px rgba(30,58,138,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: 'var(--gold)', marginBottom: 16 }}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            <p style={{ 
                fontFamily: 'Nunito, sans-serif', 
                fontSize: 11, 
                fontWeight: 700, 
                color: 'var(--text-dark)', 
                marginBottom: 14, 
                lineHeight: 1.5,
                letterSpacing: '0.5px'
            }}>
              Assalamu'alaikum<br/>Warahmatullahi Wabarakatuh
            </p>
            <p style={{ 
                fontFamily: 'Nunito, sans-serif', 
                fontSize: 10, 
                color: 'var(--text-soft)', 
                lineHeight: 1.75
            }}>
              Segala puji bagi Allah SWT yang telah menjadikan hamba-Nya hidup berpasang-pasangan. Dengan memohon Ridho, Rahmat, dan Berkah Allah SWT, kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i dalam acara pernikahan kami.
            </p>
          </div>
        </motion.div>

        {/* ── HIASAN BUNGA 2 (Area Merah Bawah Kiri Pilar Kiri) ── */}
        <div style={{
          position: 'absolute',
          bottom: '-70px', 
          left: '-5%', 
          width: '55%', 
          maxWidth: '220px',
          zIndex: 2, 
          pointerEvents: 'none',
        }}>
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            src="/bunga_tengah.png" 
            alt="" 
            style={{ width: '100%', height: 'auto', transform: 'rotate(-45deg)' }} 
            className="float-a"
          />
        </div>

        {/* ── PILAR KANAN: COUNTDOWN (zIndex: 3) ── */}
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 200 }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
          style={{
            width: '100%', // Dibuat 100% raksasa
            flexShrink: 0,
            marginLeft: '-10%', // Menimpa pilar salam sebesar 10%
            marginRight: '-50%', // KUNCI: Menyembunyikan persis 5/10 bagian (Setengah pilar)
            marginTop: '130px',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid var(--gold-border)',
            borderRadius: '350px 350px 0 0', 
            // Padding presisi: 56% kanan untuk memaksa teks masuk ke 5/10 area kiri yang terlihat
            padding: '50px 55% 100px 14%', 
            zIndex: 3, 
            boxShadow: '-6px 10px 40px rgba(30,58,138,0.07)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif', 
              fontSize: 15, 
              textAlign: 'center',
              color: 'var(--text-muted)', 
              letterSpacing: '2.5px', 
              textTransform: 'uppercase', 
              lineHeight: 1.2
            }}>
              Count<br/>Down
            </p>
            <Countdown date={target} renderer={countdownRenderer} />
          </div>
        </motion.div>

      </div>

      {/* ── BUNGA PEMBATAS BAWAH ── */}
      <div style={{
        position: 'absolute', 
        bottom: -35, 
        left: '50%', 
        transform: 'translateX(-50%)',
        width: '105%', 
        minWidth: 380, 
        zIndex: 50, 
        pointerEvents: 'none'
      }}>
        <img src="/bunga_pembatas.png" alt="" className="float-d" style={{ width: '100%', height: 'auto', opacity: 0.98 }} />
      </div>

    </div>
  )
}