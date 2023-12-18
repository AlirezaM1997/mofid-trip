import Container from "@atoms/container";
import { useFormikContext } from "formik";
import { BottomSheet } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Button, Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import {
  ProjectTransactionAddInputType,
  useProjectTransactionEditMutation,
} from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { router } from "expo-router";

const HostTransactionEditSubmitBottomSheet = ({
  status,
  isVisible,
  setIsVisible,
  transactionId,
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
          status: { step: status.step, isActive: status.isActive },
        },
      },
    });

    if (data.projectTransactionEdit.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("Your request has been successfully submitted"),
      });
      router.push("host/transaction");
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
