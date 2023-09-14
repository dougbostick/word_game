import '../../App.css';
import { useSelector } from 'react-redux';
import { generateLetter, generateWordLength } from '../../gameFunctions';
// import { Timer } from './features/Timer/Timer';
import { useState, useEffect } from 'react';
import { getTimer } from '../Timer/timerSlice';

function Game() {
  // const [timer, setTimer] = useState(60);
  const [gameStatus, setGameStatus] = useState(true);
  const [wordLength, setWordLength] = useState(0);
  const [firstLetter, setFirstLetter] = useState('');
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState([]);
  const timer = useSelector(getTimer);

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
      <div>{timer}</div>
      {/* <button onClick={() => handleClick()}>timer</button> */}
      <div>{gameStatus ? 'GAME ON' : 'GAME OVER'}</div>
      <div>{firstLetter}</div>
      <div>{wordLength}</div>
      <form onSubmit={handleGuess}>
        <input onChange={(e) => setGuess(e.value)}></input>
      </form>

      <ul>
        {guessList.map((_guess) => {
          console.log(_guess);
          return <li>{_guess}</li>;
        })}
      </ul>
    </div>
  );
}

export default Game;
