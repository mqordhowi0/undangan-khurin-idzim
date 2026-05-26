import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Users, UserCheck, UserX } from 'lucide-react'
import { supabase } from '../supabase' 

const ease = [0.16, 1, 0.3, 1]

export default function RSVP() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  const [form, setForm] = useState({ name: '', attend: 'hadir', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [guests, setGuests] = useState([]) 

  // AMBIL DATA DARI POSTGRESQL SAAT KOMPONEN DIMUAT
  useEffect(() => {
    fetchRSVPs()
  }, [])

  const fetchRSVPs = async () => {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .eq('is_visible', true) 
      .order('created_at', { ascending: false })

    if (data) setGuests(data)
  }

  // FUNGSI SUBMIT BARU (Ke Supabase)
  const handleSubmit = async () => {
    if (!form.name.trim()) return

    const { error } = await supabase
      .from('rsvps')
      .insert([{ 
        name: form.name, 
        attend: form.attend, 
        message: form.message,
        is_visible: true 
      }])

    if (!error) {
      setSubmitted(true)
      fetchRSVPs() 
      setTimeout(() => {
        setSubmitted(false)
        setForm({ name: '', attend: 'hadir', message: '' })
      }, 3000)
    }
  }

  const hadir  = guests.filter(g => g.attend === 'hadir').length
  const tidak  = guests.filter(g => g.attend === 'tidak').length

  const inputStagger = (i) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease, delay: 0.1 + i * 0.12 },
  })

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
      {/* ── BUNGA PEMBATAS ── */}
      <div style={{
        position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)',
        width: '105%', minWidth: 380, pointerEvents: 'none', zIndex: 50,
      }}>
        <img src="/bunga_pembatas.png" alt="" className="float-d" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
        style={{ textAlign: 'center', marginBottom: 36, position: 'relative', zIndex: 1 }}
      >
        <p className="section-label">Konfirmasi Kehadiran</p>
        <h2 className="section-title">RSVP</h2>
        <div className="gold-divider" />
        <div className="gold-diamond" />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        style={{
          display: 'flex', gap: 12, marginBottom: 28, position: 'relative', zIndex: 1,
        }}
      >
        {[
          { icon: <Users size={16} color="var(--gold)" />,   label: 'Total',         count: guests.length, bg: 'rgba(184,154,103,0.08)' },
          { icon: <UserCheck size={16} color="#6B9E6B" />,   label: 'Hadir',         count: hadir,          bg: 'rgba(107,158,107,0.08)' },
          { icon: <UserX size={16} color="#9E6B6B" />,       label: 'Tidak Hadir',   count: tidak,          bg: 'rgba(158,107,107,0.08)' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: s.bg,
            borderRadius: 16, padding: '14px 10px',
            border: '1px solid rgba(184,154,103,0.15)',
            textAlign: 'center',
          }}>
            <div style={{ margin: '0 auto 6px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 24, fontWeight: 600, color: 'var(--text-dark)',
            }}>{s.count}</div>
            <div style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 10.5, color: 'var(--text-muted)',
              letterSpacing: 0.5,
            }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Form */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="card-white"
              style={{ textAlign: 'center', padding: '40px 24px' }}
            >
              <div style={{ fontSize: 40, marginBottom: 14 }}>🌸</div>
              <p style={{
                fontFamily: 'Great Vibes, cursive',
                fontSize: 34, color: 'var(--gold)', marginBottom: 10,
              }}>
                Jazākallāhu Khayran
              </p>
              <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: 13, color: 'var(--text-muted)',
              }}>
                Konfirmasi kehadiran Anda telah kami terima. Terima kasih 🤍
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" className="card-white">
              {/* Name */}
              <motion.div {...inputStagger(0)} style={{ marginBottom: 14 }}>
                <label style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 11, color: 'var(--text-muted)',
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  display: 'block', marginBottom: 6,
                }}>
                  Nama Lengkap
                </label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                />
              </motion.div>

              {/* Attendance */}
              <motion.div {...inputStagger(1)} style={{ marginBottom: 14 }}>
                <label style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 11, color: 'var(--text-muted)',
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  display: 'block', marginBottom: 6,
                }}>
                  Konfirmasi Kehadiran
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['hadir', 'tidak'].map(v => (
                    <button
                      key={v}
                      onClick={() => setForm(p => ({ ...p, attend: v }))}
                      style={{
                        flex: 1, padding: '10px',
                        borderRadius: 12, border: '1.5px solid',
                        borderColor: form.attend === v ? 'var(--gold)' : 'var(--gold-border)',
                        background: form.attend === v ? 'rgba(184,154,103,0.1)' : 'transparent',
                        fontFamily: 'Nunito, sans-serif', fontSize: 13,
                        color: form.attend === v ? 'var(--gold)' : 'var(--text-muted)',
                        fontWeight: form.attend === v ? 600 : 400,
                        transition: 'all 0.25s',
                      }}
                    >
                      {v === 'hadir' ? '✓  Hadir' : '✗  Tidak Hadir'}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Message */}
              <motion.div {...inputStagger(2)} style={{ marginBottom: 20 }}>
                <label style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: 11, color: 'var(--text-muted)',
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  display: 'block', marginBottom: 6,
                }}>
                  Ucapan & Doa
                </label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tulis ucapan & doa untuk kedua mempelai..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                />
              </motion.div>

              <motion.div {...inputStagger(3)}>
                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={!form.name.trim()}
                >
                  <Send size={15} />
                  Kirim Konfirmasi
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guest messages */}
        {guests.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: 24 }}
          >
            <p style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: 11, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              textAlign: 'center', marginBottom: 14,
            }}>
              Ucapan Tamu
            </p>
            <div style={{ maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {guests.map((g, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: 14, padding: '14px 16px',
                  border: '1px solid var(--gold-border)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 14.5, fontWeight: 600, color: 'var(--text-dark)',
                    }}>
                      {g.name}
                    </span>
                    <span style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: 10, color: g.attend === 'hadir' ? '#6B9E6B' : '#9E6B6B',
                      fontWeight: 600,
                    }}>
                      {g.attend === 'hadir' ? '✓ Hadir' : '✗ Tidak Hadir'}
                    </span>
                  </div>
                  {g.message && (
                    <p style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.65,
                    }}>
                      "{g.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}