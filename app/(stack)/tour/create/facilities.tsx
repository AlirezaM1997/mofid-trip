import Container from "@atoms/container";
import WhiteSpace from "@atoms/white-space";
import TourCreateTabs from "@modules/virtual-tabs/tour-create-tabs";
import { BottomSheet, Button, Chip, Input, Text, useTheme } from "@rneui/themed";
import { useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, View } from "react-native";
import useTranslation from "@src/hooks/translation";
import BottomButtonLayout from "@components/layout/bottom-button";
import { router } from "expo-router";
import ButtonRow from "@modules/button-rows";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { setTourCreateData } from "@src/slice/tour-create-slice";
import { useTourAddMutation } from "@src/gql/generated";

const Screen = () => {
  const dispatch = useDispatch();
  const { tr } = useTranslation();
  const { theme } = useTheme();
  const formikInnerRef = useRef();
  const [value, setValue] = useState<string | null>();
  const [isVisible, setIsVisible] = useState(false);
  const { data } = useSelector((state: RootState) => state.tourCreateSlice);
  const initialValues = data.facilities;
  const [submit, { loading }] = useTourAddMutation();

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
    // ... do something
    const form = formikInnerRef.current;
    const done = await new Promise(resolve => {
      dispatch(
        setTourCreateData({
          ...data,
          facilities: form.values,
        })
      );
      resolve(true);
    });
    if (done) {
      submit({
        variables: {
          data: data,
        },
      });
    }
    setIsVisible(true);
  };

  return (
    <Formik innerRef={formikInnerRef} initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleSubmit }) => (
        <>
          <BottomButtonLayout
            buttons={[
              <Button onPress={handleSubmit}>{tr("Submit")}</Button>,
              <Button type="outline" color="secondary" onPress={() => router.back()}>
                {tr("back")}
              </Button>,
            ]}>
            <TourCreateTabs index={7} />

            <WhiteSpace />

            <Container>
              <Text heading2 bold>
                {tr("Tour Facilities")}
              </Text>
              <Text>
                {tr(
                  "You can write and add your own tour features. Note that this section is optional."
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
                  onPress={() => router.push("/tour/management")}
                  color="secondary"
                  type="outline">
                  {tr("Tour Management")}
                </Button>
                <Button onPress={() => router.push("/")}>{tr("Return to home")}</Button>
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

export default Screen;
