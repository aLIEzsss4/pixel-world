import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const NFTBalance = createSlice({
  name: 'NFTBalance',
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
} = NFTBalance.actions

export default NFTBalance.reducer
