import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: 60,
  reducers: {
    oneSecond(state) {
      state--;
    },
    resetTimer(state) {
      state = 60;
    },
  },
});

export const getTimer = (state) => state.timer;

export const { oneSecond, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;
