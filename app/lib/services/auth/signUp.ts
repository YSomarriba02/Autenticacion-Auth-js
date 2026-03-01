import encriptarPassword from "@/utils/encriptarPassword"
import insertUserBd, { userInsertResp } from "../../repositories/insertUserBd"
import { user } from "../../types/user"
import { findUserBd } from "../../repositories/findUserBd"
import findTokenVerificacionEmail from "../../repositories/findTokenVerificacionEmail"
import isFechaExpirada from "@/utils/isFechaExpirada"
import TokensVerificacionEmail from "../../types/TokenVerificacionEmail"
import updateTokenVerificacionEmail from "../../repositories/updateTokenVerificacionEmail"
import { enviarEmail } from "../sendEmail/enviarEmail"
import templateFunction from "../../email-templates/templateFunction"
import generarToken from "@/utils/generarToken"
import generarLinkToken from "@/utils/generarLinkToken"
import insertTokenVerificacionEmail from "../../repositories/insertTokenVerificacionEmail"

const TIME_VALIDO = (10 * 60) * 1000

export default async function signUp(email: string, password: string): Promise<string> {
    if (!email || !password) return "campos requeridos"


    try {

        const userRepo = await findUserBd(email);

        if (!userRepo) {
            const hash = await encriptarPassword(password);
            const userInsert = await insertUserBd({ email, password: hash })

            const { id } = userInsert as userInsertResp

            const token = generarToken()
            const insertToken = await insertTokenVerificacionEmail({ id_usuario: id, token })

            const subject = "Token validacion"
            const link = generarLinkToken({ id_usuario: id, token })
            const htmlContent = templateFunction({ contenido: link, text: "Token para validar email", titulo: "Token Email" })
            const envioEmail = await enviarEmail({ htmlContent, subject, toEmail: email })
            return "Token validacion, enviamos un token a su email"
        }

        //si se encuentra este email en usuarios
        const { id, isVerificado, email: userEmail } = userRepo as user
        if (isVerificado) {
            return "Este email ya fue registrado"

        }
        const tokenVerificacion = await findTokenVerificacionEmail({ id_usuario: id }) as TokensVerificacionEmail

        if (!tokenVerificacion) {
            const token = generarToken()
            const insertToken = await insertTokenVerificacionEmail({ id_usuario: id, token })

            const subject = "Token validacion"
            const link = generarLinkToken({ id_usuario: id, token })
            const htmlContent = templateFunction({ contenido: link, text: "Token para validar email", titulo: "Token Email" })
            const envioEmail = await enviarEmail({ htmlContent, subject, toEmail: email })
            return "Token validacion, enviamos un token a su email"

        }

        const { fecha_creacion, isValid, id_usuario } = tokenVerificacion

        //significa que ese token ya fue canjeado por lo tanto el usuario 
        // ya previoamente se habia registrado
        if (!isValid) {
            return "Token ya no es valido"
        }
        const isFechaValida = isFechaExpirada({ fecha: fecha_creacion, aumentoTime: TIME_VALIDO })
        if (!isFechaValida) {
            const nuevoToken = generarToken()
            const updateToken = await updateTokenVerificacionEmail({ id_usuario, nuevoToken })
            const link = generarLinkToken({ id_usuario, token: nuevoToken })
            const htmlContent = templateFunction({ contenido: link, text: "Nuevo token para validar email", titulo: "Token Email" })
            const subject = "Token validacion"
            const envioEmail = await enviarEmail({ htmlContent, subject, toEmail: userEmail })
            return "Token vencio, enviamos uno nuevo"
        }

        return "Ya se te envio un correo, verificalo"

    } catch (error) {
        console.log("un error en ")
        console.error(error)
        return "ocurrio un  error"
    }

}



//si ya lo hay verificamos valides





