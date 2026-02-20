"use client";

import { useState } from "react";
import ButtonSingOut from "./ButtonSingOut";
import ModalCerrarSesion from "./ModalCerrarSesion";

export default function Modal() {
  const [show, setShow] = useState(false);

  function abrirModal() {
    setShow(true);
  }
  function cerrarModal() {
    setShow(false);
  }
  return (
    <div className=" flex justify-center lg:justify-start">
      <ButtonSingOut abrirModal={abrirModal} />
      {show && <ModalCerrarSesion cerrarModal={cerrarModal} />}
    </div>
  );
}
