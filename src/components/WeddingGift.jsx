import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gift, Copy, Check } from 'lucide-react'
import { supabase } from '../supabase'

const ease = [0.16, 1, 0.3, 1]

function BankCard({ bank, holder, account, inView, delay }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('input')
      el.value = account
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Mencegah error jika data belum termuat
  if (!bank || !account) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease, delay }}
      className="card-white"
      style={{ marginBottom: 16 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'linear-gradient(135deg, var(--gold), #2563EB)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 14px rgba(30,58,138,0.3)',
        }}>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 11, color: '#fff' }}>
            {bank.slice(0,3).toUpperCase()}
          </span>
        </div>
        <div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 600, color: 'var(--text-dark)' }}>
            Bank {bank}
          </p>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 11.5, color: 'var(--text-muted)' }}>
            a.n. {holder}
          </p>
        </div>
      </div>

      <div style={{
        background: 'var(--warm-white)', borderRadius: 12, padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: '1px solid var(--gold-border)', marginBottom: 14,
      }}>
        <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 17, color: 'var(--text-dark)', letterSpacing: 2 }}>
          {account}
        </span>
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.9 }}
          style={{
            background: copied ? 'var(--sage)' : 'var(--gold)',
            color: '#fff', border: 'none', borderRadius: 8, padding: '6px 12px',
            display: 'flex', alignItems: 'center', gap: 5,
            fontFamily: 'Nunito, sans-serif', fontSize: 11.5, fontWeight: 600,
            transition: 'background 0.3s',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Tersalin!' : 'Salin'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function WeddingGift() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [dbSettings, setDbSettings] = useState(null)

  // Ambil settingan dari Supabase
  useEffect(() => {
    const fetchBankData = async () => {
      const { data } = await supabase.from('settings').select('*').eq('id', 1).single()
      if (data) setDbSettings(data)
    }
    fetchBankData()
  }, [])

  return (
    <div
      ref={ref}
      className="section-wrap"
      style={{
        background: 'linear-gradient(180deg, var(--ivory) 0%, var(--warm-white) 100%)',
        position: 'relative', paddingTop: '60px', 
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
        <div style={{
          width: 48, height: 48, borderRadius: '50%', background: 'rgba(30,58,138,0.06)',
          border: '1px solid var(--gold-border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px',
        }}>
          <Gift size={20} color="var(--gold)" />
        </div>
        <p className="section-label">Hadiah Pernikahan</p>
        <h2 className="section-title">Wedding Gift</h2>
        <div className="gold-divider" />
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75, marginTop: 12 }}>
          Doa dan kehadiran Anda adalah anugerah terindah bagi kami.
          Namun jika Anda ingin memberikan tanda kasih, dapat melalui rekening berikut.
        </p>
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Datanya sekarang di-render dari State DB */}
        {dbSettings && (
          <BankCard 
            bank={dbSettings.bank} 
            holder={dbSettings.holder} 
            account={dbSettings.account} 
            inView={inView} 
            delay={0.2} 
          />
        )}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
        style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 13.5, fontStyle: 'italic',
          color: 'var(--text-muted)', textAlign: 'center', position: 'relative', zIndex: 1, marginTop: 8,
        }}
      >
        Jazākumullāhu Khayran Katsīran 🤍
      </motion.p>
    </div>
  )
}