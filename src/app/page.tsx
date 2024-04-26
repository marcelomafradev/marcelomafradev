import {
  ResumeAboutMe,
  PersonalInfo,
  Experiences,
  LastPosts,
} from '@/components/app/sections';

export default function Home() {
  return (
    <div className="mx-auto w-full space-y-6 py-12 md:max-w-[80%]">
      <PersonalInfo />
      <ResumeAboutMe />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Experiences />
        <LastPosts />
      </div>
    </div>
  );
}
