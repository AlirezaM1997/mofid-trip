import React from "react";
import Text from "@atoms/text";
import Container from "@atoms/container";
import { StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar, Button, useTheme } from "@rneui/themed";

const CustomView = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={[{ borderColor: theme.colors.grey0 }, styles.detailsContainer]}>{children}</View>
  );
};

const SuccessPayment = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  return (
    <>
      <Container style={styles.topContainer}>
        <Text style={[{ color: theme.colors.success }, styles.title]} variant="heading2">
          {tr("payment was successful")}
        </Text>

        <View style={styles.topContent}>
          <View>
            <View style={styles.avatarsContainer}>
              <Avatar size={56} rounded containerStyle={{ backgroundColor: "#0003" }} />
              <View style={styles.swapIconContainer}>
                <AntDesign name="swap" size={10} color="black" />
              </View>
              <Avatar size={56} rounded containerStyle={{ backgroundColor: "#0003" }} />
            </View>

            <View style={styles.tourTitleContainer}>
              <Text variant="subtitle2">تور ماسوله و مرداب سراوان</Text>
              <View style={styles.subtitle}>
                <Feather name="copy" size={12} color="black" />
                <Text variant="subtitle2" style={{ color: theme.colors.grey2 }}>
                  MFT - ۴۵۸۹۲۱۰۹۴۸۳۰۲
                </Text>
              </View>
            </View>
          </View>

          <Text variant="heading1" style={styles.price}>
            ۲۰۰۰ تومان
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
          <Text variant="caption">{tr("time")}</Text>
          <Text variant="caption">سه شنبه ۹ آبان . ۰۹:۴۵ ق.ظ</Text>
        </CustomView>

        <CustomView>
          <Text variant="caption">{tr("transmitter")}</Text>
          <Text variant="caption">سیدمحمدحسین میرشفیعی</Text>
        </CustomView>

        <CustomView>
          <Text variant="caption">{tr("transaction type")}</Text>
          <Text variant="caption">انتقال از کیف پول</Text>
        </CustomView>

        <View style={styles.issueTrackingContainer}>
          <Text variant="caption">{tr("issue Tracking")}</Text>
          <Text variant="caption">۸۰۳۳۹۹</Text>
        </View>
      </Container>

      <Container style={styles.bottomContainer}>
        <View style={styles.btnContainer}>
          <Button>{tr("share")}</Button>
          <Button type="outline">{tr("return to home")}</Button>
        </View>
      </Container>
    </>
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
  bottomContainer: { paddingBottom: 32, display: "flex", alignItems: "center" },
  btnContainer: {
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  tourTitleContainer: { gap: 4, marginTop: 16 },
  subtitle: {
    gap: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  price: { textAlign: "center" },
  tickIcon: { marginLeft: 6 },
});

export default SuccessPayment;
