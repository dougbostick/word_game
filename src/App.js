import './App.css';
import { generateLetter, generateWordLength } from './gameFunctions';
import Timer from './features/Timer/Timer';

import Game from './features/Game/Game';

import { useState, useEffect } from 'react';

function App() {
  // const [timer, setTimer] = useState(60);
  const [gameStatus, setGameStatus] = useState(true);
  const [wordLength, setWordLength] = useState(0);
  const [firstLetter, setFirstLetter] = useState('');
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState([]);

  const handleGuess = (guessInput) => {
    guessInput.preventDefault();
    setGuessList([...guessList, guess]);
  };

  useEffect(() => {
    setFirstLetter(generateLetter());
    setWordLength(generateWordLength());
  }, []);

  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
