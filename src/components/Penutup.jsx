import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

export default function Penutup() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      className="section-wrap"
      style={{
        position: 'relative',
        padding: '80px 28px 72px', // Ditambahkan padding top agar tidak menabrak bunga
        background: 'linear-gradient(180deg, var(--warm-white) 0%, #F0EBE2 50%, var(--champagne) 100%)',
        textAlign: 'center',
        // overflow: 'hidden' dihapus
      }}
    >
      {/* ── BUNGA PEMBATAS (Bridge dari RSVP ke Penutup) ── */}
      <div style={{
        position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)',
        width: '105%', minWidth: 380, pointerEvents: 'none', zIndex: 50,
      }}>
        <img src="/bunga_pembatas.png" alt="" className="float-d" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
      </div>

      {/* Bottom center flower (Sebagai penutup cantik di bawah) */}
      <div style={{
        position: 'absolute', bottom: -30, left: '50%',
        transform: 'translateX(-50%)',
        width: '75%', pointerEvents: 'none', zIndex: 0, opacity: 0.45,
      }}>
        <img src="/bunga_tengah.png" alt="" className="floral-img float-c"
          style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Arabic blessing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease }}
        >
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 22, color: 'var(--gold)',
            lineHeight: 1.8, marginBottom: 18, letterSpacing: 0.5,
          }}>
            بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا<br />
            وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
        </motion.div>

        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        >
          <div className="gold-divider" />
          <div className="gold-diamond" style={{ margin: '4px auto' }} />
          <div className="gold-divider" style={{ marginTop: 4 }} />
        </motion.div>

        {/* Doa text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 13, color: 'var(--text-soft)',
            lineHeight: 1.9, margin: '24px 0',
          }}
        >
          Semoga Allah SWT senantiasa melimpahkan rahmat, berkah, dan ridho-Nya
          kepada kami berdua, serta menjadikan rumah tangga kami penuh dengan
          cinta, kasih sayang, dan kebahagiaan yang abadi.
        </motion.p>

        {/* Thank you */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.45 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 15.5, fontStyle: 'italic',
            color: 'var(--text-soft)', marginBottom: 32,
          }}
        >
          Terima kasih atas doa dan kehadiran Bapak/Ibu/Saudara/i
          yang sangat berarti bagi kami.
        </motion.p>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease, delay: 0.6 }}
        >
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 10, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            marginBottom: 12,
          }}>
            Dengan penuh cinta,
          </p>
          <h2 style={{
            fontFamily: 'Great Vibes, cursive',
            fontSize: 58, color: 'var(--text-dark)',
            lineHeight: 1.05,
          }}>
            Khurin
          </h2>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            margin: '2px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,154,103,0.4))' }} />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={15} color="var(--gold)" fill="var(--gold)" />
            </motion.div>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(184,154,103,0.4), transparent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Great Vibes, cursive',
            fontSize: 58, color: 'var(--text-dark)',
            lineHeight: 1.05, marginBottom: 28,
          }}>
            Idzim
          </h2>
        </motion.div>

        {/* Date stamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.8 }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(184,154,103,0.08)',
            border: '1px solid var(--gold-border)',
            borderRadius: 50, padding: '8px 24px',
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 14, color: 'var(--gold)', letterSpacing: 1.5,
            }}>
              12 · 06 · 2026
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, ease, delay: 1.0 }}
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 11, color: 'var(--text-muted)',
            marginTop: 48, letterSpacing: 0.5,
            opacity: 0.7,
          }}
        >
          Made with 🤍 · White Lily Invitation
        </motion.p>
      </div>
    </div>
  )
}