# Temporal.io Hello World MTLS Encryption REST Boilerplate

This guide is the a fork of [Temporal Hello World MTLS](https://github.com/temporalio/samples-typescript/tree/main/hello-world-mtls).

## Prerequisite

- [Temporal CLI](https://github.com/temporalio/cli) or [Temporal Cloud](https://pages.temporal.io/cloud-early-access)

## Getting Started with CLI

1. Execute the following commands:

```sh
brew install temporal
temporal server start-dev
```

2. Copy the .env-example file and rename it to .env.

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

Reference: [Connecting to Temporal Cloud (with mTLS)](https://docs.temporal.io/typescript/security?lang=ts#connecting-to-temporal-cloud-with-mtls)

## Running the Project

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

## Running Encryption

1. To run the Codec Server, execute the following command:

```sh
npm run encryption
```