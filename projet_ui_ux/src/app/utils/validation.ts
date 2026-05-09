export const isRequired = (value: string) => value.trim().length > 0;

export const isValidCIN = (value: string) => /^\d{8}$/.test(value.trim());

export const isValidPhone = (value: string) => {
  const normalized = value.replace(/\s+/g, '');
  return /^(\+216)?\d{8}$/.test(normalized);
};
