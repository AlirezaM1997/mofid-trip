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
import {
  ProjectTransactionQueryType,
  TransactionStatusEnum,
  useProjectTransactionEditMutation,
} from "@src/gql/generated";
import moment from "jalali-moment";
import { HEIGHT } from "@src/constants";
import Container from "@atoms/container";
import React, { ReactElement } from "react";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Alert, Linking, Platform, StyleSheet, View } from "react-native";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useSession } from "@src/context/auth";

export type RequestListBottomSheetProps = BottomSheetProps & {
  isVisible: boolean;
  transaction: ProjectTransactionQueryType;
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
  const { theme } = useTheme();
  const { tr } = useTranslation();
  const { session } = useSession();
  const ownerAvatar = transaction?.owner?.avatarS3?.small;
  const { localizeNumber } = useLocalizedNumberFormat();
  const [projectTransactionEdit, { loading }] = useProjectTransactionEditMutation();

  const handleSMS = (num: string) => {
    if (num) {
      if (Platform.OS === "web") {
        Linking.openURL(`sms:${num}`);
      } else {
        Alert.alert("coming soon");
      }
    }
  };

  const handleCall = (num: string) => {
    if (num) {
      if (Platform.OS === "web") {
        Linking.openURL(`phone:${num}`);
      } else {
        Alert.alert("coming soon");
      }
    }
  };

  const submitHandler = async (type: boolean) => {
    const { data } = await projectTransactionEdit({
      variables: {
        data: {
          purchaseRefId: NaN,
          transactionId: transaction.id,
          status: { isActive: type, step: TransactionStatusEnum.Accept },
        },
      },
    });

    if (data?.projectTransactionEdit?.status === "OK") {
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
    return lookup[transaction?.status?.step?.name as string];
  };

  const setGender = () => {
    const lookup: Record<string, string> = {
      MALE: "male",
      FEMALE: "female",
      BOTH: "both genders (male and female)",
    };
    return lookup[transaction?.guest?.gender as string];
  };

  const startDate = localizeNumber(
    moment(transaction?.dateStart)?.locale("fa")?.format("jD jMMMM")
  );
  const endDate = localizeNumber(
    moment(transaction?.dateEnd)?.locale("fa")?.format("jD jMMMM jYYYY")
  );
  const createDate = localizeNumber(
    moment(transaction?.createdDate).locale("fa").format("jD jMMMM jYYYY . HH:mm")
  );

  const step = getCurrentStep();

  const isNgo = JSON.parse(session as string).metadata.is_ngo;

  return (
    <BottomSheet isVisible={isVisible} {...props}>
      <View style={style.bottomSheet}>
        <View style={style.bottomSheetHeader}>
          <WhiteSpace />
          {ownerAvatar ? (
            <Avatar
              rounded
              size={56}
              source={{ uri: transaction?.owner?.avatarS3?.small as string }}
            />
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
            <Text subtitle1>{localizeNumber(transaction?.owner?.fullname as string)}</Text>
            {!isNgo && (
              <Text body2>{localizeNumber(transaction?.owner?.phoneNumber as string)}</Text>
            )}
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
              onPress={() => handleSMS(transaction?.owner?.phoneNumber as string)}
            />
            {!isNgo && (
              <Button
                iconPosition="right"
                icon={<MaterialIcons name="phone-in-talk" size={24} color="black" />}
                type="outline"
                color="secondary"
                size="sm"
                title={tr("making contact")}
                onPress={() => handleCall(transaction?.owner?.phoneNumber as string)}
              />
            )}
          </View>
          <WhiteSpace />
        </View>
        <Divider thickness={8} />

        <Container>
          <WhiteSpace size={24} />
          <View style={{ gap: 16 }}>
            <View style={style.detailBox}>
              <Text body2>{transaction?.project?.name}</Text>
              <Text body2 type="grey2">
                {tr("on-demand hosting")}
              </Text>
            </View>
            <Divider />
            <View style={style.detailBox}>
              <Text body2>{createDate}</Text>
              <Text body2 type="grey2">
                {tr("request time")}
              </Text>
            </View>
            <Divider />
            <View style={style.detailBox}>
              <Text body2>{`${startDate} - ${endDate}`}</Text>
              <Text body2 type="grey2">
                {tr("time of travel")}
              </Text>
            </View>
            <Divider />
            <View style={style.detailBox}>
              <Text body2>{localizeNumber(transaction?.guest?.guestNumber as number)}</Text>
              <Text body2 type="grey2">
                {tr("passengers count")}
              </Text>
            </View>
            <Divider />
            <View style={style.detailBox}>
              <Text body2>{tr(setGender())}</Text>
              <Text body2 type="grey2">
                {tr("gender of passengers")}
              </Text>
            </View>
            <Divider />
            <View style={style.detailBox}>
              <Text body2>{transaction?.guest?.childAccept ? tr("no") : tr("yes")}</Text>
              <Text body2 type="grey2">
                {tr("has a child under 12 years old")}
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
  detailBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
