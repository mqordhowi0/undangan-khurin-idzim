import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Undangan from './Undangan'
import ConfigPage from './ConfigPage'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route dilempar ke /cewe kalau ada yang buka link tanpa embel-embel */}
        <Route path="/" element={<Navigate to="/khurin" replace />} />
        
        {/* Melempar variant "cewe" atau "cowo" ke komponen Undangan */}
        <Route path="/khurin" element={<Undangan variant="khurin" />} />
        <Route path="/idzim" element={<Undangan variant="idzim" />} />
        
        <Route path="/config" element={<ConfigPage />} />
      </Routes>
    </Router>
  )
}