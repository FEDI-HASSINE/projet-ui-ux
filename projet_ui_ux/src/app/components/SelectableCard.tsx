import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface SelectableCardProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  selected: boolean;
  onClick: () => void;
  badge?: {
    text: string;
    color: 'high' | 'medium' | 'low';
  };
}

export function SelectableCard({ title, description, selected, onClick, badge }: SelectableCardProps) {
  const badgeColors = {
    high: 'text-attt-success bg-[#E8F5EE]',
    medium: 'text-attt-accent bg-[#FFF4E6]',
    low: 'text-attt-error bg-[#FDEAEA]',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full text-left p-4 rounded-2xl border transition-all ${
        selected
          ? 'border-attt-primary bg-attt-selected-bg shadow-[0_8px_20px_rgba(26,74,138,0.12)]'
          : 'border-attt-border-light bg-white hover:border-attt-secondary'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1">
          <div className="text-attt-text-primary text-sm font-semibold">
            {title}
          </div>
          {description && (
            <div className="text-attt-text-secondary text-xs">
              {description}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {badge && (
            <div
              className={`px-2 py-1 rounded-full text-[10px] font-semibold ${badgeColors[badge.color]}`}
            >
              {badge.text}
            </div>
          )}
          {selected && (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-attt-primary text-white">
              <Check size={14} strokeWidth={3} />
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
