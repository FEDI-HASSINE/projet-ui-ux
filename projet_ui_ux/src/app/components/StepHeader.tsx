import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import type { BilingualText as BilingualTextValue } from '../utils/bilingual';
import { BilingualText } from './BilingualText';
import { ProgressBar } from './ProgressBar';

interface StepHeaderProps {
  step: number;
  totalSteps?: number;
  title: BilingualTextValue;
  subtitle?: BilingualTextValue;
  onBack?: () => void;
  backLabel?: BilingualTextValue;
  rightSlot?: ReactNode;
}

export function StepHeader({
  step,
  totalSteps = 6,
  title,
  subtitle,
  onBack,
  backLabel,
  rightSlot,
}: StepHeaderProps) {
  return (
    <div className="space-y-4">
      {(onBack || rightSlot) && (
        <div className="flex items-center justify-between">
          {onBack && backLabel ? (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-attt-secondary hover:text-attt-primary transition-colors text-xs font-semibold"
            >
              <ArrowLeft size={14} />
              <BilingualText text={backLabel} variant="inline" />
            </button>
          ) : (
            <span />
          )}
          {rightSlot}
        </div>
      )}

      <ProgressBar currentStep={step} totalSteps={totalSteps} />

      <div className="text-center space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-attt-text-secondary">
          Etape / Step {step} / {totalSteps}
        </p>
        <h1 className="text-xl font-semibold text-attt-text-primary">
          <BilingualText text={title} />
        </h1>
        {subtitle && (
          <p className="text-sm text-attt-text-secondary">
            <BilingualText text={subtitle} />
          </p>
        )}
      </div>
    </div>
  );
}
