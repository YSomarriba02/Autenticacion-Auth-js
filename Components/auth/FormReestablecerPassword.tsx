"use client";

import {
  ActionReestablecerContraseña,
  reestablecerContraseñaResult,
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

export default function FormReestablecerPassword() {
  const formContext = useFormContext();
  const { setShowForm } = formContext!;
  const emailContext = useEmailContext();
  const { setEmail } = emailContext!;
  const [state, formAction, isPending] = useActionState<
    reestablecerContraseñaResult,
    FormData
  >(ActionReestablecerContraseña, null);

  useEffect(() => {
    if (state?.state) {
      setShowForm(false);
    }
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
      {state && <span className="text-red-500">{state.message}</span>}
      <input
        value={inputState}
        onChange={handleChange}
        type="email"
        name="email"
        className="focus:outline-blue-500 outline-zinc-100 outline-2 px-6 w-4/5 rounded-md h-14 sm-mini:h-8 md:h-16 lg:h-14"
      />
      <nav className="flex w-4/5 gap-2">
        <button
          disabled={isPending}
          type="submit"
          className="px-4 py-3 bg-(--text) text-background font-semibold flex-1 rounded-sm hover:brightness-125 transition-[filter] duration-100 ease-linear sm-mini:py-2 md:py-4 disabled:saturate-50"
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
