import Head from 'next/head'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Aurelia</title>
      </Head>
      <div style={{ 
        maxWidth: '800px', 
        margin: '40px auto', 
        padding: '20px 30px', 
        fontFamily: 'Arial, sans-serif', 
        lineHeight: '1.7', 
        color: '#e5e5e5', 
        backgroundColor: '#0f0f0f',
        minHeight: '100vh'
      }}>
        <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Privacy Policy for Aurelia</h1>
        <p><strong>Last updated:</strong> May 3, 2026</p>

        <h2>1. Information We Collect</h2>
        <p>
          When you request early access to Aurelia, we collect your email address. 
          We also collect your explicit consent to receive updates from us.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your email address for one purpose only: to send you updates about the launch of Aurelia. 
          We will not sell, rent, or share your personal data with third parties for marketing purposes.
        </p>

        <h2>3. Data Storage and Security</h2>
        <p>
          Your data is stored securely using Supabase infrastructure. We take reasonable measures to protect your information.
        </p>

        <h2>4. Your Rights</h2>
        <p>
          You have the right to access, update, or request deletion of your personal data at any time. 
          To do so, please contact us.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          For any privacy-related questions or requests, please contact us at: <strong>privacy@aurelia-v6.vercel.app</strong>
        </p>
      </div>
    </>
  )
}
