"use client";

import { useEffect } from "react";

const WA_BASE = "https://wa.me/79179183877";
const WA_DEFAULT = "Здравствуйте, хочу записаться в BASE Premier";

function buildWhatsAppUrl(masterName?: string | null, serviceName?: string | null): string {
  let text = WA_DEFAULT;
  if (serviceName && masterName) {
    text = `${WA_DEFAULT} — ${serviceName} к мастеру ${masterName}`;
  } else if (serviceName) {
    text = `${WA_DEFAULT} — ${serviceName}`;
  } else if (masterName) {
    text = `${WA_DEFAULT} к мастеру ${masterName}`;
  }
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

/**
 * Intercepts all [data-yclients-open] clicks site-wide.
 * Reads optional data-yclients-master (display name) and data-yclients-service
 * to pre-fill the WhatsApp message.
 * When YClients company_id + form_id arrive (Q4), replace buildWhatsAppUrl()
 * with the actual widget trigger: yclients.openForm(...)
 */
export function BookingHandler() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-yclients-open]") as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      const masterName = el.dataset["yclientsMaster"] ?? null;
      const serviceName = el.dataset["yclientsService"] ?? null;
      window.open(buildWhatsAppUrl(masterName, serviceName), "_blank", "noopener,noreferrer");
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
