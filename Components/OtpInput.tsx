import { Ref } from "react";

interface props {
  indice: number;
  maxIndice: number;
  name: string;
  handleKey: (incide: number) => void;
  handleBackSpace: (incide: number) => void;
  ref: Ref<HTMLInputElement> | undefined;
}

export default function OtpInput({
  indice,
  maxIndice,
  handleKey,
  handleBackSpace,
  name,
  ref,
}: props) {
  return (
    <input
      ref={ref}
      name={name}
      type="text"
      inputMode="numeric"
      minLength={1}
      maxLength={1}
      pattern="[0-9]*"
      onKeyUp={(e: React.KeyboardEvent) => {
        if (e.key !== "Backspace") {
          handleKey(indice);
          return;
        }
        handleBackSpace(indice);
      }}
      className="size-10 bg-(--text) text-background text-center rounded-sm focus:outline-4  focus:outline-blue-600"
    ></input>
  );
}
