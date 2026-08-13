import {
  ResumeAboutMe,
  AiWorkflow,
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
      <Separator className="bg-border/50" />
      <Projects />
      <Experiences />
      <Education />
      <ResumeAboutMe />
    </div>
  );
};
