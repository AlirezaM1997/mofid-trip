import React from "react";
import { router } from "expo-router";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { Image, StyleSheet } from "react-native";
import useTranslation from "@src/hooks/translation";
import { BottomSheet, Button, Text } from "@rneui/themed";
import { useFormikContext } from "formik";

const NgoAuthenticationBottomSheet = ({ submitLoading, isVisible, setIsVisible }) => {
  const { tr } = useTranslation();
  const { handleSubmit } = useFormikContext();

  const backHandler = () => {
    router.replace("profile");
    setIsVisible(false);
  };

  return (
    <>
      <Button onPress={handleSubmit} loading={submitLoading}>
        {tr("submit")}
      </Button>

      <BottomSheet isVisible={isVisible}>
        <Container>
          <Image
            style={styles.image}
            source={require("@assets/image/check.svg")}
            alt="check tick"
          />

          <WhiteSpace size={16} />

          <Text heading2 center>
            {tr("your ngo authentication request has been successfully submitted")}
          </Text>

          <WhiteSpace size={16} />

          <Text body2 type="grey3">
            {tr(
              "your request is being reviewed by the admin, if your identity is confirmed, your tour/host will be published"
            )}
          </Text>

          <WhiteSpace size={24} />

          <Button onPress={backHandler}>{tr("back")}</Button>
        </Container>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  image: { margin: "auto" },
});

export default NgoAuthenticationBottomSheet;
