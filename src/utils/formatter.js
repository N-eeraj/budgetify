export const formatAmount = amount => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR' }).format(amount)
