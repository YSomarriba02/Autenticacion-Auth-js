"use client";

import { useState } from "react";
import BoxCambiarContraseña from "./BoxCambiarContraseña";
import BoxReestablecerContraseña from "./BoxReestablecerContraseña";
import { useSession } from "next-auth/react";

export default function ProfileOptions() {
  const [idAcordeon, setIdAcordeon] = useState<number | null>(null);
  const session = useSession();
  const data = session.data;
  const sessionStatus = session.status;
  const provider = data?.user.provider!;

  if (sessionStatus == "loading") {
    return <div>cargando ...</div>;
  }

  console.log(sessionStatus);
  console.log(provider);

  return (
    <div className="flex flex-col py-2 gap-2 items-center">
      {sessionStatus == "authenticated" && provider == "credential" && (
        <>
          <BoxCambiarContraseña
            idBox={0}
            idAcordeon={idAcordeon}
            setIdAcordeon={setIdAcordeon}
          />
          <BoxReestablecerContraseña
            idBox={1}
            idAcordeon={idAcordeon}
            setIdAcordeon={setIdAcordeon}
          />
        </>
      )}
      <p></p>
    </div>
  );
}
