"use client";

import { useState } from "react";
import BoxCambiarContraseña from "./BoxCambiarContraseña";
import BoxReestablecerContraseña from "./BoxReestablecerContraseña";

export default function ProfileOptions() {
  const [idAcordeon, setIdAcordeon] = useState<number | null>(null);

  console.log("ProgileOptions montado");

  return (
    <div className="flex flex-col py-2 gap-2 items-center">
      <BoxCambiarContraseña
        idBox={0}
        idAcordeon={idAcordeon}
        setIdAcordeon={setIdAcordeon}
      />
      <BoxReestablecerContraseña
        idBox={1}
        idAcordeon={idAcordeon}
        setIdAcordeon={setIdAcordeon}
      />
    </div>
  );
}
