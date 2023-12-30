import React from "react";
import moment from "jalali-moment";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar, Button, useTheme } from "@rneui/themed";
import LoadingIndicator from "@modules/Loading-indicator";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import {
  AccommodationQueryType,
  useTourTransactionDetailQuery,
  useUserDetailQuery,
} from "@src/gql/generated";
import { ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useFormatPrice } from "@src/hooks/localization";
import ButtonRow from "@modules/button-rows";
import ShareButton from "@modules/share-button";

const Receipt = () => {
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { id } = useLocalSearchParams();
  const { formatPrice } = useFormatPrice();
  const { localizeNumber } = useLocalizedNumberFormat();

  const { data, loading } = useTourTransactionDetailQuery({
    variables: { pk: id as string },
  });

  const { data: userDetail } = useUserDetailQuery();

  const totalPrice =
    data?.tourTransactionDetail?.tourPackage?.price *
      data?.tourTransactionDetail?.tourGuests?.length || 0;
  const formattedTotalPrice = formatPrice(totalPrice);

  if (loading || !data) {
    return <LoadingIndicator />;
  }

  const { invoiceNumber, modifiedDate, tourPackage } = data?.tourTransactionDetail;

  const CustomView = ({ children }) => {
    const { theme } = useTheme();

    return (
      <View style={[{ borderColor: theme.colors.grey0 }, styles.detailsContainer]}>{children}</View>
    );
  };

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
        <ButtonRow>
          <ShareButton />
          <Button type="outline" onPress={() => router.push("/")}>
            {tr("return to home")}
          </Button>
        </ButtonRow>,
      ]}>
      <Container style={styles.topContainer}>
        <View style={styles.topContent}>
          <View>
            <View style={styles.avatarsContainer}>
              <Avatar
                rounded
                size={56}
                containerStyle={{ backgroundColor: "#0003" }}
                source={tourPackage.tour?.avatarS3[0].small as ImageSourcePropType}
              />
              <View style={styles.swapIconContainer}>
                <AntDesign name="swap" size={10} color="black" />
              </View>
              <Avatar
                rounded
                size={56}
                containerStyle={{ backgroundColor: "#0003" }}
                source={userDetail?.userDetail?.avatarS3?.small as ImageSourcePropType}
              />
            </View>

            <Pressable style={styles.tourTitleContainer} onPress={copyToClipboard}>
              <Text subtitle2>{tourPackage.tour.title}</Text>
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
            color={theme.colors.error}
            titleStyle={styles.buttonTitle}
            icon={
              <AntDesign
                size={16}
                color="black"
                name="closecircle"
                style={[styles.tickIcon, { color: theme.colors.white }]}
              />
            }>
            {tr("unsuccessful payment, wallet balance is not enough")}
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
          <Text caption>{userDetail?.userDetail?.firstname}</Text>
        </CustomView>

        <CustomView>
          <Text caption>{tr("transaction type")}</Text>
          <Text caption>انتقال از کیف پول</Text>
        </CustomView>

        <View style={styles.issueTrackingContainer}>
          <Text caption>{tr("initial deposit")}</Text>
          <Text caption>کیف پول مفید تریپ</Text>
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

  bottomContent: {
    borderTopWidth: 1,
    marginVertical: 16,
    borderStyle: "dashed",
  },
  buttonTitle: { fontSize: 12 },
  issueTrackingContainer: {
    display: "flex",
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centerContainer: { marginVertical: 27 },
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
