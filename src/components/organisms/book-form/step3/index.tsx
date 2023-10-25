import React from "react";
import { View } from "react-native";
import { Button, Divider, ListItem } from "@rneui/themed";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";
import { Feather } from "@expo/vector-icons";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams } from "expo-router";
import { useFormikContext } from "formik";

type BookFormStep3Props = {
  step: number;
  setStep: (step: number) => {};
};

const BookFormStep3 = ({ setStep }: BookFormStep3Props) => {
  const { tr } = useTranslation();
  const { projectId } = useLocalSearchParams();
  const { id, name } = useSelector(
    (state: RootState) => state.projectSlice.projectDetail
  );

  const { values } = useFormikContext();

  const handleEditAccommodation = () => {
    router.push({
      pathname: `project/${projectId}`,
      params: {
        id: id,
        name: name,
      },
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
              {values.dateStart} - {values.dateEnd}
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
              {values.guests.length}{" "}
              {values.guests.length === 1 ? tr("Person") : tr("Persons")}
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
