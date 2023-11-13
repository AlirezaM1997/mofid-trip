import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import ImageSlider from "@modules/image-slider";
import { BottomSheet, Button, ListItem, Text } from "@rneui/themed";
import { AccommodationQueryType, TourPackageType } from "@src/gql/generated";
import { getCapacity } from "@src/helper/tour";
import useTourTable from "@src/hooks/db/tour";
import useTranslation, { useLocalizedNumberFormat } from "@src/hooks/translation";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import moment from "jalali-moment";
import TourFacilities from "@modules/tour-facilities";
import TitleWithAction from "@modules/title-with-action";
import ContactCard from "@modules/contact-card";
import Map from "@modules/map";
import SimilarTours from "@modules/similar-tours";
import useIsRtl, { formatPrice } from "@src/hooks/localization";

export default () => {
  const isRtl = useIsRtl();
  const { tr } = useTranslation();
  const navigation = useNavigation();
  const { tourId, name } = useLocalSearchParams();
  const aaa = useLocalSearchParams();
  const { findById } = useTourTable();
  const [isVisible, setIsVisible] = useState<boolean>();
  const { localizeNumber } = useLocalizedNumberFormat();

  useEffect(() => {
    navigation.setOptions({ title: name });
    console.log("aaa", aaa);
  }, [name]);

  const tour = findById(tourId as string);

  const handleBottomSheet = () => {
    setIsVisible(true);
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

  const startTime = moment(tour?.startTime).locale("fa").format("MMMM D");
  const endTime = moment(tour?.endTime).locale("fa").format("MMMM D");

  return (
    <BottomButtonLayout buttons={[<Button onPress={handleBottomSheet}>{tr("Reserve")}</Button>]}>
      <Container>
        <WhiteSpace size={10} />
        <ImageSlider imageList={tour.avatarS3} />

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
            <Text bold>{localizeNumber(getCapacity(tour.capacity))}</Text>
          </View>
        </View>

        <WhiteSpace size={20} />

        <Text>{tr("Description")}</Text>
        <Text>{tour.description}</Text>

        <WhiteSpace size={20} />

        <TitleWithAction
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
            <Map
              lat={(tour.destination as AccommodationQueryType)?.lat}
              lng={(tour.destination as AccommodationQueryType)?.lng}
            />
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
            onPress={() => handleNavigateToReserve(p)}>
            <ListItem.Content>
              <View style={styles.priceItem(isRtl)}>
                <View>
                  <Text>{p.title}</Text>
                  <Text>{localizeNumber(formatPrice(p.price))}</Text>
                </View>
                <Button size="sm" type="outline" onPress={() => handleNavigateToReserve(p)}>
                  {tr("Buy")}
                </Button>
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
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
});
