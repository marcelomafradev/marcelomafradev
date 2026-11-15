import { IconType } from '@/components/ui/icon';
import { Compass, Layers, Sparkles, Workflow } from 'lucide-react';

export type ServiceOfferingId = 'architecture' | 'product' | 'platform' | 'ai';

export interface ServiceOffering {
  id: ServiceOfferingId;
  icon: IconType;
}

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  { id: 'architecture', icon: Compass },
  { id: 'product', icon: Layers },
  { id: 'platform', icon: Workflow },
  { id: 'ai', icon: Sparkles },
];

export type ServiceProcessStepId = 'discover' | 'design' | 'deliver';

export interface ServiceProcessStep {
  id: ServiceProcessStepId;
}

export const SERVICE_PROCESS_STEPS: ServiceProcessStep[] = [
  { id: 'discover' },
  { id: 'design' },
  { id: 'deliver' },
];
