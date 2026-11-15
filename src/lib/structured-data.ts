import { COMPANY, SOCIAL_LINKS } from '@/constants';
import { SITE_URL } from '@/lib/site';

const PERSON_ID = `${SITE_URL}/#person`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

interface WebSiteNode {
  '@type': 'WebSite';
  name: string;
  url: string;
}

interface PersonNode {
  '@type': 'Person';
  '@id': string;
  name: string;
  url: string;
  jobTitle: string;
  image: string;
  sameAs: string[];
  worksFor: { '@id': string };
}

interface OrganizationNode {
  '@type': 'Organization';
  '@id': string;
  name: string;
  legalName: string;
  taxID: string;
  url: string;
  logo: string;
  founder: { '@id': string };
}

interface StructuredData {
  '@context': 'https://schema.org';
  '@graph': [WebSiteNode, PersonNode, OrganizationNode];
}

export function buildStructuredData(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Marcelo Mafra',
        url: SITE_URL,
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Marcelo Mafra',
        url: SITE_URL,
        jobTitle: 'Tech Lead / Full Stack Engineer',
        image: `${SITE_URL}/me.webp`,
        sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
        worksFor: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: COMPANY.tradeName,
        legalName: COMPANY.legalName,
        taxID: COMPANY.cnpj,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/avatar-1024.png`,
        founder: { '@id': PERSON_ID },
      },
    ],
  };
}
