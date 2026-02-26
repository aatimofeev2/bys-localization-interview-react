import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

const s = {
  header: { background: '#1a1a2e', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } as React.CSSProperties,
  nav: { display: 'flex', gap: '1.5rem' } as React.CSSProperties,
  navLink: { color: '#ccc', textDecoration: 'none', fontSize: '0.95rem' } as React.CSSProperties,
  hero: { background: 'linear-gradient(135deg, #1a1a2e, #16213e)', color: 'white', padding: '4rem 2rem', textAlign: 'center' } as React.CSSProperties,
  heroTitle: { fontSize: '2.5rem', marginBottom: '1rem' } as React.CSSProperties,
  heroSub: { color: '#aaa', fontSize: '1.1rem', marginBottom: '2rem' } as React.CSSProperties,
  heroBtn: { background: '#e94560', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: 4, fontSize: '1rem', cursor: 'pointer' } as React.CSSProperties,
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', padding: '2rem', maxWidth: 1200, margin: '0 auto' } as React.CSSProperties,
  card: { background: 'white', borderRadius: 8, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' } as React.CSSProperties,
  price: { color: '#e94560', fontSize: '1.2rem', fontWeight: 700, margin: '0.5rem 0' } as React.CSSProperties,
  desc: { color: '#666', fontSize: '0.9rem', marginBottom: '1rem' } as React.CSSProperties,
  cartBtn: { background: '#1a1a2e', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 4, cursor: 'pointer', width: '100%' } as React.CSSProperties,
  footer: { background: '#1a1a2e', color: '#666', textAlign: 'center', padding: '1.5rem', marginTop: '3rem' } as React.CSSProperties,
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((r) => r.json())
      .then((d) => setProducts(d.products))
  }, [])

  return (
    <>
      <header style={s.header}>
        <div style={{ fontWeight: 700, fontSize: '1.4rem' }}>BYS Store</div>
        <nav style={s.nav}>
          <a href="#" style={s.navLink}>Shop</a>
          <a href="#" style={s.navLink}>My Orders</a>
          <a href="#" style={s.navLink}>Account</a>
          <a href="#" style={s.navLink}>Help & Support</a>
        </nav>
      </header>

      <section style={s.hero}>
        <h1 style={s.heroTitle}>Welcome to BYS Store</h1>
        <p style={s.heroSub}>Find the best products for your dropshipping business</p>
        <button style={s.heroBtn}>Browse Products</button>
      </section>

      <main>
        <div style={s.grid}>
          {products.map((p) => (
            <div key={p.id} style={s.card}>
              <h3>{p.name}</h3>
              <div style={s.price}>${p.price.toFixed(2)}</div>
              <p style={s.desc}>Product Description: {p.name}</p>
              <button style={s.cartBtn} onClick={() => alert('Added to Cart!')}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer style={s.footer}>
        <p>© 2024 BYS Store. All rights reserved. Free shipping on orders over $50.</p>
      </footer>
    </>
  )
}
