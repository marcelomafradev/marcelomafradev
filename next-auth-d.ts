/* eslint-disable no-unused-vars */
import 'next-auth';

export enum UserRole {
  admin = 'ADMIN',
  user = 'USER',
}

export type UserRoleType = 'ADMIN' | 'USER';

declare module 'next-auth' {
  interface User {
    role: UserRoleType;
  }

  interface Session {
    user?: User;
    id: string;
  }

  interface AdapterUser {
    role: UserRoleType;
  }
}
