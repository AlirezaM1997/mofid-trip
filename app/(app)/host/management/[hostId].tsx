import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ImageSlider from "@modules/image-slider";
import Stepper from "@modules/stepper";
import { ListItem, Text, useTheme } from "@rneui/themed";
import {
  ProjectStatusEnum,
  useMyUserDetailProjectSetQuery,
  MyUserDetailProjectSetQuery,
} from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { Divider } from "@rneui/themed";
import { Linking } from "react-native";
import LoadingIndicator from "@modules/Loading-indicator";
import { passedTime } from "@src/helper/date";
import HostManagementStepBaseButton from "@modules/host/management/step-base-button";
import NgoAuthentication from "@modules/ngo/ngoAuthentication";

const HostDetailScreen = () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { hostId } = useLocalSearchParams();
  const [host, setHost] = useState<MyUserDetailProjectSetQuery["userDetail"]["projectSet"][0]>();
  const steps = [tr("pending"), tr("published")];

  const { loading, data } = useMyUserDetailProjectSetQuery();

  const activeStep = () => {
    const lookup: Record<string, number> = {
      [ProjectStatusEnum.Request]: 1,
      [ProjectStatusEnum.Accept]: 2,
    };
    return lookup[host.statusStep];
  };

  const makePhoneCall = () => {
    Linking.openURL("tel:09036495273");
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
      const h = data.userDetail.projectSet.find(host => host.id === hostId);
      setHost(h);
      navigation.setOptions({ title: h?.name });
    }
  }, [loading, data]);

  if (loading || !host) return <LoadingIndicator />;

  return (
    <ScrollView>
      <WhiteSpace size={32} />
      <Container>
        {data.userDetail.isNgo && !data.userDetail.ngo.isVerify && (
          <>
            <NgoAuthentication
              isVerify={data.userDetail.ngo.isVerify}
              description={data.userDetail.ngo.verifyDescription}
            />
            <WhiteSpace size={32} />
          </>
        )}

        <ImageSlider imageList={host?.accommodation?.avatarS3} />
        <WhiteSpace size={10} />
        <Text subtitle1 bold>
          {host?.name}
        </Text>
        <Text caption type="grey3">
          {tr("last modification")}
          {passedTime(host.modifiedDate)}
        </Text>
        <WhiteSpace size={20} />
        <Text subtitle1 bold>
          {tr("At what stage is your application?")}
        </Text>
        <Text caption type="grey3">
          {tr(
            "The created hosting is under review by support, after approval by the support team, it will be included in Mofidtrip's hosting list."
          )}
        </Text>

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
      <HostManagementStepBaseButton host={host} />

      <Divider thickness={8} bgColor="grey0" />

      <ListItem onPress={makePhoneCall}>
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
    </ScrollView>
  );
};

export default HostDetailScreen;
