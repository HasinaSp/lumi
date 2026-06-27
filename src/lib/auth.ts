import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const email = user.email.toLowerCase();

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          await prisma.user.update({
            where: { email },
            data: {
              name: user.name ?? existingUser.name,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email,
            name: user.name,
            role: email === process.env.ADMIN_EMAIL?.toLowerCase()
              ? "ADMIN"
              : "CLIENT",
          },
        });

        return true;
      } catch (error) {
        console.error("Erreur signIn Auth.js:", error);
        return false;
        // throw error;
      }
    },

    async session({ session }) {
      if (!session.user?.email) return session;

      const email = session.user.email.toLowerCase();

      const dbUser = await prisma.user.findUnique({
        where: { email },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
      }

      return session;
    },
  },
});