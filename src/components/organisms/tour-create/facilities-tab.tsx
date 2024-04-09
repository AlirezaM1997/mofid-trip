import WhiteSpace from "@atoms/white-space";
import { Button, Chip, Input, Text, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { useFormikContext } from "formik";
import { SettingDetailType, TourAddInputType } from "@src/gql/generated";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";

const FacilitiesTab = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [value, setValue] = useState<string | null>();
  const { values, setFieldValue, errors } = useFormikContext<TourAddInputType>();
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
      setFieldValue("facilities", [...values.facilities, { [facilitiesLng()]: value }]);
      setValue("");
    }
  };

  const handleRemove = facility => {
    setFieldValue(
      "facilities",
      values.facilities.filter(f => f !== facility)
    );
  };

  return (
    <>
      <Text heading2 bold>
        {tr("Tour Facilities")}
      </Text>
      <Text>
        {tr("You can write and add your own tour features. Note that this section is optional.")}
      </Text>

      <WhiteSpace />

      <Input
        value={value}
        onChange={handleChangeInput}
        placeholder={tr("Add facilities")}
        leftIcon={
          <Button
            onPress={handleAddPress}
            color="secondary"
            icon={<Feather name="plus" size={24} color={theme.colors.white} />}
          />
        }
      />
      {errors.facilities && (
        <>
          <Text error type="error">
            {tr("a maximum of sixty characters is allowed for features")}
          </Text>
          <WhiteSpace />
        </>
      )}
      <View style={styles.chipsContainer}>
        {values.facilities.map(value => (
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

  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default FacilitiesTab;
