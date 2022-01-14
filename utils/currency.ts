export const parseCurrency = (value: number): string => {
  return value.toLocaleString('es-UY', {
    style: 'currency',
    currency: 'UYU',
  });
};
