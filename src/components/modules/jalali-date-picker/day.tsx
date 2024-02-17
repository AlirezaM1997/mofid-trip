import { ButtonProps } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { useLocalizedNumberFormat } from "@src/hooks/translation";
import { StyleSheet } from "react-native";
import moment from "jalali-moment";

export type DayProps = ButtonProps & {
  date?: string;
  dayData?: string | number;
};

const Day = ({ date, ...props }: DayProps) => {
  const { localizeNumber } = useLocalizedNumberFormat();
  const jalaliDate = date ? moment(date, "YYYY-M-D").locale("fa").format("jD") : "";

  const _onPress = (date: string) => {
    props?.onPress?.(date);
  };

  return (
    <Button
      onPress={e => _onPress(date as string)}
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
