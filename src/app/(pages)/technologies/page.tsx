import { FadeInMotion, TechButton, TypingText } from '@/components/app';
import { STACK } from '@/helpers/constants';

export default function Technologies() {
  return (
    <div className="align-page">
      <div className="space-y-1">
        <TypingText title="Tecnologias e Ferramentas" />

        <FadeInMotion>
          <p className="text-pretty pl-1 text-sm font-light text-muted-foreground">
            - Exploro tecnologias e ferramentas avançadas que aprimoram minha
            jornada de desenvolvimento. Escolho e aplico essas ferramentas com
            precisão para desenvolver soluções poderosas e eficazes, com foco
            constante na experiência do usuário.
          </p>
        </FadeInMotion>

        <div className="space-y-4 pt-6">
          {STACK.map(({ title, items }, index) => (
            <section key={index} className="flex flex-col gap-2">
              <TypingText
                title={title}
                className="pl-4 text-lg font-medium capitalize"
              />

              <FadeInMotion
                delay={0.1}
                direction="up"
                className="grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-3 lg:grid-cols-4"
              >
                {items.map((item) => (
                  <TechButton key={item.name} {...item} />
                ))}
              </FadeInMotion>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
