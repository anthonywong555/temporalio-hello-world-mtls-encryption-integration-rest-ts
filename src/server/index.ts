/**
 * Imports
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { TemporalSingleton } from '../temporal/client';

/**
 * Example Worker;
 */
import { example } from '../temporal/workers/example/workflows';

/**
 * Clients
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT ? process.env.PORT : '3000';

/**
 * Express Functions
 */

app.post('/example', async(request: any, response: any) => {
  try {
    const { body } = request;
    const taskQueue = process.env.EXAMPLE_TASK_QUEUE ? process.env.EXAMPLE_TASK_QUEUE : 'example-queue';
    const temporalClient = await TemporalSingleton.getWorkflowClient();
    const result = await temporalClient.execute(example, {
      taskQueue,
      workflowId: `example-workflowId-${Date.now()}`,
      args: [body]
    });

    response.send(result);
  } catch(e) {
    console.error(e);
    response.send(e);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}.\nNode Environment is on ${process.env.NODE_ENV} mode.`));