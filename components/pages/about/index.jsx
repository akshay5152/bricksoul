import PageShell from '@/components/layout/PageShell';
import TcbHraBackgroundStripes from './TcbHraBackgroundStripes';
import LanyardWrapper from './LanyardWrapper';
import I01GaContent from './I01GaContent';
import FOyjoqSkillsVisionSection from './FOyjoqSkillsVisionSection';
import GDoBsaVisionSection from './GDoBsaVisionSection';
import MTgFGaFaqSection from './MTgFGaFaqSection';

export default function AboutPageContent() {
  return (
    <PageShell pageId="about">
      <TcbHraBackgroundStripes />
      <LanyardWrapper />
      <I01GaContent />
      <FOyjoqSkillsVisionSection />
      <GDoBsaVisionSection />
      <MTgFGaFaqSection />
    </PageShell>
  );
}
