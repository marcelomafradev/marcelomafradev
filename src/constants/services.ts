import { IconType } from '@/components/ui/icon';
import {
  Bot,
  Compass,
  Globe,
  Monitor,
  Network,
  Smartphone,
} from 'lucide-react';

export type ServiceOfferingId =
  'web' | 'mobile' | 'desktop' | 'backend' | 'automation' | 'architecture';

export interface ServiceOffering {
  id: ServiceOfferingId;
  icon: IconType;
}

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  { id: 'web', icon: Globe },
  { id: 'mobile', icon: Smartphone },
  { id: 'desktop', icon: Monitor },
  { id: 'backend', icon: Network },
  { id: 'automation', icon: Bot },
  { id: 'architecture', icon: Compass },
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
