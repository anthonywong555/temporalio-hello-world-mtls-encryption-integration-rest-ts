import { OpenAIClient } from "./client";

export function createOpenAIActivites(openAIClient: OpenAIClient) {
  return {
    createImage: openAIClient.createImage.bind(openAIClient),
    createCompletion: openAIClient.createCompletion.bind(openAIClient),
    createChatCompletion: openAIClient.createChatCompletion.bind(openAIClient),
    createEdit: openAIClient.createEdit.bind(openAIClient),
    createEmbedding: openAIClient.createEmbedding.bind(openAIClient),
    createModeration: openAIClient.createModeration.bind(openAIClient)
  }
}