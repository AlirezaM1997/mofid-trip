import {
  TourQueryType,
  TourImageType,
  useTourDetailQuery,
  TourFacilityQueryType,
  AccommodationImageType,
  AccommodationQueryType,
} from "@src/gql/generated";
import { Text } from "@rneui/themed";
import Container from "@atoms/container";
import Map from "@modules/map/index.web";
import WhiteSpace from "@atoms/white-space";
import ContactCard from "@modules/contact-card";
import ImageSlider from "@modules/image-slider";
import TourComment from "@modules/tour/comment";
import openMapHandler from "@src/helper/opem-map";
import SimilarTours from "@modules/similar-tours";
import useTranslation from "@src/hooks/translation";
import TourFacilities from "@modules/tour/facilities";
import TourBoldInfo from "@modules/tour/bold-features";
import LoadingIndicator from "@modules/Loading-indicator";
import { Pressable, StyleSheet, View } from "react-native";
import BookTourBottomSheet from "@modules/tour/book/bottomSheet";
import ShareReportDropDown from "@modules/share-report-dropdown";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default () => {
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { tourId } = useLocalSearchParams();

  const { loading, data } = useTourDetailQuery({
    variables: {
      pk: tourId as string,
    },
  });
  const tour = data?.tourDetail;

  navigation.setOptions({
    title: data?.tourDetail?.title || tr("loading"),
    headerRight: () => <ShareReportDropDown />,
  });

  if (loading && !tour) return <LoadingIndicator />;

  return (
    <BottomButtonLayout buttons={[<BookTourBottomSheet tour={tour as TourQueryType} />]}>
      <Container>
        <WhiteSpace size={10} />
        <ImageSlider imageList={tour?.avatarS3 as AccommodationImageType[] | TourImageType[]} />

        <WhiteSpace size={20} />

        <Text>{tour?.title}</Text>
        <Text>{(tour?.destination as AccommodationQueryType)?.address}</Text>

        <WhiteSpace size={20} />

        <WhiteSpace size={10} />
        <TourBoldInfo
          endTime={tour?.endTime}
          startTime={tour?.startTime}
          capacity={tour?.capacity}
        />

        <WhiteSpace size={20} />

        <Text>{tr("Description")}</Text>
        <Text>{tour?.description}</Text>

        <WhiteSpace size={20} />

        <Text subtitle1>{tr("Tour Facilities")}</Text>

        <TourFacilities facilities={tour?.facilities as TourFacilityQueryType[]} />

        <WhiteSpace size={20} />

        <ContactCard user={tour?.NGO} />

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
                    position: { lat: tour?.destination?.lat, lng: tour?.destination?.lng },
                    size: [52, 60],
                    icon: window.location.origin + "/assets/assets/image/marker.png",
                    iconAnchor: [-17, 30],
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
      <SimilarTours
        currentTourId={tour?.id as string}
        tours={tour?.NGO.tourSet as TourQueryType[]}
      />
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
