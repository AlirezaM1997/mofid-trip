import { BottomSheet, Button, ListItem, Text, useTheme } from "@rneui/themed";
import { ProjectQueryType, ProjectStatusEnum, useProjectEditMutation } from "@src/gql/generated";
import useIsRtl from "@src/hooks/localization";
import useTranslation from "@src/hooks/translation";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import React, { useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { StyleSheet, ViewProps } from "react-native";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";

const HostManagementStepBaseButton = ({ host, refetch }: { host: ProjectQueryType }) => {
  const isRtl = useIsRtl();
  const { theme } = useTheme();
  const { tr } = useTranslation();

  const [isVisibleStopReserve, setIsVisibleStopReserve] = useState<boolean>(false);
  const [isVisibleContinueReserve, setIsVisibleContinueReserve] = useState<boolean>(false);

  const [projectEdit] = useProjectEditMutation();

  const handleOpenStopReserve = () => setIsVisibleStopReserve(true);
  const handleCloseStopReserve = () => setIsVisibleStopReserve(false);
  const handleOpenContinueReserve = () => setIsVisibleContinueReserve(true);
  const handleCloseContinueReserve = () => setIsVisibleContinueReserve(false);

  const handleStopReserve = async () => {
    const { data } = await projectEdit({ variables: { data: { pk: host.id, status: { step: ProjectStatusEnum.Suspension } } } })
    if(data?.projectEdit?.status === "OK"){
      Toast.show({
        type: "success",
        text1: tr("Successful"),
        text2: tr("unregister successfully"),
      });
      handleCloseStopReserve();
      refetch();
    }
  }
  const handleContinueReserve = async () => {
    const { data } = await projectEdit({ variables: { data: { pk: host.id, status: { step: ProjectStatusEnum.Accept } } } })
    if(data?.projectEdit?.status === "OK"){
      Toast.show({
        type: "success",
        text1: tr("Successful"),
        text2: tr("continue registration successfully"),
      });
      handleCloseContinueReserve();
      refetch();
    }
  }

  const handleNavigate = route  => {
    router.push(route);
  };

  return (
    host.statusActivation && (
      <>
        {host.statusStep === ProjectStatusEnum.Request && (
          <>
            <ListItem
              bottomDivider
              onPress={() => handleNavigate(`host/management/${host.id}/edit`)}>
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
                <ListItem.Title style={styles.textError(theme)}>{tr("cancel request")}</ListItem.Title>
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
          <>
            <ListItem bottomDivider onPress={() => handleNavigate(`/host/management/request/${host.id}`)}>
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

            <ListItem onPress={handleOpenStopReserve}>
              <FontAwesome name="stop-circle-o" size={24} color={theme.colors.error} />
              <ListItem.Content>
                <ListItem.Title style={styles.textError(theme)}>{tr("registration stop")}</ListItem.Title>
              </ListItem.Content>
              <Feather
                name={isRtl ? "chevron-left" : "chevron-right"}
                size={24}
                color={theme.colors.error}
              />
            </ListItem>
          </>
        )}

        {host.statusStep === ProjectStatusEnum.Suspension && (
          <>
            <ListItem bottomDivider onPress={() => handleNavigate(`/host/management/request/${host.id}`)}>
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

            <ListItem onPress={handleOpenContinueReserve}>
              <FontAwesome name="play-circle-o" size={24} color={theme.colors.success} />
              <ListItem.Content>
                <ListItem.Title style={styles.textSuccess(theme)}>{tr("continue registration")}</ListItem.Title>
              </ListItem.Content>
              <Feather
                name={isRtl ? "chevron-left" : "chevron-right"}
                size={24}
                color={theme.colors.success}
              />
            </ListItem>
          </>
        )}
        <BottomSheet isVisible={isVisibleStopReserve} onBackdropPress={handleCloseStopReserve}>
          <Container style={{ gap: 16 }}>
            <Text heading2 bold center>
              {tr("are you sure to stop registering?")}
            </Text>
            <Text center>
              {tr(
                "by stopping the registration, other users will not be able to register a request for you."
              )}
            </Text>
            <WhiteSpace size={0} />
            <ButtonRow>
              <Button
                onPress={handleCloseStopReserve}
                type="outline">
                {tr("cancel")}
              </Button>
              <Button onPress={handleStopReserve}>
                {tr("registration stop")}
              </Button>
            </ButtonRow>
          </Container>
        </BottomSheet>
        <BottomSheet isVisible={isVisibleContinueReserve} onBackdropPress={handleCloseContinueReserve}>
          <Container>
            <Text heading2 bold center>
              {tr("are you sure to continue registration?")}
            </Text>
            <Text center>
              {tr(
                "by continuing to register, users can register their request to use your hosting as before."
              )}
            </Text>
            <WhiteSpace size={0} />
            <ButtonRow>
              <Button
                onPress={handleCloseContinueReserve}
                type="outline">
                {tr("cancel")}
              </Button>
              <Button onPress={handleContinueReserve}>
                {tr("Continue registration")}
              </Button>
            </ButtonRow>
          </Container>
        </BottomSheet>
      </>
    )
  );
};

const styles = StyleSheet.create({
  textError: (theme => ({
    color: theme.colors.error,
  })) as ViewProps,
  textSuccess: (theme => ({
    color: theme.colors.success,
  })) as ViewProps,
});

export default HostManagementStepBaseButton;
