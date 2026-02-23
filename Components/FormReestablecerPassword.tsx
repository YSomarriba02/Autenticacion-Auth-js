import { startTransition, useActionState, useEffect, useRef } from "react";
import OtpInput from "./OtpInput";
import {
  enviarCodigoAction,
  enviarCodigoActionType,
} from "@/app/lib/Actions/emailActions";

export default function FormReestablecerPassword({ show }: { show: boolean }) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>(
    new Array(5).fill(null),
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState<
    enviarCodigoActionType,
    FormData
  >(enviarCodigoAction, { message: "", state: false });

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [show]);

  useEffect(() => {
    console.log(state.message);
  }, [state]);

  function handleKey(indice: number) {
    const maxIndice = inputsRef.current.length - 1;
    if (indice == maxIndice) {
      const algunInputvacio = inputsRef.current.some((e) => {
        if (e?.value == "") {
          return true;
        }
      });

      if (algunInputvacio) return;

      const form = formRef.current as HTMLFormElement;

      startTransition(() => {
        formAction(new FormData(form));
      });
      console.log("si se puede enviar");
    }
    inputsRef.current[indice + 1]?.focus();
  }

  function handleBackspace(indice: number) {
    if (indice == 0) return;
    inputsRef.current[indice - 1]?.focus();
  }
  return (
    <form ref={formRef} action="" className="flex gap-4 justify-center">
      {state.state && <p>{state.message}</p>}
      {inputsRef.current.map((e, i, arr) => {
        return (
          <OtpInput
            key={i}
            indice={i}
            maxIndice={arr.length}
            handleKey={handleKey}
            handleBackSpace={handleBackspace}
            name={`otpinput`}
            ref={(el: HTMLInputElement) => {
              inputsRef.current[i] = el;
            }}
          />
        );
      })}
    </form>
  );
}
