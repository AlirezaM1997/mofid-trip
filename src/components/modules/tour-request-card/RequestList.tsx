import { StyleSheet, View } from "react-native";
import React, { ReactElement, useState } from "react";
import {
  Avatar,
  BottomSheet,
  Button,
  Colors,
  Divider,
  ListItem,
  ListItemProps,
  Text,
  useTheme,
} from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import {
  TourGuestQueryType,
  TourTransactionQueryType,
  TransactionStatusEnum,
} from "@src/gql/generated";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { ScrollView } from "react-native-gesture-handler";
import { HEIGHT } from "@src/constants";

type PropsType = ListItemProps & {
  transaction: TourTransactionQueryType;
};

type LookupType = Record<
  string,
  { title: string; color: keyof Colors; bottomSheetTitle: string; buttonBox: ReactElement }
>;

const RequestList = ({ transaction, ...props }: PropsType) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();

  const getCurrentStep = () => {
    const lookup: LookupType = {
      [TransactionStatusEnum.Request]: {
        title: tr("awaiting review"),
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
      [TransactionStatusEnum.Accept]: transaction.status.isActive
        ? {
            title: tr("accepted"),
            color: "success",
            bottomSheetTitle: tr("the request has been approved by you"),
            buttonBox: (
              <Button containerStyle={style.button} disabled type="outline">
                {tr("request rejection")}
              </Button>
            ),
          }
        : {
            title: tr("failed"),
            color: "error",
            bottomSheetTitle: tr("the request was rejected by you"),
            buttonBox: (
              <Button containerStyle={style.button} disabled type="solid">
                {tr("confirm request")}
              </Button>
            ),
          },
      [TransactionStatusEnum.Payment]: {
        title: tr("success receipt"),
        color: "info",
        bottomSheetTitle: tr("the passenger paid and the reservation was finalized"),
        buttonBox: (
          <Button containerStyle={style.button} disabled type="outline">
            {tr("request rejection")}
          </Button>
        ),
      },
    };
    return lookup[transaction.status.step];
  };

  const step = getCurrentStep();
  const avatar = transaction?.owner?.avatarS3?.small;

  return (
    <>
      <ListItem bottomDivider containerStyle={style.ownerCard} {...props}>
        {avatar ? (
          <Avatar rounded size={48} source={{ uri: transaction?.owner?.avatarS3?.small }} />
        ) : (
          <Avatar
            rounded
            size={48}
            icon={{
              name: "user",
              type: "feather",
              size: 26,
            }}
            containerStyle={{ backgroundColor: theme.colors.grey2 }}
          />
        )}

        <ListItem.Content style={style.requestCardTextBox}>
          <Text subtitle2>{transaction.owner.fullname}</Text>
          <Text type={step?.color}>{`${transaction.tourPackage.tour.title} / ${step?.title}`}</Text>
        </ListItem.Content>
        <Text caption style={style.moreDetail}>
          {tr("more details")}
        </Text>
      </ListItem>
    </>
  );
};

const style = StyleSheet.create({
  moreDetail: {
    marginVertical: "auto",
    textDecorationLine: "underline",
  },
  button: {
    flex: 1,
  },
  headerButtonBox: {
    flexDirection: "row",
    gap: 16,
  },
  ownerCard: {
    paddingHorizontal: 0,
  },
  requestCardTextBox: { gap: 4 },
});

export default RequestList;
