"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

function stopProgragation(e: React.MouseEvent) {
  e.stopPropagation();
}

interface props {
  cerrarModal: () => void;
}

export default function ModalCerrarSesion({ cerrarModal: close }: props) {
  const refModal = useRef<HTMLDivElement | null>(null);
  const session = useSession();
  const name = session.data?.user?.name || "";

  useEffect(() => {
    if (!refModal.current) return;
    const modal = refModal.current;
    modal.classList.add("animate-entradaModal");
    console.log("se supone que esta animacion se esta haciendo");
    return () => {};
  }, []);

  useEffect(() => {
    // Bloquear scroll al montar el modal
    document.body.style.overflow = "hidden";

    return () => {
      // Restaurar scroll al desmontar el modal
      document.body.style.overflow = "auto";
    };
  }, []);

  function cerrarSesion() {
    signOut({ redirectTo: "/auth" });
  }

  function cerrarModal(e: React.MouseEvent) {
    if (!refModal.current) return;
    const modal = refModal.current;
    modal.classList.remove("animate-entradaModal");
    modal.classList.add("animate-salidaModal");
    modal.addEventListener("animationend", close);
  }
  return (
    <div
      onClick={cerrarModal}
      ref={refModal}
      className=" fixed inset-0 bg-[#08080856] backdrop-blur-[5px] -translate-y-full"
    >
      <div
        onClick={stopProgragation}
        className="flex flex-col gap-4 items-center py-4 px-8 absolute left-1/2 top-1/2 -translate-1/2 w-3/4 bg-white rounded-2xl sm:w-3/5 md:w-2/6"
      >
        <img
          src="/icons/advertencia-icon.png"
          alt="advertencia cerrrar sesion"
          className="h-20"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-semibold">Estas seguro?</p>
          <p className="text-sm text-center">{`${name} estas a punto de cerrar sesion en esta app`}</p>
        </div>
        <nav className="flex gap-2 w-full">
          <button
            onClick={cerrarSesion}
            className="p-2 bg-red-400 text-slate-50 w-1/2 font-semibold"
          >
            Cerrar sesion
          </button>
          <button
            onClick={cerrarModal}
            className="p-2 border-2 border-black rounded-md text-black w-1/2 font-semibold"
          >
            Cancelar
          </button>
        </nav>
      </div>
    </div>
  );
}
