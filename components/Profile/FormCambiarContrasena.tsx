import React, { startTransition, useActionState } from "react";
import Field from "../Field/Field";
import {
  ActionCambiarContraseña,
  CambiarContrasenaResult,
} from "@/lib/Actions/userActions";
import LoadingText from "../LoadingText";

export default function FormCambiarContrasena() {
  const [state, formAction, isPending] = useActionState<
    CambiarContrasenaResult,
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
      onClick={(e: React.MouseEvent) => {
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
          name="passwordActual"
          text="contraseña actual"
          required={true}
          typeInput="password"
          autoFoc={true}
          labelBackground="bg-base"
        />
        <Field
          max={20}
          min={4}
          name="passwordNueva"
          text="contraseña nueva"
          required={true}
          typeInput="password"
          labelBackground="bg-base"
        />
        <button
          disabled={isPending}
          className="bg-blue-400 w-2/5 p-1.5 self-end font-semibold rounded-md text-sm"
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
