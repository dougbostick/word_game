import '../../App.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { generateLetter, generateWordLength } from '../../gameFunctions';
import Timer from '../Timer/Timer';
import { useState, useEffect } from 'react';
import { getTimer } from '../Timer/timerSlice';
import { wordExists } from 'word-exists';
import { getWordStatus, checkGuess } from './gameSlice';

function Game() {
  // const [timer, setTimer] = useState(60);
  const [gameStatus, setGameStatus] = useState(true);
  const [wordLength, setWordLength] = useState(0);
  const [firstLetter, setFirstLetter] = useState('');
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState([]);
  const dispatch = useDispatch();
  // const timer = useSelector(getTimer);

  const handleGuess = async (guessInput) => {
    guessInput.preventDefault();
    console.log('guess', guess);

    try {
      const isWord = await axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
        .then((res) => (res.data ? setGuessList([...guessList, guess]) : null));
      // dispatch(checkGuess(guess)).then((res) => console.log('front end', res));
      // console.log('isword', isWord);
      // if (isWord.data) {
      //   setGuessList([...guessList, guess]);
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFirstLetter(generateLetter());
    setWordLength(generateWordLength());
  }, []);

  return (
    <div className="App">
      <div>
        <Timer />
      </div>
      {/* <button onClick={() => handleClick()}>timer</button> */}
      <div>{gameStatus ? 'GAME ON' : 'GAME OVER'}</div>
      <div>{firstLetter}</div>
      <div>{wordLength}</div>
      <form onSubmit={handleGuess}>
        <input onChange={(e) => setGuess(e.target.value)}></input>
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
