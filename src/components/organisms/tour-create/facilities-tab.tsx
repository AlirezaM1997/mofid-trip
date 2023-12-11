import WhiteSpace from "@atoms/white-space";
import { Button, Chip, Input, Text, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { useFormikContext } from "formik";
import { TourAddInputType, useTourAddMutation } from "@src/gql/generated";

const FacilitiesTab = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [value, setValue] = useState<string | null>();
  const [submit, {}] = useTourAddMutation();
  const { values, setFieldValue } = useFormikContext<TourAddInputType>();

  const handleChangeInput = e => {
    setValue(e.target.value);
  };

  const handleAddPress = () => {
    if (value) {
      setFieldValue("facilities", [...values.facilities, value]);
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

      <View style={styles.inputContainer}>
        <Input value={value} onChange={handleChangeInput} placeholder={tr("Add facilities")} />
        <Button
          containerStyle={styles.containerStyle}
          onPress={handleAddPress}
          color="secondary"
          icon={<Feather name="plus" size={24} color={theme.colors.white} />}
        />
      </View>
      <View style={styles.chipsContainer}>
        {values.facilities.map(value => (
          <Chip
            title={value}
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
});

export default FacilitiesTab;
