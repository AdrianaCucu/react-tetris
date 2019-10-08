import { useState } from 'react';

import { randomTetromino } from '../tetrominos';

export const usePlayer = () => {
  /* useState() returns an array containing the player state.
     First element is player.
     Second element is setPlayer.
     This is a shorthand for doing everything in one line. */
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: randomTetromino().shape,
    collided: false
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...ProgressEvent,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    }));
  };
  return [player];
};
