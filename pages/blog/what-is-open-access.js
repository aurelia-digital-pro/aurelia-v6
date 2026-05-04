// pages/blog/what-is-open-access.js
// AURELIA-P1-READY | صفحة 7 من 10 | نسخة احترافية متوافقة مع الدستور

import Head from 'next/head'
import Link from 'next/link'

export default function WhatIsOpenAccess() {
  return (
    <>
      <Head>
        <title>ما هو الوصول المفتوح Open Access؟ | Aurelia Digital Library</title>
        <meta
          name="description"
          content="تعرف على مفهوم الوصول المفتوح Open Access وكيف يتيح الوصول إلى الأبحاث العلمية بشكل قانوني، ودور Aurelia Digital Library في تقديم محتوى موثوق."
        />
        <meta name="robots" content="index, follow" />
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
          ما هو الوصول المفتوح Open Access؟
        </h1>

        <p>
          الوصول المفتوح أو "Open Access" هو نموذج للنشر العلمي يهدف إلى إتاحة
          الأبحاث والدراسات الأكاديمية مجانًا عبر الإنترنت، مع تقليل الحواجز
          المالية أمام الوصول إلى المعرفة.
        </p>

        <p>
          على عكس الملك العام، لا يعني الوصول المفتوح أن حقوق النشر قد انتهت.
          بل يحتفظ المؤلف بحقوقه، لكنه يسمح باستخدام العمل وفق شروط ترخيص محددة
          تتيح القراءة أو التحميل أو إعادة الاستخدام ضمن حدود معينة.
        </p>

        <p>
          تختلف هذه التراخيص حسب الجهة الناشرة، وقد تشمل قيودًا مثل ضرورة ذكر
          المصدر أو منع الاستخدام التجاري. لذلك، من المهم دائمًا مراجعة شروط
          الترخيص لكل عمل قبل استخدامه.
        </p>

        <h2 style={{ marginTop: '32px', marginBottom: '12px' }}>
          الفرق بين الوصول المفتوح والملك العام
        </h2>

        <p>
          يخلط البعض بين الوصول المفتوح و
          <Link href="/blog/what-is-public-domain" style={{ color: '#60a5fa' }}>
            {' '}الملك العام
          </Link>
          . الملك العام يعني انتهاء حقوق النشر بالكامل، بينما الوصول المفتوح
          يعتمد على منح إذن قانوني باستخدام العمل دون التخلي عن الحقوق.
        </p>

        <h2 style={{ marginTop: '32px', marginBottom: '12px' }}>
          أنواع الوصول المفتوح
        </h2>

        <p>
          • <strong>الوصول الذهبي:</strong> نشر البحث مباشرة في مجلة توفره مجانًا
          <br />
          • <strong>الوصول الأخضر:</strong> إتاحة نسخة من البحث في مستودع رقمي
          <br />
          • <strong>الوصول الماسي:</strong> وصول مجاني بالكامل بدون رسوم على القارئ أو المؤلف
        </p>

        <h2 style={{ marginTop: '32px', marginBottom: '12px' }}>
          لماذا يهم الوصول المفتوح؟
        </h2>

        <p>
          يساهم الوصول المفتوح في تسريع تقدم البحث العلمي، وتوسيع نطاق المعرفة،
          وتمكين الباحثين والطلاب من الوصول إلى المعلومات دون قيود مالية كبيرة،
          خاصة في الدول التي لا تتوفر فيها اشتراكات أكاديمية مكلفة.
        </p>

        <p>
          في Aurelia Digital Library، نلتزم باستخدام المحتوى المتاح بشكل قانوني فقط،
          سواء كان من الملك العام أو من مصادر الوصول المفتوح، مع التحقق من شروط
          الترخيص لكل عمل قبل استخدامه أو عرضه.
        </p>

        <p>
          نعتمد على مصادر موثوقة في هذا المجال، مع الالتزام بشروط الاستخدام الخاصة
          بكل منصة، لضمان تقديم محتوى قانوني وآمن للمستخدمين.
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
          <Link href="/blog/what-is-public-domain" style={{ color: '#60a5fa' }}>
            ما هو الملك العام Public Domain؟
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
          <Link href="/privacy-policy" style={{ marginRight: '16px', color: '#9ca3af' }}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" style={{ marginRight: '16px', color: '#9ca3af' }}>
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
