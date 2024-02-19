import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import LoadingIndicator from "@modules/Loading-indicator";
import ContactCard from "@modules/contact-card";
import ImageSlider from "@modules/image-slider";
import Map from "@modules/map/index.web";
import ShareReportDropDown from "@modules/share-report-dropdown";
import SimilarTours from "@modules/similar-tours";
import TourComment from "@modules/tour/comment";
import TourFacilities from "@modules/tour/facilities";
import { BottomSheet, Button, ListItem, Text } from "@rneui/themed";
import { useSession } from "@src/context/auth";
import {
  AccommodationQueryType,
  TourPackageType,
  TourQueryType,
  useTourDetailQuery,
} from "@src/gql/generated";
import openMapHandler from "@src/helper/opem-map";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import moment from "jalali-moment";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";

export default () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { formatPrice } = useFormatPrice();
  const { tourId } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState<boolean>();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisiblePrevent, setIsVisiblePrevent] = useState<boolean>(false);
  const { session } = useSession();
  const isNgo = session ? JSON.parse(session)?.metadata?.is_ngo : false;

  const { loading, data } = useTourDetailQuery({
    variables: {
      pk: tourId as string,
    },
  });

  const handleBottomSheet = () => {
    if (isNgo) {
      setIsVisiblePrevent(true);
    } else {
      setIsVisible(true);
    }
  };

  const handleNavigateToReserve = (tourPackage: TourPackageType) => {
    setIsVisible(false);
    router.push({
      pathname: `/tour/${tourId}/reservation/add/step-1`,
      params: {
        tourId: tourId,
        tourPackage: JSON.stringify(tourPackage),
      },
    });
  };

  const handleBuy = (p: TourPackageType) => {
    if (session) {
      handleNavigateToReserve(p);
    } else {
      setIsVisiblePrevent(true);
    }
  };
  const tour = data?.tourDetail;

  const startTime = moment(tour?.startTime).locale("fa").format("D MMMM");
  const endTime = moment(tour?.endTime).locale("fa").format("D MMMM");

  if (loading && !tour) return <LoadingIndicator />;
  navigation.setOptions({
    title: (data?.tourDetail as TourQueryType)?.title,
    headerRight: () => <ShareReportDropDown />,
  });

  return (
    <BottomButtonLayout
      buttons={[
        <Button
          disabled={tour.statusStep?.name === "SUSPENSION" ? true : false}
          onPress={handleBottomSheet}>
          {tr("Reserve")}
        </Button>,
      ]}>
      <Container>
        <WhiteSpace size={10} />
        <ImageSlider imageList={tour?.avatarS3} />

        <WhiteSpace size={20} />

        <Text>{tour.title}</Text>
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
            <Text bold>{localizeNumber(tour.capacity?.guestNumber)}</Text>
          </View>
        </View>

        <WhiteSpace size={20} />

        <Text>{tr("Description")}</Text>
        <Text>{tour.description}</Text>

        <WhiteSpace size={20} />

        <Text subtitle1>{tr("Tour Facilities")}</Text>

        <TourFacilities facilities={tour.facilities} />

        <WhiteSpace size={20} />

        <ContactCard user={tour.NGO.user} />

        <WhiteSpace size={20} />

        {(tour?.destination as AccommodationQueryType)?.address && (
          <>
            <Text bold>{tr("Address")}</Text>
            <Text type="grey4">{(tour?.destination as AccommodationQueryType)?.address}</Text>

            <WhiteSpace size={20} />
            <Pressable
              onPress={() =>
                openMapHandler(
                  (tour.destination as AccommodationQueryType)?.lat,
                  (tour.destination as AccommodationQueryType)?.lng
                )
              }>
              <Map
                lat={(tour.destination as AccommodationQueryType)?.lat}
                lng={(tour.destination as AccommodationQueryType)?.lng}
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
      <SimilarTours currentTourId={tour.id} tours={tour.NGO.tourSet} />
      <TourComment />
      <WhiteSpace size={20} />

      <BottomSheet isVisible={isVisible} onBackdropPress={() => setIsVisible(false)}>
        {tour.packages.map((p, index) => (
          <ListItem
            key={index}
            bottomDivider={index !== tour.packages.length - 1}
            onPress={() => handleBuy(p)}>
            <ListItem.Content>
              <View style={styles.priceItem(isRtl)}>
                <View>
                  <Text>{p.title}</Text>
                  <Text>{localizeNumber(formatPrice(p.price))}</Text>
                </View>
                <Button size="sm" type="outline" onPress={() => handleBuy(p)}>
                  {tr("Buy")}
                </Button>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>

      <BottomSheet isVisible={isVisiblePrevent} onBackdropPress={() => setIsVisiblePrevent(false)}>
        <Container>
          <ImageBackground
            style={styles.rejectIcon}
            imageStyle={{ resizeMode: "contain" }}
            source={require("@assets/image/rejectIcon.svg")}
          />
          <Text heading1 center>
            محدودیت دسترسی
          </Text>
          <Text center>رزرو تور برای تشکل ها امکان پذیر نیست</Text>
          <WhiteSpace />
          <Button onPress={() => setIsVisiblePrevent(false)}>{tr("Ok")}</Button>
        </Container>
      </BottomSheet>
    </BottomButtonLayout>
  );
};

const styles = StyleSheet.create({
  priceItem: (isRtl: boolean) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexDirection: isRtl ? "row-reverse" : "row",
  }),
  gridRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});
