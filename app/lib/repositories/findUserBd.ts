import querySQL2 from "../bd";
import { userBd } from "../types/user";

export async function findUserBd(email: string): Promise<userBd | null> {
    const resp = await querySQL2("select email,id,passw,provider_name,isVerificado  from usuarios where email = @email", [{ name: "email", type: "string", value: email }])
    const usuario = resp[0]
    return usuario || null
}