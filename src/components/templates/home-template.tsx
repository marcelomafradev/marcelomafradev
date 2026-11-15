import {
  ResumeAboutMe,
  AiWorkflow,
  ServicesPreview,
  Experiences,
  Projects,
  Education,
  Hero,
  ProofMetrics,
  CaseStudies,
} from '@/components/organisms';
import { Separator } from '@/components/ui/separator';

export const HomeTemplate = () => {
  return (
    <div className="align-page">
      <Hero />
      <ProofMetrics />
      <CaseStudies />
      <AiWorkflow />
      <ServicesPreview />
      <Separator className="bg-border/50" />
      <Experiences />
      <Projects />
      <Education />
      <ResumeAboutMe />
    </div>
  );
};
