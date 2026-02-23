import CodigoError from "../../Errors/CodigoError";
import validarCodigo from "@/utils/validarCodigo";
import findPasswordCodigo from "../../repositories/findPasswordCodigo";
import { findUserBd } from "../../repositories/findUserBd"
import { cambioPasswCodigo } from "../../types/cambioPasswordCodigo";
import { user } from "../../types/user";


type typeRetorno = {
    state: boolean,
    message: string
}

export default async function validarCambioPasswordCodigo({ email, codigo }: { email: string, codigo: string }): Promise<typeRetorno> {

    try {
        if (!codigo || !email) {

            throw new CodigoError("Faltan parametros")
        }

        const userBd = await findUserBd(email);
        const user = userBd as user

        const idUser = user.id
        const codigoBd = await findPasswordCodigo({ id: idUser }) as cambioPasswCodigo
        console.log(codigoBd)
        if (!codigoBd) {
            throw new CodigoError("Error con el codigo")
        }

        const { codigo: codigoCambio, fecha_creacion, id_usuario, intentos } = codigoBd
        const mensajeInvalido = validarCodigo({ fecha_creacion, codigoCambio, codigo, intentos, id: id_usuario })
        if (mensajeInvalido) {

            if (mensajeInvalido == "codigo expirado, se envio uno nuevo") {

            }
            throw new CodigoError(mensajeInvalido as string)
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

    return {
        message: "valido", state: true
    }

}