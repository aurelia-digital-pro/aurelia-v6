// pages/dmca.js
import Head from 'next/head'
import Link from 'next/link'

export default function DMCA() {
  return (
    <>
      <Head>
        <title>DMCA Policy | Aurelia Digital Library</title>
        <meta name="description" content="DMCA Copyright Policy for Aurelia Digital Library" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>DMCA Policy - Aurelia Digital Library</h1>
          <p style={styles.updated}>Last updated: May 3, 2026</p>

          <section style={styles.section}>
            <h2 style={styles.heading}>1. Reporting Copyright Infringement</h2>
            <p style={styles.text}>
              Aurelia Digital Library respects the intellectual property rights of others and expects its users to do the same,
              to the extent permitted by law. If you believe that your copyrighted work has been copied in a way that
              constitutes copyright infringement, please provide our designated copyright agent with the following information:
            </p>
            <ul style={styles.list}>
              <li>Identification of the copyrighted work claimed to have been infringed</li>
              <li>Identification of the infringing material and its location on our site</li>
              <li>Your contact information: address, telephone, and email address</li>
              <li>A statement that you have a good faith belief that use is not authorized by the copyright owner</li>
              <li>A statement that the information is accurate, under penalty of perjury</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. Designated Agent</h2>
            <p style={styles.text}>
              For legal purposes, send all DMCA notices to: <br />
              <strong>Email:</strong> digital.aurelia.2026@gmail.com <br />
              We will respond to all valid DMCA requests within 48 hours, to the extent permitted by law.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. Counter-Notification</h2>
            <p style={styles.text}>
              If you believe your material was removed in error, you may file a counter-notification
              containing the required information under DMCA Section 512(g)(3), to the extent permitted by law.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. Related Policies</h2>
            <p style={styles.text}>
              See also: <Link href="/terms" style={styles.link}>Terms of Service</Link> |{' '}
              <Link href="/privacy" style={styles.link}>Privacy Policy</Link>
            </p>
          </section>

          <div style={styles.back}>
            <Link href="/" style={styles.link}>← Back to Home</Link>
          </div>
        </div>

        <footer style={styles.footer}>
          <div style={styles.legal}>
            <Link href="/privacy" style={styles.link}>Privacy Policy</Link> |
            <Link href="/terms" style={styles.link}> Terms</Link> |
            <Link href="/dmca" style={styles.link}> DMCA</Link>
          </div>
          <div style={styles.copy}>
            © 2026 Aurelia Digital Library. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '60px 20px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#fff'
  },
  updated: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '40px'
  },
  section: {
    marginBottom: '32px'
  },
  heading: {
    fontSize: '1.35rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#60a5fa'
  },
  text: {
    color: '#d1d5db',
    lineHeight: '1.8',
    fontSize: '1rem'
  },
  list: {
    color: '#d1d5db',
    lineHeight: '1.8',
    paddingLeft: '20px'
  },
  back: {
    marginTop: '48px'
  },
  footer: {
    padding: '32px 20px',
    borderTop: '1px solid #1e293b',
    textAlign: 'center',
    marginTop: '60px'
  },
  legal: {
    marginBottom: '12px'
  },
  link: {
    color: '#60a5fa',
    textDecoration: 'none',
    margin: '0 4px'
  },
  copy: {
    fontSize: '0.875rem',
    color: '#64748b'
  }
}
