import { ChangeEvent, Dispatch, InputEvent, SetStateAction } from "react";

interface props {
  name: string;
  required?: boolean;
  max?: number;
  min?: number;
  placeholder?: string;
  type?: "password" | "text";
  setState: Dispatch<SetStateAction<string>>;
}

export default function Input({
  name,
  max,
  min,
  required = false,
  placeholder,
  type = "text",
  setState,
}: props) {
  return (
    <input
      type={type}
      required={required}
      name={name}
      maxLength={max}
      minLength={min}
      placeholder={placeholder}
      className="peer outline-0 p-2 py-2.5 border-clase rounded-sm"
      onChange={(e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        setState(input.value);
      }}
    ></input>
  );
}
