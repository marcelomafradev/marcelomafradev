import { IconType } from '@/components/ui/icon';
import {
  FileText,
  FolderGit2,
  Plug,
  Route,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export interface AiWorkflowPillar {
  id: string;
  icon: IconType;
}

export const AI_WORKFLOW_PILLARS: AiWorkflowPillar[] = [
  { id: 'spec-driven', icon: FileText },
  { id: 'orchestration', icon: Route },
  { id: 'context', icon: FolderGit2 },
  { id: 'tooling', icon: Plug },
  { id: 'verification', icon: ShieldCheck },
  { id: 'review', icon: UserCheck },
];
