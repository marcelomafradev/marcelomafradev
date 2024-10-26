import {
  ResumeAboutMe,
  PersonalInfo,
  Experiences,
  Projects,
} from '@/components/app/sections';

export default function Home() {
  return (
    <div className="align-page">
      <PersonalInfo />
      <ResumeAboutMe />

      <Experiences />

      <Projects />
    </div>
  );
}
