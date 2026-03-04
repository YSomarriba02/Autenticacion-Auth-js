"use client";

import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

interface props {
  abrirModal: () => void;
}

export default function ButtonSingOut({ abrirModal }: props) {
  return (
    <button
      onClick={abrirModal}
      className="w-3/4 flex justify-center bg-red-400 p-4 rounded-2xl text-white font-semibold text-lg  lg:w-60 self-center lg:self-auto mt-0 hover:bg-red-500 hover:scale-95 transition-[background-color,scale] duration-300 ease-in group"
    >
      <p className="group-hover:-translate-x-1/3 transition-transform duration-75 ease-in">
        Cerrar sesion
      </p>
      <img
        src="/icons/logout-icon.png"
        alt=""
        className="absolute h-8 right-6 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-transform ease-in duration-200"
      />
    </button>
  );
}
