import { SalesforceClient } from "./client";

export function createSalesforceActivites(salesforceClient: SalesforceClient) {
  return {
    getSFDCConnection: salesforceClient.getSFDCConnection.bind(salesforceClient),
    query: salesforceClient.query.bind(salesforceClient),
    create: salesforceClient.create.bind(salesforceClient),
    update: salesforceClient.update.bind(salesforceClient),
    upsert: salesforceClient.upsert.bind(salesforceClient),
    delete: salesforceClient.delete.bind(salesforceClient),
    bulkCreateJob: salesforceClient.bulkCreateJob.bind(salesforceClient)
  }
}