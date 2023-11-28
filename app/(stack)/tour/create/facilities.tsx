import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import TourCreateTab from "@modules/virtual-tabs";
import { BottomSheet, Button, Chip, Input, Text, useTheme } from "@rneui/themed";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import { router } from "expo-router";
import ButtonRow from "@modules/button-rows";

const Screen = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const [value, setValue] = useState<string | null>();
  const [chipsTitle, setChipsTitle] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleChangeInput = e => {
    setValue(e.target.value);
  };

  const handleAddPress = () => {
    if (value) {
      setChipsTitle([...chipsTitle, value]);
      setValue("");
    }
  };

  const handleRemove = title => {
    const newChipsTitles = chipsTitle.filter(chipTitle => chipTitle !== title);
    setChipsTitle(newChipsTitles);
  };

  const handleSubmit = () => {
    // ... do something
    setIsVisible(true);
  };

  return (
    <>
      <BottomButtonLayout
        buttons={[
          <Button onPress={handleSubmit}>{tr("Submit")}</Button>,
          <Button type="outline" color="secondary" onPress={() => router.back()}>
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
            {tr(
              "You can write and add your own tour features. Note that this section is optional."
            )}
          </Text>

          <WhiteSpace size={20} />

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
      <BottomSheet isVisible={isVisible}>
        <Container>
          <ImageBackground
            style={styles.rejectIcon}
            imageStyle={{ resizeMode: "contain" }}
            source={require("@assets/image/check.svg")}
          />
          <Text center heading2 bold>
            درخواست ایجاد تور شما با موفقیت ثبت شد
          </Text>
          <Text center>
            کمتر از ۴۸ ساعت منتظر بمانید تا تور شما توسط پشتیبانی مفید تریپ ثبت شود و به مسافران
            نمایش داده شود.
          </Text>
          <WhiteSpace />
          <ButtonRow>
            <Button color="secondary" type="outline">
              {tr("Tour Management")}
            </Button>
            <Button>{tr("Return to home")}</Button>
          </ButtonRow>
        </Container>
      </BottomSheet>
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

export default Screen;
