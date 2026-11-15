interface Experience {
  href?: string;
  logo: string;
  logoOnDark?: boolean;
  title: string;
  detailsCount: number;
}

export const EXPERIENCES: Experience[] = [
  {
    href: 'https://onilearning.com.br/',
    logo: '/companies/onilearning.svg',
    title: 'Onilearning',
    detailsCount: 7,
  },
  {
    logo: '/companies/spcapital.svg',
    logoOnDark: true,
    title: 'SP Capital',
    detailsCount: 7,
  },
  {
    href: 'https://comvanilla.com.br/',
    logo: '/companies/comvanilla.svg',
    title: 'Comvanilla',
    detailsCount: 7,
  },
  {
    href: 'https://ritmar.com.br/',
    logo: '/companies/ritmar.svg',
    title: 'Ritmar',
    detailsCount: 4,
  },
  {
    href: 'https://postpay.com.br/',
    logo: '/companies/postpay.svg',
    title: 'Postpay',
    detailsCount: 7,
  },
  {
    href: 'https://www.grieblerremodeling.com/',
    logo: '/companies/griebler-remodeling.svg',
    logoOnDark: true,
    title: 'Griebler Remodeling',
    detailsCount: 4,
  },
  {
    href: 'https://www.mincejoias.com.br/',
    logo: '/companies/mince-joias.png',
    logoOnDark: true,
    title: 'Mince Joias',
    detailsCount: 5,
  },
];
