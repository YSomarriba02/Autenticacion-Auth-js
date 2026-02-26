import { typeObjMensajesInvalidos } from "@/app/lib/services/sendEmail/validarCambioPasswordCodigo"

const PENALIZACION = (5 * 60) * 1000
const TIEMPOVALIDOCODIGO = (10 * 60) * 1000

type validarCodigoType = { codigo: string, codigoCambio: number, fecha_creacion: Date, intentos: number }

export default function validarCodigo({ fecha_creacion, intentos, codigoCambio, codigo }: validarCodigoType): false | keyof typeObjMensajesInvalidos {

    if (intentos >= 3) {

        if ((fecha_creacion.getTime() + PENALIZACION) > new Date().getTime()) {
            return "intentosExcedidosIspenalizado"
        }
        return "intentosExcedidos"
    }

    if (codigoCambio != Number(codigo)) {
        return "codigoIncorrecto"
    }

    const f_creacion = fecha_creacion.getTime() + TIEMPOVALIDOCODIGO
    if (new Date().getTime() > f_creacion) {
        return "codigoExpirado"
    }
    return false
}