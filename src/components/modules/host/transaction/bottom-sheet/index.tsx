import { RootState } from "@src/store";
import React, { useState } from "react";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import Toast from "react-native-toast-message";
import useTranslation from "@src/hooks/translation";
import { Button, Text, BottomSheet } from "@rneui/themed";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useProjectTransactionAddMutation } from "@src/gql/generated";
import { CommonActions } from "@react-navigation/native";
import { Platform } from "react-native";

const HostTransactionBottomSheet = ({ children }) => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { projectId } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const { data: transactionData } = useSelector((state: RootState) => state.hostTransactionSlice);
  const [addHostTransaction] = useProjectTransactionAddMutation();

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async () => {
    const { data } = await addHostTransaction({
      variables: { data: { ...transactionData, projectId: projectId as string } },
    });
    setIsVisible(false);

    if (data.projectTransactionAdd.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("Your request has been successfully submitted"),
      });

      if (Platform.OS === "web") {
        let currentUrl = "/";
        history.replaceState({ url: currentUrl }, document.title, currentUrl);
        router.push("host/transaction");
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ key: "host/transaction/index", name: "host/transaction/index" }],
          })
        );
      }
    }
  };

  return (
    <BottomButtonLayout
      buttons={[<Button onPress={() => setIsVisible(true)}>{tr("record request")}</Button>]}>
      {children}
      <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}>
        <Container>
          <Text center heading2 bold>
            {tr("are you sure to confirm the request?")}
          </Text>

          <WhiteSpace />

          <Text center>
            {tr(
              "your initial request will be approved or rejected by the tour after it is submitted"
            )}
          </Text>

          <WhiteSpace size={24} />

          <ButtonRow>
            <Button color="secondary" type="outline" onPress={handleClose}>
              {tr("cancel and edit")}
            </Button>
            <Button onPress={handleSubmit}>{tr("submit request")}</Button>
          </ButtonRow>
        </Container>
      </BottomSheet>
    </BottomButtonLayout>
  );
};

export default HostTransactionBottomSheet;
