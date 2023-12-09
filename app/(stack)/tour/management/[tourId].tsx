import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ImageSlider from "@modules/image-slider";
import Stepper from "@modules/stepper";
import { BottomSheet, Button, ListItem, Text, useTheme } from "@rneui/themed";
import {
  MyNgoDetailQuery,
  TourTourStatusStepChoices,
  useMyNgoDetailQuery,
} from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import useIsRtl from "@src/hooks/localization";
import { Divider } from "@rneui/themed";
import ComingSoon from "@modules/coming-soon";
import LoadingIndicator from "@modules/Loading-indicator";
import Share from "@modules/share";

const TourDetailScreen = () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { tourId } = useLocalSearchParams();
  const steps = [tr("pending"), tr("published"), tr("End Tour")];
  const [isVisible, setIsVisible] = useState(false);
  const [tour, setTour] = useState<MyNgoDetailQuery["NGODetail"]["tourSet"][0]>();
  const transaction = useRef<MyNgoDetailQuery["NGODetail"]["tourTransactionSet"][0]>();

  const { loading, data } = useMyNgoDetailQuery();

  const activeStep = () => {
    const lookup: Record<string, number> = {
      [TourTourStatusStepChoices.Request]: 1,
      [TourTourStatusStepChoices.Accept]: 2,
      [TourTourStatusStepChoices.End]: 3,
    };
    return lookup[tour.statusStep];
  };
  const handleNavigateToRequest = () => {
    router.push("/tour/management/request/" + tour.id);
  };
  useEffect(() => {
    if (tour) navigation.setOptions({ title: tour?.title ,headerRight: () => <Share/>, });
  }, [tour]);

  useEffect(() => {
    if (!loading && data) {
      const t = data.NGODetail.tourSet.find(t => t.id === tourId);
      setTour(t);
      transaction.current = data.NGODetail.tourTransactionSet.find(
        tr => tr.tourPackage.tour.id === t.id
      );
    }
  }, [loading, data]);

  if (loading || !tour) return <LoadingIndicator />;

  return (
    <ScrollView>
      <WhiteSpace size={10} />
      <Container>
        <ImageSlider imageList={tour?.avatarS3} />
        <WhiteSpace size={10} />
        <Text subtitle1 bold>
          {tour?.title}
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

      <ListItem
        bottomDivider
        onPress={() =>
          router.push({
            pathname: "/tour/" + tour.id,
            params: {
              name: tour.title,
            },
          })
        }>
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
      {tour.statusStep === TourTourStatusStepChoices.Accept && tour.statusActivation && (
        <ListItem onPress={handleNavigateToRequest}>
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

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        <ListItem>
          <ListItem.Content>
            <ComingSoon />
            <WhiteSpace size={10} />
            <Button containerStyle={{ width: "100%" }} onPress={() => setIsVisible(false)}>
              {tr("ok")}
            </Button>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </ScrollView>
  );
};

export default TourDetailScreen;
