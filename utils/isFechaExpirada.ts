import normalizarFecha from "./normalizarFecha";

export default function isFechaExpirada({ fecha, aumentoTime = 0 }: { fecha: Date, aumentoTime: number }) {


    const fechaParseada = normalizarFecha(fecha);

    const actual = new Date().getTime()
    const f1 = fechaParseada.getTime() + aumentoTime

    console.log(`La fecha fechaParseada es ${fechaParseada}`)
    console.log(`La fecha actual es ${new Date()}`);

    if (actual > f1) {
        return true
    }
    return false
}