import { Connection, WorkflowClient } from '@temporalio/client';
import { NativeConnection } from '@temporalio/worker';
import { getDataConverter } from './encryption/data-converter';
import 'dotenv/config';
import fs from 'fs';

export class TemporalSingleton {
  private static instanceOfWorkflowClient: WorkflowClient;
  private static instanceOfConnection: Connection;
  private static instanceOfNativeConnection: NativeConnection;

  public static async getConnection(): Promise<Connection> {
    if (!this.instanceOfConnection) {
      const env = TemporalSingleton.getEnv();
      const { address, clientCertPath, clientKeyPath, serverNameOverride, serverRootCACertificatePath, isMTLS } = env;

      // Check to see if you are connection to Temporal Cloud or Temporal Local
      if (isMTLS) {
        let serverRootCACertificate: Buffer | undefined = undefined;
        if (serverRootCACertificatePath) {
          serverRootCACertificate = fs.readFileSync(serverRootCACertificatePath);
        }

        this.instanceOfConnection = await Connection.connect({
          address,
          tls: {
            serverNameOverride,
            serverRootCACertificate,
            clientCertPair: {
              crt: fs.readFileSync(clientCertPath),
              key: fs.readFileSync(clientKeyPath),
            },
          },
        });
      } else {
        this.instanceOfConnection = await Connection.connect();
      }
    }

    return this.instanceOfConnection;
  }

  public static async getNativeConnection(): Promise<NativeConnection> {
    if (!this.instanceOfNativeConnection) {
      const env = TemporalSingleton.getEnv();
      const { address, clientCertPath, clientKeyPath, serverNameOverride, serverRootCACertificatePath, isMTLS } = env;

      // Check to see if you are connection to Temporal Cloud or Temporal Local
      if (isMTLS) {
        let serverRootCACertificate: Buffer | undefined = undefined;
        if (serverRootCACertificatePath) {
          serverRootCACertificate = fs.readFileSync(serverRootCACertificatePath);
        }

        this.instanceOfNativeConnection = await NativeConnection.connect({
          address,
          tls: {
            serverNameOverride,
            serverRootCACertificate,
            clientCertPair: {
              crt: fs.readFileSync(clientCertPath),
              key: fs.readFileSync(clientKeyPath),
            },
          },
        });
      } else {
        this.instanceOfNativeConnection = await NativeConnection.connect();
      }
    }

    return this.instanceOfNativeConnection;
  }

  public static async getWorkflowClient(): Promise<WorkflowClient> {
    if (!this.instanceOfWorkflowClient) {
      const env = TemporalSingleton.getEnv();
      const { namespace, isMTLS, isENCRYPTION } = env;
      const connection = await this.getConnection();
      let props = { connection, namespace: '', dataConverter: null };

      this.instanceOfWorkflowClient = new WorkflowClient({ 
        connection,
        ...(isMTLS && { namespace }),
        ...(isENCRYPTION && {dataConverter: await getDataConverter()})
      });
    }

    return this.instanceOfWorkflowClient;
  }

  private static requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
      throw new ReferenceError(`${name} environment variable is not defined`);
    }
    return value;
  }

  private static getEnv(): Env {
    return {
      address: this.requiredEnv('TEMPORAL_ADDRESS'),
      namespace: this.requiredEnv('TEMPORAL_NAMESPACE'),
      clientCertPath: this.requiredEnv('TEMPORAL_CLIENT_CERT_PATH'),
      clientKeyPath: this.requiredEnv('TEMPORAL_CLIENT_KEY_PATH'),
      serverNameOverride: process.env.TEMPORAL_SERVER_NAME_OVERRIDE,
      serverRootCACertificatePath: process.env.TEMPORAL_SERVER_ROOT_CA_CERT_PATH,
      taskQueue: process.env.TEMPORAL_TASK_QUEUE || 'subscription',
      isMTLS: this.requiredEnv('MTLS') === 'true',
      isENCRYPTION: this.requiredEnv('ENCRYPTION') === 'true',
    };
  }
}

interface Env {
  address: string;
  namespace: string;
  clientCertPath: string;
  clientKeyPath: string;
  serverNameOverride?: string; // not needed if connecting to Temporal Cloud
  serverRootCACertificatePath?: string; // not needed if connecting to Temporal Cloud
  taskQueue: string;
  isMTLS?: boolean;
  isENCRYPTION?: boolean;
}