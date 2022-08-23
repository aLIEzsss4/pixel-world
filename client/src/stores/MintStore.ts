import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const mintCom = createSlice({
  name: 'mintCom',
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
} = mintCom.actions

export default mintCom.reducer
