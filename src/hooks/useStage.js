import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = prevStage => {
      // First flush the stage:
      const newStage = prevStage.map(row =>
        // cell[1] is 'clear' in the beginning
        // can be 'clear' or 'merged'
        // If 'clear', return empty cell.
        // Otherwise, return the cell as it is.
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the tetromino:
      // We have the teromino in the player.
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value, //Value of the tetromino.
              `${player.collided ? 'merged' : 'clear'}`
            ];
          }
        });
      });

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

  return [stage, setStage];
};
