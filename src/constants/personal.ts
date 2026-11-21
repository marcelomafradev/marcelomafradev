export const CONTACT_EMAIL = 'marcelomafradev@gmail.com';

export const CHESS_COM_USERNAME = 'marcelomafradev';
export const CHESS_COM_PROFILE_URL = `https://www.chess.com/member/${CHESS_COM_USERNAME}`;

export const SOCIAL_LINKS = {
  github: 'https://github.com/marcelomafradev',
  linkedin: 'https://www.linkedin.com/in/marcelomafradev/',
  instagram: 'https://www.instagram.com/marcelomafradev01',
} as const;

export const COMPANY = {
  legalName: 'Mafradev Desenvolvimento de Software LTDA',
  tradeName: 'Mafradev',
  cnpj: '69.635.734/0001-43',
} as const;

export const PERSONAL_INFO = {
  title: 'Tech Lead · Software Engineer',
  name: 'Marcelo Mafra',
  image: '/me.webp',
  location: 'Florianópolis, SC · Remoto',
  stack: [
    'TypeScript',
    'NestJS',
    'Next.js',
    'React',
    'React Native',
    'Node.js',
    'gRPC',
    'RabbitMQ',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Java / Spring',
  ],
};

export const METRICS = [
  { id: 'services', value: '50', accent: '+' },
  { id: 'apps', value: '6' },
  { id: 'monorepos', value: '8' },
  { id: 'sectors', value: '4' },
] as const;
