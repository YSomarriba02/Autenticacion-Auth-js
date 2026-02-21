import generarCodigo from "@/utils/generarCodigo";


export async function GET(req: Request) {
    console.log(generarCodigo())
    return Response.json({ mensaje: "bien" })
}