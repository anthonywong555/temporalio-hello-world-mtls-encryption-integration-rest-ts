import { SendGridClient } from "./client";

export function createSendGridActivites(sendGridClient: SendGridClient) {
  return {
    sendEmail: sendGridClient.sendEmail.bind(sendGridClient)
  }
}