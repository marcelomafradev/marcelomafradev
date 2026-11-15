import type { LucideIcon } from 'lucide-react';
import { Bot, Database, Sparkles, Terminal, Theater } from 'lucide-react';

export interface StackItemProps {
  name: string;
  link: string;
  icon?: string;
  symbol?: LucideIcon;
  invert?: boolean;
}

export interface StackSectionProps {
  title: string;
  items: StackItemProps[];
}

export const STACK: StackSectionProps[] = [
  {
    title: 'frontend',
    items: [
      {
        name: 'HTML',
        icon: '/techs/html.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
      {
        name: 'CSS',
        icon: '/techs/css.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      },
      {
        name: 'JavaScript',
        icon: '/techs/javascript.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'TypeScript',
        icon: '/techs/typescript.svg',
        link: 'https://www.typescriptlang.org',
      },
      {
        name: 'React',
        icon: '/techs/react.svg',
        link: 'https://react.dev',
      },
      {
        name: 'Next.js',
        icon: '/techs/nextjs.svg',
        link: 'https://nextjs.org',
        invert: true,
      },
      {
        name: 'Vite',
        icon: '/techs/vite.svg',
        link: 'https://vitejs.dev',
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
        name: 'Tailwind CSS',
        icon: '/techs/tailwindcss.svg',
        link: 'https://tailwindcss.com',
      },
      {
        name: 'shadcn/ui',
        icon: '/techs/shadcn.svg',
        link: 'https://ui.shadcn.com/',
        invert: true,
      },
      {
        name: 'Radix UI',
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
        name: 'Zustand',
        icon: '/techs/zustand.svg',
        link: 'https://zustand-demo.pmnd.rs',
      },
      {
        name: 'TanStack Query',
        icon: '/techs/tanstack-query.svg',
        link: 'https://tanstack.com/query',
      },
      {
        name: 'React Hook Form',
        icon: '/techs/react-hook-form.svg',
        link: 'https://react-hook-form.com',
      },
      {
        name: 'Zod',
        icon: '/techs/zod.svg',
        link: 'https://zod.dev',
      },
    ],
  },
  {
    title: 'backend',
    items: [
      {
        name: 'Node.js',
        icon: '/techs/nodejs.svg',
        link: 'https://nodejs.org',
      },
      {
        name: 'TypeScript',
        icon: '/techs/typescript.svg',
        link: 'https://www.typescriptlang.org',
      },
      {
        name: 'JavaScript',
        icon: '/techs/javascript.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'NestJS',
        icon: '/techs/nestjs.svg',
        link: 'https://nestjs.com/',
      },
      {
        name: 'Express',
        icon: '/techs/express.svg',
        link: 'https://expressjs.com',
      },
      {
        name: 'Java',
        icon: '/techs/java.svg',
        link: 'https://www.java.com',
      },
      {
        name: 'Spring Boot',
        icon: '/techs/spring.svg',
        link: 'https://spring.io/projects/spring-boot',
      },
      {
        name: 'Prisma',
        icon: '/techs/prisma.svg',
        link: 'https://www.prisma.io',
        invert: true,
      },
      {
        name: 'TypeORM',
        icon: '/techs/typeorm.svg',
        link: 'https://typeorm.io/',
      },
      {
        name: 'GraphQL',
        icon: '/techs/graphql.svg',
        link: 'https://graphql.org/',
      },
      {
        name: 'gRPC',
        icon: '/techs/grpc.svg',
        link: 'https://grpc.io',
      },
      {
        name: 'RabbitMQ',
        icon: '/techs/rabbitmq.svg',
        link: 'https://www.rabbitmq.com',
      },
      {
        name: 'Redis',
        icon: '/techs/redis.svg',
        link: 'https://redis.io',
      },
      {
        name: 'Swagger',
        icon: '/techs/swagger.svg',
        link: 'https://swagger.io',
      },
      {
        name: 'Socket.IO',
        icon: '/techs/socketio.svg',
        link: 'https://socket.io',
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
      {
        name: 'Ionic',
        icon: '/techs/ionic.svg',
        link: 'https://ionicframework.com',
      },
      {
        name: 'Angular',
        icon: '/techs/angular.svg',
        link: 'https://angular.dev',
      },
      {
        name: 'Cordova',
        icon: '/techs/cordova.svg',
        link: 'https://cordova.apache.org',
      },
      {
        name: 'Tauri',
        icon: '/techs/tauri.svg',
        link: 'https://tauri.app',
      },
      {
        name: 'Rust',
        icon: '/techs/rust.svg',
        link: 'https://www.rust-lang.org',
      },
    ],
  },
  {
    title: 'database',
    items: [
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
        name: 'MongoDB',
        icon: '/techs/mongodb.svg',
        link: 'https://www.mongodb.com',
      },
      {
        name: 'Redis',
        icon: '/techs/redis.svg',
        link: 'https://redis.io',
      },
      {
        name: 'Supabase',
        icon: '/techs/supabase.svg',
        link: 'https://supabase.com',
      },
      {
        name: 'Firebase',
        icon: '/techs/firebase.svg',
        link: 'https://firebase.google.com',
      },
      {
        name: 'SQL Server',
        symbol: Database,
        link: 'https://www.microsoft.com/sql-server',
      },
    ],
  },
  {
    title: 'infrastructure',
    items: [
      {
        name: 'Docker',
        icon: '/techs/docker.svg',
        link: 'https://www.docker.com',
      },
      {
        name: 'Kubernetes',
        icon: '/techs/kubernetes.svg',
        link: 'https://kubernetes.io',
      },
      {
        name: 'AWS',
        icon: '/techs/aws.svg',
        link: 'https://aws.amazon.com',
      },
      {
        name: 'Vercel',
        icon: '/techs/vercel.svg',
        link: 'https://vercel.com',
        invert: true,
      },
      {
        name: 'Nginx',
        icon: '/techs/nginx.svg',
        link: 'https://nginx.org',
      },
      {
        name: 'Linux',
        icon: '/techs/linux.svg',
        link: 'https://www.kernel.org',
      },
      {
        name: 'PM2',
        icon: '/techs/pm2.svg',
        link: 'https://pm2.keymetrics.io',
      },
      {
        name: 'GitHub Actions',
        icon: '/techs/github-actions.svg',
        link: 'https://github.com/features/actions',
      },
      {
        name: 'Turborepo',
        icon: '/techs/turborepo.svg',
        link: 'https://turbo.build/repo',
        invert: true,
      },
      {
        name: 'pnpm',
        icon: '/techs/pnpm.svg',
        link: 'https://pnpm.io',
      },
      {
        name: 'Prometheus',
        icon: '/techs/prometheus.svg',
        link: 'https://prometheus.io',
      },
      {
        name: 'Grafana',
        icon: '/techs/grafana.svg',
        link: 'https://grafana.com',
      },
      {
        name: 'OpenTelemetry',
        icon: '/techs/opentelemetry.svg',
        link: 'https://opentelemetry.io',
      },
    ],
  },
  {
    title: 'apps',
    items: [
      {
        name: 'VS Code',
        icon: '/techs/vscode.svg',
        link: 'https://code.visualstudio.com',
      },
      {
        name: 'Figma',
        icon: '/techs/figma.svg',
        link: 'https://figma.com',
      },
      {
        name: 'Postman',
        icon: '/techs/postman.svg',
        link: 'https://www.postman.com',
      },
      {
        name: 'Insomnia',
        icon: '/techs/insomnia.svg',
        link: 'https://insomnia.rest/',
      },
      {
        name: 'Beekeeper',
        icon: '/techs/beekeeper.svg',
        link: 'https://www.beekeeperstudio.io',
      },
      {
        name: 'Notion',
        icon: '/techs/notion.svg',
        link: 'https://www.notion.so',
      },
      {
        name: 'Jira',
        icon: '/techs/jira.svg',
        link: 'https://www.atlassian.com/software/jira',
      },
      {
        name: 'Discord',
        icon: '/techs/discord.svg',
        link: 'https://discord.com',
      },
      {
        name: 'Spotify',
        icon: '/techs/spotify.svg',
        link: 'https://www.spotify.com',
      },
    ],
  },
  {
    title: 'others',
    items: [
      {
        name: 'Git',
        icon: '/techs/git.svg',
        link: 'https://git-scm.com',
      },
      {
        name: 'GitHub',
        icon: '/techs/github.svg',
        link: 'https://github.com',
        invert: true,
      },
      {
        name: 'Storybook',
        icon: '/techs/storybook.svg',
        link: 'https://storybook.js.org',
      },
      {
        name: 'Jest',
        icon: '/techs/jest.svg',
        link: 'https://jestjs.io',
      },
      {
        name: 'Vitest',
        icon: '/techs/vitest.svg',
        link: 'https://vitest.dev',
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
        name: 'Playwright',
        symbol: Theater,
        link: 'https://playwright.dev',
      },
    ],
  },
];

export const AI_STACK: StackItemProps[] = [
  {
    name: 'Claude Code',
    symbol: Terminal,
    link: 'https://www.anthropic.com/claude-code',
  },
  {
    name: 'Claude',
    icon: '/techs/claude.svg',
    link: 'https://claude.ai',
  },
  {
    name: 'Anthropic API',
    icon: '/techs/anthropic.svg',
    link: 'https://docs.anthropic.com',
  },
  {
    name: 'OpenAI Codex',
    symbol: Bot,
    link: 'https://developers.openai.com/codex',
  },
  {
    name: 'MCP',
    icon: '/techs/mcp.svg',
    link: 'https://modelcontextprotocol.io',
  },
  {
    name: 'DeepSeek',
    icon: '/techs/deepseek.svg',
    link: 'https://www.deepseek.com',
  },
  {
    name: 'Hermes Agent',
    symbol: Sparkles,
    link: 'https://hermes-agent.nousresearch.com',
  },
];

export const AI_PRACTICES = [
  'spec-driven',
  'orchestration',
  'context',
  'mcp',
  'documents',
  'validation',
  'review',
  'scraping',
] as const;
