"use client";
import { signIn } from "next-auth/react";

interface props {
  provider: string;
  redirect?: string;
  typeAuth: "signup" | "login";
}

export default function ButtonAuth({ provider, redirect, typeAuth }: props) {
  function handlerButton() {
    signIn(provider, { redirectTo: redirect });
  }
  const text = typeAuth == "signup" ? "Registrarse con" : "Iniciar con";
  return (
    <button
      onClick={handlerButton}
      className="flex items-center gap-4 justify-center bg-slate-200 w-full h-10 text-black md:h-14"
    >
      <img src={`/Icons/${provider}Icon.png`} alt="" className="size-6" />
      <p className="font-medium">{`${text} ${provider}`}</p>
    </button>
  );
}
