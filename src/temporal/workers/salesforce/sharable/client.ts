import { WorkflowClient } from "@temporalio/client";
import { SALESFORCE_WORKFLOW_ID } from "..";
import jsforce from 'jsforce';
import { SalesforceOAuth } from '../types';
import { SALESOFRCE_OAUTH_QUERY_STRING } from '../workflows';

export class SalesforceClient {
  temporalClient: WorkflowClient;

  constructor(temporalClient: WorkflowClient) {
    this.temporalClient = temporalClient;
  }

  async getSFDCConnection(): Promise<jsforce.Connection> {
    const salesforceHandle = this.temporalClient.getHandle(SALESFORCE_WORKFLOW_ID);
    const salesforceOAuth = await salesforceHandle.query(SALESOFRCE_OAUTH_QUERY_STRING) as SalesforceOAuth;
    const {accessToken, instanceUrl} = salesforceOAuth;
    const sfdcConnection = new jsforce.Connection({
      instanceUrl,
      accessToken
    });

    return sfdcConnection;
  }

  async query(payload: any): Promise<jsforce.Query<jsforce.QueryResult<unknown>>> {
    const sfdcConnection = await this.getSFDCConnection();
    return await sfdcConnection.query(payload);
  }

  async create(type:string, records:any, options = {}): Promise<any> {
    const sfdcConnection = await this.getSFDCConnection();
    return await sfdcConnection.create(type, records, options);
  }

  async update(type: string, records:any, options = {}): Promise<any> {
    const sfdcConnection = await this.getSFDCConnection();
    return await sfdcConnection.update(type, records, options);
  }

  async upsert(type: string, records:any, extIdField:string, options = {}) {
    const sfdcConnection = await this.getSFDCConnection();
    return await sfdcConnection.upsert(type, records, extIdField, options);
  }

  async delete(type: string, ids:any, options = {}): Promise<any> {
    const sfdcConnection = await this.getSFDCConnection();
    return await sfdcConnection.delete(type, ids, options);
  }

  async bulkCreateJob(type: string, operation: string) {
    const sfdcConnection = await this.getSFDCConnection();
    return await sfdcConnection.bulk.createJob(type, operation);
  }
}