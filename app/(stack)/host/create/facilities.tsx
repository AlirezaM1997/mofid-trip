import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import BottomButtonLayout from "@components/layout/bottom-button";
import { Feather } from "@expo/vector-icons";
import ButtonRow from "@modules/button-rows";
import HostCreateTabs from "@modules/virtual-tabs/host-create-tabs";
import { CommonActions } from "@react-navigation/routers";
import { BottomSheet, Chip, Input, Text } from "@rneui/themed";
import { Button, useTheme } from "@rneui/themed";
import { useProjectAddMutation, ProjectAddInputType, useTourAddMutation } from "@src/gql/generated";
import useTranslation from "@src/hooks/translation";
import { setHostCreateData } from "@src/slice/host-create-slice";
import { RootState } from "@src/store";
import { router, useNavigation } from "expo-router";
import { Formik, FormikProps, FormikValues } from "formik";
import { Ref, useRef, useState } from "react";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const HostCreateFacilitiesScreen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const formikInnerRef: Ref<FormikProps<string[]>> & FormikValues = useRef();
  const [value, setValue] = useState<string | null>();
  const [isVisible, setIsVisible] = useState(false);
  const { data } = useSelector((state: RootState) => state.hostCreateSlice);
  const initialValues = data.facilities;
  const navigation = useNavigation();
  const [submit, { loading }] = useProjectAddMutation();

  const handleChangeInput = e => {
    setValue(e.target.value);
  };

  const handleAddPress = () => {
    const form = formikInnerRef.current;
    if (value) {
      form.setValues([...form.values, value]);

      setValue("");
    }
  };

  const handleRemove = title => {
    const form = formikInnerRef.current;
    const newValues = form.values.filter(value => value !== title);
    form.setValues(newValues);
  };

  const handleSubmit = async () => {
    const form = formikInnerRef.current;

    const done = await new Promise(resolve => {
      dispatch(
        setHostCreateData({
          ...data,
          facilities: form.values,
        })
      );
      resolve(true);
    });
    if (done) {
      submit({
        variables: {
          data: {
            ...data,
            facilities: form.values,
          },
        },
      });
    }
    setIsVisible(true);
  };

  const routeHandler = route => {
    if (Platform.OS === "web") {
      let currentUrl = "/";
      history.replaceState({ url: currentUrl }, document.title, currentUrl);
      router.push(route);
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ key: `${route}/index`, name: `${route}/index` }],
        })
      );
    }
  };

  return (
    <Formik innerRef={formikInnerRef} initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleSubmit }) => (
        <>
          <BottomButtonLayout
            buttons={[
              <Button onPress={handleSubmit}>{tr("Submit")}</Button>,
              <Button type="outline" color="secondary" onPress={() => router.back()}>
                {tr("back")}
              </Button>,
            ]}>
            <HostCreateTabs index={7} />

            <WhiteSpace />

            <Container>
              <Text heading2 bold>
                {tr("Host Facilities")}
              </Text>
              <Text>
                {tr(
                  "You can write and add your own host features. Note that this section is optional."
                )}
              </Text>

              <WhiteSpace size={20} />

              <View style={styles.inputContainer}>
                <Input
                  value={value}
                  onChange={handleChangeInput}
                  placeholder={tr("Add facilities")}
                />
                <Button
                  containerStyle={styles.containerStyle}
                  onPress={handleAddPress}
                  color="secondary"
                  icon={<Feather name="plus" size={24} color={theme.colors.white} />}
                />
              </View>
              <View style={styles.chipsContainer}>
                {values.map(value => (
                  <Chip
                    title={value}
                    type="outline"
                    color="secondary"
                    icon={
                      <Button type="clear" size="sm" onPress={() => handleRemove(value)}>
                        <Feather name="x" size={24} color={theme.colors.black} />
                      </Button>
                    }
                  />
                ))}
              </View>
            </Container>
          </BottomButtonLayout>

          <BottomSheet isVisible={isVisible}>
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
                کمتر از ۴۸ ساعت منتظر بمانید تا میزبانی شما توسط پشتیبانی مفید تریپ ثبت شود و به
                مسافران نمایش داده شود.
              </Text>
              <WhiteSpace />
              <ButtonRow>
                <Button
                  onPress={() => {
                    setIsVisible(false);
                    routeHandler("/host/management");
                  }}
                  color="secondary"
                  type="outline">
                  {tr("Host Management")}
                </Button>
                <Button
                  onPress={() => {
                    routeHandler("/");
                    setIsVisible(false);
                  }}>
                  {tr("Return to home")}
                </Button>
              </ButtonRow>
            </Container>
          </BottomSheet>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  chipsContainer: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 },
  containerStyle: {
    position: "absolute",
    left: 8,
    top: 8,
  },
  inputContainer: {
    position: "relative",
  },
  rejectIcon: {
    margin: "auto",
    width: 56,
    height: 56,
  },
});

export default HostCreateFacilitiesScreen;
