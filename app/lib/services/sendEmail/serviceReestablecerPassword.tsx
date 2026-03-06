import encriptarPassword from "@/utils/encriptarPassword";
import { ReestablecerPasswordState } from "../../Actions/userActions";
import { findUserBd } from "../../repositories/findUserBd";
import updatePassword from "../../repositories/updatePassword";
import CodigoError from "../../Errors/CodigoError";

interface params {
  email: string;
  password: string;
}

export default async function serviceReestablecerPassword({
  email,
  password,
}: params): Promise<ReestablecerPasswordState> {
  if (!email || !password) {
    return {
      message: "Proporcione los campos necesarios",
      state: false,
    };
  }
  try {
    const user = await findUserBd(email);
    if (!user) throw new CodigoError("No fue posible actualizar");

    const nuevaPassword = await encriptarPassword(password);
    const update = await updatePassword({ email, nuevaPassword });

    if (!update) throw new CodigoError("No fue posible actualizar");

    return {
      message: "Contraseña actualizada",
      state: true,
    };
  } catch (error) {
    if (error instanceof CodigoError) {
      return {
        state: false,
        message: error.message,
      };
    }
    return {
      message: "Ocurrio un error",
      state: false,
    };
  }
}
