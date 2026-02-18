import encriptarPassword from "@/utils/encriptarPassword"
import insertUserBd from "../../repositories/insertUserBd"
import { user } from "../../types/user"
import { findUserBd } from "../../repositories/findUserBd"

export default async function signUp(email: string, password: string): Promise<user | string> {
    if (!email || !password) return "campos requeridos"

    if (await findUserBd(email)) {
        return "Este email ya fue registrado"
    }

    const hash = await encriptarPassword(password)
    const user = await insertUserBd({ email, password: hash })
    return user as user
}