import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/client'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.products))
      .catch(() => setError('Failed to load products'))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Product Catalog</h1>
        <button style={{ background: '#1a1a2e', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 4, cursor: 'pointer' }}>
          Add New Product
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Product Name</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Price</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Stock</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderTop: '1px solid #f0f0f0' }}>
              <td style={{ padding: '1rem' }}>{p.name}</td>
              <td style={{ padding: '1rem', color: '#e94560', fontWeight: 600 }}>${p.price.toFixed(2)}</td>
              <td style={{ padding: '1rem' }}>
                <span style={{ background: p.stock > 50 ? '#e8f5e9' : '#fff3e0', color: p.stock > 50 ? '#388e3c' : '#f57c00', padding: '0.2rem 0.6rem', borderRadius: 12, fontSize: '0.85rem' }}>
                  {p.stock} in stock
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <button style={{ background: 'none', border: '1px solid #ddd', padding: '0.3rem 0.8rem', borderRadius: 4, cursor: 'pointer', marginRight: 8 }}>Edit</button>
                <button style={{ background: 'none', border: '1px solid #ffcdd2', color: '#c62828', padding: '0.3rem 0.8rem', borderRadius: 4, cursor: 'pointer' }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
