"use server"

import { redirect } from "next/navigation"
import { loginUser } from "../services/authService"
import { user } from "../types/user"
import { cookies } from "next/headers"

export async function iniciarSesion(prevState: string, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const resp = await loginUser(email, password)
    if (!resp) return "usuario no encontrado"
    const respUser = resp as user
    const cookieStore = await cookies();
    cookieStore.set("userCookie", JSON.stringify(respUser), { maxAge: 10 })
    redirect("/profile")
}