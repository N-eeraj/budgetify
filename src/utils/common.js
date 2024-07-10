export const amountValidation = value => {
  let amount = +value
  if (isNaN(amount))
    throw { amount: 'Amount should be a number' }
  if (amount <= 0)
    throw { amount: 'Amount should be greater than 0' }
  return amount
}