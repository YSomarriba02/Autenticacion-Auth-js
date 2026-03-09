"use client";

import { useState } from "react";
import BoxCambiarContraseña from "./BoxCambiarContraseña";
import BoxReestablecerContraseña from "./BoxReestablecerContraseña";
import { useSession } from "next-auth/react";
import Spinner from "../Spinner";

export default function ProfileOptions() {
  const [idAcordeon, setIdAcordeon] = useState<number | null>(null);
  const session = useSession();
  const data = session.data;
  const sessionStatus = session.status;
  const provider = data?.user.provider!;

  return (
    <div className="flex flex-col py-2 gap-2 items-center">
      {sessionStatus == "loading" ? (
        <Spinner />
      ) : (
        sessionStatus == "authenticated" &&
        provider == "credentials" && (
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
        )
      )}
    </div>
  );
}
