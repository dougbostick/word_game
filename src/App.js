import './App.css';
import {
  generateLetter,
  generateWordLength,
} from './gameFunctions/gameFunctions';

import { useState, useEffect } from 'react';

function App() {
  const [timer, setTimer] = useState(60);
  const [gameStatus, setGameStatus] = useState(true);
  const [wordLength, setWordLength] = useState(0);
  const [firstLetter, setFirstLetter] = useState('');
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState([]);

  const countdown = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      setGameStatus(false);
    }
  };

  const handleGuess = (guessInput) => {
    guessInput.preventDefault();

    setGuessList([...guessList, guess]);
  };

  useEffect(() => {
    setTimeout(countdown, 1000);
  });

  useEffect(() => {
    setFirstLetter(generateLetter());
    setWordLength(generateWordLength());
  }, []);

  return (
    <div className="App">
      <div>{timer}</div>
      {/* <button onClick={() => handleClick()}>timer</button> */}
      <div>{gameStatus ? 'GAME ON' : 'GAME OVER'}</div>
      <div>{firstLetter}</div>
      <div>{wordLength}</div>
      <form onSubmit={handleGuess}>
        <input onChange={(e) => setGuess(e.value)}></input>
      </form>
    </div>
  );
}

export default App;
