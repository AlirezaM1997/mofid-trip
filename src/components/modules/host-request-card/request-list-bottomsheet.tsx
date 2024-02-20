import { Alert, Linking, Platform, StyleSheet, View } from "react-native";
import React, { ReactElement } from "react";
import {
  Avatar,
  BottomSheet,
  BottomSheetProps,
  Button,
  Colors,
  Divider,
  Text,
  useTheme,
} from "@rneui/themed";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import {
  MyNgoDetailQuery,
  TransactionStatusEnum,
  useProjectTransactionEditMutation,
} from "@src/gql/generated";
import { Ionicons } from "@expo/vector-icons";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { HEIGHT } from "@src/constants";
import moment from "jalali-moment";

export type RequestListBottomSheetProps = BottomSheetProps & {
  isVisible: boolean;
  transaction: MyNgoDetailQuery["NGODetail"]["projectTransactionSet"][number];
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
  const [projectTransactionEdit, { loading }] = useProjectTransactionEditMutation();

  const handleSMS = num => {
    if (num) {
      if (Platform.OS === "web") {
        Linking.openURL(`sms:${num}`);
      } else {
        Alert.alert("coming soon");
      }
    }
  };

  const handleCall = num => {
    if (num) {
      if (Platform.OS === "web") {
        Linking.openURL(`tel:${num}`);
      } else {
        Alert.alert("coming soon");
      }
    }
  };

  const submitHandler = async type => {
    const { data } = await projectTransactionEdit({
      variables: {
        data: {
          purchaseRefId: NaN,
          transactionId: transaction.id,
          status: { isActive: type, step: TransactionStatusEnum.Accept },
        },
      },
    });

    if (data.projectTransactionEdit.status === "OK") {
      refetch();
      handleClose();
    }
  };

  const getCurrentStep = () => {
    const lookup: LookupType = {
      REQUEST: {
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
      ACCEPT: transaction?.status?.isActive
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
              <Button disabled containerStyle={style.button} type="solid">
                {tr("confirm request")}
              </Button>
            ),
          },
      PAYMENT: {
        color: "info",
        bottomSheetTitle: tr("the ngo is paid and the reservation is finalized"),
        buttonBox: (
          <Button containerStyle={style.button} disabled type="outline">
            {tr("request rejection")}
          </Button>
        ),
      },
    };
    return lookup[transaction?.status.step.name];
  };

  const startDate = localizeNumber(
    moment(transaction?.dateStart)?.locale("fa")?.format("jDD jMMMM")
  );
  const endDate = localizeNumber(
    moment(transaction?.dateEnd)?.locale("fa")?.format("jDD jMMMM jYYYY")
  );

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
            <Text subtitle1>{localizeNumber(transaction?.owner.fullname)}</Text>
            <Text body2>{localizeNumber(transaction?.owner.phoneNumber)}</Text>
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
              title={tr("send Message")}
              onPress={() => handleSMS(transaction?.owner?.phoneNumber)}></Button>
            <Button
              iconPosition="right"
              icon={<Ionicons name="chatbubble-ellipses" size={18} color="black" />}
              type="outline"
              color="secondary"
              size="sm"
              title={tr("Call")}
              onPress={() => handleCall(transaction?.owner?.phoneNumber)}></Button>
          </View>
          <WhiteSpace />
        </View>
        <Divider thickness={8} />

        <Container>
          <WhiteSpace size={24} />
          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text body2>{transaction?.project?.name}</Text>
              <Text body2 type="grey2">
                {tr("on-demand hosting")}
              </Text>
            </View>
            <Divider />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text body2>{`${startDate} - ${endDate}`}</Text>
              <Text body2 type="grey2">
                {tr("time of travel")}
              </Text>
            </View>
            <Divider />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text body2>{localizeNumber(transaction?.guest.guestNumber)}</Text>
              <Text body2 type="grey2">
                {tr("passengers count")}
              </Text>
            </View>
          </View>
        </Container>
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
  button: {
    flex: 1,
  },
});

export default RequestListBottomSheet;
