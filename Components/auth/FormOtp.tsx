import { startTransition, useActionState, useEffect, useRef } from "react";
import OtpInput from "../Profile/OtpInput";
import {
  ActionValidarCodigoReset,
  enviarCodigoActionType,
} from "@/app/lib/Actions/emailActions";
import { useFormContext } from "./Provider";

interface props {
  show: boolean;
  email?: string;
}

// si se le pasa true, se muestra y se monta el focus
export default function FormOtp({ show, email }: props) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>(
    new Array(5).fill(null),
  );

  const formRef = useRef<HTMLFormElement>(null);
  const formContext = useFormContext();
  const { adelantar } = formContext!;

  function validarCodigoReset(
    prevState: enviarCodigoActionType,
    formData: FormData,
  ) {
    return ActionValidarCodigoReset(prevState, formData, email);
  }

  const [state, formAction, isPending] = useActionState<
    enviarCodigoActionType,
    FormData
  >(validarCodigoReset, { message: "", state: false });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inputsRef.current[0] && show) {
      timer = setTimeout(() => {
        inputsRef.current[0]!.focus();
      }, 700);
    }
    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.state) {
      timer = setTimeout(adelantar, 2000);
    }
    return () => clearTimeout(timer);
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
    }
    inputsRef.current[indice + 1]?.focus();
  }

  function handleBackspace(indice: number) {
    if (indice == 0) return;
    inputsRef.current[indice - 1]?.focus();
  }
  return (
    <>
      {
        <span
          className={`${state.state ? "text-green-400" : "text-red-300"} text-sm text-start `}
        >
          {state.message}
        </span>
      }
      <form ref={formRef} className="flex gap-4 justify-center">
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
    </>
  );
}
