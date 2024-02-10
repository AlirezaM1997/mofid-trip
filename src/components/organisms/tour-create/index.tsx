import React, { useEffect } from "react";

import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import CloseFormBottomSheet from "@modules/close-form-bottom-sheet";
import TourCreateTabs from "@modules/virtual-tabs/tour-create-tabs";
import CapacityTab from "@organisms/tour-create/capacity-tab";
import DateTab from "@organisms/tour-create/date-tab";
import DestinationTab from "@organisms/tour-create/destination-tab";
import DetailsTab from "@organisms/tour-create/details-tab";
import FacilitiesTab from "@organisms/tour-create/facilities-tab";
import ImagesTab from "@organisms/tour-create/images-tab";
import OriginTab from "@organisms/tour-create/origin-tab";
import PriceTab from "@organisms/tour-create/price-tab";
import { BottomSheet, Button, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { router } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { TourAddInputType } from "@src/gql/generated";

const TourCreateForm = ({
  activeStep,
  isVisibleFinish,
  setIsVisibleFinish,
  setIsButtonDisabled,
}) => {
  const { tr } = useTranslation();

  const { values } = useFormikContext<TourAddInputType>();

  const { title, description, capacity, startTime, endTime, price } = values;
  const { address, city, province, lat, lng } = values.destination;
  const { address: originAddress, lat: originLat, lng: originLng } = values.origin;
  console.log(price);

  useEffect(() => {
    if (activeStep === 1 && (!title || !description)) return setIsButtonDisabled(true);
    if (activeStep === 2 && !capacity.capacityNumber) return setIsButtonDisabled(true);
    if (activeStep === 3 && (!originAddress || !originLat || !originLng))
      return setIsButtonDisabled(true);
    if (activeStep === 4 && (!address || !province || !city || !lat || !lng))
      return setIsButtonDisabled(true);
    if (activeStep === 5 && (!startTime || !endTime)) return setIsButtonDisabled(true);
    if (activeStep === 6 && ["", null, undefined].includes(price?.toString()))
      return setIsButtonDisabled(true);
    return setIsButtonDisabled(false);
  }, [values, activeStep]);

  return (
    <>
      <TourCreateTabs />
      <WhiteSpace />

      <Container>
        {activeStep === 1 && <DetailsTab />}
        {activeStep === 2 && <CapacityTab />}
        {activeStep === 3 && <OriginTab />}
        {activeStep === 4 && <DestinationTab />}
        {activeStep === 5 && <DateTab />}
        {activeStep === 6 && <PriceTab />}
        {activeStep === 7 && <ImagesTab />}
        {activeStep === 8 && <FacilitiesTab />}
      </Container>

      <BottomSheet isVisible={isVisibleFinish}>
        <Container>
          <ImageBackground
            style={styles.rejectIcon}
            imageStyle={{ resizeMode: "contain" }}
            source={require("@assets/image/check.svg")}
          />
          <Text center heading2 bold>
            {tr("Your request to create a tour has been successfully registered")}
          </Text>
          <Text center>
            {tr(
              "Wait less than 48 hours for your tour to be registered by trip's helpful support and displayed to travelers."
            )}
          </Text>
          <WhiteSpace />
          <ButtonRow>
            <Button
              onPress={() => {
                router.replace("/tour/management");
                router.replace("/tour/management");
                setIsVisibleFinish(false);
              }}
              color="secondary"
              type="outline">
              {tr("Tour Management")}
            </Button>
            <Button
              onPress={() => {
                router.replace("/");
                router.replace("/");
                setIsVisibleFinish(false);
              }}>
              {tr("Return to home")}
            </Button>
          </ButtonRow>
        </Container>
      </BottomSheet>

      <CloseFormBottomSheet />
    </>
  );
};

const styles = StyleSheet.create({
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default TourCreateForm;
