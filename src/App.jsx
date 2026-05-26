// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Undangan from './Undangan' // Kita pindahkan isi App lama ke sini
import ConfigPage from './ConfigPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Undangan />} />
        <Route path="/config" element={<ConfigPage />} />
      </Routes>
    </Router>
  )
}