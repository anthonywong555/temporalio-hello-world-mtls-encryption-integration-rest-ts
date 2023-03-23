/**
 * Imports
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { TemporalSingleton } from '../temporal/client';
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
    const temporalClient = await TemporalSingleton.getWorkflowClient();
    const taskQueue = 'example-queue';
    const result = await temporalClient.execute(example, {
      taskQueue,
      workflowId: `my-business-id-${Date.now()}`,
      args: [body]
    })

    response.send(result);
  } catch(e) {
    console.error(e);
    response.send(e);
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}.\nNode Environment is on ${process.env.NODE_ENV} mode.`));