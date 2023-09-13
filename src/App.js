import './App.css';
import {
  generateLetter,
  generateWordLength,
  countDown,
} from './gameFunctions/gameFunctions';

import { useState, useEffect } from 'react';

function App() {
  const [timer, setTimer] = useState(60);
  // const res = [];
  // for (let i = 0; i < 100; i++) {
  //   const letter = generateWordLength();
  //   res.push(letter);
  // }
  // console.log(res.sort());

  // setTimer(countDown(timer));
  const countDown = (timer) => {
    console.log(timer);
    if (timer > 0) {
      setTimer(timer - 1);
    }
  };

  useEffect(() => {
    setTimeout(countDown, 1000);
  }, []);

  return <div className="App">{timer}</div>;
}

export default App;
