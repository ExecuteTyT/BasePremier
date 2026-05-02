import type { HairstyleJob } from "./types";

const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const store = new Map<string, HairstyleJob>();

let cleanupInterval: NodeJS.Timeout | null = null;

function ensureCleanup() {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(
    () => {
      const now = Date.now();
      for (const [id, job] of store) {
        if (job.expiresAt < now) store.delete(id);
      }
    },
    60 * 60 * 1000, // run every hour
  );
  // Don't prevent Node from exiting
  if (cleanupInterval.unref) cleanupInterval.unref();
}

export function createJob(id: string, falRequestId?: string): HairstyleJob {
  ensureCleanup();
  const now = Date.now();
  const job: HairstyleJob = {
    id,
    falRequestId,
    status: "queued",
    createdAt: now,
    expiresAt: now + TTL_MS,
  };
  store.set(id, job);
  return job;
}

export function getJob(id: string): HairstyleJob | undefined {
  const job = store.get(id);
  if (!job) return undefined;
  if (job.expiresAt < Date.now()) {
    store.delete(id);
    return undefined;
  }
  return job;
}

export function updateJob(
  id: string,
  patch: Partial<Pick<HairstyleJob, "status" | "resultUrl" | "error" | "falRequestId">>,
): HairstyleJob | undefined {
  const job = store.get(id);
  if (!job) return undefined;
  Object.assign(job, patch);
  return job;
}
