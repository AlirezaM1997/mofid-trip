import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import TourCreateTab from "@modules/virtual-tabs";
import { Button, Chip, Input, Text, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import { router } from "expo-router";

const Screen = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [value, setValue] = useState<string | null>();
  const [chipsTitle, setChipsTitle] = useState([]);

  const handleChangeInput = e => {
    setValue(e.target.value);
  };

  const handleAddPress = () => {
    setChipsTitle([...chipsTitle, value]);
    setValue("");
  };

  const handleRemove = title => {
    const newChipsTitles = chipsTitle.filter(chipTitle => chipTitle !== title);
    setChipsTitle(newChipsTitles);
  };

  const handleSubmit = () => {};

  return (
    <BottomButtonLayout
      buttons={[
        <Button onPress={handleSubmit}>{tr("next")}</Button>,
        <Button type="outline" onPress={() => router.back()}>
          {tr("back")}
        </Button>,
      ]}>
      <TourCreateTab index={7} />

      <WhiteSpace />

      <Container>
        <Text heading2 bold>
          {tr("Tour Facilities")}
        </Text>
        <Text>
          {tr("You can write and add your own tour features. Note that this section is optional.")}
        </Text>

        <WhiteSpace size={20} />

        <View
          style={{
            position: "relative",
          }}>
          <Input value={value} onChange={handleChangeInput} />
          <Button
            containerStyle={styles.containerStyle}
            onPress={handleAddPress}
            color="secondary"
            icon={<Feather name="plus" size={24} color={theme.colors.white} />}
          />
        </View>
        <View style={styles.chipsContainer}>
          {chipsTitle.map(title => (
            <Chip
              title={title}
              type="outline"
              color="secondary"
              icon={
                <Button type="clear" size="sm" onPress={() => handleRemove(title)}>
                  <Feather name="x" size={24} color={theme.colors.black} />
                </Button>
              }
            />
          ))}
        </View>
      </Container>
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  chipsContainer: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 },
  containerStyle: {
    position: "absolute",
    left: 8,
    top: 8,
  },
});

export default Screen;
