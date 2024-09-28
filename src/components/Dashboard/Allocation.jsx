// utils imports
import { formatAmount, formatDate } from '@utils/formatter'

export default function Allocation({ name, time: timeStamp, amount }) {
  const { date, time} = formatDate(timeStamp)

  return (
    <div>
      {name}
      {formatAmount(amount)}
      { date }, { time }
    </div>
  )
}
