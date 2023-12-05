import { StyleSheet, View } from "react-native";
import React, { ReactElement } from "react";
import {
  Avatar,
  BottomSheet,
  BottomSheetProps,
  Button,
  Colors,
  Divider,
  ListItem,
  Text,
} from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { MyNgoDetailQuery, TourGuestQueryType, TransactionStatusEnum } from "@src/gql/generated";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { ScrollView } from "react-native-gesture-handler";
import { HEIGHT } from "@src/constants";

export type RequestListBottomSheetProps = BottomSheetProps & {
  isVisible: boolean;
  transaction: MyNgoDetailQuery["NGODetail"]["tourTransactionSet"][0];
};

type LookupType = Record<
  string,
  { color: keyof Colors; bottomSheetTitle: string; buttonBox: ReactElement }
>;

const RequestListBottomSheet = ({
  isVisible,
  transaction,
  ...props
}: RequestListBottomSheetProps) => {
  const { tr } = useTranslation();

  const { localizeNumber } = useLocalizedNumberFormat();

  const getCurrentStep = () => {
    const lookup: LookupType = {
      [TransactionStatusEnum.Request]: {
        color: "grey3",
        bottomSheetTitle: tr("the request is pending review"),
        buttonBox: (
          <ButtonRow>
            <Button disabled type="outline">
              {tr("request rejection")}
            </Button>
            <Button disabled type="solid">
              {tr("confirm request")}
            </Button>
          </ButtonRow>
        ),
      },
      [TransactionStatusEnum.Accept]: transaction?.status?.isActive
        ? {
            color: "success",
            bottomSheetTitle: tr("the request has been approved by you"),
            buttonBox: (
              <Button containerStyle={style.button} disabled type="outline">
                {tr("request rejection")}
              </Button>
            ),
          }
        : {
            color: "error",
            bottomSheetTitle: tr("the request was rejected by you"),
            buttonBox: (
              <Button containerStyle={style.button} disabled type="solid">
                {tr("confirm request")}
              </Button>
            ),
          },
      [TransactionStatusEnum.Payment]: {
        color: "info",
        bottomSheetTitle: tr("the passenger paid and the reservation was finalized"),
        buttonBox: (
          <Button containerStyle={style.button} disabled type="outline">
            {tr("request rejection")}
          </Button>
        ),
      },
    };
    return lookup[transaction?.status.step];
  };

  const step = getCurrentStep();

  return (
    <BottomSheet isVisible={isVisible} {...props}>
      <View style={style.bottomSheet}>
        <View style={style.bottomSheetHeader}>
          <WhiteSpace />
          <Avatar rounded size={56} source={{ uri: transaction?.owner.avatarS3.small }} />
          <View style={style.bottomSheetHeaderTextBox}>
            <Text subtitle2>
              {transaction?.owner.fullname} / {tr("team leader")}
            </Text>
            <Text caption type="grey2">
              {localizeNumber(transaction?.owner.phoneNumber)}
            </Text>
            <Text caption type={step?.color}>
              {step?.bottomSheetTitle}
            </Text>
          </View>
          <View style={style.headerButtonBox}>
            <Button
              iconPosition="right"
              icon={<Ionicons name="chatbubble-ellipses" size={18} color="black" />}
              type="outline"
              color="secondary"
              size="sm">
              {tr("message")}
            </Button>
            <Button
              iconPosition="right"
              icon={<MaterialIcons name="phone-in-talk" size={18} color="black" />}
              type="outline"
              color="secondary"
              size="sm">
              {tr("contact")}
            </Button>
          </View>
          <WhiteSpace />
        </View>
        <Divider thickness={8} />

        <ScrollView contentContainerStyle={style.guestListScrollView}>
          <Container>
            <WhiteSpace />
            <Text body2 type="grey2">{`${tr("accompanying passengers")} (${localizeNumber(
              transaction?.tourGuests.length
            )} ${tr("person")})`}</Text>
            {transaction?.tourGuests.map((guest: TourGuestQueryType, i) => (
              <>
                <ListItem
                  key={guest.id}
                  bottomDivider
                  containerStyle={{ direction: "rtl", paddingHorizontal: 0 }}>
                  <Avatar size={40} rounded source={{ uri: guest.avatarS3[0]?.small }} />
                  <ListItem.Content>
                    <Text subtitle2>
                      {guest.firstname} {guest.lastname}
                    </Text>
                    <Text caption type="grey3">
                      {localizeNumber(guest.phoneNumber)}
                    </Text>
                  </ListItem.Content>
                </ListItem>
              </>
            ))}
          </Container>
        </ScrollView>
        <WhiteSpace size={24} />
        <Container>{step?.buttonBox}</Container>
      </View>
    </BottomSheet>
  );
};

const style = StyleSheet.create({
  headerButtonBox: {
    flexDirection: "row",
    gap: 16,
  },
  bottomSheet: {
    maxHeight: HEIGHT - 100,
  },
  bottomSheetHeader: {
    alignItems: "center",
    gap: 16,
  },
  bottomSheetHeaderTextBox: {
    alignItems: "center",
    gap: 4,
  },
  guestListScrollView: {
    flex: 1,
  },
  button: {
    flex: 1,
  },
});

export default RequestListBottomSheet;
