import type { BilingualText } from './bilingual';

export const formatDateBilingual = (date: Date): BilingualText => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return {
    fr: new Intl.DateTimeFormat('fr-FR', options).format(date),
    en: new Intl.DateTimeFormat('en-GB', options).format(date),
  };
};

export const formatMonthYear = (date: Date, locale: 'fr-FR' | 'en-GB') =>
  new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);
