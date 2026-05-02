// FalAI queue REST API — no SDK dependency needed
// Docs: https://fal.ai/models/fal-ai/hair-style-changer
const MODEL_ID = process.env.FAL_MODEL_ID ?? "fal-ai/hair-style-changer";
const BASE_URL = "https://queue.fal.run";

export interface FalInput {
  image_url: string;
  reference_image_url: string;
}

export interface FalOutput {
  image: { url: string };
}

function headers() {
  return {
    Authorization: `Key ${process.env.FAL_KEY ?? ""}`,
    "Content-Type": "application/json",
  };
}

export async function enqueueHairstyle(input: FalInput): Promise<string> {
  const res = await fetch(`${BASE_URL}/${MODEL_ID}`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ input }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`FalAI enqueue failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { request_id: string };
  return json.request_id;
}

interface FalStatus {
  status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  error?: unknown;
}

export async function pollResult(requestId: string): Promise<FalOutput | null> {
  const statusRes = await fetch(`${BASE_URL}/${MODEL_ID}/requests/${requestId}/status`, {
    headers: headers(),
  });

  if (!statusRes.ok) {
    const text = await statusRes.text();
    throw new Error(`FalAI status failed (${statusRes.status}): ${text}`);
  }

  const status = (await statusRes.json()) as FalStatus;

  if (status.status === "COMPLETED") {
    const resultRes = await fetch(`${BASE_URL}/${MODEL_ID}/requests/${requestId}`, {
      headers: headers(),
    });

    if (!resultRes.ok) {
      const text = await resultRes.text();
      throw new Error(`FalAI result fetch failed (${resultRes.status}): ${text}`);
    }

    const data = (await resultRes.json()) as FalOutput;
    return data;
  }

  if (status.status === "FAILED") {
    throw new Error(status.error ? String(status.error) : "FalAI processing failed");
  }

  return null; // still IN_QUEUE or IN_PROGRESS
}
