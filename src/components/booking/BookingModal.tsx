"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { useBooking } from "@/components/booking/BookingContext";
import { trackGoal } from "@/lib/analytics";

const COMPANY_ID = process.env.NEXT_PUBLIC_YCLIENTS_COMPANY_ID;

const YCLIENTS_ORIGINS = [
  "https://yclients.com",
  "https://w.yclients.com",
  "https://n.yclients.com",
];

function buildWidgetUrl(serviceId?: string, staffId?: string): string {
  const base = `https://w.yclients.com/${COMPANY_ID}`;
  const params = new URLSearchParams();
  if (serviceId) params.set("o-s", serviceId);
  if (staffId) params.set("o-m", staffId);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export function BookingModal() {
  const { isOpen, params, closeBooking } = useBooking();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Move focus into dialog
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeBooking();
    },
    [isOpen, closeBooking],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Track booking_complete from YClients iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!YCLIENTS_ORIGINS.includes(e.origin)) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((e.data as any)?.type === "booking_complete") {
        trackGoal("BOOKING_COMPLETE");
        setTimeout(closeBooking, 2000);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [closeBooking]);

  if (!mounted || !COMPANY_ID) return null;

  const widgetUrl = buildWidgetUrl(params.serviceId, params.staffId);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="booking-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-[9900] bg-bg-primary/80 backdrop-blur-md"
            onClick={closeBooking}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="booking-panel"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Запись в BASE Premier"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-x-4 bottom-4 top-4 z-[9910] flex flex-col overflow-hidden border border-border-default bg-bg-secondary md:inset-x-auto md:left-1/2 md:top-1/2 md:h-[82vh] md:w-[600px] md:-translate-x-1/2 md:-translate-y-1/2"
          >
            {/* Header */}
            <header className="flex flex-shrink-0 items-center justify-between border-b border-border-default px-6 py-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
                  Запись · BASE Premier
                </p>
                {params.serviceName && (
                  <p className="mt-0.5 text-sm text-fg-primary">{params.serviceName}</p>
                )}
                {params.masterName && !params.serviceName && (
                  <p className="mt-0.5 text-sm text-fg-primary">к мастеру {params.masterName}</p>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeBooking}
                className="flex h-9 w-9 items-center justify-center text-fg-muted transition-colors hover:text-fg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fg-primary"
                aria-label="Закрыть"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            {/* Widget iframe */}
            <iframe
              src={widgetUrl}
              title="Запись в BASE Premier"
              className="h-full w-full flex-1 border-0"
              allow="payment"
              sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation-by-user-activation"
            />

            {/* Footer */}
            <footer className="flex flex-shrink-0 items-center justify-center border-t border-border-default px-6 py-3">
              <p className="font-mono text-xs text-fg-muted">
                или позвоните{" "}
                <a
                  href="tel:+79179183877"
                  className="text-fg-primary underline-offset-4 hover:underline"
                >
                  +7 917 918-38-77
                </a>
              </p>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
