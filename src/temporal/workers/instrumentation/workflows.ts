/**
 * Imports
 */
import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import { Example_Request, Example_Response } from './types';

/**
 * Example Activites
 */
const { echo } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 1
  }
});

/**
 * Workflows
 */

/**
 * 
 * @param request 
 * @returns 
 */
export async function example(request: Example_Request): Promise<Example_Response> {
  const { message } = request;
    const result =  await echo(message);
    return { message: result };
}