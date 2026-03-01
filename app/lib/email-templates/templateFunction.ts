
interface templateFunctiontype {
  titulo: string,
  contenido: string,
  text: string
}
export default function templateFunction({ contenido, titulo, text }: templateFunctiontype) {
  return `
        <html>
  <body style="margin:0; padding:20px; font-family:Arial, sans-serif; background:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:20px; border-radius:8px;">
            <tr>
              <td>
                <h2 style="color:#333; margin-bottom:16px;">${titulo}</h2>
                <p style="color:#555; line-height:1.5; margin-bottom:24px;">
                  ${text}
                </p>
                <p>${contenido}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `

}