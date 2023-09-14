import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkGuess = createAsyncThunk('checkGuess', async (guess) => {
  try {
    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`
    );
    console.log('res', res.data[0].word);
    return res.data[0].word;
  } catch (err) {
    console.log(err);
  }
});
export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    status: true,
    guessList: [],
    // isWord: false,
  },
  reducers: {
    startGame(state) {
      state.status = true;
    },
    endGame(state) {
      state.status = false;
    },
    addGuess(state, action) {
      state.guessList = [...state.guessList, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkGuess.fulfilled, (state, action) => {
      console.log('check guess reducer', action.payload);
      if (action.payload) {
        state.guessList = [...state.guessList, action.payload];
      }
    });
  },
});

export const getGuessList = (state) => state.isWord;

export const { startGame, endGame, addGuess } = gameSlice.actions;
export default gameSlice.reducer;
