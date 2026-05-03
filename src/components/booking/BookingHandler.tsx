"use client";

import { useEffect } from "react";

import { useBooking } from "@/components/booking/BookingContext";

const COMPANY_ID = process.env.NEXT_PUBLIC_YCLIENTS_COMPANY_ID;

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
 *
 * When NEXT_PUBLIC_YCLIENTS_COMPANY_ID is set:
 *   opens BookingModal with optional pre-fill via
 *   data-yclients-service-id (YClients service ID) and
 *   data-yclients-staff-id (YClients staff ID).
 *
 * When NEXT_PUBLIC_YCLIENTS_COMPANY_ID is NOT set:
 *   falls back to WhatsApp using
 *   data-yclients-service (display name) and
 *   data-yclients-master (display name).
 */
export function BookingHandler() {
  const { openBooking } = useBooking();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-yclients-open]") as HTMLElement | null;
      if (!el) return;
      e.preventDefault();

      const serviceId = el.dataset["yclientsServiceId"] ?? undefined;
      const staffId = el.dataset["yclientsStaffId"] ?? undefined;
      const masterName = el.dataset["yclientsMaster"] ?? undefined;
      const serviceName = el.dataset["yclientsService"] ?? undefined;

      if (COMPANY_ID) {
        openBooking({ serviceId, staffId, masterName, serviceName });
      } else {
        window.open(
          buildWhatsAppUrl(masterName ?? null, serviceName ?? null),
          "_blank",
          "noopener,noreferrer",
        );
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openBooking]);

  return null;
}
