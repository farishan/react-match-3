import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    score: 0,
    moves: 20
  },
  reducers: {
    increment: (state) => {
      state.score++
    },
    decrement: (state) => {
      state.moves--
    }
  },
})

export const {
  increment,
  decrement
} = scoreSlice.actions

export default scoreSlice.reducer