import { startTransition, useActionState, useEffect, useRef } from "react";
import OtpInput from "./OtpInput";
import {
  ActionValidarCodigoReset,
  enviarCodigoActionType,
} from "@/lib/Actions/emailActions";

interface props {
  show: boolean;
  email?: string;

  setPaso2: () => void;
}

// si se le pasa true, se muestra y se monta el focus
export default function FormOtp({ show, email, setPaso2 }: props) {
  const OTPS = 5;
  const inputsRef = useRef<(HTMLInputElement | null)[]>(
    Array.from({ length: OTPS }, () => null),
  );
  const formRef = useRef<HTMLFormElement>(null);

  function validarCodigoReset(
    prevState: enviarCodigoActionType,
    formData: FormData,
  ) {
    return ActionValidarCodigoReset(prevState, formData, email);
  }

  const [state, formAction] = useActionState<enviarCodigoActionType, FormData>(
    validarCodigoReset,
    { message: "", state: false },
  );

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
      timer = setTimeout(() => {
        setPaso2();
      }, 1000);
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
      console.log("si se puede enviar");
    }
    inputsRef.current[indice + 1]?.focus();
  }

  function handleBackspace(indice: number) {
    if (indice == 0) return;
    inputsRef.current[indice - 1]?.focus();
  }
  return (
    <section className="min-w-full flex flex-col gap-6 items-center">
      {
        <span
          className={`${state.state ? "text-indigo-500 dark:text-sky-300" : "text-red-300"} text-sm text-start `}
        >
          {state.message}
        </span>
      }
      <form ref={formRef} action="" className="flex gap-4 justify-center">
        {Array.from({ length: OTPS }).map((e, i, arr) => {
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
    </section>
  );
}
