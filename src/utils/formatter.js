export const formatAmount = amount => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR' }).format(amount)

export const formatDate = timeStamp => {
  const dateTime = new Date(timeStamp)
  const date = dateTime.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
  const time = dateTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()
  return { date, time }
}
