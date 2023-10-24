import React from "react";
import { View } from "react-native";
import { Button, Divider, ListItem } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { deepCopy } from "@src/helper/extra";
import { setRedirectToScreenAfterLogin } from "@src/slice/navigation-slice";
import { useIsAuthenticated } from "@src/hooks/user";
import { useUserTransactionAddMutation } from "@src/gql/generated";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import { TransactionState } from "@src/slice/transaction-list-slice";

const preparingDataBeforeSubmit = (transactionData: TransactionState) => {
  const guests = deepCopy(transactionData.guests);
  const newGuests = guests.map((guest) => {
    delete guest["id"];
    return guest;
  });
  return { ...transactionData, guests: newGuests };
};

type BookFormStep3Props = {
  step: number;
  setStep: (step: number) => {};
};

const BookFormStep3 = ({ step, setStep }: BookFormStep3Props) => {
  const { tr } = useTranslation();
  const { projectId } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.transactionSlice);
  const { id, name } = useSelector((state: RootState) => state.projectSlice.projectDetail);
  const isAuthenticated = useIsAuthenticated();
  const [submit, {}] = useUserTransactionAddMutation();
  const transactionData = useSelector((state: RootState) => {
    const { dateEnd, dateStart, description, guests } = state.transactionSlice.data;
    return { dateEnd, dateStart, description, guests };
  });

  const handleEditAccommodation = () => {
    router.push({
      pathname: `project/${projectId}`,
      params: {
        id: id,
        name: name,
      },
    });
  };

  const handleSubmit = () => {
    const newData = preparingDataBeforeSubmit(transactionData);
    if (!isAuthenticated) {
      dispatch(setRedirectToScreenAfterLogin("BookAccommodationScreenStep3"));
      router.push("/login");
      return;
    }
    submit({
      variables: {
        data: { ...newData, projectId: id },
      },
    }).then(({ data }) => {
      if (data?.userTransactionAdd) {
        router.push("/reservation");
        Toast.show({
          type: "success",
          text1: tr("Successful"),
          text2: data.userTransactionAdd.message,
        });
      }
    });
  };

  return (
    <>
      <View style={{ flexGrow: 1 }}>
        <ListItem>
          <Feather name="calendar" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Subtitle>{tr("Travel Date")}</ListItem.Subtitle>
            <ListItem.Title>
              {data.dateStart} - {data.dateEnd}
            </ListItem.Title>
          </ListItem.Content>
          <Button type="clear" onPress={() => setStep(1)}>
            {tr("Edit")}
          </Button>
        </ListItem>
        <ListItem>
          <Feather name="users" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Subtitle>{tr("Passengers")}</ListItem.Subtitle>
            <ListItem.Title>
              {data.guests.length} {data.guests.length === 1 ? tr("Person") : tr("Persons")}
            </ListItem.Title>
          </ListItem.Content>
          <Button type="clear" onPress={() => setStep(2)}>
            {tr("Edit")}
          </Button>
        </ListItem>
        <ListItem>
          <Feather name="home" size={24} color="black" />
          <ListItem.Content>
            <ListItem.Subtitle>{tr("Accommodation")}</ListItem.Subtitle>
            <ListItem.Title>{name}</ListItem.Title>
          </ListItem.Content>
          <Button type="clear" onPress={handleEditAccommodation}>
            {tr("Edit")}
          </Button>
        </ListItem>
      </View>
      <Divider />
    </>
  );
};

export default BookFormStep3;
