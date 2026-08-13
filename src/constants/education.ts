import { IconType } from '@/components/ui/icon';
import { BookOpen, Code, GraduationCap, Rocket, School } from 'lucide-react';

export const EDUCATION_ICONS: IconType[] = [
  GraduationCap,
  Rocket,
  Code,
  School,
  BookOpen,
];

export const EDUCATION_FALLBACK_ICON: IconType = GraduationCap;

export const EDUCATION_DETAIL_COUNT = 3;

export const EDUCATION_POSITIONS = EDUCATION_ICONS.map((_, index) => index + 1);
