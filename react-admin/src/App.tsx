import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Settings from './pages/Settings'

const navStyle: React.CSSProperties = {
  display: 'flex', gap: '1rem', padding: '1rem 2rem',
  background: '#1a1a2e', alignItems: 'center',
}
const linkStyle = { color: '#aaa', textDecoration: 'none', fontSize: '0.95rem' }
const activeStyle = { color: 'white', fontWeight: 600 }

export default function App() {
  return (
    <>
      <nav style={navStyle}>
        <span style={{ color: 'white', fontWeight: 700, marginRight: '1rem' }}>BYS Admin</span>
        <NavLink to="/" end style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/products" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
          Products
        </NavLink>
        <NavLink to="/settings" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle}>
          Store Settings
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}
