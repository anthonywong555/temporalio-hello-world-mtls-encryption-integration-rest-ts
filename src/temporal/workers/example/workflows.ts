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
  try {
    const { message } = request;
    const result = await echo(message);
    return { message: result };
  } catch (e) {
    throw e;
  }
}