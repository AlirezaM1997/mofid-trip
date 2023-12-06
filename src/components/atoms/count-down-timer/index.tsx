import { Text } from "@rneui/themed";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function CountDownTimer({ onEnd, initialValue, ...props }) {
  // TODO: refactore the component to use useRef instead of useState
  const [seconds, setSeconds] = useState(initialValue);
  const { localizeNumber } = useLocalizedNumberFormat();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        onEnd();
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return <Text style={styles.text}>{localizeNumber(formatTime(seconds))}</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 32 },
});
