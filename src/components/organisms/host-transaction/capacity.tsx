import Input from "@atoms/input";
import { useFormikContext } from "formik";
import WhiteSpace from "@atoms/white-space";
import parseText from "@src/helper/number-input";
import useTranslation from "@src/hooks/translation";
import { CheckBox, Text, useTheme } from "@rneui/themed";
import { StyleSheet, View, ViewStyle } from "react-native";
import {
  ProjectGenderEnum,
  TransactionGuestGenderEnum,
  ProjectTransactionAddInputType,
} from "@src/gql/generated";

const HostTransactionCapacityTab = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { handleBlur, setFieldValue, values, touched, errors } =
    useFormikContext<ProjectTransactionAddInputType>();

  return (
    <>
      <Text heading2 bold>
        {tr("capacity and Gender")}
      </Text>
      <Text type="grey3">{tr("select the capacity and gender of passengers")}</Text>
      <WhiteSpace size={20} />
      <Input
        keyboardType="number-pad"
        name="guests.guestNumber"
        placeholder={tr("enter the capacity (quantity)")}
        textAlignVertical="top"
        onChangeText={text => setFieldValue("guests.guestNumber", parseText(text))}
        onBlur={handleBlur("guests.guestNumber")}
        value={values?.guests?.guestNumber?.toString()}
        errorMessage={touched?.guests?.guestNumber && errors?.guests?.guestNumber}
      />

      <CheckBox
        checked={values.guests.childAccept}
        title={tr("i have a child under 12 years old")}
        onPress={() => setFieldValue("guests.childAccept", !values.guests.childAccept)}
      />

      <WhiteSpace size={10} />

      <View style={styles.checkboxListContainer}>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.guests.gender === TransactionGuestGenderEnum.Both}
            title={tr("both")}
            onPress={() => setFieldValue("guests.gender", ProjectGenderEnum.Both)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
          />
        </View>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.guests.gender === TransactionGuestGenderEnum.Male}
            title={tr("male")}
            onPress={() => setFieldValue("guests.gender", ProjectGenderEnum.Male)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
          />
        </View>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.guests.gender === TransactionGuestGenderEnum.Female}
            title={tr("female")}
            onPress={() => setFieldValue("guests.gender", ProjectGenderEnum.Female)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  checkboxContainerStyle: (theme => ({
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderColor: theme.colors.grey1,
    backgroundColor: theme.colors.grey0,
  })) as ViewStyle,
  checkboxListContainer: {
    gap: 5,
    display: "flex",
    flexDirection: "row",
  },
  checkbox: {
    backgroundColor: "transparent",
  },
});

export default HostTransactionCapacityTab;
