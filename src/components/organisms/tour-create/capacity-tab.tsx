import WhiteSpace from "@atoms/white-space";
import useTranslation from "@src/hooks/translation";
import { CheckBox, Input, Text, useTheme } from "@rneui/themed";
import {
  TourAddInputType,
  TourAddMutation,
  TourGenderEnum,
  TourListQuery,
} from "@src/gql/generated";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";
import parseText from "@src/helper/number-input";

const CapacityTab = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { handleChange, handleBlur, setFieldValue, values, touched, errors } =
    useFormikContext<TourAddInputType>();

  console.log("a", values, values?.capacity, values?.capacity?.capacityNumber);

  return (
    <>
      <Text heading2 bold>
        {tr("Capacity and Gender")}
      </Text>
      <Text type="grey3">{tr("Select the capacity and gender of the tour passengers")}</Text>
      <WhiteSpace size={20} />
      <Input
        name="capacityNumber"
        placeholder={tr("enter the capacity (quantity)")}
        textAlignVertical="top"
        onChangeText={capacity => {
          try {
            setFieldValue("capacity.capacityNumber", parseText(capacity));
          } catch (error) {
            console.log(error);
          }
        }}
        onBlur={handleBlur("capacity.capacityNumber")}
        value={values.capacity?.capacityNumber?.toString()}
        errorMessage={
          touched?.capacity?.capacityNumber && (errors?.capacity?.capacityNumber as string)
        }
      />

      <CheckBox
        checked={values.capacity?.childAccept}
        title={tr("The tour is open to children under 12 years old")}
        onPress={() => setFieldValue("capacity.childAccept", !values.capacity?.childAccept)}
      />

      <WhiteSpace size={10} />

      <View style={styles.checkboxListContainer}>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.capacity?.gender === TourGenderEnum.Both}
            title={tr("both")}
            onPress={() => setFieldValue("capacity.gender", TourGenderEnum.Both)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
          />
        </View>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.capacity?.gender === TourGenderEnum.Male}
            title={tr("male")}
            onPress={() => setFieldValue("capacity.gender", TourGenderEnum.Male)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
          />
        </View>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.capacity?.gender === TourGenderEnum.Female}
            title={tr("female")}
            onPress={() => setFieldValue("capacity.gender", TourGenderEnum.Female)}
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
  checkboxContainerStyle: theme => ({
    backgroundColor: theme.colors.grey0,
    borderColor: theme.colors.grey1,
    borderWidth: 2,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
  }),
  checkboxListContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  checkbox: {
    backgroundColor: "transparent",
  },
});

export default CapacityTab;
