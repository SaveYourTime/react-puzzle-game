import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Puzzle from './Puzzle';
import { Motion, spring } from 'react-motion';

class PuzzleWrapper extends Component {
  constructor(props) {
    super(props);
    const { rows, cols } = props;
    this.state = {
      max: rows * cols - 1,
    }
  }

  renderPuzzles = () => {
    const { numbers, puzzleWrapperWidth } = this.props;
    const puzzles = numbers.map((number, index) => {
      const puzzleWidth = puzzleWrapperWidth / 3;
      const visualPos = this.getVisualPosition(this.getMatrixPosition(index), puzzleWidth, puzzleWidth);
      const motionStyle = {
        translateX: spring(visualPos.x),
        translateY: spring(visualPos.y)
      };
      let puzzle = (
        <Motion key={number} style={motionStyle}>
          {({ translateX, translateY }) => (
            <Puzzle
              key={number}
              style={{
                display: number === 9 ? 'none' : null,
                transform: `translate(${translateX}px, ${translateY}px)`
              }}
              number={number}
              index={index}
              handlePuzzleClick={this.handlePuzzleClick}
            />
          )}
        </Motion>
      );
      return puzzle;
    });
    return puzzles;
  }

  handlePuzzleClick = (puzzleIndex) => {
    const { rows, cols, numbers, handlePuzzleClick, player, steps } = this.props;
    const holeIndex = numbers.indexOf(rows * cols);
    if (this.canSwap(puzzleIndex, holeIndex)) {
      const newNumbers = this.swap(numbers, puzzleIndex, holeIndex);
      handlePuzzleClick(newNumbers);
      const solved = this.isSolved(newNumbers);
      if (solved) {
        this.handleStorePlayerScore();
        this.props.history.push({ pathname: '/win', state: { player, steps: steps + 1 } });
      }
    }
  }

  canSwap = (src, dest) => {
    const { row: srcRow, col: srcCol } = this.getMatrixPosition(src);
    const { row: destRow, col: destCol } = this.getMatrixPosition(dest);
    return (Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1);
  }

  swap = (numbers, src, dest) => {
    [numbers[src], numbers[dest]] = [numbers[dest], numbers[src]];
    return numbers;
  }

  getMatrixPosition = (index) => {
    const { cols } = this.props;
    return {
      row: Math.floor(index / cols),
      col: index % cols
    }
  }

  getVisualPosition = ({ row, col }, width, height) => {
    return {
      x: col * width,
      y: row * height
    }
  }

  isSolved = (numbers) => {
    return numbers.every((number, index) => number === index + 1);
  }

  handleStorePlayerScore = () => {
    const { player, steps } = this.props;
    const rank = JSON.parse(window.localStorage.getItem('ranks')) || [];
    rank.push({ player, steps: steps + 1 });
    window.localStorage.setItem('ranks', JSON.stringify(rank));
  }

  render() {
    return (
      <ul className="puzzle-wrapper">
        {this.renderPuzzles()}
      </ul>
    );
  }
}

export default withRouter(PuzzleWrapper);