import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

function EventCard({ label, day, date, time, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px', amount: 0.1 }}
      transition={{ duration: 1.1, ease, delay }}
      className="card-arch"
      style={{ marginBottom: 20, zIndex: 2, position: 'relative' }}
    >
      <p style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: 10, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--text-muted)',
        marginBottom: 10,
      }}>
        {label}
      </p>

      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--gold-light), transparent)',
        border: '1px solid var(--gold-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 18px',
      }}>
        <Calendar size={18} color="var(--gold)" />
      </div>

      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 14, color: 'var(--text-muted)',
        letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4,
      }}>
        {day}
      </p>

      <h3 style={{
        fontFamily: 'Great Vibes, cursive',
        fontSize: 38, color: 'var(--text-dark)',
        lineHeight: 1.05, marginBottom: 16,
      }}>
        {date}
      </h3>

      <div className="gold-divider" />

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, marginBottom: 10, marginTop: 14,
      }}>
        <Clock size={13} color="var(--gold)" />
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 15.5, color: 'var(--text-soft)', letterSpacing: 0.4,
        }}>
          {time}
        </p>
      </div>

      {/* ── PERBAIKAN: Struktur Alamat Dua Baris dengan Ikon di Baris Pertama ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      }}>
        {/* Baris Pertama: Ikon + Detail Jalan/RT/RW */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 2 }}>
          <MapPin size={13} color="var(--gold)" style={{ flexShrink: 0 }} />
          <p style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 13, color: 'var(--text-soft)',
            lineHeight: 1.4, textAlign: 'center',
          }}>
            Gondang RT 08 RW 02, Kepulungan
          </p>
        </div>
        
        {/* Baris Kedua: Kecamatan & Kota */}
        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: 13, color: 'var(--text-soft)',
          lineHeight: 1.4, textAlign: 'center',
        }}>
          Gempol, Pasuruan
        </p>
      </div>

      <a
        href={`https://maps.google.com/?q=Gondang+Kepulungan+Gempol+Pasuruan`}
        target="_blank"
        rel="noreferrer"
        className="btn-outline"
        style={{ fontSize: 13, padding: '9px 24px', textDecoration: 'none' }}
      >
        Lihat Lokasi
      </a>
    </motion.div>
  )
}

export default function Acara() {
  return (
    <div
      className="section-wrap"
      style={{
        background: 'linear-gradient(180deg, var(--ivory) 0%, var(--beige) 100%)',
        position: 'relative',
        paddingTop: '120px', 
        paddingBottom: '80px',
      }}
    >
      {/* ── BUNGA PEMBATAS ATAS ── */}
      <div style={{
        position: 'absolute', top: -35, left: '50%', transform: 'translateX(-50%)',
        width: '105%', minWidth: 380, pointerEvents: 'none', zIndex: 50,
      }}>
        <img src="/bunga_pembatas.png" alt="" className="float-d" style={{ width: '100%', height: 'auto', opacity: 0.95 }} />
      </div>

      {/* ── TAMBAHAN HIASAN BUNGA KIRI ATAS ── */}
      <div style={{
        position: 'absolute', top: '12%', left: -25, width: '45%', maxWidth: '200px',
        pointerEvents: 'none', zIndex: 0, opacity: 0.45, transform: 'scaleX(-1)'
      }}>
        <img src="/bunga_tengah.png" alt="" className="floral-img float-b" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* ── TAMBAHAN HIASAN BUNGA KANAN BAWAH ── */}
      <div style={{
        position: 'absolute', bottom: '15%', right: -25, width: '45%', maxWidth: '200px',
        pointerEvents: 'none', zIndex: 0, opacity: 0.45
      }}>
        <img src="/bunga_tengah.png" alt="" className="floral-img float-a" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* ── BUNGA KECIL TENGAH BAWAH ── */}
      <div style={{
        position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
        width: '60%', pointerEvents: 'none', zIndex: 0, opacity: 0.28,
      }}>
        <img src="/bunga_kecil_tengah.png" alt="" className="floral-img float-c" style={{ width: '100%', height: 'auto' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
        style={{ textAlign: 'center', marginBottom: 36, position: 'relative', zIndex: 1 }}
      >
        <p className="section-label">Agenda</p>
        <h2 className="section-title">Rangkaian Acara</h2>
        <div className="gold-divider" />
        <div className="gold-diamond" />
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <EventCard
          label="Akad Nikah"
          day="Jum'at"
          date="12 Juni 2026"
          time="19.00 WIB – Selesai"
          delay={0.1}
        />
        <EventCard
          label="Resepsi Pernikahan"
          day="Sabtu"
          date="13 Juni 2026"
          time="16.00 WIB – Selesai"
          delay={0.3}
        />
      </div>
    </div>
  )
}