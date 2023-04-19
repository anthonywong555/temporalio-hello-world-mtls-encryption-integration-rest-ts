# Temporal.io Hello World MTLS Encryption Integration REST Boilerplate

This guide is the a fork of [Temporal Hello World MTLS](https://github.com/temporalio/samples-typescript/tree/main/hello-world-mtls).

## Prerequisite

- [Temporal CLI](https://github.com/temporalio/cli) or [Temporal Cloud](https://pages.temporal.io/cloud-early-access)

## Getting Started with CLI

1. Execute the following commands:

```sh
brew install temporal
temporal server start-dev
```

2. Copy the .env-example file and rename it to .env. Modify the .env with the following:

| key                       | value               |
|---------------------------|---------------------|
| MTLS                      | false               |
| ENCRYPTION                | false               |

## Getting Started with Cloud

1. Use the 🐳 [Temporal.io Client Certificate Generation](https://hub.docker.com/r/temporalio/client-certificate-generation) to generate both CA and End-Entity certificate.

2. Upload the contents of the `CA.pem` file to Temporal.

3. Add the End-Entity Certificate files to `tls` folder.

4. Copy the `.env-example` file and rename it to `.env`.

5. If you want to connect to Temporal Cloud then fill in the .env with the following:

| key                       | value               |
|---------------------------|---------------------|
| TEMPORAL_ADDRESS          | foo.bar.tmprl.cloud |
| TEMPORAL_NAMESPACE        | foo.bar             |
| TEMPORAL_CLIENT_CERT_PATH | ./tls/ca.pem        |
| TEMPORAL_CLIENT_KEY_PATH  | ./tls/ca.key        |
| MTLS                      | true                |
| ENCRYPTION                | false               |

Reference: [Connecting to Temporal Cloud (with mTLS)](https://docs.temporal.io/typescript/security?lang=ts#connecting-to-temporal-cloud-with-mtls)

## Running the Project in Command Line 

1. Execute the following command:

```sh
npm install
```

2. To run the Client, execute the following command:

```sh
npm run client.watch
```

3. In run the Worker, execute the following command:

```sh
npm run worker.watch
```

4. Execute the following `curl` request.

```sh
curl -X POST http://localhost:8080/example \
   -H 'Content-Type: application/json' \
   -d '{"message":"Hello World"}'
```

## Running Encryption in Command Line

1. To run the Codec Server, then fill in the .env with the following:

| key                       | value               |
|---------------------------|---------------------|
| ENCRYPTION                | true                |

2. Execute the following command:

```sh
npm run encryption
```

## Running Project in Docker 🐳

1. To run the project in Docker, execute the following command:

```sh
docker compose -f "docker-compose.dev.yml" up -d --build 
```

## Integrations

### OpenAI

If you want to just add `OpenAI` into your workflow, then you will need to have the following code in `workflow.ts`:

```js
/* Start of the file */
import { createOpenAIActivites } from '../../sharable/ai/openai/activites';

const { createImage, createChatCompletion } = proxyActivities<ReturnType<typeof createOpenAIActivites>>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 1
  }
});
```

`index.ts`

```js
/* Start of the file */
import { createOpenAIActivites } from '../../sharable/ai/openai/activites';
import { OpenAIClient } from '../../sharable/ai/openai/client';

/* Loading Credentials */
const {OPENAI_ORGANIZATION = '', OPENAI_API_KEY = ''} = process.env;
const openAiClient = new OpenAIClient(OPENAI_ORGANIZATION, OPENAI_API_KEY);
const openAIActivites = createOpenAIActivites(openAiClient);

/* When you are instantiating your workers  */
activities: {...activities, ...openAIActivites}
```

### Airtable
If you want to just add `Airtable` into your workflow, then you will need to have the following code in `workflow.ts`:

```js
/* Start of the file */
import { createAirtableActivites } from '../../sharable/crm/airtable/activites';

const { select } = proxyActivities<ReturnType<typeof createAirtableActivites>>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 1
  }
});
```

`index.ts`

```js
/* Start of the file */
import { createAirtableActivites } from '../../sharable/crm/airtable/activites';
import { AirtableClient } from '../../sharable/crm/airtable/client';

/* Loading Credentials */
const {AIRTABLE_ACCESS_TOKEN = '', AIRTABLE_ENDPOINT_URL = '', AIRTABLE_BASE_ID = ''} = process.env;
const airtableClient = new AirtableClient(AIRTABLE_ACCESS_TOKEN, AIRTABLE_ENDPOINT_URL, AIRTABLE_BASE_ID);
const airtableActivites = createAirtableActivites(airtableClient);

/* When you are instantiating your workers  */
activities: {...activities, ...airtableActivites}
```

### Twilio

If you want to just add `Twilio` into your workflow, then you will need to have the following code in `workflow.ts`:

```js
/* Start of the file */
import { createTwilioActivites } from '../../sharable/communication/sms/twilio/activites';

const {twilioMessageCreate} = proxyActivities<ReturnType<typeof createTwilioActivites>>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3
  }
});
```

`index.ts`

```js
/* Start of the file */
import { createTwilioActivites } from '../../sharable/communication/sms/twilio/activites';
import { TwilioClient } from '../../sharable/communication/sms/twilio/client';

/* Loading Credentials */
const {TWILIO_ACCOUNT_SID = '', TWILIO_API_KEY = '', TWILIO_API_KEY_SECRET = '', TWILIO_DEFAULT_PHONE_NUMBER=''} = process.env;
const twilioClient = new TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_KEY_SECRET, TWILIO_DEFAULT_PHONE_NUMBER);
const twilioActivites = createTwilioActivites(twilioClient);

/* When you are instantiating your workers  */
activities: {...activities, ...twilioActivites},
```

### SendGrid

If you want to just add `SendGrid` into your workflow, then you will need to have the following code in `workflow.ts`:

```js
/* Start of the file */
import { createSendGridActivites } from '../../sharable/communication/email/sendgrid/activites';

const { sendEmail } = proxyActivities<ReturnType<typeof createSendGridActivites>>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3
  }
});
```

`index.ts`

```js
/* Start of the file */
import { createSendGridActivites } from '../../sharable/communication/email/sendgrid/activites';
import { SendGridClient } from '../../sharable/communication/email/sendgrid/client';

/* Loading Credentials */
const {SENDGRID_API_KEY = '', SENDGRID_DEFAULT_EMAIL = ''} = process.env;
const sendGridClient = new SendGridClient(SENDGRID_API_KEY, SENDGRID_DEFAULT_EMAIL);
const sendGridActivites = createSendGridActivites(sendGridClient);

/* When you are instantiating your workers  */
activities: {...activities, ...sendGridActivites},
```

### Vonage

If you want to just add `Vonage` into your workflow, then you will need to have the following code in `workflow.ts`:

```js
/* Start of the file */
import { createVonageActivites } from '../../sharable/communication/sms/vonage/activites';

const {vonageMessageCreate} = proxyActivities<ReturnType<typeof createVonageActivites>>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3
  }
});
```

`index.ts`

```js
/* Start of the file */
import { createVonageActivites } from '../../sharable/communication/sms/vonage/activites';
import { VonageClient } from '../../sharable/communication/sms/vonage/client';

/* Loading Credentials */
const {VONAGE_API_KEY = '', VONAGE_API_SECRET = '', VONAGE_DEFAULT_PHONE_NUMBER = ''} = process.env;
const vonageClient = new VonageClient(VONAGE_API_KEY, VONAGE_API_SECRET, VONAGE_DEFAULT_PHONE_NUMBER);
const vonageActivites = createVonageActivites(vonageClient);

/* When you are instantiating your workers  */
activities: {...activities, ...vonageActivites},
```

### Salesforce

If you want to just add `Salesforce` into your workflow, then you will need to have the following code in `workflow.ts`:

```js
/* Start of the file */
import { createSalesforceActivites } from '../salesforce/sharable/activites';

const { query, create } = proxyActivities<ReturnType<typeof createSalesforceActivites>>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 3
  }
});
```

`index.ts`

```js
/* Start of the file */
import { createSalesforceActivites } from '../salesforce/sharable/activites';
import { SalesforceClient } from '../salesforce/sharable/client';

/* Loading Credentials */
const salesforceClient = new SalesforceClient(temporalClient);
const salesforceActivites = createSalesforceActivites(salesforceClient);

/* When you are instantiating your workers  */
activities: {...activities, ...salesforceActivites},
```