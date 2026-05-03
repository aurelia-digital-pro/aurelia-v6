// pages/terms.js
import Head from 'next/head'
import Link from 'next/link'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Aurelia Digital Library</title>
        <meta name="description" content="Terms of Service for Aurelia Digital Library - GDPR compliant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Terms of Service - Aurelia Digital Library</h1>
          <p style={styles.updated}>Last updated: May 3, 2026</p>

          <section style={styles.section}>
            <h2 style={styles.heading}>1. Acceptance of Terms</h2>
            <p style={styles.text}>
              By accessing or using Aurelia Digital Library, you agree to be bound by these Terms of Service,
              to the extent permitted by law. If you do not agree, please do not use the website.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>2. Description of Service</h2>
            <p style={styles.text}>
              Aurelia Digital Library is a digital platform that provides access to public domain materials,
              open knowledge resources, and early access updates. For legal purposes, the service is provided
              "as is" without warranties of any kind, to the extent permitted by law.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>3. User Conduct</h2>
            <p style={styles.text}>
              You agree not to misuse the website, attempt unauthorized access, distribute harmful code,
              submit false information, or use temporary emails. We reserve the right to block users who
              violate these terms, to the extent permitted by law.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>4. Intellectual Property</h2>
            <p style={styles.text}>
              Original branding, design, and code of Aurelia Digital Library are protected by applicable laws.
              Public domain materials remain subject to their respective legal status. See our{' '}
              <Link href="/dmca" style={styles.link}>DMCA Policy</Link> for copyright issues.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>5. Privacy & GDPR</h2>
            <p style={styles.text}>
              Your use of this service is also governed by our{' '}
              <Link href="/privacy" style={styles.link}>Privacy Policy</Link>. We comply with
              EU GDPR and Tunisia Law 63-2004, to the extent permitted by law.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>6. Termination</h2>
            <p style={styles.text}>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice,
              for any breach of these Terms, to the extent permitted by law.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>7. Limitation of Liability</h2>
            <p style={styles.text}>
              To the extent permitted by law, Aurelia Digital Library shall not be liable for any indirect,
              incidental, or consequential damages arising out of the use of the service.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>8. Governing Law</h2>
            <p style={styles.text}>
              These Terms shall be governed by the laws of Tunisia and GDPR regulations.
            </p>
          </section>

          <section style={styles.section}>
            <h2 style={styles.heading}>9. Contact Us</h2>
            <p style={styles.text}>
              For legal purposes, if you have questions about these Terms, contact us at:
              <strong> digital.aurelia.2026@gmail.com</strong>
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
  main: { minHeight: '100vh', background: '#0f172a', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px 20px' },
  container: { maxWidth: '820px', margin: '0 auto', background: '#111827', border: '1px solid #1f2937', borderRadius: '14px', padding: '40px' },
  title: { fontSize: '2.4rem', fontWeight: '800', marginBottom: '10px' },
  updated: { color: '#94a3b8', marginBottom: '30px', fontSize: '0.95rem' },
  section: { marginBottom: '28px' },
  heading: { fontSize: '1.35rem', fontWeight: '700', marginBottom: '10px', color: '#60a5fa' },
  text: { color: '#d1d5db', lineHeight: '1.8', fontSize: '1rem' },
  back: { marginTop: '48px' },
  footer: { padding: '32px 20px', borderTop: '1px solid #1e293b', textAlign: 'center', marginTop: '60px' },
  legal: { marginBottom: '12px' },
  link: { color: '#60a5fa', textDecoration: 'none', margin: '0 4px' },
  copy: { fontSize: '0.875rem', color: '#64748b' }
}
