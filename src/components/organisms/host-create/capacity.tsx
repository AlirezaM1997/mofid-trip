import Input from "@atoms/input";
import WhiteSpace from "@atoms/white-space";
import { CheckBox, Text, useTheme } from "@rneui/themed";
import { ProjectAddInputType, ProjectGenderEnum } from "@src/gql/generated";
import parseText from "@src/helper/number-input";
import useTranslation from "@src/hooks/translation";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";

const TabCapacity = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ProjectAddInputType>();

  return (
    <>
      <Text heading2 bold>
        {tr("Capacity and Gender")}
      </Text>
      <Text type="grey3">{tr("Select the capacity and gender of the host passengers")}</Text>
      <WhiteSpace size={20} />
      <Input
        name="capacityNumber"
        placeholder={tr("enter the capacity (quantity)")}
        textAlignVertical="top"
        onChangeText={text => {
          setFieldValue("capacity.capacityNumber", +parseText(text));
        }}
        onBlur={handleBlur("capacity.capacityNumber")}
        value={values.capacity.capacityNumber?.toString()}
        errorMessage={
          touched?.capacity?.capacityNumber && (errors?.capacity?.capacityNumber as string)
        }
      />

      <CheckBox
        checked={values.capacity.childAccept}
        title={tr("The host is open to children under 12 years old")}
        onPress={() => setFieldValue("capacity.childAccept", !values.capacity.childAccept)}
      />

      <WhiteSpace size={10} />

      <View style={styles.checkboxListContainer}>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.capacity.gender === ProjectGenderEnum.Both}
            title={tr("both")}
            onPress={() => setFieldValue("gender", ProjectGenderEnum.Both)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
          />
        </View>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.capacity.gender === ProjectGenderEnum.Male}
            title={tr("male")}
            onPress={() => setFieldValue("gender", ProjectGenderEnum.Male)}
            iconType="material-community"
            checkedIcon="radiobox-marked"
            uncheckedIcon="radiobox-blank"
          />
        </View>
        <View style={styles.checkboxContainerStyle(theme)}>
          <CheckBox
            containerStyle={styles.checkbox}
            checked={values.capacity.gender === ProjectGenderEnum.Female}
            title={tr("female")}
            onPress={() => setFieldValue("gender", ProjectGenderEnum.Female)}
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

export default TabCapacity;
