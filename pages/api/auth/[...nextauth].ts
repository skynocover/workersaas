import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import sha256 from 'crypto-js/sha256';

import { prisma } from '../../../database/db';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await prisma.users.findFirst({
          where: { account: credentials.email },
        });

        if (!user) {
          return null;
        }

        if (user.password !== sha256(credentials.password).toString(CryptoJS.enc.Hex)) {
          return null;
        }

        return {
          name: user.account,
          email: `${user.account}@gmail.com`,
        };
      },
    }),
  ],
  session: { jwt: true },
});
