import sgMail from '@sendgrid/mail';

export class SendGridClient {
  apiKey: string;
  defaultEmail: string | undefined;

  constructor(apiKey: string, defaultEmail?: string) {
    this.apiKey = apiKey;
    this.defaultEmail = defaultEmail;
  }

  async sendEmail(payload: any) {
    const client:any = sgMail.setApiKey(this.apiKey);
    const newPayload = this.defaultEmail ? {...payload, from: this.defaultEmail} : payload;

    return await client.send(newPayload);
  }
}