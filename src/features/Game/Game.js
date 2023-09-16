import '../../App.scss';
import axios from 'axios';
import { generateLetter, generateWordLength } from '../../gameFunctions';
import { useState, useEffect, useRef } from 'react';

function Game() {
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStatus, setGameStatus] = useState(false);
  const [wordLength, setWordLength] = useState('???');
  const [firstLetter, setFirstLetter] = useState('???');
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState({});
  const [message, setMessage] = useState('');

  const handleGuess = async (e) => {
    console.log(guess, guessList);
    e.preventDefault();
    //check to see if word has been guessed already
    if (guess.length === 0) return;
    if (guessList[guess]) {
      console.log(guessList);
      setMessage('Already guessed');
      return;
    }
    //check first letter of guess is correct
    if (guess[0].toUpperCase() !== firstLetter) {
      setMessage('Incorrect first letter');
      return;
    }
    //check to see if guess if proper length
    if (guess.length !== wordLength) {
      setMessage('Incorrect word length');
      return;
    }
    try {
      //check to see if word exists
      await axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
        .then((res) => {
          if (res.data) {
            //add guess to guessList
            setGuessList({ ...guessList, [guess]: true });
            setScore(score + 1);
            setGuess('');
          }
        });
    } catch (err) {
      //if word doesn't exist, the api call fails
      setMessage('Not a word');
    }
  };

  const endGame = () => {
    setGameStatus(false);
    // setFirstLetter('???');
    // setWordLength('???');
    setGuess('');
    setMessage('Good Game!');
    clearInterval(intervalId);
  };

  const countdown = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      endGame();
    }
  };

  const test = useRef(countdown);

  useEffect(() => {
    test.current = countdown;
  }, [timer]);

  const startGame = () => {
    resetGameParams();
    setGameStatus(true);
    setIntervalId(setInterval(() => test.current(), 1000));
  };

  const resetGameParams = () => {
    setTimer(30);
    setScore(0);
    setGuessList({});
    setGuess('');
    setMessage('');
    setFirstLetter(generateLetter());
    setWordLength(generateWordLength());
  };

  return (
    <div className="App">
      <h1>Word Game</h1>
      <div className="row top">
        <div>
          First letter
          <div className="box">{firstLetter}</div>
        </div>
        <div>
          Timer
          <div className="box">{timer}</div>
        </div>
        <div>
          Word length
          <div className="box">{wordLength}</div>
        </div>
      </div>
      <div className="row">
        <div>
          Score
          <div className="box">{score}</div>
        </div>
      </div>
      <div className="input_btn">
        {gameStatus ? (
          <form onSubmit={handleGuess}>
            <input
              onChange={(e) => setGuess(e.target.value)}
              disabled={!gameStatus}
              value={guess}
              autoFocus={true}
            />
          </form>
        ) : (
          <button onClick={startGame}>
            {timer > 0 ? 'START' : 'PLAY AGAIN'}
          </button>
        )}
      </div>
      <div className="message">{message}</div>
      <ul>
        {Object.keys(guessList).map((_guess, idx) => {
          return <li key={idx}>{_guess}</li>;
        })}
      </ul>
    </div>
  );
}

export default Game;
