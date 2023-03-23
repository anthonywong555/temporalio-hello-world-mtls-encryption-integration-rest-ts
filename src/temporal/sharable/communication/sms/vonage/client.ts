import { Vonage } from "@vonage/server-sdk";
import { Auth } from '@vonage/auth';

export class VonageClient {
  client: any;
  defaultPhoneNumber: string | undefined;

  constructor(apiKey: string, apiSecret: string, defaultPhoneNumber?: string) {
    const credentials = new Auth({
      apiKey,
      apiSecret
    });

    this.defaultPhoneNumber = defaultPhoneNumber;
    this.client = new Vonage(credentials);
  }

  async createMessage(payload: any) {
    const newPayload = this.defaultPhoneNumber ? 
      {...payload, from: this.defaultPhoneNumber} : 
      payload;

    const {toPhoneNumber} = payload;
    const result = await this.client.sms.send(newPayload);
    const message = result.messages[0];
    return message;
  }
}