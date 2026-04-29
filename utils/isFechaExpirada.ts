import normalizarFecha from "./normalizarFecha";

export default function isFechaExpirada({ fecha, aumentoTime = 0 }: { fecha: Date, aumentoTime: number }) {


    const fechaParseada = normalizarFecha(fecha);

    const actual = new Date().getTime()
    const f1 = fechaParseada.getTime() + aumentoTime


    console.log(`La fecha: ${f1} - actual: ${actual}`)

    if (actual > f1) {
        return true
    }
    return false
}