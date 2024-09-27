// redux toolkit imports
import { createSlice } from '@reduxjs/toolkit'

// utils imports
import { userAllocations, setUserAllocations } from '@utils/allocations'

export const allocationsSlice = createSlice({
  name: 'allocations',
  initialState: {
    data: [],
  },
  reducers: {
    setAllocations: state => {
      state.data = userAllocations()
    },
    createAllocation: (state, action) => {
      const { name, amount, budget } = action.payload
      const id = crypto.randomUUID()
      const time = Date.now()
      const allocation = +amount
      const latestAllocation = {
        id,
        time,
        name,
        amount: allocation,
        budget,
      }
      state.data.push(latestAllocation)
      setUserAllocations(state.data)
      action.payload = latestAllocation
    }
  },
})

export const {
  setAllocations,
  createAllocation,
} = allocationsSlice.actions

export default allocationsSlice.reducer
