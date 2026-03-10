"use client";

import {
  ActionCambioPasswordCodigo,
  reestablecerContrasenaResult,
} from "@/app/lib/Actions/userActions";
import { useRouter } from "next/navigation";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "./Provider";
import { useEmailContext } from "./ProviderEmail";

export default function FormEmail() {
  const formContext = useFormContext();
  const { adelantar } = formContext!;
  const emailContext = useEmailContext();
  const { setEmail } = emailContext!;
  const [state, formAction, isPending] = useActionState<
    reestablecerContrasenaResult,
    FormData
  >(ActionCambioPasswordCodigo, null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state?.state) {
      timer = setTimeout(adelantar, 2000);
    }
    return () => clearTimeout(timer);
  }, [state]);

  const [inputState, setInputState] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setInputState(value);
    setEmail(value);
  }

  function handlerCancelar() {
    router.push("/auth/signin");
  }
  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        startTransition(async () => {
          formAction(formData);
        });
      }}
      className="mt-6 sm-mini:mt-6 flex flex-col items-center gap-4 md:gap-6"
    >
      {state && (
        <span
          className={`${state.state ? "text-indigo-500 dark:text-sky-300" : "text-red-600"}`}
        >
          {state.message}
        </span>
      )}
      <input
        value={inputState}
        onChange={handleChange}
        type="email"
        name="email"
        className="bg-(--background_2) focus:outline-blue-700 outline-zinc-100 outline-2 px-6 w-4/5 rounded-md h-14 sm-mini:h-8 md:h-16 lg:h-14"
      />
      <nav className="flex w-4/5 gap-2">
        <button
          disabled={isPending}
          type="submit"
          className="px-4 py-3 bg-(--text) text-base font-semibold flex-1 rounded-sm hover:brightness-125 transition-[filter] duration-100 ease-linear sm-mini:py-2 md:py-4 disabled:saturate-50"
        >
          Enviar
        </button>
        <button
          onClick={handlerCancelar}
          type="button"
          className="px-4 py-3 bg-(--color-base) text-(--text) font-semibold flex-1 rounded-sm hover:brightness-150  transition-[filter] duration-100 ease-linear sm-mini:py-2 md:py-4"
        >
          Cancelar
        </button>
      </nav>
    </form>
  );
}
