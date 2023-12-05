import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ImageSlider from "@modules/image-slider";
import Stepper from "@modules/stepper";
import { BottomSheet, Button, ListItem, Text, useTheme } from "@rneui/themed";
import {
  AccommodationProjectStatusStepChoices,
  MyNgoDetailQuery,
  useMyNgoDetailQuery,
} from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { Divider } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import ComingSoon from "@modules/coming-soon";
import LoadingIndicator from "@modules/Loading-indicator";

const HostDetailScreen = () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { hostId } = useLocalSearchParams();
  const [host, setHost] = useState<MyNgoDetailQuery["NGODetail"]["projectSet"][0]>();
  const steps = [tr("pending"), tr("published")];
  const [isVisible, setIsVisible] = useState(false);

  const { loading, data } = useMyNgoDetailQuery();

  const handleClose = () => setIsVisible(false);

  const activeStep = () => {
    const lookup: Record<string, number> = {
      [AccommodationProjectStatusStepChoices.Request]: 1,
      [AccommodationProjectStatusStepChoices.Accept]: 2,
    };
    return lookup[host.statusStep];
  };

  const handleGoToHost = () =>
    router.push({
      pathname: "/host/" + host.id,
      params: {
        name: host?.name,
      },
    });

  useEffect(() => {
    if (!loading && data) {
      const h = data.NGODetail.projectSet.find(host => host.id === hostId);
      setHost(h);
      navigation.setOptions({ title: h?.name });
    }
  }, [loading, data]);

  if (loading || !host) return <LoadingIndicator />;

  return (
    <ScrollView>
      <WhiteSpace size={10} />
      <Container>
        <ImageSlider imageList={host?.accommodation?.avatarS3} />
        <WhiteSpace size={10} />
        <Text subtitle1 bold>
          {host?.name}
        </Text>
        <Text caption type="grey3">
          آخرین به روز رسانی در
        </Text>
        <WhiteSpace size={20} />
        <Text subtitle1 bold>
          {tr("At what stage is your application?")}
        </Text>
        <Text>{tr("The created hosting is under review by support, after approval by the support team, it will be included in Mofidtrip's hosting list.")}</Text>

        <Stepper
          steps={steps}
          activeStep={activeStep()}
          isActive={host.statusActivation as boolean}
        />
        <WhiteSpace size={10} />
        <Text subtitle1 bold>
          {tr("Host Management")}
        </Text>
      </Container>

      <ListItem bottomDivider onPress={handleGoToHost}>
        <Feather name="eye" size={24} color={theme.colors.black} />
        <ListItem.Content>
          <ListItem.Title>{tr("Host Preview")}</ListItem.Title>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>
      {host.statusStep === AccommodationProjectStatusStepChoices.Accept &&
        host.statusActivation && (
          <ListItem onPress={() => router.push("/comingSoon")}>
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

      <Divider thickness={8} bgColor="grey0" />

      <ListItem onPress={() => setIsVisible(true)}>
        <Feather name="phone" size={24} color={theme.colors.black} />
        <ListItem.Content>
          <ListItem.Title>{tr("Contact Support")}</ListItem.Title>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>

      <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}>
        <ListItem>
          <ListItem.Content>
            <ComingSoon />
            <WhiteSpace size={10} />
            <Button containerStyle={styles.containerStyle} onPress={handleClose}>
              {tr("ok")}
            </Button>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: { width: "100%" },
});

export default HostDetailScreen;
