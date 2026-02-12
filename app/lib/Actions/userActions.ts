"use server"

import { loginUser } from "../services/authService"
import { user } from "../types/user"

export async function iniciarSesion(prevState: string, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const resp = await loginUser(email, password)
    if (!resp) return "usuario no encontrado"
    const respUser = resp as user
    return `${respUser.email} autenticado`
}