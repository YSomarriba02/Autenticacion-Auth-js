"use client";

import Paso1 from "./Paso1";
import Paso2 from "./Paso2";
import { useFormContext } from "./Provider";

export default function ReestablecerPasswordLayaout() {
  const context = useFormContext();
  const { showForm, handleShow } = context!;

  return (
    <div className="flex flex-col overflow-hidden w-full">
      <section
        className={`${showForm ? "translate-x-0" : "-translate-x-full"} w-full flex gap-2 transition-transform duration-700 ease-out`}
      >
        <Paso1 />
        <Paso2 />
      </section>
    </div>
  );
}
