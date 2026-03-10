import encriptarPassword from "@/utils/encriptarPassword"
import insertUserBd from "../../repositories/insertUserBd"
import { findUserBd } from "../../repositories/findUserBd"
import findTokenVerificacionEmail from "../../repositories/findTokenVerificacionEmail"
import isFechaExpirada from "@/utils/isFechaExpirada"
import updateTokenVerificacionEmail from "../../repositories/updateTokenVerificacionEmail"
import generarToken from "@/utils/generarToken"
import insertTokenVerificacionEmail from "../../repositories/insertTokenVerificacionEmail"
import enviarTokenEmail from "@/utils/enviarTokenEmail"
import validarSeguridadPassword from "@/utils/validarSeguridadPassword"

const TIME_VALIDO = (10 * 10) * 1000


export default async function signUp(email: string, password: string): Promise<string> {
    if (!email || !password) {
        return "campos requeridos"

    }

    try {
        const userRepo = await findUserBd(email);
        if (!userRepo) {

            const validarPassword = validarSeguridadPassword({ password })
            if (typeof validarPassword == "string") {
                return validarPassword
            }

            const hash = await encriptarPassword(password);
            const userInsert = await insertUserBd({ email, password: hash })

            if (!userInsert) {
                throw new Error("Error Service/signUp- no se pudo insertar usuario")
            }
            const { id } = userInsert

            const token = generarToken()
            const insertToken = await insertTokenVerificacionEmail({ id_usuario: id, token })
            if (!insertToken) {
                throw new Error("Error Service/signUp- no se pudo insertar usuario")
            }

            enviarTokenEmail({ email, emailEnvio: "nuevo", id_usuario: id, token })
            return "Si todo está correcto, recibirás un enlace en tu correo en unos momentos. Revisa tu bandeja"

        }

        //si se encuentra este email en usuarios
        const { id, isVerificado } = userRepo
        if (isVerificado) {
            enviarTokenEmail({ email, emailEnvio: "aviso", id_usuario: id, token: "" })
            return "Si todo está correcto, recibirás un enlace en tu correo en unos momentos. Revisa tu bandeja"
        }

        const tokenVerificacion = await findTokenVerificacionEmail({ id_usuario: id })
        if (!tokenVerificacion) {
            const token = generarToken()
            const insertToken = await insertTokenVerificacionEmail({ id_usuario: id, token })

            if (insertToken) throw new Error("Error Service/signUp- no se pudo insertar usuario")

            enviarTokenEmail({ email, emailEnvio: "nuevo", id_usuario: id, token })
            return "Token validacion, enviamos un token a su email"

        }

        const { fecha_creacion, id_usuario } = tokenVerificacion
        const fechaExpirada = isFechaExpirada({ fecha: fecha_creacion, aumentoTime: TIME_VALIDO })
        if (fechaExpirada) {
            const nuevoToken = generarToken()
            const updateToken = await updateTokenVerificacionEmail({ id_usuario, nuevoToken })

            if (!updateToken) throw new Error("Error Service/signUp- no se pudo insertar usuario")
            enviarTokenEmail({ email, emailEnvio: "renovacion", id_usuario: id, token: nuevoToken })
            return "Token vencio, enviamos uno nuevo"
        }
        return "Ya se envio un correo, verificalo"

    } catch (error) {
        console.log(error);
        return "ocurrio un  error"
    }
}