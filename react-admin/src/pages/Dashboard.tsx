import { useEffect, useState } from 'react'
import { fetchStats } from '../api/client'

const card: React.CSSProperties = {
  background: 'white', borderRadius: 8, padding: '1.5rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}
const label: React.CSSProperties = { color: '#888', fontSize: '0.85rem', marginBottom: '0.4rem' }
const value: React.CSSProperties = { fontSize: '2rem', fontWeight: 700, color: '#1a1a2e' }

export default function Dashboard() {
  const [stats, setStats] = useState<Record<string, number> | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStats().then(setStats).catch(() => setError('Failed to load stats'))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Store Overview</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Welcome back! Here is what is happening today.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={card}>
          <div style={label}>Total Products</div>
          <div style={value}>{stats?.total_products ?? '—'}</div>
        </div>
        <div style={card}>
          <div style={label}>Total Orders</div>
          <div style={value}>{stats?.total_orders ?? '—'}</div>
        </div>
        <div style={card}>
          <div style={label}>Revenue Today</div>
          <div style={value}>${stats?.revenue_today?.toFixed(2) ?? '—'}</div>
        </div>
        <div style={card}>
          <div style={label}>Active Users</div>
          <div style={value}>{stats?.active_users ?? '—'}</div>
        </div>
      </div>
    </div>
  )
}
