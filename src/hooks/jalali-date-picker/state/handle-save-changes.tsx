import { useTheme } from "@rneui/themed";
import useGetDaysBetween from "../get-days-between";
import { StyleSheet, ViewStyle } from "react-native";
import moment from "jalali-moment";
import uesSetStartDateWithState from "./set-start-date-with-state";

const useHandleSaveChangesWithState = () => {

    const { theme } = useTheme();

    const { setStartDateWithState } = uesSetStartDateWithState();
    const { getDaysBetween } = useGetDaysBetween();

    const handleSaveChangesWithState = (dateRange, setMarkedDays, setDateRange) => {

        if (dateRange.dateStart && !dateRange.dateEnd) {
            const startDate = moment(dateRange.dateStart);
            setStartDateWithState(startDate, setMarkedDays, setDateRange);
        }
        else if (dateRange.dateStart && dateRange.dateEnd) {
            const startDate = moment(dateRange.dateStart);
            const endDate = moment(dateRange.dateEnd);
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
    return { handleSaveChangesWithState }
}
export default useHandleSaveChangesWithState;