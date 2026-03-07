import CodigoError from "../../Errors/CodigoError";
import validarCodigo from "@/utils/validarCodigo";
import findPasswordCodigo from "../../repositories/findPasswordCodigo";
import { findUserBd } from "../../repositories/findUserBd"
import { cambioPasswCodigo } from "../../types/cambioPasswordCodigo";
import { userBd } from "../../types/user";
import updatePasswordCodigoIntento from "../../repositories/updatePasswordCodigoIntento";
import updatePasswordCodigo from "../../repositories/updatePasswordCodigo";
import generarCodigo from "@/utils/generarCodigo";
import enviarEmailCodigoOtp from "@/utils/enviarEmailCodigoOtp";


type typeRetorno = {
    state: boolean,
    message: string
}

export type typeObjMensajesInvalidos = {
    intentosExcedidos: string
    codigoIncorrecto: string
    codigoExpirado: string
    intentosExcedidosIspenalizado: string
}

export default async function validarCodigoReset({ email, codigo }: { email: string, codigo: string }): Promise<typeRetorno> {

    try {
        if (!codigo || !email) {
            throw new CodigoError("Faltan parametros")
        }

        const userBd = await findUserBd(email);
        const user = userBd as userBd

        const idUser = user.id
        if (user.provider_name != "credentials") {
            return {
                state: false, message: "No disponible para proveedores externos"
            }
        }
        const codigoBd = await findPasswordCodigo({ id: idUser }) as cambioPasswCodigo
        console.log(codigoBd)
        if (!codigoBd) {
            throw new CodigoError("Error con el codigo")
        }

        const { codigo: codigoCambio, fecha_creacion, id_usuario, intentos } = codigoBd


        const objMensajesInvalidos: typeObjMensajesInvalidos = {
            intentosExcedidos: "Este codigo ya vencio, hemos enviando uno nuevo",
            codigoIncorrecto: "Codigo incorrecto",
            codigoExpirado: "codigo expirado, se envio uno nuevo",
            intentosExcedidosIspenalizado: "Ya fallo 3 veces, intentelo mas tarde"
        }
        const mensajeInvalido = validarCodigo({ fecha_creacion, codigoCambio, codigo, intentos })

        //Si el otp ingresado no es valido se aumenta la cant intentos
        if (mensajeInvalido == "codigoIncorrecto") {
            const update = await updatePasswordCodigoIntento({ id: id_usuario, intentos: intentos + 1 })
            if (!update) throw new CodigoError("No pudimos actualizar tu codigo, intentalo de nuevo")
            return {
                state: false, message: objMensajesInvalidos[mensajeInvalido]
            }
        }

        //si ya hay 3 intentos y aun sigue penalizado
        if (mensajeInvalido == "intentosExcedidosIspenalizado") {
            return {
                state: false, message: objMensajesInvalidos[mensajeInvalido]
            }
        }

        //si ya hay 3 intentos, se envia un cod nuevo y se actualiza en la bd
        //si el codigo simplemente expiro se envia uno nuevo
        if (mensajeInvalido == "intentosExcedidos" || mensajeInvalido == "codigoExpirado") {
            const nuevoCodigo = generarCodigo()
            const update = await updatePasswordCodigo({ id: id_usuario, nuevoCodigo })
            const envio = await enviarEmailCodigoOtp({ email, codigo: nuevoCodigo, type: "reenvio" })

            if (!envio || !update) throw new CodigoError("Tuvimos problemas para actualizar tu codigo, intentalo de nuevo")

            return {
                state: false, message: objMensajesInvalidos[mensajeInvalido]
            }
        }
        return {
            state: true, message: "Codigo correcto"
        }



    } catch (error) {
        if (error instanceof CodigoError) {
            return {
                message: error.message, state: false
            }
        }
        console.error(error)
        return {
            message: "Ocurrio un error", state: false
        }
    }
}