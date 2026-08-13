import { AvailabilityBadge, PageHeading } from '@/components/atoms';
import { ContactChannel, CopyEmailButton } from '@/components/molecules';
import { ContactForm } from '@/components/organisms';
import { Icon } from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/constants';
import { getTranslations } from 'next-intl/server';
import { Clock, Mail, MapPin } from 'lucide-react';

export const ContactTemplate = async () => {
  const t = await getTranslations('contact');
  const tHero = await getTranslations('homepage.hero');

  return (
    <div className="align-page">
      <div className="space-y-4">
        <AvailabilityBadge label={t('availability')} />
        <PageHeading title={t('title')} description={t('description')} />
        <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Clock className="size-3.5" />
          {t('response-time')}
        </p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ContactForm />

        <Card className="border-border/60 bg-card/60 h-fit">
          <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
            <CardTitle className="text-base tracking-tight">
              {t('channels.title')}
            </CardTitle>

            <CopyEmailButton
              email={CONTACT_EMAIL}
              label={t('channels.copy')}
              copiedLabel={t('channels.copied')}
            />
          </CardHeader>

          <CardContent className="space-y-2.5">
            <ContactChannel
              icon={Mail}
              label={t('channels.email')}
              value={CONTACT_EMAIL}
              href={`mailto:${CONTACT_EMAIL}`}
            />
            <ContactChannel
              icon={Icon.linkedin}
              label={t('channels.linkedin')}
              value="in/marcelomafradev"
              href={SOCIAL_LINKS.linkedin}
            />
            <ContactChannel
              icon={Icon.github}
              label={t('channels.github')}
              value="@marcelomafradev"
              href={SOCIAL_LINKS.github}
            />
            <ContactChannel
              icon={MapPin}
              label={t('channels.location')}
              value={tHero('location')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
