declare module "@fal-ai/client" {
  interface QueueStatus {
    status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | string;
    [key: string]: unknown;
  }

  // fal.ts casts this before use, so unknown is correct here
  export const config: unknown;

  export const queue: {
    submit(modelId: string, opts: { input: unknown }): Promise<{ request_id: string }>;
    status(modelId: string, opts: { requestId: string; logs: boolean }): Promise<QueueStatus>;
    result<T>(modelId: string, opts: { requestId: string }): Promise<{ data: T }>;
  };
}
