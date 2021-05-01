import React from 'react';
import { useSelector } from 'react-redux';

const Score = () => {
  const { score, moves } = useSelector(state => state.score)

  return <>
    <p>Score(s): {score}</p>
    <p>Click(s): {moves}</p>
  </>
}

export default Score