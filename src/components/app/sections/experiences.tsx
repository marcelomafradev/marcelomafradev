'use client';

import { EXPERIENCES } from '@/helpers/constants';
import CustomCard from '../custom-card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Telescope } from 'lucide-react';
import Link from 'next/link';

const Experiences = () => {
  const router = useRouter();

  function handleNavigate(href: string) {
    return router.push(href);
  }

  return (
    <section>
      <CustomCard
        title="💼 Experiências"
        linkTitle="Contrate-me"
        href="https://www.linkedin.com/in/marcelomafradev/"
      >
        <div className=" space-y-4">
          {EXPERIENCES.map(
            ({ description, logo, title, workingTime, href }, index) => (
              <div key={index} className="flex items-start gap-4">
                <Image
                  src={logo}
                  alt={`${title} logo`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-10 w-10 cursor-pointer rounded-full border p-1"
                  onClick={() => handleNavigate(href)}
                />

                <div className="space-y-0.5">
                  <h2
                    onClick={() => handleNavigate(href)}
                    className="cursor-pointer text-sm font-medium text-secondary-foreground"
                  >
                    {title}
                  </h2>
                  <p className="text-[0.7rem] md:text-xs">{description}</p>
                  <p className="text-[0.7rem] md:text-xs">{workingTime}</p>
                </div>
              </div>
            ),
          )}

          <Button
            className="w-full gap-2"
            variant={'secondary'}
            size={'sm'}
            asChild
          >
            <Link
              href={'/documents/marcelomafra-br.pdf'}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visualizar currículo <Telescope size={18} />
            </Link>
          </Button>
        </div>
      </CustomCard>
    </section>
  );
};

export default Experiences;
