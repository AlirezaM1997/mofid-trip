import React from "react";
import { Text } from "@rneui/themed";
import { View } from "react-native";
import Container from "@atoms/container";
import useTranslation from "@src/hooks/translation";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar, Button, useTheme } from "@rneui/themed";

const CustomView = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        paddingVertical: 12,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: theme.colors.grey0,
      }}>
      {children}
    </View>
  );
};

const SuccessPayment = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  return (
    <>
      <Container style={{ paddingTop: 32, display: "flex", alignItems: "center" }}>
        <Text style={{ color: theme.colors.success, fontWeight: "bold" }} variant="heading2">
          {tr("payment was successful")}
        </Text>

        <View style={{ gap: 32 }}>
          <View>
            <View
              style={{
                gap: 8,
                marginTop: 44,
                display: "flex",
                position: "relative",
                flexDirection: "row",
                marginHorizontal: "auto",
              }}>
              <Avatar size={56} rounded containerStyle={{ backgroundColor: "#0003" }} />
              <View
                style={{
                  zIndex: 2,
                  top: "50%",
                  left: "50%",
                  borderRadius: 20,
                  paddingHorizontal: 5,
                  position: "absolute",
                  backgroundColor: "#fff",
                  transform: "translate(-50%,-50%)",
                }}>
                <AntDesign name="swap" size={10} color="black" />
              </View>
              <Avatar size={56} rounded containerStyle={{ backgroundColor: "#0003" }} />
            </View>

            <View style={{ gap: 4, marginTop: 16 }}>
              <Text variant="subtitle2">تور ماسوله و مرداب سراوان</Text>
              <View
                style={{
                  gap: 8,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Feather name="copy" size={12} color="black" />
                <Text variant="subtitle2" style={{ color: theme.colors.grey2 }}>
                  MFT - ۴۵۸۹۲۱۰۹۴۸۳۰۲
                </Text>
              </View>
            </View>
          </View>

          <Text variant="heading1" style={{ textAlign: "center" }}>
            ۲۰۰۰ تومان
          </Text>

          <Button
            color={theme.colors.success}
            icon={
              <AntDesign
                style={{ marginLeft: 6, color: "#fff" }}
                name="checkcircle"
                size={24}
                color="black"
              />
            }>
            {tr("successful transfer")}
          </Button>
        </View>
      </Container>

      <Container style={{ marginVertical: 27 }}>
        <View
          style={{
            marginVertical: 16,
            borderTopWidth: 1,
            borderStyle: "dashed",
            borderColor: theme.colors.grey0,
          }}
        />

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

        <View
          style={{
            display: "flex",
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text variant="caption">{tr("initial deposit")}</Text>
          <Text variant="caption">۸۰۳۳۹۹</Text>
        </View>
      </Container>

      <Container style={{ paddingBottom: 32, display: "flex", alignItems: "center" }}>
        <View
          style={{
            gap: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Button>{tr("share")}</Button>
          <Button type="outline">{tr("return to home")}</Button>
        </View>
      </Container>
    </>
  );
};

export default SuccessPayment;
