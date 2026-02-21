import { Resend } from "resend"
import serviceCambioPasswordCodigo from "./serviceCambioPasswordCodigo"

const resend_key = process.env.RESEND_KEY
const resend = new Resend(resend_key)


type envioEmailType = {
    to: string,
    subject: string,
    //html
    //from
}
async function enviarEmail({ subject, to }: envioEmailType) {

    if (!to) return false

    const codigo = await serviceCambioPasswordCodigo({ email: to });
    if (!codigo) return false

    const from = "onboarding@resend.dev"  // por mientras consigo un dominio
    const htmlTemplate =
        `
        <html>
  <body style="margin:0; padding:20px; font-family:Arial, sans-serif; background:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; border-radius:8px;">
            <tr>
              <td>
                <h2 style="color:#333; margin-bottom:16px;">Codigo de cambio password!</h2>
                <p style="color:#555; line-height:1.5; margin-bottom:24px;">
                  Codigo para cambiar tu password, copie este codigo
                </p>
                <p>${codigo}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `
    const text = `Se te el siguiente codigo para reestablecer tu contraseña copialo ${codigo}`
    try {
        const { data, error } = await resend.emails.send({ to, subject, from, html: htmlTemplate, text })
        if (error) {
            return false
        }
        return data
    } catch (error) {
        return false
    }
}
