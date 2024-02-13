import BottomButtonLayout from "@components/layout/bottom-button";
import BookHostBottomSheet from "@modules/host/book/bottomSheet";
import ImageSlider from "@modules/image-slider";
import ShareReportDropDown from "@modules/share-report-dropdown";
import { useIsFocused } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import Container from "@src/components/atoms/container";
import LoadingIndicator from "@src/components/modules/Loading-indicator";
import ProjectBoldFeatures from "@src/components/modules/host/bold-features";
import ProjectFacilities from "@src/components/modules/host/facilities";
import ProjectTags from "@src/components/modules/host/tags";
import Map from "@src/components/modules/map/index.web";
import SimilarProjects from "@src/components/modules/similar-projects";
import { ProjectQueryType, useProjectDetailQuery } from "@src/gql/generated";
import openMapHandler from "@src/helper/opem-map";
import useTranslation from "@src/hooks/translation";
import { setProjectDetail } from "@src/slice/project-slice";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import HostComment from "@modules/host/comment";

const Page: React.FC = ({ ...props }) => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { projectId } = useLocalSearchParams();

  const { loading, data } = useProjectDetailQuery({
    variables: {
      pk: projectId as string,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      dispatch(setProjectDetail(data.projectDetail));
    }
  }, [loading, data]);

  if (loading) return <LoadingIndicator />;

  navigation.setOptions({
    title: (data?.projectDetail as ProjectQueryType)?.name,
    headerRight: () => <ShareReportDropDown />,
  });

  const {
    name,
    tags,
    creator,
    dateEnd,
    capacity,
    dateStart,
    categories,
    facilities,
    description,
    accommodation,
  } = data?.projectDetail as ProjectQueryType;

  return (
    <BottomButtonLayout
      buttons={[<BookHostBottomSheet project={data?.projectDetail as ProjectQueryType} />]}>
      <ScrollView style={style.scrollView}>
        <Container style={style.container}>
          <ImageSlider imageList={accommodation?.avatarS3} />

          <ProjectTags tags={tags ?? []} />

          <View style={style.infoContainer}>
            <Text heading2>{name}</Text>
            <Text caption>{accommodation?.address}</Text>
          </View>

          <ProjectBoldFeatures
            dateEnd={dateEnd}
            dateStart={dateStart}
            capacity={capacity?.guestNumber ?? 0}
            category={categories?.[0]?.name}
          />

          {description && (
            <View style={style.infoContainer}>
              <Text subtitle1 bold>
                {tr("about host")}
              </Text>
              <Text caption type="grey3">
                {description}
              </Text>
            </View>
          )}

          <ProjectFacilities facilities={facilities} />

          {/* <ContactCard user={tour.NGO.user} /> */}

          <View style={style.infoContainer}>
            <Text subtitle1 bold>
              {tr("host address")}
            </Text>
            <Text caption type="grey3">
              {accommodation.address}
            </Text>
            {isFocused && (
              <Pressable onPress={() => openMapHandler(accommodation?.lat, accommodation?.lng)}>
                <Map
                  lat={accommodation?.lat}
                  lng={accommodation?.lng}
                  mapOptions={{
                    dragging: false,
                    zoomControl: false,
                  }}
                  mapMarkers={[
                    {
                      id: "string",
                      position: { lat: accommodation?.lat, lng: accommodation?.lng },
                      size: [52, 60],
                      icon: window.location.origin + "/assets/assets/image/marker.png",
                      iconAnchor: [-26, 60],
                    },
                  ]}
                />
              </Pressable>
            )}
          </View>
          <Text subtitle1 bold>
            پیشنهادی برای شما
          </Text>
        </Container>
        <SimilarProjects
          currentProjectId={projectId as string}
          projects={creator?.projectSet as ProjectQueryType[]}
        />
        <HostComment />
      </ScrollView>
    </BottomButtonLayout>
  );
};
const style = StyleSheet.create({
  scrollView: {
    paddingBottom: 16,
    flex: 1,
  },
  container: { gap: 32, marginVertical: 10 },
  infoContainer: { gap: 5 },
});

export default Page;
