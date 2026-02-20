import React, { FormEvent, startTransition, useActionState } from "react";
import Field from "./Field";
import {
  ActionCambiarContraseña,
  CambiarContraseñaResult,
} from "@/app/lib/Actions/userActions";
import LoadingText from "./LoadingText";

export default function FormCambiarContraseña() {
  const [state, formAction, isPending] = useActionState<
    CambiarContraseñaResult,
    FormData
  >(ActionCambiarContraseña, null);

  async function handleForm(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    startTransition(() => {
      formAction(formData);
    });
  }
  return (
    <div
      className="px-4"
      onClick={(e: any) => {
        e.stopPropagation();
      }}
    >
      <form
        onSubmit={handleForm}
        className="flex flex-col gap-4"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {state && (
          <span
            className={`${state.state ? "text-green-400" : "text-red-400"} text-[12px]`}
          >
            {state.message}
          </span>
        )}
        <Field
          max={20}
          min={4}
          name="password1"
          text="contraseña"
          required={true}
          typeInput="password"
        />
        <Field
          max={20}
          min={4}
          name="password2"
          text="confirmar contraseña"
          required={true}
          typeInput="password"
        />
        <button
          disabled={isPending}
          className="bg-blue-400 w-2/5 p-1.5 self-end font-semibold rounded-md"
        >
          <LoadingText
            isPending={isPending}
            loadingText="Cambiando"
            text="Cambiar"
          />
        </button>
      </form>
    </div>
  );
}
