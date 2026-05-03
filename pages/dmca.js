// pages/dmca.js
import Head from 'next/head'

export default function DMCA() {
  return (
    <>
      <Head>
        <title>DMCA Policy | Aurelia Digital Library</title>
        <meta name="description" content="DMCA Copyright Policy for Aurelia Digital Library" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>DMCA Copyright Policy</h1>
          <p style={styles.updated}>Last updated: May 2, 2026</p>

          <section style={styles.section}>
            <h2>1. DMCA Compliance</h2>
            <p>
              Aurelia Digital Library respects the intellectual property rights of others and expects users
              to do the same. We comply with the Digital Millennium Copyright Act (DMCA). [5.3]
            </p>
          </section>

          <section style={styles.section}>
            <h2>2. Public Domain Commitment</h2>
            <p>
              All content on Aurelia Digital Library will be sourced exclusively from Public Domain, CC0,
              or verified Open Access repositories. We do not host copyrighted material. [4.1]
            </p>
          </section>

          <section style={styles.section}>
            <h2>3. Copyright Infringement Notification</h2>
            <p>
              If you believe that material on our website infringes your copyright, please send a written
              notification to our designated agent with the following information:
            </p>
            <ul style={styles.list}>
              <li>Identification of the copyrighted work claimed to be infringed</li>
              <li>Identification of the material that is claimed to be infringing</li>
              <li>Your contact information: address, telephone, and email</li>
              <li>A statement that you have a good faith belief that use is not authorized</li>
              <li>A statement that the information is accurate, under penalty of perjury</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          <section style={styles.section}>
            <h2>4. Designated Agent</h2>
            <p>
              Send all DMCA notices to: <br />
              <strong>Email:</strong> fouedsendi185@gmail.com <br />
              <strong>Subject Line:</strong> DMCA Takedown Request
            </p>
          </section>

          <section style={styles.section}>
            <h2>5. Counter-Notification</h2>
            <p>
              If you believe your material was removed in error, you may file a counter-notification
              containing the required information under DMCA Section 512(g).
            </p>
          </section>

          <section style={styles.section}>
            <h2>6. Repeat Infringers</h2>
            <p>
              Aurelia Digital Library will terminate access for users who are repeat infringers of copyright.
            </p>
          </section>

          <div style={styles.back}>
            <a href="/" style={styles.link}>← Back to Home</a>
          </div>
        </div>

        <footer style={styles.footer}>
          <div style={styles.legal}>
            <a href="/privacy" style={styles.link}>Privacy Policy</a> |
            <a href="/terms" style={styles.link}> Terms</a> |
            <a href="/dmca" style={styles.link}> DMCA</a>
          </div>
          <div style={styles.copy}>
            © 2026 Aurelia Digital Library. All rights reserved. [3.3]
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
  list: {
    paddingLeft: '20px',
    lineHeight: '1.8'
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
    margin: '0 8px'
  },
  copy: {
    fontSize: '0.875rem',
    color: '#64748b'
  }
}
