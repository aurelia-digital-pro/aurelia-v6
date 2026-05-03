import Head from 'next/head'

export default function DMCA() {
  return (
    <>
      <Head>
        <title>DMCA Takedown Policy - Aurelia</title>
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
        <h1 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>DMCA Copyright Policy</h1>
        <p><strong>Last updated:</strong> May 3, 2026</p>

        <h2>1. Respect for Copyright</h2>
        <p>
          Aurelia respects the intellectual property rights of others. It is our policy to respond to any claim that content posted on the service infringes on the copyright of any person.
        </p>

        <h2>2. Filing a DMCA Takedown Notice</h2>
        <p>
          If you are a copyright owner and believe your work has been copied in a way that constitutes copyright infringement, please provide our designated agent with the following information:
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>A physical or electronic signature of the copyright owner.</li>
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Identification of the material that is claimed to be infringing, with URL or location on the service.</li>
          <li>Your address, telephone number, and email address.</li>
          <li>A statement that you have a good faith belief that the use is not authorized.</li>
          <li>A statement that the information is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner.</li>
        </ul>

        <h2>3. Designated Agent Contact</h2>
        <p>
          DMCA notices should be sent to our designated agent at: <strong>dmca@aurelia-v6.vercel.app</strong>
        </p>
        <p>
          Upon receipt of a valid notice, we will expeditiously remove or disable access to the infringing material.
        </p>

        <h2>4. Counter-Notification</h2>
        <p>
          If you believe your material was removed by mistake, you may file a counter-notification with the information required under the DMCA.
        </p>
      </div>
    </>
  )
}
