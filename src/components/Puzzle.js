import React from 'react';

function Puzzle(props) {
  const { style, number, index, handlePuzzleClick } = props;
  return (
    <li className="puzzle" style={style} onClick={() => handlePuzzleClick(index)}>
      <span className="content">{number}</span>
    </li>
  );
}

export default Puzzle;