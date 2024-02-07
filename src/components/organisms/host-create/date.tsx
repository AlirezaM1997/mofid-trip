import moment from "jalali-moment";
import WhiteSpace from "@atoms/white-space";
import JalaliDatePicker from "@modules/jalali-date-picker";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { Divider, Text } from "@rneui/themed";
import { ProjectAddInputType } from "@src/gql/generated";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import useHandleDayPress from "@src/hooks/jalali-date-picker/formik/handle-day-press";
import useHandleSaveChanges from "@src/hooks/jalali-date-picker/formik/handle-save-changes";

const TabDate = () => {
  const { tr } = useTranslation();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [markedDays, setMarkedDays] = useState([]);
  const { values, errors, touched } =
    useFormikContext<ProjectAddInputType>();

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

  const handleDayPressed = dayPressed => handleDayPress(dayPressed, markedDays, setMarkedDays, "dateStart", "dateEnd")

  useEffect(() => handleSaveChanges("dateStart", "dateEnd", setMarkedDays), []);

  return (
    <>
      <JalaliDatePicker onDayPress={handleDayPressed} markedDays={markedDays} />

      <View style={styles.showDateContainer}>
        <View style={styles.timeContainer}>
          <Text body2 type="secondary">
            {tr("beginning")}: {getFirstDayFormatted()}
          </Text>
          {touched.dateStart && !values.dateStart && (
            <Text type="error">{errors.dateStart as string}</Text>
          )}
        </View>
        <Divider orientation="vertical" />
        <View style={styles.timeContainer}>
          <Text body2 type={touched.dateEnd && errors.dateEnd ? "error" : "secondary"}>
            {tr("end")}: {getLastDayFormatted()}
          </Text>
          {touched.dateEnd && errors.dateEnd && (
            <Text type="error">{errors.dateEnd as string}</Text>
          )}
        </View>
      </View>
      <WhiteSpace />
    </>
  );
};

const styles = StyleSheet.create({
  showDateContainer: { flexDirection: "row", justifyContent: "space-evenly", marginTop: 25 },
  timeContainer: { display: "flex", },
});

export default TabDate;
