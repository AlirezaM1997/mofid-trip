import { StyleSheet } from "react-native";
import { Avatar, Colors, ListItem, ListItemProps, Text, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { TourTransactionQueryType, TransactionStatusEnum } from "@src/gql/generated";

type PropsType = ListItemProps & {
  transaction: TourTransactionQueryType;
};

type LookupType = Record<string, { title: string; color: keyof Colors }>;

const RequestList = ({ transaction, ...props }: PropsType) => {
  const { tr } = useTranslation();
  const { theme } = useTheme();

  const getCurrentStep = () => {
    const lookup: LookupType = {
      [TransactionStatusEnum.Request]: {
        title: tr("awaiting review"),
        color: "grey3",
      },
      [TransactionStatusEnum.Accept]: transaction.status.isActive
        ? {
            title: tr("accepted"),
            color: "success",
          }
        : {
            title: tr("failed"),
            color: "error",
          },
      [TransactionStatusEnum.Payment]: {
        title: tr("success receipt"),
        color: "info",
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
  ownerCard: {
    paddingHorizontal: 0,
  },
  requestCardTextBox: { gap: 4 },
});

export default RequestList;
