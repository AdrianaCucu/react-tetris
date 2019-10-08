import React, { useState } from 'react';

// Helpers:
import { createStage } from '../gameHelpers';

// Styled components:
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

// Custom hooks:
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components:
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  // False because it's not game over when we start.
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('re-render');

  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 });
  };

  // Reset everything
  const startGame = () => {
    setStage(createStage());
    resetPlayer();
  };

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    drop();
  };

  // Callback function when we press the keys on the keyboard.
  const move = ({ keyCode }) => {
    if (!gameOver) {
      // Code for left arrow.
      if (keyCode === 37) {
        movePlayer(-1);
      }

      // Code for right arrow.
      else if (keyCode === 39) {
        movePlayer(1);
      }

      // Code for down arrow.
      else if (keyCode === 40) {
        dropPlayer();
      }
    }
  };

  return (
    <div>
      {/* Need onKeyDown listener here to avoid having to click on the game
        container every time we want to make a move. */}
      <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
        <StyledTetris>
          <Stage stage={stage} />
          <aside>
            {gameOver ? (
              <Display gameOver={gameOver} text="Game Over" />
            ) : (
              <div>
                <Display text="SCORE" />
                <Display text="ROWS" />
                <Display text="LEVEL" />
              </div>
            )}
            <StartButton onClick={startGame} />
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
    </div>
  );
};

export default Tetris;
