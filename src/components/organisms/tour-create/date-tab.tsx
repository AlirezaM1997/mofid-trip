import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Divider, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import JalaliDatePicker from "@modules/jalali-date-picker";
import moment from "jalali-moment";
import { TourAddInputType } from "@src/gql/generated";
import useHandleSaveChanges from "@src/hooks/jalali-date-picker/formik/handle-save-changes";
import useHandleDayPress from "@src/hooks/jalali-date-picker/formik/handle-day-press";

const DateTab = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [markedDays, setMarkedDays] = useState([]);
  const { errors, touched } =
    useFormikContext<TourAddInputType>();

  const { handleDayPress } = useHandleDayPress();
  const { handleSaveChanges } = useHandleSaveChanges();

  const getFirstDayFormatted = () => {
    return markedDays.length
      ? localizeNumber(moment(markedDays[0].date).format("jYYYY/jMM/jDD"))
      : "";
  };

  const getLastDayFormatted = () => {
    if (markedDays.length) {
      return markedDays.length === 1 ?
        localizeNumber(moment(markedDays[0].date).format("jYYYY/jMM/jDD"))
        :
        localizeNumber(moment(markedDays.slice(-1)[0].date).format("jYYYY/jMM/jDD"))
    }
  };

  const handleDayPressed = dayPressed => handleDayPress(dayPressed, markedDays, setMarkedDays, "startTime", "endTime")

  useEffect(() => handleSaveChanges("startTime", "endTime", setMarkedDays), []);

  return (
    <>
      <JalaliDatePicker onDayPress={handleDayPressed} markedDays={markedDays} />

      <View style={styles.showDateContainer}>
        <View style={styles.timeContainer}>
          <Text body2 type="secondary">
            {tr("beginning")}: {getFirstDayFormatted()}
          </Text>
          {touched.startTime && errors.startTime && (
            <Text type="error">{errors.startTime as string}</Text>
          )}
        </View>
        <Divider orientation="vertical" />
        <View style={styles.timeContainer}>
          <Text body2 type="secondary">
            {tr("end")}: {getLastDayFormatted()}
          </Text>
          {touched.endTime && errors.endTime && (
            <Text type="error">{errors.endTime as string}</Text>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  showDateContainer: { flexDirection: "row", justifyContent: "space-evenly", marginTop: 25 },
  timeContainer: { display: "flex" },
});

export default DateTab;
