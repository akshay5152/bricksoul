import PageShell from '@/components/layout/PageShell';
import RsorJaContent from './RsorJaContent';
import NLzJ3aWaves from './NLzJ3aWaves';
import TcbHraBackgroundStripes from './TcbHraBackgroundStripes';
import EDzIIqContent from './EDzIIqContent';
import ContentWrapperSection from './ContentWrapperSection';

export default function HomePageContent() {
  return (
    <PageShell pageId="overview">
      <RsorJaContent />
      <NLzJ3aWaves />
      <TcbHraBackgroundStripes />
      <EDzIIqContent />
      <ContentWrapperSection />
    </PageShell>
  );
}
