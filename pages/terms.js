import Head from 'next/head'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Aurelia</title>
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
        <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Terms of Service for Aurelia</h1>
        <p><strong>Last updated:</strong> May 3, 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using Aurelia, you agree to be bound by these Terms. If you disagree, do not use the service.</p>

        <h2>2. Description of Service</h2>
        <p>Aurelia is an AI-powered tool for image creation and editing. The service is provided "as is" without warranties of any kind.</p>

        <h2>3. User Conduct</h2>
        <p>You agree not to use the service to create, upload, or share any content that is illegal, harmful, abusive, or infringes on the rights of others. You are solely responsible for the content you generate.</p>

        <h2>4. Intellectual Property</h2>
        <p>You retain ownership of the images you create using Aurelia. However, you are responsible for ensuring you have the rights to any source images you upload.</p>

        <h2>5. Termination</h2>
        <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.</p>

        <h2>6. Limitation of Liability</h2>
        <p>In no event shall Aurelia be liable for any indirect, incidental, or consequential damages arising out of the use of the service.</p>

        <h2>7. Governing Law</h2>
        <p>These Terms shall be governed by the laws of Tunisia.</p>
        
        <h2>8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at: <strong>terms@aurelia-v6.vercel.app</strong></p>
      </div>
    </>
  )
}
