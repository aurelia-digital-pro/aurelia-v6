// pages/terms.js
import Head from 'next/head'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Aurelia Digital Library</title>
        <meta name="description" content="Terms of Service for Aurelia Digital Library" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Terms of Service for Aurelia</h1>
          <p style={styles.updated}>Last updated: May 3, 2026</p>

          <section style={styles.section}>
            <h2 style={styles.h2}>1. Acceptance of Terms</h2>
            <p style={styles.p}>
              By accessing or using Aurelia, you agree to be bound by these Terms. If you disagree, do not use the service.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>2. Description of Service</h2>
            <p style={styles.p}>
              Aurelia Digital Library is a platform for public domain books and open knowledge. The service is provided "as is" without warranties of any kind.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>3. User Conduct</h2>
            <p style={styles.p}>
              You agree not to use the service to create, upload, or share any content that is illegal, harmful, abusive, or infringes on the rights of others. You are solely responsible for the content you generate.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>4. Intellectual Property</h2>
            <p style={styles.p}>
              All content provided by Aurelia is either public domain or used with permission. You retain ownership of any content you upload.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>5. Termination</h2>
            <p style={styles.p}>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>6. Limitation of Liability</h2>
            <p style={styles.p}>
              In no event shall Aurelia be liable for any indirect, incidental, or consequential damages arising out of the use of the service.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>7. Governing Law</h2>
            <p style={styles.p}>
              These Terms shall be governed by the laws of Tunisia.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.h2}>8. Contact Us</h2>
            <p style={styles.p}>
              If you have any questions about these Terms, please contact us at: terms@aurelia-v6.vercel.app
            </p>
          </section>
        </div>
      </main>
    </>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '40px 20px'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '8px',
    color: '#fff'
  },
  updated: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    marginBottom: '40px'
  },
  section: {
    marginBottom: '32px'
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '12px',
    color: '#f1f5f9'
  },
  p: {
    fontSize: '1rem',
    lineHeight: '1.7',
    color: '#cbd5e1'
  }
}
