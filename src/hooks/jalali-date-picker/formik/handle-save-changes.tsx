import { useTheme } from "@rneui/themed";
import { useFormikContext } from "formik";
import uesSetStartDate from "./set-start-date";
import useGetDaysBetween from "../get-days-between";
import { StyleSheet, ViewStyle } from "react-native";
import moment from "jalali-moment";

const useHandleSaveChanges = () => {

    const { theme } = useTheme();

    const { values } =
        useFormikContext();

    const { setStartDate } = uesSetStartDate();
    const { getDaysBetween } = useGetDaysBetween();

    const handleSaveChanges = (dateStart, dateEnd, setMarkedDays) => {

        if (values[dateStart] && !values[dateEnd]) {
            const startDate = moment(values[dateStart]);
            setStartDate(startDate, setMarkedDays, dateStart, dateEnd);
        }
        else if (values[dateStart] && values[dateEnd]) {
            const startDate = moment(values[dateStart]);
            const endDate = moment(values[dateEnd]);
            const middleDays = getDaysBetween(moment(startDate), moment(endDate));
            setMarkedDays([{
                date: startDate,
                buttonStyle: styles.startDayButtonStyle(theme),
                containerStyle: styles.startDayContainerStyle,
                titleStyle: styles.startDayTitleStyle(theme),
            },
            ...middleDays.map(day => ({
                date: moment(day).format("YYYY-MM-DD"),
                buttonStyle: styles.middleDayButtonStyle(theme),
                containerStyle: styles.middleDayContainerStyle,
                titleStyle: styles.middleDayTitleStyle(theme),
            })),
            {
                date: endDate,
                buttonStyle: styles.endDayButtonStyle(theme),
                containerStyle: styles.endDayContainerStyle,
                titleStyle: styles.endDayTitleStyle(theme),
            },])
        }
    }
    const styles = StyleSheet.create({
        startDayButtonStyle: (theme => ({
            backgroundColor: theme.colors.black,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        })) as ViewStyle,
        startDayContainerStyle: {
            width: 45,
            borderRadius: 0,
        },
        startDayTitleStyle: (theme => ({
            color: theme.colors.white,
        })) as ViewStyle,
        middleDayButtonStyle: (theme => ({
            backgroundColor: theme.colors.grey1,
            borderRadius: 0,
        })) as ViewStyle,
        middleDayContainerStyle: {
            width: 45,
            borderRadius: 0,
        },
        middleDayTitleStyle: (theme => ({
            color: theme.colors.grey5,
        })) as ViewStyle,
        endDayButtonStyle: (theme => ({
            backgroundColor: theme.colors.black,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        })) as ViewStyle,
        endDayContainerStyle: {
            width: 45,
            borderRadius: 0,
        },
        endDayTitleStyle: (theme => ({
            color: theme.colors.white,
        })) as ViewStyle,
    })
    return { handleSaveChanges }
}
export default useHandleSaveChanges;