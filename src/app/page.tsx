import {
  ResumeAboutMe,
  PersonalInfo,
  Experiences,
  LastPosts,
} from '@/components/app/sections';

export default function Home() {
  return (
    <div className="container mx-auto w-full space-y-6 py-8 md:max-w-[90%] md:py-12">
      <PersonalInfo />
      <ResumeAboutMe />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Experiences />
        <LastPosts />
      </div>
    </div>
  );
}
