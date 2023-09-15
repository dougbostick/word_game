import '../../App.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { generateLetter, generateWordLength } from '../../gameFunctions';
import Timer from '../Timer/Timer';
import { useState, useEffect, useRef } from 'react';
import { getTimer } from '../Timer/timerSlice';
import { wordExists } from 'word-exists';
import { getWordStatus, checkGuess } from './gameSlice';

function Game() {
  const [timer, setTimer] = useState(60);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStatus, setGameStatus] = useState(true);
  const [wordLength, setWordLength] = useState(0);
  const [firstLetter, setFirstLetter] = useState('');
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState([]);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  // const timer = useSelector(getTimer);

  const handleGuess = async (guessInput) => {
    guessInput.preventDefault();
    console.log('guess', guess);
    //check to see if word meets game criteria
    if (guess[0].toUpperCase() === firstLetter) {
      if (guess.length === wordLength) {
        try {
          //check to see if word exists
          await axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
            .then((res) =>
              res.data ? setGuessList([...guessList, guess]) : null
            );
        } catch (err) {
          setMessage('Not a word');
          console.log(err);
        }
      } else {
        setMessage('Incorrect word length');
      }
    } else {
      setMessage('Incorrect first letter');
    }
  };

  useEffect(() => {
    setFirstLetter(generateLetter());
    setWordLength(generateWordLength());
  }, []);

  const countdown = () => {
    console.log('countdown', timer);
    if (timer > 0) {
      console.log('if');
      setTimer(timer - 1);
    } else {
      console.log('else');
      setGameStatus(false);
      clearInterval(intervalId);
    }
  };
  const test = useRef(countdown);

  useEffect(() => {
    test.current = countdown;
  }, [timer]);

  const startGame = () => {
    setIntervalId(setInterval(() => test.current(), 1000));
  };

  // const playAgain = () => {
  //   setTimer(60);
  //   setGameStatus(true);
  // };

  return (
    <div className="App">
      <div>{timer}</div>
      <div>{gameStatus ? 'GAME ON' : 'GAME OVER'}</div>
      <div>First letter: {firstLetter}</div>
      <div>Word length: {wordLength}</div>
      <form onSubmit={handleGuess}>
        <input
          onChange={(e) => setGuess(e.target.value)}
          disabled={!gameStatus}
        />
      </form>
      <div>{message}</div>
      <button onClick={startGame}>START</button>
      {/* <button onClick={playAgain}>Play Again</button> */}
      <ul>
        {guessList.map((_guess, idx) => {
          return <li key={idx}>{_guess}</li>;
        })}
      </ul>
    </div>
  );
}

export default Game;
