import { proxyActivities, sleep, continueAsNew, defineQuery, setHandler} from '@temporalio/workflow';
import ms from 'ms';
import type * as activities from './activities';
import { SalesforceOAuth } from './types';

const { getAccessToken } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export const SALESOFRCE_OAUTH_QUERY_STRING = 'getToken';
export const getSalesforceOAuth = defineQuery<SalesforceOAuth | undefined>(SALESOFRCE_OAUTH_QUERY_STRING);

export interface Input {
  sfdcOAuth?: SalesforceOAuth;
  lastRefreshed: number;
}

const tokenExpiryPeriod = ms('2 hours');
const tokenRefreshInterval = ms('90 minute');

export async function refreshSalesforceOAuth({lastRefreshed, sfdcOAuth}: Input = {lastRefreshed: 0}): Promise<void> {
  try {
    // Setup a query handler.
    setHandler(getSalesforceOAuth, () => 
      Date.now() - lastRefreshed < tokenExpiryPeriod ? sfdcOAuth : undefined
    );
    
    sfdcOAuth = await getAccessToken();
    lastRefreshed = Date.now();

    await sleep(tokenRefreshInterval);
    await continueAsNew<typeof refreshSalesforceOAuth>({lastRefreshed, sfdcOAuth});
  } catch (e) {
    throw e;
  }
}