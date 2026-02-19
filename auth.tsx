import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginUser } from "./app/lib/services/auth/loginUser";
import { findUserBd } from "./app/lib/repositories/findUserBd";
import signUpWithProvider from "./app/lib/services/auth/signUpWithProvider";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "autenticacion propia",
      credentials: {
        email: { label: "ingressa email", type: "email" },
        password: { label: "ingresa la passwordd", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) return null;

        const user = await loginUser(email, password);
        if (!user) return null;
        return {
          id: String(user.id),
          email: user.email,
          image: "https://avatars.githubusercontent.com/u/128437648?v=4", //imagen default por mientras
          name: user.email.split("@")[0],
        };
      },
    }),
  ],

  secret: process.env.SECRET,

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        console.log(account);
        const email = user.email as string;
        const usuarioBd = await findUserBd(email);
        if (!usuarioBd) {
          const provider = account?.provider as string;
          signUpWithProvider(email, provider);
        }
        token.email = user.email;
        token.picture = user.image;

        const nombre = user.name?.split(" ")[0];
        const appellido = user.name?.split(" ")[2] || "";

        token.name = `${nombre} ${appellido}`;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email!;
      session.user.image = token.picture;
      session.user.name = token.name;
      return session;
    },
  },
});
