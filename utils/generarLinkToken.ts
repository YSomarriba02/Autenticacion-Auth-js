export default function generarLinkToken({ token, id_usuario }: { token: string, id_usuario: number }) {
    const base = "http://autenticacion-auth-js.onrender.com/api/validaremail/"
    const url = new URL(base)
    url.searchParams.append("id", String(id_usuario))
    url.searchParams.append("token", token)
    return url.toString()
}