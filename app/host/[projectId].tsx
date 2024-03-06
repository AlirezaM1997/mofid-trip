import {
  AccommodationImageType,
  ProjectFacilityQueryType,
  ProjectQueryType,
  useProjectDetailQuery,
} from "@src/gql/generated";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Text, useTheme } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import HostComment from "@modules/host/comment";
import ImageSlider from "@modules/image-slider";
import openMapHandler from "@src/helper/opem-map";
import { useIsFocused } from "@react-navigation/native";
import Container from "@src/components/atoms/container";
import Map from "@src/components/modules/map/index.web";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable, StyleSheet, View } from "react-native";
import { setProjectDetail } from "@src/slice/project-slice";
import ProjectTags from "@src/components/modules/host/tags";
import BookHostBottomSheet from "@modules/host/book/bottomSheet";
import ShareReportDropDown from "@modules/share-report-dropdown";
import { useLocalSearchParams, useNavigation } from "expo-router";
import BottomButtonLayout from "@components/layout/bottom-button";
import SimilarProjects from "@src/components/modules/similar-projects";
import ProjectFacilities from "@src/components/modules/host/facilities";
import LoadingIndicator from "@src/components/modules/Loading-indicator";
import ProjectBoldFeatures from "@src/components/modules/host/bold-features";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

const Page: React.FC = ({ ...props }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { projectId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();

  const { loading, data } = useProjectDetailQuery({
    variables: {
      pk: projectId as string,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      dispatch(setProjectDetail(data?.projectDetail as ProjectQueryType));
    }
  }, [loading, data]);

  if (loading) return <LoadingIndicator />;

  navigation.setOptions({
    title: data?.projectDetail?.name,
    headerRight: () => <ShareReportDropDown />,
  });

  const {
    name,
    tags,
    rate,
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
          <ImageSlider imageList={accommodation?.avatarS3 as AccommodationImageType[]} />

          <ProjectTags tags={tags ?? []} />

          <View style={style.infoContainer}>
            <Text heading2>{name}</Text>
            <Text caption>{accommodation?.address}</Text>
            {rate?.avgRate && (
              <View style={style.rateBox}>
                <Text>{localizeNumber(rate?.avgRate as string)}</Text>
                <View style={style.rateStars}>
                  {new Array(5).fill("star").map((item, index) => (
                    <AntDesign
                      key={index}
                      name="star"
                      size={24}
                      color={
                        index < +(rate?.avgRate as string)
                          ? theme.colors.warning
                          : theme.colors.grey1
                      }
                    />
                  ))}
                </View>
              </View>
            )}
          </View>

          <ProjectBoldFeatures
            dateEnd={dateEnd}
            dateStart={dateStart}
            capacity={capacity}
            category={categories?.[0]?.displayName}
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

          <ProjectFacilities facilities={facilities as ProjectFacilityQueryType[]} />

          {/* <ContactCard user={tour.NGO.user} /> */}

          <View style={style.infoContainer}>
            <Text subtitle1 bold>
              {tr("host address")}
            </Text>
            <Text caption type="grey3">
              {accommodation?.address}
            </Text>
            {isFocused && (
              <Pressable onPress={() => openMapHandler(accommodation?.lat, accommodation?.lng)}>
                <Map
                  lat={accommodation?.lat as number}
                  lng={accommodation?.lng as number}
                  mapOptions={{
                    dragging: false,
                    zoomControl: false,
                  }}
                  mapMarkers={[
                    {
                      id: "string",
                      size: [52, 60],
                      iconAnchor: [-17, 30],
                      position: { lat: accommodation?.lat, lng: accommodation?.lng },
                      icon: window.location.origin + "/assets/assets/image/marker.png",
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
    flex: 1,
    paddingBottom: 16,
  },
  container: {
    gap: 32,
    marginVertical: 10,
  },
  infoContainer: {
    gap: 5,
  },
  rateBox: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  rateStars: {
    flexDirection: "row-reverse",
    gap: 3,
  },
});

export default Page;
