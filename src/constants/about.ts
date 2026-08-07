import { IconType } from '@/components/ui/icon';
import { BookOpen, Dumbbell, MapPin, Music2 } from 'lucide-react';

export const INSTAGRAM_MASTER_PROFILE =
  'https://www.instagram.com/andredecorachadel/';

export const ABOUT_HIGHLIGHT_ICONS: Record<string, IconType> = {
  location: MapPin,
  train: Dumbbell,
  music: Music2,
  books: BookOpen,
};

export interface AboutMoment {
  id: string;
  src: string;
  href: string;
}

export const ABOUT_MOMENTS: AboutMoment[] = [
  {
    id: 'championship',
    src: '/championship.webp',
    href: 'https://www.instagram.com/p/CrMEusGJnmG_EqARjAW3_OjQkza864YRx7GbOU0/?igsh=MWtya25lYTU4MW9tcg==',
  },
  {
    id: 'graduation',
    src: '/graduation.webp',
    href: 'https://www.instagram.com/p/C09PsDqLqmRMAg9UxT9qAOcm6qoQvPK5g51dmg0/?igsh=aTU3Ymo1NHh3YjVn',
  },
  {
    id: 'podium',
    src: '/podium.webp',
    href: 'https://www.instagram.com/p/CrHXzzzpn2NNqj0Vqj_Aj-8k3zxdVX_rZLwnjg0/?igsh=MTU1d3d5cDAxczB0eA==',
  },
];
