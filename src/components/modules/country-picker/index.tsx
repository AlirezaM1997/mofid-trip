import Input from "@atoms/input";
import { Divider } from "@rneui/base";
import { HEIGHT } from "@src/constants";
import { CountryType, data } from "./data";
import { Feather } from "@expo/vector-icons";
import parseText from "@src/helper/number-input";
import React, { useEffect, useState } from "react";
import useTranslation from "@src/hooks/translation";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable, StyleSheet, View } from "react-native";
import WhiteSpace from "@src/components/atoms/white-space";
import { BottomSheet, ListItem, Text } from "@rneui/themed";

const CountryPicker = ({ value, setValue, callingCode, setCallingCode, ...props }) => {
  const { tr } = useTranslation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [country, setCountry] = useState(data[239]);
  const [inputValue, setInputValue] = useState("");
  const [tempData, setTempData] = useState(data);
  const [searchText, setSearchText] = useState("");

  const handleSelectCountry = (c: CountryType) => {
    setCallingCode(c.callingCode);
    setIsVisible(false);
    setCountry(c);
  };

  useEffect(() => {
    if (searchText) {
      setTempData(data.filter(c => c?.name.toLowerCase().includes(searchText.toLowerCase())));
    } else {
      setTempData(data);
    }
  }, [searchText]);

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <>
      <View style={[styles.container, { direction: "ltr" }]}>
        <Input
          autoFocus
          keyboardType="phone-pad"
          leftIcon={
            <Pressable onPress={() => setIsVisible(true)} style={styles.flagButton}>
              <Text>
                {country.flag} {country.callingCode}
              </Text>
            </Pressable>
          }
          containerStyle={styles.inputContainerStyle}
          inputStyle={[styles.inputStyle, { outline: "none" }]}
          onChangeText={text => setInputValue(parseText(text))}
          value={inputValue}
          maxLength={11}
        />
      </View>
      <BottomSheet containerStyle={styles.bottomSheetContainer} isVisible={isVisible}>
        <Pressable style={styles.close} onPress={() => setIsVisible(false)}>
          <Feather name="x-circle" size={24} color="transparent" />
          <Text>{tr("select country")}</Text>
          <Feather name="x-circle" size={24} color="black" />
        </Pressable>
        <Divider />
        <ScrollView style={styles.scrollView}>
          <Container>
            <WhiteSpace size={10} />
            <Input
              onChangeText={setSearchText}
              style={{ outline: "none" }}
              placeholder={tr("search country")}
            />
          </Container>
          {tempData.map(c => (
            <ListItem key={c.countryCode} bottomDivider onPress={() => handleSelectCountry(c)}>
              <ListItem.Content>
                <ListItem.Title>
                  {c.flag} {c.callingCode} {c.name}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: 58,
    maxHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#DADADA",
  },
  flagButton: {
    borderWidth: 0,
    height: 58,
    width: 80,
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#DADADA",
  },
  inputContainerStyle: { height: 58 },
  inputStyle: {
    borderWidth: 0,
    height: 58,
    paddingLeft: 100,
    textAlign: "left",
  },
  close: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 10,
    backgroundColor: "#fff",
  },
  scrollView: { height: HEIGHT - 75 },
  bottomSheetContainer: {
    backgroundColor: "#fff",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
});

export default CountryPicker;
