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
<<<<<<< HEAD
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { Text } from "@rneui/themed";
import { getCapacity } from "@src/helper/tour";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useProjectDetailQuery } from "@src/gql/generated";
import { ImageBackground, StyleSheet, View } from "react-native";
import { setProjectDetail } from "@src/slice/project-slice";
import { initialState, setHostTransactionData } from "@src/slice/host-transaction-slice";
import { RootState } from "@src/store";
import ShareReportDropDown from "@modules/share&reportDropDown";
=======
import LoadingIndicator from "@src/components/modules/Loading-indicator";
import ProjectBoldFeatures from "@src/components/modules/host/bold-features";
import { ProjectQueryType, useProjectDetailQuery } from "@src/gql/generated";
>>>>>>> master

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

<<<<<<< HEAD
  console.log("====================================");
  console.log(name);
  console.log("========================4============");

  navigation.setOptions({
    title: name,
    headerRight: () => <ShareReportDropDown name={data?.projectDetail?.accommodation?.name} />,
  });
=======
  navigation.setOptions({ title: name, headerRight: () => <Share /> });
>>>>>>> master

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
<<<<<<< HEAD
          <ImageSlider imageList={data?.projectDetail?.accommodation?.avatarS3} />
=======
          <ImageSlider imageList={accommodation.avatarS3} />
>>>>>>> master

          <ProjectTags tags={tags ?? []} />

          <View style={style.infoContainer}>
<<<<<<< HEAD
            <Text variant="heading1">{data?.projectDetail?.accommodation?.name}</Text>
            <Text variant="heading2">{data?.projectDetail?.accommodation?.address}</Text>
=======
            <Text heading2>{name}</Text>
            <Text caption>{accommodation?.address}</Text>
>>>>>>> master
          </View>

          <ProjectBoldFeatures
            dateEnd={dateEnd}
            dateStart={dateStart}
            capacity={capacity ?? 0}
            category={categories?.[0]?.name}
          />

<<<<<<< HEAD
          <View style={style.infoContainer}>
            <Text variant="heading1">{tr("Description")}</Text>
            <Text variant="body1">{data?.projectDetail?.accommodation?.description}</Text>
          </View>

          <ProjectFacilities facilities={data?.projectDetail?.facilities} />

          {isFocused && (
            <Map
              lat={data?.projectDetail?.accommodation?.lat}
              lng={data?.projectDetail?.accommodation?.lng}
            />
=======
          {description && (
            <View style={style.infoContainer}>
              <Text subtitle1 bold>
                {tr("about host")}
              </Text>
              <Text caption type="grey2">
                {description}
              </Text>
            </View>
>>>>>>> master
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
<<<<<<< HEAD
            currentProjectId={projectId}
            projects={data?.projectDetail?.creator?.projectSet}
=======
            currentProjectId={projectId as string}
            projects={creator?.projectSet as ProjectQueryType[]}
>>>>>>> master
          />
        </Container>
      </ScrollView>
<<<<<<< HEAD

      <Divider />
      <View style={style.bottomActionContainer}>
        <View style={style.left}>
          <Text style={style.priceTitle}>{tr("Price")}</Text>
          <View style={style.priceContainer}>
            <Text body1 style={style.priceNumber}>
              ${localizeNumber(data?.projectDetail?.price)}
            </Text>
            <Text style={style.priceText}> / {tr("Night")}</Text>
          </View>
        </View>
        <Button containerStyle={style.right} size="lg" onPress={handlePress}>
          {tr("Book Now")}
        </Button>
      </View>

      <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}>
        <Container>
          <ImageBackground
            style={style.rejectIcon}
            imageStyle={{ resizeMode: "contain" }}
            source={require("@assets/image/rejectIcon.svg")}
          />
          <Text heading1 center>
            محدودیت دسترسی
          </Text>
          <Text center>رزرو هاست تنها برای تشکل ها امکان پذیر است</Text>
          <WhiteSpace />
          <Button onPress={handleClose}>{tr("Ok")}</Button>
        </Container>
      </BottomSheet>
    </>
=======
    </BottomButtonLayout>
>>>>>>> master
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
