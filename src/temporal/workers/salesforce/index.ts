import { Worker } from '@temporalio/worker';
import { WorkflowExecutionAlreadyStartedError } from '@temporalio/client'; 
import 'dotenv/config';
import { TemporalSingleton } from '../../client';
import { getDataConverter } from '../../encryption/data-converter';
import * as activities from './activities';
import { refreshSalesforceOAuth } from './workflows';

const isMTLS = process.env.MTLS === 'true';
const isENCRYPTION = process.env.ENCRYPTION === 'true';
const namespace = isMTLS ? process.env.TEMPORAL_NAMESPACE : 'default';
const taskQueue = 'salesforce';
export const SALESFORCE_WORKFLOW_ID = `salesforce-refresh-oauth`;

async function runClient() {
  try {
    // Create Client
    const temporalClient = await TemporalSingleton.getWorkflowClient();
    await temporalClient.execute(refreshSalesforceOAuth, {
      taskQueue,
      workflowId: SALESFORCE_WORKFLOW_ID,
      args: []
    });
  } catch (e) {
    if(e instanceof WorkflowExecutionAlreadyStartedError) {
      console.log(`Workflow is already running.`);
    } else {
      throw e;
    }
  }
}

async function runWorker() {
  // Create Worker
  const connection = await TemporalSingleton.getNativeConnection();
  const worker = await Worker.create({
    connection,
    namespace,
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue,
    ...(isENCRYPTION && {dataConverter: await getDataConverter()})
  });

  await worker.run();
  await connection.close();
}

async function run() {
  await Promise.all([runClient(), runWorker()]);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});