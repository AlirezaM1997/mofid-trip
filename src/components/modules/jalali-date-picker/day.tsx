import { ButtonProps } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import moment from "jalali-moment";
import { StyleSheet } from "react-native";

export type DayProps = ButtonProps & {
  date?: string;
};

const Day = ({ date, ...props }: DayProps) => {
  const { localizeNumber } = useLocalizedNumberFormat();
  const jalaliDate = date ? moment(date, "YYYY-M-D").locale("fa").format("jD") : "";

  const _onPress = date => {
    console.log("dd", date);
    props?.onPress?.(date);
  };

  return (
    <Button
      onPress={(e) => _onPress(date)}
      color="secondary"
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.dayBtn}
      type="clear"
      {...props}>
      {localizeNumber(jalaliDate)}
    </Button>
  );
};

export default Day;

const styles = StyleSheet.create({
  buttonStyle: { padding: 12 },
  dayBtn: {
    width: 45,
  },
});
