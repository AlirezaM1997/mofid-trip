import {
  ProjectTransactionQueryType,
  useProjectTransactionDetailQuery,
  useUserDetailQuery,
} from "@src/gql/generated";
import React from "react";
import moment from "jalali-moment";
import Container from "@atoms/container";
import { Chip, Text } from "@rneui/themed";
import * as Clipboard from "expo-clipboard";
import ButtonRow from "@modules/button-rows";
import Toast from "react-native-toast-message";
import ShareButton from "@modules/share-button";
import { totalPrice } from "@src/helper/totalPrice";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar, Button, useTheme } from "@rneui/themed";
import { useFormatPrice } from "@src/hooks/localization";
import LoadingIndicator from "@modules/Loading-indicator";
import { router, useLocalSearchParams } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { ImageSourcePropType, Pressable, StyleSheet, View, ViewStyle } from "react-native";

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
  const { formatPrice } = useFormatPrice();

  const { data, loading } = useProjectTransactionDetailQuery({
    variables: { pk: id as string },
  });

  const { data: userDetail } = useUserDetailQuery();

  const formattedTotalPrice = formatPrice(
    +totalPrice({
      endDate: data?.projectTransactionDetail?.dateEnd,
      startDate: data?.projectTransactionDetail?.dateStart,
      price: data?.projectTransactionDetail?.project?.price as number,
      capacity: data?.projectTransactionDetail?.guest?.guestNumber as number,
    })
  );

  if (!data || loading) {
    return <LoadingIndicator />;
  }

  const { invoiceNumber, modifiedDate, project, purchaseRefId } =
    data?.projectTransactionDetail as ProjectTransactionQueryType;

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
                source={project?.accommodation?.avatarS3?.[0]?.small as ImageSourcePropType}
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
              <Text subtitle2>{project?.name}</Text>
              <View style={styles.subtitle}>
                <Feather name="copy" size={12} color="black" />
                <Text subtitle2 style={{ color: theme.colors.grey2 }}>
                  {invoiceNumber}
                </Text>
              </View>
            </Pressable>
          </View>

          <Text heading1 style={styles.price}>
            {project?.price === 0
              ? tr("it is free")
              : localizeNumber(formattedTotalPrice as string)}
          </Text>

          <Chip
            buttonStyle={styles.chip}
            color={theme.colors.success}
            titleStyle={styles.chipTitle(theme)}
            title={tr("successful transfer")}
            icon={<AntDesign size={16} name="checkcircle" color={theme.colors.white} />}
          />
        </View>
      </Container>

      <Container style={styles.centerContainer}>
        <View style={[{ borderColor: theme.colors.grey0 }, styles.bottomContent]} />

        <CustomView>
          <Text caption>{tr("time")}</Text>
          <Text caption>
            {localizeNumber(moment(modifiedDate).locale("fa").format("D MMMM YYYY . h:mm a"))}
          </Text>
        </CustomView>

        <CustomView>
          <Text caption>{tr("transmitter")}</Text>
          <Text caption>{userDetail?.userDetail?.fullname}</Text>
        </CustomView>

        <CustomView>
          <Text caption>{tr("transaction type")}</Text>
          <Text caption>انتقال از کیف پول</Text>
        </CustomView>

        <CustomView>
          <Text caption>{tr("initial deposit")}</Text>
          <Text caption>کیف پول مفید تریپ</Text>
        </CustomView>

        {project?.price !== 0 && (
          <View style={styles.issueTrackingContainer}>
            <Text caption>{tr("issue tracking")}</Text>
            <Text caption>{localizeNumber(purchaseRefId as number)}</Text>
          </View>
        )}
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
  chip: { padding: 8, gap: 8, margin: "auto" },
  chipTitle: (theme => ({ color: theme.colors.white })) as ViewStyle,
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
