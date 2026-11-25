import { IconType } from '@/components/ui/icon';
import { BrainCircuit, Building2, CreditCard } from 'lucide-react';

export interface CaseStudy {
  id: string;
  icon: IconType;
  stack: string[];
  highlightsCount: number;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'credit-ai',
    icon: BrainCircuit,
    stack: [
      'React',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Playwright',
      'Claude API',
      'SQL Server',
    ],
    highlightsCount: 3,
  },
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
