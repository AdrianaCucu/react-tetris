import React from 'react';

import { createStage } from '../gameHelpers';
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  return (
    <div>
      <StyledTetrisWrapper>
        <StyledTetris>
          <Stage stage={createStage()} />
          <aside>
            <div>
              <Display text="SCORE" />
              <Display text="ROWS" />
              <Display text="LEVEL" />
            </div>

            <StartButton />
          </aside>
        </StyledTetris>
      </StyledTetrisWrapper>
    </div>
  );
};

export default Tetris;
