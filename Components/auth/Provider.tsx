"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

type FormContextType = {
  indice: number;
  arrPasos: TypePasos[];
  adelantar: () => void;
  retroceder: () => void;
};

type TypePasos = "p1" | "p2" | "p3";

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [indice, setIndice] = useState<number>(0);
  const refArrPasos = useRef<TypePasos[]>(["p1", "p2", "p3"]);

  function adelantar() {
    if (indice == refArrPasos.current.length - 1) {
      return;
    }
    setIndice((prev) => prev + 1);
  }

  function retroceder() {
    if (indice == 0) {
      return;
    }
    setIndice((prev) => prev - 1);
  }

  return (
    <FormContext.Provider
      value={{
        indice,
        adelantar,
        retroceder,
        arrPasos: refArrPasos.current,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}

type pasos = "p1" | "p2" | "p3";

const arr: pasos[] = ["p1", "p2", "p3"];
let indice = 0;

function adelantar() {
  if (indice == arr.length - 1) {
    return;
  }
  indice += 1;
}

function retroceder() {
  if (indice == 0) {
    return;
  }
  indice -= 1;
}
