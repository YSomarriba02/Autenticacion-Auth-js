import { auth } from "@/auth";
import BoxCambiarContraseña from "@/Components/BoxCambiarContraseña";
import Modal from "@/Components/Modal";
import Image from "next/image";

export default async function page() {
  const sesion = await auth();
  const user = sesion?.user!;

  if (!sesion) {
    return (
      <div className="h-screen text-black">
        No autenticado, no puedes acceder al perfil
      </div>
    );
  }
  const email = user.email as string;
  const image = user.image as string;
  const name = user.name;
  return (
    <div className="h-full min-h-screen flex flex-col gap-2 text-black md:px-16">
      <div
        id="profile"
        className="flex flex-col-reverse gap-8 items-center lg:flex-row lg:items-end"
      >
        <Image
          loading="eager"
          src={image}
          alt={email}
          height={100}
          width={100}
          className="size-3/4 rounded-lg md:w-80 md:h-80 lg:h-60 lg:w-60"
        />
        <div className="mt-10">
          <span className="text-4xl md:text-3xl">Hola ✋🏻</span>
          <p className="font-bold text-3xl md:text-4xl">{name}</p>
        </div>
      </div>
      <Modal />

      <div className="flex flex-col py-2 gap-2">
        <BoxCambiarContraseña />
        <p>Soporte</p>
        <p>Calificar App</p>
        <p>Otros...</p>
      </div>
    </div>
  );
}
