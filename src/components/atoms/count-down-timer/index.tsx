import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";

export default function CountDownTimer({ onEnd, initialValue, ...props }) {
  const [time, setTime] = useState(initialValue || 60);
  const timerRef = useRef(time + 1);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 1) {
        onEnd();
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    timerRef.current = initialValue;
  }, [initialValue]);

  return <Text {...props}>{time}</Text>;
}
