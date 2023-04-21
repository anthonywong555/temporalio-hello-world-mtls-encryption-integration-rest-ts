import jsforce from 'jsforce';
import { SalesforceOAuth } from './types';

export async function getAccessToken(): Promise<SalesforceOAuth> {
  const {
    SFDC_LOGIN_URL, 
    SFDC_CONNECTED_APP_CONSUMER_KEY, 
    SFDC_CONNECTED_APP_CONSUMER_SECRET,
    SFDC_CONNECTED_APP_CALLBACK_URL
  } = process.env;

  const SFDC_USERNAME = process.env.SFDC_USERNAME as string;
  const SFDC_PASSWORD = process.env.SFDC_PASSWORD as string;
  const SFDC_SECURITY_TOKEN = process.env.SFDC_SECURITY_TOKEN as string;
  const conn = new jsforce.Connection({
    oauth2: {
      loginUrl: SFDC_LOGIN_URL,
      clientId: SFDC_CONNECTED_APP_CONSUMER_KEY,
      clientSecret: SFDC_CONNECTED_APP_CONSUMER_SECRET,
      redirectUri: SFDC_CONNECTED_APP_CALLBACK_URL,
    }
  });

  await conn.login(SFDC_USERNAME, SFDC_PASSWORD + SFDC_SECURITY_TOKEN);
  const { accessToken, instanceUrl } = conn;
  return { accessToken, instanceUrl };
}