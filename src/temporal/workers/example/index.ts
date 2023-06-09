/**
 * Imports
 */
import { Worker } from '@temporalio/worker';
import { TemporalSingleton } from '../../client';
import { getDataConverter } from '../../encryption/data-converter';
import 'dotenv/config';
import * as activities from './activities';

async function run() {
  const isMTLS = process.env.MTLS === 'true';
  const isENCRYPTION = process.env.ENCRYPTION === 'true';
  const namespace = isMTLS ? process.env.TEMPORAL_NAMESPACE : 'default';

  const taskQueue = process.env.EXAMPLE_TASK_QUEUE ? process.env.EXAMPLE_TASK_QUEUE : 'example-queue';
  const connection = await TemporalSingleton.getNativeConnection();

  const worker = await Worker.create({
    connection,
    namespace,
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue,
    ...(isENCRYPTION && {dataConverter: await getDataConverter()})
  });
  console.log('Worker connection successfully established');

  await worker.run();
  await connection.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});