import { PERSONAL_INFO } from '@/helpers/constants';
import CustomCard from '../custom-card';

const ResumeAboutMe = () => {
  return (
    <section>
      <CustomCard title="📖 Sobre mim" href="/about" linkTitle="Ver mais">
        {PERSONAL_INFO.paragraphs[0]}
      </CustomCard>
    </section>
  );
};

export default ResumeAboutMe;
