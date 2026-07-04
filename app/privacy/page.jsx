import PageShell from '@/components/layout/PageShell';

export const metadata = {
  title: 'Brick and Soul | Privacy Policy',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <PageShell pageId="contact">
      <div className="container" style={{ padding: '120px 0 80px' }}>
        <h1 style={{ marginBottom: '24px' }}>Privacy Policy</h1>
        <p style={{ maxWidth: '720px', lineHeight: 1.6 }}>
          This site does not sell personal data. Information submitted through the contact form is
          used only to respond to your inquiry. For questions, email{' '}
          <a href="mailto:Bricknsoul@gamil.com">Bricknsoul@gamil.com</a>.
        </p>
      </div>
    </PageShell>
  );
}
