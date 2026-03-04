import { OTPTIEMPOVALIDO } from "@/app/lib/constants/password-reset"
import templateFunction from "@/app/lib/email-templates/templateFunction"
import { enviarEmail } from "@/app/lib/services/sendEmail/enviarEmail"

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

export default async function envioEmailCodigoOtp({ email, type, codigo }: { codigo: string, email: string, type: EmailTemplateKey }) {
    const { subject, text, titulo } = emailTemplates[type]
    const template = templateFunction({ contenido: codigo, text, titulo })
    await enviarEmail({ htmlContent: template, subject, toEmail: email })
}