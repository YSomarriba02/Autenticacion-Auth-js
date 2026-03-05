"use client";

import Paso1 from "./Paso1";
import Paso2 from "./Paso2";
import Paso3 from "./Paso3";
import { useFormContext } from "./Provider";
import { EmailProvider } from "./ProviderEmail";

export default function ReestablecerPasswordLayaout() {
  const context = useFormContext();
  const { arrPasos, indice, adelantar, retroceder } = context!;

  const transalte = (() => {
    if (arrPasos[indice] == "p1") {
      return "translate-x-0";
    } else if (arrPasos[indice] == "p2") {
      return "-translate-x-[calc(100%+24px)]";
    } else {
      return "-translate-x-[calc(200%+48px)]";
    }
  })();

  return (
    <EmailProvider>
      <div className="flex flex-col overflow-hidden w-full">
        <section
          className={`${transalte} w-full flex gap-6 transition-transform duration-700 ease-out`}
        >
          <Paso1 />
          <Paso2 />
          <Paso3 />
        </section>
      </div>
    </EmailProvider>
  );
}
