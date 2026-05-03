import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Aurelia</title>
        <meta name="description" content="Aurelia is a global platform dedicated to science, development, and knowledge." />
      </Head>
      
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'sans-serif' }}>
        <h1>About Aurelia</h1>
        
        <h2>English</h2>
        <p>
          <strong>Aurelia is a global platform dedicated to science, development, and knowledge.</strong> Our mission is to empower individuals worldwide by providing access to high-quality digital resources, research, and educational content with professionalism and integrity.
        </p>
        <p>
          We are not a commercial marketplace. We do not sell products. Our focus is purely on the advancement of human knowledge and fostering a community of lifelong learners. Aurelia stands for intellectual growth, innovation, and the free exchange of ideas.
        </p>
        <p>
          For any inquiries, please contact us at: <strong>support@aurelia.com</strong>
        </p>

        <hr style={{ margin: '3rem 0' }} />

        <h2>العربية</h2>
        <p dir="rtl">
          <strong>أوريليا هي منصة عالمية مكرسة للعلم والتطور والمعرفة.</strong> مهمتنا هي تمكين الأفراد في جميع أنحاء العالم من خلال توفير الوصول إلى موارد رقمية عالية الجودة، وأبحاث، ومحتوى تعليمي باحترافية ونزاهة.
        </p>
        <p dir="rtl">
          نحن لسنا سوقا تجاريا. لا نبيع منتجات. تركيزنا ينصب بالكامل على تقدم المعرفة البشرية وتعزيز مجتمع من المتعلمين مدى الحياة. أوريليا تمثل النمو الفكري والابتكار والتبادل الحر للأفكار.
        </p>
        <p dir="rtl">
          لأي استفسارات، يرجى التواصل معنا عبر: <strong>support@aurelia.com</strong>
        </p>
      </main>
    </>
  )
}
