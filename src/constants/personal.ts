export const CONTACT_EMAIL = 'marcelomafradev@gmail.com';

export const CHESS_COM_USERNAME = 'marcelomafradev';
export const CHESS_COM_PROFILE_URL = `https://www.chess.com/member/${CHESS_COM_USERNAME}`;

export const SOCIAL_LINKS = {
  github: 'https://github.com/marcelomafradev',
  linkedin: 'https://www.linkedin.com/in/marcelomafradev/',
  instagram: 'https://www.instagram.com/marcelomafradev',
} as const;

export const PERSONAL_INFO = {
  title: 'Fullstack Developer | Microservices Expert',
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
  { id: 'services', value: '21', accent: '+' },
  { id: 'apps', value: '6' },
  { id: 'monorepos', value: '4' },
  { id: 'sectors', value: '3' },
] as const;
