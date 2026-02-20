"use client";

import React, { SetStateAction, useState } from "react";
import Field from "./Field";
import FormCambiarContraseña from "./FormCambiarContraseña";

interface props {
  idBox: number;
  idAcordeon: number | null;
  setIdAcordeon: React.Dispatch<SetStateAction<number | null>>;
}

export default function BoxCambiarContraseña({
  idBox,
  idAcordeon,
  setIdAcordeon,
}: props) {
  return (
    <div
      className={`${
        idAcordeon == idBox
          ? "h-auto [box-shadow:0px_1px_3px_1px_var(--text)] rounded-2xl pb-4"
          : "h-11 rounded-sm"
      } bg-base flex flex-col p-2 w-full sm:w-3/4 lg:w-2/5 lg:self-start gap-4  transition-[height,border-radius] ease-linear duration-300 overflow-hidden`}
    >
      <div
        onClick={() => {
          setIdAcordeon((prev) => {
            if (prev == idBox) {
              return null;
            }
            return idBox;
          });
        }}
        id="content-show"
        className="flex items-center gap-2"
      >
        <img
          src="/icons/password-icon.png"
          alt=""
          className={`${idAcordeon == idBox ? "border-2" : "border-none"} bg-slate-300 border-green-400  size-8 rounded-full p-2 transition-colors ease-initial duration-150`}
        />
        <p>Cambiar contraseña</p>
      </div>
      <FormCambiarContraseña />
    </div>
  );
}
