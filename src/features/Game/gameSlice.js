import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    status: true,
    guessList: [],
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
});

export const { startGame, endGame, addGuess } = gameSlice.actions;
export default gameSlice.reducer;
