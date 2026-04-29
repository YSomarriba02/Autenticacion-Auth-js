import findTokenVerificacionEmail from "@/lib/repositories/findTokenVerificacionEmail";
import updateTokenVerificacionEmail from "@/lib/repositories/updateTokenVerificacionEmail";
import updateUserBd from "@/lib/repositories/updateUserBd";
import { userBd } from "@/lib/types/user";
import isFechaExpirada from "@/utils/isFechaExpirada";
import { encode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


const TIMEPOVALIDOTOKEN = (30 * 60) * 1000
const MAXAGE = 30 * 24 * 60 * 60


export async function GET(req: NextRequest) {
    console.log("En la ruta de verificacion email");
    const params = req.nextUrl.searchParams

    const id = Number(params.get("id"))
    const token = params.get("token") as string

    const tokenBd = await findTokenVerificacionEmail({ id_usuario: id })
    if (tokenBd?.token != token) {
        return NextResponse.json({ message: "Token no valido" })
    }

    if (!tokenBd) {
        return NextResponse.json({ message: "Token no valido" })
    }

    const { fecha_creacion: fecha, isValid, id_usuario } = tokenBd

    const isFechaValida = isFechaExpirada({ fecha, aumentoTime: TIMEPOVALIDOTOKEN })
    if (isFechaValida || !isValid) {
        return NextResponse.json({ message: "Token expiro o no es valido" })
    }

    await updateTokenVerificacionEmail({ id_usuario, isValid: false })
    const updateUser = await updateUserBd({ id: id_usuario, isVerificado: true }) as userBd

    const tokenJwt = await encode({
        token: {
            email: updateUser.email,
            picture: "https://avatars.githubusercontent.com/u/128437648?v=4",
            name: updateUser.email.split("@")[0] || null,
            provider: updateUser.provider_name
        },
        salt: "authjs.session-token",
        secret: process.env.SECRET!,
        maxAge: MAXAGE
    })


    const response = NextResponse.redirect(new URL("https://autenticacion-auth-js.onrender.com/perfil"))
    response.cookies.set({ name: "authjs.session-token", value: tokenJwt, httpOnly: true, sameSite: "lax", path: "/", secure: true })

    return response
}
