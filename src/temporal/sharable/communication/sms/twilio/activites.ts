import { TwilioClient } from "./client";

export const TWILIO_PROVIDER = 'Twilio';

export function createTwilioActivites(twilioClient: TwilioClient) {
  return {
    twilioMessageCreate: twilioClient.createMessage.bind(twilioClient)
  }
}