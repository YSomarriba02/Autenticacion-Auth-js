"use client";

import { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import { Eye, EyeOff } from "lucide-react";

interface props {
  name: string;
  min: number;
  max: number;
  required?: boolean;
  typeInput?: "text" | "password" | "email";
  text: string;

  labelBackground?: string;

  autoFoc?: true;
  isValueShow?: boolean;
}

function handler(element: HTMLDivElement) {}

export default function Field({
  max,
  min,
  name,
  required,
  text,
  typeInput = "text",
  labelBackground,

  autoFoc,
  isValueShow,
}: props) {
  const [state, setState] = useState("");

  const [show, setShow] = useState<boolean | undefined>(false);
  function handleShow() {
    setShow((prev) => !prev);
  }
  return (
    <div className="relative flex w-full">
      <Input
        name={name}
        max={max}
        min={min}
        required={required}
        setState={setState}
        type={typeInput}
        autoFoc={autoFoc}
        isValueShow={show}
      />
      {typeInput == "password" &&
        (show ? (
          <Eye
            className="absolute right-[2%] top-1/2 -translate-y-1/2"
            onClick={handleShow}
          />
        ) : (
          <EyeOff
            className="absolute right-[2%] top-1/2 -translate-y-1/2"
            onClick={handleShow}
          />
        ))}
      <Label
        htmlFor={name}
        text={text}
        state={state}
        labelBackground={labelBackground}
      />
    </div>
  );
}
