import type { ReactNode } from 'react';

interface PrimaryCardProps {
  children: ReactNode;
  className?: string;
}

export function PrimaryCard({ children, className = '' }: PrimaryCardProps) {
  return (
    <div className={`rounded-3xl border border-white/70 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.15)] ${className}`}>
      {children}
    </div>
  );
}
