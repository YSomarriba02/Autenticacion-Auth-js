"use client";

import { useState } from "react";
import BoxCambiarContraseña from "./BoxCambiarContraseña";

export default function ProfileOptions() {
  const [idAcordeon, setIdAcordeon] = useState<number | null>(null);

  return (
    <div className="flex flex-col py-2 gap-2 items-center">
      <BoxCambiarContraseña
        idBox={0}
        idAcordeon={idAcordeon}
        setIdAcordeon={setIdAcordeon}
      />
      <BoxCambiarContraseña
        idBox={1}
        idAcordeon={idAcordeon}
        setIdAcordeon={setIdAcordeon}
      />
      <BoxCambiarContraseña
        idBox={2}
        idAcordeon={idAcordeon}
        setIdAcordeon={setIdAcordeon}
      />
      <BoxCambiarContraseña
        idBox={3}
        idAcordeon={idAcordeon}
        setIdAcordeon={setIdAcordeon}
      />
    </div>
  );
}
