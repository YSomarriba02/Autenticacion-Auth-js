"use client";
import { signIn } from "next-auth/react";

interface props {
  provider: string;
  redirect?: string;
}

export default function ButtonAuth({ provider, redirect }: props) {
  function handlerButton() {
    signIn(provider, { redirectTo: redirect });
  }
  return (
    <button
      onClick={handlerButton}
      className="flex items-center gap-4 justify-center mt-auto bg-slate-200 w-full h-10 text-black"
    >
      <img src={`/Icons/${provider}Icon.png`} alt="" className="size-6" />
      <p className="font-medium">{`Iniciar con ${provider}`}</p>
    </button>
  );
}
