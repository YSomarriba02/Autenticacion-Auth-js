import generarCodigo from "@/utils/generarCodigo";
import { findUserBd } from "../../repositories/findUserBd"
import { user, userBd } from "../../types/user";
import insertCambiosPasswordCodigo from "../../repositories/insertCambiosPasswordCodigo";
import templateFunction from "../../email-templates/templateFunction";
import { enviarEmail } from "./enviarEmail";
import findPasswordCodigo from "../../repositories/findPasswordCodigo";
import { cambioPasswCodigo } from "../../types/cambioPasswordCodigo";
import isFechaExpirada from "@/utils/isFechaExpirada";
import updatePasswordCodigo from "../../repositories/updatePasswordCodigo";


const PENALIZACION = (5 * 60) * 1000
const TIEMPOVALIDOCODIGO = (10 * 60) * 1000

export default async function serviceCambioPasswordCodigo({ email }: { email: string }) {
    if (!email) return "No autenticado"

    const userBd = await findUserBd(email);
    const user = userBd as userBd
    const id = user.id

    if (user.provider_name !== "credential") {
        return "No disponible para proveedores externos"
    }

    const findCodigo = await findPasswordCodigo({ id }) as cambioPasswCodigo
    if (findCodigo) {
        console.log(`${email} ya posee un cod`)


        //si ya se fallo 3 veces le volvere a enviar el email, pero despues de una penalizacion de tiempo
        if (findCodigo.intentos >= 3) {
            console.log("maximos intentos excedidos");
            const isTimeValid = isFechaExpirada({ fecha: findCodigo.fecha_creacion, aumentoTime: PENALIZACION })
            if (!isTimeValid) {
                console.log("Aun sigue penalizado, se enviara un cod hasta que finalice la penalizacion")
                return "Intente mas tarde"
            }

            console.log("ya termino la penalizacion, se reenviara uno nuevo");
            const nuevoCodigo = generarCodigo()
            const update = await updatePasswordCodigo({ id: findCodigo.id_usuario, nuevoCodigo })
            if (!update) return false

            const text = "Reenvio de Codigo para cambiar tu password, tienes 3 intentos, copie este codigo"
            const template = templateFunction({ contenido: nuevoCodigo, text, titulo: "Reestablecer Password" })
            const subject = "codigo cambio password"
            enviarEmail({ htmlContent: template, subject, toEmail: email })
            return "Se le proporciono un nuevo cod, revise su correo"

        }

        if (isFechaExpirada({ fecha: findCodigo.fecha_creacion, aumentoTime: TIEMPOVALIDOCODIGO })) {
            console.log("codigo ya vencio, se reenviara uno nuevo");
            const nuevoCodigo = generarCodigo()
            const update = await updatePasswordCodigo({ id: findCodigo.id_usuario, nuevoCodigo })
            if (!update) return false

            const text = "Reenvio de Codigo para cambiar tu password, copie este codigo"
            const template = templateFunction({ contenido: nuevoCodigo, text, titulo: "Reestablecer Password" })
            const subject = "codigo cambio password"
            enviarEmail({ htmlContent: template, subject, toEmail: email })
            return "Nuevo cod enviado, revise su correo"
        }
        console.log("ya tienes un cod usa ese");
        return "ya posees un cod, revisa tu correo"
    }
    const codigo = generarCodigo()
    const insertCod = await insertCambiosPasswordCodigo({ id, codigo })
    if (!insertCod) return false

    const text = "Codigo para cambiar tu password, copie este codigo"
    const template = templateFunction({ contenido: codigo, text, titulo: "Reestablecer Password" })
    const subject = "codigo cambio password"
    enviarEmail({ htmlContent: template, subject, toEmail: email })
    return "Enviamos un codigo a tu correo, copialo y pegalo aqui"
}