import { StyleSheet } from "react-native";
import { TourTransactionQueryType } from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { Avatar, Colors, ListItem, ListItemProps, Text, useTheme } from "@rneui/themed";

type PropsType = ListItemProps & {
  transaction: TourTransactionQueryType;
};

type LookupType = Record<string, { title: string; color: keyof Colors }>;

const RequestList = ({ transaction, ...props }: PropsType) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const { localizeNumber } = useLocalizedNumberFormat();

  const getCurrentStep = () => {
    const lookup: LookupType = {
      REQUEST: {
        title: tr("awaiting review"),
        color: "grey3",
      },
      ACCEPT: transaction?.status?.isActive
        ? {
            title: tr("accepted"),
            color: "success",
          }
        : {
            title: tr("failed"),
            color: "error",
          },
      PAYMENT: {
        title: tr("success receipt"),
        color: "info",
      },
      SUCCESSFUL: {
        title: tr("finish the trip"),
        color: "grey3",
      },
    };
    return lookup[transaction?.status?.step?.name as string];
  };

  const step = getCurrentStep();
  const avatar = transaction?.owner?.avatarS3?.small;

  return (
    <>
      <ListItem bottomDivider containerStyle={style.ownerCard} {...props}>
        {avatar ? (
          <Avatar rounded size={48} source={{ uri: transaction?.owner?.avatarS3?.small as string }} />
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
          <Text subtitle2>{localizeNumber(transaction?.owner?.fullname as string)}</Text>
          <Text type={step?.color}>{step?.title}</Text>
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
  ownerCard: {
    paddingHorizontal: 0,
  },
  requestCardTextBox: { gap: 4 },
});

export default RequestList;
