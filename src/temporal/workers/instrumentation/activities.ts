import { getContext } from './interceptors';

export async function echo(message: string): Promise<string> {
  const { logger } = getContext();
  logger.info('Log from activity', { message });
  return `Echo: ${message}!`;
}