"use client";

import { createContext, useCallback, useContext, useState } from "react";

export interface BookingParams {
  serviceId?: string;
  staffId?: string;
  masterName?: string;
  serviceName?: string;
}

interface BookingContextValue {
  isOpen: boolean;
  params: BookingParams;
  openBooking: (params?: BookingParams) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<BookingParams>({});

  const openBooking = useCallback((p: BookingParams = {}) => {
    setParams(p);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, params, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
