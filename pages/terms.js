// pages/terms.js
import Head from 'next/head'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Aurelia Digital Library</title>
        <meta name="description" content="Terms of Service for Aurelia Digital Library." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.updated}>Last updated: May 3, 2026</p>

          <section style={styles.section}>
            <h2 style={styles.heading}>1. Acceptance of Terms</h2>
            <p style={styles.text}>
              By accessing or using Aurelia Digital Library, you agree to be bound by these Terms of Service. If you do not agree, please do not use the website.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. Description of Service</h2>
            <p style={styles.text}>
              Aurelia Digital Library is a digital platform that provides access to public domain materials, open knowledge resources, educational references, and early access updates related to the project. The service is provided "as is" without warranties of any kind.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. User Conduct</h2>
            <p style={styles.text}>
              You agree not to misuse the website, attempt unauthorized access, distribute harmful code, submit false information, or use the service for unlawful purposes. You are solely responsible for your use of the service.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. Intellectual Property</h2>
            <p style={styles.text}>
              Original branding, design, text, and platform elements of Aurelia Digital Library are protected by applicable intellectual property laws. Public domain and open-license materials remain subject to their respective licenses or legal status.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>5. Termination</h2>
            <p style={styles.text}>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>6. Limitation of Liability</h2>
            <p style={styles.text}>
              In no event shall Aurelia Digital Library be liable for any indirect, incidental, or consequential damages arising out of the use of the service.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>7. Governing Law</h2>
            <p style={styles.text}>
              These Terms shall be governed by the laws of Tunisia.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>8. Contact Us</h2>
            <p style={styles.text}>
              If you have any questions about these Terms, please contact us at: digital.aurelia.2026@gmail.com
            </p>
          </section>
        </div>
      </main>
    </>
  )
}

const styles = {
  main: { minHeight: '100vh', background: '#0f172a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px 20px' },
  container: { maxWidth: '820px', margin: '0 auto', background: '#111827', border: '1px solid #1f2937', borderRadius: '14px', padding: '40px' },
  title: { fontSize: '2.4rem', fontWeight: '800', marginBottom: '10px' },
  updated: { color: '#94a3b8', marginBottom: '30px', fontSize: '0.95rem' },
  section: { marginBottom: '28px' },
  heading: { fontSize: '1.35rem', fontWeight: '700', marginBottom: '10px', color: '#60a5fa' },
  text: { color: '#d1d5db', lineHeight: '1.8', fontSize: '1rem' }
}
