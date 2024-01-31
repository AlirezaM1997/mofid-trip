import { ListItem, useTheme } from "@rneui/themed";
import { ProjectQueryType, ProjectStatusEnum } from "@src/gql/generated";
import useIsRtl from "@src/hooks/localization";
import useTranslation from "@src/hooks/translation";
import { router } from "expo-router";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, ViewProps } from "react-native";

const HostManagementStepBaseButton = ({ host }) => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const handleNavigate = route => {
    router.push(route);
  };

  return (
    host.statusActivation && (
      <>
        {host.statusStep === ProjectStatusEnum.Request && (
          <>
            <ListItem
              bottomDivider
              onPress={() => handleNavigate(`host/management/edit?hostId=${host.id}`)}>
              <Feather name="users" size={24} color={theme.colors.black} />
              <ListItem.Content>
                <ListItem.Title>{tr("edit host")}</ListItem.Title>
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

        {host.statusStep === ProjectStatusEnum.Accept && (
          <ListItem onPress={() => handleNavigate(`/host/management/request/${host.id}`)}>
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

export default HostManagementStepBaseButton;
