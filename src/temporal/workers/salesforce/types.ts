export interface SalesforceOAuth {
  accessToken: string;
  instanceUrl: string;
}

export interface Input {
  sfdcAccessToken?: string;
  lastRefreshed: number;
}