import { Configuration, 
  CreateImageRequest, 
  CreateEditRequest, 
  CreateCompletionRequest, 
  CreateEmbeddingRequest, 
  CreateModerationRequest,
  OpenAIApi, 
  CreateChatCompletionRequest} from "openai";

export class OpenAIClient {
  client: OpenAIApi;

  constructor(organization: string, apiKey: string) {
    const configuration = new Configuration({
        organization,
        apiKey,
    });
    this.client = new OpenAIApi(configuration);
  }

  async createImage(payload: CreateImageRequest) {
    const response = await this.client.createImage(payload);
    return response.data;
  }

  async createCompletion(payload: CreateCompletionRequest) {
    const response = await this.client.createCompletion(payload);
    return response.data;
  }

  async createChatCompletion(payload: CreateChatCompletionRequest) {
    const response = await this.client.createChatCompletion(payload); 
    return response.data;
  }

  async createEdit(payload: CreateEditRequest) {
    const response = await this.client.createEdit(payload);
    return response.data;
  }

  async createEmbedding(payload: CreateEmbeddingRequest) {
    const response = await this.client.createEmbedding(payload);
    return response.data;
  }

  async createModeration(payload: CreateModerationRequest) {
    const response = await this.client.createModeration(payload);
    return response.data;
  }

}