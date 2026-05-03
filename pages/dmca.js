export default function DMCA() {
  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>DMCA Policy</h1>
      
      <section style={styles.section}>
        <h2>1. Reporting Copyright Infringement</h2>
        <p>
          Aurelia Digital Library respects the intellectual property rights of others and expects its users to do the same. 
          If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, 
          please provide our designated copyright agent with the following information:
        </p>
        <ul>
          <li>Identification of the copyrighted work claimed to have been infringed</li>
          <li>Identification of the material that is claimed to be infringing and information reasonably sufficient to permit us to locate the material</li>
          <li>Your contact information: address, telephone, and email address</li>
          <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner</li>
          <li>A statement that the information is accurate, under penalty of perjury</li>
          <li>Your physical or electronic signature</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>2. Designated Agent</h2>
        <p>
          Send all DMCA notices to: <br />
          <strong>Email:</strong> digital.aurelia.2026@gmail.com <br />
          We will respond to all valid DMCA requests promptly.
        </p>
      </section>

      <section style={styles.section}>
        <h2>3. Counter-Notification</h2>
        <p>
          If you believe your material was removed in error, you may file a counter-notification 
          containing the required information under DMCA Section 512(g)(3).
        </p>
      </section>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333'
  },
  h1: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    textAlign: 'center'
  },
  section: {
    marginBottom: '30px'
  }
}
