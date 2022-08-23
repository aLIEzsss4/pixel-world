import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const fishingCom = createSlice({
  name: 'fishingCom',
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
} = fishingCom.actions

export default fishingCom.reducer
