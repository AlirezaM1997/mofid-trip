import { MyNgoDetailTourSetQuery, useMyNgoDetailTourSetQuery } from "@src/gql/generated";
import Stepper from "@modules/stepper";
import { Linking } from "react-native";
import { Divider } from "@rneui/themed";
import Container from "@atoms/container";
import { useEffect, useState } from "react";
import WhiteSpace from "@atoms/white-space";
import { Feather } from "@expo/vector-icons";
import { passedTime } from "@src/helper/date";
import useIsRtl from "@src/hooks/localization";
import ImageSlider from "@modules/image-slider";
import useTranslation from "@src/hooks/translation";
import { ListItem, Text, useTheme } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import LoadingIndicator from "@modules/Loading-indicator";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import TourManagementStepBaseButton from "@modules/tour/management/step-base-button";

const TourDetailScreen = () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { tourId } = useLocalSearchParams();
  const steps = [tr("pending"), tr("published"), tr("End Tour")];
  const [tour, setTour] = useState<MyNgoDetailTourSetQuery["NGODetail"]["tourSet"][0]>();

  const { loading, data, refetch } = useMyNgoDetailTourSetQuery();

  const activeStep = () => {
    const lookup: Record<string, number> = {
      REQUEST: 1,
      ACCEPT: 2,
      SUSPENSION: 2,
      END: 3,
    };
    return lookup[tour.statusStep.name];
  };
  const handleNavigateToRequest = () => {
    router.push("/tour/management/request/" + tour.id);
  };

  const makePhoneCall = () => {
    Linking.openURL("tel:09036495273");
  };

  useEffect(() => {
    if (tour) navigation.setOptions({ title: tour?.title });
  }, [tour]);

  useEffect(() => {
    if (!loading && data) {
      const t = data?.NGODetail?.tourSet?.find(t => t?.id === tourId);
      setTour(t);
    }
  }, [loading, data]);

  if (loading || !tour) return <LoadingIndicator />;

  return (
    <ScrollView>
      <WhiteSpace size={32} />
      <Container>
        {/* {!data.NGODetail.isVerify && (
          <>
            <NgoAuthentication
              isVerify={data.NGODetail.isVerify}
              description={data.NGODetail.verifyDescription}
            />
            <WhiteSpace size={32} />
          </>
        )} */}

        <ImageSlider imageList={tour?.avatarS3} />
        <WhiteSpace size={10} />
        <Text subtitle1 bold>
          {tour?.title}
        </Text>
        <Text caption type="grey3">
          {tr("Last modification")}: {passedTime(tour.modifiedDate)}
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

      <TourManagementStepBaseButton tour={tour} refetch={refetch} />

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

export default TourDetailScreen;
