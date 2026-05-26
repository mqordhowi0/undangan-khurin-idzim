import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function ConfigPage() {
  const [rsvps, setRsvps] = useState([])
  const [settings, setSettings] = useState({ bank: '', holder: '', account: '', live_link: '' })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchAllRsvps()
    fetchSettings()
  }, [])

  // --- AMBIL DATA ---
  const fetchAllRsvps = async () => {
    const { data } = await supabase.from('rsvps').select('*').order('created_at', { ascending: false })
    if (data) setRsvps(data)
  }

  const fetchSettings = async () => {
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single()
    if (data) setSettings(data)
  }

  // --- FUNGSI RSVP (CRUD) ---
  const toggleVisibility = async (id, currentStatus) => {
    await supabase.from('rsvps').update({ is_visible: !currentStatus }).eq('id', id)
    fetchAllRsvps()
  }

  const deleteRsvp = async (id) => {
    if (window.confirm('Yakin ingin menghapus pesan ini?')) {
      await supabase.from('rsvps').delete().eq('id', id)
      fetchAllRsvps()
    }
  }

  const editRsvpMessage = async (id, currentMessage) => {
    const newMessage = window.prompt('Edit pesan tamu:', currentMessage)
    if (newMessage !== null && newMessage !== currentMessage) {
      await supabase.from('rsvps').update({ message: newMessage }).eq('id', id)
      fetchAllRsvps()
    }
  }

  // --- FUNGSI SETTINGS ---
  const handleSaveSettings = async () => {
    setIsSaving(true)
    const { error } = await supabase.from('settings').update({
      bank: settings.bank,
      holder: settings.holder,
      account: settings.account,
      live_link: settings.live_link
    }).eq('id', 1)
    
    setIsSaving(false)
    if (!error) alert('Pengaturan berhasil disimpan!')
    else alert('Gagal menyimpan pengaturan.')
  }

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'Nunito, sans-serif' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 30 }}>
        Dashboard Admin Undangan
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
        
        {/* ─── KIRI: PENGATURAN (BANK & STREAMING) ─── */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: 18, marginBottom: 20, color: '#1E3A8A', fontWeight: 'bold' }}>Pengaturan Undangan</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 'bold', color: '#64748b' }}>NAMA BANK</label>
              <input type="text" value={settings.bank} onChange={e => setSettings({...settings, bank: e.target.value})} 
                style={{ width: '100%', padding: '10px', marginTop: 4, borderRadius: 6, border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 'bold', color: '#64748b' }}>NAMA PEMILIK REKENING</label>
              <input type="text" value={settings.holder} onChange={e => setSettings({...settings, holder: e.target.value})} 
                style={{ width: '100%', padding: '10px', marginTop: 4, borderRadius: 6, border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 'bold', color: '#64748b' }}>NOMOR REKENING</label>
              <input type="text" value={settings.account} onChange={e => setSettings({...settings, account: e.target.value})} 
                style={{ width: '100%', padding: '10px', marginTop: 4, borderRadius: 6, border: '1px solid #cbd5e1' }} />
            </div>
            <hr style={{ borderColor: '#f1f5f9' }} />
            <div>
              <label style={{ fontSize: 12, fontWeight: 'bold', color: '#64748b' }}>LINK LIVE STREAMING (YOUTUBE)</label>
              <input type="text" value={settings.live_link} onChange={e => setSettings({...settings, live_link: e.target.value})} 
                style={{ width: '100%', padding: '10px', marginTop: 4, borderRadius: 6, border: '1px solid #cbd5e1' }} />
            </div>
            
            <button onClick={handleSaveSettings} disabled={isSaving}
              style={{ padding: '12px', background: '#1E3A8A', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', marginTop: 10 }}>
              {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </button>
          </div>
        </div>

        {/* ─── KANAN: MANAJEMEN RSVP (CRUD) ─── */}
        <div style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: 18, marginBottom: 20, color: '#1E3A8A', fontWeight: 'bold' }}>Manajemen RSVP & Ucapan</h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: 12 }}>Nama</th>
                <th style={{ padding: 12 }}>Kehadiran</th>
                <th style={{ padding: 12 }}>Pesan</th>
                <th style={{ padding: 12 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((guest) => (
                <tr key={guest.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: 12, fontWeight: 'bold' }}>{guest.name}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ color: guest.attend === 'hadir' ? 'green' : 'red', fontWeight: 'bold' }}>
                      {guest.attend.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: 12, maxWidth: 200, color: '#475569' }}>{guest.message}</td>
                  <td style={{ padding: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <button onClick={() => toggleVisibility(guest.id, guest.is_visible)}
                      style={{ padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', background: guest.is_visible ? '#dcfce7' : '#fee2e2', color: guest.is_visible ? '#166534' : '#991b1b', fontSize: 12 }}>
                      {guest.is_visible ? 'Tampil' : 'Sembunyi'}
                    </button>
                    <button onClick={() => editRsvpMessage(guest.id, guest.message)}
                      style={{ background: '#fef08a', color: '#854d0e', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
                      Edit
                    </button>
                    <button onClick={() => deleteRsvp(guest.id)}
                      style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}