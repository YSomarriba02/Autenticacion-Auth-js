"use client";

import { SetStateAction, useState } from "react";
import BoxComponent from "./BoxComponent";
import OtpInput from "./OtpInput";

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
  const [state, setState] = useState(true);
  return (
    <BoxComponent
      icon="/icons/reestablecerPassword-icon.png"
      idAcordeon={idAcordeon}
      idBox={idBox}
      setIdAcordeon={setIdAcordeon}
      title="Reestablecer contraseña"
    >
      <div>
        <button
          onClick={() => {
            setState(false);
          }}
          className={`${state ? "scale-100" : "scale-0"} bg-blue-500 rounded-sm p-1 text-sm  border-2 border-black`}
        >
          Recibir codigo
        </button>
      </div>
      {state || (
        <form action="" className="flex gap-4">
          <OtpInput name="input1" />
          <OtpInput name="input1" />
          <OtpInput name="input1" />
          <OtpInput name="input1" />
          <OtpInput name="input1" />
        </form>
      )}
    </BoxComponent>
  );
}
