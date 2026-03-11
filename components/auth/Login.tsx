"use client";

import { useEffect, useState } from "react";
import ButtonAuth from "./ButtonAuth";
import Field from "../Field/Field";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const session = useSession();
  const { status } = session;
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/perfil");
      router.refresh();
    }
  }, [status]);

  if (status == "authenticated") {
    return null;
  }

  return (
    <div className="h-screen">
      <div className="p-4 flex flex-col absolute left-0 bg-(--background_2) right-0 m-auto w-5/6 [box-shadow:1px_2px_6px_1px_var(--text)] rounded-2xl sm:w-3/5 top-[15vh] md:pt-8 lg:w-2/6 ">
        <p className="text-4xl">Login</p>
        {error && <span className="text-red-500">{error}</span>}
        <form
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault();
            setPending(true);
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);

            const resp = await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirect: false,
              redirectTo: "/perfil",
            });

            setPending(false);
            if (resp.error) {
              setError("Credenciales invalidas");
              return;
            }
            console.log(resp);
          }}
          className="mt-4 flex flex-col gap-4 md:gap-6"
        >
          <Field
            max={30}
            min={4}
            name="email"
            required={true}
            text="email"
            typeInput="email"
            labelBackground="bg-(--background_2)"
          />
          <Field
            max={30}
            min={4}
            name="password"
            required={true}
            text="contraseña"
            typeInput={"password"}
            labelBackground="bg-(--background_2)"
          />
          <div className="flex justify-between gap-4 px-4 m-0">
            <Link
              className="text-indigo-500 dark:text-sky-300 font-semibold md:text-lg hover:saturate-200 trasition-[filter] duration-100 ease-in"
              href={"/auth/signup"}
            >
              registrarse
            </Link>
            <Link
              href={"/auth/reestablecer"}
              className="text-sm md:text-sm font-semibold"
            >
              Olvido la contraseña
            </Link>
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="bg-blue-400 h-10 md:h-14 rounded-2xl text-lg font-semibold hover:bg-blue-500 hover:scale-95 transition-[background-color,scale] ease-in duration-100 disabled:scale-95"
          >
            Inciar sesion
          </button>
        </form>

        <div className="flex h-full mt-2">
          <ButtonAuth provider="google" redirect="/perfil" typeAuth="login" />
        </div>
      </div>
    </div>
  );
}
