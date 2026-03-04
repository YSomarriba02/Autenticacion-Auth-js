"use client";

import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type FormContextType = {
  showForm: boolean;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  handleShow: () => void;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState<boolean>(true);
  function handleShow() {
    setShow((prev) => !prev);
  }
  return (
    <FormContext.Provider
      value={{ showForm: show, setShowForm: setShow, handleShow }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
