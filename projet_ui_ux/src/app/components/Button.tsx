import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = true,
}: ButtonProps) {
  const baseStyles =
    'rounded-xl px-5 py-3 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 text-sm';

  const variantStyles =
    variant === 'primary'
      ? 'bg-attt-primary text-white shadow-[0_10px_20px_rgba(26,74,138,0.2)] hover:bg-[#153a6f] hover:shadow-[0_14px_24px_rgba(26,74,138,0.25)] active:bg-[#0f2d56]'
      : 'bg-white/80 text-attt-primary border border-attt-primary hover:bg-attt-selected-bg';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${fullWidth ? 'w-full' : ''} ${baseStyles} ${variantStyles} ${className}`}
      style={{ fontFamily: 'var(--font-jakarta)' }}
    >
      {children}
    </button>
  );
}
