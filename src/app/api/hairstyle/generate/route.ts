import { randomUUID } from "crypto";

import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/env";
import { enqueueHairstyle } from "@/lib/hairstyle/fal";
import { createJob } from "@/lib/hairstyle/store";
import { findStyle } from "@/lib/hairstyle/types";

const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

const bodySchema = z.object({
  styleId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  if (!process.env.FAL_KEY) {
    return NextResponse.json({ error: "AI service not configured" }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid multipart body" }, { status: 400 });
  }

  const photo = formData.get("photo");
  if (!(photo instanceof File)) {
    return NextResponse.json({ error: "photo file is required" }, { status: 400 });
  }
  if (!ALLOWED_MIME.includes(photo.type)) {
    return NextResponse.json({ error: "Photo must be JPEG, PNG, or WebP" }, { status: 400 });
  }
  if (photo.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Photo must be under 8 MB" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse({ styleId: formData.get("styleId") });
  if (!parsed.success) {
    return NextResponse.json({ error: "styleId is required" }, { status: 400 });
  }

  const style = findStyle(parsed.data.styleId);
  if (!style) {
    return NextResponse.json({ error: "Unknown styleId" }, { status: 400 });
  }

  // Convert uploaded photo to data URL for FalAI
  const buffer = await photo.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const imageDataUrl = `data:${photo.type};base64,${base64}`;

  // Build absolute URL for the reference hairstyle image
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const referenceUrl = `${siteUrl}${style.referenceUrl}`;

  const jobId = randomUUID();

  try {
    const falRequestId = await enqueueHairstyle({
      image_url: imageDataUrl,
      reference_image_url: referenceUrl,
    });

    createJob(jobId, falRequestId);

    return NextResponse.json({ jobId }, { status: 202 });
  } catch (err) {
    console.error("[hairstyle/generate]", err);
    return NextResponse.json({ error: "Failed to enqueue job" }, { status: 502 });
  }
}
