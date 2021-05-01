import { configureStore } from '@reduxjs/toolkit'
import tileReducer from './features/tile/tileSlice'
import scoreReducer from './features/score/scoreSlice'

export default configureStore({
  reducer: {
    tile: tileReducer,
    score: scoreReducer
  },
})