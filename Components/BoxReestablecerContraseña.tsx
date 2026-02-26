"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import BoxComponent from "./BoxComponent";
import { enviarEmailCodigoAction } from "@/app/lib/Actions/emailActions";
import FormReestablecerPassword from "./FormReestablecerPassword";

interface props {
  idAcordeon: number | null;
  idBox: number;
  setIdAcordeon: React.Dispatch<SetStateAction<number | null>>;
}

export default function BoxReestablecerContraseña({
  idAcordeon,
  idBox,
  setIdAcordeon,
}: props) {
  const [state, setState] = useState(true); //estado para mostrar el boton de recibir codigo
  const [codigoState, setCodigoState] = useState<boolean | string>(false);

  useEffect(() => {
    if (!state) {
      setTimeout(() => {
        setCodigoState(false);
      }, 6000);
    }
  }, [state]);

  return (
    <BoxComponent
      icon="/icons/reestablecerPassword-icon.png"
      idAcordeon={idAcordeon}
      idBox={idBox}
      setIdAcordeon={setIdAcordeon}
      title="Reestablecer contraseña"
    >
      <div className={`${state ? "block" : "hidden"} flex flex-col px-4`}>
        <button
          onClick={async () => {
            setState(false);
            const resp = await enviarEmailCodigoAction();
            setCodigoState(resp);
          }}
          className="bg-blue-400 w-2/5 p-1.5 self-end font-semibold rounded-md text-sm"
        >
          Recibir codigo
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        {codigoState && <span className="text-sm">{codigoState}</span>}
        {state || <FormReestablecerPassword show={state} />}
      </div>
    </BoxComponent>
  );
}
