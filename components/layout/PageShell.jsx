import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PageShell({ pageId, children }) {
  return (
    <div className="screenContent">
      <div data-page={pageId}>
        <Header pageId={pageId} />
        {children}
        <Footer />
      </div>
    </div>
  );
}
