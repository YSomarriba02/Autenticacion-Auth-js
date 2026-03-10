"use client";

import React, { SetStateAction } from "react";
import FormCambiarContrasena from "./FormCambiarContrasena";
import BoxComponent from "./BoxComponent";

interface props {
  idBox: number;
  idAcordeon: number | null;
  setIdAcordeon: React.Dispatch<SetStateAction<number | null>>;
}

export default function BoxCambiarContrasena({
  idBox,
  idAcordeon,
  setIdAcordeon,
}: props) {
  return (
    //Ocupo el wraple solo para la logica y reactividad del acordeon
    <BoxComponent
      icon={"/icons/password-icon.png"}
      idAcordeon={idAcordeon}
      idBox={idBox}
      setIdAcordeon={setIdAcordeon}
      title="Cambiar contraseña"
    >
      <FormCambiarContrasena />
    </BoxComponent>
  );
}
