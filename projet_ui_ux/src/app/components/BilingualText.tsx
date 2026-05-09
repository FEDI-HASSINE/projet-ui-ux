import type { BilingualText as BilingualTextValue } from '../utils/bilingual';

interface BilingualTextProps {
  text: BilingualTextValue;
  variant?: 'stacked' | 'inline';
  className?: string;
  secondaryClassName?: string;
}

export function BilingualText({
  text,
  variant = 'stacked',
  className = '',
  secondaryClassName = '',
}: BilingualTextProps) {
  if (variant === 'inline') {
    return <span className={className}>{text.fr} / {text.en}</span>;
  }

  return (
    <span className={className}>
      <span className="block">{text.fr}</span>
      <span className={`block text-xs text-attt-text-secondary ${secondaryClassName}`}>
        {text.en}
      </span>
    </span>
  );
}
