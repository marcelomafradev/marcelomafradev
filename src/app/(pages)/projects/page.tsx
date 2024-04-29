import {
  FadeInMotion,
  ProjectCardHorizontal,
  TypingText,
} from '@/components/app';
import { Button } from '@/components/ui/button';
import { PROJECTS } from '@/helpers/constants';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Projects() {
  return (
    <div className="align-page">
      <div className="space-y-1">
        <TypingText title="Meus projetos" />

        <FadeInMotion>
          <p className="text-pretty pl-1 text-sm font-light text-muted-foreground">
            - Aqui estão alguns dos projetos que criei; você pode encontrar mais
            no meu
            <Button
              variant="link"
              className="h-fit gap-1 p-0 text-sm font-light"
              asChild
            >
              <Link
                href="https://github.com/marcelomafradev"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <Github size={16} />
              </Link>
            </Button>
          </p>
        </FadeInMotion>

        <div className="grid grid-cols-1 gap-4 py-6 xl:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <FadeInMotion delay={0.3 + index * 0.1} key={index}>
              <ProjectCardHorizontal key={index} {...project} />
            </FadeInMotion>
          ))}
        </div>
      </div>
    </div>
  );
}
