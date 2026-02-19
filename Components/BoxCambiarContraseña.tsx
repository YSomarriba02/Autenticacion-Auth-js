"use client";

import React, { useState } from "react";

export default function BoxCambiarContraseña() {
  const [state, setState] = useState(false);
  return (
    <div
      onClick={(e: React.MouseEvent) => {
        const div = e.currentTarget as HTMLDivElement;
        if (!state) {
          div.style.height = "200px";
        } else {
          div.style.height = "auto";
        }
        setState((prev) => !prev);
      }}
      className="bg-zinc-100 flex items-center p-2 rounded-2xl gap-4 transition-[height] ease-in duration-100"
    >
      <img
        src="/icons/password-icon.png"
        alt=""
        className="size-12 bg-slate-300 rounded-full p-2"
      />
      <p>Cambiar contraseña</p>
    </div>
  );
}
