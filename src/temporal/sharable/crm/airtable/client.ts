import Airtable, { Base } from 'airtable';
import { FieldSet } from 'airtable/lib/field_set';
import { Records } from 'airtable/lib/records';

export class AirtableClient {
  client: Base;

  constructor(apiKey: string, endpointUrl = 'https://api.airtable.com', baseId: string) {
    this.client = new Airtable({ apiKey, endpointUrl }).base(baseId);
  }

  async select(tableName: string, payload: any) {
    const records: Records<FieldSet>[] = [];

    const page = await this.client(tableName).select(payload)
    await page.eachPage((pageRecord, fetchNextPage) => {
      records.push(pageRecord);
      fetchNextPage();
    });

    return records;
  }

  async find(tableName: string, recordId: string) {
    return await this.client(tableName).find(recordId);
  }

  async create(tableName: string, payload: any) {
    return await this.client(tableName).create(payload);
  }

  async update(tableName: string, payload: any) {
    return await this.client(tableName).update(payload);
  }

  async delete(tableName: string, payload: any) {
    return await this.client(tableName).destroy(payload);
  }
}