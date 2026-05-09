import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = 6 }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1;
        const isDone = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-semibold transition-all ${
                isDone
                  ? 'bg-attt-success text-white'
                  : isActive
                  ? 'bg-attt-primary text-white shadow-[0_0_0_4px_rgba(26,74,138,0.15)]'
                  : 'bg-attt-border-light text-attt-text-secondary'
              }`}
            >
              {isDone ? <Check size={14} strokeWidth={3} /> : stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`w-6 h-[2px] ${
                  stepNumber < currentStep ? 'bg-attt-success' : 'bg-attt-border-light'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
