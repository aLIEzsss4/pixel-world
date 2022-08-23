import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const balance = createSlice({
  name: 'balance',
  initialState: {
    open: false,
  },
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
  }
})

export const {
  setOpen,
} = balance.actions

export default balance.reducer
