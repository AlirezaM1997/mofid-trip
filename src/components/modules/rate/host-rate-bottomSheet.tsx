import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { BottomSheet, Button, Divider, Input, Slider, Text, useTheme } from "@rneui/themed";
import {
  ProjectTransactionQueryType,
  RateObjectTypeEnum,
  useRateAddMutation,
} from "@src/gql/generated";
import { HEIGHT } from "@src/constants";
import Container from "@atoms/container";
import { AntDesign } from "@expo/vector-icons";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import HostTransactionDetailCard from "./host-transaction-detail-card";
import { View } from "react-native";
import Toast from "react-native-toast-message";

const HostRateBottomSheet = ({
  transaction,
  isVisible,
  handleClose,
}: {
  transaction: ProjectTransactionQueryType;
  isVisible: boolean;
  handleClose: () => void;
}) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();

  const [value, setValue] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const [rateAdd] = useRateAddMutation();

  const handleRate = async () => {
    const { data } = await rateAdd({
      variables: {
        data: {
          objectType: RateObjectTypeEnum.Project,
          objectId: +(transaction?.project?.id as string),
          value: value,
          description: text,
        },
      },
    });
    if (data?.rateAdd?.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("Successful"),
        text2: tr("your feedback has been recorded."),
      });
      handleClose();
      setValue(0);
      setText("");
    }
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={handleClose}
      containerStyle={styles.rateBottomSheet}>
      <Container style={styles.headerBar}>
        <Text>{tr("rates to the host")}</Text>
        <AntDesign onPress={handleClose} name="arrowright" size={22} />
      </Container>
      <Divider />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <HostTransactionDetailCard transactionDetail={transaction} handleClose={handleClose} />
          <Divider width={6} />
          <Container style={styles.topSection}>
            <Text body2 bold>
              {tr("rate the host")}
            </Text>
            <Text caption type="grey2">
              {tr("how satisfied were you with the experience of traveling to these hosts?")}
            </Text>
            <Slider
              step={1}
              maximumValue={5}
              minimumTrackTintColor={theme.colors.black}
              thumbTintColor={theme.colors.white}
              thumbStyle={styles.thumbStyle(value, theme)}
              value={value}
              allowTouchTrack={true}
              onValueChange={v => setValue(v)}
            />
            <View style={styles.valueOfSlider}>
              {[0, 1, 2, 3, 4, 5].map(n => (
                <Text caption type={value === 0 ? "grey2" : "black"} style={{ width: 10 }}>
                  {localizeNumber(n)}
                </Text>
              ))}
            </View>
          </Container>
        </View>
        <View style={styles.bottomSection}>
          {value !== 0 && (
            <Container style={styles.description}>
              <Text caption>{tr("share your opinion about the host with us.")}</Text>
              <Input
                multiline
                numberOfLines={4}
                placeholder={tr("description")}
                onChangeText={text => setText(text)}
                value={text}
              />
            </Container>
          )}
          <Divider />
          <Container>
            <Button onPress={handleRate} disabled={value === 0 ? true : false} color="secondary">
              {value === 0 ? tr("register points") : tr("submit")}
            </Button>
          </Container>
        </View>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  rateBottomSheet: {
    height: HEIGHT,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "flex-end",
    paddingVertical: 0,
  },
  headerBar: {
    flexDirection: "row",
    height: 64,
    gap: 24,
    marginLeft: "auto",
    alignItems: "center",
  },
  headerBarButton: { flexDirection: "row", gap: 20 },
  scrollView: { height: HEIGHT - 65, justifyContent: "space-between" },
  topSection: { paddingVertical: 24, gap: 5 },
  thumbStyle: (value, theme) => ({
    width: 20,
    height: 20,
    borderWidth: 5,
    borderColor: value === 0 ? theme.colors.grey2 : theme.colors.black,
  }),
  valueOfSlider: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  bottomSection: { gap: 20, paddingBottom: 20 },
  description: { gap: 10 },
});

export default HostRateBottomSheet;
