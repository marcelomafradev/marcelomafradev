import { PROJECTS } from '@/helpers/constants';
import CustomCard from '../custom-card';
import ProjectCard from '../project-card';
import { Separator } from '@/components/ui/separator';

const Projects = () => {
  return (
    <section>
      <CustomCard
        title="📁 Meus Projetos"
        href="/projects"
        linkTitle="Ver todos"
      >
        <div className="space-y-4">
          {PROJECTS.map((project, index) => (
            <div key={index} className="space-y-4">
              <ProjectCard key={index} {...project} />
              {index !== PROJECTS.length - 1 && (
                <Separator className="lg:hidden" />
              )}
            </div>
          ))}
        </div>
      </CustomCard>
    </section>
  );
};

export default Projects;
