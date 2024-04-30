import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { UserRole, UserRoleType } from '../../next-auth-d';
import { ADMIN_EMAILS } from '@/routes';

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        let userRole: UserRoleType = UserRole.user;

        if (ADMIN_EMAILS.includes(profile?.email)) {
          userRole = UserRole.admin;
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;

      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as UserRoleType;
        session.user.id = token.sub!;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
