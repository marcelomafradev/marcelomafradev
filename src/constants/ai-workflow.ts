import { IconType } from '@/components/ui/icon';
import { FileText, Route, UserCheck } from 'lucide-react';

export interface AiWorkflowPillar {
  id: string;
  icon: IconType;
}

export const AI_WORKFLOW_PILLARS: AiWorkflowPillar[] = [
  { id: 'spec-driven', icon: FileText },
  { id: 'orchestration', icon: Route },
  { id: 'review', icon: UserCheck },
];
