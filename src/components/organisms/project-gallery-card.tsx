'use client';

import { ProjectProps } from '@/constants';
import { cn } from '@/lib/utils';
import { Link } from '@/components/atoms';
import { ProjectMedia } from '@/components/molecules';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Lock } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { useMemo, useState } from 'react';

export interface ProjectGalleryCardLabels {
  visit: string;
  details: string;
  stack: string;
  role: string;
  confidential: string;
  source: string;
  download: string;
}

interface ProjectGalleryCardProps extends ProjectGalleryCardLabels {
  project: ProjectProps;
  description: string;
  roleDescription: string;
  index?: number;
  className?: string;
}

export const ProjectGalleryCard = ({
  project,
  description,
  roleDescription,
  visit,
  details,
  stack,
  role,
  confidential,
  source,
  download,
  index,
  className,
}: ProjectGalleryCardProps) => {
  const storeLink = project.stores?.ios ?? project.stores?.android;
  const [open, setOpen] = useState(false);
  const techPreview = useMemo(
    () => project.technologies.slice(0, 4),
    [project.technologies],
  );
  const techRest = project.technologies.length - techPreview.length;

  return (
    <>
      <Card
        className={cn(
          'min-h-88 border-border/60 bg-card group flex h-full flex-col overflow-hidden transition-colors',
          'hover:border-foreground/25',
          className,
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="aspect-16/10 min-h-42 border-border/60 bg-muted relative w-full cursor-pointer overflow-hidden border-b text-left"
          aria-label={project.title}
        >
          <ProjectMedia
            title={project.title}
            logo={project.logo}
            logoOnDark={project.logoOnDark}
            icon={project.icon}
          />
          {project.confidential ? (
            <Badge
              variant="outline"
              className="border-border/70 bg-background absolute right-3 top-3 max-w-[calc(100%-1.5rem)] gap-1 font-normal"
            >
              <Lock className="size-3" />
              {confidential}
            </Badge>
          ) : null}
        </button>

        <CardHeader className="space-y-2 pb-3">
          <div className="flex items-baseline gap-2.5">
            {index !== undefined ? (
              <span className="numeric text-muted-foreground/70 text-xs">
                {String(index).padStart(2, '0')}
              </span>
            ) : null}

            <CardTitle className="text-lg tracking-[-0.02em]">
              {project.title}
            </CardTitle>
          </div>

          <CardDescription className="line-clamp-3 text-pretty leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3 pb-3 pt-0">
          <div className="space-y-1">
            <p className="eyebrow">{role}</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {roleDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {techPreview.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-muted text-muted-foreground border-transparent font-mono text-[11px] font-normal"
              >
                {tech}
              </Badge>
            ))}
            {techRest > 0 ? (
              <Badge
                variant="outline"
                className="text-muted-foreground font-mono text-[11px] font-normal"
              >
                +{techRest}
              </Badge>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="border-border/50 bg-muted/15 mt-auto gap-2 border-t pt-4">
          <Button
            variant="secondary"
            size="sm"
            className="min-h-11 flex-1"
            onClick={() => setOpen(true)}
          >
            {details}
          </Button>

          {project.href || storeLink || project.repo ? (
            <Button
              size="sm"
              className="min-h-11 flex-1 gap-1.5"
              render={
                <Link
                  href={project.href ?? storeLink ?? project.repo!}
                  type="external"
                />
              }
            >
              {project.href ? visit : storeLink ? download : source}
              {project.repo && !project.href && !storeLink ? (
                <Icon.github className="size-4" />
              ) : (
                <ArrowUpRight className="size-4" />
              )}
            </Button>
          ) : null}
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85dvh] max-w-2xl overflow-y-auto">
          <div className="border-border/60 relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border">
            <ProjectMedia
              title={project.title}
              logo={project.logo}
              logoOnDark={project.logoOnDark}
              icon={project.icon}
            />
          </div>

          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-balance text-xl tracking-tight">
              {project.title}
            </DialogTitle>
            <DialogDescription className="wrap-break-word text-pretty text-sm leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="border-border/60 bg-muted/30 space-y-1.5 rounded-lg border p-3">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              {role}
            </p>
            <p className="text-sm leading-relaxed">{roleDescription}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
              {stack}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="font-normal">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {project.confidential ? (
            <p className="text-muted-foreground flex items-start gap-2 text-xs leading-relaxed">
              <Lock className="mt-0.5 size-3.5 shrink-0" />
              {confidential}
            </p>
          ) : null}

          {project.href || project.repo || project.stores ? (
            <DialogFooter className="gap-2 sm:justify-start">
              {project.href ? (
                <Button
                  className="w-full gap-2 sm:w-auto"
                  render={<Link href={project.href} type="external" />}
                >
                  {visit}
                  <ArrowUpRight className="size-4" />
                </Button>
              ) : null}

              {project.stores?.ios ? (
                <Button
                  variant={project.href ? 'outline' : 'default'}
                  className="w-full gap-2 sm:w-auto"
                  render={<Link href={project.stores.ios} type="external" />}
                >
                  App Store
                  <ArrowUpRight className="size-4" />
                </Button>
              ) : null}

              {project.stores?.android ? (
                <Button
                  variant="outline"
                  className="w-full gap-2 sm:w-auto"
                  render={
                    <Link href={project.stores.android} type="external" />
                  }
                >
                  Google Play
                  <ArrowUpRight className="size-4" />
                </Button>
              ) : null}

              {project.repo ? (
                <Button
                  variant={project.href ? 'outline' : 'default'}
                  className="w-full gap-2 sm:w-auto"
                  render={<Link href={project.repo} type="external" />}
                >
                  {source}
                  <Icon.github className="size-4" />
                </Button>
              ) : null}
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
};
