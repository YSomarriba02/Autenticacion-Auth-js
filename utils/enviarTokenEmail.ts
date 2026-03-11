import templateFunction from "@/lib/email-templates/templateFunction"
import generarLinkToken from "./generarLinkToken"
import { enviarEmail } from "@/lib/services/sendEmail/enviarEmail"

interface enviarTokenEmail {
    id_usuario: number,
    token: string,
    email: string,
    emailEnvio: typeEmailEnvio
}

interface typeEmail {
    titulo: string,
    text: string,
    subject: string
}

const objType = {
    aviso: {
        subject: "Token validacion",
        text: "Estas intentando registrar nuevamente tu correo",
        titulo: "Registro email"
    } as typeEmail,

    renovacion: {
        subject: "Token validacion",
        text: "Nuevo token para valdiar email",
        titulo: "Reenvio de token"
    } as typeEmail,
    nuevo: {
        subject: "Token validacion",
        text: "Usa este enlace para validar tu email en nuestra app",
        titulo: "Registro email"
    } as typeEmail
}

type typeEmailEnvio = keyof typeof objType



export default async function enviarTokenEmail({ email, id_usuario, token, emailEnvio }: enviarTokenEmail) {

    const { subject, text, titulo } = objType[emailEnvio]

    const link = emailEnvio == "aviso" ? "" : generarLinkToken({ id_usuario, token })
    const htmlContent = templateFunction({ contenido: link, text, titulo })
    const envioEmail = await enviarEmail({ htmlContent, subject, toEmail: email })
}