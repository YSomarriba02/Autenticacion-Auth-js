import updatePasswordCodigoIntento from "@/app/lib/repositories/updatePasswordCodigoIntento"

export default function validarCodigo({ fecha_creacion, intentos, codigoCambio, codigo, id }: { codigo: string, codigoCambio: number, fecha_creacion: Date, intentos: number, id: number }): boolean | string {


    if (intentos >= 3) {
        return "se intento 3 veces con este codigo"
    }

    if (codigoCambio != Number(codigo)) {
        let nuevoIntentos = ++intentos
        updatePasswordCodigoIntento({ id, intentos: nuevoIntentos })
        return "Codigo incorrecto"
    }

    const f_creacion = fecha_creacion.getTime() + ((5 * 60) * 1000)
    if (new Date().getTime() > f_creacion) {
        return "codigo expirado, se envio uno nuevo"
    }

    return false
}