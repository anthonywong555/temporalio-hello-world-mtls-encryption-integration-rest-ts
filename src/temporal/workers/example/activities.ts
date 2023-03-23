export async function echo(message: string): Promise<string> {
  return `Echo: ${message}!`;
}