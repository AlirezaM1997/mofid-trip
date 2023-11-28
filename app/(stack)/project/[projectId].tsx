import { Button } from "@rneui/themed";
import { Divider } from "@rneui/themed";
import React, { useEffect } from "react";
import Map from "@src/components/modules/map";
import { Text } from "@rneui/themed";
import Toast from "react-native-toast-message";
import { getCapacity } from "@src/helper/tour";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import { useProjectDetailQuery } from "@src/gql/generated";
import { StyleSheet, View } from "react-native";
import WhiteSpace from "@src/components/atoms/white-space";
import { setProjectDetail } from "@src/slice/project-slice";
import ProjectTags from "@src/components/modules/project-tags";
import ContactCard from "@src/components/modules/contact-card";
import SimilarProjects from "@src/components/modules/similar-projects";
import LoadingIndicator from "@src/components/modules/Loading-indicator";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import ProjectFacilities from "@src/components/modules/project-facilities";
import ProjectBoldFeatures from "@src/components/modules/project-bold-features";
import ImageSlider from "@modules/image-slider";

const Page: React.FC = ({ ...props }) => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { projectId, name } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();

  const { loading, data } = useProjectDetailQuery({
    variables: {
      pk: projectId as string,
    },
  });

  const handlePress = () => {
    if (getCapacity(data?.projectDetail?.capacity) === 0) {
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: "There is no free capacity",
      });
      return;
    }
    router.push({ pathname: "host/create/capacity", params: { projectId, name } });
  };

  useEffect(() => {
    if (!loading && data) {
      dispatch(setProjectDetail(data.projectDetail));
    }
  }, [loading, data]);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name]);

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <ScrollView style={style.scrollView}>
        <WhiteSpace size={10} />
        <Container style={style.container}>
          <ImageSlider imageList={data.projectDetail.accommodation.avatarS3} />

          <ProjectTags tags={data?.projectDetail?.tags ?? []} />

          <View style={style.infoContainer}>
            <Text variant="heading1">{data.projectDetail?.accommodation?.name}</Text>
            <Text variant="heading2">{data.projectDetail?.accommodation?.address}</Text>
          </View>

          <ProjectBoldFeatures capacity={data?.projectDetail?.capacity ?? 0} />

          <View style={style.infoContainer}>
            <Text variant="heading1">{tr("Description")}</Text>
            <Text variant="body1">{data.projectDetail?.accommodation?.description}</Text>
          </View>

          <ProjectFacilities facilities={data.projectDetail?.facilities} />

          {isFocused && (
            <Map
              lat={data.projectDetail?.accommodation?.lat}
              lng={data.projectDetail?.accommodation?.lng}
            />
          )}

          <ContactCard user={data?.projectDetail?.creator ?? {}} />

          <SimilarProjects
            currentProjectId={projectId}
            projects={data.projectDetail?.creator?.projectSet}
          />
        </Container>
        <WhiteSpace size={10} />
      </ScrollView>

      <Divider />
      <View style={style.bottomActionContainer}>
        <View style={style.left}>
          <Text style={style.priceTitle}>{tr("Price")}</Text>
          <View style={style.priceContainer}>
            <Text variant="body1" style={style.priceNumber}>
              ${localizeNumber(data.projectDetail?.price)}
            </Text>
            <Text style={style.priceText}> / {tr("Night")}</Text>
          </View>
        </View>
        <Button containerStyle={style.right} size="lg" onPress={handlePress}>
          {tr("Book Now")}
        </Button>
      </View>
    </>
  );
};
const style = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: { gap: 20 },
  infoContainer: { gap: 5 },
  bottomActionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    elevation: 1,
    borderTopWidth: 0,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  priceTitle: {
    // color: "grey"
  },
  priceNumber: { fontWeight: "bold", fontSize: 16 },
  priceText: { fontWeight: "bold" },
  left: {
    flex: 1,
  },
  right: {
    flex: 2,
  },
});

export default Page;
