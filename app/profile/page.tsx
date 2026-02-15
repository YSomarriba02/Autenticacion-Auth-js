import { auth } from "@/auth";
import Image from "next/image";

export default async function page() {
  const sesion = await auth();
  const user = sesion?.user!;

  if (!sesion) {
    return <div>No autenticado, no puedes acceder al perfil</div>;
  }
  const email = user.email as string;
  const image = user.image as string;
  return (
    <div>
      <p className="font-bold text-4xl">Pagina Perfil</p>
      <p>{email}</p>
      <Image
        loading="eager"
        src={image}
        alt={email}
        height={100}
        width={100}
        className="size-1/4"
      />
    </div>
  );
}
