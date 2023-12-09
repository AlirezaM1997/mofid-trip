import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import ButtonRow from "@modules/button-rows";
import TourCreateTabs from "@modules/virtual-tabs/tour-create-tabs";
import DetailsTab from "@organisms/tour-create/details-tab";
import { BottomSheet } from "@rneui/themed";
import { Button, Input, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { initialState, setTourCreateData } from "@src/slice/tour-create-slice";
import { RootState } from "@src/store";
import { router, useNavigation } from "expo-router";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Feather } from "@expo/vector-icons";

const Screen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { data } = useSelector((state: RootState) => state.tourCreateSlice);
  const { title, description } = useSelector((state: RootState) => state.tourCreateSlice.data);
  const [index, setIndex] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  const [exitElement, setExitElement] = useState();

  const navigation = useNavigation();

  const initialValues = { title: title, description: description };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(tr("Title is required")),
    description: Yup.string().nullable(),
  });

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);

  const handleSubmit = values => {
    setIndex(index + 1);
    // dispatch(
    //   setTourCreateData({
    //     ...data,
    //     ...values,
    //   })
    // );
    // router.replace({
    //   pathname: "tour/create/capacity",
    //   params: {
    //     x: -95,
    //   },
    // });
  };

  const handleExit = () => {
    console.log(1);
    navigation.goBack();
    router.back();
  };

  const handleHeaderBackButtonPress = () => {
    handleOpen();
    navigation.removeListener("beforeRemove", beforeRemoveHandler);
    setExitElement("A");
  };

  const beforeRemoveHandler = e => {
    e.preventDefault();
    window.history.pushState(null, "", "/tour/create");
    navigation.removeListener("beforeRemove", beforeRemoveHandler);
    setExitElement("B");
    handleOpen();
  };

  // Effect
  useEffect(() => {
    navigation.addListener("beforeRemove", beforeRemoveHandler);
    return () => {
      navigation.removeListener("beforeRemove", beforeRemoveHandler);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      navigation.addListener("beforeRemove", beforeRemoveHandler);
    }
  }, [isVisible]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={handleHeaderBackButtonPress}>
          <Feather name="arrow-right" size={24} color="black" style={{ marginRight: 12 }} />
        </Pressable>
      ),
    });
    // reset the redux
    return () => dispatch(setTourCreateData(initialState.data));
  }, []);

  return (
    <>
      <BottomButtonLayout
        buttons={[
          <Button onPress={handleSubmit}>{tr("Next")}</Button>,
          <Button
            type="outline"
            color="secondary"
            disabled={index === 1}
            onPress={() => setIndex(index - 1)}>
            {tr("back")}
          </Button>,
        ]}>
        <TourCreateTabs index={index} />
        <WhiteSpace />
        <Container>{index === 1 && <DetailsTab />}</Container>
        <BottomSheet isVisible={isVisible} onBackdropPress={handleClose}>
          <Container>
            <ImageBackground
              style={styles.rejectIcon}
              imageStyle={{ resizeMode: "contain" }}
              source={require("@assets/image/rejectIcon.svg")}
            />
            <Text heading1 center>
              آیا از خروج از این صفحه اطمینان دارید؟
            </Text>
            <Text center>در صورت خروج از این صفحه اطلاعات این فرم ها پاک خواهد شد</Text>
            <WhiteSpace />
            <ButtonRow>
              <Button onPress={handleExit}>خارج شدن</Button>
              <Button onPress={handleClose}>{tr("Stay")}</Button>
            </ButtonRow>
          </Container>
        </BottomSheet>
      </BottomButtonLayout>
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

export default Screen;
