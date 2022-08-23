import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const nftTrans = createSlice({
  name: 'nftTrans',
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
} = nftTrans.actions

export default nftTrans.reducer
