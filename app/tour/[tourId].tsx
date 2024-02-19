import {
  AccommodationImageType,
  AccommodationQueryType,
  TourFacilityQueryType,
  TourImageType,
  TourQueryType,
  useTourDetailQuery,
} from "@src/gql/generated";
import moment from "jalali-moment";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import Map from "@modules/map/index.web";
import WhiteSpace from "@atoms/white-space";
import ContactCard from "@modules/contact-card";
import ImageSlider from "@modules/image-slider";
import TourComment from "@modules/tour/comment";
import openMapHandler from "@src/helper/opem-map";
import SimilarTours from "@modules/similar-tours";
import TourFacilities from "@modules/tour/facilities";
import LoadingIndicator from "@modules/Loading-indicator";
import { Pressable, StyleSheet, View } from "react-native";
import BookTourBottomSheet from "@modules/tour/book/bottomSheet";
import ShareReportDropDown from "@modules/share-report-dropdown";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

export default () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { tourId } = useLocalSearchParams();
  const { localizeNumber } = useLocalizedNumberFormat();

  const { loading, data } = useTourDetailQuery({
    variables: {
      pk: tourId as string,
    },
  });
  const tour = data?.tourDetail;

  const startTime = moment(tour?.startTime).locale("fa").format("D MMMM");
  const endTime = moment(tour?.endTime).locale("fa").format("D MMMM");

  if (loading && !tour) return <LoadingIndicator />;
  navigation.setOptions({
    title: data?.tourDetail?.title,
    headerRight: () => <ShareReportDropDown />,
  });

  return (
    <BottomButtonLayout
      buttons={[<BookTourBottomSheet tour={tour as TourQueryType}/>]}>
      <Container>
        <WhiteSpace size={10} />
        <ImageSlider imageList={tour?.avatarS3 as AccommodationImageType[] | TourImageType[]} />

        <WhiteSpace size={20} />

        <Text>{tour?.title}</Text>
        <Text>{(tour?.destination as AccommodationQueryType)?.address}</Text>

        <WhiteSpace size={20} />

        <WhiteSpace size={10} />
        <View style={styles.gridRow}>
          <View style={styles.grid}>
            <Text type="grey2">{tr("Date")}</Text>
            <Text bold>{localizeNumber(startTime)}</Text>
          </View>
          <View style={styles.grid}>
            <Text type="grey2">{tr("Duration")}</Text>
            <Text bold>{localizeNumber(`${startTime} - ${endTime}`)}</Text>
          </View>
          <View style={styles.grid}>
            <Text type="grey2">{tr("Capacity")}</Text>
            <Text bold>{localizeNumber(tour?.capacity?.guestNumber as number)}</Text>
          </View>
        </View>

        <WhiteSpace size={20} />

        <Text>{tr("Description")}</Text>
        <Text>{tour?.description}</Text>

        <WhiteSpace size={20} />

        <Text subtitle1>{tr("Tour Facilities")}</Text>

        <TourFacilities facilities={tour?.facilities as TourFacilityQueryType[]} />

        <WhiteSpace size={20} />

        <ContactCard user={tour?.NGO.user} />

        <WhiteSpace size={20} />

        {(tour?.destination as AccommodationQueryType)?.address && (
          <>
            <Text bold>{tr("Address")}</Text>
            <Text type="grey4">{(tour?.destination as AccommodationQueryType)?.address}</Text>

            <WhiteSpace size={20} />
            <Pressable
              onPress={() =>
                openMapHandler(
                  (tour?.destination as AccommodationQueryType)?.lat,
                  (tour?.destination as AccommodationQueryType)?.lng
                )
              }>
              <Map
                lat={(tour?.destination as AccommodationQueryType)?.lat as number}
                lng={(tour?.destination as AccommodationQueryType)?.lng as number}
                mapOptions={{
                  dragging: false,
                  zoomControl: false,
                }}
                mapMarkers={[
                  {
                    id: "string",
                    position: { lat: tour?.destination?.lat , lng: tour?.destination?.lng },
                    size: [52, 60],
                    icon: window.location.origin + "/assets/image/marker.png",
                    iconAnchor: [-26, 60],
                  },
                ]}
              />
            </Pressable>
          </>
        )}
        <WhiteSpace size={15} />
        <Text subtitle1 bold>
          پیشنهادی برای شما
        </Text>
        <WhiteSpace size={15} />
      </Container>
      <SimilarTours currentTourId={tour?.id as string} tours={tour?.NGO.tourSet as TourQueryType[]} />
      <TourComment />
      <WhiteSpace size={20} />
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  gridRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grid: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
});
