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

interface props {
  typeForm: "no-auth" | "auth";
}

export default function FormNuevaPassword({ typeForm }: props) {
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
    if (stateForm?.state && typeForm == "no-auth") {
      timer = setTimeout(() => {
        const form = new FormData(formRef.current as HTMLFormElement);
        const password = form.get("password1");
        signIn("credentials", {
          email,
          password,
          redirectTo: "/perfil",
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [stateForm]);

  return (
    <div className="min-w-full flex flex-col items-center gap-2">
      {stateForm && (
        <span
          className={`${stateForm?.state ? "text-indigo-500 dark:text-sky-300" : "text-red-600"} text-sm text-start `}
        >
          {stateForm?.message}
        </span>
      )}
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
        className="p-6 pb-4 rounded-2xl flex flex-col gap-5 w-full bg-(--background_2) [box-shadow:1px_2px_8px_0px_black] lg:w-3/4"
      >
        <Field
          max={30}
          min={4}
          name="password1"
          required={true}
          text="contraseña"
          typeInput={"password"}
          labelBackground="bg-(--background_2)"
          autoFoc={true}
        />
        <Field
          max={30}
          min={4}
          name="password2"
          required={true}
          text="repetir contraseña"
          typeInput={"password"}
          labelBackground="bg-(--background_2)"
        />
        <button
          disabled={isPending}
          type="submit"
          className="bg-(--text) text-(--color-base) p-2 font-bold rounded-sm hover:brightness-125  hover:scale-95 transition-[filter,scale]  duration-150 ease-initial"
        >
          Cambiar
        </button>
      </form>
    </div>
  );
}
