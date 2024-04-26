import { Badge } from '@/components/ui/badge';
import { PERSONAL_INFO } from '@/helpers/constants';
import Image from 'next/image';
import FadeInMotion from '../fade-in-motion';
import TypingText from '../typing-text';

const PersonalInfo = () => {
  return (
    <section className="flex select-none space-x-4">
      <FadeInMotion delay={0.3}>
        <Image
          src={PERSONAL_INFO.image}
          alt={`Marcelo Mafra image`}
          width={0}
          height={0}
          sizes="100vw"
          className="h-24 w-24 rounded-lg object-cover"
        />
      </FadeInMotion>

      <div className="flex flex-col items-start justify-center gap-2">
        <FadeInMotion delay={0.3}>
          <TypingText title={PERSONAL_INFO.name} className="italic" />
          <TypingText
            title={PERSONAL_INFO.title}
            className="text-xs font-light text-muted-foreground"
          />
        </FadeInMotion>

        <div className="flex gap-2">
          {PERSONAL_INFO.stack.map((stack, index) => (
            <FadeInMotion key={stack} delay={0.3 + 0.15 * index}>
              <Badge variant="secondary" className="font-medium">
                {stack}
              </Badge>
            </FadeInMotion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
