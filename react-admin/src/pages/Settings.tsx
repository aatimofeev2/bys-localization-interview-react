import { useEffect, useState } from 'react'
import { fetchSettings, updateSettings } from '../api/client'

interface Settings {
  store_name: string
  locale: string
  currency: string
  timezone: string
}

export default function Settings() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings().then(setSettings)
  }, [])

  function handleChange(key: keyof Settings, val: string) {
    setSettings((s) => s ? { ...s, [key]: val } : s)
  }

  async function handleSave() {
    if (!settings) return
    await updateSettings({ locale: settings.locale, currency: settings.currency, timezone: settings.timezone })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!settings) return <p style={{ padding: '2rem' }}>Loading...</p>

  const row: React.CSSProperties = { marginBottom: '1.5rem' }
  const lbl: React.CSSProperties = { display: 'block', marginBottom: '0.4rem', fontWeight: 500, color: '#444' }
  const input: React.CSSProperties = { padding: '0.6rem', border: '1px solid #ddd', borderRadius: 4, width: 280, fontSize: '0.95rem' }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Store Settings</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Configure your store language and regional preferences.</p>

      <div style={{ background: 'white', padding: '2rem', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', maxWidth: 500 }}>
        <div style={row}>
          <label style={lbl}>Store Name</label>
          <input style={{ ...input, background: '#f5f5f5' }} value={settings.store_name} disabled />
          <p style={{ color: '#888', fontSize: '0.8rem', marginTop: 4 }}>Contact support to change store name.</p>
        </div>

        <div style={row}>
          <label style={lbl}>Language / Locale</label>
          <select style={input} value={settings.locale} onChange={(e) => handleChange('locale', e.target.value)}>
            <option value="en">English (en)</option>
            <option value="es">Spanish (es)</option>
            <option value="fr">French (fr)</option>
            <option value="de">German (de)</option>
            <option value="he">Hebrew (he)</option>
            <option value="ru">Russian (ru)</option>
          </select>
        </div>

        <div style={row}>
          <label style={lbl}>Currency</label>
          <select style={input} value={settings.currency} onChange={(e) => handleChange('currency', e.target.value)}>
            <option value="USD">USD — US Dollar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="ILS">ILS — Israeli Shekel</option>
          </select>
        </div>

        <div style={row}>
          <label style={lbl}>Timezone</label>
          <input style={input} value={settings.timezone} onChange={(e) => handleChange('timezone', e.target.value)} />
        </div>

        <button
          onClick={handleSave}
          style={{ background: '#1a1a2e', color: 'white', border: 'none', padding: '0.7rem 1.5rem', borderRadius: 4, cursor: 'pointer', fontSize: '0.95rem' }}
        >
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
