"use server"
import { userBd } from "../types/user"
import compararPassword from "@/utils/compararPassword"
import signUp from "../services/auth/signUp"
import { auth } from "@/auth"
import { findUserBd } from "../repositories/findUserBd"
import encriptarPassword from "@/utils/encriptarPassword"
import updatePassword from "../repositories/updatePassword"
import compararHashes from "@/utils/compararHashes"


// registrar sesion --------------------------
export interface signUpReturn {
    state: boolean,
    message: string
}

export type retorno = signUpReturn | null

export async function registrarSesion(prevState: retorno, formData: FormData): Promise<retorno> {
    const email = formData.get("email") as string
    const password1 = formData.get("password1") as string
    const password2 = formData.get("password2") as string

    if (!email || !password1 || !password2) {
        return {
            state: false, message: "Complete los campos requeridos"
        }
    }

    if (!compararPassword(password1, password2)) {
        return {
            state: false, message: "password no coinciden"
        }
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
        const registro = await signUp(email, password1)
        return { state: true, message: registro }

    } catch (error) {
        return {
            state: false, message: "Ocurrio un error"
        }
    }
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
    const passwordActual = formData.get("passwordActual") as string
    const passwordNueva = formData.get("passwordNueva") as string

    if (!passwordActual || !passwordNueva) {
        return {
            state: false, message: "Complete los campos"
        }
    }

    const session = await auth();
    const userSession = session?.user;

    if (!userSession) {
        return {
            message: "No estas autenticado", state: false
        }
    }

    const { email } = userSession
    const userBd = await findUserBd(email!)
    if (!userBd) {
        return {
            message: "Usuario no encontrado", state: false
        }
    }

    const user = userBd as userBd
    console.log(user);
    if (user.provider_name != "credential") {
        return {
            message: "No disponible para proveedores", state: false
        }
    }

    const isPasswordActualValid = await compararHashes(passwordActual, user.passw!)

    if (!isPasswordActualValid) {
        return {
            state: false, message: "Contraseña actual no es valida"
        }
    }

    const hash = await encriptarPassword(passwordNueva);
    const passwordUpdate = await updatePassword({ email: user.email, nuevaPassword: hash })

    if (!passwordUpdate) {
        return {
            message: "No se pudo actualizar contraseña", state: false
        }
    }

    return {
        message: "Contraseña actualizada", state: true
    }
}

