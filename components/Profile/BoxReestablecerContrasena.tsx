"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import BoxComponent from "./BoxComponent";
import { enviarEmailCodigoAction } from "@/app/lib/Actions/emailActions";
import WizarReestablecerPassword from "./WizardReestablecerPassword";

interface props {
  idAcordeon: number | null;
  idBox: number;
  setIdAcordeon: React.Dispatch<SetStateAction<number | null>>;
}

export default function BoxReestablecerContrasena({
  idAcordeon,
  idBox,
  setIdAcordeon,
}: props) {
  const [showForm, setShowForm] = useState(false); //estado para mostrar el boton de recibir codigo
  const [codigoState, setCodigoState] = useState<null | {
    state: boolean;
    message: string;
  }>(null);

  useEffect(() => {
    if (showForm) {
      setTimeout(() => {
        setCodigoState(null);
      }, 6000);
    }
  }, [showForm]);

  return (
    <BoxComponent
      icon="/icons/reestablecerPassword-icon.png"
      idAcordeon={idAcordeon}
      idBox={idBox}
      setIdAcordeon={setIdAcordeon}
      title="Reestablecer contraseña"
    >
      <div className={`${showForm ? "hidden" : "block"} flex flex-col px-4`}>
        <button
          onClick={async () => {
            setShowForm(true);
            const { message, state } = await enviarEmailCodigoAction();
            setCodigoState({ state, message });
          }}
          className="bg-blue-400 w-2/5 p-1.5 self-end font-semibold rounded-md text-sm"
        >
          Recibir codigo
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        {codigoState && <span className="text-sm">{codigoState.message}</span>}
        {showForm && <WizarReestablecerPassword />}
      </div>
    </BoxComponent>
  );
}
