import Share from "@modules/share";
import { Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Map from "@src/components/modules/map";
import { StyleSheet, View } from "react-native";
import ImageSlider from "@modules/image-slider";
import useTranslation from "@src/hooks/translation";
import { useIsFocused } from "@react-navigation/native";
import Container from "@src/components/atoms/container";
import { ScrollView } from "react-native-gesture-handler";
import { setProjectDetail } from "@src/slice/project-slice";
import ProjectTags from "@src/components/modules/host/tags";
import ContactCard from "@src/components/modules/contact-card";
import BookHostBottomSheet from "@modules/host/book/bottomSheet";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useLocalSearchParams, useNavigation } from "expo-router";
import SimilarProjects from "@src/components/modules/similar-projects";
import ProjectFacilities from "@src/components/modules/host/facilities";
import LoadingIndicator from "@src/components/modules/Loading-indicator";
import ProjectBoldFeatures from "@src/components/modules/host/bold-features";
import { ProjectQueryType, useProjectDetailQuery } from "@src/gql/generated";

const Page: React.FC = ({ ...props }) => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { projectId, name } = useLocalSearchParams();

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

  navigation.setOptions({ title: name, headerRight: () => <Share /> });

  if (loading) return <LoadingIndicator />;

  const {
    tags,
    creator,
    dateEnd,
    capacity,
    dateStart,
    categories,
    facilities,
    description,
    accommodation,
  } = data.projectDetail;
  console.log(accommodation.avatarS3);

  return (
    <BottomButtonLayout
      buttons={[<BookHostBottomSheet project={data.projectDetail as ProjectQueryType} />]}>
      <ScrollView style={style.scrollView}>
        <Container style={style.container}>
          <ImageSlider imageList={accommodation.avatarS3} />

          <ProjectTags tags={tags ?? []} />

          <View style={style.infoContainer}>
            <Text heading2>{name}</Text>
            <Text caption>{accommodation?.address}</Text>
          </View>

          <ProjectBoldFeatures
            dateEnd={dateEnd}
            dateStart={dateStart}
            capacity={capacity ?? 0}
            category={categories?.[0]?.name}
          />

          {description && (
            <View style={style.infoContainer}>
              <Text subtitle1 bold>
                {tr("about host")}
              </Text>
              <Text caption type="grey2">
                {description}
              </Text>
            </View>
          )}

          <ProjectFacilities facilities={facilities} />

          <ContactCard user={creator ?? {}} />
          {/* <ContactCard user={tour.NGO.user} /> */}

          <View style={style.infoContainer}>
            <Text subtitle1 bold>
              {tr("host address")}
            </Text>
            <Text caption type="grey2">
              {accommodation.address}
            </Text>
            {isFocused && <Map lat={accommodation?.lat} lng={accommodation?.lng} />}
          </View>

          <SimilarProjects
            currentProjectId={projectId as string}
            projects={creator?.projectSet as ProjectQueryType[]}
          />
        </Container>
      </ScrollView>
    </BottomButtonLayout>
  );
};
const style = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: { gap: 32, marginVertical: 10 },
  infoContainer: { gap: 5 },
});

export default Page;
