import { Alert, Linking, Platform, StyleSheet, View } from "react-native";
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
  useTheme,
} from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import {
  MyNgoDetailQuery,
  TourGuestQueryType,
  TransactionStatusEnum,
  useTourTransactionEditMutation,
} from "@src/gql/generated";
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
  refetch: () => void;
  handleClose: () => void;
};

type LookupType = Record<
  string,
  { color: keyof Colors; bottomSheetTitle: string; buttonBox: ReactElement }
>;

const RequestListBottomSheet = ({
  isVisible,
  transaction,
  refetch,
  handleClose,
  ...props
}: RequestListBottomSheetProps) => {
  const { tr } = useTranslation();
  const ownerAvatar = transaction?.owner.avatarS3.small;
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [tourTransactionEdit, { loading }] = useTourTransactionEditMutation();

  const handlePressPhoneIcon = num => {
    if (num) {
      if (Platform.OS === "web") {
        Linking.openURL(`tel:${num}`);
      } else {
        Alert.alert("coming soon");
      }
    }
  };
  const handlePressTextIcon = num => {
    if (num) {
      if (Platform.OS === "web") {
        Linking.openURL(`sms:${num}`);
      } else {
        Alert.alert("coming soon");
      }
    }
  };
  const submitHandler = async type => {
    const { data } = await tourTransactionEdit({
      variables: {
        data: {
          transactionId: transaction.id,
          status: { isActive: type, step: TransactionStatusEnum.Accept },
        },
      },
    });

    if (data.tourTransactionEdit.status === "OK") {
      refetch();
      handleClose();
    }
  };

  const getCurrentStep = () => {
    const lookup: LookupType = {
      ["REQUEST"]: {
        color: "grey3",
        bottomSheetTitle: tr("the request is pending review"),
        buttonBox: (
          <ButtonRow>
            <Button loading={loading} onPress={() => submitHandler(false)} type="outline">
              {tr("request rejection")}
            </Button>
            <Button loading={loading} onPress={() => submitHandler(true)} type="solid">
              {tr("confirm request")}
            </Button>
          </ButtonRow>
        ),
      },
      ["ACCEPT"]: transaction?.status?.isActive
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
      ["PAYMENT"]: {
        color: "info",
        bottomSheetTitle: tr("the passenger paid and the reservation was finalized"),
        buttonBox: (
          <Button containerStyle={style.button} disabled type="outline">
            {tr("request rejection")}
          </Button>
        ),
      },
    };
    return lookup[transaction?.status.step.name];
  };
  const step = getCurrentStep();

  return (
    <BottomSheet isVisible={isVisible} {...props}>
      <View style={style.bottomSheet}>
        <View style={style.bottomSheetHeader}>
          <WhiteSpace />
          {ownerAvatar ? (
            <Avatar rounded size={56} source={{ uri: transaction?.owner.avatarS3.small }} />
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
          <View style={style.bottomSheetHeaderTextBox}>
            <Text subtitle2>
              {localizeNumber(transaction?.owner.fullname)} / {tr("team leader")}
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
              size="sm"
              onPress={() => handlePressTextIcon(transaction?.owner?.phoneNumber)}>
              {tr("message")}
            </Button>
            <Button
              iconPosition="right"
              icon={<MaterialIcons name="phone-in-talk" size={18} color="black" />}
              type="outline"
              color="secondary"
              size="sm"
              onPress={() => handlePressPhoneIcon(transaction?.owner?.phoneNumber)}>
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
                  {guest.avatarS3[0]?.small ? (
                    <Avatar size={40} rounded source={{ uri: guest.avatarS3[0]?.small }} />
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
