'use client';

import { usePathname, useRouter } from 'next/navigation';
import { PERSONAL_INFO, SIDEBAR_ITEMS } from '@/helpers/constants';
import {
  FadeInMotion,
  DropdownSettings,
  SpotifyIndicator,
  Image,
} from '@/components/app';
import NavigationButton from '../navigation-button';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <aside className="relative hidden h-screen flex-col justify-between border-r md:w-80 lg:flex">
      <div>
        {!isHomepage && (
          <div className="flex items-center justify-start gap-2 border-b p-4">
            <Image
              src={PERSONAL_INFO.image}
              alt={`Marcelo Mafra image`}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-sm italic">{PERSONAL_INFO.name}</h2>
              <p className="text-xs font-light text-muted-foreground">
                {PERSONAL_INFO.title}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 p-4">
          {SIDEBAR_ITEMS.map(({ title, items, hasArrowIcon }, index) => (
            <FadeInMotion
              key={index}
              delay={0.3 + 0.15 * index}
              className="flex flex-col gap-2"
            >
              <h2 className="px-2 text-xs font-medium italic text-muted-foreground">
                {title}
              </h2>

              <div className="flex flex-col">
                {items.map((item, index) => (
                  <NavigationButton
                    {...item}
                    key={index}
                    pathname={pathname}
                    onClick={() => {
                      !item.isInactive && router.push(item.href);
                    }}
                    hasArrowIcon={hasArrowIcon || false}
                  />
                ))}
              </div>
            </FadeInMotion>
          ))}
        </div>
      </div>

      <div className="flex h-16 items-center justify-between gap-6 border-t pr-3 pt-3">
        <FadeInMotion delay={0.3}>
          <SpotifyIndicator />
        </FadeInMotion>

        <FadeInMotion delay={0.5}>
          <DropdownSettings />
        </FadeInMotion>
      </div>
    </aside>
  );
};

export default Sidebar;
