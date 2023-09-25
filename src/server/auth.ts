import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { env } from "@/env.mjs";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
      accessToken: string;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          accessToken: token.accessToken,
        },
      };
    },

    jwt: ({ token, account }) => {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        };
      }

      return {
        ...token,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      client: {
        scope: "user-read-email user-read-private",
        redirect_uris: ["http://localhost:3000/api/auth/callback/spotify"],
      },
      profile: (profile, token) => {
        console.log("profile > token.access_token", token.access_token);
        let id;
        try {
          id = profile.id;
        } catch (e) {
          id = new Date().getTime().toString();
        }
        return {
          id,
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
        };
      },
    }),
  ],
  // adapter: PrismaAdapter(db),
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
