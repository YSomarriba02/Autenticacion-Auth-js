import generarCodigo from "@/utils/generarCodigo";
import { findUserBd } from "../../repositories/findUserBd"
import insertCambiosPasswordCodigo from "../../repositories/insertCambiosPasswordCodigo";
import findPasswordCodigo from "../../repositories/findPasswordCodigo";
import isFechaExpirada from "@/utils/isFechaExpirada";
import updatePasswordCodigo from "../../repositories/updatePasswordCodigo";
import envioEmailCodigoOtp from "@/utils/enviarEmailCodigoOtp";
import { OTPTIEMPOVALIDO, PENALIZACIONTIEMPO } from "../../constants/password-reset";
import { reestablecerContraseñaState } from "../../Actions/userActions";
import CodigoError from "../../Errors/CodigoError";


export default async function serviceCambioPasswordCodigo({ email }: { email: string }): Promise<reestablecerContraseñaState> {
    if (!email) return {
        state: false,
        message: "Email es requerido"
    }

    try {
        const userBd = await findUserBd(email);
        if (!userBd) {
            return {
                state: false,
                message: "Usuario no encontrado"
            }
        }
        const id = userBd.id
        if (userBd.provider_name !== "credentials") {
            return {
                state: false, message: "No disponible para proveedores externos"
            }
        }

        const findCodigo = await findPasswordCodigo({ id })
        if (findCodigo) {
            //si ya se fallo 3 veces le volvere a enviar el email, pero despues de una penalizacion de tiempo
            if (findCodigo.intentos >= 3) {
                const fechaExpirada = isFechaExpirada({ fecha: findCodigo.fecha_creacion, aumentoTime: PENALIZACIONTIEMPO })
                if (!fechaExpirada) {
                    return {
                        state: false, message: "Intente mas tarde"
                    }
                }
                const nuevoCodigo = generarCodigo()
                const update = await updatePasswordCodigo({ id: findCodigo.id_usuario, nuevoCodigo })
                if (!update) throw new CodigoError("Error, no se pudo completar esta operacion")
                await envioEmailCodigoOtp({ codigo: nuevoCodigo, email, type: "reenvio" })
                return {
                    state: true, message: "Se le proporciono un nuevo cod, revise su correo"
                }
            }

            if (isFechaExpirada({ fecha: findCodigo.fecha_creacion, aumentoTime: OTPTIEMPOVALIDO })) {
                const nuevoCodigo = generarCodigo()
                const update = await updatePasswordCodigo({ id: findCodigo.id_usuario, nuevoCodigo })
                if (!update) throw new CodigoError("Error, no se pudo completar esta operacion")
                await envioEmailCodigoOtp({ codigo: nuevoCodigo, email, type: "reenvio" })
                return {
                    state: true, message: "Nuevo cod enviado, revise su correo"
                }
            }
            return {
                state: true, message: "ya posees un cod, revisa tu correo"
            }
        }
        const codigo = generarCodigo()
        const insertCod = await insertCambiosPasswordCodigo({ id, codigo })
        if (!insertCod) throw new CodigoError("Error, no se pudo completar esta operacion")
        await envioEmailCodigoOtp({ codigo, email, type: "envio" })
        return {
            state: true, message: "Enviamos un codigo a tu correo, copialo y pegalo aqui"
        }
    } catch (error) {
        if (!(error instanceof CodigoError)) {
            return {
                state: false, message: "Ocurrio un error"
            }
        }
        return {
            state: false, message: error.message
        }
    }
}


