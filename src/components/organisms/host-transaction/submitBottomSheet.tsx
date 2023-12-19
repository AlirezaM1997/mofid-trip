import Container from "@atoms/container";
import { useFormikContext } from "formik";
import { BottomSheet } from "@rneui/themed";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import { Button, Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import {
  ProjectTransactionAddInputType,
  useProjectTransactionAddMutation,
} from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams } from "expo-router";

const HostTransactionSubmitBottomSheet = ({ isVisible, setIsVisible }) => {
  const { tr } = useTranslation();
  const { projectId } = useLocalSearchParams();
  const [submitAdd, { loading }] = useProjectTransactionAddMutation();
  const { values } = useFormikContext<ProjectTransactionAddInputType>();

  const handleAddSubmit = async () => {
    const { data } = await submitAdd({
      variables: {
        data: {
          ...values,
          guests: {
            gender: values.guests.gender,
            childAccept: values.guests.childAccept,
            guestNumber: +values.guests.guestNumber,
          },
          projectId: projectId as string,
        },
      },
    });

    if (data.projectTransactionAdd.status === "OK") {
      Toast.show({
        type: "success",
        text1: tr("Your request has been successfully submitted"),
      });
      router.push("host/transaction");
      setIsVisible(false);
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
          <Button loading={loading} disabled={loading} onPress={handleAddSubmit}>
            {tr("submit request")}
          </Button>
        </ButtonRow>
      </Container>
    </BottomSheet>
  );
};

export default HostTransactionSubmitBottomSheet;
