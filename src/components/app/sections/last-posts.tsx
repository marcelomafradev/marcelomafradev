import Image from 'next/image';
import CustomCard from '../custom-card';
import { useTranslations } from 'next-intl';

const LastPosts = () => {
  const t = useTranslations('homepage.posts');

  return (
    <section>
      <CustomCard title={t('title')} href="/blog" linkTitle={t('cta')}>
        <div className="flex h-[250px] max-h-[250px] flex-col items-center justify-center gap-2">
          <Image
            src={'/avatar.svg'}
            alt={'Avatar'}
            width={0}
            height={0}
            sizes="100vw"
            className="h-20 w-20 cursor-pointer rounded-full bg-muted p-1"
          />
          <p className="text-center">{t('not-found')}</p>
        </div>
      </CustomCard>
    </section>
  );
};

export default LastPosts;
