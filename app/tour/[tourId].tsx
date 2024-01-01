import Map from "@modules/map";
import moment from "jalali-moment";
import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import { useEffect, useState } from "react";
import { getCapacity } from "@src/helper/tour";
import ImageSlider from "@modules/image-slider";
import { ImageBackground, Linking, Platform, Pressable, StyleSheet, View } from "react-native";
import ContactCard from "@modules/contact-card";
import SimilarTours from "@modules/similar-tours";
import TourFacilities from "@modules/tour/facilities";
import TitleWithAction from "@modules/title-with-action";
import useIsRtl, { useFormatPrice } from "@src/hooks/localization";
import BottomButtonLayout from "@components/layout/bottom-button";
import { BottomSheet, Button, ListItem, Text } from "@rneui/themed";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  AccommodationQueryType,
  TourCapacityType,
  TourDetailQuery,
  TourPackageType,
  useTourDetailQuery,
} from "@src/gql/generated";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import LoadingIndicator from "@modules/Loading-indicator";
import { useSession } from "@src/context/auth";
import ShareReportDropDown from "@modules/share-report-dropdown";

export default () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { formatPrice } = useFormatPrice();
  const { tourId, name } = useLocalSearchParams();
  const [tour, setTour] = useState<TourDetailQuery["tourDetail"]>();
  const [isVisible, setIsVisible] = useState<boolean>();
  const { localizeNumber } = useLocalizedNumberFormat();
  const [isVisiblePrevent, setIsVisiblePrevent] = useState<boolean>(false);
  const isAuthenticated = false;
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
      pathname: `/tour/${tour.id}/reservation/step-1`,
      params: {
        tourId: tour.id,
        tourPackage: JSON.stringify(tourPackage),
      },
    });
  };

  const handleBuy = p => {
    if (isAuthenticated) {
      handleNavigateToReserve(p);
    } else {
      setIsVisiblePrevent(true);
    }
  };

  const startTime = moment(tour?.startTime).locale("fa").format("D MMMM");
  const endTime = moment(tour?.endTime).locale("fa").format("D MMMM");

  useEffect(() => {
    if (!loading && data) {
      setTour(data.tourDetail);
    }
  }, [loading, data]);

  const openMapHandler = () => {
    const scheme = Platform?.select({ ios: "maps://0,0?q=", android: "geo:0,0?q=" });
    const latLng = ` ${(tour.destination as AccommodationQueryType)?.lat}, ${
      (tour.destination as AccommodationQueryType)?.lng
    }`;
    const url = Platform?.select({
      ios: `${scheme}@${latLng}`,
      android: `${scheme}${latLng}`,
    });

    if (Platform.OS === "web") {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${
        (tour.destination as AccommodationQueryType)?.lat
      },${(tour.destination as AccommodationQueryType)?.lng}`;
      window.open(googleMapsUrl, "_blank");
      return;
    }

    Linking?.openURL(url);
  };

  if (loading || !tour) return <LoadingIndicator />;
  navigation.setOptions({ title: data?.tourDetail?.title, headerRight: () => <ShareReportDropDown /> });

  return (
    <BottomButtonLayout buttons={[<Button onPress={handleBottomSheet}>{tr("Reserve")}</Button>]}>
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
            <Text bold>{localizeNumber(getCapacity(tour.capacity as TourCapacityType))}</Text>
          </View>
        </View>

        <WhiteSpace size={20} />

        <Text>{tr("Description")}</Text>
        <Text>{tour.description}</Text>

        <WhiteSpace size={20} />

        <TitleWithAction
          size="subtitle1"
          title={tr("Tour Facilities")}
          actionTitle={tr("See All")}
          onActionPress={() => router.push("/search")}
        />
        <TourFacilities facilities={tour.facilities} />

        <WhiteSpace size={20} />

        <ContactCard user={tour.NGO.user} />

        <WhiteSpace size={20} />

        {(tour?.destination as AccommodationQueryType)?.address && (
          <>
            <Text bold>{tr("Address")}</Text>
            <Text type="grey4">{(tour?.destination as AccommodationQueryType)?.address}</Text>

            <WhiteSpace size={20} />
            <Pressable onPress={openMapHandler}>
              <Map
                lat={(tour.destination as AccommodationQueryType)?.lat}
                lng={(tour.destination as AccommodationQueryType)?.lng}
              />
            </Pressable>
          </>
        )}
      </Container>
      <WhiteSpace size={20} />
      <SimilarTours currentTourId={tour.id} tours={tour.NGO.tourSet} />
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
