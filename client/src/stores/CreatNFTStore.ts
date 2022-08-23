import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const creatNft = createSlice({
  name: 'creatNft',
  initialState: {
    open: false,
  },
  reducers: {
    openCreatNft: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
  }
})

export const {
  openCreatNft,
} = creatNft.actions

export default creatNft.reducer
