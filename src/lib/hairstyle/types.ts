export type JobStatus = "queued" | "processing" | "completed" | "failed";

export interface HairstyleJob {
  id: string;
  falRequestId?: string;
  status: JobStatus;
  resultUrl?: string;
  error?: string;
  createdAt: number;
  expiresAt: number;
}

export interface HairstyleStyle {
  id: string;
  label: string;
  referenceUrl: string;
}

export const HAIRSTYLE_STYLES: HairstyleStyle[] = [
  {
    id: "fade-low",
    label: "Low Fade",
    referenceUrl: "/hairstyles/fade-low.jpg",
  },
  {
    id: "fade-mid",
    label: "Mid Fade",
    referenceUrl: "/hairstyles/fade-mid.jpg",
  },
  {
    id: "fade-high",
    label: "High Fade",
    referenceUrl: "/hairstyles/fade-high.jpg",
  },
  {
    id: "taper",
    label: "Taper Cut",
    referenceUrl: "/hairstyles/taper.jpg",
  },
  {
    id: "undercut",
    label: "Undercut",
    referenceUrl: "/hairstyles/undercut.jpg",
  },
  {
    id: "textured-crop",
    label: "Textured Crop",
    referenceUrl: "/hairstyles/textured-crop.jpg",
  },
  {
    id: "pompadour",
    label: "Pompadour",
    referenceUrl: "/hairstyles/pompadour.jpg",
  },
  {
    id: "slick-back",
    label: "Slick Back",
    referenceUrl: "/hairstyles/slick-back.jpg",
  },
];

export function findStyle(id: string): HairstyleStyle | undefined {
  return HAIRSTYLE_STYLES.find((s) => s.id === id);
}
