import compararHashes from "@/utils/compararHashes"
import { findUserBd } from "../../repositories/findUserBd"
import { user } from "../../types/user"


export async function loginUser(email: string, password: string) {
    if (!email || !password) return false
    let resp = await findUserBd(email)
    if (!resp) return false
    const user = resp as user
    const { passw: hash, ...userDTO } = user
    if (!await compararHashes(password, hash!)) return false
    return userDTO
}