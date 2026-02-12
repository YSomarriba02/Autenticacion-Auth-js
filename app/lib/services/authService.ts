import { use } from "react"
import { validateUserDB } from "../repositories/authRepository"


export async function loginUser(email: string, password: string) {
    if (!email || !password) return false
    const user = await validateUserDB(email, password)
    return user
}