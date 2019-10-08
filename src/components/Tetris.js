import React, { useState } from 'react';

// Helpers:
import { createStage, checkCollision } from '../gameHelpers';

// Styled components:
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';

// Custom hooks:
import { useInterval } from '../hooks/useInterval';
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

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  // Moves the player left and right.
  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  // Reset everything
  const startGame = () => {
    setStage(createStage());
    setDropTime(800); // 0.8 seconds
    resetPlayer();
    setGameOver(false);
  };

  // Moves the player down.
  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    }

    // If player collided at the bottom.
    else {
      if (player.pos.y < 1) {
        console.log('GAME OVER');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log('interval on');
        setDropTime(800);
      }
    }
  };

  const dropPlayer = () => {
    console.log('interval off');
    setDropTime(null);
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

      // Code for up arrow.
      // Rotates the tetromino clockwise.
      else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div>
      {/* Need onKeyDown listener here to avoid having to click on the game
        container every time we want to make a move. */}
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={e => move(e)}
        onKeyUp={keyUp}
      >
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
            <StartButton callback={startGame} />
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
    </div>
  );
};

export default Tetris;
