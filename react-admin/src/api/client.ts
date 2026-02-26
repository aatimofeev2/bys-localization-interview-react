const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchStats() {
  const res = await fetch(`${API_URL}/store/stats`)
  if (!res.ok) throw new Error('Failed to fetch stats')
  return res.json()
}

export async function fetchSettings() {
  const res = await fetch(`${API_URL}/store/settings`)
  if (!res.ok) throw new Error('Failed to fetch settings')
  return res.json()
}

export async function updateSettings(data: Record<string, string>) {
  const res = await fetch(`${API_URL}/store/settings`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update settings')
  return res.json()
}
