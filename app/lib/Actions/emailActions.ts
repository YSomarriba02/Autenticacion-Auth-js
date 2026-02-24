"use server"

import { auth } from "@/auth"
import validarCambioPasswordCodigo from "../services/sendEmail/validarCambioPasswordCodigo"
import serviceCambioPasswordCodigo from "../services/sendEmail/serviceCambioPasswordCodigo"

export type enviarCodigoActionType = {
    state: boolean,
    message: string
}

export async function enviarCodigoAction(prevState: enviarCodigoActionType, formData: FormData): Promise<enviarCodigoActionType> {
    const arr = formData.getAll("otpinput")
    const codigo = arr.join("")
    const cantidadDigitos = codigo.length

    // console.log(codigo);
    // console.log(typeof (codigo))
    // return {
    //     state: false, message: ""
    // }

    if (cantidadDigitos < 5) {
        return {
            state: false, message: ""
        }
    }

    const session = await auth()
    const { email } = session?.user!

    if (!email) {
        return {
            message: "autenticate primero", state: false
        }
    }

    const { message, state } = await validarCambioPasswordCodigo({ email, codigo })


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