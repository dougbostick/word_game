import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/Game/gameSlice';
import timerReducer from './features/Timer/timerSlice';

const store = configureStore({
  reducer: {
    game: gameReducer,
    timer: timerReducer,
  },
});

export default store;
