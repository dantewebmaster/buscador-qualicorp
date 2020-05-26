export const formatMoney = (value, currency = 'BRL', locale = 'pt-BR') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value);
