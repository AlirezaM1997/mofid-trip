import { useEffect, useState } from "react";
import moment from "jalali-moment";
import { StyleSheet, View } from "react-native";
import JalaliDatePicker from "@modules/jalali-date-picker";
import { Divider, Text } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import useHandleSaveChanges from "@src/hooks/jalali-date-picker/formik/handle-save-changes";
import useHandleDayPress from "@src/hooks/jalali-date-picker/formik/handle-day-press";
import { useLocalSearchParams } from "expo-router";
import { useProjectCapacityListQuery } from "@src/gql/generated";
import LoadingIndicator from "@modules/Loading-indicator";

const HostTransactionDateTab = () => {
  const { tr } = useTranslation();
  const [markedDays, setMarkedDays] = useState([]);
  const { dateStart, dateEnd, projectId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();

  const { handleDayPress } = useHandleDayPress();
  const { handleSaveChanges } = useHandleSaveChanges();

  const start = moment(dateStart).locale("fa").format("YYYY-MM-DD");
  const end = moment(dateEnd).locale("fa").format("YYYY-MM-DD");

  const { data, loading } = useProjectCapacityListQuery({
    variables: {
      pk: projectId as string,
      filter: { dateRange: { start, end } },
    },
  });

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

  if (!data || loading) return <LoadingIndicator />;

  const daysData = data?.projectCapacityList?.map(item => {
    return {
      date: item?.date,
      data: item?.freeCapacity,
    };
  });

  return (
    <>
      <JalaliDatePicker markedDays={markedDays} onDayPress={handleDayPressed} daysData={daysData} />

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
