import dynamic from "next/dynamic";
// pages/privacy.js
import Head from 'next/head'
import Link from 'next/link'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Aurelia Digital Library</title>
        <meta name="description" content="Privacy Policy for Aurelia Digital Library - GDPR and Tunisia Law 63-2004 compliant" />
      </Head>

      <main style={styles.main}>
        <div style={styles.container}>
          <h1 style={styles.title}>Privacy Policy - Aurelia Digital Library</h1>
          <p style={styles.updated}>Last updated: May 3, 2026</p>

          <section style={styles.section}>
            <h2>1. Data We Collect</h2>
            <p>
              For legal purposes, Aurelia Digital Library collects only your email address when you subscribe to early access updates.
              We do not collect names, addresses, payment info, or tracking cookies.
            </p>
          </section>

          <section style={styles.section}>
            <h2>2. How We Use Your Data</h2>
            <p>
              Your email is used solely to send you updates about Aurelia Digital Library launch and features.
              We will never sell, rent, or share your email with third parties, to the extent permitted by law. [4.2]
            </p>
          </section>

          <section style={styles.section}>
            <h2>3. Legal Basis - GDPR Compliance</h2>
            <p>
              We process your data based on your explicit consent obtained via checkbox on our homepage.
              You can withdraw consent at any time by clicking "unsubscribe" in any email. [5.1]
            </p>
          </section>

          <section style={styles.section}>
            <h2>4. Tunisian Law Compliance</h2>
            <p>
              In accordance with Tunisian Law No. 63-2004 on Personal Data Protection, you have the right to
              access, correct, and delete your personal data, to the extent permitted by law. [5.2]
            </p>
          </section>

          <section style={styles.section}>
            <h2>5. Your Rights</h2>
            <p>
              For legal purposes, you have the right to: access your data, request deletion, request correction, and unsubscribe.
              To exercise these rights, contact: <strong>fouedsendi185@gmail.com</strong> [5.1]
            </p>
          </section>

          <section style={styles.section}>
            <h2>6. Data Retention</h2>
            <p>
              We retain your email until you unsubscribe or request deletion. Deleted data is permanently
              removed from our Supabase database within 48 hours for legal purposes.
            </p>
          </section>

          <section style={styles.section}>
            <h2>7. Data Security</h2>
            <p>
              Your data is stored securely in Supabase, EU region, with Row Level Security enabled. Only INSERT operations
              are allowed publicly. No SELECT access is permitted, to the extent permitted by law.
            </p>
          </section>

          <section style={styles.section}>
            <h2>8. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, Aurelia Digital Library shall not be liable for any indirect or consequential
              damages arising from use of this service or inability to use this service.
            </p>
          </section>

          <section style={styles.section}>
            <h2>9. Contact & Legal Documents</h2>
            <p>
              Data Controller: Foued Sendi<br/>
              Official Email: <strong>fouedsendi185@gmail.com</strong><br/>
              Website: https://aurelia-v6.vercel.app<br/>
              See also: <Link href="/terms" style={styles.link}>Terms of Service</Link> | <Link href="/dmca" style={styles.link}>DMCA Policy</Link>
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
