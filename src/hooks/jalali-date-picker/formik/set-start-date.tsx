import { useTheme } from "@rneui/themed";
import { useFormikContext } from "formik";
import { StyleSheet, ViewStyle } from "react-native";

const uesSetStartDate = () => {
    const { theme } = useTheme();

    const { setFieldTouched, setFieldValue } = useFormikContext();

    const setStartDate = (date, setMarkedDays, dateStart, dateEnd) => {
        setFieldTouched(dateStart, true);
        setFieldTouched(dateEnd, true);
        setFieldValue(dateStart, date);
        setFieldValue(dateEnd, date);
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
            height: 35,
        },
        startAndEndDayTitleStyle: (theme => ({
            color: theme.colors.white,
        })) as ViewStyle,
    });
    return { setStartDate };
};
export default uesSetStartDate;
