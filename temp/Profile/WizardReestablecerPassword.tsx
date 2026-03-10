"use client";

import { useState } from "react";
import FormOtp from "./FormOtp";
import { EmailProvider } from "../auth/ProviderEmail";
import NuevaPassword from "./NuevaPassword";

export type Pasos = "paso1" | "paso2";

export default function WizarReestablecerPassword() {
  const [paso, setPaso] = useState<Pasos>("paso1");

  function setPaso2() {
    setPaso("paso2");
  }

  return (
    <EmailProvider>
      <section className="w-full">
        {paso == "paso1" ? (
          <FormOtp show={true} setPaso2={setPaso2} />
        ) : (
          <NuevaPassword />
        )}
      </section>
    </EmailProvider>
  );
}
