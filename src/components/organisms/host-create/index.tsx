import { useEffect } from "react";
import { router } from "expo-router";
import Container from "@atoms/container";
import { useFormikContext } from "formik";
import WhiteSpace from "@atoms/white-space";
import ButtonRow from "@modules/button-rows";
import TabDate from "@organisms/host-create/date";
import useTranslation from "@src/hooks/translation";
import TabPrice from "@organisms/host-create/price";
import TabImage from "@organisms/host-create/images";
import TabAddress from "@organisms/host-create/address";
import TabCapacity from "@organisms/host-create/capacity";
import { BottomSheet, Button, Text } from "@rneui/themed";
import TabHostType from "@organisms/host-create/host-type";
import { ImageBackground, StyleSheet } from "react-native";
import TabDetails from "@organisms/host-create/details-tab";
import TabFaclities from "@organisms/host-create/facilities";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import CloseFormBottomSheet from "@modules/close-form-bottom-sheet";
import { AccommodationAddInputType, ProjectAddInputType } from "@src/gql/generated";

type PropsType = {
  activeStep: number;
  isVisibleFinish: boolean;
  setIsVisibleFinish: (t: boolean) => void;
  setIsButtonDisabled: (t: boolean) => void;
};

const HostCreateForm = ({
  activeStep,
  isVisibleFinish,
  setIsVisibleFinish,
  setIsButtonDisabled,
}: PropsType) => {
  const { tr } = useTranslation();

  const { values } = useFormikContext<ProjectAddInputType>();
  console.log("values", values);

  const { name, description, categories, capacity, dateStart, dateEnd, price } = values;
  const { address, city, lat, lng, province } = values.accommodation as AccommodationAddInputType;

  useEffect(() => {
    if (activeStep === 1 && (!name || !description)) return setIsButtonDisabled(true);
    if (activeStep === 2 && !categories?.length) return setIsButtonDisabled(true);
    if (activeStep === 3 && (!address || !city || !province || !lat || !lng))
      return setIsButtonDisabled(true);
    if (activeStep === 4 && !capacity?.capacityNumber) return setIsButtonDisabled(true);
    if (activeStep === 5 && (!dateStart || !dateEnd)) return setIsButtonDisabled(true);
    if (activeStep === 6 && ["", null, undefined].includes(price?.toString()))
      return setIsButtonDisabled(true);
    return setIsButtonDisabled(false);
  }, [values, activeStep]);

  return (
    <>
      <HostCreateTabs />
      <WhiteSpace />

      <Container>
        {activeStep === 1 && <TabDetails />}
        {activeStep === 2 && <TabHostType />}
        {activeStep === 3 && <TabAddress />}
        {activeStep === 4 && <TabCapacity />}
        {activeStep === 5 && <TabDate />}
        {activeStep === 6 && <TabPrice />}
        {activeStep === 7 && <TabImage />}
        {activeStep === 8 && <TabFaclities />}
      </Container>

      <BottomSheet isVisible={isVisibleFinish}>
        <Container>
          <ImageBackground
            style={styles.rejectIcon}
            imageStyle={{ resizeMode: "contain" }}
            source={require("@assets/image/check.svg")}
          />
          <Text center heading2 bold>
            {tr("Your hosting creation request has been successfully registered")}
          </Text>
          <Text center>
            کمتر از ۴۸ ساعت منتظر بمانید تا میزبانی شما توسط پشتیبانی مفید تریپ ثبت شود و به مسافران
            نمایش داده شود.
          </Text>
          <WhiteSpace />
          <ButtonRow>
            <Button
              onPress={() => {
                router.replace("/host/management");
                router.replace("/host/management");
                setIsVisibleFinish(false);
              }}
              color="secondary"
              type="outline">
              {tr("Host Management")}
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

export default HostCreateForm;
