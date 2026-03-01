export default function isFechaExpirada({ fecha, aumentoTime = 0 }: { fecha: Date, aumentoTime: number }) {

    const actual = new Date().getTime()
    const f1 = fecha.getTime() + aumentoTime

    console.log(`La fecha: ${f1} - actual: ${actual}`)

    if (actual > f1) {
        return true
    }
    return false
}