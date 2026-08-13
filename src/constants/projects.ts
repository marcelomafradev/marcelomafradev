import { IconType } from '@/components/ui/icon';
import {
  Building2,
  GraduationCap,
  Languages,
  ListChecks,
  Swords,
} from 'lucide-react';
import { SOCIAL_LINKS } from './personal';

export type ProjectCategory = 'platform' | 'backend' | 'web' | 'mobile';

export interface ProjectProps {
  id: string;
  i18nKey: string;
  title: string;
  logo?: string;
  logoOnDark?: boolean;
  icon?: IconType;
  href?: string;
  repo?: string;
  stores?: { ios?: string; android?: string };
  technologies: string[];
  categories: ProjectCategory[];
  featured?: boolean;
  confidential?: boolean;
}

export const PROJECTS: ProjectProps[] = [
  {
    id: 'oniapp',
    i18nKey: 'oniapp',
    title: 'Oniapp · Portal do aluno',
    logo: '/companies/onilearning.svg',
    href: 'https://onilearning.com.br/',
    technologies: [
      'React Native',
      'Expo',
      'Expo Router',
      'NativeWind',
      'TypeScript',
      'React Query',
      'EAS',
    ],
    categories: ['mobile', 'platform'],
    featured: true,
    confidential: true,
  },
  {
    id: 'oniapp-api',
    i18nKey: 'oniapp-api',
    title: 'Oniapp · API',
    logo: '/companies/onilearning.svg',
    href: 'https://onilearning.com.br/',
    technologies: [
      'NestJS',
      'TypeScript',
      'TypeORM',
      'MySQL',
      'JWT',
      'Swagger',
      'Docker',
    ],
    categories: ['backend', 'platform'],
    confidential: true,
  },
  {
    id: 'oniapp-admin',
    i18nKey: 'oniapp-admin',
    title: 'Oniapp · Painel administrativo',
    logo: '/companies/onilearning.svg',
    href: 'https://onilearning.com.br/',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'React Query',
    ],
    categories: ['web'],
    confidential: true,
  },
  {
    id: 'seja',
    i18nKey: 'seja',
    title: 'Seja · App',
    logo: '/companies/seja.svg',
    stores: {
      android:
        'https://play.google.com/store/apps/details?id=com.onilearning.bemestar',
      ios: 'https://apps.apple.com/br/app/seja/id6779363294',
    },
    technologies: [
      'React Native',
      'Expo SDK 54',
      'NativeWind',
      'Zustand',
      'React Query',
      'TypeScript',
      'EAS',
    ],
    categories: ['mobile'],
    featured: true,
    confidential: true,
  },
  {
    id: 'seja-api',
    i18nKey: 'seja-api',
    title: 'Seja · API',
    logo: '/companies/seja.svg',
    technologies: [
      'NestJS',
      'TypeScript',
      'TypeORM',
      'MySQL',
      'Firebase Auth',
      'AWS S3',
      'Push',
      'Docker',
    ],
    categories: ['backend', 'platform'],
    confidential: true,
  },
  {
    id: 'comvanilla',
    i18nKey: 'comvanilla',
    title: 'Comvanilla',
    logo: '/companies/comvanilla.svg',
    href: 'https://comvanilla.com.br/',
    technologies: [
      'Next.js',
      'NestJS',
      'gRPC',
      'PostgreSQL',
      'Redis',
      'Turborepo',
      'TypeScript',
    ],
    categories: ['platform', 'web'],
    featured: true,
    confidential: true,
  },
  {
    id: 'postpay-platform',
    i18nKey: 'postpay-platform',
    title: 'Postpay · Plataforma',
    logo: '/companies/postpay.svg',
    href: 'https://postpay.com.br/',
    technologies: [
      'NestJS',
      'Java',
      'Spring Boot',
      'gRPC',
      'RabbitMQ',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    categories: ['platform', 'backend'],
    featured: true,
  },
  {
    id: 'postpay-admin',
    i18nKey: 'postpay-admin',
    title: 'Postpay · Painel administrativo',
    logo: '/companies/postpay.svg',
    href: 'https://postpay.com.br/',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Turborepo',
    ],
    categories: ['web'],
  },
  {
    id: 'postpay-app',
    i18nKey: 'postpay-app',
    title: 'Postpay · App do cliente',
    logo: '/companies/postpay.svg',
    href: 'https://postpay.com.br/',
    technologies: ['React Native', 'Expo', 'TypeScript', 'EAS', 'Push'],
    categories: ['mobile'],
  },
  {
    id: 'mince-joias',
    i18nKey: 'mince',
    title: 'Mince Joias',
    logo: '/companies/mince-joias.png',
    logoOnDark: true,
    href: 'https://www.mincejoias.com.br/',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AWS', 'MongoDB'],
    categories: ['web'],
    featured: true,
  },
  {
    id: 'griebler-remodeling',
    i18nKey: 'griebler',
    title: 'Griebler Remodeling',
    logo: '/companies/griebler-remodeling.svg',
    logoOnDark: true,
    href: 'https://www.grieblerremodeling.com/',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'AWS'],
    categories: ['web'],
  },
];

export const LAB_PROJECTS: ProjectProps[] = [
  {
    id: 'bjjinsights',
    i18nKey: 'bjjinsights',
    title: 'BJJ Insights',
    icon: Swords,
    repo: `${SOCIAL_LINKS.github}/bjjinsights`,
    technologies: ['Next.js', 'Prisma', 'MongoDB', 'NextAuth', 'Tailwind CSS'],
    categories: ['web'],
  },
  {
    id: 'to-do-pro',
    i18nKey: 'todo-pro',
    title: 'Todo Pro',
    icon: ListChecks,
    repo: `${SOCIAL_LINKS.github}/to-do-pro`,
    technologies: ['Next.js', 'Clerk', 'shadcn/ui', 'Tailwind CSS'],
    categories: ['web'],
  },
  {
    id: 'saas-translation',
    i18nKey: 'saas-translation',
    title: 'Translation Chat',
    icon: Languages,
    repo: `${SOCIAL_LINKS.github}/saas-translation`,
    technologies: ['Next.js', 'Firebase', 'Stripe', 'NextAuth', 'Tailwind CSS'],
    categories: ['web'],
  },
  {
    id: 'properties',
    i18nKey: 'properties',
    title: 'Properties',
    icon: Building2,
    repo: `${SOCIAL_LINKS.github}/properties`,
    technologies: [
      'Next.js 14',
      'Prisma',
      'MongoDB',
      'NextAuth',
      'Tailwind CSS',
    ],
    categories: ['web'],
  },
  {
    id: 'edu-sponsor',
    i18nKey: 'edu-sponsor',
    title: 'Edu Sponsor',
    icon: GraduationCap,
    repo: `${SOCIAL_LINKS.github}/edu-sponsor`,
    technologies: ['TypeScript', 'Next.js', 'Node.js'],
    categories: ['web'],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export const PROJECT_FILTERS: ('all' | ProjectCategory)[] = [
  'all',
  'platform',
  'backend',
  'web',
  'mobile',
];
