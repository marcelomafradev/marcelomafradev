import { IconType } from '@/components/ui/icon';
import {
  Book,
  FolderCheck,
  Github,
  Home,
  Instagram,
  LaptopMinimal,
  Linkedin,
  Mail,
  Rss,
  Twitter,
} from 'lucide-react';

export interface SidebarItem {
  name: string;
  icon: IconType;
  href: string;
  isInactive?: boolean;
}

export interface SidebarGroup {
  title?: string;
  hasArrowIcon?: boolean;
  items: SidebarItem[];
}

export const SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    items: [
      {
        name: 'Início',
        icon: Home,
        href: '/',
      },
    ],
  },
  {
    title: 'Perfil',
    items: [
      {
        name: 'Sobre',
        icon: Book,
        href: '/about',
      },
      {
        name: 'Projetos',
        icon: FolderCheck,
        href: '/projects',
      },
      {
        name: 'Habilidades',
        icon: LaptopMinimal,
        href: '/skills',
      },
    ],
  },
  {
    title: 'Diário',
    items: [
      {
        name: 'Blog',
        icon: Rss,
        href: '/blog',
        isInactive: true,
      },
      {
        name: 'Mensagens',
        icon: Book,
        href: '/messages',
      },
    ],
  },
  {
    title: 'Redes',
    hasArrowIcon: true,
    items: [
      {
        name: 'Email',
        icon: Mail,
        href: 'https://www.instagram.com/officialmafra',
      },
      {
        name: 'Github',
        icon: Github,
        href: 'https://github.com/marcelomafradev',
      },
      {
        name: 'LinkedIn',
        icon: Linkedin,
        href: 'https://www.linkedin.com/in/marcelomafradev/',
      },
      {
        name: 'X/Twitter',
        icon: Twitter,
        href: 'https://www.instagram.com/officialmafra',
      },
      {
        name: 'Instagram',
        icon: Instagram,
        href: 'https://www.instagram.com/officialmafra',
      },
    ],
  },
];

export const PERSONAL_INFO = {
  title: 'Fullstack Developer',
  name: 'Marcelo Mafra',
  image: '/marcelomafra.jpg',
  stack: ['TypeScript', 'JavaScript', 'ReactJs', 'NextJs', 'NodeJs'],
  paragraphs: [
    'Olá, eu sou Marcelo Mafra, um desenvolvedor full-stack apaixonado por criar soluções digitais inovadoras. Com proficiência em TS, JS, ReactJS e NodeJS, minha jornada tecnológica me levou a dominar tanto o front-end quanto o back-end do desenvolvimento web.',
    'Do design da interface do usuário à arquitetura de sistemas complexos, estou sempre em busca de excelência técnica e inovação. Sou motivado pela oportunidade de enfrentar novos desafios e aprender constantemente, buscando maneiras de aprimorar minhas habilidades e contribuir para o sucesso dos projetos em que estou envolvido.',
    'Estou ansioso para colaborar em projetos empolgantes.',
  ],
};

export const EXPERIENCES = [
  {
    href: 'https://postpay.com.br/',
    logo: '/companies/postpay.svg',
    title: 'Postpay',
    description: 'Desenvolvedor Fullstack',
    workingTime: '2024 - Atualmente',
  },
  {
    href: 'https://www.mincejoias.com/',
    logo: '/companies/mince-joias.png',
    title: 'Mince Joias',
    description: 'Desenvolvedor Fullstack - Manutenção',
    workingTime: '2023 - 2024 • Freelancer',
  },
  {
    href: 'https://www.grieblerremodeling.com/',
    logo: '/companies/griebler-remodeling.svg',
    title: 'Griebler Remodeling',
    description: 'Desenvolvedor Fullstack - Manutenção',
    workingTime: '2022 - 2024 • Freelancer',
  },
];
