import { OTPTIEMPOVALIDO } from "@/lib/constants/password-reset"
import templateFunction from "@/lib/email-templates/templateFunction"
import { enviarEmail } from "@/lib/services/sendEmail/enviarEmail"

const emailTemplates = {
    envio: {
        text: `Tu código para restablecer contraseña es valido durante ${OTPTIEMPOVALIDO} minutos`,
        titulo: "Código de verificación",
        subject: "Reestablecer password",
    },
    reenvio: {
        text: `Reenvío de tu código de verificación. Úsalo pronto (expira en ${OTPTIEMPOVALIDO})`,
        titulo: "Código reenviado",
        subject: "Reestablecer password",
    }
}
type EmailTemplateKey = keyof typeof emailTemplates

export default async function enviarEmailCodigoOtp({ email, type, codigo }: { codigo: string, email: string, type: EmailTemplateKey }) {
    const { subject, text, titulo } = emailTemplates[type]
    const template = templateFunction({ contenido: codigo, text, titulo })
    const envio = await enviarEmail({ htmlContent: template, subject, toEmail: email })
    return envio
}