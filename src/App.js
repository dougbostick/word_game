import './App.css';
import {
  generateLetter,
  generateWordLength,
  countDown,
} from './gameFunctions/gameFunctions';

import { useState, useEffect } from 'react';

function App() {
  const [timer, setTimer] = useState(60);
  const [gameStatus, setGameStatus] = useState(true);
  // const res = [];
  // for (let i = 0; i < 100; i++) {
  //   const letter = generateWordLength();
  //   res.push(letter);
  // }
  // console.log(res.sort());

  // setTimer(countDown(timer));
  // const countDown = (timer) => {
  //   console.log('running');
  //   while (timer > 0) {
  //     setTimer(timer - 1);
  //   }
  // };
  const handleClick = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      setGameStatus(false);
    }
  };

  useEffect(() => {
    setTimeout(handleClick, 1000);
  });

  return (
    <div className="App">
      <div>{timer}</div>
      {/* <button onClick={() => handleClick()}>timer</button> */}
      <div>{gameStatus ? 'GAME ON' : 'GAME OVER'}</div>
    </div>
  );
}

export default App;
