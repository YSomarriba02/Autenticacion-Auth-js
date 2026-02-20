"use server"

import { redirect } from "next/navigation"
import { loginUser } from "../services/auth/loginUser"
import { user } from "../types/user"
import { cookies } from "next/headers"
import compararPassword from "@/utils/compararPassword"
import signUp from "../services/auth/signUp"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export type retorno = null | string


// registrar sesion --------------------------

export async function registrarSesion(prevState: retorno, formData: FormData) {
    const email = formData.get("email") as string
    const password1 = formData.get("password1") as string
    const password2 = formData.get("password2") as string

    if (!email || !password1 || !password2) {
        console.log("falta un campo");
        return null
    }

    if (!compararPassword(password1, password2)) {
        return "password no coinciden"
    }


    // authjs deberia de ser capaz de devolver en el signIn la propiedad error
    // si la authorization no es posible, pero fue imposible hacerlo asi,
    // muchos desarrolladores reportan este error en authjs v5, en lugar de poner en 
    // la propiedad error el error o valor null devuelto en authorice simplemente lanza 
    // la exepcion y entre las soluciones que se barajan son: 
    // 1- Hacer el signIn en el cliente desde ahi por alguna razon si 
    // si devuelve en la propiedad error el error y se puede manejar bien.
    // 2- Esta que aplique aca capturar manualmente la exepcion y proceder con ello.

    try {

        const user = await signUp(email, password1)
        if (typeof user == "string") {
            return user.toString()
        }
        const result = await signIn("credentials", {
            email, password: password1, redirect: false, redirectTo: "/profile"
        })


    } catch (error) {

        if (error instanceof AuthError || error) {
            console.error(error)
            console.log("error con authjs")
            return null
        }
        return "credenciales no validas"
    }
    redirect("/profile")

}


//La solucion 1, al problema con authjs v5, pero deberia de adaptar el SignUp.tsx para recibir esto.
// export async function registrarSesion(prevState: retorno, formData: FormData) {
//     const email = formData.get("email") as string
//     const password1 = formData.get("password1") as string
//     const password2 = formData.get("password2") as string

//     if (!email || !password1 || !password2) {
//         console.log("falta un campo");
//         const r: retorno = {
//             state: false,
//             message: "faltan campos",
//             user: {
//                 email: "", id: 0, passw: ""
//             }
//         }
//         return r
//     }

//     if (!compararPassword(password1, password2)) {
//         console.log("password no coinciden")
//         const r: retorno = {
//             state: false,
//             message: "credenciales invalidas",
//             user: {
//                 email: "", id: 0, passw: ""
//             }
//         }
//         return r
//     }

//     try {

//         const user = await signUp(email, password1)
//         // const result = await signIn("credentials", {
//         //     email, password: password1, redirect: false, redirectTo: "/profile"
//         // })

//         const r: retorno = {
//             state: true,
//             message: "registrado",
//             user: {
//                 email, id: 0, passw: password1
//             }
//         }
//         return r

//     } catch (error) {
//         // console.log("Login error:", error);

//         // if (error instanceof AuthError || error) {
//         //     console.log("error con authjs")
//         // }
//         const r: retorno = {
//             state: false,
//             message: "error con el authjs",
//             user: {
//                 email: "", id: 0, passw: ""
//             }
//         }
//         return r

//     }
//     // if (result?.error) {
//     //     if (result.error === "CredentialsSignin") {
//     //         console.log("Credenciales inválidas")
//     //     }
//     //     else { console.log("Error específico:", result.error) }
//     // }
// }

// registrar sesion --------------------------

export type CambiarContraseñaResult = CambiarContraseñaState | null

interface CambiarContraseñaState {
    state: boolean,
    message: string,
}

export async function ActionCambiarContraseña(prevState: CambiarContraseñaResult, formData: FormData): Promise<CambiarContraseñaResult> {
    const password1 = formData.get("password1") as string
    const password2 = formData.get("password2") as string
    if (!compararPassword(password1, password2)) {
        return {
            message: "contraseñas no coinciden", state: false
        }
    }
    return null
}