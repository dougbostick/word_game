import { useState, useEffect } from 'react';
import { oneSecond, resetTimer } from './timerSlice';
import { getTimer } from './timerSlice';
import { useSelector } from 'react-redux';

const Timer = () => {
  const timer = useSelector(getTimer);

  const countdown = () => {
    console.log('countdown');
    if (timer > 0) {
      oneSecond();
    } else {
      // setGameStatus(false);
      console.log('ok');
    }
  };

  useEffect(() => {
    console.log('timer useEffect');
    setTimeout(countdown, 1000);
  });

  return <div>{timer}</div>;
};

export default Timer;
