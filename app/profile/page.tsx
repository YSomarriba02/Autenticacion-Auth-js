import { auth } from "@/auth";

export default async function page() {
  const user = await auth();
  if (!user) {
    return <div>No autenticado, nno puedes acceder al perfil</div>;
  }
  return <div>Profile pagina privada</div>;
}
