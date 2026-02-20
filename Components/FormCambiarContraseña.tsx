import React, { FormEvent, useActionState } from "react";
import Field from "./Field";
import {
  ActionCambiarContraseña,
  cambiarContraseñaResult,
} from "@/app/lib/Actions/userActions";

export default function FormCambiarContraseña() {
  const [state, formAction, isPending] = useActionState<
    cambiarContraseñaResult,
    FormData
  >(ActionCambiarContraseña, null);

  async function handleForm(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formAction(formData);
  }
  return (
    <div className="px-4">
      <form
        onSubmit={handleForm}
        className="flex flex-col gap-4"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        {state && state.message}
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
        <button className="bg-blue-400 w-2/5 p-1.5 self-end font-semibold rounded-md">
          Cambiar
        </button>
      </form>
    </div>
  );
}
