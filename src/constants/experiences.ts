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
    detailsCount: 4,
  },
  {
    logo: '/companies/spcapital.svg',
    logoOnDark: true,
    title: 'SP Capital',
    detailsCount: 4,
  },
  {
    href: 'https://comvanilla.com.br/',
    logo: '/companies/comvanilla.svg',
    title: 'Comvanilla',
    detailsCount: 4,
  },
  {
    href: 'https://ritmar.com.br/',
    logo: '/companies/ritmar.svg',
    title: 'Ritmar',
    detailsCount: 4,
  },
  {
    logo: '/brand/mark.svg',
    title: 'Mafradev',
    detailsCount: 3,
  },
  {
    href: 'https://postpay.com.br/',
    logo: '/companies/postpay.svg',
    title: 'Postpay',
    detailsCount: 4,
  },
];
