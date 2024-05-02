import {
  FadeInMotion,
  Link,
  ProjectCardHorizontal,
  TypingText,
} from '@/components/app';
import { Button } from '@/components/ui/button';
import { PROJECTS } from '@/helpers/constants';
import { Github } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Projects() {
  const projectsTranslation = useTranslations('homepage.projects');
  const t = useTranslations('projects');

  return (
    <div className="align-page">
      <div className="space-y-1">
        <TypingText title={t('title')} />

        <FadeInMotion>
          <p className="text-pretty pl-1 text-sm font-light text-muted-foreground">
            {t('description')}
            <Button
              variant="link"
              className="h-fit gap-1 p-0 pl-1 text-sm font-light"
              asChild
            >
              <Link href="https://github.com/marcelomafradev">
                GitHub <Github size={16} />
              </Link>
            </Button>
          </p>
        </FadeInMotion>

        <div className="grid grid-cols-1 gap-4 py-6 lg:grid-cols-2 2xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <FadeInMotion delay={0.3 + index * 0.1} key={index}>
              <ProjectCardHorizontal
                key={index}
                {...project}
                description={projectsTranslation(
                  `${index + 1}.description` as '1.description',
                )}
                ctaTranslation={projectsTranslation('cta')}
                sourceCodeTranslation={projectsTranslation('source-code')}
              />
            </FadeInMotion>
          ))}
        </div>
      </div>
    </div>
  );
}
