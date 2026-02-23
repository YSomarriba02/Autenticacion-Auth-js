"use client";

import React, {
  SetStateAction,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import BoxComponent from "./BoxComponent";
import OtpInput from "./OtpInput";
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

  return (
    <BoxComponent
      icon="/icons/reestablecerPassword-icon.png"
      idAcordeon={idAcordeon}
      idBox={idBox}
      setIdAcordeon={setIdAcordeon}
      title="Reestablecer contraseña"
    >
      <div className={`${state ? "block" : "hidden"}`}>
        <button
          onClick={async () => {
            setState(false);
            const resp = await enviarEmailCodigoAction();
            setCodigoState(resp);
          }}
          className="bg-blue-500 rounded-sm p-1 text-sm  border-2 border-black"
        >
          Recibir codigo
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        {codigoState && <span className="text-sm ">{codigoState}</span>}
        {state || <FormReestablecerPassword show={state} />}
      </div>
    </BoxComponent>
  );
}
