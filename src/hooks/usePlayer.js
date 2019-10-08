import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
  /* useState() returns an array containing the player state.
     First element is player.
     Second element is setPlayer.
     This is a shorthand for doing everything in one line. */
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });

  const rotate = (matrix, dir) => {
    // Turn the rows into columns (transpose).
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );

    // Reverse each row to get a rotated matrix (tetromino).
    if (dir > 0) {
      return rotatedTetro.map(row => row.reverse());
    }

    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    // Deep copy of player.
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;

    // If when we rotate tetromino it collides with something, we shift it left or right.
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  // Updated player position.
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
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

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
