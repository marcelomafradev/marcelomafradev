import { IconType } from '@/components/ui/icon';
import {
  Book,
  FolderCheck,
  Github,
  Home,
  Instagram,
  LaptopMinimal,
  Linkedin,
  Mail,
  Rss,
} from 'lucide-react';

export interface SidebarItem {
  id: number;
  name: string;
  icon: IconType;
  href: string;
  isInactive?: boolean;
}

export interface SidebarGroup {
  title?: string;
  hasArrowIcon?: boolean;
  items: SidebarItem[];
}

export const SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    items: [
      {
        id: 0,
        name: 'Início',
        icon: Home,
        href: '/',
      },
    ],
  },
  {
    title: 'Perfil',
    items: [
      {
        id: 1,
        name: 'Sobre',
        icon: Book,
        href: '/about',
      },
      {
        id: 2,
        name: 'Projetos',
        icon: FolderCheck,
        href: '/projects',
      },
      {
        id: 3,
        name: 'Tecnologias',
        icon: LaptopMinimal,
        href: '/technologies',
      },
    ],
  },
  {
    title: 'Diário',
    items: [
      {
        id: 4,
        name: 'Blog',
        icon: Rss,
        href: '/blog',
        isInactive: true,
      },
    ],
  },
  {
    title: 'Redes',
    hasArrowIcon: true,
    items: [
      {
        id: 6,
        name: 'Email',
        icon: Mail,
        href: 'mailto:marcelomafradev@gmail.com',
      },
      {
        id: 7,
        name: 'Github',
        icon: Github,
        href: 'https://github.com/marcelomafradev',
      },
      {
        id: 8,
        name: 'LinkedIn',
        icon: Linkedin,
        href: 'https://www.linkedin.com/in/marcelomafradev/',
      },
      {
        id: 9,
        name: 'Instagram',
        icon: Instagram,
        href: 'https://www.instagram.com/marcelomafradev',
      },
    ],
  },
];

export const PERSONAL_INFO = {
  title: 'Fullstack Developer | Microservices Expert',
  name: 'Marcelo Mafra',
  image: '/me.jpg',
  stack: [
    'TypeScript',
    'React',
    'NextJs',
    'NodeJs',
    'NestJS',
    'React Native',
    'gRPC',
    'RabbitMQ',
    'Docker',
    'GraphQL',
  ],
};

export const EXPERIENCES = [
  {
    href: 'https://postpay.com.br/',
    logo: '/companies/postpay.svg',
    title: 'Postpay',
    description: 'Desenvolvedor Fullstack',
    workingTime: '2024 - Atualmente',
    detailsCount: 6,
  },
  {
    href: 'https://www.mincejoias.com.br/',
    logo: '/companies/mince-joias.png',
    title: 'Mince Joias',
    description: 'Desenvolvedor Fullstack - Manutenção',
    workingTime: '2023 - 2024 • Freelancer',
    detailsCount: 6,
  },
  {
    href: 'https://www.grieblerremodeling.com/',
    logo: '/companies/griebler-remodeling.svg',
    title: 'Griebler Remodeling',
    description: 'Desenvolvedor Fullstack - Manutenção',
    workingTime: '2022 - 2024 • Freelancer',
    detailsCount: 3,
  },
];

export interface ProjectProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  github: string;
  side: 'left' | 'right';
}

export const PROJECTS: ProjectProps[] = [
  {
    title: 'Mince joias',
    description:
      'Uma loja online de joias finas, oferecendo uma coleção elegante e moderna para todas as ocasiões.',
    image: '/projects/mince-joias.png',
    href: 'https://mince-preview.vercel.app/',
    github: 'https://github.com/marcelomafradev/mince',
    side: 'left',
  },
  {
    title: 'Griebler Remodeling',
    description:
      'Especialistas em remodelação, transformando visões arquitetônicas em realidade para residências e empresas.',
    image: '/projects/griebler-remodeling.png',
    href: 'https://www.grieblerremodeling.com/',
    github: 'https://github.com/marcelomafradev/griebler-remodeling',
    side: 'right',
  },
  {
    title: 'BJJ Insights',
    description:
      'Plataforma online para análises e insights de Jiu-Jitsu Brasileiro',
    image: '/projects/bjj-insights.png',
    github: 'https://github.com/marcelomafradev/bjjinsights',
    side: 'left',
  },
  {
    title: 'Todo Pro',
    description:
      'Aplicativo de gerenciamento de tarefas com estatísticas visando a produtividade',
    image: '/projects/todo-pro.png',
    github: 'https://github.com/marcelomafradev/to-do-pro',
    side: 'right',
  },
  {
    title: 'Twitter Clone',
    description: 'Recriação da plataforma de mídia social "Twitter"',
    image: '/projects/twitter.png',
    github: 'https://github.com/marcelomafradev/Twitter_Clone',
    side: 'left',
  },
];

