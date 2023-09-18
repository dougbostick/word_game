import '../../App.scss';
import axios from 'axios';
import { generateLetter, generateWordLength } from '../../gameFunctions';
import { useState, useEffect, useRef } from 'react';
import logo from '../assets/wordrushlogo.png';
import ding from '../assets/ding.mp3';

function Game() {
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [gameStatus, setGameStatus] = useState(false);
  const [wordLength, setWordLength] = useState('???');
  const [firstLetter, setFirstLetter] = useState('???');
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState({});
  const [message, setMessage] = useState(
    'Guess words with the correct first letter and length'
  );
  const [repeatedWord, setRepeatedWord] = useState('');

  const sound = () => {
    const sound = new Audio(ding);
    sound.volume = 0.01;
    sound.play();
  };

  const handleGuess = async (e) => {
    e.preventDefault();
    //check to see if word has been guessed already
    if (guess.length === 0) return;
    if (guessList[guess]) {
      setMessage('Already guessed');
      setRepeatedWord(guess);
      setTimeout(() => setRepeatedWord(''), 500);
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
            //add guess to guessList and increment score
            setGuessList({ ...guessList, [guess]: true });
            setScore(score + 1);
            setMessage('');
            sound();
            setCorrect(true);
            setTimeout(() => setCorrect(false), 500);
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
      {/* <h1>WORD RUSH</h1> */}
      <img src={logo} alt="logo" />
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
          <div className={correct ? 'box score' : 'box'}>
            <span className={correct ? 'score_val_score' : 'score_val'}>
              {score}
            </span>
          </div>
        </div>
      </div>
      <div className="message">{message}</div>
      <div className="input_btn">
        {gameStatus ? (
          <form onSubmit={handleGuess}>
            <input
              onChange={(e) => setGuess(e.target.value)}
              disabled={!gameStatus}
              value={guess}
              autoFocus={true}
            />
            <button className="mobile_btn">+</button>
          </form>
        ) : (
          <button onClick={startGame}>
            {timer > 0 ? 'START' : 'PLAY AGAIN'}
          </button>
        )}
      </div>
      <ul>
        {Object.keys(guessList).map((_guess, idx) => {
          return (
            <li key={idx} className={_guess === repeatedWord ? 'wrong' : ''}>
              {_guess}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Game;
