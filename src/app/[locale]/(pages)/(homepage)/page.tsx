import {
  ResumeAboutMe,
  PersonalInfo,
  Experiences,
  LastPosts,
  Projects,
} from '@/components/app/sections';

export default function Home() {
  return (
    <div className="align-page">
      <PersonalInfo />
      <ResumeAboutMe />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Experiences />
        <LastPosts />
      </div>

      <Projects />
    </div>
  );
}
