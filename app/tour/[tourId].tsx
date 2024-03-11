import {
  TourImageType,
  TourQueryType,
  useTourDetailQuery,
  TourFacilityQueryType,
  AccommodationImageType,
  AccommodationQueryType,
} from "@src/gql/generated";
import Container from "@atoms/container";
import Map from "@modules/map/index.web";
import WhiteSpace from "@atoms/white-space";
import { Text, useTheme } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import ContactCard from "@modules/contact-card";
import ImageSlider from "@modules/image-slider";
import TourComment from "@modules/tour/comment";
import openMapHandler from "@src/helper/opem-map";
import SimilarTours from "@modules/similar-tours";
import TourFacilities from "@modules/tour/facilities";
import TourBoldInfo from "@modules/tour/bold-features";
import LoadingIndicator from "@modules/Loading-indicator";
import { Pressable, StyleSheet, View } from "react-native";
import BookTourBottomSheet from "@modules/tour/book/bottomSheet";
import ShareReportDropDown from "@modules/share-report-dropdown";
import BottomButtonLayout from "@components/layout/bottom-button";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";

export default () => {
  const { theme } = useTheme();
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

  if (loading && !tour) return <LoadingIndicator />;
  navigation.setOptions({
    title: localizeNumber(data?.tourDetail?.title as string),
    headerRight: () => <ShareReportDropDown />,
  });

  return (
    <BottomButtonLayout buttons={[<BookTourBottomSheet tour={tour as TourQueryType} />]}>
      <Container>
        <WhiteSpace size={10} />
        <ImageSlider imageList={tour?.avatarS3 as AccommodationImageType[] | TourImageType[]} />

        <View style={styles.tourInf}>
          <Text heading2 bold>
            {localizeNumber(tour?.title as string)}
          </Text>
          <Text>{(tour?.destination as AccommodationQueryType)?.address}</Text>
          {tour?.rate?.avgRate && (
            <View style={styles.rateBox}>
              <Text>{`(${localizeNumber(tour?.rate.count as string)} ${tr(
                "opinion"
              )}) ${localizeNumber(tour?.rate?.avgRate as string)}`}</Text>
              <View style={styles.rateStars}>
                {new Array(5).fill("star").map((item, index) => (
                  <AntDesign
                    key={index}
                    name="star"
                    size={24}
                    color={
                      index < +(tour?.rate?.avgRate as string)
                        ? theme.colors.warning
                        : theme.colors.grey1
                    }
                  />
                ))}
              </View>
            </View>
          )}
        </View>

        <WhiteSpace size={10} />
        <TourBoldInfo
          endTime={tour?.endTime}
          startTime={tour?.startTime}
          capacity={tour?.capacity}
        />

        <WhiteSpace size={20} />

        <Text bold>{tr("about the tour")}</Text>
        <WhiteSpace size={4} />
        <Text>{tour?.description}</Text>

        <WhiteSpace size={20} />

        <Text bold>{tr("Tour Facilities")}</Text>
        <WhiteSpace size={10} />
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
        {(tour?.NGO.tourSet?.length as number) > 1 && (
          <View style={{ paddingVertical: 15 }}>
            <Text bold>پیشنهادی برای شما</Text>
          </View>
        )}
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
  tourInf:{ 
    gap: 4, 
    marginVertical: 20 
  },
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
