import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import PuzzleWrapper from './PuzzleWrapper';
import '../css/puzzle.css';

class PuzzleGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: window.localStorage.getItem('player'),
      steps: 0,
      rows: 3,
      cols: 3,
      numbers: [],
      puzzleWrapperWidth: 480
    }
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    if (this.containerRef.current) this.handlePuzzleWidth();
    this.setState({ numbers: this.randomNumbers() });
    window.addEventListener('resize', this.handlePuzzleWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handlePuzzleWidth);
  }

  handlePuzzleWidth = () => {
    let puzzleWrapperWidth = this.containerRef.current.getBoundingClientRect().width;
    if (puzzleWrapperWidth < 520) {
      this.setState({ puzzleWrapperWidth: puzzleWrapperWidth - 20 });
    }
  }

  randomNumbers = () => {
    const { rows, cols } = this.state;
    const max = rows * cols - 1;
    let numbers = new Set();
    while (numbers.size < max) {
      const number = Math.floor((Math.random() * max) + 1);
      numbers.add(number);
    }
    numbers = [...numbers, max + 1];
    return numbers;
  }

  handlePuzzleClick = (numbers) => {
    this.setState({ numbers });
    this.increaseStep();
  }

  increaseStep = () => {
    this.setState(({ steps }) => ({ steps: steps + 1 }));
  }

  render() {
    const { player, steps, numbers, puzzleWrapperWidth } = this.state;
    if (!player) {
      return (
        <Redirect to='/welcome' />
      );
    }
    return (
      <div className="puzzle-game wrapper" ref={this.containerRef}>
        <h2 className="title">Player: {player}</h2>
        <h4 className="title steps">Steps: {steps}</h4>
        <PuzzleWrapper
          rows={3}
          cols={3}
          numbers={numbers}
          handlePuzzleClick={this.handlePuzzleClick}
          handleSolved={this.handleSolved}
          player={player}
          steps={steps}
          puzzleWrapperWidth={puzzleWrapperWidth}
        />
      </div>
    );
  }
}

export default PuzzleGame;