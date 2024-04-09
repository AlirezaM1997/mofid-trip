import { useState } from "react";
import { useFormikContext } from "formik";
import WhiteSpace from "@atoms/white-space";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "@rneui/themed";
import { Chip, Input, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { ProjectAddInputType, SettingDetailType } from "@src/gql/generated";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";

const TabFaclities = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [value, setValue] = useState<string | null>();
  const { values, setFieldValue, errors } = useFormikContext<ProjectAddInputType>();
  const { language } = useSelector(
    (state: RootState) => state.settingDetailSlice.settingDetail as SettingDetailType
  );

  const facilitiesLng: () => string = () => {
    const obj: Record<string, string> = {
      AR: "arName",
      FA_IR: "faName",
      EN_US: "enName",
    };
    if (language in obj) return obj[language];
    return obj["FA_IR"];
  };

  const handleChangeInput = e => {
    setValue(e.target.value);
  };

  const handleAddPress = () => {
    if (value) {
      setFieldValue("facilities", [...values?.facilities, { [facilitiesLng()]: value }]);
      setValue("");
    }
  };

  const handleRemove = title => {
    const newValues = values?.facilities?.filter(value => value !== title);
    setFieldValue("facilities", newValues);
  };

  return (
    <>
      <View style={styles.headerTitle}>
        <Text heading2 bold>
          {tr("Host Facilities")}
        </Text>
        <Text>
          {tr("You can write and add your own host features. Note that this section is optional.")}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Input value={value} onChange={handleChangeInput} placeholder={tr("Add facilities")} />
        <Button
          containerStyle={styles.containerStyle}
          onPress={handleAddPress}
          color="secondary"
          icon={<Feather name="plus" size={24} color={theme.colors.white} />}
        />
      </View>
      {errors.facilities && (
        <>
          <Text error type="error">
            {tr("a maximum of sixty characters is allowed for features")}
          </Text>
          <WhiteSpace />
        </>
      )}
      <View style={styles.chipsContainer}>
        {values?.facilities?.map(value => (
          <Chip
            title={value[facilitiesLng()]}
            type="outline"
            color="secondary"
            icon={
              <Button type="clear" size="sm" onPress={() => handleRemove(value)}>
                <Feather name="x" size={24} color={theme.colors.black} />
              </Button>
            }
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chipsContainer: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 },
  containerStyle: {
    position: "absolute",
    left: 8,
    top: 8,
  },
  inputContainer: {
    position: "relative",
  },
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
  headerTitle: {
    gap: 5,
    marginBottom: 20,
  },
});

export default TabFaclities;