export const BOOKS = [
  {
    href: 'https://a.co/d/g9Mu08C',
    image: '/books/the-courage-to-be-disliked.jpg',
  },
  {
    href: 'https://a.co/d/59OXF1o',
    image: '/books/emotional-intelligence.jpg',
  },
  {
    href: 'https://a.co/d/3SVB4Xk',
    image: '/books/how-to-win-friends-and-influence-people.jpg',
  },
  {
    href: 'https://a.co/d/406cf8f',
    image: '/books/dopamine-nation.jpg',
  },
  {
    href: 'https://a.co/d/eUWOZO1',
    image: '/books/outwitting-the-devil.jpg',
  },
  {
    href: 'https://a.co/d/eYqWVbE',
    image: '/books/the-power-of-action.jpg',
  },
];

export const STACK = [
  {
    title: 'frontend',
    items: [
      {
        name: 'HTML',
        icon: '/techs/html.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
      {
        name: 'Typescript',
        icon: '/techs/typescript.svg',
        link: 'https://www.typescriptlang.org',
      },
      {
        name: 'JavaScript',
        icon: '/techs/javascript.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'React',
        icon: '/techs/react.svg',
        link: 'https://react.dev',
      },
      {
        name: 'Vite',
        icon: '/techs/vite.svg',
        link: 'https://vitejs.dev',
      },
      {
        name: 'NextJS',
        icon: '/techs/nextjs.svg',
        link: 'https://nextjs.org',
        invert: true,
      },
      {
        name: 'CSS',
        icon: '/techs/css.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      },
      {
        name: 'Sass',
        icon: '/techs/sass.svg',
        link: 'https://sass-lang.com',
      },
      {
        name: 'Styled Components',
        icon: '/techs/styled-components.svg',
        link: 'https://styled-components.com',
      },
      {
        name: 'TailwindCSS',
        icon: '/techs/tailwindcss.svg',
        link: 'https://tailwindcss.com',
      },
      {
        name: 'Shadcn/ui',
        icon: '/techs/shadcn.svg',
        link: 'https://ui.shadcn.com/',
        invert: true,
      },
      {
        name: 'Radix',
        icon: '/techs/radix.svg',
        link: 'https://www.radix-ui.com',
        invert: true,
      },
      {
        name: 'Chakra UI',
        icon: '/techs/chakra.svg',
        link: 'https://v2.chakra-ui.com/',
      },
      {
        name: 'Framer Motion',
        icon: '/techs/framer-motion.svg',
        link: 'https://www.framer.com/motion',
      },
      {
        name: 'Zustand',
        icon: '/techs/zustand.svg',
        link: 'https://zustand-demo.pmnd.rs',
      },
      {
        name: 'Tanstack Query',
        icon: '/techs/tanstack-query.svg',
        link: 'https://tanstack.com/query',
      },
    ],
  },
  {
    title: 'backend',
    items: [
      {
        name: 'Node',
        icon: '/techs/nodejs.svg',
        link: 'https://nodejs.org',
      },
      {
        name: 'Typescript',
        icon: '/techs/typescript.svg',
        link: 'https://www.typescriptlang.org',
      },
      {
        name: 'JavaScript',
        icon: '/techs/javascript.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'NestJs',
        icon: '/techs/nestjs.svg',
        link: 'https://nestjs.com/',
      },
      {
        name: 'Express',
        icon: '/techs/express.svg',
        link: 'https://expressjs.com',
      },
      {
        name: 'Prisma',
        icon: '/techs/prisma.svg',
        link: 'https://www.prisma.io',
        invert: true,
      },
      {
        name: 'Typeorm',
        icon: '/techs/typeorm.svg',
        link: 'https://typeorm.io/',
      },
      {
        name: 'Graphql',
        icon: '/techs/graphql.svg',
        link: 'https://graphql.org/',
      },
      {
        name: 'RabbitMQ',
        icon: '/techs/rabbitmq.svg',
        link: 'https://www.rabbitmq.com',
      },
      {
        name: 'gRPC',
        icon: '/techs/grpc.svg',
        link: 'https://grpc.io',
      },
      {
        name: 'Redis',
        icon: '/techs/redis.svg',
        link: 'https://redis.io',
      },
    ],
  },
  {
    title: 'mobile',
    items: [
      {
        name: 'React Native',
        icon: '/techs/react.svg',
        link: 'https://reactnative.dev',
      },
      {
        name: 'Expo',
        icon: '/techs/expo.svg',
        link: 'https://expo.dev',
      },
      {
        name: 'EAS',
        icon: '/techs/expo.svg',
        link: 'https://expo.dev/eas',
      },
      {
        name: 'NativeWind',
        icon: '/techs/tailwindcss.svg',
        link: 'https://nativewind.dev',
      },
    ],
  },
  {
    title: 'database',
    items: [
      {
        name: 'MongoDB',
        icon: '/techs/mongodb.svg',
        link: 'https://www.mongodb.com',
      },
      {
        name: 'PostgreSQL',
        icon: '/techs/postgresql.svg',
        link: 'https://www.postgresql.org',
      },
      {
        name: 'MySQL',
        icon: '/techs/mysql.svg',
        link: 'https://www.mysql.com',
      },
      {
        name: 'Redis',
        icon: '/techs/redis.svg',
        link: 'https://redis.io',
      },
    ],
  },
  {
    title: 'infrastructure',
    items: [
      {
        name: 'Vercel',
        icon: '/techs/vercel.svg',
        link: 'https://vercel.com',
        invert: true,
      },
      {
        name: 'Supabase',
        icon: '/techs/supabase.svg',
        link: 'https://supabase.io',
      },
      {
        name: 'Firebase',
        icon: '/techs/firebase.svg',
        link: 'https://firebase.google.com',
      },
      {
        name: 'Docker',
        icon: '/techs/docker.svg',
        link: 'https://www.docker.com',
      },
      {
        name: 'AWS',
        icon: '/techs/aws.svg',
        link: 'https://aws.amazon.com',
      },
      {
        name: 'Kubernetes',
        icon: '/techs/kubernetes.svg',
        link: 'https://kubernetes.io',
      },
      {
        name: 'PM2',
        icon: '/techs/pm2.svg',
        link: 'https://pm2.keymetrics.io',
      },
    ],
  },
  {
    title: 'apps',
    items: [
      {
        name: 'Visual Studio Code',
        icon: '/techs/vscode.svg',
        link: 'https://code.visualstudio.com',
      },
      {
        name: 'Spotify',
        icon: '/techs/spotify.svg',
        link: 'https://www.spotify.com',
      },
      {
        name: 'Figma',
        icon: '/techs/figma.svg',
        link: 'https://figma.com',
      },
      {
        name: 'Insomnia',
        icon: '/techs/insomnia.svg',
        link: 'https://insomnia.rest/',
      },
      {
        name: 'Notion',
        icon: '/techs/notion.svg',
        link: 'https://www.notion.so',
      },

      {
        name: 'Beekeeper',
        icon: '/techs/beekeeper.svg',
        link: 'https://www.beekeeperstudio.io',
      },
    ],
  },
  {
    title: 'outros',
    items: [
      {
        name: 'Github',
        icon: '/techs/github.svg',
        link: 'https://github.com',
        invert: true,
      },
      {
        name: 'Git',
        icon: '/techs/git.svg',
        link: 'https://git-scm.com',
      },
      {
        name: 'Storybook',
        icon: '/techs/storybook.svg',
        link: 'https://storybook.js.org',
      },
      {
        name: 'Vercel Analytics',
        icon: '/techs/vercel.svg',
        link: 'https://vercel.com/analytics',
        invert: true,
      },
      {
        name: 'Google Analytics',
        icon: '/techs/google-analytics.svg',
        link: 'https://marketingplatform.google.com/about/analytics',
      },
      {
        name: 'Jest',
        icon: '/techs/jest.svg',
        link: 'https://jestjs.io',
      },
    ],
  },
];
