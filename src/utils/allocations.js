// utils imports
import { getStorage, setStorage } from '@utils/localStorage'

const userId = () => getStorage('user')?.id
const allAllocations = getStorage('allocations', {})

export const userAllocations = () => getStorage('allocations', {})[userId()] ?? []

export const setUserAllocations = allocationList => {
  const allocations = allAllocations
  allocations[userId()] = JSON.parse(JSON.stringify(allocationList))
  Object.entries(allocations).forEach(([key, value]) => {
    if (!value.length)
      delete allocations[key]
  })
  setStorage('allocations', allocations)
}
