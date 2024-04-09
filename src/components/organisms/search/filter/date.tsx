import moment from "jalali-moment";
import debounce from "lodash/debounce";
import WhiteSpace from "@atoms/white-space";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import JalaliDatePicker from "@modules/jalali-date-picker";
import { Divider, Text } from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { setFilter } from "@src/slice/filter-slice";
import useHandleDayPressWithState from "@src/hooks/jalali-date-picker/state/handle-day-press-with-state";
import useHandleSaveChangesWithState from "@src/hooks/jalali-date-picker/state/handle-save-changes-with-state";

const FilterDate = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const [markedDays, setMarkedDays] = useState([]);
  const { localizeNumber } = useLocalizedNumberFormat();
  const { filter } = useSelector((state: RootState) => state.filterSlice);
  const [dateRange, setDateRange] = useState({
    dateStart: filter?.dateRange?.start,
    dateEnd: filter?.dateRange?.end,
  });

  const { handleDayPressWithState } = useHandleDayPressWithState();
  const { handleSaveChangesWithState } = useHandleSaveChangesWithState();

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

  const handleDayPressed = dayPressed => handleDayPressWithState(dayPressed, markedDays, setMarkedDays, setDateRange, dateRange)

  useEffect(() => handleSaveChangesWithState(dateRange, setMarkedDays, setDateRange), []);


  const debouncedOnChange = useMemo(
    () =>
      debounce(
        () =>
          dispatch(
            setFilter(
              !markedDays.length
                ? { ...filter, dateRange: {} }
                : dateRange.dateEnd
                  ? {
                    ...filter,
                    dateRange: {
                      start: moment(dateRange.dateStart).format("YYYY-MM-DD"),
                      end: moment(dateRange.dateEnd).format("YYYY-MM-DD"),
                    },
                  }
                  : {
                    ...filter,
                    dateRange: {
                      start: moment(dateRange.dateStart).format("YYYY-MM-DD"),
                      end: moment(dateRange.dateStart).format("YYYY-MM-DD"),
                    },
                  }
            )
          ),
        1000
      ),
    [filter.dateRange, markedDays]
  );

  useEffect(() => {
    debouncedOnChange();
  }, [filter.dateRange, markedDays]);

  return (
    <>
      <JalaliDatePicker onDayPress={handleDayPressed} markedDays={markedDays} />

      <View style={styles.showDateContainer}>
        <View style={styles.timeContainer}>
          <Text body2>
            {tr("beginning")}: {getFirstDayFormatted()}
          </Text>
        </View>
        <Divider orientation="vertical" />
        <View style={styles.timeContainer}>
          <Text body2>
            {tr("end")}: {getLastDayFormatted()}
          </Text>
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

export default FilterDate;
