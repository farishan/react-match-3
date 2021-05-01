import { X_TILES, Y_TILES } from "./config"

export function swapTiles(source, target, tiles){
  const row1 = source.split('_')[0]
  const col1 = source.split('_')[1]
  const row2 = target.split('_')[0]
  const col2 = target.split('_')[1]

  let clonedTiles = JSON.parse(JSON.stringify(tiles))
  const tile1 = clonedTiles[row1][col1]
  const tile2 = clonedTiles[row2][col2]

  const temp = tile1
  clonedTiles[row1][col1] = tile2
  clonedTiles[row2][col2] = temp

  return clonedTiles
}

export function canSwap(source, target){
  const targetRow = parseInt(target.split('_')[0])
  const targetCol = parseInt(target.split('_')[1])
  const sourceRow = parseInt(source.split('_')[0])
  const sourceCol = parseInt(source.split('_')[1])

  const isRight = targetCol-sourceCol === 1 && targetRow === sourceRow
  const isLeft = sourceCol-targetCol === 1 && targetRow === sourceRow
  const isDown = targetRow-sourceRow === 1 && targetCol === sourceCol
  const isTop = sourceRow-targetRow === 1 && targetCol === sourceCol

  const horizontallyValid = (isRight || isLeft) && (!isTop && !isDown)
  const verticallyValid = (isTop || isDown) && (!isRight && !isLeft)

  return horizontallyValid || verticallyValid
}

export function replaceTile({key, value}, tiles, callback){
  const newTiles = [...tiles]
  const row = parseInt(key.split('_')[0])
  const col = parseInt(key.split('_')[1])
  newTiles[row][col] = value
  callback(newTiles)
}

export function checkTiles(source, target, tiles){
  const row = parseInt(target.split('_')[0])
  const col = parseInt(target.split('_')[1])
  const sourceRow = parseInt(source.split('_')[0])
  const sourceCol = parseInt(source.split('_')[1])

  const possibleRight = col < X_TILES-1
  const possibleRightDouble = col < X_TILES-2
  const possibleLeft = col > 0
  const possibleLeftDouble = col > 1
  const possibleTop = row > 0
  const possibleTopDouble = row > 1
  const possibleBottom = row < Y_TILES-1
  const possibleBottomDouble = row < Y_TILES-2

  const targetValue = tiles[sourceRow][sourceCol]

  if(possibleRight && possibleLeft){
    const targetRightValue = tiles[row][col+1]
    const targetLeftValue = tiles[row][col-1]

    if(
      targetValue === targetRightValue
      && targetValue === targetLeftValue
    ){
      console.log('horizontal-center match!')

      return 'match_horizontal_center'
    }
  }

  if(possibleRight && possibleRightDouble){
    const targetRightValue = tiles[row][col+1]
    const targetRightRightValue = tiles[row][col+2]

    if(
      targetValue === targetRightValue
      && targetValue === targetRightRightValue
    ){
      console.log('horizontal-right match!')

      return 'match_horizontal_right'
    }
  }

  if(possibleLeft && possibleLeftDouble){
    const targetLeftValue = tiles[row][col-1]
    const targetLeftLeftValue = tiles[row][col-2]

    if(
      targetValue === targetLeftValue
      && targetValue === targetLeftLeftValue
    ){
      console.log('horizontal-left match!')

      return 'match_horizontal_left'
    }
  }

  if(possibleTop && possibleBottom){
    const targetTopValue = tiles[row-1][col]
    const targetBottomValue = tiles[row+1][col]
    console.log({targetValue, targetTopValue, targetBottomValue})
    if(
      targetValue === targetTopValue
      && targetValue === targetBottomValue
    ){
      console.log('vertical-center match!')

      return 'match_vertical_center'
    }
  }

  if(possibleTop && possibleTopDouble){
    const targetTopValue = tiles[row-1][col]
    const targetTopTopValue = tiles[row-2][col]
    if(
      targetValue === targetTopValue
      && targetValue === targetTopTopValue
    ){
      console.log('vertical-top match!')

      return 'match_vertical_top'
    }
  }

  if(possibleBottom && possibleBottomDouble){
    const targetBottomValue = tiles[row+1][col]
    const targetBottomBottomValue = tiles[row+2][col]
    if(
      targetValue === targetBottomValue
      && targetValue === targetBottomBottomValue
    ){
      console.log('vertical-bottom match!')

      return 'match_vertical_bottom'
    }
  }

  return false
}