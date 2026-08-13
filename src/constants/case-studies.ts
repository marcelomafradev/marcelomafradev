import { IconType } from '@/components/ui/icon';
import { Building2, CreditCard, GraduationCap, ScanLine } from 'lucide-react';

export interface CaseStudy {
  id: string;
  icon: IconType;
  stack: string[];
  highlightsCount: number;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'payments',
    icon: CreditCard,
    stack: [
      'NestJS',
      'Java / Spring Boot',
      'gRPC',
      'RabbitMQ',
      'PostgreSQL',
      'Redis',
      'React Native',
      'Next.js',
    ],
    highlightsCount: 3,
  },
  {
    id: 'edtech',
    icon: GraduationCap,
    stack: [
      'React Native',
      'Expo / EAS',
      'NestJS',
      'MySQL',
      'Next.js',
      'Ionic / Angular',
      'GitHub Actions',
    ],
    highlightsCount: 3,
  },
  {
    id: 'spectroscopy',
    icon: ScanLine,
    stack: [
      'Next.js PWA',
      'Tauri / Rust',
      'NestJS',
      'PostgreSQL RLS',
      'Turborepo',
      'Storybook',
    ],
    highlightsCount: 3,
  },
  {
    id: 'realestate',
    icon: Building2,
    stack: [
      'NestJS',
      'gRPC',
      'API Gateway',
      'PostgreSQL',
      'Redis',
      'Next.js',
      'Turborepo',
    ],
    highlightsCount: 3,
  },
];
