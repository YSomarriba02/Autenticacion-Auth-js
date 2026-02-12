import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import querySQL2 from "./app/lib/bd";

export const { handlers } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
        if (!usuarioBd) {
        }
        if (usuarioBd?.length == 0) {
          const newUsuario = await querySQL2(
            "insert into usuarios values(@email,@passw)",
            [
              { name: "email", type: "string", value: email },
              { name: "passw", type: "string", value: `passw_${email}` },
            ],
          );
          console.log("usuario creado");
          console.log(newUsuario);
        } else {
          console.log("usuario ya existe");
          console.log(usuarioBd);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email!;
      return session;
    },
  },
});
