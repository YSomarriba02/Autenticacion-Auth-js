"use server"

import { auth } from "@/auth"
import validarCodigoReset from "../services/sendEmail/validarCodigoReset"
import serviceCambioPasswordCodigo from "../services/sendEmail/serviceCambioPasswordCodigo"

export type enviarCodigoActionType = {
    state: boolean,
    message: string
}


//Si no le paso email buscae el email del auth
export async function ActionValidarCodigoReset(prevState: enviarCodigoActionType, formData: FormData, emailParam?: string | undefined): Promise<enviarCodigoActionType> {

    let email: string | null = null;
    if (!emailParam) {
        const session = await auth()
        email = session?.user.email ?? null

        if (!email) {
            return {
                message: "Autenticate primero", state: false
            }
        }
    }
    else {
        email = emailParam.toString().trim() ?? null
        if (!email) {
            return {
                message: "Ingresa el email", state: false
            }
        }
    }

    const arr = formData.getAll("otpinput")
    const codigo = arr.join("")
    const cantidadDigitos = codigo.length

    if (cantidadDigitos < 5) {
        return {
            state: false, message: "OTP debe poseer 5 digitos"
        }
    }

    const { message, state } = await validarCodigoReset({ email, codigo })
    return {
        message, state
    }
}


export async function enviarEmailCodigoAction() {
    console.log("ejecutando server action")
    const session = await auth()
    const email = session?.user?.email!

    const resp = await serviceCambioPasswordCodigo({ email })
    return resp
}


