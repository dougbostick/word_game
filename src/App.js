import './App.css';
import {
  generateLetter,
  generateWordLength,
} from './gameFunctions/gameFunctions';

function App() {
  // const res = [];
  // for (let i = 0; i < 100; i++) {
  //   const letter = generateWordLength();
  //   res.push(letter);
  // }
  // console.log(res.sort());
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
