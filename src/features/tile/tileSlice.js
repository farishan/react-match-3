import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const setTiles = createAsyncThunk(
  'tile/setTiles',
  async (options) => {
    return options
  }
)

export const tileSlice = createSlice({
  name: 'tile',
  initialState: {
    tiles: [],
    activeTiles: []
  },
  reducers: {
    generateTiles: (state, action) => {
      const {x, y} = action.payload
      let tiles = []

      for (let index = 0; index < y; index++) {
        let xTiles = []

        for (let yIndex = 0; yIndex < x; yIndex++) {
          xTiles.push(Math.ceil(Math.random()*5))
        }

        tiles.push(xTiles)
      }

      state.tiles = tiles
    },
    setActiveTiles: (state, action) => {
      state.activeTiles = action.payload
    },
    selectTile: (state, action) => {
      const { id } = action.payload
      const isActive = state.activeTiles.includes(id)

      // console.log('select tile:', id, isActive)
    }
  },
  extraReducers: {
    [setTiles.fullfiled]: (state, action) => {
      state.tiles = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  generateTiles,
  setActiveTiles,
  selectTile,
} = tileSlice.actions

export default tileSlice.reducer