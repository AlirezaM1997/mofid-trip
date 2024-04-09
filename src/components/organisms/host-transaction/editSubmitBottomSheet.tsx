import {
  StatusQueryType,
  TransactionStatusEnum,
  ProjectTransactionAddInputType,
  useProjectTransactionEditMutation,
} from "@src/gql/generated";
import { router } from "expo-router";
import Container from "@atoms/container";
import { useFormikContext } from "formik";
import { BottomSheet } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Button, Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import useTranslation from "@src/hooks/translation";

const HostTransactionEditSubmitBottomSheet = ({
  status,
  isVisible,
  setIsVisible,
  transactionId,
}: {
  status: StatusQueryType;
  isVisible: boolean;
  setIsVisible: (item: boolean) => void;
  transactionId: string;
}) => {
  const { tr } = useTranslation();
  const [submit, { loading }] = useProjectTransactionEditMutation();
  const { values } = useFormikContext<ProjectTransactionAddInputType>();

  const handleEditSubmit = async () => {
    const { data } = await submit({
      variables: {
        data: {
          ...values,
          transactionId,
          guests: {
            gender: values.guests.gender,
            childAccept: values.guests.childAccept,
            guestNumber: +values.guests.guestNumber,
          },
          status: {
            step: status?.step?.name as TransactionStatusEnum,
            isActive: status.isActive as boolean,
          },
        },
      },
    });

    if (data?.projectTransactionEdit?.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("Your request has been successfully submitted"),
      });
      setIsVisible(false);
      router.replace("host/transaction");
      router.replace("host/transaction");
    }
  };

  return (
    <BottomSheet isVisible={isVisible}>
      <Container>
        <Text center heading2 bold>
          {tr("are you sure to confirm the request?")}
        </Text>
        <WhiteSpace size={8} />
        <Text center caption type="grey2">
          {tr("your initial request will be approved or rejected by the host after submission")}
        </Text>
        <WhiteSpace size={24} />
        <ButtonRow>
          <Button type="outline" color="secondary" onPress={() => setIsVisible(false)}>
            {tr("cancel and edit")}
          </Button>
          <Button loading={loading} disabled={loading} onPress={handleEditSubmit}>
            {tr("submit request")}
          </Button>
        </ButtonRow>
      </Container>
    </BottomSheet>
  );
};

export default HostTransactionEditSubmitBottomSheet;
