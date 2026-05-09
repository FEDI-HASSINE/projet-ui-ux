import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface BookingData {
  serviceId: string;
  centerId: string;
  date: string;
  time: string;
  fullName: string;
  cin: string;
  phone: string;
  vehicleInfo: string;
  bookingNumber: string;
}

interface BookingContextType {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  resetBooking: () => void;
}

const initialBookingData: BookingData = {
  serviceId: '',
  centerId: '',
  date: '',
  time: '',
  fullName: '',
  cin: '',
  phone: '',
  vehicleInfo: '',
  bookingNumber: '',
};

const storageKey = 'attt-booking-v1';

const loadBookingData = (): BookingData => {
  if (typeof window === 'undefined') {
    return initialBookingData;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return initialBookingData;
    }
    return { ...initialBookingData, ...JSON.parse(stored) };
  } catch {
    return initialBookingData;
  }
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>(() => loadBookingData());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify(bookingData));
  }, [bookingData]);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => {
      const keys = Object.keys(data);
      const shouldClearBooking = prev.bookingNumber && keys.some((key) => key !== 'bookingNumber');

      return {
        ...prev,
        ...data,
        bookingNumber: shouldClearBooking ? '' : data.bookingNumber ?? prev.bookingNumber,
      };
    });
  };

  const resetBooking = () => {
    setBookingData(initialBookingData);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey);
    }
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBookingData, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}
