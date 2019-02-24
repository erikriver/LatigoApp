
export const formatNumber = (globalize, number, currency = 'MXN') => {
    const currencyFormatter = globalize.getCurrencyFormatter(currency, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    return currencyFormatter(number ? number : 0);
}