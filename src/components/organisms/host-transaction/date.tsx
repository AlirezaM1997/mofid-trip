import { useEffect, useState } from "react";
import moment from "jalali-moment";
import { StyleSheet, View } from "react-native";
import JalaliDatePicker from "@modules/jalali-date-picker";
import { Divider, Text } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import useHandleSaveChanges from "@src/hooks/jalali-date-picker/formik/handle-save-changes";
import useHandleDayPress from "@src/hooks/jalali-date-picker/formik/handle-day-press";

const HostTransactionDateTab = () => {
  const { tr } = useTranslation();
  const [markedDays, setMarkedDays] = useState([]);
  const { localizeNumber } = useLocalizedNumberFormat();

  const { handleDayPress } = useHandleDayPress();
  const { handleSaveChanges } = useHandleSaveChanges();

  const getFirstDayFormatted = () => {
    return markedDays.length
      ? localizeNumber(moment(markedDays[0].date).format("jYYYY/jMM/jDD"))
      : "";
  };

  const getLastDayFormatted = () => {
    if (markedDays.length) {
      return markedDays.length === 1
        ? localizeNumber(moment(markedDays[0].date).format("jYYYY/jMM/jDD"))
        : localizeNumber(moment(markedDays.slice(-1)[0].date).format("jYYYY/jMM/jDD"));
    }
  };

  const handleDayPressed = dayPressed =>
    handleDayPress(dayPressed, markedDays, setMarkedDays, "dateStart", "dateEnd");

  useEffect(() => handleSaveChanges("dateStart", "dateEnd", setMarkedDays), []);

  return (
    <>
      <JalaliDatePicker onDayPress={handleDayPressed} markedDays={markedDays} />

      <View style={styles.showDateContainer}>
        <View style={styles.timeContainer}>
          <Text body2 type="secondary">
            {tr("beginning")}: {getFirstDayFormatted()}
          </Text>
        </View>
        <Divider orientation="vertical" />
        <View style={styles.timeContainer}>
          <Text body2 type="secondary">
            {tr("end")}: {getLastDayFormatted()}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  showDateContainer: { flexDirection: "row", justifyContent: "space-evenly", marginTop: 25 },
  timeContainer: {
    display: "flex",
  },
});

export default HostTransactionDateTab;
