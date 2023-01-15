import { useEffect, useState } from 'react';

export const useTime = (
  isGameStarted: boolean,
  isGameOver: boolean
): [number, () => void] => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameStarted) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      if (isGameOver) {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [isGameOver, isGameStarted, time]);

  const onReset = () => setTime(0);

  return [time, onReset];
};
