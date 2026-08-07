import { Icon, IconType } from '@/components/ui/icon';
import {
  Book,
  FolderCheck,
  Home,
  LaptopMinimal,
  Mail,
  Send,
} from 'lucide-react';
import { CONTACT_EMAIL, SOCIAL_LINKS } from './personal';

export interface SidebarItem {
  id: string;
  icon: IconType;
  href: string;
}

export interface SidebarGroup {
  id?: string;
  title?: string;
  hasArrowIcon?: boolean;
  items: SidebarItem[];
}

export const SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    items: [
      {
        id: 'home',
        icon: Home,
        href: '/',
      },
    ],
  },
  {
    id: 'profile',
    title: 'Perfil',
    items: [
      {
        id: 'about',
        icon: Book,
        href: '/about',
      },
      {
        id: 'projects',
        icon: FolderCheck,
        href: '/projects',
      },
      {
        id: 'technologies',
        icon: LaptopMinimal,
        href: '/technologies',
      },
      {
        id: 'contact',
        icon: Send,
        href: '/contact',
      },
    ],
  },
  {
    id: 'social',
    title: 'Redes',
    hasArrowIcon: true,
    items: [
      {
        id: 'email',
        icon: Mail,
        href: `mailto:${CONTACT_EMAIL}`,
      },
      {
        id: 'github',
        icon: Icon.github,
        href: SOCIAL_LINKS.github,
      },
      {
        id: 'linkedin',
        icon: Icon.linkedin,
        href: SOCIAL_LINKS.linkedin,
      },
      {
        id: 'instagram',
        icon: Icon.instagram,
        href: SOCIAL_LINKS.instagram,
      },
    ],
  },
];

export interface SocialChannel {
  id: string;
  icon: IconType;
  href: string;
}

export const SOCIAL_CHANNELS: SocialChannel[] = [
  { id: 'github', icon: Icon.github, href: SOCIAL_LINKS.github },
  { id: 'linkedin', icon: Icon.linkedin, href: SOCIAL_LINKS.linkedin },
  { id: 'email', icon: Mail, href: `mailto:${CONTACT_EMAIL}` },
];

export const RESUME_LINKS = {
  'pt-br': '/documents/marcelo-mafra-cv-br.pdf',
  en: '/documents/marcelo-mafra-cv-en.pdf',
} as const;
