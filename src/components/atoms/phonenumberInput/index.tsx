import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import Container from "../container";

const PhoneNumberInput = () => {
  const [countryCode, setCountryCode] = useState<{ cca2: CountryCode; callingCode: string }>({
    cca2: "IQ",
    callingCode: "964",
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountrySelect = (selectedCountry) => {
    setCountryCode(selectedCountry);
  };

  return (
    <Container style={styles.container}>
      <View style={styles.inputContainer}>
        <CountryPicker
          countryCode={countryCode.cca2}
          withFilter
          withCallingCodeButton={true}
          withFlagButton={true}
          withAlphaFilter
          withCallingCode
          onSelect={handleCountrySelect}
        />

        <TextInput style={styles.phoneNumberInput} value={phoneNumber} onChangeText={setPhoneNumber}/>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 70,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  callingCode: {
    fontSize: 16,
  },
  phoneNumberInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
});

export default PhoneNumberInput;
