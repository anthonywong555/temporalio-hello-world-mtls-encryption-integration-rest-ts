import { AirtableClient } from "./client";

export function createAirtableActivites(airtableClient: AirtableClient) {
  return {
    select: airtableClient.select.bind(airtableClient),
    find: airtableClient.find.bind(airtableClient),
    create: airtableClient.create.bind(airtableClient),
    update: airtableClient.update.bind(airtableClient),
    delete: airtableClient.delete.bind(airtableClient)
  }
}