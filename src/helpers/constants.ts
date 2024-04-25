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
