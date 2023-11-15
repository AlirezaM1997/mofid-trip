import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ImageSlider from "@modules/image-slider";
import Stepper from "@modules/stepper";
import { ListItem, Text, useTheme } from "@rneui/themed";
import { MyNgoDetailQuery, TourTourStatusStepChoices } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { Divider } from "@rneui/themed";

const TourDetailScreen = () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { tourStr } = useLocalSearchParams();
  const tour: MyNgoDetailQuery["NGODetail"]["tourSet"][0] = JSON.parse(tourStr as string);
  const steps = [tr("pending"), tr("published"), tr("End Tour")];

  const activeStep = () => {
    const lookup: Record<string, number> = {
      [TourTourStatusStepChoices.Accept]: 1,
      [TourTourStatusStepChoices.Request]: 2,
      [TourTourStatusStepChoices.End]: 3,
    };
    return lookup;
  };

  useEffect(() => {
    navigation.setOptions({ title: tour.title });
  }, []);

  return (
    <ScrollView>
      <WhiteSpace size={10} />
      <Container>
        <ImageSlider imageList={tour.avatarS3} />
        <WhiteSpace size={10} />
        <Text subtitle1 bold>
          {tour.title}
        </Text>
        <Text caption type="grey3">
          آخرین به روز رسانی در
        </Text>
        <WhiteSpace size={20} />
        <Text subtitle1 bold>
          {tr("At what stage is your application?")}
        </Text>
        <Text>یه متن سید به ما میده که اینجا نشونش خواهیم داد</Text>

        <Stepper
          steps={steps}
          activeStep={activeStep()}
          isActive={tour.statusActivation as boolean}
        />
        <WhiteSpace size={10} />
        <Text subtitle1 bold>
          {tr("Tour Management")}
        </Text>
      </Container>

      <ListItem bottomDivider onPress={() => router.push("/comingSoon")}>
        <Feather name="eye" size={24} color={theme.colors.black} />
        <ListItem.Content>
          <ListItem.Title>{tr("Tour Preview")}</ListItem.Title>
        </ListItem.Content>
        <Feather
          name={isRtl ? "chevron-left" : "chevron-right"}
          size={24}
          color={theme.colors.grey3}
        />
      </ListItem>
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

      <Divider thickness={8} bgColor="grey0" />

      <ListItem onPress={() => router.push("/comingSoon")}>
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

export default TourDetailScreen;
