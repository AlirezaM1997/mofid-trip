import { useTheme } from "@rneui/themed";
import { StyleSheet, ViewStyle } from "react-native";

const uesSetStartDateWithState = () => {

    const { theme } = useTheme();

    const setStartDateWithState = (date, setMarkedDays, setDateRange) => {
        setDateRange({ dateStart: date, dateEnd: date });
        setMarkedDays([
            {
                date: date,
                buttonStyle: styles.startAndEndDayButtonStyle(theme),
                containerStyle: styles.startAndEndDayContainerStyle,
                titleStyle: styles.startAndEndDayTitleStyle(theme),
            },
        ]);
    };
    const styles = StyleSheet.create({
        startAndEndDayButtonStyle: (theme => ({
            backgroundColor: theme.colors.black,
        })) as ViewStyle,
        startAndEndDayContainerStyle: {
            width: 45,
        },
        startAndEndDayTitleStyle: (theme => ({
            color: theme.colors.white,
        })) as ViewStyle,
    })
    return { setStartDateWithState }
};
export default uesSetStartDateWithState;