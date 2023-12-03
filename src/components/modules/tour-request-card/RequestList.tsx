import { StyleSheet, View } from "react-native";
import React, { ReactElement } from "react";
import { Avatar, Button, Colors, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { TourTransactionQueryType, TransactionStatusEnum } from "@src/gql/generated";
import RequestListBottomSheet from "./RequestListBottomSheet";

type PropsType ={
  transaction: TourTransactionQueryType;
  tourName: string;
}

type LookupType = Record<
string,
{ title: string; color: keyof Colors; bottomSheetTitle: string; bottomBox: ReactElement }
>

const RequestList = ({
  transaction,
  tourName,
}: PropsType) => {
  const { tr } = useTranslation();
  
  const currentStep = () => {
    const lookup: LookupType = {
      [TransactionStatusEnum.Request]: {
        title: tr("awaiting review"),
        color: "grey3",
        bottomSheetTitle: tr("the request is pending review"),
        bottomBox: (
          <>
            <Button containerStyle={style.button} disabled type="outline">
              {tr("request rejection")}
            </Button>
            <Button containerStyle={style.button} disabled type="solid">
              {tr("confirm request")}
            </Button>
          </>
        ),
      },
      [TransactionStatusEnum.Accept]: transaction.status.isActive
        ? {
            title: tr("accepted"),
            color: "success",
            bottomSheetTitle: tr("the request has been approved by you"),
            bottomBox: (
              <Button containerStyle={style.button} disabled type="outline">
                {tr("request rejection")}
              </Button>
            ),
          }
        : {
            title: tr("failed"),
            color: "error",
            bottomSheetTitle: tr("the request was rejected by you"),
            bottomBox: (
              <Button containerStyle={style.button} disabled type="solid">
                {tr("confirm request")}
              </Button>
            ),
          },
      [TransactionStatusEnum.Payment]: {
        title: tr("success receipt"),
        color: "info",
        bottomSheetTitle: tr("the passenger paid and the reservation was finalized"),
        bottomBox: (
          <Button containerStyle={style.button} disabled type="outline">
            {tr("request rejection")}
          </Button>
        ),
      },
    };
    return lookup[transaction.status.step];
  };
  
  return (
    
      <View style={style.card}>
        <View style={style.avatarNameBox}>
          <Avatar rounded size={48} source={{ uri: transaction.owner.avatarS3.small }} />
          <View style={style.nameBox}>
            <Text subtitle2>{transaction.owner.fullname}</Text>
            <Text caption type={currentStep().color}>
              {!tourName && `${transaction.tourPackage.tour.title} /`} {currentStep().title}
            </Text>
          </View>
        </View>
        <RequestListBottomSheet currentStep={currentStep} transaction={transaction} />
      </View>
    
  );
};

const style = StyleSheet.create({
  button: { flex: 1 },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarNameBox: {
    flexDirection: "row",
    gap: 12,
  },
  nameBox: {
    gap: 4,
    marginVertical: "auto",
  },
});

export default RequestList;
