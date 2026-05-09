export interface BilingualText {
  fr: string;
  en: string;
}

export const bilingual = (fr: string, en: string): BilingualText => ({ fr, en });

export const inlineBilingual = (text: BilingualText) => `${text.fr} / ${text.en}`;
