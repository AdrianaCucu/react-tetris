import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newStage =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []); // We give it an empty array to start with.

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

      // Then check if we collided.
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player, resetPlayer]); // This is the dependency.

  return [stage, setStage, rowsCleared];
};
