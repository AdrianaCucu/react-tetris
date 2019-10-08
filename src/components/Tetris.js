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

  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('re-render');

  const movePlayer = dir => {

  }

  const startGame = () => {

  }

  const drop = () => {

  }

  const dropPlayer = () => {

  }

  // Callback function when we press the keys on the keyboard.
  const move = ({keyCode}) => {

  }

  return (
    <div>
      <StyledTetrisWrapper>
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
            <StartButton />
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
    </div>
  );
};

export default Tetris;
