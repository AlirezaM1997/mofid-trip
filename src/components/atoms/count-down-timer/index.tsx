import { Text } from "@rneui/themed";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

type PropsType = {
  onEnd: () => void;
  resetTimer: boolean;
  initialValue: number;
};

export default function CountDownTimer({ onEnd, initialValue, resetTimer, ...props }: PropsType) {
  // TODO: refactore the component to use useRef instead of useState
  const [seconds, setSeconds] = useState(initialValue);
  const { localizeNumber } = useLocalizedNumberFormat();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [seconds]);

  if (seconds === 0) onEnd();
  if (resetTimer && seconds === 0) setSeconds(initialValue);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return <Text style={styles.text}>{localizeNumber(formatTime(seconds))}</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 32 },
});
