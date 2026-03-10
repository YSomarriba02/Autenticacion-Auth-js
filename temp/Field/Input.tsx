import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface props {
  name: string;
  required?: boolean;
  max?: number;
  min?: number;
  placeholder?: string;
  type?: "password" | "text" | "email";
  setState: Dispatch<SetStateAction<string>>;

  autoFoc?: true;

  isValueShow?: boolean;
}

export default function Input({
  name,
  max,
  min,
  required = false,
  placeholder,
  type = "text",
  setState,
  autoFoc,

  isValueShow,
}: props) {
  return (
    <input
      type={type != "password" ? type : isValueShow ? "text" : "password"}
      required={required}
      name={name}
      maxLength={max}
      minLength={min}
      placeholder={placeholder}
      className="w-full peer outline-0 p-2 py-2.5 border-clase rounded-md sm:p-3 sm:py-2.5"
      onChange={(e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setState(input.value);
      }}
      autoFocus={autoFoc}
    ></input>
  );
}
