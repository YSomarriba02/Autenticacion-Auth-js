"use client";

import Link from "next/link";
import Field from "./Field";
import ButtonAuth from "./ButtonAuth";
import { registrarSesion } from "@/app/lib/Actions/userActions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Signup() {
  const session = useSession();
  const { status } = session;
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    null | string,
    FormData
  >(registrarSesion, null);

  if (status == "authenticated") {
    return router.replace("/");
  }

  return (
    <div className="h-screen">
      <div className="p-4 flex flex-col gap-6 absolute left-0 right-0 m-auto w-5/6 bg-zinc-700 rounded-2xl sm:w-3/5 top-[15vh] md:pt-8 lg:w-2/6">
        <p className="text-4xl">Sign Up</p>
        {state && <span className="text-red-600">{state}</span>}
        <form action={formAction} className="mt-4 flex flex-col gap-4 md:gap-6">
          <Field
            max={30}
            min={4}
            name="email"
            required={true}
            text="email"
            typeInput="email"
          />
          <Field
            max={30}
            min={4}
            name="password1"
            required={true}
            text="contraseña"
            typeInput={"password"}
          />
          <Field
            max={30}
            min={4}
            name="password2"
            required={true}
            text="repetir contraseña"
            typeInput={"password"}
          />
          <button
            disabled={isPending}
            type="submit"
            className="bg-blue-400 h-10 md:h-14 rounded-2xl text-lg font-semibold hover:bg-blue-500 hover:scale-95 transition-[background-color,scale] ease-in duration-100"
          >
            Registrarse
          </button>
        </form>
        <div className="relative ">
          <hr />
          <Link
            className="px-2 bg-zinc-700 text-blue-400 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:text-lg"
            href={"/auth"}
          >
            Iniciar sesion
          </Link>
        </div>
        <div className="flex h-full mt-8">
          <ButtonAuth provider="google" redirect="/profile" typeAuth="signup" />
        </div>
      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import Field from "./Field";
// import ButtonAuth from "./ButtonAuth";
// import { registrarSesion } from "@/app/lib/Actions/userActions";
// import { useActionState, useEffect } from "react";
// import { user } from "@/app/lib/types/user";
// import { retorno } from "@/app/lib/Actions/userActions";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Signup() {
//   const incial: retorno = {
//     message: "iniciando heeey",
//     state: false,
//     user: {
//       email: "",
//       id: 0,
//       passw: "",
//     },
//   };
//   const router = useRouter();
//   const [state, formAction, isPending] = useActionState<retorno, FormData>(
//     registrarSesion,
//     incial,
//   );

//   useEffect(() => {
//     async function logearse({
//       email,
//       password,
//     }: {
//       email: string;
//       password: string;
//     }) {
//       const resp = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//         redirectTo: "/profile",
//       });
//       if (resp.error) {
//         alert("error al autenticar");
//       } else {
//         const to = resp.url as string;
//         router.push(to);
//       }
//     }
//     if (state.state) {
//       console.log("se hace el useEffect -           -");
//       const { email, passw: password } = state.user;
//       if (!email || !password) {
//         alert("no haynaa");
//         return;
//       }
//       logearse({ email, password });
//       alert(email + " " + password);
//     }
//   }, [state]);

//   return (
//     <div className="p-4 flex flex-col gap-6 absolute left-0 right-0 m-auto w-5/6 bg-zinc-700 rounded-2xl sm:w-3/5 top-[15vh] md:pt-8 lg:w-2/6">
//       {`${state.message}`}
//       {`${state ? state.user.email : ""}`}
//       <p className="text-4xl">Sign Up</p>
//       <form action={formAction} className="mt-4 flex flex-col gap-4 md:gap-6">
//         <Field
//           max={30}
//           min={4}
//           name="email"
//           required={true}
//           text="email"
//           typeInput="email"
//         />
//         <Field
//           max={30}
//           min={4}
//           name="password1"
//           required={true}
//           text="contraseña"
//           typeInput={"password"}
//         />
//         <Field
//           max={30}
//           min={4}
//           name="password2"
//           required={true}
//           text="repetir contraseña"
//           typeInput={"password"}
//         />
//         <button
//           disabled={isPending}
//           type="submit"
//           className="bg-blue-400 h-10 md:h-14 rounded-2xl text-lg font-semibold hover:bg-blue-500 hover:scale-95 transition-[background-color,scale] ease-in duration-100"
//         >
//           Registrarse
//         </button>
//       </form>
//       <div className="relative ">
//         <hr />
//         <Link
//           className="px-2 bg-zinc-700 text-blue-400 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:text-lg"
//           href={"/auth/login"}
//         >
//           Iniciar sesion
//         </Link>
//       </div>
//       <div className="flex h-full mt-8">
//         <ButtonAuth provider="google" redirect="/profile" typeAuth="signup" />
//       </div>
//     </div>
//   );
// }
