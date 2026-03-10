import { useEffect } from "react";
import FormNuevaPassword from "../auth/FormNuevaPassword";
import { useEmailContext } from "../auth/ProviderEmail";
import { useSession } from "next-auth/react";

export default function NuevaPassword() {
  const { setEmail } = useEmailContext();
  const session = useSession();
  const email = session.data?.user.email as string;

  useEffect(() => {
    if (session.status == "authenticated") {
      setEmail(email);
    }
  }, [session.status]);

  return <FormNuevaPassword typeForm="auth" />;
}
