import { RouterProvider } from 'react-router';
import { router } from './routes';
import { BookingProvider } from './context/BookingContext';
import { PrimaryCard } from './components/PrimaryCard';

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-attt-surface text-attt-text-primary relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,74,138,0.16),transparent_55%),radial-gradient(circle_at_bottom,_rgba(212,132,26,0.18),transparent_50%)]" />
        <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-attt-secondary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-12 h-72 w-72 rounded-full bg-attt-accent/15 blur-3xl" />

        <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
          <PrimaryCard className="w-full max-w-[420px] overflow-hidden">
            <RouterProvider router={router} />
          </PrimaryCard>
        </div>
      </div>
    </BookingProvider>
  );
}