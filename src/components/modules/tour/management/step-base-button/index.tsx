import React from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { ListItem, useTheme } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { StyleSheet, ViewProps } from "react-native";
import { TourTourStatusStepChoices } from "@src/gql/generated";

const TourManagementStepBaseButton = ({ tour }) => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const handleNavigate = route => {
    router.push(route);
  };

  return (
    tour.statusActivation && (
      <>
        {tour.statusStep === TourTourStatusStepChoices.Request && (
          <>
            <ListItem
              bottomDivider
              onPress={() => handleNavigate(`tour/management/edit/${tour.id}`)}>
              <Feather name="users" size={24} color={theme.colors.black} />
              <ListItem.Content>
                <ListItem.Title>{tr("edit tour")}</ListItem.Title>
              </ListItem.Content>
              <Feather
                name={isRtl ? "chevron-left" : "chevron-right"}
                size={24}
                color={theme.colors.grey3}
              />
            </ListItem>

            <ListItem onPress={() => {}}>
              <Feather name="users" size={24} color={theme.colors.error} />
              <ListItem.Content>
                <ListItem.Title style={styles.text(theme)}>{tr("cancel request")}</ListItem.Title>
              </ListItem.Content>
              <Feather
                name={isRtl ? "chevron-left" : "chevron-right"}
                size={24}
                color={theme.colors.grey3}
              />
            </ListItem>
          </>
        )}

        {tour.statusStep === TourTourStatusStepChoices.Accept && (
          <ListItem onPress={() => handleNavigate(`/tour/management/request/${tour.id}`)}>
            <Feather name="users" size={24} color={theme.colors.black} />
            <ListItem.Content>
              <ListItem.Title>{tr("Requests And Passengers")}</ListItem.Title>
            </ListItem.Content>
            <Feather
              name={isRtl ? "chevron-left" : "chevron-right"}
              size={24}
              color={theme.colors.grey3}
            />
          </ListItem>
        )}
      </>
    )
  );
};

const styles = StyleSheet.create({
  text: (theme => ({
    color: theme.colors.error,
  })) as ViewProps,
});

export default TourManagementStepBaseButton;
