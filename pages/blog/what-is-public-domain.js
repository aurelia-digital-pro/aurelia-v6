// pages/blog/what-is-public-domain.js
// AURELIA-P1-READY | صفحة 6 من 10 | نسخة محسنة ومتوافقة قانونيًا

import Head from 'next/head'
import Link from 'next/link'

export default function PublicDomain() {
  return (
    <>
      <Head>
        <title>ما هو الملك العام؟ | Aurelia Digital Library</title>
        <meta
          name="description"
          content="تعرف على مفهوم الملك العام Public Domain وكيف تتيح Aurelia Digital Library محتوى قانوني مجاني بطريقة آمنة ومتوافقة مع القوانين."
        />
      </Head>

      <main
        style={{
          padding: '40px 20px',
          maxWidth: '800px',
          margin: '0 auto',
          color: 'white',
          background: '#05040b',
          minHeight: '100vh',
          lineHeight: '1.8',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '24px' }}>
          ما هو الملك العام Public Domain؟
        </h1>

        <p>
          الملك العام أو "Public Domain" هو مصطلح قانوني يُستخدم لوصف الأعمال
          الإبداعية التي لم تعد خاضعة لحقوق النشر الحصرية، مما يجعلها متاحة
          للاستخدام من قبل الجميع بشكل قانوني.
        </p>

        <p>
          تدخل الأعمال في الملك العام لعدة أسباب، من أبرزها انتهاء مدة حقوق
          النشر، أو قيام المؤلف بنشر العمل برخصة تسمح باستخدامه بحرية. تختلف مدة
          الحماية القانونية حسب الدولة، لكنها غالبًا ما تتراوح بين 50 و70 سنة بعد
          وفاة المؤلف.
        </p>

        <p>
          على سبيل المثال، العديد من الأعمال الكلاسيكية في الأدب العالمي أصبحت
          اليوم ضمن الملك العام، مما يسمح بإعادة نشرها وتوزيعها بشكل قانوني دون
          الحاجة إلى إذن مسبق.
        </p>

        <p>
          <strong>
            في Aurelia Digital Library، نلتزم باستخدام هذا النوع من المحتوى فقط.
          </strong>{' '}
          نحن لا نقوم بنشر أي مواد محمية بحقوق النشر دون تصريح، ونعتمد على مصادر
          موثوقة مع التحقق من الحالة القانونية لكل عمل قبل إتاحته.
        </p>

        <p>
          من بين أنواع المحتوى التي نعتمد عليها:
          <br />• أعمال ضمن الملك العام بعد انتهاء حقوقها
          <br />• محتوى الوصول المفتوح (Open Access)
          <br />• الأعمال المرخصة برخص تسمح بإعادة الاستخدام مثل بعض تراخيص
          المشاع الإبداعي
        </p>

        <p>
          هدفنا هو تقديم المعرفة بشكل قانوني وآمن، مع احترام حقوق المؤلفين
          والناشرين، وتوفير تجربة حديثة للوصول إلى محتوى مفيد وموثوق.
        </p>

        <p>
          نعتمد على مصادر معروفة مثل Project Gutenberg وغيرها، مع الالتزام بشروط
          الاستخدام الخاصة بكل مصدر، والتحقق من الوضع القانوني لكل محتوى قبل
          نشره.
        </p>

        <p
          style={{
            marginTop: '24px',
            fontSize: '14px',
            color: '#9ca3af',
          }}
        >
          تنبيه: المعلومات الواردة في هذه الصفحة هي لأغراض تعليمية فقط ولا تشكل
          استشارة قانونية.
        </p>

        <br />

        <p>
          اقرأ أيضًا:{' '}
          <Link href="/blog/what-is-open-access" style={{ color: '#60a5fa' }}>
            ما هو الوصول المفتوح؟
          </Link>
        </p>

        <br />

        <Link href="/" style={{ color: '#60a5fa' }}>
          ← العودة للصفحة الرئيسية
        </Link>

        <footer
          style={{
            marginTop: '60px',
            borderTop: '1px solid #333',
            paddingTop: '20px',
            fontSize: '14px',
            color: '#9ca3af',
          }}
        >
          <Link href="/privacy" style={{ marginRight: '16px', color: '#9ca3af' }}>
            Privacy Policy
          </Link>
          <Link href="/terms" style={{ marginRight: '16px', color: '#9ca3af' }}>
            Terms of Service
          </Link>
          <Link href="/dmca" style={{ color: '#9ca3af' }}>
            DMCA
          </Link>
          <div style={{ marginTop: '12px' }}>
            © 2026 Aurelia Digital Library. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  )
}
