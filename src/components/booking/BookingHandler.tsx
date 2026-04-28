"use client";

import { useEffect } from "react";

// Pre-filled WhatsApp message for booking requests
const WA_URL =
  "https://wa.me/79179183877?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C+%D1%85%D0%BE%D1%87%D1%83+%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F+%D0%B2+BASE+Premier";

/**
 * Intercepts all [data-yclients-open] clicks site-wide.
 * When YClients company_id + form_id arrive (Q4), replace the body
 * of openBooking() with the actual widget trigger: yclients.openForm(...)
 */
function openBooking() {
  window.open(WA_URL, "_blank", "noopener,noreferrer");
}

export function BookingHandler() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("[data-yclients-open]")) return;
      e.preventDefault();
      openBooking();
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
