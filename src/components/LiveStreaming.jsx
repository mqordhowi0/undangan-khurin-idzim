import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Youtube, Calendar, Clock } from 'lucide-react'
import { supabase } from '../supabase'

const ease = [0.16, 1, 0.3, 1]

export default function LiveStreaming() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [liveLink, setLiveLink] = useState('#')

  // Ambil link streaming dari Supabase
  useEffect(() => {
    const fetchLink = async () => {
      const { data } = await supabase.from('settings').select('live_link').eq('id', 1).single()
      if (data && data.live_link) setLiveLink(data.live_link)
    }
    fetchLink()
  }, [])

  return (
    <div
      ref={ref}
      className="section-wrap"
      style={{
        background: 'linear-gradient(180deg, var(--beige) 0%, var(--ivory) 100%)',
        position: 'relative',
        paddingTop: '60px',
      }}
    >
      <div style={{
        position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)',
        width: '105%', minWidth: 380, pointerEvents: 'none', zIndex: 50,
      }}>
        <img src="/bunga_pembatas.png" alt="" className="float-d" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        style={{ textAlign: 'center', marginBottom: 36, position: 'relative', zIndex: 1 }}
      >
        <p className="section-label">Saksikan Bersama</p>
        <h2 className="section-title">Live Streaming</h2>
        <div className="gold-divider" />
        <div className="gold-diamond" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        className="card-arch"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: 'linear-gradient(90deg, transparent, #FF0000, transparent)',
          opacity: 0.6,
        }} />

        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF4444, #CC0000)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 4px 20px rgba(255,0,0,0.25)',
        }}>
          <Youtube size={24} color="#fff" fill="#fff" />
        </div>

        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 18, fontStyle: 'italic',
          color: 'var(--text-dark)', marginBottom: 6,
        }}>
          Tidak bisa hadir?
        </p>
        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: 13, color: 'var(--text-muted)',
          marginBottom: 22, lineHeight: 1.7,
        }}>
          Saksikan momen bahagia kami secara langsung melalui siaran live streaming.
        </p>

        <div className="gold-divider" />

        <div style={{
          display: 'flex', justifyContent: 'center', gap: 28, marginTop: 20, marginBottom: 26,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={13} color="var(--gold)" />
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 14, color: 'var(--text-soft)',
            }}>
              12 Juni 2026
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clock size={13} color="var(--gold)" />
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 14, color: 'var(--text-soft)',
            }}>
              19.00 WIB
            </span>
          </div>
        </div>

        {/* Link YouTube sekarang dikendalikan oleh Database */}
        <a
          href={liveLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #FF4444, #CC0000)',
            color: '#fff', border: 'none', borderRadius: 50,
            padding: '12px 32px',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 16, fontWeight: 600,
            boxShadow: '0 4px 20px rgba(255,0,0,0.28)',
            textDecoration: 'none',
            transition: 'all 0.3s',
          }}
        >
          <Youtube size={16} />
          Tonton Live
        </a>
      </motion.div>
    </div>
  )
}