'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface CopyEmailButtonProps {
  email: string;
  label: string;
  copiedLabel: string;
}

export const CopyEmailButton = ({
  email,
  label,
  copiedLabel,
}: CopyEmailButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success(copiedLabel);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" size="sm" onClick={copy} className="gap-2">
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {label}
    </Button>
  );
};
