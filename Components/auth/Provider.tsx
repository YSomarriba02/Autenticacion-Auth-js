"use client";

import { createContext, ReactNode, useContext, useRef, useState } from "react";

type FormContextType = {
  adelantar: () => void;
  retroceder: () => void;
  value: TypePasos;
};

type TypePasos = "p1" | "p2" | "p3";

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [indice, setIndice] = useState<number>(0);
  const [value, setValue] = useState<TypePasos>("p1");
  const refArrPasos = useRef<TypePasos[]>(["p1", "p2", "p3"]);

  function adelantar() {
    if (indice == refArrPasos.current.length - 1) {
      return;
    }
    setIndice((prev) => {
      setValue(refArrPasos.current[prev + 1]);
      return prev + 1;
    });
  }

  function retroceder() {
    if (indice == 0) {
      return;
    }
    setIndice((prev) => {
      setValue(refArrPasos.current[prev - 1]);
      return prev - 1;
    });
  }

  return (
    <FormContext.Provider
      value={{
        adelantar,
        retroceder,
        value,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
