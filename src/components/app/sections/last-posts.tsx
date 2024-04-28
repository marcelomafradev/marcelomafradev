import Image from 'next/image';
import CustomCard from '../custom-card';

const LastPosts = () => {
  return (
    <section>
      <CustomCard title="📰 Posts" href="/blog" linkTitle="Ver todos">
        <div className="flex h-[250px] max-h-[250px] flex-col items-center justify-center gap-2">
          <Image
            src={'/avatar.svg'}
            alt={'Avatar'}
            width={0}
            height={0}
            sizes="100vw"
            className="h-20 w-20 cursor-pointer rounded-full bg-muted p-1"
          />
          <p>{'Eu não escrevi nenhum post ainda.. ;/'}</p>
        </div>
      </CustomCard>
    </section>
  );
};

export default LastPosts;
