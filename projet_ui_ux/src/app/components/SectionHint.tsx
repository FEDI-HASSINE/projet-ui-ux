interface SectionHintProps {
  text: string;
}

export function SectionHint({ text }: SectionHintProps) {
  return (
    <div className="rounded-2xl border border-attt-border-light bg-attt-surface px-4 py-3 text-xs text-attt-text-secondary">
      {text}
    </div>
  );
}
