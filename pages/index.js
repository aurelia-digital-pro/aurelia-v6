import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('Loading...')
    
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    
    const data = await res.json()
    if (res.ok) {
      setStatus('Success! Check your email')
      setEmail('')
    } else {
      setStatus('Error: ' + data.error)
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>AURELIA v6</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit">Request</button>
      </form>
      <p>{status}</p>
    </div>
  )
}
