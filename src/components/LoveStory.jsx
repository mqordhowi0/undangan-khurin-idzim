import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

const stories = [
  {
    year: '2018',
    title: 'Pertemuan Pertama',
    body: 'Sebuah pertemuan sederhana yang tak terduga menjadi awal dari sebuah cerita indah yang Allah tuliskan untuk kami berdua.',
    emoji: '🌸',
  },
  {
    year: '2020',
    title: 'Saling Mengenal',
    body: 'Hari-hari berlalu dengan percakapan yang bermakna, tawa yang tulus, dan hati yang perlahan saling terikat dalam ukhuwah dan rasa.',
    emoji: '🌿',
  },
  {
    year: '2022',
    title: 'Meyakinkan Hati',
    body: 'Dengan doa dan restu orang tua, kami meyakinkan hati bahwa inilah jalan yang Allah ridhoi – melangkah bersama menuju mahligai rumah tangga.',
    emoji: '🤍',
  },
  {
    year: '2026',
    title: 'Menuju Halal',
    body: 'Dengan penuh syukur dan kebahagiaan, kami siap menyempurnakan separuh agama. Bismillah, semoga Allah meridhoi perjalanan kami.',
    emoji: '💍',
  },
]

function StoryCard({ story, index }) {
  // Semua animasi datang dari kanan sekarang agar seragam
  return (
    <div style={{ position: 'relative', marginBottom: 40, display: 'flex', alignItems: 'flex-start', paddingLeft: '40px' }}>
      
      {/* Titik timeline dipindah ke kiri */}
      <div className="timeline-dot" style={{ left: 16, top: 12, transform: 'translateX(-50%)' }}>
        <span style={{ fontSize: 11 }}>{story.emoji}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-40px', amount: 0.1 }} 
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="card-white"
        style={{
          width: '100%', // KUNCI FIX: Menggunakan seluruh sisa lebar layar agar tidak ceper
          textAlign: 'left', // Teks dibuat rata kiri agar rapi
        }}
      >
        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: 10, letterSpacing: '2px',
          textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: 6,
        }}>
          {story.year}
        </p>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 16.5, fontWeight: 600,
          color: 'var(--text-dark)', marginBottom: 8, lineHeight: 1.2,
        }}>
          {story.title}
        </p>
        <p style={{
          fontFamily: 'Nunito, sans-serif',
          fontSize: 12.5, color: 'var(--text-muted)',
          lineHeight: 1.6,
        }}>
          {story.body}
        </p>
      </motion.div>
    </div>
  )
}

export default function LoveStory() {
  return (
    <div
      className="section-wrap"
      style={{
        background: 'var(--warm-white)',
        position: 'relative',
        paddingTop: '120px', 
        paddingBottom: '80px',
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
        style={{ textAlign: 'center', marginBottom: 44, position: 'relative', zIndex: 1 }}
      >
        <p className="section-label">Perjalanan Cinta</p>
        <h2 className="section-title">Love Story</h2>
        <div className="gold-divider" />
        <div className="gold-diamond" />
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }} className="timeline-container">
        {/* Garis timeline digeser ke kiri (16px dari tepi) */}
        <div className="timeline-line" style={{ left: 16, transform: 'translateX(-50%)' }} />
        
        {stories.map((story, i) => (
          <StoryCard key={i} story={story} index={i} />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '-20px' }}
          transition={{ duration: 0.8, ease }}
          className="timeline-dot"
          style={{
            position: 'relative', left: 16, transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, var(--gold), #2563EB)',
            border: 'none', width: 32, height: 32, bottom: 'unset', marginTop: '-20px'
          }}
        >
          <Heart size={14} color="#fff" fill="#fff" />
        </motion.div>
      </div>
    </div>
  )
}