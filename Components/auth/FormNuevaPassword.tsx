import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import Field from "../Field/Field";
import { ActionReestablecerPassword } from "@/app/lib/Actions/userActions";
import { useEmailContext } from "./ProviderEmail";
import { signIn } from "next-auth/react";

export default function FormNuevaPassword() {
  const emailContext = useEmailContext();
  const email = emailContext?.email as string;
  const formRef = useRef<HTMLFormElement>(null);

  const action = (
    prevState: ActionReestablecerPassword,
    formData: FormData,
  ) => {
    return ActionReestablecerPassword(prevState, formData, email);
  };

  const [stateForm, formAction, isPending] = useActionState<
    ActionReestablecerPassword,
    FormData
  >(action, null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stateForm?.state) {
      timer = setTimeout(() => {
        const form = new FormData(formRef.current as HTMLFormElement);
        const password = form.get("password1");
        signIn("credentials", {
          email,
          password,
          redirectTo: "/profile",
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [stateForm]);

  return (
    <>
      <span
        className={`${stateForm?.state ? "text-green-400" : "text-red-300"} text-sm text-start `}
      >
        {stateForm?.message}
      </span>
      <form
        ref={formRef}
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          startTransition(() => {
            formAction(formData);
          });
        }}
        className="p-6 pb-4 rounded-2xl flex flex-col gap-5 w-full bg-(--color-base) [box-shadow:1px_2px_8px_0px_black]"
      >
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
          className="bg-(--text) text-(--color-base) p-2 font-bold rounded-sm"
        >
          Enviar
        </button>
      </form>
    </>
  );
}
