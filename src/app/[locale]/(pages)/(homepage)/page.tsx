import {
  ResumeAboutMe,
  PersonalInfo,
  Experiences,
  Projects,
  Education,
} from '@/components/app/sections';

export default function Home() {
  return (
    <div className="align-page">
      <PersonalInfo />
      <ResumeAboutMe />
      <Education />
      <Experiences />
      <Projects />
    </div>
  );
}
