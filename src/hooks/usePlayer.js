import { useState, useCallback } from 'react';

import { randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';

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

  // Updated player position.
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...ProgressEvent,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    }));
  };

  // Need useCallback to avoid being stuck in an infinite loop.
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
