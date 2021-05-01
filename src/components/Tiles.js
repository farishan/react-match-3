import React, { useEffect, useState } from 'react'
import Tile from './Tile'
import {
  canSwap,
  swapTiles,
  checkTiles,
  replaceTile
} from '../helpers'
import { useDispatch, useSelector } from 'react-redux'
import {
  generateTiles,
  setTiles,
  setActiveTiles,
  selectTile,
} from "../features/tile/tileSlice";
import { X_TILES, Y_TILES } from '../config'
import { decrement, increment } from '../features/score/scoreSlice';

const Tiles = () => {
  const dispatch = useDispatch()
  const {
    tiles,
    activeTiles
  } = useSelector(state => state.tile)
  const { score, moves } = useSelector(state => state.score)
  const [tilesLocal, setTilesLocal] = useState([])

  useEffect(() => {
    dispatch(generateTiles({x: X_TILES, y: Y_TILES}))
  }, [])

  useEffect(() => {
    setTilesLocal(tiles)
  }, [tiles])

  const handleClick = (rowIndex, colIndex) => {
    if(moves === 0){
      alert(`Game over. Your score: ${score}`)
      window.location.reload()
    } else {
      dispatch(decrement())

      const id = `${rowIndex}_${colIndex}`
      dispatch(selectTile(id))

      const isActive = activeTiles.includes(id)
      let newActiveTiles

      if(isActive === false){
        if(activeTiles.length === 2){
          newActiveTiles = [id]
        }
        else if(activeTiles.length === 1){
          // Swapping tiles
          const source = activeTiles[0]
          const target = id

          if(canSwap(source, target)){
            const newTiles = swapTiles(source, target, tilesLocal)

            dispatch(setTiles(newTiles)).then((res) => {
              setTilesLocal(res.payload)
              dispatch(setActiveTiles([]))
              const result = checkTiles(source, target, tilesLocal)

              if(result !== false){
                dispatch(increment())
                dispatch(generateTiles({x: X_TILES, y: Y_TILES}))
              }

              if(result === 'match_horizontal'){
                // Test replace tile
                const newTile = {
                  key: '1_1',
                  value: 'X'
                }
                replaceTile(newTile, tilesLocal, (newTiles) => dispatch(setTiles(newTiles)))
              }
            })
          }
        } else {
          // Selecting tile
          newActiveTiles = [...activeTiles, id]
          dispatch(setActiveTiles(newActiveTiles))
        }
      }
    }
  }

  return <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {
        tilesLocal.map((row, rowIndex) => (
          <div style={{display: 'flex'}} key={rowIndex}>
            {
              row.map((col, colIndex) => (
                <Tile
                  key={`${rowIndex}_${colIndex}`}
                  title={`${rowIndex}_${colIndex}`}
                  value={col}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  isActive={activeTiles.includes(`${rowIndex}_${colIndex}`)}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  </>
}

export default Tiles