// pages/terms.js
import Head from 'next/head'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Aurelia Digital Library</title>
        <meta
          name="description"
          content="Terms of Service for Aurelia Digital Library."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Terms of Service</h1>
          <p style={styles.updated}>
            Last updated: {new Date().toLocaleDateString('en-US')}
          </p>

          <section style={styles.section}>
            <h2 style={styles.heading}>1. Acceptance of Terms</h2>
            <p style={styles.text}>
              By accessing or using Aurelia Digital Library, you agree to be
              bound by these Terms of Service. If you do not agree, please do
              not use the website.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. Description of Service</h2>
            <p style={styles.text}>
              Aurelia Digital Library is a digital platform that provides
              access to public domain materials, open knowledge resources,
              educational references, and early access updates related to the
              project.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. User Conduct</h2>
            <p style={styles.text}>
              You agree not to misuse the website, attempt unauthorized access,
              distribute harmful code, submit false information, or use the
              service for unlawful purposes.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. Intellectual Property</h2>
            <p style={styles.text}>
              Original branding, design, text, and platform elements of
              Aurelia Digital Library are protected by applicable intellectual
              property laws. Public domain and open-license materials remain
              subject to their respective licenses or legal status.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>5. External Sources</h2>
            <p style={styles.text}>
              Some materials may reference third-party sources or repositories.
              We do not control third-party websites and are not responsible
              for their content, availability, or policies.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>6. Disclaimer</h2>
            <p style={styles.text}>
              The service is provided on an “as is” and “as available” basis
              without warranties of any kind, to the maximum extent permitted
              by law.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>7. Limitation of Liability</h2>
            <p style={styles.text}>
              To the extent permitted by law, Aurelia Digital Library shall not
              be liable for indirect, incidental, or consequential damages
              arising from use of the website.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>8. Governing Law</h2>
            <p style={styles.text}>
              These Terms shall be governed by the applicable laws of Tunisia,
              without prejudice to mandatory consumer protections required by
              other jurisdictions where applicable.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>9. Contact</h2>
            <p style={styles.text}>
              For questions regarding these Terms:
              <br />
              fouedsendi185@gmail.com
            </p>
          </section>

          <div style={styles.footer}>
            <a href="/" style={styles.link}>Home</a>
            <span style={styles.sep}>|</span>
            <a href="/privacy" style={styles.link}>Privacy Policy</a>
            <span style={styles.sep}>|</span>
            <a href="/dmca" style={styles.link}>DMCA</a>
          </div>
        </div>
      </main>
    </>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#ffffff',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '40px 20px'
  },
  container: {
    maxWidth: '820px',
    margin: '0 auto',
    background: '#111827',
    border: '1px solid #1f2937',
    borderRadius: '14px',
    padding: '40px'
  },
  title: {
    fontSize: '2.4rem',
    fontWeight: '800',
    marginBottom: '10px'
  },
  updated: {
    color: '#94a3b8',
    marginBottom: '30px',
    fontSize: '0.95rem'
  },
  section: {
    marginBottom: '28px'
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
  footer: {
    marginTop: '35px',
    paddingTop: '25px',
    borderTop: '1px solid #1f2937',
    textAlign: 'center'
  },
  link: {
    color: '#60a5fa',
    textDecoration: 'none',
    margin: '0 8px'
  },
  sep: {
    color: '#64748b'
  }
}
