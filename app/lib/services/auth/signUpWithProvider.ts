import encriptarPassword from "@/utils/encriptarPassword"
import insertUserBd from "../../repositories/insertUserBd"

export default async function signUpWithProvider(email: string, provider: string) {
    if (!email || !provider) return false

    const user = await insertUserBd({ email, provider })
    return user
}