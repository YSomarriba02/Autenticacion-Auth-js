import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import querySQL2 from "./app/lib/bd";
import Credentials from "next-auth/providers/credentials";
import { loginUser } from "./app/lib/services/authService";
import { user } from "./app/lib/types/user";

export const { handlers, auth } = NextAuth({
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

        const resp = await loginUser(email, password);
        if (!resp) return null;
        const user = resp as user;
        return {
          id: String(user.id),
          email: user.email,
          image: "https://avatars.githubusercontent.com/u/128437648?v=4", //imagen default por mientras
        };
      },
    }),
  ],

  secret: process.env.SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const email = user.email;
        const usuarioBd = await querySQL2(
          "select email from usuarios where email = @email",
          [{ name: "email", type: "string", value: email }],
        );
        if (usuarioBd?.length == 0) {
          const newUsuario = await querySQL2(
            "insert into usuarios values(@email,@passw)",
            [
              { name: "email", type: "string", value: email },
              { name: "passw", type: "string", value: `passw_${email}` },
            ],
          );
        }
        token.email = user.email;
        token.picture = user.image;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email!;
      session.user.image = token.picture;
      return session;
    },
  },
});
