import PageShell from '@/components/layout/PageShell';
import TcbHraBackgroundStripes from './TcbHraBackgroundStripes';
import XxZ7PWContent from './XxZ7PWContent';
import NQLykaAwardsSection from './NQLykaAwardsSection';
import NQLykaAwardPreview from './NQLykaAwardPreview';
import CurvedLoopJacket from './CurvedLoopJacket';

export default function ProjectsPageContent() {
  return (
    <PageShell pageId="projects">
      <TcbHraBackgroundStripes />
      <XxZ7PWContent />
      <NQLykaAwardsSection />
      <NQLykaAwardPreview />
      <CurvedLoopJacket />
    </PageShell>
  );
}
