import React from "react";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar, Button, useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import moment from "jalali-moment";
import { router } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";

const CustomView = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[{ borderColor: theme.colors.grey0 }, styles.detailsContainer]}>{children}</View>
  );
};

const Receipt = () => {
  const { data } = useSelector((state: RootState) => state.tourTransactionSlice);
  const { userDetail } = useSelector((state: RootState) => state.userSlice);
  const { tr } = useTranslation();
  const { theme } = useTheme();

  return (
    <BottomButtonLayout
      buttons={[
        <View style={styles.btnContainer}>
          <Button containerStyle={styles.buttonStyle}>{tr("share")}</Button>
          <Button
            containerStyle={styles.buttonStyle}
            type="outline"
            onPress={() => router.push("/")}>
            {tr("return to home")}
          </Button>
        </View>,
      ]}>
      <Container style={styles.topContainer}>
        <Text style={[{ color: theme.colors.success }, styles.title]} heading2>
          {tr("payment was successful")}
        </Text>

        <View style={styles.topContent}>
          <View>
            <View style={styles.avatarsContainer}>
              <Avatar
                rounded
                size={56}
                containerStyle={{ backgroundColor: "#0003" }}
                source={data.tourPackage.tour.avatarS3[0].small as ImageSourcePropType}
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

            <View style={styles.tourTitleContainer}>
              <Text subtitle2>{data.tourPackage.tour.title}</Text>
              <View style={styles.subtitle}>
                <Feather name="copy" size={12} color="black" />
                <Text subtitle2 style={{ color: theme.colors.grey2 }}>
                  MFT - ۴۵۸۹۲۱۰۹۴۸۳۰۲
                </Text>
              </View>
            </View>
          </View>

          <Text heading1 style={styles.price}>
            {data.tourPackage.price}
          </Text>

          <Button
            color={theme.colors.success}
            icon={
              <AntDesign
                style={[styles.tickIcon, { color: theme.colors.white }]}
                name="checkcircle"
                size={24}
                color="black"
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
            {moment(data.tourPackage.tour.startTime, "YYYY-M-DTH").format("jYYYY/jM/jD")} to
            {moment(data.tourPackage.tour.endTime, "YYYY-M-DTH").format("jYYYY/jM/jD")}
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

        <View style={styles.issueTrackingContainer}>
          <Text caption>{tr("issue tracking")}</Text>
          <Text caption>{data.invoiceNumber}</Text>
        </View>
      </Container>
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  topContainer: { paddingTop: 32, display: "flex", alignItems: "center" },
  title: { fontWeight: "bold" },
  topContent: { gap: 32 },
  bottomContent: {
    marginVertical: 16,
    borderTopWidth: 1,
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
