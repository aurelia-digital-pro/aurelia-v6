'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1>Digital Library Login</h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer',
            background: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}
