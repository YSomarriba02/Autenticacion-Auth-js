"use client";

import { useRef, useState } from "react";
import Input from "./Input";
import Label from "./Label";

interface props {
  name: string;
  min: number;
  max: number;
  required?: boolean;
  typeInput?: "text" | "password";
  text: string;
}

function handler(element: HTMLDivElement) {}

export default function Field({
  max,
  min,
  name,
  required,
  text,
  typeInput = "text",
}: props) {
  const [state, setState] = useState("");
  return (
    <div className="relative flex flex-col">
      <Input
        name={name}
        max={max}
        min={min}
        required={required}
        setState={setState}
        type={typeInput}
      />
      <Label htmlFor={name} text={text} state={state} />
    </div>
  );
}
