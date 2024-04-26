import { PERSONAL_INFO } from '@/helpers/constants';
import CustomCard from '../custom-card';

const ResumeAboutMe = () => {
  return (
    <section>
      <CustomCard title="📖 Sobre mim" href="/about" linkTitle="Ver mais">
        <p className="line-clamp-5 text-xs md:text-sm">
          {PERSONAL_INFO.paragraphs[0]}
        </p>
      </CustomCard>
    </section>
  );
};

export default ResumeAboutMe;
