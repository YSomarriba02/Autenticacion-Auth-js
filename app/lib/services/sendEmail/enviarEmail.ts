import { BrevoClient, Brevo } from '@getbrevo/brevo';

type envioEmailType = {
  toEmail: string,
  subject: string,
  htmlContent: string,
}

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_KEY!,
});

export async function enviarEmail({
  toEmail,
  subject,
  htmlContent,
}: envioEmailType): Promise<boolean> {
  try {
    const request: Brevo.SendTransacEmailRequest = {
      subject,
      htmlContent,
      sender: {
        name: process.env.SENDER_NAME!,
        email: process.env.SENDER_EMAIL!,
      },
      to: [
        {
          email: toEmail,

        },
      ],
    };

    const response = await brevo.transactionalEmails.sendTransacEmail(request)

    console.log('Email enviado! Message ID:', response.messageId);
    return true;
  } catch (error: any) {
    console.error('Error enviando email:', error.message);
    if (error.body) {
      console.error('Detalles de Brevo:', error.body);
    }
    return false;
  }
}