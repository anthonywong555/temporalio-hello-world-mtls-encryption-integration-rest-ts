import { VonageClient } from "./client";

export const VONAGE_PROVIDER = 'Vonage';

export function createVonageActivites(vonageClient: VonageClient) {
  return {
    vonageMessageCreate: vonageClient.createMessage.bind(vonageClient)
  }
}