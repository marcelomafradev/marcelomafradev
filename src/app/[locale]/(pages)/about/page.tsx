import { Badge } from '@/components/ui/badge';
import { PERSONAL_INFO } from '@/helpers/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  FadeInMotion,
  FavoriteBooksCarousel,
  FavoriteSongsCarousel,
  ImageWithDescription,
  Link,
  TypingText,
} from '@/components/app';

export default function About() {
  return (
    <div className="align-page">
      <div className="flex gap-2">
        <TypingText title="Sobre mim" />

        <Badge variant={'secondary'} className="h-fit">
          <TypingText title="TL;DR" className="!text-xs" />
        </Badge>
      </div>

      <FadeInMotion>
        <div className="space-y-1 text-pretty text-sm text-muted-foreground md:text-base">
          <p>{PERSONAL_INFO.resumeParagraph[0]}</p>
          <p>{PERSONAL_INFO.resumeParagraph[1]}</p>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="about">
            <AccordionTrigger>Mais..</AccordionTrigger>

            <AccordionContent className="text-pretty text-xs text-muted-foreground md:text-sm">
              <p>{PERSONAL_INFO.paragraphs[0]}</p>
              <p>{PERSONAL_INFO.paragraphs[1]}</p>
              <p>{PERSONAL_INFO.paragraphs[3]}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </FadeInMotion>

      <FadeInMotion className="space-y-4">
        <h1 className="text-xl font-semibold">Interesses pessoais</h1>
        <p className="text-pretty text-xs text-muted-foreground md:text-sm">
          {PERSONAL_INFO.interests}
        </p>

        <div className="flex flex-wrap items-start justify-center gap-8">
          <ImageWithDescription
            href="https://www.instagram.com/p/CrMEusGJnmG_EqARjAW3_OjQkza864YRx7GbOU0/?igsh=MWtya25lYTU4MW9tcg=="
            src={'/championship.png'}
          >
            Lutando o Compnet da Gracie Barra em 2023
          </ImageWithDescription>

          <ImageWithDescription
            href="https://www.instagram.com/p/C09PsDqLqmRMAg9UxT9qAOcm6qoQvPK5g51dmg0/?igsh=aTU3Ymo1NHh3YjVn"
            src={'/graduation.png'}
          >
            Recebendo a faixa roxa do mestre
            <Link
              href={'https://www.instagram.com/andredecorachadel/'}
              className="font-semibold"
              type="external"
            >{` Andre "Deco" Rachadel `}</Link>
            em Dezembro de 2023.
          </ImageWithDescription>

          <ImageWithDescription
            href="https://www.instagram.com/p/CrHXzzzpn2NNqj0Vqj_Aj-8k3zxdVX_rZLwnjg0/?igsh=MTU1d3d5cDAxczB0eA=="
            src={'/podium.png'}
          >
            Recebendo a medalha de ouro após duas finalizações no Compnet 2023.
          </ImageWithDescription>
        </div>

        <FavoriteBooksCarousel />
        <FavoriteSongsCarousel />
      </FadeInMotion>
    </div>
  );
}
