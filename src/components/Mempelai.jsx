import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

// Komponen dipisah agar tiap foto punya triggernya masing-masing
function PersonCard({ img, name, fullName, role, parents, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }} 
      whileInView={{ opacity: 1, y: 0 }}
      // once: false agar animasi kembali berjalan saat di-scroll ke atas/bawah
      // amount: 0.1 agar animasi terpicu ketika 10% elemen sudah masuk layar
      viewport={{ once: false, margin: '-40px', amount: 0.1 }} 
      transition={{ duration: 1.2, ease: 'easeOut', delay }} 
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
    >
      <motion.div
        className="float-a"
        style={{
          width: 168, height: 200, borderRadius: '50% 50% 38% 38% / 44% 44% 36% 36%',
          overflow: 'hidden', border: '2px solid rgba(184,154,103,0.30)',
          background: 'var(--beige)', marginBottom: 20, flexShrink: 0,
          boxShadow: '0 8px 40px rgba(184,154,103,0.15)'
        }}
      >
        <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
      </motion.div>

      <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>{role}</p>
      <h2 style={{ fontFamily: 'Great Vibes, cursive', fontSize: 44, color: 'var(--text-dark)', lineHeight: 1.05, marginBottom: 4 }}>{name}</h2>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14.5, color: 'var(--text-soft)', marginBottom: 10 }}>{fullName}</p>
      
      {/* whiteSpace: 'pre-line' memastikan karakter \n membuat teks turun baris */}
      <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{parents}</p>
    </motion.div>
  )
}

export default function Mempelai() {
  return (
    <div
      className="section-wrap"
      style={{ background: 'var(--warm-white)', position: 'relative', paddingTop: '60px', paddingBottom: '80px' }}
    >
      {/* ── HIASAN BUNGA POJOK ATAS KANAN ── */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', maxWidth: '170px', pointerEvents: 'none', zIndex: 0, opacity: 0.65 }}>
        <img src="/bunga_pojok.png" alt="" className="floral-img float-a" style={{ width: '100%' }} />
      </div>

      {/* ── HIASAN BUNGA POJOK BAWAH KIRI ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '45%', maxWidth: '170px', pointerEvents: 'none', zIndex: 0, opacity: 0.65, transform: 'rotate(180deg)' }}>
        <img src="/bunga_pojok.png" alt="" className="floral-img float-b" style={{ width: '100%' }} />
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: 50, position: 'relative', zIndex: 1 }}
      >
        <p className="section-label">Mempelai</p>
        <h2 className="section-title">Yang Berbahagia</h2>
        <div className="gold-divider" />
        <div className="gold-diamond" />
      </motion.div>

      {/* Konten Mempelai */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, position: 'relative', zIndex: 1 }}>
        
        {/* Mempelai Wanita */}
        <PersonCard 
          img="/pengantin_wanita.png" 
          name="Khurin" 
          fullName="Khurin Dian Safitri" 
          role="Mempelai Wanita" 
          parents={"Putri dari Bpk. Subairi\n& Ibu Alfiyah"} 
          delay={0} 
        />

        {/* Pembatas Tengah (Ikon Heart & Aksen Bunga Tengah) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '-20px', amount: 0.1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ textAlign: 'center', position: 'relative', margin: '10px 0' }}
        >
          {/* Efek hiasan bunga di belakang ikon hati */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '220px', pointerEvents: 'none', zIndex: 0, opacity: 0.55 }}>
            <img src="/bunga_tengah.png" alt="" className="floral-img pulse-soft" style={{ width: '100%' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1, width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), #D4B888)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 6px 24px rgba(184,154,103,0.35)' }}>
            <Heart size={22} color="#fff" fill="#fff" />
          </div>
        </motion.div>

        {/* Mempelai Pria */}
        <PersonCard 
          img="/pengantin_pria.png" 
          name="Idzim" 
          fullName="Muhammad Idzim Dimas Aril" 
          role="Mempelai Pria" 
          parents={"Putra dari Bpk. H. Suwarno\n& Ibu Hj. Lilik Utammimah"} 
          delay={0.2} 
        />
        
      </div>
    </div>
  )
}