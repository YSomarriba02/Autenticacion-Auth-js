import generarCodigo from "@/utils/generarCodigo";


export async function GET(req: Request) {
    const nuevoToken = crypto.randomUUID()
    console.log(nuevoToken);
    return Response.json({ mensaje: "bien" })
}