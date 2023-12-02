import React from "react";
import moment from "jalali-moment";
import { Text } from "@rneui/themed";
import { RootState } from "@src/store";
import Container from "@atoms/container";
import { useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { formatPrice } from "@src/hooks/localization";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar, Button, useTheme } from "@rneui/themed";
import LoadingIndicator from "@modules/Loading-indicator";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useProjectTransactionDetailQuery } from "@src/gql/generated";
import { ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const CustomView = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[{ borderColor: theme.colors.grey0 }, styles.detailsContainer]}>{children}</View>
  );
};

const Receipt = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { id } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();
  const { userDetail } = useSelector((state: RootState) => state.userSlice);

  const { data, loading } = useProjectTransactionDetailQuery({
    variables: { pk: id as string },
  });

  const totalPrice = data?.projectTransactionDetail?.project?.price || 0;
  const formattedTotalPrice = formatPrice(totalPrice);

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  const { invoiceNumber, modifiedDate, project } = data?.projectTransactionDetail;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(invoiceNumber);
    Toast.show({
      type: "success",
      text1: tr("copied"),
    });
  };

  return (
    <BottomButtonLayout
      buttons={[
        <View style={styles.btnContainer}>
          <Button containerStyle={styles.buttonStyle}>{tr("share")}</Button>
          <Button
            type="outline"
            onPress={() => router.push("/")}
            containerStyle={styles.buttonStyle}>
            {tr("return to home")}
          </Button>
        </View>,
      ]}>
      <Container style={styles.topContainer}>
        <View style={styles.topContent}>
          <View>
            <View style={styles.avatarsContainer}>
              <Avatar
                rounded
                size={56}
                containerStyle={{ backgroundColor: "#0003" }}
                source={project.accommodation?.avatarS3[0].small as ImageSourcePropType}
              />
              <View style={styles.swapIconContainer}>
                <AntDesign name="swap" size={10} color="black" />
              </View>
              <Avatar
                rounded
                size={56}
                containerStyle={{ backgroundColor: "#0003" }}
                source={userDetail.avatarS3.small as ImageSourcePropType}
              />
            </View>

            <Pressable style={styles.tourTitleContainer} onPress={copyToClipboard}>
              <Text subtitle2>{project.name}</Text>
              <View style={styles.subtitle}>
                <Feather name="copy" size={12} color="black" />
                <Text subtitle2 style={{ color: theme.colors.grey2 }}>
                  {localizeNumber(invoiceNumber)}
                </Text>
              </View>
            </Pressable>
          </View>

          <Text heading1 style={styles.price}>
            {localizeNumber(formattedTotalPrice)}
          </Text>

          <Button
            size="sm"
            color={theme.colors.success}
            style={styles.successButton}
            icon={
              <AntDesign
                size={16}
                color="black"
                name="checkcircle"
                style={[styles.tickIcon, { color: theme.colors.white }]}
              />
            }>
            {tr("successful transfer")}
          </Button>
        </View>
      </Container>

      <Container style={styles.centerContainer}>
        <View style={[{ borderColor: theme.colors.grey0 }, styles.bottomContent]} />

        <CustomView>
          <Text caption>{tr("time")}</Text>
          <Text caption>
            {Intl.DateTimeFormat("fa-IR", {
              dateStyle: "medium",
              timeStyle: "short",
              hour12: true,
            }).format(moment(modifiedDate, "YYYY-M-DTH").toDate())}
          </Text>
        </CustomView>

        <CustomView>
          <Text caption>{tr("transmitter")}</Text>
          <Text caption>{userDetail.firstname}</Text>
        </CustomView>

        <CustomView>
          <Text caption>{tr("transaction type")}</Text>
          <Text caption>انتقال از کیف پول</Text>
        </CustomView>

        <CustomView>
          <Text caption>{tr("initial deposit")}</Text>
          <Text caption>کیف پول مفید تریپ</Text>
        </CustomView>

        <View style={styles.issueTrackingContainer}>
          <Text caption>{tr("issue tracking")}</Text>
          <Text caption>{localizeNumber(invoiceNumber)}</Text>
        </View>
      </Container>
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    alignItems: "center",
  },
  topContent: { gap: 32 },
  successButton: {
    width: 130,
    margin: "auto",
  },
  bottomContent: {
    borderTopWidth: 1,
    marginVertical: 16,
    borderStyle: "dashed",
  },
  issueTrackingContainer: {
    display: "flex",
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centerContainer: { marginVertical: 27 },
  btnContainer: {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonStyle: {
    width: "50%",
  },
  detailsContainer: {
    width: "100%",
    display: "flex",
    paddingVertical: 12,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarsContainer: {
    gap: 8,
    marginTop: 44,
    display: "flex",
    position: "relative",
    flexDirection: "row",
    marginHorizontal: "auto",
  },
  swapIconContainer: {
    zIndex: 2,
    top: "50%",
    left: "50%",
    borderRadius: 20,
    paddingHorizontal: 5,
    position: "absolute",
    backgroundColor: "#fff",
    transform: "translate(-50%,-50%)",
  },
  tourTitleContainer: { gap: 4, marginTop: 16, alignItems: "center" },
  subtitle: {
    gap: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  price: { textAlign: "center" },
  tickIcon: { marginRight: 6 },
});

export default Receipt;
